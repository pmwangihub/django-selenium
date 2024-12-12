from django.db import transaction
from django.contrib.auth import login, authenticate, logout
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from rest_framework import generics, permissions
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_202_ACCEPTED,
    HTTP_404_NOT_FOUND,
    HTTP_403_FORBIDDEN,
    HTTP_401_UNAUTHORIZED,
)
from rest_framework.response import Response
from rest_framework.views import APIView
from app.user.models import User, Profile
from app.user.api.serializers import (
    UserDetailSerializer,
    ProfileCreateSerializer,
    ProfileDetailSerializer,
)


@method_decorator(csrf_exempt, name="dispatch")
class UserCreateAPIView(APIView):
    serializer_class = UserDetailSerializer
    permission_classes = [permissions.AllowAny]

    def check_password_or_data(self, request):
        password = request.data.get("password")
        password2 = request.data.get("password2")
        if password != password2:
            err = "Account creation failed, check your passwords"
            return self.bad_request(err)
        return request.data

    def bad_request(self, error="Unknown"):
        return Response(
            {
                "details": f"""
                                Account creation failed. Please try again later. \n
                                Error: {str(error)}
                            """,
            },
            status=HTTP_403_FORBIDDEN,
        )

    def post(self, request, *args, **kwargs):
        data = self.check_password_or_data(request)
        # Instead of using transaction.atomic(),
        # preferably use Celery to handle concurrent transactions.
        try:
            with transaction.atomic():
                data.pop("password2")
                try:
                    user = User.objects.create_user(**data)
                except Exception as e:
                    return self.bad_request(e)
        except Exception as e:
            return self.bad_request(e)
        return Response(
            {
                "isAuthenticated": True,
                "details": {
                    "user": self.serializer_class(instance=user).data,
                    "message": "Account created successfully",
                },
            },
            status=HTTP_201_CREATED,
        )


@method_decorator(csrf_exempt, name="dispatch")
class AccountDeleteAPIView(APIView):
    serializer_class = UserDetailSerializer
    permission_classes = [permissions.IsAuthenticated]

    def check_user(self, user=None):
        if self.request.user and self.request.user.is_authenticated:
            return self.request.user
        try:
            user = User.objects.get(email=user)
        except Exception:
            user = None
        return user

    def post(self, request, *args, **kwargs):
        email = request.data.get("email", None) or None
        user = self.check_user(user=email)

        if user:
            serializer = self.serializer_class(instance=user)
            # user.delete()
            return Response(
                {
                    "user": serializer.data,
                    "message": "Account deleted",
                },
                status=HTTP_202_ACCEPTED,
            )
        return Response(
            {
                "details": f"Account deletion failed. User with that account not found!",
            },
            status=HTTP_404_NOT_FOUND,
        )


@method_decorator(csrf_exempt, name="dispatch")
class CheckAuthAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        user = request.user
        if user.is_authenticated:
            user = UserDetailSerializer(instance=user).data
            return Response(
                {
                    "isAuthenticated": True,
                    "details": {
                        "user": user,
                        "message": "Already authenticated",
                    },
                },
                status=HTTP_200_OK,
            )
        return Response(
            {
                "isAuthenticated": False,
                "details": {
                    "user": None,
                    "message": "Not authenticated",
                },
            },
            status=HTTP_404_NOT_FOUND,
        )

    def post(self, request, *args, **kwargs):
        user = User.objects.all().first()
        serializer = UserDetailSerializer(user)
        return Response(
            {
                "isAuthenticated": True,
                "details": {
                    "user": serializer.data,
                    "message": "Already authenticated",
                },
            },
            status=HTTP_200_OK,
        )


@method_decorator(csrf_exempt, name="dispatch")
class UserLoginAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = UserDetailSerializer

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            user = UserDetailSerializer(instance=request.user).data
            return Response(
                {
                    "isAuthenticated": True,
                    "details": {
                        "user": user,
                        "message": "Already authenticated",
                    },
                },
                status=HTTP_200_OK,
            )
        return Response(
            {
                "isAuthenticated": False,
                "details": {
                    "user": None,
                    "message": "Not authenticated",
                },
            },
            status=HTTP_404_NOT_FOUND,
        )

    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(email=email, password=password)

        if user is not None:
            login(request, user)
            data = UserDetailSerializer(instance=request.user).data
            return Response(
                {
                    "isAuthenticated": True,
                    "details": {
                        "user": data,
                        "message": "Login successful",
                    },
                },
                status=HTTP_200_OK,
            )
        return Response(
            {
                "isAuthenticated": False,
                "details": {
                    "user": None,
                    "message": "Authentication failed, check your credentials",
                },
            },
            status=HTTP_401_UNAUTHORIZED,
        )


@method_decorator(csrf_exempt, name="dispatch")
class UserLogoutAPIView(APIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get(self, request, *args, **kwargs):
        logout(request)
        return Response(
            {
                "isAuthenticated": False,
                "details": {
                    "message": "Successfully logged out",
                },
            },
            status=HTTP_200_OK,
        )


class UserDetailAPIView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    permission_classes = [permissions.IsAuthenticated]


class ProfileCreateAPIView(generics.CreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileCreateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ProfileDetailAPIView(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileDetailSerializer
    permission_classes = [permissions.IsAuthenticated]
