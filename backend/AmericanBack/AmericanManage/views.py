from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Product
from .serializers import ProductSerializer, RegisterSerializer
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
        # Imprimir los datos recibidos para depurar
        print("Datos recibidos en la solicitud:", request.data)

        # Crear el serializador con los datos recibidos
        serializer = ProductSerializer(data=request.data)

        # Verificar si el serializador es válido
        if serializer.is_valid():
            print("Datos validados:", serializer.validated_data)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Mostrar los errores de validación
            print("Errores de validación:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
class ProductListAPIView(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    # Vista para obtener los detalles de un solo producto
class ProductDetailAPIView(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'id'  # Esto permite que la consulta se haga usando el id

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
            # Generar tokens JWT
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "username": user.username,
            }, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Credenciales inválidas."}, status=status.HTTP_401_UNAUTHORIZED)
