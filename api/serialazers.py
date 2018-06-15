from django.contrib.auth.models import User
from .models import Article, Comment, Profile, ArticleStage, ArticleStatus, Journal
from rest_framework import serializers
from rest_framework.fields import FileField
import base64
import binascii
from django.utils import six
from django.core.exceptions import ValidationError
from django.core.files.base import ContentFile
import uuid


# Serializers define the API representation.
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

class Base64FieldMixin(object):
    ALLOWED_TYPES = NotImplemented
    INVALID_FILE_MESSAGE = NotImplemented
    INVALID_TYPE_MESSAGE = NotImplemented
    EMPTY_VALUES = (None, '', [], (), {})

    def __init__(self, *args, **kwargs):
        self.represent_in_base64 = kwargs.pop('represent_in_base64', False)
        super(Base64FieldMixin, self).__init__(*args, **kwargs)

    def to_internal_value(self, base64_data):
        # Check if this is a base64 string
        if base64_data in self.EMPTY_VALUES:
            return None

        if isinstance(base64_data, six.string_types):
            # Strip base64 header.
            if ';base64,' in base64_data:
                header, base64_data = base64_data.split(';base64,')

            # Try to decode the file. Return validation error if it fails.
            try:
                decoded_file = base64.b64decode(base64_data)
            except (TypeError, binascii.Error, ValueError):
                raise ValidationError(self.INVALID_FILE_MESSAGE)
            # Generate file name:
            file_name = str(uuid.uuid4())[:12]  # 12 characters are more than enough.
            # Get the file name extension:
            file_extension = self.get_file_extension(file_name, decoded_file, header)
            if file_extension not in self.ALLOWED_TYPES:
                raise ValidationError(self.INVALID_TYPE_MESSAGE)
            complete_file_name = file_name + "." + file_extension
            data = ContentFile(decoded_file, name=complete_file_name)
            return super(Base64FieldMixin, self).to_internal_value(data)
        raise ValidationError(_('This is not an base64 string'))

    def get_file_extension(self, filename, decoded_file, header):
        raise NotImplemented

    def to_representation(self, file):
        if self.represent_in_base64:
            try:
                with open(file.path, 'rb') as f:
                    return base64.b64encode(f.read()).decode()
            except Exception:
                raise IOError("Error encoding file")
        else:
            return super(Base64FieldMixin, self).to_representation(file)

class Base64FileField(Base64FieldMixin, FileField):
    """
    A django-rest-framework field for handling file-uploads through raw post data.
    It uses base64 for en-/decoding the contents of the file.
    """
    ALLOWED_TYPES = NotImplementedError('List allowed file extensions')
    INVALID_FILE_MESSAGE = ("Please upload a valid file.")
    INVALID_TYPE_MESSAGE = ("The type of the file couldn't be determined.")

    def get_file_extension(self, filename, decoded_file, header):
        raise NotImplemented('Implement file validation and return matching extension.')


class MyBase64FileField(Base64FileField):
    ALLOWED_TYPES = ['pdf', 'doc', 'docx']

    def get_file_extension(self, filename, decoded_file, header):
        extension = header
        print(extension)
        if extension in self.ALLOWED_TYPES :
            return extension


class ArticleSerializer(serializers.ModelSerializer):
    content = MyBase64FileField()
    author_full_name = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = '__all__'
        read_only_fields = ('reviewers','can_edit', 'stage','date','deleted',)
        required = False

    def get_author_full_name(self, obj):
        return obj.author.get_full_name()

    def create(self, validated_data):
        article = Article.objects.create(**validated_data)
        user = User.objects.get(username=article.author)
        user.profile.articles.add(article.id)
        editors = User.objects.filter(groups=2)
        for editor in editors:
            editor.profile.articles.add(article.id)
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
        instance.status = validated_data.get('status', instance.status)
        if instance.number == 3:
            instance.can_edit = False
        if instance.number == 4:
            reviewers = User.objects.filter(groups=1)
            for reviewer in reviewers:
                reviewer.profile.articles.remove(instance.id)
            editors = User.objects.filter(groups=2)
            for editor in editors:
                editor.profile.articles.remove(instance.id)
        if instance.status.id == 4:
            editors = User.objects.filter(groups=2)
            for editor in editors:
                editor.profile.articles.remove(instance.id)
            instance.can_edit = True
            instance.stage = ArticleStage.objects.get(pk=2)
            reviewers = list(User.objects.filter(groups=1))
            reviewers.sort(key=lambda reviewer: len(list(reviewer.profile.articles.filter(deleted=False))))
            instance.reviewers.add(reviewers[0].id)
            reviewers[0].profile.articles.add(instance.id)
        if instance.status.id == 3:
            reviewers = User.objects.filter(groups=1)
            for reviewer in reviewers:
                reviewer.profile.articles.remove(instance.id)
            editors = User.objects.filter(groups=2)
            for editor in editors:
                editor.profile.articles.remove(instance.id)
        if instance.status.id == 5:
            reviewers = list(User.objects.filter(groups=1))
            for reviewer in reviewers:
                reviewer.profile.articles.remove(instance.id)
            editors = list(User.objects.filter(groups=2))
            for editor in editors:
                editor.profile.articles.add(instance.id)
            instance.stage = ArticleStage.objects.get(pk=3)
        if instance.status.id == 6:
            editors = list(User.objects.filter(groups=2))
            for editor in editors:
                editor.profile.articles.remove(instance.id)
        instance.save()
        return instance

class JournalSerializer(serializers.ModelSerializer):
    
    articles = serializers.SerializerMethodField('get_articles_list')
    
    class Meta:
        model = Journal
        fields = '__all__'

    def get_articles_list(self,obj):
        return ArticleSerializer(obj.articles.all(),many=True).data

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

