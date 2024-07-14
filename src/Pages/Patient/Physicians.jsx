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
    PhysicianSelectedRepresentativeOption:
      item.PhysicianSelectedRepresentativeOption || "",
    otherDetails: item.otherDetails || "",
    physicianNotified: item.physicianNotified || false,
    PhysicianNotified: item.PhysicianNotified || false,
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
    primarySameAsPhysicianAddress:
      item.emergencyContacts?.primary?.sameAsPhysicianAddress || false,
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
import { useGetAllPhysiciansQuery } from "../../Redux/api/PhysicianApi";
import { useNavigate } from 'react-router-dom';
import MainLoader from './../../utils/Loaders/MainLoader';
const Physicians = () => {
  const { data, isLoading, error } = useGetAllPhysiciansQuery();
  const columns = [
    { header: "First Name", field: "firstName" },
    { header: "Middle Initial", field: "mi" },
    { header: "Last Name", field: "lastName" },
    { header: "Taxonomy Code", field: "taxonomyCode" },
    { header: "Credentials", field: "credentials" },
    { header: "NPI Number", field: "npiNo" },
    {
      header: "Medicaid Provider Identifier",
      field: "medicaidProviderIdentifier",
    },
    { header: "Address Line 1", field: "addressLine1" },
    { header: "Address Line 2", field: "addressLine2" },
    { header: "City", field: "city" },
    { header: "State", field: "state" },
    { header: "Zip Code", field: "zip" },
    { header: "Primary Phone", field: "primaryPhone" },
    { header: "Alternate Phone", field: "alternatePhone" },
    { header: "Delivery Method", field: "deliveryMethod" },
    { header: "Fax", field: "fax" },
    { header: "Email", field: "email" },
    { header: "Added By", field: "addedBy" },
    { header: "Created At", field: "createdAt" },
    { header: "Updated At", field: "updatedAt" },
  ];
const navigate= useNavigate()
  if (isLoading) return <MainLoader />;

  return (
    <div className="card">
      <TableHeader
        title="Physician List"
        className="py-3 pt-5 fs-3 card-header"
      />
      <div className="card-body">
        <div className="gap-3 d-flex flex-wrap">
          <ExportButton
            data={data?.payload?.physicians??[]}
            orientation="landscape"
            columns={columns}
            fileName="Physician"
          />
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
            onClick={()=>navigate("/create-physicians")}
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-archive me-1" />
              <span className="d-none d-sm-inline-block">
                Add New Physician
              </span>
            </span>
            </button>
        </div>
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={data?.payload?.physicians ?? []}
            tableClassName="custom-table"
            tableName="physicians"
          />
        </div>
      </div>
    </div>
  );
};

export default Physicians;
