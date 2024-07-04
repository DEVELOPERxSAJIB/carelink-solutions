import { useState } from "react";
import MultiSelect from "../../components/FormElement/MultiSelect";

import DatePicker from "react-datepicker";
import TextEditor from './../../components/FormElement/TextEditor';

const ContactUs = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div>
      <div className="card mb-6">
        <h5 className="card-header">Contact Us</h5>
        <form className="card-body">
          <div className="row g-6">
           
            
            
            <div className="col-md-12">
              <label className="form-label" htmlFor="formValidationLang">
                Subject 
              </label>
              <input
                  type="text"
                  value=""
                  className="form-control"
                  name="formValidationLang"
                  id="formValidationLang"
                  placeholder="Subject"
                />
            </div>
            <div className="col-md-12">
              <label className="form-label" htmlFor="formValidationLang">
                Message 
              </label>
              <TextEditor/>
            </div>
          
          </div>
          <div className="pt-6">
            <button type="submit" className="btn btn-primary me-4">
              Send
            </button>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;

