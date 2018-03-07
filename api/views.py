from rest_framework import generics, viewsets, mixins
from .serialazers import UserSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAdminUser

class UserViewset(mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.ListModelMixin,
                  viewsets.GenericViewSet):
    permission_classes = (IsAdminUser,)
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer
    http_method_names = ['get', 'post', 'head', 'options', 'patch']
