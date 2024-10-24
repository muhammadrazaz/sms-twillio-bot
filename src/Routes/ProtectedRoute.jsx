import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";

export const ProtectedRoute = ({requiredRole, children}) => {
    const { token,userDetail } = useAuth();
  
    // Check if the user is authenticated
    if (!token) {
      // If not authenticated, redirect to the login page
      return <Navigate to="/" />;
    }

        if (requiredRole && userDetail.role !== requiredRole) {
      // Show 403 Forbidden if the user doesn't have the required permission
      return <h1>403 Forbidden</h1>;
    }
  
    // If authenticated, render the child routes
    return children;
    return <Outlet />;
  };


  // import React from 'react';
  // import { Navigate } from 'react-router-dom';
  
  // const ProtectedRoute = ({ isAuthenticated, permission, requiredPermission, children }) => {
  //   if (!isAuthenticated) {
  //     // Redirect to login if the user is not authenticated
  //     return <Navigate to="/login" />;
  //   }
  
  //   if (requiredPermission && permission !== requiredPermission) {
  //     // Show 403 Forbidden if the user doesn't have the required permission
  //     return <h1>403 Forbidden</h1>;
  //   }
  
  //   // Otherwise, render the child components (the protected route)
  //   return children;
  // };
  
  // export default ProtectedRoute;