import React from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";

const customers = [
    { id: "1", name: "Lily", purchases: 1, image: null },
    { id: "2", name: "Sofia", purchases: 2, image: null },
    { id: "3", name: "Olivia", purchases: 3, image: null },
    { id: "4", name: "Emma", purchases: 4, image: null },
    { id: "5", name: "Ava", purchases: 5, image: null },
  ];
const CustomersScreen = () => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.customerContainer}>
      <Image source={item.image} style={styles.profileImage} />
      <View style={styles.textContainer}>
        <Text style={styles.customerName}>{item.name}</Text>
        <Text style={styles.purchaseCount}>{item.purchases} compra{item.purchases > 1 ? "s" : ""}</Text>
      </View>
      <Text style={styles.arrow}>{">"}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Clientes</Text>
      <FlatList
        data={customers}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  customerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  customerName: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  purchaseCount: {
    color: "#a0a0a0",
    fontSize: 14,
  },
  arrow: {
    color: "#a0a0a0",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default CustomersScreen;
