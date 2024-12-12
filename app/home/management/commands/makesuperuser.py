from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from django.utils.crypto import get_random_string

User = get_user_model()


class Command(BaseCommand):
    def handle(self, *args, **options):
        # Dubious
        email = "admin@example.com"
        try:
            u = None
            if (
                not User.objects.filter(email=email).exists()
                and not User.objects.filter(is_superuser=True).exists()
            ):
                print("admin user not found, creating one")
                new_password = get_random_string(10)
                u = User.objects.create_superuser(email, new_password)
                print(f"===================================")
                print(
                    f"A superuser '{email}' was created and password '{new_password}'"
                )
                print(f"===================================")
            else:
                print("\n Admin user found. Skipping super user creation \n ")
            print(u)
        except Exception as e:
            print(f"\n There was an error: {e}\n")
