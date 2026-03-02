import { useCart } from "../context/CartContext"
import { useNavigate } from "react-router-dom"

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQty,
    cartTotal
  } = useCart()

  const navigate = useNavigate()

  return (
    <>
      <div
        className={`cart-overlay ${isCartOpen ? "open" : ""}`}
        onClick={() => setIsCartOpen(false)}
      />
      <div className={`cart-drawer ${isCartOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button
            className="close-cart"
            onClick={() => setIsCartOpen(false)}
          >✕</button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <p>Your cart is empty</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item._id} className="cart-item">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="cart-item-image"
                />
                <div className="cart-item-info">
                  <div className="cart-item-title">
                    {item.title}
                  </div>
                  <div className="cart-item-price">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
                <div className="cart-item-actions">
                  <button
                    className="remove-item"
                    onClick={() => removeFromCart(item._id)}
                  >🗑️</button>
                  <div className="cart-item-quantity">
                    <button
                      className="cart-qty-btn"
                      onClick={() => updateQty(item._id, item.quantity - 1)}
                    >-</button>
                    <span>{item.quantity}</span>
                    <button
                      className="cart-qty-btn"
                      onClick={() => updateQty(item._id, item.quantity + 1)}
                    >+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-subtotal">
              <span>Subtotal</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>

            <button
              className="checkout-btn"
              onClick={() => {
                setIsCartOpen(false)
                navigate("/checkout")
              }}
            >Checkout</button>
          </div>
        )}
      </div>
    </>
  )
}
