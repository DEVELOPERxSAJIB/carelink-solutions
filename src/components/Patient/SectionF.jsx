import  { useState,useEffect ,useRef} from 'react';

import { getAllSectionState,updateFormData } from './../../Redux/slices/SectionSlice';
import { useDispatch ,useSelector,} from 'react-redux';

const SectionFForm = () => {
  
  
const dispatch = useDispatch()
  const data = useSelector(getAllSectionState)
  const localSectionF = JSON.parse(localStorage.getItem("SectionF")) || {};

  const [formData, setFormData] = useState({
    livingArrangement:localSectionF?.livingArrangement|| '',
    assistanceAvailability:localSectionF?.assistanceAvailability|| '',
    adlAssistance:localSectionF?.adlAssistance|| '',
    medicationAssistance:localSectionF?.medicationAssistance|| '',
    medicalProceduresAssistance:localSectionF?.medicalProceduresAssistance|| '',
    supervisionSafetyAssistance:localSectionF?.supervisionSafetyAssistance|| '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
      dispatch(updateFormData(formData))
      localStorage.setItem("SectionF", JSON.stringify(formData));
  };
  useEffect(()=>{
    setFormData({...data})
    setFormData({...localSectionF})
    },[data])
  return (
    <form onSubmit={handleSubmit}>
      <div className="accordion" id="accordionSectionF">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingF">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseF"
              aria-expanded="true"
              aria-controls="collapseF"
            >
             Preferences for Customary Routine and Activities
            </button>
          </h2>
          <div
            id="collapseF"
            className="accordion-collapse collapse  show"  
            aria-labelledby="headingF"
            data-bs-parent="#accordionSectionF"
          >
            <div className="accordion-body print-area">

              {/* M1100: Patient Living Situation */}
              <h4 className="print-title">Preferences for Customary Routine and Activities</h4>
              <div className="mb-3">
                <label className="form-label">
                  M1100. Patient Living Situation
                </label>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="livingArrangement"
                      value="A01"
                      checked={formData.livingArrangement === 'A01'}
                      onChange={handleInputChange}
                    />
                    Patient lives alone, Around the clock
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="livingArrangement"
                      value="A02"
                      checked={formData.livingArrangement === 'A02'}
                      onChange={handleInputChange}
                    />
                    Patient lives alone, Regular Daytime
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="livingArrangement"
                      value="B06"
                      checked={formData.livingArrangement === 'B06'}
                      onChange={handleInputChange}
                    />
                    Patient lives with other person(s), Around the clock
                  </label>
                </div>
                {/* Add more radio buttons as needed */}
              </div>

              {/* M2102: Types and Sources of Assistance */}
              <div className="mb-3">
                <label className="form-label">
                  M2102. Types and Sources of Assistance
                </label>

                <div className="mb-2">
                  <label className="form-label">
                    a. ADL assistance
                  </label>
                  <select
                    className="form-select"
                    name="adlAssistance"
                    value={formData.adlAssistance}
                    onChange={handleInputChange}
                  >
                    <option value="">Select option</option>
                    <option value="0">No assistance needed</option>
                    <option value="1">Non-agency caregiver(s) currently provide assistance</option>
                    <option value="2">Non-agency caregiver(s) need training/supportive services</option>
                    <option value="3">Non-agency caregiver(s) are not likely to provide assistance</option>
                    <option value="4">Assistance needed, but no non-agency caregiver(s) available</option>
                  </select>
                </div>

                <div className="mb-2">
                  <label className="form-label">
                    c. Medication administration
                  </label>
                  <select
                    className="form-select"
                    name="medicationAssistance"
                    value={formData.medicationAssistance}
                    onChange={handleInputChange}
                  >
                    <option value="">Select option</option>
                    <option value="0">No assistance needed</option>
                    <option value="1">Non-agency caregiver(s) currently provide assistance</option>
                    <option value="2">Non-agency caregiver(s) need training/supportive services</option>
                    <option value="3">Non-agency caregiver(s) are not likely to provide assistance</option>
                    <option value="4">Assistance needed, but no non-agency caregiver(s) available</option>
                  </select>
                </div>

                <div className="mb-2">
                  <label className="form-label">
                    d. Medical procedures/treatments
                  </label>
                  <select
                    className="form-select"
                    name="medicalProceduresAssistance"
                    value={formData.medicalProceduresAssistance}
                    onChange={handleInputChange}
                  >
                    <option value="">Select option</option>
                    <option value="0">No assistance needed</option>
                    <option value="1">Non-agency caregiver(s) currently provide assistance</option>
                    <option value="2">Non-agency caregiver(s) need training/supportive services</option>
                    <option value="3">Non-agency caregiver(s) are not likely to provide assistance</option>
                    <option value="4">Assistance needed, but no non-agency caregiver(s) available</option>
                  </select>
                </div>

                <div className="mb-2">
                  <label className="form-label">
                    f. Supervision and safety (due to cognitive impairment)
                  </label>
                  <select
                    className="form-select"
                    name="supervisionSafetyAssistance"
                    value={formData.supervisionSafetyAssistance}
                    onChange={handleInputChange}
                  >
                    <option value="">Select option</option>
                    <option value="0">No assistance needed</option>
                    <option value="1">Non-agency caregiver(s) currently provide assistance</option>
                    <option value="2">Non-agency caregiver(s) need training/supportive services</option>
                    <option value="3">Non-agency caregiver(s) are not likely to provide assistance</option>
                    <option value="4">Assistance needed, but no non-agency caregiver(s) available</option>
                  </select>
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

export default SectionFForm;
