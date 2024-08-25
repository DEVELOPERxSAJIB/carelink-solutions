import { useState, useEffect } from "react";
import Template from "./../../FormElement/Template";
const TenDaySummaryCaseConference = ({ data }) => {
  const [summaryOfCareProvided, setSummaryOfCareProvided] = useState("");
  const [patientCurrentCondition, setPatientCurrentCondition] = useState("");
  const [goals, setGoals] = useState("");
  const [formData, setFormData] = useState({
    dnr: false,
    episode: "",
    homeboundStatus: [],
    patientCondition: [],
    servicesProvided: [],
    vitalSigns: {
      bpSystolic: { lowest: "", highest: "" },
      bpDiastolic: { lowest: "", highest: "" },
      hr: { lowest: "", highest: "" },
      resp: { lowest: "", highest: "" },
      temp: { lowest: "", highest: "" },
      weight: { lowest: "", highest: "" },
      bs: { lowest: "", highest: "" },
      pain: { lowest: "", highest: "" },
    },
    summaryOfCareProvided: "",
    patientCurrentCondition: "",
    goals: "",
    recommendedService: [],
    userId: "",
    sentDate: "",
    electronicSignature: [
      { clinician: "", date: "" },
      { clinician: "", date: "" },
      { clinician: "", date: "" },
    ],
    summarySentToPhysician: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleVitalSignsChange = (e, sign, type) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      vitalSigns: {
        ...formData.vitalSigns,
        [sign]: {
          ...formData.vitalSigns[sign],
          [type]: value,
        },
      },
    });
  };
  const handleElectronicSignatureChange = (index, field, value) => {
    const updatedSignatures = formData.electronicSignature.map((signature, i) =>
      i === index ? { ...signature, [field]: value } : signature
    );
    setFormData({ ...formData, electronicSignature: updatedSignatures });
  };

  console.log(formData);
  const handleArrayChange = (e, name) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      [name]: formData[name].includes(value)
        ? formData[name].filter((item) => item !== value)
        : [...formData[name], value],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
  };
  useEffect(() => {}, []);
  return (
    <div className="card mt-4">
      <div className="card-header">
        <h4 className="text-center mb-4">{data?.visitType}</h4>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {/* Patient Details Section */}
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="episode" className="form-label">
                  Episode Period:
                </label>
                <input
                  type="text"
                  name="episode"
                  className="form-control"
                  id="episode"
                  value={data?.episode}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="primaryDiagnosis" className="form-label">
                  Primary Diagnosis:
                </label>
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="physician" className="form-label">
                  Physician:
                </label>
              </div>
              <div className="mb-3">
                <label className="form-label d-block">DNR:</label>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="dnr"
                    id="dnrYes"
                    value="yes"
                  />
                  <label className="form-check-label" htmlFor="dnrYes">
                    Yes
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="dnr"
                    id="dnrNo"
                    value="no"
                  />
                  <label className="form-check-label" htmlFor="dnrNo">
                    No
                  </label>
                </div>
                <label className="form-label d-block">
                  Secondary Diagnosis:
                </label>
              </div>
            </div>
          </div>
          <div className="row">
            <h5 className="mt-4 border-bottom pb-1 bg-secondary px-2 text-white text-center pt-1">
              Homebound Status
            </h5>
            <div className="col-md-4">
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-center"
              >
                <input
                  type="checkbox"
                  name="homeboundStatus"
                  value="Exhibits considerable & taxing effort to leave home"
                  checked={formData.homeboundStatus.includes(
                    "Exhibits considerable & taxing effort to leave home"
                  )}
                  onChange={(e) => handleArrayChange(e, "homeboundStatus")}
                  className="form-check-input"
                />
                Exhibits considerable & taxing effort to leave home
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-center"
              >
                <input
                  type="checkbox"
                  name="homeboundStatus"
                  value="Unable to safely leave home unassisted"
                  checked={formData.homeboundStatus.includes(
                    "Unable to safely leave home unassisted"
                  )}
                  onChange={(e) => handleArrayChange(e, "homeboundStatus")}
                  className="form-check-input"
                />
                Unable to safely leave home unassisted
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-center"
              >
                <input
                  type="checkbox"
                  value="Other"
                  name="homeboundStatus"
                  checked={formData.homeboundStatus.includes("Other")}
                  onChange={(e) => handleArrayChange(e, "homeboundStatus")}
                  id=""
                  className="form-check-input"
                />
                Other
              </label>
            </div>
            <div className="col-md-4">
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-center"
              >
                <input
                  type="checkbox"
                  name="homeboundStatus"
                  value="Requires the assistance of another to get up and move safely"
                  checked={formData.homeboundStatus.includes(
                    "Requires the assistance of another to get up and move safely"
                  )}
                  onChange={(e) => handleArrayChange(e, "homeboundStatus")}
                  id=""
                  className="form-check-input"
                />
                Requires the assistance of another to get up and move safely
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-center"
              >
                <input
                  type="checkbox"
                  value="Unsafe to leave home due to cognitive or psychiatric impairments"
                  name="homeboundStatus"
                  checked={formData.homeboundStatus.includes(
                    "Unsafe to leave home due to cognitive or psychiatric impairments"
                  )}
                  onChange={(e) => handleArrayChange(e, "homeboundStatus")}
                  id=""
                  className="form-check-input"
                />
                Unsafe to leave home due to cognitive or psychiatric impairments
              </label>
            </div>
            <div className="col-md-4">
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-center"
              >
                <input
                  type="checkbox"
                  name="homeboundStatus"
                  value="Severe Dyspnea"
                  checked={formData.homeboundStatus.includes("Severe Dyspnea")}
                  onChange={(e) => handleArrayChange(e, "homeboundStatus")}
                  id=""
                  className="form-check-input"
                />
                Severe Dyspnea
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-center"
              >
                <input
                  type="checkbox"
                  value="Unable to leave home due to medical restriction(s)"
                  name="homeboundStatus"
                  checked={formData.homeboundStatus.includes(
                    "Unable to leave home due to medical restriction(s)"
                  )}
                  onChange={(e) => handleArrayChange(e, "homeboundStatus")}
                  id=""
                  className="form-check-input"
                />
                Unable to leave home due to medical restriction(s)
              </label>
            </div>
          </div>
          <div className="row">
            <h5 className="mt-4 border-bottom pb-1 bg-secondary px-2 text-white text-center pt-1">
              Patient Condition
            </h5>
            <div className="col-md-12 d-flex justify-content-between">
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-center"
              >
                <input
                  type="checkbox"
                  name="patientCondition"
                  value="Stable"
                  checked={formData.patientCondition.includes("Stable")}
                  onChange={(e) => handleArrayChange(e, "patientCondition")}
                  className="form-check-input"
                />
                Stable
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-center"
              >
                <input
                  type="checkbox"
                  name="patientCondition"
                  value="Improved"
                  checked={formData.patientCondition.includes("Improved")}
                  onChange={(e) => handleArrayChange(e, "patientCondition")}
                  className="form-check-input"
                />
                Improved
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-center"
              >
                <input
                  type="checkbox"
                  name="patientCondition"
                  value="Unchanged"
                  checked={formData.patientCondition.includes("Unchanged")}
                  onChange={(e) => handleArrayChange(e, "patientCondition")}
                  className="form-check-input"
                />
                Unchanged
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-center"
              >
                <input
                  type="checkbox"
                  name="patientCondition"
                  value="Unstable"
                  checked={formData.patientCondition.includes("Unstable")}
                  onChange={(e) => handleArrayChange(e, "patientCondition")}
                  className="form-check-input"
                />
                Unstable
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-center"
              >
                <input
                  type="checkbox"
                  name="patientCondition"
                  value="Declined"
                  checked={formData.patientCondition.includes("Declined")}
                  onChange={(e) => handleArrayChange(e, "patientCondition")}
                  className="form-check-input"
                />
                Declined
              </label>
            </div>
          </div>
          <div className="row">
            <h5 className="mt-4 border-bottom pb-1 bg-secondary px-2 text-white text-center pt-1">
              Service(s) Provided
            </h5>
            <div className="col-md-12 d-flex justify-content-between">
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-center"
              >
                <input
                  type="checkbox"
                  name="servicesProvided"
                  value="SN"
                  checked={formData.servicesProvided.includes("SN")}
                  onChange={(e) => handleArrayChange(e, "servicesProvided")}
                  className="form-check-input"
                />
                SN
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-center"
              >
                <input
                  type="checkbox"
                  name="servicesProvided"
                  value="PT"
                  checked={formData.servicesProvided.includes("PT")}
                  onChange={(e) => handleArrayChange(e, "servicesProvided")}
                  className="form-check-input"
                />
                PT
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-center"
              >
                <input
                  type="checkbox"
                  name="servicesProvided"
                  value="OT"
                  checked={formData.servicesProvided.includes("OT")}
                  onChange={(e) => handleArrayChange(e, "servicesProvided")}
                  className="form-check-input"
                />
                OT
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-center"
              >
                <input
                  type="checkbox"
                  name="servicesProvided"
                  value="ST"
                  checked={formData.servicesProvided.includes("ST")}
                  onChange={(e) => handleArrayChange(e, "servicesProvided")}
                  className="form-check-input"
                />
                ST
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-center"
              >
                <input
                  type="checkbox"
                  name="servicesProvided"
                  value="MSW"
                  checked={formData.servicesProvided.includes("MSW")}
                  onChange={(e) => handleArrayChange(e, "servicesProvided")}
                  className="form-check-input"
                />
                MSW
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-center"
              >
                <input
                  type="checkbox"
                  name="servicesProvided"
                  value="HHA"
                  checked={formData.servicesProvided.includes("HHA")}
                  onChange={(e) => handleArrayChange(e, "servicesProvided")}
                  className="form-check-input"
                />
                HHA
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-center"
              >
                <input
                  type="checkbox"
                  name="servicesProvided"
                  value="Other"
                  checked={formData.servicesProvided.includes("Other")}
                  onChange={(e) => handleArrayChange(e, "servicesProvided")}
                  className="form-check-input"
                />
                Other
              </label>
            </div>
          </div>
          {/* Vital Signs Section */}
          <div className="row">
            <h5 className="mt-4 border-bottom pb-1 bg-secondary px-2 text-white text-center pt-1">
              Vital Signs
            </h5>
            {[
              "bpSystolic",
              "bpDiastolic",
              "hr",
              "resp",
              "temp",
              "weight",
              "bs",
              "pain",
            ].map((sign) => (
              <div className="mb-3 row" key={sign}>
                <label className="form-label col-sm-2">
                  {sign.replace(/([A-Z])/g, " $1").toUpperCase()}
                </label>
                <div className="col-sm-5">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Lowest"
                    value={formData.vitalSigns[sign].lowest}
                    onChange={(e) => handleVitalSignsChange(e, sign, "lowest")}
                  />
                </div>
                <div className="col-sm-5">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Highest"
                    value={formData.vitalSigns[sign].highest}
                    onChange={(e) => handleVitalSignsChange(e, sign, "highest")}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Select Template Section */}
          <div className="row">
            <h5 className="mt-4 border-bottom pb-1 bg-secondary px-2 text-white text-center pt-1">
              Summary of Care Provided
            </h5>
            <p className="form-label mb-5">Select Template</p>
            <Template
              selectedTemplate={summaryOfCareProvided}
              setSelectedTemplate={setSummaryOfCareProvided}
            />
            <textarea
              name=""
              id=""
              value={summaryOfCareProvided?.value}
              className="form-control"
            ></textarea>
          </div>
          <div className="row">
            <h5 className="mt-4 border-bottom pb-1 bg-secondary px-2 text-white text-center pt-1">
              Patient’s Current Condition
            </h5>
            <p className="form-label">Select Template</p>
            <Template
              selectedTemplate={patientCurrentCondition}
              setSelectedTemplate={setPatientCurrentCondition}
            />
            <textarea
              name=""
              id=""
              value={patientCurrentCondition?.value}
              className="form-control"
            ></textarea>
          </div>
          <div className="row">
            <h5 className="mt-4 border-bottom pb-1 bg-secondary px-2 text-white text-center pt-1">
              Goals
            </h5>
            <label className="form-label">Select Template</label>
            <Template selectedTemplate={goals} setSelectedTemplate={setGoals} />
            <textarea
              name=""
              id=""
              value={goals?.value}
              className="form-control"
            ></textarea>
          </div>
          <div className="row">
            <h5 className="mt-4 border-bottom pb-1 bg-secondary px-2 text-white text-center pt-1">
              Recommended services
            </h5>
            <div className="col-md-12 d-flex justify-content-between">
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-center"
              >
                <input
                  type="checkbox"
                  name="recommendedService"
                  value="SN"
                  checked={formData.recommendedService.includes("SN")}
                  onChange={(e) => handleArrayChange(e, "recommendedService")}
                  className="form-check-input"
                />
                SN
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-center"
              >
                <input
                  type="checkbox"
                  name="recommendedService"
                  value="PT"
                  checked={formData.recommendedService.includes("PT")}
                  onChange={(e) => handleArrayChange(e, "recommendedService")}
                  className="form-check-input"
                />
                PT
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-center"
              >
                <input
                  type="checkbox"
                  name="recommendedService"
                  value="OT"
                  checked={formData.recommendedService.includes("OT")}
                  onChange={(e) => handleArrayChange(e, "recommendedService")}
                  className="form-check-input"
                />
                OT
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-center"
              >
                <input
                  type="checkbox"
                  name="recommendedService"
                  value="ST"
                  checked={formData.recommendedService.includes("ST")}
                  onChange={(e) => handleArrayChange(e, "recommendedService")}
                  className="form-check-input"
                />
                ST
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-center"
              >
                <input
                  type="checkbox"
                  name="recommendedService"
                  value="MSW"
                  checked={formData.recommendedService.includes("MSW")}
                  onChange={(e) => handleArrayChange(e, "recommendedService")}
                  className="form-check-input"
                />
                MSW
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-center"
              >
                <input
                  type="checkbox"
                  name="recommendedService"
                  value="HHA"
                  checked={formData.recommendedService.includes("HHA")}
                  onChange={(e) => handleArrayChange(e, "recommendedService")}
                  className="form-check-input"
                />
                HHA
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-center"
              >
                <input
                  type="checkbox"
                  name="recommendedService"
                  value="Other"
                  checked={formData.recommendedService.includes("Other")}
                  onChange={(e) => handleArrayChange(e, "recommendedService")}
                  className="form-check-input"
                />
                Other
              </label>
            </div>
          </div>
          <div className="row">
            <h5 className="mt-4 border-bottom pb-1 bg-secondary px-2 text-white text-center pt-1">
              Notifications
            </h5>
            <div className="col-md-12 d-flex justify-content-between">
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-center"
              >
                <input
                  type="checkbox"
                  name="summarySentToPhysician"
                  value={formData.summarySentToPhysician}
                  onChange={handleInputChange}
                  className="form-check-input"
                />
                Summary sent To Physician
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-center"
              >
                Sent by{" "}
                <select
                  onChange={handleInputChange}
                  name="userId"
                  className="form-select"
                >
                  <option value="">--Select Users--</option>
                </select>
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-center"
              >
                Date Sent{" "}
                <input
                  className="form-control"
                  onChange={handleInputChange}
                  type="date"
                  name="sentDate"
                  id=""
                />
              </label>
            </div>
          </div>
          <div className="row">
            <h5 className="mt-4 border-bottom pb-1 bg-secondary px-2 text-white text-center pt-1">
              Electronic Signature
            </h5>
            <div className="col-md-6 d-flex flex-column gap-2">
              {formData.electronicSignature.map((signature, index) => (
                <label
                  key={index}
                  className="form-check-label d-flex gap-1 align-items-center"
                >
                  Clinician:{" "}
                  <input
                    type="text"
                    name={`clinician-${index}`}
                    className="form-control"
                    value={signature.clinician}
                    onChange={(e) =>
                      handleElectronicSignatureChange(
                        index,
                        "clinician",
                        e.target.value
                      )
                    }
                  />
                </label>
              ))}
            </div>
            <div className="col-md-6 d-flex flex-column gap-2">
              {formData.electronicSignature.map((signature, index) => (
                <label
                  key={index}
                  className="form-check-label d-flex gap-1 align-items-center"
                >
                  Date:{" "}
                  <input
                    type="date"
                    name={`date-${index}`}
                    className="form-control"
                    value={signature.date}
                    onChange={(e) =>
                      handleElectronicSignatureChange(
                        index,
                        "date",
                        e.target.value
                      )
                    }
                  />
                </label>
              ))}
            </div>
          </div>
          {/* Submit Button */}
          <button type="submit" className="btn btn-primary mt-5">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default TenDaySummaryCaseConference;
