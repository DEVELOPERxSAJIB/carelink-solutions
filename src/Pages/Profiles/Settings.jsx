import { useState } from "react";

const Settings = () => {
  const [show, setShow] = useState({
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const handleShowOldPassword = () => {
    setShow({ ...show, oldPassword: !show.oldPassword });
  };
  const handleShowNewPassword = () => {
    setShow({ ...show, newPassword: !show.newPassword });
  };
  const handleShowConfirmNewPassword = () => {
    setShow({ ...show, confirmNewPassword: !show.confirmNewPassword });
  };

  // get form data
  const [input, setInput] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // replace name with value
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // submit form
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = {
      oldPassword: input.oldPassword,
      newPassword: input.newPassword,
      confirmNewPassword: input.confirmNewPassword,
    };

    console.log(data);
  };

  const [activeTab, setActiveTab] = useState("pills-account");

  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="py-3 mb-4">
          <span className="text-muted fw-light">Account Settings /</span>
          {activeTab === "pills-account" && " Account"}
          {activeTab === "pills-security" && " Security"}
        </h4>
        <div className="row">
          <div className="col-md-12">
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="pills-account-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-account"
                  type="button"
                  role="tab"
                  aria-controls="pills-account"
                  aria-selected={activeTab === "pills-account" ? true : false}
                  onClick={() => setActiveTab("pills-account")}
                >
                  <i className="ti ti-user-check ti-xs me-1" />
                  Account
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-security-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-security"
                  type="button"
                  role="tab"
                  aria-controls="pills-security"
                  aria-selected={activeTab === "pills-security" ? true : false}
                  onClick={() => setActiveTab("pills-security")}
                >
                  <i className="ti ti-lock ti-xs me-1" />
                  Security
                </button>
              </li>
            </ul>

            {/* Tab Data */}
            <div className="tab-content" id="pills-tabContent">
              {/* First Tab */}
              <div
                className={`tab-pane fade ${
                  activeTab === "pills-account" ? "show active" : ""
                }`}
                id="pills-accoutn"
                role="tabpanel"
                aria-labelledby="pills-accoutn-tab"
              >
                {/* Update */}

                <div className="card mb-4">
                  <h5 className="card-header">Profile Details</h5>

                  <div className="card-body">
                    <div className="d-flex align-items-start align-items-sm-center gap-4">
                      <img
                        src={
                          "https://static.vecteezy.com/system/resources/previews/007/069/364/original/3d-user-icon-in-a-minimalistic-style-user-symbol-for-your-website-design-logo-app-ui-vector.jpg"
                        }
                        alt="user-avatar"
                        className="d-block w-px-100 h-px-100 rounded"
                        id="uploadedAvatar"
                        style={{ objectFit: "cover" }}
                      />

                      <div className="button-wrapper">
                        <label
                          htmlFor="upload"
                          className="btn btn-primary me-2 mb-3"
                          tabIndex={0}
                        >
                          <span className="d-none d-sm-block">
                            Upload new photo
                          </span>
                          <i className="ti ti-upload d-block d-sm-none" />
                          <input
                            type="file"
                            id="upload"
                            className="account-file-input"
                            hidden
                          />
                        </label>
                        <button
                          type="button"
                          className="btn btn-label-secondary account-image-reset mb-3"
                        >
                          <i className="ti ti-refresh-dot d-block d-sm-none" />
                          <span className="d-none d-sm-block">Reset</span>
                        </button>
                        <div className="text-muted">
                          Allowed JPG, GIF or PNG. Max size of 800K
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr className="my-0" />

                  <div className="card-body">
                    <form onSubmit={handleFormSubmit}>
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label htmlFor="firstName" className="form-label">
                            Name
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="firstName"
                            placeholder="Enter your name"
                            name="name"
                            value={input.name}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label htmlFor="email" className="form-label">
                            E-mail
                          </label>
                          <input
                            disabled
                            className="form-control"
                            type="text"
                            id="email"
                            placeholder="Enter your e-mail address"
                            name="email"
                            value={input.email}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label htmlFor="organization" className="form-label">
                            Phone
                          </label>
                          <input
                            type="text"
                            id="organization"
                            className="form-control"
                            placeholder="Enter you mobie number"
                            name="mobile"
                            value={input.mobile}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label htmlFor="organization" className="form-label">
                            Gender
                          </label>
                          <select
                            id="organization"
                            className="select2 form-select"
                            name="gender"
                            value={input.gender}
                            onChange={handleInputChange}
                          >
                            <option disabled value="undifined">
                              undifined
                            </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Others</option>
                          </select>
                        </div>
                        <div className="mb-3 col-md-6">
                          <label htmlFor="street" className="form-label">
                            Street
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="street"
                            placeholder="Enter your address"
                            name="street"
                            value={input.street}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label htmlFor="state" className="form-label">
                            City
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="state"
                            placeholder="Enter your city"
                            name="city"
                            value={input.city}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label htmlFor="zipCode" className="form-label">
                            Zip Code
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="zipCode"
                            name="postalCode"
                            value={input.postalCode}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label className="form-label" htmlFor="country">
                            Country
                          </label>

                          <select
                            className="select2 form-select"
                            name="country"
                            id="country"
                            value={input.country}
                            onChange={handleInputChange}
                          >
                            <option disabled value={""}>
                              - select a country -
                            </option>
                            {/* {countriesList.map((data) => {
                    return (
                      <>
                        <option key={data.name} value={data.name}>
                          {data.name}
                        </option>
                      </>
                    );
                  })} */}
                          </select>
                        </div>
                      </div>
                      <div className="mt-2">
                        <button type="submit" className="btn btn-primary me-2">
                          Save changes
                        </button>
                        <button className="btn btn-label-secondary">
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

              </div>

              {/* Second Tab */}
              <div
                className={`tab-pane fade ${
                  activeTab === "pills-security" ? "show active" : ""
                }`}
                id="pills-security"
                role="tabpanel"
                aria-labelledby="pills-security-tab"
              >
                <div className="row">
                  <div className="col-md-12">
                    {/* Change Password */}
                    <div className="card mb-4">
                      <h5 className="card-header">Change Password</h5>
                      <div className="card-body">
                        <form onSubmit={handleFormSubmit}>
                          <div className="row">
                            <div className="mb-3 col-md-6 form-password-toggle">
                              <label
                                className="form-label"
                                htmlFor="currentPassword"
                              >
                                Current Password
                              </label>
                              <div className="input-group input-group-merge">
                                <input
                                  className="form-control"
                                  type={show.oldPassword ? "text" : "password"}
                                  id="currentPassword"
                                  placeholder="············"
                                  name="oldPassword"
                                  value={input.oldPassword}
                                  onChange={handleInputChange}
                                />
                                <span
                                  onClick={handleShowOldPassword}
                                  className="input-group-text cursor-pointer"
                                >
                                  {show.oldPassword ? (
                                    <i className="ti ti-eye" />
                                  ) : (
                                    <i className="ti ti-eye-off" />
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="mb-3 col-md-6 form-password-toggle">
                              <label
                                className="form-label"
                                htmlFor="newPassword"
                              >
                                New Password
                              </label>
                              <div className="input-group input-group-merge">
                                <input
                                  className="form-control"
                                  type={show.newPassword ? "text" : "password"}
                                  id="newPassword"
                                  placeholder="············"
                                  name="newPassword"
                                  value={input.newPassword}
                                  onChange={handleInputChange}
                                />
                                <span
                                  onClick={handleShowNewPassword}
                                  className="input-group-text cursor-pointer"
                                >
                                  {show.newPassword ? (
                                    <i className="ti ti-eye" />
                                  ) : (
                                    <i className="ti ti-eye-off" />
                                  )}
                                </span>
                              </div>
                            </div>
                            <div className="mb-3 col-md-6 form-password-toggle">
                              <label
                                className="form-label"
                                htmlFor="confirmPassword"
                              >
                                Confirm New Password
                              </label>
                              <div className="input-group input-group-merge">
                                <input
                                  className="form-control"
                                  type={
                                    show.confirmNewPassword
                                      ? "text"
                                      : "password"
                                  }
                                  id="confirmPassword"
                                  placeholder="············"
                                  name="confirmNewPassword"
                                  value={input.confirmNewPassword}
                                  onChange={handleInputChange}
                                />
                                <span
                                  onClick={handleShowConfirmNewPassword}
                                  className="input-group-text cursor-pointer"
                                >
                                  {show.confirmNewPassword ? (
                                    <i className="ti ti-eye" />
                                  ) : (
                                    <i className="ti ti-eye-off" />
                                  )}
                                </span>
                              </div>
                            </div>
                            <div className="col-12 mb-4">
                              <h6>Password Requirements:</h6>
                              <ul className="ps-3 mb-0">
                                <li className="mb-1">
                                  Minimum 8 characters long - the more, the
                                  better
                                </li>
                                <li className="mb-1">
                                  At least one lowercase character
                                </li>
                                <li>
                                  At least one number, symbol, or whitespace
                                  character
                                </li>
                              </ul>
                            </div>
                            <div>
                              <button
                                type="submit"
                                className="btn btn-primary me-2"
                              >
                                Save changes
                              </button>
                              <button
                                type="reset"
                                className="btn btn-label-secondary"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    {/*/ Change Password */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
