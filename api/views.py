from .serialazers import UserSerializer, ArticleSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.contrib.auth.models import User
from rest_framework import viewsets, mixins, filters, status
from .serialazers import ArticleSerializer, CommentSerializer, ArticleStageSerializer, ArticleStatusSerializer, CollaboratorSerializer, JournalSerializer
from .models import Article, Comment, ArticleStage, Collaborator, ArticleStatus, Journal
from rest_framework.decorators import api_view, detail_route, list_route
from rest_framework.response import Response
from rest_framework_jwt.utils import jwt_payload_handler
from .models import Profile
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.settings import api_settings


class JournalViewset(mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.ListModelMixin,
                  viewsets.GenericViewSet):
    queryset = Journal.objects.all()
    serializer_class = JournalSerializer
    http_method_names = ['get', 'post', 'head', 'options', 'patch']
    filter_backends = (filters.OrderingFilter,)
    ordering_fields = ('date', 'theme')

    #Filtering
    def get_queryset(self):
        queryset = Journal.objects.all()
        year = self.request.query_params.get('year', None)
        month = self.request.query_params.get('month', None)
        if year is not None:
            queryset = queryset.filter(date__year = year)
        if month is not None:
            queryset = queryset.filter(date__month = month)
        return queryset

class CollaboratorViewset(mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.ListModelMixin,
                  viewsets.GenericViewSet):
    queryset = Collaborator.objects.all()
    serializer_class = CollaboratorSerializer
    http_method_names = ['get', 'post', 'head', 'options', 'patch']

class StagesViewset(mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.ListModelMixin,
                  viewsets.GenericViewSet):
    queryset = ArticleStage.objects.all()
    serializer_class = ArticleStageSerializer
    http_method_names = ['get', 'post', 'head', 'options', 'patch']

class UserViewset(mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.ListModelMixin,
                  viewsets.GenericViewSet):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer
    http_method_names = ['get', 'post', 'head', 'options', 'patch']
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({"success": True, "message": "user created"}, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()

    def get_success_headers(self, data):
        try:
            return {'Location': str(data[api_settings.URL_FIELD_NAME])}
        except (TypeError, KeyError):
            return {"success": False, "message": "not created"}



    @detail_route(methods=['get'])
    def articles(self, request, pk=None):
        try:
            profile = Profile.objects.get(pk=pk)
            queryset = profile.articles.all()
            content = list()

            for article in queryset:
                content.append(ArticleSerializer(article).data)

            serializer = ArticleSerializer(queryset, many=True, context={'request': request})
            return Response(serializer.data)

        except ObjectDoesNotExist:
            return Response({"success": False, "message": "No profile for this user"})
    
class ArticleViewset(mixins.CreateModelMixin,
                   mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.ListModelMixin,
                   viewsets.GenericViewSet):
    # permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset =  Article.objects.all()
    serializer_class = ArticleSerializer
    http_method_names = ['get', 'post', 'head','options','patch']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({"success": True, "message": "article created"}, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()

    def get_success_headers(self, data):
        try:
            return {'Location': str(data[api_settings.URL_FIELD_NAME])}
        except (TypeError, KeyError):
            return {"success": False, "message": "not created"}


class CommentViewset(mixins.CreateModelMixin,
                   mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.ListModelMixin,
                   viewsets.GenericViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    http_method_names = ['get', 'post', 'head', 'options', 'patch']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({"success": True, "message": "comment created"}, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()

    def get_success_headers(self, data):
        try:
            return {'Location': str(data[api_settings.URL_FIELD_NAME])}
        except (TypeError, KeyError):
            return {"success": False, "message": "not created"}

def jwt_response_payload_handler(token, user=None, request=None):
    return {
        'token': token,
        'exp_time': jwt_payload_handler(user)['exp'],
        'user': UserSerializer(user,context={'request': request}).data
    }

@api_view()
def GetUserFromToken(request):
    return Response({'user': UserSerializer(request.user,context={'request': request}).data})

class ArticlesViewModelViewset(mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.ListModelMixin,
                  viewsets.GenericViewSet):

    http_method_names = ['get', 'head', 'options']
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        collabs_list = []
        article = self.get_serializer(instance).data
        collaborators = [coll for coll in article['collaborators']]
        for colab in collaborators:
             collabs_list.append(CollaboratorSerializer(Collaborator.objects.get(pk=colab)).data)
        status = ArticleStatusSerializer(ArticleStatus.objects.get(pk=article['status'])).data
        author = UserSerializer(User.objects.get(pk=article['author'])).data
        return Response({'article': article, 'collaborators': collabs_list,'status': status, 'author': author})

class StagesViewModelViewset(mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.ListModelMixin,
                  viewsets.GenericViewSet):

    http_method_names = ['get', 'head', 'options']
    queryset = ArticleStage.objects.all()
    serializer_class = ArticleStageSerializer
    
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        stages = self.get_serializer(queryset, many=True)
        statuses = []
        for stage in stages.data:
            for status in stage['statuses_id']:
                statuses.append(ArticleStatusSerializer(ArticleStatus.objects.get(pk=status)).data)
        return Response({'stages': stages.data, 'statuses': statuses})