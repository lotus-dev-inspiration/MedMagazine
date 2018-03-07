from django.urls import path
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token
from .views import UserViewset


router = routers.DefaultRouter()
router.register(r'users', UserViewset, base_name='user')

urlpatterns = [

    path('auth/', obtain_jwt_token),

] + router.urls
