import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { FaUser, FaSearch } from 'react-icons/fa'; // Importamos el ícono de usuario y el ícono de búsqueda
import logo from './amag.png';

function Header({ onLoginClick }) {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo de American Eagle" />
      </div>
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li><a href="#">Mujer</a></li>
          <li><a href="#">Hombre</a></li>
          <li><a href="#">Niños</a></li>
          <li><a href="#">Bebé</a></li>
          <li className="dropdown">
            <a href="#">Categorías</a>
            <ul className="dropdown-menu">
              <li><a href="#">Camisetas</a></li>
              <li><a href="#">Pantalones</a></li>
              <li><a href="#">Abrigos</a></li>
              <li><a href="#">Zapatos</a></li>
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
      <button className="login-btn" onClick={onLoginClick}>
        <FaUser style={{ marginRight: '8px' }} /> Iniciar Sesión
      </button>
    </header>
  );
}

export default Header;
