import { useState, useEffect, useRef } from "react";
import CitySelect from "../../components/FormElement/CitySelect";
import StateSelect from "./../../components/FormElement/StateSelect";
import {
  useCreateReferralMutation,
  useCreateTestReferralMutation,
} from "../../Redux/api/ReferalInformation";
import PageHeader from "./../../components/FormElement/PageHeader";
import AuthLoader from "./../../utils/Loaders/AuthLoader";
import { ReactToPrint } from "react-to-print";
import {
  getAllSectionStepState,
  updateSteps,
} from "./../../Redux/slices/SectionStep.js";
import { useSelector, useDispatch } from "react-redux";
import { showToast } from "./../../utils/Toastify";
import AdmitButton from './../../components/Patient/AdmitButton';
const CreateReferralInformation = () => {
  const allSteps = useSelector(getAllSectionStepState);
  const dispatch = useDispatch();
  const componentRef = useRef();
  const [createReferral, { data, error, isLoading, isSuccess }] =
    useCreateReferralMutation();
  const [createTestReferral, { data: testData, error: testError }] =
    useCreateTestReferralMutation();
  const localReferralData = JSON.parse(localStorage.getItem("Referral"));
  const [formData, setFormData] = useState({
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
  // Function to handle input changes
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
    const patientId = JSON.parse(localStorage.getItem("patient"));
    if (patientId?._id || allSteps.patientId) {
      formData.patientId = allSteps.patientId || patientId?._id;
      createReferral(formData);

    } else {
      showToast("error", "Patient id required");
    }
  };

  const handleSaveAndContinue = (e) => {
    e.preventDefault();
    formData.city = city;
    formData.state = state;
   
    createTestReferral(formData);
  };
  const handleSaveAndExit = (e) => {
    e.preventDefault();
    formData.city = city;
    formData.state = state;
   
    createTestReferral(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(updateSteps({ ...allSteps, steps: 0 }));
      localStorage.removeItem("Referral");
      localStorage.removeItem("patient");
    }
    if (testData) {
      dispatch(updateSteps({ ...allSteps, steps: 0 }));
      showToast("success", "Saved, No click on admit");
      localStorage.setItem("Referral", JSON.stringify(testData?.payload));
    }
    if (testError) {
      showToast("error", testError?.data?.message);
    }
  }, [isSuccess, testData, testError]);
  useEffect(() => {
    setCity(localReferralData?.city || "");
    setState(localReferralData?.state || "");
    setFormData({ ...localReferralData });
  }, []);
  useEffect(() => {
    showToast("error", error?.data?.message);
    showToast("success", data?.message);
  }, [error?.data?.message, data?.message]);
  if (isLoading) return <AuthLoader />;

  return (
    <div ref={componentRef} className="card w-100">
      <PageHeader
        title="Referral Information"
        className="card-header fs-3 "
        back={false}
      />
      <div className="card-header"></div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {/* City */}
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
              <StateSelect selectedState={state} setSelectedState={setState} />
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
              <label htmlFor="typeOfInpatientAdmission" className="form-label">
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
          <div className="row hide-on-print">
            <div className="d-flex justify-content-end mt-3 hide-on-print gap-3">
              {" "}
              <AdmitButton/>

              <button
                onClick={handleSaveAndContinue}
                type="button"
                className="btn btn-primary me-2"
              >
                save and continue
              </button>
              <button
                onClick={handleSaveAndExit}
                type="button"
                className="btn btn-secondary me-2"
              >
                save and exit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateReferralInformation;
