import DataTable from "./../../components/Tables/DynamicTable";
const flattenData = (data) => {
  return data.map((item) => ({
    _id: item._id,
    primaryFirstName: item.emergencyContacts?.primary?.firstName || "",
    primaryLastName: item.emergencyContacts?.primary?.lastName || "",
    primaryMobilePhone: item.emergencyContacts?.primary?.mobilePhone || "",
    primaryEmail: item.emergencyContacts?.primary?.email || "",
    primaryAddressLine1: item.emergencyContacts?.primary?.addressLine1 || "",
    primaryAddressLine2: item.emergencyContacts?.primary?.addressLine2 || "",
    primaryCity: item.emergencyContacts?.primary?.city || "",
    primaryState: item.emergencyContacts?.primary?.state || "",
    primaryZip: item.emergencyContacts?.primary?.zip || "",
    alternateFirstName: item.alternateCAHPSContactDetails?.firstName || "",
    alternateLastName: item.alternateCAHPSContactDetails?.lastName || "",
    alternateMobilePhone: item.alternateCAHPSContactDetails?.mobilePhone || "",
    alternatePhone: item.alternateCAHPSContactDetails?.alternatePhone || "",
    alternateEmail: item.alternateCAHPSContactDetails?.email || "",
    alternateAddressLine1:
      item.alternateCAHPSContactDetails?.addressLine1 || "",
    alternateAddressLine2:
      item.alternateCAHPSContactDetails?.addressLine2 || "",
    alternateCity: item.alternateCAHPSContactDetails?.city || "",
    alternateState: item.alternateCAHPSContactDetails?.state || "",
    alternateZip: item.alternateCAHPSContactDetails?.zip || "",
    alternateCounty: item.alternateCAHPSContactDetails?.county || "",
    representativeContacted: item.representativeContacted || "",
    legalRepresentativeOption: item.legalRepresentativeOption || "",
    patientSelectedRepresentativeOption:
      item.patientSelectedRepresentativeOption || "",
    otherDetails: item.otherDetails || "",
    physicianNotified: item.physicianNotified || false,
    patientNotified: item.patientNotified || false,
    previousField1: item.previousField1 || "",
    previousField2: item.previousField2 || "",
    doNotContactCAHPS: item.doNotContactCAHPS || false,
    reasonForNoContact: item.reasonForNoContact || "",
    otherReason: item.otherReason || "",
    alternateCAHPSContact: item.alternateCAHPSContact || false,
    sameAsPrimaryEmergencyContact:
      item.alternateCAHPSContactDetails?.sameAsPrimaryEmergencyContact || false,
    primaryAlternatePhone:
      item.emergencyContacts?.primary?.alternatePhone || "",
    primaryRelationship: item.emergencyContacts?.primary?.relationship || "",
    primaryRepresentative:
      item.emergencyContacts?.primary?.representative || "",
    primarySameAsPatientAddress:
      item.emergencyContacts?.primary?.sameAsPatientAddress || false,
    additionalDetails:
      item.additional?.map((additionalItem) => ({
        selectedTemplate: additionalItem.selectedTemplate || "",
        comments: additionalItem.comments || "",
        remainingCharacters: additionalItem.remainingCharacters || 0,
      })) || [],
  }));
};

import ExportButton from "./../../components/Buttons/ExportButton";
import TableHeader from "./../../components/Tables/TableHeader";
import { useGetAllContactsQuery } from "../../Redux/api/Contact";
import AuthLoader from "./../../utils/Loaders/AuthLoader";
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const { data, isLoading } = useGetAllContactsQuery();
  const flattenedData = flattenData(data?.payload?.contacts ?? []);
  const columns = [
    { field: "_id", header: "ID" },
    { field: "primaryFirstName", header: " First Name" },
    { field: "primaryLastName", header: " Last Name" },
    { field: "primaryMobilePhone", header: " Mobile Phone" },
    { field: "primaryEmail", header: "Email" },
    { field: "primaryAddressLine1", header: "Address Line 1" },
    { field: "primaryAddressLine2", header: "Address Line 2" },
    { field: "primaryCity", header: "City" },
    { field: "primaryState", header: "State" },
    { field: "primaryZip", header: " Zip" },
    { field: "alternateFirstName", header: " CAHPS Contact First Name" },
    { field: "alternateMobilePhone", header: " CAHPS Contact Mobile Phone" },
  ];

 
const navigate = useNavigate()
  if (isLoading) return <AuthLoader />;

  console.log(isLoading);
  return (
    <div className="card">
      <TableHeader
        title="Patient List"
        className="py-3 pt-5 fs-3 card-header"
      />
      <div className="card-body">
        <div className="gap-3 d-flex flex-wrap">
          <ExportButton data={data} orientation="landscape" columns={columns} fileName="Patient" />
          <button
            className="btn btn-secondary create-new btn-danger waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-trash me-sm-1" />{" "}
              <span className="d-none d-sm-inline-block">Delete selected</span>
            </span>
          </button>

          <button
            className="btn btn-info waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-archive me-1" />
              <span className="d-none d-sm-inline-block">Archive </span>
            </span>
          </button>
          <button
            className="btn btn-success waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
            onClick={()=>navigate("/create-contacts")}
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-archive me-1" />
              <span className="d-none d-sm-inline-block">
                Add New Payer
              </span>
            </span>
            </button>
        </div>
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={flattenedData ?? []}
            tableClassName="custom-table"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
