import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/main.css";

export default function HomeProducts() {
  const [products, setProducts] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data.slice(0, 8)))
      .catch(err => console.error(err));
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <section className="home-products">
      <h2 className="section-title">New In Store</h2>

      <button className="scroll-btn left" onClick={scrollLeft}>
        ‹
      </button>

      <button className="scroll-btn right" onClick={scrollRight}>
        ›
      </button>

      <div className="products-scroll" ref={scrollRef}>
        {products.map(product => {
          const price = product.variants?.[0]?.price;
          const compareAt = product.compare_at_price;

          return (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="product-card"
            >
              <div className="card-image-wrapper">
                {compareAt && <span className="sale-badge">-10%</span>}

                <img
                  src={product.image_url}
                  alt={product.title}
                  className="product-image"
                />
              </div>

              <p className="product-title">{product.title}</p>

              <div className="product-price">
                {compareAt && (
                  <span className="old-price">${compareAt}</span>
                )}
                <span className="new-price">${price}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
