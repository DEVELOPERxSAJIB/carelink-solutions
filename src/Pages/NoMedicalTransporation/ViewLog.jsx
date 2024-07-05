import { useNavigate } from "react-router-dom";
import DataTable from "../../components/Tables/DynamicTable";
import Accordion from "./../../components/Tables/Accordion";
import TableHeader from "./../../components/Tables/TableHeader";
import useFormFields from "./../../hook/useFormHook";
import FullscreenModal from "./../../components/Models/FullScreenModel";
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

const VehicleViewLog = () => {
  const columns = [
    { field: "sno", header: "S.No" },
    { field: "tripCode", header: "Trip Code" },
    { field: "tripFrequency", header: "Trip Frequency" },
    { field: "routeName", header: "Route Name" },
    { field: "serviceDate", header: "Service Date" },
    { field: "addedBy", header: "Added By" },
    { field: "createdOn", header: "Created On" },
  ];

  const data = [
    {
      sno: 1,
      tripCode: "TC001",
      tripFrequency: "Daily",
      routeName: "Route 1",
      serviceDate: "2024-07-01",
      addedBy: "John Doe",
      createdOn: "2024-07-01",
    },
    {
      sno: 2,
      tripCode: "TC002",
      tripFrequency: "Weekly",
      routeName: "Route 2",
      serviceDate: "2024-07-02",
      addedBy: "Jane Smith",
      createdOn: "2024-07-02",
    },
    {
      sno: 3,
      tripCode: "TC003",
      tripFrequency: "Monthly",
      routeName: "Route 3",
      serviceDate: "2024-07-03",
      addedBy: "Alice Johnson",
      createdOn: "2024-07-03",
    },
    {
      sno: 4,
      tripCode: "TC004",
      tripFrequency: "Daily",
      routeName: "Route 4",
      serviceDate: "2024-07-04",
      addedBy: "Bob Brown",
      createdOn: "2024-07-04",
    },
    {
      sno: 5,
      tripCode: "TC005",
      tripFrequency: "Weekly",
      routeName: "Route 5",
      serviceDate: "2024-07-05",
      addedBy: "Carol White",
      createdOn: "2024-07-05",
    },
  ];

  const handleEdit = (rowData) => {
    alert(`Editing ${rowData.firstName} ${rowData.lastName}`);
  };

  const handleDelete = (rowData) => {
    alert(`Deleting ${rowData.firstName} ${rowData.lastName}`);
  };
  const initialState = {
    vehicleInspection: "",
    dateOfService: "2024-07-05",
    route: "",
    tripFrequency: "AM",
    startOdometer: "",
    endOdometer: "",
    comment: "",
  };
  const [formData, handleChange, resetForm, isValid] =
    useFormFields(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    // handleSave(formData);
    resetForm();
  };
  return (
    <div className="card">
      <TableHeader
        title="View Trips Log"
        className="py-3 pt-5 fs-3 card-header"
      />
      <div className="card-body">
        <div className="gap-3 d-flex flex-wrap">
          <FullscreenModal
            className="col-md-6"
            id="recordTrip"
            title="Record a Trip"
            onSave={handleSubmit}
          >
            <form className="w-100 from-scrollbar px-3" onSubmit={handleSubmit}>
              <div className="row">
                {/* Choose Vehicle Inspection */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="vehicleInspection" className="form-label">
                    Choose your vehicle inspection{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <select
                    id="vehicleInspection"
                    name="vehicleInspection"
                    className="form-select"
                    value={formData.vehicleInspection}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose your vehicle inspection</option>
                    <option value="new">Add a new vehicle inspection</option>
                    {/* Add more vehicle inspection options here */}
                  </select>
                </div>

                {/* Date of Service */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="dateOfService" className="form-label">
                    Date of service <span className="text-danger">*</span>
                  </label>
                  <PickDate/>
                </div>

                {/* Choose Route */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="route" className="form-label">
                    Choose your Route <span className="text-danger">*</span>
                  </label>
                  <select
                    id="route"
                    name="route"
                    className="form-select"
                    value={formData.route}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose your Route</option>
                    {/* Add more route options here */}
                  </select>
                </div>

                {/* Trip Frequency */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Select your trip frequency{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="am"
                      name="tripFrequency"
                      value="AM"
                      checked={formData.tripFrequency === "AM"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="am">
                      AM
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="pm"
                      name="tripFrequency"
                      value="PM"
                      checked={formData.tripFrequency === "PM"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="pm">
                      PM
                    </label>
                  </div>
                </div>

                {/* Start Odometer Reading */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="startOdometer" className="form-label">
                    Start Odometer Reading{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="startOdometer"
                    name="startOdometer"
                    className="form-control"
                    value={formData.startOdometer}
                    onChange={handleChange}
                    placeholder="Start Odometer Reading"
                    required
                  />
                </div>

                {/* End Odometer Reading */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="endOdometer" className="form-label">
                    End Odometer Reading <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="endOdometer"
                    name="endOdometer"
                    className="form-control"
                    value={formData.endOdometer}
                    onChange={handleChange}
                    placeholder="End Odometer Reading"
                    required
                  />
                </div>

                {/* General Comment */}
                <div className="col-md-12 mb-3">
                  <label htmlFor="comment" className="form-label">
                    General Comment
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    className="form-control"
                    value={formData.comment}
                    onChange={handleChange}
                    placeholder="General Comment"
                  />
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!isValid}
                >
                  Record Trip
                </button>
              </div>
            </form>
          </FullscreenModal>
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
