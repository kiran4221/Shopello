import { useState, useEffect } from 'react';
import AllProducts from './AllProducts.json';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './context/CartContext';

function Home() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { cart } = useCart();

  useEffect(() => {
    setProducts(AllProducts.data);
  }, []);

  const handleSearch = () => {
    navigate(`/search?query=${searchQuery}`);
  };

  return (
    <div className="Home-Page">
      <h1>E-CommerceApp</h1>

      <div className="search-option">
        <input
          type="text"
          placeholder="Search a product here"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>

      <div className="cart-checkout">
        <Link to="/cart">
          <button className="cart-button">
            Go to Cart ({cart.length})
          </button>
        </Link>
        <Link to="/checkout">
          <button className="checkout-button">Go to Checkout</button>
        </Link>
      </div>

      <h3>Products:</h3>
      <div className="products-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <h2>{product.title}</h2>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            <Link to={`/product/${product.id}`} className="product-link">
              <button className="see-details">View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
