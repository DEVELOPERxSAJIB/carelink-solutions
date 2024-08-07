import Sidebar from "./../Sidebar/Sidebar";
import Navbar from "./../Navbar/Navbar";
import Footer from "./../Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useMeQuery } from "../../Redux/api/UserApi";
const Layout = () => {
  const location = useLocation();
  const { data } = useMeQuery();
  //console.log(data);
  useEffect(() => {
    if (location.pathname !== "/login" && location.pathname !== "/register") {
      localStorage.setItem("pathName", location.pathname);
    }
  }, [location]);
  return (
    <div className="layout-wrapper layout-content-navbar  ">
      <div className="layout-container">
        <Sidebar
          userRole={data?.payload?.user?.role}
          permissions={data?.payload?.user?.permissions}
        />
        <div className="layout-page">
          <Navbar />
          <div className="content-wrapper">
            <div
              key="content"
              className="container-xxl flex-grow-1 container-p-y"
            >
              <Outlet />
            </div>
            <Footer />
            <div className="content-backdrop fade" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
