import { Link, Outlet } from "react-router-dom";
import { Subtitle } from "../../components/typography";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Divider } from "@heroui/react";
import { useEffect, useState } from "react";
import clsx from "clsx";

import { useProducts } from "./context/ProductsContext";
import { publicAxios } from "../../serverUrl";
const SIDEBAR_ITEMS = [
  {
    label: "All Products",
    path: "/products",
    icon: "gridicons:product",
  },
  {
    label: "Vegetables",
    path: "vegetables",
    icon: "emojione-monotone:carrot",
  },
  {
    label: "Fruits",
    path: "fruits",
    icon: "tabler:apple-filled",
  },
  {
    label: "Dairy",
    path: "dairy",
    icon: "material-symbols:egg",
  },
  {
    label: "Grains",
    path: "grains",
    icon: "game-icons:grain",
  },
];

const ProductsPageView = () => {
  const [isFixed, setIsFixed] = useState(false);

  const { setProducts } = useProducts();
  const handleProducts = async () => {
    try {
      const response = await publicAxios.get("/products/all-products/");
      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    handleProducts();

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className=" ">
      <section className="grid grid-cols-[20%,80%]">
        <section
          className={clsx(
            "min-h-screen border-r-2  bg-primary relative ",
            isFixed && "fixed z-9"
          )}
        >
          <div className="fixed">
            <Subtitle className="text-white py-[1rem]">Categories</Subtitle>
            <Divider className="w-[100%]" />
            <div className="flex flex-col gap-3 p-[1rem]">
              {" "}
              {SIDEBAR_ITEMS.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="text-white flex gap-2 pl-3"
                >
                  <Icon icon={item.icon} fontSize={25} />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section>
          <Outlet />
        </section>
      </section>
    </section>
  );
};

export default ProductsPageView;
