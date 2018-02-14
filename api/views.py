from rest_framework import generics, viewsets
from .serialazers import UserSerializer
from .models import Profile
from django.contrib.auth.models import User
from rest_framework.response import Response
from django.shortcuts import get_object_or_404


class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    
        
   
    
    

