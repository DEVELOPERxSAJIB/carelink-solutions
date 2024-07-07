import photo1 from "../../assets/img/illustrations/auth-reset-password-illustration-light.png"
import photo2 from "../../assets/img/illustrations/bg-shape-image-light.png"
import logo from "../../../public/logo.jpg"
import {Link} from "react-router-dom"
import {useResetPasswordMutation}from "../../Redux/api/UserApi"
import AuthLoader from "../../utils/Loaders/AuthLoader"
import {useParams,useNavigate}from "react-router-dom"
import {useState,useEffect} from "react"
const ResetPassword = () => {
  const params = useParams()
  const navigate = useNavigate()
  console.log(params)
const [resetPassword,{data,isLoading,isSuccess,error}] =useResetPasswordMutation()
 const [newPassword,setNewPassword]=useState("")
 const [confirmNewPassword,setConfirmNewPassword]=useState("")
 const handleSubmit=()=>{
  resetPassword({token:params.token,newPassword,confirmNewPassword})
 }
 useEffect(()=>{
   if(isSuccess){
     navigate("/login")
    }
  },[isSuccess,navigate])
  if(isLoading)return <AuthLoader/>
  return (
    <div className="authentication-wrapper authentication-cover">
      {/* Logo */}
      <a href="index.html" className="app-brand auth-cover-brand">
        <span className="app-brand-logo demo">
          <img src={logo}/>
        </span>
        <span className="app-brand-text demo text-heading fw-bold">CareLink Solution</span>
      </a>
      {/* /Logo */}
      <div className="authentication-inner row m-0">
        {/* /Left Text */}
        <div className="d-none d-lg-flex col-lg-8 p-0">
          <div className="auth-cover-bg auth-cover-bg-color d-flex justify-content-center align-items-center">
            <img
              src={photo1}
              alt="auth-reset-password-cover"
              className="my-5 auth-illustration"
              data-app-light-img="illustrations/auth-reset-password-illustration-light.png"
              data-app-dark-img="illustrations/auth-reset-password-illustration-dark.html"
            />
            <img
              src={photo2}
              alt="auth-reset-password-cover"
              className="platform-bg"
              data-app-light-img="illustrations/bg-shape-image-light.png"
              data-app-dark-img="illustrations/bg-shape-image-dark.html"
            />
          </div>
        </div>
        {/* /Left Text */}
        {/* Reset Password */}
        <div className="d-flex col-12 col-lg-4 align-items-center authentication-bg p-6 p-sm-12">
          <div className="w-px-400 mx-auto mt-12 pt-5">
            <h4 className="mb-1">Reset Password 🔒</h4>
            <p className="mb-6">
              <span className="fw-medium">
                Your new password must be different from previously used
                passwords
              </span>
            </p>
            <form
              onSubmit={handleSubmit}
            >
              <div className="mb-6 form-password-toggle">
                <label className="form-label" htmlFor="password">
                  New Password
                </label>
                <div className="input-group input-group-merge">
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e)=>setNewPassword(e.target.value)}
                    placeholder="············"
                    aria-describedby="password"
                  />
                  <span className="input-group-text cursor-pointer">
                    <i className="ti ti-eye-off" />
                  </span>
                </div>
              </div>
              <div className="mb-6 form-password-toggle">
                <label className="form-label" htmlFor="confirm-password">
                  Confirm Password
                </label>
                <div className="input-group input-group-merge">
                  <input
                    type="password"
                    id="confirm-password"
                    className="form-control"
                    name="confirmNewPassword"
                    value={confirmNewPassword}
                    onChange={(e)=>setConfirmNewPassword(e.target.value)}
                    placeholder="············"
                    aria-describedby="password"
                  />
                  <span className="input-group-text cursor-pointer">
                    <i className="ti ti-eye-off" />
                  </span>
                </div>
              </div>
              <button className="btn btn-primary d-grid w-100 mb-6">
                Set new password
              </button>
              {error?.data?.message&& <div className="alert alert-danger">{error?.data?.message}</div>} 
             {data?.message&& <div className="alert alert-success">{data?.message}</div>} 
              <div className="text-center">
                <Link to="/login">
                  <i className="ti ti-chevron-left scaleX-n1-rtl me-1_5" />
                  Back to login
                </Link>
              </div>
            </form>
          </div>
        </div>
        {/* /Reset Password */}
      </div>
    </div>
  );
};

export default ResetPassword