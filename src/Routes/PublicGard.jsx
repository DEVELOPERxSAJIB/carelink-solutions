import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useMeQuery } from "../Redux/api/UserApi";
import Loader from './../components/Loader/Loader';

const PublicGard = () => {
  const { data, isLoading, isSuccess, isError } = useMeQuery();

  useEffect(() => {
    if (isSuccess && data?.user) {
      localStorage.setItem("LoginUser", JSON.stringify(data.user));
    } else if (isError) {
      localStorage.removeItem("LoginUser");
    }
  }, [isSuccess, isError, data]);

  if (isLoading) {
    return <p><Loader/></p>;
  }

  const isUserLoggedIn = localStorage.getItem("LoginUser");

  return isUserLoggedIn ? <Navigate to="/" /> : <Outlet />;
};

export default PublicGard;
