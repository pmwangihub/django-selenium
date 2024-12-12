from rest_framework import serializers
from app.user.models import User, Profile


class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = (
            "email",
            "name",
            "password",
            "password2",
        )

    def validate(self, data):
        if data["password"] != data["password2"]:
            raise serializers.ValidationError("Passwords do not match")
        return data

    def create(self, validated_data):
        validated_data.pop("password2")
        user = User.objects.create_user(**validated_data)
        return user


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "name",
            "is_active",
            "is_staff",
            "is_admin",
        )


class ProfileCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ("user", "avatar", "gender", "phone", "address")


class ProfileDetailSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer()

    class Meta:
        model = Profile
        fields = (
            "user",
            "avatar",
            "gender",
            "phone",
            "address",
            "created_at",
            "updated_at",
        )
