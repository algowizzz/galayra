import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      setCartItems(res.data.items || []);
    } catch {
      setCartItems([]);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (payload, quantity = 1) => {
    await api.post("/cart", { ...payload, quantity });
    fetchCart();
  };

  const updateQty = async (id, quantity) => {
    await api.put(`/cart/${id}`, { quantity });
    fetchCart();
  };

  const removeFromCart = async id => {
    await api.delete(`/cart/${id}`);
    fetchCart();
  };

  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);
  const cartTotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        updateQty,
        removeFromCart,
        isCartOpen,
        setIsCartOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
