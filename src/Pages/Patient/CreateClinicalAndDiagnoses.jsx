import { useState, useEffect, useRef } from "react";
import Template from "./../../components/FormElement/Template";
import { useCreateClinicalDiagnosisMutation } from "../../Redux/api/ClinicalDiagnosis";
import PageHeader from "./../../components/FormElement/PageHeader";
import AuthLoader from "./../../utils/Loaders/AuthLoader";
import { ReactToPrint } from "react-to-print";
import {
  getAllSectionStepState,
  updateSteps,
} from "./../../Redux/slices/SectionStep.js";
import { useSelector, useDispatch } from "react-redux";
import { showToast } from "./../../utils/Toastify";
const CreateClinicalAndDiagnoses = () => {
  const componentRef = useRef();
  const [createClinicalDiagnosis, { data, error, isLoading, isSuccess }] =
    useCreateClinicalDiagnosisMutation();
  const localStorageClinicalDiagnosis = JSON.parse(
    localStorage.getItem("ClinicalDiagnosis")
  );
  const [template, setTemplate] = useState("");

  const initialFormData = {
    serviceRequired: [],
    height: {
      value: "",
      unit: "",
    },
    weight: {
      value: "",
      unit: "",
    },
    dmeNeeded: [],
    primaryDiagnosis: "",
    primaryDiagnosisCode:
     "",
    otherDiagnoses: [
      { diagnosis: "", code: "" },
    ],
    clinicalComments: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  //console.log(formData)
  const handleInputChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    const isCheckbox = type === "checkbox";

    if (name.startsWith("serviceRequired")) {
      setFormData((prevData) => ({
        ...prevData,
        serviceRequired: isCheckbox
          ? checked
            ? [...prevData.serviceRequired, value]
            : prevData.serviceRequired.filter((item) => item !== value)
          : prevData.serviceRequired,
      }));
    } else if (name.startsWith("dmeNeeded")) {
      setFormData((prevData) => ({
        ...prevData,
        dmeNeeded: isCheckbox
          ? checked
            ? [...prevData.dmeNeeded, value]
            : prevData.dmeNeeded.filter((item) => item !== value)
          : prevData.dmeNeeded,
      }));
    } else if (name.startsWith("otherDiagnoses")) {
      const fieldName = name.split(".")[2];
      const updatedDiagnoses = [...formData.otherDiagnoses];
      updatedDiagnoses[index][fieldName] = value;
      setFormData({
        ...formData,
        otherDiagnoses: updatedDiagnoses,
      });
    } else if (name.includes(".")) {
      const [outerKey, innerKey] = name.split(".");
      setFormData((prevFormData) => ({
        ...prevFormData,
        [outerKey]: {
          ...prevFormData[outerKey],
          [innerKey]: value,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAddDiagnosis = () => {
    setFormData({
      ...formData,
      otherDiagnoses: [...formData.otherDiagnoses, { diagnosis: "", code: "" }],
    });
  };

  const handleRemoveDiagnosis = (index) => {
    const updatedDiagnoses = formData.otherDiagnoses.filter(
      (diagnosis, i) => i !== index
    );
    setFormData({
      ...formData,
      otherDiagnoses: updatedDiagnoses,
    });
  };

  const handleAdmit = (e) => {
    e.preventDefault();
    const patientId = JSON.parse(localStorage.getItem("patient"));
    if (patientId?._id) {
      formData.patientId = allSteps.patientId ||patientId?._id;
      createClinicalDiagnosis(formData);
      localStorage.removeItem("ClinicalDiagnosis");
    }else{
      showToast("error","Patient id required")
    }
  };

  const handleSaveAndExit = (e) => {
    e.preventDefault();
    const patientId = JSON.parse(localStorage.getItem("patient"));
    if (patientId?._id) {
      formData.patientId = allSteps.patientId ||patientId?._id;
      createClinicalDiagnosis(formData);
      localStorage.setItem("ClinicalDiagnosis", JSON.stringify(formData));
    }else{
      showToast("error","Patient id required")
    }
  };

  const handleSaveAndContinue = (e) => {
    e.preventDefault();
    const patientId = JSON.parse(localStorage.getItem("patient"));
    if (patientId?._id) {
      formData.patientId = allSteps.patientId ||patientId?._id;
      createClinicalDiagnosis(formData);
      localStorage.setItem("ClinicalDiagnosis", JSON.stringify(formData));
    }else{
      showToast("error","Patient id required")
    }
  };

  const allSteps = useSelector(getAllSectionStepState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (template?.value) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        clinicalComments:
          (prevFormData.clinicalComments || "") + template.value,
      }));
    }
  }, [template]);
  useEffect(() => {
    if (isSuccess) {
      dispatch(updateSteps({ ...allSteps, steps: allSteps?.steps + 1 }));
    }
  }, [isSuccess]);
  useEffect(() => {
    showToast("error", error?.data?.message);
    showToast("success", data?.message);
  }, [error?.data?.message, data?.message]);
  useEffect(() => {
    if(localStorageClinicalDiagnosis){
      setFormData({...localStorageClinicalDiagnosis})
    }
  }, []);


  if (isLoading) return <AuthLoader />;

  return (
    <form ref={componentRef} onSubmit={handleAdmit} className="card w-100">
      <div className="card-body w-100">
        <PageHeader title="Clinical/Diagnosis" className="card-header fs-3" back={false}/>

        <div className="accordion" id="ClinicalDiagnosisInfoAccordion">
          <div className="accordion-item">
            <h2
              className="accordion-header"
              id="ClinicalDiagnosisInfoAccordion"
            >
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseServiceRequired"
                aria-expanded="true"
                aria-controls="collapseServiceRequired"
              >
                Service Required
              </button>
            </h2>
            <div
              id="collapseServiceRequired"
              className="accordion-collapse collapse "
              aria-labelledby="headingServiceRequired"
              data-bs-parent="#ClinicalDiagnosisInfoAccordion"
            >
              <div className="accordion-body py-2">
                {["SN", "HHA", "PT", "OT", "ST", "MSW"].map((service) => (
                  <div className="form-check" key={service}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={service}
                      name="serviceRequired"
                      value={service}
                      checked={formData.serviceRequired.includes(service)}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor={service}>
                      {service}
                    </label>
                  </div>
                ))}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="heightValue" className="form-label">
                      Height
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="heightValue"
                      name="height.value"
                      value={formData.height.value}
                      onChange={handleInputChange}
                      placeholder="Enter height"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="heightUnit" className="form-label">
                      Unit
                    </label>
                    <select
                      className="form-control"
                      id="heightUnit"
                      name="height.unit"
                      value={formData.height.unit}
                      onChange={handleInputChange}
                    >
                      <option value="in">IN</option>
                      <option value="cm">CM</option>
                    </select>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="weightValue" className="form-label">
                      Weight
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="weightValue"
                      name="weight.value"
                      value={formData.weight.value}
                      onChange={handleInputChange}
                      placeholder="Enter weight"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="weightUnit" className="form-label">
                      Unit
                    </label>
                    <select
                      className="form-control"
                      id="weightUnit"
                      name="weight.unit"
                      value={formData.weight.unit}
                      onChange={handleInputChange}
                    >
                      <option value="lb">LB</option>
                      <option value="kg">KG</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2
              className="accordion-header"
              id="ClinicalDiagnosisInfoAccordion"
            >
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseDMENeeded"
                aria-expanded="false"
                aria-controls="collapseDMENeeded"
              >
                DME Needed
              </button>
            </h2>
            <div
              id="collapseDMENeeded"
              className="accordion-collapse collapse"
              aria-labelledby="headingDMENeeded"
              data-bs-parent="#ClinicalDiagnosisInfoAccordion"
            >
              <div className="accordion-body py-2">
                {[
                  "bedsideCommode",
                  "cane",
                  "elevatedToiletSeat",
                  "grabBars",
                  "hospitalBed",
                  "nebulizer",
                  "oxygen",
                  "tubShowerBench",
                  "walker",
                  "wheelchair",
                  "other",
                ].map((dme) => (
                  <div className="form-check" key={dme}>
                    <input
                      type="checkbox"
                      id={dme}
                      name="dmeNeeded"
                      value={dme}
                      checked={formData.dmeNeeded.includes(dme)}
                      onChange={handleInputChange}
                      className="form-check-input"
                    />
                    <label className="form-check-label" htmlFor={dme}>
                      {dme}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2
              className="accordion-header"
              id="ClinicalDiagnosisInfoAccordion"
            >
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapsePrimaryDiagnosis"
                aria-expanded="false"
                aria-controls="collapsePrimaryDiagnosis"
              >
                Primary Diagnosis
              </button>
            </h2>
            <div
              id="collapsePrimaryDiagnosis"
              className="accordion-collapse collapse"
              aria-labelledby="headingPrimaryDiagnosis"
              data-bs-parent="#ClinicalDiagnosisInfoAccordion"
            >
              <div className="accordion-body py-2">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="primaryDiagnosis" className="form-label">
                      Primary Diagnosis
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="primaryDiagnosis"
                      name="primaryDiagnosis"
                      value={formData.primaryDiagnosis}
                      onChange={handleInputChange}
                      placeholder="Enter primary diagnosis"
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="primaryDiagnosisCode"
                      className="form-label"
                    >
                      Primary Diagnosis Code
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="primaryDiagnosisCode"
                      name="primaryDiagnosisCode"
                      value={formData.primaryDiagnosisCode}
                      onChange={handleInputChange}
                      placeholder="Enter primary diagnosis code"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2
              className="accordion-header"
              id="ClinicalDiagnosisInfoAccordion"
            >
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOtherDiagnoses"
                aria-expanded="false"
                aria-controls="collapseOtherDiagnoses"
              >
                Other Diagnoses
              </button>
            </h2>
            <div
              id="collapseOtherDiagnoses"
              className="accordion-collapse collapse"
              aria-labelledby="headingOtherDiagnoses"
              data-bs-parent="#ClinicalDiagnosisInfoAccordion"
            >
              <div className="accordion-body py-2">
                {formData.otherDiagnoses.map((diagnosis, index) => (
                  <div className="row mb-3" key={index}>
                    <div className="col-md-6">
                      <label
                        htmlFor={`diagnosis-${index}`}
                        className="form-label"
                      >
                        Diagnosis
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id={`diagnosis-${index}`}
                        name={`otherDiagnoses.${index}.diagnosis`}
                        value={diagnosis.diagnosis}
                        onChange={(e) => handleInputChange(e, index)}
                        placeholder="Enter diagnosis"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor={`code-${index}`} className="form-label">
                        Code
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id={`code-${index}`}
                        name={`otherDiagnoses.${index}.code`}
                        value={diagnosis.code}
                        onChange={(e) => handleInputChange(e, index)}
                        placeholder="Enter code"
                      />
                    </div>
                    <div className="col-md-12 mt-4 hide-on-print">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleRemoveDiagnosis(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-primary hide-on-print"
                  onClick={handleAddDiagnosis}
                >
                  Add Diagnosis
                </button>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2
              className="accordion-header"
              id="ClinicalDiagnosisInfoAccordion"
            >
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseClinicalComments"
                aria-expanded="false"
                aria-controls="collapseClinicalComments"
              >
                Clinical Comments
              </button>
            </h2>
            <div
              id="collapseClinicalComments"
              className="accordion-collapse collapse"
              aria-labelledby="headingClinicalComments"
              data-bs-parent="#ClinicalDiagnosisInfoAccordion"
            >
              <div className="accordion-body py-2">
                <div className="mb-3">
                  <label
                    htmlFor="clinicalComments"
                    className="form-label hide-on-print"
                  >
                    Clinical Comments
                  </label>
                  <textarea
                    className="form-control"
                    id="clinicalComments"
                    name="clinicalComments"
                    value={formData.clinicalComments}
                    onChange={handleInputChange}
                    placeholder="Enter clinical comments"
                    rows="3"
                  ></textarea>
                </div>
                <div className="hide-on-print">
                  <Template
                    selectedTemplate={template}
                    setSelectedTemplate={setTemplate}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex hide-on-print justify-content-end gap-3 mt-3">
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
          <button type="submit" className="btn btn-success">
            save
          </button>
          <ReactToPrint
            trigger={() => <span className="btn btn-primary">Print</span>}
            content={() => componentRef.current}
            documentTitle="Patient"
          />
        </div>
      </div>
    </form>
  );
};

export default CreateClinicalAndDiagnoses;
