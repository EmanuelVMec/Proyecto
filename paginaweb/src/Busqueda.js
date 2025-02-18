import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Busqueda.css';

function Busqueda() {
  const location = useLocation();
  const results = location.state?.results || [];

  return (
    <div className="search-results-container">
      <h2>Resultados de la Búsqueda</h2>
      {results.length === 0 ? (
        <p>No se encontraron resultados.</p>
      ) : (
        <div className="product-list">
          {results.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image || 'https://via.placeholder.com/150'} alt={product.name} />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p><strong>Precio:</strong> ${product.price}</p>
              <p><strong>Categoría principal:</strong> {product.category?.main_category?.name}</p>
              <p><strong>Subcategoría:</strong> {product.category?.name}</p>
              <p><strong>Disponible en tamaños:</strong> {product.available_sizes}</p>
              <Link to={`/product/${product.id}`} className="buy-button">Ver más</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Busqueda;
