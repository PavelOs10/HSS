from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("", views.index, name="index"),
    path("reviews/", views.reviews, name="reviews"),
    path('news/', views.news, name='news'),
    path('news/<int:pk>/', views.news_detail, name='news_detail'),
    path('photo_reports/', views.photo_reports, name='photo_reports'),  # Новый маршрут
    path('photo_reports/<int:pk>/carousel/', views.photo_report_detail, name='photo_report_detail'),
    path('teachers/', views.teachers, name='teachers'),
    path('contacts/', views.contacts, name='contacts'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)