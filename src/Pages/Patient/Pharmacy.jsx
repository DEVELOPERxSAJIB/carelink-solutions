import DataTable from "./../../components/Tables/DynamicTable";
import ExportButton from "./../../components/Buttons/ExportButton";
import TableHeader from "./../../components/Tables/TableHeader";
import { useGetAllPharmaciesQuery } from "../../Redux/api/PharmacyApi"; // Adjust the import path as per your actual API setup
import { useNavigate } from "react-router-dom";
import MainLoader from './../../utils/Loaders/MainLoader';
const Pharmacy = () => {
  const { data, isLoading } = useGetAllPharmaciesQuery();
  const navigate = useNavigate();
  if (isLoading) return <MainLoader />;

  const columns = [
    { field: "pharmacyName", header: "Pharmacy Name" },
    { field: "addressLine1", header: "Address Line 1" },
    { field: "addressLine2", header: "Address Line 2" },
    { field: "city", header: "City" },
    { field: "state", header: "State" },
    { field: "zip", header: "ZIP Code" },
    { field: "primaryPhone", header: "Primary Phone" },
    { field: "contactFirstName", header: "Contact First Name" },
    { field: "contactLastName", header: "Contact Last Name" },
    { field: "email", header: "Email" },
    { field: "faxNumber", header: "Fax Number" },
    { field: "comment", header: "Comment" },
  ];

  return (
    <div className="card">
      <TableHeader title="Pharmacy List" className="py-3 pt-5 fs-3 card-header" />
      <div className="card-body">
        <div className="gap-3 d-flex flex-wrap">
          <ExportButton
            data={data?.payload?.pharmacies  }
            orientation="landscape"
            columns={columns}
            fileName="Pharmacy"
          />
          <button
            className="btn btn-success waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
            onClick={() => navigate("/create-pharmacy")}
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-plus me-1" />
              <span className="d-none d-sm-inline-block">Add New Pharmacy</span>
            </span>
          </button>
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
        </div>
        <div className="mt-5">
          <DataTable columns={columns} data={data?.payload?.pharmacies ?? []} tableClassName="custom-table" />
        </div>
      </div>
    </div>
  );
};

export default Pharmacy;
