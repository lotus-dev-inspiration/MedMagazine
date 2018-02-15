from rest_framework import generics, viewsets
from .serialazers import UserSerializer
from django.contrib.auth.models import User

class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
