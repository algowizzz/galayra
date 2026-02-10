import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "../styles/style.css"

export default function HomeProducts() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data.slice(0, 4))) 
      .catch(err => console.error(err))
  }, [])

  return (
    <section className="bestsellers">
      <div className="bestsellers-header">
        <div>
          <h2>Bestsellers</h2>
          <p>Our most-loved designs 💚</p>
        </div>

        <div className="filter-tabs">
          <button className="active">All</button>
          <button>iPhone</button>
          <button>Samsung</button>
        </div>
      </div>

      <div className="bestsellers-grid">
        {products.map(product => {
          const price = product.variants?.[0]?.price
          const compareAt = product.compare_at_price

          return (
            <div key={product._id} className="bestseller-card">
              <div className="card-image">
                {compareAt && <span className="badge sale">-20%</span>}
                {!compareAt && <span className="badge new">NEW</span>}

                <img src={product.image_url} alt={product.title} />
              </div>

              <h3>{product.title}</h3>
              <p className="device">{product.device || "Phone Case"}</p>

              <div className="price-row">
                {compareAt && (
                  <span className="old-price">${compareAt}</span>
                )}
                <span className="price">${price}</span>

                <Link
                  to={`/product/${product._id}`}
                  className="add-btn"
                >
                  Add to Cart
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      <div className="view-all">
        <Link to="/products">View All Products →</Link>
      </div>

    </section>
  )
}
