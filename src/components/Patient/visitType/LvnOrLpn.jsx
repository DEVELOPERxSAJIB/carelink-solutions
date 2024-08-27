import { useState } from "react";
import PageHeader from "./../../FormElement/PageHeader";
import Template from "./../../FormElement/Template";

const LvnOrLpn = ({ data }) => {
  const [formData, setFormData] = useState({
    bloodPressureLying: "",
    bloodPressureSitting: "",
    bloodPressureStanding: "",
    weight: "",
    height: "",
    neurological: "",
    respiratory: "",
    painProfile: "",
    responseToCare: "",
    medicalNecessityForCare: "",
    visitNarrative: "",
    followUpInstructions: "",
    providerName: "",
    providerSignature: "",
    providerDate: "",
    patientName: "",
    patientSignature: "",
    patientDate: "",
    authorizedRepresentativeName: "",
    authorizedRepresentativeSignature: "",
    authorizedRepresentativeDate: "",
    temp: "",
    route: "",
    respirations: "",
    o2Saturation: "",
    method: "",
    pulseRate: {
      apical: "",
      radial: "",
    },
    bloodPressure: {
      lyingL: "",
      sittingL: "",
      standingL: "",
      lyingR: "",
      sittingR: "",
      standingR: "",
    },

    bmi: "N/A",
    neurologicalIssues: [],
    respiratoryIssues: [],
    gastrointestinalIssues: [],
    genitourinary: [],
    lastBM: "",
    cardiovascularIssues: [],
    musculoskeletal: [],
    integumentary: [],
    endocrineHematologic: [],
    nutrition: [],
    labs: [],
    infectionControl: [],
    homeboundStatus: [],
    planOfCareReview: [],
    dischargePlanning: [],
    healthManagement: [],

    unableToCollectAllVitals: false,
    additionalMeasurements: {
      fastingBloodGlucose: "",
      randomBloodSugar: "",
      abdGirth: "",
      abdGirthUnit: "in",
    },
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name.includes(".")) {
      const [mainField, subField] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [mainField]: { ...prev[mainField], [subField]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    setFormData((prevIssues) => {
      if (checked) {
        // Add the issue to the array if it's checked
        return [...prevIssues, name];
      } else {
        // Remove the issue from the array if it's unchecked
        return prevIssues.filter((issue) => issue !== name);
      }
    });
  };
  return (
    <form onSubmit={handleSubmit} className="create-patient-form card">
      <div className="card-body">
        <div className="row">
          <div className="col-md-6 d-flex flex-wrap gap-2">
            <button className="btn btn-secondary" disabled="disabled">
              DNR
            </button>
            <button className="btn btn-secondary" disabled="disabled">
              FALL RISK
            </button>
            <button className="btn btn-secondary" disabled="disabled">
              HOSPITALIZATION RISK
            </button>
            <button className="btn btn-secondary" disabled="disabled">
              INFECTION RISK
            </button>
          </div>
          <div className="col-md-6 d-flex flex-wrap gap-2">
            <button className="btn btn-primary">View POC Summary</button>
            <button className="btn btn-primary">View Plan of Care</button>
            <button className="btn btn-primary">LVN/LPN Visit</button>
            <button className="btn btn-primary">Previous Notes</button>
          </div>
        </div>
        <div className="row mt-5">
          <PageHeader title={data.visitType} />
        </div>
        <div className="row">
          <div className="col-md-12 bg-secondary text-center mb-5">
            <h5 className="text-white mb-0 py-1">Visit Information</h5>
          </div>
          <div className="col-md-6">
            <div className="from-group">
              <label className="form-label-input" htmlFor="">
                Visit Date
              </label>
              <input className="form-control" type="date" />
            </div>
            <div className="from-group">
              <label className="form-label-input" htmlFor="">
                Visit Start Time
              </label>
              <input className="form-control" type="time" />
            </div>
            <div className="from-group">
              <label className="form-label-input" htmlFor="">
                Visit End Time
              </label>
              <input className="form-control" type="time" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className=" col-md-6">
                <label htmlFor="" className="form-label-input">
                  Travel Start Time
                </label>
                <input type="time" className="form-control" />
              </div>
              <div className=" col-md-6">
                <label htmlFor="" className="form-label-input">
                  Travel End Time
                </label>
                <input type="time" className="form-control" />
              </div>
              <div className=" col-md-6">
                <label htmlFor="" className="form-label-input">
                  Associated Mileage
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className=" col-md-6">
                <label htmlFor="" className="form-label-input">
                  Surcharge
                </label>
                <input type="text" className="form-control" />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <label htmlFor="" className="form-label">
              Physician Last Visit Date
            </label>
            <input type="date" className="form-control" />
          </div>
          <div className="col-md-4">
            <label htmlFor="" className="form-label">
              Primary Diagnosis
            </label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-4">
            <label htmlFor="" className="form-label">
              Secondary Diagnosis
            </label>
            <input type="text" className="form-control" />
          </div>
        </div>
        <div className="row my-5">
          <div className="col-md-12 bg-secondary text-center mb-5">
            <h5 className="text-white mb-0 py-1">Vital Signs</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="o2Saturation" className="form-label">
                O2 Saturation
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="o2Saturation"
                  name="o2Saturation"
                  value={formData?.o2Saturation}
                  onChange={handleChange}
                />
                <span className="input-group-text">%</span>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="method" className="form-label">
                Method
              </label>
              <select
                id="method"
                name="method"
                className="form-select"
                value={formData?.method}
                onChange={handleChange}
              >
                <option value="">Select Method</option>
                <option value="0">On Oxygen</option>
                <option value="1">On Room Air</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="temp" className="form-label">
                Temperature
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="temp"
                  name="temp"
                  value={formData?.temp}
                  onChange={handleChange}
                />
                <span className="input-group-text">°F</span>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="route" className="form-label">
                Route
              </label>
              <select
                id="route"
                name="route"
                className="form-select"
                value={formData?.route}
                onChange={handleChange}
              >
                <option value="">Select Route</option>
                <option value="0">Oral</option>
                <option value="1">Axillary</option>
                <option value="2">Rectal</option>
                <option value="3">Temporal</option>
                <option value="4">Tympanic</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="respirations" className="form-label">
                Respirations
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="respirations"
                  name="respirations"
                  value={formData?.respirations}
                  onChange={handleChange}
                />
                <span className="input-group-text">/min</span>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <h6>Pulse Rate</h6>
              {["Apical", "Radial"]?.map((type) => (
                <div key={type} className="mb-2">
                  <label
                    htmlFor={`pulseRate-${type.toLowerCase()}`}
                    className="form-label"
                  >
                    {type}
                  </label>
                  {["Lying", "Sitting", "Standing"].map((position) => (
                    <div key={position} className="mb-1">
                      <label className="form-label">{position}</label>
                      <div className="input-group">
                        <select
                          className="form-select"
                          name={`pulseRate.${type.toLowerCase()}`}
                          value={formData?.pulseRate[type.toLowerCase()]}
                          onChange={handleChange}
                        >
                          <option value="">Select Pulse</option>
                          <option value="0">Lying</option>
                          <option value="1">Sitting</option>
                          <option value="2">Standing</option>
                        </select>
                        <input
                          type="text"
                          className="form-control"
                          name={`pulseRate.${type.toLowerCase()}`}
                          value={formData?.pulseRate[type.toLowerCase()]}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <h6>Blood Pressure</h6>
              {["Lying", "Sitting", "Standing"].map((position) => (
                <div key={position} className="mb-3">
                  <label className="form-label">{position} (L)</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      name={`bloodPressure.${position.toLowerCase()}L`}
                      value={
                        formData?.bloodPressure[`${position.toLowerCase()}L`]
                      }
                      onChange={handleChange}
                    />
                    <span className="input-group-text">mmHg</span>
                  </div>
                  <label className="form-label">{position} (R)</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      name={`bloodPressure.${position.toLowerCase()}R`}
                      value={
                        formData?.bloodPressure[`${position.toLowerCase()}R`]
                      }
                      onChange={handleChange}
                    />
                    <span className="input-group-text">mmHg</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-6">
            <h6>BMI Calculator</h6>
            <div className="mb-3">
              <label htmlFor="weight" className="form-label">
                Weight (in pounds)
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="weight"
                  name="weight"
                  value={formData?.weight}
                  onChange={handleChange}
                />
                <span className="input-group-text">lbs</span>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="height" className="form-label">
                Height (in inches)
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="height"
                  name="height"
                  value={formData?.height}
                  onChange={handleChange}
                />
                <span className="input-group-text">in</span>
              </div>
            </div>
            <div className="mb-3">
              <h6>Calculated BMI</h6>
              <div className="input-group">
                <h2>{formData?.bmi}</h2>
                <span className="input-group-text">
                  <i className="fa fa-exclamation-circle"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="unableToCollectAllVitals"
                name="unableToCollectAllVitals"
                checked={formData?.unableToCollectAllVitals}
                onChange={handleChange}
              />
              <label
                className="form-check-label"
                htmlFor="unableToCollectAllVitals"
              >
                Unable to collect all vitals
              </label>
            </div>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => console.log("Show additional measurements")}
            >
              ADDITIONAL MEASUREMENTS
            </button>
          </div>
        </div>
        <div className="additional-measurements mt-3 row">
          <h6>Additional Vital Signs</h6>
          <div className="mb-3 col-md-4">
            <label htmlFor="fastingBloodGlucose" className="form-label">
              Fasting Blood Glucose
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="fastingBloodGlucose"
                name="additionalMeasurements.fastingBloodGlucose"
                value={formData?.additionalMeasurements.fastingBloodGlucose}
                onChange={handleChange}
              />
              <span className="input-group-text">mg/dL</span>
            </div>
          </div>
          <div className="mb-3 col-md-4">
            <label htmlFor="randomBloodSugar" className="form-label">
              Random Blood Sugar
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="randomBloodSugar"
                name="additionalMeasurements.randomBloodSugar"
                value={formData?.additionalMeasurements.randomBloodSugar}
                onChange={handleChange}
              />
              <span className="input-group-text">mg/dL</span>
            </div>
          </div>
          <div className="mb-3 col-md-4">
            <label htmlFor="abdGirth" className="form-label">
              Abdominal Girth
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="abdGirth"
                name="additionalMeasurements.abdGirth"
                value={formData?.additionalMeasurements.abdGirth}
                onChange={handleChange}
              />
              <select
                className="form-select"
                name="additionalMeasurements.abdGirthUnit"
                value={formData?.additionalMeasurements.abdGirthUnit}
                onChange={handleChange}
              >
                <option value="in">Inches</option>
                <option value="cm">Centimeters</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className=" col-md-6">
            <label htmlFor="bloodPressureLying">Blood Pressure Lying</label>
            <input
              type="text"
              id="bloodPressureLying"
              name="bloodPressureLying"
              value={formData?.bloodPressureLying}
              onChange={handleInputChange}
              placeholder="mmHg"
              className="form-control"
            />
          </div>
          <div className=" col-md-6">
            <label htmlFor="bloodPressureSitting">Blood Pressure Sitting</label>
            <input
              type="text"
              id="bloodPressureSitting"
              name="bloodPressureSitting"
              value={formData?.bloodPressureSitting}
              onChange={handleInputChange}
              placeholder="mmHg"
              className="form-control"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <label htmlFor="bloodPressureStanding">
              Blood Pressure Standing
            </label>
            <input
              type="text"
              id="bloodPressureStanding"
              name="bloodPressureStanding"
              value={formData?.bloodPressureStanding}
              onChange={handleInputChange}
              placeholder="mmHg"
              className="form-control"
            />
          </div>

          <div className=" col-md-4">
            <label htmlFor="weight">Weight</label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData?.weight}
              onChange={handleInputChange}
              placeholder="pounds"
              className="form-control"
            />
          </div>

          <div className=" col-md-4">
            <label htmlFor="height">Height</label>
            <input
              type="number"
              id="height"
              name="height"
              value={formData?.height}
              onChange={handleInputChange}
              placeholder="inches"
              className="form-control"
            />
          </div>
        </div>

        <div className="row">
          <div className=" col-md-3">
            <h6 className="bg-secondary text-center text-white py-1 mt-4">
              Neurological
            </h6>
            <div>
              <label className="d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Oriented to Person"
                  checked={formData?.neurologicalIssues?.includes(
                    "Oriented to Person"
                  )}
                  onChange={handleCheckboxChange}
                />
                Oriented to Person
              </label>
            </div>
            <div>
              <label className="d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Oriented to Place"
                  checked={formData?.neurologicalIssues?.includes(
                    "Oriented to Place"
                  )}
                  onChange={handleCheckboxChange}
                />
                Oriented to Place
              </label>
            </div>
            <div>
              <label className="d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Oriented to Time"
                  checked={formData?.neurologicalIssues?.includes(
                    "Oriented to Time"
                  )}
                  onChange={handleCheckboxChange}
                />
                Oriented to Time
              </label>
            </div>
            <div>
              <label className="d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="No problems identified"
                  checked={formData?.neurologicalIssues?.includes(
                    "No problems identified"
                  )}
                  onChange={handleCheckboxChange}
                />
                No problems identified
              </label>
            </div>
            <div>
              <label className="d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Abnormal behavior"
                  checked={formData?.neurologicalIssues?.includes(
                    "Abnormal behavior"
                  )}
                  onChange={handleCheckboxChange}
                />
                Abnormal behavior
              </label>
            </div>
            <div>
              <label className="d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Abnormal Pupils/Vision"
                  checked={formData?.neurologicalIssues?.includes(
                    "Abnormal Pupils/Vision"
                  )}
                  onChange={handleCheckboxChange}
                />
                Abnormal Pupils/Vision
              </label>
            </div>
            <div>
              <label className="d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Aphasia"
                  checked={formData?.neurologicalIssues?.includes("Aphasia")}
                  onChange={handleCheckboxChange}
                />
                Aphasia
              </label>
            </div>
            <div>
              <label className="d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Dizziness"
                  checked={formData?.neurologicalIssues?.includes("Dizziness")}
                  onChange={handleCheckboxChange}
                />
                Dizziness
              </label>
            </div>
            <div>
              <label className="d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Forgetful"
                  checked={formData?.neurologicalIssues?.includes("Forgetful")}
                  onChange={handleCheckboxChange}
                />
                Forgetful
              </label>
            </div>
            <div>
              <label className="d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Loss of sensation"
                  checked={formData?.neurologicalIssues?.includes(
                    "Loss of sensation"
                  )}
                  onChange={handleCheckboxChange}
                />
                Loss of sensation
              </label>
            </div>
            <div>
              <label className="d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Headache"
                  checked={formData?.neurologicalIssues?.includes("Headache")}
                  onChange={handleCheckboxChange}
                />
                Headache
              </label>
            </div>
            <div>
              <label className="d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Hearing Impaired"
                  checked={formData?.neurologicalIssues?.includes(
                    "Hearing Impaired"
                  )}
                  onChange={handleCheckboxChange}
                />
                Hearing Impaired
              </label>
            </div>
            <div>
              <label className="d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Lethargic"
                  checked={formData?.neurologicalIssues?.includes("Lethargic")}
                  onChange={handleCheckboxChange}
                />
                Lethargic
              </label>
            </div>
            <div>
              <label className="d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Neuromuscular weakness/loss"
                  checked={formData?.neurologicalIssues?.includes(
                    "Neuromuscular weakness/loss"
                  )}
                  onChange={handleCheckboxChange}
                />
                Neuromuscular weakness/loss
              </label>
            </div>
            <div>
              <label className="d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Rigidity"
                  checked={formData?.neurologicalIssues?.includes("Rigidity")}
                  onChange={handleCheckboxChange}
                />
                Rigidity
              </label>
            </div>
            <div>
              <label className="d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Seizure precautions"
                  checked={formData?.neurologicalIssues?.includes(
                    "Seizure precautions"
                  )}
                  onChange={handleCheckboxChange}
                />
                Seizure precautions
              </label>
            </div>
            <div>
              <label className="d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Slurred speech"
                  checked={formData?.neurologicalIssues?.includes(
                    "Slurred speech"
                  )}
                  onChange={handleCheckboxChange}
                />
                Slurred speech
              </label>
            </div>
            <div>
              <label className="d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Spasticity"
                  checked={formData?.neurologicalIssues?.includes("Spasticity")}
                  onChange={handleCheckboxChange}
                />
                Spasticity
              </label>
            </div>
            <div>
              <label className="d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Tremors"
                  checked={formData?.neurologicalIssues?.includes("Tremors")}
                  onChange={handleCheckboxChange}
                />
                Tremors
              </label>
            </div>
          </div>

          <div className=" col-md-3">
            <h6 className="bg-secondary text-center text-white py-1 mt-4">
              Respiratory
            </h6>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="No problems identified"
                  checked={formData.respiratoryIssues.includes(
                    "No problems identified"
                  )}
                  onChange={handleCheckboxChange}
                />
                No problems identified
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Abnormal breath sounds"
                  checked={formData.respiratoryIssues.includes(
                    "Abnormal breath sounds"
                  )}
                  onChange={handleCheckboxChange}
                />
                Abnormal breath sounds
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Accessory muscles used"
                  checked={formData.respiratoryIssues.includes(
                    "Accessory muscles used"
                  )}
                  onChange={handleCheckboxChange}
                />
                Accessory muscles used
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Cough, nonproductive"
                  checked={formData.respiratoryIssues.includes(
                    "Cough, nonproductive"
                  )}
                  onChange={handleCheckboxChange}
                />
                Cough, nonproductive
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Cough, productive"
                  checked={formData.respiratoryIssues.includes(
                    "Cough, productive"
                  )}
                  onChange={handleCheckboxChange}
                />
                Cough, productive
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="CPAP/BIPAP"
                  checked={formData.respiratoryIssues.includes("CPAP/BIPAP")}
                  onChange={handleCheckboxChange}
                />
                CPAP/BIPAP
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Dyspnea"
                  checked={formData.respiratoryIssues.includes("Dyspnea")}
                  onChange={handleCheckboxChange}
                />
                Dyspnea
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Nebulizer"
                  checked={formData.respiratoryIssues.includes("Nebulizer")}
                  onChange={handleCheckboxChange}
                />
                Nebulizer
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Orthopnea"
                  checked={formData.respiratoryIssues.includes("Orthopnea")}
                  onChange={handleCheckboxChange}
                />
                Orthopnea
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Oxygen use, intermittent"
                  checked={formData.respiratoryIssues.includes(
                    "Oxygen use, intermittent"
                  )}
                  onChange={handleCheckboxChange}
                />
                Oxygen use, intermittent
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Oxygen use, continuous"
                  checked={formData.respiratoryIssues.includes(
                    "Oxygen use, continuous"
                  )}
                  onChange={handleCheckboxChange}
                />
                Oxygen use, continuous
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="O2 Precautions NOT Demonstrated"
                  checked={formData.respiratoryIssues.includes(
                    "O2 Precautions NOT Demonstrated"
                  )}
                  onChange={handleCheckboxChange}
                />
                O2 Precautions NOT Demonstrated
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Paroxysmal Nocturnal Dyspnea (PND)"
                  checked={formData.respiratoryIssues.includes(
                    "Paroxysmal Nocturnal Dyspnea (PND)"
                  )}
                  onChange={handleCheckboxChange}
                />
                Paroxysmal Nocturnal Dyspnea (PND)
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Tachypnea"
                  checked={formData.respiratoryIssues.includes("Tachypnea")}
                  onChange={handleCheckboxChange}
                />
                Tachypnea
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Tracheostomy"
                  checked={formData.respiratoryIssues.includes("Tracheostomy")}
                  onChange={handleCheckboxChange}
                />
                Tracheostomy
              </label>
            </div>
          </div>

          <div className=" col-md-3">
            <h6 className="bg-secondary text-center text-white py-1 mt-4">
              Cardiovascular
            </h6>

            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="No problems identified"
                  checked={formData.cardiovascularIssues.includes(
                    "No problems identified"
                  )}
                  onChange={handleCheckboxChange}
                />
                No problems identified
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Abnormal heart rhythm"
                  checked={formData.cardiovascularIssues.includes(
                    "Abnormal heart rhythm"
                  )}
                  onChange={handleCheckboxChange}
                />
                Abnormal heart rhythm
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Abnormal heart sounds"
                  checked={formData.cardiovascularIssues.includes(
                    "Abnormal heart sounds"
                  )}
                  onChange={handleCheckboxChange}
                />
                Abnormal heart sounds
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Abnormal lower extremity appearance"
                  checked={formData.cardiovascularIssues.includes(
                    "Abnormal lower extremity appearance"
                  )}
                  onChange={handleCheckboxChange}
                />
                Abnormal lower extremity appearance
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Abnormal lower extremity sensation"
                  checked={formData.cardiovascularIssues.includes(
                    "Abnormal lower extremity sensation"
                  )}
                  onChange={handleCheckboxChange}
                />
                Abnormal lower extremity sensation
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Abnormal pulses"
                  checked={formData.cardiovascularIssues.includes(
                    "Abnormal pulses"
                  )}
                  onChange={handleCheckboxChange}
                />
                Abnormal pulses
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Activity intolerance"
                  checked={formData.cardiovascularIssues.includes(
                    "Activity intolerance"
                  )}
                  onChange={handleCheckboxChange}
                />
                Activity intolerance
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Capillary refill > 3 sec"
                  checked={formData.cardiovascularIssues.includes(
                    "Capillary refill > 3 sec"
                  )}
                  onChange={handleCheckboxChange}
                />
                Capillary refill &get; 3 sec
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Chest pain"
                  checked={formData.cardiovascularIssues.includes("Chest pain")}
                  onChange={handleCheckboxChange}
                />
                Chest pain
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Distended neck veins"
                  checked={formData.cardiovascularIssues.includes(
                    "Distended neck veins"
                  )}
                  onChange={handleCheckboxChange}
                />
                Distended neck veins
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Dizziness/light headedness"
                  checked={formData.cardiovascularIssues.includes(
                    "Dizziness/light headedness"
                  )}
                  onChange={handleCheckboxChange}
                />
                Dizziness/light headedness
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Edema, non-pitting"
                  checked={formData.cardiovascularIssues.includes(
                    "Edema, non-pitting"
                  )}
                  onChange={handleCheckboxChange}
                />
                Edema, non-pitting
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Edema, pitting"
                  checked={formData.cardiovascularIssues.includes(
                    "Edema, pitting"
                  )}
                  onChange={handleCheckboxChange}
                />
                Edema, pitting
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Fatigue/weakness"
                  checked={formData.cardiovascularIssues.includes(
                    "Fatigue/weakness"
                  )}
                  onChange={handleCheckboxChange}
                />
                Fatigue/weakness
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Orthopnea"
                  checked={formData.cardiovascularIssues.includes("Orthopnea")}
                  onChange={handleCheckboxChange}
                />
                Orthopnea
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Orthostatic hypotension"
                  checked={formData.cardiovascularIssues.includes(
                    "Orthostatic hypotension"
                  )}
                  onChange={handleCheckboxChange}
                />
                Orthostatic hypotension
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Palpitations"
                  checked={formData.cardiovascularIssues.includes(
                    "Palpitations"
                  )}
                  onChange={handleCheckboxChange}
                />
                Palpitations
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Paroxysmal Nocturnal Dyspnea (PND)"
                  checked={formData.cardiovascularIssues.includes(
                    "Paroxysmal Nocturnal Dyspnea (PND)"
                  )}
                  onChange={handleCheckboxChange}
                />
                Paroxysmal Nocturnal Dyspnea (PND)
              </label>
            </div>
          </div>
          <div className=" col-md-3">
            <h6 className="bg-secondary text-center text-white py-1 mt-4">
              Gastrointestinal
            </h6>

            <div>
              <label className="form-check-label d-flex flex-column gap-2">
                Last BM:
                <input
                  type="text"
                  name="lastBM"
                  className="form-control mb-2"
                  value={formData.lastBM}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-label"
                  name="No problems identified"
                  checked={formData.gastrointestinalIssues.includes(
                    "No problems identified"
                  )}
                  onChange={handleCheckboxChange}
                />
                No problems identified
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-label"
                  name="Abnormal bowel sounds"
                  checked={formData.gastrointestinalIssues.includes(
                    "Abnormal bowel sounds"
                  )}
                  onChange={handleCheckboxChange}
                />
                Abnormal bowel sounds
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-label"
                  name="Abnormal stool"
                  checked={formData.gastrointestinalIssues.includes(
                    "Abnormal stool"
                  )}
                  onChange={handleCheckboxChange}
                />
                Abnormal stool
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-label"
                  name="Ascites"
                  checked={formData.gastrointestinalIssues.includes("Ascites")}
                  onChange={handleCheckboxChange}
                />
                Ascites
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-label"
                  name="Bowel incontinence"
                  checked={formData.gastrointestinalIssues.includes(
                    "Bowel incontinence"
                  )}
                  onChange={handleCheckboxChange}
                />
                Bowel incontinence
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-label"
                  name="Distended"
                  checked={formData.gastrointestinalIssues.includes(
                    "Distended"
                  )}
                  onChange={handleCheckboxChange}
                />
                Distended
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-label"
                  name="Hard"
                  checked={formData.gastrointestinalIssues.includes("Hard")}
                  onChange={handleCheckboxChange}
                />
                Hard
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-label"
                  name="Heartburn/reflux"
                  checked={formData.gastrointestinalIssues.includes(
                    "Heartburn/reflux"
                  )}
                  onChange={handleCheckboxChange}
                />
                Heartburn/reflux
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-label"
                  name="Hemorrhoids"
                  checked={formData.gastrointestinalIssues.includes(
                    "Hemorrhoids"
                  )}
                  onChange={handleCheckboxChange}
                />
                Hemorrhoids
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-label"
                  name="Laxative/enema abuse"
                  checked={formData.gastrointestinalIssues.includes(
                    "Laxative/enema abuse"
                  )}
                  onChange={handleCheckboxChange}
                />
                Laxative/enema abuse
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-label"
                  name="Laxative/enema use"
                  checked={formData.gastrointestinalIssues.includes(
                    "Laxative/enema use"
                  )}
                  onChange={handleCheckboxChange}
                />
                Laxative/enema use
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-label"
                  name="Nausea"
                  checked={formData.gastrointestinalIssues.includes("Nausea")}
                  onChange={handleCheckboxChange}
                />
                Nausea
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-label"
                  name="Ostomy"
                  checked={formData.gastrointestinalIssues.includes("Ostomy")}
                  onChange={handleCheckboxChange}
                />
                Ostomy
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-label"
                  name="Pain"
                  checked={formData.gastrointestinalIssues.includes("Pain")}
                  onChange={handleCheckboxChange}
                />
                Pain
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-label"
                  name="Rectal bleeding"
                  checked={formData.gastrointestinalIssues.includes(
                    "Rectal bleeding"
                  )}
                  onChange={handleCheckboxChange}
                />
                Rectal bleeding
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-label"
                  name="Tenderness"
                  checked={formData.gastrointestinalIssues.includes(
                    "Tenderness"
                  )}
                  onChange={handleCheckboxChange}
                />
                Tenderness
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-label"
                  name="Vomiting"
                  checked={formData.gastrointestinalIssues.includes("Vomiting")}
                  onChange={handleCheckboxChange}
                />
                Vomiting
              </label>
            </div>
            <div>
              <label className="form-input-label d-flex gap-2">Comment:</label>
              <textarea
                name="comment"
                className="form-control"
                value={formData.comment}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className=" col-md-3">
            <h6
              className="bg-secondary text-center text-white py-1 mt-4"
              htmlFor="genitourinary"
            >
              Genitourinary
            </h6>
            {[
              "No problems identified",
              "Bladder distention",
              "Abnormal control",
              "Abnormal volume",
              "Discharge",
              "Nocturia",
              "Abnormal urine appearance",
              "Dialysis",
              "Suprapubic catheter",
              "Urostomy",
              "Indwelling/Foley catheter",
              "Intermittent catheterization",
              "UTI signs/symptoms",
              "Comment",
            ].map((item) => (
              <div key={item}>
                <label className="d-flex gap-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name={item}
                    checked={formData.genitourinary.includes(item)}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "genitourinary",
                        item,
                        e.target.checked
                      )
                    }
                  />
                  {item}
                </label>
              </div>
            ))}
          </div>

          <div className=" col-md-3">
            <h6 className="bg-secondary text-center text-white py-1 mt-4">
              Musculoskeletal
            </h6>
            {[
              "No problems identified",
              "Amputation",
              "Aftercare, hip replacement",
              "Aftercare, knee replacement",
              "Atrophy",
              "Contracture",
              "Fracture",
              "High risk for falls",
              "Joint pain",
              "Joint stiffness",
              "Limited ROM",
              "Muscle weakness",
              "Poor balance",
              "Shuffling gait",
              "Unsteady gait",
              "Weak hand grip strength",
              "Weight bearing restriction (full)",
              "Weight bearing restriction (partial)",
              "Autoimmune Diseases Affecting Function",
              "Comment",
            ].map((item) => (
              <div key={item}>
                <label className="d-flex gap-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name={item}
                    checked={formData.musculoskeletal.includes(item)}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "musculoskeletal",
                        item,
                        e.target.checked
                      )
                    }
                  />
                  {item}
                </label>
              </div>
            ))}
          </div>

          <div className=" col-md-3">
            <h6 className="bg-secondary text-center text-white py-1 mt-4">
              Integumentary
            </h6>
            {[
              "No problems identified",
              "Bruising",
              "Cool",
              "Cyanotic",
              "Dry",
              "Clammy",
              "Diaphoretic",
              "Flushed",
              "Incision",
              "Jaundice",
              "Pallor",
              "Poor turgor",
              "Pruritus",
              "Rash",
              "Skin lesion requiring intervention",
              "Wound/s",
              "IV access",
              "Comment",
            ].map((item) => (
              <div key={item}>
                <label className="d-flex gap-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name={item}
                    checked={formData.integumentary.includes(item)}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "integumentary",
                        item,
                        e.target.checked
                      )
                    }
                  />
                  {item}
                </label>
              </div>
            ))}
          </div>

          <div className=" col-md-3">
            <h6 className="bg-secondary text-center text-white py-1 mt-4">
              Pain Profile
            </h6>
            <select
              className="form-select"
              name="painProfile"
              value={formData.painProfile}
              onChange={(e) =>
                handleInputChange("painProfile", "painProfile", e.target.value)
              }
            >
              <option value="">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <label className="form-label" htmlFor="painProfileComment">
              Comment
            </label>
            <textarea
              className="form-control"
              name="painProfileComment"
              value={formData.painProfileComment || ""}
              onChange={(e) =>
                handleInputChange(
                  "painProfile",
                  "painProfileComment",
                  e.target.value
                )
              }
            />
          </div>
        </div>

        <div className="row">
          <div className=" col-md-3">
            <h6 className="bg-secondary text-center text-white py-1 mt-4">
              Endocrine/Hematologic
            </h6>
            {[
              "No problems identified",
              "Anemia",
              "Anticoagulant Use",
              "Cancer",
              "Hypothyroidism",
              "Hyperthyroidism",
              "Diabetes",
              "Comment",
            ].map((item) => (
              <div key={item}>
                <label className="d-flex gap-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name={item}
                    checked={formData.endocrineHematologic.includes(item)}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "endocrineHematologic",
                        item,
                        e.target.checked
                      )
                    }
                  />
                  {item}
                </label>
              </div>
            ))}
          </div>

          <div className=" col-md-3">
            <h6 className="bg-secondary text-center text-white py-1 mt-4">
              Nutrition
            </h6>
            {[
              "No Problems Identified",
              "Difficulty Chewing",
              "Dysphagia",
              "Ill Fitting Dentures",
              "Anorexic",
              "Fair Appetite",
              "Poor Appetite",
              "Poor Hydration",
              "Sore Throat",
              "Tube Feeding Present",
              "TPN or lipids",
              "Weight Loss",
              "Weight Gain",
              "Comment",
            ].map((item) => (
              <div key={item}>
                <label className="d-flex gap-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name={item}
                    checked={formData.nutrition.includes(item)}
                    onChange={(e) =>
                      handleCheckboxChange("nutrition", item, e.target.checked)
                    }
                  />
                  {item}
                </label>
              </div>
            ))}
          </div>

          <div className=" col-md-3">
            <h6 className="bg-secondary text-center text-white py-1 mt-4">
              Labs
            </h6>
            {[
              "N/A",
              "Blood test obtained",
              "Urine specimen obtained",
              "Wound culture obtained",
              "Other",
              "Comment",
            ].map((item) => (
              <div key={item}>
                <label className="d-flex gap-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name={item}
                    checked={formData.labs.includes(item)}
                    onChange={(e) =>
                      handleCheckboxChange("labs", item, e.target.checked)
                    }
                  />
                  {item}
                </label>
              </div>
            ))}
          </div>

          <div className=" col-md-3">
            <h6 className="bg-secondary text-center text-white py-1 mt-4">
              Infection Control
            </h6>
            {[
              "Universal precautions observed",
              "Sharps disposed per biohazard P&P",
              "Soiled waste disposed per biohazard",
              "Patient demonstrates knowledge deficits regarding infection control",
              "New infection suspected",
              "New infection diagnosed",
              "Infection Log",
              "Infectious Disease Profile",
              "Comment",
            ].map((item) => (
              <div key={item}>
                <label className="d-flex gap-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name={item}
                    checked={formData.infectionControl.includes(item)}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "infectionControl",
                        item,
                        e.target.checked
                      )
                    }
                  />
                  {item}
                </label>
              </div>
            ))}
          </div>
        </div>
        {/* homebound stateu */}
        <div className="row">
          <div className="col-md-3">
            <div className="row my-2">
              <h6 className="bg-secondary mb-1 py-1 text-white text-center">
                Homebound Status
              </h6>
              <label htmlFor="">Mobility</label>
            </div>
            <label className="form-label-input d-flex gap-2" htmlFor="">
              <input type="checkbox" className="form-check-input" /> Ambulatory
            </label>
            <label className="form-label-input d-flex gap-2" htmlFor="">
              <input type="checkbox" className="form-check-input" /> Ambulatory
              with Device
            </label>
            <label className="form-label-input d-flex gap-2" htmlFor="">
              <input type="checkbox" className="form-check-input" /> Bedfast
              (Unable to Sit in Chair)
            </label>
            <label className="form-label-input d-flex gap-2" htmlFor="">
              <input type="checkbox" className="form-check-input" /> Chairfast
            </label>

            <div className="row">
              <label htmlFor="">Assistive Device</label>
            </div>
            <label className="form-label-input d-flex gap-2" htmlFor="">
              <input type="checkbox" className="form-check-input" /> Cane
            </label>
            <label className="form-label-input d-flex gap-2" htmlFor="">
              <input type="checkbox" className="form-check-input" /> Crutches
            </label>
            <label className="form-label-input d-flex gap-2" htmlFor="">
              <input type="checkbox" className="form-check-input" /> Human
              assistance
            </label>
            <label className="form-label-input d-flex gap-2" htmlFor="">
              <input type="checkbox" className="form-check-input" /> Special
              transportation
            </label>
            <label className="form-label-input d-flex gap-2" htmlFor="">
              <input type="checkbox" className="form-check-input" /> Special
              Walker
            </label>
            <label className="form-label-input d-flex gap-2" htmlFor="">
              <input type="checkbox" className="form-check-input" /> Wheelchair
            </label>
            <label htmlFor="">Homebound Narrative</label>
            <textarea
              name=""
              id=""
              className="from-control p-2"
              placeholder="Describe taxing effort and normal inability to leave have"
            ></textarea>
          </div>
          <div className=" col-md-3 my-2">
            <h6 className="mb-0 bg-secondary py-1 text-center text-white">
              Plan of Care
            </h6>
            <label htmlFor="" className="form-label">
              Plan of care
            </label>
            <select name="" className="form-select my-4" id="">
              <option value="Reviewed with Patient">
                Reviewed with Patient
              </option>
              <option value="Revised with patient">Revised with patient</option>
              <option value="Reviewed with Caregiver">
                Reviewed with Caregiver
              </option>
              <option value="Revised with Caregiver">
                Revised with Caregiver
              </option>
              <option value="Revised with Caregiver">
                Revised with Caregiver
              </option>
              <option value="Reviewed With Legal Representative">
                Reviewed With Legal Representative
              </option>
              <option value="Reviewed With Patient/cg">
                Reviewed With Patient/cg
              </option>
              <option value="Reviewed with Patient/CG/Legal Rep">
                Reviewed with Patient/CG/Legal Rep
              </option>
              <option value="Revised with Patient/CG/Legal Rep">
                Revised with Patient/CG/Legal Rep
              </option>
            </select>
            <label className="form-check-label" htmlFor="">
              Patient Response
            </label>
            <label className="form-check-label d-flex gap-2" htmlFor="">
              <input
                type="checkbox"
                className="form-check-input"
                name=""
                id=""
              />
              Patient Willing/Able to Participate
            </label>
            <label className="form-check-label d-flex gap-2" htmlFor="">
              <input
                type="checkbox"
                className="form-check-input"
                name=""
                id=""
              />
              Patient Willing/Unable to Participate
            </label>
            <label className="form-check-label d-flex gap-2" htmlFor="">
              <input
                type="checkbox"
                className="form-check-input"
                name=""
                id=""
              />
              Patient Unwilling to Participate
            </label>
            <label className="form-check-label d-flex gap-2" htmlFor="">
              <input
                type="checkbox"
                className="form-check-input"
                name=""
                id=""
              />
              Patient with Barriers Impeding Full Participation
            </label>

            <label htmlFor="" className="form-label-input d-flex gap-2">
              <input
                type="checkbox"
                className="form-check-input"
                name=""
                id=""
              />
              Caregiver Involvement
            </label>
            <label htmlFor="" className="d-flex gap-2">
              <input
                type="checkbox"
                className="form-check-input"
                name=""
                id=""
              />
              N/A(No Caregiver)
            </label>
            <label htmlFor="" className="d-flex gap-2">
              <input
                type="checkbox"
                className="form-check-input"
                name=""
                id=""
              />
              CG Willing/Able to Participate
            </label>
            <label htmlFor="" className="d-flex gap-2">
              <input
                type="checkbox"
                className="form-check-input"
                name=""
                id=""
              />
              CG Willing/Unable to Participate
            </label>
            <label htmlFor="" className="d-flex gap-2">
              <input
                type="checkbox"
                className="form-check-input"
                name=""
                id=""
              />
              CG Unwilling to participate
            </label>
            <label htmlFor="" className="d-flex gap-2">
              <input
                type="checkbox"
                className="form-check-input"
                name=""
                id=""
              />
              CG with Barriers Impeding Full Participation
            </label>

            <label htmlFor="" className="form-input-label">
              Caregiver Availability
            </label>
            <input type="text" className="form-control mb-4" />
            <label htmlFor="" className="form-label">
              New/Changed Orders to POC Required
            </label>
            <div className="d-flex gap-2">
              <label htmlFor="" className="d-flex gap-2">
                <input
                  type="radio"
                  name=""
                  id=""
                  className="form-check-input"
                />{" "}
                Yes
              </label>
              <label htmlFor="" className="d-flex gap-2">
                <input
                  type="radio"
                  name=""
                  id=""
                  className="form-check-input"
                />
                No
              </label>
            </div>
            <label htmlFor="" className="form-label">
              New/Changed Order
            </label>
            <select name="" id="" multiple className="form-select">
              <option value="">Select all that apply</option>
              <option value="Patient Notified of change to POC in advance of care to be performed">
                Patient Notified of change to POC in advance of care to be
                performed
              </option>
              <option value="Patient/CG/Legal Rep notified of changes to POC in advance of care to be performed">
                Patient/CG/Legal Rep notified of changes to POC in advance of
                care to be performed
              </option>
              <option value="Patient verbalized agreement with physician order ot change POC">
                Patient verbalized agreement with physician order ot change POC
              </option>
              <option value="Caregiver verbalized agreement with physician order to change POC">
                Caregiver verbalized agreement with physician order to change
                POC
              </option>
              <option value="Patient/CG verbalized agreement with physician order to change POC">
                Patient/CG verbalized agreement with physician order to change
                POC
              </option>
              <option value="Patient/CG/Legal REp verbalized agreement with physician order to change POC">
                Patient/CG/Legal REp verbalized agreement with physician order
                to change POC
              </option>
              <option value="Caregiver disagreed with physician order to change POC">
                Caregiver disagreed with physician order to change POC
              </option>
              <option value="Patient/CG/Legal Rep disagreed with physician order to change POC">
                Patient/CG/Legal Rep disagreed with physician order to change
                POC
              </option>
              <option value="Patient/CG/Legal Rep disagreed with physician order ot change POC">
                Patient/CG/Legal Rep disagreed with physician order ot change
                POC
              </option>
            </select>
            <textarea
              name=""
              placeholder="comment"
              className="form-control mt-2"
              id=""
            ></textarea>
          </div>
          <div className=" col-md-3 my-2">
            <h6 className="text-white bg-secondary py-1 text-center ">
              Discharge Planning
            </h6>
            <label
              htmlFor=""
              className="form-label d-flex gap-2 align-items-center"
            >
              <input
                type="checkbox"
                name=""
                className="form-check-input"
                id=""
              />{" "}
              N/A
            </label>
            <label
              htmlFor=""
              className="form-label d-flex gap-2 align-items-center"
            >
              <input
                type="checkbox"
                name=""
                className="form-check-input"
                id=""
              />{" "}
              Discharge Planning Discussed with:
            </label>
            <label
              htmlFor=""
              className="form-label d-flex gap-2 align-items-center"
            >
              <input
                type="checkbox"
                name=""
                className="form-check-input"
                id=""
              />{" "}
              Legal Representative Received Discharge Notices per Agency Policy
              and Procedures:
            </label>
            <label
              htmlFor=""
              className="form-label d-flex gap-2 align-items-center"
            >
              <input
                type="checkbox"
                name=""
                className="form-check-input"
                id=""
              />{" "}
              Patient Received Beneficiary Notice:
            </label>
            <label htmlFor="" className="form-label">
              Comment
            </label>
            <textarea
              name=""
              className="form-control"
              placeholder="comment"
              id=""
            ></textarea>
          </div>
          <div className=" col-md-3 my-2">
            <h6 className="text-center text-white bg-secondary py-1 mb-0">
              Care Coordination
            </h6>
            <label htmlFor="" className="form-check-label mt-3">
              {" "}
              <input
                type="checkbox"
                name=""
                id=""
                className="form-check-input"
              />
              N/A
            </label>
            <div className="row my-2">
              <button className="btn btn-primary my-2">incident Log</button>
            </div>
            <label htmlFor="">Care Coordinated with</label>
            <select name="" id="" className="form-select">
              <option value="">Select all that apply</option>
              <option value="SN">SN</option>
              <option value="PT">PT</option>
              <option value="OT">OT</option>
              <option value="ST">ST</option>
              <option value="MSW">MSW</option>
              <option value="HHA">HHA</option>
              <option value="Physician, Primary care">
                Physician, Primary care
              </option>
              <option value="Physician, other">Physician, other</option>
              <option value="Clinical other">Clinical other</option>
            </select>
            <label htmlFor="" className="from-label">
              Name/Title
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name or Title"
            />
            <label htmlFor="" className="from-label">
              Regarding
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Care information"
            />
            <button className="btn btn-primary my-2">
              Add Coordination Note
            </button>
          </div>
        </div>
        {/* Plan of care review */}
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <h6 className="bg-secondary text-center text-white py-1 mt-5">
                Health Management
              </h6>

              <div className="col-md-12 my-2">
                <button className="btn btn-primary">
                  Review Medication Profile
                </button>
              </div>

              <div className="col-md-4">
                <div className="form-check mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="medicationsReconciled"
                  />
                  <label
                    htmlFor="medicationsReconciled"
                    className="form-check-label"
                  >
                    Medications Reconciled
                  </label>
                </div>

                <div className="form-check mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="newChangedMedications"
                  />
                  <label
                    htmlFor="newChangedMedications"
                    className="form-check-label"
                  >
                    New/Changed Medications in the Home
                  </label>
                </div>

                <div className="form-check mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="medicationIssuesIdentified"
                  />
                  <label
                    htmlFor="medicationIssuesIdentified"
                    className="form-check-label"
                  >
                    Medication Issues Identified
                  </label>
                </div>

                <label className="form-label mt-3">
                  Medication Issues Identified Options
                </label>
                <select
                  id="medicationIssuesOptions"
                  className="form-select"
                  multiple
                  required
                >
                  <option value="option1">Issue Option 1</option>
                  <option value="option2">Issue Option 2</option>
                  <option value="option3">Issue Option 3</option>
                  {/* Add more options here as needed */}
                </select>

                <div className="form-group mt-3">
                  <label htmlFor="medicationDescription">
                    Medication(s) Name and Description of Issue:
                  </label>
                  <textarea
                    id="medicationDescription"
                    className="form-control"
                    rows="3"
                    required
                  ></textarea>
                </div>
              </div>

              <div className="col-md-4">
                <label className="form-label mt-3 d-flex gap-2">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="form-check-input"
                  />
                  Notifications
                </label>
                <select
                  id="notifications"
                  className="form-select"
                  multiple
                  required
                >
                  <option value="pillBoxPrefilled">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      className="form-check-input"
                    />
                    Pill Box Pre-Filled
                  </option>
                  <option value="insulinSyringesPrefilled">
                    Insulin Syringes Pre-Filled
                  </option>
                  <option value="homeEnvironmentAltered">
                    Home Environment, Altered
                  </option>
                  {/* Add more options here as needed */}
                </select>

                <label className="form-label mt-3 d-flex gap-2">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="form-check-input"
                  />
                  Suspected Abuse
                </label>
                <select
                  id="suspectedAbuse"
                  className="form-select"
                  multiple
                  required
                >
                  <option value="abuseOption1">Suspected Abuse Option 1</option>
                  <option value="abuseOption2">Suspected Abuse Option 2</option>
                  <option value="abuseOption3">Suspected Abuse Option 3</option>
                  {/* Add more options here as needed */}
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label mt-3 d-flex gap-2">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="form-check-input"
                  />{" "}
                  Barriers to Health Status
                </label>
                <select
                  id="barriersToHealthStatus"
                  className="form-select"
                  multiple
                  required
                >
                  <option value="barrierOption1">Barrier Option 1</option>
                  <option value="barrierOption2">Barrier Option 2</option>
                  <option value="barrierOption3">Barrier Option 3</option>
                  {/* Add more options here as needed */}
                </select>

                <label className="form-label mt-3 d-flex gap-2">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="form-check-input"
                  />{" "}
                  Exhibiting Signs/Symptoms of Heart Failure
                </label>
                <select
                  id="heartFailureSymptoms"
                  className="form-select"
                  multiple
                  required
                >
                  <option value="heartFailure1">Heart Failure Option 1</option>
                  <option value="heartFailure2">Heart Failure Option 2</option>
                  <option value="heartFailure3">Heart Failure Option 3</option>
                  {/* Add more options here as needed */}
                </select>

                <label className="form-label mt-3 d-flex gap-2">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="form-check-input "
                  />{" "}
                  Exhibiting Signs/Symptoms of Other Co-Morbidity
                </label>
                <select
                  id="comorbiditySymptoms"
                  className="form-select"
                  multiple
                  required
                >
                  <option value="comorbidity1">Co-Morbidity Option 1</option>
                  <option value="comorbidity2">Co-Morbidity Option 2</option>
                  <option value="comorbidity3">Co-Morbidity Option 3</option>
                  {/* Add more options here as needed */}
                </select>
              </div>

              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="comment">Comment</label>
                  <textarea
                    id="comment"
                    className="form-control mb-4"
                    rows="4"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <h6 className="bg-secondary py-1  text-white text-center">
            Orders for Discipline and Treatment
          </h6>
          <label htmlFor="" className="form-label">
            Enter the plan of Care Profile to review problem statements,
            discontinue interventions and/or resolve goals.
          </label>
          <button className="btn btn-primary my-3">Plan of Care Profile</button>
        </div>
        <div className="row">
          <h6 className="text-center text-white bg-secondary py-1">
            Interventions
          </h6>
          <div className="col-md-6">
            <Template />
          </div>
          <div className="col-md-6">
            <textarea name="" id="" className="form-control"></textarea>
          </div>
        </div>

        <div className="row">
          <h6 className="text-center text-white py-1 mb-0 bg-secondary my-2">
            Response to Care/Progress Toward Goals/Plan for Next Visit
          </h6>
          <textarea name="" id="" className="form-control mt-3"></textarea>
        </div>
        <div className="row">
          <h6 className="text-center text-white py-1 mb-0 bg-secondary my-2">
            Medical Necessity for Care
          </h6>
          <textarea name="" id="" className="form-control mt-3"></textarea>
        </div>
        <div className="row">
          <h6 className="text-center text-white bg-secondary py-1">
            Visit Narrative
          </h6>
          <div className="col-md-6">
            <Template />
          </div>
          <div className="col-md-6">
            <textarea name="" id="" className="form-control"></textarea>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <h6 className="text-center mb-0 py-1 text-white bg-secondary">
              Supplemental Documents
            </h6>
            <div className="d-flex gap-2 flex-wrap p-1">
              <button className="btn btn-sm btn-secondary">
                Edit Supply WorkSheet
              </button>
              <button className="btn btn-sm btn-secondary">
                Perform Supervisory Visit
              </button>
              <button className="btn btn-sm btn-secondary">
                Add/Edit Aide Care plan
              </button>
              <button className="btn btn-sm btn-secondary">Immunization Log</button>
            </div>
          </div>
          <div className="col-md-8">
            <h6 className="text-center mb-0 py-1 text-white bg-secondary">
              Electronic Signature
            </h6>
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="" className="form-label">
                  Clinician Signature
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-6">
                <label htmlFor="" className="form-label">
                  Signature Date
                </label>
                <input type="date" className="form-control" />
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex gap-2">
          <button type="submit" className="submit-button btn btn-primary mt-5">
            Save
          </button>
          <button type="submit" className="submit-button btn btn-primary mt-5">
            Save and Exit
          </button>
          <button type="submit" className="submit-button btn btn-primary mt-5">
            Complete
          </button>
        </div>
      </div>
    </form>
  );
};

export default LvnOrLpn;
