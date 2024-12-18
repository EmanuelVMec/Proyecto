from rest_framework import serializers, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Product, ProductPhoto

# Serializers

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class ProductPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductPhoto
        fields = '__all__'

# ViewSets

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    @action(detail=True, methods=['get'])
    def photos(self, request, pk=None):
        """
        Retrieve all photos for a specific product.
        """
        product = get_object_or_404(Product, pk=pk)
        photos = product.fotos.all()
        serializer = ProductPhotoSerializer(photos, many=True)
        return Response(serializer.data)

class ProductPhotoViewSet(viewsets.ModelViewSet):
    queryset = ProductPhoto.objects.all()
    serializer_class = ProductPhotoSerializer