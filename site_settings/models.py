#### Settings.pyに'core.context_processors.global_val'を追加 ###
from django.db import models

from wagtail.admin.edit_handlers import FieldPanel #, MultiFieldPanel
# from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.contrib.settings.models import BaseSetting, register_setting

from subscribers.forms import SubscriberCreateForm


@register_setting
class SiteInfo(BaseSetting):
  """Site Information settings for our custom website."""

  site_name = models.CharField(max_length=255, blank=True, null=True)

  panels = [
    FieldPanel("site_name"),
  ]


@register_setting
class SubscriptionForm(BaseSetting):

  form = SubscriberCreateForm()
