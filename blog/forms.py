from django import forms
from .models import BlogComment

# from django.apps import apps
# # apps.get_model('blog.Comment')
# Comment = apps.get_model("blog", "Comment")

# def Comment():
#   from .models import Comment
#   return Comment

class CommentForm(forms.ModelForm):

    class Meta:
        model = BlogComment
        fields = ['comment', 'url']