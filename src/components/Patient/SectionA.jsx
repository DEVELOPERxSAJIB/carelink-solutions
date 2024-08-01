import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSectionState,
  updateFormData,
} from "./../../Redux/slices/SectionSlice";
import { useEffect } from "react";
import { ReactToPrint } from "react-to-print";
const CreatePatient2 = () => {
  const dispatch = useDispatch();
  const componentRef = useRef();
  const data = useSelector(getAllSectionState);
  const [formData, setFormData] = useState({
    npi: "",
    cmsCertificationNumber: "",
    branchState: "",
    branchIdNumber: "",
    patientIdNumber: "",
    startOfCareDate: "",
    resumptionOfCareDate: "",
    patientFirstName: "",
    patientMiddleInitial: "",
    patientLastName: "",
    patientSuffix: "",
    patientStateOfResidence: "",
    patientZipCode: "",
    socialSecurityNumber: "",
    medicareNumber: "",
    medicaidNumber: "",
    gender: "",
    birthDate: "",
    ethnicity: [],
    race: [],
    paymentSources: [],
    preferredLanguage: "",
    needInterpreter: "",
    disciplineOfPersonCompletingAssessment: "",
    dateAssessmentCompleted: "",
    reasonForAssessment: "",
    dischargeTransferDeathDate: "",
    dateOfPhysicianOrderedSOC: "",
    dateOfReferral: "",
    transportation: [],
    inpatientFacilityDischargedFrom: [],
    inpatientDischargeDate: "",
    emergentCare: "",
    reasonForEmergentCare: [],
    inpatientFacilityAdmittedTo: "",
    dischargeDisposition: "",
    medicationListProvided: "",
    routeMedicationListTransmission: [],
    medicationListProvidedToPatient: "",
    routeMedicationListTransmissionToPatient: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked, options } = e.target;

    if (type === "checkbox") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: checked ? value : "",
      }));
    } else if (type === "radio") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
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
    dispatch(updateFormData(formData));
  };
  useEffect(() => {
    setFormData({ ...data });
  }, [data]);

  return (
    <form className="mt-5" onSubmit={handleSubmit}>
      <div className="accordion" id="administrativeInfoAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingAdmin">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseAdmin"
              aria-expanded="true"
              aria-controls="collapseAdmin"
            >
              Administrative Information
            </button>
          </h2>
          <div
            id="collapseAdmin"
            className="accordion-collapse collapse  show"
            aria-labelledby="headingAdmin"
            data-bs-parent="#administrativeInfoAccordion"
          >
        
            <div ref={componentRef} className="accordion-body print-area p-4">
              {/* Fields */}

              <h2 className="print-title">Patient Details</h2>
              <h4 className="print-title">Administrative Information</h4>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="npi" className="form-label">
                    M0018. National Provider Identifier (NPI):
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="npi"
                    name="npi"
                    placeholder="Enter NPI"
                    value={formData.npi}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="cmsCertificationNumber"
                    className="form-label"
                  >
                    M0010. CMS Certification Number:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cmsCertificationNumber"
                    name="cmsCertificationNumber"
                    placeholder="Enter CMS Certification Number"
                    value={formData.cmsCertificationNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="branchState" className="form-label">
                    M0014. Branch State:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="branchState"
                    name="branchState"
                    placeholder="Enter Branch State"
                    value={formData.branchState}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="branchIdNumber" className="form-label">
                    M0016. Branch ID Number:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="branchIdNumber"
                    name="branchIdNumber"
                    placeholder="Enter Branch ID Number"
                    value={formData.branchIdNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="patientIdNumber" className="form-label">
                    M0020. Patient ID Number:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="patientIdNumber"
                    name="patientIdNumber"
                    placeholder="Enter Patient ID Number"
                    value={formData.patientIdNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="startOfCareDate" className="form-label">
                    M0030. Start of Care Date:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="startOfCareDate"
                    name="startOfCareDate"
                    value={formData.startOfCareDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="resumptionOfCareDate" className="form-label">
                    M0032. Resumption of Care Date:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="resumptionOfCareDate"
                    name="resumptionOfCareDate"
                    value={formData.resumptionOfCareDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="patientFirstName" className="form-label">
                    M0040. Patient First Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="patientFirstName"
                    name="patientFirstName"
                    placeholder="Enter First Name"
                    value={formData.patientFirstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="patientMiddleInitial" className="form-label">
                    MI:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="patientMiddleInitial"
                    name="patientMiddleInitial"
                    placeholder="Enter MI"
                    value={formData.patientMiddleInitial}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="patientLastName" className="form-label">
                    M0040. Patient Last Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="patientLastName"
                    name="patientLastName"
                    placeholder="Enter Last Name"
                    value={formData.patientLastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="patientSuffix" className="form-label">
                    Suffix:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="patientSuffix"
                    name="patientSuffix"
                    placeholder="Enter Suffix"
                    value={formData.patientSuffix}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label
                    htmlFor="patientStateOfResidence"
                    className="form-label"
                  >
                    M0050. Patient State of Residence:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="patientStateOfResidence"
                    name="patientStateOfResidence"
                    placeholder="Enter State of Residence"
                    value={formData.patientStateOfResidence}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="patientZipCode" className="form-label">
                    M0060. Patient ZIP Code:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="patientZipCode"
                    name="patientZipCode"
                    placeholder="Enter ZIP Code"
                    value={formData.patientZipCode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="socialSecurityNumber" className="form-label">
                    M0065. Social Security Number:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="socialSecurityNumber"
                    name="socialSecurityNumber"
                    placeholder="Enter Social Security Number"
                    value={formData.socialSecurityNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="medicareNumber" className="form-label">
                    M0070. Medicare Number:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="medicareNumber"
                    name="medicareNumber"
                    placeholder="Enter Medicare Number"
                    value={formData.medicareNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="medicaidNumber" className="form-label">
                    M0075. Medicaid Number:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="medicaidNumber"
                    name="medicaidNumber"
                    placeholder="Enter Medicaid Number"
                    value={formData.medicaidNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="gender" className="form-label">
                    M0080. Gender:
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    className="form-select"
                    value={formData.gender}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="row mb-3 extra-padding">
                <div className="col-md-6">
                  <label htmlFor="birthDate" className="form-label">
                    M0090. Birth Date:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="birthDate"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="ethnicity" className="form-label">
                    M0100. Ethnicity:
                  </label>
                  <select
                    id="ethnicity"
                    name="ethnicity"
                    className="form-select"
                    multiple
                    value={formData.ethnicity}
                    onChange={handleInputChange}
                  >
                    <option value="Hispanic or Latino">
                      Hispanic or Latino
                    </option>
                    <option value="Not Hispanic or Latino">
                      Not Hispanic or Latino
                    </option>
                    <option value="Unknown">Unknown</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="race" className="form-label">
                    M0100. Race:
                  </label>
                  <select
                    id="race"
                    name="race"
                    className="form-select"
                    multiple
                    value={formData.race}
                    onChange={handleInputChange}
                  >
                    <option value="American Indian or Alaska Native">
                      American Indian or Alaska Native
                    </option>
                    <option value="Asian">Asian</option>
                    <option value="Black or African American">
                      Black or African American
                    </option>
                    <option value="Native Hawaiian or Other Pacific Islander">
                      Native Hawaiian or Other Pacific Islander
                    </option>
                    <option value="White">White</option>
                    <option value="Unknown">Unknown</option>
                  </select>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="paymentSources" className="form-label">
                    M0200. Payment Sources:
                  </label>
                  <select
                    id="paymentSources"
                    name="paymentSources"
                    className="form-select"
                    multiple
                    value={formData.paymentSources}
                    onChange={handleInputChange}
                  >
                    <option value="Medicare">Medicare</option>
                    <option value="Medicaid">Medicaid</option>
                    <option value="Private Pay">Private Pay</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="preferredLanguage" className="form-label">
                    M0210. Preferred Language:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="preferredLanguage"
                    name="preferredLanguage"
                    placeholder="Enter Preferred Language"
                    value={formData.preferredLanguage}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="needInterpreter" className="form-label">
                    M0220. Need Interpreter:
                  </label>
                  <select
                    id="needInterpreter"
                    name="needInterpreter"
                    className="form-select"
                    value={formData.needInterpreter}
                    onChange={handleInputChange}
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="disciplineOfPersonCompletingAssessment"
                    className="form-label"
                  >
                    M0230. Discipline of Person Completing Assessment:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="disciplineOfPersonCompletingAssessment"
                    name="disciplineOfPersonCompletingAssessment"
                    placeholder="Enter Discipline"
                    value={formData.disciplineOfPersonCompletingAssessment}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label
                    htmlFor="dateAssessmentCompleted"
                    className="form-label"
                  >
                    M0240. Date Assessment Completed:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dateAssessmentCompleted"
                    name="dateAssessmentCompleted"
                    value={formData.dateAssessmentCompleted}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="reasonForAssessment" className="form-label">
                    M0250. Reason for Assessment:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="reasonForAssessment"
                    name="reasonForAssessment"
                    placeholder="Enter Reason"
                    value={formData.reasonForAssessment}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label
                    htmlFor="dischargeTransferDeathDate"
                    className="form-label"
                  >
                    M0260. Discharge/Transfer/Death Date:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dischargeTransferDeathDate"
                    name="dischargeTransferDeathDate"
                    value={formData.dischargeTransferDeathDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="dateOfPhysicianOrderedSOC"
                    className="form-label"
                  >
                    M0270. Date of Physician Ordered SOC:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dateOfPhysicianOrderedSOC"
                    name="dateOfPhysicianOrderedSOC"
                    value={formData.dateOfPhysicianOrderedSOC}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="dateOfReferral" className="form-label">
                    M0280. Date of Referral:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dateOfReferral"
                    name="dateOfReferral"
                    value={formData.dateOfReferral}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="transportation" className="form-label">
                    M0290. Transportation:
                  </label>
                  <select
                    id="transportation"
                    name="transportation"
                    className="form-select"
                    multiple
                    value={formData.transportation}
                    onChange={handleInputChange}
                  >
                    <option value="Private Car">Private Car</option>
                    <option value="Public Transportation">
                      Public Transportation
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="row mb-3 extra-padding2">
                <div className="col-md-6">
                  <label
                    htmlFor="inpatientFacilityDischargedFrom"
                    className="form-label"
                  >
                    M0300. Inpatient Facility Discharged From:
                  </label>
                  <select
                    id="inpatientFacilityDischargedFrom"
                    name="inpatientFacilityDischargedFrom"
                    className="form-select"
                    multiple
                    value={formData.inpatientFacilityDischargedFrom}
                    onChange={handleInputChange}
                  >
                    <option value="Hospital">Hospital</option>
                    <option value="Nursing Facility">Nursing Facility</option>
                    <option value="Rehabilitation Facility">
                      Rehabilitation Facility
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="inpatientDischargeDate"
                    className="form-label"
                  >
                    M0310. Inpatient Discharge Date:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inpatientDischargeDate"
                    name="inpatientDischargeDate"
                    value={formData.inpatientDischargeDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="emergentCare" className="form-label">
                    M0320. Emergent Care:
                  </label>
                  <select
                    id="emergentCare"
                    name="emergentCare"
                    className="form-select"
                    value={formData.emergentCare}
                    onChange={handleInputChange}
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="reasonForEmergentCare" className="form-label">
                    M0330. Reason for Emergent Care:
                  </label>
                  <select
                    id="reasonForEmergentCare"
                    name="reasonForEmergentCare"
                    className="form-select"
                    multiple
                    value={formData.reasonForEmergentCare}
                    onChange={handleInputChange}
                  >
                    <option value="Unplanned">Unplanned</option>
                    <option value="Planned">Planned</option>
                  </select>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label
                    htmlFor="inpatientFacilityAdmittedTo"
                    className="form-label"
                  >
                    M0340. Inpatient Facility Admitted To:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inpatientFacilityAdmittedTo"
                    name="inpatientFacilityAdmittedTo"
                    placeholder="Enter Facility Name"
                    value={formData.inpatientFacilityAdmittedTo}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="dischargeDisposition" className="form-label">
                    M0350. Discharge Disposition:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="dischargeDisposition"
                    name="dischargeDisposition"
                    placeholder="Enter Disposition"
                    value={formData.dischargeDisposition}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label
                    htmlFor="medicationListProvided"
                    className="form-label"
                  >
                    M0360. Medication List Provided:
                  </label>
                  <select
                    id="medicationListProvided"
                    name="medicationListProvided"
                    className="form-select"
                    value={formData.medicationListProvided}
                    onChange={handleInputChange}
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="routeMedicationListTransmission"
                    className="form-label"
                  >
                    M0370. Route of Medication List Transmission:
                  </label>
                  <select
                    id="routeMedicationListTransmission"
                    name="routeMedicationListTransmission"
                    className="form-select"
                    multiple
                    value={formData.routeMedicationListTransmission}
                    onChange={handleInputChange}
                  >
                    <option value="In-Person">In-Person</option>
                    <option value="Mail">Mail</option>
                    <option value="Fax">Fax</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label
                    htmlFor="medicationListProvidedToPatient"
                    className="form-label"
                  >
                    M0380. Medication List Provided to Patient:
                  </label>
                  <select
                    id="medicationListProvidedToPatient"
                    name="medicationListProvidedToPatient"
                    className="form-select"
                    value={formData.medicationListProvidedToPatient}
                    onChange={handleInputChange}
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="routeMedicationListTransmissionToPatient"
                    className="form-label"
                  >
                    M0390. Route of Medication List Transmission to Patient:
                  </label>
                  <select
                    id="routeMedicationListTransmissionToPatient"
                    name="routeMedicationListTransmissionToPatient"
                    className="form-select"
                    multiple
                    value={formData.routeMedicationListTransmissionToPatient}
                    onChange={handleInputChange}
                  >
                    <option value="In-Person">In-Person</option>
                    <option value="Mail">Mail</option>
                    <option value="Fax">Fax</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="hide-on-print d-flex gap-4 align-items-center">
                <button type="submit" className="btn btn-primary">
                  add
                </button>
                <ReactToPrint
                  trigger={() => (
                    <button className="btn btn-primary">Print</button>
                  )}
                  content={() => componentRef.current}
                  documentTitle="Patient"
                />
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreatePatient2;
