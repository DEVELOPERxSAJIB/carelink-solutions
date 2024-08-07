import { useCompanyProfileGetByIdQuery } from "../../Redux/api/SettingApi";
import { useMeQuery } from "../../Redux/api/UserApi";
import { useGetPatientByIdQuery } from "../../Redux/api/PatientApi";
import React, { useState, useEffect } from "react";
import { useGetDirectiveByPatientIdQuery } from "../../Redux/api/DirectiveApi";
import { useGetClinicalDiagnosisByPatientIdQuery } from "../../Redux/api/ClinicalDiagnosis";
import { useGetContactByPatientIdQuery } from "../../Redux/api/Contact";
import { useGetEmergencyByPatientIdQuery } from "../../Redux/api/EmergencyApi";
import { useGetPayerByPatientIdQuery } from "../../Redux/api/PayerApi";
import { useGetPharmacyByPatientIdQuery } from "../../Redux/api/PharmacyApi";
import { useGetPhysicianByPatientIdQuery } from "../../Redux/api/PhysicianApi";
import { useGetReferralByPatientIdQuery } from "../../Redux/api/ReferalInformation";
import { useParams } from "react-router-dom";
import PdfHeader from "./PdfHeader";
const SinglePatient = () => {
  const { data } = useMeQuery();
  const { id } = useParams();
  const { data: patient } = useGetPatientByIdQuery(id);
  const { data: company } = useCompanyProfileGetByIdQuery(
    data?.payload?.user?._id
  );
  const { data: directiveData } = useGetDirectiveByPatientIdQuery(id);
  const { data: singleClinical } = useGetClinicalDiagnosisByPatientIdQuery(id);
  const { data: singleContact } = useGetContactByPatientIdQuery(id);
  const { data: singleEmergency } = useGetEmergencyByPatientIdQuery(id);
  const { data: singlePayer } = useGetPayerByPatientIdQuery(id);
  const { data: singlePharmacy } = useGetPharmacyByPatientIdQuery(id);
  const { data: singlePhysician } = useGetPhysicianByPatientIdQuery(id);
  const { data: singleReferral } = useGetReferralByPatientIdQuery(id);
  const [formData, setFormData] = useState({});
  console.log(
    patient,
    directiveData?.payload?.directive,
    singleClinical?.payload?.clinical,
    singleContact?.payload?.contact,
    singleEmergency?.payload?.emergency,
    singlePayer?.payload?.payer,
    singlePharmacy?.payload?.pharmacy,
    singlePhysician?.payload?.physician,
    singleReferral?.payload?.referral
  );
  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    setFormData({ ...patient?.payload });
  }, [patient]);
  useEffect(() => {
    setFormData({ ...patient?.payload });
    setFormData({
      ...directiveData?.payload?.directive,
      ...singleClinical?.payload?.clinical,
      ...singleContact?.payload?.contact,
      ...singleEmergency?.payload?.emergency,
      ...singlePayer?.payload?.payer,
      ...singlePharmacy?.payload?.pharmacy,
      ...singlePhysician?.payload?.physician,
      ...singleReferral?.payload?.referral,
    });
  }, [
    patient,
    directiveData?.payload?.directive,
    singleClinical?.payload?.clinical,
    singleContact?.payload?.contact,
    singleEmergency?.payload?.emergency,
    singlePayer?.payload?.payer,
    singlePharmacy?.payload?.pharmacy,
    singlePhysician?.payload?.physician,
    singleReferral?.payload?.referral,
  ]);

  return (
    <div>
      <button
        onClick={handlePrint}
        className="hide-on-print btn btn-primary my-5 ml-auto"
      >
        Patient profile
      </button>
      <div className="layout-page w-100">
        {/* Navbar */}

        {/* / Navbar */}
        {/* Content wrapper */}
        <div className="content-wrapper">
          {/* Content */}
          <div className="container-xxl flex-grow-1">
            <div className="row invoice-preview ">
              {/* Invoice */}
              <div className="col-xl-12 col-md-12 col-12 mb-md-0">
                <div className=" invoice-preview-card  ">
                  <PdfHeader
                    company={company?.payload?.company}
                    patient={patient?.payload}
                  />
                  <div className=" px-0 w-100">
                    <div className="row w-100">
                      <div className="col-xl-12 col-md-12 col-sm-12 col-12 mb-xl-0 mb-md-6 mb-sm-0 mb-6">
                        <hr />
                        <h6>Administrative Information</h6>
                        <hr />
                        <div className="row ">
                          <div className="col-md-6 w-50">
                            <label
                              htmlFor="npi"
                              className="form-label d-inline-block font-bold"
                            >
                              M0018. National Provider Identifier (NPI):
                            </label>

                            {formData && formData?.npi}
                          </div>
                          <div className="col-md-6 w-50">
                            <label
                              htmlFor="cmsCertificationNumber"
                              className="form-label d-inline-block font-bold"
                            >
                              M0010. CMS Certification Number:
                            </label>

                            {formData && formData?.cmsCertificationNumber}
                          </div>
                        </div>

                        <div className="row ">
                          <div className="col-md-6 w-50">
                            <label
                              htmlFor="branchState"
                              className="form-label d-inline-block font-bold"
                            >
                              M0014. Branch State:
                            </label>

                            {formData && formData?.branchState}
                          </div>
                          <div className="col-md-6 w-50">
                            <label
                              htmlFor="branchIdNumber"
                              className="form-label d-inline-block font-bold"
                            >
                              M0016. Branch ID Number:
                            </label>

                            {formData && formData?.branchIdNumber}
                          </div>
                        </div>

                        <div className="row ">
                          <div className="col-md-6 w-50">
                            <label
                              htmlFor="patientIdNumber"
                              className="form-label d-inline-block font-bold"
                            >
                              M0020. Patient ID Number:
                            </label>

                            {formData && formData?.patientIdNumber}
                          </div>
                          <div className="col-md-6 w-50">
                            <label
                              htmlFor="startOfCareDate"
                              className="form-label d-inline-block font-bold"
                            >
                              M0030. Start of Care Date:
                            </label>

                            {formData && formData?.startOfCareDate}
                          </div>
                        </div>

                        <div className="row ">
                          <div className="col-md-6 w-50">
                            <label
                              htmlFor="resumptionOfCareDate"
                              className="form-label d-inline-block font-bold"
                            >
                              M0032. Resumption of Care Date:
                            </label>
                            {formData && formData?.resumptionOfCareDate}
                          </div>
                        </div>

                        <div className="row ">
                          <div className="col-md-6 w-50">
                            <label
                              htmlFor="patientFirstName"
                              className="form-label d-inline-block font-bold"
                            >
                              M0040. Patient First Name:
                            </label>

                            {formData && formData?.patientFirstName}
                          </div>
                          <div className="col-md-6 w-50">
                            <label
                              htmlFor="patientMiddleInitial"
                              className="form-label d-inline-block font-bold"
                            >
                              MI:
                            </label>
                            {formData && formData?.patientMiddleInitial}
                          </div>
                        </div>

                        <div className="row ">
                          <div className="col-md-6 w-50">
                            <label
                              htmlFor="patientLastName"
                              className="form-label d-inline-block font-bold"
                            >
                              M0040. Patient Last Name:
                            </label>
                            {formData && formData?.patientLastName}
                          </div>
                          <div className="col-md-6 w-50">
                            <label
                              htmlFor="patientSuffix"
                              className="form-label d-inline-block font-bold"
                            >
                              Suffix:
                            </label>
                            {formData && formData?.patientSuffix}
                          </div>
                        </div>

                        <div className="row ">
                          <div className="col-md-6 w-50">
                            <label
                              htmlFor="patientStateOfResidence"
                              className="form-label d-inline-block font-bold"
                            >
                              M0050. Patient State of Residence:
                            </label>
                            {formData && formData?.patientStateOfResidence}
                          </div>
                          <div className="col-md-6 w-50">
                            <label
                              htmlFor="patientZipCode"
                              className="form-label d-inline-block font-bold"
                            >
                              M0060. Patient ZIP Code:
                            </label>
                            {formData && formData?.patientZipCode}
                          </div>
                        </div>

                        <div className="row ">
                          <div className="col-md-6 w-50">
                            <label
                              htmlFor="socialSecurityNumber"
                              className="form-label d-inline-block font-bold"
                            >
                              M0065. Social Security Number:
                            </label>
                            {formData && formData?.socialSecurityNumber}
                          </div>
                          <div className="col-md-6 w-50">
                            <label
                              htmlFor="medicareNumber"
                              className="form-label d-inline-block font-bold"
                            >
                              M0070. Medicare Number:
                            </label>
                            {formData && formData?.medicareNumber}
                          </div>
                        </div>

                        <div className="row ">
                          <div className="col-md-6 w-50">
                            <label
                              htmlFor="medicaidNumber"
                              className="form-label d-inline-block font-bold"
                            >
                              M0075. Medicaid Number:
                            </label>
                            {formData && formData?.medicaidNumber}
                          </div>
                          <div className="col-md-6 w-50">
                            <label
                              htmlFor="gender"
                              className="form-label d-inline-block font-bold"
                            >
                              M0080. Gender:
                            </label>
                            {formData && formData?.gender}
                          </div>
                          <div className="col-md-6 w-50">
                            <label
                              htmlFor="birthDate"
                              className="form-label d-inline-block font-bold"
                            >
                              M0090. Birth Date:
                            </label>
                            {formData && formData?.birthDate}
                          </div>
                          <div className="col-md-6 w-50">
                            <label
                              htmlFor="ethnicity"
                              className="form-label d-inline-block font-bold"
                            >
                              M0100. Ethnicity:
                            </label>
                            {formData && formData?.ethnicity}
                          </div>
                          <div className="col-md-6 w-50">
                            <label
                              htmlFor="race"
                              className="form-label d-inline-block font-bold"
                            >
                              M0100. Race:
                            </label>
                            {formData && formData?.race}
                          </div>
                          <div className="col-md-6 w-50">
                            <label
                              htmlFor="paymentSources"
                              className="form-label d-inline-block font-bold"
                            >
                              M0200. Payment Sources:
                            </label>
                            {formData && formData?.paymentSources}
                          </div>
                          <div className="col-md-6 w-50">
                            <label
                              htmlFor="preferredLanguage"
                              className="form-label d-inline-block font-bold"
                            >
                              M0210. Preferred Language:
                            </label>
                            {formData && formData?.preferredLanguage}
                          </div>
                          <div className="col-md-6 w-50">
                            <label
                              htmlFor="needInterpreter"
                              className="form-label d-inline-block font-bold"
                            >
                              M0220. Need Interpreter:
                            </label>
                            {formData && formData?.needInterpreter}
                          </div>
                          <div className="col-md-6 w-50">
                            <label
                              htmlFor="disciplineOfPersonCompletingAssessment"
                              className="form-label d-inline-block font-bold"
                            >
                              M0230. Discipline of Person Completing Assessment:
                            </label>
                            {formData &&
                              formData?.disciplineOfPersonCompletingAssessment}
                          </div>
                        </div>

                        <div className="row ">
                          <div className="col-md-6 w-50">
                            <label
                              htmlFor="dateAssessmentCompleted"
                              className="form-label d-inline-block font-bold"
                            >
                              M0240. Date Assessment Completed:
                            </label>
                            {formData && formData?.dateAssessmentCompleted}
                          </div>
                          <div className="col-md-6 w-50">
                            <label
                              htmlFor="reasonForAssessment"
                              className="form-label d-inline-block font-bold"
                            >
                              M0250. Reason for Assessment:
                            </label>
                            {formData && formData?.reasonForAssessment}
                          </div>
                        </div>

                        <div className="row ">
                          <div className="col-md-6 w-50">
                            <label
                              htmlFor="dischargeTransferDeathDate"
                              className="form-label d-inline-block font-bold"
                            >
                              M0260. Discharge/Transfer/Death Date:
                            </label>
                            {formData && formData?.dischargeTransferDeathDate}
                          </div>
                          <div className="col-md-6 w-50">
                            <label
                              htmlFor="dateOfPhysicianOrderedSOC"
                              className="form-label d-inline-block font-bold"
                            >
                              M0270. Date of Physician Ordered SOC:
                            </label>
                            {formData && formData?.dateOfPhysicianOrderedSOC}
                          </div>
                        </div>

                        <div className="row ">
                          <div className="col-md-6 w-50">
                            <label
                              htmlFor="dateOfReferral"
                              className="form-label d-inline-block font-bold"
                            >
                              M0280. Date of Referral:
                            </label>
                            {formData && formData?.dateOfReferral}
                          </div>
                          <div className="col-md-6 w-50">
                            <label
                              htmlFor="transportation"
                              className="form-label d-inline-block font-bold"
                            >
                              M0290. Transportation:
                            </label>
                            {formData && formData?.transportation}
                          </div>
                        </div>

                        <div className="row ">
                          <div className="col-md-6 w-50">
                            <label
                              htmlFor="inpatientFacilityDischargedFrom"
                              className="form-label d-inline-block font-bold"
                            >
                              M0300. Inpatient Facility Discharged From:
                            </label>
                            {formData &&
                              formData?.inpatientFacilityDischargedFrom}
                          </div>
                          <div className="col-md-6 w-50">
                            <label
                              htmlFor="inpatientDischargeDate"
                              className="form-label d-inline-block font-bold"
                            >
                              M0310. Inpatient Discharge Date:
                            </label>
                            {formData && formData?.inpatientDischargeDate}
                          </div>
                        </div>

                        <div className="row ">
                          <div className="col-md-6 w-50">
                            <label
                              htmlFor="emergentCare"
                              className="form-label d-inline-block font-bold"
                            >
                              M0320. Emergent Care:
                            </label>
                            {formData && formData?.emergentCare}
                          </div>
                          <div className="col-md-6 w-50">
                            <label
                              htmlFor="reasonForEmergentCare"
                              className="form-label d-inline-block font-bold"
                            >
                              M0330. Reason for Emergent Care:
                            </label>
                            {formData && formData?.reasonForEmergentCare}
                          </div>
                        </div>

                        <div className="row ">
                          <div className="col-md-6 w-50">
                            <label
                              htmlFor="inpatientFacilityAdmittedTo"
                              className="form-label d-inline-block font-bold"
                            >
                              M0340. Inpatient Facility Admitted To:
                            </label>
                            {formData && formData?.inpatientFacilityAdmittedTo}
                          </div>
                          <div className="col-md-6 w-50">
                            <label
                              htmlFor="dischargeDisposition"
                              className="form-label d-inline-block font-bold"
                            >
                              M0350. Discharge Disposition:
                            </label>
                            {formData && formData?.dischargeDisposition}
                          </div>
                        </div>

                        <div className="row ">
                          <div className="col-md-6 w-50">
                            <label
                              htmlFor="medicationListProvided"
                              className="form-label d-inline-block font-bold"
                            >
                              M0360. Medication List Provided:
                            </label>
                            {formData && formData?.medicationListProvided}
                          </div>
                          <div className="col-md-6 w-50">
                            <label
                              htmlFor="routeMedicationListTransmission"
                              className="form-label d-inline-block font-bold"
                            >
                              M0370. Route of Medication List Transmission:
                            </label>
                            {formData &&
                              formData?.routeMedicationListTransmission}
                          </div>
                        </div>

                        <div className="row ">
                          <div className="col-md-6 w-50">
                            <label
                              htmlFor="medicationListProvidedToPatient"
                              className="form-label d-inline-block font-bold"
                            >
                              M0380. Medication List Provided to Patient:
                            </label>
                            {formData &&
                              formData?.medicationListProvidedToPatient}
                          </div>
                          <div className="col-md-6 w-50">
                            <label
                              htmlFor="routeMedicationListTransmissionToPatient"
                              className="form-label d-inline-block font-bold"
                            >
                              M0390. Route of Medication List Transmission to
                              Patient:
                            </label>
                            {formData &&
                              formData?.routeMedicationListTransmissionToPatient}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "60px" }} className="">
                <PdfHeader
                  company={company?.payload?.company}
                  patient={patient?.payload}
                />
              </div>
              <div className="col-xl-6 col-md-6 col-6 mb-md-0">
                <hr />
                <h6>Hearing, Speech, and Vision</h6>
                <hr />
                <div className="row">
                  <div className=" col-md-6">
                    <label
                      htmlFor="hearing"
                      className="form-label d-inline-block font-bold"
                    >
                      B0200. Hearing:
                    </label>
                    {formData && formData?.hearing}
                  </div>

                  {/* Vision */}
                  <div className=" col-md-6">
                    <label
                      htmlFor="vision"
                      className="form-label d-inline-block font-bold"
                    >
                      B1000. Vision:
                    </label>
                    {formData && formData?.vision}
                  </div>
                </div>
                <div className="row">
                  {/* Health Literacy */}
                  <div className=" col-md-6">
                    <label
                      htmlFor="healthLiteracy"
                      className="form-label d-inline-block font-bold"
                    >
                      B1300. Health Literacy:
                    </label>
                    {formData && formData?.healthLiteracy}
                  </div>
                </div>
                <hr />
                <h6>Mood</h6>
                <hr />
                <div className="row">
                  <div className=" col-md-6 w-50">
                    <label
                      htmlFor="patientMoodUnderstood"
                      className="form-label d-inline-block font-bold"
                    >
                      D0150. Is the patient rarely/never understood verbally, in
                      writing, or using another method?
                    </label>
                    {formData && formData?.patientMoodUnderstood}
                  </div>
                  {/* PHQ-2 to 9 Questions */}
                  {formData && formData?.patientMoodUnderstood !== "9" && (
                    <>
                      <div className="row">
                        <div className="row col-md-6 w-50">
                          <div className="col-md-6">
                            <label
                              htmlFor="littleInterestPresence"
                              className="form-label d-inline-block font-bold"
                            >
                              A. Little interest or pleasure in doing things
                            </label>
                            {formData && formData?.littleInterestPresence}
                          </div>
                          {formData &&
                            formData?.littleInterestPresence === "1" && (
                              <div className="col-md-6">
                                <label
                                  htmlFor="littleInterestFrequency"
                                  className="form-label d-inline-block font-bold"
                                >
                                  Symptom Frequency
                                </label>
                                {formData && formData?.littleInterestFrequency}
                              </div>
                            )}
                        </div>

                        <div className="row col-md-6 w-50">
                          <div className="col-md-6">
                            <label
                              htmlFor="feelingDownPresence"
                              className="form-label d-inline-block font-bold"
                            >
                              B. Feeling down, depressed, or hopeless
                            </label>
                            {formData && formData?.feelingDownPresence}
                          </div>
                          {formData &&
                            formData?.feelingDownPresence === "1" && (
                              <div className="col-md-6">
                                <label
                                  htmlFor="feelingDownFrequency"
                                  className="form-label d-inline-block font-bold"
                                >
                                  Symptom Frequency
                                </label>
                                {formData && formData?.feelingDownFrequency}
                              </div>
                            )}
                        </div>

                        {/* Additional PHQ-2 to 9 Questions */}
                        {/* Repeat similar structure for C to I */}
                        {/* C. Trouble falling or staying asleep, or sleeping too much */}
                        <div className="row col-md-6 w-50">
                          <div className="col-md-6">
                            <label
                              htmlFor="troubleSleepingPresence"
                              className="form-label d-inline-block font-bold"
                            >
                              C. Trouble falling or staying asleep, or sleeping
                              too much
                            </label>
                            {formData && formData?.troubleSleepingPresence}
                          </div>
                          {formData &&
                            formData?.troubleSleepingPresence === "1" && (
                              <div className="col-md-6">
                                <label
                                  htmlFor="troubleSleepingFrequency"
                                  className="form-label d-inline-block font-bold"
                                >
                                  Symptom Frequency
                                </label>
                                {formData && formData?.troubleSleepingFrequency}
                              </div>
                            )}
                        </div>

                        {/* D. Feeling tired or having little energy */}
                        <div className="row col-md-6 w-50">
                          <div className="col-md-6">
                            <label
                              htmlFor="feelingTiredPresence"
                              className="form-label d-inline-block font-bold"
                            >
                              D. Feeling tired or having little energy
                            </label>
                            {formData && formData?.feelingTiredPresence}
                          </div>
                          {formData &&
                            formData?.feelingTiredPresence === "1" && (
                              <div className="col-md-6">
                                <label
                                  htmlFor="feelingTiredFrequency"
                                  className="form-label d-inline-block font-bold"
                                >
                                  Symptom Frequency
                                </label>
                                {formData && formData?.feelingTiredFrequency}
                              </div>
                            )}
                        </div>

                        {/* E. Poor appetite or overeating */}
                        <div className="row col-md-6 w-50">
                          <div className="col-md-6">
                            <label
                              htmlFor="poorAppetitePresence"
                              className="form-label d-inline-block font-bold"
                            >
                              E. Poor appetite or overeating
                            </label>
                            {formData && formData?.poorAppetitePresence}
                          </div>
                          {formData &&
                            formData?.poorAppetitePresence === "1" && (
                              <div className="col-md-6">
                                <label
                                  htmlFor="poorAppetiteFrequency"
                                  className="form-label d-inline-block font-bold"
                                >
                                  Symptom Frequency
                                </label>
                                {formData && formData?.poorAppetiteFrequency}
                              </div>
                            )}
                        </div>

                        {/* F. Feeling bad about yourself */}
                        <div className="row col-md-6 w-50">
                          <div className="col-md-6">
                            <label
                              htmlFor="feelingBadPresence"
                              className="form-label d-inline-block font-bold"
                            >
                              F. Feeling bad about yourself
                            </label>
                            {formData && formData?.feelingBadPresence}
                          </div>
                          {formData && formData?.feelingBadPresence === "1" && (
                            <div className="col-md-6">
                              <label
                                htmlFor="feelingBadFrequency"
                                className="form-label d-inline-block font-bold"
                              >
                                Symptom Frequency
                              </label>
                              {formData && formData?.feelingBadFrequency}
                            </div>
                          )}
                        </div>

                        {/* G. Trouble concentrating */}
                        <div className="row col-md-6 w-50">
                          <div className="col-md-6">
                            <label
                              htmlFor="troubleConcentratingPresence"
                              className="form-label d-inline-block font-bold"
                            >
                              G. Trouble concentrating
                            </label>
                            {formData && formData?.troubleConcentratingPresence}
                          </div>
                          {formData &&
                            formData?.troubleConcentratingPresence === "1" && (
                              <div className="col-md-6">
                                <label
                                  htmlFor="troubleConcentratingFrequency"
                                  className="form-label d-inline-block font-bold"
                                >
                                  Symptom Frequency
                                </label>
                                {formData &&
                                  formData?.troubleConcentratingFrequency}
                              </div>
                            )}
                        </div>

                        <div className="row col-md-6 w-50">
                          <div className="col-md-6">
                            <label
                              htmlFor="movingSlowlyPresence"
                              className="form-label d-inline-block font-bold"
                            >
                              H. Moving or speaking slowly or being fidgety
                            </label>
                            {formData && formData?.movingSlowlyPresence}
                          </div>
                          {formData &&
                            formData?.movingSlowlyPresence === "1" && (
                              <div className="col-md-6">
                                <label
                                  htmlFor="movingSlowlyFrequency"
                                  className="form-label d-inline-block font-bold"
                                >
                                  Symptom Frequency
                                </label>
                                {formData && formData?.movingSlowlyFrequency}
                              </div>
                            )}
                        </div>

                        {/* I. Thoughts of self-harm */}
                        <div className="row col-md-6 w-50">
                          <div className="col-md-6">
                            <label
                              htmlFor="thoughtsOfHarmingPresence"
                              className="form-label d-inline-block font-bold"
                            >
                              I. Thoughts of harming yourself
                            </label>
                            {formData && formData?.thoughtsOfHarmingPresence}
                          </div>
                          {formData &&
                            formData?.thoughtsOfHarmingPresence === "1" && (
                              <div className="col-md-6">
                                <label
                                  htmlFor="thoughtsOfHarmingFrequency"
                                  className="form-label d-inline-block font-bold"
                                >
                                  Symptom Frequency
                                </label>
                                {formData &&
                                  formData?.thoughtsOfHarmingFrequency}
                              </div>
                            )}
                        </div>

                        {/* Total Severity Score */}
                        <div className="row">
                          <label
                            htmlFor="totalSeverityScore"
                            className="form-label d-inline-block font-bold"
                          >
                            D0160. Total Severity Score
                          </label>
                          {formData && formData?.totalSeverityScore}
                        </div>
                      </div>
                    </>
                  )}
                  {/* Social Isolation */}
                  <div className="col-md-6 w-50">
                    <label
                      htmlFor="socialIsolation"
                      className="form-label d-inline-block font-bold"
                    >
                      D0700. Social Isolation: How often do you feel lonely or
                      isolated from those around you?
                    </label>
                    {formData && formData?.socialIsolation}
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-md-6 col-6 mb-md-0 ">
                <hr />
                <h6>Cognitive Patterns</h6>
                <hr />
                <div className="row">
                  <div className=" col-md-6">
                    <label
                      htmlFor="interviewConducted"
                      className="form-label d-inline-block font-bold"
                    >
                      C0100. Should Brief Interview for Mental Status
                      (C0200-C0500) be Conducted?
                    </label>
                    {formData && formData?.interviewConducted}
                  </div>

                  {/* Repetition of Three Words */}
                  <div className=" col-md-6">
                    <label
                      htmlFor="repetitionOfThreeWords"
                      className="form-label d-inline-block font-bold"
                    >
                      C0200. Repetition of Three Words:
                    </label>
                    {formData && formData?.repetitionOfThreeWords}
                  </div>
                </div>

                <div className="row">
                  {/* Temporal Orientation */}
                  <div className=" col-md-6">
                    <label className="form-label d-inline-block font-bold mx-1">
                      C0300. Temporal Orientation:
                    </label>
                    <div className="row">
                      <div className="col-md-4">
                        <label
                          htmlFor="temporalOrientationYear"
                          className="form-label d-inline-block font-bold"
                        >
                          Year
                        </label>
                        {formData && formData?.temporalOrientationYear}
                      </div>
                      <div className="col-md-4">
                        <label
                          htmlFor="temporalOrientationMonth"
                          className="form-label d-inline-block font-bold"
                        >
                          Month
                        </label>
                        {formData && formData?.temporalOrientationMonth}
                      </div>
                      <div className="col-md-4">
                        <label
                          htmlFor="temporalOrientationDay"
                          className="form-label d-inline-block font-bold"
                        >
                          Day
                        </label>
                        {formData && formData?.temporalOrientationDay}
                      </div>
                    </div>
                  </div>

                  {/* Recall */}
                  <div className=" col-md-6">
                    <label className="form-label d-inline-block font-bold mx-1">
                      C0400. Recall:
                    </label>
                    <div className="row">
                      <div className="col-md-4">
                        <label
                          htmlFor="recallSock"
                          className="form-label d-inline-block font-bold"
                        >
                          A. Able to recall &quot;sock&ldquo;
                        </label>
                        {formData && formData?.recallSock}
                      </div>
                      <div className="col-md-4">
                        <label
                          htmlFor="recallBlue"
                          className="form-label d-inline-block font-bold"
                        >
                          B. Able to recall &quot;blue &ldquo;
                        </label>
                        {formData && formData?.recallBlue}
                      </div>
                      <div className="col-md-4">
                        <label
                          htmlFor="recallBed"
                          className="form-label d-inline-block font-bold"
                        >
                          C. Able to recall &quot;bed&ldquo;
                        </label>
                        {formData && formData?.recallBed}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  {/* BIMS Summary Score */}
                  <div className=" col-md-6">
                    <label
                      htmlFor="bimsSummaryScore"
                      className="form-label d-inline-block font-bold"
                    >
                      C0500. BIMS Summary Score:
                    </label>
                    {formData && formData?.bimsSummaryScore}
                  </div>

                  {/* Signs and Symptoms of Delirium */}
                  <div className=" col-md-6">
                    <label className="form-label d-inline-block font-bold mx-1">
                      C1310. Signs and Symptoms of Delirium:
                    </label>
                    <div className="row">
                      <div className="col-md-3">
                        <label
                          htmlFor="deliriumMentalStatusChange"
                          className="form-label d-inline-block font-bold"
                        >
                          A. Acute Onset of Mental Status Change
                        </label>
                        {formData && formData?.deliriumMentalStatusChange}
                      </div>
                      <div className="col-md-3">
                        <label
                          htmlFor="deliriumInattention"
                          className="form-label d-inline-block font-bold"
                        >
                          B. Inattention
                        </label>
                        {formData && formData?.deliriumInattention}
                      </div>
                      <div className="col-md-3">
                        <label
                          htmlFor="deliriumDisorganizedThinking"
                          className="form-label d-inline-block font-bold"
                        >
                          C. Disorganized thinking
                        </label>
                        {formData && formData?.deliriumDisorganizedThinking}
                      </div>
                      <div className="col-md-3">
                        <label
                          htmlFor="deliriumAlteredConsciousness"
                          className="form-label d-inline-block font-bold"
                        >
                          D. Altered level of consciousness
                        </label>
                        {formData && formData?.deliriumAlteredConsciousness}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className=" col-md-6">
                    <label
                      htmlFor="cognitiveFunctioning"
                      className="form-label d-inline-block font-bold"
                    >
                      M1700. Cognitive Functioning:
                    </label>
                    {formData && formData?.cognitiveFunctioning}
                  </div>

                  {/* When Confused */}
                  <div className=" col-md-6">
                    <label
                      htmlFor="whenConfused"
                      className="form-label d-inline-block font-bold"
                    >
                      M1710. When Confused:
                    </label>
                    {formData && formData?.whenConfused}
                  </div>
                </div>

                <div className="row">
                  {/* When Anxious */}
                  <div className=" col-md-6">
                    <label
                      htmlFor="whenAnxious"
                      className="form-label d-inline-block font-bold"
                    >
                      M1720. When Anxious:
                    </label>
                    {formData && formData?.whenAnxious}
                  </div>
                </div>
              </div>

              <div
                style={{ marginTop: "170px" }}
                className="col-xl-12  col-md-12 col-12 mb-md-0"
              >
                <PdfHeader
                  company={company?.payload?.company}
                  patient={patient?.payload}
                />
                <h6>Behavior</h6>
                <hr />
                <div className="">
                  <label className="form-label d-inline-block font-bold mx-1">
                    M1740. Cognitive, Behavioral, and Psychiatric Symptoms
                    (check all that apply)
                  </label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="memoryDeficit"
                      name="memoryDeficit"
                      checked={formData && formData?.memoryDeficit}
                    />
                    <label
                      className="form-label d-block"
                      htmlFor="memoryDeficit"
                    >
                      1. Memory deficit
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="impairedDecisionMaking"
                      name="impairedDecisionMaking"
                      checked={formData && formData?.impairedDecisionMaking}
                    />
                    <label
                      className="form-label d-block"
                      htmlFor="impairedDecisionMaking"
                    >
                      2. Impaired decision-making
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="verbalDisruption"
                      name="verbalDisruption"
                      checked={formData && formData?.verbalDisruption}
                    />
                    <label
                      className="form-label d-block"
                      htmlFor="verbalDisruption"
                    >
                      3. Verbal disruption
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="physicalAggression"
                      name="physicalAggression"
                      checked={formData && formData?.physicalAggression}
                    />
                    <label
                      className="form-label d-block"
                      htmlFor="physicalAggression"
                    >
                      4. Physical aggression
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="disruptiveBehavior"
                      name="disruptiveBehavior"
                      checked={formData && formData?.disruptiveBehavior}
                    />
                    <label
                      className="form-label d-block"
                      htmlFor="disruptiveBehavior"
                    >
                      5. Disruptive, infantile, or socially inappropriate
                      behavior
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="delusionalBehavior"
                      name="delusionalBehavior"
                      checked={formData && formData?.delusionalBehavior}
                    />
                    <label
                      className="form-label d-block"
                      htmlFor="delusionalBehavior"
                    >
                      6. Delusional, hallucinatory, or paranoid behavior
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="noneOfTheAbove"
                      name="noneOfTheAbove"
                      checked={formData && formData?.noneOfTheAbove}
                    />
                    <label
                      className="form-label d-block"
                      htmlFor="noneOfTheAbove"
                    >
                      7. None of the above behaviors demonstrated
                    </label>
                  </div>
                </div>

                {/* M1745: Frequency of Disruptive Behavior Symptoms */}
                <div className="">
                  <label
                    htmlFor="disruptiveBehaviorFrequency"
                    className="form-label d-inline-block font-bold"
                  >
                    M1745. Frequency of Disruptive Behavior Symptoms
                  </label>
                  {formData && formData?.disruptiveBehaviorFrequency}
                </div>
              </div>

              <div className="col-xl-12 col-md-12 col-12 mb-md-0 ">
                <hr />
                <h6>Preferences for Customary Routine and Activities</h6>
                <hr />
                <div className="row w-100">
                  <div className=" col-md-6 w-50">
                    <label className="form-label d-inline-block font-bold mx-1">
                      M1100. Patient Living Situation
                    </label>

                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="livingArrangement"
                          value="A01"
                          checked={
                            formData && formData?.livingArrangement === "A01"
                          }
                        />
                        Patient lives alone, Around the clock
                      </label>
                    </div>

                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="livingArrangement"
                          value="A02"
                          checked={
                            formData && formData?.livingArrangement === "A02"
                          }
                        />
                        Patient lives alone, Regular Daytime
                      </label>
                    </div>
                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="livingArrangement"
                          value="B06"
                          checked={
                            formData && formData?.livingArrangement === "B06"
                          }
                        />
                        Patient lives with other person(s), Around the clock
                      </label>
                    </div>
                    {/* Add more radio buttons as needed */}
                  </div>
                  {/* M2102: Types and Sources of Assistance */}
                  <div className=" col-md-6 w-50">
                    <label className="form-label d-inline-block font-bold mx-1">
                      M2102. Types and Sources of Assistance
                    </label>

                    <div className="mb-2">
                      <label className="form-label d-inline-block font-bold mx-1">
                        a. ADL assistance
                      </label>
                      {formData && formData?.adlAssistance}
                    </div>

                    <div className="mb-2">
                      <label className="form-label d-inline-block font-bold mx-1">
                        c. Medication administration
                      </label>
                      {formData && formData?.medicationAssistance}
                    </div>

                    <div className="mb-2">
                      <label className="form-label d-inline-block font-bold mx-1">
                        d. Medical procedures/treatments
                      </label>
                      {formData && formData?.medicalProceduresAssistance}
                    </div>

                    <div className="mb-2">
                      <label className="form-label d-inline-block font-bold mx-1">
                        f. Supervision and safety (due to cognitive impairment)
                      </label>
                      {formData && formData?.supervisionSafetyAssistance}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-12 col-md-12 col-12 mb-md-0 ">
                <div className="row w-100">
                  <div className=" col-md-6 w-50">
                    <label className="form-label d-inline-block font-bold mx-1">
                      M1800. Grooming
                    </label>
                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="grooming"
                          value="0"
                          checked={formData && formData?.grooming === "0"}
                        />
                        Able to groom self unaided
                      </label>
                    </div>
                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="grooming"
                          value="1"
                          checked={formData && formData?.grooming === "1"}
                        />
                        Grooming utensils must be placed within reach
                      </label>
                    </div>
                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="grooming"
                          value="2"
                          checked={formData && formData?.grooming === "2"}
                        />
                        Someone must assist the patient
                      </label>
                    </div>
                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="grooming"
                          value="3"
                          checked={formData && formData?.grooming === "3"}
                        />
                        Patient depends entirely upon someone else
                      </label>
                    </div>
                  </div>

                  {/* M1810: Upper Body Dressing */}
                  <div className=" col-md-6 w-50">
                    <label className="form-label d-inline-block font-bold mx-1">
                      M1810. Current Ability to Dress Upper Body
                    </label>
                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="upperBodyDressing"
                          value="0"
                          checked={
                            formData && formData?.upperBodyDressing === "0"
                          }
                        />
                        Able to dress upper body independently
                      </label>
                    </div>
                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="upperBodyDressing"
                          value="1"
                          checked={
                            formData && formData?.upperBodyDressing === "1"
                          }
                        />
                        Able to dress upper body if clothing is laid out
                      </label>
                    </div>
                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="upperBodyDressing"
                          value="2"
                          checked={
                            formData && formData?.upperBodyDressing === "2"
                          }
                        />
                        Someone must help the patient
                      </label>
                    </div>
                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="upperBodyDressing"
                          value="3"
                          checked={
                            formData && formData?.upperBodyDressing === "3"
                          }
                        />
                        Patient depends entirely upon another person
                      </label>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "150px" }} className="row">
                  <PdfHeader
                    company={company?.payload?.company}
                    patient={patient?.payload}
                  />
                  {/* M1820: Lower Body Dressing */}
                  <div className=" col-md-6 w-50">
                    <label className="form-label d-inline-block font-bold mx-1">
                      M1820. Current Ability to Dress Lower Body
                    </label>
                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="lowerBodyDressing"
                          value="0"
                          checked={
                            formData && formData?.lowerBodyDressing === "0"
                          }
                        />
                        Able to dress lower body independently
                      </label>
                    </div>

                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="lowerBodyDressing"
                          value="1"
                          checked={
                            formData && formData?.lowerBodyDressing === "1"
                          }
                        />
                        Able to dress lower body if clothing is laid out
                      </label>
                    </div>
                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="lowerBodyDressing"
                          value="2"
                          checked={
                            formData && formData?.lowerBodyDressing === "2"
                          }
                        />
                        Someone must help the patient
                      </label>
                    </div>
                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="lowerBodyDressing"
                          value="3"
                          checked={
                            formData && formData?.lowerBodyDressing === "3"
                          }
                        />
                        Patient depends entirely upon another person
                      </label>
                    </div>
                  </div>

                  {/* M1830: Bathing */}
                  <div className=" col-md-6 w-50">
                    <label className="form-label d-inline-block font-bold mx-1">
                      M1830. Bathing
                    </label>
                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="bathing"
                          value="0"
                          checked={formData && formData?.bathing === "0"}
                        />
                        Able to bathe self independently
                      </label>
                    </div>
                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="bathing"
                          value="1"
                          checked={formData && formData?.bathing === "1"}
                        />
                        Able to bathe with the use of devices
                      </label>
                    </div>
                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="bathing"
                          value="2"
                          checked={formData && formData?.bathing === "2"}
                        />
                        Able to bathe with intermittent assistance
                      </label>
                    </div>
                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="bathing"
                          value="3"
                          checked={formData && formData?.bathing === "3"}
                        />
                        Requires presence of another person throughout the bath
                      </label>
                    </div>
                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="bathing"
                          value="4"
                          checked={formData && formData?.bathing === "4"}
                        />
                        Unable to use shower/tub, but can bathe at sink or chair
                      </label>
                    </div>
                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="bathing"
                          value="5"
                          checked={formData && formData?.bathing === "5"}
                        />
                        Unable to use shower/tub, but can bathe in bed or with
                        assistance
                      </label>
                    </div>
                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="bathing"
                          value="6"
                          checked={formData && formData?.bathing === "6"}
                        />
                        Unable to participate in bathing
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row">
                  {/* M1840: Toilet Transferring */}

                  <div className=" col-md-6 w-50">
                    <label className="form-label d-inline-block font-bold mx-1">
                      M1840. Toilet Transferring
                    </label>
                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="toiletTransferring"
                          value="0"
                          checked={
                            formData && formData?.toiletTransferring === "0"
                          }
                        />
                        Able to get to and from the toilet independently
                      </label>
                    </div>
                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="toiletTransferring"
                          value="1"
                          checked={
                            formData && formData?.toiletTransferring === "1"
                          }
                        />
                        Able to get to and from toilet with assistance
                      </label>
                    </div>
                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="toiletTransferring"
                          value="2"
                          checked={
                            formData && formData?.toiletTransferring === "2"
                          }
                        />
                        Unable to get to toilet, but can use bedside commode
                      </label>
                    </div>
                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="toiletTransferring"
                          value="3"
                          checked={
                            formData && formData?.toiletTransferring === "3"
                          }
                        />
                        Unable to get to toilet or commode, but can use
                        bedpan/urinal independently
                      </label>
                    </div>
                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="toiletTransferring"
                          value="4"
                          checked={
                            formData && formData?.toiletTransferring === "4"
                          }
                        />
                        Totally dependent in toileting
                      </label>
                    </div>
                  </div>

                  {/* M1845: Toileting Hygiene */}
                  <div className=" col-md-6 w-50">
                    <label className="form-label d-inline-block font-bold mx-1">
                      M1845. Toileting Hygiene
                    </label>
                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="toiletingHygiene"
                          value="0"
                          checked={
                            formData && formData?.toiletingHygiene === "0"
                          }
                        />
                        Able to manage toileting hygiene independently
                      </label>
                    </div>
                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="toiletingHygiene"
                          value="1"
                          checked={
                            formData && formData?.toiletingHygiene === "1"
                          }
                        />
                        Able to manage toileting hygiene if supplies are laid
                        out
                      </label>
                    </div>
                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="toiletingHygiene"
                          value="2"
                          checked={
                            formData && formData?.toiletingHygiene === "2"
                          }
                        />
                        Someone must assist with toileting hygiene
                      </label>
                    </div>
                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="toiletingHygiene"
                          value="3"
                          checked={
                            formData && formData?.toiletingHygiene === "3"
                          }
                        />
                        Patient depends entirely on another person
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row">
                  {/* M1850: Transferring */}
                  <div className=" col-md-6 w-50">
                    <label className="form-label d-inline-block font-bold mx-1">
                      M1850. Transferring
                    </label>
                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="transferring"
                          value="0"
                          checked={formData && formData?.transferring === "0"}
                        />
                        Able to independently transfer
                      </label>
                    </div>
                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="transferring"
                          value="1"
                          checked={formData && formData?.transferring === "1"}
                        />
                        Able to transfer with minimal assistance or device
                      </label>
                    </div>
                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="transferring"
                          value="2"
                          checked={formData && formData?.transferring === "2"}
                        />
                        Able to bear weight and pivot during transfer
                      </label>
                    </div>
                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="transferring"
                          value="3"
                          checked={formData && formData?.transferring === "3"}
                        />
                        Unable to transfer or bear weight
                      </label>
                    </div>
                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="transferring"
                          value="4"
                          checked={formData && formData?.transferring === "4"}
                        />
                        Bedfast, able to turn and position self
                      </label>
                    </div>
                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="transferring"
                          value="5"
                          checked={formData && formData?.transferring === "5"}
                        />
                        Bedfast, unable to turn or position self
                      </label>
                    </div>
                  </div>

                  {/* M1860: Ambulation/Locomotion */}
                  <div className=" col-md-6 w-50">
                    <label className="form-label d-inline-block font-bold mx-1">
                      M1860. Ambulation/Locomotion
                    </label>
                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="ambulationLocomotion"
                          value="0"
                          checked={
                            formData && formData?.ambulationLocomotion === "0"
                          }
                        />
                        Able to walk independently on all surfaces
                      </label>
                    </div>
                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="ambulationLocomotion"
                          value="1"
                          checked={
                            formData && formData?.ambulationLocomotion === "1"
                          }
                        />
                        Able to walk independently with a one-handed device
                      </label>
                    </div>
                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="ambulationLocomotion"
                          value="2"
                          checked={
                            formData && formData?.ambulationLocomotion === "2"
                          }
                        />
                        Requires a two-handed device or supervision
                      </label>
                    </div>
                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="ambulationLocomotion"
                          value="3"
                          checked={
                            formData && formData?.ambulationLocomotion === "3"
                          }
                        />
                        Able to walk only with supervision or assistance
                      </label>
                    </div>
                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="ambulationLocomotion"
                          value="4"
                          checked={
                            formData && formData?.ambulationLocomotion === "4"
                          }
                        />
                        Chairfast, able to wheel self independently
                      </label>
                    </div>
                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="ambulationLocomotion"
                          value="5"
                          checked={
                            formData && formData?.ambulationLocomotion === "5"
                          }
                        />
                        Chairfast, unable to wheel self
                      </label>
                    </div>
                    <div>
                      <label className="form-label d-flex gap-1">
                        <input
                          type="radio"
                          name="ambulationLocomotion"
                          value="6"
                          checked={
                            formData && formData?.ambulationLocomotion === "6"
                          }
                        />
                        Bedfast, unable to ambulate or be up in a chair
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{ marginTop: "250px" }}
                className="col-xl-12 col-md-12 col-12 mb-md-0 "
              >
                {/* <hr /> */}
                <PdfHeader
                  company={company?.payload?.company}
                  patient={patient?.payload}
                />
                <h6>Functional Abilities</h6>
                <hr />
                <div className="row">
                  <div className=" col-md-6 w-50">
                    <p>GG0100. Prior Functioning: Everyday Activities</p>
                    <div className="row col-md-6 w-50">
                      <div className="row col-md-6 w-50">
                        {[
                          "selfCare",
                          "indoorMobility",
                          "stairs",
                          "functionalCognition",
                        ]?.map((field) => (
                          <div className="col-md-6" key={field}>
                            <label
                              htmlFor={`gg0100.${field}`}
                              className="form-label d-inline-block font-bold"
                            >
                              {field?.replace(/([A-Z])/g, " $1").toUpperCase()}:
                            </label>
                            {formData?.gg0100?.[field] || "N/A"}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* GG0110 */}
                  <div className="col-md-6 w-50">
                    <p>GG0110. Prior Device Use</p>
                    {[
                      "manualWheelchair",
                      "motorizedWheelchair",
                      "mechanicalLift",
                      "walker",
                      "orthoticsProsthetics",
                      "noneOfTheAbove",
                    ]?.map((field) => (
                      <div className="form-check" key={field}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`gg0110.${field}`}
                          name={`gg0110.${field}`}
                          checked={formData?.gg0110?.[field] ?? false}
                        />
                        <label
                          className="form-label d-block"
                          htmlFor={`gg0110.${field}`}
                        >
                          {field.replace(/([A-Z])/g, " $1").toUpperCase()}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="row">
                  {/* GG0130 */}

                  <div className="w-50 col-md-6">
                    <p>GG0130. Self-Care</p>
                    {[
                      "eating",
                      "oralHygiene",
                      "toiletingHygiene",
                      "showerBatheSelf",
                      "upperBodyDressing",
                      "lowerBodyDressing",
                      "puttingOnTakingOffFootwear",
                    ]?.map((field) => (
                      <div className="col-md-6" key={field}>
                        <label
                          htmlFor={`gg0130.${field}`}
                          className="form-label d-inline-block font-bold"
                        >
                          {field.replace(/([A-Z])/g, " $1").toUpperCase()}:
                        </label>
                        <span>{formData?.gg0130?.[field] ?? "N/A"}</span>
                      </div>
                    ))}
                  </div>

                  {/* GG0170 */}

                  <div className="w-50 col-md-6">
                    <p>GG0170. Mobility</p>
                    {[
                      "fourSteps",
                      "twelveSteps",
                      "pickingUpObject",
                      "usesWheelchairScooter",
                      "wheel50FeetTwoTurns",
                      "wheel150Feet",
                      "rollLeftRight",
                      "sitToLying",
                      "lyingToSitting",
                      "sitToStand",
                      "chairBedToChair",
                      "toiletTransfer",
                      "carTransfer",
                      "walk10Feet",
                      "walk50FeetTwoTurns",
                      "walk150Feet",
                      "walk10FeetUnevenSurfaces",
                      "stepCurb",
                    ]?.map((field) => (
                      <div className="col-md-6 w-100" key={field}>
                        <label
                          htmlFor={`gg0170.${field}`}
                          className="form-label d-inline-block font-bold"
                        >
                          {field.replace(/([A-Z])/g, " $1").toUpperCase()}:
                        </label>
                        {field === "usesWheelchairScooter" ? (
                          <>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`gg0170.${field}`}
                              name={`gg0170.${field}`}
                              checked={formData?.gg0170?.[field] ?? false}
                              readOnly
                            />
                            <label
                              className="form-label d-block"
                              htmlFor={`gg0170.${field}`}
                            >
                              Uses Wheelchair/Scooter
                            </label>
                          </>
                        ) : (
                          <span>{formData?.gg0170?.[field] || "N/A"}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div
                style={{ marginTop: "80px" }}
                className="col-xl-12 col-md-12 col-12 mb-md-0 "
              >
                <PdfHeader
                  company={company?.payload?.company}
                  patient={patient?.payload}
                />
                <h6>Bladder and Bowel</h6>
                <hr />
                <div className="">
                  <label htmlFor="m1600" className="form-label d-block">
                    M1600. Has this patient been treated for a Urinary Tract
                    Infection in the past 14 days?
                  </label>
                  {formData?.m1600}
                </div>

                {/* M1610 */}
                <div className="">
                  <label className="form-label d-block">
                    M1610. Urinary Incontinence or Urinary Catheter Presence
                  </label>
                  <div className="form-check">
                    <input
                      id="m1610-0"
                      name="m1610"
                      type="radio"
                      value="0"
                      checked={formData?.m1610 === "0"}
                      className="form-check-input"
                    />
                    <label htmlFor="m1610-0" className="form-label d-block">
                      No incontinence or catheter (includes anuria or ostomy for
                      urinary drainage)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      id="m1610-1"
                      name="m1610"
                      type="radio"
                      value="1"
                      checked={formData?.m1610 === "1"}
                      className="form-check-input"
                    />
                    <label htmlFor="m1610-1" className="form-label d-block">
                      Patient is incontinent
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      id="m1610-2"
                      name="m1610"
                      type="radio"
                      value="2"
                      checked={formData?.m1610 === "2"}
                      className="form-check-input"
                    />
                    <label htmlFor="m1610-2" className="form-label d-block">
                      Patient requires a urinary catheter (external, indwelling,
                      intermittent, or suprapubic)
                    </label>
                  </div>
                </div>

                {/* M1620 */}
                <div className="">
                  <label htmlFor="m1620" className="form-label d-block">
                    M1620. Bowel Incontinence Frequency
                  </label>
                  {formData?.m1620}
                </div>

                {/* M1630 */}
                <div className="">
                  <label htmlFor="m1630" className="form-label d-block">
                    M1630. Ostomy for Bowel Elimination
                  </label>
                  {formData?.m1630}
                </div>
              </div>
              <div className="col-xl-12 col-md-12 col-12 mb-md-0 ">
                <hr />
                <h6>Active Diagnoses</h6>
                <hr />

                <div className="row">
                  {/* M1021. Primary Diagnosis */}
                  <div className=" col-md-6 w-50">
                    <label
                      htmlFor="primaryDiagnosis"
                      className="form-label d-block"
                    >
                      M1021. Primary Diagnosis
                    </label>
                    {formData?.primaryDiagnosis}

                    <label className="form-label mt-2">
                      Symptom Control Rating (0-4)
                    </label>
                    <div>
                      {[0, 1, 2, 3, 4]?.map((rating) => (
                        <div
                          key={rating}
                          className="form-check form-check-inline"
                        >
                          <input
                            type="checkbox"
                            id={`primaryDiagnosisRating-${rating}`}
                            name="primaryDiagnosisRating"
                            value={rating}
                            className="form-check-input"
                            checked={formData?.primaryDiagnosisRating?.includes(
                              rating
                            )}
                          />
                          <label
                            htmlFor={`primaryDiagnosisRating-${rating}`}
                            className="form-label d-block"
                          >
                            {rating}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* M1023. Other Diagnoses */}
                  {[...Array(6)?.keys()]?.map((i) => (
                    <div key={i} className="col-md-6 w-50">
                      <label
                        htmlFor={`otherDiagnoses-${i}`}
                        className="form-label d-block"
                      >
                        M1023. Other Diagnosis {String.fromCharCode(98 + i)}
                      </label>
                      <span>{formData?.otherDiagnoses?.[i] || "N/A"}</span>

                      <label className="form-label mt-2">
                        Symptom Control Rating (0-4)
                      </label>
                      <div>
                        {[0, 1, 2, 3, 4]?.map((rating) => (
                          <div
                            key={rating}
                            className="form-check form-check-inline"
                          >
                            <input
                              type="checkbox"
                              id={`otherDiagnosesRatings-${i}-${rating}`}
                              name={`otherDiagnosesRatings-${i}`}
                              value={rating}
                              className="form-check-input"
                              checked={
                                formData?.otherDiagnosesRatings?.[i]?.includes(
                                  rating
                                ) || false
                              }
                              readOnly
                            />
                            <label
                              htmlFor={`otherDiagnosesRatings-${i}-${rating}`}
                              className="form-label d-block"
                            >
                              {rating}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {/* M1028. Active Diagnoses – Comorbidities and Co-existing Conditions */}
                <div className="">
                  <label className="form-label d-block">
                    M1028. Active Diagnoses – Comorbidities and Co-existing
                    Conditions
                  </label>
                  <div className="form-check">
                    <input
                      id="pvd"
                      name="comorbidities"
                      type="checkbox"
                      value="pvd"
                      checked={formData?.comorbidities?.pvd}
                      className="form-check-input"
                    />
                    <label htmlFor="pvd" className="form-label d-block">
                      Peripheral Vascular Disease (PVD) or Peripheral Artery
                      Disease (PAD)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      id="dm"
                      name="comorbidities"
                      type="checkbox"
                      value="dm"
                      checked={formData?.comorbidities?.dm}
                      className="form-check-input"
                    />
                    <label htmlFor="dm" className="form-label d-block">
                      Diabetes Mellitus (DM)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      id="none"
                      name="comorbidities"
                      type="checkbox"
                      value="none"
                      checked={formData?.comorbidities?.none}
                      className="form-check-input"
                    />
                    <label htmlFor="none" className="form-label d-block">
                      None of the above
                    </label>
                  </div>
                </div>
              </div>
              <div
                style={{ marginTop: "60px" }}
                className="col-xl-12 col-md-12 col-12 mb-md-0 "
              >
                <PdfHeader
                  company={company?.payload?.company}
                  patient={patient?.payload}
                />
                <h6>Health Conditions</h6>
                <hr />

                <div className="row">
                  {/* M1033. Risk for Hospitalization */}
                  <div className=" col-md-6 w-50">
                    <label className="form-label d-block">
                      M1033. Risk for Hospitalization
                    </label>
                    {[
                      {
                        label:
                          "History of falls (2 or more falls — or any fall with an injury — in the past 12 months)",
                        value: "falls",
                      },
                      {
                        label:
                          "Unintentional weight loss of a total of 10 pounds or more in the last 12 months",
                        value: "weightLoss",
                      },
                      {
                        label:
                          "Multiple hospitalizations (2 or more) in the past 6 months",
                        value: "hospitalizations",
                      },
                      {
                        label:
                          "Multiple emergency department visits (2 or more) in the past 6 months",
                        value: "emergencyVisits",
                      },
                      {
                        label:
                          "Decline in mental, emotional, or behavioral status in the past 3 months",
                        value: "declineInStatus",
                      },
                      {
                        label:
                          "Reported or observed history of difficulty complying with any medical instructions in the past 3 months",
                        value: "complianceDifficulty",
                      },
                      {
                        label: "Currently taking 5 or more medications",
                        value: "medications",
                      },
                      {
                        label: "Currently reports exhaustion",
                        value: "exhaustion",
                      },
                      {
                        label: "Other risk(s) not listed in 1-8",
                        value: "otherRisks",
                      },
                      { label: "None of the above", value: "none" },
                    ]?.map(({ label, value }) => (
                      <div key={value} className="form-check">
                        <input
                          id={value}
                          name="riskForHospitalization"
                          type="radio"
                          value={value}
                          checked={formData?.riskForHospitalization === value}
                          className="form-check-input"
                        />
                        <label htmlFor={value} className="form-label d-block">
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* J0510. Pain Effect on Sleep */}
                  <div className=" col-md-6 w-50">
                    <label className="form-label d-block">
                      J0510. Pain Effect on Sleep
                    </label>
                    {[
                      {
                        label:
                          "Does not apply — I have not had any pain or hurting in the past 5 days",
                        value: "0",
                      },
                      { label: "Rarely or not at all", value: "1" },
                      { label: "Occasionally", value: "2" },
                      { label: "Frequently", value: "3" },
                      { label: "Almost constantly", value: "4" },
                      { label: "Unable to answer", value: "8" },
                    ]?.map(({ label, value }) => (
                      <div key={value} className="form-check">
                        <input
                          id={`painEffectOnSleep-${value}`}
                          name="painEffectOnSleep"
                          type="radio"
                          value={value}
                          checked={formData?.painEffectOnSleep === value}
                          className="form-check-input"
                        />
                        <label
                          htmlFor={`painEffectOnSleep-${value}`}
                          className="form-label d-block"
                        >
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="row">
                  {/* J0520. Pain Interference with Therapy Activities */}
                  <div className=" col-md-6 w-50">
                    <label className="form-label d-block">
                      J0520. Pain Interference with Therapy Activities
                    </label>
                    {[
                      {
                        label:
                          "Does not apply — I have not received rehabilitation therapy in the past 5 days",
                        value: "0",
                      },
                      { label: "Rarely or not at all", value: "1" },
                      { label: "Occasionally", value: "2" },
                      { label: "Frequently", value: "3" },
                      { label: "Almost constantly", value: "4" },
                      { label: "Unable to answer", value: "8" },
                    ]?.map(({ label, value }) => (
                      <div key={value} className="form-check">
                        <input
                          id={`painInterferenceWithTherapy-${value}`}
                          name="painInterferenceWithTherapy"
                          type="radio"
                          value={value}
                          checked={
                            formData?.painInterferenceWithTherapy === value
                          }
                          className="form-check-input"
                        />
                        <label
                          htmlFor={`painInterferenceWithTherapy-${value}`}
                          className="form-label d-block"
                        >
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* J0530. Pain Interference with Day-to-Day Activities */}
                  <div className=" col-md-6 w-50">
                    <label className="form-label">
                      J0530. Pain Interference with Day-to-Day Activities
                    </label>
                    {[
                      { label: "Rarely or not at all", value: "1" },
                      { label: "Occasionally", value: "2" },
                      { label: "Frequently", value: "3" },
                      { label: "Almost constantly", value: "4" },
                      { label: "Unable to answer", value: "8" },
                    ]?.map(({ label, value }) => (
                      <div key={value} className="form-check">
                        <input
                          id={`painInterferenceWithActivities-${value}`}
                          name="painInterferenceWithActivities"
                          type="radio"
                          value={value}
                          checked={
                            formData?.painInterferenceWithActivities === value
                          }
                          className="form-check-input"
                        />
                        <label
                          htmlFor={`painInterferenceWithActivities-${value}`}
                          className="form-label"
                        >
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="row">
                  {/* J1800. Any Falls Since SOC/ROC */}
                  <div className=" col-md-6 w-50">
                    <label className="form-label">
                      J1800. Any Falls Since SOC/ROC
                    </label>
                    {[
                      { label: "No", value: "0" },
                      { label: "Yes", value: "1" },
                    ]?.map(({ label, value }) => (
                      <div key={value} className="form-check">
                        <input
                          id={`fallsSinceSOCROC-${value}`}
                          name="fallsSinceSOCROC"
                          type="radio"
                          value={value}
                          checked={formData?.fallsSinceSOCROC === value}
                          className="form-check-input"
                        />
                        <label
                          htmlFor={`fallsSinceSOCROC-${value}`}
                          className="form-label"
                        >
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* J1900. Number of Falls Since SOC/ROC */}
                  {formData?.fallsSinceSOCROC === "1" && (
                    <div className=" col-md-6 w-50">
                      <label className="form-label">
                        J1900. Number of Falls Since SOC/ROC
                      </label>
                      {[
                        { label: "No injury", value: "noInjury" },
                        { label: "Injury (except major)", value: "injury" },
                        { label: "Major injury", value: "majorInjury" },
                      ]?.map(({ label, value }) => (
                        <div key={value} className="form-check">
                          <input
                            id={`fallsDetails-${value}`}
                            name="fallsDetails"
                            type="radio"
                            value={value}
                            checked={formData?.fallsDetails === value}
                            className="form-check-input"
                          />
                          <label
                            htmlFor={`fallsDetails-${value}`}
                            className="form-label"
                          >
                            {label}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ marginTop: "50px" }} className="row">
                  <PdfHeader
                    company={company?.payload?.company}
                    patient={patient?.payload}
                  />
                </div>

                <div className="row">
                  {/* M1400. When is the patient dyspneic or noticeably Short of Breath? */}
                  <div className=" col-md-6 w-50">
                    <label className="form-label">
                      M1400. When is the patient dyspneic or noticeably Short of
                      Breath?
                    </label>
                    {[
                      { label: "Patient is not short of breath", value: "0" },
                      {
                        label:
                          "When walking more than 20 feet, climbing stairs",
                        value: "1",
                      },
                      {
                        label:
                          "With moderate exertion (e.g., while dressing, using commode or bedpan, walking distances less than 20 feet)",
                        value: "2",
                      },
                      {
                        label:
                          "With minimal exertion (e.g., while eating, talking, or performing other ADLs) or with agitation",
                        value: "3",
                      },
                      { label: "At rest (during day or night)", value: "4" },
                    ]?.map(({ label, value }) => (
                      <div key={value} className="form-check">
                        <input
                          id={`shortOfBreath-${value}`}
                          name="shortOfBreath"
                          type="radio"
                          value={value}
                          checked={formData?.shortOfBreath === value}
                          className="form-check-input"
                        />
                        <label
                          htmlFor={`shortOfBreath-${value}`}
                          className="form-label"
                        >
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-xl-12 col-md-12 col-12 mb-md-0 ">
                <hr />
                <h6>Swallowing/Nutritional Status</h6>
                <hr />
                <div className="row">
                  <div className="col-md-6 w-50">
                    <label htmlFor="height" className="form-label">
                      M1060. Height (in inches)
                    </label>
                    {formData?.height}
                  </div>

                  <div className=" col-md-6 w-50">
                    <label htmlFor="weight" className="form-label">
                      M1060. Weight (in pounds)
                    </label>
                    {formData?.weight}
                  </div>
                </div>

                <div className="row">
                  {/* Nutritional Approaches */}
                  <div className=" col-md-6 w-100">
                    <label className="form-label">
                      K0520. Nutritional Approaches
                    </label>

                    <div className="row">
                      <div className="col-md-6 w-50">
                        <label className="form-label">On Admission</label>
                        {[
                          {
                            label: "Parenteral/IV feeding",
                            value: "parenteralIVFeeding",
                          },
                          {
                            label:
                              "Feeding tube (e.g., nasogastric or abdominal (PEG))",
                            value: "feedingTube",
                          },
                          {
                            label:
                              "Mechanically altered diet (e.g., pureed food, thickened liquids)",
                            value: "mechanicallyAlteredDiet",
                          },
                          {
                            label:
                              "Therapeutic diet (e.g., low salt, diabetic, low cholesterol)",
                            value: "therapeuticDiet",
                          },
                          { label: "None of the above", value: "none" },
                        ]?.map(({ label, value }) => (
                          <div key={value} className="form-check">
                            <input
                              id={`onAdmission-${value}`}
                              name={`nutritionalApproachesOnAdmission-${value}`}
                              type="checkbox"
                              checked={
                                formData?.nutritionalApproachesOnAdmission?.[
                                  value
                                ] || false
                              }
                              className="form-check-input"
                            />
                            <label
                              htmlFor={`onAdmission-${value}`}
                              className="form-label d-block mx-2"
                            >
                              {label}
                            </label>
                          </div>
                        ))}
                      </div>

                      <div className=" col-md-6 w-50">
                        <label className="form-label">Last 7 Days</label>
                        {[
                          {
                            label: "Parenteral/IV feeding",
                            value: "parenteralIVFeeding",
                          },
                          {
                            label:
                              "Feeding tube (e.g., nasogastric or abdominal (PEG))",
                            value: "feedingTube",
                          },
                          {
                            label:
                              "Mechanically altered diet (e.g., pureed food, thickened liquids)",
                            value: "mechanicallyAlteredDiet",
                          },
                          {
                            label:
                              "Therapeutic diet (e.g., low salt, diabetic, low cholesterol)",
                            value: "therapeuticDiet",
                          },
                          { label: "None of the above", value: "none" },
                        ]?.map(({ label, value }) => (
                          <div key={value} className="form-check">
                            <input
                              id={`last7Days-${value}`}
                              name={`nutritionalApproachesLast7Days-${value}`}
                              type="checkbox"
                              checked={
                                formData?.nutritionalApproachesLast7Days?.[
                                  value
                                ] ?? false
                              }
                              className="form-check-input"
                            />
                            <label
                              htmlFor={`last7Days-${value}`}
                              className="form-label"
                            >
                              {label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="row">
                      <label className="form-label">At Discharge</label>
                      {[
                        {
                          label: "Parenteral/IV feeding",
                          value: "parenteralIVFeeding",
                        },
                        {
                          label:
                            "Feeding tube (e.g., nasogastric or abdominal (PEG))",
                          value: "feedingTube",
                        },
                        {
                          label:
                            "Mechanically altered diet (e.g., pureed food, thickened liquids)",
                          value: "mechanicallyAlteredDiet",
                        },
                        {
                          label:
                            "Therapeutic diet (e.g., low salt, diabetic, low cholesterol)",
                          value: "therapeuticDiet",
                        },
                        { label: "None of the above", value: "none" },
                      ]?.map(({ label, value }) => (
                        <div key={value} className="form-check">
                          <input
                            id={`atDischarge-${value}`}
                            name={`nutritionalApproachesAtDischarge-${value}`}
                            type="checkbox"
                            checked={
                              formData?.nutritionalApproachesAtDischarge?.[
                                value
                              ] ?? false
                            }
                            className="form-check-input"
                          />

                          <label
                            htmlFor={`atDischarge-${value}`}
                            className="form-label"
                          >
                            {label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div
                    style={{ marginTop: "50px" }}
                    className="col-md-12 w-100"
                  >
                    <PdfHeader
                      company={company?.payload?.company}
                      patient={patient?.payload}
                    />
                  </div>
                  {/* M1870. Feeding or Eating */}
                  <div className=" col-md-6 w-50">
                    <label className="form-label">
                      M1870. Feeding or Eating
                    </label>
                    {[
                      { label: "Able to independently feed self", value: "0" },
                      {
                        label:
                          "Able to feed self independently but requires: a. meal set-up; OR b. intermittent assistance or supervision from another person; OR c. a liquid, pureed, or ground meat diet.",
                        value: "1",
                      },
                      {
                        label:
                          "Unable to feed self and must be assisted or supervised throughout the meal/snack.",
                        value: "2",
                      },
                      {
                        label:
                          "Able to take in nutrients orally and receives supplemental nutrients through a nasogastric tube or gastrostomy.",
                        value: "3",
                      },
                      {
                        label:
                          "Unable to take in nutrients orally and is fed nutrients through a nasogastric tube or gastrostomy.",
                        value: "4",
                      },
                      {
                        label:
                          "Unable to take in nutrients orally or by tube feeding.",
                        value: "5",
                      },
                    ]?.map(({ label, value }) => (
                      <div key={value} className="form-check">
                        <input
                          id={`feedingOrEating-${value}`}
                          name="feedingOrEating"
                          type="radio"
                          value={value}
                          checked={formData?.feedingOrEating === value}
                          className="form-check-input"
                        />
                        <label
                          htmlFor={`feedingOrEating-${value}`}
                          className="form-label d-block"
                        >
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-xl-12 col-md-12 col-12 mb-md-0 ">
                <hr />
                <h6>Skin Conditions</h6>
                <hr />
                <div className="row">
                  <div className=" col-md-6 w-50">
                    <label className="form-label d-block">
                      M1306. Does this patient have at least one Unhealed
                      Pressure Ulcer/Injury at Stage 2 or Higher or designated
                      as Unstageable?
                    </label>
                    {[
                      { label: "No", value: "0" },
                      { label: "Yes", value: "1" },
                    ]?.map(({ label, value }) => (
                      <div key={value} className="form-check">
                        <input
                          id={`unhealedPressureUlcer-${value}`}
                          name="unhealedPressureUlcer"
                          type="radio"
                          value={value}
                          checked={formData?.unhealedPressureUlcer === value}
                          className="form-check-input"
                        />
                        <label
                          htmlFor={`unhealedPressureUlcer-${value}`}
                          className="form-label d-block"
                        >
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* M1307 */}
                  <div className=" col-md-6 w-50">
                    <label className="form-label d-block">
                      M1307. The Oldest Stage 2 Pressure Ulcer that is present
                      at discharge
                    </label>
                    {[
                      {
                        label:
                          "Was present at the most recent SOC/ROC assessment",
                        value: "1",
                      },
                      {
                        label:
                          "Developed since the most recent SOC/ROC assessment",
                        value: "2",
                      },
                      {
                        label:
                          "No Stage 2 pressure ulcers are present at discharge",
                        value: "NA",
                      },
                    ]?.map(({ label, value }) => (
                      <div key={value} className="form-check">
                        <input
                          id={`oldestStage2PressureUlcer-${value}`}
                          name="oldestStage2PressureUlcer"
                          type="radio"
                          value={value}
                          checked={
                            formData?.oldestStage2PressureUlcer === value
                          }
                          className="form-check-input"
                        />
                        <label
                          htmlFor={`oldestStage2PressureUlcer-${value}`}
                          className="form-label d-block"
                        >
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                {/* M1311 */}
                <div style={{ marginTop: "250px" }} className="row">
                  <PdfHeader
                    company={company?.payload?.company}
                    patient={patient?.payload}
                  />
                  <div className=" col-md-6 w-50">
                    <label className="form-label d-block">
                      M1311. Current Number of Unhealed Pressure Ulcers/Injuries
                      at Each Stage
                    </label>

                    <div className="">
                      <label className="form-label d-block">A1. Stage 2</label>
                      {formData?.numberOfStage2Ulcers}
                    </div>
                    <div className="">
                      <label className="form-label d-block">
                        A2. Number of Stage 2 pressure ulcers present at most
                        recent SOC/ROC
                      </label>
                      {formData?.numberOfStage2UlcersAtSOC}
                    </div>

                    <div className="">
                      <label className="form-label d-block">B1. Stage 3</label>
                      {formData?.numberOfStage3Ulcers}
                    </div>
                    <div className="">
                      <label className="form-label d-block">
                        B2. Number of Stage 3 pressure ulcers present at most
                        recent SOC/ROC
                      </label>
                      {formData?.numberOfStage3UlcersAtSOC}
                    </div>

                    <div className="">
                      <label className="form-label d-block">C1. Stage 4</label>
                      {formData?.numberOfStage4Ulcers}
                    </div>
                    <div className="">
                      <label className="form-label d-block">
                        C2. Number of Stage 4 pressure ulcers present at most
                        recent SOC/ROC
                      </label>
                      {formData?.numberOfStage4UlcersAtSOC}
                    </div>

                    <div className="">
                      <label className="form-label d-block">
                        D1. Unstageable: Non-removable dressing/device
                      </label>
                      {formData?.numberOfUnstageableDressingUlcers}
                    </div>

                    <div className="col-md-12">
                      <label className="form-label d-block">
                        D2. Number of unstageable pressure ulcers/injuries due
                        to non-removable dressing/device at most recent SOC/ROC
                      </label>
                      {formData?.numberOfUnstageableDressingUlcersAtSOC}
                    </div>

                    <div className="">
                      <label className="form-label d-block">
                        E1. Unstageable: Slough and/or eschar
                      </label>
                      {formData?.numberOfUnstageableSloughUlcers}
                    </div>
                    <div className="row">
                      <label className="form-label d-block">
                        E2. Number of unstageable pressure ulcers/injuries due
                        to coverage of wound bed by slough and/or eschar at most
                        recent SOC/ROC
                      </label>

                      {formData?.numberOfUnstageableSloughUlcersAtSOC}
                    </div>

                    <div className=" col-md-6 w-50">
                      <label className="form-label d-block">
                        F1. Unstageable: Deep tissue injury
                      </label>

                      {formData?.numberOfDeepTissueInjuries}
                    </div>
                    <div className=" col-md-6 w-50">
                      <label className="form-label d-block">
                        F2. Number of unstageable pressure injuries presenting
                        as deep tissue injury at most recent SOC/ROC
                      </label>

                      {formData?.numberOfDeepTissueInjuriesAtSOC}
                    </div>
                  </div>

                  {/* M1322 */}
                  <div className=" col-md-6 w-50">
                    <label className="form-label d-block">
                      M1322. Current Number of Stage 1 Pressure Injuries
                    </label>
                    {[
                      { label: "Zero", value: "0" },
                      { label: "One", value: "1" },
                      { label: "Two", value: "2" },
                      { label: "Three", value: "3" },
                      { label: "Four or more", value: "4" },
                    ]?.map(({ label, value }) => (
                      <div key={value} className="form-check">
                        <input
                          id={`numberOfStage1Injuries-${value}`}
                          name="numberOfStage1Injuries"
                          type="radio"
                          value={value}
                          checked={formData?.numberOfStage1Injuries === value}
                          className="form-check-input"
                        />
                        <label
                          htmlFor={`numberOfStage1Injuries-${value}`}
                          className="form-label d-block"
                        >
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="row">
                  {/* M1324 */}
                  <div className=" col-md-6 w-50">
                    <label className="form-label d-block">
                      M1324. Stage of Most Problematic Unhealed Pressure
                      Ulcer/Injury that is Stageable
                    </label>
                    {[
                      { label: "Stage 1", value: "1" },
                      { label: "Stage 2", value: "2" },
                      { label: "Stage 3", value: "3" },
                      { label: "Stage 4", value: "4" },
                      {
                        label:
                          "Patient has no pressure ulcers/injuries or no stageable pressure ulcers/injuries",
                        value: "NA",
                      },
                    ]?.map(({ label, value }) => (
                      <div key={value} className="form-check">
                        <input
                          id={`mostProblematicUlcerStage-${value}`}
                          name="mostProblematicUlcerStage"
                          type="radio"
                          value={value}
                          checked={
                            formData?.mostProblematicUlcerStage === value
                          }
                          className="form-check-input"
                        />
                        <label
                          htmlFor={`mostProblematicUlcerStage-${value}`}
                          className="form-label d-block"
                        >
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* M1330 */}
                  <div className=" col-md-6 w-50">
                    <label className="form-label d-block">
                      M1330. Does this patient have a Stasis Ulcer?
                    </label>
                    {[
                      { label: "No", value: "0" },
                      {
                        label:
                          "Yes, patient has BOTH observable and unobservable stasis ulcers",
                        value: "1",
                      },
                      {
                        label: "Yes, patient has observable stasis ulcers ONLY",
                        value: "2",
                      },
                      {
                        label:
                          "Yes, patient has unobservable stasis ulcers ONLY",
                        value: "3",
                      },
                    ]?.map(({ label, value }) => (
                      <div key={value} className="form-check">
                        <input
                          id={`stasisUlcer-${value}`}
                          name="stasisUlcer"
                          type="radio"
                          value={value}
                          checked={formData?.stasisUlcer === value}
                          className="form-check-input"
                        />
                        <label
                          htmlFor={`stasisUlcer-${value}`}
                          className="form-label d-block"
                        >
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="row">
                  {/* M1332 */}
                  {formData?.stasisUlcer !== "0" &&
                    formData?.stasisUlcer !== "" && (
                      <div className=" col-md-6 w-50">
                        <label className="form-label d-block">
                          M1332. Current Number of Stasis Ulcers that are
                          Observable
                        </label>

                        {formData?.numberOfStasisUlcers}
                      </div>
                    )}

                  {/* M1334 */}
                  {formData?.stasisUlcer !== "0" &&
                    formData?.stasisUlcer !== "" && (
                      <div className=" col-md-6 w-50">
                        <label className="form-label d-block">
                          M1334. Status of Most Problematic Stasis Ulcer that is
                          Observable
                        </label>
                        {[
                          { label: "Fully granulating", value: "1" },
                          { label: "Early/partial granulation", value: "2" },
                          { label: "Not healing", value: "3" },
                        ]?.map(({ label, value }) => (
                          <div key={value} className="form-check">
                            <input
                              id={`mostProblematicStasisUlcerStatus-${value}`}
                              name="mostProblematicStasisUlcerStatus"
                              type="radio"
                              value={value}
                              checked={
                                formData?.mostProblematicStasisUlcerStatus ===
                                value
                              }
                              className="form-check-input"
                            />
                            <label
                              htmlFor={`mostProblematicStasisUlcerStatus-${value}`}
                              className="form-label d-block"
                            >
                              {label}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}

                  {/* M1340 */}
                </div>
                <div className="row">
                  <PdfHeader
                    company={company?.payload?.company}
                    patient={patient?.payload}
                  />
                  <div className=" col-md-6 w-50">
                    <label className="form-label d-block">
                      M1340. Does this patient have a Surgical Wound?
                    </label>
                    {[
                      { label: "No", value: "0" },
                      {
                        label:
                          "Yes, patient has at least one observable surgical wound",
                        value: "1",
                      },
                      {
                        label:
                          "Surgical wound known but not observable due to non-removable dressing/device",
                        value: "2",
                      },
                    ]?.map(({ label, value }) => (
                      <div key={value} className="form-check">
                        <input
                          id={`surgicalWound-${value}`}
                          name="surgicalWound"
                          type="radio"
                          value={value}
                          checked={formData?.surgicalWound === value}
                          className="form-check-input"
                        />
                        <label
                          htmlFor={`surgicalWound-${value}`}
                          className="form-label d-block"
                        >
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* M1342 */}
                  {formData?.surgicalWound !== "0" &&
                    formData?.surgicalWound !== "" && (
                      <div className="col-md-6 w-50">
                        <label className="form-label d-block">
                          M1342. Status of Most Problematic Surgical Wound that
                          is Observable
                        </label>
                        {[
                          { label: "Newly epithelialized", value: "0" },
                          { label: "Fully granulating", value: "1" },
                          { label: "Early/partial granulation", value: "2" },
                          { label: "Not healing", value: "3" },
                        ]?.map(({ label, value }) => (
                          <div key={value} className="form-check">
                            <input
                              id={`mostProblematicSurgicalWoundStatus-${value}`}
                              name="mostProblematicSurgicalWoundStatus"
                              type="radio"
                              value={value}
                              checked={
                                formData?.mostProblematicSurgicalWoundStatus ===
                                value
                              }
                              className="form-check-input"
                            />
                            <label
                              htmlFor={`mostProblematicSurgicalWoundStatus-${value}`}
                              className="form-label d-block"
                            >
                              {label}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              </div>
              <div className="col-xl-12 col-md-12 col-12 mb-md-0 ">
                <h6>Medications</h6>
                <hr />
                <div className="row">
                  <div className=" col-md-6 w-50">
                    <label className="form-label d-block">
                      N0415. High-Risk Drug Classes: Use and Indication
                    </label>
                    {/* High-Risk Drug Classes (unchanged) */}
                    {/* ... */ 9}
                  </div>

                  {/* M2001. Drug Regimen Review */}
                  <div className=" col-md-6 w-50">
                    <label className="form-label d-block">
                      M2001. Drug Regimen Review
                    </label>
                    {[
                      {
                        label: "No — No issues found during review",
                        value: "0",
                      },
                      { label: "Yes — Issues found during review", value: "1" },
                      {
                        label: "NA — Patient is not taking any medications",
                        value: "9",
                      },
                    ]?.map(({ label, value }) => (
                      <div key={value} className="form-check">
                        <input
                          id={`drugRegimenReview-${value}`}
                          name="drugRegimenReview"
                          type="radio"
                          value={value}
                          checked={formData?.drugRegimenReview === value}
                          className="form-check-input"
                        />
                        <label
                          htmlFor={`drugRegimenReview-${value}`}
                          className="form-label d-block"
                        >
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="row">
                  {/* M2003. Medication Follow-up */}
                  <div className=" col-md-6 w-50">
                    <label className="form-label d-block">
                      M2003. Medication Follow-up
                    </label>
                    {[
                      { label: "No", value: "0" },
                      { label: "Yes", value: "1" },
                    ]?.map(({ label, value }) => (
                      <div key={value} className="form-check">
                        <input
                          id={`medicationFollowUp-${value}`}
                          name="medicationFollowUp"
                          type="radio"
                          value={value}
                          checked={formData?.medicationFollowUp === value}
                          className="form-check-input"
                        />
                        <label
                          htmlFor={`medicationFollowUp-${value}`}
                          className="form-label d-block"
                        >
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* M2005. Medication Intervention */}
                  <div className=" col-md-6 w-50">
                    <label className="form-label d-block">
                      M2005. Medication Intervention
                    </label>
                    {[
                      { label: "No", value: "0" },
                      { label: "Yes", value: "1" },
                      {
                        label:
                          "NA — No potential issues identified or patient is not taking any medications",
                        value: "9",
                      },
                    ]?.map(({ label, value }) => (
                      <div key={value} className="form-check">
                        <input
                          id={`medicationIntervention-${value}`}
                          name="medicationIntervention"
                          type="radio"
                          value={value}
                          checked={formData?.medicationIntervention === value}
                          className="form-check-input"
                        />
                        <label
                          htmlFor={`medicationIntervention-${value}`}
                          className="form-label d-block"
                        >
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="row">
                {/* M2010. Patient/Caregiver High-Risk Drug Education */}
                <div className=" col-md-6 w-50">
                  <label className="form-label d-block">
                    M2010. Patient/Caregiver High-Risk Drug Education
                  </label>
                  {[
                    { label: "No", value: "0" },
                    { label: "Yes", value: "1" },
                    {
                      label: "NA — No high-risk drugs or fully knowledgeable",
                      value: "NA",
                    },
                  ]?.map(({ label, value }) => (
                    <div key={value} className="form-check">
                      <input
                        id={`highRiskDrugEducation-${value}`}
                        name="highRiskDrugEducation"
                        type="radio"
                        value={value}
                        checked={formData?.highRiskDrugEducation === value}
                        className="form-check-input"
                      />
                      <label
                        htmlFor={`highRiskDrugEducation-${value}`}
                        className="form-label d-block"
                      >
                        {label}
                      </label>
                    </div>
                  ))}
                </div>

                {/* M2020. Management of Oral Medications */}
                <div className=" col-md-6 w-50">
                  <label className="form-label d-block">
                    M2020. Management of Oral Medications
                  </label>
                  {[
                    {
                      label:
                        "Able to independently take the correct medication(s)",
                      value: "0",
                    },
                    {
                      label:
                        "Able to take medication(s) if prepared in advance or if using a drug diary/chart",
                      value: "1",
                    },
                    {
                      label: "Able to take medication(s) if given reminders",
                      value: "2",
                    },
                    {
                      label:
                        "Unable to take medication unless administered by another person",
                      value: "3",
                    },
                    {
                      label: "NA — No oral medications prescribed",
                      value: "NA",
                    },
                  ]?.map(({ label, value }) => (
                    <div key={value} className="form-check">
                      <input
                        id={`managementOralMedications-${value}`}
                        name="managementOralMedications"
                        type="radio"
                        value={value}
                        checked={formData?.managementOralMedications === value}
                        className="form-check-input"
                      />
                      <label
                        htmlFor={`managementOralMedications-${value}`}
                        className="form-label d-block"
                      >
                        {label}
                      </label>
                    </div>
                  ))}
                </div>

                {/* M2030. Management of Injectable Medications */}
                <div className=" col-md-6 w-50">
                  <label className="form-label d-block">
                    M2030. Management of Injectable Medications
                  </label>
                  {[
                    {
                      label:
                        "Able to independently take the correct medication(s)",
                      value: "0",
                    },
                    {
                      label:
                        "Able to take medication(s) if syringes are prepared in advance or if using a drug diary/chart",
                      value: "1",
                    },
                    {
                      label: "Able to take medication(s) if given reminders",
                      value: "2",
                    },
                    {
                      label:
                        "Unable to take medication unless administered by another person",
                      value: "3",
                    },
                    {
                      label: "NA — No injectable medications prescribed",
                      value: "NA",
                    },
                  ]?.map(({ label, value }) => (
                    <div key={value} className="form-check">
                      <input
                        id={`managementInjectableMedications-${value}`}
                        name="managementInjectableMedications"
                        type="radio"
                        value={value}
                        checked={
                          formData?.managementInjectableMedications === value
                        }
                        className="form-check-input"
                      />
                      <label
                        htmlFor={`managementInjectableMedications-${value}`}
                        className="form-label d-block"
                      >
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div
                style={{ marginTop: "60px" }}
                className="col-xl-12 col-md-12 col-12 mb-md-0 "
              >
                <PdfHeader
                  company={company?.payload?.company}
                  patient={patient?.payload}
                />
                <h6>Special Treatments, Procedures, and Programs</h6>
                <hr />
                <div className="row">
                  <div className=" col-md-6 w-50">
                    <label className="form-label d-block">
                      O0110. Special Treatments, Procedures, and Programs
                      (Admission)
                    </label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={
                          formData?.specialTreatmentsAdmission?.chemotherapy
                        }
                      />
                      <label className="form-label d-block">
                        A1. Chemotherapy
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={
                          formData?.specialTreatmentsAdmission?.radiation
                        }
                      />
                      <label className="form-label d-block">
                        B1. Radiation
                      </label>
                    </div>
                    {/* Repeat similar blocks for other treatments, procedures, and programs on admission */}
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={
                          formData?.specialTreatmentsAdmission?.noneOfTheAbove
                        }
                      />
                      <label className="form-label d-block">
                        Z1. None of the Above
                      </label>
                    </div>
                  </div>

                  <div className=" col-md-6 w-50">
                    <label className="form-label d-block">
                      O0110. Special Treatments, Procedures, and Programs
                      (Discharge)
                    </label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={
                          formData?.specialTreatmentsDischarge?.chemotherapy
                        }
                      />
                      <label className="form-label d-block">
                        A1. Chemotherapy
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={
                          formData?.specialTreatmentsDischarge?.radiation
                        }
                      />
                      <label className="form-label d-block">
                        B1. Radiation
                      </label>
                    </div>
                    {/* Repeat similar blocks for other treatments, procedures, and programs on discharge */}
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={
                          formData?.specialTreatmentsDischarge?.noneOfTheAbove
                        }
                      />
                      <label className="form-label d-block">
                        Z1. None of the Above
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row">
                  {/* O0350. Patient’s COVID-19 vaccination is up to date */}
                  <div className=" col-md-6 w-50">
                    <label className="form-label d-block">
                      O0350. Patient’s COVID-19 vaccination is up to date
                    </label>
                    {[
                      { label: "No, patient is not up to date", value: "0" },
                      { label: "Yes, patient is up to date", value: "1" },
                    ]?.map(({ label, value }) => (
                      <div key={value} className="form-check">
                        <input
                          id={`covidVaccinationUpToDate-${value}`}
                          name="covidVaccinationUpToDate"
                          type="radio"
                          value={value}
                          checked={formData?.covidVaccinationUpToDate === value}
                          className="form-check-input"
                        />
                        <label
                          htmlFor={`covidVaccinationUpToDate-${value}`}
                          className="form-label d-block"
                        >
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* M1041. Influenza Vaccine Data Collection Period */}
                  <div className=" col-md-6 w-50">
                    <label className="form-label d-block">
                      M1041. Influenza Vaccine Data Collection Period
                    </label>
                    {[
                      { label: "No", value: "0" },
                      { label: "Yes", value: "1" },
                    ]?.map(({ label, value }) => (
                      <div key={value} className="form-check">
                        <input
                          id={`influenzaVaccinePeriod-${value}`}
                          name="influenzaVaccinePeriod"
                          type="radio"
                          value={value}
                          checked={formData?.influenzaVaccinePeriod === value}
                          className="form-check-input"
                        />
                        <label
                          htmlFor={`influenzaVaccinePeriod-${value}`}
                          className="form-label d-block"
                        >
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="row">
                  {" "}
                  {/* M1046. Influenza Vaccine Received */}
                  {formData?.influenzaVaccinePeriod === "1" && (
                    <div className=" col-md-6 w-50">
                      <label className="form-label d-block">
                        M1046. Influenza Vaccine Received
                      </label>
                      {[
                        {
                          label:
                            "Yes; received from your agency during this episode of care",
                          value: "1",
                        },
                        {
                          label:
                            "Yes; received from your agency during a prior episode of care",
                          value: "2",
                        },
                        {
                          label:
                            "Yes; received from another health care provider",
                          value: "3",
                        },
                        {
                          label: "No; patient offered and declined",
                          value: "4",
                        },
                        {
                          label:
                            "No; patient assessed and determined to have medical contraindication(s)",
                          value: "5",
                        },
                        {
                          label:
                            "No; not indicated – patient does not meet age/condition guidelines",
                          value: "6",
                        },
                        {
                          label:
                            "No; inability to obtain vaccine due to declared shortage",
                          value: "7",
                        },
                        {
                          label:
                            "No; patient did not receive the vaccine due to other reasons",
                          value: "8",
                        },
                      ]?.map(({ label, value }) => (
                        <div key={value} className="form-check">
                          <input
                            id={`influenzaVaccineReceived-${value}`}
                            name="influenzaVaccineReceived"
                            type="radio"
                            value={value}
                            checked={
                              formData?.influenzaVaccineReceived === value
                            }
                            className="form-check-input"
                          />
                          <label
                            htmlFor={`influenzaVaccineReceived-${value}`}
                            className="form-label d-block"
                          >
                            {label}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-xl-12 col-md-12 col-12 mb-md-0 ">
                <h6>Participation in assessment and setting</h6>
                <hr />
                <div className="">
                  <label className="form-label d-block">
                    M2401. Intervention Synopsis
                  </label>

                  <div className="row">
                    <div className=" col-md-6 w-50">
                      <label className="form-label d-block">
                        b. Falls prevention interventions
                      </label>
                      {[
                        { label: "No", value: "0" },
                        { label: "Yes", value: "1" },
                        { label: "Not Applicable", value: "NA" },
                      ]?.map(({ label, value }) => (
                        <div key={value} className="form-check">
                          <input
                            id={`fallsPrevention-${value}`}
                            name="fallsPrevention"
                            type="radio"
                            value={value}
                            checked={formData?.fallsPrevention === value}
                            className="form-check-input"
                          />
                          <label
                            htmlFor={`fallsPrevention-${value}`}
                            className="form-label d-block"
                          >
                            {label}
                          </label>
                        </div>
                      ))}
                    </div>

                    <div className=" col-md-6 w-50">
                      <label className="form-label d-block">
                        c. Depression intervention(s)
                      </label>
                      {[
                        { label: "No", value: "0" },
                        { label: "Yes", value: "1" },
                        { label: "Not Applicable", value: "NA" },
                      ]?.map(({ label, value }) => (
                        <div key={value} className="form-check">
                          <input
                            id={`depressionIntervention-${value}`}
                            name="depressionIntervention"
                            type="radio"
                            value={value}
                            checked={formData?.depressionIntervention === value}
                            className="form-check-input"
                          />
                          <label
                            htmlFor={`depressionIntervention-${value}`}
                            className="form-label d-block"
                          >
                            {label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="row">
                    <div className=" col-md-6 w-50">
                      <label className="form-label d-block">
                        d. Intervention(s) to monitor and mitigate pain
                      </label>
                      {[
                        { label: "No", value: "0" },
                        { label: "Yes", value: "1" },
                        { label: "Not Applicable", value: "NA" },
                      ]?.map(({ label, value }) => (
                        <div key={value} className="form-check">
                          <input
                            id={`painIntervention-${value}`}
                            name="painIntervention"
                            type="radio"
                            value={value}
                            checked={formData?.painIntervention === value}
                            className="form-check-input"
                          />
                          <label
                            htmlFor={`painIntervention-${value}`}
                            className="form-label d-block"
                          >
                            {label}
                          </label>
                        </div>
                      ))}
                    </div>

                    <div className=" col-md-6 w-50">
                      <label className="form-label d-block">
                        e. Intervention(s) to prevent pressure ulcers
                      </label>
                      {[
                        { label: "No", value: "0" },
                        { label: "Yes", value: "1" },
                        { label: "Not Applicable", value: "NA" },
                      ]?.map(({ label, value }) => (
                        <div key={value} className="form-check">
                          <input
                            id={`pressureUlcerPrevention-${value}`}
                            name="pressureUlcerPrevention"
                            type="radio"
                            value={value}
                            checked={
                              formData?.pressureUlcerPrevention === value
                            }
                            className="form-check-input"
                          />
                          <label
                            htmlFor={`pressureUlcerPrevention-${value}`}
                            className="form-label d-block"
                          >
                            {label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="row">
                    <div className=" col-md-6 w-50">
                      <label className="form-label d-block">
                        f. Pressure ulcer treatment based on principles of moist
                        wound healing
                      </label>
                      {[
                        { label: "No", value: "0" },
                        { label: "Yes", value: "1" },
                        { label: "Not Applicable", value: "NA" },
                      ]?.map(({ label, value }) => (
                        <div key={value} className="form-check">
                          <input
                            id={`pressureUlcerTreatment-${value}`}
                            name="pressureUlcerTreatment"
                            type="radio"
                            value={value}
                            checked={formData?.pressureUlcerTreatment === value}
                            className="form-check-input"
                          />
                          <label
                            htmlFor={`pressureUlcerTreatment-${value}`}
                            className="form-label d-block"
                          >
                            {label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{ marginTop: "100px" }}
                className="col-xl-12 col-md-12 col-12 mb-md-0 "
              >
                {/* Payer Information */}
                <div className="mb-4">
                  <PdfHeader
                    company={company?.payload?.company}
                    patient={patient?.payload}
                  />
                  <h6>Payer Information</h6>
                  <hr />
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="mbiNumber" className="form-label d-block">
                        (M0063) Medicare Beneficiary Identifier (MBI) Number
                        <span className="text-danger">*</span>
                      </label>
                      {formData?.mbiNumber}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="hicNumber" className="form-label d-block">
                        Health Insurance Claim (HIC) Number
                      </label>
                      {formData?.hicNumber}
                    </div>
                    <div className="col-md-6">
                      <label
                        htmlFor="medicaidNumber"
                        className="form-label d-block"
                      >
                        Medicaid Number <span className="text-danger">*</span>
                      </label>
                      {formData?.medicaidNumber}
                    </div>
                    <div className="col-md-6">
                      <label
                        htmlFor="alternateMedicaidNumber"
                        className="form-label d-block"
                      >
                        Alternate Medicaid Number:
                      </label>
                      {formData?.alternateMedicaidNumber}
                    </div>
                  </div>
                </div>

                {/* Insurance Information */}
                <div className="mb-4">
                  <hr />
                  <h6>Insurance Information</h6>
                  <hr />
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label
                        htmlFor="primaryInsurance"
                        className="form-label d-block"
                      >
                        Primary Insurance <span className="text-danger">*</span>
                      </label>
                      {formData?.primaryInsurance}
                    </div>
                    <div className="col-md-4">
                      <label
                        htmlFor="secondaryInsurance"
                        className="form-label d-block"
                      >
                        Secondary Insurance:
                      </label>
                      {formData?.secondaryInsurance}
                    </div>
                    <div className="col-md-4">
                      <label
                        htmlFor="tertiaryInsurance"
                        className="form-label d-block"
                      >
                        Tertiary Insurance:
                      </label>
                      {formData?.tertiaryInsurance}
                    </div>
                  </div>
                </div>

                {/* Payer Comments and Selected Templates */}
                <div className="mb-4">
                  <div className="row g-3">
                    <div className="col-md-12">
                      <label
                        htmlFor="payerComments"
                        className="form-label hide-on-print"
                      >
                        Payer Comments:
                      </label>
                      {formData?.payerComments}
                    </div>
                  </div>
                </div>

                {/* Additional UB-04 Locators */}
                <div style={{ marginTop: "100px" }} className="mb-4">
                  <PdfHeader
                    company={company?.payload?.company}
                    patient={patient?.payload}
                  />
                  <h6>Additional UB-04 Locators</h6>
                  <hr />
                  <p>(UB-04 Locators 31 - 34) Occurrence Codes</p>
                  <div className="row g-3">
                    {formData?.occurrenceCodes?.map((code, index) => (
                      <React.Fragment key={`occurrenceCode-${index}`}>
                        <div className="col-md-6 w-50">
                          <label
                            htmlFor={`occurrenceCode${index + 1}A`}
                            className="form-label d-block"
                          >
                            {`${31 + Math.floor(index / 2)}A`} Occurrence Code
                          </label>
                          {formData?.occurrenceCodes[index]?.code || ""}
                        </div>
                        <div className="col-md-6 w-50">
                          <label
                            htmlFor={`occurrenceCode${index + 1}B`}
                            className="form-label d-block"
                          >
                            {`${31 + Math.floor(index / 2)}B`} Date
                          </label>
                          {formData?.occurrenceCodes[index]?.date || ""}
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <p>(UB-04 Locators 35 - 36) Occurrence Spans</p>
                  <div className="row g-3">
                    {formData?.occurrenceSpans?.map((span, index) => (
                      <React.Fragment key={`occurrenceSpan-${index}`}>
                        <div className="col-md-6 w-50">
                          <label
                            htmlFor={`occurrenceSpan${index + 1}A`}
                            className="form-label d-block"
                          >
                            {`${35 + Math.floor(index / 2)}A`} Occurrence Span
                            Code
                          </label>
                          {formData?.occurrenceSpans[index]?.code || ""}
                        </div>
                        <div className="col-md-6 w-50">
                          <label
                            htmlFor={`occurrenceSpan${index + 1}B`}
                            className="form-label d-block"
                          >
                            {`${35 + Math.floor(index / 2)}B`} Occurrence Span
                            Start Date
                          </label>
                          {formData?.occurrenceSpans[index]?.startDate || ""}
                        </div>
                        <div className="col-md-6 w-50">
                          <label
                            htmlFor={`occurrenceSpan${index + 1}C`}
                            className="form-label d-block"
                          >
                            {`${35 + Math.floor(index / 2)}C`} Occurrence Span
                            End Date
                          </label>
                          {formData?.occurrenceSpans[index]?.endDate || ""}
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: "90px" }} className="mb-4">
                  <PdfHeader
                    company={company?.payload?.company}
                    patient={patient?.payload}
                  />
                  <p>(UB-04 Locators 39 - 41) Condition Codes</p>
                  <div className="row g-3">
                    {formData?.conditionCodes?.map((code, index) => (
                      <div
                        key={`conditionCode-${index}`}
                        className="col-md-6 w-50"
                      >
                        <label
                          htmlFor={`conditionCode${index + 1}`}
                          className="form-label d-block"
                        >
                          {`${39 + index}`} Condition Code
                        </label>
                        {formData?.conditionCodes[index] || ""}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Form Fields */}
                <div className="mb-4">
                  <hr />
                  <h6>Additional Form Fields</h6>
                  <hr />
                  <div className="row g-3">
                    <div className="col-md-6 w-50">
                      <label
                        htmlFor="employmentRelated"
                        className="form-label d-block"
                      >
                        Employment Related:
                      </label>
                      {formData?.employmentRelated}
                    </div>
                    <div className="col-md-6 w-50">
                      <label
                        htmlFor="autoAccident"
                        className="form-label d-block"
                      >
                        Auto Accident:
                      </label>
                      {formData?.autoAccident}
                    </div>
                    <div className="col-md-6 w-50">
                      <label htmlFor="claimCode" className="form-label d-block">
                        Claim Code:
                      </label>
                      {formData?.claimCode}
                    </div>
                    <div className="col-md-6 w-50">
                      <label
                        htmlFor="unableToWorkFrom"
                        className="form-label d-block"
                      >
                        Unable to Work From:
                      </label>
                      {formData?.unableToWorkFrom}
                    </div>
                    <div className="col-md-6 w-50">
                      <label
                        htmlFor="unableToWorkTo"
                        className="form-label d-block"
                      >
                        Unable to Work To:
                      </label>
                      {formData?.unableToWorkTo}
                    </div>
                    <div className="col-md-6 w-50">
                      <label
                        htmlFor="hospitalizationStartDate"
                        className="form-label d-block"
                      >
                        Hospitalization Start Date:
                      </label>
                      {formData?.hospitalizationStartDate}
                    </div>
                    <div className="col-md-6 w-50">
                      <label
                        htmlFor="hospitalizationEndDate"
                        className="form-label d-block"
                      >
                        Hospitalization End Date:
                      </label>
                      {formData?.hospitalizationEndDate}
                    </div>
                    <div className="col-md-6 w-50">
                      <label
                        htmlFor="emergencyTreatmentIndicator"
                        className="form-label d-block"
                      >
                        Emergency Treatment Indicator:
                      </label>
                      {formData?.emergencyTreatmentIndicator}
                    </div>
                  </div>
                </div>
              </div>
              {/* physician  */}
              <div
                style={{ marginTop: "90px" }}
                className="col-xl-12 col-md-12 col-12 mb-md-0 "
              >
                <PdfHeader
                  company={company?.payload?.company}
                  patient={patient?.payload}
                />
                <h6 className="mt-3">Physician Information</h6>
                <hr />

                <div className="row">
                  <div className=" col-md-6 w-50">
                    <label className="form-label my-2" htmlFor="npiNumber">
                      NPI Number:
                    </label>
                    {formData?.npiNumber}
                  </div>
                  <div className=" col-md-6 w-50">
                    <label className="form-label my-2" htmlFor="firstName">
                      First Name:
                    </label>
                    {formData?.firstName}
                  </div>
                </div>
                <div className="row">
                  <div className=" col-md-6 w-50">
                    <label className="form-label my-2" htmlFor="mi">
                      MI:
                    </label>
                    {formData?.mi}
                  </div>
                  <div className=" col-md-6 w-50">
                    <label className="form-label my-2" htmlFor="lastName">
                      Last Name:
                    </label>
                    {formData?.lastName}
                  </div>
                </div>
                <div className="row">
                  <div className=" col-md-6 w-50">
                    <label className="form-label my-2" htmlFor="taxonomyCode">
                      Taxonomy Code:
                    </label>
                    {formData?.taxonomyCode}
                  </div>
                  <div className=" col-md-6 w-50">
                    <label className="form-label my-2" htmlFor="credentials">
                      Credentials:
                    </label>
                    {formData?.credentials}
                  </div>
                </div>
                <div className="row">
                  <div className=" col-md-6 w-50">
                    <label className="form-label my-2" htmlFor="npiNo">
                      NPI No:
                    </label>
                    {formData?.npiNo}
                  </div>
                  <div className=" col-md-6 w-50">
                    <label
                      className="form-label d-block"
                      htmlFor="medicaidProviderIdentifier"
                    >
                      Medicaid Provider Identifier:
                    </label>
                    {formData?.medicaidProviderIdentifier}
                  </div>
                </div>

                <hr />
                <h6 className="mt-3">Physician Address</h6>
                <hr />
                <div className="row">
                  <div className="col-md-6 w-50">
                    <label className="form-label my-2" htmlFor="addressLine1">
                      Address Line 1:
                    </label>

                    {formData?.addressLine1}
                  </div>
                  <div className="col-md-6 w-50">
                    <label className="form-label my-2" htmlFor="addressLine2">
                      Address Line 2:
                    </label>
                    {formData?.addressLine2}
                  </div>

                  {/* const [county,setCounty]=useState("") */}
                  <div className="col-md-6 w-50">
                    <label className="form-label my-2" htmlFor="city">
                      City:
                    </label>
                  </div>
                  <div className="col-md-6 w-50">
                    <label className="form-label my-2" htmlFor="state">
                      State:
                    </label>
                  </div>
                  <div className="col-md-6 w-50">
                    <label className="form-label my-2" htmlFor="zip">
                      Zip:
                    </label>
                    {formData?.zip}
                  </div>

                  <div className="col-md-6 w-50">
                    <label className="form-label my-2" htmlFor="primaryPhone">
                      Primary Phone:
                    </label>
                    {formData?.primaryPhone}
                  </div>
                  <div className="col-md-6 w-50">
                    <label className="form-label my-2" htmlFor="alternatePhone">
                      Alternate Phone:
                    </label>
                    {formData?.alternatePhone}
                  </div>
                  <div className="col-md-6 w-50">
                    <label className="form-label my-2" htmlFor="fax">
                      Fax:
                    </label>
                    {formData?.fax}
                  </div>
                  <div className="col-md-6 w-50">
                    <label className="form-label my-2" htmlFor="email">
                      E-mail:
                    </label>
                    {formData?.email}
                  </div>

                  <div className="col-md-12 w-100">
                    <label className="form-label my-2">
                      Order Delivery Method:
                    </label>
                    <div className="row">
                      <div className="form-check col-md-2">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="deliveryMethodAxxessPhysicianPortal"
                          name="deliveryMethod"
                          value="AxxessPhysicianPortal"
                          checked={
                            formData?.deliveryMethod === "AxxessPhysicianPortal"
                          }
                        />
                        <label
                          className="form-label d-block"
                          htmlFor="deliveryMethodAxxessPhysicianPortal"
                        >
                          Axxess Physician Portal
                        </label>
                      </div>
                      <div className="form-check col-md-2">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="deliveryMethodEmail"
                          name="deliveryMethod"
                          value="Email"
                          checked={formData?.deliveryMethod === "Email"}
                        />
                        <label
                          className="form-label d-block"
                          htmlFor="deliveryMethodEmail"
                        >
                          Email
                        </label>
                      </div>
                      <div className="form-check col-md-2">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="deliveryMethodPhone"
                          name="deliveryMethod"
                          value="Phone"
                          checked={formData?.deliveryMethod === "Phone"}
                        />
                        <label
                          className="form-label d-block"
                          htmlFor="deliveryMethodPhone"
                        >
                          Phone
                        </label>
                      </div>
                      <div className="form-check col-md-2">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="deliveryMethodFax"
                          name="deliveryMethod"
                          value="Fax"
                          checked={formData?.deliveryMethod === "Fax"}
                        />
                        <label
                          className="form-label d-block"
                          htmlFor="deliveryMethodFax"
                        >
                          Fax
                        </label>
                      </div>
                      <div className="form-check col-md-2">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="deliveryMethodCourier"
                          name="deliveryMethod"
                          value="Courier"
                          checked={formData?.deliveryMethod === "Courier"}
                        />
                        <label
                          className="form-label d-block"
                          htmlFor="deliveryMethodCourier"
                        >
                          Courier
                        </label>
                      </div>
                      <div className="form-check col-md-2">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="deliveryMethodOther"
                          name="deliveryMethod"
                          value="Other"
                          checked={formData?.deliveryMethod === "Other"}
                        />
                        <label
                          className="form-label d-block"
                          htmlFor="deliveryMethodOther"
                        >
                          Other
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* clinical dignosis  */}
              <div
                style={{ marginTop: "170px" }}
                className="col-xl-12 col-md-12 col-12 mb-md-0 "
              >
                {/* Service Required */}

                <PdfHeader
                  company={company?.payload?.company}
                  patient={patient?.payload}
                />

                <h6>Service Required</h6>
                <hr />
                <div className="row">
                  <div className=" col-md-6 w-50">
                    <label className="form-label d-block">
                      Service Required
                    </label>
                    {["SN", "HHA", "PT", "OT", "ST", "MSW"]?.map((service) => (
                      <div className="form-check" key={service}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={service}
                          name="serviceRequired"
                          value={service}
                          checked={formData?.serviceRequired?.includes(service)}
                        />
                        <label className="form-label d-block" htmlFor={service}>
                          {service}
                        </label>
                      </div>
                    ))}
                  </div>
                  {/* DME Needed */}
                  <div className=" col-md-6 w-50">
                    <label className="form-label d-block">DME Needed</label>
                    {[
                      "bedsideCommode",
                      "cane",
                      "elevatedToiletSeat",
                      "grabBars",
                      "hospitalBed",
                      "nebulizer",
                      "oxygen",
                      "tubShowerBench",
                      "walker",
                      "wheelchair",
                      "other",
                    ]?.map((dme) => (
                      <div className="form-check" key={dme}>
                        <input
                          type="checkbox"
                          id={dme}
                          name="dmeNeeded"
                          value={dme}
                          checked={formData?.dmeNeeded?.includes(dme)}
                          className="form-check-input"
                        />
                        <label className="form-label d-block" htmlFor={dme}>
                          {dme}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Height */}
                <div className="row ">
                  <div className="col-md-6 w-50">
                    <label htmlFor="heightValue" className="form-label d-block">
                      Height
                    </label>
                    {formData?.height?.value}
                  </div>
                  <div className="col-md-6 w-50">
                    <label htmlFor="heightUnit" className="form-label d-block">
                      Unit
                    </label>
                    {formData?.height?.unit}
                  </div>
                </div>

                {/* Weight */}
                <div className="row ">
                  <div className="col-md-6 w-50">
                    <label htmlFor="weightValue" className="form-label d-block">
                      Weight
                    </label>
                    {formData?.weight?.value}
                  </div>
                  <div className="col-md-6 w-50">
                    <label htmlFor="weightUnit" className="form-label d-block">
                      Unit
                    </label>
                    {formData?.weight?.unit}
                  </div>
                </div>

                {/* Primary Diagnosis */}
                <div className="row ">
                  <div className="col-md-6 w-50">
                    <label
                      htmlFor="primaryDiagnosis"
                      className="form-label d-block"
                    >
                      Primary Diagnosis
                    </label>
                    {formData?.primaryDiagnosis}
                  </div>
                  <div className="col-md-6 w-50">
                    <label
                      htmlFor="primaryDiagnosisCode"
                      className="form-label d-block"
                    >
                      Primary Diagnosis Code
                    </label>
                    {formData?.primaryDiagnosisCode}
                  </div>
                </div>

                <div className="row">
                  {/* Other Diagnoses */}
                  <div className="">
                    <label className="form-label d-block">
                      Other Diagnoses
                    </label>
                    {formData?.otherDiagnoses?.map((diagnosis, index) => (
                      <div className="row " key={index}>
                        <div className="col-md-6 w-50">
                          <label
                            htmlFor={`diagnosis-${index}`}
                            className="form-label d-block"
                          >
                            Diagnosis
                          </label>
                          {diagnosis.diagnosis}
                        </div>
                        <div className="col-md-6 w-50">
                          <label
                            htmlFor={`code-${index}`}
                            className="form-label d-block"
                          >
                            Code
                          </label>
                          {diagnosis.code}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Clinical Comments */}
                  <div className="">
                    <label
                      htmlFor="clinicalComments"
                      className="form-label hide-on-print"
                    >
                      Clinical Comments
                    </label>
                    {formData?.clinicalComments}
                  </div>
                </div>
              </div>
              {/* pharmacy  */}
              <div
                style={{ marginTop: "210px" }}
                className="col-xl-12 col-md-12 col-12 mb-md-0 "
              >
                <PdfHeader
                  company={company?.payload?.company}
                  patient={patient?.payload}
                />
                <h6>Pharmacy Information</h6>
                <hr />
                <div className="row">
                  <div className=" col-md-6 w-50">
                    <label
                      htmlFor="pharmacyName"
                      className="form-label d-block"
                    >
                      Pharmacy Name:
                    </label>
                    {formData?.pharmacyName}
                  </div>
                  <div className=" col-md-6 w-50">
                    <label
                      htmlFor="addressLine1"
                      className="form-label d-block"
                    >
                      Address Line 1:
                    </label>
                    {formData?.addressLine1}
                  </div>
                </div>
                <div className="row">
                  <div className=" col-md-6 w-50">
                    <label
                      htmlFor="addressLine2"
                      className="form-label d-block"
                    >
                      Address Line 2:
                    </label>
                    {formData?.addressLine2}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="city" className="form-label d-block">
                      City:
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 w-50">
                    <label htmlFor="state" className="form-label d-block">
                      State:
                    </label>
                  </div>
                  <div className="col-md-6 w-50">
                    <label htmlFor="zip" className="form-label d-block">
                      Zip:
                    </label>
                    {formData?.zip}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 w-50">
                    <label
                      htmlFor="primaryPhone"
                      className="form-label d-block"
                    >
                      Primary Phone:
                    </label>
                    {formData?.primaryPhone}
                  </div>
                  <div className="col-md-6 w-50">
                    <label
                      htmlFor="contactFirstName"
                      className="form-label d-block"
                    >
                      Contact First Name:
                    </label>
                    {formData?.contactFirstName}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 w-50">
                    <label
                      htmlFor="contactLastName"
                      className="form-label d-block"
                    >
                      Contact Last Name:
                    </label>
                    {formData?.contactLastName}
                  </div>
                  <div className="col-md-6 w-50">
                    <label htmlFor="email" className="form-label d-block">
                      Email:
                    </label>
                    {formData?.email}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 w-50">
                    <label htmlFor="faxNumber" className="form-label d-block">
                      Fax Number:
                    </label>
                    {formData?.faxNumber}
                  </div>

                  <div className=" col-md-6 w-50">
                    <label htmlFor="comment" className="form-label d-block">
                      Comment:
                    </label>
                    {formData?.comment}
                  </div>
                </div>
                <hr />
                <h6>Additional Pharmacies</h6>
                <hr />
                <div className="row ">
                  {formData?.additionalPharmacies?.map((pharmacy, index) => (
                    <div key={index} className="col-md-6  w-50">
                      <label
                        htmlFor={`additionalPharmacy${index + 1}`}
                        className="form-label d-block"
                      >
                        Additional Pharmacy {index + 1}
                      </label>
                      {pharmacy?.name}
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-xl-12 col-md-12 col-12 mb-md-0 ">
                <div className="row g-3">
                  <div className="row">
                    <div className="col-md-6 w-50">
                      <label
                        htmlFor="primaryFirstName"
                        className="form-label d-block"
                      >
                        First Name:
                      </label>
                      {formData?.primary?.firstName}
                    </div>
                    <div className="col-md-6 w-50">
                      <label
                        htmlFor="primaryLastName"
                        className="form-label d-block"
                      >
                        Last Name:
                      </label>
                      {formData?.primary?.lastName}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 w-50">
                      <label
                        htmlFor="primaryMobilePhone"
                        className="form-label d-block"
                      >
                        Mobile Phone:
                      </label>
                      {formData?.primary?.mobilePhone}
                    </div>
                    <div className="col-md-6 w-50">
                      <label
                        htmlFor="primaryAlternatePhone"
                        className="form-label d-block"
                      >
                        Alternate Phone:
                      </label>
                      {formData?.primary?.alternatePhone}
                    </div>
                  </div>

                  <div className="col-md-6 w-50">
                    <label
                      htmlFor="primaryRelationship"
                      className="form-label d-block"
                    >
                      Relationship:
                    </label>
                    <div>
                      {[
                        "Spouse",
                        "Parent",
                        "Sibling",
                        "Child",
                        "Relative",
                        "Friend",
                        "Other",
                      ]?.map((relationship) => (
                        <div key={relationship} className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="primaryRelationship"
                            id={`relationship${relationship}`}
                            value={relationship}
                            checked={
                              formData?.primary?.relationship === relationship
                            }
                          />
                          <label
                            className="form-label d-block"
                            htmlFor={`relationship${relationship}`}
                          >
                            {relationship}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-md-6 w-50">
                    <label
                      htmlFor="primaryEmail"
                      className="form-label d-block"
                    >
                      Email:
                    </label>
                    {formData?.primary?.email}
                  </div>
                  <div style={{ marginTop: "150px" }} className="row">
                    <PdfHeader
                      company={company?.payload?.company}
                      patient={patient?.payload}
                    />
                  </div>
                  <div className="col-md-6 w-50">
                    <label className="form-label d-block">
                      Representative:
                    </label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="primaryRepresentative"
                        id="primaryLegalRep"
                        value="Legal Representative"
                        checked={
                          formData?.primary?.representative ===
                          "Legal Representative"
                        }
                      />
                      <label
                        className="form-label d-block"
                        htmlFor="primaryLegalRep"
                      >
                        Legal Representative
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="primaryRepresentative"
                        id="primaryPatientRep"
                        value="Patient Selected Representative"
                        checked={
                          formData?.primary?.representative ===
                          "Patient Selected Representative"
                        }
                      />
                      <label
                        className="form-label d-block"
                        htmlFor="primaryPatientRep"
                      >
                        Patient Selected Representative
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="primarySameAsPatientAddress"
                        checked={formData?.primary?.sameAsPatientAddress}
                      />
                      <label
                        className="form-label d-block"
                        htmlFor="primarySameAsPatientAddress"
                      >
                        Same as Patient Address
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {!formData?.primary?.sameAsPatientAddress && (
                    <React.Fragment>
                      <div className="col-md-6">
                        <label
                          htmlFor="primaryAddressLine1"
                          className="form-label d-block"
                        >
                          Address Line 1:
                        </label>
                        {formData?.primary?.addressLine1}
                      </div>
                      <div className="col-md-6">
                        <label
                          htmlFor="primaryAddressLine2"
                          className="form-label d-block"
                        >
                          Address Line 2:
                        </label>
                        {formData?.primary?.addressLine2}
                      </div>
                      <div className="col-md-6">
                        <label
                          htmlFor="primaryCity"
                          className="form-label d-block"
                        >
                          City:
                        </label>
                      </div>
                      <div className="col-md-6">
                        <label
                          htmlFor="primaryState"
                          className="form-label d-block"
                        >
                          State:
                        </label>
                      </div>
                      <div className="col-md-6">
                        <label
                          htmlFor="primaryZip"
                          className="form-label d-block"
                        >
                          ZIP:
                        </label>
                        {formData?.primary?.zip}
                      </div>
                    </React.Fragment>
                  )}

                  {/* Additional Emergency Contacts */}
                  {formData?.additional?.map((contact, index) => (
                    <div key="index" className="row g-3">
                      <div className="col-md-6">
                        <label
                          htmlFor={`additionalFirstName-${index}`}
                          className="form-label d-block"
                        >
                          First Name:
                        </label>
                        {contact?.firstName}
                      </div>
                      <div className="col-md-6">
                        <label
                          htmlFor={`additionalLastName-${index}`}
                          className="form-label d-block"
                        >
                          Last Name:
                        </label>
                        {contact?.lastName}
                      </div>
                      <div className="col-md-6">
                        <label
                          htmlFor={`additionalMobilePhone-${index}`}
                          className="form-label d-block"
                        >
                          Mobile Phone:
                        </label>
                        {contact?.mobilePhone}
                      </div>
                      <div className="col-md-6">
                        <label
                          htmlFor={`additionalAlternatePhone-${index}`}
                          className="form-label d-block"
                        >
                          Alternate Phone:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id={`additionalAlternatePhone-${index}`}
                          value={contact?.alternatePhone}
                          placeholder="Enter Alternate Phone"
                        />
                      </div>
                      <div className="col-md-6">
                        <label
                          htmlFor={`additionalRelationship-${index}`}
                          className="form-label d-block"
                        >
                          Relationship:
                        </label>
                        <div>
                          {[
                            "Spouse",
                            "Parent",
                            "Sibling",
                            "Child",
                            "Relative",
                            "Friend",
                            "Other",
                          ]?.map((relationship) => (
                            <div key={relationship} className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name={`additionalRelationship-${index}`}
                                id={`additionalRelationship-${index}-${relationship}`}
                                value={relationship}
                                checked={contact?.relationship === relationship}
                              />
                              <label
                                className="form-label d-block"
                                htmlFor={`additionalRelationship-${index}-${relationship}`}
                              >
                                {relationship}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label
                          htmlFor={`additionalEmail-${index}`}
                          className="form-label d-block"
                        >
                          Email:
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id={`additionalEmail-${index}`}
                          value={contact?.email}
                          placeholder="Enter Email Address"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label d-block">
                          Representative:
                        </label>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name={`additionalRepresentative-${index}`}
                            id={`additionalLegalRep-${index}`}
                            value="Legal Representative"
                            checked={
                              contact?.representative === "Legal Representative"
                            }
                          />
                          <label
                            className="form-label d-block"
                            htmlFor={`additionalLegalRep-${index}`}
                          >
                            Legal Representative
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name={`additionalRepresentative-${index}`}
                            id={`additionalPatientRep-${index}`}
                            value="Patient Selected Representative"
                            checked={
                              contact?.representative ===
                              "Patient Selected Representative"
                            }
                          />
                          <label
                            className="form-label d-block"
                            htmlFor={`additionalPatientRep-${index}`}
                          >
                            Patient Selected Representative
                          </label>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`additionalSameAsPatientAddress-${index}`}
                            checked={contact?.sameAsPatientAddress}
                          />
                          <label
                            className="form-label d-block"
                            htmlFor={`additionalSameAsPatientAddress-${index}`}
                          >
                            Same as Patient Address
                          </label>
                        </div>
                      </div>
                      <div className="row">
                        {!contact?.sameAsPatientAddress && (
                          <React.Fragment>
                            <div className="col-md-6">
                              <label
                                htmlFor={`additionalAddressLine1-${index}`}
                                className="form-label d-block"
                              >
                                Address Line 1:
                              </label>
                              {contact?.addressLine1}
                            </div>
                            <div className="col-md-6">
                              <label
                                htmlFor={`additionalAddressLine2-${index}`}
                                className="form-label d-block"
                              >
                                Address Line 2:
                              </label>
                              {contact?.addressLine2}
                            </div>
                            <div className="col-md-6">
                              <label
                                htmlFor={`additionalCity-${index}`}
                                className="form-label d-block"
                              >
                                City:
                              </label>
                            </div>
                            <div className="col-md-6">
                              <label
                                htmlFor={`additionalState-${index}`}
                                className="form-label d-block"
                              >
                                State:
                              </label>
                            </div>
                            <div className="col-md-6">
                              <label
                                htmlFor={`additionalZip-${index}`}
                                className="form-label d-block"
                              >
                                ZIP:
                              </label>
                              {contact?.zip}
                            </div>
                          </React.Fragment>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: "150px" }} className="row">
                  {/* <PdfHeader
                    company={company?.payload?.company}
                    patient={patient?.payload}
                  /> */}
                  <div className=" col-md-6 w-50">
                    <label className="form-label d-block">
                      Representative contacted regarding admission:
                    </label>
                    <div>
                      {[
                        {
                          value: "N/A",
                          label:
                            "N/A (no legal/patient-selected representative)",
                        },
                        {
                          value: "legalRepresentative",
                          label:
                            "Legal Representative contacted regarding admission",
                        },
                        {
                          value: "patientDecline",
                          label:
                            "Patient request to decline notice of rights to Patient-Selected Representative",
                        },
                        {
                          value: "patientSelected",
                          label:
                            "Patient-Selected Representative contacted regarding admission",
                        },
                        {
                          value: "legalNotInAgreement",
                          label:
                            "Legal Representative not in agreement with admission",
                        },
                        {
                          value: "physicianNotified",
                          label: "Physician notified",
                        },
                        {
                          value: "patientNotified",
                          label: "Patient notified",
                        },
                      ]?.map((option) => (
                        <div key={option.value} className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="representativeContacted"
                            id={`representativeContacted-${option.value}`}
                            value={option.value}
                            checked={
                              formData?.representativeContacted === option.value
                            }
                          />
                          <label
                            className="form-label d-block"
                            htmlFor={`representativeContacted-${option.value}`}
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-md-6 w-50">
                    {/* Conditional rendering based on the selected representative */}
                    {formData?.representativeContacted ===
                      "legalRepresentative" && (
                      <>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="legalRepresentativeOption"
                            id="legalRepOption1"
                            value="contactedAvailable"
                            checked={
                              formData?.legalRepresentativeOption ===
                              "contactedAvailable"
                            }
                          />
                          <label
                            className="form-label d-block"
                            htmlFor="legalRepOption1"
                          >
                            Contacted and will be available for admission visit
                            to receive written notice in advance of care
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="legalRepresentativeOption"
                            id="legalRepOption2"
                            value="inAgreementNotAvailable"
                            checked={
                              formData?.legalRepresentativeOption ===
                              "inAgreementNotAvailable"
                            }
                          />
                          <label
                            className="form-label d-block"
                            htmlFor="legalRepOption2"
                          >
                            In agreement with need for care, but not available
                            for admission visit (if this person has healthcare
                            decision making authority, the HHA must provide
                            notice of the patient &apos;s rights prior to
                            initiating care. May obtain electronic or digital
                            signature)
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="legalRepresentativeOption"
                            id="legalRepOption3"
                            value="other"
                            checked={
                              formData?.legalRepresentativeOption === "other"
                            }
                          />
                          <label
                            className="form-label d-block"
                            htmlFor="legalRepOption3"
                          >
                            Other
                          </label>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {formData?.representativeContacted === "patientSelected" && (
                  <>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="patientSelectedRepresentativeOption"
                        id="patientSelectedOption1"
                        value="contactedAvailable"
                        checked={
                          formData?.patientSelectedRepresentativeOption ===
                          "contactedAvailable"
                        }
                      />
                      <label
                        className="form-label d-block"
                        htmlFor="patientSelectedOption1"
                      >
                        Contacted and will be available for admission visit to
                        receive written notice in advance of care
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="patientSelectedRepresentativeOption"
                        id="patientSelectedOption2"
                        value="sentCopy"
                        checked={
                          formData?.patientSelectedRepresentativeOption ===
                          "sentCopy"
                        }
                      />
                      <label
                        className="form-label d-block"
                        htmlFor="patientSelectedOption2"
                      >
                        Sent copy, as requested, of notice of rights, transfer
                        and DC policies provided by mail or other electronic
                        means (to be received within 4 days)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="patientSelectedRepresentativeOption"
                        id="patientSelectedOption3"
                        value="other"
                        checked={
                          formData?.patientSelectedRepresentativeOption ===
                          "other"
                        }
                      />
                      <label
                        className="form-label d-block"
                        htmlFor="patientSelectedOption3"
                      >
                        Other
                      </label>
                    </div>
                  </>
                )}

                <div className="">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="doNotContactCAHPS"
                      checked={formData?.doNotContactCAHPS}
                    />
                    <label
                      className="form-label d-block"
                      htmlFor="doNotContactCAHPS"
                    >
                      Do Not Contact for CAHPS (When checked, please provide
                      appropriate reason(s).)
                    </label>
                  </div>
                </div>

                {formData?.doNotContactCAHPS && (
                  <>
                    <div style={{ marginTop: "50px" }} className="row">
                      <PdfHeader
                        company={company?.payload?.company}
                        patient={patient?.payload}
                      />
                    </div>
                    <div className="">
                      <label
                        htmlFor="reasonForNoContact"
                        className="form-label d-block"
                      >
                        Reason for no contact for CAHPS
                      </label>
                      <div>
                        {[
                          { value: "", label: "Select reason" },
                          {
                            value: "endangersHealth",
                            label:
                              "Endangers health or well being of a home health provider",
                          },
                          {
                            value: "stateRegulatedPatient",
                            label: "State regulated patient",
                          },
                          {
                            value: "patientRequest",
                            label:
                              "Patient request not to be contacted for surveys",
                          },
                          { value: "other", label: "Other" },
                        ]?.map((option) => (
                          <div key={option.value} className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="reasonForNoContact"
                              id={`reasonForNoContact-${option.value}`}
                              value={option.value}
                              checked={
                                formData?.reasonForNoContact === option.value
                              }
                            />
                            <label
                              className="form-label d-block"
                              htmlFor={`reasonForNoContact-${option.value}`}
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {formData?.reasonForNoContact === "other" && (
                      <div className="">
                        <label
                          htmlFor="otherReason"
                          className="form-label d-block"
                        >
                          Other reason
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="otherReason"
                          value={formData?.otherReason}
                        />
                      </div>
                    )}

                    <div className="">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="alternateCAHPSContact"
                          checked={formData?.alternateCAHPSContact}
                        />
                        <label
                          className="form-label d-block"
                          htmlFor="alternateCAHPSContact"
                        >
                          Alternate CAHPS Contact (Applicable only when the
                          patient is physically or mentally incapable of
                          completing survey.)
                        </label>
                      </div>
                    </div>

                    {formData?.alternateCAHPSContact && (
                      <>
                        <div className=" d-flex gap-4">
                          <label className="form-label d-block">
                            Same as Primary Emergency Contact
                          </label>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="sameAsPrimaryEmergencyContact"
                            checked={
                              formData?.alternateCAHPSContactDetails
                                .sameAsPrimaryEmergencyContact
                            }
                          />
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            {!formData?.alternateCAHPSContactDetails
                              .sameAsPrimaryEmergencyContact && (
                              <>
                                {/* Add fields for alternate CAHPS contact */}
                                <div className="">
                                  <label
                                    htmlFor="altFirstName"
                                    className="form-label d-block"
                                  >
                                    First Name
                                  </label>
                                  {
                                    formData?.alternateCAHPSContactDetails
                                      ?.firstName
                                  }
                                </div>
                                <div className="">
                                  <label
                                    htmlFor="altLastName"
                                    className="form-label d-block"
                                  >
                                    Last Name
                                  </label>
                                  {
                                    formData?.alternateCAHPSContactDetails
                                      ?.lastName
                                  }
                                </div>
                                <div className="">
                                  <label
                                    className="form-label d-block"
                                    htmlFor="altRelationship"
                                  >
                                    Relationship
                                  </label>
                                  <div>
                                    {[
                                      {
                                        value: "",
                                        label: "Select Relationship",
                                      },
                                      { value: "Spouse", label: "Spouse" },
                                      { value: "Parent", label: "Parent" },
                                      { value: "Sibling", label: "Sibling" },
                                      { value: "Child", label: "Child" },
                                      {
                                        value: "Relative",
                                        label: "Relative",
                                      },
                                      { value: "Friend", label: "Friend" },
                                      { value: "Other", label: "Other" },
                                    ]?.map((option) => (
                                      <div
                                        key={option.value}
                                        className="form-check"
                                      >
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="relationship"
                                          id={`relationship-${option.value}`}
                                          value={option.value}
                                          checked={
                                            formData
                                              ?.alternateCAHPSContactDetails
                                              ?.relationship === option.value
                                          }
                                        />
                                        <label
                                          className="form-label d-block"
                                          htmlFor={`relationship-${option.value}`}
                                        >
                                          {option.label}
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div className="">
                                  <label
                                    htmlFor="altMobilePhone"
                                    className="form-label d-block"
                                  >
                                    Mobile Phone
                                  </label>
                                  {
                                    formData?.alternateCAHPSContactDetails
                                      ?.mobilePhone
                                  }
                                </div>
                                <div className="">
                                  <label
                                    htmlFor="altAlternatePhone"
                                    className="form-label d-block"
                                  >
                                    Alternate Phone
                                  </label>
                                  {
                                    formData?.alternateCAHPSContactDetails
                                      ?.alternatePhone
                                  }
                                </div>
                                <div className="">
                                  <label
                                    htmlFor="altEmail"
                                    className="form-label d-block"
                                  >
                                    Email
                                  </label>
                                  {
                                    formData?.alternateCAHPSContactDetails
                                      ?.email
                                  }
                                </div>
                                <div className="">
                                  <label
                                    htmlFor="altAddressLine1"
                                    className="form-label d-block"
                                  >
                                    Address Line 1
                                  </label>
                                  {
                                    formData?.alternateCAHPSContactDetails
                                      ?.addressLine1
                                  }
                                </div>
                                <div className="">
                                  <label
                                    htmlFor="altAddressLine2"
                                    className="form-label d-block"
                                  >
                                    Address Line 2
                                  </label>
                                  {
                                    formData?.alternateCAHPSContactDetails
                                      ?.addressLine2
                                  }
                                </div>
                                <div className="">
                                  <label
                                    htmlFor="altCity"
                                    className="form-label d-block"
                                  >
                                    City
                                  </label>
                                </div>
                                <div className="">
                                  <label
                                    htmlFor="altState"
                                    className="form-label d-block"
                                  >
                                    State
                                  </label>
                                </div>
                                <div className="">
                                  <label
                                    htmlFor="altZIP"
                                    className="form-label d-block"
                                  >
                                    ZIP Code
                                  </label>
                                  {formData?.alternateCAHPSContactDetails?.zip}
                                </div>
                                <div className="">
                                  <label
                                    htmlFor="altCounty"
                                    className="form-label d-block"
                                  >
                                    County
                                  </label>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
                {/* contract-conment  */}
                <div className="contacts-comments mt-5">
                  <div className="comments-section">
                    {/* Comments input */}
                    <label className="form-label my-2">Contacts Comments</label>

                    {/* {comments} */}
                  </div>
                </div>
              </div>
              <div className="col-xl-12 col-md-12 col-12 mb-md-0 ">
                {/* Emergency Triage Information */}
                <hr />
                <h6>Emergency Triage</h6>
                <hr />
                <div className="row">
                  <div className=" col-md-6 w-50">
                    <label
                      htmlFor="emergencyTriage"
                      className="form-label d-block"
                    >
                      Emergency Triage
                    </label>
                    <div>
                      <input
                        type="radio"
                        name="emergencyTriage"
                        id="emergencyTriage1"
                        value="1"
                        checked={formData?.emergencyTriage === "1"}
                      />{" "}
                      1. Life-threatening (or potential) and requires ongoing
                      medical treatment.
                      <br />
                      <input
                        type="radio"
                        name="emergencyTriage"
                        id="emergencyTriage2"
                        value="2"
                        checked={formData?.emergencyTriage === "2"}
                      />{" "}
                      2. Not life-threatening but would suffer severe adverse
                      effects from interruption of services.
                      <br />
                      <input
                        type="radio"
                        name="emergencyTriage"
                        id="emergencyTriage3"
                        value="3"
                        checked={formData?.emergencyTriage === "3"}
                      />{" "}
                      3. Visits could be postponed 24-48 hours without adverse
                      effects.
                      <br />
                      <input
                        type="radio"
                        name="emergencyTriage"
                        id="emergencyTriage4"
                        value="4"
                        checked={formData?.emergencyTriage === "4"}
                      />{" "}
                      4. Visits could be postponed 72-96 hours without adverse
                      effects.
                    </div>
                  </div>
                  <div className=" col-md-6 w-50">
                    <label
                      htmlFor="additionalInfo"
                      className="form-label d-block"
                    >
                      Additional Emergency Preparedness Information
                    </label>
                    <div>
                      <input
                        type="checkbox"
                        name="additionalInfo"
                        id="needsAssistance"
                        value="needsAssistance"
                        checked={formData?.additionalInfo?.includes(
                          "needsAssistance"
                        )}
                      />{" "}
                      Needs assistance during an emergency
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        name="additionalInfo"
                        id="contactWithOfficials"
                        value="contactWithOfficials"
                        checked={formData?.additionalInfo?.includes(
                          "contactWithOfficials"
                        )}
                      />{" "}
                      Contact made with local/state emergency preparedness
                      officials regarding patient in need of help during an
                      evacuation
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        name="additionalInfo"
                        id="medicalNeeds"
                        value="medicalNeeds"
                        checked={formData?.additionalInfo?.includes(
                          "medicalNeeds"
                        )}
                      />{" "}
                      Medical Needs/Equipment (i.e., bedbound, oxygen, vent, IV
                      cardiac meds other DME)
                    </div>
                    {formData?.additionalInfo?.medicalNeeds && (
                      <div>
                        <label
                          htmlFor="medicalNeedsInfo"
                          className="form-label d-block"
                        >
                          Medical Needs/Equipment Details
                        </label>
                        <textarea
                          name="medicalNeedsInfo"
                          id="medicalNeedsInfo"
                          className="form-control"
                          value={formData?.medicalNeedsInfo}
                        ></textarea>
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Emergency Preparedness Information */}
                <div className="row ">
                  <div className="col-md-12">
                    {formData?.additionalComments}
                  </div>
                </div>

                <div className="row ">
                  <div className="col-md-6">
                    <label
                      htmlFor="evacuationZone"
                      className="form-label d-block"
                    >
                      Evacuation Zone
                    </label>
                    {formData?.evacuationZone}
                  </div>
                  <div className="col-md-6 my-2">
                    <input
                      type="checkbox"
                      name="evacuationAddress"
                      id="evacuationAddress"
                      checked={formData?.evacuationAddress}
                    />{" "}
                    Same as Emergency Contact
                  </div>
                </div>
                {/* Address Fields */}
                {!formData?.evacuationAddress && (
                  <div>
                    <div className="row">
                      <div className="col-md-6  w-50">
                        <label htmlFor="addressLine1">Address Line 1</label>
                        {formData?.addressLine1}
                      </div>
                      <div className="col-md-6  w-50">
                        <label htmlFor="addressLine2">Address Line 2</label>
                        {formData?.addressLine2}
                      </div>
                    </div>
                    <PdfHeader
                      company={company?.payload?.company}
                      patient={patient?.payload}
                    />
                    <div className="row">
                      <div className="col-md-6  w-50">
                        <label htmlFor="state">State</label>
                      </div>
                      <div className="col-md-6  w-50">
                        <label htmlFor="city">City</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6  w-50">
                        <label htmlFor="state">County</label>
                      </div>
                      <div className="col-md-6  w-50">
                        <label htmlFor="zip">ZIP Code</label>
                        {formData?.zip}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6  w-50">
                        <label htmlFor="zip">Mobile Phone</label>
                        {formData?.mobilePhone}
                      </div>
                      <div className="col-md-6  w-50">
                        <label htmlFor="zip">Alternative MobilePhone</label>
                        {formData?.altMobilePhone}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="col-md-12 my-2">
                        <input
                          type="checkbox"
                          name="evacuationAddress"
                          id="evacuationAddress"
                          checked={formData?.evacuationAddress}
                        />{" "}
                        Set as visit location
                      </div>
                    </div>
                  </div>
                )}

                <div className="">
                  <label htmlFor="comments" className="form-label d-block">
                    Comments
                  </label>
                  {formData?.comments}
                </div>
              </div>
              <div className="col-xl-12 col-md-12 col-12 mb-md-0 ">
                <div className="row">
                  <hr />
                  <h6>Advance Care Plan/Admission</h6>
                  <hr />
                  <div className="col-md-12">
                    <label htmlFor="admission" className="form-label d-block">
                      Does this patient have an advance care plan or a surrogate
                      decision-maker AND able to provide legal documentation for
                      the home health medical record?
                    </label>
                    <div>
                      <input
                        type="radio"
                        name="admission"
                        id="admissionYes"
                        value="Yes"
                        checked={formData?.admission === "Yes"}
                      />{" "}
                      Yes
                      <br />
                      <input
                        type="radio"
                        name="admission"
                        id="admissionNo"
                        value="No"
                        checked={formData?.admission === "No"}
                      />{" "}
                      No
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <label
                      htmlFor="comment"
                      className="form-label d-block my-2"
                    >
                      Comments
                    </label>

                    {formData?.comment}
                  </div>
                </div>
              </div>
              <div className="col-xl-12 col-md-12 col-12 mb-md-0">
                <hr />
                <h6>Referring Information</h6>
                <hr />
                <div className="row">
                  {/* Referring Physician */}
                  <div className=" col-md-6 w-50">
                    <label
                      htmlFor="referringPhysician"
                      className="form-label d-block"
                    >
                      Referring Physician
                    </label>
                    {formData?.referringPhysician}
                  </div>

                  {/* NPI */}
                  <div className=" col-md-6 w-50">
                    <label htmlFor="npi" className="form-label d-block">
                      NPI
                    </label>
                    {formData?.npi}
                  </div>
                </div>

                <div className="row">
                  {/* Face-to-Face Evaluation */}
                  <div className=" col-md-6 w-50">
                    <label
                      htmlFor="faceToFaceEvaluation"
                      className="form-label d-block"
                    >
                      Face-to-Face Evaluation
                    </label>
                    <div>
                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          name="faceToFaceEvaluation"
                          id="faceToFaceEvaluationNA"
                          value="N/A"
                          checked={formData?.faceToFaceEvaluation === "N/A"}
                        />
                        <label
                          className="form-label d-block"
                          htmlFor="faceToFaceEvaluationNA"
                        >
                          N/A
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          name="faceToFaceEvaluation"
                          id="faceToFaceEvaluationDate"
                          value="Date of Face-to-Face Visit"
                          checked={
                            formData?.faceToFaceEvaluation ===
                            "Date of Face-to-Face Visit"
                          }
                        />
                        <label
                          className="form-label d-block"
                          htmlFor="faceToFaceEvaluationDate"
                        >
                          Date of Face-to-Face Visit
                        </label>
                        {formData?.faceToFaceEvaluation ===
                          "Date of Face-to-Face Visit" && (
                          <div className="my-2 ml-5">
                            <input
                              className="form-control"
                              name="faceToFaceEvaluationDate"
                              type="date"
                              value={formData?.faceToFaceEvaluationDate}
                            />
                          </div>
                        )}
                      </div>
                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          name="faceToFaceEvaluation"
                          id="faceToFaceEvaluation30Days"
                          value="Face-to-Face to be completed within 30days"
                          checked={
                            formData?.faceToFaceEvaluation ===
                            "Face-to-Face to be completed within 30days"
                          }
                        />
                        <label
                          className="form-label d-block"
                          htmlFor="faceToFaceEvaluation30Days"
                        >
                          Face-to-Face to be completed within 30 days
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className=" col-md-6 w-50">
                    <label
                      htmlFor="certifyingPhysician"
                      className="form-label d-block"
                    >
                      Certifying Physician
                    </label>
                    {formData?.certifyingPhysician}
                  </div>
                </div>

                <div className="row">
                  {/* Certifying Physician */}

                  {/* Attending Physician */}
                  <div className=" col-md-6 w-50">
                    <label className="form-label d-block">
                      Attending Physician
                    </label>
                    <div>
                      {[
                        {
                          value: "Non-Healthcare Facility Point of Origin",
                          label: "Non-Healthcare Facility Point of Origin",
                        },
                        {
                          value: "Clinic or Physician's Office",
                          label: "Clinic or Physician's Office",
                        },
                        {
                          value: "Transfer From Hospital",
                          label: "Transfer From Hospital",
                        },
                        {
                          value: "Transfer From SNF",
                          label: "Transfer From SNF",
                        },
                        {
                          value: "Court/Law Enforcement",
                          label: "Court/Law Enforcement",
                        },
                        {
                          value: "Information Not Available",
                          label: "Information Not Available",
                        },
                        { value: "Emergency Room", label: "Emergency Room" },
                      ]?.map((option) => (
                        <div key={option.value} className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            name="attendingPhysician"
                            id={`attendingPhysician-${option.value}`}
                            value={option.value}
                            checked={
                              formData?.attendingPhysician === option.value
                            }
                          />
                          <label
                            className="form-label d-block"
                            htmlFor={`attendingPhysician-${option.value}`}
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Admission Source */}
                  <div className=" col-md-6 w-50">
                    <label
                      htmlFor="admissionSource"
                      className="form-label d-block"
                    >
                      Admission Source
                    </label>
                    {formData?.admissionSource}
                  </div>

                  {/* Name of Referral Source */}
                  <div className=" col-md-6 w-50">
                    <label
                      htmlFor="nameOfReferralSource"
                      className="form-label d-block"
                    >
                      Name of Referral Source
                    </label>
                    {formData?.nameOfReferralSource}
                  </div>

                  {/* Referral Date */}
                  <div className=" col-md-6 w-50">
                    <label
                      htmlFor="referralDate"
                      className="form-label d-block"
                    >
                      Referral Date
                    </label>
                    {formData?.referralDate}
                  </div>

                  {/* Inquiry Date */}
                  <div className=" col-md-6 w-50">
                    <label htmlFor="inquiryDate" className="form-label d-block">
                      Inquiry Date
                    </label>
                    {formData?.inquiryDate}
                  </div>

                  {/* Community Liaison */}
                  <div className=" col-md-6 w-50">
                    <label
                      htmlFor="communityLiaison"
                      className="form-label d-block"
                    >
                      Community Liaison
                    </label>
                    <div>
                      {[
                        { value: "", label: "Select" },
                        {
                          value: "Elieth Kamala RN",
                          label: "Elieth Kamala RN",
                        },
                      ]?.map((option) => (
                        <div key={option.value} className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            name="communityLiaison"
                            id={`communityLiaison-${option.value}`}
                            value={option.value}
                            checked={
                              formData?.communityLiaison === option.value
                            }
                          />
                          <label
                            className="form-label d-block"
                            htmlFor={`communityLiaison-${option.value}`}
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Internal Referral Source */}
                  <div className=" col-md-6 w-50">
                    <label
                      htmlFor="internalReferralSource"
                      className="form-label d-block"
                    >
                      Internal Referral Source
                    </label>
                    <div>
                      {[
                        { value: "CHAP Surveyor", label: "CHAP Surveyor" },
                        { value: "Deqa Ahmed RN", label: "Deqa Ahmed RN" },
                      ]?.map((option) => (
                        <div key={option.value} className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            name="internalReferralSource"
                            id={`internalReferralSource-${option.value}`}
                            value={option.value}
                            checked={
                              formData?.internalReferralSource === option.value
                            }
                          />
                          <label
                            className="form-label d-block"
                            htmlFor={`internalReferralSource-${option.value}`}
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Facility Referral Source */}
                  <div className=" col-md-6 w-50">
                    <label
                      htmlFor="facilityReferralSource"
                      className="form-label d-block"
                    >
                      Facility Referral Source
                    </label>
                    <div>
                      {[{ value: "", label: "Select option" }]?.map(
                        (option) => (
                          <div key={option.value} className="form-check">
                            <input
                              type="radio"
                              className="form-check-input"
                              name="facilityReferralSource"
                              id={`facilityReferralSource-${option.value}`}
                              value={option.value}
                              checked={
                                formData?.facilityReferralSource ===
                                option.value
                              }
                            />
                            <label
                              className="form-label d-block"
                              htmlFor={`facilityReferralSource-${option.value}`}
                            >
                              {option.label}
                            </label>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Type of Inpatient Admission */}
                  <div className=" col-md-6 w-50">
                    <label
                      htmlFor="typeOfInpatientAdmission"
                      className="form-label d-block"
                    >
                      Type of Inpatient Admission
                    </label>
                    <div>
                      {[
                        { value: "Emergency", label: "Emergency" },
                        { value: "Urgent", label: "Urgent" },
                        { value: "Elective", label: "Elective" },
                        { value: "Newborn", label: "Newborn" },
                        { value: "Trauma", label: "Trauma" },
                        { value: "Information", label: "Information" },
                        { value: "Not Available", label: "Not Available" },
                      ]?.map((option) => (
                        <div key={option.value} className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            name="typeOfInpatientAdmission"
                            id={`typeOfInpatientAdmission-${option.value}`}
                            value={option.value}
                            checked={
                              formData?.typeOfInpatientAdmission ===
                              option.value
                            }
                          />
                          <label
                            className="form-label d-block"
                            htmlFor={`typeOfInpatientAdmission-${option.value}`}
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePatient;
