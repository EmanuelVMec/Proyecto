import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProductList.css'; // Usamos el mismo CSS de ProductList

function ProductFilter({ onAddToCart }) {
  const { subcategory_id } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [subcategoryName, setSubcategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://192.168.0.102:8000/api/products/subcategory/${subcategory_id}/`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products); // Actualizar la lista de productos
        setCategoryName(data.category_name); // Obtener el nombre de la categoría principal
        setSubcategoryName(data.subcategory_name); // Obtener el nombre de la subcategoría
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setError('Error al cargar los productos');
        setLoading(false);
      });
  }, [subcategory_id]);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {/* Título dinámico */}
      <h1>Productos de la categoría {categoryName} - Subcategoría {subcategoryName}</h1>

      {/* Lista de productos */}
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
            {/*<button onClick={() => onAddToCart(product)} className="add-to-cart-button">
              Agregar al carrito}
            </button>*/}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;