import { useState } from "react"
import { useCart } from "../context/CartContext"
import LocationModal from "../components/LocationModal"
import "../styles/main.css"
import { FaTrash, FaTag, FaStickyNote } from "react-icons/fa"

export default function CartPage() {
    const { cartItems, updateQty, removeFromCart } = useCart()
    const [showPromo, setShowPromo] = useState(false)
    const [showNote, setShowNote] = useState(false)
    const [showLocation, setShowLocation] = useState(false)

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    )

    return (
        <section className="cart-page">
            <div className="cart-page-layout">
                <div className="cart-left">
                <h2 className="cart-title">My cart</h2>

                {cartItems.map(item => (
                    <div key={item._id} className="cart-item-row">
                    <img src={item.image_url} className="cart-item-image" />

                    <div className="cart-item-details">
                        <p className="cart-item-name">{item.title}</p>
                        <p className="cart-item-price">${item.price}</p>
                    </div>

                    <div className="cart-item-qty">
                        <button onClick={() => updateQty(item._id, item.quantity - 1)}>−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQty(item._id, item.quantity + 1)}>+</button>
                    </div>

                    <div className="cart-item-right">
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                        <button
                        className="cart-remove"
                        onClick={() => removeFromCart(item._id)}
                        >
                        <FaTrash />
                        </button>
                    </div>
                    </div>
                ))}

                <div className="cart-expand">
                    <div
                    className="cart-expand-title"
                    onClick={() => setShowPromo(!showPromo)}
                    >
                    <FaTag /> Enter a promo code
                    </div>

                    {showPromo && (
                    <div className="cart-expand-box">
                        <input placeholder="e.g., SAVE50" />
                        <button>Apply</button>
                    </div>
                    )}
                </div>

                <div className="cart-expand">
                    <div
                    className="cart-expand-title"
                    onClick={() => setShowNote(!showNote)}
                    >
                    <FaStickyNote /> Add a note
                    </div>

                    {showNote && (
                    <textarea
                        className="cart-note"
                        placeholder="e.g., Leave outside the front door"
                    />
                    )}
                </div>
                </div>

                <div className="cart-summary">
                    <h3>Order summary</h3>

                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>

                    <div className="summary-row">
                        <span>Delivery</span>
                        <span>FREE</span>
                    </div>

                    <div
                        className="summary-location link"
                        onClick={() => setShowLocation(true)}
                        >
                        Maharashtra, India
                    </div>

                    {showLocation && (
                    <LocationModal onClose={() => setShowLocation(false)} />
                    )}

                <div className="summary-divider" />

                <div className="summary-total">
                    <span>Total</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>

                <button className="checkout-btn">Checkout</button>
                <div className="secure">Secure Checkout</div>
                </div>
            </div>
        </section>
    )
}
