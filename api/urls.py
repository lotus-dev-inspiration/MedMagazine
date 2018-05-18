from django.urls import path
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token
from .views import StagesViewModelViewset,ArticlesViewModelViewset,UserViewset, ArticleViewset, GetUserFromToken, CommentViewset, JournalViewset



router = routers.DefaultRouter()
router.register(r'users', UserViewset, base_name='user')
router.register(r'articles', ArticleViewset, base_name='article')
router.register(r'comments', CommentViewset, base_name='comment')
router.register(r'journals', JournalViewset, base_name='journal')
router.register(r'articleviewmodel', ArticlesViewModelViewset, base_name='model')
router.register(r'stages', StagesViewModelViewset, base_name='stage')

urlpatterns = [

    path('auth/', obtain_jwt_token),
    path('user/', GetUserFromToken)

] + router.urls
