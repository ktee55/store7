
from wagtail.contrib.modeladmin.options import (
  ModelAdmin,
  ModelAdminGroup,
  modeladmin_register,
)
from .models import ItemParentCategory, ItemCategory, ItemDetailPage, ItemListingPage


class ItemDetailAdmin(ModelAdmin):

  model = ItemDetailPage
  menu_label = "商品一覧/編集/追加"
  menu_icon = "folder"
  list_display = ("title", "price", "discount_price", "get_item_categories", "get_item_tags", "stock", "pickup", "featured", "live")
  search_fields = ("title", "get_item_categories", "get_item_tags")

  def get_item_categories(self, obj):
    return ",\n".join([category.name for category in obj.categories.all()])

  def get_item_tags(self, obj):
    return ",\n".join([tag.name for tag in obj.tags.all()])


class ItemParentCategoryAdmin(ModelAdmin):

  model = ItemParentCategory
  menu_label = "親カテゴリー"
  menu_icon = "list-ul"
  list_display = ["name", "slug"]
  search_fields = ["name"]


class ItemCategoryAdmin(ModelAdmin):

  model = ItemCategory
  menu_label = "カテゴリー"
  menu_icon = "list-ul"
  list_display = ("name", "slug", "parent")
  search_fields = ["name"]


class ItemListAdmin(ModelAdmin):

  model = ItemListingPage
  menu_label = "商品一覧ページ"
  menu_icon = "placeholder"
  list_display = ['title']


class ItemAdminGroup(ModelAdminGroup):
    menu_label = "商品管理"
    menu_icon = "folder-open-1"
    menu_order = 290
    items = (ItemDetailAdmin, ItemCategoryAdmin, ItemParentCategoryAdmin, ItemListAdmin)

modeladmin_register(ItemAdminGroup)