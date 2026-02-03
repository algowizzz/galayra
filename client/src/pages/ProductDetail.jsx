import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import "../styles/main.css";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setSelectedImage(data.image_url);
      })
      .catch(console.error);
  }, [id]);

  if (!product) return <div className="loading">Loading…</div>;

  const variant = product.variants?.[0];

  const handleAddToCart = () => {
    addToCart(
      {
        product_id: product._id,
        variant_id: variant.printify_variant_id,
        title: product.title,
        price: variant.price,
        image_url: product.image_url
      },
      quantity
    );
  };

  const thumbnails = [
    product.image_url,
    product.image_url,
    product.image_url,
    product.image_url
  ];

  return (
    <section className="product-page">
      <div className="product-layout">
        <div className="product-thumbnails">
          {thumbnails.map((img, i) => (
            <img
              key={i}
              src={img}
              alt=""
              className={`thumb ${selectedImage === img ? "active" : ""}`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>

        <div className="product-main-image">
          <img src={selectedImage} alt={product.title} />
        </div>
        <div className="product-info">
          <h1>{product.title}</h1>
          <p className="price">${variant.price}</p>

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
