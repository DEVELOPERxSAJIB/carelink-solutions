import React, { useState, useRef } from "react";

import {
  getAllSectionState,
  updateFormData,
  resetForm,
} from "./../../Redux/slices/SectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { useCreatePatientMutation } from "../../Redux/api/PatientApi";
import { useEffect } from "react";
import { useUpdatePatientMutation } from "../../Redux/api/PatientApi";
import { ReactToPrint } from "react-to-print";
import AuthLoader from "./../../utils/Loaders/AuthLoader";
const SectionQForm = ({ editId }) => {
  const componentRef = useRef();

  const [createPatient, { data, isLoading, error, isSuccess }] =
    useCreatePatientMutation();
  const [
    updatePatient,
    { data: updateData, isSuccess: isUpdateSuccess, error: updateError },
  ] = useUpdatePatientMutation();
  const dispatch = useDispatch();
  const allFormData = useSelector(getAllSectionState);
  console.log(allFormData, data, error);
  const [formData, setFormData] = useState({
    fallsPrevention: "",
    depressionIntervention: "",
    painIntervention: "",
    pressureUlcerPrevention: "",
    pressureUlcerTreatment: "",
  });

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      updatePatient({ patientId: editId, patientData: formData });
    } else {
      dispatch(updateFormData(formData));
      createPatient(allFormData);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(resetForm());
    }
    if (isUpdateSuccess) {
      window.location.reload();
    }
  }, [isSuccess, dispatch, isUpdateSuccess]);
  useEffect(() => {
    setFormData({ ...allFormData });
  }, [allFormData]);
  if (isLoading) return <AuthLoader />;
  return (
    <form onSubmit={handleSubmit}>
      <div className="accordion" id="accordionSectionQ">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingQ">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseQ"
              aria-expanded="true"
              aria-controls="collapseQ"
            >
              Participation in Assessment and Goal Setting
            </button>
          </h2>

          <div
            id="collapseQ"
            className="accordion-collapse collapse       "
            aria-labelledby="headingQ"
            data-bs-parent="#accordionSectionQ"
          >
            <div ref={componentRef} className="accordion-body print-area">
              {/* M2401. Intervention Synopsis */}
              <h4 className="print-title">
                Participation in assessment and setting{" "}
              </h4>
              <div className="mb-3">
                <label className="form-label">
                  M2401. Intervention Synopsis
                </label>

                <div className="mb-3">
                  <label className="form-label">
                    b. Falls prevention interventions
                  </label>
                  <select
                    name="fallsPrevention"
                    className="form-select"
                    value={formData.fallsPrevention}
                    onChange={handleSelectChange}
                  >
                    <option value="">Select...</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                    <option value="NA">Not Applicable</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    c. Depression intervention(s)
                  </label>
                  <select
                    name="depressionIntervention"
                    className="form-select"
                    value={formData.depressionIntervention}
                    onChange={handleSelectChange}
                  >
                    <option value="">Select...</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                    <option value="NA">Not Applicable</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    d. Intervention(s) to monitor and mitigate pain
                  </label>
                  <select
                    name="painIntervention"
                    className="form-select"
                    value={formData.painIntervention}
                    onChange={handleSelectChange}
                  >
                    <option value="">Select...</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                    <option value="NA">Not Applicable</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    e. Intervention(s) to prevent pressure ulcers
                  </label>
                  <select
                    name="pressureUlcerPrevention"
                    className="form-select"
                    value={formData.pressureUlcerPrevention}
                    onChange={handleSelectChange}
                  >
                    <option value="">Select...</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                    <option value="NA">Not Applicable</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    f. Pressure ulcer treatment based on principles of moist
                    wound healing
                  </label>
                  <select
                    name="pressureUlcerTreatment"
                    className="form-select"
                    value={formData.pressureUlcerTreatment}
                    onChange={handleSelectChange}
                  >
                    <option value="">Select...</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                    <option value="NA">Not Applicable</option>
                  </select>
                </div>
                <div className="d-flex align-items-center gap-4 hide-on-print">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                  <ReactToPrint
                    trigger={() => (
                      <button className="btn btn-primary">Print</button>
                    )}
                    content={() => componentRef.current}
                    documentTitle="Patient"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {data?.message && (
        <div className="alert text-center mt-5 alert-success w-100">
          {data?.message}
        </div>
      )}
      {error?.data?.message && (
        <div className="alert text-center mt-5 alert-danger w-100">
          {error?.data?.message}
        </div>
      )}
      {updateData?.message && (
        <div className="alert text-center mt-5 alert-success w-100">
          {updateData?.message}
        </div>
      )}
      {updateError?.data?.message && (
        <div className="alert text-center mt-5 alert-danger w-100">
          {updateError?.data?.message}
        </div>
      )}
    </form>
  );
};

export default SectionQForm;
