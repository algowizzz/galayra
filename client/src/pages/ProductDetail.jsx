import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../api/api"
import { useCart } from "../context/CartContext"
import { useProducts } from "../context/ProductsContext"

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { products } = useProducts()
  const [product, setProduct] = useState(null)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await api.get(`/products/${id}`)
      setProduct(res.data)
      if (res.data.variants?.length) {
        setSelectedVariant(res.data.variants[0])
      }
    }
    fetchProduct()
  }, [id])

  if (!product || !selectedVariant) {
    return <div className="product-detail">Loading...</div>
  }

  const relatedProducts = products
    .filter(p => p._id !== product._id)
    .slice(0, 4)

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.title,
      image: product.image_url,
      price: selectedVariant.price,
      quantity,
      variants: [selectedVariant]
    })
  }

  const shortDescription =
    product.description?.slice(0, 300) + "..."
  return (
    <>
      <div className="product-detail">
        <div className="product-detail-grid">
          <div className="product-gallery">
            <img
              className="product-gallery-img"
              src={product.image_url}
              alt={product.title}
            />
          </div>
          <div className="product-detail-info">
            <h1>{product.title}</h1>
            <div className="product-detail-price">
              {selectedVariant.currency} {selectedVariant.price}
            </div>
            <div className="product-detail-desc">
              <div
                dangerouslySetInnerHTML={{
                  __html: expanded
                    ? product.description
                    : shortDescription
                }}
              />
              <button
                className="read-more-btn"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "Read Less" : "Read More"}
              </button>
            </div>
            <div className="quantity-selector">
              <label>Quantity</label>
              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={() =>
                    setQuantity(Math.max(1, quantity - 1))
                  }>-</button>
                <span className="quantity-value">
                  {quantity}
                </span>
                <button
                  className="quantity-btn"
                  onClick={() =>
                    setQuantity(quantity + 1)
                  }>+</button>
              </div>
            </div>
            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
            >Add to Cart</button>
          </div>
        </div>
      </div>

      <section className="related-products">
        <h2>You May Also Like</h2>
        <div className="products-grid">
          {relatedProducts.map(item => (
            <div
              key={item._id}
              className="product-card"
              onClick={() => navigate(`/product/${item._id}`)}
            >
              <div className="product-image">
                <img
                  className="product-img"
                  src={item.image_url}
                  alt={item.title}
                />
              </div>
              <div className="product-info">
                <h3 className="product-title">
                  {item.title}
                </h3>
                <p className="product-model">
                  {item.variants?.[0]?.model}
                </p>
                <div className="product-bottom">
                  <span className="product-price">
                    {item.variants?.[0]?.currency} {item.variants?.[0]?.price}
                  </span>
                  <button className="add-btn">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
