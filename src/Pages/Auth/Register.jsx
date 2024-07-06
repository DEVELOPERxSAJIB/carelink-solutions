import { useState } from "react";
import logo from "../../../public/favicon.ico";
import { Link } from "react-router-dom";
import useFormValidation from "../../hook/useFormValidation";
import { registrationSchema } from "../../utils/validationSchemas";
import generateRandomId from "../../utils/RandomIdGenerator";
import { useRegisterUserMutation } from "../../Redux/api/UserApi";
import { countries } from "countries-list";

const Register = () => {
  const countriesList = Object.values(countries);

  const [
    registerUser,
    { data, isError, error, message, isSuccess, isLoading },
  ] = useRegisterUserMutation();

  const [selectedRole, setSelectedRole] = useState("caregiver");

  const initialValues = {
    role: "",
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
  };

  const onSubmit = (data) => {
    const updatedData = {
      ...data,
      caregiverID:
        data.role === "caregiver" ? generateRandomId("caregiver") : "",
      patientID: data.role === "patient" ? generateRandomId("patient") : "",
    };
    registerUser(updatedData);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormValidation(initialValues, registrationSchema, onSubmit);
  
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  return (
    <div className="mt-7 d-flex justify-content-center align-items-center">
      <div className="row card justify-content-center d-flex align-items-center">
        <div className="col-lg-8">
          <div className="card-header fs-3 p-0 mt-5 mb-2 text-center fw-bolder text-primary">
            Sign Up in <img src={logo} alt="CareLink Solutions" />
            <span className="text-success fw-bold">CareLink Solutions</span>
          </div>

          <div className="card-body">
            <form className="from-scrollbar" onSubmit={handleSubmit}>
              {/* Role selection dropdown */}
              <div className="mb-3">
                <label htmlFor="role" className="form-label fs-5">
                  Signup As <span className="text-danger">*</span>
                </label>
                <select
                  id="role"
                  name="role"
                  className="form-select"
                  {...register("role")}
                  onChange={handleRoleChange}
                  required
                >
                  <option value="">--select user--</option>
                  <option value="caregiver">Caregiver</option>
                  <option value="patient">Patient</option>
                </select>
                {errors.role && (
                  <p className="text-danger">{errors.role.message}</p>
                )}
              </div>

              {/* Conditional rendering of caregiver details */}
              {selectedRole === "caregiver" && (
                <div className="mb-3">
                  <h3>Caregiver Details</h3>
                  <label htmlFor="caregiverID" className="form-label">
                    Caregiver ID <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="caregiverID"
                    name="caregiverID"
                    className="form-control"
                    value={generateRandomId("caregiver")}
                    disabled
                  />
                </div>
              )}

              {/* Conditional rendering of patient details */}
              {selectedRole === "patient" && (
                <div className="mb-3">
                  <h3>Patient Details</h3>
                  <label htmlFor="patientID" className="form-label">
                    Patient ID <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="patientID"
                    name="patientID"
                    className="form-control"
                    value={generateRandomId("patient")}
                    disabled
                  />
                </div>
              )}

              {/* Phone input field */}
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone <span className="text-danger">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-control"
                  {...register("phone")}
                  required
                />
                {errors.phone && (
                  <p className="text-danger">{errors.phone.message}</p>
                )}
              </div>

              {/* Address Line 1 input field */}
              <div className="mb-3">
                <label htmlFor="address1" className="form-label">
                  Address Line 1 <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="address1"
                  name="address1"
                  className="form-control"
                  {...register("address1")}
                  required
                />
                {errors.address1 && (
                  <p className="text-danger">{errors.address1.message}</p>
                )}
              </div>

              {/* Address Line 2 input field */}
              <div className="mb-3">
                <label htmlFor="address2" className="form-label">
                  Address Line 2
                </label>
                <input
                  type="text"
                  id="address2"
                  name="address2"
                  className="form-control"
                  {...register("address2")}
                />
              </div>

              {/* City, State, County, Zip inputs */}
              <div className="row g-3">
                <div className="col-sm-3 mb-3">
                  <label htmlFor="city" className="form-label">
                    City <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="form-control"
                    {...register("city")}
                    required
                  />
                  {errors.city && (
                    <p className="text-danger">{errors.city.message}</p>
                  )}
                </div>
                <div className="col-sm-3 mb-3">
                  <label htmlFor="state" className="form-label">
                    State <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    className="form-control"
                    {...register("state")}
                    required
                  />
                  {errors.state && (
                    <p className="text-danger">{errors.state.message}</p>
                  )}
                </div>
                <div className="col-sm-3 mb-3">
                  <label htmlFor="county" className="form-label">
                    Select County <span className="text-danger">*</span>
                  </label>
                  <select
                    id="county"
                    name="county"
                    className="form-select"
                    {...register("county")}
                    required
                  >
                    <option value="">Select County</option>
                    {countriesList.map((country) => (
                      <>
                        <option key={country.name} value={country.name}>
                          {country.name}
                        </option>
                      </>
                    ))}
                  </select>
                  {errors.county && (
                    <p className="text-danger">{errors.county.message}</p>
                  )}
                </div>
                <div className="col-sm-3 mb-3">
                  <label htmlFor="zip" className="form-label">
                    Zip <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    className="form-control"
                    {...register("zip")}
                    required
                  />
                  {errors.zip && (
                    <p className="text-danger">{errors.zip.message}</p>
                  )}
                </div>
              </div>

              {/* Email input field */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  {...register("email")}
                  required
                />
                {errors.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
              </div>

              {/* First Name and Last Name input fields */}
              <div className="row g-3">
                <div className="col-sm-6 mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="form-control"
                    {...register("firstName")}
                    required
                  />
                  {errors.firstName && (
                    <p className="text-danger">{errors.firstName.message}</p>
                  )}
                </div>
                <div className="col-sm-6 mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="form-control"
                    {...register("lastName")}
                    required
                  />
                  {errors.lastName && (
                    <p className="text-danger">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              {/* Password and Confirm Password input fields */}
              <div className="row g-3">
                <div className="col-sm-6 mb-3">
                  <label htmlFor="password" className="form-label">
                    Password <span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    {...register("password")}
                    required
                  />
                  {errors.password && (
                    <p className="text-danger">{errors.password.message}</p>
                  )}
                </div>
                <div className="col-sm-6 mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password <span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="form-control"
                    {...register("confirmPassword")}
                    required
                  />
                  {errors.confirmPassword && (
                    <p className="text-danger">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Terms and Privacy Policy checkboxes */}
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  {...register("agreeTerms")}
                />
                <label className="form-check-label" htmlFor="agreeTerms">
                  I agree to the{" "}
                  <Link to="/terms" className="text-decoration-none">
                    terms and conditions
                  </Link>
                </label>
                {errors.agreeTerms && (
                  <p className="text-danger">{errors.agreeTerms.message}</p>
                )}
              </div>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="agreePrivacyPolicy"
                  name="agreePrivacyPolicy"
                  {...register("agreePrivacyPolicy")}
                />
                <label
                  className="form-check-label"
                  htmlFor="agreePrivacyPolicy"
                >
                  I agree to the{" "}
                  <Link to="/privacy" className="text-decoration-none">
                    privacy policy
                  </Link>
                </label>
                {errors.agreePrivacyPolicy && (
                  <p className="text-danger">
                    {errors.agreePrivacyPolicy.message}
                  </p>
                )}
              </div>

              {/* Form submit button */}
              <div className="text-center mt-3">
                <button type="submit" className="btn btn-primary w-100 fs-5">
                  {isLoading ? "Loading..." : "Register"}
                </button>
              </div>
              <div className="text-center mt-2">
                Already have an account?
                <Link to="/login" className="">
                  Sign In
                </Link>
              </div>

              {/* Conditional rendering for form submission status */}
              {isError && (
                <div className="alert alert-danger text-center mt-1">
                  {error.data.message}
                </div>
              )}
              {isSuccess && (
                <div className="alert alert-success text-center">
                  Registration successful! Please log in.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
