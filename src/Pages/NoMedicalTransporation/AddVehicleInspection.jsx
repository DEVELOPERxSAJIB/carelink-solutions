import React, { useState, useEffect } from "react";
import SingleSearchSelect from "./../../components/FormElement/SingleSearchSelect";
import PageHeader from "./../../components/FormElement/PageHeader";
import useFormFields from "./../../hook/useFormHook";
import { useCreateInspectionMutation } from "../../Redux/api/InspectionApi.js";
import { useNavigate } from "react-router-dom";
import Alert from "./../../components/Alert/Alert";

const AddVehicleInspection = () => {
  const navigate = useNavigate();
  const [transport, setTransport] = useState("");
  const [createInspection, { data, error, isSuccess }] =
    useCreateInspectionMutation();
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
    transport:""
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    formData.transport=transport.value
    //console.log("Inspection Data:", formData);
    createInspection(formData);
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

  useEffect(() => {
    if (isSuccess) {
      navigate("/view-vehicle-inspection");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="card mt-5">
      <PageHeader title="Vehicle Inspection Log" className="card-header fs-3" />
      <div className="card-body">
        <Alert message={error?.data?.message} type="danger" />
        <Alert message={data?.message} type="success" />
        <form onSubmit={handleSubmit}>
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
      </div>
    </div>
  );
};

export default AddVehicleInspection;
