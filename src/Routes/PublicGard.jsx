import { Navigate, Outlet } from "react-router-dom";
import { useMeQuery } from "../Redux/api/UserApi";
import AuthLoader from "../utils/Loaders/AuthLoader";

const PublicGard = () => {
  const { data, isLoading, isSuccess } = useMeQuery();

  if (isLoading) {
    return <AuthLoader />;
  }

  if (isSuccess && data?.payload?.user) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PublicGard;
