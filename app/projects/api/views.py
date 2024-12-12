import time

from rest_framework import status
from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from app.projects.models import JumiaProduct, ProductScrapeEvent
from django_celery_results.models import TaskResult
from app.projects.api.serializers import (
    JumiaProductSerializer,
    ProductScrapeEventSerializer,
    CeleryTaskResultSerializer,
    JumiaProductPriceChangeSerializer,
)


class JumiaProductPriceChangeAPIView(APIView):
    permission_classes = [
        permissions.AllowAny,
    ]

    def get(self, request, slug, *args, **kwargs):

        try:
            product = JumiaProduct.objects.get(slug=slug)
            products = ProductScrapeEvent.objects.filter(jumia_product_id=product.id)
            serializer = ProductScrapeEventSerializer(products, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except JumiaProduct.DoesNotExist:
            return Response(
                {"error": f"Product {slug} not found"},
                status=status.HTTP_404_NOT_FOUND,
            )


class CeleryTaskResultAPIView(APIView):
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = CeleryTaskResultSerializer

    def get(self, request, *args, **kwargs):
        queryset = TaskResult.objects.all().values()
        data = list(queryset)
        return JsonResponse(data, safe=False)


class JumiaProductListCreateAPIView(generics.ListCreateAPIView):
    queryset = JumiaProduct.objects.all()
    serializer_class = JumiaProductSerializer
    permission_classes = [
        permissions.AllowAny,
    ]


class JumiaProductRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = JumiaProduct.objects.all()
    serializer_class = JumiaProductSerializer


class ProductScrapeEventListCreateAPIView(generics.ListCreateAPIView):
    queryset = ProductScrapeEvent.objects.all()
    serializer_class = ProductScrapeEventSerializer


class ProductScrapeEventRetrieveUpdateDestroyAPIView(
    generics.RetrieveUpdateDestroyAPIView
):
    queryset = ProductScrapeEvent.objects.all()
    serializer_class = ProductScrapeEventSerializer
