import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/Tables/DynamicTable";
import TableHeader from "./../../components/Tables/TableHeader";
import EditModal from "./../../components/Models/EditModal";
import useFormFields from "./../../hook/useFormHook";
import { useGetAllSubUsersQuery } from "../../Redux/api/SubUserApi";

import DatePicker from "react-datepicker";
import SingleSearchSelect from "./../../components/FormElement/SingleSearchSelect";
import swal from "sweetalert";
import {
  useGetAllMileageLogsQuery,
  useUpdateMileageLogMutation,
  useDeleteMileageLogMutation,
} from "../../Redux/api/MileAgeLogApi.js";

const MileageLog = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [selected, setSelected] = useState("");
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState("");
  const { data: subUsers } = useGetAllSubUsersQuery();
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useGetAllMileageLogsQuery();
  const [
    updateMileageLog,
    { data: updateData, isSuccess: isUpdateSuccess, error: updateError },
  ] = useUpdateMileageLogMutation();
  const [
    deleteMileageLog,
    { data: deleteData, isSuccess: isDeleteSuccess, error: deleteError },
  ] = useDeleteMileageLogMutation();
  const columns = [
    { header: "Id", field: "_id" },
    { header: "Date of Service", field: "dateOfService" },
    { header: "From Location", field: "fromWhere" },
    { header: "Vehicle Typ", field: "vehicleType" },
    { header: "Trip Type", field: "tripType" },
    { header: "Total Miles Driven", field: "totalMiles" },
    { header: "License Plate Number", field: "licensePlateNumber" },
    { header: "Ending Mileage", field: "endingMileage" },
    { header: "Activity description", field: "activityDescription" },
    { header: "Added By", field: "addedBy" },
    { header: "Added On", field: "createdAt" },
  ];
  const initialState = {
    dateOfService: startDate,
    mileageType: "share",
    vehicleType: "regular",
    individual: "",
    initialMileage: "",
    licensePlateNumber: selected,
    startingMileage: "",
    tripType: "round",
    fromWhere: "",
    totalMiles: "",
    endingMileage: "",
    activityDescription: "",
  };
  const [formData, handleChange, setFormData] = useFormFields(initialState);

  const handleEdit = (rowData) => {
    setEditId(rowData._id);
    setShow(true);
    setFormData({
      dateOfService: rowData.dateOfService,
      mileageType: rowData.mileageType,
      vehicleType: rowData.vehicleType,
      individual: rowData.individual?._id,
      initialMileage: rowData.initialMileage,
      licensePlateNumber: rowData.licensePlateNumber,
      startingMileage: rowData.startingMileage,
      tripType: rowData.tripType,
      fromWhere: rowData.fromWhere,
      totalMiles: rowData.totalMiles,
      endingMileage: rowData.endingMileage,
      activityDescription: rowData.activityDescription,
    });
  };

  const handleDelete = (rowData) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
        deleteMileageLog(rowData?._id);
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMileageLog({
        mileageLogId: editId,
        mileageLogData: formData,
      });
    } catch (error) {
      console.error("Error creating Mileage Log:", error);
    }
  };

  useEffect(() => {
    if (isUpdateSuccess) {
      refetch();
      setShow(false);
    }
    if (isDeleteSuccess) {
      refetch();
    }
  }, [isUpdateSuccess, isDeleteSuccess]);
  return (
    <div className="card">
      <TableHeader title="Mileage Log" className="py-3 pt-5 fs-3 card-header" />
      <div className="card-body">
        {deleteData?.message && (
          <div className="alert alert-success text-center">
            {deleteData.message}
          </div>
        )}
        {deleteError?.data?.message && (
          <div className="alert alert-danger text-center">
            {deleteError?.data?.message}
          </div>
        )}
        {updateData?.message && (
          <div className="alert alert-success text-center">
            {updateData.message}
          </div>
        )}
       
        <div className="gap-3 d-flex flex-wrap">
          <button
            onClick={() => navigate("/add-new-mileage")}
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
            style={{ background: "#9fd74d", color: "#fff" }}
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
              <span className="d-none d-sm-inline-block">Archive </span>
            </span>
          </button>
        </div>
        {show && (
          <EditModal onClose={setShow} title="Edit Mileage Log">
            <form className="card-body" onSubmit={handleSubmit}>
              {updateData?.message && (
                <div className="alert alert-success text-center">
                  {updateData.message}
                </div>
              )}
              {updateError?.data?.message && (
                <div className="alert alert-danger text-center">
                  {updateError?.data?.message}
                </div>
              )}
              <div className="row g-6">
                <div className="col-md-12">
                  <label className="form-label" htmlFor="dateOfService">
                    Date Of Service <span className="text-danger">*</span>
                  </label>
                  <DatePicker
                    id="dateOfService"
                    className="w-100 form-control"
                    selected={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                      setFormData((prevData) => ({
                        ...prevData,
                        dateOfService: date,
                      }));
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">
                    Mileage Type <span className="text-danger">*</span>
                  </label>
                  <div className="mt-2">
                    <div className="form-check form-check-inline">
                      <input
                        name="mileageType"
                        className="form-check-input"
                        type="radio"
                        value="individual"
                        id="individualMileage"
                        checked={formData.mileageType === "individual"}
                        onChange={handleChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="individualMileage"
                      >
                        Individual Mileage
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        name="mileageType"
                        className="form-check-input"
                        type="radio"
                        value="share"
                        id="shareMileage"
                        checked={formData.mileageType === "share"}
                        onChange={handleChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="shareMileage"
                      >
                        Share Mileage
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label">
                    Type of Vehicle <span className="text-danger">*</span>
                  </label>
                  <div className="mt-2">
                    <div className="form-check form-check-inline">
                      <input
                        name="vehicleType"
                        className="form-check-input"
                        type="radio"
                        value="regular"
                        id="regularVehicle"
                        checked={formData.vehicleType === "regular"}
                        onChange={handleChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="regularVehicle"
                      >
                        Regular
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        name="vehicleType"
                        className="form-check-input"
                        type="radio"
                        value="modified"
                        id="modifiedVehicle"
                        checked={formData.vehicleType === "modified"}
                        onChange={handleChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="modifiedVehicle"
                      >
                        Modified
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="licensePlateNumber">
                    Select or enter vehicle license plate number{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <SingleSearchSelect
                    selected={selected}
                    setSelected={setSelected}
                    id="licensePlateNumber"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="individual">
                    Select Individual <span className="text-danger">*</span>
                  </label>
                  <select
                    id="individual"
                    className="form-select"
                    name="individual"
                    value={formData.individual}
                    onChange={handleChange}
                  >
                    <option value="">Select individual</option>
                    {subUsers?.payload?.subUsers.map((item, index) => {
                      return (
                        <option key={index} value={item._id}>
                          {item.firstName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="initialMileage">
                    Initial Mileage <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    id="initialMileage"
                    className="form-control"
                    placeholder="0"
                    name="initialMileage"
                    value={formData.initialMileage}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="startingMileage">
                    Starting Mileage <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    id="startingMileage"
                    className="form-control"
                    placeholder="0"
                    name="startingMileage"
                    value={formData.startingMileage}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">
                    Choose Your Trip <span className="text-danger">*</span>
                  </label>
                  <div className="mt-2">
                    <div className="form-check form-check-inline">
                      <input
                        name="tripType"
                        className="form-check-input"
                        type="radio"
                        value="oneWay"
                        id="oneWayTrip"
                        checked={formData.tripType === "oneWay"}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="oneWayTrip">
                        One way
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        name="tripType"
                        className="form-check-input"
                        type="radio"
                        value="round"
                        id="roundTrip"
                        checked={formData.tripType === "round"}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="roundTrip">
                        Round
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        name="tripType"
                        className="form-check-input"
                        type="radio"
                        value="multipleDestination"
                        id="multipleDestinationTrip"
                        checked={formData.tripType === "multipleDestination"}
                        onChange={handleChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="multipleDestinationTrip"
                      >
                        Multiple Destination
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="fromWhere">
                    From Where <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="fromWhere"
                    className="form-control"
                    placeholder="From where"
                    name="fromWhere"
                    value={formData.fromWhere}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="totalMiles">
                    Total Miles <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <input
                      type="text"
                      id="totalMiles"
                      className="form-control"
                      placeholder="Total miles"
                      name="totalMiles"
                      value={formData.totalMiles}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="endingMileage">
                    Ending Mileage <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="endingMileage"
                    className="form-control"
                    placeholder="Ending mileage"
                    name="endingMileage"
                    value={formData.endingMileage}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="activityDescription">
                    Activity Description <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="activityDescription"
                    className="form-control"
                    placeholder="Activity description"
                    name="activityDescription"
                    value={formData.activityDescription}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Mileage Log"}
                </button>
              </div>
            </form>
          </EditModal>
        )}
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={data?.payload?.mileageLogs ?? []}
            tableClassName="custom-table"
            onEdit={handleEdit}
            tableName="mileageLog"
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default MileageLog;
