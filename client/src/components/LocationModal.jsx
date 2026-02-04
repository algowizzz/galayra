import { Country, State } from "country-state-city"
import { useState } from "react"
import "../styles/main.css"

export default function LocationModal({ onClose }) {
    const countries = Country.getAllCountries()

    const [country, setCountry] = useState(countries[0])
    const [state, setState] = useState(null)
    const [zip, setZip] = useState("")

    const states = State.getStatesOfCountry(country.isoCode)

    return (
        <>
            <div className="modal-overlay" onClick={onClose} />
                <div className="location-modal">
                    <button className="modal-close" onClick={onClose}>×</button>
                    <h2>Select your destination</h2>
                    <label>Country</label>
                    <select
                        value={country.isoCode}
                        onChange={(e) =>
                            setCountry(
                            countries.find(c => c.isoCode === e.target.value)
                            )
                        }
                    >
                        {countries.map(c => (
                            <option key={c.isoCode} value={c.isoCode}>
                                {c.name}
                            </option>
                        ))}
                    </select>

                    <label>Region</label>
                    <select
                        value={state?.isoCode || ""}
                        onChange={(e) =>
                            setState(
                            states.find(s => s.isoCode === e.target.value)
                            )
                        }
                    >
                    <option value="">Select region</option>
                        {states.map(s => (
                            <option key={s.isoCode} value={s.isoCode}>
                            {s.name}
                            </option>
                        ))}
                    </select>

                    <label>Zip / Postal Code</label>
                    <input
                        placeholder="411004"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                    />
                    <button className="location-update">Update</button>
            </div>
        </>
    )
}
