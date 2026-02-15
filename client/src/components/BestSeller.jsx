import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";
import ProductCard from "./ProductCard";

export default function Bestsellers() {
  const navigate = useNavigate();
  const { products, loading } = useContext(ProductsContext);

  const bestsellers = useMemo(() => {
    if (!products) return [];

    return products.slice(0, 8).map((p) => ({
      id: p._id,
      name: p.title,
      model: p.variants?.[0]?.title || "Available Models",
      price: p.variants?.[0]?.price || 0,
      image: p.image_url,
    }));
  }, [products]);

  return (
    <section className="bestsellers-section">

      <div className="section-header">
        <h2 className="section-title">Bestsellers</h2>
        <p className="section-subtitle">Our most loved designs</p>
      </div>

      {loading ? (
        <div className="loading-area">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="bestsellers-scroll">
          {bestsellers.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => navigate(`/product/${product.id}`)}
            />
          ))}
        </div>
      )}

    </section>
  );
}
