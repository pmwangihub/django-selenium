import os
import django

# Set the Django settings module
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "src.settings")

# Setup Django
django.setup()

from src.celery import app

app.control.purge()
app.control.discard_all()
