import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import { useState } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png"
})

function LocationMarker({ setAddress }) {
  const [position, setPosition] = useState([18.5204, 73.8567])

  useMapEvents({
    click(e) {
      const lat = e.latlng.lat
      const lng = e.latlng.lng

      setPosition([lat, lng])

      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
        .then(res => res.json())
        .then(data => {
          const addr = data.address || {}

          setAddress(prev => ({
            ...prev,
            address1: data.display_name || "",
            city: addr.city || addr.town || addr.village || "",
            state: addr.state || "",
            pincode: addr.postcode || ""
          }))
        })
    }
  })

  return <Marker position={position} icon={icon} />
}

export default function AddressMap({ setAddress }) {
  return (
    <MapContainer
      center={[18.5204, 73.8567]}
      zoom={13}
      style={{ height: "300px", width: "100%", borderRadius: "12px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker setAddress={setAddress} />
    </MapContainer>
  )
}