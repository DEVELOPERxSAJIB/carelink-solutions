import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../public/logo.png";

const Sidebar = ({ userRole, permissions }) => {
  const [isActive, setIsActive] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const location = useLocation();
  const menuRef = useRef();

  // Toggle sidebar collapse
  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  // Handle submenu click to toggle visibility
  const handleSubMenuClick = (index) => {
    setActiveMenu(activeMenu === index ? null : index);
  };

  const sideBarMenu = [
    {
      title: "Settings",
      href: "",
      // roles: ["superadmin", "admin"],
      icon: (
        <i className="menu-icon tf-icons ti ti-settings menu-toggle-icon d-xl-block align-middle"></i>
      ),
      subMenu: [
        { title: "Company Profile", href: "/profile", icon: "" },
        // { title: "Agency Invoice", href: "/agency-invoice", icon: "" },
        { title: "Payroll", href: "/payroll", icon: "" },
        { title: "Change Password", href: "/change-password", icon: "" },
        {
          title: "Positive Identifications",
          href: "/positive-identifications",
          icon: "",
        },
        { title: "Notifications", href: "/notifications", icon: "" },
        { title: "Permissions", href: "/permissions", icon: "" },
      ],
    },
    {
      title: "Manage Co-Admins",
      href: "",
      // roles: ["superadmin"],
      icon: (
        <i className="menu-icon tf-icons ti ti-users menu-toggle-icon d-xl-block align-middle"></i>
      ),
      subMenu: [{ title: "Co-Admins", href: "/coadmins", icon: "" }],
    },
    {
      title: "Add New Mileage",
      href: "/add-new-mileage",
      // roles: ["provider", "superadmin"],
      icon: (
        <i className="menu-icon tf-icons ti ti-car menu-toggle-icon d-xl-block align-middle"></i>
      ),
      subMenu: [],
    },
    {
      title: "Patient",
      href: "",
      // roles: [
      //   "superadmin",
      //   "admin",
      //   "provider",
      //   "caregiver",
      //   "patient",
      //   "coadmin",
      //   "supportadministrator",
      //   "healthcareprofessional",
      //   "compliance",
      //   "guardian",
      // ],
      icon: (
        <i className="menu-icon tf-icons ti ti-user-plus menu-toggle-icon d-xl-block align-middle"></i>
      ),
      subMenu: [
        { title: "Patient", href: "/patient", icon: "" },
        { title: "Payers", href: "/payers", icon: "" },
        { title: "Physicians", href: "/physicians", icon: "" },
        { title: "Clinical/Diagnoses", href: "/clinical-diagnoses", icon: "" },
        { title: "Pharmacy", href: "/pharmacy", icon: "" },
        { title: "Contract", href: "/contacts", icon: "" },

        {
          title: "Emergency Preparedness",
          href: "/emergency-preparedness",
          icon: "",
        },
        { title: "Advance Directives", href: "/advance-directives", icon: "" },
        {
          title: "Referral Information",
          href: "/referral-information",
          icon: "",
        },
      ],
    },
    {
      title: "Providers",
      href: "",
      // roles: [
      //   "superadmin",
      //   "admin",
      //   "provider",
      //   "coadmin",
      //   "supportadministrator",
      //   "healthcareprofessional",
      //   "compliance",
      // ],
      icon: (
        <i className="menu-icon tf-icons ti ti-user-plus menu-toggle-icon d-xl-block align-middle"></i>
      ),
      subMenu: [
        { title: "My Providers", href: "/providers", icon: "" },
        {
          title: "Provider-audit-review",
          href: "/provider-audit-review",
          icon: "",
        },
      ],
    },
    {
      title: "Business Community",
      href: "",
      // roles: [
      //   "superadmin",
      //   "admin",
      //   "provider",
      //   "coadmin",
      //   "supportadministrator",
      //   "healthcareprofessional",
      //   "compliance",
      //   "guardian",
      // ],
      icon: (
        <i className="menu-icon tf-icons ti ti-users menu-toggle-icon d-xl-block align-middle"></i>
      ),
      subMenu: [
        { title: "Caregiver/Staff", href: "/staff", icon: "" },
        { title: "Admin", href: "/admin", icon: "" },
        { title: "Guardians", href: "/guardians", icon: "" },
        {
          title: "Support Administrators",
          href: "/support-administrators",
          icon: "",
        },
        {
          title: "Healthcare Professional",
          href: "/healthcare-professional",
          icon: "",
        },
        { title: "Compliance", href: "/compliance", icon: "" },
      ],
    },
    {
      title: "Location of Service",
      href: "/location-of-service",
      // roles: ["superadmin", "admin", "provider", "caregiver", "coadmin"],
      icon: (
        <i className="menu-icon tf-icons ti ti-location menu-toggle-icon d-xl-block align-middle"></i>
      ),
      subMenu: [],
    },
    {
      title: "Push Notes",
      href: "/push-notes",
      // roles: ["superadmin", "admin", "provider", "caregiver", "coadmin"],
      icon: (
        <i className="menu-icon tf-icons ti ti-file-description menu-toggle-icon d-xl-block align-middle"></i>
      ),
      subMenu: [],
    },
    {
      title: "Clock in/out Group",
      href: "",
      // roles: ["provider", "caregiver", "superadmin", "coadmin"],
      icon: (
        <i className="menu-icon tf-icons ti ti-bell menu-toggle-icon d-xl-block align-middle"></i>
      ),
      subMenu: [
        { title: "Clock in", href: "/clock-in", icon: "" },
        { title: "Clock out", href: "/clock-out", icon: "" },
        { title: "View Log", href: "/view-log", icon: "" },
      ],
    },
    {
      title: "Timesheet",
      href: "/timesheet",
      // roles: ["superadmin", "admin", "provider", "caregiver", "coadmin"],
      icon: (
        <i className="menu-icon tf-icons ti ti-calendar menu-toggle-icon d-xl-block align-middle"></i>
      ),
      subMenu: [],
    },
    {
      title: "Mileage Log",
      href: "",
      // roles: ["provider", "caregiver", "superadmin", "coadmin"],
      icon: (
        <i className="menu-icon tf-icons ti ti-calendar menu-toggle-icon d-xl-block align-middle"></i>
      ),
      subMenu: [
        {
          title: "View Assigned Mileage",
          href: "/view-assigned-mileage",
          icon: "",
        },
        { title: "Add New Mileage", href: "/add-new-mileage", icon: "" },
        { title: "Mileage Log", href: "/mileage-log", icon: "" },
      ],
    },
    {
      title: "Folders",
      href: "",
      // roles: ["superadmin", "admin", "coadmin"],
      icon: (
        <i className="menu-icon tf-icons ti ti-folder menu-toggle-icon d-xl-block align-middle"></i>
      ),
      subMenu: [{ title: "Folders", href: "/folders", icon: "" }],
    },
    {
      title: "Community Integration",
      href: "",
      // roles: ["superadmin", "admin", "provider", "caregiver", "coadmin"],
      icon: (
        <i className="menu-icon tf-icons ti ti-bell menu-toggle-icon d-xl-block align-middle"></i>
      ),
      subMenu: [
        { title: "Set Budget", href: "/set-budget", icon: "" },
        {
          title: "Add Community Integration",
          href: "/add-community-integration",
          icon: "",
        },
        {
          title: "Community Integration Log",
          href: "/community-integration-log",
          icon: "",
        },
        { title: "Add Category", href: "/add-category", icon: "" },
        {
          title: "Add List Of Activity",
          href: "/add-list-of-activity",
          icon: "",
        },
      ],
    },
    {
      title: "Employee Record",
      href: "",
      // roles: ["superadmin", "admin", "coadmin"],
      icon: (
        <i className="menu-icon tf-icons ti ti-folder menu-toggle-icon d-xl-block align-middle"></i>
      ),
      subMenu: [
        { title: "Payroll", href: "/employee-payroll", icon: "" },
        { title: "Employee Files", href: "/employee-files", icon: "" },
        { title: "Notices", href: "/employee-notices", icon: "" },
        { title: "Requested Time Off", href: "/requested-time-off", icon: "" },
        { title: "Scheduler", href: "/scheduler", icon: "" },
        { title: "Manage Shift", href: "/manage-shift", icon: "" },
        {
          title: "Manage Unassigned Shift",
          href: "/manage-unassigned-shift",
          icon: "",
        },
      ],
    },
    {
      title: "Non-Medical Transportation",
      href: "",
      // roles: ["provider", "caregiver", "superadmin", "coadmin"],
      icon: (
        <i className="menu-icon tf-icons ti ti-car menu-toggle-icon d-xl-block align-middle"></i>
      ),
      subMenu: [
        {
          title: "Transportation Request",
          href: "/transportation-request",
          icon: "",
        },
        { title: "Transportation Log", href: "/transportation-log", icon: "" },
        { title: "New Request", href: "/new-request", icon: "" },
      ],
    },
    {
      title: "Calendars",
      href: "",
      icon: (
        <i className="menu-icon tf-icons ti ti-calendar menu-toggle-icon  d-xl-block align-middle"></i>
      ),
      subMenu: [
        { title: "Calendars", href: "/calendars", icon: "" },
        { title: "Shared Events", href: "/shared-events", icon: "" },
      ],
    },
    {
      title: "Help and Support",
      href: "",
      icon: (
        <i className="menu-icon tf-icons ti ti-help menu-toggle-icon d-xl-block align-middle"></i>
      ),
      subMenu: [
        { title: "Add New Ticket", href: "/add-new-ticket", icon: "" },
        { title: "Contact Us", href: "/contact-us", icon: "" },
        { title: "Call Us", href: "/call-us", icon: "" },
      ],
    },
    {
      title: "Recycle Bin",
      href: "/recycle-bin",
      icon: (
        <i className="menu-icon tf-icons ti ti-recycle menu-toggle-icon  d-xl-block align-middle"></i>
      ),
      subMenu: [],
    },
  ];

  const handleClose = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      document.documentElement.classList.remove("layout-menu-expanded");
    }
  };

  useEffect(() => {
    // Add event listener when the component is mounted
    document.addEventListener("mousedown", handleClose);

    // Clean up the event listener when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, []);
  return (
    <aside
      ref={menuRef}
      id="layout-menu"
      className={`layout-menu layout-menu-expanded layout-menu-fixed layout-menu-fixed-offcanvas menu-vertical menu bg-menu-theme position-sticky top-0 ${
        isActive ? "menu-collapsed" : ""
      }`}
    >
      <div className="app-brand">
        <a href="/" className="app-brand-link">
          <span className="app-brand-logo demo d-block">
            <img
              style={{ width: "40px", height: "30px" }}
              src={logo}
              alt="Logo"
            />
          </span>
          <span
            style={{ paddingLeft: "10px", display: "inline-block" }}
            className="app-brand-text demo d-block menu-text fw-bold"
          >
            CareLink
          </span>
        </a>
        <a
          href="#"
          className="layout-menu-toggle menu-link text-large ms-auto"
          onClick={toggleMenu}
        >
          <i className="ti ti-menu ti-sm align-middle"></i>
        </a>
      </div>

      <ul className="menu-inner py-1">
        {sideBarMenu.map((menuItem, index) => (
          <li
            className={`menu-item ${
              location.pathname === menuItem.href ? "active" : ""
            } ${menuItem.subMenu && activeMenu === index ? "open" : ""}`}
            key={index}
          >
            {menuItem.subMenu && menuItem.subMenu.length > 0 ? (
              <>
                <a
                  href="#"
                  className="menu-link menu-toggle"
                  onClick={() => handleSubMenuClick(index)}
                >
                  {menuItem.icon}
                  <div>{menuItem.title}</div>
                </a>
                <ul className="menu-sub">
                  {menuItem.subMenu.map((subItem, subIndex) => (
                    <li
                      className={`menu-item ${
                        location.pathname === subItem.href ? "active" : ""
                      }`}
                      key={subIndex}
                    >
                      <Link
                        to={
                          permissions?.includes(subItem.href)
                            ? subItem.href
                            : "/not-found"
                        }
                        className="menu-link"
                      >
                        {subItem.icon}
                        <div>
                          { subItem.title
                            }
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <Link
                to={
                  permissions?.includes(menuItem.href)
                    ? menuItem.href
                    : "/not-found"
                }
                className="menu-link"
              >
                {menuItem.icon}
                <div>
                  { menuItem.title }
                </div>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
