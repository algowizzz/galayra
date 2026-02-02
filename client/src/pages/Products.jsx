import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/main.css";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <section className="category-page">
      <div className="category-header">
        <h1>Mobile Cases</h1>
        <p>
          This is your category description. It's a great place to tell customers
          what this category is about, connect with your audience and draw attention
          to your products.
        </p>
      </div>

      <div className="product-count">
        {products.length} products
      </div>

      <div className="product-grid">
        {products.map(product => {
          const price = product.variants?.[0]?.price;
          const compareAt = product.compare_at_price;

          return (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="product-card"
            >
              <div className="image-box">
                {compareAt && <span className="badge">-20%</span>}
                <img src={product.image_url} alt={product.title} />
              </div>

              <div className="product-info">
                <p className="product-title">{product.title}</p>

                <div className="product-price">
                  {compareAt && (
                    <span className="old-price">${compareAt}</span>
                  )}
                  <span className="new-price">${price}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
