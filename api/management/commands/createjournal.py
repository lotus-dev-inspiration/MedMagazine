from django.core.management.base import BaseCommand, CommandError
from api.models import Article, Journal, ArticleStatus, ArticleStage

class Command(BaseCommand):
    help = 'Creates journal if there >15 articles exists'

    def handle(self, *args, **options):

        articles = Article.objects.filter(status=6).order_by('-date')
        articles = articles[:15]
        if len(articles) == 15:
            journal = Journal.objects.create_journal(articles)
            stage = ArticleStage.objects.get(pk=4)
            status = ArticleStatus.objects.get(pk=7)
            for article in articles:
                article.stage = stage
                article.status = status
                article.save()
                self.stdout.write('Article %s added' % article.name)
            self.stdout.write('Journal %s created' % journal.name)
        else:
            self.stdout.write('Artciles less then 15 with needed status')
        