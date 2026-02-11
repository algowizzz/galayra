import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import "../styles/galayra.css";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [variant, setVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    api.get(`/products/${id}`).then(res => {
      setProduct(res.data);
      setVariant(res.data.variants[0]);
    });
  }, [id]);

  if (!product || !variant) return null;

  const handleAdd = () => {
    addToCart({
      product_id: product._id,
      variant_id: variant.printify_variant_id,
      title: product.title,
      price: variant.price,
      image_url: product.image_url
    }, quantity);
  };

  return (
    <section style={{ padding: "140px 60px" }}>
      <h1>{product.title}</h1>
      <p>${variant.price}</p>

      <select
        value={variant.printify_variant_id}
        onChange={e =>
          setVariant(
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

      <button className="cta-btn" onClick={handleAdd}>
        Add to Cart
      </button>
    </section>
  );
}
