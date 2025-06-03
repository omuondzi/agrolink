import { createContext, useContext, useState, ReactNode } from "react";

type Product = {
  farmer: any;
  liked: boolean;
  description: ReactNode;
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  location: string;
  rating: string;
  tel: string;
};

type ProductsContextType = {
  products: Product[];
  setProducts: (products: Product[]) => void;
};

// ✅ Provide a default value that matches the type
const defaultValue: ProductsContextType = {
  products: [],
  setProducts: () => {},
};

export const ProductsContext = createContext<ProductsContextType>(defaultValue);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
