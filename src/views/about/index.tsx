import StatsSection from "./stats";
import TeamSection from "./team";
import Testimonials from "./testimonials";
import VisionAndMission from "./vision";

const AboutPageView = () => {
  return (
    <section className=" ">
      <StatsSection />
      <VisionAndMission />
      <Testimonials />
      <TeamSection />
    </section>
  );
};

export default AboutPageView;
