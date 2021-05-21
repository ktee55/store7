from django.db import models
from django.conf import settings
from django.shortcuts import reverse, render
from django.template.defaultfilters import slugify

from modelcluster.fields import ParentalKey, ParentalManyToManyField
from modelcluster.models import ClusterableModel
from modelcluster.contrib.taggit import ClusterTaggableManager
from taggit.models import TaggedItemBase, Tag

from wagtail.core.models import Page, Orderable
from wagtail.core.fields import RichTextField  # ,StreamField
# , StreamFieldPanel,
from wagtail.admin.edit_handlers import FieldPanel, MultiFieldPanel, InlinePanel
from wagtail.images.edit_handlers import ImageChooserPanel
# from wagtail.snippets.edit_handlers import SnippetChooserPanel
from wagtail.contrib.routable_page.models import RoutablePageMixin, route
# from wagtail.snippets.models import register_snippet

from .forms import ItemOptionForm
from users.models import ShippingAddress, BillingAddress
from core.views import paginate
# from streams import blocks

PAYMENT_CHOICES = (
    ('C', 'クレジットカード'),
    ('B', '銀行振込')
    # ('P', 'PayPal'),
)

DELIVERY_TIME = (
    ('', '指定なし'),
    ('A', '午前中'),
    ('B', '0pm-2pm'),
    ('C', '2pm-4pm'),
    ('D', '4pm-6pm'),
    ('E', '6pm-8pm')
)


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
  parent = models.ForeignKey(ItemParentCategory, on_delete=models.SET_NULL, related_name="children", null=True,
                             blank=True, verbose_name="親カテゴリー(オプション)", help_text="親カテゴリーを先に登録して下さい。親カテゴリーが必要ないカテゴリーは、このフィールドは空のまま登録して下さい。")

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

  template = "store/item_detail_page.html"
  parent_page_types = ['store.ItemListingPage']
  subpage_types = []

  price = models.IntegerField(verbose_name="価格")
  discount_price = models.IntegerField(
      blank=True, null=True, verbose_name="セール価格")
  categories = ParentalManyToManyField(
      "store.ItemCategory", blank=True, related_name="items", verbose_name="カテゴリー")
  tags = ClusterTaggableManager(through=TaggedItem, blank=True)
  description = RichTextField(blank=True, null=True, verbose_name="商品説明")
  stock = models.IntegerField(blank=True, null=True, verbose_name="在庫数")
  pickup = models.BooleanField(default=False, verbose_name="厳選")
  featured = models.BooleanField(default=False, verbose_name="おすすめ")
  fav_users = models.ManyToManyField(
      settings.AUTH_USER_MODEL, related_name="fav_items", blank=True)
  list_image = models.ForeignKey(
      "wagtailimages.Image",
      null=True,
      blank=True,
      on_delete=models.SET_NULL,
      related_name="+",
      verbose_name='画像',
      help_text='商品リストにサムネイルとして表示される画像です。'
  )
  list_img_alt = models.CharField(
      max_length=100,
      null=True,
      blank=True,
      help_text='画像が表示されない時に挿入されるテキストです。',
      verbose_name="代替テキスト"
  )

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
      ], heading="Other Options"),
      InlinePanel("slide_images", max_num=10, min_num=1, label="スライド画像"),
      MultiFieldPanel([
          ImageChooserPanel("list_image"),
          FieldPanel("list_img_alt"),
      ], heading="リスト画像"),
      InlinePanel("size_option", max_num=10, min_num=0, label="サイズオプション"),
      InlinePanel("color_option", max_num=10, min_num=0, label="カラーオプション"),
  ]

  class Meta:
    verbose_name = '商品'
    verbose_name_plural = '商品'

  def __str__(self):
    return self.title

  def get_add_to_cart_url(self):
    return reverse("store:add-to-cart", kwargs={
        'pk': self.pk
    })

  def get_remove_from_cart_url(self):
    return reverse("store:remove-from-cart", kwargs={
        'pk': self.pk
    })

  def get_add_to_fav_items_url(self):
    return reverse("store:add-to-fav-items", kwargs={
        'pk': self.pk
    })

  def get_remove_from_fav_items_url(self):
    return reverse("store:remove-from-fav-items", kwargs={
        'pk': self.pk
    })

  def get_context(self, request, *args, **kwargs):
    context = super().get_context(request, *args, **kwargs)
    context["form"] = ItemOptionForm(
        ItemDetailPage.objects.get(pk=self.id) or None)
    context["other_items"] = ItemDetailPage.objects.live(
    ).public().exclude(slug=self.slug).order_by('?')[:3]
    if self.fav_users.filter(id=request.user.id):
        context["already_favorite"] = True
    return context


class ItemSlideImages(Orderable):
  """Between 1 and 10 images for the item."""

  page = ParentalKey(ItemDetailPage, on_delete=models.CASCADE,
                     related_name="slide_images")
  slide_image = models.ForeignKey(
      "wagtailimages.Image",
      null=True,
      blank=True,
      on_delete=models.SET_NULL,
      related_name="+",
      verbose_name="画像"
  )
  slide_img_alt = models.CharField(
      max_length=100,
      null=True,
      blank=True,
      help_text='画像が表示されない時に挿入されるテキストです。',
      verbose_name="代替テキスト"
  )

  panels = [
      ImageChooserPanel("slide_image"),
      FieldPanel("slide_img_alt"),
  ]


class SizeOption(models.Model):
  item = ParentalKey(ItemDetailPage, on_delete=models.CASCADE,
                     related_name="size_option")
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
  item = ParentalKey(ItemDetailPage, on_delete=models.CASCADE,
                     related_name="color_option")
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


class OrderItem(models.Model):

  user = models.ForeignKey(settings.AUTH_USER_MODEL,
                           on_delete=models.CASCADE)
  ordered = models.BooleanField(default=False)
  item = models.ForeignKey(ItemDetailPage, on_delete=models.CASCADE)
  quantity = models.IntegerField(default=0)
  # item_variations = models.ManyToManyField(ItemVariation)
  color = models.ForeignKey(
      ColorOption, on_delete=models.SET_NULL, blank=True, null=True)
  size = models.ForeignKey(
      SizeOption, on_delete=models.SET_NULL, blank=True, null=True)

  class Meta:
    verbose_name_plural = 'カート内各商品'

  def __str__(self):
    return f"{self.quantity} of {self.item.title}"

  def get_total_item_price(self):
    return self.quantity * self.item.price

  def get_total_discount_item_price(self):
    return self.quantity * self.item.discount_price

  def get_amount_saved(self):
    return self.get_total_item_price() - self.get_total_discount_item_price()

  def get_final_price(self):
    if self.item.discount_price:
      return self.get_total_discount_item_price()
    return self.get_total_item_price()


class Order(models.Model):

  user = models.ForeignKey(settings.AUTH_USER_MODEL,
                           on_delete=models.CASCADE, related_name="orders")
  items = models.ManyToManyField(OrderItem)
  start_date = models.DateTimeField(auto_now_add=True)
  ordered_date = models.DateTimeField()
  ordered = models.BooleanField(default=False)
  dispatched = models.BooleanField(default=False)
  shipping_address = models.ForeignKey(
      'users.ShippingAddress', on_delete=models.SET_NULL, blank=True, null=True)
  billing_address = models.ForeignKey(
      'users.BillingAddress', on_delete=models.SET_NULL, blank=True, null=True)
  payment_option = models.CharField(
      choices=PAYMENT_CHOICES, max_length=2, blank=True, null=True)
  delivery_time = models.CharField(
      choices=DELIVERY_TIME, max_length=2, blank=True, null=True)
  payment = models.ForeignKey(
      'Payment', on_delete=models.SET_NULL, blank=True, null=True)

  class Meta:
    verbose_name_plural = 'カート内全商品/注文済注文'

  def __str__(self):
    return self.user.username

  def get_total(self):
    total = 0
    for order_item in self.items.all():
      total += order_item.get_final_price()
    return total

  def get_postage(self):
    total = self.get_total()
    # site_info = Site.objects.get_current().siteinfo
    # if site_info.free_shippment_line:
    #   if total > site_info.free_shippment_line:
    #     return 0
    #   else:
    #     return site_info.shipping_fee
    # else:
    #   return site_info.shipping_fee
    return 0

  # def to_free_postage(self):
  #   site_info = Site.objects.get_current().siteinfo
  #   if site_info.free_shippment_line:
  #     return Site.objects.get_current().siteinfo.free_shippment_line - self.get_total()

  def get_total_w_postage(self):
    return self.get_total() + self.get_postage()

  def get_order_dispatched(self):
    return reverse("store:order-dispatched", kwargs={
        'pk': self.pk
    })


class Payment(models.Model):
  stripe_charge_id = models.CharField(max_length=50)
  user = models.ForeignKey(settings.AUTH_USER_MODEL,
                           on_delete=models.SET_NULL, blank=True, null=True)
  amount = models.FloatField()
  timestamp = models.DateTimeField(auto_now_add=True)

  class Meta:
    verbose_name_plural = 'Stripe'

  def __str__(self):
    return self.user.username




class ItemListingPage(RoutablePageMixin, Page):
  """Listing page lists all the Item Detail Pages."""

  template = "store/item_listing_page.html"
  max_count = 1
  parent_page_types = ['home.HomePage']
  subpage_types = ['store.ItemDetailPage']

  def get_context(self, request, *args, **kwargs):
      context = super().get_context(request, *args, **kwargs)
      all_items = ItemDetailPage.objects.live().public().order_by('-first_published_at')
      # pagination = ItemPagination.objects.first()
      pagination = 1

      context["items"] = paginate(request, all_items, pagination)

      # context["parent_categories"] = ItemParentCategory.objects.all()
      # context["categories"] = ItemCategory.objects.filter(parent__isnull=True)
      # context["tagged_items"] = TagedItem.objects.all()

      return context


  # @route(r'^category/(?P<cat_slug>[-\w]*)/$', name="category_view")
  # def category_view(self, request, cat_slug):
  #     """Find items based on a category."""
  #     context = self.get_context(request)

  #     try:
  #         category = ItemCategory.objects.get(slug=cat_slug)
  #     except Exception:
  #         messages.error(request, "指定されたカテゴリーは存在しませんでした。")
  #         return redirect('/blog/')
  #     # except BlogCategory.DoesNotExist:
  #     #     raise Http404("このカテゴリーは存在しません。")

  #     all_items = ItemDetailPage.objects.live().public().order_by('-first_published_at').filter(categories__in=[category])
  #     # pagination = BlogPagination.objects.first()
  #     pagination = 1
  #     # context["items"] = paginate(request, all_items, pagination.category_page)
  #     context["items"] = paginate(request, all_items, pagination)
  #     context["category_name"] = category.name

  #     return render(request, "store/item_listing_page.html", context)


  # @route(r'^tag/(?P<tag_slug>[-\w]*)/$', name="tag_view")
  # def tag_view(self, request, tag_slug):
  #     """Find items based on a tag."""
  #     context = self.get_context(request)

  #     try:
  #         tag = Tag.objects.get(slug=tag_slug)
  #     except Exception:
  #         messages.error(request, "指定されたタグは存在しませんでした。")
  #         return redirect('/blog/')

  #     all_items = ItemDetailPage.objects.live().public().order_by('-first_published_at').filter(tags__in=[tag])
  #     # pagination = BlogPagination.objects.first()
  #     pagination = 1
  #     # context["items"] = paginate(request, all_items, pagination.tag_page)
  #     context["items"] = paginate(request, all_items, pagination)
  #     context["tag_name"] = tag.name
      
  #     return render(request, "store/item_listing_page.html", context)


# class ItemPagination(models.Model):

#     listing_page = models.IntegerField(default=10)
#     category_page = models.IntegerField(default=10)
#     tag_page = models.IntegerField(default=10)

#     panels = [
#         FieldPanel("listing_page"),
#         FieldPanel("category_page"),
#         FieldPanel("tag_page"),
#     ]

#     class Meta:
#         verbose_name = "Blog Pagination"
#         verbose_name_plural = "Blog Paginations"

