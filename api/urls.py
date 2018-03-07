from django.urls import path
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token



router = routers.DefaultRouter()

urlpatterns = [

    path('auth/', obtain_jwt_token),

] + router.urls
