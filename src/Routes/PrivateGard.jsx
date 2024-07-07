import { Navigate, Outlet } from "react-router-dom";
import { useMeQuery } from "../Redux/api/UserApi";
import AuthLoader from "../utils/Loaders/AuthLoader";

const PrivateGard = () => {
  const { data, isLoading, isSuccess } = useMeQuery();

  if (isLoading) {
    return <AuthLoader />;
  }

  if (isSuccess && data?.payload?.user) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
};

export default PrivateGard;
