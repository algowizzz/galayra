import { useContext, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const navigate = useNavigate();
  const { products, loading } = useContext(ProductsContext);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("featured");
  const filters = ["All", "iPhone", "Samsung", "Google Pixel"];

  const mappedProducts = useMemo(() => {
    if (!products) return [];

    return products.flatMap((product) =>
      (product.variants || []).map((v) => ({
        id: product._id + "-" + v.printify_variant_id,
        productId: product._id,
        name: product.title,
        model: v.title,
        price: v.price,
        image: product.image_url,
        category:
          v.title?.toLowerCase().includes("iphone")
            ? "iPhone"
            : v.title?.toLowerCase().includes("samsung")
            ? "Samsung"
            : "Google Pixel",
      }))
    );
  }, [products]);

  let filtered =
    filter === "All"
      ? mappedProducts
      : mappedProducts.filter((p) => p.category === filter);

  if (sort === "price-low")
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "price-high")
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === "name")
    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="products-page page-enter page-enter-active">
      <div className="products-header">
        <h1 className="section-title">All Products</h1>
        <p className="section-subtitle">
          Find your perfect match from our collection
        </p>
      </div>

      <div className="filters-bar">
        <div className="filter-pills">
          {filters.map((f) => (
            <button
              key={f}
              className={`filter-pill ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <select
          className="sort-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>

      <section className="products-section">
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px" }}>
            <div className="loading-spinner"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px" }}>
            No products found
          </div>
        ) : (
          <div className="products-grid">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => navigate(`/product/${product.productId}`)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
