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

const ViewVehicleInspection = () => {
  const columns = [
    { field: 'sno', header: 'S.No' },
    { field: 'dateOfInspection', header: 'Date Of Inspection' },
    { field: 'inspectionId', header: 'Inspection Id' },
    { field: 'licensePlateNumber', header: 'License Plate Number' },
    { field: 'addedBy', header: 'Added By' },
    { field: 'addedOn', header: 'Added On' },
  ];
  

  const data = [
    {
      sno: 1,
      dateOfInspection: '2024-07-01',
      inspectionId: 'INS12345',
      licensePlateNumber: 'ABC1234',
      addedBy: 'John Doe',
      addedOn: '2024-07-01',
    },
    {
      sno: 2,
      dateOfInspection: '2024-07-02',
      inspectionId: 'INS12346',
      licensePlateNumber: 'XYZ5678',
      addedBy: 'Jane Smith',
      addedOn: '2024-07-02',
    },
    {
      sno: 3,
      dateOfInspection: '2024-07-03',
      inspectionId: 'INS12347',
      licensePlateNumber: 'LMN3456',
      addedBy: 'Alice Johnson',
      addedOn: '2024-07-03',
    },
    {
      sno: 4,
      dateOfInspection: '2024-07-04',
      inspectionId: 'INS12348',
      licensePlateNumber: 'DEF7890',
      addedBy: 'Bob Brown',
      addedOn: '2024-07-04',
    },
    {
      sno: 5,
      dateOfInspection: '2024-07-05',
      inspectionId: 'INS12349',
      licensePlateNumber: 'GHI0123',
      addedBy: 'Carol White',
      addedOn: '2024-07-05',
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

      <div className="card-header py-3 pt-5 fs-3">Vehicle Inspection Log</div>
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
              <span className=" d-sm-inline-block">Add New</span>
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
          <button
            className="btn btn-info waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-archive me-1" />
              <span className=" d-sm-inline-block">
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
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewVehicleInspection;

