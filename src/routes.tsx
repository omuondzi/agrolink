import { useRoutes } from "react-router-dom";
import LandingLayout from "./layouts";
import HomePage from "./pages/home";
import NotFoundPage from "./pages/not-found";
import AboutPage from "./pages/about";
import ProductsPage from "./pages/products";
import FarmersPage from "./pages/farmers";
import AuthLayout from "./layouts/auth";
import SignUpPage from "./pages/auth/signup";
import LoginPage from "./pages/auth/login";
import ForgotPassworPage from "./pages/auth/forgot-password";
import ResetPasswordPage from "./pages/auth/reset-password";
import ProtectedRoute from "./ProtectedRoute";
import VegetablesPage from "./views/products/vegetables";
import FruitsPage from "./views/products/fruits";
import GrainsPage from "./views/products/grain";
import DairyPage from "./views/products/dairy";
import ProfilePage from "./pages/profile";
import LikedPageView from "./views/liked-products";
import ContactUsPage from "./pages/contact-us";
import AllProductsPage from "./views/products/all";

const Router = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <LandingLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "about",
          element: <AboutPage />,
        },
        {
          path: "products",
          element: <ProductsPage />,
          children: [
            {
              index: true,
              element: <AllProductsPage />,
            },
            {
              path: "vegetables",
              element: <VegetablesPage />,
            },
            {
              path: "fruits",
              element: <FruitsPage />,
            },
            {
              path: "grains",
              element: <GrainsPage />,
            },
            {
              path: "dairy",
              element: <DairyPage />,
            },
          ],
        },
        {
          path: "farmers",
          element: (
            <ProtectedRoute requiredRole="farmer">
              <FarmersPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "liked-products",
          element: (
            <ProtectedRoute requiredRole="buyer">
              <LikedPageView />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: <ProfilePage />,
        },
        {
          path: "contact-us",
          element: <ContactUsPage />,
        },

        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "signup",
          element: <SignUpPage />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassworPage />,
        },
        {
          path: "reset-password/:token",
          element: <ResetPasswordPage />,
        },
      ],
    },
  ]);
  return routes;
};

export default Router;
