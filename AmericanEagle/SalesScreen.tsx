import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SalesScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Ventas</Text>

      

      

      {/* Options */}
      <ScrollView>
        
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
