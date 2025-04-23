import { Button, Drawer, DrawerContent, Input } from "@heroui/react";
import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { NAV_ITEMS } from "./config";

const NavItemsWrapper = () => {
  return (
    <>
      <section className="flex lg:gap-[1.3rem] xl:gap-[2.3rem]">
        {NAV_ITEMS.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            className={({ isActive }) =>
              clsx(
                "text-sm lg:text-xs xl:text-sm font-medium text-gray-400 px-2 p-1 whitespace-nowrap",
                isActive && " !text-black"
              )
            }
            {...(item.label === "Motor Insurance" && { target: "_blank" })}
            end
          >
            {item.label}
          </NavLink>
        ))}
      </section>
    </>
  );
};

const LandingNavbar = () => {
  const [shouldShowSidebar, setShowSidebar] = useState<boolean>(false);

  const updateDrawer = () => setShowSidebar((prev) => !prev);
  return (
    <nav className="border-b-3 border-primary-100 py-3">
      <section className="flex flex-col lg:flex-row items-center justify-between gap-[1rem]  lg:gap-[6rem]  !w-[90%] mx-auto ">
        <section className="flex  lg:gap-[2rem] ">
          <div className=" text-2xl font-bold text-primary cursor-pointer">
            Agrolink
          </div>

          <div className="flex lg:hidden">
            <Button isIconOnly onPress={() => updateDrawer()} variant="light">
              <Icon icon="ci:hamburger-lg" fontSize={35} color="#034d3a" />
            </Button>
          </div>
          <div className="hidden lg:flex lg:gap-[2rem] xl:gap-[6rem] items-center">
            <NavItemsWrapper />
          </div>
        </section>

        <section className="w-[100%] mx-auto flex gap-3">
          <Input
            startContent={<Icon icon="material-symbols:search" />}
            radius="none"
            variant="bordered"
            placeholder="Search products or farms.."
          />
          <Icon
            icon="mdi:bell-outline"
            fontSize={40}
            className="text-gray-400"
          />
          <Icon
            icon="mdi:heart-outline"
            fontSize={40}
            className="text-gray-400"
          />
          <Icon
            icon="hugeicons:message-multiple-02"
            fontSize={40}
            className="text-gray-400"
          />
          <Button radius="none" className="bg-black text-white">
            Sign In
          </Button>
        </section>

        <Drawer
          size="xs"
          onOpenChange={() => setShowSidebar(false)}
          isOpen={shouldShowSidebar}
          placement="left"
          radius="none"
        >
          <DrawerContent className="">
            <div className=" text-2xl font-bold text-primary cursor-pointer">
              Agrolink
            </div>

            <div className=" flex flex-col items-start gap-[3rem] p-5">
              {NAV_ITEMS.map((item, index) => (
                <Link
                  to={item.path}
                  key={index}
                  className="active:text-[#ff5c14] hover:text-[#ff5c14] "
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </DrawerContent>
        </Drawer>
      </section>
    </nav>
  );
};

export default LandingNavbar;
