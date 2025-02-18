from django.urls import path
from .views import AddProductAPIView,ProductListAPIView,RegisterAPIView,LoginAPIView,ProductDetailAPIView,ProductDeleteAPIView,MainCategoryList, SubCategoryList,ProductListBySubCategory, ProductSearchAPIView

urlpatterns = [
    path('api/products/', AddProductAPIView.as_view(), name='add_product_api'),
    path('api/viewproducts/', ProductListAPIView.as_view(), name='product-list'),
    path('api/register/', RegisterAPIView.as_view(), name='register'),
    path('api/login/', LoginAPIView.as_view(), name='login'),
    path('api/products/<int:id>/', ProductDetailAPIView.as_view(), name='product-detail'),
    path('api/products/<int:pk>/delete/', ProductDeleteAPIView.as_view(), name='product-delete'),
    path('api/main-categories/', MainCategoryList.as_view(), name='main-category-list'),
    path('api/subcategories/<int:main_category_id>/', SubCategoryList.as_view(), name='subcategory-list'),
    path('api/products/subcategory/<int:subcategory_id>/', ProductListBySubCategory.as_view(), name='product-list-by-subcategory'),
    path('api/products/search/', ProductSearchAPIView.as_view(), name='product-search'),
]
