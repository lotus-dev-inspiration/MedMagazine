from rest_framework import viewsets, mixins
from .serialazers import ArticleSerializer
from .models import Article


# class UserViewset(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

class ArticleViewset(mixins.CreateModelMixin,
                   mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.ListModelMixin,
                   viewsets.GenericViewSet):
    queryset =  Article.objects.all()
    serializer_class = ArticleSerializer