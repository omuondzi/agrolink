import { Icon } from "@iconify/react/dist/iconify.js";
import { SubHeading2, Subtitle2 } from "../../components/typography";
const WHY_ATTEND = [
  {
    name: "Fresh & Organic",
    description:
      "Get fresh, organic produce directly from local farms to your table.",
    icon: "mdi:organic-outline",
  },
  {
    name: "Fast Delivery",
    description:
      "Same day delivery to ensure maximum freshness of your products.",
    icon: "mdi:bike-fast",
  },
  {
    name: "Support Local",
    description: "Help local farmers thrive by buying directly from them",
    icon: "icon-park-outline:local",
  },
];
const Why = () => {
  return (
    <section className="bg-lightbg py-[3rem]">
      <div className="text-center">
        <SubHeading2>Why Choose AgroLink?</SubHeading2>
        <Subtitle2 className="max-w-[500px] mx-auto text-graytext">
          We connect you directly with local farmers to ensure the freshest
          produce at fair prices while supporting sustainable agriculture.
        </Subtitle2>
      </div>
      <div className="container grid md:grid-cols-3 gap-[2rem] py-[2rem]">
        {WHY_ATTEND.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 justify-center items-center"
          >
            <div className="bg-primary-50 rounded-[50%] w-fit p-[0.5rem]">
              <Icon icon={item.icon} fontSize={40} />
            </div>
            <Subtitle2 className="text-black font-semibold">
              {item.name}
            </Subtitle2>
            <Subtitle2 className="text-graytext text-center">
              {item.description}
            </Subtitle2>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Why;
