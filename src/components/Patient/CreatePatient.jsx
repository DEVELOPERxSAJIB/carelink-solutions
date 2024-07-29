import { useState, useEffect } from "react";
import SelectState from "../FormElement/StateSelect";
import CountySelect from "./../FormElement/CountySelect";
import CitySelect from "./../FormElement/CitySelect";
import { useCreatePatientMutation } from "../../Redux/api/PatientApi";
import AuthLoader from "./../../utils/Loaders/AuthLoader";
import { useNavigate } from 'react-router-dom';
const PatientProfile = () => {
  const [createPatient, { data, isLoading, error ,isSuccess}] =
    useCreatePatientMutation();
  const [primaryCounty, setPrimaryCounty] = useState("");
  const [mailingCounty, setMailingCounty] = useState("");
  const [visitCounty, setVisitCounty] = useState("");
  const [primaryState, setPrimaryState] = useState("");
  const [mailingState, setMailingState] = useState("");
  const [visitState, setVisitState] = useState("");
  const [primaryCity, setPrimaryCity] = useState("");
  const [mailingCity, setMailingCity] = useState("");
  const [visitCity, setVisitCity] = useState("");
  const navigate = useNavigate()
  const initialState = {
    firstName: "",
    middleInitial: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    socialSecurityNumber: "",
    maritalStatus: "",
    mobilePhone: "",
    alternatePhone: "",
    emailAddress: "",
    clinicalManager: "",
    caseManager: "",
    clinician: "",
    branch: "",
    patientIdMrn: "",
    defaultServiceLocation: "",
    primaryAddress1: "",
    primaryAddress2: "",
    primaryZip: "",
    primaryZip4: "",
    primaryCity: primaryCity,
    primaryCounty: primaryCounty,
    primaryState: primaryState,
    mailingSameAsPrimary: false,
    mailingAddress1: "",
    mailingAddress2: "",
    mailingZip: "",
    mailingZip4: "",
    mailingCity: mailingCity,
    mailingCounty: mailingCounty,
    mailingState: mailingState,
    visitAddress1: "",
    visitAddress2: "",
    visitZip: "",
    visitZip4: "",
    visitCity: visitCity,
    visitCounty: visitCounty,
    visitState: visitState,
    origin: [],
    race: [],
    preferredLanguage: "",
    additionalLanguages: ["", "", ""],
    needInterpreter: "",
    paymentSource: [],
    privateInsurance: "",
    privateManagedCare: "",
    selfPay: "",
    unknownPaymentSource: "",
    otherSpecify: "",
    facility: [],
    episodeTiming: "",
    startOfCareDate: "",
    episodeStartDate: "",
    episode: [],
  };

  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => {
      if (type === "checkbox") {
        if (Array.isArray(prevFormData[name])) {
          const updatedArray = checked
            ? [...prevFormData[name], value]
            : prevFormData[name].filter((item) => item !== value);
          return {
            ...prevFormData,
            [name]: updatedArray,
          };
        } else {
          return {
            ...prevFormData,
            [name]: checked ? value : "",
          };
        }
      } else if (type === "radio") {
        return {
          ...prevFormData,
          [name]: value,
        };
      } else if (name === "additionalLanguages") {
        const updatedLanguages = [...prevFormData.additionalLanguages];
        updatedLanguages[index] = value;
        return {
          ...prevFormData,
          additionalLanguages: updatedLanguages,
        };
      } else {
        return {
          ...prevFormData,
          [name]: value,
        };
      }
    });
  };

  const handleAdmit = (e) => {
    e.preventDefault();
    createPatient(formData);
    setFormData({firstName: "",
      middleInitial: "",
      lastName: "",
      gender: "",
      dateOfBirth: "",
      socialSecurityNumber: "",
      maritalStatus: "",
      mobilePhone: "",
      alternatePhone: "",
      emailAddress: "",
      clinicalManager: "",
      caseManager: "",
      clinician: "",
      branch: "",
      patientIdMrn: "",
      defaultServiceLocation: "",
      primaryAddress1: "",
      primaryAddress2: "",
      primaryZip: "",
      primaryZip4: "",
      primaryCity: primaryCity,
      primaryCounty: primaryCounty,
      primaryState: primaryState,
      mailingSameAsPrimary: false,
      mailingAddress1: "",
      mailingAddress2: "",
      mailingZip: "",
      mailingZip4: "",
      mailingCity: mailingCity,
      mailingCounty: mailingCounty,
      mailingState: mailingState,
      visitAddress1: "",
      visitAddress2: "",
      visitZip: "",
      visitZip4: "",
      visitCity: visitCity,
      visitCounty: visitCounty,
      visitState: visitState,
      origin: [],
      race: [],
      preferredLanguage: "",
      additionalLanguages: ["", "", ""],
      needInterpreter: "",
      paymentSource: [],
      privateInsurance: "",
      privateManagedCare: "",
      selfPay: "",
      unknownPaymentSource: "",
      otherSpecify: "",
      facility: [],
      episodeTiming: "",
      startOfCareDate: "",
      episodeStartDate: "",
      episode: []})
  };

  const handleSaveAndContinue = (e) => {
    e.preventDefault();
    localStorage.setItem("Patient", JSON.stringify(formData));
    createPatient(formData);
  };

  const handleSaveAndExit = (e) => {
    e.preventDefault();
    localStorage.setItem("Patient", JSON.stringify(formData));
  };

  const raceOptions = [
    { id: "white", label: "White", value: "White" },
    {
      id: "blackAfricanAmerican",
      label: "Black or African American",
      value: "Black or African American",
    },
    {
      id: "americanIndian",
      label: "American Indian or Alaska Native",
      value: "American Indian or Alaska Native",
    },
    { id: "asianIndian", label: "Asian Indian", value: "Asian Indian" },
    { id: "chinese", label: "Chinese", value: "Chinese" },
    { id: "filipino", label: "Filipino", value: "Filipino" },
    { id: "japanese", label: "Japanese", value: "Japanese" },
    { id: "korean", label: "Korean", value: "Korean" },
    { id: "vietnamese", label: "Vietnamese", value: "Vietnamese" },
    { id: "otherAsian", label: "Other Asian", value: "Other Asian" },
    {
      id: "nativeHawaiian",
      label: "Native Hawaiian",
      value: "Native Hawaiian",
    },
    {
      id: "guamanianChamorro",
      label: "Guamanian or Chamorro",
      value: "Guamanian or Chamorro",
    },
    { id: "samoan", label: "Samoan", value: "Samoan" },
    {
      id: "otherPacificIslander",
      label: "Other Pacific Islander",
      value: "Other Pacific Islander",
    },
    {
      id: "unableToRespondRace",
      label: "Patient unable to respond",
      value: "Patient unable to respond",
    },
    {
      id: "declineToRespondRace",
      label: "Patient declines to respond",
      value: "Patient declines to respond",
    },
    {
      id: "noneOfTheAbove",
      label: "None of the above",
      value: "None of the above",
    },
  ];

  const originOptions = [
    {
      id: "origin1",
      value: "Hispanic, Latino/a, or Spanish Origin",
      label: "No, not of Hispanic, Latino/a, or Spanish origin",
    },
    {
      id: "origin2",
      value: "Mexican, Mexican American, Chicano/a",
      label: "Yes, Mexican, Mexican American, Chicano/a",
    },
    { id: "origin3", value: "Puerto Rican", label: "Yes, Puerto Rican" },
    { id: "origin4", value: "Cuban", label: "Yes, Cuban" },
    {
      id: "origin5",
      value: "Another Hispanic, Latino, or Spanish origin",
      label: "Yes, another Hispanic, Latino, or Spanish origin",
    },
    {
      id: "origin6",
      value: "Patient unable to respond",
      label: "Patient unable to respond",
    },
    {
      id: "origin7",
      value: "Patient declines to respond",
      label: "Patient declines to respond",
    },
  ];

  const paymentOptions = [
    {
      id: "medicare-fee-for-service",
      label: "Medicare (traditional fee-for-service)",
    },
    { id: "medicare-hmo", label: "Medicare (HMO/Managed Care)" },
    {
      id: "medicaid-fee-for-service",
      label: "Medicaid (traditional fee-for-service)",
    },
    { id: "medicaid-hmo", label: "Medicaid (HMO/Managed Care)" },
    { id: "workers-compensation", label: "Workers' Compensation" },
    {
      id: "title-programs",
      label: "Title Programs (e.g., Title III, V, or XX)",
    },
    {
      id: "other-government",
      label: "Other government (for example, TriCare, VA)",
    },
    { id: "private-insurance", label: "Private insurance" },
    { id: "private-hmo", label: "Private HMO/ managed care" },
    { id: "self-pay", label: "Self-pay" },
    { id: "unknown", label: "Unknown" },
    { id: "other", label: "Other (Specify)" },
  ];

  const facilityOptions = [
    { id: "nf", label: "Long-term nursing facility (NF)" },
    { id: "snf", label: "Skilled nursing facility (SNF/TCU)" },
    { id: "ipps", label: "Short-stay acute hospital (IPPS)" },
    { id: "ltch", label: "Long-term care hospital (LTCH)" },
    { id: "irf", label: "Inpatient rehabilitation hospital or unit (IRF)" },
    { id: "psychiatric", label: "Psychiatric hospital or unit" },
    { id: "other", label: "Other" },
  ];

  const actionsOptions = [
    { id: "episode", label: "Create episode & schedule visit after saving" },
    {
      id: "oasisStartCare",
      label: "Create episode & schedule OASIS Start of Care visit after saving",
    },
    {
      id: "therapyEvaluation",
      label: "Create episode and schedule therapy evaluation",
    },
    {
      id: "nonOasisStartCare",
      label:
        "Create episode and schedule non-OASIS Start of Care visit after saving",
    },
  ];



  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      primaryCity,
      primaryCounty,
      primaryState,
      mailingCity,
      mailingCounty,
      mailingState,
      visitCity,
      visitCounty,
      visitState,
    }));
  }, [
    primaryCity,
    primaryCounty,
    primaryState,
    mailingCity,
    mailingCounty,
    mailingState,
    visitCity,
    visitCounty,
    visitState,
  ]);
useEffect(()=>{
if(isSuccess){
  navigate("/patient")
}
},[isSuccess])
  if (isLoading) return <AuthLoader />;
  
  return (
    <form className=" mt-5">
      <div className="accordion" id="patientInfoAccordion">
        <div className="row">
          {data?.message && (
            <div className="alert alert-success text-center">
              {data?.message}
            </div>
          )}
          {error?.data?.message && (
            <div className="alert alert-danger text-center">
              {error?.data?.message}
            </div>
          )}
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Patient Information
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#patientInfoAccordion"
          >
            <div className="accordion-body">
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="firstName" className="form-label">
                    (M0040) First Name: <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    placeholder="Enter First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="middleInitial" className="form-label">
                    MI:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="middleInitial"
                    name="middleInitial"
                    placeholder="Enter MI"
                    value={formData.middleInitial}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="lastName" className="form-label">
                    (M0040) Last Name: <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    placeholder="Enter Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="gender" className="form-label">
                    (M0069) Gender: <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Unknown">Unknown</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="dateOfBirth" className="form-label">
                    (M0066) Date of Birth:{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="socialSecurityNumber" className="form-label">
                    (M0064) Social Security Number:{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="socialSecurityNumber"
                    name="socialSecurityNumber"
                    placeholder="Enter Social Security Number"
                    value={formData.socialSecurityNumber}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="unknownSSN"
                      name="unknownSSN"
                      value="unknown"
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="unknownSSN">
                      Unknown
                    </label>
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="maritalStatus" className="form-label">
                    Marital Status:
                  </label>
                  <select
                    className="form-select"
                    id="maritalStatus"
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Marital Status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="mobilePhone" className="form-label">
                    Mobile Phone: <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="mobilePhone"
                    name="mobilePhone"
                    placeholder="Enter Number"
                    value={formData.mobilePhone}
                    onChange={handleInputChange}
                    required
                  />
                  <small className="form-text text-muted">
                    For emergency preparedness, the patient will be contacted at
                    this number. This will also populate to the Emergency
                    Preparedness Report.
                  </small>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="alternatePhone" className="form-label">
                    Alternate Phone:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="alternatePhone"
                    name="alternatePhone"
                    placeholder="Enter Number"
                    value={formData.alternatePhone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="emailAddress" className="form-label">
                    Email Address:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailAddress"
                    name="emailAddress"
                    placeholder="Enter Email Address"
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="clinicalManager" className="form-label">
                    Clinical Manager: <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="clinicalManager"
                    name="clinicalManager"
                    value={formData.clinicalManager}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Clinical Manager</option>
                    <option value="manager1">Manager 1</option>
                    <option value="manager2">Manager 2</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="caseManager" className="form-label">
                    Case Manager: <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="caseManager"
                    name="caseManager"
                    value={formData.caseManager}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Case Manager</option>
                    <option value="caseManager1">Case Manager 1</option>
                    <option value="caseManager2">Case Manager 2</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="clinician" className="form-label">
                    Assign to Clinician: <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="clinician"
                    name="clinician"
                    value={formData.clinician}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Clinician</option>
                    <option value="clinician1">Clinician 1</option>
                    <option value="clinician2">Clinician 2</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="branch" className="form-label">
                    Branch: <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="branch"
                    name="branch"
                    value={formData.branch}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Agency Branch</option>
                    <option value="branch1">Branch 1</option>
                    <option value="branch2">Branch 2</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="patientIdMrn" className="form-label">
                    (M0020) Patient ID/MRN:{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="patientIdMrn"
                    name="patientIdMrn"
                    placeholder="Enter ID/MRN"
                    value={formData.patientIdMrn}
                    onChange={handleInputChange}
                    required
                  />
                  <small className="form-text text-muted">
                    Last MRN Used: PA1328
                  </small>
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="defaultServiceLocation"
                    className="form-label"
                  >
                    Default Service Location:{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="defaultServiceLocation"
                    name="defaultServiceLocation"
                    value={formData.defaultServiceLocation}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Service Location</option>
                    <option value="home">
                      Patient &apos;s Home/Residence (Q5001)
                    </option>
                    <option value="clinic">Clinic</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="primaryAddressHeading">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#primaryAddressCollapse"
              aria-expanded="true"
              aria-controls="primaryAddressCollapse"
            >
              Primary Address
            </button>
          </h2>
          <div
            id="primaryAddressCollapse"
            className="accordion-collapse collapse"
            aria-labelledby="primaryAddressHeading"
            data-bs-parent="#patientInfoAccordion"
          >
            <div className="accordion-body">
              {/* Primary Address Line 1 */}
              <div className="mb-3">
                <label htmlFor="primaryAddress1" className="form-label">
                  Primary Address Line 1: <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="primaryAddress1"
                  name="primaryAddress1"
                  value={formData.primaryAddress1}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Primary Address Line 2 */}
              <div className="mb-3">
                <label htmlFor="primaryAddress2" className="form-label">
                  Primary Address Line 2:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="primaryAddress2"
                  name="primaryAddress2"
                  value={formData.primaryAddress2}
                  onChange={handleInputChange}
                />
              </div>

              {/* ZIP */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="primaryZip" className="form-label">
                    ZIP: <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="primaryZip"
                    name="primaryZip"
                    value={formData.primaryZip}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="primaryZip4" className="form-label">
                    ZIP+4:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="primaryZip4"
                    name="primaryZip4"
                    value={formData.primaryZip4}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* County */}
              <div className="mb-3">
                <label htmlFor="primaryCounty" className="form-label">
                  County: <span className="text-danger">*</span>
                </label>
                {/* Assuming SelectCounty component or similar for county selection */}
                <CountySelect
                  selectedState={primaryState}
                  selectedCounty={primaryCounty}
                  setSelectedCounty={setPrimaryCounty}
                />
              </div>

              {/* City */}
              <div className="mb-3">
                <label htmlFor="primaryCity" className="form-label">
                  City: <span className="text-danger">*</span>
                </label>
                <CitySelect
                  stateCode={primaryState}
                  selectedCity={primaryCity}
                  setSelectedCity={setPrimaryCity}
                />
              </div>

              {/* State */}
              <div className="mb-3">
                <label htmlFor="primaryState" className="form-label">
                  State: <span className="text-danger">*</span>
                </label>
                <SelectState
                  selectedState={primaryState}
                  setSelectedState={setPrimaryState}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="mailingAddressHeading">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mailingAddressCollapse"
              aria-expanded="true"
              aria-controls="mailingAddressCollapse"
            >
              Mailing Address
            </button>
          </h2>
          <div
            id="mailingAddressCollapse"
            className="accordion-collapse collapse"
            aria-labelledby="mailingAddressHeading"
            data-bs-parent="#patientInfoAccordion"
          >
            <div className="accordion-body">
              {/* Mailing Address Form Fields */}
              <div className="mb-3">
                <label
                  htmlFor="mailingSameAsPrimary"
                  className="form-check-label"
                >
                  Same as Primary Address
                </label>
                <input
                  type="checkbox"
                  id="mailingSameAsPrimary"
                  name="mailingSameAsPrimary"
                  checked={formData.mailingSameAsPrimary}
                  onChange={handleInputChange}
                  className="form-check-input"
                />
              </div>
              {!formData.mailingSameAsPrimary && (
                <>
                  <div className="mb-3">
                    <label htmlFor="mailingAddress1" className="form-label">
                      Mailing Address Line 1:{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="mailingAddress1"
                      name="mailingAddress1"
                      value={formData.mailingAddress1}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="mailingAddress2" className="form-label">
                      Mailing Address Line 2:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="mailingAddress2"
                      name="mailingAddress2"
                      value={formData.mailingAddress2}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="mailingZip" className="form-label">
                        ZIP: <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="mailingZip"
                        name="mailingZip"
                        value={formData.mailingZip}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="mailingZip4" className="form-label">
                        ZIP+4:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="mailingZip4"
                        name="mailingZip4"
                        value={formData.mailingZip4}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="mailingCounty" className="form-label">
                        County: <span className="text-danger">*</span>
                      </label>
                      {/* Assuming SelectCounty component or similar for county selection */}
                      <CountySelect
                        selectedState={mailingState}
                        selectedCounty={mailingCounty}
                        setSelectedCounty={setMailingCounty}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="mailingCity" className="form-label">
                        City: <span className="text-danger">*</span>
                      </label>
                      <CitySelect
                        stateCode={mailingState}
                        selectedCity={mailingCity}
                        setSelectedCity={setMailingCity}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="mailingState" className="form-label">
                        State: <span className="text-danger">*</span>
                      </label>
                      {/* Assuming SelectState component or similar for state selection */}
                      <SelectState
                        selectedState={mailingState}
                        setSelectedState={setMailingState}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {/* Visit Address */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="visitAddressHeading">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#visitAddressCollapse"
              aria-expanded="true"
              aria-controls="visitAddressCollapse"
            >
              Visit Address
            </button>
          </h2>
          <div
            id="visitAddressCollapse"
            className="accordion-collapse collapse"
            aria-labelledby="visitAddressHeading"
            data-bs-parent="#patientInfoAccordion"
          >
            <div className="accordion-body">
              {/* Visit Address Form Fields */}
              <div className="mb-3">
                <label htmlFor="visitAddress1" className="form-label">
                  Visit Address Line 1:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="visitAddress1"
                  name="visitAddress1"
                  value={formData.visitAddress1}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="visitAddress2" className="form-label">
                  Visit Address Line 2:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="visitAddress2"
                  name="visitAddress2"
                  value={formData.visitAddress2}
                  onChange={handleInputChange}
                />
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="visitCity" className="form-label">
                    City:
                  </label>
                  <CitySelect
                    stateCode={visitState}
                    selectedCity={visitCity}
                    setSelectedCity={setVisitCity}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="visitState" className="form-label">
                    State:
                  </label>
                  {/* Assuming SelectState component or similar for state selection */}
                  <SelectState
                    selectedState={visitState}
                    setSelectedState={setVisitState}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="visitZip" className="form-label">
                    ZIP:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="visitZip"
                    name="visitZip"
                    value={formData.visitZip}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="visitZip4" className="form-label">
                    ZIP+4:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="visitZip4"
                    name="visitZip4"
                    value={formData.visitZip4}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="visitCounty" className="form-label">
                    County:
                  </label>
                  {/* Assuming SelectCounty component or similar for county selection */}
                  <CountySelect
                    selectedState={visitState}
                    selectedCounty={visitCounty}
                    setSelectedCounty={setVisitCounty}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="raceEthnicityHeading">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#raceEthnicityCollapse"
              aria-expanded="true"
              aria-controls="raceEthnicityCollapse"
            >
              Race/Ethnicity
            </button>
          </h2>
          <div
            id="raceEthnicityCollapse"
            className="accordion-collapse collapse"
            aria-labelledby="raceEthnicityHeading"
            data-bs-parent="#patientInfoAccordion"
          >
            <div className="accordion-body">
              {/* Hispanic, Latino/a, or Spanish Origin */}
              <div className="mb-3">
                {originOptions.map((option) => (
                  <div className="form-check" key={option.id}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={option.id}
                      name="origin"
                      value={option.value}
                      checked={
                        formData.origin &&
                        formData.origin.includes(option.value)
                      }
                      onChange={(e) => handleInputChange(e, option.value)}
                    />
                    <label className="form-check-label" htmlFor={option.id}>
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
              {/* Race Section */}
              <div className="mb-3">
                <p>
                  <strong>
                    (A1010) What is your race? (Check all that apply.)
                  </strong>
                </p>
                {raceOptions.map((option) => (
                  <div className="form-check" key={option.id}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={option.id}
                      name="race"
                      value={option.value}
                      checked={
                        formData.race && formData.race.includes(option.value)
                      }
                      onChange={(e) => handleInputChange(e, option.value)}
                    />
                    <label className="form-check-label" htmlFor={option.id}>
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* language  */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="patientLanguageHeading">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#patientLanguageCollapse"
              aria-expanded="true"
              aria-controls="patientLanguageCollapse"
            >
              Patient Language <span className="text-danger">*</span>
            </button>
          </h2>
          <div
            id="patientLanguageCollapse"
            className="accordion-collapse collapse"
            aria-labelledby="patientLanguageHeading"
            data-bs-parent="#patientInfoAccordion"
          >
            <div className="accordion-body">
              {/* Preferred Language */}
              <div className="mb-3">
                <label htmlFor="preferredLanguage" className="form-label">
                  (A1110A) What is your preferred language?
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="preferredLanguage"
                  name="preferredLanguage"
                  value={formData.preferredLanguage}
                  onChange={handleInputChange}
                />
              </div>

              {/* Additional Languages */}
              <div className="mb-3">
                <label htmlFor="additionalLanguage1" className="form-label">
                  Additional Language:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="additionalLanguage1"
                  name="additionalLanguages"
                  value={formData.additionalLanguages[0]}
                  onChange={(e) => handleInputChange(e, 0)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="additionalLanguage2" className="form-label">
                  Additional Language:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="additionalLanguage2"
                  name="additionalLanguages"
                  value={formData.additionalLanguages[1]}
                  onChange={(e) => handleInputChange(e, 1)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="additionalLanguage3" className="form-label">
                  Additional Language:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="additionalLanguage3"
                  name="additionalLanguages"
                  value={formData.additionalLanguages[2]}
                  onChange={(e) => handleInputChange(e, 2)}
                />
              </div>

              {/* Auxiliary Aids */}
              <div className="mb-3">
                <label htmlFor="auxiliaryAids" className="form-label">
                  Auxiliary Aids:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="auxiliaryAids"
                  name="auxiliaryAids"
                  value={formData.auxiliaryAids}
                  onChange={handleInputChange}
                />
              </div>

              {/* Need Interpreter */}
              <div className="mb-3">
                <label className="form-label">
                  (A1110B) Do you need or want an interpreter to communicate
                  with a doctor or health care staff?
                </label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="needInterpreterYes"
                    name="needInterpreter"
                    value="Yes"
                    checked={formData.needInterpreter === "Yes"}
                    onChange={handleInputChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="needInterpreterYes"
                  >
                    Yes
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="needInterpreterNo"
                    name="needInterpreter"
                    value="No"
                    checked={formData.needInterpreter === "No"}
                    onChange={handleInputChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="needInterpreterNo"
                  >
                    No
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="needInterpreterUnable"
                    name="needInterpreter"
                    value="Unable to Determine"
                    checked={formData.needInterpreter === "Unable to Determine"}
                    onChange={handleInputChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="needInterpreterUnable"
                  >
                    Unable to Determine
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="paymentSourceHeading">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#paymentSourceCollapse"
              aria-expanded="true"
              aria-controls="paymentSourceCollapse"
            >
              Payment Source <span className="text-danger">*</span>
            </button>
          </h2>
          <div
            id="paymentSourceCollapse"
            className="accordion-collapse collapse"
            aria-labelledby="paymentSourceHeading"
            data-bs-parent="#patientInfoAccordion"
          >
            <div className="accordion-body">
              {paymentOptions.map((option) => (
                <div className="form-check" key={option.id}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={option.id}
                    name="paymentSource"
                    value={option.label}
                    checked={
                      formData.paymentSource &&
                      formData.paymentSource.includes(option.label)
                    }
                    onChange={(e) => handleInputChange(e, option.label)}
                  />
                  <label className="form-check-label" htmlFor={option.id}>
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="admissionSourceTimingHeading">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#admissionSourceTimingCollapse"
              aria-expanded="true"
              aria-controls="admissionSourceTimingCollapse"
            >
              Admission Source and Timing (PDGM){" "}
              <span className="text-danger">*</span>
            </button>
          </h2>
          <div
            id="admissionSourceTimingCollapse"
            className="accordion-collapse collapse"
            aria-labelledby="admissionSourceTimingHeading"
            data-bs-parent="#patientInfoAccordion"
          >
            <div className="accordion-body">
              {facilityOptions.map((option) => (
                <div className="form-check" key={option.id}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={option.id}
                    name="facility"
                    value={option.label}
                    checked={
                      formData.facility &&
                      formData.facility.includes(option.label)
                    }
                    onChange={(e) => handleInputChange(e, option.label)}
                  />
                  <label className="form-check-label" htmlFor={option.id}>
                    {option.label}
                  </label>
                </div>
              ))}
              <div>
                <p>
                  (M0110) Episode Timing * Is the Medicare home health episode,
                  for which this assessment will define a case-mix group, an
                  "early" episode or a "later" episode in the patient's current
                  sequence of adjacent Medicare home health payment episodes?
                </p>{" "}
                <h5>
                  (M0110) Episode Timing <span className="text-danger">*</span>
                </h5>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="earlyEpisode"
                  name="episodeTiming"
                  value="Early"
                  checked={formData.episodeTiming === "Early"}
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="earlyEpisode">
                  Early
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="laterEpisode"
                  name="episodeTiming"
                  value="Later"
                  checked={formData.episodeTiming === "Later"}
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="laterEpisode">
                  Later
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="unknownEpisodeTiming"
                  name="episodeTiming"
                  value="Unknown"
                  checked={formData.episodeTiming === "Unknown"}
                  onChange={handleInputChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="unknownEpisodeTiming"
                >
                  Unknown
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="notApplicableEpisodeTiming"
                  name="episodeTiming"
                  value="Not Applicable"
                  checked={formData.episodeTiming === "Not Applicable"}
                  onChange={handleInputChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="notApplicableEpisodeTiming"
                >
                  Not Applicable
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="episodeManagementHeading">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#episodeManagementCollapse"
              aria-expanded="true"
              aria-controls="episodeManagementCollapse"
            >
              Episode Management
            </button>
          </h2>
          <div
            id="episodeManagementCollapse"
            className="accordion-collapse collapse"
            aria-labelledby="episodeManagementHeading"
            data-bs-parent="#patientInfoAccordion"
          >
            <div className="accordion-body">
              <div className="mb-3">
                <label htmlFor="startOfCareDate" className="form-label">
                  Start of Care Date: <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="startOfCareDate"
                  name="startOfCareDate"
                  value={formData.startOfCareDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="episodeStartDate" className="form-label">
                  Episode Start Date: <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="episodeStartDate"
                  name="episodeStartDate"
                  value={formData.episodeStartDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {actionsOptions.map((option) => (
                <div className="form-check" key={option.id}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={option.id}
                    name="episode"
                    value={option.label}
                    checked={
                      formData.episode &&
                      formData.episode.includes(option.label)
                    }
                    onChange={(e) => handleInputChange(e, option.label)}
                  />
                  <label className="form-check-label" htmlFor={option.id}>
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 d-flex gap-3 mt-5 gap-2">
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleAdmit}
          >
            Admit
          </button>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleSaveAndContinue}
          >
            Save and Continue
          </button>
          <button
            className="btn btn-secondary"
            type="submit"
            onClick={handleSaveAndExit}
          >
            Save and Exit
          </button>
        </div>
      </div>
    </form>
  );
};

export default PatientProfile;
