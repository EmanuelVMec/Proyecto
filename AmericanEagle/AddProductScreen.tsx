import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AddProductScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
        <Text style={styles.header}>Add New Product</Text>
      </View>

      {/* Input Fields */}
      <View style={styles.form}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput style={styles.input} placeholder="Ingrese nombre" placeholderTextColor="#aaa" />

        <Text style={styles.label}>Descripcion</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Ingrese descripcion"
          placeholderTextColor="#aaa"
          multiline
        />

        <Text style={styles.label}>Precio</Text>
        <TextInput style={styles.input} placeholder="$0.00" placeholderTextColor="#aaa" keyboardType="numeric" />

        <Text style={styles.label}>Cantidad</Text>
        <TextInput style={styles.input} placeholder="1" placeholderTextColor="#aaa" keyboardType="numeric" />

        <Text style={styles.label}>Pais de origen</Text>
        <TextInput style={styles.input} placeholder="Selecciona el pais de origen" placeholderTextColor="#aaa" />

        <Text style={styles.label}>Tamaños disponibles</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Entrar tamaños"
          placeholderTextColor="#aaa"
          multiline
        />

        <Text style={styles.label}>Categoria</Text>
        <TextInput style={styles.input} placeholder="Seleccionar categoria" placeholderTextColor="#aaa" />
      </View>

      {/* Photos Section */}
      <View style={styles.photosContainer}>
        <Text style={styles.label}>Fotos</Text>
        <View style={styles.photoOption}>
          <Text style={styles.takePhotoText}>Tomar fotos</Text>
          <Ionicons name="camera-outline" size={24} color="#fff" />
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.button}>
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
