from django.contrib import messages
from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import login_required #, permission_required
from django.core.mail import send_mail
from django.views.generic import ListView
from taggit.models import Tag

from .models import BlogDetailPage, BlogCategory, BlogComment
from .forms import CommentForm

class CategoryPostListView(ListView):
    model = BlogDetailPage
    template_name = 'blog/blog_listing_page.html'
    context_object_name = 'posts'
    paginate_by = 1

    def get_queryset(self):
      # try:
      #     category = BlogCategory.objects.get(slug=self.kwargs.get('cat_slug'))
      # except Exception:
      #     messages.error(self.request, "指定されたカテゴリーは存在しませんでした。")
      #     return redirect('/blog/')
      category = get_object_or_404(BlogCategory, slug=self.kwargs.get('cat_slug'))
      
      # return BlogDetailPage.objects.live().public().order_by('-first_published_at').filter(categories__in=[category])
      return category.posts.live().public().order_by('-first_published_at')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["category"] = get_object_or_404(BlogCategory, slug=self.kwargs.get('cat_slug'))

        return context


class TagPostListView(ListView):
    model = BlogDetailPage
    template_name = 'blog/blog_listing_page.html'
    context_object_name = 'posts'
    paginate_by = 1

    def get_queryset(self):
      # try:
      #     tag = Tag.objects.get(slug=self.kwargs.get('tag_slug'))
      # except Exception:
      #     messages.error(self.request, "指定されたタグは存在しませんでした。")
      #     return redirect('/blog/')
      tag = get_object_or_404(Tag, slug=self.kwargs.get('tag_slug'))
      
      return BlogDetailPage.objects.live().public().order_by('-first_published_at').filter(tags__in=[tag])

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["tag"] = get_object_or_404(Tag, slug=self.kwargs.get('tag_slug'))

        return context


@login_required
def add_comment(request, post_id):
    post = get_object_or_404(BlogDetailPage, pk=post_id)
    if request.method == "POST":
        form = CommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.post = post
            comment.author = request.user
            if post.owner == request.user:
            # if request.user.is_staff:
              comment.approved = True
            comment.save()
            send_mail(
              f'{request.user.username} left a comment on {post.title}',
              f'{comment.comment}',
              'uncleko496@gmail.com',
              ['uncleko496@gmail.com'],
              fail_silently=False,
            ) 
            return redirect(request.META['HTTP_REFERER'])
    else:
        form = CommentForm()
    return render(request, 'blog/comment_form.html', {'form': form})

@login_required
def update_comment(request, comment_id):
    comment = get_object_or_404(BlogComment, pk=comment_id)
    if request.method == "POST":
      form = CommentForm(request.POST, instance=comment)
      if form.is_valid():
          comment = form.save(commit=False)
          if not comment.post.owner == request.user:
            comment.approved = False
          if comment.author == request.user :
            comment.save()
            return HttpResponseRedirect('/blog/' + comment.post.slug)
    else:
      form = CommentForm(instance=comment)
      context = {
        'form': form,
        'edit': 1,
        'post': comment.post,
      }

    return render(request, 'blog/comment_form.html', context)


@login_required
def delete_comment(request, comment_id):

    comment = BlogComment.objects.get(pk=comment_id)

    if request.method == "POST":
      post_id=comment.post.id
      # コメントの投稿者およびコメントされた投稿の投稿者にのみ削除権(or Reject)を与える
      # if comment.author == request.user or comment.post.owner == request.user:
      if comment.author == request.user or request.user.is_staff:
        comment.delete()
      return HttpResponseRedirect('/blog/' + comment.post.slug)

    else:
      context = {
        "comment": comment
      }
      return render(request, 'blog/comment_confirm_delete.html', context)


@login_required
# @permission_required('is_staff')
def comment_approve(request, pk):
    comment = get_object_or_404(BlogComment, pk=pk)
    # if request.user == comment.post.owner:
    if request.user.is_staff:
      comment.approve()
    return redirect(request.META['HTTP_REFERER'])
