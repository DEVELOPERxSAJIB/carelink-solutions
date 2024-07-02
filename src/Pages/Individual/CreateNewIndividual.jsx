import { useState } from "react";
import MultiSelect from "../../components/FormElement/MultiSelect";
import MultiInput from "../../components/FormElement/MultiInput";
import DatePicker from "react-datepicker";

const CreateNewIndividual = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div>
      <div className="card ">
        <h5 className="card-header">Add Individual</h5>
        <form className="card-body">
          <div className="row g-6">
            <div className="col-md-6">
              <label className="form-label" htmlFor="Individual ID">
                Individual ID<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="Individual ID"
                className="form-control"
                placeholder="Individual ID"
              />
            </div>
            <div className="col-md-6"></div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="form-repeater-1-3">
                Gender
              </label>
              <select id="form-repeater-1-3" className="form-select">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="col-md-6 col-12 ">
              <label htmlFor="flatpickr-date" className="form-label">
                Date Of Birth <span className="text-danger">*</span>
              </label>
              <div className="w-100 ">
                <DatePicker
                  className="w-100 form-control"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="first name">
                First Name<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="first name"
                className="form-control"
                placeholder="first name"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="last name">
                Last Name<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="last name"
                className="form-control"
                placeholder="last name"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="email address">
                Email Address<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="email address"
                className="form-control"
                placeholder="email address"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="form-repeater-1-3">
                County Served In <span className="text-danger">*</span>
              </label>
              <select id="form-repeater-1-3" className="form-select">
                <option value="Ashland county">Ashland county</option>
                <option value="Ashland county">Ashland county</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="form-repeater-1-3">
                Patient Address Type <span className="text-danger">*</span>
              </label>
              <select id="form-repeater-1-3" className="form-select">
                <option value="Business">Business</option>
                <option value="Home">Home</option>
                <option value="School">School</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="form-repeater-1-3">
                Patient Address Is Primary<span className="text-danger">*</span>
              </label>
              <div className="col mt-2">
                <div className="form-check form-check-inline">
                  <input
                    name="collapsible-address-type"
                    className="form-check-input"
                    type="radio"
                    defaultValue=""
                    id="yes"
                  />
                  <label className="form-check-label" htmlFor="yes">
                    Yes
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    name="collapsible-address-type"
                    className="form-check-input"
                    type="radio"
                    defaultValue=""
                    id="No"
                    defaultChecked=""
                  />
                  <label
                    className="form-check-label"
                    htmlFor="collapsible-address-type-home"
                  >
                    No
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="multicol-first-name">
                Address1 <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="multicol-first-name"
                className="form-control"
                placeholder="2021 #. Dublin Grandville Road"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="multicol-last-name">
                Address2
              </label>
              <input
                type="text"
                id="multicol-last-name"
                className="form-control"
                placeholder="Suite 130"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="form-repeater-1-3">
                Country <span className="text-danger">*</span>
              </label>
              <select id="form-repeater-1-3" className="form-select">
                <option value="Business">Select Country</option>
             
                <option value="United state">United state</option>
              
                
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="form-repeater-1-3">
                State <span className="text-danger">*</span>
              </label>
              <select id="form-repeater-1-3" className="form-select">
                <option value="Business">Select state</option>
             
                <option value="Alaska">Alaska</option>
              
                
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="city">
                City <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="city"
                className="form-control"
                placeholder="Columbus"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="zip">
                Zip <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="zip"
                className="form-control"
                placeholder="Oh"
              />
            </div>

            <div className="col-md-6">
            <div className="row">
              <div className="col-md-6">
              <label className="form-label" htmlFor="formValidationLang">
                Phone Type
              </label>
              <select id="form-repeater-1-3" className="form-select">
                <option value="Home">Home</option>
                <option value="Mobile">Mobile</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
             
              </select>
              </div>
              <div className="col-md-6">
              <label className="form-label" htmlFor="formValidationLang">
                Telephone
              </label>
              <input
                type="text"
                value=""
                className="form-control"
                name="formValidationLang"
                id="formValidationLang"
                placeholder="phone"
              />
              </div>
            </div>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="formValidationLang">
                Cellphone
              </label>
              <input
                type="text"
                value=""
                className="form-control"
                name="formValidationLang"
                id="formValidationLang"
                placeholder="phone"
              />
              </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="formValidationLang">
                Fax
              </label>
              <input
                type="text"
                value=""
                className="form-control"
                name="formValidationLang"
                id="formValidationLang"
                placeholder="phone"
              />
              </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="formValidationLang">
                Language
              </label>
              <input
                type="text"
                value=""
                className="form-control"
                name="formValidationLang"
                id="formValidationLang"
                placeholder="language"
              />
              </div>
            
            <div className="col-md-6">
              <label className="form-label" htmlFor="formValidationLang">
                Medicaid Number
              </label>
              <input
                type="text"
                value=""
                className="form-control"
                name="formValidationLang"
                id="formValidationLang"
                placeholder="Medicaid Number"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="formValidationLang">
                Medicare Number
              </label>
              <input
                type="text"
                value=""
                className="form-control"
                name="formValidationLang"
                id="formValidationLang"
                placeholder="Medicare Number"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="formValidationLang">
                Memo
              </label>
              <textarea
                type="text"
                value=""
                className="form-control"
                name="formValidationLang"
                id="formValidationLang"
                placeholder="memo"
              ></textarea>
            </div>
            <div className="col-6">
            <label className="form-label" htmlFor="formValidationLang">
              Company Logo <span className="text-danger">*</span>
            </label>
            <div className="fallback">
              <input name="file" type="file" />
            </div>
            <div
              className="dropzone mt-5 needsclick dz-clickable dz-started dz-max-files-reached"
              id="dropzone-basic"
            >
              <div className="dz-preview dz-processing dz-image-preview dz-success dz-complete">
                <div className="dz-details">
                  <div className="dz-thumbnail">
                    <img
                      data-dz-thumbnail
                      alt="logo.jpg"
                      src="data:image/png;base64,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"
                    />
                    <span className="dz-nopreview">No preview</span>
                    <div className="dz-success-mark" />
                    <div className="dz-error-mark" />
                    <div className="dz-error-message">
                      <span data-dz-errormessage />
                    </div>
                  </div>
                  <div className="dz-filename" data-dz-name>
                    logo.jpg
                  </div>
                  <div className="dz-size" data-dz-size>
                    <strong>19.9</strong> KB
                  </div>
                </div>
                <a
                  className="dz-remove"
                  href="javascript:undefined;"
                  data-dz-remove
                >
                  Remove file
                </a>
              </div>
            </div>
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

export default CreateNewIndividual;
