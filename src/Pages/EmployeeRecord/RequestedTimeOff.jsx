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

const RequestedTimeOff = () => {
  const columns = [
    { header: "S.No", field: "serialNumber" },
    { header: "Request Number", field: "requestNumber" },
    { header: "Employee Name", field: "employeeName" },
    { header: "Days/Hours Requested", field: "daysHoursRequested" },
    { header: "Reason", field: "reason" },
    { header: "Begins On", field: "beginsOn" },
    { header: "Ends On", field: "endsOn" },
    { header: "Created By", field: "createdBy" },
    { header: "Created On", field: "createdOn" },
    { header: "Approve Status", field: "approveStatus" },
];

const data = [
    {
        serialNumber: 1,
        requestNumber: "REQ001",
        employeeName: "John Doe",
        daysHoursRequested: "2 days",
        reason: "Vacation",
        beginsOn: "2024-07-05",
        endsOn: "2024-07-06",
        createdBy: "Manager",
        createdOn: "2024-07-03",
        approveStatus: "Pending",
    },
    {
        serialNumber: 2,
        requestNumber: "REQ002",
        employeeName: "Jane Smith",
        daysHoursRequested: "8 hours",
        reason: "Medical Appointment",
        beginsOn: "2024-07-07",
        endsOn: "2024-07-07",
        createdBy: "HR",
        createdOn: "2024-07-02",
        approveStatus: "Approved",
    },
    // Add more entries as needed
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
      <div className="card-header py-3 pt-5 fs-3">Employee Time Off requests</div>
      <div className="card-body">
      <div className="gap-3 d-flex">
         
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
            className="btn btn-info waves-effect waves-light"
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
            className="btn btn-sm btn-primary waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-calendar me-sm-1" />{" "}
              <span className="d-none d-sm-inline-block">Calendar View</span>
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

export default RequestedTimeOff;
