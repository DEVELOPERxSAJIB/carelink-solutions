import { useEffect, useState } from "react";
import logo from "../../../public/favicon.ico";
import { Link } from "react-router-dom";
import useFormValidation from "../../hook/useFormValidation";
import { registrationSchema } from "../../utils/validationSchemas";
import generateRandomId from "../../utils/RandomIdGenerator";
import { useProcessRegisterMutation } from "../../Redux/api/UserApi";
import StateSelect from "./../../components/FormElement/StateSelect";
import CitySelect from "./../../components/FormElement/CitySelect";
import CountySelect from "./../../components/FormElement/CountySelect";
import AuthLoader from "../../utils/Loaders/AuthLoader";

const Register = () => {
  const [processRegister, { isError, error, isSuccess, isLoading }] =
  useProcessRegisterMutation();

  const [selectedRole, setSelectedRole] = useState("caregiver");
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCounty, setSelectedCounty] = useState(null);
  const initialValues = {
    role: "",
    phone: "",
    address1: "",
    address2: "",
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
      city: selectedCity,
      county: selectedCounty,
      state: selectedState,
      agreeTerms: data.agreeTerms,
      agreePrivacyPolicy: data.agreePrivacyPolicy,
    };
    processRegister(updatedData);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useFormValidation(initialValues, registrationSchema, onSubmit);

  useEffect(() => {
    if(isSuccess) {
      reset()
      setSelectedCity(null)
      setSelectedCounty(null)
      setSelectedRole(null)
      setSelectedState(null)
    }
  }, [isSuccess, reset])

  return (
    <>
      {isLoading && <AuthLoader />}
      <div className="mt-5 container d-flex justify-content-center align-items-center">
        <div className="row mt-4 justify-content-center d-flex align-items-center">
          <div className="col-md-8 card">
            <div className="card-header fs-3 p-0 mt-5 mb-2 text-center fw-bolder text-secondary">
              Sign Up in <img src={logo} alt="CareLink Solutions" />
              <span className="text-success fw-bold">CareLink Solutions</span>
            </div>
            <div className="card-body">
              <form className="from-scrollbar" onSubmit={handleSubmit}>
                <div className="row mx-5">
                  {/* Role selection dropdown */}
                  <div className="mb-3 col-md-12">
                    <label htmlFor="role" className="form-label fs-5">
                      Signup As <span className="text-danger">*</span>
                    </label>
                    <select
                      id="role"
                      name="role"
                      className="form-select"
                      {...register("role", {
                        required: "Please select a role.",
                      })}
                      onChange={(e) => setSelectedRole(e.target.value)}
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
                  {selectedRole === "caregiver" ? (
                    <h3>Caregiver Details</h3>
                  ) : (
                    <h3>Patient Details</h3>
                  )}
                  {selectedRole === "caregiver" && (
                    <div className="mb-3 col-md-6">
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
                    <div className="mb-3 col-md-6">
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
                  <div className="mb-3 col-md-6">
                    <label htmlFor="phone" className="form-label">
                      Phone <span className="text-danger">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-control"
                      {...register("phone", {
                        required: "Phone number is required.",
                      })}
                      required
                    />
                    {errors.phone && (
                      <p className="text-danger">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Address Line 1 input field */}
                  <div className="mb-3 col-md-12">
                    <label htmlFor="address1" className="form-label">
                      Address Line 1 <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="address1"
                      name="address1"
                      className="form-control"
                      {...register("address1", {
                        required: "Address is required.",
                      })}
                      required
                    />
                    {errors.address1 && (
                      <p className="text-danger">{errors.address1.message}</p>
                    )}
                  </div>

                  {/* Address Line 2 input field */}
                  <div className="mb-3 col-md-12">
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

                  {/* State selection dropdown */}
                  <div className="mb-3 col-md-12">
                    <label htmlFor="state" className="form-label">
                      State <span className="text-danger">*</span>
                    </label>
                    <StateSelect
                      selectedState={selectedState}
                      setSelectedState={setSelectedState}
                    />
                    {selectedState==="" && (
                      <p className="text-danger">State is required!</p>
                    )}
                  </div>

                  {/* City selection dropdown */}
                  <div className="mb-3 col-md-12">
                    <label htmlFor="city" className="form-label">
                      City <span className="text-danger">*</span>
                    </label>
                    <CitySelect
                      stateCode={selectedState}
                      selectedCity={selectedCity}
                      setSelectedCity={setSelectedCity}
                    />
                    {selectedCity ==="" && (
                      <p className="text-danger">City is required!</p>
                    )}
                  </div>

                  {/* County selection dropdown */}
                  <div className="mb-3 col-md-6">
                    <label htmlFor="county" className="form-label">
                      County <span className="text-danger">*</span>
                    </label>
                    <CountySelect
                      selectedState={selectedState}
                      selectedCounty={selectedCounty}
                      setSelectedCounty={setSelectedCounty}
                    />
                    {selectedCounty ==="" && (
                      <p className="text-danger">County is required!</p>
                    )}
                  </div>

                  {/* Zip Code input field */}
                  <div className="mb-3 col-md-6">
                    <label htmlFor="zip" className="form-label">
                      Zip Code <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      className="form-control"
                      {...register("zip", {
                        required: "Zip code is required.",
                      })}
                      required
                    />
                    {errors.zip && (
                      <p className="text-danger">{errors.zip.message}</p>
                    )}
                  </div>

                  {/* Email input field */}
                  <div className="mb-3 col-md-6">
                    <label htmlFor="email" className="form-label">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      {...register("email", {
                        required: "Email is required.",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                          message: "Invalid email address format.",
                        },
                      })}
                      required
                    />
                    {errors.email && (
                      <p className="text-danger">{errors.email.message}</p>
                    )}
                  </div>

                  {/* First Name input field */}
                  <div className="mb-3 col-md-6">
                    <label htmlFor="firstName" className="form-label">
                      First Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="form-control"
                      {...register("firstName", {
                        required: "First name is required.",
                      })}
                      required
                    />
                    {errors.firstName && (
                      <p className="text-danger">{errors.firstName.message}</p>
                    )}
                  </div>

                  {/* Last Name input field */}
                  <div className="mb-3 col-md-6">
                    <label htmlFor="lastName" className="form-label">
                      Last Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="form-control"
                      {...register("lastName", {
                        required: "Last name is required.",
                      })}
                      required
                    />
                    {errors.lastName && (
                      <p className="text-danger">{errors.lastName.message}</p>
                    )}
                  </div>

                  {/* Password input field */}
                  <div className="mb-3 col-md-6">
                    <label htmlFor="password" className="form-label">
                      Password <span className="text-danger">*</span>
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      {...register("password", {
                        required: "Password is required.",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters.",
                        },
                      })}
                      required
                    />
                    {errors.password && (
                      <p className="text-danger">{errors.password.message}</p>
                    )}
                  </div>

                  {/* Confirm Password input field */}
                  <div className="mb-3 col-md-6">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password <span className="text-danger">*</span>
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="form-control"
                      {...register("confirmPassword", {
                        required: "Please confirm your password.",
                        validate: (value) =>
                          value === register.password ||
                          "Passwords do not match.",
                      })}
                      required
                    />
                    {errors.confirmPassword && (
                      <p className="text-danger">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  {/* Terms and Conditions checkbox */}
                  <div className="mb-3 col-md-12">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="agreeTerms"
                        name="agreeTerms"
                        className="form-check-input"
                        {...register("agreeTerms", {
                          required:
                            "You must agree to the terms and conditions.",
                        })}
                        required
                      />
                      <label className="form-check-label" htmlFor="agreeTerms">
                        I agree to the{" "}
                        <Link to="/terms" className="text-danger">
                          terms and conditions.
                        </Link>
                        <span className="text-danger">*</span>
                      </label>
                      {errors.agreeTerms && (
                        <p className="text-danger">
                          {errors.agreeTerms.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Privacy Policy checkbox */}
                  <div className="mb-3 col-md-12">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="agreePrivacyPolicy"
                        name="agreePrivacyPolicy"
                        className="form-check-input"
                        {...register("agreePrivacyPolicy", {
                          required: "You must agree to the privacy policy.",
                        })}
                        required
                      />
                      <label
                        className="form-check-label"
                        htmlFor="agreePrivacyPolicy"
                      >
                        I agree to the{" "}
                        <Link to="/privacy" className="text-danger">
                          privacy policy.
                        </Link>
                        <span className="text-danger">*</span>
                      </label>
                      {errors.agreePrivacyPolicy && (
                        <p className="text-danger">
                          {errors.agreePrivacyPolicy.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Submit button */}
                  <div className="mb-3 col-md-12">
                    <button
                      type="submit"
                      className="btn btn-primary text-uppercase w-100 fw-bolder"
                      disabled={isLoading}
                    >
                      {isLoading ? "...Wait please" : "Sign Up"}
                    </button>
                  </div>

                  {/* Error message */}
                  {isError && (
                    <div className="alert alert-danger text-center" role="alert">
                      {error?.data?.message ||
                        "Failed to register. Please try again later."}
                    </div>
                  )}

                  {/* Success message */}
                  {isSuccess && (
                    <div className="alert alert-success text-center" role="alert">
                      Registered successfully! Please check your email for
                      verification.
                    </div>

                  )}
                   <p className="text-center">
                <span>Already have an account?</span>{" "}
                <Link to="/login">Login</Link>
              </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
