import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';
import { toast } from 'react-toastify';

function ProductDetails({ onAddToCart }) { // Recibe la función para agregar al carrito
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`http://192.168.0.102:8000/api/products/${id}/`)
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
    setQuantity(Number(e.target.value));
  };

  const handleAddToCartClick = () => {
    if (!selectedSize) {
      toast.warn('Por favor, selecciona una talla para continuar.');
      return;
    }
  
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      quantity,
    };
  
    // Verifica si onAddToCart está disponible y se ejecuta
    console.log('onAddToCart:', onAddToCart); // Verifica si la función está definida
    if (onAddToCart) {
      onAddToCart(cartItem); 
      toast.success('Producto agregado al carrito');
    } else {
      toast.error('No se pudo agregar al carrito');
    }
  };
  

  return (
    <div className="product-details">
      <img src={product.image || 'https://via.placeholder.com/150'} alt={product.name} />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p><strong>Precio:</strong> ${product.price}</p>
      <p><strong>País de origen:</strong> {product.country_of_origin}</p>
      <p><strong>Disponibilidad:</strong> {product.quantity} unidades</p>

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

      <button onClick={handleAddToCartClick} className="add-to-cart-button">
        Agregar al carrito
      </button>
    </div>
  );
}

export default ProductDetails;
