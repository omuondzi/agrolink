import { PropsWithChildren, useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { HeroUIProvider } from "@heroui/react";

const Providers = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  useEffect(() => {
    const updateHeight = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, []);
  return (
    <SnackbarProvider
      anchorOrigin={{
        horizontal: "right",
        vertical: "top",
      }}
      autoHideDuration={3000}
      dense
      preventDuplicate
    >
      <HeroUIProvider navigate={navigate}>{children}</HeroUIProvider>
    </SnackbarProvider>
  );
};

export default Providers;
