import { Navigate, Outlet, useLocation } from "react-router-dom";
const isAuthenticated = () => !!localStorage.getItem("session");

const ProtectedRoute = () => {
  const location = useLocation();
  if (!isAuthenticated() && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};
export default ProtectedRoute;
