import { useState, useEffect, useRef } from "react";
import PageHeader from "./../../components/FormElement/PageHeader";
import CitySelect from "../../components/FormElement/CitySelect";
import StateSelect from "./../../components/FormElement/StateSelect";

import { useCreatePhysicianMutation } from "../../Redux/api/PhysicianApi";
import AuthLoader from "./../../utils/Loaders/AuthLoader";

import { ReactToPrint } from "react-to-print";
import {
  getAllSectionStepState,
  updateSteps,
} from "./../../Redux/slices/SectionStep.js";
import { useSelector, useDispatch } from "react-redux";
import { showToast } from './../../utils/Toastify';
const CreatePhysicians = () => {
  const allSteps = useSelector(getAllSectionStepState);
  const dispatch = useDispatch();

  const componentRef = useRef();
  const localPhysician = JSON.parse(localStorage.getItem("Physician"));
  //console.log(localPhysician);
  const [createPhysician, { data, isLoading, error, isSuccess }] =
    useCreatePhysicianMutation();
  const [formData, setFormData] = useState({
    npiNo: localPhysician?.npiNo || "",
    firstName: localPhysician?.firstName || "",
    mi: localPhysician?.mi || "",
    lastName: localPhysician?.lastName || "",
    taxonomyCode: localPhysician?.taxonomyCode || "",
    credentials: localPhysician?.credentials || "",
    medicaidProviderIdentifier:
      localPhysician?.medicaidProviderIdentifier || "",
    addressLine1: localPhysician?.addressLine1 || "",
    addressLine2: localPhysician?.addressLine2 || "",
    city: localPhysician?.city || "",
    state: localPhysician?.state || "",
    zip: localPhysician?.zip || "",
    primaryPhone: localPhysician?.primaryPhone || "",
    alternatePhone: localPhysician?.alternatePhone || "",
    deliveryMethod: localPhysician?.deliveryMethod || "",
    fax: localPhysician?.fax || "",
    email: localPhysician?.email || "",
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
    const patientId =JSON.parse(localStorage.getItem("patient"))
    if (patientId?._id) {
      formData.patientId = allSteps.patientId ||patientId?._id;
      localStorage.removeItem("Physician");
      createPhysician(formData);
    }else{
      showToast("error","Patient id required")
    }
  };
  const handleSaveAndContinue = (e) => {
    e.preventDefault();
    formData.city = city;
    formData.state = state;
    const patientId =JSON.parse(localStorage.getItem("patient"))
    if (patientId?._id) {
      formData.patientId = allSteps.patientId ||patientId?._id;
      localStorage.setItem("Physician", JSON.stringify(formData));
      createPhysician(formData);
    }else{
      showToast("error","Patient id required")
    }
  };
  const handleSaveAndExit = (e) => {
    e.preventDefault();
    formData.city = city;
    formData.state = state;
    const patientId =JSON.parse(localStorage.getItem("patient"))
    if (patientId?._id) {
      formData.patientId = allSteps.patientId ||patientId?._id;
      localStorage.setItem("Physician", JSON.stringify(formData));
      createPhysician(formData);
    }else{
      showToast("error","Patient id required")
    }
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(updateSteps({...allSteps,steps:allSteps?.steps + 1}));
      setFormData({
        npiNo: "",
        firstName: "",
        mi: "",
        lastName: "",
        taxonomyCode: "",
        credentials: "",
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
    }
  }, [isSuccess]);
  useEffect(() => {
    setState(localPhysician?.state || "");
    setCity(localPhysician?.city || "");
  }, []);
  useEffect(() => {
    showToast("error", error?.data?.message);
    showToast("success", data?.message);
  }, [

    error?.data?.message,
    data?.message,
  ]);
  if (isLoading) return <AuthLoader />;

  return (
    <div ref={componentRef} className="card mt-4 w-100">
      <PageHeader title="New Physician" className="card-header fs-3" />

      <div className="card-body">
        <div className="row">
          <div className="col-md-12">
            <h6>Search Physician</h6>
          </div>
        </div>
      

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className=" col-md-6">
              <label className="form-label my-2" htmlFor="npiNo">
                NPI Number:
              </label>
              <input
                type="text"
                className="form-control"
                id="npiNo"
                name="npiNo"
                placeholder="Enter NPI Number"
                value={formData.npiNo}
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
                <option className="hide-on-print" value="">
                  Select delivery method
                </option>
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

          <div className="col-md-6 mt-5 d-flex hide-on-print gap-2">
            <button type="submit" className="btn btn-primary mr-2">
              Save
            </button>
            <button
              onClick={handleSaveAndContinue}
              type="submit"
              className="btn btn-primary mr-2"
            >
              Save and continue
            </button>
            <button
              onClick={handleSaveAndExit}
              type="submit"
              className="btn btn-primary mr-2"
            >
              Save and exit
            </button>
            <button type="button" className="btn btn-secondary">
              Exit
            </button>

            <ReactToPrint
              trigger={() => <span className="btn btn-primary">Print</span>}
              content={() => componentRef.current}
              documentTitle="Patient"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePhysicians;
