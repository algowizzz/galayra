import React, { createContext, useState, useEffect, useContext } from 'react';
import * as cartService from '../services/cartService';
import { AuthContext } from './AuthContext';

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] })
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState({ show: false, message: '' })
  
  const { user, isAuthenticated } = useContext(AuthContext)
  useEffect(() => {
    fetchCart();
  }, [user])

  const fetchCart = async () => {
    try {
      setLoading(true)
      const cartData = await cartService.getCart()
      setCart(cartData);
    } catch (err) {
      console.error('Failed to fetch cart:', err)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (product, variantId, quantity = 1) => {
    try {
      setLoading(true)
      const updatedCart = await cartService.addToCart({
        product_id: product._id || product.id,
        variant_id: variantId,
        title: product.title || product.name,
        price: product.price,
        image_url: product.image_url || product.emoji,
        quantity
      })
      setCart(updatedCart)
      showToast(`${product.title || product.name} added to cart!`)
      return { success: true }
    } catch (err) {
      console.error('Failed to add to cart:', err)
      showToast('Failed to add item to cart', 'error')
      return { success: false };
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (itemId, quantity) => {
    try {
      if (quantity < 1) {
        await removeFromCart(itemId)
        return
      }
      
      setLoading(true)
      const updatedCart = await cartService.updateCartItem(itemId, { quantity })
      setCart(updatedCart)
      return { success: true }
    } catch (err) {
      console.error('Failed to update cart:', err)
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  const removeFromCart = async (itemId) => {
    try {
      setLoading(true)
      const updatedCart = await cartService.removeFromCart(itemId)
      setCart(updatedCart)
      showToast('Item removed from cart')
      return { success: true }
    } catch (err) {
      console.error('Failed to remove from cart:', err)
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  const clearCart = () => {
    setCart({ items: [] })
  }

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000)
  }

  const cartTotal = cart.items?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0
  const cartCount = cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0

  const value = {
    cart: cart.items || [],
    cartData: cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
    isCartOpen,
    setIsCartOpen,
    loading,
    toast,
    showToast,
    fetchCart
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
