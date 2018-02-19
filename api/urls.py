from django.urls import path, include
from rest_framework import routers
from .views import ArticleViewset

router = routers.DefaultRouter()
router.register(r'articles', ArticleViewset, base_name='article')
urlpatterns = router.urls

