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

const ViewOutcomeLog = () => {

  const columns = [
    { header: "S.No", field: "serialNumber" },
    { header: "Individual Name", field: "individualName" },
    { header: "Date of Service", field: "dateOfService" },
    { header: "Frequency", field: "frequency" },
    { header: "Description", field: "description" },
    { header: "Was the Outcome Completed?", field: "status" },
    { header: "Added By", field: "addedBy" },
    { header: "Added On", field: "addedOn" },
];

const data = [
    {
        serialNumber: 1,
        individualName: "John Doe",
        dateOfService: "2024-07-01",
        frequency: "Weekly",
        description: "Routine check-up",
        outcomeCompleted: true,
        addedBy: "Admin",
        addedOn: "2024-07-03",
    },
    {
        serialNumber: 2,
        individualName: "Alice Smith",
        dateOfService: "2024-07-02",
        frequency: "Monthly",
        description: "Physical therapy session",
        outcomeCompleted: true,
        addedBy: "Admin",
        addedOn: "2024-07-03",
    },
    {
        serialNumber: 3,
        individualName: "Bob Johnson",
        dateOfService: "2024-07-03",
        frequency: "Bi-weekly",
        description: "Counseling session",
        outcomeCompleted: false,
        addedBy: "Admin",
        addedOn: "2024-07-03",
    },
    {
        serialNumber: 4,
        individualName: "Charlie Wilson",
        dateOfService: "2024-07-04",
        frequency: "Weekly",
        description: "Medication review",
        outcomeCompleted: true,
        addedBy: "Admin",
        addedOn: "2024-07-03",
    },
    {
        serialNumber: 5,
        individualName: "David Lee",
        dateOfService: "2024-07-05",
        frequency: "Monthly",
        description: "Dental check-up",
        outcomeCompleted: true,
        addedBy: "Admin",
        addedOn: "2024-07-03",
    },
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
      <div className="card-header py-3 pt-5 fs-3">Support Employment/Community Employment</div>
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
          <button
            className="btn btn-secondary create-new btn-danger waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-notes me-sm-1" />{" "}
              <span className="d-none d-sm-inline-block">Reports</span>
            </span>
          </button>
          <button
            className="btn btn-warning waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
            <i className="ti ti-history me-1"></i>{" "}
              <span className="d-none d-sm-inline-block">History</span>
            </span>
          </button>
          <button
            className="btn btn-danger waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-archive me-1" />
              <span className="d-none d-sm-inline-block">
                Archive{" "}
              </span>
            </span>
          </button>
          <button
            className="btn btn-danger waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-plus me-1" />
              <span className="d-none d-sm-inline-block">
                Email this from
              </span>
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

export default ViewOutcomeLog;


