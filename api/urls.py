from django.urls import path
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token
from .views import StagesViewModelViewset,ArticlesViewModelViewset,UserViewset, ArticleViewset, GetUserFromToken, CommentViewset, CollaboratorViewset, StagesViewset, JournalViewset



router = routers.DefaultRouter()
router.register(r'users', UserViewset, base_name='user')
router.register(r'articles', ArticleViewset, base_name='article')
router.register(r'comments', CommentViewset, base_name='comment')
router.register(r'collaborators', CollaboratorViewset, base_name='collaborator')
router.register(r'stages', StagesViewset, base_name='stage')
router.register(r'journals', JournalViewset, base_name='journal')
router.register(r'articleviewmodel', ArticlesViewModelViewset, base_name='model')
router.register(r'stageviewmodel', StagesViewModelViewset, base_name='model')


urlpatterns = [

    path('auth/', obtain_jwt_token),
    path('user/', GetUserFromToken)

] + router.urls
