
from wagtail.contrib.modeladmin.options import (
  ModelAdmin,
  ModelAdminGroup,
  modeladmin_register,
)
from .models import ItemParentCategory, ItemCategory, ItemDetailPage, ItemListingPage, Order, OrderInfo, ItemListingPagination

from django.contrib import admin
admin.site.register(Order)
admin.site.register(ItemDetailPage)
admin.site.register(ItemCategory)


class ItemDetailAdmin(ModelAdmin):

  model = ItemDetailPage
  menu_label = "商品一覧/編集/追加"
  menu_icon = "folder"
  list_display = ("title", "price", "discount_price", "get_item_categories", "get_item_tags", "stock", "pickup", "featured", "live", "first_published_at")
  list_filter = ('categories', 'featured', 'pickup', 'tags')
  search_fields = ["title"]

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

class ItemListingPaginationAdmin(ModelAdmin):

  model = ItemListingPagination
  menu_label = "ページネーション"
  menu_icon = "cog"
  list_display = ["listing_page", "category_page", "tag_page"]


class ItemAdminGroup(ModelAdminGroup):
    menu_label = "商品管理"
    menu_icon = "folder-open-1"
    menu_order = 280
    items = (ItemDetailAdmin, ItemCategoryAdmin, ItemParentCategoryAdmin, ItemListAdmin, ItemListingPaginationAdmin)

# class OrderAdmin(ModelAdmin):

#   model = Order
#   menu_label = "受注管理"
#   menu_icon = "folder"
#   menu_order = 290
#   add_to_settings_menu = False
#   exclude_from_explorer = False
#   list_display = ("user", "dispatched", "ordered_date")
#   search_fields = ("user", "dispatched", "ordered_date")

class OrderInfoAdmin(ModelAdmin):

  model = OrderInfo
  menu_label = "注文関連設定"
  menu_icon = "cog"
  menu_order = 300
  add_to_settings_menu = False
  exclude_from_explorer = False
  list_display = ("free_shippment_line", "shipping_fee", "order_history_paginate_by", "order_list_paginate_by")
  # search_fields = ()

modeladmin_register(ItemAdminGroup)
# modeladmin_register(OrderAdmin)
modeladmin_register(OrderInfoAdmin)