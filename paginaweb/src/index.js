import { ClerkProvider } from '@clerk/clerk-react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ClerkProvider publishableKey="pk_test_cHJvbXB0LW1lZXJrYXQtMi5jbGVyay5hY2NvdW50cy5kZXYk">
  <App />
  </ClerkProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
