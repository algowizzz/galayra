import { useCart } from "../context/CartContext"
import "../styles/main.css"

export default function CartDrawer() {
  const {
    cartItems,
    updateQty,
    removeFromCart,
    isCartOpen,
    setIsCartOpen
  } = useCart();

  const total = cartItems.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  return (
    <>
      {isCartOpen && (
        <div
          className="cart-overlay"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      <aside className={`cart-panel ${isCartOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h2>Cart ({cartItems.length} item)</h2>
          <button onClick={() => setIsCartOpen(false)}>✕</button>
        </div>

        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} />

            <div className="cart-item-details">
              <p className="item-title">{item.title}</p>
              <p className="item-price">${item.price}</p>
              <p className="item-variant">Size: Medium</p>

              <div className="qty-control">
                <button onClick={() => updateQty(item.id, item.quantity - 1)}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQty(item.id, item.quantity + 1)}>+</button>
              </div>
            </div>

            <div className="item-total">
              ${ (item.price * item.quantity).toFixed(2) }
              <span onClick={() => removeFromCart(item.id)}>🗑</span>
            </div>
          </div>
        ))}

        <hr />

        <div className="promo">
          <span>🏷</span>
          <p>Enter a promo code</p>
        </div>

        <hr />

        <div className="summary">
          <div className="row">
            <span>Estimated total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <p className="note">
            Taxes and shipping are calculated at checkout.
          </p>
        </div>

        <button className="checkout-btn">Checkout</button>
        <button className="view-cart-btn">View Cart</button>

        <p className="secure">🔒 Secure Checkout</p>
      </aside>
    </>
  )
}
