import { Button, Image } from "@heroui/react";
import { Subtitle, Subtitle2 } from "../../../components/typography";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { useState, useEffect } from "react";
import { authAxios } from "../../../serverUrl";
import { enqueueSnackbar } from "notistack";
import { handleErrors } from "../../../libs/handle-errors";

const FruitsPage = () => {
  const { products } = useProducts();
  const [like, setLike] = useState<{ [productId: number]: boolean }>({});
  const [userRole, setUserRole] = useState<string | null>(null);

  const vegetableProducts = products.filter(
    (product) => product.category?.toLowerCase() === "fruits"
  );

  // ✅ Load role from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserRole(parsedUser.role); // 👈 Save the role
    }
  }, []);

  const handleLike = async (id: number) => {
    try {
      const response = await authAxios.patch(`/products/${id}/like/`);
      setLike((prev) => ({
        ...prev,
        [id]: response.data.liked,
      }));
      if (response.data.liked) {
        enqueueSnackbar("Added to likes", { variant: "success" });
      } else {
        enqueueSnackbar("Removed from likes", { variant: "error" });
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  return (
    <section>
      <div className="border-b-3 border-primary p-[0.5rem] w-full">
        <Subtitle className="text-primary">Fruits</Subtitle>
      </div>
      <div>
        <section className="container grid md:grid-cols-3 gap-2 gap-y-4 py-3">
          {vegetableProducts.map((product, index) => (
            <div key={index} className="bg-white rounded-lg pb-4 shadow-md">
              <Image
                src={product.image}
                radius="none"
                height={200}
                width={320}
                className="w-full rounded-t-xl"
              />
              <div className="w-[90%] mx-auto">
                <div className="flex justify-between font-semibold pt-2">
                  <Subtitle2>{product.name}</Subtitle2>
                  <Subtitle2>KSH {product.price}/fruit</Subtitle2>
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

                  {/* ✅ Only show like button if NOT farmer */}
                  {userRole !== "farmer" && (
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
                  )}

                  <Button
                    radius="none"
                    size="sm"
                    className="bg-black text-white"
                    as={Link}
                    to={`tel:${product.tel}`}
                  >
                    Buy
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

export default FruitsPage;
