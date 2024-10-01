import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../hook/useAuth";

const ProtectedRoute = () => {
  const { state } = useAuthContext();

  return state.user ? <Outlet /> : <Navigate to={"/login"} replace />;
};

export default ProtectedRoute;
