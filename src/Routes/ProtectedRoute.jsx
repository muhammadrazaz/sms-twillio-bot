import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";

export const ProtectedRoute = ({ requiredRole, children }) => {
  const { token, userDetail } = useAuth();


  if (!token) {

    return <Navigate to="/" />;
  }
// intown
  if (!(requiredRole && userDetail.role && requiredRole.includes(userDetail.role))) {

    return <h1>403 Forbidden</h1>;
  }


  return children;
  return <Outlet />;
};


