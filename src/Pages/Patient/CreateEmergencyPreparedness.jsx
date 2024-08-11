import { useState, useEffect, useRef } from "react";
import { useCreateEmergencyMutation } from "../../Redux/api/EmergencyApi";
import PageHeader from "./../../components/FormElement/PageHeader";
import AuthLoader from "./../../utils/Loaders/AuthLoader";
import Template from "./../../components/FormElement/Template";
import StateSelect from "./../../components/FormElement/StateSelect";
import CountySelect from "./../../components/FormElement/CountySelect";
import CitySelect from "../../components/FormElement/CitySelect";
import { ReactToPrint } from "react-to-print";
import {
  getAllSectionStepState,
  updateSteps,
} from "./../../Redux/slices/SectionStep.js";
import { useSelector, useDispatch } from "react-redux";
import { showToast } from './../../utils/Toastify';
const CreateEmergencyPreparedness = () => {
  const allSteps = useSelector(getAllSectionStepState);
  const dispatch = useDispatch();

  const componentRef = useRef();
  const [createEmergency, { data, isLoading, error, isSuccess }] =
    useCreateEmergencyMutation();
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [county, setCounty] = useState("");
  const [template, setTemplate] = useState("");
  const [addTemplate, setAddTemplate] = useState("");
  const localStorageData = JSON.parse(localStorage.getItem("Emergency"));

  const initialFormData = {
    emergencyTriage: localStorageData?.emergencyTriage
      ? localStorageData?.emergencyTriage
      : "",
    additionalInfo: localStorageData?.additionalInfo
      ? localStorageData?.additionalInfo
      : [],
    additionalComments: localStorageData?.additionalComments
      ? localStorageData?.additionalComments
      : "",
    evacuationZone: localStorageData?.evacuationZone
      ? localStorageData?.evacuationZone
      : "",
    sameAsEvacuationContact: localStorageData?.sameAsEvacuationContact
      ? localStorageData?.sameAsEvacuationContact
      : false,
    addressLine1: localStorageData?.addressLine1
      ? localStorageData?.addressLine1
      : "",
    addressLine2: localStorageData?.addressLine2
      ? localStorageData?.addressLine2
      : null,
    city: localStorageData?.city ? localStorageData?.city : "",
    state: localStorageData?.state ? localStorageData?.state : "",
    zip: localStorageData?.zip ? localStorageData?.zip : "",
    county: localStorageData?.county ? localStorageData?.county : "",
    mobilePhone: localStorageData?.mobilePhone
      ? localStorageData?.mobilePhone
      : "",
    altMobilePhone: localStorageData?.altMobilePhone
      ? localStorageData?.altMobilePhone
      : null,
    visitLocation: localStorageData?.visitLocations
      ? localStorageData?.visitLocations
      : false,
    comments: localStorageData?.comments ? localStorageData?.comments : null,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "additionalInfo") {
      setFormData((prevState) => ({
        ...prevState,
        additionalInfo: checked
          ? [...prevState.additionalInfo, value]
          : prevState.additionalInfo.filter((item) => item !== value),
      }));
    } else if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else if (type === "radio") {
      // Handle radio inputs
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.city = city;
    formData.state = state;
    formData.county = county;
    const patientId = JSON.parse(localStorage.getItem("patient"));
    if (patientId?._id) {
      formData.patientId = allSteps.patientId || patientId?._id;
      localStorage.removeItem("Emergency");
    } else {
      showToast("error", "Patient id required");
    }
    createEmergency(formData);
  };

  const handleSaveAndContinue = (e) => {
    e.preventDefault();
    formData.city = city;
    formData.state = state;
    formData.county = county;
    const patientId = JSON.parse(localStorage.getItem("patient"));
    if (patientId?._id) {
      formData.patientId = allSteps.patientId || patientId?._id;
      createEmergency(formData);
      localStorage.setItem("Emergency", JSON.stringify(formData));
    } else {
      showToast("error", "Patient id required");
    }
  };

  const handleSaveAndExit = (e) => {
    e.preventDefault();
    formData.city = city;
    formData.state = state;
    formData.county = county;
    const patientId = JSON.parse(localStorage.getItem("patient"));
    if (patientId?._id) {
      formData.patientId = allSteps.patientId || patientId?._id;
      localStorage.setItem("Emergency", JSON.stringify(formData));
    } else {
      showToast("error", "Patient id required");
    }
  };
  useEffect(() => {
    setCity(localStorageData?.city);
    setState(localStorageData?.state);
    setCounty(localStorageData?.county);
  }, []);
  useEffect(() => {
    if (addTemplate?.value) {
      setFormData((prev) => ({
        ...prev,
        additionalComments:
          prev.additionalComments +
          (prev.additionalComments ? "\n" : "") +
          addTemplate.value,
      }));
    }
  }, [addTemplate?.value]);
  useEffect(() => {
    if (template?.value) {
      setFormData((prev) => ({
        ...prev,
        comments: prev.comments + (prev.comments ? "\n" : "") + template.value,
      }));
    }
  }, [template?.value]);
  useEffect(() => {
    if (isSuccess) {
      dispatch(updateSteps({ ...allSteps, steps: allSteps?.steps + 1 }));
    }
  }, [isSuccess]);
  useEffect(() => {
    showToast("error", error?.data?.message);
    showToast("success", data?.message);
  }, [error?.data?.message, data?.message]);
  if (isLoading) return <AuthLoader />;

  return (
    <form ref={componentRef} onSubmit={handleSubmit} className="card w-100">
      <div className="card-body">
        <div className="accordion" id="ClinicalDiagnosisInfoAccordion">
          <PageHeader
            title="Emergency Preparedness"
            className="card-header fs-3"
            back={false}
          />

          {/* Emergency Triage Information */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingEmergencyTriage">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseEmergencyTriage"
                aria-expanded="true"
                aria-controls="collapseEmergencyTriage"
              >
                Emergency Triage
              </button>
            </h2>
            <div
              id="collapseEmergencyTriage"
              className="accordion-collapse collapse  "
              aria-labelledby="headingEmergencyTriage"
              data-bs-parent="#ClinicalDiagnosisInfoAccordion"
            >
              <div className="accordion-body py-2">
                <div className="mb-3">
                  <label htmlFor="emergencyTriage" className="form-label">
                    Emergency Triage
                  </label>
                  <div>
                    <input
                      type="radio"
                      className="form-check-input"
                      className="form-check-input"
                      name="emergencyTriage"
                      id="emergencyTriage1"
                      value="1"
                      onChange={handleInputChange}
                      checked={formData.emergencyTriage === "1"}
                    />{" "}
                    1. Life-threatening (or potential) and requires ongoing
                    medical treatment.
                    <br />
                    <input
                      type="radio"
                      className="form-check-input"
                      name="emergencyTriage"
                      id="emergencyTriage2"
                      value="2"
                      onChange={handleInputChange}
                      checked={formData.emergencyTriage === "2"}
                    />{" "}
                    2. Not life-threatening but would suffer severe adverse
                    effects from interruption of services.
                    <br />
                    <input
                      type="radio"
                      className="form-check-input"
                      name="emergencyTriage"
                      id="emergencyTriage3"
                      value="3"
                      onChange={handleInputChange}
                      checked={formData.emergencyTriage === "3"}
                    />{" "}
                    3. Visits could be postponed 24-48 hours without adverse
                    effects.
                    <br />
                    <input
                      type="radio"
                      className="form-check-input"
                      name="emergencyTriage"
                      id="emergencyTriage4"
                      value="4"
                      onChange={handleInputChange}
                      checked={formData.emergencyTriage === "4"}
                    />{" "}
                    4. Visits could be postponed 72-96 hours without adverse
                    effects.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="additionalInfo" className="form-label">
                    Additional Emergency Preparedness Information
                  </label>
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="additionalInfo"
                      id="needsAssistance"
                      value="needsAssistance"
                      onChange={handleInputChange}
                      checked={formData.additionalInfo.includes(
                        "needsAssistance"
                      )}
                    />{" "}
                    Needs assistance during an emergency
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="additionalInfo"
                      id="contactWithOfficials"
                      value="contactWithOfficials"
                      onChange={handleInputChange}
                      checked={formData.additionalInfo.includes(
                        "contactWithOfficials"
                      )}
                    />{" "}
                    Contact made with local/state emergency preparedness
                    officials regarding patient in need of help during an
                    evacuation
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="additionalInfo"
                      id="medicalNeeds"
                      value="medicalNeeds"
                      onChange={handleInputChange}
                      checked={formData.additionalInfo.includes("medicalNeeds")}
                    />{" "}
                    Medical Needs/Equipment (i.e., bedbound, oxygen, vent, IV
                    cardiac meds other DME)
                  </div>
                  {formData.additionalInfo.medicalNeeds && (
                    <div>
                      <label htmlFor="medicalNeedsInfo" className="form-label">
                        Medical Needs/Equipment Details
                      </label>
                      <textarea
                        name="medicalNeedsInfo"
                        id="medicalNeedsInfo"
                        className="form-control"
                        value={formData.medicalNeedsInfo}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Emergency Preparedness Information */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingAdditionalInfo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseAdditionalInfo"
                aria-expanded="false"
                aria-controls="collapseAdditionalInfo"
              >
                Additional Emergency Preparedness Information
              </button>
            </h2>
            <div
              id="collapseAdditionalInfo"
              className="accordion-collapse collapse "
              aria-labelledby="headingAdditionalInfo"
              data-bs-parent="#ClinicalDiagnosisInfoAccordion"
            >
              <div className="accordion-body py-2">
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="additionalComments">Select Templates</label>
                    <Template
                      addTemplate={addTemplate}
                      setSelectedTemplate={setAddTemplate}
                    />
                    <span>You have 2000 characters remaining</span>
                    <textarea
                      name="additionalComments"
                      id="additionalComments"
                      className="form-control"
                      value={formData.additionalComments}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Evacuation Information */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingEvacuation">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseEvacuation"
                aria-expanded="false"
                aria-controls="collapseEvacuation"
              >
                Evacuation
              </button>
            </h2>
            <div
              id="collapseEvacuation"
              className="accordion-collapse collapse "
              aria-labelledby="headingEvacuation"
              data-bs-parent="#ClinicalDiagnosisInfoAccordion"
            >
              <div className="accordion-body py-2">
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="evacuationZone" className="form-label">
                      Evacuation Zone
                    </label>
                    <select
                      name="evacuationZone"
                      id="evacuationZone"
                      className="form-control"
                      value={formData.evacuationZone}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Zone</option>
                      {/* Populate options if needed */}
                    </select>
                  </div>
                  <div className="col-md-12 my-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="evacuationAddress"
                      id="evacuationAddress"
                      onChange={handleInputChange}
                      checked={formData.evacuationAddress}
                    />{" "}
                    Same as Emergency Contact
                  </div>
                </div>
                {/* Address Fields */}
                {!formData.evacuationAddress && (
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="addressLine1">Address Line 1</label>
                      <input
                        type="text"
                        name="addressLine1"
                        id="addressLine1"
                        className="form-control"
                        value={formData.addressLine1}
                        onChange={handleInputChange}
                        placeholder="Enter Address Line 1"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="addressLine2">Address Line 2</label>
                      <input
                        type="text"
                        name="addressLine2"
                        id="addressLine2"
                        className="form-control"
                        value={formData.addressLine2}
                        onChange={handleInputChange}
                        placeholder="Enter Address Line 2"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="state">State</label>
                      <StateSelect
                        selectedState={state}
                        setSelectedState={setState}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="city">City</label>
                      <CitySelect
                        stateCode={state}
                        selectedCity={city}
                        setSelectedCity={setCity}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="state">County</label>
                      <CountySelect
                        selectedState={state}
                        selectedCounty={county}
                        setSelectedCounty={setCounty}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="zip">ZIP Code</label>
                      <input
                        type="text"
                        name="zip"
                        id="zip"
                        className="form-control"
                        value={formData.zip}
                        onChange={handleInputChange}
                        placeholder="Enter ZIP Code"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="zip">Mobile Phone</label>
                      <input
                        type="text"
                        name="mobilePhone"
                        id="mobilePhone"
                        className="form-control"
                        value={formData.mobilePhone}
                        onChange={handleInputChange}
                        placeholder="Enter Mobile phone number"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="zip">Alternative MobilePhone</label>
                      <input
                        type="text"
                        name="altMobilePhone"
                        id="altMobilePhone"
                        className="form-control"
                        value={formData.altMobilePhone}
                        onChange={handleInputChange}
                        placeholder="Enter alternative phone number"
                      />
                    </div>
                    <div className="col-md-12">
                      <div className="col-md-12 my-2">
                        <input
                          type="checkbox"
                          name="evacuationAddress"
                          id="evacuationAddress"
                          onChange={handleInputChange}
                          checked={formData.evacuationAddress}
                        />{" "}
                        Set as visit location
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Additional Comments */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingComments">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseComments"
                aria-expanded="false"
                aria-controls="collapseComments"
              >
                Comments
              </button>
            </h2>
            <div
              id="collapseComments"
              className="accordion-collapse collapse "
              aria-labelledby="headingComments"
              data-bs-parent="#ClinicalDiagnosisInfoAccordion"
            >
              <div className="accordion-body py-2">
                <label htmlFor="">Template</label>
                <Template
                  selectedTemplate={template}
                  setSelectedTemplate={setTemplate}
                />
                <div className="mb-3">
                  <label htmlFor="comments" className="form-label">
                    Comments
                  </label>
                  <textarea
                    name="comments"
                    id="comments"
                    className="form-control"
                    value={formData.comments}
                    onChange={handleInputChange}
                    placeholder="Enter Additional Comments"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="row mt-4 hide-on-print">
            <div className="col-md-12 d-flex gap-3">
              <button type="submit" className="btn btn-info">
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleSaveAndExit}
              >
                Save & Exit
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onSubmit={handleSaveAndContinue}
              >
                Save & Continue
              </button>
              <ReactToPrint
                trigger={() => <span className="btn btn-primary">Print</span>}
                content={() => componentRef.current}
                documentTitle="Patient"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateEmergencyPreparedness;
