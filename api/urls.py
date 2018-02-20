from django.urls import path
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token
from .views import SimpleView


router = routers.DefaultRouter()

urlpatterns = [

    path('auth/', obtain_jwt_token),
    path('view/', SimpleView)

] + router.urls
