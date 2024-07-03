import { useState } from "react";
import MultiSelect from "../../components/FormElement/MultiSelect";
import MultiInput from "../../components/FormElement/MultiInput";
import DatePicker from "react-datepicker";
import TextEditor from './../../components/FormElement/TextEditor';

const AddShiftSummary = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div>
      <div className="card ">
        <h5 className="card-header">Add Shift Summary</h5>
        <form className="card-body">
          <div className="row g-6">
          <div className="col-md-6">
              <label className="form-label" htmlFor="form-repeater-1-3">
                Select Participant 
              </label>
              <select id="form-repeater-1-3" className="form-select">
                <option value="jone">jone</option>
                <option value="amin">amin</option>
              </select>
            </div>
            <div className="col-md-6 col-12 ">
              <label htmlFor="flatpickr-date" className="form-label">
                Date Of Service <span className="text-danger">*</span>
              </label>
              <div className="w-100 ">
                <DatePicker
                  className="w-100 form-control"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
            </div>
            <div className="col-md-12">
            <label className="form-label" htmlFor="form-repeater-1-3">
                Notes <span className="text-danger">*</span>
              </label>
              <TextEditor/>
            </div>
          </div>
      
     
         
          <div className="pt-6">
            <button type="submit" className="btn btn-primary me-4">
              Save
            </button>
            <button type="reset" className="btn btn-label-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddShiftSummary;

