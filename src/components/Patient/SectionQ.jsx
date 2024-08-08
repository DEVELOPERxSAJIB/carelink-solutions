import { useState, useRef } from "react";

import {
  getAllSectionState,
  updateFormData,
  resetForm,
} from "./../../Redux/slices/SectionSlice";

import {
  getAllSectionStepState,
  updateSteps,
  updatePatientId,
} from "./../../Redux/slices/SectionStep.js";
import { useDispatch, useSelector } from "react-redux";
import { useCreatePatientMutation } from "../../Redux/api/PatientApi";
import { useEffect } from "react";
import { useUpdatePatientMutation } from "../../Redux/api/PatientApi";
import AuthLoader from "./../../utils/Loaders/AuthLoader";
import { showToast } from "./../../utils/Toastify";
const SectionQForm = ({ editId }) => {
  const allSteps = useSelector(getAllSectionStepState);
  const [createPatient, { data, isLoading, error, isSuccess }] =
    useCreatePatientMutation();

    const [
      updatePatient,
      {
        data: updateData,
        isSuccess: isUpdateSuccess,
        isLoading: isUpdateLoading,
        error: updateError,
      },
    ] = useUpdatePatientMutation();
    const dispatch = useDispatch();
    const allFormData = useSelector(getAllSectionState);

  const localSectionQ = JSON.parse(localStorage.getItem("SectionQ"));
  const [formData, setFormData] = useState({
    fallsPrevention: localSectionQ?.fallsPrevention || "",
    depressionIntervention: localSectionQ?.depressionIntervention || "",
    painIntervention: localSectionQ?.painIntervention || "",
    pressureUlcerPrevention: localSectionQ?.pressureUlcerPrevention || "",
    pressureUlcerTreatment: localSectionQ?.pressureUlcerTreatment || "",
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
      localStorage.setItem("SectionQ", JSON.stringify(formData));
    }
  };

  useEffect(() => {
    const patientId = JSON.parse(localStorage.getItem("patient"))?._id || null;
    if (isSuccess) {
      dispatch(resetForm());
      dispatch(updateSteps({ ...allSteps, steps: allSteps?.steps + 1 }));
      dispatch(updatePatientId({ ...allSteps, patientId: data?.payload?._id }));
      localStorage.setItem("patient", JSON.stringify(data?.payload));
    }
    dispatch(updatePatientId({ ...allSteps, patientId: patientId }));
  }, [isSuccess, dispatch, isUpdateSuccess, data?.payload]);
  useEffect(() => {
    setFormData({ ...allFormData });
  }, [allFormData]);

  useEffect(() => {
    showToast("success", updateData?.message);
    showToast("error", updateError?.data?.message);
    showToast("error", error?.data?.message);
    showToast("success", data?.message);
  }, [
    updateData?.message,
    updateError?.data?.message,
    error?.data?.message,
    data?.message,
  ]);
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
            className="accordion-collapse collapse  show"
            aria-labelledby="headingQ"
            data-bs-parent="#accordionSectionQ"
          >
            <div className="accordion-body print-area">
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
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center gap-4 hide-on-print">
        <button type="submit" className="btn btn-primary">
          {isUpdateLoading || isLoading ? "...Wait please" : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default SectionQForm;
