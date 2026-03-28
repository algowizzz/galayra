const rates = {
  INR: 83,
  USD: 1
};

const markup = 1.5;

exports.convertPrice = (usd, currency = "INR") => {
  const rate = rates[currency] || 1;
  const converted = usd * rate;
  const finalPrice = converted * markup;
  return Math.round(finalPrice);
};