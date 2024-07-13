import { useState } from "react";

const CreateReferralInformation = () => {
  const [formData, setFormData] = useState({
    city: "",
    state: "",
    referringPhysician: "",
    npi: "",
    certifyingPhysician: "",
    facetoFaceEvaluation: "",
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

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <div className="card">
      <h2>Referral Information Form</h2>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {/* City */}
          <div className="row">
            <div className="mb-3 col-md-6">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>

            {/* State */}
            <div className="mb-3 col-md-6">
              <label htmlFor="state" className="form-label">
                State
              </label>
              <input
                type="text"
                className="form-control"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
              />
            </div>

            {/* Referring Physician */}
            <div className="mb-3 col-md-6">
              <label htmlFor="referringPhysician" className="form-label">
                Referring Physician
              </label>
              <input
                type="text"
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
                <label htmlFor="facetoFaceEvaluation" className="form-label">
                  Face-to-Face Evaluation
                </label>
                <div>
                  <input
                    name="facetoFaceEvaluation"
                    value="Face-to-Face to be completed within 30days"
                    checked={
                      formData.facetoFaceEvaluation ===
                      "Face-to-Face to be completed within 30days"
                    }
                    onChange={handleInputChange}
                    id=""
                  />
                  <label htmlFor="">N/A</label>
                </div>
                <div>
                  <input name="facetoFaceEvaluation"
                    value="Date of Face-to-Face Visit"
                    checked={
                      formData.facetoFaceEvaluation ===
                      "Date of Face-to-Face Visit"
                    }
                    onChange={handleInputChange} type="checkbox"  />
                  <label htmlFor="">Date of Face-to-Face Visit:</label>
                </div>
                <div>
                  <input name="facetoFaceEvaluation"
                    value="Face-to-Face to be completed within 30days"
                    checked={
                      formData.facetoFaceEvaluation ===
                      "Face-to-Face to be completed within 30days"
                    }
                    onChange={handleInputChange} type="checkbox" />
                  <label htmlFor="">
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
              <select className="form-control" name="" id="">
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
                <option value=" Information Not Available">
                  {" "}
                  Information Not Available
                </option>
                <option value=" Emergency Room"> Emergency Room</option>
              </select>
            </div>

            {/* Admission Source */}
            <div className="mb-3 col-md-6">
              <label htmlFor="admissionSource" className="form-label">
                Admission Source
              </label>
              <input
                type="text"
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
              <input
                type="text"
                className="form-control"
                id="communityLiaison"
                name="communityLiaison"
                value={formData.communityLiaison}
                onChange={handleInputChange}
              />
            </div>

            {/* Internal Referral Source */}
            <div className="mb-3 col-md-6">
              <label htmlFor="internalReferralSource" className="form-label">
                Internal Referral Source
              </label>
              <input
                type="text"
                className="form-control"
                id="internalReferralSource"
                name="internalReferralSource"
                value={formData.internalReferralSource}
                onChange={handleInputChange}
              />
            </div>

            {/* Facility Referral Source */}
            <div className="mb-3 col-md-6">
              <label htmlFor="facilityReferralSource" className="form-label">
                Facility Referral Source
              </label>
              <input
                type="text"
                className="form-control"
                id="facilityReferralSource"
                name="facilityReferralSource"
                value={formData.facilityReferralSource}
                onChange={handleInputChange}
              />
            </div>

            {/* Type of Inpatient Admission */}
            <div className="mb-3 col-md-6">
              <label htmlFor="typeOfInpatientAdmission" className="form-label">
                Type of Inpatient Admission
              </label>
              <input
                type="text"
                className="form-control"
                id="typeOfInpatientAdmission"
                name="typeOfInpatientAdmission"
                value={formData.typeOfInpatientAdmission}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateReferralInformation;
