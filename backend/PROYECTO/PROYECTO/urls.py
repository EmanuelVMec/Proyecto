from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, ProductPhotoViewSet

# Router configuration
router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
router.register(r'photos', ProductPhotoViewSet, basename='photo')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
