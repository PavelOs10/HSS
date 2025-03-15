from django.db import models
from django.db.models import ImageField

# Перенесите модель Review в начало файла
class Review(models.Model):
    name = models.CharField(max_length=100, verbose_name="Имя")
    text = models.TextField(verbose_name="Текст отзыва")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")

    def __str__(self):
        return f"{self.name} - {self.created_at}"

    class Meta:
        verbose_name = "Отзыв"
        verbose_name_plural = "Отзывы"

class News(models.Model):
    title = models.CharField(max_length=200, verbose_name="Заголовок")
    content = models.TextField(verbose_name="Содержание")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")
    image = models.ImageField(upload_to="news_images/", verbose_name="Изображение", null=True, blank=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Новость"
        verbose_name_plural = "Новости"

class PhotoReport(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    main_image = models.ImageField(upload_to='photo_reports/')  # Убедитесь, что поле есть

    def __str__(self):
        return self.title

from django.db import models

# main/models.py
class ReportImage(models.Model):
    report = models.ForeignKey(
        'PhotoReport', 
        on_delete=models.CASCADE,
        related_name='images'
    )
    image = models.ImageField(
        upload_to='photo_reports/',
        width_field='width',    # Автоматическое заполнение ширины
        height_field='height'   # Автоматическое заполнение высоты
    )
    width = models.PositiveIntegerField(editable=False, null=True)  # Временно разрешаем null
    height = models.PositiveIntegerField(editable=False, null=True) # Временно разрешаем null
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']

class Teacher(models.Model):
    name = models.CharField(max_length=200, verbose_name="ФИО")
    bio = models.TextField(verbose_name="Биография")
    photo = models.ImageField(upload_to='teachers/', verbose_name="Фото")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Преподаватель"
        verbose_name_plural = "Преподаватели"

class Contact(models.Model):
    phone = models.CharField(max_length=20, verbose_name="Телефон")
    telegram = models.URLField(verbose_name="Telegram", blank=True, null=True)
    vk = models.URLField(verbose_name="VK", blank=True, null=True)
    address = models.TextField(verbose_name="Адрес")

    def __str__(self):
        return self.phone

    class Meta:
        verbose_name = "Контакт"
        verbose_name_plural = "Контакты"

class Application(models.Model):
    name = models.CharField("Имя", max_length=100)
    phone = models.CharField("Телефон", max_length=20)
    created_at = models.DateTimeField("Дата создания", auto_now_add=True)

    class Meta:
        verbose_name = "Заявка"
        verbose_name_plural = "Заявки"