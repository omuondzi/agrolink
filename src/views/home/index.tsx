import FeaturedCategories from "./categories";
import HeroSection from "./hero";
import FeaturedProducts from "./products";
import Why from "./why";

const HomePageView = () => {
  return (
    <section>
      <HeroSection />
      <FeaturedCategories />
      <FeaturedProducts />
      <Why />
    </section>
  );
};

export default HomePageView;
