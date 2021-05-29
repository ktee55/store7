from django import forms
from .models import Subscriber
from captcha.fields import ReCaptchaField

class SubscriberCreateForm(forms.ModelForm):
    captcha = ReCaptchaField()
    class Meta:
        model = Subscriber
        fields = '__all__'