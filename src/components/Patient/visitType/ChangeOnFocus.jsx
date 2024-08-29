import { useState, useEffect } from "react";
import PageHeader from "./../../FormElement/PageHeader";
import Template from "./../../FormElement/Template";
import {
  useCreateChangeInFocusMutation,
  useGetChangeInFocusByIdQuery,
} from "../../../Redux/api/VisitType/ChangeInFocus";
import { showToast } from "./../../../utils/Toastify";
const ChangeOnFocus = ({ data }) => {
  const [createChangeInFocus, { data: focusData, error, isSuccess }] =
    useCreateChangeInFocusMutation();
  const { data: getData } = useGetChangeInFocusByIdQuery(data?._id);
  const [focusNarrativeText, setFocusNarrativeText] = useState("");

  const [formData, setFormData] = useState({
    clinicianSignature: "",
    visitDate: "",
    signatureDate: "",
    focusNarrative: "",
  });

  const [diagnosisList, setDiagnosisList] = useState([
    { diagnosis: "", code: "", severity: "0" },
  ]);
  const handleSubmit = (e) => {
    e.preventDefault();
    formData.scheduleId = data?._id;
    formData.visitType = data.visitType;
    formData.patientId = data?.patientId;
    formData.episode = data?.episode;
    createChangeInFocus({ ...formData, ...diagnosisList });
    console.log(formData);
  };

  const handleAddDiagnosis = () => {
    setDiagnosisList([
      ...diagnosisList,
      { diagnosis: "", code: "", severity: "0" },
    ]);
  };

  const handleRemoveDiagnosis = (index) => {
    const list = [...diagnosisList];
    list.splice(index, 1);
    setDiagnosisList(list);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (focusNarrativeText && focusNarrativeText.value) {
      setFormData((prev) => ({
        ...prev,
        focusNarrative: (prev.focusNarrative || "") + focusNarrativeText.value,
      }));
    }
  }, [focusNarrativeText]);

  useEffect(() => {
    if (isSuccess) {
      showToast("success", focusData.message);
    }
    if (error) {
      showToast("error", error?.data?.message);
    }
  }, [isSuccess, error, focusData]);
  useEffect(() => {
    if (getData?.payload?.record) {
      let updateData = { ...getData?.payload?.record };
      if (updateData?.visitDate) {
        const visitDate = new Date(updateData?.visitDate);
        updateData.visitDate = visitDate.toISOString().split("T")[0];
      }
      if (updateData?.signatureDate) {
        const signatureDate = new Date(updateData?.signatureDate);
        updateData.signatureDate = signatureDate.toISOString().split("T")[0];
      }
      setFormData(updateData);
      // setDiagnosisList(getData?.payload?.record?.diagnosis);
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
        <div className="row bg-secondary p-3">
          <h6 className="fs-5 text-white">Visit Information</h6>
          <div className="col-md-4 bg-white p-2">
            <label htmlFor="" className="form-label">
              Visit Date
            </label>
            <input
              onChange={handleInputChange}
              type="date"
              name="visitDate"
              value={formData?.visitDate}
              className="form-control"
            />
          </div>
          <div className="col-md-4  bg-white p-2">
            <label htmlFor="" className="form-label">
              Primary Diagnosis
            </label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-4  bg-white p-2">
            <label htmlFor="" className="form-label">
              Secondary Diagnosis
            </label>
            <input type="text" className="form-control" />
          </div>
        </div>
        <div className="row bg-success mt-2">
          <h6 className="fs-5 text-white mt-3">Diagnoses Symptom Control</h6>
          <p>
            <span className="fs-6 text-black">
              (M1021/1023) Diagnoses and Symptom Control:
            </span>
            List each diagnosis for which the patient is receiving home care in
            Column 1, and enter its ICD-10-CM code at the level of highest
            specificity in Column 2 (diagnosis codes only – no surgical or
            procedure codes allowed). Diagnoses are listed in the order that
            best reflects the seriousness of each condition and supports the
            disciplines and services provided. Rate the degree of symptom
            control for each condition in Column 2. ICD-10-CM sequencing
            requirements must be followed if multiple coding is indicated for
            any diagnoses.
          </p>
          <h6 className="mt-2">Primary Diagnosis</h6>
          <div className="card bg-transparent border">
            <h6 className="mt-2">Diagnosis Item</h6>
            <h6 className="">(M1021) Primary Diagnosis</h6>
            <div className="row d-flex align-items-center">
              <div className="col-md-6">
                <div className="input-group bg-white">
                  <input
                    placeholder="ICD-10-CM Diagnosis"
                    type="text"
                    className="form-control"
                  />
                  <button className="btn">
                    <ti className="ti ti-search"></ti>
                  </button>
                </div>
              </div>
              <div className="col-md-4">
                <div className="input-group bg-white">
                  <input
                    placeholder="ICD-10-CM Code"
                    type="text"
                    className="form-control"
                  />
                  <button className="btn">
                    <ti className="ti ti-search"></ti>
                  </button>
                </div>
              </div>
              <div className="col-md-2 my-2 ">
                <div className=" bg-white p-2 rounded">
                  <label htmlFor="" className="input-label">
                    Severity
                  </label>
                  <select
                    onChange={handleInputChange}
                    name=""
                    id=""
                    className="form-select"
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              {diagnosisList?.length > 0 && (
                <h6 className="mt-2">Other Diagnosis</h6>
              )}
            </div>
            {diagnosisList?.map((item, index) => (
              <div className="row d-flex align-items-center" key={index}>
                <div className="col-md-4">
                  <div className="input-group bg-white">
                    <input
                      placeholder="ICD-10-CM Diagnosis"
                      type="text"
                      className="form-control"
                      value={item.diagnosis}
                      onChange={(e) => {
                        const updatedList = [...diagnosisList];
                        updatedList[index].diagnosis = e.target.value;
                        setDiagnosisList(updatedList);
                      }}
                    />
                    <button className="btn">
                      <i className="ti ti-search"></i>
                    </button>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="input-group bg-white">
                    <input
                      placeholder="ICD-10-CM Code"
                      type="text"
                      className="form-control"
                      value={item.code}
                      onChange={(e) => {
                        const updatedList = [...diagnosisList];
                        updatedList[index].code = e.target.value;
                        setDiagnosisList(updatedList);
                      }}
                    />
                    <button className="btn">
                      <i className="ti ti-search"></i>
                    </button>
                  </div>
                </div>
                <div className="col-md-2 my-2">
                  <div className="bg-white p-2 rounded">
                    <label
                      htmlFor={`severity-${index}`}
                      className="input-label"
                    >
                      Severity
                    </label>
                    <select
                      name={`severity-${index}`}
                      id={`severity-${index}`}
                      className="form-select"
                      value={item.severity}
                      onChange={(e) => {
                        const updatedList = [...diagnosisList];
                        updatedList[index].severity = e.target.value;
                        setDiagnosisList(updatedList);
                      }}
                    >
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-2 my-2 d-flex justify-content-end align-items-center">
                  <span
                    onClick={() => handleRemoveDiagnosis(index)}
                    className="btn btn-danger"
                  >
                    <i className="ti ti-trash"></i>
                  </span>
                </div>
              </div>
            ))}
            <div className="row d-flex align-items-center justify-content-center my-3 px-2">
              <span onClick={handleAddDiagnosis} className="btn btn-primary">
                Add Another Diagnosis
              </span>
            </div>
          </div>
        </div>
        <div className="row bg-secondary my-2 p-2">
          <h6 className="fs-5 font-bolder text-white">
            Change in Focus Narrative
          </h6>

          <div className="col-md-12 bg-white p-2 ">
            <Template
              setSelectedTemplate={setFocusNarrativeText}
              selectedTemplate={focusNarrativeText}
            />
          </div>
          <div className="col-md-12 bg-white p-2">
            <p className="my-2">You have 5000 characters remaining.</p>
            <textarea
              value={formData.focusNarrative}
              name="focusNarrative"
              id=""
              onChange={handleInputChange}
              className="form-control"
            ></textarea>
          </div>
        </div>
        <div className="row bg-secondary p-2 my-2">
          <h6 className="text-white fs-5">Order/Case-Mix</h6>
          <div className="col-md-7 bg-white p-2">
            <p>
              To document new interventions for an existing diagnosis, add a new
              order.
            </p>
            <button className="btn btn-primary">Add New Order</button>
          </div>
          <div className="col-md-5 bg-white p-2">
            <p>
              The case-mix will calculate based on the new diagnosis sequencing
              and most recent OASIS data for admission source and timing and
              functional impairment.
            </p>
            <button className="btn btn-primary">Calculate Case-Mix</button>
          </div>
        </div>
        <div className="row bg-secondary d-flex justify-content-center align-items-center">
          <h6 className="text-start fs-5 mb-0 py-1 text-white bg-secondary">
            Electronic Signature
          </h6>
          <div className="row py-2 d-flex">
            <div className="col-md-6 bg-white p-2">
              <label htmlFor="clinicianSignature" className="form-label">
                Clinician Signature
              </label>
              <input
                type="text"
                name="clinicianSignature"
                className="form-control"
                value={formData?.clinicianSignature || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    clinicianSignature: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-md-6 bg-white p-2">
              <label htmlFor="signatureDate" className="form-label">
                Signature Date
              </label>
              <input
                type="date"
                name="signatureDate"
                className="form-control"
                value={formData?.signatureDate || ""}
                onChange={(e) =>
                  setFormData({ ...formData, signatureDate: e.target.value })
                }
              />
            </div>
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

export default ChangeOnFocus;
