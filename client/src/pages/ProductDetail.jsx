import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useCart } from "../context/CartContext"
import "../styles/main.css"

export default function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState("")

  useEffect(() => {
    fetch(`http://localhost:3000/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data)
        setSelectedImage(data.image_url)
      })
      .catch(err => console.error(err))
  }, [id])

  if (!product) {
    return <div className="loading">Loading product…</div>
  }

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        title: product.title,
        price: product.variants?.[0]?.price,
        image: product.image_url
      },
      quantity
    )
  }

  return (
    <section className="product-page">
      <div className="product-layout">
        <div className="product-thumbnails">
          {[product.image_url, product.image_url, product.image_url].map(
            (img, index) => (
              <img
                key={index}
                src={img}
                alt=""
                className={selectedImage === img ? "thumb active" : "thumb"}
                onClick={() => setSelectedImage(img)}
              />
            )
          )}
        </div>

        <div className="product-main-image">
          <img src={selectedImage} alt={product.title} />
        </div>

        <div className="product-info">
          <h1>{product.title}</h1>
          <p className="price">${product.variants?.[0]?.price}</p>
          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />

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
  );
}
