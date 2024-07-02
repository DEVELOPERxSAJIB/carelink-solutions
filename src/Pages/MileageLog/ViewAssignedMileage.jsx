import { useNavigate } from "react-router-dom";
import { FaRegFolder } from "react-icons/fa";
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

const ViewAssignedMileage = () => {
  const { start, end } = getCurrentWeekDateRange();
  const navigate = useNavigate();

  const columns = [
    { header: "S.No", field: "serialNumber" },
    { header: "Individual", field: "individual" },
    { header: "Month/Year", field: "monthYear" },
    { header: "Initial Miles", field: "initialMiles" },
    { header: "Total Miles", field: "totalMiles" },
    { header: "Added By", field: "addedBy" },
    { header: "Added On", field: "addedOn" },
  ];
  
  const data = [
    {
      serialNumber: 1,
      individual: "John Doe",
      monthYear: "06/2024",
      initialMiles: 120,
      totalMiles: 200,
      addedBy: "Jane Smith",
      addedOn: "2024-06-01 12:30"
    },
    {
      serialNumber: 2,
      individual: "Alice Johnson",
      monthYear: "06/2024",
      initialMiles: 100,
      totalMiles: 180,
      addedBy: "John Doe",
      addedOn: "2024-06-02 17:30"
    },
    {
      serialNumber: 3,
      individual: "Bob Brown",
      monthYear: "06/2024",
      initialMiles: 150,
      totalMiles: 230,
      addedBy: "Alice Johnson",
      addedOn: "2024-06-03 14:30"
    }
  ];
  

  const handleEdit = (rowData) => {
    alert(`Editing ${rowData.firstName} ${rowData.lastName}`);
  };

  const handleDelete = (rowData) => {
    alert(`Deleting ${rowData.firstName} ${rowData.lastName}`);
  };

  return (
    <div className="card">
      <div className="card-header py-3 pt-5 fs-3">Assigned Miles</div>
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
            className="btn btn-secondary waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-trash me-sm-1" />{" "}
              <span className="d-none d-sm-inline-block">Delete Selected</span>
            </span>
          </button>
          <button
            className="btn btn-warning waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-history me-sm-1" />{" "}
              <span className="d-none d-sm-inline-block">History</span>
            </span>
          </button>
          <button
            style={{ background: "#9fd74d", color: "#fff" }}
            className="btn waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <FaRegFolder size={22} className="me-1" />{" "}
              <span className="d-none d-sm-inline-block">Archive</span>
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

export default ViewAssignedMileage;
