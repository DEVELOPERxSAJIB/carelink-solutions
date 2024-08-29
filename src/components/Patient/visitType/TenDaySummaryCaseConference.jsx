import { useState, useEffect } from "react";
import Template from "./../../FormElement/Template";
import {
  useCreateTenDaySummaryCaseConferenceMutation,
  useGetTenDaySummaryCaseConferenceByIdQuery,
} from "../../../Redux/api/VisitType/TenDaySummaryCaseConference";
import { showToast } from "./../../../utils/Toastify";
import PageHeader from "./../../FormElement/PageHeader";
const TenDaySummaryCaseConference = ({ data }) => {
  const [summaryOfCareProvided, setSummaryOfCareProvided] = useState("");
  const [patientCurrentCondition, setPatientCurrentCondition] = useState("");
  const [
    createTenDaySummaryCaseConference,
    { data: createData, isSuccess: isCreateSuccess, error },
  ] = useCreateTenDaySummaryCaseConferenceMutation();
  const { data: getData,refetch } = useGetTenDaySummaryCaseConferenceByIdQuery(
    data?._id
  );
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
    console.log(name, value);
    setFormData({ ...formData, [name]: value });
  };
  const handleInputCheckboxChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleInputRadioChange = (e) => {
    const { name, value } = e.target;

    // Convert the string value to a boolean for the "dnr" field
    const updatedValue =
      value === "true" ? true : value === "false" ? false : value;

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  const handleVitalSignsChange = (e, sign, type) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      vitalSigns: {
        ...prevData.vitalSigns,
        [sign]: {
          ...prevData.vitalSigns?.[sign],
          [type]: value,
        },
      },
    }));
  };

  const handleElectronicSignatureChange = (index, field, value) => {
    const updatedSignatures = formData?.electronicSignature?.map(
      (signature, i) =>
        i === index ? { ...signature, [field]: value } : signature
    );
    setFormData({ ...formData, electronicSignature: updatedSignatures });
  };

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

    formData.scheduleId = data?._id;
    formData.visitType = data.visitType;
    formData.patientId = data?.patientId;
    formData.episode = data?.episode;
    createTenDaySummaryCaseConference(formData);
    console.log("Form data submitted:", formData);
  };
  useEffect(() => {
    if (isCreateSuccess) {
      showToast("success", createData?.message);
      refetch()
    }

    if (error) {
      showToast("error", error?.data?.message);
    }
  }, [isCreateSuccess, error,refetch]);
  useEffect(() => {
    if(getData?.payload?.record){
      const update = { ...getData?.payload?.record };

    // Format the sentDate to 'YYYY-MM-DD'
    if (update?.sentDate) {
      update.sentDate = update.sentDate.split("T")[0];
    }
    // Format the dates in the electronicSignature array
    if (Array.isArray(update?.electronicSignature)) {
      update.electronicSignature = update.electronicSignature.map(
        (signature) => ({
          ...signature,
          date: signature.date.split("T")[0],
        })
      );
    }
    // Update the formData state with the modified data
    setFormData(update);
    }
  }, [getData?.payload?.record]);
  console.log(formData);
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      patientCurrentCondition:
        prev.patientCurrentCondition + (patientCurrentCondition?.value || ""),
      summaryOfCareProvided:
        prev.summaryOfCareProvided + (summaryOfCareProvided?.value || ""),
      goals: prev.goals + (goals?.value || ""),
    }));
  }, [patientCurrentCondition, summaryOfCareProvided, goals]);

  return (
    <div className="card mt-4">
      <div className="card-header">
        <PageHeader title={data?.visitType} />
      </div>
      <div className="row mt-5 w-100 text-center">
          <p className="fs-4 text-capitalize text-black font-bolder">{data?.patientName}</p>
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
                    value={"true"}
                    checked={formData?.dnr === true}
                    onChange={handleInputRadioChange}
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
                    value={"false"}
                    checked={formData?.dnr === false}
                    onChange={handleInputRadioChange}
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
                className="form-check-label d-flex gap-1 align-items-start"
              >
                <input
                  type="checkbox"
                  name="homeboundStatus"
                  value="Exhibits considerable & taxing effort to leave home"
                  checked={formData?.homeboundStatus?.includes(
                    "Exhibits considerable & taxing effort to leave home"
                  )}
                  onChange={(e) => handleArrayChange(e, "homeboundStatus")}
                  className="form-check-input"
                />
                Exhibits considerable & taxing effort to leave home
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-start"
              >
                <input
                  type="checkbox"
                  name="homeboundStatus"
                  value="Unable to safely leave home unassisted"
                  checked={formData?.homeboundStatus?.includes(
                    "Unable to safely leave home unassisted"
                  )}
                  onChange={(e) => handleArrayChange(e, "homeboundStatus")}
                  className="form-check-input"
                />
                Unable to safely leave home unassisted
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-start"
              >
                <input
                  type="checkbox"
                  value="Other"
                  name="homeboundStatus"
                  checked={formData?.homeboundStatus?.includes("Other")}
                  onChange={(e) => handleArrayChange(e, "homeboundStatus")}
                  className="form-check-input"
                />
                Other
              </label>
            </div>
            <div className="col-md-4">
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-start"
              >
                <input
                  type="checkbox"
                  name="homeboundStatus"
                  value="Requires the assistance of another to get up and move safely"
                  checked={formData?.homeboundStatus?.includes(
                    "Requires the assistance of another to get up and move safely"
                  )}
                  onChange={(e) => handleArrayChange(e, "homeboundStatus")}
                  className="form-check-input"
                />
                Requires the assistance of another to get up and move safely
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-start"
              >
                <input
                  type="checkbox"
                  value="Unsafe to leave home due to cognitive or psychiatric impairments"
                  name="homeboundStatus"
                  checked={formData?.homeboundStatus?.includes(
                    "Unsafe to leave home due to cognitive or psychiatric impairments"
                  )}
                  onChange={(e) => handleArrayChange(e, "homeboundStatus")}
                  className="form-check-input"
                />
                Unsafe to leave home due to cognitive or psychiatric impairments
              </label>
            </div>
            <div className="col-md-4">
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-start"
              >
                <input
                  type="checkbox"
                  name="homeboundStatus"
                  value="Severe Dyspnea"
                  checked={formData?.homeboundStatus?.includes(
                    "Severe Dyspnea"
                  )}
                  onChange={(e) => handleArrayChange(e, "homeboundStatus")}
                  className="form-check-input"
                />
                Severe Dyspnea
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-start"
              >
                <input
                  type="checkbox"
                  value="Unable to leave home due to medical restriction(s)"
                  name="homeboundStatus"
                  checked={formData?.homeboundStatus?.includes(
                    "Unable to leave home due to medical restriction(s)"
                  )}
                  onChange={(e) => handleArrayChange(e, "homeboundStatus")}
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
                className="form-check-label d-flex gap-1 align-items-start"
              >
                <input
                  type="checkbox"
                  name="patientCondition"
                  value="Stable"
                  checked={formData?.patientCondition?.includes("Stable")}
                  onChange={(e) => handleArrayChange(e, "patientCondition")}
                  className="form-check-input"
                />
                Stable
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-start"
              >
                <input
                  type="checkbox"
                  name="patientCondition"
                  value="Improved"
                  checked={formData?.patientCondition?.includes("Improved")}
                  onChange={(e) => handleArrayChange(e, "patientCondition")}
                  className="form-check-input"
                />
                Improved
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-start"
              >
                <input
                  type="checkbox"
                  name="patientCondition"
                  value="Unchanged"
                  checked={formData?.patientCondition?.includes("Unchanged")}
                  onChange={(e) => handleArrayChange(e, "patientCondition")}
                  className="form-check-input"
                />
                Unchanged
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-start"
              >
                <input
                  type="checkbox"
                  name="patientCondition"
                  value="Unstable"
                  checked={formData?.patientCondition?.includes("Unstable")}
                  onChange={(e) => handleArrayChange(e, "patientCondition")}
                  className="form-check-input"
                />
                Unstable
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-start"
              >
                <input
                  type="checkbox"
                  name="patientCondition"
                  value="Declined"
                  checked={formData?.patientCondition?.includes("Declined")}
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
                className="form-check-label d-flex gap-1 align-items-start"
              >
                <input
                  type="checkbox"
                  name="servicesProvided"
                  value="SN"
                  checked={formData?.servicesProvided?.includes("SN")}
                  onChange={(e) => handleArrayChange(e, "servicesProvided")}
                  className="form-check-input"
                />
                SN
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-start"
              >
                <input
                  type="checkbox"
                  name="servicesProvided"
                  value="PT"
                  checked={formData?.servicesProvided?.includes("PT")}
                  onChange={(e) => handleArrayChange(e, "servicesProvided")}
                  className="form-check-input"
                />
                PT
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-start"
              >
                <input
                  type="checkbox"
                  name="servicesProvided"
                  value="OT"
                  checked={formData?.servicesProvided?.includes("OT")}
                  onChange={(e) => handleArrayChange(e, "servicesProvided")}
                  className="form-check-input"
                />
                OT
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-start"
              >
                <input
                  type="checkbox"
                  name="servicesProvided"
                  value="ST"
                  checked={formData?.servicesProvided?.includes("ST")}
                  onChange={(e) => handleArrayChange(e, "servicesProvided")}
                  className="form-check-input"
                />
                ST
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-start"
              >
                <input
                  type="checkbox"
                  name="servicesProvided"
                  value="MSW"
                  checked={formData?.servicesProvided?.includes("MSW")}
                  onChange={(e) => handleArrayChange(e, "servicesProvided")}
                  className="form-check-input"
                />
                MSW
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-start"
              >
                <input
                  type="checkbox"
                  name="servicesProvided"
                  value="HHA"
                  checked={formData?.servicesProvided?.includes("HHA")}
                  onChange={(e) => handleArrayChange(e, "servicesProvided")}
                  className="form-check-input"
                />
                HHA
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-start"
              >
                <input
                  type="checkbox"
                  name="servicesProvided"
                  value="Other"
                  checked={formData?.servicesProvided?.includes("Other")}
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
                    value={formData?.vitalSigns?.[sign]?.lowest || ""}
                    onChange={(e) => handleVitalSignsChange(e, sign, "lowest")}
                  />
                </div>
                <div className="col-sm-5">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Highest"
                    value={formData?.vitalSigns?.[sign]?.highest || ""}
                    onChange={(e) => handleVitalSignsChange(e, sign, "highest")}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Select Template Section */}
          <div className="row d-flex flex-column gap-3">
            <h5 className="mt-4 border-bottom pb-1 bg-secondary px-2 text-white text-center pt-1">
              Summary of Care Provided
            </h5>
            <p className="form-label mb-5">Select Template</p>
            <Template
              selectedTemplate={summaryOfCareProvided}
              setSelectedTemplate={setSummaryOfCareProvided}
            />
            <textarea
              name="summaryOfCareProvided"
              value={formData?.summaryOfCareProvided}
              className="form-control"
            ></textarea>
          </div>
          <div className="row d-flex flex-column gap-3">
            <h5 className="mt-4 border-bottom pb-1 bg-secondary px-2 text-white text-center pt-1">
              Patient’s Current Condition
            </h5>
            <p className="form-label">Select Template</p>
            <Template
              selectedTemplate={patientCurrentCondition}
              setSelectedTemplate={setPatientCurrentCondition}
            />
            <textarea
              name="patientCurrentCondition"
              value={formData?.patientCurrentCondition}
              className="form-control"
            ></textarea>
          </div>
          <div className="row d-flex flex-column gap-3">
            <h5 className="mt-4 border-bottom pb-1 bg-secondary px-2 text-white text-center pt-1">
              Goals
            </h5>
            <label className="form-label">Select Template</label>
            <Template selectedTemplate={goals} setSelectedTemplate={setGoals} />
            <textarea
              name="goals"
              value={formData?.goals}
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
                className="form-check-label d-flex gap-1 align-items-start"
              >
                <input
                  type="checkbox"
                  name="recommendedService"
                  value="SN"
                  checked={formData?.recommendedService?.includes("SN")}
                  onChange={(e) => handleArrayChange(e, "recommendedService")}
                  className="form-check-input"
                />
                SN
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-start"
              >
                <input
                  type="checkbox"
                  name="recommendedService"
                  value="PT"
                  checked={formData?.recommendedService?.includes("PT")}
                  onChange={(e) => handleArrayChange(e, "recommendedService")}
                  className="form-check-input"
                />
                PT
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-start"
              >
                <input
                  type="checkbox"
                  name="recommendedService"
                  value="OT"
                  checked={formData?.recommendedService?.includes("OT")}
                  onChange={(e) => handleArrayChange(e, "recommendedService")}
                  className="form-check-input"
                />
                OT
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-start"
              >
                <input
                  type="checkbox"
                  name="recommendedService"
                  value="ST"
                  checked={formData?.recommendedService?.includes("ST")}
                  onChange={(e) => handleArrayChange(e, "recommendedService")}
                  className="form-check-input"
                />
                ST
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-start"
              >
                <input
                  type="checkbox"
                  name="recommendedService"
                  value="MSW"
                  checked={formData?.recommendedService?.includes("MSW")}
                  onChange={(e) => handleArrayChange(e, "recommendedService")}
                  className="form-check-input"
                />
                MSW
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-start"
              >
                <input
                  type="checkbox"
                  name="recommendedService"
                  value="HHA"
                  checked={formData?.recommendedService?.includes("HHA")}
                  onChange={(e) => handleArrayChange(e, "recommendedService")}
                  className="form-check-input"
                />
                HHA
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-start"
              >
                <input
                  type="checkbox"
                  name="recommendedService"
                  value="Other"
                  checked={formData?.recommendedService?.includes("Other")}
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
                className="form-check-label d-flex gap-1 align-items-start"
              >
                <input
                  type="checkbox"
                  name="summarySentToPhysician"
                  value={formData?.summarySentToPhysician}
                  onChange={handleInputCheckboxChange}
                  checked={formData?.summarySentToPhysician}
                  className="form-check-input"
                />
                Summary sent To Physician
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-start"
              >
                Sent by{" "}
                <select
                  onChange={handleInputChange}
                  name="userId"
                  value={formData?.userId}
                  className="form-select"
                >
                  <option value="">--Select Users--</option>
                  <option value="66bc86f3e9f0e7706c047ff9">aaaa</option>
                </select>
              </label>
              <label
                htmlFor=""
                className="form-check-label d-flex gap-1 align-items-start"
              >
                Date Sent{" "}
                <input
                  className="form-control"
                  onChange={handleInputChange}
                  type="date"
                  name="sentDate"
                  value={formData?.sentDate}
                />
              </label>
            </div>
          </div>
          <div className="row">
            <h5 className="mt-4 border-bottom pb-1 bg-secondary px-2 text-white text-center pt-1">
              Electronic Signature
            </h5>
            <div className="col-md-6 d-flex flex-column gap-2">
              {formData?.electronicSignature?.map((signature, index) => (
                <label
                  key={index}
                  className="form-check-label d-flex gap-1 align-items-start"
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
              {formData?.electronicSignature?.map((signature, index) => (
                <label
                  key={index}
                  className="form-check-label d-flex gap-1 align-items-start"
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
