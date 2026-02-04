import { FaTrash } from "react-icons/fa"
import { useCart } from "../context/CartContext"
import { useNavigate } from "react-router-dom"

export default function CartDrawer() {
  const navigate = useNavigate()
  const {
    cartItems,
    updateQty,
    removeFromCart,
    isCartOpen,
    setIsCartOpen
  } = useCart()

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <>
      {isCartOpen && (
        <div
          className="cart-overlay"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      <aside className={`cart-drawer ${isCartOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h2>Cart ({cartItems.length} items)</h2>
          <button
            className="cart-close"
            onClick={() => setIsCartOpen(false)}
          >
            ×
          </button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 && (
            <p>Your cart is empty</p>
          )}

          {cartItems.map(item => (
            <div className="cart-item" key={item._id}>
              <img src={item.image_url} alt={item.title} />

              <div className="cart-info">
                <div className="cart-title">{item.title}</div>
                <div className="cart-price">${item.price}</div>
                <div className="cart-variant">
                  {item.title}
                </div>

                <div className="cart-qty">
                  <button
                    onClick={() =>
                      updateQty(item._id, Math.max(1, item.quantity - 1))
                    }
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQty(item._id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="cart-right">
                <button
                  className="cart-remove"
                  onClick={() => removeFromCart(item._id)}
                >
                <FaTrash />
                </button>
                <div className="cart-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-footer">
          <div className="summary-row">
            <span>Estimated total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <p className="summary-note">
            Taxes and shipping are calculated at checkout.
          </p>

          <button className="checkout-btn">Checkout</button>
          <button
            className="view-cart-btn"
            onClick={() => {
              setIsCartOpen(false);
              navigate("/cart");
            }}
          >
            View Cart
          </button>
          <div className="secure">Secure Checkout</div>
        </div>
      </aside>
    </>
  )
}
