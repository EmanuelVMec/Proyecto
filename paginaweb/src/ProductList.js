import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/viewproducts/')  
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);  

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image || 'https://via.placeholder.com/150'} alt={product.name} />
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p><strong>Precio:</strong> ${product.price}</p>
          <p><strong>Categoría principal:</strong> {product.category.main_category.name}</p>
          <p><strong>Subcategoría:</strong> {product.category.name}</p>
          <p><strong>Disponible en tamaños:</strong> {product.available_sizes}</p>
          <Link to={`/product/${product.id}`} className="buy-button">Ver más</Link>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
