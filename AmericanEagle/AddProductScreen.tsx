import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AddProductScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    country_of_origin: '',
    available_sizes: '',
    category: '',
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://192.168.10.170:8000/api/products/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        
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
        });
      }else {
        const errorData = await response.json();
      }
      }catch(error){
      console.log(error);
      Alert.alert('Error', 'Hubo un problema al conectar con el servidor');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
        <Text style={styles.header}>Add New Product</Text>
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

        <Text style={styles.label}>Descripcion</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Ingrese descripcion"
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

        <Text style={styles.label}>Pais de origen</Text>
        <TextInput
          style={styles.input}
          placeholder="Selecciona el pais de origen"
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

        <Text style={styles.label}>Categoria</Text>
        <TextInput
          style={styles.input}
          placeholder="Seleccionar categoria"
          placeholderTextColor="#aaa"
          value={formData.category}
          onChangeText={(text) => handleInputChange('category', text)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
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
  photosContainer: {
    marginBottom: 30,
  },
  photoOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 10,
  },
  takePhotoText: {
    color: '#aaa',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#0080ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 70,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddProductScreen;
