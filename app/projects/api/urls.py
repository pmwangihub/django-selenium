# from django.urls import path
# from app.projects.api.views import (
#     JumiaProductListCreateAPIView,
#     JumiaProductRetrieveUpdateDestroyAPIView,
#     ProductScrapeEventListCreateAPIView,
#     ProductScrapeEventRetrieveUpdateDestroyAPIView,
#     CeleryTaskResultAPIView,
#     JumiaProductPriceChangeAPIView,
# )

app_name = "projects_api"
urlpatterns = []
# urlpatterns = [
#     path(
#         "product-price-change/<str:slug>/",
#         JumiaProductPriceChangeAPIView.as_view(),
#         name="product_price_change",
#     ),
#     path(
#         "celery-task-result/",
#         CeleryTaskResultAPIView.as_view(),
#         name="celery_task_result",
#     ),
#     path(
#         "jumia-products/",
#         JumiaProductListCreateAPIView.as_view(),
#         name="jumia_product_list_create",
#     ),
#     path(
#         "jumia-products/<int:pk>/",
#         JumiaProductRetrieveUpdateDestroyAPIView.as_view(),
#         name="jumia_product_detail",
#     ),
#     path(
#         "scrape-events/",
#         ProductScrapeEventListCreateAPIView.as_view(),
#         name="scrape_event_list_create",
#     ),
#     path(
#         "scrape-events/<int:pk>/",
#         ProductScrapeEventRetrieveUpdateDestroyAPIView.as_view(),
#         name="scrape_event_detail",
#     ),
# ]
