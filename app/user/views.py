from django.views import View
from django.shortcuts import render, redirect
from django.urls import reverse
from django.core.mail import send_mail
from django.contrib.auth import login as auth_login, authenticate
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.contrib.auth.tokens import default_token_generator as token_generator
from django.contrib.auth import get_user_model

from app.user.forms import SignupForm, LoginForm as AuthenticationForm

User = get_user_model()


class RegisterView(View):
    template_name = "registration/register.html"

    def get(self, request, *args, **kwargs):
        form = SignupForm()
        return render(request, self.template_name, {"form": form})

    def post(self, request, *args, **kwargs):
        form = SignupForm(request.POST, request.FILES)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = False
            user.save()
            self.send_confirmation_email(request, user)
            return redirect("registration_complete")
        return render(request, self.template_name, {"form": form})

    def send_confirmation_email(self, request, user):
        current_site = get_current_site(request)
        mail_subject = "Activate your account."
        message = render_to_string(
            "registration/activation_email.html",
            {
                "user": user,
                "domain": current_site.domain,
                "uid": urlsafe_base64_encode(force_bytes(user.pk)),
                "token": token_generator.make_token(user),
            },
        )
        send_mail(mail_subject, message, "noreply@yourdomain.com", [user.email])


class LoginView(View):
    template_name = "registration/login.html"

    def get(self, request, *args, **kwargs):
        form = AuthenticationForm()
        return render(request, self.template_name, {"form": form})

    def post(self, request, *args, **kwargs):
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            email = form.cleaned_data.get("username")
            user = User.objects.get(email=email)
            self.send_confirmation_email(request, user)
            return redirect("login_confirmation")
        return render(request, self.template_name, {"form": form})

    def send_confirmation_email(self, request, user):
        current_site = get_current_site(request)
        mail_subject = "Login confirmation."
        message = render_to_string(
            "registration/login_confirmation_email.html",
            {
                "user": user,
                "domain": current_site.domain,
                "uid": urlsafe_base64_encode(force_bytes(user.pk)),
                "token": token_generator.make_token(user),
            },
        )
        send_mail(mail_subject, message, "noreply@yourdomain.com", [user.email])


class ConfirmLoginView(View):
    def get(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            auth_login(request, user)
            return redirect("home")
        else:
            return render(request, "registration/login_invalid.html")
