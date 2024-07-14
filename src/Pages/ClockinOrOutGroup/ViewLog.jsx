
import DataTable from "./../../components/Tables/DynamicTable";
import { useNavigate } from "react-router-dom";
import TableHeader from './../../components/Tables/TableHeader';

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

const ViewLog = () => {
  const { start, end } = getCurrentWeekDateRange();
  const navigate = useNavigate();
  const columns = [
    { header: "S.No", field: "serialNumber" },
    { header: "Date Of Service", field: "dateOfService" },
    { header: "Work Code", field: "workCode" },
    { header: "Start Time", field: "startTime" },
    { header: "End Time", field: "endTime" },
    { header: "Total Hours", field: "totalHours" },
    { header: "Ratio", field: "ratio" },
    { header: "Added By", field: "addedBy" },
    { header: "Added On", field: "addedOn" },
  ];

  const data = [
    {
      serialNumber: 1,
      dateOfService: "2024-06-01",
      workCode: "W123",
      startTime: "08:00",
      endTime: "12:00",
      totalHours: 4,
      ratio: 0.8,
      addedBy: "John Doe",
      addedOn: "2024-06-01 12:30",
    },
    {
      serialNumber: 2,
      dateOfService: "2024-06-02",
      workCode: "W124",
      startTime: "09:00",
      endTime: "17:00",
      totalHours: 8,
      ratio: 1.0,
      addedBy: "Jane Smith",
      addedOn: "2024-06-02 17:30",
    },
    {
      serialNumber: 3,
      dateOfService: "2024-06-03",
      workCode: "W125",
      startTime: "10:00",
      endTime: "14:00",
      totalHours: 4,
      ratio: 0.9,
      addedBy: "Alice Johnson",
      addedOn: "2024-06-03 14:30",
    }
  ];
  
  
    // Add more rows as needed
  
  

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
      <TableHeader title="Group Time Sheet" className="py-3 pt-5 fs-3 card-header"/>
      <div className="card-body">
        <div className="gap-3 d-flex flex-wrap">
          <button
            className="btn btn-secondary create-new btn-primary waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
            onClick={()=>navigate("/clock-in")}
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
            style={{ background: "#9fd74d", color: "#fff",}}
            className="btn waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-report me-1"></i>{" "}
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
        </div>
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={data}
            tableClassName="custom-table"
            onEdit={handleEdit}
            tableName="viewLog"
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewLog;
