import { createContext, useContext, useEffect, useState } from "react"
import api from "../api/api"

const CartContext = createContext()
export const useCart = () => useContext(CartContext)
export default function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const loadCart = async () => {
    try {
      const res = await api.get("/cart")
      setCart(res.data.items || [])
    } catch (err) {
      console.error("Cart load error:", err)
    }
  }

  useEffect(() => {
    loadCart()
  }, [])

  const addToCart = async (product) => {
    await api.post("/cart", {
      product_id: product.id,
      variant_id: product.variants?.[0]?.printify_variant_id,
      title: product.name,
      price: product.price,
      image_url: product.image,
      quantity: 1
    })
    loadCart()
  }

  const removeFromCart = async (id) => {
    await api.delete(`/cart/${id}`)
    loadCart()
  }

  const updateQty = async (id, quantity) => {
    if (quantity < 1) return
    await api.put(`/cart/${id}`, { quantity })
    loadCart()
  }
  const cartCount = cart.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  )
  const cartTotal = cart.reduce(
    (total, item) =>
      total + (Number(item.price) || 0) * (item.quantity || 0),
    0
  )

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQty
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
