// import { Button, Image } from "@heroui/react";
// import { Subtitle, Subtitle2 } from "../../../components/typography";
// import { Icon } from "@iconify/react/dist/iconify.js";
// import { Link } from "react-router-dom";
// import { useProducts } from "../context/ProductsContext";
// import { useState } from "react";
// import { enqueueSnackbar } from "notistack";
// import { handleErrors } from "../../../libs/handle-errors";
// import { authAxios } from "../../../serverUrl";

// const AllProductsPage = () => {
//   const { products } = useProducts();
//   const [like, setLike] = useState<{ [productId: number]: boolean }>({});

//   // 🔐 Get user and role
//   const user = JSON.parse(localStorage.getItem("user") || "null");
//   const isLoggedIn = !!user;
//   const isBuyer = user?.role === "buyer";

//   const handleLike = async (id: number) => {
//     if (!isLoggedIn) {
//       enqueueSnackbar("Please log in to like products", { variant: "warning" });
//       return;
//     }

//     if (!isBuyer) {
//       enqueueSnackbar("Only buyers can like products", { variant: "warning" });
//       return;
//     }

//     try {
//       const response = await authAxios.patch(`/products/${id}/like/`);

//       setLike((prev) => ({
//         ...prev,
//         [id]: response.data.liked,
//       }));

//       if (response.data.liked) {
//         enqueueSnackbar("Added to likes", { variant: "success" });
//       } else {
//         enqueueSnackbar("Removed from likes", { variant: "error" });
//       }
//     } catch (error) {
//       handleErrors(error);
//     }
//   };

//   return (
//     <section>
//       <div className="border-b-3 border-primary p-[0.5rem] w-full">
//         <Subtitle className="text-primary">All products</Subtitle>
//       </div>

//       {/* Removed notification message */}

//       <div>
//         <section className="container grid md:grid-cols-3 gap-2 gap-y-4 py-3">
//           {products.map((product, index) => (
//             <div key={index} className="bg-white rounded-lg pb-4">
//               <Image
//                 src={product.image}
//                 radius="none"
//                 className="w-full rounded-t-xl"
//               />
//               <div className="w-[90%] mx-auto">
//                 <div className="flex justify-between font-semibold pt-2">
//                   <Subtitle2>{product.name}</Subtitle2>
//                   <Subtitle2>KSH {product.price}</Subtitle2>
//                 </div>
//                 <Subtitle2 className="text-graytext">
//                   {product.description}
//                 </Subtitle2>
//                 <div className="flex justify-between items-center py-4">
//                   <Subtitle2 className="flex items-center gap-1 pt-3">
//                     <Icon
//                       icon="material-symbols:star-rounded"
//                       color="#fcce10"
//                     />
//                     {product.rating}
//                   </Subtitle2>

//                   {/* Only show Like button if logged in buyer */}
//                   {isLoggedIn && isBuyer && (
//                     <Button
//                       onClick={() => handleLike(product.id)}
//                       isIconOnly
//                       className="bg-transparent"
//                       title="Like product"
//                     >
//                       <Icon
//                         icon={
//                           like[product.id]
//                             ? "flat-color-icons:like"
//                             : "icon-park-outline:like"
//                         }
//                         color={like[product.id] ? "red" : "black"}
//                         fontSize="30"
//                       />
//                     </Button>
//                   )}

//                   <Button
//                     radius="none"
//                     size="sm"
//                     className="bg-black text-white"
//                     as={Link}
//                     to={`tel:${product.tel}`}
//                   >
//                     Buy
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </section>
//       </div>
//     </section>
//   );
// };

// export default AllProductsPage;

import { Button, Image, Input } from "@heroui/react";
import { Subtitle, Subtitle2 } from "../../../components/typography";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { handleErrors } from "../../../libs/handle-errors";
import { authAxios } from "../../../serverUrl";

const AllProductsPage = () => {
  const { products } = useProducts();
  const [like, setLike] = useState<{ [productId: number]: boolean }>({});
  const [searchQuery, setSearchQuery] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isLoggedIn = !!user;
  const isBuyer = user?.role === "buyer";

  const handleLike = async (id: number) => {
    if (!isLoggedIn) {
      enqueueSnackbar("Please log in to like products", { variant: "warning" });
      return;
    }

    if (!isBuyer) {
      enqueueSnackbar("Only buyers can like products", { variant: "warning" });
      return;
    }

    try {
      const response = await authAxios.patch(`/products/${id}/like/`);

      setLike((prev) => ({
        ...prev,
        [id]: response.data.liked,
      }));

      enqueueSnackbar(
        response.data.liked ? "Added to likes" : "Removed from likes",
        { variant: response.data.liked ? "success" : "error" }
      );
    } catch (error) {
      handleErrors(error);
    }
  };

  // 🔍 Filter products by name
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section>
      <div className="border-b-3 border-primary p-[0.5rem] w-full">
        <Subtitle className="text-primary">All Products</Subtitle>
      </div>

      {/* 🔍 Search input */}
      <div className="container my-4">
        <Input
          type="text"
          placeholder="Search by product name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          radius="full"
          size="lg"
          startContent={<Icon icon="material-symbols:search-rounded" />}
        />
      </div>

      <div>
        <section className="container grid md:grid-cols-3 gap-2 gap-y-4 py-3">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div key={index} className="bg-white rounded-lg pb-4 shadow-md">
                <Image
                  src={product.image}
                  height={200}
                  width={320}
                  radius="none"
                  className="w-full rounded-t-xl"
                />
                <div className="w-[90%] mx-auto">
                  <div className="flex justify-between font-semibold pt-2">
                    <Subtitle2>{product.name}</Subtitle2>
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

                    {isLoggedIn && isBuyer && (
                      <Button
                        onClick={() => handleLike(product.id)}
                        isIconOnly
                        className="bg-transparent"
                        title="Like product"
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
                      to={`tel:${product.farmer.phone_number}`}
                    >
                      Buy
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full py-10">
              No products match your search.
            </p>
          )}
        </section>
      </div>
    </section>
  );
};

export default AllProductsPage;
