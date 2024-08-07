import { useState, useEffect, useRef } from "react";
import avatar from "../../assets/img/avatars/1.png";
import { useLogOutUserMutation } from "../../Redux/api/UserApi";
import { useNavigate } from "react-router-dom";
import AuthLoader from "../../utils/Loaders/AuthLoader";
import { useMeQuery } from "../../Redux/api/UserApi";
const Navbar = () => {
  const navigate = useNavigate();
  const [logOutUser,isSuccess,isLoading] = useLogOutUserMutation();
const { data,refetch } = useMeQuery();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);
  const [isAppDropdownOpen, SetIsAppDropdownOpen] = useState(false);
  const [isSetSearch, setIsSetSearch] = useState(false);
  const handleMobileMenu = () => {
    document.documentElement.classList.toggle("layout-menu-expanded");
  };

  const searchRef = useRef();
  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleDropdownNotification = () => {
    setIsNotificationDropdownOpen(!isNotificationDropdownOpen);
  };
  const toggleDropdownApp = () => {
    SetIsAppDropdownOpen(!isAppDropdownOpen);
  };
  const handleToggleSearch = () => {
    setIsSetSearch(!isSetSearch);
  };
  const handleLogout = () => {
    logOutUser();
    refetch()
  };

  const handleClose = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setIsSetSearch(false);
      document.documentElement.classList.toggle("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      refetch().then(() => {
        if (!data) {
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }
      });
    }
  }, [isSuccess, data, navigate, refetch]);

  if (isLoading) {
    return (
      <p className="">
        <AuthLoader />
      </p>
    );
  }
  return (
    <nav
      className="layout-navbar hide-on-print container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
      id="layout-navbar"
    >
      <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0   d-xl-none ">
        <a
          onClick={handleMobileMenu}
          className="nav-item nav-link px-0 me-xl-4"
          href="#"
        >
          <i className="ti ti-menu-2 ti-md" />
        </a>
      </div>
      <div
        className={`navbar-nav-right d-flex align-items-center ${
          isSetSearch ? "d-none" : ""
        }`}
        id="navbar-collapse"
      >
        {/* Search */}
        <div className="navbar-nav align-items-center">
          <div className="nav-item navbar-search-wrapper mb-0">
            <a
              className="nav-item nav-link search-toggler d-flex align-items-center px-0"
              href="#"
              onClick={handleToggleSearch}
            >
              <i className="ti ti-search ti-md me-2 me-lg-4 ti-lg" />
              <span className="d-none d-md-inline-block text-muted fw-normal">
                Search (Ctrl+/)
              </span>
            </a>
          </div>
        </div>
        {/* /Search */}
        <ul className="navbar-nav flex-row align-items-center ms-auto">
          <li className="nav-item dropdown-style-switcher dropdown">
            <a
              className="nav-link btn btn-text-secondary btn-icon rounded-pill dropdown-toggle hide-arrow"
              href="javascript:void(0);"
              data-bs-toggle="dropdown"
            >
              <i className="ti ti-md" />
            </a>
            <ul className="dropdown-menu dropdown-menu-end dropdown-styles">
              <li>
                <a
                  className="dropdown-item"
                  href="javascript:void(0);"
                  data-theme="light"
                >
                  <span className="align-middle">
                    <i className="ti ti-sun ti-md me-3" />
                    Light
                  </span>
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="javascript:void(0);"
                  data-theme="dark"
                >
                  <span className="align-middle">
                    <i className="ti ti-moon-stars ti-md me-3" />
                    Dark
                  </span>
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="javascript:void(0);"
                  data-theme="system"
                >
                  <span className="align-middle">
                    <i className="ti ti-device-desktop-analytics ti-md me-3" />
                    System
                  </span>
                </a>
              </li>
            </ul>
          </li>
          {/* / Style Switcher*/}
          {/* Quick links  */}
          <li className="nav-item dropdown-shortcuts navbar-dropdown dropdown">
            <a
              className={`nav-link btn btn-text-secondary btn-icon rounded-pill btn-icon dropdown-toggle hide-arrow ${
                isAppDropdownOpen ? "show" : ""
              }`}
              href="#"
              onClick={toggleDropdownApp}
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded="false"
            >
              <i className="ti ti-layout-grid-add ti-md" />
            </a>
            <div
              className={`dropdown-menu dropdown-menu-end p-0 ${
                isAppDropdownOpen ? "show" : ""
              }`}
            >
              <div className="dropdown-menu-header border-bottom">
                <div className="dropdown-header d-flex align-items-center py-3">
                  <h6 className="mb-0 me-auto">Shortcuts</h6>
                  <a
                    href="javascript:void(0)"
                    className="btn btn-text-secondary rounded-pill btn-icon dropdown-shortcuts-add"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Add shortcuts"
                  >
                    <i className="ti ti-plus text-heading" />
                  </a>
                </div>
              </div>
              <div className="dropdown-shortcuts-list scrollable-container">
                <div className="row row-bordered overflow-visible g-0">
                  <div className="dropdown-shortcuts-item col">
                    <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                      <i className="ti ti-calendar ti-26px text-heading" />
                    </span>
                    <a href="app-calendar.html" className="stretched-link">
                      Calendar
                    </a>
                    <small>Appointments</small>
                  </div>
                  <div className="dropdown-shortcuts-item col">
                    <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                      <i className="ti ti-file-dollar ti-26px text-heading" />
                    </span>
                    <a href="app-invoice-list.html" className="stretched-link">
                      Invoice App
                    </a>
                    <small>Manage Accounts</small>
                  </div>
                </div>
                <div className="row row-bordered overflow-visible g-0">
                  <div className="dropdown-shortcuts-item col">
                    <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                      <i className="ti ti-user ti-26px text-heading" />
                    </span>
                    <a href="app-user-list.html" className="stretched-link">
                      User App
                    </a>
                    <small>Manage Users</small>
                  </div>
                  <div className="dropdown-shortcuts-item col">
                    <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                      <i className="ti ti-users ti-26px text-heading" />
                    </span>
                    <a href="app-access-roles.html" className="stretched-link">
                      Role Management
                    </a>
                    <small>Permission</small>
                  </div>
                </div>
                <div className="row row-bordered overflow-visible g-0">
                  <div className="dropdown-shortcuts-item col">
                    <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                      <i className="ti ti-device-desktop-analytics ti-26px text-heading" />
                    </span>
                    <a href="index.html" className="stretched-link">
                      Dashboard
                    </a>
                    <small>User Dashboard</small>
                  </div>
                  <div className="dropdown-shortcuts-item col">
                    <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                      <i className="ti ti-settings ti-26px text-heading" />
                    </span>
                    <a
                      href="pages-account-settings-account.html"
                      className="stretched-link"
                    >
                      Setting
                    </a>
                    <small>Account Settings</small>
                  </div>
                </div>
                <div className="row row-bordered overflow-visible g-0">
                  <div className="dropdown-shortcuts-item col">
                    <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                      <i className="ti ti-help ti-26px text-heading" />
                    </span>
                    <a href="pages-faq.html" className="stretched-link">
                      FAQs
                    </a>
                    <small>FAQs &amp; Articles</small>
                  </div>
                  <div className="dropdown-shortcuts-item col">
                    <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                      <i className="ti ti-square ti-26px text-heading" />
                    </span>
                    <a href="modal-examples.html" className="stretched-link">
                      Modals
                    </a>
                    <small>Useful Popups</small>
                  </div>
                </div>
              </div>
            </div>
          </li>
          {/* Quick links */}
          {/* Notification */}
          <li className="nav-item dropdown-notifications navbar-dropdown dropdown me-3 me-xl-2">
            <a
              className={`nav-link btn btn-text-secondary btn-icon rounded-pill dropdown-toggle hide-arrow ${
                isNotificationDropdownOpen ? "show" : ""
              }`}
              onClick={toggleDropdownNotification}
              href="#"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded="false"
            >
              <span className="position-relative">
                <i className="ti ti-bell ti-md" />
                <span className="badge rounded-pill bg-danger badge-dot badge-notifications border" />
              </span>
            </a>
            <ul
              className={`dropdown-menu dropdown-menu-end p-0 ${
                isNotificationDropdownOpen ? "show" : ""
              }`}
            >
              <li className="dropdown-menu-header border-bottom">
                <div className="dropdown-header d-flex align-items-center py-3">
                  <h6 className="mb-0 me-auto">Notification</h6>
                  <div className="d-flex align-items-center h6 mb-0">
                    <span className="badge bg-label-primary me-2">8 New</span>
                    <a
                      href="javascript:void(0)"
                      className="btn btn-text-secondary rounded-pill btn-icon dropdown-notifications-all"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Mark all as read"
                    >
                      <i className="ti ti-mail-opened text-heading" />
                    </a>
                  </div>
                </div>
              </li>
              <li className="dropdown-notifications-list scrollable-container">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item list-group-item-action dropdown-notifications-item">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar">
                          <img src={avatar} alt className="rounded-circle" />
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="small mb-1">Congratulation Lettie 🎉</h6>
                        <small className="mb-1 d-block text-body">
                          Won the monthly best seller gold badge
                        </small>
                        <small className="text-muted">1h ago</small>
                      </div>
                      <div className="flex-shrink-0 dropdown-notifications-actions">
                        <a
                          href="javascript:void(0)"
                          className="dropdown-notifications-read"
                        >
                          <span className="badge badge-dot" />
                        </a>
                        <a
                          href="javascript:void(0)"
                          className="dropdown-notifications-archive"
                        >
                          <span className="ti ti-x" />
                        </a>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item list-group-item-action dropdown-notifications-item">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar">
                          <span className="avatar-initial rounded-circle bg-label-danger">
                            CF
                          </span>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1 small">Charles Franklin</h6>
                        <small className="mb-1 d-block text-body">
                          Accepted your connection
                        </small>
                        <small className="text-muted">12hr ago</small>
                      </div>
                      <div className="flex-shrink-0 dropdown-notifications-actions">
                        <a
                          href="javascript:void(0)"
                          className="dropdown-notifications-read"
                        >
                          <span className="badge badge-dot" />
                        </a>
                        <a
                          href="javascript:void(0)"
                          className="dropdown-notifications-archive"
                        >
                          <span className="ti ti-x" />
                        </a>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar">
                          <img
                            src="../../assets/img/avatars/2.png"
                            alt
                            className="rounded-circle"
                          />
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1 small">New Message ✉️</h6>
                        <small className="mb-1 d-block text-body">
                          You have new message from Natalie
                        </small>
                        <small className="text-muted">1h ago</small>
                      </div>
                      <div className="flex-shrink-0 dropdown-notifications-actions">
                        <a
                          href="javascript:void(0)"
                          className="dropdown-notifications-read"
                        >
                          <span className="badge badge-dot" />
                        </a>
                        <a
                          href="javascript:void(0)"
                          className="dropdown-notifications-archive"
                        >
                          <span className="ti ti-x" />
                        </a>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item list-group-item-action dropdown-notifications-item">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar">
                          <span className="avatar-initial rounded-circle bg-label-success">
                            <i className="ti ti-shopping-cart" />
                          </span>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1 small">
                          Whoo! You have new order 🛒{" "}
                        </h6>
                        <small className="mb-1 d-block text-body">
                          ACME Inc. made new order $1,154
                        </small>
                        <small className="text-muted">1 day ago</small>
                      </div>
                      <div className="flex-shrink-0 dropdown-notifications-actions">
                        <a
                          href="javascript:void(0)"
                          className="dropdown-notifications-read"
                        >
                          <span className="badge badge-dot" />
                        </a>
                        <a
                          href="javascript:void(0)"
                          className="dropdown-notifications-archive"
                        >
                          <span className="ti ti-x" />
                        </a>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar">
                          <img
                            src="../../assets/img/avatars/9.png"
                            alt
                            className="rounded-circle"
                          />
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1 small">
                          Application has been approved 🚀{" "}
                        </h6>
                        <small className="mb-1 d-block text-body">
                          Your ABC project application has been approved.
                        </small>
                        <small className="text-muted">2 days ago</small>
                      </div>
                      <div className="flex-shrink-0 dropdown-notifications-actions">
                        <a
                          href="javascript:void(0)"
                          className="dropdown-notifications-read"
                        >
                          <span className="badge badge-dot" />
                        </a>
                        <a
                          href="javascript:void(0)"
                          className="dropdown-notifications-archive"
                        >
                          <span className="ti ti-x" />
                        </a>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar">
                          <span className="avatar-initial rounded-circle bg-label-success">
                            <i className="ti ti-chart-pie" />
                          </span>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1 small">
                          Monthly report is generated
                        </h6>
                        <small className="mb-1 d-block text-body">
                          July monthly financial report is generated{" "}
                        </small>
                        <small className="text-muted">3 days ago</small>
                      </div>
                      <div className="flex-shrink-0 dropdown-notifications-actions">
                        <a
                          href="javascript:void(0)"
                          className="dropdown-notifications-read"
                        >
                          <span className="badge badge-dot" />
                        </a>
                        <a
                          href="javascript:void(0)"
                          className="dropdown-notifications-archive"
                        >
                          <span className="ti ti-x" />
                        </a>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar">
                          <img
                            src="../../assets/img/avatars/5.png"
                            alt
                            className="rounded-circle"
                          />
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1 small">Send connection request</h6>
                        <small className="mb-1 d-block text-body">
                          Peter sent you connection request
                        </small>
                        <small className="text-muted">4 days ago</small>
                      </div>
                      <div className="flex-shrink-0 dropdown-notifications-actions">
                        <a
                          href="javascript:void(0)"
                          className="dropdown-notifications-read"
                        >
                          <span className="badge badge-dot" />
                        </a>
                        <a
                          href="javascript:void(0)"
                          className="dropdown-notifications-archive"
                        >
                          <span className="ti ti-x" />
                        </a>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item list-group-item-action dropdown-notifications-item">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar">
                          <img
                            src="../../assets/img/avatars/6.png"
                            alt
                            className="rounded-circle"
                          />
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1 small">New message from Jane</h6>
                        <small className="mb-1 d-block text-body">
                          Your have new message from Jane
                        </small>
                        <small className="text-muted">5 days ago</small>
                      </div>
                      <div className="flex-shrink-0 dropdown-notifications-actions">
                        <a
                          href="javascript:void(0)"
                          className="dropdown-notifications-read"
                        >
                          <span className="badge badge-dot" />
                        </a>
                        <a
                          href="javascript:void(0)"
                          className="dropdown-notifications-archive"
                        >
                          <span className="ti ti-x" />
                        </a>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar">
                          <span className="avatar-initial rounded-circle bg-label-warning">
                            <i className="ti ti-alert-triangle" />
                          </span>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1 small">CPU is running high</h6>
                        <small className="mb-1 d-block text-body">
                          CPU Utilization Percent is currently at 88.63%,
                        </small>
                        <small className="text-muted">5 days ago</small>
                      </div>
                      <div className="flex-shrink-0 dropdown-notifications-actions">
                        <a
                          href="javascript:void(0)"
                          className="dropdown-notifications-read"
                        >
                          <span className="badge badge-dot" />
                        </a>
                        <a
                          href="javascript:void(0)"
                          className="dropdown-notifications-archive"
                        >
                          <span className="ti ti-x" />
                        </a>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
              <li className="border-top">
                <div className="d-grid p-4">
                  <a className="btn btn-primary btn-sm d-flex" href="#">
                    <small className="align-middle">
                      View all notifications
                    </small>
                  </a>
                </div>
              </li>
            </ul>
          </li>
          {/*/ Notification */}
          {/* User */}
          <li className="nav-item navbar-dropdown dropdown-user dropdown">
            <a
              onClick={toggleDropdown}
              className={`nav-link dropdown-toggle hide-arrow p-0 ${
                isDropdownOpen ? "show" : ""
              }`}
              href="#"
              data-bs-toggle="dropdown"
            >
              <div className="avatar avatar-online">
                <img src={avatar} alt className="rounded-circle" />
              </div>
            </a>
            <ul
              className={`dropdown-menu dropdown-menu-end ${
                isDropdownOpen ? "show" : ""
              }`}
            >
              <li>
                <a
                  className="dropdown-item mt-0"
                  href="pages-account-settings-account.html"
                >
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 me-2">
                      <div className="avatar avatar-online">
                        <img src={avatar} alt className="rounded-circle" />
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-0 text-capitalize">{data?.payload?.user?.firstName}  {data?.payload?.user?.lastName}</h6>
                      <small className="text-muted">{data?.payload?.user?.role}</small>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <div className="dropdown-divider my-1 mx-n2" />
              </li>
              <li>
                <a className="dropdown-item" href="pages-profile-user.html">
                  <i className="ti ti-user me-3 ti-md" />
                  <span className="align-middle">My Profile</span>
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="pages-account-settings-account.html"
                >
                  <i className="ti ti-settings me-3 ti-md" />
                  <span className="align-middle">Settings</span>
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="pages-account-settings-billing.html"
                >
                  <span className="d-flex align-items-center align-middle">
                    <i className="flex-shrink-0 ti ti-file-dollar me-3 ti-md" />
                    <span className="flex-grow-1 align-middle">Billing</span>
                    <span className="flex-shrink-0 badge bg-danger d-flex align-items-center justify-content-center">
                      4
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <div className="dropdown-divider my-1 mx-n2" />
              </li>
              <li>
                <a className="dropdown-item" href="pages-pricing.html">
                  <i className="ti ti-currency-dollar me-3 ti-md" />
                  <span className="align-middle">Pricing</span>
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="pages-faq.html">
                  <i className="ti ti-question-mark me-3 ti-md" />
                  <span className="align-middle">FAQ</span>
                </a>
              </li>
              <li onClick={handleLogout}>
                <div className="d-grid px-2 pt-2 pb-1">
                  <button
                    className="btn btn-sm btn-danger d-flex"
                  >
                    <small className="align-middle">Logout</small>
                    <i className="ti ti-logout ms-2 ti-14px" />
                  </button>
                </div>
              </li>
            </ul>
          </li>
          {/*/ User */}
        </ul>
      </div>
      {/* Search Small Screens */}

      <div
        ref={searchRef}
        className={`navbar-search-wrapper search-input-wrapper ${
          isSetSearch ? "" : "d-none"
        }`}
      >
        <input
          type="text"
          className="form-control search-input w-100 container-xxl border-0"
          placeholder="Search..."
          aria-label="Search..."
        />

        <i
          onClick={() => setIsSetSearch(false)}
          className={`ti ti-x search-toggler cursor-pointer `}
        />
      </div>
    </nav>
  );
};

export default Navbar;
