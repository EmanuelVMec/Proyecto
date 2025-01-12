import React, { useState } from 'react';
import './Modal.css';

function Modal({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);

  const switchForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>
        {isLogin ? (
          <form className="form">
            <label>Email:</label>
            <input type="email" placeholder="Tu correo" required />
            <label>Contraseña:</label>
            <input type="password" placeholder="Tu contraseña" required />
            <button type="submit" className="submit-btn">Iniciar Sesión</button>
          </form>
        ) : (
          <form className="form">
            <label>Nombre:</label>
            <input type="text" placeholder="Tu nombre" required />
            <label>Email:</label>
            <input type="email" placeholder="Tu correo" required />
            <label>Contraseña:</label>
            <input type="password" placeholder="Tu contraseña" required />
            <button type="submit" className="submit-btn">Registrarse</button>
          </form>
        )}
        <p>
          {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}{' '}
          <span onClick={switchForm} className="switch-link">
            {isLogin ? 'Regístrate aquí' : 'Inicia sesión aquí'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Modal;
