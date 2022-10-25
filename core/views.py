from django.shortcuts import render
from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator

# from django.urls import reverse
# from django.utils.translation import gettext_lazy as _

# from wagtail.core import hooks
# from wagtail.admin.wagtail_hooks import ExplorerMenuItem

# def paginate(request, all_posts, count):
#     paginator = Paginator(all_posts, count)

#     page = request.GET.get("page")
#     try:
#         posts = paginator.page(page)
#     except PageNotAnInteger:
#         posts = paginator.page(1)
#     except EmptyPage:
#         posts = paginator.page(page.num_pages)
    
#     return posts

def paginate(request, all_items, count):
    paginator = Paginator(all_items, count)

    page = request.GET.get("page")
    try:
        items = paginator.page(page)
    except PageNotAnInteger:
        items = paginator.page(1)
    except EmptyPage:
        items = paginator.page(page.num_pages)
    
    return items


# @hooks.register('register_admin_menu_item')
# def register_explorer_menu_item():
#     return ExplorerMenuItem(
#         _('Explorer'), reverse('wagtailadmin_explore_root'),
#         name='explorer',
#         icon_name='folder-open-inverse',
#         order=100)
