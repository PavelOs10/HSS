from django import forms
from .models import Review, Application

class ReviewForm(forms.ModelForm):
    class Meta:
        model = Review
        fields = ["name", "text"]
        widgets = {
            "name": forms.TextInput(attrs={"class": "form-control", "placeholder": "Ваше имя"}),
            "text": forms.Textarea(attrs={"class": "form-control", "placeholder": "Ваш отзыв"}),
        }

class ApplicationForm(forms.ModelForm):
    class Meta:
        model = Application
        fields = ['name', 'phone']
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Ваше имя'
            }),
            'phone': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Ваш телефон'
            })
        }