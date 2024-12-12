from rest_framework import serializers
from app.projects.models import JumiaProduct, ProductScrapeEvent
from django_celery_results.models import TaskResult


class CeleryTaskResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskResult
        fields = (
            "pk",
            "periodic_task_name",
            "status",
            "date_created",
            "date_done",
        )


class JumiaProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = JumiaProduct
        fields = "__all__"


class ProductScrapeEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductScrapeEvent
        fields = "__all__"


class JumiaProductPriceChangeSerializer(serializers.ModelSerializer):
    price_changes = JumiaProductSerializer(
        many=True, read_only=True, source="jumia_product_event"
    )

    class Meta:
        model = ProductScrapeEvent
        fields = ["created_at", "price_changes"]
