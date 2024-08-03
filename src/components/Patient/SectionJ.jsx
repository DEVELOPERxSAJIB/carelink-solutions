import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSectionState,
  updateFormData,
} from "./../../Redux/slices/SectionSlice";

const SectionJForm = () => {
  const dispatch = useDispatch();
  const data = useSelector(getAllSectionState);
  const localSectionJ = JSON.parse(localStorage.getItem("SectionJ"));

  const [formData, setFormData] = useState({
    riskForHospitalization: {
      falls: false,
      weightLoss: false,
      hospitalizations: false,
      emergencyVisits: false,
      declineInStatus: false,
      complianceDifficulty: false,
      medications: false,
      exhaustion: false,
      otherRisks: false,
      none: false,
    },
    painEffectOnSleep: "",
    painInterferenceWithTherapy: "",
    painInterferenceWithActivities: "",
    fallsSinceSOCROC: "",
    fallsDetails: {
      noInjury: false,
      injury: false,
      majorInjury: false,
    },
    shortOfBreath: "",
  });

  useEffect(() => {
    if (data) {
      setFormData((prevData) => ({
        ...prevData,
        ...data,
        riskForHospitalization: {
          ...prevData.riskForHospitalization,
          ...data.riskForHospitalization,
        },
        fallsDetails: {
          ...prevData.fallsDetails,
          ...data.fallsDetails,
        },
      }));
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const [mainKey, subKey] = name.split("-");
      setFormData((prevData) => ({
        ...prevData,
        [mainKey]: {
          ...prevData[mainKey],
          [value]: checked,
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
    localStorage.setItem("SectionJ", JSON.stringify(formData));
  };
  useEffect(() => {
    setFormData({ ...data });
    if(localSectionJ){
      setFormData(localSectionJ);
    }
  }, [data]);
  return (
    <form onSubmit={handleSubmit}>
      <div className="accordion" id="accordionSectionJ">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingJ">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseJ"
              aria-expanded="true"
              aria-controls="collapseJ"
            >
              Health Conditions
            </button>
          </h2>
          <div
            id="collapseJ"
            className="accordion-collapse collapse  show"
            aria-labelledby="headingJ"
            data-bs-parent="#accordionSectionJ"
          >
            <div className="accordion-body print-area">
              {/* M1033. Risk for Hospitalization */}
              <h4 className="print-title">Health Conditions</h4>
              <div className="mb-3">
                <label className="form-label">
                  M1033. Risk for Hospitalization
                </label>
                {[
                  {
                    label:
                      "History of falls (2 or more falls — or any fall with an injury — in the past 12 months)",
                    value: "falls",
                  },
                  {
                    label:
                      "Unintentional weight loss of a total of 10 pounds or more in the last 12 months",
                    value: "weightLoss",
                  },
                  {
                    label:
                      "Multiple hospitalizations (2 or more) in the past 6 months",
                    value: "hospitalizations",
                  },
                  {
                    label:
                      "Multiple emergency department visits (2 or more) in the past 6 months",
                    value: "emergencyVisits",
                  },
                  {
                    label:
                      "Decline in mental, emotional, or behavioral status in the past 3 months",
                    value: "declineInStatus",
                  },
                  {
                    label:
                      "Reported or observed history of difficulty complying with any medical instructions in the past 3 months",
                    value: "complianceDifficulty",
                  },
                  {
                    label: "Currently taking 5 or more medications",
                    value: "medications",
                  },
                  {
                    label: "Currently reports exhaustion",
                    value: "exhaustion",
                  },
                  {
                    label: "Other risk(s) not listed in 1-8",
                    value: "otherRisks",
                  },
                  { label: "None of the above", value: "none" },
                ].map(({ label, value }) => (
                  <div key={value} className="form-check">
                    <input
                      id={value}
                      name="riskForHospitalization"
                      type="checkbox"
                      value={value}
                      checked={formData.riskForHospitalization[value]}
                      onChange={handleInputChange}
                      className="form-check-input"
                    />
                    <label htmlFor={value} className="form-check-label">
                      {label}
                    </label>
                  </div>
                ))}
              </div>

              {/* J0510. Pain Effect on Sleep */}
              <div className="mb-3">
                <label htmlFor="painEffectOnSleep" className="form-label">
                  J0510. Pain Effect on Sleep
                </label>
                <select
                  id="painEffectOnSleep"
                  name="painEffectOnSleep"
                  className="form-select"
                  value={formData.painEffectOnSleep}
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="0">
                    Does not apply — I have not had any pain or hurting in the
                    past 5 days
                  </option>
                  <option value="1">Rarely or not at all</option>
                  <option value="2">Occasionally</option>
                  <option value="3">Frequently</option>
                  <option value="4">Almost constantly</option>
                  <option value="8">Unable to answer</option>
                </select>
              </div>

              {/* J0520. Pain Interference with Therapy Activities */}
              <div className="mb-3">
                <label
                  htmlFor="painInterferenceWithTherapy"
                  className="form-label"
                >
                  J0520. Pain Interference with Therapy Activities
                </label>
                <select
                  id="painInterferenceWithTherapy"
                  name="painInterferenceWithTherapy"
                  className="form-select"
                  value={formData.painInterferenceWithTherapy}
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="0">
                    Does not apply — I have not received rehabilitation therapy
                    in the past 5 days
                  </option>
                  <option value="1">Rarely or not at all</option>
                  <option value="2">Occasionally</option>
                  <option value="3">Frequently</option>
                  <option value="4">Almost constantly</option>
                  <option value="8">Unable to answer</option>
                </select>
              </div>

              {/* J0530. Pain Interference with Day-to-Day Activities */}
              <div className="mb-3">
                <label
                  htmlFor="painInterferenceWithActivities"
                  className="form-label"
                >
                  J0530. Pain Interference with Day-to-Day Activities
                </label>
                <select
                  id="painInterferenceWithActivities"
                  name="painInterferenceWithActivities"
                  className="form-select"
                  value={formData.painInterferenceWithActivities}
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="1">Rarely or not at all</option>
                  <option value="2">Occasionally</option>
                  <option value="3">Frequently</option>
                  <option value="4">Almost constantly</option>
                  <option value="8">Unable to answer</option>
                </select>
              </div>

              {/* J1800. Any Falls Since SOC/ROC */}
              <div className="mb-3">
                <label htmlFor="fallsSinceSOCROC" className="form-label">
                  J1800. Any Falls Since SOC/ROC
                </label>
                <select
                  id="fallsSinceSOCROC"
                  name="fallsSinceSOCROC"
                  className="form-select"
                  value={formData.fallsSinceSOCROC}
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              {/* J1900. Number of Falls Since SOC/ROC */}
              {formData.fallsSinceSOCROC === "1" && (
                <div className="mb-3">
                  <label htmlFor="fallsDetails" className="form-label">
                    J1900. Number of Falls Since SOC/ROC
                  </label>
                  <select
                    id="fallsDetails"
                    name="fallsDetails"
                    className="form-select"
                    value={formData.fallsDetails}
                    onChange={handleInputChange}
                  >
                    <option value="">Select...</option>
                    <option value="noInjury">No injury</option>
                    <option value="injury">Injury (except major)</option>
                    <option value="majorInjury">Major injury</option>
                  </select>
                </div>
              )}

              {/* M1400. When is the patient dyspneic or noticeably Short of Breath? */}
              <div className="mb-3">
                <label htmlFor="shortOfBreath" className="form-label">
                  M1400. When is the patient dyspneic or noticeably Short of
                  Breath?
                </label>
                <select
                  id="shortOfBreath"
                  name="shortOfBreath"
                  className="form-select"
                  value={formData.shortOfBreath}
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="0">Patient is not short of breath</option>
                  <option value="1">
                    When walking more than 20 feet, climbing stairs
                  </option>
                  <option value="2">
                    With moderate exertion (e.g., while dressing, using commode
                    or bedpan, walking distances less than 20 feet)
                  </option>
                  <option value="3">
                    With minimal exertion (e.g., while eating, talking, or
                    performing other ADLs) or with agitation
                  </option>
                  <option value="4">At rest (during day or night)</option>
                </select>
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

export default SectionJForm;
