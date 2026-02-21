import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const res = await api.get("/cart");
    setCart(res.data.items || []);
  };

  useEffect(() => { loadCart(); }, []);

  const addToCart = async (product) => {
    await api.post("/cart", {
      product_id: product.id,
      variant_id: product.variants?.[0]?.printify_variant_id,
      title: product.name,
      price: product.price,
      image_url: product.image,
      quantity: 1
    });
    loadCart();
  };

  const removeFromCart = async (id) => {
    await api.delete(`/cart/${id}`);
    loadCart();
  };

  const updateQty = async (id, quantity) => {
    await api.put(`/cart/${id}`, { quantity });
    loadCart();
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty }}>
      {children}
    </CartContext.Provider>
  );
}
