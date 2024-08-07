import React, { useState, useEffect } from "react";
import { useGetPhysicianByPatientIdQuery } from "../../Redux/api/PhysicianApi";
import CitySelect from "../../components/FormElement/CitySelect";
import StateSelect from "./../../components/FormElement/StateSelect";

import { useUpdatePhysicianMutation } from "../../Redux/api/PhysicianApi";
import { showToast } from './../../utils/Toastify';
const EditPhysicians = ({ patientId }) => {
  const { data: singlePhysician } = useGetPhysicianByPatientIdQuery(patientId);
  console.log(singlePhysician);
  const [
    updatePhysician,
    { data: updateData, isSuccess: isUpdateSuccess, error: updateError },
  ] = useUpdatePhysicianMutation();
  const [editId, setEditId] = useState(false);
  useEffect(() => {
    setEditId(singlePhysician?.payload?.physician?._id);
    setFormData({ ...singlePhysician?.payload?.physician });
    setState(singlePhysician?.payload?.physician?.state);
    setCity(singlePhysician?.payload?.physician?.city);
  }, [singlePhysician?.payload?.physician]);
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
  const handleSubmit = (e) => {
    e.preventDefault();
    formData.city = city;
    formData.state = state;
    updatePhysician({ physicianId: editId, physicianData: formData });
  };
  useEffect(() => {
    showToast("success", updateData?.message)
    showToast("error", updateError?.data?.message)
 }, [updateData?.message,
   updateError?.data?.message]);
  return (
    <div>
      <form onSubmit={handleSubmit}>
       
        <div className="row">
          <div className=" col-md-6">
            <label className="form-label my-2" htmlFor="npiNumber">
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
            <label className="form-label my-2" htmlFor="firstName">
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
            <label className="form-label my-2" htmlFor="mi">
              MI:
            </label>
            <input
              type="text"
              className="form-control"
              id="mi"
              name="mi"
              placeholder="Enter One Mi Charecter"
              value={formData.mi}
              onChange={handleChange}
            />
          </div>
          <div className=" col-md-6">
            <label className="form-label my-2" htmlFor="lastName">
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
            <label className="form-label my-2" htmlFor="taxonomyCode">
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
            <label className="form-label my-2" htmlFor="credentials">
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
            <label className="form-label my-2" htmlFor="npiNo">
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
            <label className="form-label" htmlFor="medicaidProviderIdentifier">
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
            <label className="form-label my-2" htmlFor="addressLine1">
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
            <label className="form-label my-2" htmlFor="addressLine2">
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
            <label className="form-label my-2" htmlFor="city">
              City:
            </label>
            <CitySelect
              stateCode={state}
              selectedCity={city}
              setSelectedCity={setCity}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label my-2" htmlFor="state">
              State:
            </label>
            <StateSelect selectedState={state} setSelectedState={setState} />
          </div>
          <div className="col-md-6">
            <label className="form-label my-2" htmlFor="zip">
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
            <label className="form-label my-2" htmlFor="primaryPhone">
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
            <label className="form-label my-2" htmlFor="alternatePhone">
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
            <label className="form-label my-2" htmlFor="deliveryMethod">
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
              <option value="AxxessPhysicianPortal">
                AxxessPhysicianPortal
              </option>
              <option value="Email">Email</option>
              <option value="Phone">Phone</option>
              <option value="Fax">Fax</option>
              <option value="Courier">Courier</option>
              <option value="Ohter">Ohter</option>
              {/* Add more delivery methods here */}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label my-2" htmlFor="fax">
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
            <label className="form-label my-2" htmlFor="email">
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
  );
};

export default EditPhysicians;
