import DataTable from "../../components/Tables/DynamicTable";
import { useState, useEffect } from "react";
import TableHeader from "./../../components/Tables/TableHeader";
import useFormFields from "./../../hook/useFormHook";
import FullscreenModal from "./../../components/Models/FullScreenModel";
import Alert from "./../../components/Alert/Alert";
import {
  useCreateTripMutation,
  useGetAllTripsQuery,
  useUpdateTripMutation,
  useDeleteTripMutation,
} from "../../Redux/api/TripApi";
import { useGetAllInspectionsQuery } from "../../Redux/api/InspectionApi.js";
import { useGetAllRoutesQuery } from "../../Redux/api/RouteApi.js";
import EditModal from "./../../components/Models/EditModal";
import MainLoader from "./../../utils/Loaders/MainLoader";
import { useMeQuery } from "../../Redux/api/UserApi";
const VehicleViewLog = () => {
  const { data: logData } = useMeQuery();
  const { data, isLoading, refetch } = useGetAllTripsQuery();
  const { data: inspections } = useGetAllInspectionsQuery();
  const { data: routes } = useGetAllRoutesQuery();
  const [
    createTrip,
    { data: createData, error: createError, isSuccess: isCreateSuccess },
  ] = useCreateTripMutation();
  const [
    updateTrip,
    { data: updateData, error: updateError, isSuccess: isUpdateSuccess },
  ] = useUpdateTripMutation();
  const [deleteTrip, { data: deleteData, isSuccess: isDeleteSuccess }] =
    useDeleteTripMutation();

  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState("");
  const columns = [
    { field: "_id", header: "Id" },
    // { field: "route", header: "Route" },
    // { field: "vehicleInspection", header: "Vehicle Inspection" },
    { field: "dateOfService", header: "Date of Service" },
    { field: "tripFrequency", header: "Trip Frequency" },
    { field: "startOdometerReading", header: "Start odo meter reading" },
    { field: "endOdometerReading", header: "End Odo meter reading" },
    { field: "generalComment", header: "General Comment" },
  ];

  const initialState = {
    route: "",
    vehicleInspection: "",
    dateOfService: "",
    tripFrequency: "",
    startOdometerReading: "",
    endOdometerReading: "",
    generalComment: "",
  };
  const [formData, handleChange, setFormData, resetForm] =
    useFormFields(initialState);
  const handleEdit = (row) => {
    setShow(true);
    setEditId(row._id);
    const updateRow = { ...row };
    updateRow.route = row.route?._id;
    updateRow.dateOfService = new Date(row.dateOfService)
      .toISOString()
      .slice(0, 10);
    updateRow.vehicleInspection = row.vehicleInspection?._id;
    setFormData(updateRow);
  };

  const handleDelete = (row) => {
    deleteTrip(row._id);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      updateTrip({ tripId: editId, tripData: formData });
      resetForm();
    } else {
      createTrip(formData);
      resetForm();
    }
  };
  //console.log(formData);
  useEffect(() => {
    if (isCreateSuccess) {
      refetch();
    }
    if (isUpdateSuccess) {
      refetch();
      setShow(false);
    }
    if (isDeleteSuccess) {
      refetch();
    }
  }, [isCreateSuccess, isUpdateSuccess, isDeleteSuccess]);
  if (isLoading) return <MainLoader />;
  return (
    <div className="card">
      <TableHeader
        title="View Trips Log"
        className="py-3 pt-5 fs-3 card-header"
      />
      {show && (
        <EditModal
          onClose={setShow}
          title="Edit Route"
          style={{
            minWidth: "70%",
            maxWidth: "70%",
            maxHeight: "80vh",
            overflowY: "scroll",
          }}
        >
          <form className="w-100 from-scrollbar px-3" onSubmit={handleSubmit}>
            <Alert message={updateError?.data?.message} type="danger" />
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
                  {inspections?.payload?.inspections?.map((item, index) => {
                    return (
                      <option key={index} value={item?._id}>
                        {item?.transport}
                      </option>
                    );
                  })}

                  {/* Add more vehicle inspection options here */}
                </select>
              </div>

              {/* Date of Service */}
              <div className="col-md-6 mb-3">
                <label htmlFor="dateOfService" className="form-label">
                  Date of service <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  id="id"
                  name="dateOfService"
                  value={formData?.dateOfService}
                  onChange={handleChange}
                  className="form-control"
                />
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
                  {routes?.payload?.routes?.map((item, index) => {
                    return (
                      <option key={index} value={item?._id}>
                        {item?.routeName}
                      </option>
                    );
                  })}
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
                <label htmlFor="startOdometerReading" className="form-label">
                  Start Odometer Reading <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="startOdometerReading"
                  name="startOdometerReading"
                  className="form-control"
                  value={formData.startOdometerReading}
                  onChange={handleChange}
                  placeholder="Start Odometer Reading"
                  required
                />
              </div>

              {/* End Odometer Reading */}
              <div className="col-md-6 mb-3">
                <label htmlFor="endOdometerReading" className="form-label">
                  End Odometer Reading <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="endOdometerReading"
                  name="endOdometerReading"
                  className="form-control"
                  value={formData.endOdometerReading}
                  onChange={handleChange}
                  placeholder="End Odometer Reading"
                  required
                />
              </div>

              {/* General Comment */}
              <div className="col-md-12 mb-3">
                <label htmlFor="generalComment" className="form-label">
                  General Comment
                </label>
                <textarea
                  id="generalComment"
                  name="generalComment"
                  className="form-control"
                  value={formData.generalComment}
                  onChange={handleChange}
                  placeholder="General Comment"
                />
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                Record Trip
              </button>
            </div>
          </form>
        </EditModal>
      )}
      <Alert message={updateData?.message} type="success" />
      <Alert message={deleteData?.message} type="success" />
      <div className="card-body">
        <div className="gap-3 d-flex flex-wrap">
        {logData?.payload?.user?.curd?.includes("create") &&
        
          <FullscreenModal
            className="col-md-6"
            id="recordTrip"
            title="Record a Trip"
            onSave={handleSubmit}
          >
            <form className="w-100 from-scrollbar px-3" onSubmit={handleSubmit}>
              <Alert message={createError?.data?.message} type="danger" />
              <Alert message={createData?.message} type="success" />
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
                    {inspections?.payload?.inspections?.map((item, index) => {
                      return (
                        <option key={index} value={item?._id}>
                          {item?.transport}
                        </option>
                      );
                    })}

                    {/* Add more vehicle inspection options here */}
                  </select>
                </div>

                {/* Date of Service */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="dateOfService" className="form-label">
                    Date of service <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    id="id"
                    name="dateOfService"
                    value={formData?.dateOfService}
                    onChange={handleChange}
                    className="form-control"
                  />
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
                    {routes?.payload?.routes?.map((item, index) => {
                      return (
                        <option key={index} value={item?._id}>
                          {item?.routeName}
                        </option>
                      );
                    })}
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
                  <label htmlFor="startOdometerReading" className="form-label">
                    Start Odometer Reading{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="startOdometerReading"
                    name="startOdometerReading"
                    className="form-control"
                    value={formData.startOdometerReading}
                    onChange={handleChange}
                    placeholder="Start Odometer Reading"
                    required
                  />
                </div>

                {/* End Odometer Reading */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="endOdometerReading" className="form-label">
                    End Odometer Reading <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="endOdometerReading"
                    name="endOdometerReading"
                    className="form-control"
                    value={formData.endOdometerReading}
                    onChange={handleChange}
                    placeholder="End Odometer Reading"
                    required
                  />
                </div>

                {/* General Comment */}
                <div className="col-md-12 mb-3">
                  <label htmlFor="generalComment" className="form-label">
                    General Comment
                  </label>
                  <textarea
                    id="generalComment"
                    name="generalComment"
                    className="form-control"
                    value={formData.generalComment}
                    onChange={handleChange}
                    placeholder="General Comment"
                  />
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">
                  Record Trip
                </button>
              </div>
            </form>
          </FullscreenModal>
        }
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
          {logData?.payload?.user?.curd?.includes("delete") &&
          
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
          }
            {logData?.payload?.user?.curd?.includes("delete") &&
            
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
            }
        </div>
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={data?.payload?.trips ?? []}
            tableClassName="custom-table"
            onEdit={handleEdit}
            onDelete={handleDelete}
            tableName="viewLog"
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleViewLog;
