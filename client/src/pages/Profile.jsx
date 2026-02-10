import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import "../styles/main.css";

export default function Account() {
  const { user, setUser, logout } = useAuth();
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    name: user.name || "",
    phone: user.phone || "",
    dob: user.dob || "",
    gender: user.gender || ""
  });

  const saveProfile = async () => {
    const res = await api.put("/users/profile", form);
    setUser(res.data);
    setEditing(false);
  };

  const deleteAccount = async () => {
    if (!window.confirm("Delete your account permanently?")) return;
    await api.delete("/users/delete");
    logout();
  };

  return (
    <div className="account-page">
      <aside className="account-sidebar">
        <h3>Account Overview</h3>
        <ul>
          <li className="active">Personal Information</li>
          <li>Orders</li>
          <li>Wishlist</li>
          <li onClick={logout}>Logout</li>
        </ul>
      </aside>

      <section className="account-content">
        <div className="account-card">
          <div className="account-header">
            <h2>Personal Information</h2>
            {!editing && (
              <button className="edit-btn" onClick={() => setEditing(true)}>
                Edit
              </button>
            )}
          </div>

          <div className="form-grid">
            <div>
              <label>Name</label>
              <input
                disabled={!editing}
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div>
              <label>Date of Birth</label>
              <input
                type="date"
                disabled={!editing}
                value={form.dob}
                onChange={e => setForm({ ...form, dob: e.target.value })}
              />
            </div>

            <div>
              <label>Gender</label>
              <select
                disabled={!editing}
                value={form.gender}
                onChange={e => setForm({ ...form, gender: e.target.value })}
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div>
              <label>Phone Number</label>
              <input
                disabled={!editing}
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
              />
            </div>
          </div>

          {editing && (
            <button className="save-btn" onClick={saveProfile}>
              Save Changes
            </button>
          )}
        </div>

        <div className="account-card">
          <h2>Login Details</h2>
          <p><strong>Email:</strong> {user.email}</p>

          <button className="danger-btn" onClick={deleteAccount}>
            Delete Account
          </button>
        </div>
      </section>
    </div>
  );
}
