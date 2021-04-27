from django.shortcuts import render
from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator


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
