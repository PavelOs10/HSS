from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("reviews/", views.reviews, name="reviews"),
    path('news/', views.news, name='news'),
    path('news/<int:pk>/', views.news_detail, name='news_detail'),
    path('photo_reports/', views.photo_reports, name='photo_reports'),  # Новый маршрут
    path('photo_reports/<int:pk>/carousel/', views.photo_report_detail, name='photo_report_detail'),
]