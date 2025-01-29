#### Settings.pyに'wagtail.contrib.settings'と'wagtail.contrib.settings.context_processors.settings'を追加 ###
from django.db.models import Count
from search.forms import SearchForm

from store.models import ItemCategory, ItemParentCategory, TaggedItem
from blog.models import BlogDetailPage, BlogCategory, BlogParentCategory, TaggedPost
from taggit.models import Tag
# from django.db.models import Count

# from search.forms import SearchForm


def global_val(request):
    # archives = BlogDetailPage.objects.filter(draft=False).values(
    archives = BlogDetailPage.objects.live().values(
        'first_published_at__year', 'first_published_at__month').annotate(Count('id')).order_by('-first_published_at__month')

    return {
        "item_categories": ItemCategory.objects.filter(parent__isnull=True),
        "item_parent_categories": ItemParentCategory.objects.all(),
        # "tags": Tag.objects.all()
        "tagged_items": TaggedItem.objects.all(),

        "latest_posts": BlogDetailPage.objects.live().public().order_by('-first_published_at'),
        "draft_posts": BlogDetailPage.objects.not_live(),
        # 'blog_categories': BlogCategory.objects.all(),
        "blog_categories": BlogCategory.objects.annotate(num_posts=Count('posts')).order_by('-num_posts'),
        # 'post_tags': Tag.objects.annotate(num_posts=Count('posts')).order_by('-num_posts'),
        # 'post_tags': Tag.objects.all(),
        "tagged_posts": TaggedPost.objects.all(),
        # "search_form": SearchForm,

        "archives": archives
    }
