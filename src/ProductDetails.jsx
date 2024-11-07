import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from './context/CartContext';
import AllProducts from './AllProducts.json';

function ProductDetails() {
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const selectedProduct = AllProducts.data.find((product) => product.id === parseInt(id));
    setProduct(selectedProduct);
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <div className="product-details-page">
      {product ? (
        <>
          <img src={product.image} alt={product.title} className="detail-page-image" />
          <h2>{product.title}</h2>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Rating:</strong> {product.rating.rate} ({product.rating.count} reviews)</p>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
}

export default ProductDetails;
