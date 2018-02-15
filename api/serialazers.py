from django.contrib.auth.models import User
from .models import Profile
from rest_framework import serializers
from django.http import HttpResponse, Http404

# Serializers define the API representation.
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        exclude = ('id',)



class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        exclude = ('groups','last_login','date_joined','user_permissions','is_superuser','password',)

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = User.objects.create_user(**validated_data)
        Profile.objects.create(user=user,**profile_data)
        return user

    def update(self, instance, validated_data):
        instance.profile.phone = validated_data.get('profile.phone', instance.profile.phone)
        instance.profile.company = validated_data.get('profile.company', instance.profile.company)
        instance.profile.phone = validated_data.get('profile.patronymic', instance.profile.patronymic)
        instance.username = validated_data.get('username', instance.username)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.password = validated_data.get('password', instance.password)
        instance.is_staff = validated_data.get('is_staff', instance.is_staff)
        instance.is_active = validated_data.get('is_staff', instance.is_active)
        instance.save()
        return instance