import  { useState,useEffect ,useRef} from 'react';

import { getAllSectionState,updateFormData } from './../../Redux/slices/SectionSlice';
import { useDispatch ,useSelector} from 'react-redux';
import { ReactToPrint } from "react-to-print";
const SectionHForm = () => {
  const componentRef = useRef();
 
const dispatch = useDispatch()
  const data = useSelector(getAllSectionState)
  console.log(data)
  const [formData, setFormData] = useState({
    m1600: '',
    m1610: '',
    m1620: '',
    m1630: '',
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
  };
  useEffect(()=>{
    setFormData({...data})
    },[data])
  return (
    <form onSubmit={handleSubmit}>
      <div className="accordion" id="accordionForm">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingH">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseH"
              aria-expanded="true"
              aria-controls="collapseH"
            >
              Bladder and Bowel
            </button>
          </h2>
          <div
            id="collapseH"
            className="accordion-collapse collapse       "
            aria-labelledby="headingH"
            data-bs-parent="#accordionSectionH"
          >
            <div ref={componentRef} className="accordion-body print-area">
              {/* M1600 */}
              <h4 className="print-title">
                Bladder and Bowel
              </h4>
              <div className="mb-3">
                <label htmlFor="m1600" className="form-label">M1600. Has this patient been treated for a Urinary Tract Infection in the past 14 days?</label>
                <select
                  id="m1600"
                  name="m1600"
                  className="form-select"
                  value={formData.m1600}
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                  <option value="NA">Patient on prophylactic treatment</option>
                </select>
              </div>

              {/* M1610 */}
              <div className="mb-3">
                <label className="form-label">M1610. Urinary Incontinence or Urinary Catheter Presence</label>
                <div className="form-check">
                  <input
                    id="m1610-0"
                    name="m1610"
                    type="radio"
                    value="0"
                    checked={formData.m1610 === '0'}
                    onChange={handleInputChange}
                    className="form-check-input"
                  />
                  <label htmlFor="m1610-0" className="form-check-label">No incontinence or catheter (includes anuria or ostomy for urinary drainage)</label>
                </div>
                <div className="form-check">
                  <input
                    id="m1610-1"
                    name="m1610"
                    type="radio"
                    value="1"
                    checked={formData.m1610 === '1'}
                    onChange={handleInputChange}
                    className="form-check-input"
                  />
                  <label htmlFor="m1610-1" className="form-check-label">Patient is incontinent</label>
                </div>
                <div className="form-check">
                  <input
                    id="m1610-2"
                    name="m1610"
                    type="radio"
                    value="2"
                    checked={formData.m1610 === '2'}
                    onChange={handleInputChange}
                    className="form-check-input"
                  />
                  <label htmlFor="m1610-2" className="form-check-label">Patient requires a urinary catheter (external, indwelling, intermittent, or suprapubic)</label>
                </div>
              </div>

              {/* M1620 */}
              <div className="mb-3">
                <label htmlFor="m1620" className="form-label">M1620. Bowel Incontinence Frequency</label>
                <select
                  id="m1620"
                  name="m1620"
                  className="form-select"
                  value={formData.m1620}
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="0">Very rarely or never has bowel incontinence</option>
                  <option value="1">Less than once weekly</option>
                  <option value="2">One to three times weekly</option>
                  <option value="3">Four to six times weekly</option>
                  <option value="4">On a daily basis</option>
                  <option value="5">More often than once daily</option>
                  <option value="NA">Patient has ostomy for bowel elimination</option>
                </select>
              </div>

              {/* M1630 */}
              <div className="mb-3">
                <label htmlFor="m1630" className="form-label">M1630. Ostomy for Bowel Elimination</label>
                <select
                  id="m1630"
                  name="m1630"
                  className="form-select"
                  value={formData.m1630}
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="0">Patient does not have an ostomy for bowel elimination</option>
                  <option value="1">Patient’s ostomy was not related to an inpatient stay and did not necessitate change in medical or treatment regimen</option>
                  <option value="2">The ostomy was related to an inpatient stay or did necessitate change in medical or treatment regimen</option>
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

export default SectionHForm;
