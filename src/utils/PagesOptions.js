
const pagesOption = [
  { label: "Agency Dashboard", value: "/agency-dashboard", operation: "create" },
  { label: "Company Profile", value: "/profile", operation: "create" },
  { label: "Agency Invoice", value: "/agency-invoice", operation: "create" },
  { label: "Payroll", value: "/payroll", operation: "create" },
  { label: "Change Password", value: "/change-password", operation: "create" },
  { label: "Positive Identifications", value: "/positive-identifications", operation: "create" },
  { label: "Notifications", value: "/notification-s", operation: "create" },
  { label: "Permissions", value: "/permissions", operation: "create" },
  { label: "Co-Admins", value: "/coadmins", operation: "create" },
  { label: "Sub-Users", value: "/sub-users", operation: "create" },
  { label: "Billing", value: "/billing", operation: "create" },
  { label: "Providers", value: "/providers", operation: "create" },
  { label: "Create New Provider", value: "/create-new-provider", operation: "create" },
  { label: "Patients", value: "/patient", operation: "create" },
  { label: "Review Email Log", value: "/review-email-log", operation: "create" },
  { label: "Create New Patient", value: "/create-new-patient", operation: "create" },
  { label: "Assign All Individual", value: "/assign-all-individual", operation: "create" },
  { label: "Provider Audit Review", value: "/provider-audit-review", operation: "create" },
  { label: "Caregiver or Staff", value: "/staff", operation: "create" },
  { label: "Admin", value: "/admin", operation: "create" },
  { label: "Guardians", value: "/guardians", operation: "create" },
  { label: "View Outcomes", value: "/view-outcomes", operation: "create" },
  { label: "Support Administrators", value: "/support-administrators", operation: "create" },
  { label: "Healthcare Professional", value: "/healthcare-professional", operation: "create" },
  { label: "Compliance", value: "/compliance", operation: "create" },
  { label: "Location of Service", value: "/location-of-service", operation: "create" },
  { label: "Push Notes", value: "/push-notes", operation: "create" },
  { label: "POS", value: "/pos", operation: "create" },
  { label: "MAR", value: "/mar", operation: "create" },
  { label: "TAR", value: "/tar", operation: "create" },
  { label: "Clock In", value: "/clock-in", operation: "create" },
  { label: "Clock Out", value: "/clock-out", operation: "create" },
  { label: "View Log", value: "/view-log", operation: "create" },
  { label: "Timesheet", value: "/timesheet", operation: "create" },
  { label: "View Assigned Mileage", value: "/view-assigned-mileage", operation: "create" },
  { label: "Add New Mileage", value: "/add-new-mileage", operation: "create" },
  { label: "Mileage Log", value: "/mileage-log", operation: "create" },
  { label: "Folders", value: "/folders", operation: "create" },
  { label: "Set Budget", value: "/set-budget", operation: "create" },
  { label: "Add Community Integration", value: "/add-community-integration", operation: "create" },
  { label: "Community Integration Log", value: "/community-integration-log", operation: "create" },
  { label: "Add Category", value: "/add-category", operation: "create" },
  { label: "Add List of Activity", value: "/add-list-of-activity", operation: "create" },
  { label: "Category", value: "/category", operation: "create" },
  { label: "ADS Location", value: "/ads-location", operation: "create" },
  { label: "List of Activity Log", value: "/list-of-activity-log", operation: "create" },
  { label: "Add Group Activity Documentation", value: "/add-group-activity-documentation", operation: "create" },
  { label: "View Group Documentation Log", value: "/view-group-documentation-log", operation: "create" },
  { label: "ADS Configuration", value: "/ads-configuration", operation: "create" },
  { label: "Attendance Sheet", value: "/attendance-sheet", operation: "create" },
  { label: "Reports", value: "/reports", operation: "create" },
  { label: "Support Employment", value: "/support-employment", operation: "create" },
  { label: "Add Daily Activity", value: "/add-daily-activity", operation: "create" },
  { label: "View Outcome Log", value: "/view-outcome-log", operation: "create" },
  { label: "Manage Unassigned Shift", value: "/manage-unassigned-shift", operation: "create" },
  { label: "Add Shift Summary", value: "/add-shift-summary", operation: "create" },
  { label: "View Shift Summary", value: "/view-shift-summary", operation: "create" },
  { label: "Employee Payroll", value: "/employee-payroll", operation: "create" },
  { label: "Employee Earning", value: "/employee-earning", operation: "create" },
  { label: "Employee Files", value: "/employee-files", operation: "create" },
  { label: "Notices", value: "/employee-notices", operation: "create" },
  { label: "Manage Shift", value: "/manage-shift", operation: "create" },
  { label: "Requested Time Off", value: "/requested-time-off", operation: "create" },
  { label: "Scheduler", value: "/scheduler", operation: "create" },
  { label: "My Vehicles", value: "/my-vehicles", operation: "create" },
  { label: "My Routes", value: "/my-routes", operation: "create" },
  { label: "Add Vehicle Inspection", value: "/add-vehicle-inspection", operation: "create" },
  { label: "View Vehicle Inspection", value: "/view-vehicle-inspection", operation: "create" },
  { label: "Vehicle View Log", value: "/vehicle-view-log", operation: "create" },
  { label: "My Briefcase", value: "/my-briefcase", operation: "create" },
  { label: "Calendars", value: "/calendars", operation: "create" },
  { label: "Shared Events", value: "/shared-events", operation: "create" },
  { label: "Add New Ticket", value: "/add-new-ticket", operation: "create" },
  { label: "Contact Us", value: "/contact-us", operation: "create" },
  { label: "Call Us", value: "/call-us", operation: "create" },
  { label: "Recycle Bin", value: "/recycle-bin", operation: "create" },
  { label: "Payers", value: "/payers", operation: "create" },
  { label: "Create Payers", value: "/create-payers", operation: "create" },
  { label: "Create Physicians", value: "/create-physicians", operation: "create" },
  { label: "Physicians", value: "/physicians", operation: "create" },
  { label: "Clinical Diagnoses", value: "/clinical-diagnoses", operation: "create" },
  { label: "Create Clinical Diagnoses", value: "/create-clinical-diagnoses", operation: "create" },
  { label: "Create Pharmacy", value: "/create-pharmacy", operation: "create" },
  { label: "Pharmacy", value: "/pharmacy", operation: "create" },
  { label: "Contacts", value: "/contacts", operation: "create" },
  { label: "Create Contacts", value: "/create-contacts", operation: "create" },
  { label: "Create Emergency Preparedness", value: "/create-emergency-preparedness", operation: "create" },
  { label: "Emergency Preparedness", value: "/emergency-preparedness", operation: "create" },
  { label: "Advance Directives", value: "/advance-directives", operation: "create" },
  { label: "Create Advance Directives", value: "/create-advance-directives", operation: "create" },
  { label: "Create Referral Information", value: "/create-referral-information", operation: "create" },
  { label: "Referral Information", value: "/referral-information", operation: "create" },
  { label: "User Activation", value: "/user-activation/:token", operation: "create" },
];

export default pagesOption;