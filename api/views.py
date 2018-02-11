from rest_framework import generics, viewsets
from django.contrib.auth.models import User
from .serialazers import UserSerializer

class userList(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
