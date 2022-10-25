from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator
from django.template.response import TemplateResponse
from django.shortcuts import redirect, render

from wagtail.core.models import Page
from wagtail.search.models import Query

# from .forms import SearchForm
from store.models import ItemDetailPage


def search(request):
    search_query = request.GET.get('query', None)
    page = request.GET.get('page', 1)

    # Search
    if search_query:
        search_results = ItemDetailPage.objects.live().search(search_query)
        query = Query.get(search_query)

        # Record hit
        query.add_hit()
    else:
        search_results = Page.objects.none()

    # Pagination
    paginator = Paginator(search_results, 10)
    try:
        search_results = paginator.page(page)
    except PageNotAnInteger:
        search_results = paginator.page(1)
    except EmptyPage:
        search_results = paginator.page(paginator.num_pages)

    return TemplateResponse(request, 'search/search.html', {
        'search_query': search_query,
        'search_results': search_results,
    })

# def search_results(request):
#   # if form.is_valid():
#   #     qurey = form.cleaned_data.get('color_option')
#   #     size = form.cleaned_data.get('size_option')

#   # return redirect(request.META['HTTP_REFERER'])
#   # return render(request, 'store/shopping-cart.html')
#   return redirect('/search/?query=test')