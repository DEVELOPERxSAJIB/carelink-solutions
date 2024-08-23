const ProfileDetails = ({emergencyContacts,patientFirstName,
    patientLastName,preferredLanguage }) => {
  return (
    <div>
      {" "}
      <div className="row">
        <div className="col-xl-4 col-lg-5 col-md-5">
          {/* About User */}
          <div className="card mb-6">
            <div className="card-body">
              <small className="card-text text-uppercase text-muted small">
                About
              </small>
              <ul className="list-unstyled my-3 py-1">
                <li className="d-flex align-items-center mb-4">
                  <i className="ti ti-user ti-lg" />
                  <span className="fw-medium mx-2">Full Name:</span>{" "}
                  <span>
                    {patientFirstName} {patientLastName}
                  </span>
                </li>
                <li className="d-flex align-items-center mb-4">
                  <i className="ti ti-check ti-lg" />
                  <span className="fw-medium mx-2">Status:</span>{" "}
                  <span>Active</span>
                </li>
                <li className="d-flex align-items-center mb-4">
                  <i className="ti ti-crown ti-lg" />
                  <span className="fw-medium mx-2">Role:Patient</span>{" "}
                  {/* <span>{role}</span> */}
                </li>
                <li className="d-flex align-items-center mb-4">
                  <i className="ti ti-flag ti-lg" />
                  <span className="fw-medium mx-2">
                    City:{emergencyContacts?.primary?.city}
                  </span>{" "}
                  {/* <span>{county ?? county}</span> */}
                </li>
                <li className="d-flex align-items-center mb-2">
                  <i className="ti ti-language ti-lg" />
                  <span className="fw-medium mx-2">
                    Languages:{preferredLanguage}
                  </span>{" "}
                  <span>English</span>
                </li>
              </ul>
              <small className="card-text text-uppercase text-muted small">
                Contacts
              </small>
              <ul className="list-unstyled my-3 py-1">
                <li className="d-flex align-items-center mb-4">
                  <i className="ti ti-phone-call ti-lg" />
                  <span className="fw-medium mx-2">
                    Contact:{emergencyContacts?.primary?.mobilePhone}
                  </span>{" "}
                  {/* <span>{phone}</span> */}
                </li>
                <li className="d-flex align-items-center mb-4">
                  <i className="ti ti-messages ti-lg" />
                  <span className="fw-medium mx-2">
                    Skype: :{emergencyContacts?.primary?.skype || "N/A"}
                  </span>{" "}
                  <span>{""}</span>
                </li>
                <li className="d-flex align-items-center mb-4">
                  <i className="ti ti-mail ti-lg" />
                  <span className="fw-medium mx-2">
                    Email:{emergencyContacts?.primary?.email || "N/A"}
                  </span>{" "}
                  {/* <span>{email}</span> */}
                </li>
              </ul>
            </div>
          </div>

          {/*/ Profile Overview */}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
