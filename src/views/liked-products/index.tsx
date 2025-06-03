import { Button, Image } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";

import { useEffect, useState } from "react";
import { Subtitle, Subtitle2 } from "../../components/typography";
import { useNavigate } from "react-router-dom";
import { authAxios } from "../../serverUrl";

import { enqueueSnackbar } from "notistack";
import { handleErrors } from "../../libs/handle-errors";

export type FarmerProduct = {
  id: number;
  image: string;
  name: string;
  price: number;
  description: string;
  rating: number;
  tel: string;
  liked: boolean;
};

const LikedPageView = () => {
  const [likedProducts, setLikedProducts] = useState<FarmerProduct[]>([]);
  const [like, setLike] = useState<{ [productId: number]: boolean }>({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleLike = async (id: number) => {
    try {
      const response = await authAxios.patch(`/products/${id}/like/`);
      const isLiked = response.data.liked;

      setLike((prev) => ({
        ...prev,
        [id]: isLiked,
      }));

      if (isLiked) {
        enqueueSnackbar("Added to likes", { variant: "success" });
      } else {
        enqueueSnackbar("Removed from likes", { variant: "error" });

        // Remove product from likedProducts to update UI immediately
        setLikedProducts((prev) => prev.filter((product) => product.id !== id));
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  const fetchLikedProducts = async () => {
    try {
      const response = await authAxios.get("/products/liked/");
      setLikedProducts(response.data);

      // Build like map for UI state
      const likeMap = Object.fromEntries(
        response.data.map((product: FarmerProduct) => [
          product.id,
          product.liked,
        ])
      );
      setLike(likeMap);
    } catch (error) {
      console.error("Error fetching liked products:", error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    console.log("User:", user);
    if (!token || !user || user.role !== "buyer") {
      navigate("/"); // Redirect to home or login
      enqueueSnackbar("You should be a buyer to access this page.", {
        variant: "error",
      });
      return;
    }

    setIsAuthenticated(true);
    fetchLikedProducts();
  }, [navigate]);

  return (
    <section className="">
      <div className="container">
        <section className="min-h-[80vh] grid md:grid-cols-3 gap-2 gap-y-4 py-3">
          {likedProducts.length == 0 && (
            <div className="h-[100%] flex flex-col justify-center items-center mx-auto col-span-3">
              <h4>No products liked.</h4>
              <h4>Please like and come back.</h4>
            </div>
          )}
          {likedProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg pb-4">
              <Image
                src={product.image}
                height={200}
                width={400}
                radius="none"
                className="w-full rounded-t-xl"
              />
              <div className="w-[90%] mx-auto">
                <div className="flex justify-between font-semibold pt-2">
                  <Subtitle>{product.name}</Subtitle>
                  <Subtitle2>KSH {product.price}</Subtitle2>
                </div>
                <Subtitle2 className="text-graytext">
                  {product.description}
                </Subtitle2>
                <div className="flex justify-between items-center py-4">
                  <Subtitle2 className="flex items-center gap-1 pt-3">
                    <Icon
                      icon="material-symbols:star-rounded"
                      color="#fcce10"
                    />
                    {product.rating}
                  </Subtitle2>
                  <Button
                    onClick={() => handleLike(product.id)}
                    isIconOnly
                    className="bg-transparent"
                  >
                    <Icon
                      icon={
                        like[product.id]
                          ? "flat-color-icons:like"
                          : "icon-park-outline:like"
                      }
                      color={like[product.id] ? "red" : "black"}
                      fontSize="30"
                    />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </section>
  );
};

export default LikedPageView;
