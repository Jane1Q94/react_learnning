import json
import threading

from django.http.response import JsonResponse
from .models import Category, Task


lock = threading.Lock()


def get_all_data(request):
    cates = Category.objects.all()
    data = {
        "lists": [get_single_category_data(cate) for cate in cates],
        "draggedItem": None
    }
    return JsonResponse(data, safe=False)


def save_all_data(request):
    if request.method == "POST":
        data = json.loads(request.body)
        cates, tasks = [], []
        for cate in data.get("lists", []):
            cate_obj = save_category(cate)
            cates.append(cate_obj)
            cate_tasks = cate.get("tasks", [])
            for t in cate_tasks:
                task_obj = save_task(t, cate_obj)
                tasks.append(task_obj)

        with lock:
            Category.objects.all().delete()
            Category.objects.bulk_create(cates)
            Task.objects.bulk_create(tasks)

        cates = Category.objects.all()
        data = {
            "lists": [get_single_category_data(cate) for cate in cates],
            "draggedItem": None
        }
        return JsonResponse(data, safe=False)

    return JsonResponse([], safe=False)


def save_category(cate_data: dict):
    return Category(
        title=cate_data.get("text")
    )


def save_task(task_data: dict, cate: Category):
    return Task(
        title=task_data.get("text"),
        cate=cate,
    )


def get_single_category_data(category: Category):
    return {
        "id": category.id,
        "text": category.title,
        "tasks": [
            get_single_task_data(category, t) for t in category.tasks.all()
        ]
    }


def get_single_task_data(category: Category, task: Task):
    return {
        "id": task.id,
        "text": task.title,
        "columnId": category.id
    }
