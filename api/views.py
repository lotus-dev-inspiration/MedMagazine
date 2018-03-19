from .serialazers import UserSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.contrib.auth.models import User
from rest_framework import viewsets, mixins
from .serialazers import ArticleSerializer
from .models import Article


class UserViewset(mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.ListModelMixin,
                  viewsets.GenericViewSet):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer
    http_method_names = ['get', 'post', 'head', 'options', 'patch']

class ArticleViewset(mixins.CreateModelMixin,
                   mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.ListModelMixin,
                   viewsets.GenericViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset =  Article.objects.all()
    serializer_class = ArticleSerializer
    http_method_names = ['get', 'post', 'head','options','patch']