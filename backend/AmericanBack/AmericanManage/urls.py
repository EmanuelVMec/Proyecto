from django.urls import path
from .views import AddProductAPIView,ProductListAPIView,RegisterAPIView,LoginAPIView

urlpatterns = [
    path('api/products/', AddProductAPIView.as_view(), name='add_product_api'),
    path('api/viewproducts/', ProductListAPIView.as_view(), name='product-list'),
    path('api/register/', RegisterAPIView.as_view(), name='register'),
    path('api/login/', LoginAPIView.as_view(), name='login'),
]
