import { useNavigate } from "react-router-dom";
import DataTable from "../../components/Tables/DynamicTable";
import Accordion from './../../components/Tables/Accordion';
import TableHeader from './../../components/Tables/TableHeader';
import useFormFields from './../../hook/useFormHook';
import FullscreenModal from './../../components/Models/FullScreenModel';
import PickDate from './../../components/FormElement/DatePicker';

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
  const initialState = {
    vehicleBusNumber: "",
    yearMake: "",
    model: "",
    vinNumber: "",
    licensePlateNumber: "",
    numberOfPassengers: "",
    platesExpDate: "",
    insuranceExp: "",
    dotInspectionDate: "",
    wheelchairAccessible: false,
    vehicleDescription: ""
  };

  const [formData, handleChange, resetForm, isValid] = useFormFields(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // handleSave(formData);
    resetForm();
  }
  return (
    <div className="card">
      <TableHeader title="Vehicles" className="py-3 pt-5 fs-3 card-header"/>
      <div className="card-body">
        <div className="gap-3 d-flex flex-wrap">
        <FullscreenModal className="col-md-7" id="addVehicle" title="Add Vehicle" onSave={handleSubmit}>
      <form className="w-100 from-scrollbar px-3" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="vehicleBusNumber" className="form-label">Vehicle/Bus Number</label>
            <input
              type="text"
              id="vehicleBusNumber"
              name="vehicleBusNumber"
              className="form-control"
              value={formData.vehicleBusNumber}
              onChange={handleChange}
              placeholder="Vehicle/Bus Number"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="yearMake" className="form-label">Year/Make</label>
            <input
              type="text"
              id="yearMake"
              name="yearMake"
              className="form-control"
              value={formData.yearMake}
              onChange={handleChange}
              placeholder="Year/Make"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="model" className="form-label">Model</label>
            <input
              type="text"
              id="model"
              name="model"
              className="form-control"
              value={formData.model}
              onChange={handleChange}
              placeholder="Model"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="vinNumber" className="form-label">VIN Number</label>
            <input
              type="text"
              id="vinNumber"
              name="vinNumber"
              className="form-control"
              value={formData.vinNumber}
              onChange={handleChange}
              placeholder="VIN Number"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="licensePlateNumber" className="form-label">License Plate Number</label>
            <input
              type="text"
              id="licensePlateNumber"
              name="licensePlateNumber"
              className="form-control"
              value={formData.licensePlateNumber}
              onChange={handleChange}
              placeholder="License Plate Number"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="numberOfPassengers" className="form-label">Number of Passengers</label>
            <input
              type="text"
              id="numberOfPassengers"
              name="numberOfPassengers"
              className="form-control"
              value={formData.numberOfPassengers}
              onChange={handleChange}
              placeholder="Number of Passengers"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="platesExpDate" className="form-label">Plates Exp Date</label>
            <PickDate/>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="insuranceExp" className="form-label">Insurance Exp</label>
            <PickDate/>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="dotInspectionDate" className="form-label">DOT Inspection Date</label>
            <PickDate/>
          </div>
          <div className="col-md-6 mb-3 form-check">
            <input
              type="checkbox"
              id="wheelchairAccessible"
              name="wheelchairAccessible"
              className="form-check-input"
              checked={formData.wheelchairAccessible}
              onChange={handleChange}
            />
            <label htmlFor="wheelchairAccessible" className="form-check-label">
              Is this Vehicle wheelchair accessible?
            </label>
          </div>
          <div className="col-md-12 mb-3">
            <label htmlFor="vehicleDescription" className="form-label">Vehicle Description</label>
            <textarea
              id="vehicleDescription"
              name="vehicleDescription"
              className="form-control"
              value={formData.vehicleDescription}
              onChange={handleChange}
              placeholder="Vehicle Description"
            />
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary" disabled={!isValid}>
            Add Vehicle
          </button>
        </div>
      </form>
    </FullscreenModal>
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


