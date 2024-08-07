import DataTable from "./../../components/Tables/DynamicTable";

import ExportButton from "./../../components/Buttons/ExportButton";
import TableHeader from "./../../components/Tables/TableHeader";
import {
  useGetAllReferralsQuery,
  useUpdateReferralMutation,
  useDeleteReferralMutation,
} from "../../Redux/api/ReferalInformation";
import { useNavigate } from "react-router-dom";
import MainLoader from "./../../utils/Loaders/MainLoader";
import { useEffect, useState } from "react";

import CitySelect from "../../components/FormElement/CitySelect";
import StateSelect from "./../../components/FormElement/StateSelect";
import EditModal from "./../../components/Models/EditModal";
import swal  from "sweetalert";
import Alert from "./../../components/Alert/Alert";
import { useMeQuery } from "../../Redux/api/UserApi";
const ReferralInformation = () => {
  const { data: lgData } = useMeQuery();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState("");
  const [date,setDate] = useState("")
  const { data, isLoading, refetch } = useGetAllReferralsQuery();
  const [
    updateReferral,
    { data: updateData, isSuccess: isUpdateSuccess, error: updateError },
  ] = useUpdateReferralMutation();
  const [
    deleteReferral,
    { data: deleteData, isSuccess: isDeleteSuccess, error: deleteError },
  ] = useDeleteReferralMutation();
  const columns = [
    { header: "City", field: "city" },
    { header: "State", field: "state" },
    { header: "Referring Physician", field: "referringPhysician" },
    { header: "NPI", field: "npi" },
    { header: "Certifying Physician", field: "certifyingPhysician" },
    { header: "Face to Face Evaluation", field: "faceToFaceEvaluation" },
    { header: "Attending Physician", field: "attendingPhysician" },
    { header: "Admission Source", field: "admissionSource" },
    { header: "Name of Referral Source", field: "nameOfReferralSource" },
    { header: "Referral Date", field: "referralDate" },
    { header: "Inquiry Date", field: "inquiryDate" },
    { header: "Community Liaison", field: "communityLiaison" },
    { header: "Internal Referral Source", field: "internalReferralSource" },
    { header: "Facility Referral Source", field: "facilityReferralSource" },
    {
      header: "Type of Inpatient Admission",
      field: "typeOfInpatientAdmission",
    },
  ];

  const [formData, setFormData] = useState({
    city: "",
    state: "",
    referringPhysician: "",
    npi: "",
    certifyingPhysician: "",
    faceToFaceEvaluation: "",
    attendingPhysician: "",
    admissionSource: "",
    nameOfReferralSource: "",
    referralDate: "",
    inquiryDate: "",
    communityLiaison: "",
    internalReferralSource: "",
    facilityReferralSource: "",
    typeOfInpatientAdmission: "",
  });
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
//console.log(formData.faceToFaceEvaluation)
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked ? value : "",
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.city = city;
    formData.state = state;
    updateReferral({ referralId: editId, referralData: formData });
  };

  const handleEdit = (row) => {
    setEditId(row._id); 
    setShow(true);
    setDate(row.faceToFaceEvaluation)
    setFormData({...row})
    setState(row.state);
    setCity(row.city);
  };
  
  
  const handleDelete = (row) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteReferral(row._id);
      }
    });
  };
  useEffect(() => {
    if (isUpdateSuccess) {
      refetch();
      setShow(false);
    }
    if (isDeleteSuccess) {
      refetch();
    }
  }, [isUpdateSuccess, isDeleteSuccess]);
  const message = updateData?.message || deleteData?.message;
  const errors = updateError?.data?.message || deleteError?.data?.message;
  if (isLoading) return <MainLoader />;

  return (
    <div className="card">
      <TableHeader
        title="Referral information"
        className="py-3 pt-5 fs-3 card-header"
      />
      <Alert message={message} type="success" />
      {show && (
        <EditModal
          style={{
            minWidth: "70%",
            maxWidth: "70%",
            maxHeight: "80vh",
            overflowY: "scroll",
          }}
          onClose={setShow}
          title="Edit Referral information"
        >
          <form onSubmit={handleSubmit}>
            {/* City */}
            <Alert message={errors} type="danger" />
            <div className="row">
              <div className="mb-3 col-md-6">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <CitySelect
                  stateCode={state}
                  selectedCity={city}
                  setSelectedCity={setCity}
                />
              </div>

              {/* State */}
              <div className="mb-3 col-md-6">
                <label htmlFor="state" className="form-label">
                  State
                </label>
                <StateSelect
                  selectedState={state}
                  setSelectedState={setState}
                />
              </div>

              {/* Referring Physician */}
              <div className="mb-3 col-md-6">
                <label htmlFor="referringPhysician" className="form-label">
                  Referring Physician
                </label>
                <input
                  type="text"
                  placeholder="Referring Physician"
                  className="form-control"
                  id="referringPhysician"
                  name="referringPhysician"
                  value={formData.referringPhysician}
                  onChange={handleInputChange}
                />
              </div>

              {/* NPI */}
              <div className="mb-3 col-md-6">
                <label htmlFor="npi" className="form-label">
                  NPI
                </label>
                <input
                  type="text"
                  placeholder="NPI"
                  className="form-control"
                  id="npi"
                  name="npi"
                  value={formData.npi}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                {/* Face-to-Face Evaluation */}
                <div className="mb-3">
                  <label htmlFor="faceToFaceEvaluation" className="form-label">
                    Face-to-Face Evaluation
                  </label>
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="faceToFaceEvaluation"
                      value="N/A"
                      checked={formData.faceToFaceEvaluation === "N/A"}
                      onChange={handleInputChange}
                      id="faceToFaceEvaluationNA"
                    />
                    <label
                      className="form-label mx-2"
                      htmlFor="faceToFaceEvaluationNA"
                    >
                      N/A
                    </label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="faceToFaceEvaluation"
                      value="Date of Face-to-Face Visit"
                      checked={
                        formData.faceToFaceEvaluation ===
                        "Date of Face-to-Face Visit"
                      }
                      onChange={handleInputChange}
                      id="faceToFaceEvaluationDate"
                    />
                    <label
                      className="form-label mx-2"
                      htmlFor="faceToFaceEvaluationDate"
                    >
                      Date of Face-to-Face Visit:
                    </label>

                    {formData.faceToFaceEvaluation ===
                      "Date of Face-to-Face Visit" && (
                      <div className="my-2 ml-5">
                        <input
                          className="form-control"
                          name="faceToFaceEvaluation"
                          onChange={handleInputChange}
                          type="date"
                          value={date?date:formData.faceToFaceEvaluation}
                        />
                 
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="faceToFaceEvaluation"
                      value="Face-to-Face to be completed within 30days"
                      checked={
                        formData.faceToFaceEvaluation ===
                        "Face-to-Face to be completed within 30days"
                      }
                      onChange={handleInputChange}
                      id="faceToFaceEvaluation30Days"
                    />
                    <label
                      className="form-label mx-2"
                      htmlFor="faceToFaceEvaluation30Days"
                    >
                      Face-to-Face to be completed within 30days
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              {/* Certifying Physician */}
              <div className="mb-3 col-md-6">
                <label htmlFor="certifyingPhysician" className="form-label">
                  Certifying Physician
                </label>
                <input
                  type="text"
                  placeholder="Certifying physician"
                  className="form-control"
                  id="certifyingPhysician"
                  name="certifyingPhysician"
                  value={formData.certifyingPhysician}
                  onChange={handleInputChange}
                />
              </div>

              {/* Attending Physician */}
              <div className="mb-3 col-md-6">
                <label className="form-check-label">Attending Physician</label>
                <select
                  className="form-control"
                  name="attendingPhysician"
                  id="attendingPhysician"
                  value={formData.attendingPhysician}
                  onChange={handleInputChange}
                >
                  <option value="">Select Option</option>
                  <option value="Non-Healthcare Facility Point of Origin">
                    Non-Healthcare Facility Point of Origin
                  </option>
                  <option value="Clinic or Physician's Office">
                    Clinic or Physician&apos;s Office
                  </option>
                  <option value="Transfer From Hospital">
                    Transfer From Hospital
                  </option>
                  <option value="Transfer From SNF">Transfer From SNF</option>
                  <option value="Court/Law Enforcement">
                    Court/Law Enforcement
                  </option>
                  <option value="Information Not Available">
                    Information Not Available
                  </option>
                  <option value="Emergency Room">Emergency Room</option>
                </select>
              </div>

              {/* Admission Source */}
              <div className="mb-3 col-md-6">
                <label htmlFor="admissionSource" className="form-label">
                  Admission Source
                </label>
                <input
                  type="text"
                  placeholder="Admission source"
                  className="form-control"
                  id="admissionSource"
                  name="admissionSource"
                  value={formData.admissionSource}
                  onChange={handleInputChange}
                />
              </div>

              {/* Name of Referral Source */}
              <div className="mb-3 col-md-6">
                <label htmlFor="nameOfReferralSource" className="form-label">
                  Name of Referral Source
                </label>
                <input
                  type="text"
                  placeholder="Name of referral source"
                  className="form-control"
                  id="nameOfReferralSource"
                  name="nameOfReferralSource"
                  value={formData.nameOfReferralSource}
                  onChange={handleInputChange}
                />
              </div>

              {/* Referral Date */}
              <div className="mb-3 col-md-6">
                <label htmlFor="referralDate" className="form-label">
                  Referral Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="referralDate"
                  name="referralDate"
                  value={formData.referralDate}
                  onChange={handleInputChange}
                />
              </div>

              {/* Inquiry Date */}
              <div className="mb-3 col-md-6">
                <label htmlFor="inquiryDate" className="form-label">
                  Inquiry Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="inquiryDate"
                  name="inquiryDate"
                  value={formData.inquiryDate}
                  onChange={handleInputChange}
                />
              </div>

              {/* Community Liaison */}
              <div className="mb-3 col-md-6">
                <label htmlFor="communityLiaison" className="form-label">
                  Community Liaison
                </label>
                <select
                  type="text"
                  placeholder="Community Liaison"
                  className="form-control"
                  id="communityLiaison"
                  name="communityLiaison"
                  value={formData.communityLiaison}
                  onChange={handleInputChange}
                >
                  <option value="">select</option>
                  <option value="Elieth Kamala RN">Elieth Kamala RN</option>
                </select>
              </div>

              {/* Internal Referral Source */}
              <div className="mb-3 col-md-6">
                <label htmlFor="internalReferralSource" className="form-label">
                  Internal Referral Source
                </label>
                <select
                  type="text"
                  placeholder="Internal referral source"
                  className="form-control"
                  id="internalReferralSource"
                  name="internalReferralSource"
                  value={formData.internalReferralSource}
                  onChange={handleInputChange}
                >
                  <option value="CHAP Surveyor">CHAP Surveyor</option>
                  <option value="Deqa Ahmed RN">Deqa Ahmed RN</option>
                  <option value="Deqa Ahmed RN">Deqa Ahmed RN</option>
                </select>
              </div>
              {/* CHAP Surveyor Deqa Ahmed RN Elieth Kamala RN Emmanuel Agbitor RN Felix Oppong RN Khadra Ahmed HHA Mohamed Adan HHA Omer Mohamed Rahmo Haji-Ibrahim RN Sagal Shidad RN */}
              {/* Facility Referral Source */}
              <div className="mb-3 col-md-6">
                <label htmlFor="facilityReferralSource" className="form-label">
                  Facility Referral Source
                </label>
                <select
                  className="form-control"
                  id="facilityReferralSource"
                  name="facilityReferralSource"
                  value={formData.facilityReferralSource}
                  onChange={handleInputChange}
                >
                  <option value="">Select option</option>
                </select>
              </div>

              {/* Type of Inpatient Admission */}
              {/* Emergency Urgent Elective Newborn Trauma Information Not Available */}
              <div className="mb-3 col-md-6">
                <label
                  htmlFor="typeOfInpatientAdmission"
                  className="form-label"
                >
                  Type of Inpatient Admission
                </label>
                <select
                  className="form-control"
                  id="typeOfInpatientAdmission"
                  name="typeOfInpatientAdmission"
                  value={formData.typeOfInpatientAdmission}
                  onChange={handleInputChange}
                >
                  <option value="Emergency">Emergency</option>
                  <option value="Urgent">Urgent</option>
                  <option value="Elective">Elective</option>
                  <option value="Newborn">Newborn</option>
                  <option value="Trauma">Trauma</option>
                  <option value="Information">Information</option>
                  <option value="Not Available">Not Available</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="row">
              <div className="col-md-12">
                {" "}
                <button type="submit" className="btn btn-success me-2">
                  save
                </button>
              </div>
            </div>
          </form>
        </EditModal>
      )}
      <div className="card-body">
        <div className="gap-3 d-flex flex-wrap">
          <ExportButton
            orientation="landscape"
            data={data?.payload?.referrals ?? []}
            columns={columns}
            fileName="Referral information"
          />
           {lgData?.payload?.user?.curd?.includes("delete") &&
          <button
            className="btn btn-secondary create-new btn-danger waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-trash me-sm-1" />{" "}
              <span className="d-none d-sm-inline-block">Delete selected</span>
            </span>
          </button>
           }

 {lgData?.payload?.user?.curd?.includes("delete") &&
          <button
            className="btn btn-info waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-archive me-1" />
              <span className="d-none d-sm-inline-block">Archive </span>
            </span>
          </button>
 }
  {lgData?.payload?.user?.curd?.includes("create") &&
          <button
            className="btn btn-success waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
            onClick={() => navigate("/create-referral-information")}
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-archive me-1" />
              <span className="d-none d-sm-inline-block">Add New Referral</span>
            </span>
          </button>
  }
        </div>
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={data?.payload?.referrals ?? []}
            tableClassName="custom-table"
            tableName="referralInformation"
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default ReferralInformation;
