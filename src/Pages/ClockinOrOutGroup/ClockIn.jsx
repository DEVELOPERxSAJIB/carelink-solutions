import { useState } from "react";
import MultiSelect from "../../components/FormElement/MultiSelect";

import DatePicker from "react-datepicker";
import PageHeader from './../../components/FormElement/PageHeader';

const ClockIn = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div>
      <div className="card mb-6">
        <PageHeader title="Add Group Clock In Sheet" className="card-header fs-3"/>
        <form className="card-body">
          <div className="row g-6">
            <div className="col-md-6">
              <label className="form-label" htmlFor="company-name">
                Date Of Service <span className="text-danger">*</span>
              </label>
              <DatePicker
                className="w-100 form-control"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="formValidationLang">
                Choose Individual <span className="text-danger">*</span>
              </label>
              <MultiSelect />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="formValidationLang">
                Ratio <span className="text-danger">*</span>
              </label>
              <div className=" d-flex gap-5 align-items-center">
                <input
                  type="ratio"
                  value=""
                  className="form-control"
                  name="formValidationLang"
                  id="formValidationLang"
                  placeholder="ratio"
                />
                :
                <input
                  type="ratio"
                  value=""
                  className="form-control"
                  name="formValidationLang"
                  id="formValidationLang"
                  placeholder="ratio"
                />
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="form-repeater-1-3">
                Work Code <span className="text-danger">*</span>
              </label>
              <select id="form-repeater-1-3" className="form-select">
                <option value="Awake">Awake</option>
                <option value="OSOC">OSOC</option>
                <option value="Training">Training</option>
                <option value="PTO">PTO</option>
                <option value="Meeting">Meeting</option>
                <option value="Active">Active</option>
                <option value="sleep">sleep</option>
                <option value="other">other</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="formValidationLang">
                Start Time <span className="text-danger">*</span>
              </label>
              <input
                  type="time"
                  value=""
                  className="form-control"
                  name="formValidationLang"
                  id="formValidationLang"
                  placeholder="time"
                />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="formValidationLang">
                Miles Used <span className="text-danger">*</span>
              </label>
              <input
                  type="number"
                  value=""
                  className="form-control"
                  name="formValidationLang"
                  id="formValidationLang"
                  placeholder="0"
                />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="formValidationLang">
                Location <span className="text-danger">*</span>
              </label>
              <input
                  type="text"
                  value=""
                  className="form-control"
                  name="formValidationLang"
                  id="formValidationLang"
                  placeholder="location"
                />
            </div>
          </div>
          <div className="pt-6">
            <button type="submit" className="btn btn-primary me-4">
              Clock In
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

export default ClockIn;
