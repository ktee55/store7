from django.db import models
from django.conf import settings
from django.template.defaultfilters import slugify

from modelcluster.fields import ParentalKey, ParentalManyToManyField
from modelcluster.models import ClusterableModel
from modelcluster.contrib.taggit import ClusterTaggableManager
from taggit.models import TaggedItemBase, Tag

from wagtail.core.models import Page, Orderable
from wagtail.core.fields import RichTextField #,StreamField
from wagtail.admin.edit_handlers import FieldPanel, MultiFieldPanel, InlinePanel #, StreamFieldPanel,
from wagtail.images.edit_handlers import ImageChooserPanel
# from wagtail.snippets.edit_handlers import SnippetChooserPanel
from wagtail.contrib.routable_page.models import RoutablePageMixin, route
# from wagtail.snippets.models import register_snippet

# from streams import blocks


class ItemListingPage(RoutablePageMixin, Page):
    """Listing page lists all the Item Detail Pages."""

    template = "item/item_listing_page.html"
    max_count = 1
    parent_page_types = ['home.HomePage']
    subpage_types = ['store.ItemDetailPage']


class ItemParentCategory(models.Model):
    """Parent category for item."""

    name = models.CharField(max_length=255)
    slug = models.SlugField(
        verbose_name="slug",
        allow_unicode=True,
        max_length=255,
        help_text='URLの一部として表示されるものです。後で変更すると問題が生じる可能性があります。また、他の商品と重複するものは使えません。'
    )

    panels = [
        FieldPanel("name"),
        FieldPanel("slug"),
    ]

    def __str__(self):
        """String repr of this class."""
        return self.name

    class Meta:
        verbose_name = "親カテゴリー"
        verbose_name_plural = "親カテゴリー"
        ordering = ["name"]

    # # slugを自動的に作成
    # def save(self, *args, **kwargs):
    #     # 作成時のみ（後でTitleが変わっても、URL変わらないように）
    #     if not self.id:
    #         self.slug = slugify(self.name)
    #     super(ItemParentCategory, self).save(*args, **kwargs)


class ItemCategory(models.Model):
    """Child category for item."""

    name = models.CharField(max_length=255)
    slug = models.SlugField(
        verbose_name="slug",
        allow_unicode=True,
        max_length=255,
        help_text='URLの一部として表示されるものです。後で変更すると問題が生じる可能性があります。また、他の商品と重複するものは使えません。'
    )
    parent = models.ForeignKey(ItemParentCategory, on_delete=models.SET_NULL, related_name="children", null=True, blank=True, verbose_name="親カテゴリー(オプション)", help_text="親カテゴリーを先に登録して下さい。親カテゴリーが必要ないカテゴリーは、このフィールドは空のまま登録して下さい。")

    panels = [
        FieldPanel("name"),
        FieldPanel("slug"),
        FieldPanel("parent"),
    ]

    def __str__(self):
        """String repr of this class."""
        return self.name

    class Meta:
        verbose_name = "Item Category"
        verbose_name_plural = "Item Categories"
        ordering = ["name"]


class TaggedItem(TaggedItemBase):
  content_object = ParentalKey(
    'ItemDetailPage',
    related_name='tagged_items',
    on_delete=models.CASCADE
  )


class ItemDetailPage(Page):

  parent_page_types = ['store.ItemListingPage']
  subpage_types = []

  price = models.IntegerField(verbose_name="価格")
  discount_price = models.IntegerField(
      blank=True, null=True, verbose_name="セール価格")
  categories = ParentalManyToManyField(
      "store.ItemCategory", blank=True, related_name="items", verbose_name="カテゴリー(option)")
  tags = ClusterTaggableManager(through=TaggedItem, blank=True)
  description = RichTextField(blank=True, null=True, verbose_name="商品説明")
  stock = models.IntegerField(blank=True, null=True, verbose_name="在庫数")
  pickup = models.BooleanField(default=False, verbose_name="厳選")
  featured = models.BooleanField(default=False, verbose_name="おすすめ")
  draft = models.BooleanField(default=False, verbose_name="下書き")
  fav_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="fav_items", blank=True)

  content_panels = Page.content_panels + [
    FieldPanel("price"),
    FieldPanel("discount_price"),
    FieldPanel("description"),
    FieldPanel("categories"),
    FieldPanel("tags"),
    FieldPanel("stock"),
    MultiFieldPanel([
      FieldPanel("pickup"),
      FieldPanel("featured"),
      FieldPanel("draft"),
    ], heading="Options"),
    InlinePanel("slide_images", max_num=10, min_num=1, label="スライド画像"),
    InlinePanel("size_option", max_num=10, min_num=0, label="サイズオプション"),
    InlinePanel("color_option", max_num=10, min_num=0, label="カラーオプション"),
  ]

  class Meta:
    verbose_name_plural = '商品'

  def __str__(self):
    return self.title


class ItemSlideImages(Orderable):
  """Between 1 and 10 images for the item."""

  page = ParentalKey(ItemDetailPage, on_delete=models.CASCADE, related_name="slide_images")
  slide_image = models.ForeignKey(
    "wagtailimages.Image",
    null=True,
    blank=True,
    on_delete=models.SET_NULL,
    related_name="+"
  )
  slide_img_alt = models.CharField(
    max_length=100,
    blank=True,
    null=True,
    help_text='画像が表示されない時に挿入されるテキストです。',
  )

  panels = [
    ImageChooserPanel("slide_image"),
    FieldPanel("slide_img_alt", heading="代替テキスト"),
  ]


class SizeOption(models.Model):
    item = ParentalKey(ItemDetailPage, on_delete=models.CASCADE, related_name="size_option")
    value = models.CharField(max_length=50)
    stock = models.IntegerField(blank=True, null=True, verbose_name="在庫数")

    class Meta:
        unique_together = (
            ('item', 'value')
        ),
        verbose_name_plural = '商品サイズ'

    def __str__(self):
        return self.value


class ColorOption(models.Model):
    item = ParentalKey(ItemDetailPage, on_delete=models.CASCADE, related_name="color_option")
    value = models.CharField(max_length=50)
    stock = models.IntegerField(blank=True, null=True, verbose_name="在庫数")
    # attachment = models.ImageField(blank=True)

    class Meta:
        unique_together = (
            ('item', 'value')
        ),
        verbose_name_plural = '商品カラー'

    def __str__(self):
        return self.value


# class Variation(ClusterableModel):
#     item = ParentalKey(ItemDetailPage, on_delete=models.CASCADE, related_name="variations")
#     name = models.CharField(max_length=50)  # size

#     class Meta:
#         unique_together = (
#             ('item', 'name')
#         )

#     def __str__(self):
#         return self.name

# class ItemVariation(Orderable):
#     variation = ParentalKey(Variation, on_delete=models.CASCADE, related_name="item_variations")
#     value = models.CharField(max_length=50)  # S, M, L

#     class Meta:
#         unique_together = (
#             ('variation', 'value')
#         )

#     def __str__(self):
#         return self.name



