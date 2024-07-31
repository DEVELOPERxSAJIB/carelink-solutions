import { useState, useEffect, useRef } from "react";

import {
  getAllSectionState,
  updateFormData,
} from "./../../Redux/slices/SectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { ReactToPrint } from "react-to-print";
const SectionOForm = () => {
  const componentRef = useRef();

  const dispatch = useDispatch();
  const data = useSelector(getAllSectionState);
  console.log(data);
  const [formData, setFormData] = useState({
    specialTreatmentsAdmission: {
      chemotherapy: false,
      radiation: false,
      oxygenTherapy: false,
      suctioning: false,
      tracheostomyCare: false,
      invasiveVentilator: false,
      nonInvasiveVentilator: false,
      ivMedications: false,
      transfusions: false,
      dialysis: false,
      ivAccess: false,
      noneOfTheAbove: false,
    },
    specialTreatmentsDischarge: {
      chemotherapy: false,
      radiation: false,
      oxygenTherapy: false,
      suctioning: false,
      tracheostomyCare: false,
      invasiveVentilator: false,
      nonInvasiveVentilator: false,
      ivMedications: false,
      transfusions: false,
      dialysis: false,
      ivAccess: false,
      noneOfTheAbove: false,
    },
    covidVaccinationUpToDate: "",
    influenzaVaccinePeriod: "",
    influenzaVaccineReceived: "",
  });

  const handleCheckboxChange = (e, section, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: e.target.checked,
      },
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateFormData(formData));
  };
  useEffect(() => {
    setFormData({ ...data });
  }, [data]);
  return (
    <form onSubmit={handleSubmit}>
      <div className="accordion" id="accordionSectionO">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingO">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseO"
              aria-expanded="true"
              aria-controls="collapseO"
            >
              Special Treatments, Procedures, and Programs
            </button>
          </h2>
          <div
            id="collapseO"
            className="accordion-collapse collapse       "
            aria-labelledby="headingO"
            data-bs-parent="#accordionSectionO"
          >
            <div ref={componentRef} className="accordion-body print-area">
              {/* O0110. Special Treatments, Procedures, and Programs */}
              <h4 className="print-title">Special Treatments, Procedures, and Programs</h4>
              <div className="mb-3">
                <label className="form-label">
                  O0110. Special Treatments, Procedures, and Programs
                  (Admission)
                </label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={formData.specialTreatmentsAdmission.chemotherapy}
                    onChange={(e) =>
                      handleCheckboxChange(
                        e,
                        "specialTreatmentsAdmission",
                        "chemotherapy"
                      )
                    }
                  />
                  <label className="form-check-label">A1. Chemotherapy</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={formData.specialTreatmentsAdmission.radiation}
                    onChange={(e) =>
                      handleCheckboxChange(
                        e,
                        "specialTreatmentsAdmission",
                        "radiation"
                      )
                    }
                  />
                  <label className="form-check-label">B1. Radiation</label>
                </div>
                {/* Repeat similar blocks for other treatments, procedures, and programs on admission */}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={formData.specialTreatmentsAdmission.noneOfTheAbove}
                    onChange={(e) =>
                      handleCheckboxChange(
                        e,
                        "specialTreatmentsAdmission",
                        "noneOfTheAbove"
                      )
                    }
                  />
                  <label className="form-check-label">
                    Z1. None of the Above
                  </label>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">
                  O0110. Special Treatments, Procedures, and Programs
                  (Discharge)
                </label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={formData.specialTreatmentsDischarge.chemotherapy}
                    onChange={(e) =>
                      handleCheckboxChange(
                        e,
                        "specialTreatmentsDischarge",
                        "chemotherapy"
                      )
                    }
                  />
                  <label className="form-check-label">A1. Chemotherapy</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={formData.specialTreatmentsDischarge.radiation}
                    onChange={(e) =>
                      handleCheckboxChange(
                        e,
                        "specialTreatmentsDischarge",
                        "radiation"
                      )
                    }
                  />
                  <label className="form-check-label">B1. Radiation</label>
                </div>
                {/* Repeat similar blocks for other treatments, procedures, and programs on discharge */}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={formData.specialTreatmentsDischarge.noneOfTheAbove}
                    onChange={(e) =>
                      handleCheckboxChange(
                        e,
                        "specialTreatmentsDischarge",
                        "noneOfTheAbove"
                      )
                    }
                  />
                  <label className="form-check-label">
                    Z1. None of the Above
                  </label>
                </div>
              </div>

              {/* O0350. Patient’s COVID-19 vaccination is up to date */}
              <div className="mb-3">
                <label className="form-label">
                  O0350. Patient’s COVID-19 vaccination is up to date
                </label>
                <select
                  name="covidVaccinationUpToDate"
                  className="form-select"
                  value={formData.covidVaccinationUpToDate}
                  onChange={handleSelectChange}
                >
                  <option value="">Select...</option>
                  <option value="0">No, patient is not up to date</option>
                  <option value="1">Yes, patient is up to date</option>
                </select>
              </div>

              {/* M1041. Influenza Vaccine Data Collection Period */}
              <div className="mb-3">
                <label className="form-label">
                  M1041. Influenza Vaccine Data Collection Period
                </label>
                <select
                  name="influenzaVaccinePeriod"
                  className="form-select"
                  value={formData.influenzaVaccinePeriod}
                  onChange={handleSelectChange}
                >
                  <option value="">Select...</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              {/* M1046. Influenza Vaccine Received */}
              {formData.influenzaVaccinePeriod === "1" && (
                <div className="mb-3">
                  <label className="form-label">
                    M1046. Influenza Vaccine Received
                  </label>
                  <select
                    name="influenzaVaccineReceived"
                    className="form-select"
                    value={formData.influenzaVaccineReceived}
                    onChange={handleSelectChange}
                  >
                    <option value="">Select...</option>
                    <option value="1">
                      Yes; received from your agency during this episode of care
                    </option>
                    <option value="2">
                      Yes; received from your agency during a prior episode of
                      care
                    </option>
                    <option value="3">
                      Yes; received from another health care provider
                    </option>
                    <option value="4">No; patient offered and declined</option>
                    <option value="5">
                      No; patient assessed and determined to have medical
                      contraindication(s)
                    </option>
                    <option value="6">
                      No; not indicated – patient does not meet age/condition
                      guidelines
                    </option>
                    <option value="7">
                      No; inability to obtain vaccine due to declared shortage
                    </option>
                    <option value="8">
                      No; patient did not receive the vaccine due to other
                      reasons
                    </option>
                  </select>
                </div>
              )}
              <div className="d-flex align-items-center gap-4 hide-on-print">
                <button type="submit" className="btn btn-primary">
                  add
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
    </form>
  );
};

export default SectionOForm;
