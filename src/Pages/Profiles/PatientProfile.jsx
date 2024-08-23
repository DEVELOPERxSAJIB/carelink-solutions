import bannarImg from "../../assets/img/pages/profile-banner.png";
import avater from "../../assets/img/avatars/1.png";
import MainLoader from "../../utils/Loaders/MainLoader";
import moment from "moment";
import { useGetPatientByIdQuery } from "../../Redux/api/PatientApi";
import { useNavigate, useParams } from "react-router-dom";
import { useGetContactByPatientIdQuery } from "../../Redux/api/Contact";
import { useGetPayerByPatientIdQuery } from "../../Redux/api/PayerApi";
import {
  useGetPhysicianByPatientIdQuery,
  useGetAllPhysiciansQuery,
} from "../../Redux/api/PhysicianApi";
import { useEffect, useState } from "react";
import SinglePatient from "../Patient/SinglePatient";
import ProfileDetails from "../../components/Patient/ProfileDetails";
import ScheduleActivity from "./../../components/Patient/ScheduleActivity";
import VisitComments from "./../../components/Patient/VisitComments";
import EpisodeComments from "./../../components/Patient/EpisodeComments";
import MissedReturned from "./../../components/Patient/MissedReturned";

const PatientProfile = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [patientState, setPatientState] = useState("profile");
  const { data, isLoading } = useGetPatientByIdQuery(params?.id);
  const { data: patientContact } = useGetContactByPatientIdQuery(params?.id);
  const { data: patientPayer } = useGetPayerByPatientIdQuery(params?.id);
  const { data: patientPhysician } = useGetPhysicianByPatientIdQuery(
    params?.id
  );
  const { data: allPatientPhysician } = useGetAllPhysiciansQuery(params?.id);
  // patient
  const {
    patientFirstName,
    preferredLanguage,
    patientLastName,
    npi,
    county,
    createdAt,
    startOfCareDate,_id
  } = data?.payload || {};

  // contact
  const { emergencyContacts } = patientContact?.payload?.contact || {};
  const { primaryInsurance, secondaryInsurance } =
    patientPayer?.payload?.payer || {};

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
                      <SinglePatient />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-12 card">
              <div className="nav-align-top">
                <ul className="nav nav-pills flex-column flex-sm-row p-2  gap-2 gap-lg-0">
                  <li
                    onClick={() => setPatientState("profile")}
                    className="nav-item"
                  >
                    <button
                      className={`btn ${
                        patientState === "profile" && "btn-primary"
                      }`}
                    >
                      <i className="ti-sm ti ti-user-check me-1_5" /> Profile
                    </button>
                  </li>
                  <li
                    onClick={() => setPatientState("schedule activity")}
                    className="nav-item"
                  >
                    <button
                      className={`btn ${
                        patientState === "schedule activity" && "btn-primary"
                      }`}
                    >
                      <i className="ti-sm ti ti-users me-1_5" /> Schedule
                      Activity
                    </button>
                  </li>
                  <li
                    onClick={() => setPatientState("visit comments")}
                    className="nav-item"
                  >
                    <button
                      className={`btn ${
                        patientState === "visit comments" && "btn-primary"
                      }`}
                    >
                      <i className="ti-sm ti ti-layout-grid me-1_5" /> Visit
                      Comments
                    </button>
                  </li>
                  <li
                    onClick={() => setPatientState("episode comments")}
                    className="nav-item"
                  >
                    <button
                      className={`btn ${
                        patientState === "episode comments" && "btn-primary"
                      }`}
                    >
                      <i className="ti-sm ti ti-link me-1_5" />
                      Episode Comments
                    </button>
                  </li>
                  <li
                    onClick={() => setPatientState("missed/returned")}
                    className="nav-item"
                  >
                    <button
                      className={`btn ${
                        patientState === "missed/returned" && "btn-primary"
                      }`}
                    >
                      <i className="ti-sm ti ti-link me-1_5" />
                      Missed/returned
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              {patientState === "profile" && (
                <ProfileDetails
                  emergencyContacts={emergencyContacts}
                  patientFirstName={patientFirstName}
                  patientLastName={patientLastName}
                  preferredLanguage={preferredLanguage}
                />
              )}
              {patientState === "schedule activity" && (
                <ScheduleActivity
                patientId={_id}
                  startOfCareDate={startOfCareDate}
                  patientFirstName={patientFirstName}
                  patientLastName={patientLastName}
                  primaryInsurance={primaryInsurance}
                  secondaryInsurance={secondaryInsurance}
                  patientPhysician={patientPhysician}
                  allPatientPhysician={allPatientPhysician}
                />
              )}
              {patientState === "visit comments" && <VisitComments />}
              {patientState === "episode comments" && <EpisodeComments />}
              {patientState === "missed/returned" && <MissedReturned />}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PatientProfile;
