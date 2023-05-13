#### Settings.pyに'core.context_processors.global_val'を追加 ###
from django.db import models

from wagtail.admin.edit_handlers import FieldPanel, MultiFieldPanel
# from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.contrib.settings.models import BaseSetting, register_setting

from subscribers.forms import SubscriberCreateForm


@register_setting
class SiteInfo(BaseSetting):
  """Site Information settings for our custom website."""

  site_name = models.CharField(max_length=255, blank=True, null=True)
  logo_image = models.ForeignKey(
      "wagtailimages.Image",
      null=True,
      blank=True,
      on_delete=models.SET_NULL,
      related_name="+",
      verbose_name='',
      help_text='幅200px以上のものを使用して下さい'
  )
  # blog_logo_image = models.ForeignKey(
  #     "wagtailimages.Image",
  #     null=True,
  #     blank=True,
  #     on_delete=models.SET_NULL,
  #     related_name="+",
  #     verbose_name='',
  #     help_text='幅200px以上のものを使用して下さい'
  # )

  panels = [
    FieldPanel("site_name"),
    MultiFieldPanel([
        FieldPanel("logo_image"),
    ], heading="ロゴ画像"),
    # MultiFieldPanel([
    #     ImageChooserPanel("blog_logo_image"),
    # ], heading="ブログ ロゴ画像"),
  ]

  class Meta:
    verbose_name = 'サイト設定'
    verbose_name_plural = 'サイト設定'


@register_setting
class SubscriptionForm(BaseSetting):

  form = SubscriberCreateForm()
