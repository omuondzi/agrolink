import { Outlet } from "react-router-dom";
import LandingNavbar from "./navbar";
import LandingFooter from "./footer";

const LandingLayout = () => {
  return (
    <>
      <LandingNavbar />
      <Outlet />
      <LandingFooter />
    </>
  );
};

export default LandingLayout;
