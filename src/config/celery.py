import os
import environ
from .defaults import BASE_DIR, env

environ.Env.read_env(os.path.join(BASE_DIR, ".env"))

CELERY_BROKER_URL = env("REDIS_CELERY_BROKER_URL")
CELERY_ACCEPT_CONTENT = ["application/json"]
CELERY_RESULT_SERIALIZER = "json"
CELERY_TASK_SERIALIZER = "json"
CELERY_RESULT_BACKEND = "django-db"
# CELERY_TIMEZONE = 'Asia/Karachi
CELERY_BEAT_SCHEDULER = "django_celery_beat.schedulers:DatabaseScheduler"

# CELERY_BEAT_SCHEDULE = {
#     "scrape_jumia_products_every_7_days": {
#         "task": "app.projects.tasks.scrape_jumia_products_task",
#         "schedule": 604800.0,  # 7 days in seconds
#     },
# }
