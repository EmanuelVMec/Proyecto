import React, { useEffect, useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { FaUser, FaSearch, FaShoppingCart } from 'react-icons/fa';
import logo from './amag.png';
import { useUser, SignOutButton } from '@clerk/clerk-react';
import axios from 'axios';


function Header({ cartItems, onAddToCart, onClearCart }) {
  const { user } = useUser();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mainCategories, setMainCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener las categorías principales y subcategorías desde el backend
  useEffect(() => {
    axios.get('http://localhost:8000/api/main-categories/')
      .then(response => {
        setMainCategories(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setError('Error al cargar las categorías');
        setLoading(false);
      });
  }, []);

  // Alternar la visibilidad del carrito
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Vaciar el carrito
  const clearCart = () => {
    onClearCart();
  };
  

  // Mostrar un mensaje de carga o error
  if (loading) return <p>Cargando categorías...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <header className="header">
        {/* Logo */}
        <div className="logo">
          <img src={logo} alt="Logo de la tienda" />
        </div>

        {/* Navegación */}
        <nav>
          <ul className="nav-links">
            <li><Link to="/">Inicio</Link></li>
            {mainCategories.map(mainCategory => (
              <li className="dropdown" key={mainCategory.id}>
                <a href="#">{mainCategory.name}</a>
                <ul className="dropdown-menu">
                  {mainCategory.subcategories.map(subcategory => (
                    <li key={subcategory.id}>
                      <Link to={`/products/subcategory/${subcategory.id}`}>
                        {subcategory.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>

        {/* Barra de búsqueda */}
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

        {/* Autenticación */}
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

        {/* Carrito de compras */}
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
                <Link to="/checkout" state={{ cartItems }} className="view-cart">
  FINALIZAR COMPRA
</Link>

                <button className="clear-cart" onClick={clearCart}>Vaciar carrito</button>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;