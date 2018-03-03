from .models import Profile
from rest_framework import serializers
from django.core.exceptions import ObjectDoesNotExist
from .models import Article

# Serializers define the API representation.
class ProfileSerializer(serializers.ModelSerializer):
class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        exclude = ('id',)
        model = Article
        fields = '__all__'



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
        profile_data = validated_data.get('profile')
        instance.profile.patronymic = profile_data['patronymic']
        instance.profile.company = profile_data['company']
        instance.profile.phone = profile_data['phone']
        instance.username = validated_data.get('username', instance.username)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.password = validated_data.get('password', instance.password)
        instance.is_staff = validated_data.get('is_staff', instance.is_staff)
        instance.is_active = validated_data.get('is_active', instance.is_active)
        instance.save()
        return instance

