
from wagtail.contrib.modeladmin.options import (
  ModelAdmin,
  ModelAdminGroup,
  modeladmin_register,
)
from .models import ItemParentCategory, ItemCategory, ItemDetailPage, ItemListingPage, Order, OrderInfo

from django.contrib import admin
admin.site.register(Order)


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

class OrderInfoAdmin(ModelAdmin):

  model = OrderInfo
  menu_label = "注文関連設定"
  menu_icon = "folder"
  menu_order = 500
  add_to_settings_menu = False
  exclude_from_explorer = False
  list_display = ("free_shippment_line", "shipping_fee", "order_history_paginate_by", "order_list_paginate_by")
  # search_fields = ()

modeladmin_register(ItemAdminGroup)
modeladmin_register(OrderInfoAdmin)