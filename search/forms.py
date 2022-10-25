from django import forms

class SearchForm(forms.Form): #Note that it is not inheriting from forms.ModelForm
    search = forms.CharField(
      max_length=100,
      label="Search"
    )
