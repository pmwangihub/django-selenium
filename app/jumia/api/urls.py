from django.urls import path
from .views import (
    JumiaScrapeAPIView,
    # ScrapeBaseURLDetailAPIView,
    CategoryListAPIView,
    CategoryDetailAPIView,
    JumiaProductDetailAPIView,
    ProductScrapeEventDetailAPIView,
    CategoryWithProductsAPIView,
    ProductEventAPIView,
    TaskResultAPIView,
    UserProductSubscriptionsAPIView,
    SubscribeProductAPIView,
    ContactMeAPIView,
)

app_name = "jumia_api"


urlpatterns = [
    path("jumia-scrape/", JumiaScrapeAPIView.as_view()),
    path("task_result/", TaskResultAPIView.as_view()),
    # Detail API Views
    # path("scrape_base_url/<int:pk>/", ScrapeBaseURLDetailAPIView.as_view()),
    path("category/", CategoryListAPIView.as_view()),
    path("category/<int:pk>/", CategoryDetailAPIView.as_view()),
    path("jumia_product/<int:pk>/", JumiaProductDetailAPIView.as_view()),
    path("product_scrape_event/<int:pk>/", ProductScrapeEventDetailAPIView.as_view()),
    # Category with Products API View
    path("category_products/<slug:slug>/", CategoryWithProductsAPIView.as_view()),
    # Product Scrape Event Filtered API View
    path(
        "product_events/<slug:slug>/",
        ProductEventAPIView.as_view(),
    ),
    # User Products
    path(
        "user-product/",
        UserProductSubscriptionsAPIView.as_view(),
    ),
    path(
        "user-products/",
        UserProductSubscriptionsAPIView.as_view(),
    ),
    path(
        "product-subscribe/",
        SubscribeProductAPIView.as_view(),
    ),
    path("contact-me/", ContactMeAPIView.as_view()),
]
