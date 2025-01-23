from django.urls import path
from .views import AddProductAPIView,ProductListAPIView,RegisterAPIView,LoginAPIView,ProductDetailAPIView,ProductDeleteAPIView

urlpatterns = [
    path('api/products/', AddProductAPIView.as_view(), name='add_product_api'),
    path('api/viewproducts/', ProductListAPIView.as_view(), name='product-list'),
    path('api/register/', RegisterAPIView.as_view(), name='register'),
    path('api/login/', LoginAPIView.as_view(), name='login'),
    path('api/products/<int:id>/', ProductDetailAPIView.as_view(), name='product-detail'),
    path('api/products/<int:pk>/delete/', ProductDeleteAPIView.as_view(), name='product-delete'),
]
