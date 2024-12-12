from rest_framework import serializers
from app.jumia.models import (
    ScrapeBaseURL,
    Category,
    JumiaProduct,
    ProductScrapeEvent,
    UserProductSubscription,
)
from django_celery_results.models import TaskResult


class ScrapeBaseURLSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScrapeBaseURL
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class JumiaProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = JumiaProduct
        fields = "__all__"


class ProductScrapeEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductScrapeEvent
        fields = "__all__"


class TaskResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskResult
        fields = [
            "task_id",
            "periodic_task_name",
            "task_name",
            "task_args",
            "task_kwargs",
            "status",
            "worker",
            "content_type",
            "content_encoding",
            "result",
            "date_created",
            "date_done",
            "traceback",
            "meta",
        ]


class CategoryWithProductsSerializer(serializers.ModelSerializer):
    products = JumiaProductSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ["id", "name", "slug", "created_at", "updated_at", "products"]


class UserProductSubscriptionSerializer(serializers.ModelSerializer):
    product = JumiaProductSerializer()

    class Meta:
        model = UserProductSubscription
        fields = [
            "user",
            "product",
            "created_at",
            "updated_at",
        ]
