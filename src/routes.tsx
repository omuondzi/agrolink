import { useRoutes } from 'react-router-dom';
import LandingLayout from './layouts';
import HomePage from './pages/home';
import NotFoundPage from './pages/not-found';
import AboutPage from './pages/about';
import ProductsPage from './pages/products';
import FarmersPage from './pages/farmers';
import AuthLayout from './layouts/auth';
import SignUpPage from './pages/auth/signup';
import LoginPage from './pages/auth/login';
import ForgotPassworPage from './pages/auth/forgot-password';
import ResetPasswordPage from './pages/auth/reset-password';
import ProtectedRoute from './ProtectedRoute';

const Router = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <LandingLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: 'about',
          element: <AboutPage />,
        },
        {
          path: 'products',
          element: <ProductsPage />,
        },
        {
          path: 'farmers',
          element: (
            <ProtectedRoute>
              <FarmersPage />
            </ProtectedRoute>
          ),
        },
        {
          path: '*',
          element: <NotFoundPage />,
        },
      ],
    },
    {
      path: '/auth',
      element: <AuthLayout />,
      children: [
        {
          path: 'signup',
          element: <SignUpPage />,
        },
        {
          path: 'login',
          element: <LoginPage />,
        },
        {
          path: 'forgot-password',
          element: <ForgotPassworPage />,
        },
        {
          path: 'reset-password/:token',
          element: <ResetPasswordPage />,
        },
      ],
    },
  ]);
  return routes;
};

export default Router;
