import os
import time
import tempfile
from bs4 import BeautifulSoup
from django.conf import settings
from selenium import webdriver


class Scrapper:
    """
    A class to scrape product information from Jumia's website based on a
    specific category and number of pages.

    Usage:
        scrapper = Scrapper(category='electronics', pages=5, url='custom_url')
        scraped_data, scrape_info = scrapper.scrape_jumia_pages()
    """

    def __init__(self, url: str, category: str, pages: int = None):
        """
        Initializes the Scrapper instance with category, url, and optional pages (number of pages).
        Args:
            category (str): The product category to scrape.
            pages (int, optional): Number of pages to scrape. Defaults to settings.SELENIUM_NUMBER_OF_PAGES.
            url (str): Custom URL to scrape.

        Raises:
            ValueError: If the base URL is not set in settings.
        """

        self.url = url
        self.category = category.strip()
        self.number_of_pages = (
            int(pages) if pages else getattr(settings, "SELENIUM_NUMBER_OF_PAGES", None)
        )
        self.scrape_info = {}
        self.driver = self._initialize_driver()
        if not self.url:
            raise ValueError("URL must be provided.")
        if not self.category:
            raise ValueError("Category must be provided.")

    def _initialize_driver(self):
        """
        Initializes the Selenium WebDriver for scraping.

        Configures the WebDriver with the required options such as headless mode, window size, and binary location.
        If in a non-debug mode, adds logging and user data options.

        Returns:
            webdriver.Chrome: The initialized Selenium WebDriver.
        """
        options = webdriver.ChromeOptions()
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        options.add_argument("--disable-gpu")
        options.add_argument("--window-size=1920x1080")
        options.add_argument("--disable-headless")
        options.add_argument("--headless=new")
        options.add_argument("--disable-extensions")

        if not settings.DEBUG:
            # In linux machine. Presuming the server is linux.
            # I do host all my projects in linux servers 🤷‍♂️.
            options.binary_location = "/usr/bin/google-chrome"
            options.add_argument("--enable-logging")
            options.add_argument("--v=1")
            user_data_dir = tempfile.mkdtemp()
            options.add_argument(f"--user-data-dir={user_data_dir}")

        return webdriver.Chrome(options=options)

    def _safe_get_attr(self, element, attribute, default=None):
        """
        Safely retrieves an attribute from a given HTML element.

        Args:
            element (BeautifulSoup element): The HTML element to get the attribute from.
            attribute (str): The attribute to retrieve.
            default: The default value to return if the attribute does not exist.

        Returns:
            str: The value of the attribute or the default value if not found.
        """
        return element.get(attribute, default) if element else default

    def _safe_get_text(self, element, default=None):
        """
        Safely retrieves text from a given HTML element.

        Args:
            element (BeautifulSoup element): The HTML element to get the text from.
            default: The default value to return if the element does not contain text.

        Returns:
            str: The stripped text content or the default value if not found.
        """
        return element.text.strip() if element else default

    def _convert_currency_to_float(self, currency_str):
        """
        Converts a currency string to a float value.

        Handles strings that may contain a price range
        (e.g., "KSh 1000 - 2000") and calculates the average.

        Args:
            currency_str (str): The currency string to convert.

        Returns:
            float: The converted float value or an average of the range.
        """

        def clean_and_convert(value):
            try:
                cleaned_value = value.replace("KSh", "").replace(",", "").strip()
                return float(cleaned_value)
            except Exception as e:
                error = f"ERROR: _convert_currency_to_float() failed:: {e}."
                self.scrape_info["error_currency_conversion"] = error

        if "-" in currency_str:
            low, high = currency_str.split("-")
            low_value = clean_and_convert(low)
            high_value = clean_and_convert(high)
            return (low_value + high_value) / 2
        else:
            return clean_and_convert(currency_str)

    def selenium_get_html(self, url):
        """
        Uses Selenium to retrieve the HTML content of a given URL.

        Args:
            url (str): The URL to fetch using Selenium.

        Returns:
            str: The HTML content of the page or None if an error occurs.
        """
        try:
            info = "INFO: Selenium driver has started ..."
            self.scrape_info["info_selenium"] = info
            self.scrape_info["url"] = url
            self.scrape_info["category"] = self.category
            self.driver.get(url)
            time.sleep(5)
            return self.driver.page_source
        except Exception as e:
            error = f"ERROR: Selenium driver failed: {e}"
            self.scrape_info["error_selenium"] = error
            return None

    def _parse_article(self, article, url):
        """
        Parses an article element to extract product details such as name, price, and ratings.

        Args:
            article (BeautifulSoup element): The article element containing product details.
            url (str): The URL of the product page.

        Returns:
            dict: A dictionary containing extracted product details.
        """
        image_url = self._safe_get_attr(article.find("img", class_="img"), "data-src")
        product_name = self._safe_get_text(article.find("h3", class_="name"))
        current_price_str = self._safe_get_text(article.find("div", class_="prc"))
        old_price_str = self._safe_get_text(article.find("div", class_="old"))
        discount_percent = self._safe_get_text(
            article.find("div", class_="bdg _dsct _sm")
        )
        express_shipping = article.find("svg", class_="ic xprss") is not None
        ratings = self._safe_get_text(article.find("div", class_="stars _s"))
        sponsored = article.find("button", class_="spon") is not None

        current_price = (
            self._convert_currency_to_float(current_price_str)
            if current_price_str
            else 0.00
        )
        old_price = (
            self._convert_currency_to_float(old_price_str) if old_price_str else 0.00
        )

        extra_description = ""
        if current_price_str and "-" in current_price_str:
            extra_description = f"Current price ranges: {current_price_str}"
        if old_price_str and "-" in old_price_str:
            extra_description = f"Old price ranges: {old_price_str}"

        return {
            "product_name": product_name,
            "image_url": image_url,
            "current_price": current_price,
            "old_price": old_price,
            "discount_percent": discount_percent,
            "express_shipping": express_shipping,
            "ratings": ratings,
            "sponsored": sponsored,
            "extra_description": extra_description,
            "url": url,
        }

    def beautiful_soup_html_parser(self, html, url=None):
        """
        Parses the HTML content using BeautifulSoup to extract product data.

        Args:
            html (str): The HTML content to parse.
            url (str, optional): The URL from which the HTML was retrieved.

        Returns:
            list: A list of dictionaries containing product data, or an empty list if an error occurs.
        """
        product_data = []
        if not html:
            error = "ERROR: Beautiful soup received empty HTML from Selenium."
            self.scrape_info["error_Beautiful_Soup"] = error
            return product_data
        soup = BeautifulSoup(html, "html.parser")

        try:
            for article in soup.find_all("article"):
                product_data.append(self._parse_article(article, url))
            info = f"INFO: Successfully scraped {len(product_data)} items."
            self.scrape_info["info_scrape"] = info
            return product_data
        except Exception as e:
            error = f"ERROR: Beautiful soup parsing failed: {e}"
            self.scrape_info["error_Beautiful_Soup"] = error
            return []

    def scrape_jumia_pages(self):
        """
        Scrapes product data from multiple pages on Jumia.

        Iterates through the specified number of pages, retrieves HTML content, and parses product data.

        Returns:
            tuple: A tuple containing the list of product data and scrape information.
        """
        all_products = []
        try:
            if self.number_of_pages:
                for counter in range(self.number_of_pages):
                    url_with_page = (
                        f"{self.url}?&page={counter}" if counter > 0 else self.url
                    )
                    info = f"INFO: Scraping URL: {url_with_page}"
                    self.scrape_info["info_scrape"] = info
                    html = self.selenium_get_html(url_with_page)
                    if not html:
                        continue
                    products = self.beautiful_soup_html_parser(html, url_with_page)
                    all_products.extend(products)
            else:
                html_1 = self.selenium_get_html(self.url)
                products_plain = self.beautiful_soup_html_parser(html_1, self.url)
                all_products.extend(products_plain)
            return (all_products, self.scrape_info)

        except Exception as e:
            error = f"ERROR: An error occurred while scraping: {e}"
            self.scrape_info["error_SCRAPPER_CLS"] = error
            # return [], self.scrape_info
        finally:
            info = "INFO: Scraping process finished."
            self.scrape_info["info_SCRAPPER_CLS"] = info
            self.driver.quit()
            # return [], self.scrape_info
