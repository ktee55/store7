from django.urls import path

from .models import BlogDetailPage
from .views import CategoryPostListView, TagPostListView


app_name = 'blog'


urlpatterns = [
  path('category/<str:cat_slug>/', CategoryPostListView.as_view(), name='category-view'),
  path('tag/<str:tag_slug>/', TagPostListView.as_view(), name='tag-view'),
]