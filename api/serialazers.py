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
        exclude = ('groups','last_login','date_joined','user_permissions',)

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = User.objects.create_user(**validated_data)
        Profile.objects.create(user=user,**profile_data)
        return user



