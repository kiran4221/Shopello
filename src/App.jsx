import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home.jsx';
import ProductDetails from './ProductDetails.jsx';
import ShoppingCart from './ShoppingCart.jsx';
import Checkout from './CheckOut.jsx';
import { CartProvider } from './context/CartContext'; 
import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;

