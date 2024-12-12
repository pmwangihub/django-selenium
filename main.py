import os
import django

# Set the Django settings module
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "src.settings")

# Setup Django
django.setup()

# Import and run your task
try:
    from app.projects.tasks import scrape_jumia_products_task

    scrape_jumia_products_task()
except Exception as e:
    print(f"Main failed {e}")
