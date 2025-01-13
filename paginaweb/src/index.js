import { ClerkProvider } from '@clerk/clerk-react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
const localization = {
  socialButtonsBlockButton: "Continuar con {{provider|titleize}}",
  formFieldLabel__emailAddress: "Correo Electrónico",
  formFieldLabel__password: "Contraseña",
  formFieldLabel__firstName: "Nombre",
  formFieldLabel__lastName: "Apellido",
  signInButton: "Iniciar Sesión",
  signUpButton: "Registrarse",
  signOutButton: "Cerrar Sesión",
  backButton: "Volver",
  signInWelcome: "¡Bienvenido!",
  signUpWelcome: "¡Crea tu cuenta!",
  signInstarttitle: "peo",
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ClerkProvider publishableKey="pk_test_cHJvbXB0LW1lZXJrYXQtMi5jbGVyay5hY2NvdW50cy5kZXYk" localization={localization}>
  <App />
  </ClerkProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
