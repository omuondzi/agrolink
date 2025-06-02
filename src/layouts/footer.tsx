import { Link } from "react-router-dom";
import { Link as HeroUiLink } from "@heroui/react";
import { Subtitle, Subtitle2 } from "../components/typography";
import { FOOTERLINKS, SUPPORT } from "./config";
import { Icon } from "@iconify/react/dist/iconify.js";

const LandingFooter = () => {
  return (
    <footer className=" border-t-1 border-t-primary-200 bg-primary">
      <section className="container py-6 grid grid-cols-2 gap-4  lg:flex justify-between">
        <div className="col-span-2">
          <p className=" text-4xl font-bold text-primary-50 cursor-pointer">
            Agrolink
          </p>
          <Subtitle2 className=" text-grey font-semibold">
            Subscribe to get updates about local produce and farmers.
          </Subtitle2>
        </div>
        <div>
          <Subtitle className="text-primary-50 font-semibold">
            Quick Links
          </Subtitle>
          <div className=" flex flex-col gap-1 pl-3">
            {FOOTERLINKS.map((link, index) => (
              <Link
                to={link.path}
                key={index}
                className="text-grey font-semibold"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <Subtitle className="text-primary-50 font-semibold">Support</Subtitle>
          <div className=" flex flex-col gap-1 pl-3">
            {SUPPORT.map((link, index) => (
              <HeroUiLink
                isDisabled
                href={link.path}
                key={index}
                className="text-gray-300 font-semibold"
              >
                {link.label}
              </HeroUiLink>
            ))}
          </div>
        </div>
        <div className="col-span-2">
          <Subtitle className="text-primary-50 font-semibold">
            Follow our socials
          </Subtitle>
          <div className="flex justify-between w-full py-3 ">
            {[
              "mdi:instagram",
              "ic:baseline-facebook",
              "proicons:x-twitter",
              "mage:linkedin",
            ].map((item, index) => (
              <Icon key={index} icon={item} fontSize={30} color="#ffffff" />
            ))}
          </div>
        </div>
      </section>
    </footer>
  );
};

export default LandingFooter;
