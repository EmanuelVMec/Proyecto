import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./LoginScreen";
import SalesScreen from "./SalesScreen";
import AddProductScreen from "./AddProductScreen"; // Importa la nueva pantalla
import InventoryScreen from "./InventoryScreen";
import CustomersScreen from "./CustomersScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SalesScreen"
          component={SalesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddProductScreen"
          component={AddProductScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InventoryScreen"
          component={InventoryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CustomersScreen"
          component={CustomersScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
