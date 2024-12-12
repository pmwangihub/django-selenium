from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.core.exceptions import ValidationError
from app.user.models import User, Profile


class SignupForm(UserCreationForm):
    email = forms.EmailField(max_length=255, required=True, widget=forms.EmailInput())
    name = forms.CharField(max_length=100, required=False, widget=forms.TextInput())
    password1 = forms.CharField(
        label="Password", widget=forms.PasswordInput(), required=True
    )
    password2 = forms.CharField(
        label="Confirm Password", widget=forms.PasswordInput(), required=True
    )

    class Meta:
        model = User
        fields = ("email", "name", "password1", "password2")

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        user = super(SignupForm, self).save(commit=False)
        user.email = self.cleaned_data["email"]
        user.name = self.cleaned_data.get("name", "")
        user.set_password(self.cleaned_data["password1"])
        return user


class LoginForm(AuthenticationForm):
    username = forms.EmailField(
        label="Email", max_length=255, required=True, widget=forms.EmailInput()
    )
    password = forms.CharField(
        label="Password", widget=forms.PasswordInput(), required=True
    )

    class Meta:
        model = User
        fields = ("username", "password")

    def clean_password(self):
        password = self.cleaned_data.get("password")
        if not password:
            raise ValidationError("Password is required")
        return password
