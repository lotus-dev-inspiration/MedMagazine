from django.shortcuts import render
from .serialazers import UserSerializer
from rest_framework.views import APIView

class UsersList(APIView):
    