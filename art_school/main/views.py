from django.shortcuts import render, redirect, get_object_or_404
from .models import Review, News, PhotoReport, Teacher, Contact
from .forms import ReviewForm

def index(request):
    return render(request, "main/index.html")

def reviews(request):
    reviews = Review.objects.all().order_by("-created_at")
    if request.method == "POST":
        form = ReviewForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("reviews")  # Перенаправление на страницу отзывов
    else:
        form = ReviewForm()
    return render(request, "main/reviews.html", {"reviews": reviews, "form": form})

def news(request):
    news_list = News.objects.all().order_by("-created_at")
    return render(request, "main/news.html", {"news": news_list})

def photo_report_detail(request, pk):
    report = get_object_or_404(PhotoReport, pk=pk)
    return render(request, 'main/photo_carousel.html', {'report': report})

def news_detail(request, pk):
    news_item = get_object_or_404(News, pk=pk)
    return render(request, 'main/news_detail.html', {'news_item': news_item})

def photo_reports(request):
    reports = PhotoReport.objects.all().order_by("-created_at").prefetch_related('images')
    return render(request, "main/photo_reports.html", {"photo_reports": reports})

def teachers(request):
    teachers_list = Teacher.objects.all()
    return render(request, "main/teachers.html", {"teachers": teachers_list})

def contacts(request):
    contact_info = Contact.objects.first()  # Предполагаем, что контактная информация одна
    return render(request, "main/contacts.html", {"contact": contact_info})