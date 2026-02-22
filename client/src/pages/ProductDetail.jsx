import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/api";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedModel, setSelectedModel] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/products/${id}`);
        setProduct(res.data);
        setSelectedModel(res.data.model);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="product-detail">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="page-enter page-enter-active">
      <section className="product-detail">
        <div className="product-detail-grid">
          <div className="product-gallery">
            <img
              src={product.image}
              alt={product.name}
              className="product-gallery-img"
            />
          </div>

          <div className="product-detail-info">
            <h1>{product.name}</h1>
            <p className="product-detail-model">{selectedModel}</p>
            <div className="product-detail-price">
              ₹{product.price}
            </div>
            <p className="product-detail-desc">
              {product.description}
            </p>

            {product.models && (
              <div className="model-selector">
                <label>Select Model</label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                >
                  {product.models.map((m, i) => (
                    <option key={i}>{m}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="quantity-selector">
              <label>Quantity</label>
              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}> -
                </button>
                <span className="quantity-value">{quantity}</span>

                <button
                  className="quantity-btn"
                  onClick={() => setQuantity(quantity + 1)}> +
                </button>
              </div>
            </div>

            <button
              className="add-to-cart-btn"
              onClick={() =>
                addToCart({
                  ...product,
                  model: selectedModel,
                  quantity,
                })
              }
            >
              Add to Cart — ₹{product.price * quantity}
            </button>

            <br /><br />

            <button className="cta-btn" onClick={() => navigate("/products")}>
              Back to Shop
            </button>

          </div>
        </div>
      </section>
    </div>
  );
}
