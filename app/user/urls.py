from django.urls import path
from django.views.generic import TemplateView
from app.user.views import RegisterView, LoginView, ConfirmLoginView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('confirm_login/<uidb64>/<token>/', ConfirmLoginView.as_view(), name='confirm_login'),
    path('registration_complete/', TemplateView.as_view(template_name="registration/registration_complete.html"), name='registration_complete'),
    path('login_confirmation/', TemplateView.as_view(template_name="registration/login_confirmation.html"), name='login_confirmation'),
]
