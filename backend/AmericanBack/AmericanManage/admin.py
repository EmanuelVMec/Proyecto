from django.contrib import admin
from .models import Product, MainCategory, SubCategory

# Configuración de MainCategory en el panel de administración
@admin.register(MainCategory)
class MainCategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')  # Muestra el ID y el nombre en la lista
    search_fields = ('name',)  # Agrega un campo de búsqueda por nombre
    ordering = ('name',)  # Ordena las categorías alfabéticamente

# Configuración de SubCategory en el panel de administración
@admin.register(SubCategory)
class SubCategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'main_category')  # Incluye la categoría principal
    search_fields = ('name', 'main_category__name')  # Búsqueda por nombre o categoría principal
    list_filter = ('main_category',)  # Filtra por categoría principal
    ordering = ('main_category', 'name')  # Ordena por categoría principal y nombre

# Configuración de Product en el panel de administración
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price', 'quantity', 'category', 'created_at')  # Campos en la lista
    search_fields = ('name', 'description', 'category__name')  # Búsqueda por nombre, descripción o categoría
    list_filter = ('category', 'price', 'country_of_origin')  # Filtros por categoría, precio y país de origen
    ordering = ('-created_at',)  # Ordena por fecha de creación (más reciente primero)
    readonly_fields = ('created_at', 'updated_at')  # Campos de solo lectura

    # Permite edición en línea de campos específicos
    list_editable = ('price', 'quantity', 'category')  # Permite editar estos campos desde la lista

    # Personaliza cómo se visualizan los detalles del producto
    fieldsets = (
        ('Información Básica', {
            'fields': ('name', 'description', 'price', 'quantity', 'category', 'available_sizes', 'country_of_origin')
        }),
        ('Media', {
            'fields': ('image',),
        }),
        ('Fechas', {
            'fields': ('created_at', 'updated_at'),
        }),
    )

    # Permite agregar y editar imágenes desde el admin
    def save_model(self, request, obj, form, change):
        if 'image' in form.changed_data and obj.image:
            obj.image.name = f'products/{obj.image.name}'  # Ubicación personalizada
        super().save_model(request, obj, form, change)