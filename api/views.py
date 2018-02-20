from rest_framework import generics, viewsets
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.permissions import IsAuthenticated


def SimpleView(request):
    if IsAuthenticated():
        return HttpResponse('OKEY')
    else:
        return HttpResponse("Not Auth")