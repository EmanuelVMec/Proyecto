from django.db import models
# Create your models here.
class Product(models.Model):
    nombre = models.CharField(max_length=255, verbose_name="Nombre")
    descripcion = models.TextField(verbose_name="Descripción", blank=True, null=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Precio")
    cantidad = models.PositiveIntegerField(verbose_name="Cantidad")
    pais_de_origen = models.CharField(max_length=255, verbose_name="País de Origen")
    atamaños_disponibles = models.TextField(verbose_name="Tamaños Disponibles", blank=True, null=True)
    categorias = models.CharField(max_length=255, verbose_name="Categoría")

    def __str__(self):
        return self.nombre

class ProductPhoto(models.Model):
    producto = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="fotos")
    foto = models.ImageField(upload_to="product_photos/", verbose_name="Foto del Producto")

    def __str__(self):
        return f"Foto de {self.producto.nombre}"

