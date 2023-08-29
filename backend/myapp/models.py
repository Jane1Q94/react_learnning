from django.db import models


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Category(BaseModel):
    title = models.CharField(max_length=32)


class Task(BaseModel):
    cate = models.ForeignKey(
        to=Category, on_delete=models.CASCADE, related_name="tasks")
    title = models.TextField()
