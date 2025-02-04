from rest_framework import serializers
from .models import Product, MainCategory, SubCategory
from django.contrib.auth.models import User

class MainCategorySerializer(serializers.ModelSerializer):
    subcategories = serializers.SerializerMethodField()

    class Meta:
        model = MainCategory
        fields = ['id', 'name', 'subcategories']

    def get_subcategories(self, obj):
        include_subcategories = self.context.get('include_subcategories', False)
        if include_subcategories:
            subcategories = obj.subcategories.all()
            return SubCategorySerializer(subcategories, many=True).data
        return None


class SubCategorySerializer(serializers.ModelSerializer):
    main_category = MainCategorySerializer(read_only=True)  # Serializador anidado para la categoría principal
    main_category_id = serializers.PrimaryKeyRelatedField(
        queryset=MainCategory.objects.all(), source='main_category', write_only=True
    )  # Para asignar la categoría principal al crear/actualizar

    class Meta:
        model = SubCategory
        fields = ['id', 'name', 'main_category', 'main_category_id']


class ProductSerializer(serializers.ModelSerializer):
    category = SubCategorySerializer(read_only=True)  # Serializador anidado para la subcategoría
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=SubCategory.objects.all(), source='category', write_only=True
    )  # Para asignar la subcategoría al crear/actualizar
    image = serializers.ImageField(required=False)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'price', 'quantity', 
            'country_of_origin', 'available_sizes', 'category', 
            'category_id', 'image', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    confirm_password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'confirm_password')

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"password": "Las contraseñas no coinciden."})
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')  # Eliminamos el campo de confirmación
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
