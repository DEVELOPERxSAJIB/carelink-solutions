import { useState } from "react";
import PageHeader from "./../../components/FormElement/PageHeader";
import CitySelect from "../../components/FormElement/CitySelect";
import StateSelect from "./../../components/FormElement/StateSelect";

import { useCreatePhysicianMutation } from "../../Redux/api/PhysicianApi";
import AuthLoader from "./../../utils/Loaders/AuthLoader";
// useCreatePhysicianMutation
// useGetAllPhysiciansQuery
const CreatePhysicians = () => {
  const [createPhysician, { data, isLoading, error }] =
    useCreatePhysicianMutation();
  const [formData, setFormData] = useState({
    npiNumber: "",
    firstName: "",
    mi: "",
    lastName: "",
    taxonomyCode: "",
    credentials: "",
    npiNo: null,
    medicaidProviderIdentifier: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
    primaryPhone: "",
    alternatePhone: "",
    deliveryMethod: "",
    fax: "",
    email: "",
  });
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [formError, setFormError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
 
    if (!formData.firstName) {
      setFormError("First name is required");
      return;
    }
    if (!formData.lastName) {
      setFormError("last name is required");
      return;
    }
    if (!formData.taxonomyCode) {
      setFormError("taxonomy Code is required");
      return;
    }
    if (!formData.credentials) {
      setFormError("credentials is required");
      return;
    }
    if (!formData.npiNo) {
      setFormError("NPI Number is required");
      return;
    }
    if (!formData.medicaidProviderIdentifier) {
      setFormError("Medicaid ProviderIdentifier is required");
      return;
    }
    if (!formData.addressLine1) {
      setFormError("AddressLine1 is required");
      return;
    }
    if (!formData.addressLine1) {
      setFormError("AddressLine1 is required");
      return;
    }
    if (!city) {
      setFormError("City is required");
      return;
    }
    if (!state) {
      setFormError("State is required");
      return;
    }
    if (!formData.primaryPhone) {
      setFormError("Primary Phone is required");
      return;
    }
    if (!formData.zip) {
      setFormError("Zip is required");
      return;
    } else {
      setFormError("")
      formData.city= city
      formData.state= state
      createPhysician(formData);
    }
  };
  if (isLoading) return <AuthLoader />;
  return (
    <div className="card mt-4">
      <PageHeader title="Search Physician" className="card-header fs-3" />
      

      <div className="card-body">
      {data?.message && (
        <div className="alert alert-success text-center">{data?.message}</div>
      )}
      {error?.data?.message && (
        <div className="alert alert-danger text-center">
          {error?.data?.message}
        </div>
      )}
      {formError && (
        <div className="alert alert-danger text-center">
          {formError}
        </div>
      )}
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className=" col-md-6">
              <label className="form-label" htmlFor="npiNumber">
                NPI Number:
              </label>
              <input
                type="text"
                className="form-control"
                id="npiNumber"
                name="npiNumber"
                placeholder="Enter NPI Number"
                value={formData.npiNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          <h6 className="mt-3">Physician Information</h6>
          <div className="row">
            <div className=" col-md-6">
              <label className="form-label" htmlFor="firstName">
                First Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                 placeholder="Enter first name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className=" col-md-6">
              <label className="form-label" htmlFor="mi">
                MI:
              </label>
              <input
                type="text"
                className="form-control"
                id="mi"
                name="mi"
                 placeholder="Enter 1 Mi number"
                value={formData.mi}
                onChange={handleChange}
              />
            </div>
            <div className=" col-md-6">
              <label className="form-label" htmlFor="lastName">
                Last Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                 placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className=" col-md-6">
              <label className="form-label" htmlFor="taxonomyCode">
                Taxonomy Code:
              </label>
              <input
                type="text"
                className="form-control"
                id="taxonomyCode"
                name="taxonomyCode"
                 placeholder="Enter Taxonomy code"
                value={formData.taxonomyCode}
                onChange={handleChange}
              />
            </div>
            <div className=" col-md-6">
              <label className="form-label" htmlFor="credentials">
                Credentials:
              </label>
              <input
                type="text"
                className="form-control"
                id="credentials"
                 placeholder="Enter Credentials"
                name="credentials"
                value={formData.credentials}
                onChange={handleChange}
              />
            </div>
            <div className=" col-md-6">
              <label className="form-label" htmlFor="npiNo">
                NPI No:
              </label>
              <input
                type="number"
                className="form-control"
                id="npiNo"
                 placeholder="Enter NPI Number"
                name="npiNo"
                value={formData.npiNo}
                onChange={handleChange}
              />
            </div>
            <div className=" col-md-6">
              <label
                className="form-label"
                htmlFor="medicaidProviderIdentifier"
              >
                Medicaid Provider Identifier:
              </label>
              <input
                type="text"
                className="form-control"
                id="medicaidProviderIdentifier"
                name="medicaidProviderIdentifier"
                value={formData.medicaidProviderIdentifier}
                onChange={handleChange}
                 placeholder="Enter Medicaid Provider Identifier"
              />
            </div>
          </div>

          <h6 className="mt-3">Physician Address</h6>
          <div className="row">
            <div className="col-md-6">
              <label className="form-label" htmlFor="addressLine1">
                Address Line 1:
              </label>
              <input
                type="text"
                className="form-control"
                id="addressLine1"
                name="addressLine1"
                 placeholder="Enter address line1"
                value={formData.addressLine1}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="addressLine2">
                Address Line 2:
              </label>
              <input
                type="text"
                className="form-control"
                id="addressLine2"
                name="addressLine2"
                 placeholder="Enter address line2"
                value={formData.addressLine2}
                onChange={handleChange}
              />
            </div>

            {/* const [county,setCounty]=useState("") */}
            <div className="col-md-6">
              <label className="form-label" htmlFor="city">
                City:
              </label>
              <CitySelect
                stateCode={state}
                selectedCity={city}
                setSelectedCity={setCity}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="state">
                State:
              </label>
              <StateSelect selectedState={state} setSelectedState={setState} />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="zip">
                Zip:
              </label>
              <input
                type="text"
                className="form-control"
                id="zip"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                 placeholder="Enter zip"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label" htmlFor="primaryPhone">
                Primary Phone:
              </label>
              <input
                type="text"
                className="form-control"
                id="primaryPhone"
                name="primaryPhone"
                 placeholder="Enter Primary phone"
                value={formData.primaryPhone}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="alternatePhone">
                Alternate Phone:
              </label>
              <input
                type="text"
                className="form-control"
                id="alternatePhone"
                name="alternatePhone"
                 placeholder="Enter Alternate Phone"
                value={formData.alternatePhone}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="deliveryMethod">
                Order Delivery Method:
              </label>
              <select
                className="form-control"
                id="deliveryMethod"
                name="deliveryMethod"
                value={formData.deliveryMethod}
                onChange={handleChange}
              >
                {/* "AxxessPhysicianPortal", "Email", "Phone", "Fax", "Courier", "Other" */}
                <option value="">-- Delivery Method --</option>
                <option value="AxxessPhysicianPortal">AxxessPhysicianPortal</option>
                <option value="Email">Email</option>
                <option value="Phone">Phone</option>
                <option value="Fax">Fax</option>
                <option value="Courier">Courier</option>
                <option value="Ohter">Ohter</option>
                {/* Add more delivery methods here */}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="fax">
                Fax:
              </label>
              <input
                type="text"
                className="form-control"
                id="fax"
                name="fax"
                value={formData.fax}
                 placeholder="Enter Fax number"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="email">
                E-mail:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                 placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="col-md-6 mt-5 d-flex gap-2">
            <button type="submit" className="btn btn-primary mr-2">
              Save
            </button>
            <button type="button" className="btn btn-secondary">
              Exit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePhysicians;
