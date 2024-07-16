import { Navigate, Outlet } from "react-router-dom";
import { useMeQuery } from "../Redux/api/UserApi";
import AuthLoader from "../utils/Loaders/AuthLoader";
import PageTransition from "../components/styles/Transition";
const PrivateGard = () => {
  const { data, isLoading, isSuccess } = useMeQuery();

  if (isLoading) {
    return <AuthLoader />;
  }
  if (isSuccess && data?.payload?.user) {
    return (
      <PageTransition>
        <Outlet />
      </PageTransition>
    );
  }

  return <Navigate to="/login" />;
};

export default PrivateGard;
