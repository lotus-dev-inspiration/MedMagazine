from rest_framework import generics, viewsets, mixins
from .serialazers import UserSerializer
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

class ArticleViewset(mixins.CreateModelMixin,
                   mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.ListModelMixin,
                   viewsets.GenericViewSet):

    queryset =  Article.objects.all()
    serializer_class = ArticleSerializer