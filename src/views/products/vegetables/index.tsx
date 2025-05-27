import { Button, Image } from "@heroui/react";
import { Subtitle, Subtitle2 } from "../../../components/typography";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

interface PRODUCT {
  name: string;
  price: string;
  image: string;
  location: string;
  rating: string;
  tel: string;
}
const FEATURED_PRODUCTS: PRODUCT[] = [
  {
    name: "Sukuma Wiki",
    price: "Ksh 50/bunch",
    image: "/images/sukumawiki.jpeg",
    location: "Fresh from Kiambu Valley Farm",
    rating: "4.8(245)",
    tel: "0704617099",
  },
  {
    name: "Fresh Maize",
    price: "Ksh 30/pc",
    image: "/images/maize.jpeg",

    location: "Fresh From Nakuru Fields",
    rating: "4.7(189)",
    tel: "",
  },
  {
    name: "Sweet Potatoes",
    price: "Ksh 200/kg",
    image: "/images/sweet-potato.jpeg",

    location: "Fresh from Nyeri Farms",
    rating: "4.9(312)",
    tel: "",
  },
  {
    name: "Green Beans",
    price: "Ksh 120/kg",
    image: "/images/green-beans.jpeg",

    location: "Fresh from Limuru Gardens",
    rating: "4.6(156)",
    tel: "",
  },
];

const VegetablesPage = () => {
  return (
    <section>
      <div className="border-b-3 border-primary p-[0.5rem] w-full">
        <Subtitle className="text-primary">Vegetables</Subtitle>
      </div>
      <div>
        <section className="container grid md:grid-cols-3 gap-2 gap-y-4 py-3">
          {FEATURED_PRODUCTS.map((product, index) => (
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
                  {product.location}
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

export default VegetablesPage;
