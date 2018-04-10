from .serialazers import UserSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.contrib.auth.models import User
from rest_framework import viewsets, mixins
from .serialazers import ArticleSerializer
from .models import Article
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_jwt.utils import jwt_payload_handler


class UserViewset(mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.ListModelMixin,
                  viewsets.GenericViewSet):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer
    http_method_names = ['get', 'post', 'head', 'options', 'patch']

class ArticleViewset(mixins.CreateModelMixin,
                   mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.ListModelMixin,
                   viewsets.GenericViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset =  Article.objects.all()
    serializer_class = ArticleSerializer
    http_method_names = ['get', 'post', 'head','options','patch']

def jwt_response_payload_handler(token, user=None, request=None):
    return {
        'token': token,
        'exp_time': jwt_payload_handler(user)['exp'],
        'user': UserSerializer(user,context={'request': request}).data
    }

@api_view()
def GetUserFromToken(request):
    return Response({'user': UserSerializer(request.user,context={'request': request}).data})
