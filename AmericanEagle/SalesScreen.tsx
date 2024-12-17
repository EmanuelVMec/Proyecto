import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SalesScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Ventas</Text>

      {/* Total Sales */}
      <View style={styles.salesContainer}>
        <Text style={styles.salesLabel}>Total de ventas</Text>
        <Text style={styles.salesAmount}>$5,943</Text>
        <Text style={styles.salesIncrease}>
          Últimos 30 días <Text style={styles.percent}>+12%</Text>
        </Text>
      </View>

      {/* Graph Placeholder */}
      <View style={styles.graphContainer}>
        <Text style={styles.graphPlaceholder}>[ Gráfica aquí ]</Text>
      </View>

      {/* Time Ranges */}
      <View style={styles.timeRangeContainer}>
        {['Hoy', 'Esta semana', 'Este mes', '3 meses', '1 año'].map((item, index) => (
          <Text key={index} style={styles.timeRangeText}>
            {item}
          </Text>
        ))}
      </View>

      {/* Options */}
      <ScrollView>
        <TouchableOpacity style={styles.option}
        onPress={() => navigation.navigate('CustomersScreen')}
        >
          <Text style={styles.optionText}>Clientes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}
            onPress={() => navigation.navigate('InventoryScreen')}
        >
          <Text style={styles.optionText}>Inventario rápido</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('AddProductScreen')}
        >
          <Text style={styles.optionText}>Agregar producto</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  salesContainer: {
    marginBottom: 20,
  },
  salesLabel: {
    color: '#aaa',
    fontSize: 16,
  },
  salesAmount: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  salesIncrease: {
    color: '#aaa',
    fontSize: 14,
  },
  percent: {
    color: '#00ff00',
  },
  graphContainer: {
    height: 150,
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  graphPlaceholder: {
    color: '#555',
  },
  timeRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  timeRangeText: {
    color: '#aaa',
    fontSize: 14,
  },
  option: {
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingVertical: 15,
    marginTop: 10,
  },
  navText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default SalesScreen;
