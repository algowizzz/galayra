export default function Success() {
  return (
    <div className="success-page">
      <div className="success-content">
        <div className="success-icon">✅</div>
        <h1>Order Placed Successfully!</h1>
        <p>Your order is being processed.</p>

        <button
          className="continue-btn"
          onClick={() => (window.location.href = "/")}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}