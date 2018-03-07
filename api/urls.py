from django.urls import path
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token
from .views import UserViewset, ArticleViewset



router = routers.DefaultRouter()
router.register(r'users', UserViewset, base_name='user')
router.register(r'articles', ArticleViewset, base_name='article')



urlpatterns = [

    path('auth/', obtain_jwt_token),

] + router.urls
