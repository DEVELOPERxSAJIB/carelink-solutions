import { useState, useEffect } from "react";
import PageHeader from "./../../FormElement/PageHeader";
import {
  useGetNonOASISDischargeByIdQuery,
  useCreateNonOASISDischargeMutation,
} from "../../../Redux/api/VisitType/NonOasisDischargeApi";
import { useGetPatientByIdQuery } from "../../../Redux/api/PatientApi";
import { showToast } from "./../../../utils/Toastify";
const NonOASISDischarge = ({ data }) => {
  console.log(data);
  const [createNonOASISDischarge, { data: createData, isSuccess, error }] =
  useCreateNonOASISDischargeMutation();
    // const { data: getData, refetch } = useGetNonOASISDischargeByIdQuery(data?._id);
  const { data: productData } = useGetPatientByIdQuery(data?.patientId);
  const [interventionsText, setInterventionsText] = useState("");
  const [visitNarrativeText, setVisitNarrativeText] = useState("");
  console.log(productData);
  const [formData, setFormData] = useState({
    startOfCareDate: "",
    disciplineOfPersonCompletingAssessment: "",
    cmsCertificationNumber: "",
    resumptionOfCareDate: "",
    physicianNpiNumber: "",
    dateAssessmentCompleted: "",
    ukUnknownOrNotAvailable: false,
    raceEthnicity: [],
    paymentSource: [],
    idNumber: "",
    firstName: "",
    mi: "",
    lastName: "",
    suffix: "",
    state: "",
    zip: "",
    socialSecurityNumber: "",
    notAvailable: false,
    medicareNumber: "",
    noMedicare: false,
    medicaidNumber: "",
    noMedicaid: false,
    birthDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked, options } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (type === "checkbox") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: checked,
      }));
    } else if (type === "select-multiple") {
      const selectedValues = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: selectedValues,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.scheduleId = data?._id;
    formData.visitType = data.visitType;
    formData.patientId = data?.patientId;
    formData.episode = data?.episode;
    console.log(formData);
    createNonOASISDischarge(formData)
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

    useEffect(() => {
      setFormData((prev) => ({}));
    }, [interventionsText.value, visitNarrativeText.value]);
    useEffect(() => {
      if (isSuccess) {
        showToast("success", createData?.message);
        refetch();
      }
      if (error) {
        showToast("error", error?.data?.message);
      }
    }, [isSuccess, error, createData, refetch]);
    useEffect(() => {
      if (getData?.payload?.record) {
        let updateData = { ...getData.payload.record };
        // Convert the dates to the correct format
        if (updateData.birthOfDate) {
          updateData.birthOfDate = new Date(updateData.birthOfDate)
            .toISOString()
            .split("T")[0];
        }

        if (updateData.startOfCareDate) {
          updateData.startOfCareDate = new Date(updateData.startOfCareDate)
            .toISOString()
            .split("T")[0];
        }
        if (updateData.episodeStartDate) {
          updateData.episodeStartDate = new Date(updateData.episodeStartDate)
            .toISOString()
            .split("T")[0];
        }
        if (updateData.resumptionOfCareDate) {
          updateData.resumptionOfCareDate = new Date(updateData.resumptionOfCareDate)
            .toISOString()
            .split("T")[0];
        }
        if (updateData.dateAssessmentCompleted) {
          updateData.dateAssessmentCompleted = new Date(updateData.dateAssessmentCompleted)
            .toISOString()
            .split("T")[0];
        }
        // Set the updated data to the form data state
        setFormData(updateData);
      }
    }, [getData?.payload?.record]);

  return (
    <form onSubmit={handleSubmit} className="create-patient-form card">
      <div className="card-body">
        <div className="row mt-5">
          <PageHeader title={data.visitType} />
        </div>
        <div className="row mt-5 w-100 text-center">
          <p className="fs-4 text-capitalize text-black font-bolder">
            {data?.patientName}
          </p>
        </div>

        <div className="row mt-2 d-flex flex-column gap-2">
          <label htmlFor="" className="form-label">
            Previous Assessments
          </label>
          <label htmlFor="" className="form-label">
            Select Assessment
          </label>

          <select name="previousAssessment" id="" className="form-select">
            <option value="">Select assessment</option>
          </select>
        </div>
        <div className="d-flex gap-2">
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

        <div className="row mt-2 border py-2">
          <h6 className="fs-6">Patient Information</h6>

          <div className="col-md-6 d-flex gap-2 flex-column">
            <div className="input-group  d-flex gap-2 align-items-center">
              <label htmlFor="" className="form-label">
                ID Number:
              </label>
              <input
                type="text"
                onChange={handleInputChange}
                name="idNumber"
                className="form-control"
              />
            </div>
            <div className="input-group  d-flex gap-2 align-items-center">
              <label htmlFor="" className="form-label">
                First Name:
              </label>
              <input
                type="text"
                onChange={handleInputChange}
                name="firstName"
                className="form-control"
              />
            </div>
            <div className="input-group  d-flex gap-2 align-items-center">
              <label htmlFor="" className="form-label">
                MI:
              </label>
              <input
                type="text"
                onChange={handleInputChange}
                name="mi"
                className="form-control"
              />
            </div>
            <div className="input-group  d-flex gap-2 align-items-center">
              <label htmlFor="" className="form-label">
                Last Name:
              </label>
              <input
                type="text"
                onChange={handleInputChange}
                name="lastName"
                className="form-control"
              />
            </div>
            <div className="input-group  d-flex gap-2 align-items-center">
              <label htmlFor="" className="form-label">
                Suffix:
              </label>
              <input
                onChange={handleInputChange}
                name="suffix"
                type="text"
                className="form-control"
              />
            </div>
            <div className="input-group  d-flex gap-2 align-items-center">
              <label htmlFor="" className="form-label">
                State, Zip:
              </label>
              <div className="input-group">
                <input
                  onChange={handleInputChange}
                  name="state"
                  type="text"
                  className="form-control"
                />
                <input
                  type="text"
                  onChange={handleInputChange}
                  name="zip"
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="col-md-6 d-flex gap-2 flex-column">
            <div className="input-group d-flex gap-2  align-items-center">
              <label htmlFor="" className="form-label">
                Social Security Number:
              </label>
              <input
                type="text"
                onChange={handleInputChange}
                name="socialSecurityNumber"
                className="form-control"
              />
              <label htmlFor="" className="form-check">
                <input
                  type="checkbox"
                  onChange={handleInputChange}
                  checked={formData?.ukUnknownOrNotAvailable}
                  name="ukUnknownOrNotAvailable"
                  value={formData?.ukUnknownOrNotAvailable}
                />{" "}
                Uk-Unknown or Not Available
              </label>
            </div>
            <div className="input-group d-flex gap-2  align-items-center">
              <label htmlFor="" className="form-label">
                Medicare Number:
              </label>
              <input
                type="text"
                onChange={handleInputChange}
                name="medicareNumber"
                className="form-control"
              />
              <label htmlFor="" className="form-check">
                <input
                  type="checkbox"
                  value={formData?.noMedicare}
                  onChange={handleInputChange}
                  checked={formData?.noMedicare}
                  name="noMedicare"
                  id=""
                />{" "}
                NA – No Medicare
              </label>
            </div>
            <div className="input-group d-flex gap-2  align-items-center">
              <label htmlFor="" className="form-label">
                Medicaid Number:
              </label>
              <input
                type="text"
                onChange={handleInputChange}
                name="medicaidNumber"
                checked={formData?.medicaidNumber}
                className="form-control"
              />
              <label htmlFor="" className="form-check">
                <input
                  onChange={handleInputChange}
                  checked={formData?.noMedicaid}
                  type="checkbox"
                  name="noMedicaid"
                  value={formData?.noMedicaid}
                  id=""
                />
                NA – No Medicaid
              </label>
            </div>
            <div className="input-group d-flex gap-2  align-items-center">
              <label htmlFor="" className="form-label">
                Birth Date:
              </label>
              <input
                onChange={handleInputChange}
                name="birthDate"
                type="date"
                className="form-control"
              />
            </div>
          </div>
        </div>

        <div className="row my-2 py-2 border">
          <h6 className="fs-6">Episode Information</h6>
          <div className="col-md-6 d-flex gap-2 flex-column">
            <div className="input-group d-flex gap-2 align-items-center">
              <label htmlFor="" className="form-label">
                Start of care Date
              </label>
              <input
                onChange={handleInputChange}
                name="startOfCareDate"
                type="date"
                className="form-control"
              />
            </div>
            <div className="input-group d-flex gap-2 align-items-center">
              <label htmlFor="" className="form-label">
                Episode Start Date:
              </label>
              <input
                type="date"
                onChange={handleInputChange}
                name="episodeStartDate"
                className="form-control"
              />
            </div>
            <div className="input-group d-flex gap-2 align-items-center">
              <label htmlFor="" className="form-label">
                Resumption of Care Date:
              </label>
              <input
                type="date"
                name="resumptionOfCareDate"
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="input-group d-flex gap-2 align-items-center">
              <label htmlFor="" className="form-label">
                Date Assessment Completed:
              </label>
              <input
                type="date"
                name="dateAssessmentCompleted"
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-md-6 d-flex gap-2 flex-column">
            <div className="input-group d-flex gap-2 align-items-center">
              <label htmlFor="" className="form-label">
                Discipline of Person Completing Assessment:
              </label>
              <select
                name="disciplineOfPersonCompletingAssessment"
                id=""
                className="form-select"
              >
                <option value="1-RT">1-RT</option>
                <option value="2-RT">2-PT</option>
                <option value="3-RT">3-SLP/ST</option>
                <option value="4-RT">4-OT</option>
              </select>
            </div>
            <div className="input-group d-flex gap-2 align-items-center">
              <label htmlFor="" className="form-label">
                CMS Certification Number:
              </label>
              <input
                type="text"
                onChange={handleInputChange}
                name="cmsCertificationNumber"
                className="form-control"
              />
            </div>
            <div className="input-group d-flex gap-2 align-items-center">
              <label htmlFor="" className="form-label">
                Physician NPI Number:
              </label>
              <input
                type="text"
                onChange={handleInputChange}
                name="physicianNpiNumber"
                className="form-control"
              />
            </div>
            <label htmlFor="" className="form-check-label">
              <input
                type="checkbox"
                className="form-check-input"
                onChange={handleInputChange}
                name="notAvailable"
                value={formData?.notAvailable}
                id=""
              />
              Uk-Unknown or Not Available
            </label>
          </div>
        </div>
        <div className="row mt-2">
          <h6 className="fs-6 my-1">Race/Ethnicity</h6>
          <div className="col-md-6 d-flex flex-column gap-2">
            <label htmlFor="" className="form-label">
              Race/Ethnicity(Mark all that apply)
            </label>

            <div className="col-md-6 d-flex gap-2 flex-column">
              <div>
                {[
                  "1- American Indian or Alaska Native",
                  "3- Black or African-American",
                  "5-Black or African-american",
                  "2- Asian",
                  "4- Hispanic or Latino",
                  "16- White",
                ].map((issue) => (
                  <div key={issue}>
                    <label className="d-flex gap-2">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="raceEthnicity"
                        value={issue}
                        id={`raceEthnicity${issue}`}
                        data-category="raceEthnicity"
                        checked={formData?.raceEthnicity?.includes(issue)}
                        onChange={handleCheckboxChange}
                      />
                      {issue}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-2 border py-2">
          <h6 className="fs-6 my-1">Payment Source</h6>
          <div className="col-md-6 d-flex flex-column gap-2">
            <label htmlFor="" className="form-label">
              Current payment sources for home care (Mark all that apply)
            </label>

            <div className="col-md-6 d-flex gap-2 flex-column">
              <div>
                {[
                  "0 – None; no charge for current services",
                  "1 – Medicare (traditional fee-for-service)",
                  "2 – Medicare (HMO/managed care/Advantage plan)",
                  "3 – Medicaid (traditional fee-for-service)",
                  "4 – Medicaid (HMO/managed care)",
                  "5 – Workers’ compensation",
                  "4 – 6 – Title programs (e.g., Title III, V, or XX)",
                  "7 – Other government (e.g., TriCare, VA, etc.)",
                  "8 – Private insurance",
                  "9 – Private HMO/managed care",
                  "10 – Self-pay",
                  "11 – Other",
                  "UK – Unknown",
                ].map((issue) => (
                  <div key={issue}>
                    <label className="d-flex gap-2">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="paymentSource"
                        value={issue}
                        id={`paymentSource${issue}`}
                        data-category="paymentSource"
                        checked={formData?.paymentSource?.includes(issue)}
                        onChange={handleCheckboxChange}
                      />
                      {issue}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex gap-2">
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

export default NonOASISDischarge;
