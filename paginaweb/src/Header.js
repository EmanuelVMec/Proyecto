import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { FaUser, FaSearch, FaShoppingCart } from 'react-icons/fa';
import logo from './amag.png';
import { useUser, SignOutButton } from '@clerk/clerk-react';

function Header({ cartItems, onAddToCart, onClearCart }) {
  const { user } = useUser();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const clearCart = () => {
    onClearCart(); // Llamar la función onClearCart pasada desde el componente padre
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Logo de American Eagle" />
        </div>
        <nav>
          <ul className="nav-links">
            <li><Link to="/">Inicio</Link></li>
            <li className="dropdown">
              <a href="#">Mujer</a>
              <ul className="dropdown-menu">
                <li><a href="#">Casual</a></li>
                <li><a href="#">Oficina</a></li>
                <li><a href="#">Fiesta</a></li>
                <li><a href="#">Deportiva</a></li>
                <li><a href="#">Abrigos</a></li>
                <li><a href="#">Lencería</a></li>
              </ul>
            </li>
            <li className="dropdown">
              <a href="#">Hombre</a>
              <ul className="dropdown-menu">
                <li><a href="#">Casual</a></li>
                <li><a href="#">Formal</a></li>
                <li><a href="#">Deportiva</a></li>
                <li><a href="#">Abrigos</a></li>
                <li><a href="#">Interior</a></li>
              </ul>
            </li>
            <li className="dropdown">
              <a href="#">Bebé</a>
              <ul className="dropdown-menu">
                <li><a href="#">Recién Nacido</a></li>
                <li><a href="#">Casual</a></li>
                <li><a href="#">Abrigos</a></li>
                <li><a href="#">Dormir</a></li>
                <li><a href="#">Accesorios</a></li>
              </ul>
            </li>
          </ul>
        </nav>

        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar productos..."
          />
          <button className="search-btn">
            <FaSearch />
          </button>
        </div>

        {user ? (
          <div className="user-info">
            <span>Hola, {user.fullName || user.email}</span>
            <SignOutButton>
              <button className="logout-btn">Cerrar Sesión</button>
            </SignOutButton>
          </div>
        ) : (
          <button className="login-btn">
            <FaUser style={{ marginRight: '8px' }} /> Iniciar Sesión
          </button>
        )}

        {/* Carrito lateral */}
        <div className="cart-container">
          <button className="cart-toggle" onClick={toggleCart}>
            <FaShoppingCart />
            <span className="cart-count">{cartItems.length}</span>
          </button>

          {isCartOpen && (
            <div className="cart-sidebar">
              <button className="close-cart" onClick={toggleCart}>
                &times;
              </button>
              <div className="cart-content">
                {cartItems.length === 0 ? (
                  <p>Carrito vacío</p>
                ) : (
                  <ul>
                    {cartItems.map((item, index) => (
                      <li key={index}>
                        <img src={item.image} alt={item.name} />
                        <span>{item.name}</span>
                        <span>{item.size}</span>
                        <span>{item.quantity} x ${item.price}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <a href="#" className="view-cart">FINALIZAR COMPRA</a>
                <button className="clear-cart" onClick={clearCart}>Vaciar carrito</button> {/* Botón de vaciar carrito */}
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
