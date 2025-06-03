import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useMediaQuery } from "react-responsive";
import { Card, CardBody, CardHeader, Image } from "@heroui/react";
import {
  SubHeading,
  H2,
  Paragraph,
  Subtitle2,
} from "../../components/typography";

interface TESTIMONY {
  name: string;
  title: string;
  description: string;
}

const TESTIMONIALS: TESTIMONY[] = [
  {
    name: "John Oloo",
    title: "Smale scale Farmer, Nairobi.",
    description:
      "“Before Agrolink, I struggled to find consistent buyers for my produce. Now, I upload what I have, and buyers contact me directly. It’s easy to use, and I’ve doubled my income in just three months.”",
  },
  {
    name: "Yonah Obwoge",
    title: "Restaurant Owner, Nairobi.",
    description:
      "“As a restaurant owner, I need fresh produce daily. Agrolink connects me to local farmers with quality goods and fair prices. It has transformed the way I source ingredients.”",
  },
  {
    name: "Joe Kessler",
    title: "Agricultural Policy Advisor, UNDP.",
    description:
      "“Agrolink is bridging the gap between rural farmers and urban markets. It's a powerful example of how digital innovation can promote food security and inclusive trade.”",
  },
  {
    name: "Kulubi Weps",
    title: "Smale scale Farmer, Nairobi.",
    description:
      "“Thanks to Agrolink, I no longer have to rely on local middlemen who used to underpay us. I now set my own prices and deal directly with buyers. It feels empowering to finally have control over my own harvest.”",
  },
  {
    name: "Omond Timon",
    title: "Smale scale Farmer, Nairobi.",
    description:
      "“Thanks to Agrolink, I no longer have to rely on local middlemen who used to underpay us. I now set my own prices and deal directly with buyers. It feels empowering to finally have control over my own harvest.”",
  },
];

const handleArrowClick = (
  direction: "next" | "prev",
  clickHandler: () => void,
  isAllowed: boolean
) => {
  if (isAllowed) {
    console.log(`${direction} arrow clicked`);
    clickHandler(); // Trigger carousel navigation
  } else {
    console.log(`${direction} arrow is disabled`);
  }
};

// Custom Next Arrow
const renderArrowNext = (onClickHandler: () => void, hasNext: boolean) => (
  <button
    onClick={() => handleArrowClick("next", onClickHandler, hasNext)}
    className={`absolute top-1/2 right-[-10px] md:right-[-18px] transform -translate-y-1/2 bg-white text-blue-600 rounded-lg h-[50px] md:h-[70px] w-[50px] md:w-[70px] flex items-center justify-center shadow-md z-10 ${
      hasNext
        ? "opacity-100 hover:bg-gray-100"
        : "opacity-50 cursor-not-allowed"
    }`}
  >
    <Icon icon="icons8:double-right" fontSize={30} color="#034d3a" />
  </button>
);

// Custom Prev Arrow
const renderArrowPrev = (onClickHandler: () => void, hasPrev: boolean) => (
  <button
    onClick={() => handleArrowClick("prev", onClickHandler, hasPrev)}
    className={`absolute top-1/2 left-[-10px] md:left-[-18px] transform -translate-y-1/2 bg-white text-blue-600 rounded-lg h-[50px] md:h-[70px] w-[50px] md:w-[70px] flex items-center justify-center shadow-md z-10 ${
      hasPrev
        ? "opacity-100 hover:bg-gray-100"
        : "opacity-50 cursor-not-allowed"
    }`}
  >
    <Icon icon="icons8:double-left" fontSize={30} color="#034d3a" />
  </button>
);

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const isMediumScreen = useMediaQuery({ query: "(min-width: 768px)" });
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  const centerSlidePercentage = isLargeScreen
    ? 33.33 // Three items on large screens
    : isMediumScreen
    ? 50 // Two items on medium screens
    : 100; // One item on small screensreturn (

  const handleChange = (index: number) => {
    setActiveIndex(index);
  };

  const renderIndicator = (
    clickHandler: (e: React.MouseEvent | React.KeyboardEvent) => void,
    isSelected: boolean,
    index: number
  ) => {
    return (
      <li
        className={`inline-block w-4 h-4 rounded-full border-2 border-primary mx-1 cursor-pointer transition-all duration-300 ${
          isSelected ? "bg-primary" : "bg-transparent"
        }`}
        onClick={clickHandler}
        key={index}
        role="button"
        aria-label={`Slide ${index + 1}`}
      ></li>
    );
  };

  return (
    <section className="py-16 bg-primary-50">
      <div className="flex items-center justify-center gap-[1rem] text-wite">
        <hr className="w-10 bg-primary h-[0.15rem]" />
        <SubHeading className="!font-bold">Testimonials</SubHeading>{" "}
        <hr className="w-10 bg-primary h-[0.15rem]" />
      </div>
      <H2 className="!font-bold py-5 text-center max-w-[800px] mx-auto leading-[3.3rem]">
        What They Say About Us
      </H2>

      <Carousel
        infiniteLoop
        interval={5000}
        transitionTime={2000}
        showArrows={true}
        stopOnHover={false}
        showThumbs={false}
        autoPlay
        showStatus={false}
        showIndicators={false}
        preventMovementUntilSwipeScrollTolerance={true}
        swipeScrollTolerance={50}
        centerMode={true}
        centerSlidePercentage={centerSlidePercentage}
        renderArrowNext={renderArrowNext}
        renderArrowPrev={renderArrowPrev}
        className="mx-auto md:w-[80%]"
        onChange={handleChange}
      >
        {TESTIMONIALS.map((testimony, index) => (
          <Card
            key={index}
            shadow="none"
            radius="none"
            className="p-[3rem] md:p-[1rem] xl:p-[3rem] text-black flex flex-col gap-y-7 bg-white m-5 min-h-[500px]"
          >
            <CardHeader className="flex flex-col items-start p-0 gap-3 h-[120px]">
              <div className="flex items-center gap-5">
                <Image src="/images/dp.png" alt="" />
                <div>
                  <SubHeading className="!font-bold">
                    {testimony.name}
                  </SubHeading>
                  <Subtitle2 className="text-[#ff5c14] font-bold">
                    {testimony.title}
                  </Subtitle2>
                </div>
              </div>
            </CardHeader>
            <CardBody className="py-0">
              <Paragraph>{testimony.description}</Paragraph>
            </CardBody>
          </Card>
        ))}
      </Carousel>

      <div className="flex justify-center mt-10">
        <ul className="flex gap-2">
          {TESTIMONIALS.map((_, index) =>
            renderIndicator(
              () => console.log(`Indicator ${index + 1} clicked`),
              activeIndex === index,
              index
            )
          )}
        </ul>
      </div>
    </section>
  );
};

export default Testimonials;
