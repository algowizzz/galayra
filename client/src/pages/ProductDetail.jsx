import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useCart } from "../context/CartContext"
import "../styles/main.css"

export default function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [selectedImage, setSelectedImage] = useState("")

  useEffect(() => {
    fetch(`http://localhost:3000/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data)
        setSelectedVariant(data.variants?.[0])
        setSelectedImage(data.image_url)
      })
  }, [id])

  if (!product || !selectedVariant) {
    return <div className="loading">Loading…</div>;
  }

  const handleAddToCart = () => {
    addToCart(
      {
        product_id: product._id,
        variant_id: selectedVariant.printify_variant_id,
        title: product.title,
        price: selectedVariant.price,
        image_url: product.image_url
      },
      quantity
    )
  }

  return (
    <section className="product-page">
      <div className="product-layout">
        <div className="product-thumbnails">
          {[product.image_url].map((img, i) => (
            <img
              key={i}
              src={img}
              className={`thumb ${selectedImage === img ? "active" : ""}`}
              onClick={() => setSelectedImage(img)}
              alt=""
            />
          ))}
        </div>

        <div className="product-main-image">
          <img src={selectedImage} alt={product.title} />
        </div>

        <div className="product-info">
          <h1>{product.title}</h1>
          <p className="price">${selectedVariant.price}</p>

          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />

          <div className="option-group">
            <label>Phone model</label>
            <select
              value={selectedVariant.printify_variant_id}
              onChange={e =>
                setSelectedVariant(
                  product.variants.find(
                    v => v.printify_variant_id === Number(e.target.value)
                  )
                )
              }
            >
              {product.variants.map(v => (
                <option key={v.printify_variant_id} value={v.printify_variant_id}>
                  {v.title}
                </option>
              ))}
            </select>
          </div>

          <div className="option-group">
            <label>Quantity</label>
            <div className="quantity-box">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
          </div>

          <button className="add-to-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>

      </div>
    </section>
  )
}
