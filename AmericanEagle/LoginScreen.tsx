import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { Shadow } from "react-native-shadow-2";
import SalesScreen from "./SalesScreen";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  // Función para validar el inicio de sesión
  const handleLogin = () => {
    if (email === "123" && password === "123") {
      Alert.alert("¡Éxito!", "Inicio de sesión exitoso.");
      navigation.navigate(SalesScreen);
    } else {
      Alert.alert("Error", "Usuario o contraseña incorrectos. Intenta de nuevo.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo con efecto 3D palpitante */}
      <Animatable.View
        animation={{
          0: { scale: 1 },
          0.5: { scale: 1.05 },
          1: { scale: 1 },
        }}
        iterationCount="infinite"
        duration={1500}
        easing="ease-in-out"
      >
        <Shadow distance={400} startColor="#007bff50" offset={[0, -50]}>
          <Image source={require("./assets/amag.png")} style={styles.logo} />
        </Shadow>
      </Animatable.View>

      {/* Título */}
      <Text style={styles.title}>Iniciar sesión</Text>

      {/* Inputs */}
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#6c757d"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#6c757d"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Botón */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      {/* Olvidaste contraseña */}
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    top: -70,
    left: 12,
    width: 290,
    height: 290,
    resizeMode: "contain",
    borderRadius: 20,
    marginBottom: -30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 20,
    marginTop: 10,
  },
  input: {
    width: "100%",
    backgroundColor: "#333333",
    color: "#ffffff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    width: "100%",
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#007bff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotPassword: {
    color: "#9fa6b2",
    marginTop: 15,
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
