import { useState, useEffect } from "react";
import PageHeader from "./../../FormElement/PageHeader";
import Template from "./../../FormElement/Template";
import {
  useGetCommunicationNoteByIdQuery,
  useCreateCommunicationNoteMutation,
} from "../../../Redux/api/VisitType/CommunicationNoteApi";
import { showToast } from "./../../../utils/Toastify";
const CommunicationNote = ({ data }) => {
  const [createCommunication, { data: communicationData, error, isSuccess }] =
    useCreateCommunicationNoteMutation();
  const { data: getData } = useGetCommunicationNoteByIdQuery(data?._id);
  const [communicationText, setCommunicationText] = useState("");

  const [formData, setFormData] = useState({
    date: "",
    physician: "",
    communication: "",
    messageUsers: [],
    staffSignature: "",
    signatureDate: "",
    time: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    formData.scheduleId = data?._id;
    formData.visitType = data.visitType;
    formData.patientId = data?.patientId;
    formData.episode = data?.episode;
    createCommunication(formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      communication: prev.communication + communicationText.value,
    }));
  }, [communicationText.value]);

  useEffect(() => {
    if (isSuccess) {
      showToast("success", communicationData?.message);
    }
    if (error) {
      showToast("error", error?.data?.message);
    }
  }, [isSuccess, error, communicationData]);
  useEffect(() => {
    if (getData?.payload?.record) {
      const { date, signatureDate, ...rest } = getData.payload.record;

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
        date: formatDate(date),
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
        <div className="row mt-2">
          <div className="col-md-6">
            <div className="input-group d-flex gap-2 align-items-center">
              <label className="form-label text-bold">Patient Name:</label>{" "}
              <span className="d-inline-block">{data?.patientName}</span>
            </div>
            <div className="input-group d-flex">
              <label className="form-label">Episode Associated:</label>
              <span className="d-inline-block">{data?.episode}</span>
            </div>
            <div className="input-group d-flex gap-2 align-items-center">
              <label className="form-label">Date:</label>{" "}
              <input
                name="date"
                value={formData?.date}
                onChange={handleInputChange}
                type="date"
                className="form-control"
              />
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="" className="form-label">
              Physician:
            </label>
            <div className="input-group border d-flex gap-2 align-items-center">
              {" "}
              <i className="ti ti-search p-1"></i>{" "}
              <input type="text" className="form-control" />
            </div>
            <button className="btn btn-primary mt-2">New Physician</button>
          </div>
        </div>
        <div className="row mt-2">
          <Template
            setSelectedTemplate={setCommunicationText}
            selectedTemplate={communicationText}
          />
          <textarea
            id="id"
            name="name"
            value={formData?.communication}
            placeholder="Communication Text"
            onChange={handleInputChange}
            className="w-full mt-2 p-4 bg-transparent border border-gray-200 rounded-lg outline-none resize-none min-h-[150px]"
          />
        </div>
        <div className="row mt-2">
          <p>Send note as Message:</p>
        </div>
        <div className="row mt-2">
          <h6 className="fs-5 my-2">Electronic Signature</h6>
          <div className="row py-2 d-flex">
            <div className="col-md-4 bg-white p-2">
              <label htmlFor="staffSignature" className="form-label">
                Staff Signature
              </label>
              <input
                type="text"
                name="staffSignature"
                className="form-control"
                value={formData?.staffSignature || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-4 bg-white p-2">
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
            <div className="col-md-4 bg-white p-2">
              <label htmlFor="Time" className="form-label">
                Time
              </label>
              <input
                type="time"
                name="time"
                className="form-control"
                value={formData?.time || ""}
                onChange={handleInputChange}
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

export default CommunicationNote;
