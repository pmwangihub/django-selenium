from django.contrib.auth.models import AbstractBaseUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.mail import send_mail
from django.conf.urls.static import static

from app.user.managers import UserManager


class User(AbstractBaseUser):
    username = None
    email = models.EmailField(
        verbose_name="email address",
        max_length=255,
        unique=True,
        blank=False,
        null=False,
    )
    name = models.CharField(
        max_length=100,
        verbose_name="Name",
        blank=True,
        null=True,
    )
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)  # a admin user; non super-user
    is_admin = models.BooleanField(default=False)  # a superuser

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return f"{self.email}"

    def get_short_name(self):
        return f"{self.email}"

    def email_user(self, subject, message, from_email=None, **kwargs):
        """
        Takes parameters subject, message, from_email
        """
        send_mail(subject, message, from_email, [self.email], **kwargs)

    @property
    def get_full_name(self):
        return f"{self.name}"

    def has_perm(self, perm, obj=None):
        """Does the user have a specific permission?"""
        return True

    def has_module_perms(self, app_label):
        """Does the user have permissions to view the app `app_label`?"""
        return True


class GenderChoice(models.TextChoices):
    SELECT = "s", "Select"
    MALE = "m", "Male"
    FEMALE = "f", "Female"


class Profile(models.Model):
    GENDER = GenderChoice.choices
    user = models.OneToOneField(User, related_name="profile", on_delete=models.CASCADE)

    avatar = models.ImageField(
        upload_to="media/profiles/avatars/", null=True, blank=True
    )
    gender = models.CharField(
        choices=GenderChoice.choices, max_length=1, default=GenderChoice.SELECT
    )

    phone = models.CharField(max_length=32, null=True, blank=True)

    address = models.CharField(
        max_length=50,
        null=True,
        blank=True,
        help_text="Include your city or your area.",
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.user.email)

    @property
    def get_avatar(self):
        return self.avatar.url if self.avatar else static("assets/img/team/default.png")
