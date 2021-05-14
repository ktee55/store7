from django import forms
# from django.http import Http404
from django.shortcuts import redirect
from django.contrib import messages
from django.db import models
from django.shortcuts import render
from django.utils import timezone
from django.contrib.auth.models import User
from django.template.defaultfilters import slugify

from modelcluster.fields import ParentalKey, ParentalManyToManyField
from modelcluster.contrib.taggit import ClusterTaggableManager
from taggit.models import TaggedItemBase, Tag

from wagtail.core.models import Page, Orderable
from wagtail.core.fields import StreamField, RichTextField
from wagtail.admin.edit_handlers import FieldPanel, StreamFieldPanel, MultiFieldPanel, InlinePanel
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.snippets.edit_handlers import SnippetChooserPanel
from wagtail.contrib.routable_page.models import RoutablePageMixin, route
from wagtail.snippets.models import register_snippet

from streams import blocks
from core.views import paginate
# from .forms import CommentForm

### To Avoid Circulate Import Error
def CommentForm():
  from .forms import CommentForm
  return CommentForm


class BlogAuthorsOrderable(Orderable):
    """This allows us to select one or more blog authors"""

    page = ParentalKey("blog.BlogDetailPage", related_name="blog_authors")
    author = models.ForeignKey(
        "blog.BlogAuthor",
        on_delete=models.CASCADE,
    )

    panels = [
        SnippetChooserPanel("author"),
    ]


class BlogAuthor(models.Model):
    """Blog author for snippets."""

    name = models.CharField(max_length=100)
    website = models.URLField(blank=True, null=True)
    image = models.ForeignKey(
        "wagtailimages.Image",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="+",
    )

    panels = [
        MultiFieldPanel(
            [
                FieldPanel("name"),
                ImageChooserPanel("image"),
            ],
            heading="Name and Image",
        ),
        MultiFieldPanel(
            [
                FieldPanel("website"),
            ],
            heading="Links",
        ),

    ]

    def __str__(self):
        """String repr of this class."""
        return self.name

    class Meta:  # noqa
        verbose_name = "Blog Author"
        verbose_name_plural = "Blog Authors"


register_snippet(BlogAuthor)


class BlogParentCategory(models.Model):
    """Parent category for categories."""

    name = models.CharField(max_length=255)
    slug = models.SlugField(
        verbose_name="slug",
        allow_unicode=True,
        max_length=255,
        help_text='URLの一部として表示されるものです。後で変更すると問題が生じる可能性があります。また、他の商品と重複するものは使えません。'
    )

    panels = [
        FieldPanel("name"),
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
    #     super(BlogParentCategory, self).save(*args, **kwargs)


class BlogCategory(models.Model):
    """Blog category for a snippet."""

    name = models.CharField(max_length=255)
    slug = models.SlugField(
        verbose_name="slug",
        allow_unicode=True,
        max_length=255,
        help_text='URLの一部として表示されるものです。後で変更すると問題が生じる可能性があります。また、他の商品と重複するものは使えません。'
    )
    parent = models.ForeignKey(BlogParentCategory, on_delete=models.SET_NULL, related_name="children", null=True, blank=True, verbose_name="親カテゴリー", help_text="親カテゴリーを先に登録して下さい。親カテゴリーが必要ないカテゴリーは、このフィールドは空のまま登録して下さい。")

    panels = [
        FieldPanel("name"),
        FieldPanel("slug"),
        FieldPanel("parent"),
    ]

    def __str__(self):
        """String repr of this class."""
        return self.name

    class Meta:
        verbose_name = "Blog Category"
        verbose_name_plural = "Blog Categories"
        ordering = ["name"]


# register_snippet(BlogCategory)


class TaggedPost(TaggedItemBase):
  content_object = ParentalKey(
    'BlogDetailPage',
    related_name='tagged_items',
    on_delete=models.CASCADE,
  )


class BlogListingPage(RoutablePageMixin, Page):
    """Listing page lists all the Blog Detail Pages."""

    template = "blog/blog_listing_page.html"
    max_count = 1
    parent_page_types = ['home.HomePage']
    # subpage_types = ['blog.ArticleBlogPage', 'blog.VideoBlogPage']

    # custom_title = models.CharField(
    #     max_length=100,
    #     blank=False,
    #     null=False,
    #     help_text='Overwrites the default title',
    # )

    # content_panels = Page.content_panels + [
    #     FieldPanel("custom_title"),
    # ]


    def get_context(self, request, *args, **kwargs):
        """Adding custom stuff to our context."""
        context = super().get_context(request, *args, **kwargs)
        all_posts = BlogDetailPage.objects.live().public().order_by('-first_published_at')
        # pagination = BlogPagination.objects.first()
        pagination = 1

        # if request.GET.get('tag', None):
        #   tag = request.GET.get('tag')
        #   all_posts = all_posts.filter(tags__slug__in=[tag])

        # context["posts"] = paginate(request, all_posts, pagination.listing_page)
        context["posts"] = paginate(request, all_posts, pagination)
        # context["posts"] = all_posts

        context["parent_categories"] = BlogParentCategory.objects.all()
        context["categories"] = BlogCategory.objects.filter(parent__isnull=True)
        context["tags"] = Tag.objects.all()
        # context["taged_items"] = TaggedPost.objects.all()
        # context["special_link"] = self.reverse_subpage('latest_posts')
        return context




class BlogDetailPage(Page):
    """Parental blog detail page."""

    template = "blog/blog_detail_page.html"
    parent_page_types = ['blog.BlogListingPage']
    subpage_types = []

    categories = ParentalManyToManyField("blog.BlogCategory", blank=True, related_name="posts")
    tags = ClusterTaggableManager(through=TaggedPost, blank=True)
    draft = models.BooleanField(default=False, verbose_name="下書きにする")
    whatsnew = models.BooleanField(default=False, verbose_name="What's New")

    other_contents = StreamField(
        [
            ("title_and_text", blocks.TitleAndTextBlock()),
            ("full_richtext", blocks.RichTextBlock()),
            ("simple_richtext", blocks.SimpleRichTextBlock()),
            # ("simple_richtext", blocks.SimpleRichTextBlock(features=["bold", "italic"])),
            ("cards", blocks.CardBlock()),
            ("cta", blocks.CTABlock()),
        ],
        null=True,
        blank=True,
        verbose_name="Additional Contents"
    )

    content_panels = Page.content_panels + [
        MultiFieldPanel(
            [
                InlinePanel("blog_authors", label="Author",
                            min_num=1, max_num=4)
            ],
            heading="Author(s)"
        ),
        FieldPanel("categories", widget=forms.CheckboxSelectMultiple),
        FieldPanel("tags"),
        InlinePanel("main_contents", label="コンテント"),
        StreamFieldPanel("other_contents"),
        InlinePanel("links", label="参照URL"),
        MultiFieldPanel([
            FieldPanel("draft"),
            FieldPanel("whatsnew"),
        ], heading="Other Options"),
    ]

    def get_context(self, request, *args, **kwargs):
        context = super().get_context(request, *args, **kwargs)
        context['comment_form'] = CommentForm()
        return context

    def approved_comments(self):
        return self.comments.filter(approved=True)


class BlogContent(Orderable):
  """Repeating combination of text and image for the blog."""

  page = ParentalKey(BlogDetailPage, on_delete=models.CASCADE,
                     related_name="main_contents")
  image = models.ForeignKey(
      "wagtailimages.Image",
      null=True,
      blank=True,
      on_delete=models.SET_NULL,
      related_name="+",
      verbose_name="画像"
  )
  img_alt = models.CharField(
      max_length=100,
      null=True,
      blank=True,
      help_text='画像が表示されない時に挿入されるテキストです。',
      verbose_name="代替テキスト"
  )
  text = RichTextField(blank=True, null=True, verbose_name="テキスト")

  panels = [
      ImageChooserPanel("image"),
      FieldPanel("img_alt"),
      FieldPanel("text"),
  ]


class BlogLink(Orderable):
  page = ParentalKey(BlogDetailPage, on_delete=models.CASCADE, related_name="links")
  title = models.CharField(max_length=100, blank=True,
                            null=True, verbose_name="タイトル(option)")
  url = models.URLField(max_length=500, verbose_name="URL")

  panels = [
      FieldPanel("title"),
      FieldPanel("url"),
  ]
  
  class Meta:
      verbose_name_plural = "参照URL"

  def __str__(self):
      return self.url


# class BlogPagination(models.Model):

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


class BlogComment(models.Model):
    comment = models.TextField(verbose_name="コメント")
    date_posted = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="comments")
    post = models.ForeignKey(
        BlogDetailPage, on_delete=models.CASCADE, related_name="comments")
    approved = models.BooleanField(default=False)
    url = models.URLField(max_length=255, blank=True,
                          verbose_name="参照URL(option)")

    class Meta:
        verbose_name = "コメント"
        verbose_name_plural = "コメント"

    def __str__(self):
        return f"{self.comment}"

    # def get_absolute_url(self):
    #     # going back to the post that comment attached
    #     return reverse('post-detail', kwargs={'pk': self.post.pk})

    def approve(self):
        self.approved = True
        self.save()

