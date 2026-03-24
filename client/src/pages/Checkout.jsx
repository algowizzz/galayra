import { useState } from "react"
import { useCart } from "../context/CartContext"
import { useNavigate } from "react-router-dom"
import AddressMap from "../components/AddressMap"

export default function Checkout() {
  const { cart, cartTotal } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India"
  })
  const shipping = 0
  const tax = Math.round(cartTotal * 0.08)
  const total = Math.round(cartTotal + tax + shipping)
  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const validateForm = () => {
    return (
      form.firstName &&
      form.lastName &&
      form.email &&
      form.phone &&
      form.address1 &&
      form.city &&
      form.state &&
      form.pincode
    )
  }
  const handleSubmit = async e => {
    e.preventDefault()
    if (!validateForm()) {
      alert("Please fill all required fields")
      return
    }
    try {
      const res = await fetch("http://localhost:3000/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          amount: total
        })
      })
      const data = await res.json()
      const options = {
        key: "rzp_test_ScaUSVrwnLANvF",
        amount: data.amount,
        currency: "INR",
        name: "GALAYRA",
        description: "Order Payment",
        order_id: data.id,
        handler: async function (response) {
          const verifyRes = await fetch("http://localhost:3000/api/payment/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(response)
          })
          const result = await verifyRes.json()
          if (result.success) {
            await fetch("http://localhost:3000/api/orders", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                payment_id: response.razorpay_payment_id,
                items: cart,
                total,
                shipping_address: form
              })
            })
            navigate("/success")
          } else {
            alert("Payment verification failed")
          }
        },
        prefill: {
          name: form.firstName + " " + form.lastName,
          email: form.email,
          contact: form.phone
        },
        theme: {
          color: "#0f172a"
        }
      }
      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch {
      alert("Payment failed")
    }
  }

  return (
    <div className="checkout-page">
      <h1 className="section-title">Checkout</h1>
      <form className="checkout-grid" onSubmit={handleSubmit}>
        <div className="checkout-form">
          <h2>Contact Information</h2>
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
          <h2>Shipping Address</h2>
          <p style={{ fontSize: "14px", marginBottom: "10px" }}>
            Click on map to auto-fill your address
          </p>
          <AddressMap setAddress={setForm} />
          <div className="form-row">
            <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
            <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
          </div>
          <input name="address1" placeholder="Address Line 1" value={form.address1} onChange={handleChange} required />
          <input name="address2" placeholder="Address Line 2 (optional)" value={form.address2} onChange={handleChange} />
          <div className="form-row">
            <input name="city" placeholder="City" value={form.city} onChange={handleChange} required />
            <input name="state" placeholder="State" value={form.state} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <input name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} required />
            <input name="country" value={form.country} disabled />
          </div>
        </div>
        <div className="order-summary">
          <h2>Order Summary</h2>
          {cart.map(item => (
            <div key={item._id} className="order-item">
              <span>{item.title} × {item.quantity}</span>
              <span>₹{Math.round(item.price * item.quantity)}</span>
            </div>
          ))}
          <div className="order-row">
            <span>Subtotal</span>
            <span>₹{Math.round(cartTotal)}</span>
          </div>
          <div className="order-row">
            <span>Shipping</span>
            <span>FREE</span>
          </div>
          <div className="order-row">
            <span>Tax</span>
            <span>₹{tax}</span>
          </div>
          <div className="order-row total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
          <button className="place-order-btn">
            Pay ₹{total}
          </button>
        </div>
      </form>
    </div>
  )
}
