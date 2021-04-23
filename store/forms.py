from django import forms

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