from django.contrib.auth.models import User, Group
from .models import Article, Comment, Profile, ArticleStage, ArticleStatus, Journal
from rest_framework import serializers
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from drf_extra_fields.fields import Base64FileField
import PyPDF2, io


# Serializers define the API representation.
class JournalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Journal
        fields = '__all__'

class ArticleStageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticleStage
        fields = '__all__'

class ArticleStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticleStatus
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        required = True

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        exclude = ('id',)
        required = False

class PDFBase64FileField(Base64FileField):
    ALLOWED_TYPES = ['pdf']

    def get_file_extension(self, filename, decoded_file):
        try:
            PyPDF2.PdfFileReader(io.BytesIO(decoded_file))
        except PyPDF2.utils.PdfReadError as e:
            return 'Erorr, try again'
        else:
            return 'pdf'

class ArticleSerializer(serializers.ModelSerializer):
    content = PDFBase64FileField()

    class Meta:
        model = Article
        fields = '__all__'
        read_only_fields = ('reviewers','can_edit', 'stage','date','deleted',)
        required = False

    def create(self, validated_data):
        article = Article.objects.create(**validated_data)
        user = User.objects.get(username=article.author)
        user.profile.articles.add(article.id)
        # reviewers = list(User.objects.filter(groups=1))
        # reviewers.sort(key=lambda reviewer: len(list(reviewer.profile.articles.all())))
        # article.reviewers.set([reviewers[0].id,reviewers[1].id,reviewers[2].id])
        # for user in reviewers[:3]:
        #     user.profile.articles.add(article.id)
        return article

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.theme = validated_data.get('theme', instance.theme)
        instance.description = validated_data.get('description', instance.description)
        instance.content = validated_data.get('content', instance.content)
        instance.language = validated_data.get('language', instance.language)
        instance.udc = validated_data.get('udc', instance.udc)
        instance.key_words = validated_data.get('key_words', instance.key_words)
        instance.collaborators = validated_data.get('collaborators', instance.collaborators)
        instance.number = validated_data.get('number', instance.number)
        if instance.number == 3:
            instance.can_edit = False
        elif instance.number == 4:
            instance.deleted = True
        instance.status = validated_data.get('status', instance.status)
        if instance.status == 4:
            instance.number = 1
            instance.can_edit = True
        instance.save()
        return instance

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        exclude = ('last_login','date_joined','user_permissions','is_superuser',)
        required = False

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        articles = profile_data.pop('articles')
        groups = validated_data.pop('groups')
        user = User.objects.create_user(**validated_data)
        user.groups.set(groups)
        profile = Profile.objects.create(user=user,**profile_data)
        profile.articles.set(articles)
        return user


    def update(self, instance, validated_data):
        profile_data = validated_data.get('profile')
        instance.profile.patronymic = profile_data.get('patronymic', instance.profile.patronymic)
        instance.profile.company = profile_data.get('company', instance.profile.company)
        instance.profile.phone = profile_data.get('phone', instance.profile.phone)
        instance.profile.position = profile_data.get('position', instance.profile.position)
        instance.profile.grade = profile_data.get('grade', instance.profile.grade)
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

