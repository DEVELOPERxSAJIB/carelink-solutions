import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/Tables/DynamicTable";
import {
  useGetAllInspectionsQuery,
  useUpdateInspectionMutation,
  useDeleteInspectionMutation,
} from "../../Redux/api/InspectionApi.js";
import TableHeader from "./../../components/Tables/TableHeader";
import EditModal from "./../../components/Models/EditModal";
import SingleSearchSelect from "./../../components/FormElement/SingleSearchSelect";
import useFormFields from "./../../hook/useFormHook";
import Alert from "./../../components/Alert/Alert";
import MainLoader from "./../../utils/Loaders/MainLoader";
import { useMeQuery } from "../../Redux/api/UserApi";
// Function to get the start and end dates of the current week
const ViewVehicleInspection = () => {
  const { data: logData } = useMeQuery();
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useGetAllInspectionsQuery();
  const [
    updateInspection,
    { data: updateData, isSuccess: isUpdateSuccess, error: updateError },
  ] = useUpdateInspectionMutation();
  const [deleteInspection, { data: deleteData, isSuccess: isDeleteSuccess }] =
    useDeleteInspectionMutation();
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(false);
  const columns = [
    { field: "inspectionDate", header: "Inspection Date" },
    { field: "secureStorage", header: "Secure Storage" },
    { field: "twoWayCommunication", header: "Two-Way Communication" },
    { field: "fireExtinguisher", header: "Fire Extinguisher" },
    { field: "emergencyFirstAidKit", header: "Emergency First Aid Kit" },
    { field: "lights", header: "Lights" },
    { field: "windshieldWipers", header: "Windshield Wipers" },
    { field: "emergencyEquipment", header: "Emergency Equipment" },
    { field: "mirrors", header: "Mirrors" },
    { field: "horn", header: "Horn" },
    { field: "tires", header: "Tires" },
    { field: "brakes", header: "Brakes" },
    { field: "seatBelt", header: "Seat Belt" },
    { field: "wheelchairFasteners", header: "Wheelchair Fasteners" },
    { field: "restraints", header: "Restraints" },
    { field: "accessRamp", header: "Access Ramp" },
    { field: "transport", header: "Transport" },
  ];
  const [transport, setTransport] = useState({});
  const [formData, handleChange, setFormData, resetForm] = useFormFields({
    secureStorage: "No",
    twoWayCommunication: "No",
    fireExtinguisher: "No",
    emergencyFirstAidKit: "Not Secured",
    lights: "Not Working",
    windshieldWipers: "Not Working",
    emergencyEquipment: "No",
    mirrors: "Not Working",
    horn: "No",
    tires: "No",
    brakes: "No",
    seatBelt: "No",
    wheelchairFasteners: "Not Secured",
    restraints: "Not Secured",
    accessRamp: "Not Functional",
    inspectionDate: "2024-07-04",
    transport: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    formData.transport = transport?.value;
    updateInspection({ inspectionId: editId, inspectionData: formData });
  };

  const options = [
    {
      value: "Select License Plate Number",
      label: "Select License Plate Number",
    },
    {
      value: "TY444 - Non medical transport",
      label: "TY444 - Non medical transport",
    },
  ];

  // Function to update formData based on checkbox state
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    let value;

    // Adjust value based on checkbox name
    if (
      name === "secureStorage" ||
      name === "twoWayCommunication" ||
      name === "emergencyEquipment" ||
      name === "horn" ||
      name === "tires" ||
      name === "fireExtinguisher" ||
      name === "seatBelt" ||
      name === "brakes"
    ) {
      value = checked ? "Yes" : "No";
    } else if (
      name === "emergencyFirstAidKit" ||
      name === "wheelchairFasteners" ||
      name === "restraints"
    ) {
      value = checked ? "Secure" : "Not Secured";
    } else if (
      name === "lights" ||
      name === "windshieldWipers" ||
      name === "mirrors"
    ) {
      value = checked ? "Working" : "Not Working";
    } else if (name === "accessRamp") {
      value = checked ? "Functional" : "Not Functional";
    }

    setFormData({ ...formData, [name]: value });
  };

  // Function to determine label class based on checkbox value
  const getLabelClass = (value) => {
    return value === "Yes" ||
      value === "Secure" ||
      value === "Working" ||
      value === "Functional"
      ? "text-success"
      : "text-danger";
  };
  const handleEdit = (row) => {
    setShow(true);
    setEditId(row._id);
    //console.log(row.transport);

    if (row.transport) {
      setTransport({ value: row.transport, label: row.transport });
    } else {
      setTransport({ value: "", label: "" });
    }

    //console.log({ value: row.transport, label: row.transport });

    const updateRow = { ...row };
    updateRow.inspectionDate = new Date(updateRow.inspectionDate)
      .toISOString()
      .slice(0, 10);
    setFormData(updateRow);
  };

  const handleDelete = (row) => {
    deleteInspection(row._id);
  };
  useEffect(() => {
    if (isUpdateSuccess) {
      setShow(false);
      refetch();
    }
    if (isDeleteSuccess) {
      refetch();
    }
  }, [isUpdateSuccess, isDeleteSuccess]);

  if (isLoading) return <MainLoader />;
  return (
    <div className="card">
      <TableHeader
        title="Vehicle Inspection Log"
        className="py-3 pt-5 fs-3 card-header"
      />
      <Alert message={updateData?.message} type="success" />
      <Alert message={deleteData?.message} type="success" />
      {show && (
        <EditModal
          onClose={setShow}
          title="Edit Inspection"
          style={{
            minWidth: "50%",
            maxWidth: "50%",
            maxHeight: "80vh",
            overflowY: "scroll",
          }}
        >
          <form onSubmit={handleSubmit}>
            <Alert message={updateError?.data?.message} type="danger" />
            <div className="mb-3">
              <label className="form-label">Inspection Date:</label>
              <input
                name="inspectionDate"
                value={formData.inspectionDate}
                onChange={handleChange}
                type="date"
                className="form-control"
              />
            </div>

            <h3>Vehicle Equipment Check</h3>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="secureStorage"
                checked={formData.secureStorage === "Yes"}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label">
                Secure storage space:{" "}
                <span className={getLabelClass(formData.secureStorage)}>
                  {formData.secureStorage}
                </span>
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="twoWayCommunication"
                checked={formData.twoWayCommunication === "Yes"}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label">
                Two-Way Communication:{" "}
                <span className={getLabelClass(formData.twoWayCommunication)}>
                  {formData.twoWayCommunication}
                </span>
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="fireExtinguisher"
                checked={formData.fireExtinguisher === "Yes"}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label">
                Fire extinguisher and emergency first-aid kit:{" "}
                <span className={getLabelClass(formData.fireExtinguisher)}>
                  {formData.fireExtinguisher}
                </span>
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="emergencyFirstAidKit"
                checked={formData.emergencyFirstAidKit === "Secure"}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label">
                Emergency First Aid Kit:{" "}
                <span className={getLabelClass(formData.emergencyFirstAidKit)}>
                  {formData.emergencyFirstAidKit}
                </span>
              </label>
            </div>

            <h3>Daily Inspection Items</h3>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="lights"
                checked={formData.lights === "Working"}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label">
                Lights:{" "}
                <span className={getLabelClass(formData.lights)}>
                  {formData.lights}
                </span>
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="windshieldWipers"
                checked={formData.windshieldWipers === "Working"}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label">
                Windshield Wipers:{" "}
                <span className={getLabelClass(formData.windshieldWipers)}>
                  {formData.windshieldWipers}
                </span>
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="mirrors"
                checked={formData.mirrors === "Working"}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label">
                Mirrors:{" "}
                <span className={getLabelClass(formData.mirrors)}>
                  {formData.mirrors}
                </span>
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="horn"
                checked={formData.horn === "Yes"}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label">
                Horn:{" "}
                <span className={getLabelClass(formData.horn)}>
                  {formData.horn}
                </span>
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="tires"
                checked={formData.tires === "Yes"}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label">
                Tires:{" "}
                <span className={getLabelClass(formData.tires)}>
                  {formData.tires}
                </span>
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="brakes"
                checked={formData.brakes === "Yes"}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label">
                Brakes:{" "}
                <span className={getLabelClass(formData.brakes)}>
                  {formData.brakes}
                </span>
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="seatBelt"
                checked={formData.seatBelt === "Yes"}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label">
                Seat Belt:{" "}
                <span className={getLabelClass(formData.seatBelt)}>
                  {formData.seatBelt}
                </span>
              </label>
            </div>

            <h3>Vehicle Safety Equipment</h3>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="wheelchairFasteners"
                checked={formData.wheelchairFasteners === "Secure"}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label">
                Wheelchair Fasteners:{" "}
                <span className={getLabelClass(formData.wheelchairFasteners)}>
                  {formData.wheelchairFasteners}
                </span>
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="restraints"
                checked={formData.restraints === "Secure"}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label">
                Restraints:{" "}
                <span className={getLabelClass(formData.restraints)}>
                  {formData.restraints}
                </span>
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="accessRamp"
                checked={formData.accessRamp === "Functional"}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label">
                Access Ramp:{" "}
                <span className={getLabelClass(formData.accessRamp)}>
                  {formData.accessRamp}
                </span>
              </label>
            </div>
            {/* const [transport,setTransport] = useState("") */}
            <SingleSearchSelect
              options={options}
              selected={transport}
              setSelected={setTransport}
            />
            <div className="mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <button
                type="button"
                className="btn btn-secondary ms-3"
                onClick={resetForm}
              >
                Reset
              </button>
            </div>
          </form>
        </EditModal>
      )}
      <div className="card-body">
        <div className="gap-3 d-flex flex-wrap">
          {logData?.payload?.user?.curd?.includes("create") && (
            <button
              onClick={() => navigate("/add-vehicle-inspection")}
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
          )}
          {logData?.payload?.user?.curd?.includes("create") && (
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
          )}
          {logData?.payload?.user?.curd?.includes("create") && (
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
          )}
          {logData?.payload?.user?.curd?.includes("create") && (
            <button
              className="btn btn-info waves-effect waves-light"
              tabIndex={0}
              aria-controls="DataTables_Table_0"
              type="button"
            >
              <span className="d-flex align-items-center">
                <i className="ti ti-archive me-1" />
                <span className=" d-sm-inline-block">Archive </span>
              </span>
            </button>
          )}
        </div>
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={data?.payload?.inspections ?? []}
            tableClassName="custom-table"
            onEdit={handleEdit}
            onDelete={handleDelete}
            tableName="viewVehicleInspection"
          />
        </div>
      </div>
    </div>
  );
};

export default ViewVehicleInspection;
