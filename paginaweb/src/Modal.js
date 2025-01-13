import React, { useState } from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';
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
          <SignIn afterSignInUrl="/" />
        ) : (
          <SignUp afterSignUpUrl="/" />
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
