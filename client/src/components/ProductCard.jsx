export default function ProductCard({ product, onClick }) {
  return (
    <div className="product-card" onClick={onClick}>

      <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
          className="product-img"
          loading="lazy"
        />
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-model">{product.model}</p>

        <div className="product-bottom">
          <span className="product-price">${product.price?.toFixed(2)}</span>

          <button
            className="add-btn"
            onClick={(e) => e.stopPropagation()}
          >
            +
          </button>
        </div>
      </div>

    </div>
  );
}
