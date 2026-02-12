import { useEffect, useState } from "react"
import { Link, useSearchParams, useNavigate } from "react-router-dom"
import "../styles/main.css"

export default function Products() {
  const [products, setProducts] = useState([])
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const searchQuery = searchParams.get("search")?.toLowerCase() || ""

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery)
  )

  return (
    <div className="products-page">
      <div className="products-hero">
        <button className="back-home" onClick={() => navigate("/")}>
          ← Back to Home
        </button>

        <h1>All Products</h1>
        <p>Explore our complete collection of premium phone cases</p>
      </div>

      <div className="products-toolbar">
        <div className="filters">
          <span className="filter-label">FILTERS</span>
          <div className="filter-pills">
            <button className="pill active">All</button>
            <button className="pill">iPhone</button>
            <button className="pill">Samsung</button>
            <button className="pill">Google Pixel</button>
          </div>
        </div>

        <div className="sort">
          <label>Sort by:</label>
          <select>
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <p className="no-products">No products found.</p>
        ) : (
          filteredProducts.map(product => {
            const price = product.variants?.[0]?.price

            return (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="product-card"
              >
                <div className="card-image-wrapper">
                  <div className="card-image-bg">
                    <img
                      src={product.image_url}
                      alt={product.title}
                    />
                  </div>
                </div>

                <h3 className="card-title">{product.title}</h3>
                <p className="card-model">{product.model || ""}</p>

                <div className="card-bottom">
                  <span className="card-price">${price}</span>
                  <button className="add-btn">Add</button>
                </div>
              </Link>
            )
          })
        )}
      </div>
    </div>
  )
}
