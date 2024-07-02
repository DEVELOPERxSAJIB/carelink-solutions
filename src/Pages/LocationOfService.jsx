import { useNavigate } from "react-router-dom";
import DataTable from "../components/Tables/DynamicTable";

// Function to get the start and end dates of the current week
const getCurrentWeekDateRange = () => {
  const now = new Date();
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
  const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
    };
    return date.toLocaleDateString("en-US", options);
  };

  return {
    start: formatDate(startOfWeek),
    end: formatDate(endOfWeek),
  };
};

const LocationOfService = () => {
  const { start, end } = getCurrentWeekDateRange();
  const navigate = useNavigate();
  const columns = [
    { header: "S.No", field: "serialNumber" },
    { header: "Service Address 1", field: "serviceAddress1" },
    { header: "Service Address 2", field: "serviceAddress2" },
    { header: "Service City", field: "serviceCity" },
    { header: "Service State", field: "serviceState" },
    { header: "Service Zip Code", field: "serviceZipCode" },
    { header: "Created By", field: "createdBy" },
    { header: "Created On", field: "createdOn" },
  ];

  const data = [
    {
      serialNumber: 1,
      serviceAddress1: "19 dakkhin",
      serviceAddress2: "2 no cross road",
      serviceCity: "Khulna",
      serviceState: "Khulna",
      serviceZipCode: "9100",
      createdBy: "Sajib",
      createdOn : "13 APR 2024"
    },
    {
      serialNumber: 2,
      serviceAddress1: "19 dakkhin",
      serviceAddress2: "2 no cross road",
      serviceCity: "Khulna",
      serviceState: "Khulna",
      serviceZipCode: "9100",
      createdBy: "Sajib",
      createdOn : "13 APR 2024"
    },
    {
      serialNumber: 3,
      serviceAddress1: "19 dakkhin",
      serviceAddress2: "2 no cross road",
      serviceCity: "Khulna",
      serviceState: "Khulna",
      serviceZipCode: "9100",
      createdBy: "Sajib",
      createdOn : "13 APR 2024"
    },

    // Add more rows as needed
  ];

  const handleEdit = (rowData) => {
    alert(`Editing ${rowData.firstName} ${rowData.lastName}`);
    // Implement edit logic here
  };

  const handleDelete = (rowData) => {
    alert(`Deleting ${rowData.firstName} ${rowData.lastName}`);
    // Implement delete logic here
  };

  return (
    <div className="card">
      <div className="card-header py-3 pt-5 fs-3">Manage Locations</div>
      <div className="card-body">
        <div className="gap-3 d-flex">
          <button
            className="btn btn-secondary create-new btn-primary waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span>
              <i className="ti ti-plus me-sm-1" />{" "}
              <span className="d-none d-sm-inline-block">Add New</span>
            </span>
          </button>
          <button
            className="btn btn-secondary create-new btn-danger waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span>
              <i className="ti ti-trash me-sm-1" />{" "}
              <span className="d-none d-sm-inline-block">Delete selected</span>
            </span>
          </button>
        </div>
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={data}
            tableClassName="custom-table"
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default LocationOfService;
