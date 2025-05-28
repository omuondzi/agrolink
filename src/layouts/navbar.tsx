import { Button, Drawer, DrawerContent, Input } from "@heroui/react";
import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { NAV_ITEMS } from "./config";

const NavItemsWrapper = () => {
  return (
    <section className="flex lg:gap-[1.3rem] xl:gap-[2.3rem]">
      {NAV_ITEMS.map((item, idx) => (
        <NavLink
          key={idx}
          to={item.path}
          className={({ isActive }) =>
            clsx(
              "text-sm lg:text-xs xl:text-sm font-medium text-gray-400 px-2 p-1 whitespace-nowrap",
              isActive && "!text-black"
            )
          }
          {...(item.label === "Motor Insurance" && { target: "_blank" })}
          end
        >
          {item.label}
        </NavLink>
      ))}
    </section>
  );
};

const LandingNavbar = () => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [shouldShowSidebar, setShowSidebar] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const updateDrawer = () => setShowSidebar((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    // setIsAuthenticated(!!token);
    setIsAuthenticated(token !== null);
  }, [shouldShowSidebar]); // Recheck when sidebar opens/closes

  return (
    <nav
      className={clsx(
        "border-b-3 border-primary-100 py-3 bg-white",
        isFixed && "fixed top-0 z-50 w-[100%] transition-all duration-1000"
      )}
    >
      <section className="flex flex-col lg:flex-row items-center justify-between gap-[1rem] lg:gap-[6rem] w-[90%] mx-auto">
        <section className="flex gap-[9rem] lg:gap-[2rem]">
          <div className="text-2xl font-bold text-primary cursor-pointer">
            Agrolink
          </div>

          <div className="flex lg:hidden">
            <Button isIconOnly onPress={updateDrawer} variant="light">
              <Icon icon="ci:hamburger-lg" fontSize={35} color="#034d3a" />
            </Button>
          </div>

          <div className="hidden lg:flex lg:gap-[2rem] xl:gap-[6rem] items-center">
            <NavItemsWrapper />
          </div>
        </section>

        <section className="w-full mx-auto flex gap-3 items-center">
          <Input
            startContent={<Icon icon="material-symbols:search" />}
            radius="none"
            variant="bordered"
            placeholder="Search products or farms.."
          />
          <Icon
            icon="mdi:bell-outline"
            fontSize={30}
            className="text-gray-400"
          />
          <Icon
            icon="mdi:heart-outline"
            fontSize={30}
            className="text-gray-400"
          />
          <Icon
            icon="hugeicons:message-multiple-02"
            fontSize={30}
            className="text-gray-400"
          />

          {isAuthenticated ? (
            <Button
              radius="none"
              className="bg-black text-white"
              onClick={handleLogout}
            >
              Sign Out
            </Button>
          ) : (
            <Button
              radius="none"
              className="bg-black text-white"
              as={Link}
              to="/auth/login"
            >
              Sign In
            </Button>
          )}
        </section>

        <Drawer
          size="xs"
          onOpenChange={() => setShowSidebar(false)}
          isOpen={shouldShowSidebar}
          placement="left"
          radius="none"
        >
          <DrawerContent className="p-[1rem]">
            <div className="text-2xl font-bold text-[#034d3a] cursor-pointer">
              Agrolink
            </div>

            <div className="flex flex-col items-start gap-[1rem] p-5">
              {NAV_ITEMS.map((item, index) => (
                <Link
                  to={item.path}
                  key={index}
                  className="active:text-[#ff5c14] hover:text-[#ff5c14]"
                  onClick={() => setShowSidebar(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {isAuthenticated ? (
              <Button
                radius="none"
                className="bg-black text-white"
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            ) : (
              <Button
                radius="none"
                className="bg-black text-white"
                as={Link}
                to="/auth/login"
              >
                Sign In
              </Button>
            )}
          </DrawerContent>
        </Drawer>
      </section>
    </nav>
  );
};

export default LandingNavbar;
