import { createContext, useEffect, useState } from "react";
import api from "../api/api";

export const ProductsContext = createContext();

export default function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      console.log("Fetching products...");
      const res = await api.get("/products");
      console.log("Products received:", res.data);
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loading, fetchProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}
