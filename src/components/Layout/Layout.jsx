import Sidebar from "./../Sidebar/Sidebar";
import Navbar from "./../Navbar/Navbar";
import Footer from "./../Footer/Footer";
import { Outlet } from 'react-router-dom';
const Layout = () => {
  return (
    <div className="layout-wrapper layout-content-navbar  ">
      <div className="layout-container">
        <Sidebar />
        {/* Layout container */}
        <div className="layout-page">
          {/* Navbar */}
          <Navbar />
          {/* / Navbar */}
          {/* Content wrapper */}
          <div className="content-wrapper">
            {/* Content */}
            <div className="container-xxl flex-grow-1 container-p-y">
            <Outlet />
            </div>
            {/* / Content */}
            {/* Footer */}
            <Footer />
            {/* / Footer */}
            <div className="content-backdrop fade" />
          </div>
          {/* Content wrapper */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
