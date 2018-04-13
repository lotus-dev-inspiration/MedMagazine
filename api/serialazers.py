from .models import Profile
from django.contrib.auth.models import User, Group
from rest_framework import serializers
from django.core.exceptions import ObjectDoesNotExist
from .models import Article, Comment

# Serializers define the API representation.
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        exclude = ('id',)
        required = False


        
class ArticleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Article
        fields = '__all__'
        required = False


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        exclude = ('last_login','date_joined','user_permissions','is_superuser',)
        required = False

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        groups = validated_data.pop('groups')
        user = User.objects.create_user(**validated_data)
        user.groups.set(groups)
        articles = profile_data.pop('articles')
        profile = Profile.objects.create(user=user,**profile_data)
        profile.articles.set(articles)
        return user

    def update(self, instance, validated_data):
        profile_data = validated_data.get('profile')
        instance.profile.patronymic = profile_data.get('patronymic', instance.profile.patronymic)
        instance.profile.company = profile_data.get('company', instance.profile.company)
        instance.profile.phone = profile_data.get('phone', instance.profile.phone)
        instance.profile.articles.set(validated_data.get('articles', instance.profile.articles))
        instance.username = validated_data.get('username', instance.username)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.password = validated_data.get('password', instance.password)
        instance.is_staff = validated_data.get('is_staff', instance.is_staff)
        instance.is_active = validated_data.get('is_active', instance.is_active)
        instance.groups.set(validated_data.get('groups', instance.groups))
        instance.save()
        return instance

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        required = True

