from django.db import models

from modelcluster.fields import ParentalKey
from wagtail.snippets.models import register_snippet
from wagtail.admin.edit_handlers import (
  FieldPanel,
  FieldRowPanel,
  InlinePanel,
  MultiFieldPanel
)
from wagtail.core.fields import RichTextField
from wagtail.contrib.forms.models import (
  AbstractEmailForm,
  AbstractFormField
)

from wagtailcaptcha.models import WagtailCaptchaEmailForm

from datetime import date
from wagtail.admin.mail import send_mail

# import json
# from django.core.serializers.json import DjangoJSONEncoder
from django.forms.fields import EmailField

class FormField(AbstractFormField):
  page = ParentalKey(
    'ContactPage', 
    on_delete=models.CASCADE, 
    related_name='form_fields'
  )

# class ContactPage(AbstractEmailForm):
class ContactPage(WagtailCaptchaEmailForm):

  parent_page_types = ['home.HomePage']
  subpage_types = []
  max_count = 1

  template = "contact/contact_page.html"

  intro = RichTextField(blank=True)
  thank_you_text = RichTextField(blank=True)

  content_panels = AbstractEmailForm.content_panels + [
    FieldPanel('intro'),
    InlinePanel('form_fields', label='Form Fields'),
    FieldPanel('thank_you_text'),
    MultiFieldPanel([
      FieldRowPanel([
        FieldPanel('from_address', classname="col6"),
        FieldPanel('to_address', classname="col6")
      ]),
      FieldPanel("subject"),
    ], heading="Email Settings"),
  ]

  # Custom send_mail
  def send_mail(self, form):
    # `self` is the FormPage, `form` is the form's POST data on submit

    # Email addresses are parsed from the FormPage's addresses field
    to_addresses = [x.strip() for x in self.to_address.split(',')]
    for field in form:
      value = field.value()
      if type(field.field) == EmailField:  # if we find an email field
          if str(value) not in [None, '']:  # if the value is not empty
              to_addresses.append(str(value))  # add to the email to addresses

    # Subject can be adjusted (adding submitted date), be sure to include the form's defined subject field
    submitted_date_str = date.today().strftime('%x')
    subject = f"{self.subject} - {submitted_date_str}"

    send_mail(subject, self.render_email(form), to_addresses, self.from_address,)

register_snippet(ContactPage)
