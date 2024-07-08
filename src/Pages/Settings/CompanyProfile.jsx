import { companyProfileSchema } from "./../../utils/validationSchemas";
import useFormValidation from "./../../hook/useFormValidation";
import { useState,useEffect } from "react";
import MultiCountySelect from "./../../components/FormElement/MultiCountySelect";
import StateSelect from "./../../components/FormElement/StateSelect";
import CitySelect from "./../../components/FormElement/CitySelect";
import {useCreateCompanyMutation,useCompanyProfileGetByIdQuery} from "../../Redux/api/SettingApi"
import AuthLoader from './../../utils/Loaders/AuthLoader';
const CompanyProfile = () => {
  const [createCompany,{data,isLoading,isSuccess,error}]=useCreateCompanyMutation()
  const {data:companyProfile,refetch}=useCompanyProfileGetByIdQuery()
console.log(companyProfile)
  const [selectedCounty, setSelectedCounty] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [citySelected, setCitySelected] = useState("");
  const [securityPinEnabled, setSecurityPinEnabled] = useState(false);

  let initialValues = {
    companyName: companyProfile?.payload?.company?.companyName || "",
    providerNumber: companyProfile?.payload?.company?.providerNumber || "",
    businessEntityId: companyProfile?.payload?.company?.businessEntityId || "",
    medicaidIdentifier: companyProfile?.payload?.company?.medicaidIdentifier || "",
    evvUsername: companyProfile?.payload?.company?.evvUsername || "",
    medicaidNumber: companyProfile?.payload?.company?.medicaidNumber || "",
    evvPassword: companyProfile?.payload?.company?.evvPassword || "",
    address1: companyProfile?.payload?.company?.address1 || "",
    address2: companyProfile?.payload?.company?.address2 || "",
    city: companyProfile?.payload?.company?.city || "",
    state: companyProfile?.payload?.company?.state || "",
    county: companyProfile?.payload?.company?.county || [],
    zip: companyProfile?.payload?.company?.zip || "",
    phone: companyProfile?.payload?.company?.phone || "",
    email: companyProfile?.payload?.company?.email || "",
    password: companyProfile?.payload?.company?.password||"", 
    confirmPassword:companyProfile?.payload?.company?.password|| "",
    firstName: companyProfile?.payload?.company?.firstName || "",
    lastName: companyProfile?.payload?.company?.lastName || "",
    securityPin: companyProfile?.payload?.company?.securityPin || "",
    confirmSecurityPin: companyProfile?.payload?.company?.securityPin || "",
  };

  const onSubmit = (data) => {
    data.city= citySelected;
    data.state= selectedState;
    data.county= selectedCounty;
    console.log(data);
    createCompany(data)
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useFormValidation(initialValues, companyProfileSchema, onSubmit);
  useEffect(()=>{
    setSelectedCounty(companyProfile?.payload?.company?.county??[])
    setSelectedState(companyProfile?.payload?.company?.state)
    setCitySelected(companyProfile?.payload?.company?.city)
    setSecurityPinEnabled(companyProfile?.payload?.company?.securityPin)
  },[companyProfile])

  useEffect(()=>{
    if(isSuccess){
      refetch()
      
    }
  },[isSuccess,refetch])
  if(isLoading) return <AuthLoader/>
  return (
    <div>
      <div className="card mb-6">
        <div className="card-header fs-3">Manage Account</div>
        <form className="card-body" onSubmit={handleSubmit}>
          <h6>1. Company Details</h6>
          <div className="row g-6">
            <div className="col-md-6">
              <label htmlFor="company-name" className="form-label">
                Company Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="company-name"
                className="form-control"
                placeholder="Enter company name"
                {...register("companyName")}
              />
              {errors.companyName && (
                <p className="text-danger">{errors.companyName.message}</p>
              )}
            </div>
            <div className="col-md-6">
              <label htmlFor="provider-number" className="form-label">
                Provider Number <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="provider-number"
                className="form-control"
                placeholder="Enter provider number"
                {...register("providerNumber")}
              />
              {errors.providerNumber && (
                <p className="text-danger">{errors.providerNumber.message}</p>
              )}
            </div>
            <div className="col-md-6">
              <label htmlFor="business-entity-id" className="form-label">
                Business Entity Id
              </label>
              <input
                type="text"
                id="business-entity-id"
                className="form-control"
                placeholder="Enter business entity ID"
                {...register("businessEntityId")}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="medicaid-identifier" className="form-label">
                Business Entity Medicaid Identifier
              </label>
              <input
                type="text"
                id="medicaid-identifier"
                className="form-control"
                placeholder="Enter Medicaid identifier"
                {...register("medicaidIdentifier")}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="evv-username" className="form-label">
                EVV data Username
              </label>
              <input
                type="text"
                id="evv-username"
                className="form-control"
                placeholder="Enter EVV data username"
                {...register("evvUsername")}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="medicaid-number" className="form-label">
                Medicaid Number
              </label>
              <input
                type="text"
                id="medicaid-number"
                className="form-control"
                placeholder="Enter Medicaid number"
                {...register("medicaidNumber")}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="evv-password" className="form-label">
                EVV data Password
              </label>
              <input
                type="password"
                id="evv-password"
                className="form-control"
                placeholder="Enter EVV data password"
                {...register("evvPassword")}
              />
            </div>
            <div className="col-12">
              <label className="form-label" htmlFor="company-logo">
                Company Logo <span className="text-danger">*</span>
              </label>
              <input type="file" id="company-logo" className="form-control" />
            </div>
          </div>

          <hr className="my-6 mx-n4" />
          <h6>2. Location Info</h6>
          <div className="row g-6">
            <div className="col-md-6">
              <label htmlFor="address1" className="form-label">
                Address1 <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="address1"
                className="form-control"
                placeholder="Enter address line 1"
                {...register("address1")}
              />
              {errors.address1 && (
                <p className="text-danger">{errors.address1.message}</p>
              )}
            </div>
            <div className="col-md-6">
              <label htmlFor="address2" className="form-label">
                Address2
              </label>
              <input
                type="text"
                id="address2"
                className="form-control"
                placeholder="Enter address line 2"
                {...register("address2")}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="state" className="form-label">
                State <span className="text-danger">*</span>
              </label>

              <StateSelect
                selectedState={selectedState}
                setSelectedState={setSelectedState}
              />
              {errors.state && (
                <p className="text-danger">{errors.state.message}</p>
              )}
            </div>
            <div className="col-md-6">
              <label htmlFor="city" className="form-label">
                City <span className="text-danger">*</span>
              </label>
              <CitySelect
                stateCode={selectedState}
                selectedCity={citySelected}
                setSelectedCity={setCitySelected}
              />
              {errors.city && (
                <p className="text-danger">{errors.city.message}</p>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label" htmlFor="county">
                Select County <span className="text-danger">*</span>
              </label>
              <MultiCountySelect
               selectedState={selectedState} selectedCounty={selectedCounty} setSelectedCounty={setSelectedCounty??[]}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="zip" className="form-label">
                Zip <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="zip"
                className="form-control"
                placeholder="Enter ZIP code"
                {...register("zip")}
              />
              {errors.zip && (
                <p className="text-danger">{errors.zip.message}</p>
              )}
            </div>
            <div className="col-md-6">
              <label htmlFor="phone" className="form-label">
                Phone <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="phone"
                className="form-control"
                placeholder="Enter phone number"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-danger">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <hr className="my-6 mx-n4" />
          <h6>3. Account Details</h6>
          <div className="row g-6">
            <div className="col-md-6">
              <label htmlFor="email" className="form-label">
                Email Address <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter email address"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-danger">{errors.email.message}</p>
              )}
            </div>
            <div className="col-md-6">
              <label htmlFor="password" className="form-label">
                Password <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-danger">{errors.password.message}</p>
              )}
            </div>
            <div className="col-md-6">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="form-control"
                placeholder="Enter password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-danger">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <hr className="my-6 mx-n4" />
          <h6>4. Authorized Signature</h6>
          <div className="row g-6">
            <div className="col-md-6">
              <label htmlFor="first-name" className="form-label">
                First Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="first-name"
                className="form-control"
                placeholder="Enter first name"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-danger">{errors.firstName.message}</p>
              )}
            </div>
            <div className="col-md-6">
              <label htmlFor="last-name" className="form-label">
                Last Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="last-name"
                className="form-control"
                placeholder="Enter last name"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="text-danger">{errors.lastName.message}</p>
              )}
            </div>
            <div className="col-md-12">
              <div className="form-check">
                <input
                  type="checkbox"
                  id="security-pin"
                  className="form-check-input"
                  onChange={(e) => setSecurityPinEnabled(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="security-pin">
                  Security Pin
                </label>
              </div>
            </div>
            {securityPinEnabled && (
              <>
                <div className="col-md-6">
                  <label htmlFor="securityPin" className="form-label">
                    Security Pin <span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    id="securityPin"
                    className="form-control"
                    placeholder="Enter security pin"
                    {...register("securityPin")}
                  />
                  {errors.securityPin && (
                    <p className="text-danger">{errors.securityPin.message}</p>
                  )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="confirmSecurityPin" className="form-label">
                    Confirm Security Pin <span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    id="confirmSecurityPin"
                    className="form-control"
                    placeholder="Enter security pin again"
                    {...register("confirmSecurityPin")}
                  />
                  {errors.confirmSecurityPin && (
                    <p className="text-danger">
                      {errors.confirmSecurityPin.message}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="d-flex justify-content-end mt-6">
            <button
              type="button"
              className="btn btn-secondary me-3"
              onClick={() => reset()}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
          {data?.message &&<div className="alert alert-success mt-2 text-center">
            {data?.message}
          </div>}
          {error?.data?.message&&<div className="alert alert-danger mt-2 text-center">
            {error?.data?.message}
          </div>}
        </form>
      </div>
    </div>
  );
};

export default CompanyProfile;
