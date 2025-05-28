import { Button, Image } from "@heroui/react";
import { SubHeading2, Subtitle2 } from "../../components/typography";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

import { ReactNode, useEffect, useState } from "react";
import { publicAxios } from "../../serverUrl";

interface Farmer {
  phone_number: string;
  // Add other properties if needed
}

interface PRODUCT {
  farmer: Farmer;
  phone_number: string;
  description: ReactNode;
  name: string;
  price: string;
  image: string;
  location: string;
  rating: string;
  tel: string;
}


const FeaturedProducts = () => {

  useEffect(() => {
  handleFeaturedProducts();
}, []);

const [featuredProducts, setFeaturedProducts] = useState<PRODUCT[]>([]);
const handleFeaturedProducts = async () => {
  try{
    const response = await publicAxios.get("/products/featured/");
  setFeaturedProducts(response.data);
  console.log("Featured Products:", response.data);
  }
  catch(error){
    console.error("Error fetching featured products:", error);
  }

}



  return (
    <section className="bg-lightbg py-[3rem]">
      <section className="w-[90%] mx-auto">
        <SubHeading2 className="text-primary">Featured Products</SubHeading2>
        <section className="grid md:grid-cols-4 gap-2 gap-y-4 py-3">
          {featuredProducts.map((product, index) => (
            <div key={index} className=" bg-white rounded-lg pb-4">
              <Image
                src={product.image}
                radius="none"
                className="w-full rounded-t-xl"
              />
              <div className="w-[90%] mx-auto">
                <div className="flex justify-between font-semibold  pt-2">
                  <Subtitle2>{product.name} </Subtitle2>
                  <Subtitle2>{product.price}</Subtitle2>
                </div>
                <Subtitle2 className=" text-graytext">
                  {product.description}
                </Subtitle2>
                <div className="flex justify-between items-center py-4">
                  <Subtitle2 className=" flex items-center gap-1 pt-3">
                    <Icon
                      icon="material-symbols:star-rounded"
                      color="#fcce10"
                    />
                    {product.rating}
                  </Subtitle2>
                  <Button
                    radius="none"
                    size="sm"
                    className="bg-black text-white "
                    as={Link}
                    to={`tel:${product.farmer.phone_number}`}
                  >
                    Buy
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </section>
    </section>
  );
};

export default FeaturedProducts;
