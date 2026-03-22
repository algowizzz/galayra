import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductsContext";

const formatINR = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(amount));

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products } = useProducts();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await api.get(`/products/${id}?currency=INR`);
      setProduct(res.data);
      if (res.data.variants?.length) {
        setSelectedVariant(res.data.variants[0]);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product || !selectedVariant) {
    return <div className="product-detail">Loading...</div>;
  }

  const relatedProducts = products
    .filter((p) => p._id !== product._id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.title,
      image: product.image_url,
      price: selectedVariant.price,
      quantity,
      variant: selectedVariant,
    });
  };

  return (
    <>
      <div className="product-detail">
        <div className="product-detail-grid">
          <div className="product-gallery">
            <img
              src={product.image_url}
              alt={product.title}
              style={{ maxWidth: "100%", borderRadius: "20px" }}
            />
          </div>

          <div className="product-detail-info">
            <h1>{product.title}</h1>
            <div className="product-detail-model">
              {selectedVariant.title}
            </div>
            <div className="product-detail-price">
              {formatINR(selectedVariant.price)}
            </div>
            <div
              className="product-detail-desc"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
            <div className="model-selector">
              <label>Select Model</label>
              <select
                value={selectedVariant._id}
                onChange={(e) =>
                  setSelectedVariant(
                    product.variants.find(
                      (v) => v._id === e.target.value
                    )
                  )
                }
              >
                {product.variants.map((v) => (
                  <option key={v._id} value={v._id}>
                    {v.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="quantity-selector">
              <label>Quantity</label>
              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={() =>
                    setQuantity(Math.max(1, quantity - 1))
                  }
                >
                  -
                </button>
                <span className="quantity-value">
                  {quantity}
                </span>
                <button
                  className="quantity-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
            >Add to Cart
            </button>
          </div>
        </div>
      </div>

      <section className="related-products">
        <div className="products-section">
          <div className="section-header">
            <h2 className="section-title">
              You May Also Like
            </h2>
          </div>
          <div
            className="products-grid"
            style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
          >
            {relatedProducts.map((item) => (
              <div
                key={item._id}
                className="product-card"
                onClick={() =>
                  navigate(`/product/${item._id}`)
                }
              >
                <div className="product-image">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="product-info">
                  <h3 className="product-title">
                    {item.title}
                  </h3>
                  <p className="product-model">
                    {item.variants?.[0]?.title}
                  </p>
                  <div className="product-footer">
                    <span className="product-price">
                      {formatINR(
                        convertToINR(
                          item.variants?.[0]?.price || 0
                        )
                      )}
                    </span>
                    <button className="add-btn">+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}