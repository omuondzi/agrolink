import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ProductsProvider } from "./views/products/context/ProductsContext.tsx";


createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <ProductsProvider> 
        <App />
      </ProductsProvider>
    </StrictMode>
  </BrowserRouter>
);
