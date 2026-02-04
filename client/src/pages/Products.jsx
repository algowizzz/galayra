import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import "../styles/main.css"

export default function Products() {
  const [products, setProducts] = useState([])
  const [searchParams] = useSearchParams()

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
    <section className="category-page">
      <div className="category-header">
        <h1>Mobile Cases</h1>
        <p>
          This is your category description. It's a great place to tell customers
          what this category is about.
        </p>
      </div>

      <div className="product-count">
        {filteredProducts.length} products
      </div>

      <div className="product-grid">
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredProducts.map(product => {
            const price = product.variants?.[0]?.price;

            return (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="product-card"
              >
                <div className="image-box">
                  <img
                    src={product.image_url}
                    alt={product.title}
                  />
                </div>

                <div className="product-info">
                  <p className="product-title">{product.title}</p>
                  <div className="product-price">
                    <span className="new-price">${price}</span>
                  </div>
                </div>
              </Link>
            )
          })
        )}
      </div>
    </section>
  )
}
