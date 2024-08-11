import bannarImg from "../../assets/img/pages/profile-banner.png";
import avater from "../../assets/img/avatars/1.png";
import MainLoader from "../../utils/Loaders/MainLoader";
import moment from "moment";
import { useGetPatientByIdQuery } from "../../Redux/api/PatientApi";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useGetContactByPatientIdQuery } from "../../Redux/api/Contact";
import { useEffect } from "react";

const PatientProfile = () => {

  const navigate = useNavigate();
  const params = useParams();

  const { data, isLoading } = useGetPatientByIdQuery(params?.id);
  const { data: patientContact } = useGetContactByPatientIdQuery(params?.id);

  console.log(patientContact);

  const { patientFirstName, patientLastName, npi, county, createdAt } =
    data?.payload || {};

  useEffect(() => {
    if (!data) {
      navigate("/*");
    }
  });

  return (
    <>
      {isLoading ? (
        <MainLoader />
      ) : (
        <>
          <div className="row">
            <div className="col-12">
              <div className="card mb-6">
                <div className="user-profile-header-banner">
                  <img
                    style={{
                      width: "100%",
                      height: "245px",
                      objectFit: "cover",
                    }}
                    src={bannarImg}
                    alt="Banner image"
                    className="rounded-top"
                  />
                </div>
                <div className="user-profile-header d-flex flex-column flex-lg-row text-sm-start text-center mb-5">
                  <div className="flex-shrink-0 border-2 mt-n2 mx-sm-0 mx-auto">
                    <img
                      src={avater}
                      alt="user image"
                      className="d-block h-auto ms-0 ms-sm-6 rounded user-profile-img"
                    />
                  </div>
                  <div className="flex-grow-1 mt-3 mt-lg-5">
                    <div className="d-flex align-items-md-end align-items-sm-start align-items-center justify-content-md-between justify-content-start mx-5 flex-md-row flex-column gap-4">
                      <div className="user-profile-info">
                        <h4 className="mb-2 mt-lg-6">
                          {patientFirstName} {patientLastName}
                        </h4>
                        <ul className="list-inline mb-0 d-flex align-items-center flex-wrap justify-content-sm-start justify-content-center gap-4 my-2">
                          <li className="list-inline-item d-flex gap-2 align-items-center">
                            {/* <i className="ti ti-palette ti-lg" /> */}

                            <span className="fw-medium">NPI : {npi}</span>
                          </li>
                          <li className="list-inline-item d-flex gap-2 align-items-center">
                            <i className="ti ti-map-pin ti-lg" />
                            <span className="fw-medium">{county}</span>
                          </li>
                          <li className="list-inline-item d-flex gap-2 align-items-center">
                            <i className="ti ti-calendar ti-lg" />
                            <span className="fw-medium">
                              {" "}
                              {moment(createdAt).format("LL")}
                            </span>
                          </li>
                        </ul>
                      </div>
                      <a
                        href="javascript:void(0)"
                        className="btn btn-primary mb-1"
                      >
                        <i className="ti ti-user-check ti-xs me-2" />
                        Paitent Profile
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="nav-align-top">
                <ul className="nav nav-pills flex-column flex-sm-row mb-6 gap-2 gap-lg-0">
                  <li className="nav-item">
                    <a className="nav-link active" href="javascript:void(0);">
                      <i className="ti-sm ti ti-user-check me-1_5" /> Profile
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="pages-profile-teams.html">
                      <i className="ti-sm ti ti-users me-1_5" /> Teams
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="pages-profile-projects.html">
                      <i className="ti-sm ti ti-layout-grid me-1_5" /> Projects
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="pages-profile-connections.html"
                    >
                      <i className="ti-sm ti ti-link me-1_5" /> Connections
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

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
                      <span className="fw-medium mx-2">Role:</span>{" "}
                      {/* <span>{role}</span> */}
                    </li>
                    <li className="d-flex align-items-center mb-4">
                      <i className="ti ti-flag ti-lg" />
                      <span className="fw-medium mx-2">County:</span>{" "}
                      {/* <span>{county ?? county}</span> */}
                    </li>
                    <li className="d-flex align-items-center mb-2">
                      <i className="ti ti-language ti-lg" />
                      <span className="fw-medium mx-2">Languages:</span>{" "}
                      <span>English</span>
                    </li>
                  </ul>
                  <small className="card-text text-uppercase text-muted small">
                    Contacts
                  </small>
                  <ul className="list-unstyled my-3 py-1">
                    <li className="d-flex align-items-center mb-4">
                      <i className="ti ti-phone-call ti-lg" />
                      <span className="fw-medium mx-2">Contact:</span>{" "}
                      {/* <span>{phone}</span> */}
                    </li>
                    <li className="d-flex align-items-center mb-4">
                      <i className="ti ti-messages ti-lg" />
                      <span className="fw-medium mx-2">Skype:</span>{" "}
                      <span>{""}</span>
                    </li>
                    <li className="d-flex align-items-center mb-4">
                      <i className="ti ti-mail ti-lg" />
                      <span className="fw-medium mx-2">Email:</span>{" "}
                      {/* <span>{email}</span> */}
                    </li>
                  </ul>
                  <small className="card-text text-uppercase text-muted small">
                    Teams
                  </small>
                  <ul className="list-unstyled mb-0 mt-3 pt-1">
                    <li className="d-flex flex-wrap mb-4">
                      <span className="fw-medium me-2">Backend Developer</span>
                      {/* <span>(126 Members)</span> */}
                    </li>
                    <li className="d-flex flex-wrap">
                      <span className="fw-medium me-2">React Developer</span>
                      {/* <span>(98 Members)</span> */}
                    </li>
                  </ul>
                </div>
              </div>
              {/*/ About User */}
              {/* Profile Overview */}
              <div className="card mb-6">
                <div className="card-body">
                  <small className="card-text text-uppercase text-muted small">
                    Overview
                  </small>
                  <ul className="list-unstyled mb-0 mt-3 pt-1">
                    <li className="d-flex align-items-end mb-4">
                      <i className="ti ti-check ti-lg" />
                      <span className="fw-medium mx-2">
                        Task Compiled:
                      </span>{" "}
                      <span>13.5k</span>
                    </li>
                    <li className="d-flex align-items-end mb-4">
                      <i className="ti ti-layout-grid ti-lg" />
                      <span className="fw-medium mx-2">
                        Projects Compiled:
                      </span>{" "}
                      <span>146</span>
                    </li>
                    <li className="d-flex align-items-end">
                      <i className="ti ti-users ti-lg" />
                      <span className="fw-medium mx-2">Connections:</span>{" "}
                      <span>897</span>
                    </li>
                  </ul>
                </div>
              </div>
              {/*/ Profile Overview */}
            </div>
            <div className="col-xl-8 col-lg-7 col-md-7">
              {/* Activity Timeline */}
              <div className="card card-action mb-6">
                <div className="card-header align-items-center">
                  <h5 className="card-action-title mb-0">
                    <i className="ti ti-chart-bar ti-lg text-body me-4" />
                    Activity Timeline
                  </h5>
                </div>
                <div className="card-body pt-3">
                  <ul className="timeline mb-0">
                    <li className="timeline-item timeline-item-transparent">
                      <span className="timeline-point timeline-point-primary" />
                      <div className="timeline-event">
                        <div className="timeline-header mb-3">
                          <h6 className="mb-0">12 Invoices have been paid</h6>
                          <small className="text-muted">12 min ago</small>
                        </div>
                        <p className="mb-2">
                          Invoices have been paid to the company
                        </p>
                        <div className="d-flex align-items-center mb-2">
                          <div className="badge bg-lighter rounded d-flex align-items-center">
                            <img
                              src="../../assets/img/icons/misc/pdf.png"
                              alt="img"
                              width={15}
                              className="me-2"
                            />
                            <span className="h6 mb-0 text-body">
                              invoices.pdf
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="timeline-item timeline-item-transparent">
                      <span className="timeline-point timeline-point-success" />
                      <div className="timeline-event">
                        <div className="timeline-header mb-3">
                          <h6 className="mb-0">Client Meeting</h6>
                          <small className="text-muted">45 min ago</small>
                        </div>
                        <p className="mb-2">
                          Project meeting with john @10:15am
                        </p>
                        <div className="d-flex justify-content-between flex-wrap gap-2 mb-2">
                          <div className="d-flex flex-wrap align-items-center mb-50">
                            <div className="avatar avatar-sm me-3">
                              <img
                                src="../../assets/img/avatars/1.png"
                                alt="Avatar"
                                className="rounded-circle"
                              />
                            </div>
                            <div>
                              <p className="mb-0 small fw-medium">
                                Lester McCarthy (Client)
                              </p>
                              <small>CEO of Pixinvent</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="timeline-item timeline-item-transparent">
                      <span className="timeline-point timeline-point-info" />
                      <div className="timeline-event">
                        <div className="timeline-header mb-3">
                          <h6 className="mb-0">
                            Create a new project for client
                          </h6>
                          <small className="text-muted">2 Day Ago</small>
                        </div>
                        <p className="mb-2">6 team members in a project</p>
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap border-top-0 p-0">
                            <div className="d-flex flex-wrap align-items-center">
                              <ul className="list-unstyled users-list d-flex align-items-center avatar-group m-0 me-2">
                                <li
                                  data-bs-toggle="tooltip"
                                  data-popup="tooltip-custom"
                                  data-bs-placement="top"
                                  title="Vinnie Mostowy"
                                  className="avatar pull-up"
                                >
                                  <img
                                    className="rounded-circle"
                                    src="../../assets/img/avatars/1.png"
                                    alt="Avatar"
                                  />
                                </li>
                                <li
                                  data-bs-toggle="tooltip"
                                  data-popup="tooltip-custom"
                                  data-bs-placement="top"
                                  title="Allen Rieske"
                                  className="avatar pull-up"
                                >
                                  <img
                                    className="rounded-circle"
                                    src="../../assets/img/avatars/4.png"
                                    alt="Avatar"
                                  />
                                </li>
                                <li
                                  data-bs-toggle="tooltip"
                                  data-popup="tooltip-custom"
                                  data-bs-placement="top"
                                  title="Julee Rossignol"
                                  className="avatar pull-up"
                                >
                                  <img
                                    className="rounded-circle"
                                    src="../../assets/img/avatars/2.png"
                                    alt="Avatar"
                                  />
                                </li>
                                <li className="avatar">
                                  <span
                                    className="avatar-initial rounded-circle pull-up text-heading"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="bottom"
                                    title="3 more"
                                  >
                                    +3
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              {/*/ Activity Timeline */}
              <div className="row">
                {/* Connections */}
                <div className="col-lg-12 col-xl-6">
                  <div className="card card-action mb-6">
                    <div className="card-header align-items-center">
                      <h5 className="card-action-title mb-0">Connections</h5>
                      <div className="card-action-element">
                        <div className="dropdown">
                          <button
                            type="button"
                            className="btn btn-icon btn-text-secondary rounded-pill dropdown-toggle hide-arrow p-0 text-muted"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="ti ti-dots-vertical ti-md text-muted" />
                          </button>
                          <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                              <a
                                className="dropdown-item"
                                href="javascript:void(0);"
                              >
                                Share connections
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="javascript:void(0);"
                              >
                                Suggest edits
                              </a>
                            </li>
                            <li>
                              <hr className="dropdown-divider" />
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="javascript:void(0);"
                              >
                                Report bug
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <ul className="list-unstyled mb-0">
                        <li className="mb-4">
                          <div className="d-flex align-items-center">
                            <div className="d-flex align-items-center">
                              <div className="avatar me-2">
                                <img
                                  src="../../assets/img/avatars/2.png"
                                  alt="Avatar"
                                  className="rounded-circle"
                                />
                              </div>
                              <div className="me-2">
                                <h6 className="mb-0">Cecilia Payne</h6>
                                <small>45 Connections</small>
                              </div>
                            </div>
                            <div className="ms-auto">
                              <button className="btn btn-label-primary btn-icon">
                                <i className="ti ti-user-check ti-md" />
                              </button>
                            </div>
                          </div>
                        </li>
                        <li className="mb-4">
                          <div className="d-flex align-items-center">
                            <div className="d-flex align-items-center">
                              <div className="avatar me-2">
                                <img
                                  src="../../assets/img/avatars/3.png"
                                  alt="Avatar"
                                  className="rounded-circle"
                                />
                              </div>
                              <div className="me-2">
                                <h6 className="mb-0">Curtis Fletcher</h6>
                                <small>1.32k Connections</small>
                              </div>
                            </div>
                            <div className="ms-auto">
                              <button className="btn btn-primary btn-icon">
                                <i className="ti ti-user-x ti-md" />
                              </button>
                            </div>
                          </div>
                        </li>
                        <li className="mb-4">
                          <div className="d-flex align-items-center">
                            <div className="d-flex align-items-center">
                              <div className="avatar me-2">
                                <img
                                  src="../../assets/img/avatars/10.png"
                                  alt="Avatar"
                                  className="rounded-circle"
                                />
                              </div>
                              <div className="me-2">
                                <h6 className="mb-0">Alice Stone</h6>
                                <small>125 Connections</small>
                              </div>
                            </div>
                            <div className="ms-auto">
                              <button className="btn btn-primary btn-icon">
                                <i className="ti ti-user-x ti-md" />
                              </button>
                            </div>
                          </div>
                        </li>
                        <li className="mb-4">
                          <div className="d-flex align-items-center">
                            <div className="d-flex align-items-center">
                              <div className="avatar me-2">
                                <img
                                  src="../../assets/img/avatars/7.png"
                                  alt="Avatar"
                                  className="rounded-circle"
                                />
                              </div>
                              <div className="me-2">
                                <h6 className="mb-0">Darrell Barnes</h6>
                                <small>456 Connections</small>
                              </div>
                            </div>
                            <div className="ms-auto">
                              <button className="btn btn-label-primary btn-icon">
                                <i className="ti ti-user-check ti-md" />
                              </button>
                            </div>
                          </div>
                        </li>
                        <li className="mb-6">
                          <div className="d-flex align-items-center">
                            <div className="d-flex align-items-center">
                              <div className="avatar me-2">
                                <img
                                  src="../../assets/img/avatars/12.png"
                                  alt="Avatar"
                                  className="rounded-circle"
                                />
                              </div>
                              <div className="me-2">
                                <h6 className="mb-0">Eugenia Moore</h6>
                                <small>1.2k Connections</small>
                              </div>
                            </div>
                            <div className="ms-auto">
                              <button className="btn btn-label-primary btn-icon">
                                <i className="ti ti-user-check ti-md" />
                              </button>
                            </div>
                          </div>
                        </li>
                        <li className="text-center">
                          <a href="javascript:;">View all connections</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/*/ Connections */}
                {/* Teams */}
                <div className="col-lg-12 col-xl-6">
                  <div className="card card-action mb-6">
                    <div className="card-header align-items-center">
                      <h5 className="card-action-title mb-0">Teams</h5>
                      <div className="card-action-element">
                        <div className="dropdown">
                          <button
                            type="button"
                            className="btn btn-icon btn-text-secondary dropdown-toggle hide-arrow p-0"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="ti ti-dots-vertical text-muted" />
                          </button>
                          <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                              <a
                                className="dropdown-item"
                                href="javascript:void(0);"
                              >
                                Share teams
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="javascript:void(0);"
                              >
                                Suggest edits
                              </a>
                            </li>
                            <li>
                              <hr className="dropdown-divider" />
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="javascript:void(0);"
                              >
                                Report bug
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <ul className="list-unstyled mb-0">
                        <li className="mb-4">
                          <div className="d-flex align-items-center">
                            <div className="d-flex align-items-center">
                              <div className="avatar me-2">
                                <img
                                  src="../../assets/img/icons/brands/react-label.png"
                                  alt="Avatar"
                                  className="rounded-circle"
                                />
                              </div>
                              <div className="me-2">
                                <h6 className="mb-0">React Developers</h6>
                                <small>72 Members</small>
                              </div>
                            </div>
                            <div className="ms-auto">
                              <a href="javascript:;">
                                <span className="badge bg-label-danger">
                                  Developer
                                </span>
                              </a>
                            </div>
                          </div>
                        </li>
                        <li className="mb-4">
                          <div className="d-flex align-items-center">
                            <div className="d-flex align-items-center">
                              <div className="avatar me-2">
                                <img
                                  src="../../assets/img/icons/brands/support-label.png"
                                  alt="Avatar"
                                  className="rounded-circle"
                                />
                              </div>
                              <div className="me-2">
                                <h6 className="mb-0">Support Team</h6>
                                <small>122 Members</small>
                              </div>
                            </div>
                            <div className="ms-auto">
                              <a href="javascript:;">
                                <span className="badge bg-label-primary">
                                  Support
                                </span>
                              </a>
                            </div>
                          </div>
                        </li>
                        <li className="mb-4">
                          <div className="d-flex align-items-center">
                            <div className="d-flex align-items-center">
                              <div className="avatar me-2">
                                <img
                                  src="../../assets/img/icons/brands/figma-label.png"
                                  alt="Avatar"
                                  className="rounded-circle"
                                />
                              </div>
                              <div className="me-2">
                                <h6 className="mb-0">UI Designers</h6>
                                <small>7 Members</small>
                              </div>
                            </div>
                            <div className="ms-auto">
                              <a href="javascript:;">
                                <span className="badge bg-label-info">
                                  Designer
                                </span>
                              </a>
                            </div>
                          </div>
                        </li>
                        <li className="mb-4">
                          <div className="d-flex align-items-center">
                            <div className="d-flex align-items-center">
                              <div className="avatar me-2">
                                <img
                                  src="../../assets/img/icons/brands/vue-label.png"
                                  alt="Avatar"
                                  className="rounded-circle"
                                />
                              </div>
                              <div className="me-2">
                                <h6 className="mb-0">Vue.js Developers</h6>
                                <small>289 Members</small>
                              </div>
                            </div>
                            <div className="ms-auto">
                              <a href="javascript:;">
                                <span className="badge bg-label-danger">
                                  Developer
                                </span>
                              </a>
                            </div>
                          </div>
                        </li>
                        <li className="mb-6">
                          <div className="d-flex align-items-center">
                            <div className="d-flex align-items-center">
                              <div className="avatar me-2">
                                <img
                                  src="../../assets/img/icons/brands/twitter-label.png"
                                  alt="Avatar"
                                  className="rounded-circle"
                                />
                              </div>
                              <div className="me-w">
                                <h6 className="mb-0">Digital Marketing</h6>
                                <small>24 Members</small>
                              </div>
                            </div>
                            <div className="ms-auto">
                              <a href="javascript:;">
                                <span className="badge bg-label-secondary">
                                  Marketing
                                </span>
                              </a>
                            </div>
                          </div>
                        </li>
                        <li className="text-center">
                          <a href="javascript:;">View all teams</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/*/ Teams */}
              </div>
              {/* Projects table */}
              <div className="card mb-4">
                <div className="card-datatable table-responsive">
                  <table className="datatables-projects table border-top">
                    <thead>
                      <tr>
                        <th />
                        <th />
                        <th>Project</th>
                        <th>Leader</th>
                        <th>Team</th>
                        <th className="w-px-200">Progress</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
              {/*/ Projects table */}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PatientProfile;
