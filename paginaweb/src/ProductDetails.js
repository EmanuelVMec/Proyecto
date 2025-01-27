import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetails.css';
import { toast } from 'react-toastify';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Obtener los detalles del producto desde la API
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/products/${id}/`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => {
        console.error('Error fetching product:', error);
        toast.error('Hubo un problema al cargar los detalles del producto');
      });
  }, [id]);

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
      <img src={product.image || 'https://via.placeholder.com/150'} alt={product.name} />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p><strong>Precio:</strong> ${product.price}</p>
      <p><strong>País de origen:</strong> {product.country_of_origin}</p>
      <p><strong>Disponibilidad:</strong> {product.quantity} unidades</p>
      <p>
        <strong>Categoría principal:</strong> {product.category.main_category.name}
      </p>
      <p>
        <strong>Subcategoría:</strong> {product.category.name}
      </p>

      <div>
        <label>Talla:</label>
        <select value={selectedSize} onChange={handleSizeChange}>
          <option value="">Seleccionar talla</option>
          {product.available_sizes.split(',').map((size, index) => (
            <option key={index} value={size}>
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
