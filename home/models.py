
from wagtail.core.models import Page
# from wagtail.contrib.routable_page.models import RoutablePageMixin, route

from store.models import ItemDetailPage
from blog.models import BlogDetailPage, BlogPagination


class HomePage(Page):

  template = "home/home_page.html"
  max_count = 1

  def get_context(self, request, *args, **kwargs):
    if BlogPagination.objects.first():
      pagination = BlogPagination.objects.first().whatsnew_home
    else:
      pagination = 3
    context = super().get_context(request, *args, **kwargs)
    context["items"] = ItemDetailPage.objects.live().public().filter(featured=True).order_by('?')[:12]
    context["pickup_item"] = ItemDetailPage.objects.live().public().filter(pickup=True).order_by('-id').last()
    # context["pickup_item"] = ItemDetailPage.objects.live().public().filter(pickup=True).exclude(stock=0).order_by('-id').last()
    context["posts"] = BlogDetailPage.objects.filter(draft=False, whatsnew=True).order_by('-first_published_at')[:pagination]

    return context
