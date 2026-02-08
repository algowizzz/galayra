import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import api from "../api/axios"
import "../styles/main.css"

export default function Account() {
  const { user, logout, setUser } = useAuth();
  const [active, setActive] = useState("personal");
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    dob: user?.dob || "",
    gender: user?.gender || ""
  });

  const saveProfile = async () => {
    const res = await api.put("/users/profile", form);
    setUser(res.data);
    setEditing(false);
  };

  return (
    <div className="account-page">
      <aside className="account-sidebar">
        <h3>Account Overview</h3>

        <ul>
          <li
            className={active === "personal" ? "active" : ""}
            onClick={() => setActive("personal")}
          >
            Personal Information
          </li>
          <li>Address Book</li>
          <li>Orders</li>
          <li>Wishlist</li>
          <li onClick={logout}>Logout</li>
        </ul>
      </aside>

      <section className="account-content">
        {active === "personal" && (
          <>
            <div className="card">
              <div className="card-header">
                <h3>Personal Information</h3>
                {!editing && (
                  <span className="edit" onClick={() => setEditing(true)}>
                    Edit
                  </span>
                )}
              </div>

              <div className="info-row">
                <label>Name</label>
                <input
                  disabled={!editing}
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="info-row">
                <label>Phone Number</label>
                <input
                  disabled={!editing}
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                />
              </div>

              <div className="info-row">
                <label>Date of Birth</label>
                <input
                  type="date"
                  disabled={!editing}
                  value={form.dob}
                  onChange={e => setForm({ ...form, dob: e.target.value })}
                />
              </div>

              <div className="info-row">
                <label>Gender</label>
                <select
                  disabled={!editing}
                  value={form.gender}
                  onChange={e => setForm({ ...form, gender: e.target.value })}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              {editing && (
                <button className="primary-btn" onClick={saveProfile}>
                  Save Changes
                </button>
              )}
            </div>

            <div className="card">
              <h3>Login Details</h3>

              <div className="info-row">
                <label>Email</label>
                <p>{user.email}</p>
              </div>

              <div className="info-row">
                <label>Password</label>
                <p>************</p>
              </div>
            </div>

            <div className="card">
              <h3>Log out from all web browsers</h3>
              <p>
                This will log you out from all browsers you have used to access
                your account.
              </p>
              <button className="outline-btn" onClick={logout}>
                Log me out
              </button>
            </div>

            <div className="card danger">
              <h3>Manage Account</h3>
              <button className="danger-btn">
                Delete Account
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
