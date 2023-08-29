from django.urls import path
from . import views

app_name = "myapp"

urlpatterns = [
    path('load/', views.get_all_data, name="get_all_data"),
    path('save/', views.save_all_data, name="save_all_data")
]
