import { useState } from "react";
import logo from "../../../public/logo.png";
const Sidebar = () => {
  const [isActive, setIsActive] = useState(false); // State to manage active state
  const location = window.location;
  console.log(location);
  const toggleMenu = () => {
    setIsActive(!isActive); // Toggle the isActive state
  };
  const sideBarMenu = [
    {
      title: "Settings",
      href: "",
      icon: (
        <i className="menu-icon tf-icons ti ti-settings menu-toggle-icon d-none d-xl-block align-middle"></i>
      ),
      subMenu: [
        {
          title: "Company Profile",
          href: "/profile",
          icon: (
            <i className="menu-icon tf-icons ti ti-user d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "Agency Invoice",
          href: "/agency-invoice",
          icon: (
            <i className="menu-icon tf-icons ti ti-money-bill d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "Payroll",
          href: "/payroll",
          icon: (
            <i className="menu-icon tf-icons ti ti-circle-info d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "Change Password",
          href: "/change-password",
          icon: (
            <i className="menu-icon tf-icons ti ti-lock d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "Positive Identifications",
          href: "/positive-identifications",
          icon: (
            <i className="menu-icon tf-icons ti-question-mark d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "Notification s",
          href: "/notification-s",
          icon: (
            <i className="menu-icon tf-icons ti ti-wrench d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "Permissions",
          href: "/permissions",
          icon: (
            <i className="menu-icon tf-icons ti ti-users d-block d-xl-none ti-md align-middle"></i>
          ),
        },
      ],
    },
    {
      title: "Manage Co-Admins",
      href: "",
      icon: (
        <i className="menu-icon tf-icons ti ti-users menu-toggle-icon d-none d-xl-block align-middle"></i>
      ),
      subMenu: [
        {
          title: "Co-Admins",
          href: "/co-admins",
          icon: (
            <i className="menu-icon tf-icons ti ti-users d-block d-xl-none ti-md align-middle"></i>
          ),
        },
      ],
    },
    {
      title: "Manage Subusers",
      href: "",
      icon: (
        <i className="menu-icon tf-icons ti ti-users menu-toggle-icon d-none d-xl-block align-middle"></i>
      ),
      subMenu: [
        {
          title: "Sub Users",
          href: "/sub-users",
          icon: (
            <i className="menu-icon tf-icons ti ti-users d-block d-xl-none ti-md align-middle"></i>
          ),
        },
      ],
    },
    {
      title: "Billing Module",
      href: "",
      icon: (
        <i className="menu-icon tf-icons ti ti-users menu-toggle-icon d-none d-xl-block align-middle"></i>
      ),
      subMenu: [
        {
          title: "Billing",
          href: "/billing",
          icon: (
            <i className="menu-icon tf-icons ti ti-user-plus d-block d-xl-none ti-md align-middle"></i>
          ),
        },
      ],
    },
    {
      title: "Individual",
      href: "",
      icon: (
        <i className="menu-icon tf-icons ti ti-user-plus menu-toggle-icon d-none d-xl-block align-middle"></i>
      ),
      subMenu: [
        {
          title: "Individual",
          href: "/individual",
          icon: (
            <i className="menu-icon tf-icons ti ti-user-plus d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "Create New Individual",
          href: "/create-new-individual",
          icon: (
            <i className="menu-icon tf-icons ti ti-user-plus d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "Individual Audit Review",
          href: "/individual-audit-review",
          icon: (
            <i className="menu-icon tf-icons ti ti-user-plus d-block d-xl-none ti-md align-middle"></i>
          ),
        },
      ],
    },
    {
      title: "Business Community",
      href: "",
      icon: (
        <i className="menu-icon tf-icons ti ti-users menu-toggle-icon d-none d-xl-block align-middle"></i>
      ),
      subMenu: [
        {
          title: "Caregiver/Staff",
          href: "/staff",
          icon: (
            <i className="menu-icon tf-icons ti ti-user-plus d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "Guardians",
          href: "guardians",
          icon: (
            <i className="menu-icon tf-icons ti ti-user-plus d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "Support Administrators",
          href: "/support-administrators",
          icon: (
            <i className="menu-icon tf-icons ti ti-user-plus d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "Healthcare Professional",
          href: "/healthcare-professional",
          icon: (
            <i className="menu-icon tf-icons ti ti-user-plus d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "Compliance",
          href: "/Compliance",
          icon: (
            <i className="menu-icon tf-icons ti ti-user-plus d-block d-xl-none ti-md align-middle"></i>
          ),
        },
      ],
    },
    {
      title: "Location of Service",
      href: "/location-of-service",
      icon: (
        <i className="menu-icon tf-icons ti ti-location menu-toggle-icon d-none d-xl-block align-middle"></i>
      ),
      subMenu: [],
    },
    {
      title: "Push Notes",
      href: "push-notes",
      icon: (
        <i className="menu-icon tf-icons ti ti-file-description menu-toggle-icon d-none d-xl-block align-middle"></i>
      ),
      subMenu: [],
    },
    {
      title: "eMAR Suite",
      href: "",
      icon: (
        <i className="menu-icon tf-icons ti ti-settings menu-toggle-icon d-none d-xl-block align-middle"></i>
      ),
      subMenu: [
        {
          title: "POS",
          href: "/pos",
          icon: (
            <i className="menu-icon tf-icons ti ti-th d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "MAR",
          href: "mar",
          icon: (
            <i className="menu-icon tf-icons ti ti-th d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "TAR",
          href: "/tar",
          icon: (
            <i className="menu-icon tf-icons ti ti-th d-block d-xl-none ti-md align-middle"></i>
          ),
        },
      ],
    },
    {
      title: "Clock in/out Group",
      href: "",
      icon: (
        <i className="menu-icon tf-icons ti ti-bell menu-toggle-icon d-none d-xl-block align-middle"></i>
      ),
      subMenu: [
        {
          title: "Clock in",
          href: "/clock-in",
          icon: (
            <i className="menu-icon tf-icons ti ti-bell d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "Clock out",
          href: "clock-out",
          icon: (
            <i className="menu-icon tf-icons ti ti-bell d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "View Log",
          href: "/view-log",
          icon: (
            <i className="menu-icon tf-icons ti ti-th d-block d-xl-none ti-md align-middle"></i>
          ),
        },
      ],
    },
    {
      title: "menu-item Timesheet",
      href: "/timesheet",
      icon: (
        <i className="menu-icon tf-icons ti ti-calendar menu-toggle-icon d-none d-xl-block align-middle"></i>
      ),
      subMenu: [],
    },
    {
      title: "Mileage Log",
      href: "",
      icon: (
        <i className="menu-icon tf-icons ti ti-calendar menu-toggle-icon d-none d-xl-block align-middle"></i>
      ),
      subMenu: [
        {
          title: "View Assigned Mileage",
          href: "view-assigned-mileage",
          icon: (
            <i className="menu-icon tf-icons ti ti-share d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "Add New Mileage",
          href: "add-new-mileage",
          icon: (
            <i className="menu-icon tf-icons ti ti-share d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "Mileage Log",
          href: "/mileage-log",
          icon: (
            <i className="menu-icon tf-icons ti ti-share d-block d-xl-none ti-md align-middle"></i>
          ),
        },
      ],
    },
    {
      title: "Folders",
      href: "",
      icon: (
        <i className="menu-icon tf-icons ti ti-folder menu-toggle-icon d-none d-xl-block align-middle"></i>
      ),
      subMenu: [
        {
          title: "Folders",
          href: "/folders",
          icon: (
            <i className="menu-icon tf-icons ti ti-folder d-block d-xl-none ti-md align-middle"></i>
          ),
        },
      ],
    },
    {
      title: "Community Integration",
      href: "",
      icon: (
        <i className="menu-icon tf-icons ti ti-bell menu-toggle-icon d-none d-xl-block align-middle"></i>
      ),
      subMenu: [
        {
          title: "Set Budget",
          href: "/set-budget",
          icon: (
            <i className="menu-icon tf-icons ti ti-plus d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "Add Community Integration",
          href: "/add-community-integration",
          icon: (
            <i className="menu-icon tf-icons ti ti-plus d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "Community Integration Log",
          href: "/community-integration-log",
          icon: (
            <i className="menu-icon tf-icons ti ti-list d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "Add Category",
          href: "/add-category",
          icon: (
            <i className="menu-icon tf-icons ti ti-th d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "Add List Of Activity",
          href: "/add-list-of-activity",
          icon: (
            <i className="menu-icon tf-icons ti ti-list d-block d-xl-none ti-md align-middle"></i>
          ),
        },
      ],
    },
    {
      title: "Adult Day Service",
      href: "",
      icon: (
        <i className="menu-icon tf-icons ti ti-book menu-toggle-icon d-none d-xl-block align-middle"></i>
      ),
      subMenu: [
        {
          title: "Category",
          href: "/category",
          icon: (
            <i className="menu-icon tf-icons ti ti-book d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "ADS Location",
          href: "/add-location",
          icon: (
            <i className="menu-icon tf-icons ti ti-folder d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "List Of Activity Log",
          href: "/list-of-activity-log",
          icon: (
            <i className="menu-icon tf-icons ti ti-book d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "Add Group Activity Documentation",
          href: "/add-group-activity-documentation",
          icon: (
            <i className="menu-icon tf-icons ti ti-book d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "View Group Documentation Log",
          href: "/view-group-documentation-log",
          icon: (
            <i className="menu-icon tf-icons ti ti-calendar d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "ADS Configuration",
          href: "/ads-configuration",
          icon: (
            <i className="menu-icon tf-icons ti ti-settings d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "Attendance Sheet",
          href: "/attendance-sheet",
          icon: (
            <i className="menu-icon tf-icons ti ti-calendar d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "Reports",
          href: "/reports",
          icon: (
            <i className="menu-icon tf-icons ti ti-calendar d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "Support Employment",
          href: "/support-employment",
          icon: (
            <i className="menu-icon tf-icons ti ti-calendar d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "View Outcome Log",
          href: "/view-outcome-log",
          icon: (
            <i className="menu-icon tf-icons ti ti-calendar d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "Add Shift Summary",
          href: "/add-shift-summary",
          icon: (
            <i className="menu-icon tf-icons ti ti-calendar d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "View Shift Summary",
          href: "/view-shift-summary",
          icon: (
            <i className="menu-icon tf-icons ti ti-calendar d-block d-xl-none ti-md align-middle"></i>
          ),
        },
      ],
    },
    {
      title: "Employee Record",
      href: "",
      icon: (
        <i className="menu-icon tf-icons ti ti-folder menu-toggle-icon d-none d-xl-block align-middle"></i>
      ),
      subMenu: [
        {
          title: "Payroll",
          href: "/payroll",
          icon: (
            <i className="menu-icon tf-icons ti ti-circle-info d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "Employee Files",
          href: "/employee-files",
          icon: (
            <i className="menu-icon tf-icons ti ti-folder d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "Notices",
          href: "/Notices",
          icon: (
            <i className="menu-icon tf-icons ti ti-file-description d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "Requested Time Off",
          href: "/requested-time-off",
          icon: (
            <i className="menu-icon tf-icons ti ti-calendar d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "Scheduler",
          href: "/scheduler",
          icon: (
            <i className="menu-icon tf-icons ti ti-calendar d-block d-xl-none ti-md align-middle"></i>
          ),
        },
      ],
    },
    {
      title: "No Medical Transportation",
      href: "",
      icon: (
        <i className="menu-icon tf-icons ti ti-car menu-toggle-icon d-none d-xl-block align-middle"></i>
      ),
      subMenu: [
        {
          title: "My Vehicles",
          href: "/my-vehicles",
          icon: (
            <i className="menu-icon tf-icons ti ti-car d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "My Routes",
          href: "/my-routes",
          icon: (
            <i className="menu-icon tf-icons ti ti-car d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "Add Vehicle Inspection",
          href: "/add-vehicle-inspection",
          icon: (
            <i className="menu-icon tf-icons ti ti-car d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "View Vehicle Inspection",
          href: "/view-vehicle-inspection",
          icon: (
            <i className="menu-icon tf-icons ti ti-eye d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "View Log",
          href: "/view-log",
          icon: (
            <i className="menu-icon tf-icons ti ti-eye d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "My Briefcase",
          href: "/my-briefcase",
          icon: (
            <i className="menu-icon tf-icons ti ti-folder d-block d-xl-none ti-md align-middle"></i>
          ),
        },
      ],
    },
    {
      title: "Calendars",
      href: "",
      icon: (
        <i className="menu-icon tf-icons ti ti-calendar menu-toggle-icon d-none d-xl-block align-middle"></i>
      ),
      subMenu: [
        {
          title: "Calendars",
          href: "/calendars",
          icon: (
            <i className="menu-icon tf-icons ti ti-calendar d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "Shared Events",
          href: "/shared-events",
          icon: (
            <i className="menu-icon tf-icons ti ti-list d-block d-xl-none ti-md align-middle"></i>
          ),
        },
      ],
    },
    {
      title: "Help and Support",
      href: "",
      icon: (
        <i className="menu-icon tf-icons ti-question-mark menu-toggle-icon d-none d-xl-block align-middle"></i>
      ),
      subMenu: [
        {
          title: "Add New Ticket",
          href: "/add-new-ticket",
          icon: (
            <i className="menu-icon tf-icons ti ti-ticket d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "Contact Us",
          href: "/contact-us",
          icon: (
            <i className="menu-icon tf-icons ti ti-envelope d-block d-xl-none ti-md align-middle"></i>
          ),
        },
        {
          title: "Call Us",
          href: "/call-us",
          icon: (
            <i className="menu-icon tf-icons ti ti-phone d-block d-xl-none ti-md align-middle"></i>
          ),
        },
      ],
    },
    {
      title: "Recycle Bin",
      href: "/recycle-bin",
      icon: (
        <i className="menu-icon tf-icons ti ti-recycle menu-toggle-icon d-none d-xl-block align-middle"></i>
      ),
      subMenu: [],
    },
  ];
  const [activeMenu, setActiveMenu] = useState(null);

  // Function to handle submenu click and set active menu item
  const handleSubMenuClick = (index) => {
    setActiveMenu(index === activeMenu ? null : index);
  };
  return (
    <aside
      id="layout-menu"
      className={`layout-menu menu-vertical menu bg-menu-theme ${
        isActive ? "menu-collapsed" : ""
      }`}
    >
      <div className="app-brand mt-5 demo">
        <a href="/" className="app-brand-link">
          <span className="app-brand-logo demo">
            <img style={{ width: "40px", height: "30px"}} src={logo} alt="" />
          </span>
          <span style={{paddingLeft:"5px"}} className="app-brand-text demo menu-text fw-bold">
            CareLink
          </span>
        </a>
        <a
          href="#"
          className="layout-menu-toggle menu-link text-large ms-auto"
          onClick={toggleMenu} // Handle click event to toggle menu
        >
          <i className="menu-icon tf-icons ti menu-toggle-icon d-none d-xl-block align-middle"></i>
          <i className="menu-icon tf-icons ti ti-x d-block d-xl-none ti-md align-middle"></i>
        </a>
      </div>
      <div className="menu-inner-shadow"></div>
      <ul className="menu-inner py-1">
        {sideBarMenu.map((item, index) => (
          <li
            key={index}
            className={`menu-item ${
              item.subMenu.length > 0 && activeMenu === index
                ? "open active"
                : ""
            }`}
          >
            {/* Render link with submenu toggle */}
            {item.subMenu.length > 0 ? (
              <span
                className="menu-link menu-toggle"
                onClick={() => handleSubMenuClick(index)}
              >
                {item.icon}
                <div data-i18n={item.title}>{item.title}</div>
              </span>
            ) : (
              // Render regular link without submenu toggle
              <a href={item.href} className="menu-link">
                {item.icon}
                <div data-i18n={item.title}>{item.title}</div>
              </a>
            )}
            {/* Render submenu if exists */}
            {item.subMenu.length > 0 && (
              <ul className="menu-sub">
                {item.subMenu.map((subItem, subIndex) => (
                  <li
                    key={subIndex}
                    className={`menu-item ${
                      location.pathname === subItem.href && "active"
                    }`}
                  >
                    <a href={subItem.href} className="menu-link">
                      {subItem.icon}
                      <div data-i18n={subItem.title}>{subItem.title}</div>
                    </a>
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
