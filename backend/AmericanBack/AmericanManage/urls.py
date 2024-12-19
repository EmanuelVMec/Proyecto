from django.urls import path
from .views import AddProductAPIView

urlpatterns = [
    path('api/productos/', AddProductAPIView.as_view(), name='add_product_api'),
]
