import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetails.css';
import { toast } from 'react-toastify';

const products = [
  {
    id: 1,
    name: 'Camiseta básica',
    description: 'Camiseta 100% algodón, cómoda y ligera.',
    price: 10.00,
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
    price: 25.00,
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
    price: 50.00,
    quantity: 15,
    country: 'Canadá',
    sizes: ['L', 'XL', 'XXL'],
    category: 'Abrigos',
    image: 'https://via.placeholder.com/150',
  },
];

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id));
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <h2>Producto no encontrado</h2>;
  }

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast.warn('Por favor, selecciona una talla para continuar.');
      return;
    }

    navigate('/payment', { state: { product, selectedSize, quantity } });
  };

  return (
    <div className="product-details">
      <img src={product.image} alt={product.name} />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p><strong>Precio:</strong> ${product.price}</p>
      <p><strong>País de origen:</strong> {product.country}</p>
      <p><strong>Disponibilidad:</strong> {product.quantity} unidades</p>

      <div>
        <label>Talla:</label>
        <select value={selectedSize} onChange={handleSizeChange}>
          <option value="">Seleccionar talla</option>
          {product.sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Cantidad:</label>
        <input
          type="number"
          min="1"
          max={product.quantity}
          value={quantity}
          onChange={handleQuantityChange}
        />
      </div>

      <button onClick={handleBuyNow} className="buy-now-button">Comprar ahora</button>
    </div>
  );
}

export default ProductDetails;
