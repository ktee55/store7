from django.contrib import messages
from django.shortcuts import render, redirect, get_object_or_404
from django.views.generic import ListView
from taggit.models import Tag

from .models import BlogDetailPage, BlogCategory

class CategoryPostListView(ListView):
    model = BlogDetailPage
    template_name = 'blog/blog_listing_page.html'
    context_object_name = 'posts'
    paginate_by = 1

    def get_queryset(self):
      # try:
      #     category = BlogCategory.objects.get(slug=self.kwargs.get('cat_slug'))
      # except Exception:
      #     messages.error(self.request, "指定されたカテゴリーは存在しませんでした。")
      #     return redirect('/blog/')
      category = get_object_or_404(BlogCategory, slug=self.kwargs.get('cat_slug'))
      
      # return BlogDetailPage.objects.live().public().order_by('-first_published_at').filter(categories__in=[category])
      return category.posts.live().public().order_by('-first_published_at')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["category"] = get_object_or_404(BlogCategory, slug=self.kwargs.get('cat_slug'))

        return context


class TagPostListView(ListView):
    model = BlogDetailPage
    template_name = 'blog/blog_listing_page.html'
    context_object_name = 'posts'
    paginate_by = 1

    def get_queryset(self):
      # try:
      #     tag = Tag.objects.get(slug=self.kwargs.get('tag_slug'))
      # except Exception:
      #     messages.error(self.request, "指定されたタグは存在しませんでした。")
      #     return redirect('/blog/')
      tag = get_object_or_404(Tag, slug=self.kwargs.get('tag_slug'))
      
      return BlogDetailPage.objects.live().public().order_by('-first_published_at').filter(tags__in=[tag])

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["tag"] = get_object_or_404(Tag, slug=self.kwargs.get('tag_slug'))

        return context


