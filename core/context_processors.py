#### Settings.pyに'wagtail.contrib.settings'と'wagtail.contrib.settings.context_processors.settings'を追加 ###

from store.models import ItemCategory, ItemParentCategory, TaggedItem
# from taggit.models import Tag
# from django.db.models import Count


def global_val(request):
    # archives = Post.objects.filter(draft=False).values(
    #     'date_posted__year', 'date_posted__month').annotate(Count('id')).order_by()

    return {
        # 'latest_posts': Post.objects.filter(draft=False).order_by('-date_posted')[:5],
        # 'drafts': Post.objects.filter(draft=True).order_by('-date_posted'),
        # 'categories': Category.objects.all(),
        # 'post_categories': Category.objects.annotate(num_posts=Count('posts')).order_by('-num_posts'),
        # # 'tags': Tag.objects.all(),
        # 'post_tags': Tag.objects.annotate(num_posts=Count('posts')).order_by('-num_posts'),
        # 'archives': archives
        
        "item_categories": ItemCategory.objects.filter(parent__isnull=True),
        "item_parent_categories": ItemParentCategory.objects.all(),
        # "tags": Tag.objects.all()
        "tagged_items": TaggedItem.objects.all()
    }
