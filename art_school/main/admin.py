from django.contrib import admin
from .models import Review, News, PhotoReport, ReportImage, Teacher, Contact, Application  # Добавлен ReportImage

# Определяем инлайн-класс ПЕРВЫМ
class ReportImageInline(admin.TabularInline):
    model = ReportImage
    extra = 3

@admin.register(PhotoReport)
class PhotoReportAdmin(admin.ModelAdmin):
    inlines = [ReportImageInline]  # Теперь класс определен
    list_display = ("title", "created_at")
    search_fields = ("title", "description")

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("name", "created_at")
    search_fields = ("name", "text")

@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ("title", "created_at")
    search_fields = ("title", "content")
    
@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name", "bio")

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ("phone", "address")
    search_fields = ("phone", "address")

@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ("name", "phone", "created_at")
    search_fields = ("name", "phone")