import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`)
        setProduct(res.data)
        if (res.data.variants?.length > 0) {
          setSelectedVariant(res.data.variants[0])
        }
      } catch (err) {
        console.error(err)
      }
    }
    fetchProduct()
  }, [id])

  if (!product || !selectedVariant) {
    return (
      <div className="product-detail">
        <h1>Loading...</h1>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.title,
      image: product.image_url,
      price: selectedVariant.price,
      variants: [selectedVariant]
    })
  }

  return (
    <div className="product-detail">
      <div className="product-detail-grid">
        <div className="product-gallery">
          <img
            src={product.image_url}
            alt={product.title}
            style={{
              maxWidth: "100%",
              maxHeight: "450px",
              objectFit: "contain"
            }}
          />
        </div>
        <div className="product-detail-info">
          <h1>{product.title}</h1>
          <div className="product-detail-price">
            ₹{selectedVariant.price}
          </div>
          <p
            className="product-detail-desc"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
          {product.variants.length > 1 && (
            <div className="model-selector">
              <label>Select Model</label>
              <select
                value={selectedVariant.printify_variant_id}
                onChange={(e) => {
                  const variant = product.variants.find(
                    v => v.printify_variant_id.toString() === e.target.value
                  );
                  setSelectedVariant(variant);
                }}
              >
                {product.variants.map((v) => (
                  <option
                    key={v.printify_variant_id}
                    value={v.printify_variant_id}
                  >
                    {v.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="quantity-selector">
            <label>Quantity</label>
            <div className="quantity-controls">
              <button
                className="quantity-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <div className="quantity-value">
                {quantity}
              </div>
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
          >
            Add to Cart — ₹{selectedVariant.price * quantity}
          </button>
        </div>
      </div>
    </div>
  )
}
