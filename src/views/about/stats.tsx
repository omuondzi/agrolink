import { Icon } from "@iconify/react/dist/iconify.js";

import { Button } from "@heroui/react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// import AnimatedProgressProvider from "./AnimatedProgressProvider";
import { useInView } from "react-intersection-observer";
import { H2, Subtitle, Subtitle2 } from "../../components/typography";
import AnimatedProgressProvider from "./AnimatedProgressProvider";
import { Link } from "react-router-dom";

const skills = [
  {
    percentage: 75,
    name: "Farmers Onboarded",
  },
  {
    percentage: 60,
    name: "Product Variety Uploaded",
  },
  {
    percentage: 40,
    name: "Buyer Engagement",
  },
  {
    percentage: 85,
    name: " Feature Implementation",
  },
];

const StatsSection = () => {
  return (
    <section className="text-black m-4">
      <section className="container max-w-[75%] mx-auto grid md:grid-cols-2 gap-[3rem] py-[7rem]">
        <section className="flex flex-col gap-y-[2rem]">
          <div className="flex items-center gap-[1rem] text-primary  ">
            <hr className="w-10 bg-primary h-[0.15rem]" />
            <H2 className="!font-bold  leading-[3.3rem]">Agrolink</H2>
            {/* <SubHeading className="!font-bold ">Agrolink</SubHeading> */}
            <hr className="w-10 bg-primary h-[0.15rem] " />
          </div>

          <Subtitle2 className="leading-8 text-justify">
            Agrolink is a digital marketplace designed to empower small-scale
            farmers by connecting them directly with buyers. Our platform makes
            it easy for farmers to showcase their fresh produce, manage
            listings, and reach a wider market—without middlemen. We believe in
            promoting local agriculture, ensuring fair pricing, and creating a
            more sustainable food ecosystem through technology. Whether you're a
            farmer looking to grow your business or a buyer searching for fresh,
            locally-sourced products, Agrolink brings the market to your
            fingertips.
          </Subtitle2>
          <Button
            size="lg"
            as={Link}
            to={"/products/vegetables"}
            className="w-full md:w-1/2 flex gap-2 items-center bg-primary  text-white py-8 px-8 rounded-[3rem] md:my-5 font-medium "
          >
            Start shopping
            <Icon icon="system-uicons:paper-plane" fontSize={25} />
          </Button>
        </section>
        <section className="grid grid-cols-2 gap-x-5 gap-y-10">
          {skills.map((skill, index) => (
            <SkillProgress key={index} skill={skill} />
          ))}
        </section>
      </section>
    </section>
  );
};

const SkillProgress = ({
  skill,
}: {
  skill: { percentage: number; name: string };
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger the animation only once when visible
    threshold: 0.5, // 50% of the element should be visible
  });

  return (
    <div ref={ref} className="flex flex-col items-center gap-5 max-h-[300px]">
      <div>
        {inView && ( // Render the progress bar only when visible
          <AnimatedProgressProvider
            valueStart={0} // Start progress at 0%
            valueEnd={skill.percentage} // End progress at the skill percentage
            duration={3} // Animation duration in seconds
          >
            {(value: number) => (
              <CircularProgressbar
                className="max-h-[200px]"
                value={value}
                text={`${Math.round(value)}%`} // Display rounded progress
                styles={buildStyles({
                  pathColor: "#034d3a", // Dynamic color based on progress
                  textColor: "#034d3a",
                  trailColor: "#2cdca7",
                  backgroundColor: "#f3f3f3",
                })}
              />
            )}
          </AnimatedProgressProvider>
        )}
      </div>
      <Subtitle className="text-center font-bold">{skill.name}</Subtitle>
    </div>
  );
};

export default StatsSection;
