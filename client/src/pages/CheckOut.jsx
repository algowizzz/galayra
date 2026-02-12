import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import * as orderService from '../services/orderService';

const CheckOut = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  
  const [processing, setProcessing] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <h1>Your cart is empty</h1>
        <button className="cta-btn" onClick={() => navigate('/products')}>
          Continue Shopping
        </button>
      </div>
    );
  }

  const shipping = cartTotal > 50 ? 0 : 5.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    
    try {
      await orderService.placeOrder();
      clearCart();
      navigate('/success');
    } catch (err) {
      console.error('Order failed:', err);
      alert('Failed to place order. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  return (
    <div className="checkout-page page-enter page-enter-active">
      <h1 className="section-title" style={{ marginBottom: '40px' }}>Checkout</h1>
      
      <form className="checkout-grid" onSubmit={handleSubmit}>
        <div>
          <div className="checkout-form-section">
            <h2>Shipping Information</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input 
                  id="firstName" 
                  type="text" 
                  required 
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input 
                  id="lastName" 
                  type="text" 
                  required 
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  id="email" 
                  type="email" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input 
                  id="phone" 
                  type="tel" 
                  required 
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input 
                id="address" 
                type="text" 
                required 
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input 
                  id="city" 
                  type="text" 
                  required 
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input 
                  id="state" 
                  type="text" 
                  required 
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="form-group" style={{ maxWidth: '200px' }}>
              <label htmlFor="zip">ZIP Code</label>
              <input 
                id="zip" 
                type="text" 
                required 
                value={formData.zip}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="checkout-form-section">
            <h2>Payment Details</h2>
            <p style={{ color: 'var(--text-light)', fontSize: '14px', marginBottom: '20px' }}>
              🔒 Demo checkout - no real payment processed
            </p>
            
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input 
                id="cardNumber" 
                type="text" 
                placeholder="1234 5678 9012 3456" 
                required 
                value={formData.cardNumber}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiry">Expiry Date</label>
                <input 
                  id="expiry" 
                  type="text" 
                  placeholder="MM/YY" 
                  required 
                  value={formData.expiry}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input 
                  id="cvv" 
                  type="text" 
                  placeholder="123" 
                  required 
                  value={formData.cvv}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="order-summary">
          <h2>Order Summary</h2>
          
          <div className="order-items">
            {cart.map(item => (
              <div key={item._id} className="order-item">
                <div className="order-item-img">
                  {item.image_url || '📱'}
                </div>
                <div className="order-item-details">
                  <div className="order-item-name">{item.title}</div>
                  <div className="order-item-qty">Qty: {item.quantity}</div>
                </div>
                <div className="order-item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          
          <div className="order-totals">
            <div className="order-row">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="order-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="order-row">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="order-row total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="place-order-btn"
            disabled={processing}
          >
            {processing ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckOut;