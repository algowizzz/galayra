import { useState } from "react"
import { Link } from "react-router-dom"
import "../styles/main.css"

export default function SearchOverlay({ open, onClose, products }) {
  const [query, setQuery] = useState("")

  if (!open) return null

  const filtered =
    query.trim() === ""
      ? products
      : products.filter(p =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )

  return (
    <div className="search-overlay">
      <div className="search-top">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            autoFocus
            type="text"
            placeholder="Search"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>

        <button className="search-close" onClick={onClose}>
          Close
        </button>
      </div>

      <div className="search-content">
        <h3 className="search-heading">Trending products</h3>

        <div className="search-grid">
          {filtered.slice(0, 5).map(product => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="search-card"
              onClick={onClose}
            >
              <img src={product.image_url} alt={product.title} />
              <p className="search-title">{product.title}</p>
              <p className="search-price">
                ${product.variants?.[0]?.price}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
