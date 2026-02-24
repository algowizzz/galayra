import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

export default function ProfileHome() {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    dateOfBirth: ""
  })
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        dateOfBirth: user.dateOfBirth
          ? user.dateOfBirth.substring(0, 10)
          : ""
      })
    }
  }, [user])
  if (!user) return null

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })
  const startEdit = () => setEditing(true)
  const cancelEdit = () => {
    setEditing(false)
    setForm({
      name: user.name || "",
      dateOfBirth: user.dateOfBirth
        ? user.dateOfBirth.substring(0, 10)
        : ""
    })
  }

  const saveProfile = async () => {
    setSaving(true)
    const result = await updateProfile(form);
    setSaving(false);
    if (!result.success) {
      alert(result.message);
      return
    }
    setEditing(false);
    alert("Profile updated successfully");
  }

  return (
    <div className="profile-page">
      <div className="profile-content">
        <div className="content-header">
          <h2 className="content-title">My Profile</h2>
        </div>

        <div className="edit-profile-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              name="name"
              value={form.name}
              disabled={!editing}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input value={user.email} disabled />
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={form.dateOfBirth}
              disabled={!editing}
              onChange={handleChange}
            />
          </div>

          {!editing ? (
            <button className="save-profile-btn" onClick={startEdit}>
              Edit
            </button>
          ) : (
            <div style={{ display: "flex", gap: 10 }}>
              <button
                className="save-profile-btn"
                onClick={saveProfile}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button className="logout-btn" onClick={cancelEdit}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}