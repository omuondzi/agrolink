import { useRoutes } from "react-router-dom";
import LandingLayout from "./layouts";
import HomePage from "./pages/home";
import NotFoundPage from "./pages/not-found";

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
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);
  return routes;
};

export default Router;
