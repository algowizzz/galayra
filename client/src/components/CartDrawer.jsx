import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartDrawer({ open, setOpen }) {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQty } = useCart();

  const total = cart.reduce((s,i)=>s+i.price*i.quantity,0);

  return (
    <>
      <div className={`cart-overlay ${open?"open":""}`} onClick={()=>setOpen(false)} />

      <div className={`cart-drawer ${open?"open":""}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-cart" onClick={()=>setOpen(false)}>✕</button>
        </div>

        <div className="cart-items">
          {cart.length===0 && <div className="cart-empty">Cart empty</div>}

          {cart.map(item=>(
            <div key={item._id} className="cart-item">
              <div className="cart-item-image">
                <img src={item.image_url} width="60"/>
              </div>

              <div className="cart-item-info">
                <div className="cart-item-title">{item.title}</div>
                <div className="cart-item-price">${item.price}</div>
              </div>

              <div className="cart-item-actions">
                <button className="remove-item" onClick={()=>removeFromCart(item._id)}>🗑</button>

                <div className="cart-item-quantity">
                  <button onClick={()=>updateQty(item._id,item.quantity-1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={()=>updateQty(item._id,item.quantity+1)}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cart.length>0 && (
          <div className="cart-footer">
            <div className="cart-subtotal">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button className="checkout-btn" onClick={()=>navigate("/checkout")}>
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
