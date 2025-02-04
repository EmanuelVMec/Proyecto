import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';
import './Checkout.css';

const stripePromise = loadStripe('pk_test_51QolMGPo0IZpSmKa1kiDBXkUd5j0hTV4L8V2a5uGAWciVAHIZWmTwWEiFv59zQwAIWRG7F43PaAw8Z2M4ysyTwNP00lsC4wK20');

const CheckoutForm = ({ totalAmount, cartItems, updateQuantity, removeItem,onClearCart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [billingDetails, setBillingDetails] = useState({ name: '', email: '', address: '' });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (paymentMethod === 'stripe') {
      if (!stripe || !elements) return;

      const { paymentIntent, error } = await stripe.confirmCardPayment('sk_test_51QolMGPo0IZpSmKabqnabkB8HHbppZGCVWizjfxLWwTZMVE6EluBi5jPUKLgAFNwvPP4RAbaGIAM1CN0AcNLuXW500FFGqaQDc', {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: billingDetails,
        },
      });

      if (error) {
        console.error('Error en el pago:', error);
      } else if (paymentIntent.status === 'succeeded') {
        alert('Pago exitoso');
      }
    } else {
      alert('Compra confirmada con pago contra entrega');
    }
    setLoading(false);
  };
  const clearCart = () => {
    onClearCart();
  };

  return (
    <div className="checkout-container">
      <div className="checkout-steps">
        <button className={step === 1 ? 'active' : ''} onClick={() => setStep(1)}>Resumen de compra</button>
        <button className={step === 2 ? 'active' : ''} onClick={() => setStep(2)}>Información</button>
        <button className={step === 3 ? 'active' : ''} onClick={() => setStep(3)}>Método de Pago</button>
      </div>
      
      {step === 1 && (
        <div className="cart-summary">
          <h2>Tu Carrito</h2>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-img" />
                <div className="cart-info">
                  <p>{item.name}</p>
                  <p>Precio: ${Number(item.price).toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <p className="item-total">${(Number(item.price) * item.quantity).toFixed(2)}</p>
                <button className="remove-btn"  onClick={clearCart}>🗑</button>
              </li>
            ))}
          </ul>
          <h3>Total: ${totalAmount.toFixed(2)}</h3>
          <button onClick={() => setStep(2)} className="checkout-btn">Continuar</button>
        </div>
      )}

      {step === 2 && (
        <form className="checkout-form" onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
          <h2>Datos de Facturación</h2>
          <input type="text" placeholder="Nombre completo" value={billingDetails.name} onChange={(e) => setBillingDetails({ ...billingDetails, name: e.target.value })} required />
          <input type="email" placeholder="Correo electrónico" value={billingDetails.email} onChange={(e) => setBillingDetails({ ...billingDetails, email: e.target.value })} required />
          <input type="text" placeholder="Dirección" value={billingDetails.address} onChange={(e) => setBillingDetails({ ...billingDetails, address: e.target.value })} required />
          <button type="submit" className="checkout-btn">Siguiente</button>
        </form>
      )}

      {step === 3 && (
        <form className="checkout-form" onSubmit={handlePayment}>
          <h2>Método de Pago</h2>
          <label>
            <input type="radio" name="payment" value="stripe" checked={paymentMethod === 'stripe'} onChange={() => setPaymentMethod('stripe')} />
            Tarjeta de crédito/débito (Stripe)
          </label>
          <label>
            <input type="radio" name="payment" value="cash" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} />
            Pago Contra Entrega
          </label>
          {paymentMethod === 'stripe' && <CardElement className="card-element" />}
          <button type="submit" className="checkout-btn" disabled={loading}>{loading ? 'Procesando...' : 'Confirmar Compra'}</button>
        </form>
      )}
    </div>
  );
};

const Checkout = () => {
  const location = useLocation();
  const [cartItems, setCartItems] = useState(location.state?.cartItems || []);
  const totalAmount = cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0);

  const updateQuantity = (id, newQuantity) => {
    setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm totalAmount={totalAmount} cartItems={cartItems} updateQuantity={updateQuantity} removeItem={removeItem} />
    </Elements>
  );
};

export default Checkout;