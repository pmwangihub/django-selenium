from django.conf import settings
from django.contrib import admin
from django.urls import path, re_path, include
from django.conf.urls.static import static
from django.views.generic.base import RedirectView

urlpatterns = [
    path(f"{settings.ADMIN_URL}", admin.site.urls),
    path("", include("app.home.urls")),
    path("accounts/", include("app.user.urls")),
    path("projects/", include("app.projects.urls")),
    path("jumia/", include("app.jumia.urls")),
    re_path(
        r"^favicon\.ico$",
        RedirectView.as_view(url="static/ico/favicon.ico", permanent=True),
        name="favicon",
    ),
    path(
        "api/",
        include(
            [
                path("auth/", include("app.user.api.urls")),
                path("home/", include("app.projects.api.urls")),
                path("jumia/", include("app.jumia.api.urls")),
            ]
        ),
    ),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
