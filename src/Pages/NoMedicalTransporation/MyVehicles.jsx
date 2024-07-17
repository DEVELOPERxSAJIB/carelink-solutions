import DataTable from "../../components/Tables/DynamicTable";
import { useState, useEffect } from "react";
import TableHeader from "./../../components/Tables/TableHeader";
import useFormFields from "./../../hook/useFormHook";
import FullscreenModal from "./../../components/Models/FullScreenModel";
import Alert from "./../../components/Alert/Alert";
import AuthLoader from "./../../utils/Loaders/AuthLoader";
import EditModal from "./../../components/Models/EditModal";
import swal  from 'sweetalert';
import {
  useCreateVehicleMutation,
  useGetAllVehiclesQuery,
  useUpdateVehicleMutation,
  useDeleteVehicleMutation,
} from "../../Redux/api/VehicleApi.js";
// Function to get the start and end dates of the current week

const MyVehicles = () => {
  const { data, isLoading, refetch } = useGetAllVehiclesQuery();
  const [createVehicle, { data: createData, error: createError, isSuccess }] =
    useCreateVehicleMutation();
  const [
    updateVehicle,
    { data: updateData, isSuccess: isUpdateSuccess, error: updateError },
  ] = useUpdateVehicleMutation();
  const [deleteVehicle, { data: deleteData, isSuccess: isDeleteSuccess }] =
    useDeleteVehicleMutation();
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState("");
  const columns = [
    { header: "Id", field: "_id" },
    { header: "Vehicle/Bus Number", field: "vehicleBusNumber" },
    { header: "Year Make", field: "yearMake" },
    { header: "Model", field: "model" },
    { header: "Vin Number", field: "vinNumber" },
    { header: "License Plate Number", field: "licensePlateNumber" },
    { header: "Number of Passengers", field: "numberOfPassengers" },
    { header: "Plates Exp date", field: "platesExpDate" },
    { header: "insurance Exp", field: "insuranceExp" },
    { header: "Dot inspection Date", field: "dotInspectionDate" },
    { header: "Created On", field: "createdAt" },
    { header: "Details", field: "vehicleDescription" },
  ];

  const initialState = {
    vehicleBusNumber: "",
    yearMake: "",
    model: "",
    vinNumber: "",
    licensePlateNumber: "",
    numberOfPassengers: 0,
    platesExpDate: "",
    insuranceExp: "",
    dotInspectionDate: "",
    isWheelchairAccessible: false,
    vehicleDescription: "",
  };

  const [formData, handleChange, setFormData, resetForm] =
    useFormFields(initialState);
  const handleEdit = (row) => {
    setShow(true);
    setEditId(row?._id);
    const updateRow = { ...row };
    updateRow.platesExpDate = row.platesExpDate
      ? new Date(row.platesExpDate).toISOString().slice(0, 10)
      : "";
    updateRow.insuranceExp = row.insuranceExp
      ? new Date(row.insuranceExp).toISOString().slice(0, 10)
      : "";
    updateRow.dotInspectionDate = row.dotInspectionDate
      ? new Date(row.dotInspectionDate).toISOString().slice(0, 10)
      : "";

    // Set formData state with updated row data
    setFormData(updateRow);
  };
  const handleDelete = (row) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        
        deleteVehicle(row._id);
      } 
    });
    
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      updateVehicle({vehicleId:editId,vehicleData:formData});
    } else {
      console.log(formData);
      createVehicle(formData);
      resetForm();
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
  if (isLoading) return <AuthLoader />;
  return (
    <div className="card">
      <TableHeader title="Vehicles" className="py-3 pt-5 fs-3 card-header" />
      <Alert message={createData?.message} type="success" />
      <Alert message={updateData?.message} type="success" />
      <Alert message={deleteData?.message} type="success" />
      <div className="card-body">
        <div className="gap-3 d-flex flex-wrap">
          <FullscreenModal
            className="col-md-7"
            id="addVehicle"
            title="Add Vehicle"
            onSave={handleSubmit}
          >
            <Alert message={createError?.data?.message} type="danger" />
            <Alert message={createData?.message} type="success" />
            <form className="w-100 from-scrollbar px-3" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="vehicleBusNumber" className="form-label">
                    Vehicle/Bus Number
                  </label>
                  <input
                    type="text"
                    id="vehicleBusNumber"
                    name="vehicleBusNumber"
                    className="form-control"
                    value={formData?.vehicleBusNumber}
                    onChange={handleChange}
                    placeholder="Vehicle/Bus Number"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="yearMake" className="form-label">
                    Year/Make
                  </label>
                  <input
                    type="text"
                    id="yearMake"
                    name="yearMake"
                    className="form-control"
                    value={formData?.yearMake}
                    onChange={handleChange}
                    placeholder="Year/Make"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="model" className="form-label">
                    Model
                  </label>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    className="form-control"
                    value={formData?.model}
                    onChange={handleChange}
                    placeholder="Model"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="vinNumber" className="form-label">
                    VIN Number
                  </label>
                  <input
                    type="text"
                    id="vinNumber"
                    name="vinNumber"
                    className="form-control"
                    value={formData?.vinNumber}
                    onChange={handleChange}
                    placeholder="VIN Number"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="licensePlateNumber" className="form-label">
                    License Plate Number
                  </label>
                  <input
                    type="text"
                    id="licensePlateNumber"
                    name="licensePlateNumber"
                    className="form-control"
                    value={formData?.licensePlateNumber}
                    onChange={handleChange}
                    placeholder="License Plate Number"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="numberOfPassengers" className="form-label">
                    Number of Passengers
                  </label>
                  <input
                    type="text"
                    id="numberOfPassengers"
                    name="numberOfPassengers"
                    className="form-control"
                    value={formData?.numberOfPassengers}
                    onChange={handleChange}
                    placeholder="Number of Passengers"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="platesExpDate" className="form-label">
                    Plates Exp Date
                  </label>
                  <input
                    type="date"
                    name="platesExpDate"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="insuranceExp" className="form-label">
                    Insurance Exp
                  </label>
                  <input
                    type="date"
                    name="insuranceExp"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="dotInspectionDate" className="form-label">
                    DOT Inspection Date
                  </label>
                  <input
                    type="date"
                    name="dotInspectionDate"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3 form-check">
                  <input
                    type="checkbox"
                    id="wheelchairAccessible"
                    name="wheelchairAccessible"
                    className="form-check-input"
                    checked={formData?.wheelchairAccessible}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="wheelchairAccessible"
                    className="form-check-label"
                  >
                    Is this Vehicle wheelchair accessible?
                  </label>
                </div>
                <div className="col-md-12 mb-3">
                  <label htmlFor="vehicleDescription" className="form-label">
                    Vehicle Description
                  </label>
                  <textarea
                    id="vehicleDescription"
                    name="vehicleDescription"
                    className="form-control"
                    value={formData?.vehicleDescription}
                    onChange={handleChange}
                    placeholder="Vehicle Description"
                  />
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">
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
        {show && (
          <EditModal
            onClose={setShow}
            title="Edit Vehicle"
            style={{
              minWidth: "70%",
              maxWidth: "70%",
              maxHeight: "80vh",
              overflowY: "scroll",
            }}
          >
            <Alert message={updateError?.data?.message} type="danger" />
            <form className="w-100 from-scrollbar px-3" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="vehicleBusNumber" className="form-label">
                    Vehicle/Bus Number
                  </label>
                  <input
                    type="text"
                    id="vehicleBusNumber"
                    name="vehicleBusNumber"
                    className="form-control"
                    value={formData?.vehicleBusNumber}
                    onChange={handleChange}
                    placeholder="Vehicle/Bus Number"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="yearMake" className="form-label">
                    Year/Make
                  </label>
                  <input
                    type="text"
                    id="yearMake"
                    name="yearMake"
                    className="form-control"
                    value={formData?.yearMake}
                    onChange={handleChange}
                    placeholder="Year/Make"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="model" className="form-label">
                    Model
                  </label>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    className="form-control"
                    value={formData?.model}
                    onChange={handleChange}
                    placeholder="Model"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="vinNumber" className="form-label">
                    VIN Number
                  </label>
                  <input
                    type="text"
                    id="vinNumber"
                    name="vinNumber"
                    className="form-control"
                    value={formData?.vinNumber}
                    onChange={handleChange}
                    placeholder="VIN Number"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="licensePlateNumber" className="form-label">
                    License Plate Number
                  </label>
                  <input
                    type="text"
                    id="licensePlateNumber"
                    name="licensePlateNumber"
                    className="form-control"
                    value={formData?.licensePlateNumber}
                    onChange={handleChange}
                    placeholder="License Plate Number"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="numberOfPassengers" className="form-label">
                    Number of Passengers
                  </label>
                  <input
                    type="text"
                    id="numberOfPassengers"
                    name="numberOfPassengers"
                    className="form-control"
                    value={formData?.numberOfPassengers}
                    onChange={handleChange}
                    placeholder="Number of Passengers"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="platesExpDate" className="form-label">
                    Plates Exp Date
                  </label>
                  <input
                    type="date"
                    name="platesExpDate"
                    value={formData.platesExpDate}
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="insuranceExp" className="form-label">
                    Insurance Exp
                  </label>
                  <input
                    type="date"
                    value={formData.insuranceExp}
                    name="insuranceExp"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="dotInspectionDate" className="form-label">
                    DOT Inspection Date
                  </label>
                  <input
                    type="date"
                    value={formData.dotInspectionDate}
                    name="dotInspectionDate"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3 form-check">
                  <input
                    type="checkbox"
                    id="wheelchairAccessible"
                    name="wheelchairAccessible"
                    className="form-check-input"
                    checked={formData?.wheelchairAccessible}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="wheelchairAccessible"
                    className="form-check-label"
                  >
                    Is this Vehicle wheelchair accessible?
                  </label>
                </div>
                <div className="col-md-12 mb-3">
                  <label htmlFor="vehicleDescription" className="form-label">
                    Vehicle Description
                  </label>
                  <textarea
                    id="vehicleDescription"
                    name="vehicleDescription"
                    className="form-control"
                    value={formData?.vehicleDescription}
                    onChange={handleChange}
                    placeholder="Vehicle Description"
                  />
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">
                  Add Vehicle
                </button>
              </div>
            </form>
          </EditModal>
        )}
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={data?.payload?.vehicles ?? []}
            tableClassName="custom-table"
            onEdit={handleEdit}
            tableName="myVehicles"
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default MyVehicles;
