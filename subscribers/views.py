from django.shortcuts import render, redirect
from django.views.generic import CreateView
from django.core.mail import send_mail
from django.contrib import messages

from .models import Subscriber
from .forms import SubscriberCreateForm


class SubscriberCreateView(CreateView):
  model = Subscriber
  form_class = SubscriberCreateForm
  # fields = '__all__'
  success_url = '/'
  
  def post(self, *args, **kwargs):
      form = SubscriberCreateForm(self.request.POST or None)
      if form.is_valid():
          email = form.cleaned_data.get('email')
          full_name = form.cleaned_data.get('full_name')
          form.save()
          # msg_plain = render_to_string('parts/email-inquiry.txt', {
          #     'name': full_name,
          # })
          # msg_html = render_to_string('parts/inquiry-email.html', {
          #     'inquiry': form
          # })
          # send_mail(
          #     f'お問い合わせありがとうございます。',
          #     msg_plain,
          #     'uncleko496@gmail.com',
          #     ['uncleko496@gmail.com', email],
          #     # html_message=msg_html,
          #     # fail_silentl,
          # )
          send_mail(
            'ご登録ありがとうございます',
            f'{self.request.user.username}様 ニュースレターの登録が完了致しました。',
            'uncleko496@gmail.com',
            [email, 'uncleko496@gmail.com'],
            fail_silently=False,
          )
          messages.success(self.request, "ご登録ありがとうございます。")
          return redirect(self.request.META['HTTP_REFERER'])

