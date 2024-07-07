import {useState}from "react"
import photo1 from "../../assets/img/illustrations/auth-forgot-password-illustration-light.png"
import photo2 from "../../assets/img/illustrations/bg-shape-image-light.png"
import logo from "../../../public/logo.jpg"
import {Link} from "react-router-dom"
import {useForgotPasswordMutation}from "../../Redux/api/UserApi"
import AuthLoader from "../../utils/Loaders/AuthLoader"
const ForgetPassword = () => {
  const [forgotPassword,{isLoading,isSuccess,error,data}]=useForgotPasswordMutation()
const [email,setEmail]=useState("")

  const handleForgotPassword=()=>{
     forgotPassword({email})
  }
  const handleEmail=(e)=>{
    setEmail(e.target.value)
  }
  if(isLoading)return <AuthLoader/>
  return (
    <>
      <div className="authentication-wrapper authentication-cover">
        {/* Logo */}
        <a href="index.html" className="app-brand auth-cover-brand">
          <span className="app-brand-logo demo">
            <img src={logo}/>
          </span>
          <span className="app-brand-text demo text-heading fw-bold">
            CareLink Solution
          </span>
        </a>
        {/* /Logo */}
        <div className="authentication-inner row m-0">
          {/* /Left Text */}
          <div className="d-none d-lg-flex col-lg-8 p-0">
            <div className="auth-cover-bg auth-cover-bg-color d-flex justify-content-center align-items-center">
              <img
                src={photo1}
                alt="auth-forgot-password-cover"
                className="my-5 auth-illustration d-lg-block d-none"
                data-app-light-img="illustrations/auth-forgot-password-illustration-light.png"
                data-app-dark-img="illustrations/auth-forgot-password-illustration-dark.html"
              />
              <img
                src={photo2}
                alt="auth-forgot-password-cover"
                className="platform-bg"
                data-app-light-img="illustrations/bg-shape-image-light.png"
                data-app-dark-img="illustrations/bg-shape-image-dark.html"
              />
            </div>
          </div>
          {/* /Left Text */}
          {/* Forgot Password */}
          <div className="d-flex col-12 col-lg-4 align-items-center authentication-bg p-sm-12 p-6">
            <div className="w-px-400 mx-auto mt-12 mt-5">
              <h4 className="mb-1">Forgot Password? 🔒</h4>
              <p className="mb-6">
                Enter your email and we&apos;ll send you instructions to reset your
                password
              </p>
              <form
                onSubmit={handleForgotPassword}
                className="mb-6"
              >
                <div className="mb-6">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleEmail}
                    placeholder="Enter your email"
                  />
                </div>
                <button className="btn btn-primary d-grid w-100">
                  Send Reset Link
                </button>
              </form>
             {error?.data?.message&& <div className="alert alert-danger">{error?.data?.message}</div>} 
             {data?.message&& <div className="alert alert-success">{data?.message}</div>} 
              <div className="text-center">
                <Link
                  to="/login"
                  className="d-flex align-items-center justify-content-center"
                >
                  <i className="ti ti-chevron-left scaleX-n1-rtl me-1_5" />
                  Back to login
                </Link>
              </div>
            </div>
          </div>
          {/* /Forgot Password */}
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
