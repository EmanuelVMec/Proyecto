import React, { useEffect, useState } from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaSearch, FaShoppingCart } from 'react-icons/fa';
import logo from './amag.png';
import { useUser, SignOutButton, SignInButton } from '@clerk/clerk-react';
import axios from 'axios';

function Header({ cartItems, onAddToCart, onClearCart }) {
  const { user } = useUser();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mainCategories, setMainCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Obtener las categorías principales y subcategorías desde el backend
  useEffect(() => {
    axios.get('http://192.168.0.102:8000/api/main-categories/')
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

  // Manejar la búsqueda y redirigir a la página de resultados
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      return;
    }

    try {
      const response = await axios.get(`http://192.168.0.102:8000/api/products/search/?search=${encodeURIComponent(searchTerm)}`);
      navigate('/search-results', { state: { results: response.data } });
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-btn" onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>

        {/* Autenticación */}
        {user ? (
          <div className="user-info" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontWeight: 'bold', color: '#fff', fontSize: '18px', textShadow: '1px 1px 2px #000' }}>
              👋 Hola, {user.fullName || user.email}
            </span>
            <SignOutButton>
              <button className="logout-btn" style={{
                backgroundColor: '#e74c3c',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                padding: '8px 15px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
              }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#c0392b'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#e74c3c'}
              >
                Cerrar Sesión
              </button>
            </SignOutButton>
          </div>
        ) : (
          <SignInButton>
            <button className="login-btn" style={{
              backgroundColor: '#3498db',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              padding: '8px 10px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
            }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
            >
              <FaUser style={{ marginRight: '8px' }} /> Iniciar Sesión
            </button>
          </SignInButton>
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
