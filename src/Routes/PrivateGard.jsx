
import { Navigate, Outlet } from "react-router-dom";

const PrivateGard = () => {
let user;
  if (localStorage.getItem("user")) {
    return <Outlet />;
  } else {
    return !user ? <Outlet /> : <Navigate to="/login" />;
  }
};

export default PrivateGard;
