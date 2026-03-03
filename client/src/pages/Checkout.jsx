import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const shipping = cartTotal > 50 ? 0 : 5.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  const handleSubmit = (e) => {
    e.preventDefault();
    clearCart();
    navigate("/success");
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <h1>Your cart is empty</h1>
        <button onClick={() => navigate("/products")}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <form className="checkout-grid" onSubmit={handleSubmit}>
        <div>
          <div className="checkout-form-section">
            <h2>Shipping Information</h2>

            <input
              placeholder="First Name"
              required
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />

            <input
              placeholder="Last Name"
              required
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <input
              placeholder="Address"
              required
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>

          <div className="checkout-form-section">
            <h2>Payment</h2>
            <input
              placeholder="Card Number"
              required
              value={formData.cardNumber}
              onChange={(e) =>
                setFormData({ ...formData, cardNumber: e.target.value })
              }
            />
            <input
              placeholder="Expiry"
              required
              value={formData.expiry}
              onChange={(e) =>
                setFormData({ ...formData, expiry: e.target.value })
              }
            />
            <input
              placeholder="CVV"
              required
              value={formData.cvv}
              onChange={(e) =>
                setFormData({ ...formData, cvv: e.target.value })
              }
            />
          </div>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          {cart.map((item) => (
            <div key={item.id}>
              {item.name} x {item.quantity} — $
              {(item.price * item.quantity).toFixed(2)}
            </div>
          ))}
          <hr />
          <p>Subtotal: ${cartTotal.toFixed(2)}</p>
          <p>Shipping: {shipping === 0 ? "FREE" : `$${shipping}`}</p>
          <p>Tax: ${tax.toFixed(2)}</p>
          <h3>Total: ${total.toFixed(2)}</h3>
          <button type="submit" className="place-order-btn">
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
}