import  { useState,useEffect } from 'react';

import { getAllSectionState,updateFormData } from './../../Redux/slices/SectionSlice';
import { useDispatch ,useSelector,} from 'react-redux';

const SectionDForm = () => {
const dispatch = useDispatch()
  const data = useSelector(getAllSectionState)
  console.log(data)
  const localSectionD = JSON.parse(localStorage.getItem("SectionD")) || {};

  // Initialize formData state with default values or data from localSectionD
  const [formData, setFormData] = useState({
    patientMoodUnderstood: localSectionD?.patientMoodUnderstood || '',
    littleInterestPresence: localSectionD?.littleInterestPresence || '',
    littleInterestFrequency: localSectionD?.littleInterestFrequency || '',
    feelingDownPresence: localSectionD?.feelingDownPresence || '',
    feelingDownFrequency: localSectionD?.feelingDownFrequency || '',
    troubleSleepingPresence: localSectionD?.troubleSleepingPresence || '',
    troubleSleepingFrequency: localSectionD?.troubleSleepingFrequency || '',
    feelingTiredPresence: localSectionD?.feelingTiredPresence || '',
    feelingTiredFrequency: localSectionD?.feelingTiredFrequency || '',
    poorAppetitePresence: localSectionD?.poorAppetitePresence || '',
    poorAppetiteFrequency: localSectionD?.poorAppetiteFrequency || '',
    feelingBadPresence: localSectionD?.feelingBadPresence || '',
    feelingBadFrequency: localSectionD?.feelingBadFrequency || '',
    troubleConcentratingPresence: localSectionD?.troubleConcentratingPresence || '',
    troubleConcentratingFrequency: localSectionD?.troubleConcentratingFrequency || '',
    movingSlowlyPresence: localSectionD?.movingSlowlyPresence || '',
    movingSlowlyFrequency: localSectionD?.movingSlowlyFrequency || '',
    thoughtsOfHarmingPresence: localSectionD?.thoughtsOfHarmingPresence || '',
    thoughtsOfHarmingFrequency: localSectionD?.thoughtsOfHarmingFrequency || '',
    totalSeverityScore: localSectionD?.totalSeverityScore || '',
    socialIsolation: localSectionD?.socialIsolation || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("SectionD", JSON.stringify(formData));
      dispatch(updateFormData(formData))
  };
  useEffect(()=>{
    setFormData({...data})
    setFormData({...localSectionD})
    },[data])
  return (
    <form className="mt-5" onSubmit={handleSubmit}>
      <div className="accordion" id="sectionDAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingD">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseD"
              aria-expanded="true"
              aria-controls="collapseD"
            >
              Mood
            </button>
          </h2>
          <div
            id="collapseD"
            className="accordion-collapse collapse  show"  
            aria-labelledby="headingD"
            data-bs-parent="#sectionDAccordion"
          >
            <div className="accordion-body print-area">
              {/* Patient Mood Interview */}
              <h4 className="print-title">Mood</h4>
              <div className="mb-3">
                <label htmlFor="patientMoodUnderstood" className="form-label">
                  D0150. Is the patient rarely/never understood verbally, in writing, or using another method?
                </label>
                <select
                  className="form-select"
                  id="patientMoodUnderstood"
                  name="patientMoodUnderstood"
                  value={formData.patientMoodUnderstood}
                  onChange={handleInputChange}
                >
                  <option value="">Select an option</option>
                  <option value="0">No</option>
                  <option value="9">Yes (No response)</option>
                </select>
              </div>

              {/* PHQ-2 to 9 Questions */}
              {formData.patientMoodUnderstood !== '9' && (
                <>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="littleInterestPresence" className="form-label">
                        A. Little interest or pleasure in doing things
                      </label>
                      <select
                        className="form-select"
                        id="littleInterestPresence"
                        name="littleInterestPresence"
                        value={formData.littleInterestPresence}
                        onChange={handleInputChange}
                      >
                        <option value="">Symptom Presence</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                        <option value="9">No response</option>
                      </select>
                    </div>
                    {formData.littleInterestPresence === '1' && (
                      <div className="col-md-6">
                        <label htmlFor="littleInterestFrequency" className="form-label">
                          Symptom Frequency
                        </label>
                        <select
                          className="form-select"
                          id="littleInterestFrequency"
                          name="littleInterestFrequency"
                          value={formData.littleInterestFrequency}
                          onChange={handleInputChange}
                        >
                          <option value="">Select frequency</option>
                          <option value="0">Never or 1 day</option>
                          <option value="1">2-6 days (several days)</option>
                          <option value="2">7-11 days (half or more of the days)</option>
                          <option value="3">12-14 days (nearly every day)</option>
                        </select>
                      </div>
                    )}
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="feelingDownPresence" className="form-label">
                        B. Feeling down, depressed, or hopeless
                      </label>
                      <select
                        className="form-select"
                        id="feelingDownPresence"
                        name="feelingDownPresence"
                        value={formData.feelingDownPresence}
                        onChange={handleInputChange}
                      >
                        <option value="">Symptom Presence</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                        <option value="9">No response</option>
                      </select>
                    </div>
                    {formData.feelingDownPresence === '1' && (
                      <div className="col-md-6">
                        <label htmlFor="feelingDownFrequency" className="form-label">
                          Symptom Frequency
                        </label>
                        <select
                          className="form-select"
                          id="feelingDownFrequency"
                          name="feelingDownFrequency"
                          value={formData.feelingDownFrequency}
                          onChange={handleInputChange}
                        >
                          <option value="">Select frequency</option>
                          <option value="0">Never or 1 day</option>
                          <option value="1">2-6 days (several days)</option>
                          <option value="2">7-11 days (half or more of the days)</option>
                          <option value="3">12-14 days (nearly every day)</option>
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Additional PHQ-2 to 9 Questions */}
                  {/* Repeat similar structure for C to I */}
                  {/* C. Trouble falling or staying asleep, or sleeping too much */}
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="troubleSleepingPresence" className="form-label">
                        C. Trouble falling or staying asleep, or sleeping too much
                      </label>
                      <select
                        className="form-select"
                        id="troubleSleepingPresence"
                        name="troubleSleepingPresence"
                        value={formData.troubleSleepingPresence}
                        onChange={handleInputChange}
                      >
                        <option value="">Symptom Presence</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                        <option value="9">No response</option>
                      </select>
                    </div>
                    {formData.troubleSleepingPresence === '1' && (
                      <div className="col-md-6">
                        <label htmlFor="troubleSleepingFrequency" className="form-label">
                          Symptom Frequency
                        </label>
                        <select
                          className="form-select"
                          id="troubleSleepingFrequency"
                          name="troubleSleepingFrequency"
                          value={formData.troubleSleepingFrequency}
                          onChange={handleInputChange}
                        >
                          <option value="">Select frequency</option>
                          <option value="0">Never or 1 day</option>
                          <option value="1">2-6 days (several days)</option>
                          <option value="2">7-11 days (half or more of the days)</option>
                          <option value="3">12-14 days (nearly every day)</option>
                        </select>
                      </div>
                    )}
                  </div>

                  {/* D. Feeling tired or having little energy */}
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="feelingTiredPresence" className="form-label">
                        D. Feeling tired or having little energy
                      </label>
                      <select
                        className="form-select"
                        id="feelingTiredPresence"
                        name="feelingTiredPresence"
                        value={formData.feelingTiredPresence}
                        onChange={handleInputChange}
                      >
                        <option value="">Symptom Presence</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                        <option value="9">No response</option>
                      </select>
                    </div>
                    {formData.feelingTiredPresence === '1' && (
                      <div className="col-md-6">
                        <label htmlFor="feelingTiredFrequency" className="form-label">
                          Symptom Frequency
                        </label>
                        <select
                          className="form-select"
                          id="feelingTiredFrequency"
                          name="feelingTiredFrequency"
                          value={formData.feelingTiredFrequency}
                          onChange={handleInputChange}
                        >
                          <option value="">Select frequency</option>
                          <option value="0">Never or 1 day</option>
                          <option value="1">2-6 days (several days)</option>
                          <option value="2">7-11 days (half or more of the days)</option>
                          <option value="3">12-14 days (nearly every day)</option>
                        </select>
                      </div>
                    )}
                  </div>

                  {/* E. Poor appetite or overeating */}
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="poorAppetitePresence" className="form-label">
                        E. Poor appetite or overeating
                      </label>
                      <select
                        className="form-select"
                        id="poorAppetitePresence"
                        name="poorAppetitePresence"
                        value={formData.poorAppetitePresence}
                        onChange={handleInputChange}
                      >
                        <option value="">Symptom Presence</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                        <option value="9">No response</option>
                      </select>
                    </div>
                    {formData.poorAppetitePresence === '1' && (
                      <div className="col-md-6">
                        <label htmlFor="poorAppetiteFrequency" className="form-label">
                          Symptom Frequency
                        </label>
                        <select
                          className="form-select"
                          id="poorAppetiteFrequency"
                          name="poorAppetiteFrequency"
                          value={formData.poorAppetiteFrequency}
                          onChange={handleInputChange}
                        >
                          <option value="">Select frequency</option>
                          <option value="0">Never or 1 day</option>
                          <option value="1">2-6 days (several days)</option>
                          <option value="2">7-11 days (half or more of the days)</option>
                          <option value="3">12-14 days (nearly every day)</option>
                        </select>
                      </div>
                    )}
                  </div>

                  {/* F. Feeling bad about yourself */}
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="feelingBadPresence" className="form-label">
                        F. Feeling bad about yourself
                      </label>
                      <select
                        className="form-select"
                        id="feelingBadPresence"
                        name="feelingBadPresence"
                        value={formData.feelingBadPresence}
                        onChange={handleInputChange}
                      >
                        <option value="">Symptom Presence</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                        <option value="9">No response</option>
                      </select>
                    </div>
                    {formData.feelingBadPresence === '1' && (
                      <div className="col-md-6">
                        <label htmlFor="feelingBadFrequency" className="form-label">
                          Symptom Frequency
                        </label>
                        <select
                          className="form-select"
                          id="feelingBadFrequency"
                          name="feelingBadFrequency"
                          value={formData.feelingBadFrequency}
                          onChange={handleInputChange}
                        >
                          <option value="">Select frequency</option>
                          <option value="0">Never or 1 day</option>
                          <option value="1">2-6 days (several days)</option>
                          <option value="2">7-11 days (half or more of the days)</option>
                          <option value="3">12-14 days (nearly every day)</option>
                        </select>
                      </div>
                    )}
                  </div>

                  {/* G. Trouble concentrating */}
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="troubleConcentratingPresence" className="form-label">
                        G. Trouble concentrating
                      </label>
                      <select
                        className="form-select"
                        id="troubleConcentratingPresence"
                        name="troubleConcentratingPresence"
                        value={formData.troubleConcentratingPresence}
                        onChange={handleInputChange}
                      >
                        <option value="">Symptom Presence</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                        <option value="9">No response</option>
                      </select>
                    </div>
                    {formData.troubleConcentratingPresence === '1' && (
                      <div className="col-md-6">
                        <label htmlFor="troubleConcentratingFrequency" className="form-label">
                          Symptom Frequency
                        </label>
                        <select
                          className="form-select"
                          id="troubleConcentratingFrequency"
                          name="troubleConcentratingFrequency"
                          value={formData.troubleConcentratingFrequency}
                          onChange={handleInputChange}
                        >
                          <option value="">Select frequency</option>
                          <option value="0">Never or 1 day</option>
                          <option value="1">2-6 days (several days)</option>
                          <option value="2">7-11 days (half or more of the days)</option>
                          <option value="3">12-14 days (nearly every day)</option>
                        </select>
                      </div>
                    )}
                  </div>

                  {/* H. Moving or speaking slowly */}
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="movingSlowlyPresence" className="form-label">
                        H. Moving or speaking slowly or being fidgety
                      </label>
                      <select
                        className="form-select"
                        id="movingSlowlyPresence"
                        name="movingSlowlyPresence"
                        value={formData.movingSlowlyPresence}
                        onChange={handleInputChange}
                      >
                        <option value="">Symptom Presence</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                        <option value="9">No response</option>
                      </select>
                    </div>
                    {formData.movingSlowlyPresence === '1' && (
                      <div className="col-md-6">
                        <label htmlFor="movingSlowlyFrequency" className="form-label">
                          Symptom Frequency
                        </label>
                        <select
                          className="form-select"
                          id="movingSlowlyFrequency"
                          name="movingSlowlyFrequency"
                          value={formData.movingSlowlyFrequency}
                          onChange={handleInputChange}
                        >
                          <option value="">Select frequency</option>
                          <option value="0">Never or 1 day</option>
                          <option value="1">2-6 days (several days)</option>
                          <option value="2">7-11 days (half or more of the days)</option>
                          <option value="3">12-14 days (nearly every day)</option>
                        </select>
                      </div>
                    )}
                  </div>

                  {/* I. Thoughts of self-harm */}
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="thoughtsOfHarmingPresence" className="form-label">
                        I. Thoughts of harming yourself
                      </label>
                      <select
                        className="form-select"
                        id="thoughtsOfHarmingPresence"
                        name="thoughtsOfHarmingPresence"
                        value={formData.thoughtsOfHarmingPresence}
                        onChange={handleInputChange}
                      >
                        <option value="">Symptom Presence</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                        <option value="9">No response</option>
                      </select>
                    </div>
                    {formData.thoughtsOfHarmingPresence === '1' && (
                      <div className="col-md-6">
                        <label htmlFor="thoughtsOfHarmingFrequency" className="form-label">
                          Symptom Frequency
                        </label>
                        <select
                          className="form-select"
                          id="thoughtsOfHarmingFrequency"
                          name="thoughtsOfHarmingFrequency"
                          value={formData.thoughtsOfHarmingFrequency}
                          onChange={handleInputChange}
                        >
                          <option value="">Select frequency</option>
                          <option value="0">Never or 1 day</option>
                          <option value="1">2-6 days (several days)</option>
                          <option value="2">7-11 days (half or more of the days)</option>
                          <option value="3">12-14 days (nearly every day)</option>
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Total Severity Score */}
                  <div className="mb-3">
                    <label htmlFor="totalSeverityScore" className="form-label">
                      D0160. Total Severity Score
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="totalSeverityScore"
                      name="totalSeverityScore"
                      value={formData.totalSeverityScore}
                      onChange={handleInputChange}
                      placeholder="Enter total severity score"
                    />
                  </div>
                </>
              )}

              {/* Social Isolation */}
              <div className="mb-3">
                <label htmlFor="socialIsolation" className="form-label">
                  D0700. Social Isolation: How often do you feel lonely or isolated from those around you?
                </label>
                <select
                  className="form-select"
                  id="socialIsolation"
                  name="socialIsolation"
                  value={formData.socialIsolation}
                  onChange={handleInputChange}
                >
                  <option value="">Select an option</option>
                  <option value="0">Never</option>
                  <option value="1">Rarely</option>
                  <option value="2">Sometimes</option>
                  <option value="3">Often</option>
                  <option value="4">Always</option>
                  <option value="7">Patient declines to respond</option>
                  <option value="8">Patient unable to respond</option>
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

export default SectionDForm;
