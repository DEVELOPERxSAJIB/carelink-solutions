
import DataTable from "./../../components/Tables/DynamicTable";

import { useNavigate } from "react-router-dom";
import { FaRegFolder, FaRegFolderOpen } from "react-icons/fa";
import useFormFields from './../../hook/useFormHook';
import FullscreenModal from './../../components/Models/FullScreenModel';
import TableHeader from './../../components/Tables/TableHeader';

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

const Tar = () => {
  const { start, end } = getCurrentWeekDateRange();
  const navigate = useNavigate();
  const columns = [
    { header: "S.No", field: "serialNumber" },
    { header: "Code", field: "code" },
    { header: "Individual Name", field: "individualName" },
    { header: "Created By", field: "createdBy" },
    { header: "Created On", field: "createdOn" },
    { header: "Is Published?", field: "isPublished" },
    { header: "Status", field: "status" },
  ];

  const data = [
    {
      serialNumber: 1,
      code: "1452",
      individualName: "Md Sajib",
      email: "john.doe@example.com",
      createdBy: "Admin",
      createdOn : "25 March 2009",
      isPublished: "True",
      status: "Active",
    },
    {
      serialNumber: 2,
      code : "5412",
      individualName: "Jane",
      email: "jane.smith@example.com",
      createdBy: "Manager",
      createdOn : "15 July 2016",
      isPublished: "False",
      status: "Inactive",
    },
    // Add more rows as needed
  ];

  const handleEdit = (rowData) => {
    alert(`Editing ${rowData.firstName} ${rowData.lastName}`);
    // Implement edit logic here
  };

  const handleDelete = (rowData) => {
    alert(`Deleting ${rowData.firstName} ${rowData.lastName}`);
    // Implement delete logic here
  };
  const initialState = {
    individual: "",
    firstName: "",
    lastName: "",
    gender: "",
    address: "",
    dateOfBirth: "",
    telephoneNumber: "",
    emailAddress: "",
    medicaidNumber: "",
    medicareNumber: "",
    diagnosis: "",
    allergies: "",
    specialDiet: "",
    admissionDate: "",
    roomNumber: "",
    bedNumber: "",
    chartingFrom: "",
    chartingTo: "",
    primaryPhysicianFirstName: "",
    primaryPhysicianLastName: "",
    primaryPhysicianAddress: "",
    primaryPhysicianEmail: "",
    primaryPhysicianTelephone: "",
    houseOrder: "",
    medicationBrandName: "",
    medicationGenericName: "",
    direction: "",
    reason: "",
    route: "",
    orderDate: "",
    frequencyType: "",
    addBloodPressure: false,
    addBloodSugar: false,
    addBowelMovement: false,
    prescribingPhysicianName: "",
    prescribingPhysicianTelephone: "",
    routineMedication: false,
    controlledMedication: false,
    prnMedication: false,
    treatmentPrescription: false,
    numberOfRefill: "",
    expirationDate: "",
    sideEffects: "",
  };

  const [formData, handleChange, resetForm] = useFormFields(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    // onSave(formData); // Pass formData to parent component or handle saving logic
    resetForm(); // Reset form fields after submission
  };
 
  return (
    <div className="card">
      <TableHeader title="Treatment Administration Records" className="py-3 pt-5 fs-3 card-header"/>
      <div className="card-body">
        <div className="gap-3 d-flex flex-wrap">
        <FullscreenModal
            title="Add New TAR"
            id="Add_medical_TAR"
            className="col-md-8"
          >
            <form onSubmit={handleSubmit} className="from-scrollbar px-4">
              <div className="row">
                <div className="mb-3 col-md-6">
                  <label htmlFor="individual" className="form-label ">
                    Choose Individual
                  </label>
                  <select
                    id="individual"
                    name="individual"
                    className="form-select"
                    value={formData.individual}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Individual</option>
                    <option value="Abdirahman Mohamed">
                      Abdirahman Mohamed (Abdirahman@gmail.com)
                    </option>
                  </select>
                </div>

                <div className="mb-3 col-md-6">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="form-control"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="form-control"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <label htmlFor="gender" className="form-label">
                    Gender
                  </label>
                  <input
                    type="text"
                    id="gender"
                    name="gender"
                    className="form-control"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="form-control"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <label htmlFor="dateOfBirth" className="form-label">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    className="form-control"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <label htmlFor="telephoneNumber" className="form-label">
                    Telephone Number
                  </label>
                  <input
                    type="text"
                    id="telephoneNumber"
                    name="telephoneNumber"
                    className="form-control"
                    value={formData.telephoneNumber}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <label htmlFor="emailAddress" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="emailAddress"
                    name="emailAddress"
                    className="form-control"
                    value={formData.emailAddress}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <label htmlFor="medicaidNumber" className="form-label">
                    Medicaid Number
                  </label>
                  <input
                    type="text"
                    id="medicaidNumber"
                    name="medicaidNumber"
                    className="form-control"
                    value={formData.medicaidNumber}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <label htmlFor="medicareNumber" className="form-label">
                    Medicare Number
                  </label>
                  <input
                    type="text"
                    id="medicareNumber"
                    name="medicareNumber"
                    className="form-control"
                    value={formData.medicareNumber}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <label htmlFor="diagnosis" className="form-label">
                    Diagnosis
                  </label>
                  <input
                    type="text"
                    id="diagnosis"
                    name="diagnosis"
                    className="form-control"
                    value={formData.diagnosis}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <label htmlFor="allergies" className="form-label">
                    Allergies
                  </label>
                  <input
                    type="text"
                    id="allergies"
                    name="allergies"
                    className="form-control"
                    value={formData.allergies}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <label htmlFor="specialDiet" className="form-label">
                    Special Diet
                  </label>
                  <input
                    type="text"
                    id="specialDiet"
                    name="specialDiet"
                    className="form-control"
                    value={formData.specialDiet}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <label htmlFor="admissionDate" className="form-label">
                    Admission Date
                  </label>
                  <input
                    type="date"
                    id="admissionDate"
                    name="admissionDate"
                    className="form-control"
                    value={formData.admissionDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <label htmlFor="roomNumber" className="form-label">
                    Room Number
                  </label>
                  <input
                    type="text"
                    id="roomNumber"
                    name="roomNumber"
                    className="form-control"
                    value={formData.roomNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <label htmlFor="bedNumber" className="form-label">
                    Bed Number
                  </label>
                  <input
                    type="text"
                    id="bedNumber"
                    name="bedNumber"
                    className="form-control"
                    value={formData.bedNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <label htmlFor="chartingFrom" className="form-label">
                    Charting From
                  </label>
                  <input
                    type="date"
                    id="chartingFrom"
                    name="chartingFrom"
                    className="form-control"
                    value={formData.chartingFrom}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <label htmlFor="chartingTo" className="form-label">
                    Charting To
                  </label>
                  <input
                    type="date"
                    id="chartingTo"
                    name="chartingTo"
                    className="form-control"
                    value={formData.chartingTo}
                    onChange={handleChange}
                  />
                </div>

                <h5>Primary Physician Details</h5>

                <div className="mb-3 col-md-6">
                  <label
                    htmlFor="primaryPhysicianFirstName"
                    className="form-label"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="primaryPhysicianFirstName"
                    name="primaryPhysicianFirstName"
                    className="form-control"
                    value={formData.primaryPhysicianFirstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <label
                    htmlFor="primaryPhysicianLastName"
                    className="form-label"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="primaryPhysicianLastName"
                    name="primaryPhysicianLastName"
                    className="form-control"
                    value={formData.primaryPhysicianLastName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <label
                    htmlFor="primaryPhysicianAddress"
                    className="form-label"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="primaryPhysicianAddress"
                    name="primaryPhysicianAddress"
                    className="form-control"
                    value={formData.primaryPhysicianAddress}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <label htmlFor="primaryPhysicianEmail" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="primaryPhysicianEmail"
                    name="primaryPhysicianEmail"
                    className="form-control"
                    value={formData.primaryPhysicianEmail}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <label
                    htmlFor="primaryPhysicianTelephone"
                    className="form-label"
                  >
                    Telephone Number
                  </label>
                  <input
                    type="text"
                    id="primaryPhysicianTelephone"
                    name="primaryPhysicianTelephone"
                    className="form-control"
                    value={formData.primaryPhysicianTelephone}
                    onChange={handleChange}
                  />
                </div>

                <h5>House Order</h5>

                <div className="mb-3 col-md-6">
                  <label htmlFor="houseOrder" className="form-label">
                    House Order
                  </label>
                  <input
                    type="text"
                    id="houseOrder"
                    name="houseOrder"
                    className="form-control"
                    value={formData.houseOrder}
                    onChange={handleChange}
                  />
                </div>

                <h5>Medication/Direction Details</h5>

                <div className="mb-3 col-md-6">
                  <label htmlFor="medicationBrandName" className="form-label">
                    Medication Brand Name
                  </label>
                  <input
                    type="text"
                    id="medicationBrandName"
                    name="medicationBrandName"
                    className="form-control"
                    value={formData.medicationBrandName}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <label htmlFor="medicationGenericName" className="form-label">
                    Medication Generic Name
                  </label>
                  <input
                    type="text"
                    id="medicationGenericName"
                    name="medicationGenericName"
                    className="form-control"
                    value={formData.medicationGenericName}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <label htmlFor="direction" className="form-label">
                    Direction
                  </label>
                  <textarea
                    id="direction"
                    name="direction"
                    className="form-control"
                    value={formData.direction}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <label htmlFor="reason" className="form-label">
                    Reason
                  </label>
                  <input
                    type="text"
                    id="reason"
                    name="reason"
                    className="form-control"
                    value={formData.reason}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <label htmlFor="route" className="form-label">
                    Route
                  </label>
                  <select
                    id="route"
                    name="route"
                    className="form-select"
                    value={formData.route}
                    onChange={handleChange}
                  >
                    <option value="">Select Route</option>
                    <option value="oral">Oral</option>
                    <option value="intravenous">Intravenous</option>
                    {/* Add other routes as needed */}
                  </select>
                </div>

                <div className="mb-3 col-md-6">
                  <label htmlFor="orderDate" className="form-label">
                    Order Date
                  </label>
                  <input
                    type="date"
                    id="orderDate"
                    name="orderDate"
                    className="form-control"
                    value={formData.orderDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <label htmlFor="frequencyType" className="form-label">
                    Frequency Type
                  </label>
                  <select
                    id="frequencyType"
                    name="frequencyType"
                    className="form-select"
                    value={formData.frequencyType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Frequency Type</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    {/* Add other frequency types as needed */}
                  </select>
                </div>

                <div className="form-check mb-3 col-md-12 ">
                  <input
                    type="checkbox"
                    id="addBloodPressure"
                    name="addBloodPressure"
                    className="form-check-input"
                    checked={formData.addBloodPressure}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="addBloodPressure"
                    className="form-check-label"
                  >
                    Add Blood Pressure
                  </label>
                </div>

                <div className="form-check mb-3 col-md-12 ">
                  <input
                    type="checkbox"
                    id="addBloodSugar"
                    name="addBloodSugar"
                    className="form-check-input"
                    checked={formData.addBloodSugar}
                    onChange={handleChange}
                  />
                  <label htmlFor="addBloodSugar" className="form-check-label">
                    Add Blood Sugar
                  </label>
                </div>

                <div className="form-check mb-3 col-md-12 ">
                  <input
                    type="checkbox"
                    id="addBowelMovement"
                    name="addBowelMovement"
                    className="form-check-input"
                    checked={formData.addBowelMovement}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="addBowelMovement"
                    className="form-check-label"
                  >
                    Add Bowel Movement
                  </label>
                </div>

                <div className="mb-3 col-md-6">
                  <label
                    htmlFor="prescribingPhysicianName"
                    className="form-label"
                  >
                    Prescribing Physician First & Last Name
                  </label>
                  <input
                    type="text"
                    id="prescribingPhysicianName"
                    name="prescribingPhysicianName"
                    className="form-control"
                    value={formData.prescribingPhysicianName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <label
                    htmlFor="prescribingPhysicianTelephone"
                    className="form-label"
                  >
                    Prescribing Physician Telephone Number
                  </label>
                  <input
                    type="text"
                    id="prescribingPhysicianTelephone"
                    name="prescribingPhysicianTelephone"
                    className="form-control"
                    value={formData.prescribingPhysicianTelephone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-check mb-3 col-md-12 ">
                  <input
                    type="checkbox"
                    id="routineMedication"
                    name="routineMedication"
                    className="form-check-input"
                    checked={formData.routineMedication}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="routineMedication"
                    className="form-check-label"
                  >
                    Is this prescription a routine medication?
                  </label>
                </div>

                <div className="form-check mb-3 col-md-12 ">
                  <input
                    type="checkbox"
                    id="controlledMedication"
                    name="controlledMedication"
                    className="form-check-input"
                    checked={formData.controlledMedication}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="controlledMedication"
                    className="form-check-label"
                  >
                    Is this a controlled medication?
                  </label>
                </div>

                <div className="form-check mb-3 col-md-12 ">
                  <input
                    type="checkbox"
                    id="prnMedication"
                    name="prnMedication"
                    className="form-check-input"
                    checked={formData.prnMedication}
                    onChange={handleChange}
                  />
                  <label htmlFor="prnMedication" className="form-check-label">
                    Is this medication a PRN?
                  </label>
                </div>

                <div className="form-check mb-3 col-md-12 ">
                  <input
                    type="checkbox"
                    id="treatmentPrescription"
                    name="treatmentPrescription"
                    className="form-check-input"
                    checked={formData.treatmentPrescription}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="treatmentPrescription"
                    className="form-check-label"
                  >
                    Is this prescription a treatment?
                  </label>
                </div>

                <div className="mb-3 col-md-6">
                  <label htmlFor="numberOfRefill" className="form-label">
                    Number of Refill
                  </label>
                  <input
                    type="number"
                    id="numberOfRefill"
                    name="numberOfRefill"
                    className="form-control"
                    value={formData.numberOfRefill}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <label htmlFor="expirationDate" className="form-label">
                    Expiration Date
                  </label>
                  <input
                    type="date"
                    id="expirationDate"
                    name="expirationDate"
                    className="form-control"
                    value={formData.expirationDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <label htmlFor="sideEffects" className="form-label">
                    Side Effects (If any)
                  </label>
                  <textarea
                    id="sideEffects"
                    name="sideEffects"
                    className="form-control"
                    value={formData.sideEffects}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </form>
          </FullscreenModal>
          <button
            className="btn btn-secondary create-new btn-danger waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span>
              <i className="ti ti-trash me-sm-1" />{" "}
              <span className="d-none d-sm-inline-block">Delete selected</span>
            </span>
          </button>
          <button
            style={{ background: "#9fd74d", color: "#fff"}}
            className="btn waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <FaRegFolder size={22} className="me-1" />{" "}
              <span className="d-none d-sm-inline-block">Active TAR</span>
            </span>
          </button>
          <button
            className="btn btn-danger waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <FaRegFolderOpen size={22} className="me-1" />{" "}
              <span className="d-none d-sm-inline-block">InActive TAR</span>
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

export default Tar;
