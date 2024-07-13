import { useState, useEffect, useRef } from "react";
import logo from "../../../public/logo.png";
import { Link, useLocation } from "react-router-dom";
const Sidebar = () => {
  const [isActive, setIsActive] = useState(false); // State to manage active state
  const location = window.location;
  const history = useLocation();
  console.log(history);
  const toggleMenu = () => {
    setIsActive(!isActive); // Toggle the isActive state
  };
  const sideBarMenu = [
    {
      title: "Settings",
      href: "",
      icon: (
        <i className="menu-icon tf-icons ti ti-settings menu-toggle-icon  d-xl-block align-middle"></i>
      ),
      subMenu: [
        {
          title: "Company Profile",
          href: "/profile",
          icon: "",
        },
        {
          title: "Agency Invoice",
          href: "/agency-invoice",
          icon: "",
        },
        {
          title: "Payroll",
          href: "/payroll",
          icon: "",
        },
        {
          title: "Change Password",
          href: "/change-password",
          icon: "",
        },
        {
          title: "Positive Identifications",
          href: "/positive-identifications",
          icon: "",
        },
        {
          title: "Notification s",
          href: "/notification-s",
          icon: "",
        },
        {
          title: "Permissions",
          href: "/permissions",
          icon: "",
        },
      ],
    },
    {
      title: "Manage Co-Admins",
      href: "",
      icon: (
        <i className="menu-icon tf-icons ti ti-users menu-toggle-icon  d-xl-block align-middle"></i>
      ),
      subMenu: [
        {
          title: "Co-Admins",
          href: "/co-admins",
          icon: "",
        },
      ],
    },
    {
      title: "Manage Subusers",
      href: "",
      icon: (
        <i className="menu-icon tf-icons ti ti-users menu-toggle-icon  d-xl-block align-middle"></i>
      ),
      subMenu: [
        {
          title: "Sub Users",
          href: "/sub-users",
          icon: "",
        },
      ],
    },
    {
      title: "Billing Module",
      href: "",
      icon: (
        <i className="menu-icon tf-icons ti ti-users menu-toggle-icon  d-xl-block align-middle"></i>
      ),
      subMenu: [
        {
          title: "Billing",
          href: "/billing",
          icon: "",
        },
      ],
    },
    {
      title: "Individual",
      href: "",
      icon: (
        <i className="menu-icon tf-icons ti ti-user-plus menu-toggle-icon  d-xl-block align-middle"></i>
      ),
      subMenu: [
        {
          title: "Individual",
          href: "/individual",
          icon: "",
        },
        {
          title: "Create New Individual",
          href: "/create-new-individual",
          icon: "",
        },
        {
          title: "Individual Audit Review",
          href: "/individual-audit-review",
          icon: "",
        },
      ],
    },
    {
      title: "Patient",
      href: "",
      icon: (
        <i className="menu-icon tf-icons ti ti-user-plus menu-toggle-icon  d-xl-block align-middle"></i>
      ),
      subMenu: [
        {
          title: "Patient",
          href: "/patient",
          icon: "",
        },
       
        {
          title: "Payers",
          href: "/payers",
          icon: "",
        },
        
        {
          title: "Physicians",
          href: "/physicians",
          icon: "",
        },
       
        {
          title: "Clinical/Diagnoses",
          href: "/clinical-diagnoses",
          icon: "",
        },
        {
          title: "Pharmacy",
          href: "/pharmacy",
          icon: "",
        },
        
        {
          title: "Create contacts",
          href: "/create-contacts",
          icon: "",
        },
        {
          title: "Contract",
          href: "/contacts",
          icon: "",
        },
        {
          title: "Emergency preparedness",
          href: "/emergency-preparedness",
          icon: "",
        },
        
        {
          title: "Advance Directives",
          href: "/advance-directives",
          icon: "",
        },
        {
          title: "Referral information",
          href: "/referral-information",
          icon: "",
        },
        
      ],
    },
    {
      title: "Business Community",
      href: "",
      icon: (
        <i className="menu-icon tf-icons ti ti-users menu-toggle-icon  d-xl-block align-middle"></i>
      ),
      subMenu: [
        {
          title: "Caregiver/Staff",
          href: "/staff",
          icon: "",
        },
        {
          title: "Guardians",
          href: "/guardians",
          icon: "",
        },
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
        {
          title: "Compliance",
          href: "/Compliance",
          icon: "",
        },
      ],
    },
    {
      title: "Location of Service",
      href: "/location-of-service",
      icon: (
        <i className="menu-icon tf-icons ti ti-location menu-toggle-icon  d-xl-block align-middle"></i>
      ),
      subMenu: [],
    },
    {
      title: "Push Notes",
      href: "/push-notes",
      icon: (
        <i className="menu-icon tf-icons ti ti-file-description menu-toggle-icon  d-xl-block align-middle"></i>
      ),
      subMenu: [],
    },
    {
      title: "eMAR Suite",
      href: "",
      icon: (
        <i className="menu-icon tf-icons ti ti-settings menu-toggle-icon  d-xl-block align-middle"></i>
      ),
      subMenu: [
        {
          title: "POS",
          href: "/pos",
          icon: "",
        },
        {
          title: "MAR",
          href: "/mar",
          icon: "",
        },
        {
          title: "TAR",
          href: "/tar",
          icon: "",
        },
      ],
    },
    {
      title: "Clock in/out Group",
      href: "",
      icon: (
        <i className="menu-icon tf-icons ti ti-bell menu-toggle-icon  d-xl-block align-middle"></i>
      ),
      subMenu: [
        {
          title: "Clock in",
          href: "/clock-in",
          icon: "",
        },
        {
          title: "Clock out",
          href: "/clock-out",
          icon: "",
        },
        {
          title: "View Log",
          href: "/view-log",
          icon: "",
        },
      ],
    },
    {
      title: "menu-item Timesheet",
      href: "/timesheet",
      icon: (
        <i className="menu-icon tf-icons ti ti-calendar menu-toggle-icon  d-xl-block align-middle"></i>
      ),
      subMenu: [],
    },
    {
      title: "Mileage Log",
      href: "",
      icon: (
        <i className="menu-icon tf-icons ti ti-calendar menu-toggle-icon  d-xl-block align-middle"></i>
      ),
      subMenu: [
        {
          title: "View Assigned Mileage",
          href: "/view-assigned-mileage",
          icon: "",
        },
        {
          title: "Add New Mileage",
          href: "/add-new-mileage",
          icon: "",
        },
        {
          title: "Mileage Log",
          href: "/mileage-log",
          icon: "",
        },
      ],
    },
    {
      title: "Folders",
      href: "",
      icon: (
        <i className="menu-icon tf-icons ti ti-folder menu-toggle-icon  d-xl-block align-middle"></i>
      ),
      subMenu: [
        {
          title: "Folders",
          href: "/folders",
          icon: "",
        },
      ],
    },
    {
      title: "Community Integration",
      href: "",
      icon: (
        <i className="menu-icon tf-icons ti ti-bell menu-toggle-icon  d-xl-block align-middle"></i>
      ),
      subMenu: [
        {
          title: "Set Budget",
          href: "/set-budget",
          icon: "",
        },
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
        {
          title: "Add Category",
          href: "/add-category",
          icon: "",
        },
        {
          title: "Add List Of Activity",
          href: "/add-list-of-activity",
          icon: "",
        },
      ],
    },
    {
      title: "Adult Day Service",
      href: "",
      icon: (
        <i className="menu-icon tf-icons ti ti-book menu-toggle-icon  d-xl-block align-middle"></i>
      ),
      subMenu: [
        {
          title: "Category",
          href: "/category",
          icon: "",
        },
        {
          title: "ADS Location",
          href: "/ads-location",
          icon: "",
        },
        {
          title: "List Of Activity Log",
          href: "/list-of-activity-log",
          icon: "",
        },
        {
          title: "Add Group Activity Documentation",
          href: "/add-group-activity-documentation",
          icon: "",
        },
        {
          title: "Add List Of Activity",
          href: "/add-daily-activity",
          icon: "",
        },
        {
          title: "View Group Documentation Log",
          href: "/view-group-documentation-log",
          icon: "",
        },
        {
          title: "ADS Configuration",
          href: "/ads-configuration",
          icon: "",
        },
        {
          title: "Attendance Sheet",
          href: "/attendance-sheet",
          icon: "",
        },
        {
          title: "Reports",
          href: "/reports",
          icon: "",
        },
        {
          title: "Support Employment",
          href: "/support-employment",
          icon: "",
        },
        {
          title: "View Outcome Log",
          href: "/view-outcome-log",
          icon: "",
        },
        {
          title: "Add Shift Summary",
          href: "/add-shift-summary",
          icon: "",
        },
        {
          title: "View Shift Summary",
          href: "/view-shift-summary",
          icon: "",
        },
      ],
    },
    {
      title: "Employee Record",
      href: "",
      icon: (
        <i className="menu-icon tf-icons ti ti-folder menu-toggle-icon  d-xl-block align-middle"></i>
      ),
      subMenu: [
        {
          title: "Payroll",
          href: "/employee-payroll",
          icon: "",
        },
        {
          title: "Employee Files",
          href: "/employee-files",
          icon: "",
        },
        {
          title: "Notices",
          href: "/employee-notices",
          icon: "",
        },
        {
          title: "Requested Time Off",
          href: "/requested-time-off",
          icon: "",
        },
        {
          title: "Scheduler",
          href: "/scheduler",
          icon: "",
        },
        {
          title: "Manage Shift",
          href: "/manage-shift",
          icon: "",
        },
        {
          title: "Manage Unassigned Shift",
          href: "/manage-unassigned-shift",
          icon: "",
        },
      ],
    },
    {
      title: "No Medical Transportation",
      href: "",
      icon: (
        <i className="menu-icon tf-icons ti ti-car menu-toggle-icon  d-xl-block align-middle"></i>
      ),
      subMenu: [
        {
          title: "My Vehicles",
          href: "/my-vehicles",
          icon: "",
        },
        {
          title: "My Routes",
          href: "/my-routes",
          icon: "",
        },
        {
          title: "Add Vehicle Inspection",
          href: "/add-vehicle-inspection",
          icon: "",
        },
        {
          title: "View Vehicle Inspection",
          href: "/view-vehicle-inspection",
          icon: "",
        },
        {
          title: "View Log",
          href: "/vehicle-view-log",
          icon: "",
        },
        {
          title: "My Briefcase",
          href: "/my-briefcase",
          icon: "",
        },
      ],
    },
    {
      title: "Calendars",
      href: "",
      icon: (
        <i className="menu-icon tf-icons ti ti-calendar menu-toggle-icon  d-xl-block align-middle"></i>
      ),
      subMenu: [
        {
          title: "Calendars",
          href: "/calendars",
          icon: "",
        },
        {
          title: "Shared Events",
          href: "/shared-events",
          icon: "",
        },
      ],
    },
    {
      title: "Help and Support",
      href: "",
      icon: (
        <i className="menu-icon tf-icons ti-question-mark menu-toggle-icon  d-xl-block align-middle"></i>
      ),
      subMenu: [
        {
          title: "Add New Ticket",
          href: "/add-new-ticket",
          icon: "",
        },
        {
          title: "Contact Us",
          href: "/contact-us",
          icon: "",
        },
        {
          title: "Call Us",
          href: "/call-us",
          icon: "",
        },
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
  const [activeMenu, setActiveMenu] = useState(null);

  // Function to handle submenu click and set active menu item
  const handleSubMenuClick = (index) => {
    setActiveMenu(index === activeMenu ? null : index);
  };
  const handleMobileMenu = () => {
    document.documentElement.classList.toggle("layout-menu-expanded");
  };
  const menuRef = useRef();
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
  // .layout-menu-fixed .layout-menu, .layout-menu-fixed-offcanvas .layout-menu
  return (
    <aside
      ref={menuRef}
      id="layout-menu"
      className={`layout-menu layout-menu-expanded layout-menu-fixed layout-menu-fixed-offcanvas menu-vertical menu bg-menu-theme position-sticky top-0 ${
        isActive ? "menu-collapsed" : ""
      }`}
    >
      <div className="app-brand ">
        <a href="/" className="app-brand-link">
          <span className="app-brand-logo  demo">
            <img style={{ width: "40px", height: "30px" }} src={logo} alt="" />
          </span>
          <span
            style={{ paddingLeft: "5px" }}
            className="app-brand-text demo menu-text fw-bold"
          >
            CareLink
          </span>
        </a>
        <a
          href="#"
          className="layout-menu-toggle menu-link text-large ms-auto"
          onClick={toggleMenu} // Handle click event to toggle menu
        >
          <i
            onClick={handleMobileMenu}
            className="menu-icon tf-icons ti ti-x d-block d-xl-none ti-md align-middle"
          ></i>
        </a>
      </div>
      <div className="menu-inner-shadow"></div>
      <ul className="menu-inner py-1 ">
        {sideBarMenu.map((item, index) => (
          <li
            key={index}
            className={`menu-item  ${
              location.pathname === item.href &&
              "active link bg-primary rounded "
            } ${
              item.subMenu.length > 0 && activeMenu === index
                ? "open active "
                : ""
            }`}
          >
            {/* Render link with submenu toggle */}
            {item.subMenu.length > 0 ? (
              <span
                style={{ cursor: "pointer" }}
                className="menu-link menu-toggle"
                onClick={() => handleSubMenuClick(index)}
              >
                {item.icon}
                <div data-i18n={item.title}>{item.title}</div>
              </span>
            ) : (
              // Render regular link without submenu toggle
              <Link to={item.href} className="menu-link">
                {item.icon}
                <div data-i18n={item.title}>{item.title}</div>
              </Link>
            )}
            {/* Render submenu if exists */}
            {item.subMenu.length > 0 && (
              <ul className="menu-sub">
                {item.subMenu.map((subItem, subIndex) => (
                  <li
                    style={{
                      cursor: "pointer",
                      transition: "color 0.5s ease-in-out",
                      transitionDelay: "0.5s",
                    }}
                    key={subIndex}
                    className={`menu-item mx-3 ${
                      location.pathname === subItem.href &&
                      "active bg-primary rounded "
                    }`}
                  >
                    <Link to={subItem.href} className="menu-link">
                      {subItem.icon}
                      <div data-i18n={subItem.title}>{subItem.title}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
