from django.urls import path
from .views import AddProductAPIView,ProductListAPIView

urlpatterns = [
    path('api/products/', AddProductAPIView.as_view(), name='add_product_api'),
    path('api/viewproducts/', ProductListAPIView.as_view(), name='product-list'),
]
