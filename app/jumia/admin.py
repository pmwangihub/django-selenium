from django.contrib import admin
from app.jumia.models import (
    JumiaProduct,
    ProductScrapeEvent,
    UserProductSubscription,
    Category,
    ScrapeBaseURL,
)
from django.utils.html import format_html


@admin.register(JumiaProduct)
class JumiaProductAdmin(admin.ModelAdmin):
    """
    Admin interface for managing JumiaProduct instances.

    Args:
        admin.ModelAdmin: Base class for creating
        a custom admin interface for the
        JumiaProduct model.
    """

    list_display = (
        "product_name",
        "category",
        "current_price",
        "created_at",
        "update_all_products_link",
    )

    list_filter = (
        "product_name",
        "category",
        "created_at",
    )

    def update_all_products(self, request, queryset):
        """
        Update all JumiaProduct instances. This method
        can be customized to perform specific updates.

        Args:
            request (HttpRequest): The HTTP request object.
            queryset (QuerySet): The queryset of JumiaProduct
            instances selected in the admin interface.
        """
        for product in queryset:
            product.save()
        self.message_user(request, "All products have been updated.")

    update_all_products.short_description = "Update selected products"

    actions = [update_all_products]

    def update_all_products_link(self, obj):
        """
        Returns an HTML link to trigger the update_all_products action.
        Args:
            obj (JumiaProduct): The JumiaProduct instance.
        Returns:
            str: HTML link for updating all products.
        """
        return format_html(
            '<a class="button" href="{}">Update All Products</a>',
            "/admin/home/jumiaproduct/?action=update_all_products",
        )

    update_all_products_link.allow_tags = True


@admin.register(ProductScrapeEvent)
class ProductScrapeEventAdmin(admin.ModelAdmin):
    """_summary_

    Args:
        admin (_type_): _description_
    """

    list_display = (
        "created_at",
        "current_price",
        "pk",
        "jumia_product",
    )
    list_filter = (
        "jumia_product",
        "created_at",
    )


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """_summary_"""

    list_display = ("name", "created_at")
    list_filter = ("name", "created_at")


@admin.register(ScrapeBaseURL)
class ScrapeBaseURLAdmin(admin.ModelAdmin):
    """_summary_"""

    list_display = ("url", "created_at")


from django.contrib import admin
from .models import UserProductSubscription, ProductScrapeEvent


@admin.register(UserProductSubscription)
class UserProductSubscriptionAdmin(admin.ModelAdmin):
    list_display = ("user", "product", "created_at")
    search_fields = ("user__email", "product")
