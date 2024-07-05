import  { useState } from "react";
import SingleSearchSelect from './../../components/FormElement/SingleSearchSelect';
import PickDate from './../../components/FormElement/DatePicker';
import PageHeader from './../../components/FormElement/PageHeader';

const AddVehicleInspection = () => {
  const [formData, setFormData] = useState({
    secureStorage: true,
    twoWayCommunication: false,
    fireExtinguisher: false,
    firstAidKit: false,
    lights: false,
    windshieldWipers: true,
    emergencyEquipment: false,
    mirrors: false,
    horn: false,
    tires: false,
    brakes: true,
    seatBelt: false,
    wheelchairFasteners: false,
    restraints: false,
    accessRamp: true,
    inspectionDate: "2024-07-04",
  });

  const handleChange = (event) => {
    const { name, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Inspection Data:", formData);
    // Perform form submission logic here
  };
 const options=[
  {
    value:"Select License Plate Number",
    label:"Select License Plate Number"
  },
  {
    value:"TY444 - Non medical transport",
    label:"TY444 - Non medical transport"
  }
 ]
  return (
    <div className="card mt-5">

     <PageHeader title="Vehicle Inspection Log" className="card-header fs-3"/>
      <div className="card-body">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Inspection Date:</label>
          <PickDate/>
        </div>

        <h3>Vehicle Equipment Check</h3>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="secureStorage"
            checked={formData.secureStorage}
            onChange={handleChange}
          />
          <label className="form-check-label">Secure storage space</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="twoWayCommunication"
            checked={formData.twoWayCommunication}
            onChange={handleChange}
          />
          <label className="form-check-label">Two-Way Communication</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="fireExtinguisher"
            checked={formData.fireExtinguisher}
            onChange={handleChange}
          />
          <label className="form-check-label">
            Fire extinguisher and an emergency first-aid kit that are safely
            secured
          </label>
        </div>

        <h3>Daily Inspection Items</h3>
        {[
          "lights",
          "windshieldWipers",
          "emergencyEquipment",
          "mirrors",
          "horn",
          "tires",
          "brakes",
          "seatBelt",
        ].map((item) => (
          <div className="form-check" key={item}>
            <input
              className="form-check-input"
              type="checkbox"
              name={item}
              checked={formData[item]}
              onChange={handleChange}
            />
            <label className="form-check-label">
              {item.charAt(0).toUpperCase() +
                item.slice(1).replace(/([A-Z])/g, " $1")}
            </label>
          </div>
        ))}

        <h3>Modified Vehicle Items (if applicable)</h3>
        {["wheelchairFasteners", "restraints", "accessRamp"].map((item) => (
          <div className="form-check" key={item}>
            <input
              className="form-check-input"
              type="checkbox"
              name={item}
              checked={formData[item]}
              onChange={handleChange}
            />
            <label className="form-check-label">
              {item.charAt(0).toUpperCase() +
                item.slice(1).replace(/([A-Z])/g, " $1")}
            </label>
          </div>
        ))}
         <SingleSearchSelect options={options}/>
        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
      </div>
    </div>
  );
};

export default AddVehicleInspection;
