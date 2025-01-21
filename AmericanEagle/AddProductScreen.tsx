import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const AddProductScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    country_of_origin: '',
    available_sizes: '',
    category: '',
    image: null, // Estado para la imagen seleccionada
  });

  useEffect(() => {
    // Solicitamos permisos para acceder a la galería
    const getPermissionAsync = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Lo siento, necesitamos permisos para acceder a tu galería.');
      }
    };

    getPermissionAsync();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType, // Usar Images para solo seleccionar imágenes
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setFormData({ ...formData, image: result.assets[0].uri }); // Almacenar URI de la imagen seleccionada
    }
  };

  const handleSubmit = async () => {
    console.log("Datos enviados:", formData);
    
    // Crear un FormData para enviar los datos
    const formDataToSend = new FormData();
  
    // Agregar los campos de texto
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('quantity', formData.quantity);
    formDataToSend.append('country_of_origin', formData.country_of_origin);
    formDataToSend.append('available_sizes', formData.available_sizes);
    formDataToSend.append('category', formData.category);
  
    // Agregar la imagen, si existe
    if (formData.image) {
      formDataToSend.append('image', {
        uri: formData.image, // URI de la imagen
        type: 'image/jpeg',  // Tipo MIME de la imagen
        name: formData.image.split('/').pop(), // Extrae el nombre del archivo
      });
    }
  
    try {
      const response = await fetch('http://192.168.246.78:8000/api/products/', {
        method: 'POST',
        body: formDataToSend, // Aquí pasamos el FormData
      });
  
      if (response.status === 201) {
        Alert.alert('Éxito', 'Producto agregado correctamente');
        setFormData({
          name: '',
          description: '',
          price: '',
          quantity: '',
          country_of_origin: '',
          available_sizes: '',
          category: '',
          image: null, // Limpiar la imagen después de enviar el formulario
        });
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Hubo un problema al agregar el producto');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Hubo un problema al conectar con el servidor');
    }
  };
  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
        <Text style={styles.header}>Agregar Nuevo Producto</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese nombre"
          placeholderTextColor="#aaa"
          value={formData.name}
          onChangeText={(text) => handleInputChange('name', text)}
        />

        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Ingrese descripción"
          placeholderTextColor="#aaa"
          multiline
          value={formData.description}
          onChangeText={(text) => handleInputChange('description', text)}
        />

        <Text style={styles.label}>Precio</Text>
        <TextInput
          style={styles.input}
          placeholder="$0.00"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={formData.price}
          onChangeText={(text) => handleInputChange('price', text)}
        />

        <Text style={styles.label}>Cantidad</Text>
        <TextInput
          style={styles.input}
          placeholder="1"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={formData.quantity}
          onChangeText={(text) => handleInputChange('quantity', text)}
        />

        <Text style={styles.label}>País de origen</Text>
        <TextInput
          style={styles.input}
          placeholder="Selecciona el país de origen"
          placeholderTextColor="#aaa"
          value={formData.country_of_origin}
          onChangeText={(text) => handleInputChange('country_of_origin', text)}
        />

        <Text style={styles.label}>Tamaños disponibles</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Entrar tamaños"
          placeholderTextColor="#aaa"
          multiline
          value={formData.available_sizes}
          onChangeText={(text) => handleInputChange('available_sizes', text)}
        />

        <Text style={styles.label}>Categoría</Text>
        <TextInput
          style={styles.input}
          placeholder="Seleccionar categoría"
          placeholderTextColor="#aaa"
          value={formData.category}
          onChangeText={(text) => handleInputChange('category', text)}
        />

        {/* Sección para seleccionar y mostrar la imagen */}
        <Text style={styles.label}>Foto del Producto</Text>
        <TouchableOpacity onPress={handleImagePick} style={styles.button}>
          <Text style={styles.buttonText}>Seleccionar Imagen</Text>
        </TouchableOpacity>

        {formData.image && (
          <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: formData.image }} style={styles.imagePreview} />
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Agregar Producto</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 80, // Añadir espacio para el botón al final
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  form: {
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 14,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#0080ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#0080ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 70, // Para asegurarse de que el botón tiene espacio
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagePreviewContainer: {
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
  },
});

export default AddProductScreen;
