import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    userType: "",
    // Common fields
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    county: "",
    zip: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    agreePrivacyPolicy: false,
    agreeBusinessAssociateAgreement: false,
    agreeReceiveMessages: false,
    // Health Provider specific fields
    companyDetails: {
      companyName: "",
      providerNumber: "",
    },
    // Individual specific fields
    gender: "",
    // County Board specific fields
    countyDetails: {
      countyAccreditationNumber: "",
    },
    // Independent Provider specific fields
    independentProviderDetails: {
      providerName: "",
      doddCertificationNumber: "",
    },
  });

  const counties = [
    "Adams County",
    "Allen County",
    "Ashland County",
    "Ashtabula County",
    "Athens County",
    "Auglaize County",
    "Belmont County",
    "Brown County",
    "Butler County",
    "Carroll County",
    "Champaign County",
    "Clark County",
    "Clermont County",
    "Clinton County",
    "Columbiana County",
    "Coshocton County",
    "Crawford County",
    "Cuyahoga County",
    "Darke County",
    "Defiance County",
    "Delaware County",
    "Erie County",
    "Fairfield County",
    "Fayette County",
    "Franklin County",
    "Fulton County",
    "Gallia County",
    "Geauga County",
    "Greene County",
    "Guernsey County",
    "Hamilton County",
    "Hancock County",
    "Hardin County",
    "Harrison County",
    "Henry County",
    "Highland County",
    "Hocking County",
    "Holmes County",
    "Huron County",
    "Jackson County",
    "Jefferson County",
    "Knox County",
    "Lake County",
    "Lawrence County",
    "Licking County",
    "Logan County",
    "Lorain County",
    "Lucas County",
    "Madison County",
    "Mahoning County",
    "Marion County",
    "Medina County",
    "Meigs County",
    "Mercer County",
    "Miami County",
    "Monroe County",
    "Morgan County",
    "Morrow County",
    "Muskingum County",
    "Noble County",
    "Ottawa County",
    "Paulding County",
    "Perry County",
    "Pickaway County",
    "Pike County",
    "Portage County",
    "Preble County",
    "Putnam County",
    "Richland County",
    "Ross County",
    "Sandusky County",
    "Scioto County",
    "Seneca County",
    "Shelby County",
    "Stark County",
    "Summit County",
    "Trumbull County",
    "Tuscarawas County",
    "Union County",
    "Van Wert County",
    "Vinton County",
    "Warren County",
    "Washington County",
    "Wayne County",
    "Williams County",
    "Wood County",
    "Wyandot County",
    "Montgomery County",
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Update the state based on the input type
    if (name === "userType") {
      setFormData((prevState) => ({
        ...prevState,
        userType: value,
        // Reset specific fields when user type changes
        companyDetails: {
          companyName: "",
          providerNumber: "",
        },
        independentProviderDetails: {
          providerName: "",
          doddCertificationNumber: "",
        },
        countyDetails: {
          countyAccreditationNumber: "",
        },
        gender: "",
      }));
    } else if (name.startsWith("companyDetails")) {
      // Handle nested state update for company details
      const field = name.split(".")[1];
      setFormData((prevState) => ({
        ...prevState,
        companyDetails: {
          ...prevState.companyDetails,
          [field]: value,
        },
      }));
    } else if (name.startsWith("countyDetails")) {
      // Handle nested state update for county details
      const field = name.split(".")[1];
      setFormData((prevState) => ({
        ...prevState,
        countyDetails: {
          ...prevState.countyDetails,
          [field]: value,
        },
      }));
    } else if (name.startsWith("independentProviderDetails")) {
      // Handle nested state update for independent provider details
      const field = name.split(".")[1];
      setFormData((prevState) => ({
        ...prevState,
        independentProviderDetails: {
          ...prevState.independentProviderDetails,
          [field]: value,
        },
      }));
    } else {
      // Update regular fields
      setFormData((prevState) => ({
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    // Reset form after submission (optional)
    // setFormData({ ...initialFormData });
  };

  return (
    <div className="container card">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card-header fs-3">
            Sign Up
          </div>
          <hr />
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="">
                <label htmlFor="userType" className="form-label fs-5">
                  Signup As *
                </label>
                <select
                  id="userType"
                  name="userType"
                  className="form-select"
                  value={formData.userType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select User *</option>
                  <option value="Health Provider">Health Provider</option>
                  <option value="Individual">Individual</option>
                  <option value="County Board">County Board</option>
                  <option value="Independent Provider">
                    Independent Provider
                  </option>
                </select>
              </div>

              {formData.userType === "Health Provider" && (
                <div>
                  <h3>Company Details</h3>
                  <div className="mb-3">
                    <label
                      htmlFor="companyDetails.companyName"
                      className="form-label"
                    >
                      Company Name *
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyDetails.companyName"
                      className="form-control"
                      value={formData.companyDetails.companyName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="companyDetails.providerNumber"
                      className="form-label"
                    >
                      Provider Number *
                    </label>
                    <input
                      type="text"
                      id="providerNumber"
                      name="companyDetails.providerNumber"
                      className="form-control"
                      value={formData.companyDetails.providerNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              )}

              {formData.userType === "Individual" && (
                <div>
                  <h3>Individual Details</h3>
                  <div className="mb-3">
                    <label htmlFor="gender" className="form-label">
                      Gender *
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      className="form-select"
                      value={formData.gender}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              )}

              {formData.userType === "County Board" && (
                <div>
                  <h3>County Board Details</h3>
                  <div className="mb-3">
                    <label
                      htmlFor="countyDetails.countyAccreditationNumber"
                      className="form-label"
                    >
                      County Accreditation Number *
                    </label>
                    <input
                      type="text"
                      id="countyAccreditationNumber"
                      name="countyDetails.countyAccreditationNumber"
                      className="form-control"
                      value={formData.countyDetails.countyAccreditationNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              )}

              {formData.userType === "Independent Provider" && (
                <div>
                  <h3>Independent Provider Details</h3>
                  <div className="mb-3">
                    <label
                      htmlFor="independentProviderDetails.providerName"
                      className="form-label"
                    >
                      Independent Provider’s Name *
                    </label>
                    <input
                      type="text"
                      id="providerName"
                      name="independentProviderDetails.providerName"
                      className="form-control"
                      value={formData.independentProviderDetails.providerName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="independentProviderDetails.doddCertificationNumber"
                      className="form-label"
                    >
                      Provider DODD Certification Number *
                    </label>
                    <input
                      type="text"
                      id="doddCertificationNumber"
                      name="independentProviderDetails.doddCertificationNumber"
                      className="form-control"
                      value={
                        formData.independentProviderDetails
                          .doddCertificationNumber
                      }
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address1" className="form-label">
                  Address Line 1 *
                </label>
                <input
                  type="text"
                  id="address1"
                  name="address1"
                  className="form-control"
                  value={formData.address1}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address2" className="form-label">
                  Address Line 2
                </label>
                <input
                  type="text"
                  id="address2"
                  name="address2"
                  className="form-control"
                  value={formData.address2}
                  onChange={handleInputChange}
                />
              </div>
              <div className="row g-3">
                <div className="col-sm-3 mb-3">
                  <label htmlFor="city" className="form-label">
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="form-control"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-sm-3 mb-3">
                  <label htmlFor="state" className="form-label">
                    State *
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    className="form-control"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-sm-3 mb-3">
                  <label htmlFor="county" className="form-label">
                    Select County *
                  </label>
                  <select
                    id="county"
                    name="county"
                    className="form-select"
                    value={formData.county}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select County</option>
                    {counties.map((county, index) => (
                      <option key={index} value={county}>
                        {county}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-sm-3 mb-3">
                  <label htmlFor="zip" className="form-label">
                    Zip *
                  </label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    className="form-control"
                    value={formData.zip}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="row g-3">
                <div className="col-sm-6 mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="form-control"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-sm-6 mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="form-control"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label htmlFor="password" className="form-label">
                      Password *
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="form-control"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  className="form-check-input"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  required
                />
                <label className="form-check-label" htmlFor="agreeTerms">
                  I agree to the Health Terms of Service
                </label>
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  id="agreePrivacyPolicy"
                  name="agreePrivacyPolicy"
                  className="form-check-input"
                  checked={formData.agreePrivacyPolicy}
                  onChange={handleInputChange}
                  required
                />
                <label
                  className="form-check-label"
                  htmlFor="agreePrivacyPolicy"
                >
                  I certify that I have read and agree to the Health Privacy
                  Policy
                </label>
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  id="agreeBusinessAssociateAgreement"
                  name="agreeBusinessAssociateAgreement"
                  className="form-check-input"
                  checked={formData.agreeBusinessAssociateAgreement}
                  onChange={handleInputChange}
                  required
                />
                <label
                  className="form-check-label"
                  htmlFor="agreeBusinessAssociateAgreement"
                >
                  I certify that I have read and agree to the Health Business
                  Associate Agreement
                </label>
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  id="agreeReceiveMessages"
                  name="agreeReceiveMessages"
                  className="form-check-input"
                  checked={formData.agreeReceiveMessages}
                  onChange={handleInputChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="agreeReceiveMessages"
                >
                  By checking this box, I agree to receive text messages from
                  Xoomia Health.’s Sales and Support teams. Message frequency
                  varies. Message & data rates may apply. View our terms and
                  privacy policy on our website{" "}
                  <a href="https://www.xoomia.com/privacy-policy">
                    https://www.xoomia.com/privacy-policy
                  </a>
                  .
                </label>
              </div>
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
