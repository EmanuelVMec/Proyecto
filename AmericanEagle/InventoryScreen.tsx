import React from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, TextInput } from "react-native";

const data = [
  {
    id: "1",
    name: "Black Leather Jacket",
    size: "S",
    price: "$220",
    country: "Italy",
    image: "https://via.placeholder.com/60x60", // Placeholder URL for demo
  },
  {
    id: "2",
    name: "Tweed Blazer",
    size: "M",
    price: "$180",
    country: "France",
    image: "https://via.placeholder.com/60x60",
  },
  {
    id: "3",
    name: "Wool Coat",
    size: "L",
    price: "$250",
    country: "USA",
    image: "https://via.placeholder.com/60x60",
  },
  {
    id: "4",
    name: "Denim Jacket",
    size: "XS",
    price: "$150",
    country: "Japan",
    image: "https://via.placeholder.com/60x60",
  },
];

const InventoryScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemInfo}>
          {item.size}, {item.price}, {item.country}
        </Text>
      </View>
    </View>
  );

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
        keyExtractor={(item) => item.id}
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
});

export default InventoryScreen;
