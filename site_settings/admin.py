# from django.contrib import admin
from wagtail.contrib.modeladmin.options import (
  ModelAdmin,
  ModelAdminGroup,
  modeladmin_register,
)
from .models import SiteInfo

class SiteInfo(ModelAdmin):

  model = SiteInfo
  menu_label = "サイト設定"
  menu_icon = "folder"
  menu_order = 500
  add_to_settings_menu = False
  exclude_from_explorer = False
  list_display = ["site_name"]
  # search_fields = ()

modeladmin_register(SiteInfo)