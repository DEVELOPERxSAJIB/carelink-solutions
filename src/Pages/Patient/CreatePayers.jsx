import React, { useState, useEffect, useRef } from "react";
import AuthLoader from "../../utils/Loaders/AuthLoader";
import PageHeader from "../../components/FormElement/PageHeader";

import {
  useCreatePayerMutation,
  useCreateTestPayerMutation,
} from "../../Redux/api/PayerApi";
import Template from "./../../components/FormElement/Template";
import { ReactToPrint } from "react-to-print";

import { useSelector, useDispatch } from "react-redux";
import { showToast } from "./../../utils/Toastify";
import AdmitButton from './../../components/Patient/AdmitButton';
import {
  getAllSectionStepState,
  updateSteps,
} from "./../../Redux/slices/SectionStep.js";

const CreatePayers = () => {
  const componentRef = useRef();
  const [createPayer, { data, isLoading, isSuccess, error }] =
    useCreatePayerMutation();
  const [createTestPayer, { data: testData, error: testError }] =
    useCreateTestPayerMutation();
  const localStoragePatient = JSON.parse(localStorage.getItem("Payer"));
  const allSteps = useSelector(getAllSectionStepState);
  const dispatch = useDispatch();
  const [template, setTemplate] = useState("");
  const [formData, setFormData] = useState({
    mbiNumber: "",
    hicNumber: localStoragePatient?.hicNumber
      ? localStoragePatient?.hicNumber
      : "",
    medicaidNumber: "",
    alternateMedicaidNumber: "",
    primaryInsurance: "",
    secondaryInsurance: "",
    tertiaryInsurance: "",
    payerComments: "",
    occurrenceCodes: [
      { code: "", date: "" },
      { code: "", date: "" },
      { code: "", date: "" },
      { code: "", date: "" },
      { code: "", date: "" },
    ],
    occurrenceSpans: [
      { code: "", startDate: "", endDate: "" },
      { code: "", startDate: "", endDate: "" },
      { code: "", startDate: "", endDate: "" },
      { code: "", startDate: "", endDate: "" },
    ],
    conditionCodes: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    employmentRelated: "",
    autoAccident: "",
    claimCode: "",
    unableToWorkFrom: "",
    unableToWorkTo: "",
    hospitalizationStartDate: "",
    hospitalizationEndDate: "",
    emergencyTreatmentIndicator: "",
  });

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const patientId = JSON.parse(localStorage.getItem("patient"));
    console.log(patientId?._id);
    if (patientId?._id) {
      formData.patientId = allSteps.patientId || patientId?._id;
      createPayer(formData);
      localStorage.removeItem("Payer");
    } else {
      showToast("error", "Patient id required");
    }
  };

  const handleSaveAndContinue = (e) => {
    e.preventDefault();
    
    createTestPayer(formData);
  };
  const handleSaveAndExit = (e) => {
    e.preventDefault();
    
    createTestPayer(formData);
  };
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      payerComments: prevFormData?.payerComments
        ? prevFormData.payerComments + (template?.value || "")
        : template?.value || "",
    }));
  }, [template]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(updateSteps({ ...allSteps, steps: allSteps?.steps + 1 }));
    }
    if (testData) {
      dispatch(updateSteps({ ...allSteps, steps: allSteps?.steps + 1 }));
      showToast("success", "Saved,Please continue");
      localStorage.setItem("Payer", JSON.stringify(testData?.payload));

    }
    if (testError) {
      showToast("error", testError?.data?.message);
    }
  }, [isSuccess, testError, testData]);
  console.log(error);
  useEffect(() => {
    setTemplate(localStoragePatient?.payerComments);
    if (localStoragePatient) {
      setFormData(localStoragePatient);
    }
  }, []);
  useEffect(() => {
    showToast("error", error?.data?.message);
    showToast("success", data?.message);
  }, [error?.data?.message, data?.message]);
  if (isLoading) return <AuthLoader />;

  return (
    <form ref={componentRef} onSubmit={handleSubmit} className="card w-100">
      <PageHeader
        title="Payer Information"
        className="card-header fs-3"
        back={false}
      />

      <div className="card-body">
        <div className="accordion" id="payerAccordion">
          {/* Primary Emergency Contact */}

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingPrimary">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapsePrimary"
                aria-expanded="true"
                aria-controls="collapsePrimary"
              >
                Payer information
              </button>
            </h2>
            <div
              id="collapsePrimary"
              className="accordion-collapse collapse "
              aria-labelledby="headingPrimary"
              data-bs-parent="#payerAccordion"
            >
              <div className="accordion-body py-2">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="mbiNumber" className="form-label">
                      (M0063) Medicare Beneficiary Identifier (MBI) Number
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="mbiNumber"
                      value={formData.mbiNumber}
                      onChange={(e) =>
                        handleChange("mbiNumber", e.target.value)
                      }
                      placeholder="Enter MBI Number"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="hicNumber" className="form-label">
                      Health Insurance Claim (HIC) Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="hicNumber"
                      value={formData.hicNumber}
                      onChange={(e) =>
                        handleChange("hicNumber", e.target.value)
                      }
                      placeholder="Enter HIC Number"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="medicaidNumber" className="form-label">
                      Medicaid Number <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="medicaidNumber"
                      value={formData.medicaidNumber}
                      onChange={(e) =>
                        handleChange("medicaidNumber", e.target.value)
                      }
                      placeholder="Enter Medicaid Number"
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="alternateMedicaidNumber"
                      className="form-label"
                    >
                      Alternate Medicaid Number:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="alternateMedicaidNumber"
                      value={formData.alternateMedicaidNumber}
                      onChange={(e) =>
                        handleChange("alternateMedicaidNumber", e.target.value)
                      }
                      placeholder="Enter Alternate Medicaid Number"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Insurance Information */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingInsurance">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseInsurance"
                aria-expanded="true"
                aria-controls="collapseInsurance"
              >
                Insurance Information
              </button>
            </h2>
            <div
              id="collapseInsurance"
              className="accordion-collapse collapse"
              aria-labelledby="headingInsurance"
              data-bs-parent="#payerAccordion"
            >
              <div className="accordion-body py-2">
                <div className="row g-3">
                  <div className="col-md-4">
                    <label htmlFor="primaryInsurance" className="form-label">
                      Primary Insurance <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="primaryInsurance"
                      value={formData.primaryInsurance}
                      onChange={(e) =>
                        handleChange("primaryInsurance", e.target.value)
                      }
                      placeholder="Enter Primary Insurance"
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="secondaryInsurance" className="form-label">
                      Secondary Insurance:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="secondaryInsurance"
                      value={formData.secondaryInsurance}
                      onChange={(e) =>
                        handleChange("secondaryInsurance", e.target.value)
                      }
                      placeholder="Enter Secondary Insurance"
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="tertiaryInsurance" className="form-label">
                      Tertiary Insurance:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="tertiaryInsurance"
                      value={formData.tertiaryInsurance}
                      onChange={(e) =>
                        handleChange("tertiaryInsurance", e.target.value)
                      }
                      placeholder="Enter Tertiary Insurance"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Payer Comments and Selected Templates */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingPayerComments">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapsePayerComments"
                aria-expanded="true"
                aria-controls="collapsePayerComments"
              >
                Payer Comments and Selected Templates
              </button>
            </h2>
            <div
              id="collapsePayerComments"
              className="accordion-collapse collapse"
              aria-labelledby="headingPayerComments"
              data-bs-parent="#payerAccordion"
            >
              <div className="accordion-body py-2">
                <div className="row g-3">
                  <div className="col-md-12 hide-on-print">
                    <label className="form-label">Selected Templates:</label>
                    <Template
                      selectedTemplate={template}
                      setSelectedTemplate={setTemplate}
                    />
                  </div>
                  <div className="col-md-12">
                    <label
                      htmlFor="payerComments"
                      className="form-label hide-on-print"
                    >
                      Payer Comments:
                    </label>
                    <textarea
                      className="form-control"
                      id="payerComments"
                      rows="3"
                      value={formData.payerComments}
                      onChange={(e) =>
                        handleChange("payerComments", e.target.value)
                      }
                      placeholder="Enter Payer Comments"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional UB-04 Locators */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingUB04Locators">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseUB04Locators"
                aria-expanded="true"
                aria-controls="collapseUB04Locators"
              >
                Additional UB-04 Locators
              </button>
            </h2>
            <div
              id="collapseUB04Locators"
              className="accordion-collapse collapse"
              aria-labelledby="headingUB04Locators"
              data-bs-parent="#payerAccordion"
            >
              <div className="accordion-body py-2">
                <div className="row g-3">
                  <p>(UB-04 Locators 31 - 34) Occurrence Codes</p>
                  {formData?.occurrenceCodes &&
                    formData?.occurrenceCodes?.map((code, index) => (
                      <React.Fragment key={`occurrenceCode-${index}`}>
                        <div className="col-md-6">
                          <label
                            htmlFor={`occurrenceCode${index + 1}A`}
                            className="form-label"
                          >
                            {`${31 + Math.floor(index / 2)}${
                              index % 2 === 0 ? "A" : "B"
                            } Code:`}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id={`occurrenceCode${index + 1}A`}
                            value={code.code}
                            onChange={(e) => {
                              const newOccurrenceCodes = [
                                ...formData.occurrenceCodes,
                              ];
                              newOccurrenceCodes[index].code = e.target.value;
                              setFormData((prevData) => ({
                                ...prevData,
                                occurrenceCodes: newOccurrenceCodes,
                              }));
                            }}
                            placeholder={`Enter Code ${
                              31 + Math.floor(index / 2)
                            }${index % 2 === 0 ? "A" : "B"}`}
                          />
                        </div>
                        <div className="col-md-6">
                          <label
                            htmlFor={`occurrenceCode${index + 1}ADate`}
                            className="form-label"
                          >
                            {`${31 + Math.floor(index / 2)}${
                              index % 2 === 0 ? "A" : "B"
                            } Date:`}
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            id={`occurrenceCode${index + 1}ADate`}
                            value={code.date}
                            onChange={(e) => {
                              const newOccurrenceCodes = [
                                ...formData.occurrenceCodes,
                              ];
                              newOccurrenceCodes[index].date = e.target.value;
                              setFormData((prevData) => ({
                                ...prevData,
                                occurrenceCodes: newOccurrenceCodes,
                              }));
                            }}
                          />
                        </div>
                      </React.Fragment>
                    ))}
                </div>
              </div>
            </div>
          </div>
          {/* UB-04 Occurrence Spans */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingUB04Spans">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseUB04Spans"
                aria-expanded="true"
                aria-controls="collapseUB04Spans"
              >
                UB-04 Occurrence Spans
              </button>
            </h2>
            <div
              id="collapseUB04Spans"
              className="accordion-collapse collapse"
              aria-labelledby="headingUB04Spans"
              data-bs-parent="#payerAccordion"
            >
              <div className="accordion-body py-2">
                <div className="row g-3">
                  <p>(UB-04 Spans 35 - 36) Occurrence Spans</p>
                  {formData?.occurrenceSpans &&
                    formData?.occurrenceSpans?.map((span, index) => (
                      <React.Fragment key={`occurrenceSpan-${index}`}>
                        <div className="col-md-4">
                          <label
                            htmlFor={`occurrenceSpan${index + 1}Code`}
                            className="form-label"
                          >
                            {`${35 + index} Code:`}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id={`occurrenceSpan${index + 1}Code`}
                            value={span.code}
                            onChange={(e) => {
                              const newOccurrenceSpans = [
                                ...formData.occurrenceSpans,
                              ];
                              newOccurrenceSpans[index].code = e.target.value;
                              setFormData((prevData) => ({
                                ...prevData,
                                occurrenceSpans: newOccurrenceSpans,
                              }));
                            }}
                            placeholder={`Enter Code ${35 + index}`}
                          />
                        </div>
                        <div className="col-md-4">
                          <label
                            htmlFor={`occurrenceSpan${index + 1}StartDate`}
                            className="form-label"
                          >
                            {`${35 + index} Start Date:`}
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            id={`occurrenceSpan${index + 1}StartDate`}
                            value={span.startDate}
                            onChange={(e) => {
                              const newOccurrenceSpans = [
                                ...formData.occurrenceSpans,
                              ];
                              newOccurrenceSpans[index].startDate =
                                e.target.value;
                              setFormData((prevData) => ({
                                ...prevData,
                                occurrenceSpans: newOccurrenceSpans,
                              }));
                            }}
                          />
                        </div>
                        <div className="col-md-4">
                          <label
                            htmlFor={`occurrenceSpan${index + 1}EndDate`}
                            className="form-label"
                          >
                            {`${35 + index} End Date:`}
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            id={`occurrenceSpan${index + 1}EndDate`}
                            value={span.endDate}
                            onChange={(e) => {
                              const newOccurrenceSpans = [
                                ...formData.occurrenceSpans,
                              ];
                              newOccurrenceSpans[index].endDate =
                                e.target.value;
                              setFormData((prevData) => ({
                                ...prevData,
                                occurrenceSpans: newOccurrenceSpans,
                              }));
                            }}
                          />
                        </div>
                      </React.Fragment>
                    ))}
                </div>
              </div>
            </div>
          </div>
          {/* Condition Codes */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingConditionCodes">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseConditionCodes"
                aria-expanded="true"
                aria-controls="collapseConditionCodes"
              >
                Condition Codes
              </button>
            </h2>
            <div
              id="collapseConditionCodes"
              className="accordion-collapse collapse"
              aria-labelledby="headingConditionCodes"
              data-bs-parent="#payerAccordion"
            >
              <div className="accordion-body py-2">
                <div className="row g-3">
                  {formData?.conditionCodes &&
                    formData?.conditionCodes?.map((code, index) => (
                      <div className="col-md-2" key={`conditionCode-${index}`}>
                        <label
                          htmlFor={`conditionCode${index + 1}`}
                          className="form-label"
                        >
                          Condition Code {index + 1}:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id={`conditionCode${index + 1}`}
                          value={code}
                          onChange={(e) => {
                            const newConditionCodes = [
                              ...formData.conditionCodes,
                            ];
                            newConditionCodes[index] = e.target.value;
                            setFormData((prevData) => ({
                              ...prevData,
                              conditionCodes: newConditionCodes,
                            }));
                          }}
                          placeholder={`Enter Condition Code ${index + 1}`}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          {/* Employment and Auto Accident Information */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingEmploymentAuto">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseEmploymentAuto"
                aria-expanded="true"
                aria-controls="collapseEmploymentAuto"
              >
                Employment and Auto Accident Information
              </button>
            </h2>
            <div
              id="collapseEmploymentAuto"
              className="accordion-collapse collapse"
              aria-labelledby="headingEmploymentAuto"
              data-bs-parent="#payerAccordion"
            >
              <div className="accordion-body py-2">
                <div className="row g-3">
                  <div className="col-md-4">
                    <label htmlFor="employmentRelated" className="form-label">
                      Employment Related:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="employmentRelated"
                      value={formData.employmentRelated}
                      onChange={(e) =>
                        handleChange("employmentRelated", e.target.value)
                      }
                      placeholder="Employment Related"
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="autoAccident" className="form-label">
                      Auto Accident:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="autoAccident"
                      value={formData.autoAccident}
                      onChange={(e) =>
                        handleChange("autoAccident", e.target.value)
                      }
                      placeholder="Auto Accident"
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="claimCode" className="form-label">
                      Claim Code:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="claimCode"
                      value={formData.claimCode}
                      onChange={(e) =>
                        handleChange("claimCode", e.target.value)
                      }
                      placeholder="Claim Code"
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="unableToWorkFrom" className="form-label">
                      Unable to Work From:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="unableToWorkFrom"
                      value={formData.unableToWorkFrom}
                      onChange={(e) =>
                        handleChange("unableToWorkFrom", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="unableToWorkTo" className="form-label">
                      Unable to Work To:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="unableToWorkTo"
                      value={formData.unableToWorkTo}
                      onChange={(e) =>
                        handleChange("unableToWorkTo", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label
                      htmlFor="hospitalizationStartDate"
                      className="form-label"
                    >
                      Hospitalization Start Date:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="hospitalizationStartDate"
                      value={formData.hospitalizationStartDate}
                      onChange={(e) =>
                        handleChange("hospitalizationStartDate", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label
                      htmlFor="hospitalizationEndDate"
                      className="form-label"
                    >
                      Hospitalization End Date:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="hospitalizationEndDate"
                      value={formData.hospitalizationEndDate}
                      onChange={(e) =>
                        handleChange("hospitalizationEndDate", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 my-4 d-flex gap-3">
              <input
                type="checkbox"
                name="emergencyTreatmentIndicator"
                className="form-check-input"
                id="emergencyTreatmentIndicator"
                checked={
                  formData.emergencyTreatmentIndicator ===
                  "(HCFA-1500 Form Locator 24C) Emergency Treatment Indicator"
                }
                onChange={() =>
                  handleChange(
                    "emergencyTreatmentIndicator",
                    "(HCFA-1500 Form Locator 24C) Emergency Treatment Indicator"
                  )
                }
              />
              <label htmlFor="emergencyTreatmentIndicator">
                (HCFA-1500 Form Locator 24C) Emergency Treatment Indicator
              </label>
            </div>
          </div>
          <div className="row hide-on-print">
            <div className="d-flex justify-content-end mt-3 hide-on-print gap-3">
            <AdmitButton/>

              <button
                className="btn btn-primary"
                type="button"
                onClick={handleSaveAndContinue}
              >
                Save and Continue
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={handleSaveAndExit}
              >
                Save and Exit
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreatePayers;
