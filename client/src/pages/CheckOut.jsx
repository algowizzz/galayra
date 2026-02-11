import { useCart } from "../context/CartContext";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cartItems, cartTotal } = useCart();
  const navigate = useNavigate();

  const placeOrder = async () => {
    await api.post("/orders");
    navigate("/success");
  };

  return (
    <div style={{ padding: "140px 60px" }}>
      <h1>Checkout</h1>
      <h3>Total: ${cartTotal.toFixed(2)}</h3>
      <button className="checkout-btn" onClick={placeOrder}>
        Place Order
      </button>
    </div>
  );
}
