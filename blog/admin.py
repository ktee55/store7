
from wagtail.contrib.modeladmin.options import (
  ModelAdmin,
  ModelAdminGroup,
  modeladmin_register,
)
from .models import BlogDetailPage, BlogParentCategory, BlogCategory, BlogAuthor, BlogListingPage, BlogPagination


# class ArticlePostAdmin(ModelAdmin):

#   model = ArticleBlogPage
#   menu_label = "Articles"
#   menu_icon = "folder"
#   # menu_order = 1
#   # add_to_settings_menu = False
#   # exclude_from_explorer = False
#   list_display = ("title", "custom_title", "get_categories", "get_tags", "first_published_at")
#   search_fields = ("title", "custom_title", "content")

#   def get_categories(self, obj):
#     return ",\n".join([category.name for category in obj.categories.all()])

#   def get_tags(self, obj):
#     return ",\n".join([tag.name for tag in obj.tags.all()])


# class VideoPostAdmin(ModelAdmin):

#   model = VideoBlogPage
#   menu_label = "Videos"
#   menu_icon = "folder"
#   list_display = ("title", "custom_title", "get_categories", "get_tags", "first_published_at")
#   search_fields = ("title", "custom_title", "content")

#   def get_categories(self, obj):
#     return ",\n".join([category.name for category in obj.categories.all()])

#   def get_tags(self, obj):
#     return ",\n".join([tag.name for tag in obj.tags.all()])

from django.contrib import admin
admin.site.register(BlogDetailPage)

class BlogPostAdmin(ModelAdmin):

  model = BlogDetailPage
  menu_label = "投稿"
  menu_icon = "folder"
  list_display = ("title", "owner", "get_categories", "get_tags", "first_published_at")
  list_filter = ('categories', 'tags')
  search_fields = ["title"]

  def get_categories(self, obj):
    return ",\n".join([category.name for category in obj.categories.all()])

  def get_tags(self, obj):
    return ",\n".join([tag.name for tag in obj.tags.all()])

class BlogParentCategoryAdmin(ModelAdmin):

  model = BlogParentCategory
  menu_label = "親カテゴリー"
  menu_icon = "list-ul"
  list_display = ["name", "slug"]
  search_fields = ["name"]

class BlogCategoryAdmin(ModelAdmin):

  model = BlogCategory
  menu_label = "カテゴリー"
  menu_icon = "list-ul"
  list_display = ["name", "slug"]
  search_fields = ["name"]

class BlogAuthorAdmin(ModelAdmin):

  model = BlogAuthor
  menu_label = "Blog Author"
  menu_icon = "placeholder"
  list_display = ["name"]
  search_fields = ["name"]

class BlogListAdmin(ModelAdmin):

  model = BlogListingPage
  menu_label = "Blog Top"
  menu_icon = "placeholder"
  list_display = ['title']

class BlogPaginationAdmin(ModelAdmin):

  model = BlogPagination
  menu_label = "ページネーション"
  menu_icon = "cog"
  list_display = ["listing_page", "category_page", "tag_page", "whatsnew_home"]

class BlogAdminGroup(ModelAdminGroup):
    menu_label = "ブログ"
    menu_icon = "folder-open-1"
    menu_order = 300
    items = (BlogPostAdmin, BlogParentCategoryAdmin, BlogCategoryAdmin, BlogAuthorAdmin, BlogListAdmin, BlogPaginationAdmin)

modeladmin_register(BlogAdminGroup)