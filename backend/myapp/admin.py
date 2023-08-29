from django.contrib import admin
from .models import Category, Task


class CategoryAdmin(admin.ModelAdmin):
    list_display = ["id", "created_at", "title"]


class TaskAdmin(admin.ModelAdmin):
    list_display = ["id", "created_at", "cate_display", "title"]
    raw_id_fields = ('cate', )

    def cate_display(self, obj):
        return obj.cate.title


admin.site.register(Category, CategoryAdmin)
admin.site.register(Task, TaskAdmin)
