import { Navigate, Outlet } from "react-router-dom";
import { useMeQuery } from "../Redux/api/UserApi";
import { useEffect } from "react";
import Loader from './../components/Loader/Loader';

const PrivateGard = () => {
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

  return isUserLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateGard;
