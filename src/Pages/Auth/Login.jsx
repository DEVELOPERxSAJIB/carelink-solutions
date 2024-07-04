import illustration_light from "/src/assets/img/illustrations/auth-login-illustration-light.png";
import image_light from "/src/assets/img/illustrations/bg-shape-image-light.png";
import {Link} from "react-router-dom"
import logo from '../../../public/LOGO.jpeg'
const Login = () => {
  return (
    <div className="authentication-wrapper authentication-cover">
    <div className="authentication-inner row m-0">
      {/* Left Text Section */}
      <div className="d-none d-lg-flex col-lg-8 p-0">
        <div className="auth-cover-bg auth-cover-bg-color d-flex justify-content-center align-items-center">
          <img
            src={logo}
            alt="auth-login-cover"
            className="my-5 auth-illustration w-100 h-100 "
            data-app-light-img="illustrations/auth-login-illustration-light.png"
            data-app-dark-img="illustrations/auth-login-illustration-dark.html"
          />
          <img
            src={image_light}
            alt="auth-login-cover"
            className="platform-bg  position-absolute bottom-0"
            data-app-light-img="illustrations/bg-shape-image-light.png"
            data-app-dark-img="illustrations/bg-shape-image-dark.html"
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

          <form
            id="formAuthentication"
            className="mb-6"
            action="https://demos.pixinvent.com/vuexy-html-admin-template/html/vertical-menu-template/index.html"
            method="GET"
          >
            <div className="mb-6">
              <label htmlFor="email" className="form-label">
                Email or Username
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email-username"
                placeholder="Enter your email or username"
                autoFocus
              />
            </div>
            <div className="mb-6 form-password-toggle">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <div className="input-group input-group-merge">
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  name="password"
                  placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                  aria-describedby="password"
                />
                <span className="input-group-text cursor-pointer">
                  <i className="ti ti-eye-off"></i>
                </span>
              </div>
            </div>
            <div className="my-8">
              <div className="d-flex justify-content-between">
                <div className="form-check mb-0 ms-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="remember-me"
                  />
                  <label className="form-check-label" htmlFor="remember-me">
                    Remember Me
                  </label>
                </div>
                <a href="auth-forgot-password-cover.html">
                  <Link to="/forget-password" className="mb-0">Forgot Password?</Link>
                </a>
              </div>
            </div>
            <button className="btn btn-primary d-grid w-100">Sign in</button>
          </form>

          <p className="text-center">
            <span>New on our platform?</span>
            <a href="auth-register-cover.html">
              <Link to="/register">Create an account</Link>
            </a>
          </p>

          
        </div>
      </div>
      {/* End Login Section */}
    </div>
    </div>
  );
};

export default Login;
