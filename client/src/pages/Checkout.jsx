import { useCart } from "../context/CartContext"
import { useNavigate } from "react-router-dom"

export default function Checkout() {
  const { cart, cartTotal } = useCart()
  const navigate = useNavigate()
  const shipping = cartTotal > 50 ? 0 : 5.99
  const tax = cartTotal * 0.08
  const total = cartTotal + shipping + tax
  const handleSubmit = e => {
    e.preventDefault()
    navigate("/")
  }

  return (
    <div className="checkout-page">
      <h1 className="section-title" style={{ marginBottom: "40px" }}>
        Checkout
      </h1>
      <form className="checkout-grid" onSubmit={handleSubmit}>
        <div>
          <div className="checkout-form-section">
            <h2>Shipping Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" required />
              </div>
            </div>
            <div className="form-group">
              <label>Address</label>
              <input type="text" required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>State</label>
                <input type="text" required />
              </div>
            </div>
            <div className="form-group">
              <label>ZIP Code</label>
              <input type="text" required />
            </div>
          </div>

          <div className="checkout-form-section">
            <h2>Payment Details</h2>
            <div className="form-group">
              <label>Card Number</label>
              <input type="text" placeholder="1234 5678 9012 3456" required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Expiry</label>
                <input type="text" placeholder="MM/YY" required />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input type="text" placeholder="123" required />
              </div>
            </div>
          </div>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="order-items">
            {cart.map(item => (
              <div key={item._id} className="order-item">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="order-item-img"
                />
                <div className="order-item-details">
                  <div className="order-item-name">
                    {item.title}
                  </div>
                  <div className="order-item-qty">
                    Qty: {item.quantity}
                  </div>
                </div>
                <div className="order-item-price">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="order-totals">
            <div className="order-row">
              <span>Subtotal</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
            <div className="order-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? "FREE" : `₹${shipping.toFixed(2)}`}</span>
            </div>
            <div className="order-row">
              <span>Tax</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="order-row total">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
          <button className="place-order-btn">
            Place Order
          </button>
        </div>
      </form>
    </div>
  )
}
