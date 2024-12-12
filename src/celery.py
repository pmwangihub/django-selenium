import os

from celery import Celery
from django.conf import settings

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "src.settings")

app = Celery("src")

app.conf.enable_utc = False

app.config_from_object(settings, namespace="CELERY")

app.conf.update(
    broker_connection_retry_on_startup=True,
    # Add this line to retain the existing retry behavior on startup
)

app.autodiscover_tasks(["app.projects", "app.user", "app.jumia"])


# @app.task(bind=True)
# def debug_task(self):
#     print(f"Request: {self.request!r}")
