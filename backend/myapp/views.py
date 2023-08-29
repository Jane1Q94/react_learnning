import json
from django.http.response import JsonResponse
from django.db import transaction
from .models import Category, Task


def get_all_data(request):
    cates = Category.objects.all()
    data = [get_single_category_data(cate) for cate in cates]
    return JsonResponse(data, safe=False)


# def save_all_data(request):
#     if request.method == "post":
#         data = json.loads(request.body)
#         pass


def get_single_category_data(category: Category):
    return {
        "id": category.id,
        "title": category.title,
        "tasks": [
            get_single_task_data(category, t) for t in category.tasks.all()
        ]
    }


def get_single_task_data(category: Category, task: Task):
    return {
        "id": task.id,
        "title": task.title,
        "columnId": category.id
    }
