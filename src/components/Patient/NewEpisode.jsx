import { useState, useEffect } from "react";
import { format } from "date-fns";
import { showToast } from "./../../utils/Toastify";
import {
  useGetEpisodeByIdQuery,
  useGetEpisodeByPatientIdQuery,
  useCreateEpisodeMutation,
} from "../../Redux/api/EpisodeApi";
const NewEpisode = ({
  patientFirstName,
  patientLastName,
  startOfCareDate,
  primaryInsurance,
  secondaryInsurance,
  patientPhysician,
  allPatientPhysician,
  patientId,
}) => {
  const lastEpisodeEndDate = new Date();
  const [episodeStartDate, setEpisodeStartDate] = useState("");
  const [episodeEndDate, setEpisodeEndDate] = useState("");
  const [caseManager, setCaseManager] = useState("");
  const [visitAuthRequired, setVisitAuthRequired] = useState(false);
  const [primaryPhysician, setPrimaryPhysician] = useState("");
  const [primaryInsuranceState, setPrimaryInsurance] = useState("");
  const [secondaryInsuranceState, setSecondaryInsurance] = useState("");
  const [comments, setComments] = useState("");
  const [createEpisode, { data, isSuccess, error }] =
    useCreateEpisodeMutation();
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const newEpisode = {
      episodeStartDate,
      episodeEndDate,
      caseManager,
      visitAuthRequired,
      primaryPhysician,
      primaryInsurance: primaryInsuranceState,
      secondaryInsurance: secondaryInsuranceState,
      comments,
      patientId,
    };
    createEpisode(newEpisode);
    // console.log("Episode saved:", newEpisode);
    // // Add your save logic here (e.g., send data to the server)
  };

  const handleCancel = () => {
    // Add your cancel logic here (e.g., clear form or navigate away)
    console.log("Episode creation canceled.");
  };
  useEffect(() => {
    if (error) {
      showToast("error", error?.data?.message);
    }
    if (isSuccess) {
      showToast("success", data?.message);
      setEpisodeStartDate("");
      setEpisodeEndDate("");
      setCaseManager("");
      setVisitAuthRequired("");
      setPrimaryPhysician("");
      setPrimaryInsurance("");
      setSecondaryInsurance("");
    }
  }, [error, isSuccess, data]);
  return (
    <div className="container mt-4">
      <form onSubmit={handleOnSubmit} className="row">
        <div className="mb-3 col-md-6">
          <label className="form-label">Patient:</label>
          <div>
            {patientFirstName} {patientLastName}
          </div>
        </div>
        <div className="mb-3 col-md-6">
          <label className="form-label">Start of Care Date:</label>
          <div>{startOfCareDate}</div>
        </div>
        <div className="mb-3 col-md-6">
          <label className="form-label">Tip: Last Episode End Date is:</label>
          <div>{format(lastEpisodeEndDate, "MM/dd/yyyy")}</div>
        </div>
        <div className="mb-3 col-md-6">
          <label className="form-label">Episode Start Date:</label>
          <input
            type="date"
            className="form-control"
            value={episodeStartDate}
            onChange={(e) => setEpisodeStartDate(e.target.value)}
          />
        </div>
        <div className="mb-3 col-md-6">
          <label className="form-label">Episode End Date:</label>
          <input
            type="date"
            className="form-control"
            value={episodeEndDate}
            onChange={(e) => setEpisodeEndDate(e.target.value)}
          />
        </div>
        <div className="mb-3 col-md-6">
          <label className="form-label">Case Manager:</label>
          <input
            type="text"
            className="form-control"
            value={caseManager}
            onChange={(e) => setCaseManager(e.target.value)}
          />
        </div>
        <div className="mb-3 col-md-6">
          <label className="form-label">Visit Authorization Required:</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="visitAuthYes"
                name="visitAuthRequired"
                value="Yes"
                className="form-check-input"
                checked={visitAuthRequired === true}
                onChange={() => setVisitAuthRequired(true)}
              />
              <label className="form-check-label" htmlFor="visitAuthYes">
                Yes
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="visitAuthNo"
                name="visitAuthRequired"
                value="No"
                className="form-check-input"
                checked={visitAuthRequired === false}
                onChange={() => setVisitAuthRequired(false)}
              />
              <label className="form-check-label" htmlFor="visitAuthNo">
                No
              </label>
            </div>
          </div>
        </div>
        <div className="mb-3 col-md-6">
          <label className="form-label">Primary Physician:</label>
          <select
            onChange={(e) => setPrimaryPhysician(e.target.value)}
            value={primaryPhysician}
            className="form-select mb-3"
            name="primaryPhysician"
            id=""
          >
            <optgroup label="Patient own physician">
              <option value={patientPhysician?.payload?.physician?._id}>
                {patientPhysician?.payload?.physician?.firstName}
              </option>
            </optgroup>
            <optgroup label="Other physicians">
              {allPatientPhysician?.payload?.physicians?.length > 0 &&
                allPatientPhysician?.payload?.physicians.map((item, index) => {
                  return (
                    <option key={index} value={item?._id}>
                      {item?.firstName}
                    </option>
                  );
                })}
            </optgroup>
          </select>
        </div>
        <div className="mb-3 col-md-6">
          <label className="form-label">Primary Insurance:</label>
          <select
            className="form-select"
            value={primaryInsuranceState}
            onChange={(e) => setPrimaryInsurance(e.target.value)}
          >
            <option value="">-- Select Insurance --</option>
            <option value={primaryInsurance}>{primaryInsurance}</option>

            {/* Add more options as needed */}
          </select>
        </div>
        <div className="mb-3 col-md-6">
          <label className="form-label">Secondary Insurance:</label>
          <select
            className="form-select"
            value={secondaryInsuranceState}
            onChange={(e) => setSecondaryInsurance(e.target.value)}
          >
            <option value="">-- Select Insurance --</option>
            <option value={secondaryInsurance}>{secondaryInsurance}</option>

            {/* Add more options as needed */}
          </select>
        </div>
        <div className="mb-3 col-md-12">
          <label className="form-label">Comments (Blue Sticky Note):</label>
          <textarea
            className="form-control"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3 d-flex gap-2">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        
        </div>
      </form>
    </div>
  );
};

export default NewEpisode;
