from django.urls import path
from django.conf import settings
from app.jumia.views import JumiaScrapeView, JumiaProject, scrape_params

app_name = "jumia"

urlpatterns = [
    path("jumia-case-study/", JumiaScrapeView.as_view(), name="jumia_case_study"),
    path(f"{settings.PROJECT_URL}", JumiaProject.as_view(), name="project_panel"),
    path(f"jumia-scrape/", scrape_params, name="jumia_scrape"),
]
