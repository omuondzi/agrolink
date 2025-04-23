import { Button } from "@heroui/react";
import { H2, Paragraph } from "../../components/typography";
const backgroundImage = "/images/hero.jpg";
const HeroSection = () => {
  return (
    <section className="h-dvh bg-primary">
      <section className="w-[95%] mx-auto flex flex-col-reverse  md:grid grid-cols-2 gap-[1rem] ">
        <div className="flex justify-center items-center h-[50dvh] md:h-dvh">
          <div className="flex flex-col gap-3">
            <H2 className="text-white font-bold">
              Fresh From Kenyan Farms To Your Table
            </H2>
            <Paragraph className="!text-white">
              Connect directly with local Kenyan farmers and get fresh, organic
              produce delivered to your doorstep.
            </Paragraph>
            <div className="flex gap-[1rem]">
              <Button radius="sm" className="text-white bg-black">
                Start Shopping
              </Button>
              <Button radius="sm" className="text-black bg-white">
                Become a Seller
              </Button>
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className="h-[40dvh] md:h-[80dvh] my-[0.5rem] md:my-auto rounded-xl"
        ></div>
      </section>
    </section>
  );
};

export default HeroSection;
