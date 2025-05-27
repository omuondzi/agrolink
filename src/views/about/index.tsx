import StatsSection from "./stats";
import TeamSection from "./team";
import Testimonials from "./testimonials";

const AboutPageView = () => {
  return (
    <section className=" ">
      <StatsSection />
      <Testimonials />
      <TeamSection />
    </section>
  );
};

export default AboutPageView;
