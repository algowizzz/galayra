import { useEffect, useState } from "react";
import api from "../api/api";

export default function ProfileWishlist() {
  const [items,setItems]=useState([]);

  useEffect(()=>{
    api.get("/users/wishlist")
      .then(res=>setItems(res.data))
      .catch(()=>setItems([]));
  },[]);

  return (
    <div className="profile-page">
      <h2>Wishlist</h2>

      {items.length===0 ? (
        <p>No wishlist items</p>
      ):(
        <div className="wishlist-grid">
          {items.map(item=>(
            <div key={item._id} className="wishlist-card">
              <div>{item.name}</div>
              <div>₹{item.price}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
