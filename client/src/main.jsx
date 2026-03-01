import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/main.css";
import AddressProvider from "./context/AddressContext";
import AuthProvider from "./context/AuthContext";
import ProductsProvider from "./context/ProductsContext";
import CartProvider from "./context/CartContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AddressProvider>
          <ProductsProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </ProductsProvider>
        </AddressProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
