import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { Shadow } from "react-native-shadow-2";
import SalesScreen from "./SalesScreen";
import RegisterScreen from "./RegisterScreen";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://192.168.10.170:8000/api/login/", { // Cambia la URL por la de tu servidor
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email, // Django espera el campo 'username' para la autenticación
          password: password,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        Alert.alert("¡Éxito!", `Inicio de sesión exitoso. Bienvenido, ${data.username}.`);
        navigation.navigate(SalesScreen); // Navega a la pantalla de ventas
      } else if (response.status === 401) {
        Alert.alert("Error", "Usuario o contraseña incorrectos.");
      } else {
        Alert.alert("Error", "Ocurrió un problema. Intenta de nuevo más tarde.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      Alert.alert("Error", "Hubo un problema al conectar con el servidor.");
    }
  };

  return (
    <View style={styles.container}>
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

      <Text style={styles.title}>Iniciar sesión</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate(RegisterScreen)}
      >
        <Text style={styles.registerText}>¿No tienes una cuenta? Registrarse</Text>
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
  registerButton: {
    marginTop: 20,
  },
  registerText: {
    color: "#ffffff",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
