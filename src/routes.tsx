import { useRoutes } from "react-router-dom";
import LandingLayout from "./layouts";
import HomePage from "./pages/home";

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
      ],
    },
  ]);
  return routes;
};

export default Router;
