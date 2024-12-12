from django.urls import path
from app.home.views import (
    FeaturesView,
    AboutMeView,
    ProjectsView,
)

app_name = "home"

urlpatterns = [
    path("", AboutMeView.as_view(), name="home"),
    path("features/", FeaturesView.as_view(), name="features"),
    path("projects/", ProjectsView.as_view(), name="projects"),
]
