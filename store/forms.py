from django import forms
from users.models import ShippingAddress, BillingAddress

# from django.apps import apps
# SizeOption = apps.get_model('store.SizeOption')
# ColorOption = apps.get_model('store.ColorOption')

### To Prevent Circulate Import Error
def SizeOption():
  from .models import SizeOption
  return SizeOption
  
def ColorOption():
  from .models import ColorOption
  return ColorOption

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

class ItemOptionForm(forms.Form):

    size_option = forms.ModelChoiceField(
        widget=forms.Select(attrs={
            'class': 'select form-control'
        }),
        # choices="",
        queryset=None,
        label="サイズ",
        required=False
    )

    color_option = forms.ModelChoiceField(
        widget=forms.Select(attrs={
            'class': 'select form-control'
        }),
        # choices="",
        queryset=None,
        label="カラー",
        required=False
    )

    quantity = forms.ChoiceField(
        widget=forms.Select(attrs={
            'class': 'select form-control'
        }),
        choices=(('1', '1'), ('2', '2'), ('3', '3'),
                 ('4', '4'), ('5', '5'), ('6', '6')),
        label="数量",
        required=False
    )

    def __init__(self, item, *args, **kwargs):
        super(ItemOptionForm, self).__init__(*args, **kwargs)
        if item.size_option.count():
            # self.fields['size_option'].choices = item.size_option.all().order_by(
            #     'id').values_list('value', 'value')
            self.fields['size_option'].queryset = SizeOption().objects.filter(
                item=item).order_by('id')
            self.fields['size_option'].required = True
        if item.color_option.count():
            self.fields['color_option'].queryset = ColorOption().objects.filter(
                item=item).order_by('id')
            self.fields['color_option'].required = True


class CheckoutForm(forms.Form):

    delivery_time = forms.ChoiceField(
        choices=DELIVERY_TIME,
        required=False
    )

    payment_option = forms.ChoiceField(
        widget=forms.RadioSelect,
        choices=PAYMENT_CHOICES
    )


BILLING_ADDRESS_OPTION = (
    ('A', 'この住所を使う'),
    ('B', '請求先住所を配送先住所と同じにする')
)

class BillingAddressForm(forms.Form):

    billing_address_option = forms.ChoiceField(
        widget=forms.RadioSelect,
        choices=BILLING_ADDRESS_OPTION
    )

