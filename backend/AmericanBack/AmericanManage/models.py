from django.db import models

# Modelo de Categoría Principal
class MainCategory(models.Model):
    name = models.CharField(max_length=255, unique=True)  # Ejemplo: Mujer, Hombre, Bebé

    def __str__(self):
        return self.name

# Modelo de Subcategoría
class SubCategory(models.Model):
    name = models.CharField(max_length=255)  # Ejemplo: Casual, Oficina, Deportiva
    main_category = models.ForeignKey(MainCategory, on_delete=models.CASCADE, related_name='subcategories')

    def __str__(self):
        return f"{self.name} ({self.main_category.name})"

# Modelo de Producto
class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()
    country_of_origin = models.CharField(max_length=255)
    available_sizes = models.TextField()  # Ejemplo: "S, M, L, XL"
    category = models.ForeignKey(SubCategory, on_delete=models.SET_NULL, null=True, related_name='products')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    image = models.ImageField(upload_to='media')

    def __str__(self):
        return self.name
