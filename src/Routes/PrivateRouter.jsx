import Layout from './../components/Layout/Layout';
import PrivateGard from './PrivateGard';
import NotFound from './../Pages/404/NotFound';
import CompanyProfile from './../Pages/Settings/CompanyProfile';
import AgencyInvoice from './../Pages/Settings/AgencyInvoice';
import Payroll from './../Pages/Settings/Payroll';
import ChangePassword from './../Pages/Settings/ChangePassword';
import PositiveIdentifications from './../Pages/Settings/PositiveIdentifications';
import Notifications from './../Pages/Settings/Notifications';
import Permissions from './../Pages/Settings/Permissions';
import CoAdmin from './../Pages/ManageCoAdmin/CoAdmin';
import SubUsers from './../Pages/ManageSubUsers/SubUsers';
import Billing from './../Pages/BillingModule/Billing';
import Provider from './../Pages/Provider/Provider';
import ProviderAuditReview from './../Pages/Provider/ProviderAuditReview';
import CaregiverOrStaff from './../Pages/BusinessCommunity/CaregiverOrStaff';
import Guardians from './../Pages/BusinessCommunity/Guardians';
import SupportAdministrators from './../Pages/BusinessCommunity/SupportAdministrators';
import HealthCareProfessional from './../Pages/BusinessCommunity/HealthCareProfessional';
import Compliance from './../Pages/BusinessCommunity/Compliance';
import LocationOfService from './../Pages/LocationOfService';
import PushNotes from './../Pages/PushNotes';
import Pos from './../Pages/EmarSuite/Pos';
import Mar from './../Pages/EmarSuite/Mar';
import Tar from './../Pages/EmarSuite/Tar';
import ClockIn from './../Pages/ClockinOrOutGroup/ClockIn';
import ClockOut from './../Pages/ClockinOrOutGroup/ClockOut';
import ViewLog from './../Pages/ClockinOrOutGroup/ViewLog';
import MenuItemTimeSheet from './../Pages/MenuItemTimeSheet';
import ViewAssignedMileage from './../Pages/MileageLog/ViewAssignedMileage';
import AddNewMileage from './../Pages/MileageLog/AddNewMileage';
import MileageLog from './../Pages/MileageLog/MileageLog';
import Folders from './../Pages/Folders/Folders';
import SetBudget from './../Pages/CommunityIntegration/SetBudget';
import AddCommunityIntegration from './../Pages/CommunityIntegration/AddCommunityIntegration';
import CommunityIntegration from './../Pages/CommunityIntegration/CommunityIntegration';
import AddCategory from './../Pages/CommunityIntegration/AddCategory';
import AddListOfActivity from './../Pages/CommunityIntegration/AddListOfActivity';
import Category from './../Pages/AdultDayService/Category';
import AdsLocation from './../Pages/AdultDayService/AdsLocation';
import ListOfActivityLog from './../Pages/AdultDayService/ListOfActivityLog';
import AddGroupActivityDocumentation from './../Pages/AdultDayService/AddGroupActivityDocumentation';
import ViewGroupDocumentation from './../Pages/AdultDayService/ViewGroupDocumentation';
import AdsConfiguration from './../Pages/AdultDayService/AdsConfiguration';
import AttendanceSheet from './../Pages/AdultDayService/AttendanceSheet';
import Reports from './../Pages/AdultDayService/Reports';
import SupportEmployment from './../Pages/AdultDayService/SupportEmployment';
import ViewOutcomeLog from './../Pages/AdultDayService/ViewOutcomeLog';
import AddShiftSummary from './../Pages/AdultDayService/AddShiftSummary';
import ViewShiftSummary from './../Pages/AdultDayService/ViewShiftSummary';
import EmployeePayroll from './../Pages/EmployeeRecord/Payroll';
import EmployeeFiles from './../Pages/EmployeeRecord/EmployeeFiles';
import Notices from './../Pages/EmployeeRecord/Notices';
import RequestedTimeOff from './../Pages/EmployeeRecord/RequestedTimeOff';
import Scheduler from './../Pages/EmployeeRecord/Scheduler';
import MyVehicles from './../Pages/NoMedicalTransporation/MyVehicles';
import MyRoutes from './../Pages/NoMedicalTransporation/MyRoutes';
import AddVehicleInspection from './../Pages/NoMedicalTransporation/AddVehicleInspection';
import ViewVehicleInspection from './../Pages/NoMedicalTransporation/ViewVehicleInspection';
import VehicleViewLog from './../Pages/NoMedicalTransporation/ViewLog';
import MyBriefcase from './../Pages/NoMedicalTransporation/MyBriefcase';
import Calendars from './../Pages/Calendars/Calendars';
import SharedEvents from './../Pages/Calendars/SharedEvents';
import AddNewTicket from './../Pages/HelpAndSupport/AddNewTicket';
import ContactUs from './../Pages/HelpAndSupport/ContactUs';
import CallUs from './../Pages/HelpAndSupport/CallUs';
import RecycleBin from './../Pages/RecycleBin';
import AgencyDashboard from './../Pages/Provider/AgencyDashboard';
import EmployeeEarning from './../Pages/Settings/EmployeeEarning';
import AddAdultListOfActivity from './../Pages/AdultDayService/AddListOfActivity';
import ManageShift from './../Pages/EmployeeRecord/ManageShift';
import ReviewEmailLog from './../Pages/Provider/ReviewEmailLog';
import ViewOutcomes from './../Pages/AdultDayService/ViewOutcomes';
import ManageUnassignedShift from './../Pages/EmployeeRecord/ManageUnassignedShift';
import AssignAllIndividual from './../Pages/BusinessCommunity/AssignAllIndividual';
import Patients from './../Pages/Patient/Patients';
import CreatePatient from './../Pages/Patient/CreatePatient';
import Payers from './../Pages/Patient/Payers';
import CreatePayers from './../Pages/Patient/CreatePayers';
import CreatePhysicians from './../Pages/Patient/CreatePhysicians';
import Physicians from './../Pages/Patient/Physicians';
import CliniCalAndDiagnoses from './../Pages/Patient/CliniCalAndDiagnoses';
import CreateClinicalAndDiagnoses from './../Pages/Patient/CreateClinicalAndDiagnoses';
import CreatePharmacy from './../Pages/Patient/CreatePharmacy';
import Pharmacy from './../Pages/Patient/Pharmacy';
import Contact from './../Pages/Patient/Contact';
import CreateContact from './../Pages/Patient/CreateContact';
import CreateEmergencyPreparedness from './../Pages/Patient/CreateEmergencyPreparedness';
import EmergencyPreparedness from './../Pages/Patient/EmergencyPreparedness';
import AdvanceDirectives from './../Pages/Patient/AdvanceDirectives';
import CreateAdvanceDirectives from './../Pages/Patient/CreateAdvanceDirectives';
import CreateReferralInformation from './../Pages/Patient/CreateReferralInformation';
import ReferralInformation from './../Pages/Patient/ReferralInformation';
import UserActivation from '../Pages/UserActivation';
import CreateNewProvider from '../Pages/Provider/CreateNewProvider';
import Admin from '../Pages/BusinessCommunity/Admin';
import SinglePatient from './../Pages/Patient/SinglePatient';

const privateRouter = [
  {
    element: <Layout />,
    children: [
      {
        element: <PrivateGard />,
        children: [
          
          {
            path: "/",
            element: <AgencyDashboard />,
          },
          {
            path: "/profile",
            element: <CompanyProfile />,
          },
          {
            path: "/agency-invoice",
            element: <AgencyInvoice />,
          },
          {
            path: "/payroll",
            element: <Payroll />,
          },
          {
            path: "/change-password",
            element: <ChangePassword />,
          },
          {
            path: "/positive-identifications",
            element: <PositiveIdentifications />,
          },
          {
            path: "/notification-s",
            element: <Notifications />,
          },
          {
            path: "/permissions",
            element: <Permissions />,
          },
          {
            path: "/coadmins",
            element: <CoAdmin />,
          },
          {
            path: "/sub-users",
            element: <SubUsers />,
          },
          {
            path: "/billing",
            element: <Billing />,
          },
          {
            path: "/providers",
            element: <Provider />,
          },
          {
            path: "/create-new-provider",
            element: <CreateNewProvider />,
          },
          {
            path: "/patient",
            element: <Patients />,
          },
          {
            path: "/patients/:id",
            element: <SinglePatient />,
          },
          {
            path: "/review-email-log",
            element: <ReviewEmailLog />,
          },
          {
            path: "/create-new-patient",
            element: <CreatePatient/>,
          },
          {
            path: "/assign-all-individual",
            element: <AssignAllIndividual />,
          },
          {
            path: "/provider-audit-review",
            element: <ProviderAuditReview />,
          },
          {
            path: "/staff",
            element: <CaregiverOrStaff />,
          },
          {
            path: "/admin",
            element: <Admin />,
          },
          {
            path: "/guardians",
            element: <Guardians />,
          },
          {
            path: "/view-outcomes",
            element: <ViewOutcomes />,
          },
          {
            path: "/support-administrators",
            element: <SupportAdministrators />,
          },
          {
            path: "/healthcare-professional",
            element: <HealthCareProfessional />,
          },
          {
            path: "/compliance",
            element: <Compliance />,
          },
          {
            path: "/location-of-service",
            element: <LocationOfService />,
          },
          {
            path: "/push-notes",
            element: <PushNotes />,
          },
          {
            path: "/pos",
            element: <Pos />,
          },
          {
            path: "/mar",
            element: <Mar />,
          },
          {
            path: "/tar",
            element: <Tar />,
          },
          {
            path: "/clock-in",
            element: <ClockIn />,
          },
          {
            path: "/clock-out",
            element: <ClockOut />,
          },
          {
            path: "/view-log",
            element: <ViewLog />,
          },
          {
            path: "/timesheet",
            element: <MenuItemTimeSheet />,
          },
          {
            path: "/view-assigned-mileage",
            element: <ViewAssignedMileage />,
          },
          {
            path: "/add-new-mileage",
            element: <AddNewMileage />,
          },
          {
            path: "/mileage-log",
            element: <MileageLog />,
          },
          {
            path: "/folders",
            element: <Folders />,
          },
          {
            path: "/set-budget",
            element: <SetBudget />,
          },
          {
            path: "/add-community-integration",
            element: <AddCommunityIntegration />,
          },
          {
            path: "/community-integration-log",
            element: <CommunityIntegration />,
          },
          {
            path: "/add-category",
            element: <AddCategory />,
          },
          {
            path: "/add-list-of-activity",
            element: <AddListOfActivity />,
          },
          {
            path: "/category",
            element: <Category />,
          },
          {
            path: "/ads-location",
            element: <AdsLocation />,
          },
          {
            path: "/list-of-activity-log",
            element: <ListOfActivityLog />,
          },
          {
            path: "/add-group-activity-documentation",
            element: <AddGroupActivityDocumentation />,
          },
          {
            path: "/view-group-documentation-log",
            element: <ViewGroupDocumentation />,
          },
          {
            path: "/ads-configuration",
            element: <AdsConfiguration />,
          },
          {
            path: "/attendance-sheet",
            element: <AttendanceSheet />,
          },
          {
            path: "/reports",
            element: <Reports />,
          },
          {
            path: "/support-employment",
            element: <SupportEmployment />,
          },
          {
            path: "/add-daily-activity",
            element: <AddAdultListOfActivity />,
          },
          {
            path: "/view-outcome-log",
            element: <ViewOutcomeLog />,
          },
          {
            path: "/manage-unassigned-shift",
            element: <ManageUnassignedShift />,
          },
          {
            path: "/add-shift-summary",
            element: <AddShiftSummary />,
          },
          {
            path: "/view-shift-summary",
            element: <ViewShiftSummary />,
          },
          {
            path: "/employee-payroll",
            element: <EmployeePayroll />,
          },
          {
            path: "/employee-earning",
            element: <EmployeeEarning />,
          },
          {
            path: "/employee-files",
            element: <EmployeeFiles />,
          },
          {
            path: "/employee-notices",
            element: <Notices />,
          },
          {
            path: "/manage-shift",
            element: <ManageShift />,
          },
          {
            path: "/requested-time-off",
            element: <RequestedTimeOff />,
          },
          {
            path: "/scheduler",
            element: <Scheduler />,
          },
          {
            path: "/my-vehicles",
            element: <MyVehicles />,
          },
          {
            path: "/my-routes",
            element: <MyRoutes />,
          },
          {
            path: "/add-vehicle-inspection",
            element: <AddVehicleInspection />,
          },
          {
            path: "/view-vehicle-inspection",
            element: <ViewVehicleInspection />,
          },
          {
            path: "/vehicle-view-log",
            element: <VehicleViewLog />,
          },
          {
            path: "/my-briefcase",
            element: <MyBriefcase />,
          },
          {
            path: "/calendars",
            element: <Calendars />,
          },
          {
            path: "/shared-events",
            element: <SharedEvents />,
          },
          {
            path: "/add-new-ticket",
            element: <AddNewTicket />,
          },
          {
            path: "/contact-us",
            element: <ContactUs />,
          },
          {
            path: "/call-us",
            element: <CallUs />,
          },
          {
            path: "/recycle-bin",
            element: <RecycleBin />,
          },
          {
            path: "/payers",
            element: <Payers />,
          },
          {
            path: "/create-payers",
            element: <CreatePayers/>,
          },
          {
            path: "/create-physicians",
            element: <CreatePhysicians/>,
          },
          {
            path: "/physicians",
            element: <Physicians/>,
          },
          {
            path: "/clinical-diagnoses",
            element: <CliniCalAndDiagnoses/>,
          },
          {
            path: "/create-clinical-diagnoses",
            element: <CreateClinicalAndDiagnoses/>,
          },
          {
            path: "/create-pharmacy",
            element: <CreatePharmacy/>,
          },
          {
            path: "/pharmacy",
            element: <Pharmacy/>,
          },
          {
            path: "/contacts",
            element: <Contact/>,
          },
          {
            path: "/create-contacts",
            element: <CreateContact/>,
          },
          {
            path: "/create-emergency-preparedness",
            element: <CreateEmergencyPreparedness/>,
          },
          {
            path: "/emergency-preparedness",
            element: <EmergencyPreparedness/>,
          },
          {
            path: "/advance-directives",
            element: <AdvanceDirectives/>,
          },
          {
            path: "/create-advance-directives",
            element: <CreateAdvanceDirectives/>,
          },
          {
            path: "/create-referral-information",
            element: <CreateReferralInformation/>,
          },
          {
            path: "/referral-information",
            element: <ReferralInformation/>,
          },
          {
            path: "/*",
            element: <NotFound />,
          },
        ],
      },
    ],
  },
  {
    path: "/user-activation/:token",
    element: <UserActivation/>,
  },
];

export default privateRouter;
