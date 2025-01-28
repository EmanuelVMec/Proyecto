import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import ProductList from './ProductList';
import Modal from './Modal';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetails from './ProductDetails';
import Payment from './Payment';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
    toast.success('Producto agregado al carrito');
  };

  const clearCart = () => {
    setCartItems([]); // Vacia el carrito
    toast.info('Carrito vacío');
  };

  return (
    <Router>
      <div className="App">
        <Header 
          cartItems={cartItems} 
          onAddToCart={handleAddToCart} 
          onClearCart={clearCart} // Pasando la función clearCart como prop
        />
        {isModalOpen && <Modal onClose={toggleModal} />}
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails onAddToCart={handleAddToCart} />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
        <ToastContainer 
          position="top-right" 
          autoClose={2700} 
          hideProgressBar={false} 
          newestOnTop={false} 
          closeOnClick 
          rtl={false} 
          pauseOnFocusLoss 
          draggable 
          pauseOnHover 
        />
      </div>
    </Router>
  );
}

export default App;
