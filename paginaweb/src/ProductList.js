import React from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';

const products = [
  {
    id: 1,
    name: 'Camiseta básica',
    description: 'Camiseta 100% algodón, cómoda y ligera.',
    price: '$10.00',
    quantity: 50,
    country: 'España',
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Camisetas',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Pantalón casual',
    description: 'Pantalón de tela resistente, ideal para el día a día.',
    price: '$25.00',
    quantity: 30,
    country: 'Italia',
    sizes: ['M', 'L', 'XL'],
    category: 'Pantalones',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Chaqueta de invierno',
    description: 'Chaqueta impermeable y térmica para bajas temperaturas.',
    price: '$50.00',
    quantity: 15,
    country: 'Canadá',
    sizes: ['L', 'XL', 'XXL'],
    category: 'Abrigos',
    image: 'https://via.placeholder.com/150',
  },
];

function ProductList() {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} />
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p><strong>Precio:</strong> {product.price}</p>
          <Link to={`/product/${product.id}`} className="buy-button">Ver más</Link>
        </div>
      ))}
    </div>
  );
}

export default ProductList;