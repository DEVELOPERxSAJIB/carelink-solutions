import { Navigate, Outlet } from "react-router-dom";
import { useMeQuery } from "../Redux/api/UserApi";
import AuthLoader from "../utils/Loaders/AuthLoader";
import PageTransition from "../components/styles/Transition";

const PublicGard = () => {
  const pathName = localStorage.getItem("pathName");

  const { data, isLoading, isSuccess } = useMeQuery();
  if (isLoading) {
    return <AuthLoader />;
  }
  if (isSuccess && data?.payload?.user) {
    return <Navigate to={pathName} />;
  }
  return (
    <PageTransition>
      <Outlet />
    </PageTransition>
  );
};

export default PublicGard;
