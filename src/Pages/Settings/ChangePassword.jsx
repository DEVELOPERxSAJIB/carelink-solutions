import  { useState } from 'react';
import PageHeader from './../../components/FormElement/PageHeader';
import { useUpdatePasswordLoggedMutation } from "../../Redux/api/UserApi";
import useFormValidation from './../../hook/useFormValidation';
import {changePasswordSchema}from "../../utils/validationSchemas"
const ChangePassword = () => {
  const [updatePasswordLogged, {data, isLoading, isSuccess, error }] = useUpdatePasswordLoggedMutation();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showReTypePassword, setShowReTypePassword] = useState(false);

  const togglePasswordVisibility = (setPasswordVisibility) => {
    setPasswordVisibility((prevState) => !prevState);
  };

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };


  const formData = async (data) => {
       updatePasswordLogged( data );
      
    
  };

  const { register, handleSubmit, reset, formState: { errors } } = useFormValidation(initialValues, changePasswordSchema, formData);

  return (
    <div className="bs-stepper-content card">
      <form onSubmit={handleSubmit}>
        {/* Account Details */}
        <div id="account-details" className="content">
          <PageHeader title="Change Password" className="card-header fs-3" />
          <div className="row g-6 card-body">
            <div className="col-sm-6 form-password-toggle">
              <label className="form-label" htmlFor="password">
                Old Password
              </label>
              <div className="input-group input-group-merge">
                <input
                  type={showOldPassword ? 'text' : 'password'}
                  id="oldPassword"
                  {...register('oldPassword')}
                  className={`form-control ${errors.oldPassword ? 'is-invalid' : ''}`}
                  placeholder="Old Password"
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
              {errors.oldPassword && <div className="invalid-feedback">{errors.oldPassword.message}</div>}
            </div>
            <div className="col-sm-6 form-password-toggle">
              <label className="form-label" htmlFor="newPassword">
                New Password
              </label>
              <div className="input-group input-group-merge">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  id="newPassword"
                  {...register('newPassword')}
                  className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`}
                  placeholder="New Password"
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
              {errors.newPassword && <div className="invalid-feedback">{errors.newPassword.message}</div>}
            </div>
            <div className="col-sm-6 form-password-toggle">
              <label className="form-label" htmlFor="confirmNewPassword">
                Confirm New Password
              </label>
              <div className="input-group input-group-merge">
                <input
                  type={showReTypePassword ? 'text' : 'password'}
                  id="confirmNewPassword"
                  {...register('confirmNewPassword')}
                  className={`form-control ${errors.confirmNewPassword ? 'is-invalid' : ''}`}
                  placeholder="Confirm New Password"
                  aria-describedby="confirm-new-password2"
                />
                <span
                  className="input-group-text cursor-pointer"
                  id="confirm-new-password2"
                  onClick={() => togglePasswordVisibility(setShowReTypePassword)}
                >
                  <i className={showReTypePassword ? 'ti ti-eye' : 'ti ti-eye-off'} />
                </span>
              </div>
              {errors.confirmNewPassword && <div className="invalid-feedback">{errors.confirmNewPassword.message}</div>}
            </div>
            {data?.message&&<div className="alert alert-success text-center">{data?.message}</div>}
            {error?.data?.message&&<div className="alert alert-danger text-center">{error?.data?.message}</div>}
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
