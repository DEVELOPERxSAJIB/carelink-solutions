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

const MyVehicles = () => {
  const columns = [
    { header: "S.No", field: "serialNumber" },
    { header: "Vehicle/Bus Number", field: "vehicleNumber" },
    { header: "Vehicle Plate No", field: "vehiclePlateNumber" },
    { header: "Vehicle Description", field: "vehicleDescription" },
    { header: "Created By", field: "createdBy" },
    { header: "Created On", field: "createdOn" },
   { header: 'Details',
    field: 'details', render: (rowData) => (
      <Accordion tableHead={"Vehicle Details"} data={rowData.details} />
    ),}

];

const data = [
  {
      serialNumber: 1,
      vehicleNumber: "TY445",
      vehiclePlateNumber: "TY444",
      vehicleDescription: "Non-medical transport",
      createdBy: "Liban Awil Agency",
      createdOn: "2024-06-30",
      details: [
          `vinNumber: "5394949958583939393"`,
          `yearMake: "2005"`,
          `model: "Camry"`,
          `passengerCount: 4`,
         ` platesExpDate: "2024-07-01"`,
          `insuranceExp: "2024-07-01"`,
          `dotInspectionDate: "2024-06-03"`,
          `wheelchairAccessible: "No"`,
      ]
  },
  // Add more entries as needed
];



  const handleEdit = (rowData) => {
    alert(`Editing ${rowData.firstName} ${rowData.lastName}`);
  };

  const handleDelete = (rowData) => {
    alert(`Deleting ${rowData.firstName} ${rowData.lastName}`);
  };

  return (
    <div className="card">
      <div className="card-header"></div>
      <div className="card-header py-3 pt-5 fs-3">Vehicles</div>
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

export default MyVehicles;


