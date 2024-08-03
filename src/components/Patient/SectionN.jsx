import  { useState,useEffect,useRef } from 'react';

import { getAllSectionState,updateFormData } from './../../Redux/slices/SectionSlice';
import { useDispatch ,useSelector} from 'react-redux';

const SectionNForm = () => {

 
  const dispatch = useDispatch();
  const data = useSelector(getAllSectionState);
  const localSectionN = JSON.parse(localStorage.getItem("SectionN")) || {};

  const [formData, setFormData] = useState({
    highRiskDrugs: {
      antipsychotic: { isTaking: false, indicationNoted: false },
      anticoagulant: { isTaking: false, indicationNoted: false },
      antibiotic: { isTaking: false, indicationNoted: false },
      opioid: { isTaking: false, indicationNoted: false },
      antiplatelet: { isTaking: false, indicationNoted: false },
      hypoglycemic: { isTaking: false, indicationNoted: false },
      none: { isTaking: false }
    },
    drugRegimenReview: '',
    medicationFollowUp: '',
    medicationIntervention: '',
    highRiskDrugEducation: '',
    managementOralMedications: '',
    managementInjectableMedications: ''
  });

  useEffect(() => {
    // Merge data from localStorage and Redux state
    setFormData(prevData => ({
      ...prevData,
      ...localSectionN,
      highRiskDrugs: {
        ...prevData.highRiskDrugs,
        ...localSectionN.highRiskDrugs
      }
    }));
  }, [data]);

  const handleCheckboxChange = (e, drugClass, field) => {
    setFormData(prevData => ({
      ...prevData,
      highRiskDrugs: {
        ...prevData.highRiskDrugs,
        [drugClass]: {
          ...prevData.highRiskDrugs[drugClass],
          [field]: e.target.checked
        }
      }
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateFormData(formData));
    localStorage.setItem("SectionN", JSON.stringify(formData));
  };
  return (
    <form onSubmit={ handleSubmit }>
      <div className="accordion" id="accordionSectionN">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingN">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseN"
              aria-expanded="true"
              aria-controls="collapseN"
            >
              Medications
            </button>
          </h2>
          <div
            id="collapseN"
            className="accordion-collapse collapse  show"  
            aria-labelledby="headingN"
            data-bs-parent="#accordionSectionN"
          >
            <div  className="accordion-body print-area">
              {/* N0415. High-Risk Drug Classes: Use and Indication */}
              <h4 className="print-title">Medications</h4>
              <div className="mb-3">
                <label className="form-label">N0415. High-Risk Drug Classes: Use and Indication</label>
                <div className="form-check">
                  <label className="form-check-label">A. Antipsychotic</label>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={formData.highRiskDrugs.antipsychotic.isTaking}
                      onChange={(e) => handleCheckboxChange(e, 'antipsychotic', 'isTaking')}
                    />
                    <label className="form-check-label">Is Taking</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={formData.highRiskDrugs.antipsychotic.indicationNoted}
                      onChange={(e) => handleCheckboxChange(e, 'antipsychotic', 'indicationNoted')}
                    />
                    <label className="form-check-label">Indication Noted</label>
                  </div>
                </div>

                <div className="form-check">
                  <label className="form-check-label">E. Anticoagulant</label>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={formData.highRiskDrugs.anticoagulant.isTaking}
                      onChange={(e) => handleCheckboxChange(e, 'anticoagulant', 'isTaking')}
                    />
                    <label className="form-check-label">Is Taking</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={formData.highRiskDrugs.anticoagulant.indicationNoted}
                      onChange={(e) => handleCheckboxChange(e, 'anticoagulant', 'indicationNoted')}
                    />
                    <label className="form-check-label">Indication Noted</label>
                  </div>
                </div>

                <div className="form-check">
                  <label className="form-check-label">F. Antibiotic</label>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={formData.highRiskDrugs.antibiotic.isTaking}
                      onChange={(e) => handleCheckboxChange(e, 'antibiotic', 'isTaking')}
                    />
                    <label className="form-check-label">Is Taking</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={formData.highRiskDrugs.antibiotic.indicationNoted}
                      onChange={(e) => handleCheckboxChange(e, 'antibiotic', 'indicationNoted')}
                    />
                    <label className="form-check-label">Indication Noted</label>
                  </div>
                </div>

                <div className="form-check">
                  <label className="form-check-label">H. Opioid</label>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={formData.highRiskDrugs.opioid.isTaking}
                      onChange={(e) => handleCheckboxChange(e, 'opioid', 'isTaking')}
                    />
                    <label className="form-check-label">Is Taking</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={formData.highRiskDrugs.opioid.indicationNoted}
                      onChange={(e) => handleCheckboxChange(e, 'opioid', 'indicationNoted')}
                    />
                    <label className="form-check-label">Indication Noted</label>
                  </div>
                </div>

                <div className="form-check">
                  <label className="form-check-label">I. Antiplatelet</label>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={formData.highRiskDrugs.antiplatelet.isTaking}
                      onChange={(e) => handleCheckboxChange(e, 'antiplatelet', 'isTaking')}
                    />
                    <label className="form-check-label">Is Taking</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={formData.highRiskDrugs.antiplatelet.indicationNoted}
                      onChange={(e) => handleCheckboxChange(e, 'antiplatelet', 'indicationNoted')}
                    />
                    <label className="form-check-label">Indication Noted</label>
                  </div>
                </div>

                <div className="form-check">
                  <label className="form-check-label">J. Hypoglycemic (including insulin)</label>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={formData.highRiskDrugs.hypoglycemic.isTaking}
                      onChange={(e) => handleCheckboxChange(e, 'hypoglycemic', 'isTaking')}
                    />
                    <label className="form-check-label">Is Taking</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={formData.highRiskDrugs.hypoglycemic.indicationNoted}
                      onChange={(e) => handleCheckboxChange(e, 'hypoglycemic', 'indicationNoted')}
                    />
                    <label className="form-check-label">Indication Noted</label>
                  </div>
                </div>

                <div className="form-check">
                  <label className="form-check-label">Z. None of the above</label>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={formData.highRiskDrugs.none.isTaking}
                      onChange={(e) => handleCheckboxChange(e, 'none', 'isTaking')}
                    />
                    <label className="form-check-label">Is Taking</label>
                  </div>
                </div>
              </div>

              {/* M2001. Drug Regimen Review */}
              <div className="mb-3">
                <label className="form-label">M2001. Drug Regimen Review</label>
                <select
                  name="drugRegimenReview"
                  className="form-select"
                  value={formData.drugRegimenReview}
                  onChange={handleSelectChange}
                >
                  <option value="">Select...</option>
                  <option value="0">No — No issues found during review</option>
                  <option value="1">Yes — Issues found during review</option>
                  <option value="9">NA — Patient is not taking any medications</option>
                </select>
              </div>

              {/* M2003. Medication Follow-up */}
              <div className="mb-3">
                <label className="form-label">M2003. Medication Follow-up</label>
                <select
                  name="medicationFollowUp"
                  className="form-select"
                  value={formData.medicationFollowUp}
                  onChange={handleSelectChange}
                >
                  <option value="">Select...</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              {/* M2005. Medication Intervention */}
              <div className="mb-3">
                <label className="form-label">M2005. Medication Intervention</label>
                <select
                  name="medicationIntervention"
                  className="form-select"
                  value={formData.medicationIntervention}
                  onChange={handleSelectChange}
                >
                  <option value="">Select...</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                  <option value="9">NA — No potential issues identified or patient is not taking any medications</option>
                </select>
              </div>

              {/* M2010. Patient/Caregiver High-Risk Drug Education */}
              <div className="mb-3">
                <label className="form-label">M2010. Patient/Caregiver High-Risk Drug Education</label>
                <select
                  name="highRiskDrugEducation"
                  className="form-select"
                  value={formData.highRiskDrugEducation}
                  onChange={handleSelectChange}
                >
                  <option value="">Select...</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                  <option value="NA">NA — No high-risk drugs or fully knowledgeable</option>
                </select>
              </div>

              {/* M2020. Management of Oral Medications */}
              <div className="mb-3">
                <label className="form-label">M2020. Management of Oral Medications</label>
                <select
                  name="managementOralMedications"
                  className="form-select"
                  value={formData.managementOralMedications}
                  onChange={handleSelectChange}
                >
                  <option value="">Select...</option>
                  <option value="0">Able to independently take the correct medication(s)</option>
                  <option value="1">
                    Able to take medication(s) if prepared in advance or if using a drug diary/chart
                  </option>
                  <option value="2">Able to take medication(s) if given reminders</option>
                  <option value="3">Unable to take medication unless administered by another person</option>
                  <option value="NA">NA — No oral medications prescribed</option>
                </select>
              </div>

              {/* M2030. Management of Injectable Medications */}
              <div className="mb-3">
                <label className="form-label">M2030. Management of Injectable Medications</label>
                <select
                  name="managementInjectableMedications"
                  className="form-select"
                  value={formData.managementInjectableMedications}
                  onChange={handleSelectChange}
                >
                  <option value="">Select...</option>
                  <option value="0">Able to independently take the correct medication(s)</option>
                  <option value="1">
                    Able to take medication(s) if syringes are prepared in advance or if using a drug diary/chart
                  </option>
                  <option value="2">Able to take medication(s) if given reminders</option>
                  <option value="3">Unable to take medication unless administered by another person</option>
                  <option value="NA">NA — No injectable medications prescribed</option>
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

export default SectionNForm;
