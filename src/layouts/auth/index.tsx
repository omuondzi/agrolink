import { Outlet } from "react-router-dom";
import LandingNavbar from "../navbar";

const AuthLayout = () => {
  return (
    <main>
      <LandingNavbar />

      <section className="flex mav-h-screen items-center justify-center pt-4 ">
        <section className=" px-4 py-8 rounded-3xl  md:px-4 md:py-8 flex flex-col justify-center items-center border-2  md:w-[400px] w-[320px]">
          <div className=" text-2xl font-bold text-[#034d3a] cursor-pointer">
            Agrolink
          </div>
          <Outlet />
        </section>
      </section>
    </main>
  );
};

export default AuthLayout;
