import time
from typing import Optional, Union
from django.http import HttpResponse
from django_celery_results.models import TaskResult
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework import permissions
from rest_framework.exceptions import NotFound
from rest_framework.views import APIView
from rest_framework.response import Response
from app.jumia.tasks import jumiaScrape
from rest_framework import generics
from django.db.models import Count
from app.jumia.models import (
    ScrapeBaseURL,
    Category,
    JumiaProduct,
    ProductScrapeEvent,
    UserProductSubscription,
)
from .serializers import (
    ScrapeBaseURLSerializer,
    CategorySerializer,
    JumiaProductSerializer,
    ProductScrapeEventSerializer,
    CategoryWithProductsSerializer,
    TaskResultSerializer,
    UserProductSubscriptionSerializer,
)
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags


User = get_user_model()


def get_user():
    if settings.DEBUG:
        return User.objects.get(email="pmwassini@gmail.com")


def user_authenticated_check(user: User, post_user_email: Optional[str] = None) -> Union[User, HttpResponse]:  # type: ignore
    """
    Check if a user is authenticated and optionally verify the user's email.

    Args:
        - user (User): The user object from the request (request.user).
        - post_user_email (Optional[str], optional): Email from the POST
        request for additional verification. Defaults to None.

    Returns:
        Union[User, Response]: Returns the user object if authenticated
        and verified,
                               otherwise a Response object with HTTP 401
                               status in case of failure.
    """
    if not settings.DEBUG:
        # Check if the user is anonymous (not logged in)
        if user.is_anonymous:
            return Response(
                {"error": "User is anonymous"}, status=status.HTTP_401_UNAUTHORIZED
            )
        # Check if the user is authenticated
        if not user.is_authenticated:
            return Response(
                {"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED
            )
        # If post_user_email is provided, compare it with the session user
        if post_user_email:
            try:
                session_user = User.objects.get(email=post_user_email)
                if session_user != user:
                    return Response(
                        {"error": "Email mismatch or invalid user"},
                        status=status.HTTP_401_UNAUTHORIZED,
                    )
            except User.DoesNotExist:
                return Response(
                    {"error": "Session user not found"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )
    return user


class SubscribeProductAPIView(APIView):
    """
    This view subscribes a user to a specific product and vice versa.

    POST args:
    - user (email)
    - product_id
    - is_checked
    """

    permission_classes = [
        permissions.AllowAny,
    ]

    def post(self, request, *args, **kwargs) -> Union[HttpResponse, None]:
        user = request.user  # type: ignore
        product_id: str = request.data.get("product_id", None)
        is_checked: bool = request.data.get("is_checked", None)
        print(user)
        auth_check = user_authenticated_check(user)
        if isinstance(auth_check, HttpResponse):
            return auth_check

        try:
            product = JumiaProduct.objects.get(id=product_id)
        except JumiaProduct.DoesNotExist:
            return Response(
                {"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND
            )
        try:
            subscription, created = UserProductSubscription.objects.get_or_create(
                user=user, product=product
            )

            if not created and not is_checked:
                subscription.delete()
                return Response(
                    {"message": "Subscription removed"}, status=status.HTTP_200_OK
                )
            serializer = UserProductSubscriptionSerializer(subscription)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response(
                {"error": "Internal Server Error"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class UserProductSubscriptionsAPIView(APIView):
    """
    API View for managing user product subscriptions.
    """

    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs) -> HttpResponse:
        user: User = request.user  # type: ignore

        if user.is_anonymous:
            return Response(
                {"error": "User is anonymous"}, status=status.HTTP_401_UNAUTHORIZED
            )
        if not user.is_authenticated:
            return Response(
                {"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED
            )

        subscriptions = UserProductSubscription.objects.filter(user=user)
        # Type Ambiguity: Initializing data as None and then conditionally
        # changing it to a list or another data structure can cause ambiguity
        # in terms of data type. This can confuse developers or linters that
        # expect consistent types.
        if subscriptions.exists():
            serializer = UserProductSubscriptionSerializer(subscriptions, many=True)
            data = serializer.data
        else:
            data = None

        return Response(data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs) -> HttpResponse:
        user: User = request.user  # type: ignore
        product_id: Optional[str] = request.data.get("product_id")
        post_user_email: Optional[str] = request.data.get("user")

        if user.is_anonymous:
            return Response(
                {"error": "User is anonymous"}, status=status.HTTP_401_UNAUTHORIZED
            )
        if not user.is_authenticated:
            return Response(
                {"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED
            )

        try:
            subscription = UserProductSubscription.objects.get(
                product=product_id, user=user
            )
            serializer = UserProductSubscriptionSerializer(subscription)
            return Response(
                {"is_subscribed": True, "product": serializer.data},
                status=status.HTTP_200_OK,
            )
        except UserProductSubscription.DoesNotExist:
            return Response(
                {"is_subscribed": False, "product": None},
                status=status.HTTP_200_OK,
            )


class TaskResultAPIView(APIView):
    permission_classes = [
        permissions.AllowAny,
    ]

    def get(self, *args, **kwargs):
        queryset = TaskResult.objects.all()
        serializer = TaskResultSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class JumiaScrapeAPIView(APIView):
    permission_classes = [
        permissions.AllowAny,
        # permissions.IsAuthenticated,
        # permissions.IsAdminUser,
    ]

    def post(self, request, *args, **kwargs):
        """Handle the POST request to initiate a scraping task."""
        url = self.request.data.get("url", None)
        pages = self.request.data.get("pages", None)
        category = self.request.data.get("category", None)
        try:
            arguments = jumiaScrape.delay(category, url, pages)
            # arguments = jumiaScrape.apply_async(
            #     kwargs={
            #         "category": category,
            #         "url": url,
            #         "pages": pages,
            #     }
            # )
        except Exception as e:
            print(f"ERROR SCRAPPING : {e}")
            return Response(
                {"error": f"ERROR SCRAPPING : {e}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response({"success": "Scrape completed"}, status=status.HTTP_200_OK)


class ScrapeBaseURLDetailAPIView(generics.RetrieveAPIView):
    queryset = ScrapeBaseURL.objects.all()
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = ScrapeBaseURLSerializer


class CategoryDetailAPIView(generics.RetrieveAPIView):
    queryset = Category.objects.all()
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = CategorySerializer


class CategoryListAPIView(APIView):

    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = CategorySerializer

    def get(self, *args, **kwargs):
        queryset = Category.objects.annotate(product_count=Count("products")).filter(
            product_count__gt=0
        )
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CategoryWithProductsAPIView(generics.RetrieveAPIView):
    queryset = Category.objects.all()
    lookup_field = "slug"  # Use 'slug' instead of 'pk'
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = CategoryWithProductsSerializer


class JumiaProductDetailAPIView(generics.RetrieveAPIView):
    queryset = JumiaProduct.objects.all()
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = JumiaProductSerializer


class ProductScrapeEventDetailAPIView(generics.RetrieveAPIView):
    queryset = ProductScrapeEvent.objects.all()
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = ProductScrapeEventSerializer


class ProductEventAPIView(APIView):
    serializer_class = ProductScrapeEventSerializer
    permission_classes = [
        permissions.AllowAny,
    ]

    def get(self, *args, **kwargs):
        slug = self.kwargs.get("slug")
        try:
            product = JumiaProduct.objects.get(slug=slug)
            products = ProductScrapeEvent.objects.filter(jumia_product_id=product.id)
            serializer = ProductScrapeEventSerializer(products, many=True)
            # time.sleep(3)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except JumiaProduct.DoesNotExist:
            return Response(
                {"error": f"Product {slug} not found"},
                status=status.HTTP_404_NOT_FOUND,
            )


class ContactMeAPIView(APIView):
    permission_classes = [
        permissions.AllowAny,
    ]

    def post(self, request, *args, **kwargs):
        """ """
        email = request.data.get("email", None)
        subject = request.data.get("subject", None)
        message = request.data.get("message", None)

        if not all([email, message]):
            return Response(
                {"error": "All fields are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            context = {
                "email": email,
                "message": message,
            }
            self.send_email_with_template(subject, context)
            return Response(
                {"success": "Your message has been sent. Thank you!"},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {"error": f"Failed to send email: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def send_email_with_template(self, subject, context):
        html_content = render_to_string("email/email_jumia_project.html", context)
        text_content = strip_tags(html_content)
        email = EmailMultiAlternatives(
            subject=subject,
            body=text_content,
            from_email="pmwassini@gmail.com",
            to=["pminnovest@gmail.com"],
        )
        email.attach_alternative(html_content, "text/html")
        email.send()
