import  { useState,useEffect,useRef } from 'react';

import { getAllSectionState,updateFormData } from './../../Redux/slices/SectionSlice';
import { useDispatch ,useSelector} from 'react-redux';
import { ReactToPrint } from "react-to-print";
const SectionEForm = () => {
  const componentRef = useRef();
  
const dispatch = useDispatch()
  const data = useSelector(getAllSectionState)
  console.log(data)
  const [formData, setFormData] = useState({
    memoryDeficit: false,
    impairedDecisionMaking: false,
    verbalDisruption: false,
    physicalAggression: false,
    disruptiveBehavior: false,
    delusionalBehavior: false,
    noneOfTheAbove: false,
    disruptiveBehaviorFrequency: '',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
      dispatch(updateFormData(formData))
  };
  useEffect(()=>{
    setFormData({...data})
    },[data])
  return (
    <form onSubmit={handleSubmit}>
      <div className="accordion" id="accordionSectionE">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingE">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseE"
              aria-expanded="true"
              aria-controls="collapseE"
            >
              Behavior
            </button>
          </h2>
          <div
            id="collapseE"
            className="accordion-collapse collapse  show"  
            aria-labelledby="headingE"
            data-bs-parent="#accordionSectionE"
          >
            <div ref={componentRef} className="accordion-body print-area">

              {/* M1740: Cognitive, Behavioral, and Psychiatric Symptoms */}
              <h4 className="print-title">Behavior</h4>
              <div className="mb-3">
                <label className="form-label">
                  M1740. Cognitive, Behavioral, and Psychiatric Symptoms (check all that apply)
                </label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="memoryDeficit"
                    name="memoryDeficit"
                    checked={formData.memoryDeficit}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="memoryDeficit">
                    1. Memory deficit
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="impairedDecisionMaking"
                    name="impairedDecisionMaking"
                    checked={formData.impairedDecisionMaking}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="impairedDecisionMaking">
                    2. Impaired decision-making
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="verbalDisruption"
                    name="verbalDisruption"
                    checked={formData.verbalDisruption}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="verbalDisruption">
                    3. Verbal disruption
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="physicalAggression"
                    name="physicalAggression"
                    checked={formData.physicalAggression}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="physicalAggression">
                    4. Physical aggression
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="disruptiveBehavior"
                    name="disruptiveBehavior"
                    checked={formData.disruptiveBehavior}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="disruptiveBehavior">
                    5. Disruptive, infantile, or socially inappropriate behavior
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="delusionalBehavior"
                    name="delusionalBehavior"
                    checked={formData.delusionalBehavior}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="delusionalBehavior">
                    6. Delusional, hallucinatory, or paranoid behavior
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="noneOfTheAbove"
                    name="noneOfTheAbove"
                    checked={formData.noneOfTheAbove}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="noneOfTheAbove">
                    7. None of the above behaviors demonstrated
                  </label>
                </div>
              </div>

              {/* M1745: Frequency of Disruptive Behavior Symptoms */}
              <div className="mb-3">
                <label htmlFor="disruptiveBehaviorFrequency" className="form-label">
                  M1745. Frequency of Disruptive Behavior Symptoms
                </label>
                <select
                  className="form-select"
                  id="disruptiveBehaviorFrequency"
                  name="disruptiveBehaviorFrequency"
                  value={formData.disruptiveBehaviorFrequency}
                  onChange={handleInputChange}
                >
                  <option value="">Select frequency</option>
                  <option value="0">Never</option>
                  <option value="1">Less than once a month</option>
                  <option value="2">Once a month</option>
                  <option value="3">Several times each month</option>
                  <option value="4">Several times a week</option>
                  <option value="5">At least daily</option>
                </select>
              </div>

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

export default SectionEForm;
