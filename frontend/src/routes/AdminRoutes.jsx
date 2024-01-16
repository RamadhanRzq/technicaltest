import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoutes() {
  const user = useSelector((state) => state.auth.user);

  if (!user || !user.roles || user.roles !== "admin") {
    alert("Only Admin can access this page");
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
