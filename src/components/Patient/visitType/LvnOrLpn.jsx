import { useState, useEffect } from "react";
import PageHeader from "./../../FormElement/PageHeader";
import Template from "./../../FormElement/Template";
import {
  useCreateLvnOrLpnMutation,
  useGetLvnOrLpnByIdQuery,
} from "../../../Redux/api/VisitType/LvnOrLpnApi";
import { showToast } from "./../../../utils/Toastify";
const LvnOrLpn = ({ data }) => {
  const calculateBMI = (weight, height) => {
    if (weight && height) {
      const weightInKg = weight * 0.453592; // Convert pounds to kilograms
      const heightInM = height * 0.0254; // Convert inches to meters
      const bmi = weightInKg / (heightInM * heightInM);
      return bmi.toFixed(2); // Round to 2 decimal places
    }
    return "N/A";
  };

  const [createLvnOrLpn, { data: lvnOrLpnData, isSuccess, error }] =
    useCreateLvnOrLpnMutation();
  const { data: getData, refetch } = useGetLvnOrLpnByIdQuery(data?._id);
  const [interventionsText, setInterventionsText] = useState("");
  const [visitNarrativeText, setVisitNarrativeText] = useState("");
  const [formData, setFormData] = useState({
    visitDate: "",
    visitStartTime: "",
    visitEndTime: "",
    travelStartTime: "",
    travelEndTime: "",
    associatedMileage: "",
    surcharge: "",
    newOrderComment: "",
    interventions: "",
    visitNarrative: "",
    bloodPressureLying: "",
    bloodPressureSitting: "",
    bloodPressureStanding: "",
    physicianLastVisitDate: "",
    primaryDiagnosis: "",
    dischargeComment: "",
    secondaryDiagnosis: "",
    weight: "",
    height: "",
    bpsWeight: "",
    bpsHeight: "",
    neurological: "",
    respiratory: "",
    painProfile: "",
    responseToCare: "",
    gastrointestinalComment: "",
    o2Saturation: "",
    planOfCare: "",
    patientResponse: [],
    caregiverInvolvement: [],
    caregiverAvailability: "",
    newOrdersRequired: "",
    newChangedOrder: [],

    medicationsReconciled: false,
    newChangedMedications: false,
    medicationIssuesIdentified: false,
    medicationIssuesOptions: [],
    medicationDescription: "",
    notifications: false,
    notificationsOptions: [],
    suspectedAbuse: false,
    suspectedAbuseOptions: [],
    barriersToHealthStatus: false,
    barriersToHealthStatusOptions: [],
    heartFailureSymptoms: false,
    heartFailureSymptomsOptions: [],
    comorbiditySymptoms: false,
    comorbiditySymptomsOptions: [],
    medicationsComment: "",
    mobility: [],
    assistiveDevices: [],
    homeboundNarrative: "",
    method: "",
    temp: "",
    route: "",
    respirations: "",
    pulseRate: {
      apical: {
        lying: "",
        sitting: "",
        standing: "",
      },
      radial: {
        lying: "",
        sitting: "",
        standing: "",
      },
    },
    bloodPressure: {
      lyingL: "",
      lyingR: "",
      sittingL: "",
      sittingR: "",
      standingL: "",
      standingR: "",
    },
    pillBoxPrefilled: false,
    insulinSyringesPrefilled: false,
    homeEnvironmentAltered: false,
    homeEnvironmentAltereds: [],
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
    setFormData((prevFormData) => {
      const keys = name.split(".");

      if (keys.length > 1) {
        return {
          ...prevFormData,
          [keys[0]]: {
            ...prevFormData[keys[0]],
            [keys[1]]: value,
          },
        };
      } else {
        return {
          ...prevFormData,
          [name]: value,
        };
      }
    });
    if (name.includes(".")) {
      const [section, field] = name.split(".");
      setFormData((prevFormData) => ({
        ...prevFormData,
        [section]: {
          ...prevFormData[section],
          [field]: value,
        },
      }));
    } else {
      // Handle flat properties
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
    // Handle checkbox fields
    if (type === "checkbox") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: checked,
      }));
    }
    // Handle nested properties
    else if (name.includes(".")) {
      const [section, field] = name.split(".");
      setFormData((prevFormData) => ({
        ...prevFormData,
        [section]: {
          ...prevFormData[section],
          [field]: value,
        },
      }));
    }
    // Handle regular fields
    else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
    if (type === "checkbox") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: checked,
      }));
    }
    // Handle nested properties
    else if (name.includes(".")) {
      const [section, field] = name.split(".");
      setFormData((prevFormData) => {
        const newFormData = {
          ...prevFormData,
          [section]: {
            ...prevFormData[section],
            [field]: value,
          },
        };
        // Calculate BMI if weight or height changes
        if (
          section === "additionalMeasurements" &&
          (field === "weight" || field === "height")
        ) {
          const bmi = calculateBMI(newFormData.weight, newFormData.height);
          newFormData.bmi = bmi;
        }
        return newFormData;
      });
    }
    // Handle regular fields
    else {
      setFormData((prevFormData) => {
        const newFormData = {
          ...prevFormData,
          [name]: value,
        };
        // Calculate BMI if weight or height changes
        if (name === "weight" || name === "height") {
          const bmi = calculateBMI(newFormData.weight, newFormData.height);
          newFormData.bmi = bmi;
        }
        return newFormData;
      });
    }
  };

  const handleChangeRate = (e) => {
    const { name, value } = e.target;
    const [type, position] = name.split(".").slice(1); // Extract type (e.g., "apical") and position (e.g., "lying")

    // Update state with new value for the specific position under the type
    setFormData((prevState) => ({
      ...prevState,
      pulseRate: {
        ...prevState.pulseRate,
        [type]: {
          ...prevState.pulseRate[type],
          [position]: value, // Update the specific position with the new value
        },
      },
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, options } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (type === "checkbox") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: checked,
      }));
    } else if (type === "select-multiple") {
      const selectedValues = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: selectedValues,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.scheduleId = data?._id;
    formData.visitType = data.visitType;
    formData.patientId = data?.patientId;
    formData.episode = data?.episode;
    createLvnOrLpn(formData);
    console.log(formData);
  };
  const handleCheckboxChange = (e) => {
    const { value, checked, dataset } = e.target;
    const category = dataset.category;
    console.log(category, value, checked, dataset);
    setFormData((prevFormData) => {
      const currentSelections = prevFormData[category] || [];

      const updatedSelections = checked
        ? [...currentSelections, value]
        : currentSelections.filter((item) => item !== value);

      return {
        ...prevFormData,
        [category]: updatedSelections,
      };
    });
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      interventions:
        (prev?.interventions || "") +
        prev?.interventions +
        interventionsText.value,
      visitNarrative:
        (prev?.visitNarrative || "") +
        prev?.visitNarrative +
        visitNarrativeText.value,
    }));
  }, [interventionsText.value, visitNarrativeText.value]);
  useEffect(() => {
    if (isSuccess) {
      showToast("success", lvnOrLpnData?.message);
      refetch();
    }
    if (error) {
      showToast("error", error?.data?.message);
    }
  }, [isSuccess, error, lvnOrLpnData, refetch]);
  useEffect(() => {
    if (getData?.payload?.record) {
      let updateData = { ...getData.payload.record };

      // Convert the dates to the correct format
      if (updateData.visitDate) {
        updateData.visitDate = new Date(updateData.visitDate).toISOString().split("T")[0];
      }
      if (updateData.physicianLastVisitDate) {
        updateData.physicianLastVisitDate = new Date(updateData.physicianLastVisitDate).toISOString().split("T")[0];
      }
      if (updateData.signatureDate) {
        updateData.signatureDate = new Date(updateData.signatureDate).toISOString().split("T")[0];
      }

      // Set the updated data to the form data state
      setFormData(updateData);
    }
  }, [getData?.payload?.record]);


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
        <div className="row mt-5 w-100 text-center">
          <p className="fs-4 text-capitalize text-black font-bolder">
            {data?.patientName}
          </p>
        </div>
        {/* visit type and other  */}
        <div className="row">
          <div className="col-md-12 bg-secondary text-center mb-5">
            <h5 className="text-white mb-0 py-1">Visit Information</h5>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="form-label-input" htmlFor="visitDate">
                Visit Date
              </label>
              <input
                className="form-control"
                type="date"
                name="visitDate"
                value={formData?.visitDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label-input" htmlFor="visitStartTime">
                Visit Start Time
              </label>
              <input
                className="form-control"
                type="time"
                name="visitStartTime"
                value={formData?.visitStartTime}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label-input" htmlFor="visitEndTime">
                Visit End Time
              </label>
              <input
                className="form-control"
                type="time"
                name="visitEndTime"
                value={formData?.visitEndTime}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="travelStartTime" className="form-label-input">
                  Travel Start Time
                </label>
                <input
                  type="time"
                  className="form-control"
                  name="travelStartTime"
                  value={formData?.travelStartTime}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="travelEndTime" className="form-label-input">
                  Travel End Time
                </label>
                <input
                  type="time"
                  className="form-control"
                  name="travelEndTime"
                  value={formData?.travelEndTime}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="associatedMileage" className="form-label-input">
                  Associated Mileage
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="associatedMileage"
                  value={formData?.associatedMileage}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="surcharge" className="form-label-input">
                  Surcharge
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="surcharge"
                  value={formData?.surcharge}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        {/* phisician   */}
        <div className="row">
          <div className="col-md-4">
            <label htmlFor="physicianLastVisitDate" className="form-label">
              Physician Last Visit Date
            </label>
            <input
              type="date"
              className="form-control"
              name="physicianLastVisitDate"
              value={formData?.physicianLastVisitDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="primaryDiagnosis" className="form-label">
              Primary Diagnosis
            </label>
            <input
              type="text"
              className="form-control"
              name="primaryDiagnosis"
              value={formData?.primaryDiagnosis}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="secondaryDiagnosis" className="form-label">
              Secondary Diagnosis
            </label>
            <input
              type="text"
              className="form-control"
              name="secondaryDiagnosis"
              value={formData?.secondaryDiagnosis}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* vital sign  */}
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
              {["Apical", "Radial"].map((type) => (
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
                          name={`pulseRate.${type.toLowerCase()}.${position.toLowerCase()}`}
                          value={
                            formData?.pulseRate[type.toLowerCase()][
                              position.toLowerCase()
                            ]
                          }
                          onChange={handleChangeRate}
                        >
                          <option value="">Select Pulse</option>
                          <option value="0">Lying</option>
                          <option value="1">Sitting</option>
                          <option value="2">Standing</option>
                        </select>
                        <input
                          type="text"
                          className="form-control"
                          name={`pulseRate.${type.toLowerCase()}.${position.toLowerCase()}`}
                          value={
                            formData?.pulseRate[type.toLowerCase()][
                              position.toLowerCase()
                            ]
                          }
                          onChange={handleChangeRate}
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

        {/* bmi calculator  */}
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
          <div className="col-md-6">
            <label htmlFor="bloodPressureLying">Blood Pressure Lying</label>
            <input
              type="text"
              id="bloodPressureLying"
              name="bloodPressureLying"
              value={formData?.bloodPressureLying}
              onChange={handleChange}
              placeholder="mmHg"
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="bloodPressureSitting">Blood Pressure Sitting</label>
            <input
              type="text"
              id="bloodPressureSitting"
              name="bloodPressureSitting"
              value={formData?.bloodPressureSitting}
              onChange={handleChange}
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
              onChange={handleChange}
              placeholder="mmHg"
              className="form-control"
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="bpsWeight">Weight</label>
            <input
              type="number"
              id="bpsWeight"
              name="bpsWeight"
              value={formData?.bpsWeight}
              onChange={handleChange}
              placeholder="pounds"
              className="form-control"
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="bpsHeight">Height</label>
            <input
              type="number"
              id="bpsHeight"
              name="bpsHeight"
              value={formData?.bpsHeight}
              onChange={handleChange}
              placeholder="inches"
              className="form-control"
            />
          </div>
        </div>

        {/* nurologis  */}
        <div className="row">
          <div className="col-md-3">
            <h6 className="bg-secondary text-center text-white py-1 mt-4">
              Neurological
            </h6>
            {[
              "Oriented to Person",
              "Oriented to Place",
              "Oriented to Time",
              "No problems identified",
              "Abnormal behavior",
              "Abnormal Pupils/Vision",
              "Aphasia",
              "Dizziness",
              "Forgetful",
              "Loss of sensation",
              "Headache",
              "Hearing Impaired",
              "Lethargic",
              "Neuromuscular weakness/loss",
              "Rigidity",
              "Seizure precautions",
              "Slurred speech",
              "Spasticity",
              "Tremors",
            ].map((issue) => (
              <div key={issue}>
                <label className="d-flex gap-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="neurologicalIssues"
                    value={issue}
                    id={`neurologicalIssues${issue}`}
                    data-category="neurologicalIssues"
                    checked={formData?.neurologicalIssues.includes(issue)}
                    onChange={handleCheckboxChange}
                  />
                  {issue}
                </label>
              </div>
            ))}
          </div>

          {/* Respiratory  */}
          <div className="col-md-3">
            <h6 className="bg-secondary text-center text-white py-1 mt-4">
              Respiratory
            </h6>
            {[
              "No problems identified",
              "Abnormal breath sounds",
              "Accessory muscles used",
              "Cough, nonproductive",
              "Cough, productive",
              "CPAP/BIPAP",
              "Dyspnea",
              "Nebulizer",
              "Orthopnea",
              "Oxygen use, intermittent",
              "Oxygen use, continuous",
              "O2 Precautions NOT Demonstrated",
              "Paroxysmal Nocturnal Dyspnea (PND)",
              "Tachypnea",
              "Tracheostomy",
            ].map((issue) => (
              <div key={issue}>
                <label className="form-input-label d-flex gap-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="respiratoryIssues"
                    value={issue}
                    data-category="respiratoryIssues"
                    checked={formData?.respiratoryIssues.includes(issue)}
                    onChange={handleCheckboxChange}
                  />
                  {issue}
                </label>
              </div>
            ))}
          </div>

          {/* // Cardicovascular  */}
          <div className="col-md-3">
            <h6 className="bg-secondary text-center text-white py-1 mt-4">
              Cardiovascular
            </h6>
            {[
              "No problems identified",
              "Abnormal heart rhythm",
              "Abnormal heart sounds",
              "Abnormal lower extremity appearance",
              "Abnormal lower extremity sensation",
              "Abnormal pulses",
              "Activity intolerance",
              "Capillary refill > 3 sec",
              "Chest pain",
              "Distended neck veins",
              "Dizziness/light headedness",
              "Edema, non-pitting",
              "Edema, pitting",
              "Fatigue/weakness",
              "Orthopnea",
              "Orthostatic hypotension",
              "Palpitations",
              "Paroxysmal Nocturnal Dyspnea (PND)",
            ].map((issue) => (
              <div key={issue}>
                <label className="form-input-label d-flex gap-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="cardiovascularIssues"
                    value={issue}
                    data-category="cardiovascularIssues"
                    checked={formData?.cardiovascularIssues.includes(issue)}
                    onChange={handleCheckboxChange}
                  />
                  {issue}
                </label>
              </div>
            ))}
          </div>

          {/* Gastrointestinal */}
          <div className="col-md-3">
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
                  value={formData?.lastBM}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            {[
              "No problems identified",
              "Abnormal bowel sounds",
              "Abnormal stool",
              "Ascites",
              "Bowel incontinence",
              "Distended",
              "Hard",
              "Heartburn/reflux",
              "Hemorrhoids",
              "Laxative/enema abuse",
              "Laxative/enema use",
              "Nausea",
              "Ostomy",
              "Pain",
              "Rectal bleeding",
              "Tenderness",
              "Vomiting",
            ].map((issue) => (
              <div key={issue}>
                <label className="form-check-label d-flex gap-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="gastrointestinalIssues"
                    data-category="gastrointestinalIssues"
                    checked={formData?.gastrointestinalIssues.includes(issue)}
                    value={issue}
                    onChange={handleCheckboxChange}
                  />
                  {issue}
                </label>
              </div>
            ))}

            <div>
              <label className="form-input-label d-flex gap-2">Comment:</label>
              <textarea
                name="GastrointestinalComment"
                className="form-control"
                value={formData?.GastrointestinalComment}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="row">
          {/* Genitourinary */}
          <div className="col-md-3">
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
                    name="genitourinary"
                    data-category="genitourinary" // Pass the category here
                    value={item}
                    checked={formData?.genitourinary?.includes(item)}
                    onChange={handleCheckboxChange}
                  />
                  {item}
                </label>
              </div>
            ))}
          </div>

          {/* Musculoskeletal */}
          <div className="col-md-3">
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
                    data-category="musculoskeletal" // Pass the category here
                    value={item}
                    checked={formData?.musculoskeletal?.includes(item)}
                    onChange={handleCheckboxChange}
                  />
                  {item}
                </label>
              </div>
            ))}
          </div>

          {/* Integumentary */}
          <div className="col-md-3">
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
                    data-category="integumentary" // Pass the category here
                    value={item}
                    checked={formData?.integumentary?.includes(item)}
                    onChange={handleCheckboxChange}
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
              value={formData?.painProfile}
              onChange={handleInputChange}
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
              value={formData?.painProfileComment || ""}
              onChange={handleInputChange}
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
                    data-category="endocrineHematologic"
                    checked={formData?.endocrineHematologic?.includes(item)}
                    value={item}
                    onChange={handleCheckboxChange}
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
                    value={item}
                    data-category="nutrition"
                    checked={formData?.nutrition?.includes(item)}
                    onChange={handleCheckboxChange}
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
                    data-category="labs"
                    value={item}
                    checked={formData?.labs?.includes(item)}
                    onChange={handleCheckboxChange}
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
                    value={item}
                    data-category="infectionControl"
                    checked={formData?.infectionControl?.includes(item)}
                    onChange={handleCheckboxChange}
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
              <label htmlFor="mobility">Mobility</label>
              {[
                "Ambulatory",
                "Ambulatory with Device",
                "Bedfast (Unable to Sit in Chair)",
                "Chairfast",
              ].map((item) => (
                <label key={item} className="form-label-input d-flex gap-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name={item}
                    value={item}
                    data-category="mobility"
                    checked={formData?.mobility.includes(item)}
                    onChange={handleCheckboxChange}
                  />
                  {item}
                </label>
              ))}
            </div>

            <div className="row">
              <label htmlFor="assistiveDevices">Assistive Device</label>
              {[
                "Cane",
                "Crutches",
                "Human assistance",
                "Special transportation",
                "Special Walker",
                "Wheelchair",
              ].map((item) => (
                <label key={item} className="form-label-input d-flex gap-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name={item}
                    value={item}
                    data-category="assistiveDevices"
                    checked={formData?.assistiveDevices.includes(item)}
                    onChange={handleCheckboxChange}
                  />
                  {item}
                </label>
              ))}
            </div>

            <div className="row mt-3">
              <label htmlFor="homeboundNarrative">Homebound Narrative</label>
              <textarea
                id="homeboundNarrative"
                name="homeboundNarrative"
                className="form-control p-2"
                placeholder="Describe taxing effort and normal inability to leave home"
                value={formData?.homeboundNarrative}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
          <div className="col-md-3 my-2">
            <h6 className="mb-0 bg-secondary py-1 text-center text-white">
              Plan of Care
            </h6>

            {/* Plan of Care Select */}
            <label htmlFor="planOfCare" className="form-label">
              Plan of Care
            </label>
            <select
              name="planOfCare"
              className="form-select my-4"
              id="planOfCare"
              value={formData?.planOfCare}
              onChange={handleInputChange}
            >
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

            {/* Patient Response Checkboxes */}
            <label className="form-check-label">Patient Response</label>
            {[
              "Patient Willing/Able to Participate",
              "Patient Willing/Unable to Participate",
              "Patient Unwilling to Participate",
              "Patient with Barriers Impeding Full Participation",
            ].map((item) => (
              <label key={item} className="form-check-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name={item}
                  data-category="patientResponse"
                  value={item}
                  checked={formData?.patientResponse.includes(item)}
                  onChange={handleCheckboxChange}
                />
                {item}
              </label>
            ))}

            {/* Caregiver Involvement Checkboxes */}
            <label className="form-check-label">Caregiver Involvement</label>
            {[
              "Caregiver Involvement",
              "N/A(No Caregiver)",
              "CG Willing/Able to Participate",
              "CG Willing/Unable to Participate",
              "CG Unwilling to participate",
              "CG with Barriers Impeding Full Participation",
            ].map((item) => (
              <label key={item} className="form-check-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name={item}
                  data-category="caregiverInvolvement"
                  checked={formData?.caregiverInvolvement.includes(item)}
                  value={item}
                  onChange={handleCheckboxChange}
                />
                {item}
              </label>
            ))}

            {/* Caregiver Availability */}
            <label htmlFor="caregiverAvailability" className="form-label">
              Caregiver Availability
            </label>
            <input
              type="text"
              name="caregiverAvailability"
              className="form-control mb-4"
              id="caregiverAvailability"
              value={formData?.caregiverAvailability}
              onChange={handleInputChange}
            />

            {/* New/Changed Orders to POC Required */}
            <label htmlFor="newOrdersRequired" className="form-label">
              New/Changed Orders to POC Required
            </label>
            <div className="d-flex gap-2">
              <label className="d-flex gap-2">
                <input
                  type="radio"
                  name="newOrdersRequired"
                  value="Yes"
                  className="form-check-input"
                  checked={formData?.newOrdersRequired === "Yes"}
                  onChange={handleRadioChange}
                />
                Yes
              </label>
              <label className="d-flex gap-2">
                <input
                  type="radio"
                  name="newOrdersRequired"
                  value="No"
                  className="form-check-input"
                  checked={formData?.newOrdersRequired === "No"}
                  onChange={handleRadioChange}
                />
                No
              </label>
            </div>

            {/* New/Changed Order Select */}
            <label htmlFor="newChangedOrder" className="form-label">
              New/Changed Order
            </label>
            {[
              "Patient Notified of change to POC in advance of care to be performed",
              "Patient/CG/Legal Rep notified of changes to POC in advance of care to be performed",
              "Patient verbalized agreement with physician order ot change POC",
              "Caregiver verbalized agreement with physician order to change POC",
              "Patient/CG verbalized agreement with physician order to change POC",
              "Patient/CG/Legal Rep verbalized agreement with physician order to change POC",
              "Caregiver disagreed with physician order to change POC",
              "Patient/CG/Legal Rep disagreed with physician order to change POC",
              "Patient/CG/Legal Rep disagreed with physician order ot change POC",
            ].map((option) => (
              <label key={option} className="form-check-label d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name={option}
                  value={option}
                  data-category="newChangedOrder"
                  checked={formData?.newChangedOrder.includes(option)}
                  onChange={handleCheckboxChange}
                />
                {option}
              </label>
            ))}

            {/* Comment */}
            <textarea
              name="newOrderComment"
              placeholder="Comment"
              className="form-control mt-2"
              value={formData?.newOrderComment}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="col-md-3 my-2">
            <h6 className="text-white bg-secondary py-1 text-center">
              Discharge Planning
            </h6>
            {[
              "N/A",
              "Discharge Planning Discussed with:",
              "Legal Representative Received Discharge Notices per Agency Policy and Procedures:",
              "Patient Received Beneficiary Notice:",
            ].map((option) => (
              <label
                key={option}
                className="form-check-label d-flex gap-2 align-items-center"
              >
                <input
                  type="checkbox"
                  className="form-check-input"
                  name={option}
                  data-category="dischargePlanning"
                  checked={formData?.dischargePlanning.includes(option)}
                  value={option}
                  onChange={handleCheckboxChange}
                />
                {option}
              </label>
            ))}
            <label htmlFor="comment" className="form-label">
              Comment
            </label>
            <textarea
              id="comment"
              name="dischargeComment"
              className="form-control"
              placeholder="Comment"
              value={formData?.dischargeComment}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="col-md-3 my-2">
            <h6 className="text-center text-white bg-secondary py-1 mb-0">
              Care Coordination
            </h6>
            <label
              htmlFor="careCoordinationNA"
              className="form-check-label mt-3"
            >
              <input
                type="checkbox"
                name="careCoordinationNA"
                id="careCoordinationNA"
                className="form-check-input"
                checked={formData?.careCoordinationNA}
                onChange={handleInputChange}
              />
              N/A
            </label>
            <div className="row my-2">
              <button className="btn btn-primary my-2">Incident Log</button>
            </div>
            <label htmlFor="careCoordinatedWith" className="form-label">
              Care Coordinated with
            </label>
            <select
              name="careCoordinatedWith"
              id="careCoordinatedWith"
              className="form-select"
              value={formData?.careCoordinatedWith}
              onChange={handleInputChange}
            >
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
            <label htmlFor="nameTitle" className="form-label">
              Name/Title
            </label>
            <input
              type="text"
              name="nameTitle"
              id="nameTitle"
              className="form-control"
              placeholder="Enter Name or Title"
              value={formData?.nameTitle}
              onChange={handleInputChange}
            />
            <label htmlFor="regarding" className="form-label">
              Regarding
            </label>
            <input
              type="text"
              name="regarding"
              id="regarding"
              className="form-control"
              placeholder="Enter Care information"
              value={formData?.regarding}
              onChange={handleInputChange}
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
                    name="medicationsReconciled"
                    checked={formData?.medicationsReconciled}
                    onChange={handleInputChange}
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
                    name="newChangedMedications"
                    checked={formData?.newChangedMedications}
                    onChange={handleInputChange}
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
                    name="medicationIssuesIdentified"
                    checked={formData?.medicationIssuesIdentified}
                    onChange={handleInputChange}
                  />
                  <label
                    htmlFor="medicationIssuesIdentified"
                    className="form-check-label"
                  >
                    Medication Issues Identified
                  </label>
                </div>

                {formData?.medicationIssuesIdentified && (
                  <>
                    <label className="form-label mt-3">
                      Medication Issues Identified Options
                    </label>
                    {[
                      "Adverse Reaction To Medication",
                      "Drug interaction",
                      "Duplicate therapy",
                      "Ineffective Drug Therapy",
                      "Missing Drugs From Ordered Regimen",
                      "Non Adherence",
                      "Taking More Medication Than Prescribed",
                      "Taking Less Medication Than Prescribed",
                      "Physician notified: medication issue identified",
                      "Clinical Manager notified: medication issue identified",
                      "No elements found. Consider changing the search query.",
                      "List is empty.",
                    ].map((option) => (
                      <div className="form-check" key={option}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`medicationIssuesOptions${option}`}
                          name="medicationIssuesOptions"
                          value={option}
                          data-category="medicationIssuesOptions"
                          checked={formData?.medicationIssuesOptions.includes(
                            option
                          )}
                          onChange={handleCheckboxChange}
                        />
                        <label
                          htmlFor={`medicationIssuesOptions${option}`}
                          className="form-check-label"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                    <div className="form-group mt-3">
                      <label htmlFor="medicationDescription">
                        Medication(s) Name and Description of Issue:
                      </label>
                      <textarea
                        id="medicationDescription"
                        name="medicationDescription"
                        className="form-control"
                        rows="3"
                        value={formData?.medicationDescription}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                  </>
                )}
              </div>

              <div className="col-md-4">
                <div className="form-check mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="pillBoxPrefilled"
                    name="pillBoxPrefilled"
                    checked={formData?.pillBoxPrefilled}
                    onChange={handleInputChange}
                  />
                  <label
                    htmlFor="pillBoxPrefilled"
                    className="form-check-label"
                  >
                    PillBox Prefilled
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="insulinSyringesPrefilled"
                    name="insulinSyringesPrefilled"
                    checked={formData?.insulinSyringesPrefilled}
                    onChange={handleInputChange}
                  />
                  <label
                    htmlFor="insulinSyringesPrefilled"
                    className="form-check-label"
                  >
                    Insulin Syringes Prefilled
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="homeEnvironmentAltered"
                    name="homeEnvironmentAltered"
                    checked={formData?.homeEnvironmentAltered}
                    onChange={handleInputChange}
                  />
                  <label
                    htmlFor="homeEnvironmentAltered"
                    className="form-check-label"
                  >
                    Home Environment Altered
                  </label>
                  {formData?.homeEnvironmentAltered && (
                    <>
                      {[
                        "Able to only buy necessities",
                        "Caregiver burnout",
                        "Cluttered/soiled living conditions",
                        "Difficult buying necessities",
                        "Inadequate cooling/heating",
                        "Lack of caregiver/family support",
                        "Limited social contact",
                        "Low/no income",
                        "Poor home environment",
                        "Structural barriers",
                        "Unsafe floor coverings",
                        "No elements found. Consider changing the search query.",
                        "List is empty.",
                      ].map((option) => (
                        <div className="form-check" key={option}>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`homeEnvironmentAltereds${option}`}
                            name="homeEnvironmentAltereds"
                            value={option}
                            data-category="homeEnvironmentAltereds"
                            checked={formData?.homeEnvironmentAltereds.includes(
                              option
                            )}
                            onChange={handleCheckboxChange}
                          />
                          <label
                            htmlFor={`homeEnvironmentAltereds${option}`}
                            className="form-check-label"
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </>
                  )}
                </div>

                <div className="form-check mb-2 mt-3">
                  <input
                    type="checkbox"
                    name="suspectedAbuse"
                    id="suspectedAbuseCheckbox"
                    className="form-check-input"
                    checked={formData?.suspectedAbuse}
                    onChange={handleInputChange}
                  />
                  <label
                    htmlFor="suspectedAbuseCheckbox"
                    className="form-check-label"
                  >
                    Suspected Abuse
                  </label>
                </div>
                {formData?.suspectedAbuse && (
                  <>
                    {[
                      "Exploitation of funds",
                      "Fearful of family member",
                      "Inadequate food",
                      "Left unattended when supervision required",
                      "Neglect",
                      "Sexual abuse",
                      "Unexplained bruises/injuries",
                      "APS referral made",
                      "Other",
                      "No elements found. Consider changing the search query.",
                      "List is empty.",
                    ].map((option) => (
                      <div className="form-check" key={option}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`suspectedAbuseOptions${option}`}
                          name="suspectedAbuseOptions"
                          value={option}
                          data-category="suspectedAbuseOptions"
                          checked={formData?.suspectedAbuseOptions.includes(
                            option
                          )}
                          onChange={handleCheckboxChange}
                        />
                        <label
                          htmlFor={`suspectedAbuseOption${option}`}
                          className="form-check-label"
                        >
                          {option}
                          {/* Formats the option label */}
                        </label>
                      </div>
                    ))}
                  </>
                )}
              </div>

              <div className="col-md-4">
                <div className="form-check mb-2">
                  <input
                    type="checkbox"
                    name="barriersToHealthStatus"
                    id="barriersToHealthStatusCheckbox"
                    className="form-check-input"
                    checked={formData?.barriersToHealthStatus}
                    onChange={handleInputChange}
                  />
                  <label
                    htmlFor="barriersToHealthStatusCheckbox"
                    className="form-check-label"
                  >
                    Barriers to Health Status
                  </label>
                </div>
                {formData?.barriersToHealthStatus && (
                  <>
                    {" "}
                    {[
                      "Cost/out of pocket expenses",
                      "Difficult buying medications",
                      "Educational deficits/low literacy",
                      "Lack of satisfaction/trust with health provider",
                      "Lack of transportation",
                      "Multiple co-morbidity",
                      "Multiple health providers",
                      "Perception of lacking health provider response",
                      "Poor self-concept",
                      "Unmotivated learner",
                      "No elements found. Consider changing the search query.",
                      "List is empty.",
                    ].map((option) => (
                      <div className="form-check" key={option}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`barriersOption${option}`}
                          name="barriersToHealthStatusOptions"
                          value={option}
                          data-category="barriersToHealthStatusOptions"
                          checked={formData?.barriersToHealthStatusOptions.includes(
                            option
                          )}
                          onChange={handleCheckboxChange}
                        />
                        <label
                          htmlFor={`barriersOption${option}`}
                          className="form-check-label"
                        >
                          {option}
                          {/* Formats the option label */}
                        </label>
                      </div>
                    ))}
                  </>
                )}

                <div className="form-check mb-2 mt-3">
                  <input
                    type="checkbox"
                    name="heartFailureSymptoms"
                    id="heartFailureSymptomsCheckbox"
                    className="form-check-input"
                    checked={formData?.heartFailureSymptoms}
                    onChange={handleInputChange}
                  />
                  <label
                    htmlFor="heartFailureSymptomsCheckbox"
                    className="form-check-label"
                  >
                    Exhibiting Signs/Symptoms of Heart Failure:
                  </label>
                </div>
                {formData?.heartFailureSymptoms && (
                  <>
                    {[
                      "Physician contacted",
                      "Advised to seek emergency treatment",
                      "Patient education",
                      "Received orders to change POC",
                      "Physician notified: patient exhibiting s/s of heart failure",
                      "Clinical Manager notified: patient exhibiting s/s of heart failure",
                      "Comment",
                      "No elements found. Consider changing the search query.",
                      "List is empty.",
                    ].map((option) => (
                      <div className="form-check" key={option}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`heartFailureSymptomsOptions${option}`}
                          name="heartFailureSymptomsOptions"
                          value={option}
                          data-category="heartFailureSymptomsOptions"
                          checked={formData?.heartFailureSymptomsOptions.includes(
                            option
                          )}
                          onChange={handleCheckboxChange}
                        />
                        <label
                          htmlFor={`heartFailureSymptomsOptions${option}`}
                          className="form-check-label"
                        >
                          Heart Failure Option {option}
                          {/* Formats the option label */}
                        </label>
                      </div>
                    ))}
                  </>
                )}

                <div className="form-check mb-2 mt-3">
                  <input
                    type="checkbox"
                    name="comorbiditySymptoms"
                    id="comorbiditySymptomsCheckbox"
                    className="form-check-input"
                    checked={formData?.comorbiditySymptoms}
                    onChange={handleInputChange}
                  />
                  <label
                    htmlFor="comorbiditySymptomsCheckbox"
                    className="form-check-label"
                  >
                    Exhibiting Signs/Symptoms of Other Co-Morbidity:
                  </label>
                </div>
                {formData?.comorbiditySymptoms && (
                  <>
                    {" "}
                    {[
                      "Advised to seek emergency treatment",
                      "Followed established parameters",
                      "Patient education",
                      "Received orders to change POC",
                      "Physician notified: exhibiting S/S of other co-morbidity",
                      "Clinical Manager notified: exhibiting s/s of other co-morbidity",
                      "Comment",
                      "No elements found. Consider changing the search query.",
                      "List is empty.",
                    ].map((option) => (
                      <div className="form-check" key={option}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`comorbidityOption${option}`}
                          name="comorbiditySymptomsOptions"
                          value={option}
                          data-category="comorbiditySymptomsOptions"
                          checked={formData?.comorbiditySymptomsOptions.includes(
                            option
                          )}
                          onChange={handleCheckboxChange}
                        />
                        <label
                          htmlFor={`comorbidityOption${option}`}
                          className="form-check-label"
                        >
                          {option}
                          {/* Formats the option label */}
                        </label>
                      </div>
                    ))}
                  </>
                )}
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
            <Template
              setSelectedTemplate={setInterventionsText}
              selectedTemplate={interventionsText}
            />
          </div>
          <div className="col-md-6">
            <textarea
              name="interventions"
              id=""
              value={formData?.interventions || ""}
              className="form-control"
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>

        <div className="row">
          <h6 className="text-center text-white py-1 mb-0 bg-secondary my-2">
            Response to Care/Progress Toward Goals/Plan for Next Visit
          </h6>
          <textarea
            name="responseToCare"
            className="form-control mt-3"
            value={formData?.responseToCare || ""}
            onChange={(e) =>
              setFormData({ ...formData, responseToCare: e.target.value })
            }
          />
        </div>
        <div className="row">
          <h6 className="text-center text-white py-1 mb-0 bg-secondary my-2">
            Medical Necessity for Care
          </h6>
          <textarea
            name="medicalNecessity"
            className="form-control mt-3"
            value={formData?.medicalNecessity || ""}
            onChange={(e) =>
              setFormData({ ...formData, medicalNecessity: e.target.value })
            }
          />
        </div>
        <div className="row">
          <h6 className="text-center text-white bg-secondary py-1">
            Visit Narrative
          </h6>
          <div className="col-md-6">
            {/* visitNarrativeText
          setVisitNarrativeText */}
            <Template
              setSelectedTemplate={setVisitNarrativeText}
              selectedTemplate={visitNarrativeText}
            />
          </div>
          <div className="col-md-6">
            <textarea
              name="visitNarrative"
              className="form-control"
              value={formData?.visitNarrative || ""}
              onChange={handleInputChange}
            />
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
              <button className="btn btn-sm btn-secondary">
                Immunization Log
              </button>
            </div>
          </div>
          <div className="col-md-8">
            <h6 className="text-center mb-0 py-1 text-white bg-secondary">
              Electronic Signature
            </h6>
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="clinicianSignature" className="form-label">
                  Clinician Signature
                </label>
                <input
                  type="text"
                  name="clinicianSignature"
                  className="form-control"
                  value={formData?.clinicianSignature || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      clinicianSignature: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="signatureDate" className="form-label">
                  Signature Date
                </label>
                <input
                  type="date"
                  name="signatureDate"
                  className="form-control"
                  value={formData?.signatureDate || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, signatureDate: e.target.value })
                  }
                />
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
          x
          <button type="submit" className="submit-button btn btn-primary mt-5">
            Complete
          </button>
        </div>
      </div>
    </form>
  );
};

export default LvnOrLpn;
