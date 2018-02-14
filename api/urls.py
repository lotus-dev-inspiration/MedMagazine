from django.urls import path, include
from rest_framework import routers
from .views import UserViewset, UserViewset

router = routers.DefaultRouter()
router.register(r'users', UserViewset, base_name='user')


urlpatterns = router.urls

