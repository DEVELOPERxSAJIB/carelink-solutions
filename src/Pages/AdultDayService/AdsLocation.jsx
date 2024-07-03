import { useNavigate } from "react-router-dom";
import DataTable from "../../components/Tables/DynamicTable";

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

const AdsLocation = () => {
  const columns = [
    { header: "S.No", field: "serialNumber" },
    { header: "ADS Address1", field: "address1" },
    { header: "ADS Address2", field: "address2" },
    { header: "ADS City", field: "city" },
    { header: "ADS State", field: "state" },
    { header: "ADS Zip Code", field: "zipCode" },
    { header: "Location Creator", field: "locationCreator" },
    { header: "Created On", field: "createdOn" },
  ];
  
  const data = [
    {
      serialNumber: 1,
      address1: "123 Main St",
      address2: "Apt 101",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      locationCreator: "John Doe",
      createdOn: "2024-06-01"
    },
    {
      serialNumber: 2,
      address1: "456 Elm St",
      address2: "",
      city: "Smallville",
      state: "NY",
      zipCode: "54321",
      locationCreator: "Jane Smith",
      createdOn: "2024-06-02"
    },
    {
      serialNumber: 3,
      address1: "789 Oak Ave",
      address2: "Suite 200",
      city: "Metropolis",
      state: "IL",
      zipCode: "67890",
      locationCreator: "Alice Johnson",
      createdOn: "2024-06-03"
    },
  ];
  
  
  
  

  const handleEdit = (rowData) => {
    alert(`Editing ${rowData.firstName} ${rowData.lastName}`);
  };

  const handleDelete = (rowData) => {
    alert(`Deleting ${rowData.firstName} ${rowData.lastName}`);
  };

  return (
    <div className="card">
      <div className="card-header py-3 pt-5 fs-3">Manage Locations</div>
      <div className="card-body">
        <div className="gap-3 d-flex">
          <button
            className="btn btn-sm btn-primary waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
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
            <span className="d-flex align-items-center">
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

export default AdsLocation;


