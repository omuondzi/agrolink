import { Icon } from "@iconify/react/dist/iconify.js";
import { SubHeading2, Subtitle2 } from "../../components/typography";
import { Link } from "react-router-dom";

const FEATURED_CATEGORIES = [
  {
    name: "Vegetables",
    icon: "emojione-monotone:carrot",
    path: "/products/vegetables",
  },
  {
    name: "Fruits",
    icon: "tabler:apple-filled",
    path: "/products/fruits",
  },
  {
    name: "Dairy",
    icon: "material-symbols:egg",
    path: "/products/dairy",
  },
  {
    name: "Grains",
    icon: "game-icons:grain",
    path: "/products/grains",
  },
  // {
  //   name: "Herbs",
  //   icon: "game-icons:herbs-bundle",
  // },
  // {
  //   name: "Organic",
  //   icon: "mdi:organic-outline",
  // },
  // {
  //   name: "Spices",
  //   icon: "lucide-lab:pepper-chilli",
  // },
  // {
  //   name: "Fish",
  //   icon: "ion:fish-sharp",
  // },
];

const FeaturedCategories = () => {
  return (
    <section className="container py-[3rem]">
      <SubHeading2 className="text-primary">Featured Categories</SubHeading2>
      <div className="grid md:grid-cols-4 gap-2 py-3">
        {FEATURED_CATEGORIES.map((category, index) => (
          <Link key={index} to={category.path}>
            <div className="bg-lightbg flex flex-col justify-center items-center p-[2rem] rounded-lg">
              <Icon icon={category.icon} fontSize={40} />
              <Subtitle2>{category.name}</Subtitle2>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
