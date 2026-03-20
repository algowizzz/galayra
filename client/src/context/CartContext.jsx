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
    try {
      setCart(prev => {
        const existing = prev.find(
          item =>
            item.product_id === product.id &&
            item.variant_id === product.variant?.printify_variant_id
        )

        if (existing) {
          return prev.map(item =>
            item === existing
              ? { ...item, quantity: item.quantity + (product.quantity || 1) }
              : item
          )
        }

        return [
          ...prev,
          {
            _id: Math.random().toString(),
            product_id: product.id,
            variant_id: product.variant?.printify_variant_id,
            title: product.name,
            price: product.price,
            image_url: product.image,
            quantity: product.quantity || 1
          }
        ]
      })

      setIsCartOpen(true)

      await api.post("/cart", {
        product_id: product.id,
        variant_id: product.variant?.printify_variant_id,
        title: product.name,
        price: product.price,
        image_url: product.image,
        quantity: product.quantity || 1
      })

      loadCart()
    } catch (err) {
      console.error("Add to cart error:", err)
    }
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
