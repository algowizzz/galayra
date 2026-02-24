import { searchAddress } from "../api/location";
import { verifyPincodeMatchesCity } from "../api/pincode";
import { useAddress } from "../context/AddressContext";
import { useState } from "react";

let timer;

export default function ProfileAddresses() {
  const { addresses, createAddress, removeAddress, makeDefault } = useAddress()
  const [adding, setAdding] = useState(false)
  const [search, setSearch] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    pincode: "",
    state: "",
    city: "",
    house: "",
    area: "",
    type: "home",
    isDefault: false
  })

  const handleSearch = (e) => {
    const value = e.target.value
    setSearch(value)
    clearTimeout(timer)

    timer = setTimeout(async () => {
      if (value.length < 3) {
        setSuggestions([])
        return
      }
      const results = await searchAddress(value);
      setSuggestions(results)
    }, 400)
  };

  const selectAddress = (place) => {
    const a = place.address || {}
    setForm(prev => ({
      ...prev,
      area: a.suburb || a.neighbourhood || a.village || "",
      city: a.city || a.town || a.county || "",
      state: a.state || "",
      pincode: a.postcode || ""
    }))
    setSuggestions([])
    setSearch(place.display_name)
  }

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })
  const submit = async (e) => {
    e.preventDefault()
    if (!form.city || !form.pincode) {
      alert("Select address from suggestions")
      return
    }
    setSaving(true)
    const valid = await verifyPincodeMatchesCity(form.pincode, form.city)
    if (!valid) {
      alert("Pincode does not match city. Please select correct address.")
      setSaving(false)
      return
    }
    await createAddress(form)
    setForm({
      fullName: "",
      phone: "",
      pincode: "",
      state: "",
      city: "",
      house: "",
      area: "",
      type: "home",
      isDefault: false
    })

    setSearch("")
    setAdding(false)
    setSaving(false)
  }

  return (
    <div className="profile-page">
      <div className="profile-content">
        <div className="content-header">
          <h2 className="content-title">My Addresses</h2>
          {!adding && (
            <button className="save-profile-btn" onClick={() => setAdding(true)}>
              Add Address
            </button>
          )}
        </div>

        <hr className="profile-divider" />
        <div className="address-list">
          {addresses.length === 0 && (
            <p className="empty-text">No addresses saved</p>
          )}
          {addresses.map(addr => (
            <div key={addr._id} className="address-card">
              <div className="address-info">
                <div className="address-name">
                  {addr.fullName}
                  {addr.isDefault && <span className="default-badge">Default</span>}
                </div>
                <div className="address-text">{addr.house}, {addr.area}</div>
                <div className="address-text">{addr.city}, {addr.state} - {addr.pincode}</div>
                <div className="address-text">{addr.phone}</div>
              </div>
              <div className="address-actions">
                {!addr.isDefault && (
                  <button onClick={() => makeDefault(addr._id)}>Set Default</button>
                )}
                <button onClick={() => removeAddress(addr._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        {adding && (
          <form onSubmit={submit} className="edit-profile-form">
            <h3 className="section-subtitle">Search Address</h3>
            <input
              className="search-input"
              placeholder="Start typing area, city..."
              value={search}
              onChange={handleSearch}
            />
            {suggestions.length > 0 && (
              <div className="address-suggestions">
                {suggestions.map((s, i) => (
                  <div key={i} className="suggestion-item" onClick={() => selectAddress(s)}>
                    {s.display_name}
                  </div>
                ))}
              </div>
            )}
            <h3 className="section-subtitle">Add Details</h3>
            <div className="form-row">
              <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} required />
              <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
            </div>
            <div className="form-row">
              <input value={form.pincode} readOnly placeholder="Pincode" required />
              <input value={form.state} readOnly placeholder="State" required />
            </div>
            <div className="form-row">
              <input value={form.city} readOnly placeholder="City" required />
              <input name="house" placeholder="House / Flat / Building" value={form.house} onChange={handleChange} required />
            </div>
            <input value={form.area} readOnly placeholder="Area / Locality" required />
            <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
              <button className="save-profile-btn" disabled={saving}>
                {saving ? "Validating..." : "Save Address"}
              </button>
              <button type="button" className="logout-btn" onClick={() => setAdding(false)}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
