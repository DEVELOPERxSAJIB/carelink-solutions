import React, { useState } from "react";
import SelectState from "../FormElement/StateSelect";
import CountySelect from "./../FormElement/CountySelect";
import CitySelect from "./../FormElement/CitySelect";
import { useCreatePatientMutation } from "../../Redux/api/PatientApi";
const PatientProfile = () => {
  const [createPatient, { data, isLoading, isSuccess, error }] =
    useCreatePatientMutation();
    const [primaryCounty,setPrimaryCounty]= useState("")
  const [mailingCounty,setMailingCounty]= useState("")
  const [visitCounty,setVisitCounty]= useState("")
  const [primaryState,setPrimaryState]= useState("")
  const [mailingState,setMailingState]= useState("")
  const [visitState,setVisitState]= useState("")
  const [primaryCity,setPrimaryCity]= useState("")
  const [mailingCity,setMailingCity]= useState("")
  const [visitCity,setVisitCity]= useState("")
  const [formData, setFormData] = useState({
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
    primaryCounty: "",
    primaryCity: "",
    primaryState: "",
    mailingSameAsPrimary: false,
    mailingAddress1: "",
    mailingAddress2: "",
    mailingZip: "",
    mailingZip4: "",
    mailingCounty: "",
    mailingCity: "",
    mailingState: "",
    visitAddress1: "",
    visitAddress2: "",
    visitZip: "",
    visitZip4: "",
    visitCounty: "",
    visitCity: "",
    visitState: "",
    hispanicLatino: false,
    mexican: false,
    puertoRican: false,
    cuban: false,
    anotherHispanic: false,
    unableToRespondEthnicity: false,
    declineToRespondEthnicity: false,
    white: false,
    blackAfricanAmerican: false,
    americanIndian: false,
    asianIndian: false,
    chinese: false,
    filipino: false,
    japanese: false,
    korean: false,
    vietnamese: false,
    otherAsian: false,
    nativeHawaiian: false,
    guamanianChamorro: false,
    samoan: false,
    otherPacificIslander: false,
    unableToRespondRace: false,
    declineToRespondRace: false,
    noneOfTheAbove: false,
    preferredLanguage: "",
    additionalLanguages: ["", "", ""],
    needInterpreter: "",
    nonePaymentSource: "",
    medicareTraditional: "",
    medicareManagedCare: "",
    medicaidTraditional: "",
    medicaidManagedCare: "",
    workersCompensation: "",
    titlePrograms: "",
    otherGovernment: "",
    privateInsurance: "",
    privateManagedCare: "",
    selfPay: "",
    unknownPaymentSource: "",
    otherSpecify: "",
    longTermNursingFacility: false,
    skilledNursingFacility: false,
    shortStayAcuteHospital: false,
    longTermCareHospital: false,
    inpatientRehabilitation: false,
    psychiatricHospital: false,
    otherInpatientFacility: false,
    otherInpatientFacilityText: "",
    episodeTiming: "",
    startOfCareDate: "",
    episodeStartDate: "",
    createEpisodeScheduleVisit: "",
    createEpisodeScheduleOasisStartCare: "",
    createEpisodeScheduleTherapyEvaluation: "",
    createEpisodeScheduleNonOasisStartCare: "",
    createEpisodeScheduleInitialOasisRecert: "",
    createEpisodeScheduleInitialNonOasisRecert: "",
    trackF2FDocumentation: "",
  });

  const handleInputChange = (e,index) => {
    const { name, value, type, checked } = e.target;
  
    if (type === "checkbox") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: checked ? value : "",
      }));
    } else if (type === "radio") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    } else if (name === "additionalLanguages") {

    setFormData((prevFormData) => {
      const updatedLanguages = [...prevFormData.additionalLanguages];
      updatedLanguages[index] = value; // Update the value at the specified index
      return {
        ...prevFormData,
        additionalLanguages: updatedLanguages,
      };
    });
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };
  
  
console.log(formData)
  const handleAdmit = () => {
    console.log(formData);
    formData.primaryCounty=primaryCounty;
    formData.primaryCity=primaryCity;
    formData.primaryState=primaryState
    
    formData.mailingCounty=mailingCounty
    formData.mailingCity=mailingCity
    formData.mailingState=mailingState
    formData.visitCounty=visitCounty
    formData.visitCity=visitCity
    formData.visitState=visitState
    createPatient(formData);
  };
  const handleSaveAndContinue = () => {};
  const handleSaveAndExit = () => {};
  return (
    <form className="container mt-5">
      <div className="accordion" id="patientInfoAccordion">
        <div className="row">
          {data?.message&&<div className="alert alert-success text-center">{data?.message}</div>}
          {error?.data?.message&&<div className="alert alert-danger text-center">{error?.data?.message}</div>}
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
                      <option value="male">Male</option>
                      <option value="female">Female</option>
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
                    <label
                      htmlFor="socialSecurityNumber"
                      className="form-label"
                    >
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
                      For emergency preparedness, the patient will be contacted
                      at this number. This will also populate to the Emergency
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
                      Assign to Clinician:{" "}
                      <span className="text-danger">*</span>
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
                    selectedState={primaryState} selectedCounty={primaryCounty} setSelectedCounty={setPrimaryCounty}
                  />
              </div>

              {/* City */}
              <div className="mb-3">
                <label htmlFor="primaryCity" className="form-label">
                  City: <span className="text-danger">*</span>
                </label>
                <CitySelect stateCode={primaryState} selectedCity={primaryCity} setSelectedCity={setPrimaryCity} />
              </div>

              {/* State */}
              <div className="mb-3">
                <label htmlFor="primaryState" className="form-label">
                  State: <span className="text-danger">*</span>
                </label>
                <SelectState selectedState={primaryState} setSelectedState={setPrimaryState}/>
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
                        selectedState={mailingState} selectedCounty={mailingCounty} setSelectedCounty={setMailingCounty}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="mailingCity" className="form-label">
                        City: <span className="text-danger">*</span>
                      </label>
                      <CitySelect stateCode={mailingState} selectedCity={mailingCity} setSelectedCity={setMailingCity}/>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="mailingState" className="form-label">
                        State: <span className="text-danger">*</span>
                      </label>
                      {/* Assuming SelectState component or similar for state selection */}
                      <SelectState
                        selectedState={mailingState} setSelectedState={setMailingState}
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
                  <CitySelect stateCode={visitState} selectedCity={visitCity} setSelectedCity={setVisitCity}/>
                </div>
                <div className="col-md-6">
                  <label htmlFor="visitState" className="form-label">
                    State:
                  </label>
                  {/* Assuming SelectState component or similar for state selection */}
                  <SelectState
                    selectedState={visitState} setSelectedState={setVisitState}
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
                    selectedState={visitState} selectedCounty={visitCounty} setSelectedCounty={setVisitCounty}
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
                <p>
                  <strong>
                    (A1005) Are you of Hispanic, Latino/a, or Spanish Origin?
                    (Check all that apply.)
                  </strong>
                </p>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="hispanicLatino"
                    name="hispanicLatino"
                    value="Hispanic, Latino/a, or Spanish Origin"
                    checked={
                      formData.hispanicLatino ===
                      "Hispanic, Latino/a, or Spanish Origin"
                    }
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        "hispanicLatino",
                        "Hispanic, Latino/a, or Spanish Origin"
                      )
                    }
                  />
                  <label className="form-check-label" htmlFor="hispanicLatino">
                    No, not of Hispanic, Latino/a, or Spanish origin
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="mexican"
                    name="mexican"
                    value="Mexican, Mexican American, Chicano/a"
                    checked={
                      formData.mexican ===
                      "Mexican, Mexican American, Chicano/a"
                    }
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        "mexican",
                        "Mexican, Mexican American, Chicano/a"
                      )
                    }
                  />
                  <label className="form-check-label" htmlFor="mexican">
                    Yes, Mexican, Mexican American, Chicano/a
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="puertoRican"
                    name="puertoRican"
                    value="Puerto Rican"
                    checked={formData.puertoRican === "Puerto Rican"}
                    onChange={(e) =>
                      handleInputChange(e, "puertoRican", "Puerto Rican")
                    }
                  />
                  <label className="form-check-label" htmlFor="puertoRican">
                    Yes, Puerto Rican
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="cuban"
                    name="cuban"
                    value="Cuban"
                    checked={formData.cuban === "Cuban"}
                    onChange={(e) => handleInputChange(e, "cuban", "Cuban")}
                  />
                  <label className="form-check-label" htmlFor="cuban">
                    Yes, Cuban
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="anotherHispanic"
                    value="Another Hispanic, Latino, or Spanish origin"
                    name="anotherHispanic"
                    checked={
                      formData.anotherHispanic ===
                      "Another Hispanic, Latino, or Spanish origin"
                    }
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        "anotherHispanic",
                        "Another Hispanic, Latino, or Spanish origin"
                      )
                    }
                  />
                  <label className="form-check-label" htmlFor="anotherHispanic">
                    Yes, another Hispanic, Latino, or Spanish origin
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="unableToRespondEthnicity"
                    name="unableToRespondEthnicity"
                    value="Patient unable to respond"
                    checked={
                      formData.unableToRespondEthnicity ===
                      "Patient unable to respond"
                    }
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        "unableToRespondEthnicity",
                        "Patient unable to respond"
                      )
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor="unableToRespondEthnicity"
                  >
                    Patient unable to respond
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="declineToRespondEthnicity"
                    name="declineToRespondEthnicity"
                    value="Patient declines to respond"
                    checked={
                      formData.declineToRespondEthnicity ===
                      "Patient declines to respond"
                    }
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        "declineToRespondEthnicity",
                        "Patient declines to respond"
                      )
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor="declineToRespondEthnicity"
                  >
                    Patient declines to respond
                  </label>
                </div>
              </div>

              {/* Race Section */}
              <div className="mb-3">
                <p>
                  <strong>
                    (A1010) What is your race? (Check all that apply.)
                  </strong>
                </p>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="white"
                    name="white"
                    value="White"
                    checked={formData.white === "White"}
                    onChange={(e) => handleInputChange(e, "white", "White")}
                  />
                  <label className="form-check-label" htmlFor="white">
                    White
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="blackAfricanAmerican"
                    value="Black or African American"
                    name="blackAfricanAmerican"
                    checked={
                      formData.blackAfricanAmerican ===
                      "Black or African American"
                    }
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        "blackAfricanAmerican",
                        "Black or African American"
                      )
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor="blackAfricanAmerican"
                  >
                    Black or African American
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="americanIndian"
                    name="americanIndian"
                    value="American Indian or Alaska Native"
                    checked={
                      formData.americanIndian ===
                      "American Indian or Alaska Native"
                    }
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        "americanIndian",
                        "American Indian or Alaska Native"
                      )
                    }
                  />
                  <label className="form-check-label" htmlFor="americanIndian">
                    American Indian or Alaska Native
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="asianIndian"
                    value="Asian Indian"
                    name="asianIndian"
                    checked={formData.asianIndian === "Asian Indian"}
                    onChange={(e) =>
                      handleInputChange(e, "asianIndian", "Asian Indian")
                    }
                  />
                  <label className="form-check-label" htmlFor="asianIndian">
                    Asian Indian
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="chinese"
                    name="chinese"
                    value="Chinese"
                    checked={formData.chinese === "Chinese"}
                    onChange={(e) => handleInputChange(e, "chinese", "Chinese")}
                  />
                  <label className="form-check-label" htmlFor="chinese">
                    Chinese
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="filipino"
                    name="filipino"
                    value="Filipino"
                    checked={formData.filipino === "Filipino"}
                    onChange={(e) =>
                      handleInputChange(e, "filipino", "Filipino")
                    }
                  />
                  <label className="form-check-label" htmlFor="filipino">
                    Filipino
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="japanese"
                    name="japanese"
                    value="Japanese"
                    checked={formData.japanese === "Japanese"}
                    onChange={(e) =>
                      handleInputChange(e, "japanese", "Japanese")
                    }
                  />
                  <label className="form-check-label" htmlFor="japanese">
                    Japanese
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="korean"
                    name="korean"
                    value="Korean"
                    checked={formData.korean === "Korean"}
                    onChange={(e) => handleInputChange(e, "korean", "Korean")}
                  />
                  <label className="form-check-label" htmlFor="korean">
                    Korean
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="vietnamese"
                    name="vietnamese"
                    value="Vietnamese"
                    checked={formData.vietnamese === "Vietnamese"}
                    onChange={(e) =>
                      handleInputChange(e, "vietnamese", "Vietnamese")
                    }
                  />
                  <label className="form-check-label" htmlFor="vietnamese">
                    Vietnamese
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="otherAsian"
                    name="otherAsian"
                    value="Other Asian"
                    checked={formData.otherAsian === "Other Asian"}
                    onChange={(e) =>
                      handleInputChange(e, "otherAsian", "Other Asian")
                    }
                  />
                  <label className="form-check-label" htmlFor="otherAsian">
                    Other Asian
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="nativeHawaiian"
                    name="nativeHawaiian"
                    value="Native Hawaiian"
                    checked={formData.nativeHawaiian === "Native Hawaiian"}
                    onChange={(e) =>
                      handleInputChange(e, "nativeHawaiian", "Native Hawaiian")
                    }
                  />
                  <label className="form-check-label" htmlFor="nativeHawaiian">
                    Native Hawaiian
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="guamanianChamorro"
                    value="Guamanian or Chamorro"
                    name="guamanianChamorro"
                    checked={
                      formData.guamanianChamorro === "Guamanian or Chamorro"
                    }
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        "guamanianChamorro",
                        "Guamanian or Chamorro"
                      )
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor="guamanianChamorro"
                  >
                    Guamanian or Chamorro
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="samoan"
                    value="Samoan"
                    name="samoan"
                    checked={formData.samoan === "Samoan"}
                    onChange={(e) => handleInputChange(e, "samoan", "Samoan")}
                  />
                  <label className="form-check-label" htmlFor="samoan">
                    Samoan
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="otherPacificIslander"
                    name="otherPacificIslander"
                    value="Other Pacific Islander"
                    checked={
                      formData.otherPacificIslander === "Other Pacific Islander"
                    }
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        "otherPacificIslander",
                        "Other Pacific Islander"
                      )
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor="otherPacificIslander"
                  >
                    Other Pacific Islander
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="unableToRespondRace"
                    value="Patient unable to respond"
                    name="unableToRespondRace"
                    checked={
                      formData.unableToRespondRace ===
                      "Patient unable to respond"
                    }
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        "unableToRespondRace",
                        "Patient unable to respond"
                      )
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor="unableToRespondRace"
                  >
                    Patient unable to respond
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="declineToRespondRace"
                    name="declineToRespondRace"
                    value="Patient declines to respond"
                    checked={
                      formData.declineToRespondRace ===
                      "Patient declines to respond"
                    }
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        "declineToRespondRace",
                        "Patient declines to respond"
                      )
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor="declineToRespondRace"
                  >
                    Patient declines to respond
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="noneOfTheAbove"
                    name="noneOfTheAbove"
                    value="None of the above"
                    checked={formData.noneOfTheAbove === "None of the above"}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        "noneOfTheAbove",
                        "None of the above"
                      )
                    }
                  />
                  <label className="form-check-label" htmlFor="noneOfTheAbove">
                    None of the above
                  </label>
                </div>
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
                  onChange={(e) =>
                    handleInputChange(e, 0)
                  }
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
                  onChange={(e) =>
                    handleInputChange(e,  1)
                  }
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
                  onChange={(e) =>
                    handleInputChange(e,  2)
                  }
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
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="nonePaymentSource"
                  name="nonePaymentSource"
                  value="None; no charge for current services"
                  checked={
                    formData.nonePaymentSource ===
                    "None; no charge for current services"
                  }
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="nonePaymentSource">
                  None; no charge for current services
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="medicareTraditional"
                  name="medicareTraditional"
                  value="Medicare (traditional fee-for-service)"
                  checked={
                    formData.medicareTraditional ===
                    "Medicare (traditional fee-for-service)"
                  }
                  onChange={handleInputChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="medicareTraditional"
                >
                  Medicare (traditional fee-for-service)
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="medicareManagedCare"
                  name="medicareManagedCare"
                  value="Medicare (HMO/Managed Care)"
                  checked={
                    formData.medicareManagedCare ===
                    "Medicare (HMO/Managed Care)"
                  }
                  onChange={handleInputChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="medicareManagedCare"
                >
                  Medicare (HMO/Managed Care)
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="medicaidTraditional"
                  name="medicaidTraditional"
                  value="Medicaid (traditional fee-for-service)"
                  checked={
                    formData.medicaidTraditional ===
                    "Medicaid (traditional fee-for-service)"
                  }
                  onChange={handleInputChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="medicaidTraditional"
                >
                  Medicaid (traditional fee-for-service)
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="medicaidManagedCare"
                  name="medicaidManagedCare"
                  value="Medicaid (HMO/Managed Care)"
                  checked={
                    formData.medicaidManagedCare ===
                    "Medicaid (HMO/Managed Care)"
                  }
                  onChange={handleInputChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="medicaidManagedCare"
                >
                  Medicaid (HMO/Managed Care)
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="workersCompensation"
                  name="workersCompensation"
                  value="Workers' Compensation"
                  checked={
                    formData.workersCompensation === "Workers' Compensation"
                  }
                  onChange={handleInputChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="workersCompensation"
                >
                  Workers&apos; Compensation
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="titlePrograms"
                  name="titlePrograms"
                  value="Title Programs (e.g., Title III, V, or XX)"
                  checked={
                    formData.titlePrograms ===
                    "Title Programs (e.g., Title III, V, or XX)"
                  }
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="titlePrograms">
                  Title Programs (e.g., Title III, V, or XX)
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="otherGovernment"
                  name="otherGovernment"
                  value="Other government (for example, TriCare, VA)"
                  checked={
                    formData.otherGovernment ===
                    "Other government (for example, TriCare, VA)"
                  }
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="otherGovernment">
                  Other government (for example, TriCare, VA)
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="privateInsurance"
                  name="privateInsurance"
                  value="Private insurance"
                  checked={formData.privateInsurance === "Private insurance"}
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="privateInsurance">
                  Private insurance
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="privateManagedCare"
                  name="privateManagedCare"
                  value="Private HMO/ managed care"
                  checked={
                    formData.privateManagedCare === "Private HMO/ managed care"
                  }
                  onChange={handleInputChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="privateManagedCare"
                >
                  Private HMO/ managed care
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="selfPay"
                  name="selfPay"
                  value="Self-pay"
                  checked={formData.selfPay === "Self-pay"}
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="selfPay">
                  Self-pay
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="unknownPaymentSource"
                  name="unknownPaymentSource"
                  value="Unknown"
                  checked={formData.unknownPaymentSource === "Unknown"}
                  onChange={handleInputChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="unknownPaymentSource"
                >
                  Unknown
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="otherSpecify"
                  name="otherSpecify"
                  value={formData.otherSpecify}
                  checked={!!formData.otherSpecify}
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="otherSpecify">
                  Other (Specify)
                </label>
                {formData.otherSpecify && (
                  <input
                    type="text"
                    className="form-control mt-2"
                    id="otherSpecifyInput"
                    name="otherSpecify"
                    value={formData.otherSpecify}
                    onChange={handleInputChange}
                    placeholder="Specify other payment source"
                  />
                )}
              </div>
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
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="longTermNursingFacility"
                  name="longTermNursingFacility"
                  checked={formData.longTermNursingFacility}
                  onChange={handleInputChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="longTermNursingFacility"
                >
                  Long-term nursing facility (NF)
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="skilledNursingFacility"
                  name="skilledNursingFacility"
                  checked={formData.skilledNursingFacility}
                  onChange={handleInputChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="skilledNursingFacility"
                >
                  Skilled nursing facility (SNF/TCU)
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="shortStayAcuteHospital"
                  name="shortStayAcuteHospital"
                  checked={formData.shortStayAcuteHospital}
                  onChange={handleInputChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="shortStayAcuteHospital"
                >
                  Short-stay acute hospital (IPPS)
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="longTermCareHospital"
                  name="longTermCareHospital"
                  checked={formData.longTermCareHospital}
                  onChange={handleInputChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="longTermCareHospital"
                >
                  Long-term care hospital (LTCH)
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="inpatientRehabilitation"
                  name="inpatientRehabilitation"
                  checked={formData.inpatientRehabilitation}
                  onChange={handleInputChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="inpatientRehabilitation"
                >
                  Inpatient rehabilitation hospital or unit (IRF)
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="psychiatricHospital"
                  name="psychiatricHospital"
                  checked={formData.psychiatricHospital}
                  onChange={handleInputChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="psychiatricHospital"
                >
                  Psychiatric hospital or unit
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="otherInpatientFacility"
                  name="otherInpatientFacility"
                  checked={formData.otherInpatientFacility}
                  onChange={handleInputChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="otherInpatientFacility"
                >
                  Other:
                </label>
                {formData.otherInpatientFacility && (
                  <input
                    type="text"
                    className="form-control mt-2"
                    id="otherInpatientFacilityInput"
                    name="otherInpatientFacilityText"
                    value={formData.otherInpatientFacilityText}
                    onChange={handleInputChange}
                    placeholder="Specify other inpatient facility"
                  />
                )}
              </div>
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
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="createEpisodeScheduleVisit"
                  name="createEpisodeScheduleVisit"
                  value="Create episode & schedule visit after saving"
                  checked={
                    formData.createEpisodeScheduleVisit ===
                    "Create episode & schedule visit after saving"
                  }
                  onChange={handleInputChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="createEpisodeScheduleVisit"
                >
                  Create episode & schedule visit after saving
                </label>
              </div>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="createEpisodeScheduleOasisStartCare"
                  name="createEpisodeScheduleOasisStartCare"
                  checked={
                    formData.createEpisodeScheduleOasisStartCare ===
                    "Create episode & schedule OASIS Start of Care visit after saving"
                  }
                  value="Create episode & schedule OASIS Start of Care visit after saving"
                  onChange={handleInputChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="createEpisodeScheduleOasisStartCare"
                >
                  Create episode & schedule OASIS Start of Care visit after
                  saving
                </label>
              </div>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="createEpisodeScheduleTherapyEvaluation"
                  name="createEpisodeScheduleTherapyEvaluation"
                  value="Create episode and schedule therapy evaluation (Checking this box will allow therapist to perform 'therapy only' admissions, and when an OASIS is required to be completed by an RN within the 5-day window, an OASIS will need to be scheduled.)"
                  checked={
                    formData.createEpisodeScheduleTherapyEvaluation ===
                    "Create episode and schedule therapy evaluation (Checking this box will allow therapist to perform 'therapy only' admissions, and when an OASIS is required to be completed by an RN within the 5-day window, an OASIS will need to be scheduled.)"
                  }
                  onChange={handleInputChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="createEpisodeScheduleTherapyEvaluation"
                >
                  Create episode and schedule therapy evaluation (Checking this
                  box will allow therapist to perform &apos;therapy only&apos;
                  admissions, and when an OASIS is required to be completed by
                  an RN within the 5-day window, an OASIS will need to be
                  scheduled.)
                </label>
              </div>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="createEpisodeScheduleNonOasisStartCare"
                  name="createEpisodeScheduleNonOasisStartCare"
                  value="Create episode & schedule Non-OASIS Start of Care visit after saving"
                  checked={
                    formData.createEpisodeScheduleNonOasisStartCare ===
                    "Create episode & schedule Non-OASIS Start of Care visit after saving"
                  }
                  onChange={handleInputChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="createEpisodeScheduleNonOasisStartCare"
                >
                  Create episode & schedule Non-OASIS Start of Care visit after
                  saving
                </label>
              </div>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="createEpisodeScheduleInitialOasisRecert"
                  name="createEpisodeScheduleInitialOasisRecert"
                  value="Create episode & schedule initial OASIS Recert in Axxess"
                  checked={
                    formData.createEpisodeScheduleInitialOasisRecert ===
                    "Create episode & schedule initial OASIS Recert in Axxess"
                  }
                  onChange={handleInputChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="createEpisodeScheduleInitialOasisRecert"
                >
                  Create episode & schedule initial OASIS Recert in Axxess
                </label>
              </div>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="createEpisodeScheduleInitialNonOasisRecert"
                  name="createEpisodeScheduleInitialNonOasisRecert"
                  value="Create episode & schedule initial Non-OASIS Recert in Axxess"
                  checked={
                    formData.createEpisodeScheduleInitialNonOasisRecert ===
                    "Create episode & schedule initial Non-OASIS Recert in Axxess"
                  }
                  onChange={handleInputChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="createEpisodeScheduleInitialNonOasisRecert"
                >
                  Create episode & schedule initial Non-OASIS Recert in Axxess
                </label>
              </div>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="trackF2FDocumentation"
                  name="trackF2FDocumentation"
                  value="Track F2F Documentation"
                  checked={
                    formData.trackF2FDocumentation === "Track F2F Documentation"
                  }
                  onChange={handleInputChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="trackF2FDocumentation"
                >
                  Track F2F Documentation
                </label>
              </div>
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
