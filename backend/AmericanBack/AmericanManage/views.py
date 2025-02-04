from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from .models import Product, MainCategory, SubCategory
from .serializers import ProductSerializer, RegisterSerializer,MainCategorySerializer, SubCategorySerializer
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny
import logging

# Configuración del logger
logger = logging.getLogger(__name__)

class AddProductAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        print("Datos recibidos en la solicitud:", request.data)

        # Crear el serializador con los datos recibidos
        serializer = ProductSerializer(data=request.data)

        if serializer.is_valid():
            print("Datos validados:", serializer.validated_data)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("Errores de validación:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductListAPIView(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductDetailAPIView(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'id'


class RegisterAPIView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Usuario registrado correctamente"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # Autenticar al usuario
        user = authenticate(username=username, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "username": user.username,
            }, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Credenciales inválidas."}, status=status.HTTP_401_UNAUTHORIZED)


class ProductDeleteAPIView(APIView):
    permission_classes = [AllowAny]

    def delete(self, request, pk):
        try:
            product = Product.objects.get(id=pk)
            product.delete()
            return Response({"message": "Producto eliminado correctamente"}, status=status.HTTP_204_NO_CONTENT)
        except Product.DoesNotExist:
            return Response({"detail": "Producto no encontrado"}, status=status.HTTP_404_NOT_FOUND)

# Vista para obtener todas las categorías principales con sus subcategorías
class MainCategoryList(generics.ListAPIView):
    queryset = MainCategory.objects.all()
    serializer_class = MainCategorySerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['include_subcategories'] = True  # Incluir subcategorías en la respuesta
        return context

# Vista para obtener las subcategorías de una categoría principal específica
class SubCategoryList(generics.ListAPIView):
    serializer_class = SubCategorySerializer

    def get_queryset(self):
        main_category_id = self.kwargs['main_category_id']
        return SubCategory.objects.filter(main_category_id=main_category_id)
    
class ProductListBySubCategory(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        subcategory_id = self.kwargs['subcategory_id']
        return Product.objects.filter(category_id=subcategory_id)

    def list(self, request, *args, **kwargs):
        # Obtener los productos filtrados
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        # Obtener la subcategoría y la categoría principal
        subcategory_id = self.kwargs['subcategory_id']
        subcategory = SubCategory.objects.get(id=subcategory_id)
        category_name = subcategory.main_category.name
        subcategory_name = subcategory.name

        # Crear una respuesta personalizada
        response_data = {
            'category_name': category_name,
            'subcategory_name': subcategory_name,
            'products': serializer.data,
        }

        return Response(response_data)