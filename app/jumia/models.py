from django.db import models
from django.utils.text import slugify
from django.contrib.auth import get_user_model

User = get_user_model()


class ScrapeBaseURL(models.Model):
    """
    Model to store the base URLs for scraping.
    """

    url = models.CharField(max_length=450, default="https://www.jumia.co.ke/")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.base_url


class Category(models.Model):
    """
    Model to store product categories.
    """

    name = models.CharField(max_length=100, unique=True)
    url = models.CharField(max_length=350, blank=True, null=True)
    slug = models.SlugField(max_length=100, unique=True, blank=True, null=True)
    image_url = models.CharField(max_length=450, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class JumiaProduct(models.Model):
    """
    Model to store details about Jumia products.
    """

    category = models.ForeignKey(
        Category, related_name="products", on_delete=models.CASCADE
    )
    # We could have the same product existing in different category.
    # Hence removal of unique=True
    product_name = models.CharField(max_length=450, blank=False)
    slug = models.SlugField(max_length=450, null=True, blank=True, default="")
    image_url = models.CharField(max_length=450, blank=True, null=True)
    url = models.CharField(max_length=350, blank=True, null=True)
    current_price = models.FloatField(default=0.00)
    old_price = models.FloatField(default=0.00, blank=True, null=True)
    discount_percent = models.CharField(max_length=155, blank=True, null=True)
    ratings = models.CharField(max_length=155, blank=True, null=True)
    express_shipping = models.BooleanField(default=False)
    sponsored = models.BooleanField(default=False)
    extra_description = models.CharField(max_length=450, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if self.product_name:
            self.slug = slugify(self.product_name)
        super().save(*args, **kwargs)

        if self.image_url:
            self.category.image_url = self.image_url
            self.category.save()

    def __str__(self):
        return self.product_name


class ProductScrapeEventManager(models.Manager):
    """
    Manager for handling scrape events.
    Methods:
        create_from_scrape(jumia_product): Creates or updates a product and adds a scrape event.
    """

    def create_from_scrape(self, jumia_product, category):
        """
        Creates or updates a JumiaProduct and records a scrape event.
        Args:
            jumia_product (dict): The product details obtained from scraping.
        Returns:
            (JumiaProduct)
        """
        if not isinstance(category, Category):
            raise ValueError(
                "category argument must be an instance of Category model. \
                Create category=Category.objects.create(name)"
            )

        # If we don't have a product name, cancel the whole process.
        product_name = jumia_product.get("product_name") or None
        if not product_name:
            return None

        product, created = JumiaProduct.objects.update_or_create(
            product_name=product_name,
            defaults={
                "image_url": jumia_product.get("image_url"),
                "current_price": jumia_product.get("current_price"),
                "old_price": jumia_product.get("old_price"),
                "discount_percent": jumia_product.get("discount_percent"),
                "ratings": jumia_product.get("ratings"),
                "express_shipping": jumia_product.get("express_shipping"),
                "sponsored": jumia_product.get("sponsored"),
                "extra_description": jumia_product.get("extra_description"),
                "url": jumia_product.get("url"),
                "category": category,
            },
        )

        self.create(
            jumia_product=product,
            current_price=jumia_product["current_price"],
            data=jumia_product,
        )
        return product


class ProductScrapeEvent(models.Model):
    """
    Model to store scrape events for Jumia products.
    """

    jumia_product = models.ForeignKey(
        JumiaProduct, related_name="scrape_events", on_delete=models.CASCADE
    )
    current_price = models.FloatField(default=0.00)
    data = models.JSONField(null=True, blank=True, default=dict)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = models.Manager()
    events = ProductScrapeEventManager()

    def __str__(self):
        return str(self.jumia_product.product_name)


class UserProductSubscription(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(
        JumiaProduct, related_name="user_subscription", on_delete=models.CASCADE
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.email}"
