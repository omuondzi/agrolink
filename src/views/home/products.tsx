import { Button, Image } from "@heroui/react";
import { SubHeading2, Subtitle2 } from "../../components/typography";
import { Icon } from "@iconify/react/dist/iconify.js";

interface PRODUCT {
  name: string;
  price: string;
  image: string;
  location: string;
  rating: string;
}
const FEATURED_PRODUCTS: PRODUCT[] = [
  {
    name: "Sukuma Wiki",
    price: "Ksh 50/bunch",
    image: "/images/hero.jpg",
    location: "Fresh from Kiambu Valley Farm",
    rating: "4.8(245)",
  },
  {
    name: "Fresh Maize",
    price: "Ksh 30/pc",
    image: "/images/hero.jpg",

    location: "Fresh From Nakuru Fields",
    rating: "4.7(189)",
  },
  {
    name: "Sweet Potatoes",
    price: "Ksh 200/kg",
    image: "/images/hero.jpg",

    location: "Fresh from Nyeri Farms",
    rating: "4.9(312)",
  },
  {
    name: "Green Beans",
    price: "Ksh 120/kg",
    image: "/images/hero.jpg",

    location: "Fresh from Limuru Gardens",
    rating: "4.6(156)",
  },
];
const FeaturedProducts = () => {
  return (
    <section className="bg-lightbg py-[3rem]">
      <section className="w-[90%] mx-auto">
        <SubHeading2 className="text-primary">Featured Products</SubHeading2>
        <section className="grid md:grid-cols-4 gap-2 gap-y-4 py-3">
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
                  >
                    Add to cart
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
