import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import axios from "axios"; // Importamos Axios

const InventoryScreen = () => {
  const [data, setData] = useState([]); // Estado para los productos
  const [loading, setLoading] = useState(true); // Estado para la carga
  const [error, setError] = useState(null); // Estado para errores

  // Función para obtener productos del backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://172.20.10.2:8000/api/viewproducts/"); // Cambia la IP según tu servidor
      setData(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("No se pudieron cargar los productos");
      setLoading(false);
    }
  };

  // Función para eliminar un producto
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://172.20.10.2:8000/api/products/${id}/delete/`);
      // Filtramos el producto eliminado del estado
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("No se pudo eliminar el producto");
    }
  };

  // Llamada al cargar el componente
  useEffect(() => {
    fetchProducts();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: item.image || "https://via.placeholder.com/60x60" }} // Valor por defecto para la imagen
        style={styles.itemImage}
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemInfo}>
          {item.available_sizes}, ${item.price}, {item.country_of_origin}
        </Text>
      </View>
      {/* Botón de eliminar */}
      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteProduct(item.id)}>
        <Text style={styles.deleteText}>❌</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loaderText}>Cargando productos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Inventario</Text>
        <TouchableOpacity>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar en inventario"
        placeholderTextColor="#888"
      />

      {/* Inventory List */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  searchIcon: {
    fontSize: 24,
    color: "#fff",
  },
  searchInput: {
    backgroundColor: "#222",
    borderRadius: 10,
    padding: 10,
    color: "#fff",
    marginBottom: 15,
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#222",
    borderRadius: 10,
    padding: 10,
    position: "relative", // Esto es necesario para posicionar el ícono de eliminar
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  itemInfo: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 5,
  },
  deleteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 5,
  },
  deleteText: {
    color: "#fff",
    fontSize: 18,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
  },
  loaderText: {
    marginTop: 10,
    color: "#fff",
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
  },
  errorText: {
    color: "#f00",
    fontSize: 16,
  },
});

export default InventoryScreen;
