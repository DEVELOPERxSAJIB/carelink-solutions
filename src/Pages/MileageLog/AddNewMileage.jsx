import { useState } from "react";
import MultiSelect from "../../components/FormElement/MultiSelect";

import DatePicker from "react-datepicker";
import SingleSearchSelect from './../../components/FormElement/SingleSearchSelect';
import PageHeader from './../../components/FormElement/PageHeader';

const AddNewMileage = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div>
      <div className="card mb-6">

        <PageHeader title="Add Mileage Log" className="card-header fs-3"/>
        <form className="card-body">
          <div className="row g-6">
            <div className="col-md-12">
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
            <label className="form-label" htmlFor="individual mileage">
                Mileage Type <span className="text-danger">*</span>
              </label>
            <div className="col mt-2">
                <div className="form-check form-check-inline">
                  <input
                    name="Mileage Type"
                    className="form-check-input"
                    type="radio"
                    defaultValue=""
                    id="individual mileage"
                  />
                  <label className="form-check-label" htmlFor="individual mileage">
                    Individual Mileage
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    name="Mileage Type"
                    className="form-check-input"
                    type="radio"
                    defaultValue=""
                    id="share mileage"
                    defaultChecked=""
                  />
                  <label
                    className="form-check-label"
                    htmlFor="share mileage"
                  >
                    Share Mileage
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-6">
            <label className="form-label" htmlFor="individual mileage">
                Type of Vehicle <span className="text-danger">*</span>
              </label>
            <div className="col mt-2">
                <div className="form-check form-check-inline">
                  <input
                    name="Type of Vehicle"
                    className="form-check-input"
                    type="radio"
                    defaultValue=""
                    id="Regular"
                  />
                  <label className="form-check-label" htmlFor="Regular">
                    Regular
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    name="Type of Vehicle"
                    className="form-check-input"
                    type="radio"
                    defaultValue=""
                    id="Modified"
                    defaultChecked=""
                  />
                  <label
                    className="form-check-label"
                    htmlFor="Modified"
                  >
                    Modified
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="formValidationLang">
              Select or enter vehicle license plate number * <span className="text-danger">*</span>
              </label>
              <SingleSearchSelect />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="form-repeater-1-3">
                Select Individual <span className="text-danger">*</span>
              </label>
              <select id="form-repeater-1-3" className="form-select">
                <option value="">Select individual</option>
                <option value="Jone">Jone</option>
                <option value="abraham">abraham</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="multicol-first-name">
                Initial Mileage <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                id="multicol-first-name"
                className="form-control"
                placeholder="0"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="multicol-first-name">
                Starting Mileage <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                id="multicol-first-name"
                className="form-control"
                placeholder="0"
              />
            </div>
            <div className="col-md-6">
            <label className="form-label" htmlFor="individual mileage">
            Choose Your Trip <span className="text-danger">*</span>
              </label>
            <div className="col mt-2">
                <div className="form-check form-check-inline">
                  <input
                    name="Choose your trip"
                    className="form-check-input"
                    type="radio"
                    defaultValue=""
                    id="one way"
                  />
                  <label className="form-check-label" htmlFor="one way">
                    One way
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    name="Choose your trip"
                    className="form-check-input"
                    type="radio"
                    defaultValue=""
                    id="Round"
                    defaultChecked=""
                  />
                  <label
                    className="form-check-label"
                    htmlFor="Round"
                  >
                    Round
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    name="Choose your trip"
                    className="form-check-input"
                    type="radio"
                    defaultValue=""
                    id="Multiple Destination"
                    defaultChecked=""
                  />
                  <label
                    className="form-check-label"
                    htmlFor="Multiple Destination"
                  >
                    Multiple Destination
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="multicol-first-name">
                From Where <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="multicol-first-name"
                className="form-control"
                placeholder="from where"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="multicol-first-name">Total Miles <span className="text-danger">*</span>
              </label>
              <label className="form-label text-primary mx-3" htmlFor="multicol-first-name">
                Calculate Distance 
              </label>
              <input
                type="text"
                id="multicol-first-name"
                className="form-control"
                placeholder="total miles"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="multicol-first-name">
                Ending Mileage <span className="text-danger">*</span>
              </label>
              
              <input
                type="text"
                id="multicol-first-name"
                className="form-control"
                placeholder="ending mileage"
              />
            </div>
            <div className="col-md-12">
              <label className="form-label" htmlFor="multicol-first-name">
              Activity Description <span className="text-danger">*</span>
              </label>
              
              <textarea
                type="text"
                id="multicol-first-name"
                className="form-control"
                placeholder="Activity Description"
              ></textarea>
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

export default AddNewMileage;



