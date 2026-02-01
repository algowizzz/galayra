import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomeProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data.slice(0, 8))); 
  }, []);

  return (
    <section className="products-grid">
      <div className="products-header">
        <h1>Best Selling</h1>
      </div>

      {products.map(product => {
        const price = product.variants?.[0]?.price;
        const compareAt = product.compare_at_price; 

        return (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="product-card"
          >
            <div className="product-card-inner">
              {compareAt && <span className="sale-badge">-10%</span>}

              <div className="product-image">
                <img src={product.image_url} alt={product.title} />
              </div>
            </div>

            <div className="product-title">{product.title}</div>

            <div className="product-price">
              {compareAt && (
                <span className="old-price">${compareAt}</span>
              )}
              <span>${price}</span>
            </div>
          </Link>
        );
      })}

      <div className="view-more-wrapper">
        <Link to="/products" className="view-more-btn">
          View More
        </Link>
      </div>
    </section>
  );
}
