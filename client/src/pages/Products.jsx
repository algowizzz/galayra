import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <section className="products-grid">
      <div className="products-header">
        <h1>All Products</h1>
      </div>

      {products.map(product => (
        <Link
          key={product.id}
          to={`/product/${product.id}`}
          className="product-card"
        >
          <div className="product-image">
            <img src={product.image_url} alt={product.title} />
          </div>
          <div className="product-title">{product.title}</div>
          <div className="product-price">
            ${product.variants?.[0]?.price}
          </div>
        </Link>
      ))}
    </section>
  );
}
