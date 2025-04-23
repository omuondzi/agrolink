import { Link } from "react-router-dom";
import { Subtitle, Subtitle2 } from "../components/typography";
import { Button, Input } from "@heroui/react";
import { FOOTERLINKS, SUPPORT } from "./config";

const LandingFooter = () => {
  return (
    <footer className=" border-t-3 bg-primary">
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
        <div className="col-span-2">
          <Subtitle2 className="text-primary-50 font-semibold">
            Subscribe to our monthly Newsletter
          </Subtitle2>
          <p className="text-[13px] text-grey font-semibold">
            Subscribe to get updates about local produce and farmers.
          </p>

          <Input
            classNames={{
              inputWrapper: "pr-0",
            }}
            className="my-3"
            placeholder="Enter your email"
            radius="none"
            size="sm"
            endContent={
              <Button
                type="submit"
                color="primary"
                radius="none"
                size="sm"
                className="bg-black"
              >
                Subscribe
              </Button>
            }
          />
        </div>
      </section>
    </footer>
  );
};

export default LandingFooter;
