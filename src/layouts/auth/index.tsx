import { Icon } from "@iconify/react/dist/iconify.js";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main>
      <section className="container flex justify-between mb-6 px-2 py-7">
        <div></div>
        <div className=" flex items-center justify-center">
          <Icon icon="mingcute:question-line" color="#8c8c8c" fontSize={32} />
        </div>
      </section>

      <section className="flex mav-h-screen items-center justify-center ">
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
