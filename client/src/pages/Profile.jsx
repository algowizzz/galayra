import { useAuth } from "../context/AuthContext";
import "../styles/main.css";

export default function Profile() {
  const { user } = useAuth();

  if (!user) return null;

  const initial = user.email.charAt(0).toUpperCase();

  return (
    <div className="profile-page">
      <aside className="profile-sidebar">
        <div className="profile-user">
          <div className="profile-avatar">{initial}</div>
          <div>
            <p className="hello">Hello</p>
            <h4>{user.name || user.email}</h4>
          </div>
        </div>

        <ul className="profile-menu">
          <li className="active">My Account</li>
          <li>My Orders</li>
          <li>Returns & Cancel</li>
          <li>My Ratings & Reviews</li>
          <li>My Wishlist</li>
          <li>Payment</li>
          <li>Change Password</li>
        </ul>
      </aside>

      <section className="profile-content">
        <div className="profile-header">
          <h2>Personal Information</h2>
        </div>

        <div className="profile-card">
          <div className="profile-photo">
            <div className="big-avatar">{initial}</div>
          </div>

          <div className="profile-fields">
            <label>Name</label>
            <input value={user.name || ""} disabled />

            <label>Date of Birth</label>
            <input value="—" disabled />

            <label>Gender</label>
            <div className="gender">
              <span className="radio active">Male</span>
              <span className="radio">Female</span>
            </div>

            <label>Phone Number</label>
            <input value="—" disabled />

            <label>Email</label>
            <input value={user.email} disabled />
          </div>
        </div>
      </section>
    </div>
  );
}
