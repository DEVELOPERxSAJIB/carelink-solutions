import { useState, useEffect } from "react";

import {
  getAllSectionState,
  updateFormData,
} from "./../../Redux/slices/SectionSlice";
import { useDispatch, useSelector } from "react-redux";

const SectionIForm = () => {
  const dispatch = useDispatch();
  const data = useSelector(getAllSectionState);
  const localSectionI = JSON.parse(localStorage.getItem("SectionI")) ;
  const [formData, setFormData] = useState({
    primaryDiagnosis: "",
    otherDiagnoses: ["", "", "", "", "", ""],
    primaryDiagnosisRating: "",
    otherDiagnosesRatings: ["", "", "", "", "", ""],
    comorbidities: {
      pvd: false,
      dm: false,
      none: false,
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("otherDiagnoses")) {
      const index = parseInt(name.split("-")[1], 10);
      const updatedDiagnoses = [...formData.otherDiagnoses];
      updatedDiagnoses[index] = value;
      setFormData((prevData) => ({
        ...prevData,
        otherDiagnoses: updatedDiagnoses,
      }));
    } else if (name.startsWith("otherDiagnosesRatings")) {
      const index = parseInt(name.split("-")[1], 10);
      const updatedRatings = [...formData.otherDiagnosesRatings];
      updatedRatings[index] = value;
      setFormData((prevData) => ({
        ...prevData,
        otherDiagnosesRatings: updatedRatings,
      }));
    } else if (name.startsWith("comorbidities")) {
      setFormData((prevData) => ({
        ...prevData,
        comorbidities: {
          ...prevData.comorbidities,
          [value]: e.target.checked,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateFormData(formData));
    localStorage.setItem("SectionI", JSON.stringify(formData));
  };
  useEffect(() => {
    setFormData({ ...data });
    if(localSectionI){
      setFormData(localSectionI);
    }
  }, [data]);
  return (
    <form onSubmit={handleSubmit}>
      <div className="accordion" id="accordionSectionI">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingI">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseI"
              aria-expanded="true"
              aria-controls="collapseI"
            >
              Active Diagnoses
            </button>
          </h2>
          <div
            id="collapseI"
            className="accordion-collapse collapse  show"
            aria-labelledby="headingI"
            data-bs-parent="#accordionSectionI"
          >
            <div className="accordion-body print-area">
              {/* M1021. Primary Diagnosis */}
              <div className="mb-3">
                <label htmlFor="primaryDiagnosis" className="form-label">
                  M1021. Primary Diagnosis
                </label>
                <input
                  id="primaryDiagnosis"
                  name="primaryDiagnosis"
                  type="text"
                  className="form-control"
                  value={formData.primaryDiagnosis}
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="primaryDiagnosisRating"
                  className="form-label mt-2"
                >
                  Symptom Control Rating (0-4)
                </label>
                <select
                  id="primaryDiagnosisRating"
                  name="primaryDiagnosisRating"
                  className="form-select"
                  value={formData.primaryDiagnosisRating}
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <option key={rating} value={rating}>
                      {rating}
                    </option>
                  ))}
                </select>
              </div>

              {/* M1023. Other Diagnoses */}
              {[...Array(6).keys()].map((i) => (
                <div key={i} className="mb-3">
                  <label htmlFor={`otherDiagnoses-${i}`} className="form-label">
                    M1023. Other Diagnosis {String.fromCharCode(98 + i)}
                  </label>
                  <input
                    id={`otherDiagnoses-${i}`}
                    name={`otherDiagnoses-${i}`}
                    type="text"
                    className="form-control"
                    value={formData.otherDiagnoses[i]}
                    onChange={handleInputChange}
                  />
                  <label
                    htmlFor={`otherDiagnosesRatings-${i}`}
                    className="form-label mt-2"
                  >
                    Symptom Control Rating (0-4)
                  </label>
                  <select
                    id={`otherDiagnosesRatings-${i}`}
                    name={`otherDiagnosesRatings-${i}`}
                    className="form-select"
                    value={formData.otherDiagnosesRatings[i]}
                    onChange={handleInputChange}
                  >
                    <option value="">Select...</option>
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <option key={rating} value={rating}>
                        {rating}
                      </option>
                    ))}
                  </select>
                </div>
              ))}

              {/* M1028. Active Diagnoses – Comorbidities and Co-existing Conditions */}
              <div className="mb-3">
                <label className="form-label">
                  M1028. Active Diagnoses – Comorbidities and Co-existing
                  Conditions
                </label>
                <div className="form-check">
                  <input
                    id="pvd"
                    name="comorbidities"
                    type="checkbox"
                    value="pvd"
                    checked={formData.comorbidities.pvd}
                    onChange={handleInputChange}
                    className="form-check-input"
                  />
                  <label htmlFor="pvd" className="form-check-label">
                    Peripheral Vascular Disease (PVD) or Peripheral Artery
                    Disease (PAD)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    id="dm"
                    name="comorbidities"
                    type="checkbox"
                    value="dm"
                    checked={formData.comorbidities.dm}
                    onChange={handleInputChange}
                    className="form-check-input"
                  />
                  <label htmlFor="dm" className="form-check-label">
                    Diabetes Mellitus (DM)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    id="none"
                    name="comorbidities"
                    type="checkbox"
                    value="none"
                    checked={formData.comorbidities.none}
                    onChange={handleInputChange}
                    className="form-check-input"
                  />
                  <label htmlFor="none" className="form-check-label">
                    None of the above
                  </label>
                </div>
              </div>
              <div className="d-flex align-items-center gap-4 hide-on-print">
                <button type="submit" className="btn btn-primary">
                  add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SectionIForm;
