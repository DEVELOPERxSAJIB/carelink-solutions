import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useFormValidation from "./../../hook/useFormValidation";
import logo from "../../../public/LOGO1.jpeg";
import image_light from "../../assets/img/illustrations/bg-shape-image-light.png";
import { loginSchema } from "../../utils/validationSchemas";
import { useLoginUserMutation } from "../../Redux/api/UserApi";
import { useNavigate } from "react-router-dom";
import AuthLoader from "../../utils/Loaders/AuthLoader";

const Login = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const togglePasswordVisibility = (setPasswordVisibility) => {
    setPasswordVisibility((prevState) => !prevState);
  };
  const navigate = useNavigate();
  const [loginUser, { data, isSuccess, isError, isLoading, error }] =
    useLoginUserMutation();
  console.log(data, error);
  const initialValues = {
    email: localStorage.getItem("email") || "",
    password: localStorage.getItem("password") || "",
    remember: localStorage.getItem("remember") === "true",
  };
  const [remember, setRemember] = useState(initialValues.remember);

  const onSubmit = (data) => {
    if (remember) {
      localStorage.setItem("email", data.email);
      localStorage.setItem("password", data.password);
      localStorage.setItem("remember", remember);
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      localStorage.removeItem("remember");
    }
    loginUser(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormValidation(initialValues, loginSchema, onSubmit);

  // Checkbox handler
  const handleRememberChange = (e) => {
    setRemember(e.target.checked);
  };
  useEffect(() => {
    if (isSuccess && data) {
      localStorage.setItem("LoginUser", data);
      navigate("/");
    }
  });

  return (
    <>
      {isLoading && <AuthLoader />}
      <div className="authentication-wrapper authentication-cover">
        <div className="authentication-inner row m-0">
          {/* Left Text Section */}
          <div className="d-none d-lg-flex col-lg-8 p-0">
            <div className="auth-cover-bg auth-cover-bg-color d-flex justify-content-center align-items-center">
              <img
                src={logo}
                alt="auth-login-cover"
                className="my-5 auth-illustration w-100 h-100"
              />
              <img
                src={image_light}
                alt="auth-login-cover"
                className="platform-bg position-absolute bottom-0"
              />
            </div>
          </div>
          {/* End Left Text Section */}

          {/* Login Section */}
          <div className="d-flex col-12 col-lg-4 align-items-center authentication-bg p-sm-12 p-6">
            <div className="w-px-400 mx-auto mt-12 pt-5">
              <h4 className="mb-1">Welcome to CareLink Solutions! 👋</h4>
              <p className="mb-6">
                Please sign-in to your account and start the adventure
              </p>

              <form className="mb-6" onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="email" className="form-label">
                    Email or Username
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    id="email"
                    {...register("email")}
                    placeholder="Enter your email or username"
                    autoFocus
                  />
                  {errors.email && (
                    <div className="invalid-feedback">Email is required</div>
                  )}
                </div>
                <div className="mb-6 form-password-toggle">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <div className="input-group input-group-merge">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      id="password"
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      {...register("password")}
                      placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                      aria-describedby="password"
                    />
                    <span className="input-group-text cursor-pointer">
                      <i
                        onClick={() =>
                          togglePasswordVisibility(setShowNewPassword)
                        }
                        className={
                          showNewPassword ? "ti ti-eye" : "ti ti-eye-off"
                        }
                      ></i>
                    </span>
                    {errors.password && (
                      <div className="invalid-feedback">
                        Password is required
                      </div>
                    )}
                  </div>
                </div>
                <div className="my-8">
                  <div className="d-flex justify-content-between">
                    <div className="form-check mb-0 ms-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="remember-me"
                        checked={remember}
                        onChange={handleRememberChange}
                      />
                      <label className="form-check-label" htmlFor="remember-me">
                        Remember Me
                      </label>
                    </div>
                    <Link to="/forget-password">Forgot Password?</Link>
                  </div>
                </div>
                <button className="btn btn-primary d-grid w-100" type="submit">
                  Sign in
                </button>
              </form>
              {isError && (
                <div style={{}} className="alert alert-danger text-center">
                  {error?.data?.message}
                </div>
              )}
              {isSuccess && (
                <div className="alert alert-success text-center">
                  Login successful!{" "}
                </div>
              )}
              <p className="text-center">
                <span>New on our platform?</span>{" "}
                <Link to="/register">Create an account</Link>
              </p>
            </div>
          </div>
          {/* End Login Section */}
        </div>
      </div>
    </>
  );
};

export default Login;
