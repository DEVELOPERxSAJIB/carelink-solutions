import { useNavigate } from "react-router-dom";
import DataTable from "../../components/Tables/DynamicTable";
import Accordion from './../../components/Tables/Accordion';

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

const VehicleViewLog = () => {
  const columns = [
    { field: 'sno', header: 'S.No' },
    { field: 'tripCode', header: 'Trip Code' },
    { field: 'tripFrequency', header: 'Trip Frequency' },
    { field: 'routeName', header: 'Route Name' },
    { field: 'serviceDate', header: 'Service Date' },
    { field: 'addedBy', header: 'Added By' },
    { field: 'createdOn', header: 'Created On' },
  ];
  

  const data = [
    {
      sno: 1,
      tripCode: 'TC001',
      tripFrequency: 'Daily',
      routeName: 'Route 1',
      serviceDate: '2024-07-01',
      addedBy: 'John Doe',
      createdOn: '2024-07-01',
    },
    {
      sno: 2,
      tripCode: 'TC002',
      tripFrequency: 'Weekly',
      routeName: 'Route 2',
      serviceDate: '2024-07-02',
      addedBy: 'Jane Smith',
      createdOn: '2024-07-02',
    },
    {
      sno: 3,
      tripCode: 'TC003',
      tripFrequency: 'Monthly',
      routeName: 'Route 3',
      serviceDate: '2024-07-03',
      addedBy: 'Alice Johnson',
      createdOn: '2024-07-03',
    },
    {
      sno: 4,
      tripCode: 'TC004',
      tripFrequency: 'Daily',
      routeName: 'Route 4',
      serviceDate: '2024-07-04',
      addedBy: 'Bob Brown',
      createdOn: '2024-07-04',
    },
    {
      sno: 5,
      tripCode: 'TC005',
      tripFrequency: 'Weekly',
      routeName: 'Route 5',
      serviceDate: '2024-07-05',
      addedBy: 'Carol White',
      createdOn: '2024-07-05',
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

      <div className="card-header py-3 pt-5 fs-3">View Trips Log</div>
      <div className="card-body">
      <div className="gap-3 d-flex flex-wrap">
          <button
            className="btn btn-sm btn-primary waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-plus me-sm-1" />{" "}
              <span className=" d-sm-inline-block">Record a Trip</span>
            </span>
          </button>
          <button
            className="btn btn-sm btn-primary waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-notes me-sm-1" />{" "}
              <span className=" d-sm-inline-block">Reports</span>
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
              <span className=" d-sm-inline-block">Delete selected</span>
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
              <span className=" d-sm-inline-block">History</span>
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

export default VehicleViewLog;


