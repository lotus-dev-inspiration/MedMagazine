from .serialazers import UserSerializer, ArticleSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.contrib.auth.models import User
from rest_framework import viewsets, mixins
from .serialazers import ArticleSerializer, CommentSerializer
from .models import Article, Comment
from rest_framework.decorators import api_view, detail_route
from rest_framework.response import Response
from rest_framework_jwt.utils import jwt_payload_handler
from rest_framework.pagination import PageNumberPagination
from .models import Profile
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import filters


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

    @detail_route(methods=['get'])
    def articles(self, request, pk=None):
        try:
            profile = Profile.objects.get(pk=pk)
            articles = profile.articles.all()
            content = list()
            for article in articles:
                content.append(ArticleSerializer(article).data)
            page = self.paginate_queryset(articles)
            if page is not None:
                serializer = ArticleSerializer(page, many=True, context={'request': request})
                return self.get_paginated_response(serializer.data)
            serializer = ArticleSerializer(articles, many=True, context={'request': request})
            return Response(serializer.data)
        except ObjectDoesNotExist:
            return Response({"Succes": False, "message": "No profile for this user"})

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

class CommentViewset(mixins.CreateModelMixin,
                   mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.ListModelMixin,
                   viewsets.GenericViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    http_method_names = ['get', 'post', 'head', 'options', 'patch']

def jwt_response_payload_handler(token, user=None, request=None):
    return {
        'token': token,
        'exp_time': jwt_payload_handler(user)['exp'],
        'user': UserSerializer(user,context={'request': request}).data
    }

@api_view()
def GetUserFromToken(request):
    return Response({'user': UserSerializer(request.user,context={'request': request}).data})
