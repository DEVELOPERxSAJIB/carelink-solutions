import { useNavigate } from "react-router-dom";
import DataTable from "../../components/Tables/DynamicTable";
import Accordion from "./../../components/Tables/Accordion";
import TableHeader from "./../../components/Tables/TableHeader";
import useFormFields from "./../../hook/useFormHook";
import FullscreenModal from "./../../components/Models/FullScreenModel";

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

const MyRoutes = () => {
  const columns = [
    { field: "sno", header: "S.No" },
    { field: "routeName", header: "Route Name" },
    { field: "vehicleDescription", header: "Vehicle Description" },
    { field: "ratio", header: "Ratio" },
    { field: "tripType", header: "Trip Type" },
    { field: "status", header: "Status" },
    { field: "createdOn", header: "Created On" },
  ];

  const data = [
    {
      sno: 1,
      routeName: "Route 1",
      vehicleDescription: "Bus A - 50 seats",
      ratio: "1:5",
      tripType: "Daily",
      status: "Active",
      createdOn: "2024-07-01",
    },
    {
      sno: 2,
      routeName: "Route 2",
      vehicleDescription: "Bus B - 40 seats",
      ratio: "1:4",
      tripType: "Weekly",
      status: "Inactive",
      createdOn: "2024-07-02",
    },
    {
      sno: 3,
      routeName: "Route 3",
      vehicleDescription: "Bus C - 60 seats",
      ratio: "1:6",
      tripType: "Daily",
      status: "Active",
      createdOn: "2024-07-03",
    },
    {
      sno: 4,
      routeName: "Route 4",
      vehicleDescription: "Bus D - 55 seats",
      ratio: "1:5.5",
      tripType: "Monthly",
      status: "Active",
      createdOn: "2024-07-04",
    },
    {
      sno: 5,
      routeName: "Route 5",
      vehicleDescription: "Bus E - 45 seats",
      ratio: "1:4.5",
      tripType: "Weekly",
      status: "Inactive",
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
    routeName: "",
    ratio: "",
    selectVehicle: "",
    tripType: "Per Mile",
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
      <TableHeader title="Routes" className="py-3 pt-5 fs-3 card-header" />
      <div className="card-body">
        <div className="gap-3 d-flex flex-wrap">
          <FullscreenModal
            className="col-md-5"
            id="addRoute"
            title="Add Route"
            onSave={handleSubmit}
          >
            <form className="w-100 from-scrollbar px-3" onSubmit={handleSubmit}>
              <div className="row">
                {/* Route Name */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="routeName" className="form-label">
                    Name of the route <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="routeName"
                    name="routeName"
                    className="form-control"
                    value={formData.routeName}
                    onChange={handleChange}
                    placeholder="Route Name"
                    required
                  />
                </div>

                {/* Ratio */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="ratio" className="form-label">
                    Ratio <span className="text-danger">*</span>
                  </label>
                  <div>
                    <div className="row">
                      <div className="col-md-5">
                        <input
                          type="text"
                          id="ratio"
                          name="ratio"
                          className="form-control"
                          value={formData.ratio}
                          onChange={handleChange}
                          placeholder="Ratio"
                          required
                        />
                      </div>
                      <div className="col-md-2 d-flex justify-center align-items-center">
                      :
                      </div>
                      <div className="col-md-5">
                        <input
                          type="text"
                          id="ratio"
                          name="ratio"
                          className="form-control"
                          value={formData.ratio}
                          onChange={handleChange}
                          placeholder="Ratio"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Select Vehicle */}
                <div className="col-md-12 mb-3">
                  <label htmlFor="selectVehicle" className="form-label">
                    Select vehicle <span className="text-danger">*</span>
                  </label>
                  <select
                    id="selectVehicle"
                    name="selectVehicle"
                    className="form-select"
                    value={formData.selectVehicle}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select vehicle</option>
                    {/* Add vehicle options here */}
                  </select>
                </div>

                {/* Trip Type */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Trip type <span className="text-danger">*</span>
                  </label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="perMile"
                      name="tripType"
                      value="Per Mile"
                      checked={formData.tripType === "Per Mile"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="perMile">
                      Per Mile
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="perTrip"
                      name="tripType"
                      value="Per Trip"
                      checked={formData.tripType === "Per Trip"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="perTrip">
                      Per Trip
                    </label>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!isValid}
                >
                  Add Route
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
            tableName="myRoutes"
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default MyRoutes;
