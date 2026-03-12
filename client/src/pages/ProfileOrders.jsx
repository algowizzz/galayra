import { useEffect, useState } from "react";
import api from "../api/api";

export default function ProfileOrders() {
  const [orders,setOrders]=useState([]);

  useEffect(()=>{
    api.get("/orders/my-orders")
      .then(res=>setOrders(res.data))
      .catch(()=>setOrders([]));
  },[]);

  return (
    <div className="profile-page">
      <h2>Your Orders</h2>

      {orders.length===0 ? (
        <p>No orders yet</p>
      ):(
        orders.map(order=>(
          <div key={order._id} className="order-item">
            <div>
              <div>Order #{order._id.slice(-6)}</div>
              <div>{new Date(order.createdAt).toDateString()}</div>
            </div>
            <div>₹{order.totalPrice}</div>
          </div>
        ))
      )}
    </div>
  );
}

