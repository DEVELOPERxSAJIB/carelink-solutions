import { useState, useEffect } from "react";
import PageHeader from "./../../FormElement/PageHeader";
import Template from "./../../FormElement/Template";
import {
  useCreateCoordinationOfCareMutation,
  useGetCoordinationOfCareByIdQuery,
} from "../../../Redux/api/VisitType/CoordinationOfCareApi";
import { showToast } from "./../../../utils/Toastify";
const CoordinationOfCare = ({ data }) => {
  const [createCoordinationOfCare, { data: createData, error, isSuccess }] =
    useCreateCoordinationOfCareMutation();
  const { data: getData } = useGetCoordinationOfCareByIdQuery(data?._id);
  const [formData, setFormData] = useState({
    visitDate: "",
    functionalLimitations: [],
    patientCondition: [],
    serviceProvider: [],
    vitalSigns: {
      SBP: { lowest: "", highest: "" },
      DBP: { lowest: "", highest: "" },
      HR: { lowest: "", highest: "" },
      Resp: { lowest: "", highest: "" },
      Temp: { lowest: "", highest: "" },
      Weight: { lowest: "", highest: "" },
      BG: { lowest: "", highest: "" },
    },
    homeBoundStatus: [],
    summaryOfCare: "",
    MedicareReviewPoc: "No",
    MedicareReviewMedication: "No",
    clinician: "",
    signatureDate: "",
    clinicianFoSignature: false,
    homeEnvironment: "",
    facility: "",
    phone: "",
    contact: "",
    servicesProviding: "",
  });
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
  const handleSubmit = (e) => {
    e.preventDefault();
    formData.scheduleId = data?._id;
    formData.visitType = data.visitType;
    formData.patientId = data?.patientId;
    formData.episode = data?.episode;
    console.log(formData);
    createCoordinationOfCare(formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleCheckboxChange = (e) => {
    const { value, checked, dataset } = e.target;
    const category = dataset.category;
    console.log(category, value, checked, dataset);
    setFormData((prevFormData) => {
      const currentSelections = prevFormData[category] || [];

      const updatedSelections = checked
        ? [...currentSelections, value]
        : currentSelections.filter((item) => item !== value);

      return {
        ...prevFormData,
        [category]: updatedSelections,
      };
    });
  };
  const handleRadioInputChange = (event) => {
    const { name, value } = event.target;
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  
  useEffect(() => {
    if (isSuccess) {
      showToast("success", createData?.message);
    }
    if (error) {
      showToast("error", error?.data?.message);
    }
  }, [isSuccess, error, createData]);

  useEffect(() => {
    if (getData?.payload?.record) {
      const { visitDate, signatureDate, ...rest } = getData?.payload?.record;
      // Function to safely format the date
      const formatDate = (dateString) => {
        const dateObj = new Date(dateString);
        // Check if the date is valid
        return isNaN(dateObj.getTime())
          ? ""
          : dateObj.toISOString().split("T")[0];
      };
      // Create a new object with formatted dates
      const updatedData = {
        ...rest,
        visitDate: formatDate(visitDate),
        signatureDate: formatDate(signatureDate),
      };
      // Update state with the new object
      setFormData(updatedData);
    }
  }, [getData?.payload?.record]);

  return (
    <form onSubmit={handleSubmit} className="create-patient-form card">
      <div className="card-body">
        <div className="row">
          <div className="col-md-6 d-flex flex-wrap gap-2">
            <button className="btn btn-secondary" disabled="disabled">
              DNR
            </button>
            <button className="btn btn-secondary" disabled="disabled">
              FALL RISK
            </button>
            <button className="btn btn-secondary" disabled="disabled">
              HOSPITALIZATION RISK
            </button>
            <button className="btn btn-secondary" disabled="disabled">
              INFECTION RISK
            </button>
          </div>
          <div className="col-md-6 d-flex flex-wrap gap-2 justify-content-end">
            <button className="btn btn-primary">View POC Summary</button>
            <button className="btn btn-primary">View Plan of Care</button>
          </div>
        </div>
        <div className="row mt-5">
          <PageHeader title={data.visitType} />
        </div>
        <div className="row mt-5 w-100 text-center">
          <p className="fs-4 text-capitalize text-black font-bolder">
            {data?.patientName}
          </p>
        </div>
        <div className="row mt-2">
          <div className="col-md-6">
            <label htmlFor="" className="form-label">
              Episode Period:
            </label>
            <span>{data?.episode}</span>
            <label htmlFor="" className="form-label">
              Visit Date:
            </label>
            <input
              type="date"
              onChange={handleInputChange}
              name="visitDate"
              value={formData.visitDate}
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="" className="form-label">
              Physician:
            </label>
            <span>Klutse,Vasty DNP, NP-C</span>
            <label htmlFor="" className="form-label">
              Secondary Diagnosis:
            </label>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-4">
            <h6 className="text-white bg-secondary mb-0 py-2 text-center">
              Functional Limitations
            </h6>
            <div>
              {[
                "Amputation",
                "Legally Blind",
                "Endurance",
                "Contracture",
                "Hearing",
                "Other(Specify)",
                "Paralysis",
                "Bowel/Bladder Incontinence",
                "Dyspnea with Minimal Exertion",
                "Ambulation",
                "Speech",
              ].map((issue) => (
                <div key={issue}>
                  <label className="d-flex gap-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="functionalLimitations"
                      value={issue}
                      id={`functionalLimitations${issue}`}
                      data-category="functionalLimitations"
                      checked={formData?.functionalLimitations?.includes(issue)}
                      onChange={handleCheckboxChange}
                    />
                    {issue}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-4">
            <h6 className="text-white bg-secondary mb-0 py-2 text-center">
              Patient Condition
            </h6>
            <div>
              {[
                "Stable",
                "Improved",
                "Unchanged",
                "Unstable",
                "Declined",
                "Other(Specify)",
                "Paralysis",
                "Bowel/Bladder Incontinence",
                "Dyspnea with Minimal Exertion",
                "Ambulation",
                "Speech",
              ].map((issue) => (
                <div key={issue}>
                  <label className="d-flex gap-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="patientCondition"
                      value={issue}
                      id={`patientCondition${issue}`}
                      data-category="patientCondition"
                      checked={formData?.patientCondition?.includes(issue)}
                      onChange={handleCheckboxChange}
                    />
                    {issue}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-4">
            <h6 className="text-white bg-secondary mb-0 py-2 text-center">
              Service(s) Provided
            </h6>
            <div>
              {["SN", "PT", "OT", "ST", "MSW", "HHA", "Other"].map((issue) => (
                <div key={issue}>
                  <label className="d-flex gap-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="serviceProvider"
                      value={issue}
                      id={`serviceProvider${issue}`}
                      data-category="serviceProvider"
                      checked={formData?.serviceProvider?.includes(issue)}
                      onChange={handleCheckboxChange}
                    />
                    {issue}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <h5 className="mt-4 border-bottom pb-1 bg-secondary px-2 text-white text-center pt-1">
              Vital Signs
            </h5>
            {["SBP", "DBP", "HR", "Resp", "Temp", "Weight", "BG"].map(
              (sign) => (
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
                      onChange={(e) =>
                        handleVitalSignsChange(e, sign, "lowest")
                      }
                    />
                  </div>
                  <div className="col-sm-5">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Highest"
                      value={formData?.vitalSigns?.[sign]?.highest || ""}
                      onChange={(e) =>
                        handleVitalSignsChange(e, sign, "highest")
                      }
                    />
                  </div>
                </div>
              )
            )}
          </div>
          <div className="col-md-4">
            <h5 className="mt-4 border-bottom pb-1 bg-secondary px-2 text-white text-center pt-1">
              Home Bound Status
            </h5>
            <div>
              {[
                "Exhibits considerable & taxing effort to leave home",
                "Requires the assistance of another to get up and moving safely",
                "Severe Dyspnea",
                "Unable to safely leave home unassisted",
                "Unsafe to leave home due to cognitive or psychiatric impairments",
                "Unable to leave home due to medical restriction(s)",
                "other",
              ].map((issue) => (
                <div key={issue}>
                  <label className="d-flex gap-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="homeBoundStatus"
                      value={issue}
                      id={`homeBoundStatus${issue}`}
                      data-category="homeBoundStatus"
                      checked={formData?.homeBoundStatus?.includes(issue)}
                      onChange={handleCheckboxChange}
                    />
                    {issue}
                  </label>
                </div>
              ))}
              <label htmlFor="" className="form-label">
                Home Environment
              </label>
              <select
                onChange={handleInputChange}
                name="homeEnvironment"
                id=""
                value={formData?.homeEnvironment}
                className="form-select"
              >
                <option value="No issues identified">
                  No issues identified
                </option>
                <option value="Lack of Finances">Lack of Finances</option>
                <option value="Lack of CG/Family Support">
                  Lack of CG/Family Support
                </option>
                <option value="Poor Home Environment">
                  Poor Home Environment
                </option>
                <option value="Cluttered/Soiled Living Conditions">
                  Cluttered/Soiled Living Conditions
                </option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <h5 className="mt-4 border-bottom pb-1 bg-secondary px-2 text-white text-center pt-1">
              Transfer Facility Information
            </h5>

            <div className="form-input">
              <label htmlFor="" className="form-label">
                Facility:
              </label>
              <input
                name="facility"
                onChange={handleInputChange}
                type="text"
                value={formData.facility}
                className="form-control"
              />
              <label htmlFor="" className="form-label">
                Phone:
              </label>
              <input
                name="phone"
                onChange={handleInputChange}
                type="text"
                value={formData.phone}
                className="form-control"
              />
              <label htmlFor="" className="form-label">
                Contact:
              </label>
              <input
                type="date"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className="form-control"
              />
              <label htmlFor="" className="form-label">
                Services Providing:
              </label>
              <textarea
                name="servicesProviding"
                value={formData.servicesProviding}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-6">
            <h6>Summary of Care provided by HHA</h6>
            <textarea
              name="summaryOfCare"
              id=""
              onChange={handleInputChange}
              value={formData.summaryOfCare}
              className="form-control"
            ></textarea>
          </div>
          <div className="col-md-6">
  <label htmlFor="" className="form-label d-block">
    Was POC sent with patient?
  </label>
  <label className="form-label d-flex gap-2">
    <input
      type="radio"
      name="MedicareReviewPoc"
      value="Yes"
      onChange={handleRadioInputChange}
      checked={formData.MedicareReviewPoc === 'Yes'}
    />
    Yes
  </label>
  <label className="form-label d-flex gap-2">
    <input
      type="radio"
      name="MedicareReviewPoc"
      value="No"
      onChange={handleRadioInputChange}
      checked={formData.MedicareReviewPoc === 'No'}
    />
    No
  </label>

  <label htmlFor="" className="form-label d-block">
    Was medication sent with patient?
  </label>
  <label className="form-label d-flex gap-2">
    <input
      type="radio"
      name="MedicareReviewMedication"
      value="Yes"
      onChange={handleRadioInputChange}
      checked={formData.MedicareReviewMedication === 'Yes'}
    />
    Yes
  </label>
  <label className="form-label d-flex gap-2">
    <input
      type="radio"
      name="MedicareReviewMedication"
      value="No"
      onChange={handleRadioInputChange}
      checked={formData.MedicareReviewMedication === 'No'}
    />
    No
  </label>
</div>

        </div>
        <div className="row py-2 d-flex">
          <div className="col-md-6 bg-white p-2">
            <label htmlFor="clinical" className="form-label">
              Clinician Signature
            </label>
            <input
              type="text"
              name="clinician"
              className="form-control"
              value={formData?.clinician || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6 bg-white p-2">
            <label htmlFor="signatureDate" className="form-label">
              Signature Date
            </label>
            <input
              type="date"
              value={formData?.signatureDate}
              name="signatureDate"
              className="form-control"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="d-flex  gap-2">
          <button type="submit" className="submit-button btn btn-primary mt-5">
            Save
          </button>
          <button type="submit" className="submit-button btn btn-primary mt-5">
            Save and Exit
          </button>

          <button type="submit" className="submit-button btn btn-primary mt-5">
            Complete
          </button>
        </div>
      </div>
    </form>
  );
};

export default CoordinationOfCare;
