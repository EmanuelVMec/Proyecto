import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import './Payment.css';

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, selectedSize, quantity } = location.state || {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardNumber: '',
    cardExpiration: '',
    cardCVC: '',
  });

  if (!product) {
    return <h2>No se encontró información del producto</h2>;
  }

  const totalPrice = (product.price * quantity).toFixed(2);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleConfirmPayment = (e) => {
    e.preventDefault();

    // Validar campos obligatorios
    if (
      !formData.name ||
      !formData.email ||
      !formData.address ||
      !formData.city ||
      !formData.postalCode ||
      !formData.country ||
      !formData.cardNumber ||
      !formData.cardExpiration ||
      !formData.cardCVC
    ) {
      alert('Por favor, complete todos los campos antes de confirmar el pago.');
      return;
    }

    // Configurar el envío del correo electrónico
    const emailParams = {
      to_email: formData.email,
      name: formData.name,
      product_name: product.name,
      description: product.description,
      selected_size: selectedSize,
      quantity,
      total_price: totalPrice,
    };

    // Enviar correo con EmailJS
    emailjs
      .send(
        'service_ekcwkqi', // Reemplaza con tu Service ID
        'template_ep1k7x8', // Reemplaza con tu Template ID
        emailParams,
        'Fp3shpqrtIt7DNKJy' // Reemplaza con tu Public Key
      )
      .then(
        (result) => {
          console.log('Correo enviado con éxito:', result.text);
          alert('¡Factura enviada al correo electrónico!');
          navigate('/');
        },
        (error) => {
          console.error('Error al enviar el correo:', error.text);
          alert(
            'Hubo un error al enviar la factura. Por favor, verifique su conexión a Internet o inténtelo más tarde.'
          );
        }
      );
  };

  return (
    <div className="payment-container">
      <h1>Resumen de Compra</h1>
      <div className="payment-details">
        <img src={product.image} alt={product.name} />
        <h2>{product.name}</h2>
        <p>
          <strong>Descripción:</strong> {product.description}
        </p>
        <p>
          <strong>Talla seleccionada:</strong> {selectedSize}
        </p>
        <p>
          <strong>Cantidad:</strong> {quantity}
        </p>
        <p>
          <strong>Precio unitario:</strong> ${product.price}
        </p>
        <p>
          <strong>Total a pagar:</strong> ${totalPrice}
        </p>
      </div>

      <h2>Datos de Facturación</h2>
      <form onSubmit={handleConfirmPayment} className="payment-form">
        <div className="form-section">
          <label htmlFor="name">Nombre completo</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-section">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-section">
          <label htmlFor="address">Dirección</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-section">
          <label htmlFor="city">Ciudad</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-section">
          <label htmlFor="postalCode">Código Postal</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-section">
          <label htmlFor="country">País</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>

        <h2>Datos de la Tarjeta</h2>
        <div className="form-section">
          <label htmlFor="cardNumber">Número de tarjeta</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-section">
          <label htmlFor="cardExpiration">Fecha de expiración</label>
          <input
            type="text"
            id="cardExpiration"
            name="cardExpiration"
            value={formData.cardExpiration}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-section">
          <label htmlFor="cardCVC">CVC</label>
          <input
            type="text"
            id="cardCVC"
            name="cardCVC"
            value={formData.cardCVC}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="confirm-payment-button">
          Confirmar Pago
        </button>
      </form>
    </div>
  );
}

export default Payment;
