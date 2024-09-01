import { useState, useEffect } from "react";
import PageHeader from "./../../FormElement/PageHeader";
import Template from "./../../FormElement/Template";
import {
  useGetHHACarePlanByIdQuery,
  useCreateHHACarePlanMutation,
} from "../../../Redux/api/VisitType/HhaCarePlan";
import { showToast } from "./../../../utils/Toastify";
const HHACarePlan = ({ data }) => {
  const [createHHACarePlan, { data: hhaCarePlanData, isSuccess, error }] =
    useCreateHHACarePlanMutation();
  const { data: getData, refetch } = useGetHHACarePlanByIdQuery(data?._id);
  const [interventionsText, setInterventionsText] = useState("");
  const [visitNarrativeText, setVisitNarrativeText] = useState("");
  console.log(getData);
  const [formData, setFormData] = useState({
    visitDate: "",
    carePlans: "",
    freQuency: "",
    previousCarePlans: "",
    dnr: "no",
    diet: "",
    allergies: "",
    safetyPrecautions: [],
    functionalLimitations: [],
    activitiesPermitted: [],
    temperature: "",
    bloodPressure: "",
    heartRate: "",
    respirations: "",
    bedBath: "",
    assistWithChairBath: "",
    tubBath: "",
    shower: "",
    showerWCha: "",
    shampooHair: "",
    hairCareCombHair: "",
    oralCare: "",
    skinCare: "",
    periCare: "",
    nailCare: "",
    shave: "",
    assistWithDressing: "",
    medication: "",
    assistWithBedPanUrinal: "",
    assistWithBSC: "",
    incontinenceCare: "",
    emptyDrainageBag: "",
    recordBowelMovement: "",
    dangleOnSideOfBed: "",
    turnAndPosition: "",
    assistWithTransfer: "",
    rangeOfMotion: "",
    assistWithAmbulation: "",
    equipmentCare: "",
    makeBed: "",
    changeLinen: "",
    lightHousekeeping: "",
    MealSetup: "",
    assistWithFeeding: "",
    additionalInstructions: "",
    healthAide: "",
    orientedCarePlan: "",
    clinicianSignature: "",
    signatureDate: "",
    returnToClinicianForSignature: "",
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
    console.log(formData);
    createHHACarePlan(formData);
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
  const handleVitalSignsChange = (e, sign, type) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      vitalSigns: {
        ...prevData.vitalSigns,
        [sign]: {
          ...prevData.vitalSigns?.[sign],
          [type]: value,
        },
      },
    }));
  };
  useEffect(() => {
    setFormData((prev) => ({}));
  }, [interventionsText.value, visitNarrativeText.value]);
  useEffect(() => {
    if (isSuccess) {
      showToast("success", hhaCarePlanData?.message);
      refetch();
    }
    if (error) {
      showToast("error", error?.data?.message);
    }
  }, [isSuccess, error, hhaCarePlanData, refetch]);
  useEffect(() => {
    if (getData?.payload?.record) {
      let updateData = { ...getData.payload.record };
      // Convert the dates to the correct format
      if (updateData.visitDate) {
        updateData.visitDate = new Date(updateData.visitDate)
          .toISOString()
          .split("T")[0];
      }

      if (updateData.signatureDate) {
        updateData.signatureDate = new Date(updateData.signatureDate)
          .toISOString()
          .split("T")[0];
      }
      // Set the updated data to the form data state
      setFormData(updateData);
    }
  }, [getData?.payload?.record]);

  return (
    <form onSubmit={handleSubmit} className="create-patient-form card">
      <div className="card-body">
        <div className="row mt-5">
          <PageHeader title={data.visitType} />
        </div>
        <div className="row mt-5 w-100 text-center">
          <p className="fs-4 text-capitalize text-black font-bolder">
            {data?.patientName}
          </p>
        </div>
        <div className="row mt-2 border py-2">
          <div className="col-md-6 d-flex flex-column gap-2">
            <div className="input-group d-flex justify-content-between align-items-center gap-2">
              <label
                htmlFor=""
                className="form-label d-flex gap-2 align-items-center"
              >
                Episode Period:
              </label>
              <span>{data?.episode}</span>
            </div>
            <div className="input-group justify-content-between align-items-center gap-2">
              <label
                htmlFor=""
                className="form-label d-flex gap-2 align-items-center"
              >
                Visit Date Period:
              </label>
              <input
                type="date"
                name="visitDate"
                value={formData?.visitDate}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="input-group justify-content-between align-items-center gap-2">
              <label
                htmlFor=""
                className="form-label d-flex gap-2 align-items-center"
              >
                Frequency:
              </label>
              <input
                type="text"
                name="freQuency"
                value={formData?.freQuency}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="input-group justify-content-between align-items-center gap-2">
              <label
                htmlFor=""
                className="form-label d-flex gap-2 align-items-center"
              >
                Primary Diagnosis:
              </label>
            </div>
          </div>
          <div className="col-md-6 d-flex gap-2 flex-column ">
            <div className="input-group justify-content-between align-items-center gap-2">
              <label
                htmlFor=""
                className="form-label d-flex gap-2 align-items-center"
              >
                Previous Care Plans:
              </label>
              <select
                name="carePlans"
                onChange={handleInputChange}
                id=""
                className="form-select"
              >
                <option value="">select Care plans</option>
              </select>
            </div>
            <div className="input-group justify-content-between align-items-center gap-2">
              <label
                htmlFor="drn"
                className="form-label d-flex gap-2 align-items-center"
              >
                DNR:
              </label>
              <label
                htmlFor="drn-yes"
                className="form-check-label d-flex gap-2 align-items-center"
              >
                <input
                  type="radio"
                  checked={formData?.dnr === "yes"}
                  className="form-check-input"
                  name="dnr"
                  value="yes"
                  onChange={handleRadioChange}
                  id="drn-yes"
                />
                Yes
              </label>
              <label
                htmlFor="drn-no"
                className="form-check-label d-flex gap-2 align-items-center"
              >
                <input
                  type="radio"
                  checked={formData?.dnr === "no"}
                  className="form-check-input"
                  name="dnr"
                  value="no"
                  onChange={handleRadioChange}
                  id="drn-no"
                />
                No
              </label>
            </div>

            <div className="input-group d-flex flex-column justify-content-between  gap-2">
              <label
                htmlFor=""
                className="form-check-label d-flex gap-2 align-items-center"
              >
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="diet"
                  checked={formData?.diet}
                  id=""
                  onChange={handleChange}
                />
                Diet:
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-2 align-items-center"
              >
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="allergies"
                  checked={formData?.allergies}
                  id=""
                  onChange={handleChange}
                />
                Allergies:
              </label>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <h5 className="mt-4 border-bottom pb-1 bg-secondary px-2 text-white text-center pt-1">
            Vital Signs
          </h5>
          {["SBP", "DBP", "HR", "Resp", "Temp", "Weight", "BG"].map((sign) => (
            <div className="mb-3 row" key={sign}>
              <label className="form-label col-sm-2">
                {sign.replace(/([A-Z])/g, " $1").toUpperCase()}
              </label>
              <div className="col-sm-5">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Lowest"
                  value={formData?.vitalSigns?.[sign]?.lowest || ""}
                  onChange={(e) => handleVitalSignsChange(e, sign, "lowest")}
                />
              </div>
              <div className="col-sm-5">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Highest"
                  value={formData?.vitalSigns?.[sign]?.highest || ""}
                  onChange={(e) => handleVitalSignsChange(e, sign, "highest")}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="row mt-2">
          <h5 className="mt-4 border-bottom pb-1 bg-secondary px-2 text-white text-center pt-1">
            Safety Precautions
          </h5>
          <div>
            {[
              "Anticoagulant Precautions",
              "Emergency Plan Developed",
              "Fall Precautions",
              "Keep Pathway Clear",
              "Keep Side Rails Up",
              "Neutropenic Precautions",
              "O2 Precautions",
              "Proper Position During Meals",
              "Safety in ADLs",
              "Seizure Precautions",
              "Sharps Safety",
              "Slow Position Change",
              "Standard Precautions/ Infection Control",
              "Use of Assistive Devices",
            ].map((issue) => (
              <div key={issue}>
                <label className="d-flex gap-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="safetyPrecautions"
                    value={issue}
                    id={`safetyPrecautions${issue}`}
                    data-category="safetyPrecautions"
                    checked={formData?.safetyPrecautions?.includes(issue)}
                    onChange={handleCheckboxChange}
                  />
                  {issue}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-6">
            <h5 className="mt-4 border-bottom pb-1 bg-secondary px-2 text-white text-center pt-1">
              Functional Limitations
            </h5>
            <div>
              {[
                "Amputation",
                "Bowel/Bladder Incontinence",
                "Contracture",
                "Hearing",
                "Paralysis",
                "Other",
                "Endurance",
                "Ambulation",
                "Speech",
                "Legally Blind",
                "Dyspnea with Minimal Exertion",
              ].map((issue) => (
                <div key={issue}>
                  <label className="d-flex gap-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="functionalLimitations"
                      value={issue}
                      id={`functionalLimitations${issue}`}
                      data-category="functionalLimitations"
                      checked={formData?.functionalLimitations?.includes(issue)}
                      onChange={handleCheckboxChange}
                    />
                    {issue}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-6">
            <h5 className="mt-4 border-bottom pb-1 bg-secondary px-2 text-white text-center pt-1">
              Activities Permitted
            </h5>
            <div>
              {[
                "Complete bed rest",
                "Up as tolerated",
                "Transfer bed-chair",
                "Exercise prescribed",
                "Partial weight bearing",
                "Independent at home",
                "Crutches",
                "Cane",
                "Wheelchair",
                "Walker",
                "Other:",
              ].map((issue) => (
                <div key={issue}>
                  <label className="d-flex gap-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="activitiesPermitted"
                      value={issue}
                      id={`activitiesPermitted${issue}`}
                      data-category="activitiesPermitted"
                      checked={formData?.activitiesPermitted?.includes(issue)}
                      onChange={handleCheckboxChange}
                    />
                    {issue}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <h5 className="mt-4 border-bottom pb-1 bg-secondary px-2 text-white text-center pt-1">
            Plan Details
          </h5>
          <div className="col-md-6">
            <table className="table">
              <tr>
                <th>Assignment</th>
                <th colSpan="3">Status</th>
              </tr>
              <tr>
                <th>Vital Signs</th>
                <th>Qv</th>
                <th>QW</th>
                <th>N/A</th>
              </tr>
              <tr>
                <td>
                  <label htmlFor="" className="form-check-label">
                    Temperature
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.temperature === "QV"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QV"
                      name="temperature"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.temperature === "QW"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QW"
                      name="temperature"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.temperature === "NA"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="NA"
                      name="temperature"
                      id=""
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="" className="form-check-label">
                    Blood Pressure
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.bloodPressure === "QV"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QV"
                      name="bloodPressure"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.bloodPressure === "QW"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QW"
                      name="bloodPressure"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.bloodPressure === "NA"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="NA"
                      name="bloodPressure"
                      id=""
                      onChange={handleRadioChange}
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="" className="form-check-label">
                    Heart Rate
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.heartRate === "QV"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QV"
                      name="heartRate"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.heartRate === "QW"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QW"
                      name="heartRate"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.heartRate === "NA"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="NA"
                      name="heartRate"
                      id=""
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="" className="form-check-label">
                    Respirations
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.respirations === "QV"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QV"
                      name="respirations"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.respirations === "QW"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QW"
                      name="respirations"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.respirations === "NA"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="NA"
                      name="respirations"
                      id=""
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <th>Personal Care</th>
                <th>Qv</th>
                <th>QW</th>
                <th>N/A</th>
              </tr>
              <tr>
                <td>
                  <label htmlFor="" className="form-check-label">
                    Bed Bath
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.bedBath === "QV"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QV"
                      name="bedBath"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.bedBath === "QW"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QW"
                      name="bedBath"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.bedBath === "NA"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="NA"
                      name="bedBath"
                      id=""
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="" className="form-check-label">
                    Assist with Chair Bath
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.assistWithChairBath === "QV"}
                      className="form-check-input"
                      value="QV"
                      onChange={handleRadioChange}
                      name="assistWithChairBath"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.assistWithChairBath === "QW"}
                      className="form-check-input"
                      value="QW"
                      onChange={handleRadioChange}
                      name="assistWithChairBath"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.assistWithChairBath === "NA"}
                      className="form-check-input"
                      value="NA"
                      onChange={handleRadioChange}
                      name="assistWithChairBath"
                      id=""
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="" className="form-check-label">
                    Tub Bath
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.tubBath === "QV"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QV"
                      name="tubBath"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.tubBath === "QW"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QW"
                      name="tubBath"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.tubBath === "NA"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="NA"
                      name="tubBath"
                      id=""
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="" className="form-check-label">
                    Shower
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.shower === "QV"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QV"
                      name="shower"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.shower === "QW"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QW"
                      name="shower"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.shower === "NA"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="NA"
                      name="shower"
                      id=""
                    />
                  </label>
                </td>
              </tr>

              <tr>
                <td>
                  <label htmlFor="" className="form-check-label">
                    Shower w/Chair
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.showerWCha === "QV"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QV"
                      name="showerWCha"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.showerWCha === "QW"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QW"
                      name="showerWCha"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.showerWCha === "NA"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="NA"
                      name="showerWCha"
                      id=""
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="" className="form-check-label">
                    Shampoo Hair
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.shampooHair === "QV"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QV"
                      name="shampooHair"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.shampooHair === "QW"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QW"
                      name="shampooHair"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.shampooHair === "NA"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="NA"
                      name="shampooHair"
                      id=""
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="" className="form-check-label">
                    Hair Care/Comb Hair{" "}
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.hairCareCombHair === "QV"}
                      className="form-check-input"
                      value="QV"
                      onChange={handleRadioChange}
                      name="hairCareCombHair"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.hairCareCombHair === "QW"}
                      className="form-check-input"
                      value="QW"
                      onChange={handleRadioChange}
                      name="hairCareCombHair"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.hairCareCombHair === "NA"}
                      className="form-check-input"
                      value="NA"
                      onChange={handleRadioChange}
                      name="hairCareCombHair"
                      id=""
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="" className="form-check-label">
                    Oral Care
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.oralCare === "QV"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QV"
                      name="oralCare"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.oralCare === "QW"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QW"
                      name="oralCare"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.oralCare === "NA"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="NA"
                      name="oralCare"
                      id=""
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="" className="form-check-label">
                    Skin Care
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.skinCare === "QV"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QV"
                      name="skinCare"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.skinCare === "QW"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QW"
                      name="skinCare"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.skinCare === "NA"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="NA"
                      name="skinCare"
                      id=""
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="" className="form-check-label">
                    Pericare
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.periCare === "QV"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QV"
                      name="periCare"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.periCare === "QW"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QW"
                      name="periCare"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.periCare === "NA"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="NA"
                      name="periCare"
                      id=""
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="" className="form-check-label">
                    Nail Care
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.nailCare === "QV"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QV"
                      name="nailCare"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.nailCare === "QW"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QW"
                      name="nailCare"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.nailCare === "NA"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="NA"
                      name="nailCare"
                      id=""
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="" className="form-check-label">
                    Shave
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.shave === "QV"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QV"
                      name="shave"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.shave === "QW"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QW"
                      name="shave"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.shave === "NA"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="NA"
                      name="shave"
                      id=""
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="" className="form-check-label">
                    Assist with Dressing
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.assistWithDressing === "QV"}
                      className="form-check-input"
                      value="QV"
                      onChange={handleRadioChange}
                      name="assistWithDressing"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.assistWithDressing === "QW"}
                      className="form-check-input"
                      value="QW"
                      onChange={handleRadioChange}
                      name="assistWithDressing"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.assistWithDressing === "NA"}
                      className="form-check-input"
                      value="NA"
                      onChange={handleRadioChange}
                      name="assistWithDressing"
                      id=""
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="" className="form-check-label">
                    Medication
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.medication === "QV"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QV"
                      name="medication"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.medication === "QW"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QW"
                      name="medication"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.medication === "NA"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="NA"
                      name="medication"
                      id=""
                    />
                  </label>
                </td>
              </tr>
            </table>
          </div>
          <div className="col-md-6">
            <table className="table">
              <tr>
                <th>Assignment</th>
                <th colSpan="3">Status</th>
              </tr>
              <tr>
                <th>Elimination</th>
                <th>Qv</th>
                <th>QW</th>
                <th>N/A</th>
              </tr>
              <tr>
                <td>
                  <label htmlFor="" className="form-check-label">
                    Assist with Bed Pan/Urinal
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.assistWithBedPanUrinal === "QV"}
                      className="form-check-input"
                      value="QV"
                      name="assistWithBedPanUrinal"
                      id=""
                      onChange={handleRadioChange}
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.assistWithBedPanUrinal === "QW"}
                      className="form-check-input"
                      value="QW"
                      onChange={handleRadioChange}
                      name="assistWithBedPanUrinal"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.assistWithBedPanUrinal === "NA"}
                      className="form-check-input"
                      value="NA"
                      onChange={handleRadioChange}
                      name="assistWithBedPanUrinal"
                      id=""
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="" className="form-check-label">
                    Assist with BSC
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.assistWithBSC === "QV"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QV"
                      name="assistWithBSC"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.assistWithBSC === "QW"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QW"
                      name="assistWithBSC"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.assistWithBSC === "NA"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="NA"
                      name="assistWithBSC"
                      id=""
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="" className="form-check-label">
                    Incontinence Care
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.incontinenceCare === "QV"}
                      className="form-check-input"
                      value="QV"
                      onChange={handleRadioChange}
                      name="incontinenceCare"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.incontinenceCare === "QW"}
                      className="form-check-input"
                      value="QW"
                      onChange={handleRadioChange}
                      name="incontinenceCare"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.incontinenceCare === "NA"}
                      className="form-check-input"
                      value="NA"
                      onChange={handleRadioChange}
                      name="incontinenceCare"
                      id=""
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="" className="form-check-label">
                    Empty Drainage Bag
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.emptyDrainageBag === "QV"}
                      className="form-check-input"
                      value="QV"
                      onChange={handleRadioChange}
                      name="emptyDrainageBag"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.emptyDrainageBag === "QW"}
                      className="form-check-input"
                      value="QW"
                      onChange={handleRadioChange}
                      name="emptyDrainageBag"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.emptyDrainageBag === "NA"}
                      className="form-check-input"
                      value="NA"
                      name="emptyDrainageBag"
                      onChange={handleRadioChange}
                      id=""
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="" className="form-check-label">
                    Record Bowel Movement
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.recordBowelMovement === "QV"}
                      className="form-check-input"
                      value="QV"
                      onChange={handleRadioChange}
                      name="recordBowelMovement"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.recordBowelMovement === "QW"}
                      className="form-check-input"
                      value="QW"
                      onChange={handleRadioChange}
                      name="recordBowelMovement"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.recordBowelMovement === "NA"}
                      className="form-check-input"
                      value="NA"
                      onChange={handleRadioChange}
                      name="recordBowelMovement"
                      id=""
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <th>Activity</th>
                <th>Qv</th>
                <th>QW</th>
                <th>N/A</th>
              </tr>
              <tr>
                <td>
                  <label htmlFor="" className="form-check-label">
                    Dangle on Side of Bed
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.dangleOnSideOfBed === "QV"}
                      className="form-check-input"
                      value="QV"
                      name="dangleOnSideOfBed"
                      onChange={handleRadioChange}
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.dangleOnSideOfBed === "QW"}
                      className="form-check-input"
                      value="QW"
                      onChange={handleRadioChange}
                      name="dangleOnSideOfBed"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.dangleOnSideOfBed === "NA"}
                      className="form-check-input"
                      value="NA"
                      onChange={handleRadioChange}
                      name="dangleOnSideOfBed"
                      id=""
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="" className="form-check-label">
                    Turn & Position
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.turnAndPosition === "QV"}
                      className="form-check-input"
                      value="QV"
                      name="turnAndPosition"
                      onChange={handleRadioChange}
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.turnAndPosition === "QW"}
                      className="form-check-input"
                      value="QW"
                      onChange={handleRadioChange}
                      name="turnAndPosition"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.turnAndPosition === "NA"}
                      className="form-check-input"
                      value="NA"
                      onChange={handleRadioChange}
                      name="turnAndPosition"
                      id=""
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="" className="form-check-label">
                    Assist With Transfer
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.assistWithTransfer === "QV"}
                      className="form-check-input"
                      value="QV"
                      onChange={handleRadioChange}
                      name="assistWithTransfer"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.assistWithTransfer === "QW"}
                      className="form-check-input"
                      value="QW"
                      onChange={handleRadioChange}
                      name="assistWithTransfer"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.assistWithTransfer === "NA"}
                      className="form-check-input"
                      value="NA"
                      name="assistWithTransfer"
                      onChange={handleRadioChange}
                      id=""
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="" className="form-check-label">
                    Range Of Motion
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.rangeOfMotion === "QV"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QV"
                      name="rangeOfMotion"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.rangeOfMotion === "QW"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QW"
                      name="rangeOfMotion"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.rangeOfMotion === "NA"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="NA"
                      name="rangeOfMotion"
                      id=""
                    />
                  </label>
                </td>
              </tr>

              <tr>
                <td>
                  <label htmlFor="" className="form-check-label">
                    Assist With Ambulation
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.assistWithAmbulation === "QV"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QV"
                      name="assistWithAmbulation"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.assistWithAmbulation === "QW"}
                      className="form-check-input"
                      value="QW"
                      onChange={handleRadioChange}
                      name="assistWithAmbulation"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.assistWithAmbulation === "NA"}
                      className="form-check-input"
                      value="NA"
                      name="assistWithAmbulation"
                      onChange={handleRadioChange}
                      id=""
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="" className="form-check-label">
                    Equipment Care
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.equipmentCare === "QV"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QV"
                      name="equipmentCare"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.equipmentCare === "QW"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QW"
                      name="equipmentCare"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.equipmentCare === "NA"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="NA"
                      name="equipmentCare"
                      id=""
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <th>Household Task</th>
                <th>Qv</th>
                <th>QW</th>
                <th>N/A</th>
              </tr>
              <tr>
                <td>
                  <label htmlFor="" className="form-check-label">
                    Make Bed{" "}
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.makeBed === "QV"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QV"
                      name="makeBed"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.makeBed === "QW"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QW"
                      name="makeBed"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.makeBed === "NA"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="NA"
                      name="makeBed"
                      id=""
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="" className="form-check-label">
                    Change Linen
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.changeLinen === "QV"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QV"
                      name="changeLinen"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.changeLinen === "QW"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QW"
                      name="changeLinen"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.changeLinen === "NA"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="NA"
                      name="changeLinen"
                      id=""
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="" className="form-check-label">
                    Light Housekeeping
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.lightHousekeeping === "QV"}
                      className="form-check-input"
                      value="QV"
                      name="lightHousekeeping"
                      onChange={handleRadioChange}
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.lightHousekeeping === "QW"}
                      className="form-check-input"
                      value="QW"
                      onChange={handleRadioChange}
                      name="lightHousekeeping"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.lightHousekeeping === "NA"}
                      className="form-check-input"
                      value="NA"
                      name="lightHousekeeping"
                      onChange={handleRadioChange}
                      id=""
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <th>Nutrition</th>
                <th>Qv</th>
                <th>QW</th>
                <th>N/A</th>
              </tr>
              <tr>
                <td>
                  <label htmlFor="" className="form-check-label">
                    Meal Set-up
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.MealSetup === "QV"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QV"
                      name="MealSetup"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.MealSetup === "QW"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="QW"
                      name="MealSetup"
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.MealSetup === "NA"}
                      className="form-check-input"
                      onChange={handleRadioChange}
                      value="NA"
                      name="MealSetup"
                      id=""
                    />
                  </label>
                </td>
              </tr>

              <tr>
                <td>
                  <label htmlFor="" className="form-check-label">
                    Assist With Feeding
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.assistWithFeeding === "QV"}
                      className="form-check-input"
                      value="QV"
                      name="assistWithFeeding"
                      onChange={handleRadioChange}
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.assistWithFeeding === "QW"}
                      className="form-check-input"
                      value="QW"
                      name="assistWithFeeding"
                      onChange={handleRadioChange}
                      id=""
                    />
                  </label>
                </td>
                <td>
                  <label htmlFor="" className="form-check-label">
                    <input
                      type="radio"
                      checked={formData?.assistWithFeeding === "NA"}
                      className="form-check-input"
                      value="NA"
                      onChange={handleRadioChange}
                      name="assistWithFeeding"
                      id=""
                    />
                  </label>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className="row mt-2">
          <h5 className="mt-4 border-bottom pb-1 bg-secondary px-2 text-white text-center pt-1">
            Comments/Additional Instructions
          </h5>
          <div className="my-4">
            <textarea
              id="id"
              name="additionalInstructions"
              value={formData?.additionalInstructions}
              onChange={handleInputChange}
              placeholder="Comments/Additional Instructions"
              className="w-100 p-4 bg-transparent border border-gray-200 rounded-lg outline-none resize-none min-h-[150px]"
            />
          </div>
        </div>
        <div className="row mt-2">
          <h5 className="mt-4 border-bottom pb-1 bg-secondary px-2 text-white text-center pt-1">
            Notifications
          </h5>
          <div className="my-4 d-flex gap-2">
            <label htmlFor="" className="form-check-label">
              <input
                onChange={handleInputChange}
                type="checkbox"
                className="form-check-input"
                name="healthAide"
                checked={formData?.healthAide}
                value={formData?.healthAide}
                id=""
              />{" "}
              Reviewed with Home Health Aide
            </label>
            <label htmlFor="" className="form-check-label">
              <input
                onChange={handleChange}
                type="checkbox"
                value={formData?.orientedCarePlan}
                checked={formData?.orientedCarePlan}
                className="form-check-input"
                name="orientedCarePlan"
                id=""
              />{" "}
              Patient Oriented with care Plan
            </label>
          </div>
        </div>
        <div className="row my-2">
          <h6 className="text-center mb-0 py-1 text-white bg-secondary">
            Electronic Signature
          </h6>

          <div className="col-md-6">
            <label
              htmlFor="clinicianSignature"
              className="form-label d-flex gap-2 align-items-center"
            >
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
            <label
              htmlFor="signatureDate"
              className="form-label d-flex gap-2 align-items-center"
            >
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
        <div className="row">
          <label
            htmlFor=""
            className="form-label d-flex gap-2 align-items-center"
          >
            <input
              type="checkbox"
              className="form-check-input"
              onChange={handleChange}
              checked={formData?.returnToClinicianForSignature}
              value={formData?.returnToClinicianForSignature}
              name="returnToClinicianForSignature"
              id=""
            />
            Return to Clinician for Signature
          </label>
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

export default HHACarePlan;
