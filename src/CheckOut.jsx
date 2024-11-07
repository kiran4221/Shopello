import { useCart } from './context/CartContext';

function CheckOut() {
  const { cart, totalPrice, removeFromCart } = useCart();

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <h3>Cart Summary:</h3>
      <div className="cart-summary">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul>
              {cart.map(item => (
                <li key={item.id} className="cart-item">
                  <p>{item.title} - ${item.price} x {item.quantity}</p>
                  <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <p>Total Price: ${totalPrice}</p>
          </>
        )}
      </div>
      <button className="checkout-btn" disabled={cart.length === 0}>
        Complete Purchase
      </button>
    </div>
  );
}

export default CheckOut;
