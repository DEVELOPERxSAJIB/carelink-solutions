import { useState } from "react";
import MultiSelect from "../../components/FormElement/MultiSelect";
import MultiInput from "../../components/FormElement/MultiInput";
import DatePicker from "react-datepicker";
import useFormFields from "../../hook/useFormHook";
import PickDate from "../../components/FormElement/DatePicker";
import PageHeader from "../../components/FormElement/PageHeader";
import { useCreateUserMutation } from "../../Redux/api/UserApi";

const CreateNewProvider = () => {
  const [startDate, setStartDate] = useState(new Date());

  const [createUser, { data, error, isSuccess }] = useCreateUserMutation();

  const initialState = {
    gender: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    manager: "",
    medAdministration: "",
    address1: "",
    address2: "",
    city: "",
    county: "",
    state: "",
    zip: "",
    phone: "",
    dateOfBirth: "",
    hireDate: "",
    longevityAddon: "",
    providerID: "",
  };

  const [formData, handleChange, resetForm] = useFormFields(initialState);

  const handleSubmit = (event) => {
    event.preventDefault();
    createUser({
      ...formData,
      role: "provider",
    });
  };
  return (
    <div>
      <div className="card ">
        <PageHeader title="Create New Provider" className="card-header fs-3" />
        {/* <h6 className="fs-6 card-header">Per OAC 5160-46-04</h6> */}
        <div className="card-body">
          <form onSubmit={handleSubmit} className="w-100  px-3">
            <div className="row">
              
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="email" className="form-label">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="password" className="form-label">
                  Password <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="manager" className="form-label">
                  Manager <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  id="manager"
                  name="manager"
                  value={formData.manager}
                  onChange={handleChange}
                >
                  <option value="">Select Manager</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="medAdministration" className="form-label">
                  Med Administration <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  id="medAdministration"
                  name="medAdministration"
                  value={formData.medAdministration}
                  onChange={handleChange}
                >
                  <option value="">Select Med Administration</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="address1" className="form-label">
                  Address Line 1 <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address1"
                  name="address1"
                  value={formData.address1}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="address2" className="form-label">
                  Address Line 2
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address2"
                  name="address2"
                  value={formData.address2}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="county" className="form-label">
                  County <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="county"
                  name="county"
                  value={formData.county}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="city" className="form-label">
                  City <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="state" className="form-label">
                  State <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="zip" className="form-label">
                  Zip <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="zip"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="dateOfBirth" className="form-label">
                  Date of Birth <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="hireDate" className="form-label">
                  Hire Date <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="hireDate"
                  name="hireDate"
                  value={formData.hireDate}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="longevityAddon" className="form-label">
                  Longevity Addon <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  id="longevityAddon"
                  name="longevityAddon"
                  value={formData.longevityAddon}
                  onChange={handleChange}
                >
                  <option value="">Select Longevity Addon</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="gender" className="form-label">
                  Gender <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="providerID" className="form-label">
                  Provider ID <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="providerID"
                  name="providerID"
                  value={formData.providerID}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                Add new Provider
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNewProvider;
