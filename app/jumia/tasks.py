from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
from django.apps import apps
from celery import shared_task
from celery.signals import task_prerun, task_postrun, task_failure, task_success

from app.jumia.scrapper import Scrapper
from app.jumia.models import (
    UserProductSubscription as Subscription,
    ProductScrapeEvent as ScrapeEvent,
)

from celery import shared_task
from django.apps import apps


@shared_task
def jumiaScrape(category: str, url: str, pages=None) -> dict:
    """
    Scrapes product data from Jumia for the given category and URL.
    Parameters:
    category : str
        The category of products to scrape.
    url : str
        The base URL to scrape.
    pages : int, optional
        The number of pages to scrape (default is None).

    Returns:
    dict
        Information about the scrape process, including any errors encountered.
    """
    ProductScrapeEvent = apps.get_model("jumia", "ProductScrapeEvent")
    Category = apps.get_model("jumia", "Category")
    scrape_info = {}
    try:
        try:
            category_instance = Category.objects.get(name=category)
            print(category_instance)
        except Category.DoesNotExist:
            category_instance = Category(name=category)
            if url:
                category_instance.url = url
                category_instance.save()
            print(category_instance)
        scrapper = Scrapper(category=category, url=url, pages=pages)
        data, scrape_info = scrapper.scrape_jumia_pages()
        for jumia_product in data:
            try:
                ProductScrapeEvent.events.create_from_scrape(
                    jumia_product, category_instance
                )
            except Exception as save_error:
                scrape_info["save_error"] = str(save_error)
                print("\n*******************************************\n")
                print(f"\nError in saving data through scrapper: {save_error}\n")
                print("\n*******************************************\n")

    except Exception as category_error:
        scrape_info["category_error"] = str(category_error)
        print("\n*******************************************\n")
        print(f"\nCategory get_or_create failed with: {category_error}\n")
        print("\n*******************************************\n")

    return scrape_info


@shared_task
def jumiaUserProductsEmail() -> None:
    subscriptions = Subscription.objects.select_related("user", "product").all()
    user_products = {}
    for subscription in subscriptions:
        user = subscription.user
        product = subscription.product
        if user not in user_products:
            user_products[user] = {}
        if product not in user_products[user]:
            user_products[user][product] = []

        scrape_events = ScrapeEvent.objects.filter(jumia_product=product)
        user_products[user][product].extend(scrape_events)

    for user, subscribed_products in user_products.items():
        html_message = render_to_string(
            "email/user_subscription.html",
            {"user": user, "subscribed_products": subscribed_products},
        )
        plain_message = strip_tags(html_message)

        send_mail(
            subject="Jumia Product Price Updates from pminnovest",
            message=plain_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            html_message=html_message,
            fail_silently=False,
        )


@task_prerun.connect(sender=jumiaScrape)
def task_prerun_notifier(sender=None, **kwargs):
    print("START: \tStarted jumiaScrape from a view ...")


@task_postrun.connect(sender=jumiaScrape)
def task_postrun_notifier(sender=None, **kwargs):
    print("END: \tTask finished jumiaScrape from a view ...")


@task_failure.connect(sender=jumiaScrape)
def task_failure_notifier(sender=None, **kwargs):
    print("FAILED: \tjumiaScrape from view failed!")


@task_success.connect(sender=jumiaScrape)
def task_failure_notifier(sender=None, **kwargs):
    print("SUCCESS:  \tjumiaScrape from view succeeded")
