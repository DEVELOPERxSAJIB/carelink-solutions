import { useState, useEffect } from "react";
import {
  getAllSectionState,
  updateFormData,
} from "./../../Redux/slices/SectionSlice";
import { useDispatch, useSelector } from "react-redux";
const SectionCForm = () => {
  const dispatch = useDispatch();
  const data = useSelector(getAllSectionState);

  const localSectionC = JSON.parse(localStorage.getItem("SectionC"))
  const [formData, setFormData] = useState({
    interviewConducted: localSectionC?.interviewConducted || "",
    repetitionOfThreeWords: localSectionC?.repetitionOfThreeWords || "",
    temporalOrientationYear: localSectionC?.temporalOrientationYear || "",
    temporalOrientationMonth: localSectionC?.temporalOrientationMonth || "",
    temporalOrientationDay: localSectionC?.temporalOrientationDay || "",
    recallSock: localSectionC?.recallSock || "",
    recallBlue: localSectionC?.recallBlue || "",
    recallBed: localSectionC?.recallBed || "",
    bimsSummaryScore: localSectionC?.bimsSummaryScore || "",
    deliriumMentalStatusChange: localSectionC?.deliriumMentalStatusChange || "",
    deliriumInattention: localSectionC?.deliriumInattention || "",
    deliriumDisorganizedThinking: localSectionC?.deliriumDisorganizedThinking || "",
    deliriumAlteredConsciousness: localSectionC?.deliriumAlteredConsciousness || "",
    cognitiveFunctioning: localSectionC?.cognitiveFunctioning || "",
    whenConfused: localSectionC?.whenConfused || "",
    whenAnxious: localSectionC?.whenAnxious || "",
  });
  const handleInputChange = (e) => {
    const { name, value, type, checked, options } = e.target;
    if (type === "checkbox") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: checked ? value : "",
      }));
      
    } else if (type === "radio") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    } else if (type === "select-multiple") {
      const selectedValues = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: selectedValues,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(formData);
    dispatch(updateFormData(formData));
    localStorage.setItem("SectionC", JSON.stringify(formData));
  };
  useEffect(() => {
    setFormData({ ...data });
    setFormData({...localSectionC})
  }, [data]);
  return (
    <form className="mt-5" onSubmit={handleSubmit}>
      <div className="accordion" id="sectionCAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingC">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseC"
              aria-expanded="true"
              aria-controls="collapseC"
            >
              Cognitive Patterns
            </button>
          </h2>
          <div
            id="collapseC"
            className="accordion-collapse collapse  show"  
            aria-labelledby="headingC"
            data-bs-parent="#sectionCAccordion"
          >
            <div className="accordion-body print-area">
              {/* Interview Conducted */}
              <h4 className="print-title">Cognitive Patterns</h4>
              <div className="mb-3">
                <label htmlFor="interviewConducted" className="form-label">
                  C0100. Should Brief Interview for Mental Status (C0200-C0500)
                  be Conducted?
                </label>
                <select
                  className="form-select"
                  id="interviewConducted"
                  name="interviewConducted"
                  value={formData.interviewConducted}
                  onChange={handleInputChange}
                >
                  <option value="">Select an option</option>
                  <option value="0">
                    No (patient is rarely/never understood)
                  </option>
                  <option value="1">Yes</option>
                </select>
              </div>

              {/* Repetition of Three Words */}
              <div className="mb-3">
                <label htmlFor="repetitionOfThreeWords" className="form-label">
                  C0200. Repetition of Three Words:
                </label>
                <select
                  className="form-select"
                  id="repetitionOfThreeWords"
                  name="repetitionOfThreeWords"
                  value={formData.repetitionOfThreeWords}
                  onChange={handleInputChange}
                >
                  <option value="">Select an option</option>
                  <option value="0">None</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>

              {/* Temporal Orientation */}
              <div className="mb-3">
                <label className="form-label">
                  C0300. Temporal Orientation:
                </label>
                <div className="row">
                  <div className="col-md-4">
                    <label
                      htmlFor="temporalOrientationYear"
                      className="form-label"
                    >
                      Year
                    </label>
                    <select
                      className="form-select"
                      id="temporalOrientationYear"
                      name="temporalOrientationYear"
                      value={formData.temporalOrientationYear}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Year</option>
                      <option value="0">
                        Missed by &get; 5 years or no answer
                      </option>
                      <option value="1">Missed by 2-5 years</option>
                      <option value="2">Missed by 1 year</option>
                      <option value="3">Correct</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label
                      htmlFor="temporalOrientationMonth"
                      className="form-label"
                    >
                      Month
                    </label>
                    <select
                      className="form-select"
                      id="temporalOrientationMonth"
                      name="temporalOrientationMonth"
                      value={formData.temporalOrientationMonth}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Month</option>
                      <option value="0">
                        Missed by &get; 1 month or no answer
                      </option>
                      <option value="1">Missed by 6 days to 1 month</option>
                      <option value="2">Accurate within 5 days</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label
                      htmlFor="temporalOrientationDay"
                      className="form-label"
                    >
                      Day
                    </label>
                    <select
                      className="form-select"
                      id="temporalOrientationDay"
                      name="temporalOrientationDay"
                      value={formData.temporalOrientationDay}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Day</option>
                      <option value="0">Incorrect or no answer</option>
                      <option value="1">Correct</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Recall */}
              <div className="mb-3">
                <label className="form-label">C0400. Recall:</label>
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor="recallSock" className="form-label">
                      A. Able to recall "sock"
                    </label>
                    <select
                      className="form-select"
                      id="recallSock"
                      name="recallSock"
                      value={formData.recallSock}
                      onChange={handleInputChange}
                    >
                      <option value="">Select an option</option>
                      <option value="0">No — could not recall</option>
                      <option value="1">Yes, after cueing</option>
                      <option value="2">Yes, no cue required</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="recallBlue" className="form-label">
                      B. Able to recall "blue"
                    </label>
                    <select
                      className="form-select"
                      id="recallBlue"
                      name="recallBlue"
                      value={formData.recallBlue}
                      onChange={handleInputChange}
                    >
                      <option value="">Select an option</option>
                      <option value="0">No — could not recall</option>
                      <option value="1">Yes, after cueing</option>
                      <option value="2">Yes, no cue required</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="recallBed" className="form-label">
                      C. Able to recall "bed"
                    </label>
                    <select
                      className="form-select"
                      id="recallBed"
                      name="recallBed"
                      value={formData.recallBed}
                      onChange={handleInputChange}
                    >
                      <option value="">Select an option</option>
                      <option value="0">No — could not recall</option>
                      <option value="1">Yes, after cueing</option>
                      <option value="2">Yes, no cue required</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* BIMS Summary Score */}
              <div className="mb-3">
                <label htmlFor="bimsSummaryScore" className="form-label">
                  C0500. BIMS Summary Score:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="bimsSummaryScore"
                  name="bimsSummaryScore"
                  placeholder="Enter total score (00-15) or 99 if unable to complete"
                  value={formData.bimsSummaryScore}
                  onChange={handleInputChange}
                />
              </div>

              {/* Signs and Symptoms of Delirium */}
              <div className="mb-3">
                <label className="form-label">
                  C1310. Signs and Symptoms of Delirium:
                </label>
                <div className="row">
                  <div className="col-md-3">
                    <label
                      htmlFor="deliriumMentalStatusChange"
                      className="form-label"
                    >
                      A. Acute Onset of Mental Status Change
                    </label>
                    <select
                      className="form-select"
                      id="deliriumMentalStatusChange"
                      name="deliriumMentalStatusChange"
                      value={formData.deliriumMentalStatusChange}
                      onChange={handleInputChange}
                    >
                      <option value="">Select an option</option>
                      <option value="0">No</option>
                      <option value="1">Yes</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="deliriumInattention" className="form-label">
                      B. Inattention
                    </label>
                    <select
                      className="form-select"
                      id="deliriumInattention"
                      name="deliriumInattention"
                      value={formData.deliriumInattention}
                      onChange={handleInputChange}
                    >
                      <option value="">Select an option</option>
                      <option value="0">Behavior not present</option>
                      <option value="1">
                        Behavior continually present, does not fluctuate
                      </option>
                      <option value="2">Behavior present, fluctuates</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label
                      htmlFor="deliriumDisorganizedThinking"
                      className="form-label"
                    >
                      C. Disorganized thinking
                    </label>
                    <select
                      className="form-select"
                      id="deliriumDisorganizedThinking"
                      name="deliriumDisorganizedThinking"
                      value={formData.deliriumDisorganizedThinking}
                      onChange={handleInputChange}
                    >
                      <option value="">Select an option</option>
                      <option value="0">Behavior not present</option>
                      <option value="1">
                        Behavior continually present, does not fluctuate
                      </option>
                      <option value="2">Behavior present, fluctuates</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label
                      htmlFor="deliriumAlteredConsciousness"
                      className="form-label"
                    >
                      D. Altered level of consciousness
                    </label>
                    <select
                      className="form-select"
                      id="deliriumAlteredConsciousness"
                      name="deliriumAlteredConsciousness"
                      value={formData.deliriumAlteredConsciousness}
                      onChange={handleInputChange}
                    >
                      <option value="">Select an option</option>
                      <option value="0">Behavior not present</option>
                      <option value="1">
                        Behavior continually present, does not fluctuate
                      </option>
                      <option value="2">Behavior present, fluctuates</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Cognitive Functioning */}
              <div className="mb-3 extra-padding">
                <label htmlFor="cognitiveFunctioning" className="form-label">
                  M1700. Cognitive Functioning:
                </label>
                <select
                  className="form-select"
                  id="cognitiveFunctioning"
                  name="cognitiveFunctioning"
                  value={formData.cognitiveFunctioning}
                  onChange={handleInputChange}
                >
                  <option value="">Select an option</option>
                  <option value="0">
                    Alert/oriented, able to focus and shift attention,
                    comprehends and recalls task directions independently
                  </option>
                  <option value="1">
                    Requires prompting only under stressful or unfamiliar
                    conditions
                  </option>
                  <option value="2">
                    Requires assistance and some direction in specific
                    situations or consistently requires low stimulus environment
                  </option>
                  <option value="3">
                    Requires considerable assistance in routine situations, not
                    alert and oriented
                  </option>
                  <option value="4">
                    Totally dependent due to disturbances
                  </option>
                </select>
              </div>

              {/* When Confused */}
              <div className="mb-3">
                <label htmlFor="whenConfused" className="form-label">
                  M1710. When Confused:
                </label>
                <select
                  className="form-select"
                  id="whenConfused"
                  name="whenConfused"
                  value={formData.whenConfused}
                  onChange={handleInputChange}
                >
                  <option value="">Select an option</option>
                  <option value="0">Never</option>
                  <option value="1">In new or complex situations only</option>
                  <option value="2">On awakening or at night only</option>
                  <option value="3">
                    During the day and evening, but not constantly
                  </option>
                  <option value="4">Constantly</option>
                  <option value="NA">Patient nonresponsive</option>
                </select>
              </div>

              {/* When Anxious */}
              <div className="mb-3">
                <label htmlFor="whenAnxious" className="form-label">
                  M1720. When Anxious:
                </label>
                <select
                  className="form-select"
                  id="whenAnxious"
                  name="whenAnxious"
                  value={formData.whenAnxious}
                  onChange={handleInputChange}
                >
                  <option value="">Select an option</option>
                  <option value="0">None of the time</option>
                  <option value="1">Less than often daily</option>
                  <option value="2">Daily, but not constantly</option>
                  <option value="3">All of the time</option>
                  <option value="NA">Patient nonresponsive</option>
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

export default SectionCForm;
