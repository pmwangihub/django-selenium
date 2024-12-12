import os
import environ
from src.config.security import *
from src.config.corsheaders import *
from src.config.restframework import *
from src.config.celery import *

from .config.defaults import BASE_DIR, PARENT_DIR

env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, ".env"))

DEBUG = env.bool("DJANGO_DEBUG", default=False)

ADMIN_URL = "admin/" if DEBUG else env("DJANGO_ADMIN_URL")

PROJECT_URL = "panel/" if DEBUG else env("DJANGO_PROJECT_URL")

BASE_URL: str = "https://www.jumia.co.ke/"

LOGS_DIR: str = BASE_DIR / "logs" if DEBUG else PARENT_DIR / "logs"

SELENIUM_NUMBER_OF_PAGES: int = 3

SECRET_KEY: str = env("DJANGO_SECRET_KEY")

# # Somehow these settings are not correct!

# CSRF_COOKIE_SAMESITE = "Lax"
# SESSION_COOKIE_SAMESITE = "Lax"
# CSRF_COOKIE_HTTPONLY = True
# SECURE_SSL_REDIRECT = False
# CSRF_COOKIE_SECURE = False
# SESSION_COOKIE_SECURE = False

SESSION_EXPIRE_AT_BROWSER_CLOSE = True

CSRF_TRUSTED_ORIGINS = env.list("CSRF_TRUSTED_ORIGINS")

ROOT_URLCONF: str = "src.urls"

ALLOWED_HOSTS: list = env.list("ALLOWED_HOSTS") if not DEBUG else ["*"]

WSGI_APPLICATION: str = "src.wsgi.application"

LANGUAGE_CODE: str = "en-us"

TIME_ZONE: str = "UTC"

USE_I18N: bool = True

USE_TZ: bool = True

STATIC_URL: str = "/static/"

STATICFILES_DIRS: list = [
    os.path.join(BASE_DIR, "static"),
]

if DEBUG:
    DEV_STATIC = [
        BASE_DIR / "react/dist/assets",
    ]
    STATICFILES_DIRS += DEV_STATIC

STATIC_ROOT = BASE_DIR / "staticfiles"
STORAGES = {
    "staticfiles": {
        #  CompressedManifestStaticFilesStorage -> Yes cache
        # CompressedStaticFilesStorage -> No caching
        "BACKEND": "whitenoise.storage.CompressedStaticFilesStorage",
    },
}

MEDIA_URL: str = "/media/"
MEDIA_ROOT: str = BASE_DIR / "media"

DEFAULT_AUTO_FIELD: str = "django.db.models.BigAutoField"

INSTALLED_APPS = [
    "whitenoise.runserver_nostatic",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django_extensions",
    "rest_framework",
    "corsheaders",
    "django_celery_results",
    "django_celery_beat",
    "app.home",
    "app.user",
    "app.projects",
    "app.jumia",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "templates")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": env("PGDATABASE"),
        "USER": env("PGUSER"),
        "PASSWORD": env("PGPASSWORD"),
        "HOST": env("PGHOST"),
        "PORT": 5432,
        "OPTIONS": {
            "sslmode": "require",
        },
    }
}


EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = env("EMAIL_HOST", default=None)
EMAIL_PORT = env("EMAIL_PORT", default="587")
EMAIL_HOST_USER = env("EMAIL_HOST_USER", default=None)
EMAIL_HOST_PASSWORD = env("EMAIL_HOST_PASSWORD", default=None)
EMAIL_USE_TLS = env.bool("EMAIL_USE_TLS", default=True)
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
