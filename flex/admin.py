from wagtail.contrib.modeladmin.options import (
  ModelAdmin,
  modeladmin_register,
)
from .models import FlexPage

class FlexPageAdmin(ModelAdmin):

  model = FlexPage
  menu_label = "Flex Pages"
  menu_icon = "folder"
  menu_order = 310
  add_to_settings_menu = False
  exclude_from_explorer = False
  list_display = ("title", "first_published_at")
  search_fields = ("title", "content")

modeladmin_register(FlexPageAdmin)
