import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'farmer' | 'buyer';  // restrict access based on this role
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  const userJson = localStorage.getItem('user');
  const user = userJson ? JSON.parse(userJson) : null;

  const isAuthenticated = !!token && !!user;

  if (!isAuthenticated) {
    // Not logged in
    return <Navigate to="/auth/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Logged in but role not authorized
    return <Navigate to="/" replace />;
  }

  // Authorized
  return <>{children}</>;
};

export default ProtectedRoute;
