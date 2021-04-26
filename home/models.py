
from wagtail.core.models import Page
# from wagtail.contrib.routable_page.models import RoutablePageMixin, route

from store.models import ItemDetailPage


class HomePage(Page):

  template = "home/home_page.html"
  max_count = 1

  def get_context(self, request, *args, **kwargs):
    context = super().get_context(request, *args, **kwargs)
    context["items"] = ItemDetailPage.objects.live().public().filter(featured=True).order_by('?')[:12]
    context["pickup_item"] = ItemDetailPage.objects.live().public().filter(
        pickup=True).order_by('-id').first()
    # context["posts"] = Post.objects.filter(draft=False, whatsnew=True).order_by('-date_posted')[:2]

    return context
