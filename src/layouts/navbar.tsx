// import {
//   Avatar,
//   Button,
//   Drawer,
//   DrawerContent,
//   Dropdown,
//   DropdownItem,
//   DropdownMenu,
//   DropdownTrigger,
//   // Input,
// } from "@heroui/react";
// import { Link, NavLink } from "react-router-dom";
// import clsx from "clsx";
// import { Icon } from "@iconify/react";
// import { useEffect, useState } from "react";
// import { NAV_ITEMS } from "./config";
// import { jwtDecode } from "jwt-decode";
// import { enqueueSnackbar } from "notistack";

// // eslint-disable-next-line react-refresh/only-export-components
// export function isTokenValid(token: string | null): boolean {
//   if (!token) return false;
//   try {
//     const decoded: { exp: number } = jwtDecode(token);
//     const now = Date.now() / 1000;
//     return decoded.exp > now;
//   } catch (e) {
//     console.error("Invalid token:", e);
//     return false;
//   }
// }
// const NavItemsWrapper = () => {
//   return (
//     <section className="flex lg:gap-[1.3rem] xl:gap-[2.3rem]">
//       {NAV_ITEMS.map((item, idx) => (
//         <NavLink
//           key={idx}
//           to={item.path}
//           className={({ isActive }) =>
//             clsx(
//               "text-sm lg:text-xs xl:text-sm font-medium text-gray-400 px-2 p-1 whitespace-nowrap",
//               isActive && "!text-black"
//             )
//           }
//           {...(item.label === "Motor Insurance" && { target: "_blank" })}
//           end
//         >
//           {item.label}
//         </NavLink>
//       ))}
//     </section>
//   );
// };

// const LandingNavbar = () => {
//   const [isFixed, setIsFixed] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 0) {
//         setIsFixed(true);
//       } else {
//         setIsFixed(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const [shouldShowSidebar, setShowSidebar] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

//   const updateDrawer = () => setShowSidebar((prev) => !prev);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("refreshToken");
//     setIsAuthenticated(false);
//     window.location.href = "/";
//     enqueueSnackbar("Successfully Logged Out.", { variant: "success" });
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     // setIsAuthenticated(!!token);
//     setIsAuthenticated(token !== null);

//     setIsAuthenticated(isTokenValid(token));
//   }, [shouldShowSidebar]); // Recheck when sidebar opens/closes

//   return (
//     <nav
//       className={clsx(
//         "border-b-3 border-primary-100 py-3 bg-white",
//         isFixed && "fixed top-0 z-50 w-[100%] transition-all duration-1000"
//       )}
//     >
//       <section className="flex flex-col lg:flex-row items-center lg:justify-between gap-[1rem] lg:gap-[6rem] w-[90%] mx-auto">
//         <section className="w-[100%] flex gap-[1rem]">
//           <div className="text-2xl font-bold text-primary cursor-pointer">
//             Agrolink
//           </div>

//           <div className="flex lg:hidden">
//             <Button isIconOnly onPress={updateDrawer} variant="light">
//               <Icon icon="ci:hamburger-lg" fontSize={35} color="#034d3a" />
//             </Button>
//           </div>

//           <div className="hidden lg:flex lg:gap-[2rem] xl:gap-[6rem] items-center">
//             <NavItemsWrapper />
//           </div>
//         </section>

//         <section className="">
//           {/* <Input
//             startContent={<Icon icon="material-symbols:search" />}
//             radius="none"
//             variant="bordered"
//             placeholder="Search products or farms.."
//           /> */}
//           {/* <Icon
//             icon="mdi:bell-outline"
//             fontSize={30}
//             className="text-gray-400"
//           /> */}
//           {/* <Link to="/liked-products">
//             <Icon
//               icon="mdi:heart-outline"
//               fontSize={30}
//               className="text-gray-400"
//             />
//           </Link> */}
//           {/* <Icon
//             icon="hugeicons:message-multiple-02"
//             fontSize={30}
//             className="text-gray-400"
//           /> */}

//           {isAuthenticated ? (
//             <Dropdown className="self-end">
//               <DropdownTrigger>
//                 <Button
//                   variant="solid"
//                   className="bg-primary-200"
//                   endContent={<Icon icon="mingcute:down-line" />}
//                 >
//                   <Avatar src="/images/dp2.png" size="sm" />
//                 </Button>
//               </DropdownTrigger>
//               <DropdownMenu
//                 aria-label="Dropdown menu with icons"
//                 variant="solid"
//                 color="primary"
//               >
//                 <DropdownItem
//                   key="profile"
//                   href="/profile"
//                   endContent={<Icon icon="streamline:user-profile-focus" />}
//                 >
//                   View profile
//                 </DropdownItem>
//                 <DropdownItem
//                   key="logout"
//                   onClick={handleLogout}
//                   endContent={<Icon icon="bx:log-out" />}
//                 >
//                   Log Out
//                 </DropdownItem>
//               </DropdownMenu>
//             </Dropdown>
//           ) : (
//             // <Button
//             //   radius="none"
//             //   className="bg-black text-white"
//             //   onClick={handleLogout}
//             // >
//             //   Sign Out
//             // </Button>
//             <Button
//               radius="none"
//               className="bg-black text-white"
//               as={Link}
//               to="/auth/login"
//             >
//               Sign In
//             </Button>
//           )}
//         </section>

//         <Drawer
//           size="xs"
//           onOpenChange={() => setShowSidebar(false)}
//           isOpen={shouldShowSidebar}
//           placement="left"
//           radius="none"
//         >
//           <DrawerContent className="p-[1rem]">
//             <div className="text-2xl font-bold text-[#034d3a] cursor-pointer">
//               Agrolink
//             </div>

//             <div className="flex flex-col items-start gap-[1rem] p-5">
//               {NAV_ITEMS.map((item, index) => (
//                 <Link
//                   to={item.path}
//                   key={index}
//                   className="active:text-[#ff5c14] hover:text-[#ff5c14]"
//                   onClick={() => setShowSidebar(false)}
//                 >
//                   {item.label}
//                 </Link>
//               ))}
//             </div>

//             {isAuthenticated ? (
//               <Button
//                 radius="none"
//                 className="bg-black text-white"
//                 onClick={handleLogout}
//               >
//                 Sign Out
//               </Button>
//             ) : (
//               <Button
//                 radius="none"
//                 className="bg-black text-white"
//                 as={Link}
//                 to="/auth/login"
//               >
//                 Sign In
//               </Button>
//             )}
//           </DrawerContent>
//         </Drawer>
//       </section>
//     </nav>
//   );
// };

// export default LandingNavbar;

import {
  Avatar,
  Button,
  Drawer,
  DrawerContent,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react';
import { Link, NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { NAV_ITEMS as BASE_NAV_ITEMS } from './config';
import { jwtDecode } from 'jwt-decode';
import { enqueueSnackbar } from 'notistack';
import { authAxios } from '../serverUrl';
 // Make sure this is your authenticated Axios instance

interface USER {
  id: number;
  name: string;
  email: string;
  role: 'farmer' | 'buyer' | string;
}

export function isTokenValid(token: string | null): boolean {
  if (!token) return false;
  try {
    const decoded: { exp: number } = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp > now;
  } catch (e) {
    console.error('Invalid token:', e);
    return false;
  }
}

const LandingNavbar = () => {
  const [isFixed, setIsFixed] = useState(false);
  const [shouldShowSidebar, setShowSidebar] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<USER | null>(null);

  const updateDrawer = () => setShowSidebar((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
    window.location.href = '/';
    enqueueSnackbar('Successfully Logged Out.', { variant: 'success' });
  };

  const fetchProfileData = async () => {
    try {
      const response = await authAxios.get('/user/profile/');
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(isTokenValid(token));
    if (isTokenValid(token)) {
      fetchProfileData();
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter nav items based on role
  const filteredNavItems = BASE_NAV_ITEMS.filter((item) => {
    if (userData?.role === 'buyer' && item.label === 'Farmers') return false;
    if (userData?.role === 'farmer' && item.label === 'Liked Products')
      return false;
    return true;
  });

  const NavItemsWrapper = () => (
    <section className="flex lg:gap-[1.3rem] xl:gap-[2.3rem]">
      {filteredNavItems.map((item, idx) => (
        <NavLink
          key={idx}
          to={item.path}
          className={({ isActive }) =>
            clsx(
              'text-sm lg:text-xs xl:text-sm font-medium text-gray-400 px-2 p-1 whitespace-nowrap',
              isActive && '!text-black'
            )
          }
          {...(item.label === 'Motor Insurance' && { target: '_blank' })}
          end
        >
          {item.label}
        </NavLink>
      ))}
    </section>
  );

  return (
    <nav
      className={clsx(
        'border-b-3 border-primary-100 py-3 bg-white',
        isFixed && 'fixed top-0 z-50 w-full transition-all duration-1000'
      )}
    >
      <section className="flex flex-col lg:flex-row items-center lg:justify-between gap-[1rem] lg:gap-[6rem] w-[90%] mx-auto">
        <section className="w-full flex gap-[1rem]">
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

        <section>
          {isAuthenticated ? (
            <Dropdown className="self-end">
              <DropdownTrigger>
                <Button
                  variant="solid"
                  className="bg-primary-200"
                  endContent={<Icon icon="mingcute:down-line" />}
                >
                  <Avatar src="/images/dp2.png" size="sm" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="User menu"
                variant="solid"
                color="primary"
              >
                <DropdownItem
                  key="profile"
                  href="/profile"
                  endContent={<Icon icon="streamline:user-profile-focus" />}
                >
                  View Profile
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  onClick={handleLogout}
                  endContent={<Icon icon="bx:log-out" />}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
              {filteredNavItems.map((item, index) => (
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
