import { useState, useEffect } from "react";
import Template from "./../../components/FormElement/Template";
import { useCreateClinicalDiagnosisMutation } from "../../Redux/api/ClinicalDiagnosis";
import PageHeader from "./../../components/FormElement/PageHeader";
import AuthLoader from "./../../utils/Loaders/AuthLoader";
const CreateClinicalAndDiagnoses = () => {
  const [createClinicalDiagnosis, { data, error, isLoading }] =
    useCreateClinicalDiagnosisMutation();
  const localStorageClinicalDiagnosis = JSON.parse(
    localStorage.getItem("ClinicalDiagnosis")
  );
  const [template, setTemplate] = useState("");
  const initialFormData = {
    serviceRequired: {
      SN: localStorageClinicalDiagnosis?.serviceRequired?.SN || "",
      HHA: localStorageClinicalDiagnosis?.serviceRequired?.HHA || "",
      PT: localStorageClinicalDiagnosis?.serviceRequired?.PT || "",
      OT: localStorageClinicalDiagnosis?.serviceRequired?.OT || "",
      ST: localStorageClinicalDiagnosis?.serviceRequired?.ST || "",
      MSW: localStorageClinicalDiagnosis?.serviceRequired?.MSW || "",
      heightIn: localStorageClinicalDiagnosis?.serviceRequired?.heightIn || "",
      heightCm: localStorageClinicalDiagnosis?.serviceRequired?.heightCm || "",
      weightLb: localStorageClinicalDiagnosis?.serviceRequired?.weightLb || "",
      weightKg: localStorageClinicalDiagnosis?.serviceRequired?.weightKg || "",
    },
    dmeNeeded: {
      bedsideCommode:
        localStorageClinicalDiagnosis?.dmeNeeded?.bedsideCommode || "",
      cane: localStorageClinicalDiagnosis?.dmeNeeded?.cane || "",
      elevatedToiletSeat:
        localStorageClinicalDiagnosis?.dmeNeeded?.elevatedToiletSeat || "",
      grabBars: localStorageClinicalDiagnosis?.dmeNeeded?.grabBars || "",
      hospitalBed: localStorageClinicalDiagnosis?.dmeNeeded?.hospitalBed || "",
      nebulizer: localStorageClinicalDiagnosis?.dmeNeeded?.nebulizer || "",
      oxygen: localStorageClinicalDiagnosis?.dmeNeeded?.oxygen || "",
      tubShowerBench:
        localStorageClinicalDiagnosis?.dmeNeeded?.tubShowerBench || "",
      walker: localStorageClinicalDiagnosis?.dmeNeeded?.walker || "",
      wheelchair: localStorageClinicalDiagnosis?.dmeNeeded?.wheelchair || "",
      other: localStorageClinicalDiagnosis?.dmeNeeded?.other || "",
    },
    primaryDiagnosis: localStorageClinicalDiagnosis?.primaryDiagnosis || "",
    primaryDiagnosisCode:
      localStorageClinicalDiagnosis?.primaryDiagnosisCode || "",
    otherDiagnoses: localStorageClinicalDiagnosis?.otherDiagnoses || [
      { diagnosis: "", code: "" },
    ],
    clinicalComments: localStorageClinicalDiagnosis?.clinicalComments || "",
  };

  // State to hold formData, initializing with localStorage data if available
  const [formData, setFormData] = useState(
    localStorageClinicalDiagnosis || initialFormData
  );

  const handleInputChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    const isCheckbox = type === "checkbox";

    if (name.startsWith("serviceRequired")) {
      const key = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        serviceRequired: {
          ...prevData.serviceRequired,
          [key]: isCheckbox ? (checked ? "true" : "false") : value,
        },
      }));
    } else if (name.startsWith("dmeNeeded")) {
      const key = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        dmeNeeded: {
          ...prevData.dmeNeeded,
          [key]: isCheckbox ? (checked ? "true" : "false") : value,
        },
      }));
    } else if (name.startsWith("otherDiagnoses")) {
      const fieldName = name.split(".")[2]; // Extracting 'diagnosis' or 'code'
      const updatedDiagnoses = [...formData.otherDiagnoses];
      updatedDiagnoses[index][fieldName] = value;
      setFormData({
        ...formData,
        otherDiagnoses: updatedDiagnoses,
      });
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
    console.log(formData);
    createClinicalDiagnosis(formData);
  };

  const handleSaveAndExit = (e) => {
    e.preventDefault();
    localStorage.setItem("ClinicalDiagnosis", JSON.stringify(formData));
  };

  const handleSaveAndContinue = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "ClinicalDiagnosis",
      JSON.stringify(createClinicalDiagnosis)
    );
    createClinicalDiagnosis(formData);
  };
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      clinicalComments:
        (prev.clinicalComments || "") +
        (template?.value ? template.value + "\n\n" : ""),
    }));
  }, [template]);
  if (isLoading) return <AuthLoader />;
  return (
    <form className="card" onSubmit={handleAdmit}>
      <div className="card-body">
        <PageHeader title="Pharmacy" className="card-header fs-3" />
        {data?.message && (
          <div className="alert alert-success text-center">{data?.message}</div>
        )}
        {error?.data?.message && (
          <div className="alert alert-danger text-center">
            {error?.data?.message}
          </div>
        )}
        <div className="accordion" id="ClinicalDiagnosisInfoAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingServiceRequired">
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
              className="accordion-collapse collapse show"
              aria-labelledby="headingServiceRequired"
              data-bs-parent="#ClinicalDiagnosisInfoAccordion"
            >
              <div className="accordion-body">
                {["SN", "HHA", "PT", "OT", "ST", "MSW"].map((service) => (
                  <div className="form-check" key={service}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={service}
                      name={`serviceRequired.${service}`}
                      checked={formData.serviceRequired[service] === "true"}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor={service}>
                      {service}
                    </label>
                  </div>
                ))}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="heightIn" className="form-label">
                      Height (in)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="heightIn"
                      name="serviceRequired.heightIn"
                      value={formData.serviceRequired.heightIn}
                      onChange={handleInputChange}
                      placeholder="Enter height in inches"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="heightCm" className="form-label">
                      Height (cm)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="heightCm"
                      name="serviceRequired.heightCm"
                      value={formData.serviceRequired.heightCm}
                      onChange={handleInputChange}
                      placeholder="Enter height in centimeters"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="weightLb" className="form-label">
                      Weight (lb)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="weightLb"
                      name="serviceRequired.weightLb"
                      value={formData.serviceRequired.weightLb}
                      onChange={handleInputChange}
                      placeholder="Enter weight in pounds"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="weightKg" className="form-label">
                      Weight (kg)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="weightKg"
                      name="serviceRequired.weightKg"
                      value={formData.serviceRequired.weightKg}
                      onChange={handleInputChange}
                      placeholder="Enter weight in kilograms"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingDMENeeded">
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
              <div className="accordion-body">
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
                      className="form-check-input"
                      type="checkbox"
                      id={dme}
                      name={`dmeNeeded.${dme}`}
                      checked={formData.dmeNeeded[dme] === "true"}
                      onChange={handleInputChange}
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
            <h2 className="accordion-header" id="headingPatientDiagnosis">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapsePatientDiagnosis"
                aria-expanded="false"
                aria-controls="collapsePatientDiagnosis"
              >
                Patient Diagnosis
              </button>
            </h2>
            <div
              id="collapsePatientDiagnosis"
              className="accordion-collapse collapse"
              aria-labelledby="headingPatientDiagnosis"
              data-bs-parent="#ClinicalDiagnosisInfoAccordion"
            >
              <div className="accordion-body">
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
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="primaryDiagnosisCode"
                      className="form-label"
                    >
                      ICD-10-CM Code
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="primaryDiagnosisCode"
                      name="primaryDiagnosisCode"
                      value={formData.primaryDiagnosisCode}
                      onChange={handleInputChange}
                      placeholder="Enter ICD-10-CM code"
                      required
                    />
                  </div>
                </div>
                {formData.otherDiagnoses.map((diagnosis, index) => (
                  <div className="row mb-3" key={index}>
                    <div className="col-md-6">
                      <label
                        htmlFor={`otherDiagnoses.${index}.diagnosis`}
                        className="form-label"
                      >
                        Other Diagnosis {index + 1}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id={`otherDiagnoses.${index}.diagnosis`}
                        name={`otherDiagnoses.${index}.diagnosis`}
                        value={diagnosis.diagnosis}
                        onChange={(e) => handleInputChange(e, index)}
                        placeholder="Enter other diagnosis"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label
                        htmlFor={`otherDiagnoses.${index}.code`}
                        className="form-label"
                      >
                        ICD-10-CM Code {index + 1}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id={`otherDiagnoses.${index}.code`}
                        name={`otherDiagnoses.${index}.code`}
                        value={diagnosis.code}
                        onChange={(e) => handleInputChange(e, index)}
                        placeholder="Enter ICD-10-CM code"
                        required
                      />
                    </div>
                    {index > 0 && (
                      <div className="col-md-1 mt-4">
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => handleRemoveDiagnosis(index)}
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                <div className="row mb-3">
                  <div className="col-md-12">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleAddDiagnosis}
                    >
                      + Add Diagnosis
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingClinicalComments">
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
              <div className="accordion-body">
                <div className="mb-3">
                  <label htmlFor="templates" className="form-label">
                    Templates
                  </label>
                  <Template
                    selectedTemplate={template}
                    setSelectedTemplate={setTemplate}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="clinicalComments" className="form-label">
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
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end mt-3">
          <button
            type="submit"
            className="btn btn-secondary me-2"
            onClick={handleSaveAndExit}
          >
            Save and Exit
          </button>
          <button
            type="submit"
            className="btn btn-primary me-2"
            onClick={handleSaveAndContinue}
          >
            Save and Continue
          </button>
          <button className="btn btn-success" type="submit">
            Admit
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateClinicalAndDiagnoses;
