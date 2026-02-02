import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        if (data.variants && data.variants.length > 0) {
          setSelectedVariant(data.variants[0]);
        }
      })
      .catch(err => {
        console.error("Failed to fetch product", err);
      });
  }, [id]);

  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "100px 0" }}>
        Loading product…
      </div>
    );
  }

  return (
    <div className="content">
        <Navbar />
      <section className="product-detail">
        <div className="product-detail-image">
          <img src={product.image_url} alt={product.title} />
        </div>

        <div className="product-detail-info">
          <h1>{product.title}</h1>

          {selectedVariant && (
            <p className="price">${selectedVariant.price}</p>
          )}

          {product.variants && product.variants.length > 0 && (
            <select
              value={selectedVariant?.id}
              onChange={(e) =>
                setSelectedVariant(
                  product.variants.find(
                    v => v.id === Number(e.target.value)
                  )
                )
              }
            >
              {product.variants.map(variant => (
                <option key={variant.id} value={variant.id}>
                  {variant.title}
                </option>
              ))}
            </select>
          )}

          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />

          <button>Add to Cart</button>
        </div>
      </section>
    </div>
  );
}
