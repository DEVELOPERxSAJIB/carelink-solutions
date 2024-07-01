import React, { useState } from 'react';

const ChangePassword = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showReTypePassword, setShowReTypePassword] = useState(false);

  const togglePasswordVisibility = (setPasswordVisibility) => {
    setPasswordVisibility((prevState) => !prevState);
  };

  return (
    <div className="bs-stepper-content card">
      <form>
        {/* Account Details */}
        <div id="account-details" className="content">
          <div className="card-header mb-4">
            <h6 className="mb-0 fs-4">Change Password</h6>
          </div>
          <div className="row g-6 card-body">
            <div className="col-sm-6 form-password-toggle">
              <label className="form-label" htmlFor="password">
                Old Password
              </label>
              <div className="input-group input-group-merge">
                <input
                  type={showOldPassword ? 'text' : 'password'}
                  id="password"
                  className="form-control"
                  placeholder="old password"
                  aria-describedby="password2"
                />
                <span
                  className="input-group-text cursor-pointer"
                  id="password2"
                  onClick={() => togglePasswordVisibility(setShowOldPassword)}
                >
                  <i className={showOldPassword ? 'ti ti-eye' : 'ti ti-eye-off'} />
                </span>
              </div>
            </div>
            <div className="col-sm-6 form-password-toggle">
              <label className="form-label" htmlFor="new-password">
                New Password
              </label>
              <div className="input-group input-group-merge">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  id="new-password"
                  className="form-control"
                  placeholder="new password"
                  aria-describedby="new-password2"
                />
                <span
                  className="input-group-text cursor-pointer"
                  id="new-password2"
                  onClick={() => togglePasswordVisibility(setShowNewPassword)}
                >
                  <i className={showNewPassword ? 'ti ti-eye' : 'ti ti-eye-off'} />
                </span>
              </div>
            </div>
            <div className="col-sm-6 form-password-toggle">
              <label className="form-label" htmlFor="re-type-password">
                Re Type Password
              </label>
              <div className="input-group input-group-merge">
                <input
                  type={showReTypePassword ? 'text' : 'password'}
                  id="re-type-password"
                  className="form-control"
                  placeholder="re-type password"
                  aria-describedby="re-type-password2"
                />
                <span
                  className="input-group-text cursor-pointer"
                  id="re-type-password2"
                  onClick={() => togglePasswordVisibility(setShowReTypePassword)}
                >
                  <i className={showReTypePassword ? 'ti ti-eye' : 'ti ti-eye-off'} />
                </span>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary waves-effect waves-light mt-3"
            >
              Change Password
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
