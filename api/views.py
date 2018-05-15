from .serialazers import UserSerializer, ArticleSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.contrib.auth.models import User
from rest_framework import viewsets, mixins, filters, status
from .serialazers import ArticleSerializer, CommentSerializer
from .models import Article, Comment
from rest_framework.decorators import api_view, detail_route, list_route
from rest_framework.response import Response
from rest_framework_jwt.utils import jwt_payload_handler
from rest_framework.pagination import PageNumberPagination
from .models import Profile
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.settings import api_settings

class ArticlesPaginator(PageNumberPagination):
    page_size = 10

class UserViewset(mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.ListModelMixin,
                  viewsets.GenericViewSet):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer
    http_method_names = ['get', 'post', 'head', 'options', 'patch']
    pagination_class = ArticlesPaginator
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({"success": True, "message": "user created"}, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()

    def get_success_headers(self, data):
        try:
            return {'Location': str(data[api_settings.URL_FIELD_NAME])}
        except (TypeError, KeyError):
            return {"success": False, "message": "not created"}



    @detail_route(methods=['get'])
    def articles(self, request, pk=None):

        def get_queryset(queryset):
            author = self.request.query_params.get('author', None)
            theme = self.request.query_params.get('theme', None)
            year = self.request.query_params.get('year', None)
            month = self.request.query_params.get('month', None)
            language = self.request.query_params.get('language', None)
            if author is not None:
                queryset = queryset.filter(author=author)
            if theme is not None:
                queryset = queryset.filter(theme=theme)
            if year is not None:
                queryset = queryset.filter(date__year = year)
            if month is not None:
                queryset = queryset.filter(date__month = month)
            if language is not None:
                queryset = queryset.filter(language = language)
            return queryset

        try:
            profile = Profile.objects.get(pk=pk)
            queryset = profile.articles.all()
            queryset = get_queryset(queryset)
            content = list()

            for article in queryset:
                content.append(ArticleSerializer(article).data)
            page = self.paginate_queryset(queryset)

            if page is not None:
                serializer = ArticleSerializer(page, many=True, context={'request': request})
                return self.get_paginated_response(serializer.data)
            serializer = ArticleSerializer(queryset, many=True, context={'request': request})
            return Response(serializer.data)

        except ObjectDoesNotExist:
            return Response({"success": False, "message": "No profile for this user"})
    
class ArticleViewset(mixins.CreateModelMixin,
                   mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.ListModelMixin,
                   viewsets.GenericViewSet):
    # permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset =  Article.objects.all()
    serializer_class = ArticleSerializer
    http_method_names = ['get', 'post', 'head','options','patch']
    pagination_class = ArticlesPaginator
    filter_backends = (filters.OrderingFilter,)
    ordering = ('date')

    def get_queryset(self):
        queryset = Article.objects.all()
        author = self.request.query_params.get('author', None)
        theme = self.request.query_params.get('theme', None)
        year = self.request.query_params.get('year', None)
        month = self.request.query_params.get('month', None)
        language = self.request.query_params.get('language', None)
        if author is not None:
            queryset = queryset.filter(author=author)
        if theme is not None:
            queryset = queryset.filter(theme=theme)
        if year is not None:
            queryset = queryset.filter(date__year = year)
        if month is not None:
            queryset = queryset.filter(date__month = month)
        if language is not None:
            queryset = queryset.filter(language = language)

        return queryset

        def create(self, request, *args, **kwargs):
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response({"success": True, "message": "article created"}, status=status.HTTP_201_CREATED, headers=headers)

        def perform_create(self, serializer):
            serializer.save()

        def get_success_headers(self, data):
            try:
                return {'Location': str(data[api_settings.URL_FIELD_NAME])}
            except (TypeError, KeyError):
                return {"success": False, "message": "not created"}

class CommentViewset(mixins.CreateModelMixin,
                   mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.ListModelMixin,
                   viewsets.GenericViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    http_method_names = ['get', 'post', 'head', 'options', 'patch']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({"success": True, "message": "comment created"}, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()

    def get_success_headers(self, data):
        try:
            return {'Location': str(data[api_settings.URL_FIELD_NAME])}
        except (TypeError, KeyError):
            return {"success": False, "message": "not created"}

def jwt_response_payload_handler(token, user=None, request=None):
    return {
        'token': token,
        'exp_time': jwt_payload_handler(user)['exp'],
        'user': UserSerializer(user,context={'request': request}).data
    }

@api_view()
def GetUserFromToken(request):
    return Response({'user': UserSerializer(request.user,context={'request': request}).data})
