import { useCompanyProfileGetByIdQuery } from "../../Redux/api/SettingApi";
import { useMeQuery } from "../../Redux/api/UserApi";
import { useGetPatientByIdQuery } from "../../Redux/api/PatientApi";
import React, { useState, useEffect, useRef } from "react";
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
import { ReactToPrint } from "react-to-print";
const SinglePatient = () => {
  const { data } = useMeQuery();
  const { id } = useParams();
  const componentRef = useRef();
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
  const [formDirectiveData, setFormDirectiveData] = useState({});
  const [formClinicalData, setFormClinicalData] = useState({});
  const [formContactData, setFormContactData] = useState({});
  const [formEmergencyData, setFormEmergencyData] = useState({});
  const [formPayerData, setFormPayerData] = useState({});
  const [formPharmacyData, setFormPharmacyData] = useState({});
  const [formPhysicianData, setFormPhysicianData] = useState({});
  const [formReferralData, setFormReferralData] = useState({});

  useEffect(() => {
    if (patient) {
      setFormData((prevData) => ({
        ...prevData,
        ...patient?.payload,
      }));
    }
  }, [patient]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      ...directiveData?.payload?.directive,
      ...singleClinical?.payload?.clinical,
      ...singleContact?.payload?.contact,
      ...singleEmergency?.payload?.emergency,
      ...singlePayer?.payload?.payer,
      ...singlePharmacy?.payload?.pharmacy,
      ...singlePhysician?.payload?.physician,
      ...singleReferral?.payload?.referral,
    }));
    setFormDirectiveData(() => ({
      ...directiveData?.payload?.directive,
    }));
    setFormClinicalData(() => ({
      ...singleClinical?.payload?.clinical,
    }));
    setFormContactData(() => ({
      ...singleContact?.payload?.contact,
    }));
    setFormEmergencyData(() => ({
      ...singleEmergency?.payload?.emergency,
    }));
    setFormPayerData(() => ({
      ...singlePayer?.payload?.payer,
    }));
    setFormPharmacyData(() => ({
      ...singlePharmacy?.payload?.pharmacy,
    }));
    setFormPhysicianData(() => ({
      ...singlePhysician?.payload?.physician,
    }));
    setFormReferralData(() => ({
      ...singleReferral?.payload?.referral,
    }));
  }, [
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
    <div className="table-content" ref={componentRef}>
      <ReactToPrint
        trigger={() => (
          <span className="btn btn-primary hide-on-print">Patient Profile</span>
        )}
        content={() => componentRef.current}
        documentTitle="Patient"
      />
      {/* <button onClick={handlePrint}></button> */}
      <div
        style={{ fontSize: "10px" }}
        className="layout-page w-100 patient-body "
      >
        {/* Navbar */}
        {/* patient-body */}
        {/* / Navbar */}
        {/* Content wrapper */}
        <div style={{ fontSize: "10px" }} className="content-wrapper">
          <table className="print-container">
            <thead className="header-print">
              <tr>
                <th colSpan="3">
                  <PdfHeader
                    patient={patient?.payload}
                    company={company?.payload?.company}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="3">
                  <h6
                    style={{
                      border: "1px solid gray",
                      padding: "5px",
                      margin: "5px 0px",
                      fontSize: "11px",
                      textAlign: "center",
                      backgroundColor: "#eee",
                    }}
                    className=""
                  >
                    Administrative Information
                  </h6>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="">
                    <div className="col">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="npi"
                        className="form-label mr-2"
                      >
                        M0018. National Provider Identifier (NPI):
                      </label>
                      {formData?.npi || "N/A"}
                    </div>
                    <div className="col">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="birthDate"
                        className="form-label mr-2"
                      >
                        M0066. Birth Date:
                      </label>
                      {formData?.birthDate}
                    </div>
                    <div className="col">
                      <label
                        style={{ fontSize: "12px" }}
                        htmlFor="cmsCertificationNumber"
                        className="form-label mr-2"
                      >
                        M0010. CMS Certification Number:
                      </label>
                      {formData?.cmsCertificationNumber || "N/A"}
                    </div>

                    <div className="col">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="branchState"
                        className="form-label mr-2"
                      >
                        M0014. Branch State:
                      </label>
                      {formData?.branchState || "N/A"}
                    </div>
                    <div className="col">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="branchIdNumber"
                        className="form-label mr-2"
                      >
                        M0016. Branch ID Number:
                      </label>
                      {formData?.branchIdNumber || "N/A"}
                    </div>

                    <div className="col">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="patientIdNumber"
                        className="form-label mr-2"
                      >
                        M0020. Patient ID Number:
                      </label>
                      {formData?.patientIdNumber || "N/A"}
                    </div>
                    <div className="col">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="startOfCareDate"
                        className="form-label mr-2"
                      >
                        M0030. Start of Care Date:
                      </label>
                      {formData?.startOfCareDate || "N/A"}
                    </div>

                    <div className="col">
                      <label
                        style={{ fontSize: "12px" }}
                        htmlFor="resumptionOfCareDate"
                        className="form-label mr-2"
                      >
                        M0032. Resumption of Care Date:
                      </label>
                      {formData?.resumptionOfCareDate || "N/A"}
                    </div>

                    <div className="col">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="patientFirstName"
                        className="form-label mr-2"
                      >
                        M0040. Patient First Name:
                      </label>
                      {formData?.patientFirstName || "N/A"}
                    </div>
                    <div className="col">
                      <label
                        style={{ fontSize: "12px" }}
                        htmlFor="patientMiddleInitial"
                        className="form-label mr-2"
                      >
                        MI:
                      </label>
                      {formData?.patientMiddleInitial || "N/A"}
                    </div>
                  </div>
                  <div className="">
                    <div className="col">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="patientLastName"
                        className="form-label mr-2"
                      >
                        M0040. Patient Last Name:
                      </label>
                      {formData?.patientLastName || "N/A"}
                    </div>
                    <div className="col">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="patientSuffix"
                        className="form-label mr-2"
                      >
                        Suffix:
                      </label>
                      {formData?.patientSuffix || "N/A"}
                    </div>
                  </div>
                  <div className="">
                    <div className="col">
                      <label
                        style={{ fontSize: "12px" }}
                        htmlFor="patientStateOfResidence"
                        className="form-label mr-2"
                      >
                        M0050. Patient State of Residence:
                      </label>
                      {formData?.patientStateOfResidence || "N/A"}
                    </div>
                    <div className="col">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="patientZipCode"
                        className="form-label mr-2"
                      >
                        M0060. Patient ZIP Code:
                      </label>
                      {formData?.patientZipCode || "N/A"}
                    </div>
                    <div className="">
                      <div className="col">
                        <label
                          style={{ fontSize: "12px" }}
                          htmlFor="socialSecurityNumber"
                          className="form-label mr-2"
                        >
                          M0064. Social Security Number:
                        </label>
                        {formData?.socialSecurityNumber || "N/A"}
                      </div>
                      <div className="col">
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="medicareNumber"
                          className="form-label mr-2"
                        >
                          M0063. Medicare Number:
                        </label>
                        {formData?.medicareNumber || "N/A"}
                      </div>
                    </div>

                    <div className="">
                      <div className="col">
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="medicaidNumber"
                          className="form-label mr-2"
                        >
                          M0065. Medicaid Number:
                        </label>
                        {formData?.medicaidNumber || "N/A"}
                      </div>
                      <div className="col">
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="gender"
                          className="form-label mr-2"
                        >
                          M0069. Gender:
                        </label>

                        {formData?.gender || "N/A"}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="">
                    <div className="col">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="ethnicity"
                        className="form-label mr-2"
                      >
                        A1005. Ethnicity (Are you of Hispanic, Latino/a, or
                        Spanish origin?)
                      </label>
                      <div
                        id="ethnicity"
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          type="checkbox"
                          id="ethnicityA"
                          name="ethnicity"
                          value="No, not of Hispanic, Latino/a, or Spanish origin"
                          checked={formData?.ethnicity?.includes(
                            "No, not of Hispanic, Latino/a, or Spanish origin"
                          )}
                          className="form-check-input"
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="ethnicityA"
                          className="form-check-label"
                        >
                          A. No, not of Hispanic, Latino/a, or Spanish origin
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="ethnicityB"
                          name="ethnicity"
                          value="Yes, Mexican, Mexican American, Chicano/a"
                          checked={formData?.ethnicity?.includes(
                            "Yes, Mexican, Mexican American, Chicano/a"
                          )}
                          className="form-check-input"
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="ethnicityB"
                          className="form-check-label"
                        >
                          B. Yes, Mexican, Mexican American, Chicano/a
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="ethnicityC"
                          name="ethnicity"
                          value="Yes, Puerto Rican"
                          checked={formData?.ethnicity?.includes(
                            "Yes, Puerto Rican"
                          )}
                          className="form-check-input"
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="ethnicityC"
                          className="form-check-label"
                        >
                          C. Yes, Puerto Rican
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="ethnicityD"
                          name="ethnicity"
                          value="Yes, Cuban"
                          checked={formData?.ethnicity?.includes("Yes, Cuban")}
                          className="form-check-input"
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="ethnicityD"
                          className="form-check-label"
                        >
                          D. Yes, Cuban
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="ethnicityE"
                          name="ethnicity"
                          value="Yes, another Hispanic, Latino, or Spanish origin"
                          checked={formData?.ethnicity?.includes(
                            "Yes, another Hispanic, Latino, or Spanish origin"
                          )}
                          className="form-check-input"
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="ethnicityE"
                          className="form-check-label"
                        >
                          E. Yes, another Hispanic, Latino, or Spanish origin
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="ethnicityX"
                          name="ethnicity"
                          value="Patient unable to respond"
                          checked={formData?.ethnicity?.includes(
                            "Patient unable to respond"
                          )}
                          className="form-check-input"
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="ethnicityX"
                          className="form-check-label"
                        >
                          X. Patient unable to respond
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="ethnicityY"
                          name="ethnicity"
                          value="Patient declines to respond"
                          checked={formData?.ethnicity?.includes(
                            "Patient declines to respond"
                          )}
                          className="form-check-input"
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="ethnicityY"
                          className="form-check-label"
                        >
                          Y. Patient declines to respond
                        </label>
                      </div>
                    </div>
                    <div className="col">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="race"
                        className="form-label mr-2"
                      >
                        A1010. Race(What is your race?):
                      </label>
                      <div
                        id="race"
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="raceA"
                          name="race"
                          value="White"
                          checked={formData?.race?.includes("White")}
                          className="form-check-input"
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="raceA"
                          className="form-check-label"
                        >
                          A. White
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="raceB"
                          name="race"
                          value="Black or African American"
                          checked={formData?.race?.includes(
                            "Black or African American"
                          )}
                          className="form-check-input"
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="raceB"
                          className="form-check-label"
                        >
                          B. Black or African American
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="raceC"
                          name="race"
                          value="American Indian or Alaska Native"
                          checked={formData?.race?.includes(
                            "American Indian or Alaska Native"
                          )}
                          className="form-check-input"
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="raceC"
                          className="form-check-label"
                        >
                          C. American Indian or Alaska Native
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="raceD"
                          name="race"
                          value="Asian Indian"
                          checked={formData?.race?.includes("Asian Indian")}
                          className="form-check-input"
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="raceD"
                          className="form-check-label"
                        >
                          D. Asian Indian
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="raceE"
                          name="race"
                          value="Chinese"
                          checked={formData?.race?.includes("Chinese")}
                          className="form-check-input"
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="raceE"
                          className="form-check-label"
                        >
                          E. Chinese
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="raceF"
                          name="race"
                          value="Filipino"
                          checked={formData?.race?.includes("Filipino")}
                          className="form-check-input"
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="raceF"
                          className="form-check-label"
                        >
                          F. Filipino
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="raceG"
                          name="race"
                          value="Japanese"
                          checked={formData?.race?.includes("Japanese")}
                          className="form-check-input"
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="raceG"
                          className="form-check-label"
                        >
                          G. Japanese
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="raceH"
                          name="race"
                          value="Korean"
                          checked={formData?.race?.includes("Korean")}
                          className="form-check-input"
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="raceH"
                          className="form-check-label"
                        >
                          H. Korean
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="raceI"
                          name="race"
                          value="Vietnamese"
                          checked={formData?.race?.includes("Vietnamese")}
                          className="form-check-input"
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="raceI"
                          className="form-check-label"
                        >
                          I. Vietnamese
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="raceJ"
                          name="race"
                          value="Other Asian"
                          checked={formData?.race?.includes("Other Asian")}
                          className="form-check-input"
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="raceJ"
                          className="form-check-label"
                        >
                          J. Other Asian
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="raceK"
                          name="race"
                          value="Native Hawaiian"
                          checked={formData?.race?.includes("Native Hawaiian")}
                          className="form-check-input"
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="raceK"
                          className="form-check-label"
                        >
                          K. Native Hawaiian
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="raceL"
                          name="race"
                          value="Guamanian or Chamorro"
                          checked={formData?.race?.includes(
                            "Guamanian or Chamorro"
                          )}
                          className="form-check-input"
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="raceL"
                          className="form-check-label"
                        >
                          L. Guamanian or Chamorro
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="raceM"
                          name="race"
                          value="Samoan"
                          checked={formData?.race?.includes("Samoan")}
                          className="form-check-input"
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="raceM"
                          className="form-check-label"
                        >
                          M. Samoan
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="raceN"
                          name="race"
                          value="Other Pacific Islander"
                          checked={formData?.race?.includes(
                            "Other Pacific Islander"
                          )}
                          className="form-check-input"
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="raceN"
                          className="form-check-label"
                        >
                          N. Other Pacific Islander
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="raceX"
                          name="race"
                          value="Patient unable to respond"
                          checked={formData?.race?.includes(
                            "Patient unable to respond"
                          )}
                          className="form-check-input"
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="raceX"
                          className="form-check-label"
                        >
                          X. Patient unable to respond
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="raceY"
                          name="race"
                          value="Patient declines to respond"
                          checked={formData?.race?.includes(
                            "Patient declines to respond"
                          )}
                          className="form-check-input"
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="raceY"
                          className="form-check-label"
                        >
                          Y. Patient declines to respond
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="raceZ"
                          name="race"
                          value="None of the above"
                          checked={formData?.race?.includes(
                            "None of the above"
                          )}
                          className="form-check-input"
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="raceZ"
                          className="form-check-label"
                        >
                          Z. None of the above
                        </label>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {" "}
                  <div className="">
                    <div className="col">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="ss"
                        className="form-label mr-2"
                      >
                        M0150. Current Payment Sources for Home Care:
                      </label>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="s0"
                          name="paymentSources"
                          value="None; no charge for current services"
                          checked={formData?.paymentSources?.includes(
                            "None; no charge for current services"
                          )}
                          className="form-check-input"
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="s0"
                          className="form-check-label"
                        >
                          0. None; no charge for current services
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="s1"
                          name="paymentSources"
                          value="Medicare (traditional fee-for-service)"
                          checked={formData?.paymentSources?.includes(
                            "Medicare (traditional fee-for-service)"
                          )}
                          className="form-check-input"
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="s1"
                          className="form-check-label"
                        >
                          1. Medicare (traditional fee-for-service)
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="s2"
                          name="paymentSources"
                          value="Medicare (HMO/managed care/Advantage plan)"
                          checked={formData?.paymentSources?.includes(
                            "Medicare (HMO/managed care/Advantage plan)"
                          )}
                          className="form-check-input"
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="s2"
                          className="form-check-label"
                        >
                          2. Medicare (HMO/managed care/Advantage plan)
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="s3"
                          name="paymentSources"
                          value="Medicaid (traditional fee-for-service)"
                          checked={formData?.paymentSources?.includes(
                            "Medicaid (traditional fee-for-service)"
                          )}
                          className="form-check-input"
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="s3"
                          className="form-check-label"
                        >
                          3. Medicaid (traditional fee-for-service)
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="s4"
                          name="paymentSources"
                          value="Medicaid (HMO/managed care)"
                          checked={formData?.paymentSources?.includes(
                            "Medicaid (HMO/managed care)"
                          )}
                          className="form-check-input"
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="s4"
                          className="form-check-label"
                        >
                          4. Medicaid (HMO/managed care)
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="s5"
                          name="paymentSources"
                          value="Worker’s compensation"
                          checked={formData?.paymentSources?.includes(
                            "Worker’s compensation"
                          )}
                          className="form-check-input"
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="s5"
                          className="form-check-label"
                        >
                          5. Worker’s compensation
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="s6"
                          name="paymentSources"
                          value="Title programs (for example, Title III, V, or XX)"
                          checked={formData?.paymentSources?.includes(
                            "Title programs (for example, Title III, V, or XX)"
                          )}
                          className="form-check-input"
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="s6"
                          className="form-check-label"
                        >
                          6. Title programs (for example, Title III, V, or XX)
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="s7"
                          name="paymentSources"
                          value="Other government (for example, TriCare, VA)"
                          checked={formData?.paymentSources?.includes(
                            "Other government (for example, TriCare, VA)"
                          )}
                          className="form-check-input"
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="s7"
                          className="form-check-label"
                        >
                          7. Other government (for example, TriCare, VA)
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="s8"
                          name="paymentSources"
                          value="Private insurance"
                          checked={formData?.paymentSources?.includes(
                            "Private insurance"
                          )}
                          className="form-check-input"
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="s8"
                          className="form-check-label"
                        >
                          8. Private insurance
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="s9"
                          name="paymentSources"
                          value="Private HMO/managed care"
                          checked={formData?.paymentSources?.includes(
                            "Private HMO/managed care"
                          )}
                          className="form-check-input"
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="s9"
                          className="form-check-label"
                        >
                          9. Private HMO/managed care
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="s10"
                          name="paymentSources"
                          value="Self-pay"
                          checked={formData?.paymentSources?.includes(
                            "Self-pay"
                          )}
                          className="form-check-input"
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="s10"
                          className="form-check-label"
                        >
                          10. Self-pay
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="s11"
                          name="paymentSources"
                          value="Other (specify)"
                          checked={formData?.paymentSources?.includes(
                            "Other (specify)"
                          )}
                          className="form-check-input"
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="s11"
                          className="form-check-label"
                        >
                          11. Other (specify)
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="sUK"
                          name="paymentSources"
                          value="Unknown"
                          checked={formData?.paymentSources?.includes(
                            "Unknown"
                          )}
                          className="form-check-input"
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="sUK"
                          className="form-check-label"
                        >
                          UK. Unknown
                        </label>
                      </div>
                    </div>

                    <div className="col">
                      <label
                        style={{ fontSize: "12px" }}
                        htmlFor="preferredLanguage"
                        className="form-label mr-2"
                      >
                        A1110. Language
                      </label>
                      {formData?.preferredLanguage || "N/A"}
                    </div>
                  </div>
                  <div className="">
                    <div className="col">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="needInterpreter"
                        className="form-label mr-2"
                      >
                        M0220. Need Interpreter:
                      </label>
                      {formData?.needInterpreter || "N/A"}
                    </div>
                    <div className="col">
                      <label
                        style={{ fontSize: "12px" }}
                        htmlFor="disciplineOfPersonCompletingAssessment"
                        className="form-label mr-2"
                      >
                        M0080. Discipline of Person Completing Assessment:
                      </label>
                      {formData?.disciplineOfPersonCompletingAssessment ||
                        "N/A"}
                    </div>
                  </div>
                  <div className="">
                    <div className="col">
                      <label
                        style={{ fontSize: "12px" }}
                        htmlFor="dateAssessmentCompleted"
                        className="form-label mr-2"
                      >
                        M0090. Date Assessment Completed:
                      </label>
                      {formData?.dateAssessmentCompleted || "N/A"}
                    </div>
                    <div className="col">
                      <label
                        style={{ fontSize: "12px" }}
                        htmlFor="reasonForAssessment"
                        className="form-label mr-2"
                      >
                        M0100. This Assessment is Currently Being Completed for
                        the Following Reason
                      </label>
                      {formData?.reasonForAssessment || "N/A"}
                    </div>
                  </div>
                  <div className="">
                    <div className="col">
                      <label
                        style={{ fontSize: "12px" }}
                        htmlFor="dischargeTransferDeathDate"
                        className="form-label mr-2"
                      >
                        M0260. Discharge/Transfer/Death Date:
                      </label>
                      {formData?.dischargeTransferDeathDate || "N/A"}
                    </div>
                    <div className="col">
                      <label
                        style={{ fontSize: "12px" }}
                        htmlFor="dateOfPhysicianOrderedSOC"
                        className="form-label mr-2"
                      >
                        M0102. Date of Physician-ordered Start of Care
                        (Resumption of Care)
                      </label>
                      {formData?.dateOfPhysicianOrderedSOC || "N/A"}
                    </div>
                  </div>
                  <div className="">
                    <div className="col">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="dateOfReferral"
                        className="form-label mr-2"
                      >
                        M0104. Date of Referral
                      </label>
                      {formData?.dateOfReferral || "N/A"}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <div className="col">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      A1250. Transportation (NACHC©):
                    </label>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="checkbox"
                        id="transportationMedicalAppointments"
                        name="transportation"
                        value="Yes, it has kept me from medical appointments or from getting my medications"
                        checked={formData?.transportation?.includes(
                          "Yes, it has kept me from medical appointments or from getting my medications"
                        )}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="transportationMedicalAppointments"
                        className="form-check-label"
                      >
                        A. Yes, it has kept me from medical appointments or from
                        getting my medications
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="checkbox"
                        id="transportationNonMedical"
                        name="transportation"
                        value="Yes, it has kept me from non-medical meetings, appointments, work, or from getting things that I need"
                        checked={formData?.transportation?.includes(
                          "Yes, it has kept me from non-medical meetings, appointments, work, or from getting things that I need"
                        )}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="transportationNonMedical"
                        className="form-check-label"
                      >
                        B. Yes, it has kept me from non-medical meetings,
                        appointments, work, or from getting things that I need
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="checkbox"
                        id="transportationNo"
                        name="transportation"
                        value="No"
                        checked={formData?.transportation?.includes("No")}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="transportationNo"
                        className="form-check-label"
                      >
                        C. No
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="checkbox"
                        id="transportationUnableToRespond"
                        name="transportation"
                        value="Patient unable to respond"
                        checked={formData?.transportation?.includes(
                          "Patient unable to respond"
                        )}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="transportationUnableToRespond"
                        className="form-check-label"
                      >
                        X. Patient unable to respond
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="checkbox"
                        id="transportationDeclines"
                        name="transportation"
                        value="Patient declines to respond"
                        checked={formData?.transportation?.includes(
                          "Patient declines to respond"
                        )}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="transportationDeclines"
                        className="form-check-label"
                      >
                        Y. Patient declines to respond
                      </label>
                    </div>
                  </div>
                  <div className="">
                    <div className="col">
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-label mr-2"
                      >
                        M1000. From which of the following Inpatient Facilities
                        was the patient discharged within the past 14 days?
                      </label>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="longTermNursingFacility"
                          name="inpatientFacilityDischargedFrom"
                          value="Long-term nursing facility (NF)"
                          checked={formData?.inpatientFacilityDischargedFrom?.includes(
                            "Long-term nursing facility (NF)"
                          )}
                          className="form-check-input"
                        />
                        <label
                          htmlFor="longTermNursingFacility"
                          className="form-check-label"
                        >
                          1. Long-term nursing facility (NF)
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="skilledNursingFacility"
                          name="inpatientFacilityDischargedFrom"
                          value="Skilled nursing facility (SNF/TCU)"
                          checked={formData?.inpatientFacilityDischargedFrom?.includes(
                            "Skilled nursing facility (SNF/TCU)"
                          )}
                          className="form-check-input"
                        />
                        <label
                          htmlFor="skilledNursingFacility"
                          className="form-check-label"
                        >
                          2. Skilled nursing facility (SNF/TCU)
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="shortStayAcuteHospital"
                          name="inpatientFacilityDischargedFrom"
                          value="Short-stay acute hospital (IPPS)"
                          checked={formData?.inpatientFacilityDischargedFrom?.includes(
                            "Short-stay acute hospital (IPPS)"
                          )}
                          className="form-check-input"
                        />
                        <label
                          htmlFor="shortStayAcuteHospital"
                          className="form-check-label"
                        >
                          3. Short-stay acute hospital (IPPS)
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="longTermCareHospital"
                          name="inpatientFacilityDischargedFrom"
                          value="Long-term care hospital (LTCH)"
                          checked={formData?.inpatientFacilityDischargedFrom?.includes(
                            "Long-term care hospital (LTCH)"
                          )}
                          className="form-check-input"
                        />
                        <label
                          htmlFor="longTermCareHospital"
                          className="form-check-label"
                        >
                          4. Long-term care hospital (LTCH)
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="inpatientRehabilitationHospital"
                          name="inpatientFacilityDischargedFrom"
                          value="Inpatient rehabilitation hospital or unit (IRF)"
                          checked={formData?.inpatientFacilityDischargedFrom?.includes(
                            "Inpatient rehabilitation hospital or unit (IRF)"
                          )}
                          className="form-check-input"
                        />
                        <label
                          htmlFor="inpatientRehabilitationHospital"
                          className="form-check-label"
                        >
                          5. Inpatient rehabilitation hospital or unit (IRF)
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="psychiatricHospital"
                          name="inpatientFacilityDischargedFrom"
                          value="Psychiatric hospital or unit"
                          checked={formData?.inpatientFacilityDischargedFrom?.includes(
                            "Psychiatric hospital or unit"
                          )}
                          className="form-check-input"
                        />
                        <label
                          htmlFor="psychiatricHospital"
                          className="form-check-label"
                        >
                          6. Psychiatric hospital or unit
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="otherInpatientFacility"
                          name="inpatientFacilityDischargedFrom"
                          value="Other (specify)"
                          checked={formData?.inpatientFacilityDischargedFrom?.includes(
                            "Other (specify)"
                          )}
                          className="form-check-input"
                        />
                        <label
                          htmlFor="otherInpatientFacility"
                          className="form-check-label"
                        >
                          7. Other (specify)
                        </label>
                      </div>
                    </div>
                    <div className="col">
                      <label
                        style={{ fontSize: "12px" }}
                        htmlFor="inpatientDischargeDate"
                        className="form-label mr-2"
                      >
                        M1005. Inpatient Discharge Date (most recent)
                      </label>
                      {formData?.inpatientDischargeDate || "N/A"}
                    </div>
                  </div>
                  <div className="">
                    <div className="col">
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-label mr-2"
                      >
                        M2301. Emergent Care{" "}
                      </label>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="radio"
                          id="emergentCareNo"
                          name="emergentCare"
                          value="0"
                          checked={formData?.emergentCare === "0"}
                          className="form-check-input"
                        />
                        <label
                          htmlFor="emergentCareNo"
                          className="form-check-label"
                        >
                          0. No
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="radio"
                          id="emergentCareYesWithoutAdmission"
                          name="emergentCare"
                          value="1"
                          checked={formData?.emergentCare === "1"}
                          className="form-check-input"
                        />
                        <label
                          htmlFor="emergentCareYesWithoutAdmission"
                          className="form-check-label"
                        >
                          1. Yes, used hospital emergency department WITHOUT
                          hospital admission
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="radio"
                          id="emergentCareYesWithAdmission"
                          name="emergentCare"
                          value="2"
                          checked={formData?.emergentCare === "2"}
                          className="form-check-input"
                        />
                        <label
                          htmlFor="emergentCareYesWithAdmission"
                          className="form-check-label"
                        >
                          2. Yes, used hospital emergency department WITH
                          hospital admission
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="radio"
                          id="emergentCareUnknown"
                          name="emergentCare"
                          value="UK"
                          checked={formData?.emergentCare === "UK"}
                          className="form-check-input"
                        />
                        <label
                          htmlFor="emergentCareUnknown"
                          className="form-check-label"
                        >
                          UK Unknown
                        </label>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="col">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      M2310. Reason for Emergent Care
                    </label>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="checkbox"
                        id="reasonImproperMedication"
                        name="reasonForEmergentCare"
                        value="1"
                        checked={formData?.reasonForEmergentCare?.includes("1")}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="reasonImproperMedication"
                        className="form-check-label"
                      >
                        1. Improper medication administration, adverse drug
                        reactions, medication side effects, toxicity,
                        anaphylaxis
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="checkbox"
                        id="reasonHypoHyperglycemia"
                        name="reasonForEmergentCare"
                        value="10"
                        checked={formData?.reasonForEmergentCare?.includes(
                          "10"
                        )}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="reasonHypoHyperglycemia"
                        className="form-check-label"
                      >
                        10. Hypo/Hyperglycemia, diabetes out of control
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="checkbox"
                        id="reasonOther"
                        name="reasonForEmergentCare"
                        value="19"
                        checked={formData?.reasonForEmergentCare?.includes(
                          "19"
                        )}
                        className="form-check-input"
                      />
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="reasonOther"
                        className="form-check-label"
                      >
                        19. Other than above reasons
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="checkbox"
                        id="reasonUnknown"
                        name="reasonForEmergentCare"
                        value="UK"
                        checked={formData?.reasonForEmergentCare?.includes(
                          "UK"
                        )}
                        className="form-check-input"
                      />
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="reasonUnknown"
                        className="form-check-label"
                      >
                        UK Reason unknown
                      </label>
                    </div>
                  </div>
                  <div className="">
                    <div className="col">
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-label mr-2"
                      >
                        M2410. To which Inpatient Facility has the patient been
                        admitted?
                      </label>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="radio"
                          id="admittedToHospital"
                          name="inpatientFacilityAdmittedTo"
                          value="1"
                          checked={
                            formData?.inpatientFacilityAdmittedTo === "1"
                          }
                          className="form-check-input"
                        />
                        <label
                          htmlFor="admittedToHospital"
                          className="form-check-label"
                        >
                          1. Hospital
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="radio"
                          id="admittedToRehabilitationFacility"
                          name="inpatientFacilityAdmittedTo"
                          value="2"
                          checked={
                            formData?.inpatientFacilityAdmittedTo === "2"
                          }
                          className="form-check-input"
                        />
                        <label
                          htmlFor="admittedToRehabilitationFacility"
                          className="form-check-label"
                        >
                          2. Rehabilitation facility
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="radio"
                          id="admittedToNursingHome"
                          name="inpatientFacilityAdmittedTo"
                          value="3"
                          checked={
                            formData?.inpatientFacilityAdmittedTo === "3"
                          }
                          className="form-check-input"
                        />
                        <label
                          htmlFor="admittedToNursingHome"
                          className="form-check-label"
                        >
                          3. Nursing home
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="radio"
                          id="admittedToHospice"
                          name="inpatientFacilityAdmittedTo"
                          value="4"
                          checked={
                            formData?.inpatientFacilityAdmittedTo === "4"
                          }
                          className="form-check-input"
                        />
                        <label
                          htmlFor="admittedToHospice"
                          className="form-check-label"
                        >
                          4. Hospice
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="radio"
                          id="noInpatientFacility"
                          name="inpatientFacilityAdmittedTo"
                          value="NA"
                          checked={
                            formData?.inpatientFacilityAdmittedTo === "NA"
                          }
                          className="form-check-input"
                        />
                        <label
                          htmlFor="noInpatientFacility"
                          className="form-check-label"
                        >
                          NA. No inpatient facility admission
                        </label>
                      </div>
                    </div>

                    <div className="col">
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-label mr-2"
                      >
                        M2420. Discharge Disposition:
                      </label>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="radio"
                          id="remainedInCommunityWithoutServices"
                          name="dischargeDisposition"
                          value="1"
                          checked={formData?.dischargeDisposition === "1"}
                          className="form-check-input"
                        />
                        <label
                          htmlFor="remainedInCommunityWithoutServices"
                          className="form-check-label"
                        >
                          1. Patient remained in the community (without skilled
                          services from a Medicare Certified HHA or
                          non-institutional hospice)
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="radio"
                          id="remainedInCommunityWithServices"
                          name="dischargeDisposition"
                          value="2"
                          checked={formData?.dischargeDisposition === "2"}
                          className="form-check-input"
                        />
                        <label
                          htmlFor="remainedInCommunityWithServices"
                          className="form-check-label"
                        >
                          2. Patient remained in the community (with skilled
                          services from a Medicare Certified HHA)
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="radio"
                          id="transferredToNonInstitutionalHospice"
                          name="dischargeDisposition"
                          value="3"
                          checked={formData?.dischargeDisposition === "3"}
                          className="form-check-input"
                        />
                        <label
                          htmlFor="transferredToNonInstitutionalHospice"
                          className="form-check-label"
                        >
                          3. Patient transferred to a non-institutional hospice
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="radio"
                          id="movedToGeographicLocationNotServed"
                          name="dischargeDisposition"
                          value="4"
                          checked={formData?.dischargeDisposition === "4"}
                          className="form-check-input"
                        />
                        <label
                          htmlFor="movedToGeographicLocationNotServed"
                          className="form-check-label"
                        >
                          4. Unknown because patient moved to a geographic
                          location not served by this agency
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="radio"
                          id="otherUnknown"
                          name="dischargeDisposition"
                          value="UK"
                          checked={formData?.dischargeDisposition === "UK"}
                          className="form-check-input"
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="otherUnknown"
                          className="form-check-label"
                        >
                          UK. Other unknown
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="col">
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-label mr-2"
                      >
                        A2120. Provision of Current Reconciled Medication List
                        to Subsequent Provider at Transfer
                      </label>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="radio"
                          id="medicationListProvidedYes"
                          name="medicationListProvided"
                          value="1"
                          checked={formData?.medicationListProvided === "1"}
                          className="form-check-input"
                        />
                        <label
                          htmlFor="medicationListProvidedYes"
                          className="form-check-label"
                        >
                          1. Yes — Current reconciled medication list provided
                          to the subsequent provider
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="radio"
                          id="medicationListProvidedNo"
                          name="medicationListProvided"
                          value="0"
                          checked={formData?.medicationListProvided === "0"}
                          className="form-check-input"
                        />
                        <label
                          htmlFor="medicationListProvidedNo"
                          className="form-check-label"
                        >
                          0. No — Current reconciled medication list not
                          provided to the subsequent provider
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="radio"
                          id="medicationListProvidedNA"
                          name="medicationListProvided"
                          value="2"
                          checked={formData?.medicationListProvided === "2"}
                          className="form-check-input"
                        />
                        <label
                          htmlFor="medicationListProvidedNA"
                          className="form-check-label"
                        >
                          2. NA — The agency was not made aware of this transfer
                          timely
                        </label>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="col">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      A2122. Route of Current Reconciled Medication List
                      Transmission to Subsequent Provider
                    </label>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="checkbox"
                        id="routeMedicationListTransmissionEHR"
                        name="routeMedicationListTransmission"
                        value="Electronic Health Record"
                        checked={formData?.routeMedicationListTransmission?.includes(
                          "Electronic Health Record"
                        )}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="routeMedicationListTransmissionEHR"
                        className="form-check-label"
                      >
                        A. Electronic Health Record
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="checkbox"
                        id="routeMedicationListTransmissionHIE"
                        name="routeMedicationListTransmission"
                        value="Health Information Exchange"
                        checked={formData?.routeMedicationListTransmission?.includes(
                          "Health Information Exchange"
                        )}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="routeMedicationListTransmissionHIE"
                        className="form-check-label"
                      >
                        B. Health Information Exchange
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="checkbox"
                        id="routeMedicationListTransmissionVerbal"
                        name="routeMedicationListTransmission"
                        value="Verbal"
                        checked={formData?.routeMedicationListTransmission?.includes(
                          "Verbal"
                        )}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="routeMedicationListTransmissionVerbal"
                        className="form-check-label"
                      >
                        C. Verbal (e.g., in-person, telephone, video
                        conferencing)
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="checkbox"
                        id="routeMedicationListTransmissionPaper"
                        name="routeMedicationListTransmission"
                        value="Paper-based"
                        checked={formData?.routeMedicationListTransmission?.includes(
                          "Paper-based"
                        )}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="routeMedicationListTransmissionPaper"
                        className="form-check-label"
                      >
                        D. Paper-based (e.g., fax, copies, printouts)
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="checkbox"
                        id="routeMedicationListTransmissionOther"
                        name="routeMedicationListTransmission"
                        value="Other Methods"
                        checked={formData?.routeMedicationListTransmission?.includes(
                          "Other Methods"
                        )}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="routeMedicationListTransmissionOther"
                        className="form-check-label"
                      >
                        E. Other Methods (e.g., texting, email, CDs)
                      </label>
                    </div>
                  </div>
                  <div className="">
                    <div className="col">
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-label mr-2"
                      >
                        A2123. Provision of Current Reconciled Medication List
                        to Patient at Discharge
                      </label>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="radio"
                          id="medicationListProvidedToPatientYes"
                          name="medicationListProvidedToPatient"
                          value="Yes"
                          checked={
                            formData?.medicationListProvidedToPatient === "Yes"
                          }
                          className="form-check-input"
                        />
                        <label
                          htmlFor="medicationListProvidedToPatientYes"
                          className="form-check-label"
                        >
                          Yes — Current reconciled medication list provided to
                          the patient, family, and/or caregiver
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="radio"
                          id="medicationListProvidedToPatientNo"
                          name="medicationListProvidedToPatient"
                          value="No"
                          checked={
                            formData?.medicationListProvidedToPatient === "No"
                          }
                          className="form-check-input"
                        />
                        <label
                          htmlFor="medicationListProvidedToPatientNo"
                          className="form-check-label"
                        >
                          No — Current reconciled medication list not provided
                          to the patient, family, and/or caregiver
                        </label>
                      </div>
                    </div>

                    <div className="col">
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-label mr-2"
                      >
                        M0390. Route of Medication List Transmission to Patient:
                      </label>

                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="routeMedicationListTransmissionToPatientEHR"
                          name="routeMedicationListTransmissionToPatient"
                          value="Electronic Health Record"
                          checked={formData?.routeMedicationListTransmissionToPatient?.includes(
                            "Electronic Health Record"
                          )}
                          className="form-check-input"
                        />
                        <label
                          htmlFor="routeMedicationListTransmissionToPatientEHR"
                          className="form-check-label"
                        >
                          Electronic Health Record
                        </label>
                      </div>

                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="routeMedicationListTransmissionToPatientHIE"
                          name="routeMedicationListTransmissionToPatient"
                          value="Health Information Exchange"
                          checked={formData?.routeMedicationListTransmissionToPatient?.includes(
                            "Health Information Exchange"
                          )}
                          className="form-check-input"
                        />
                        <label
                          htmlFor="routeMedicationListTransmissionToPatientHIE"
                          className="form-check-label"
                        >
                          Health Information Exchange
                        </label>
                      </div>

                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="routeMedicationListTransmissionToPatientVerbal"
                          name="routeMedicationListTransmissionToPatient"
                          value="Verbal"
                          checked={formData?.routeMedicationListTransmissionToPatient?.includes(
                            "Verbal"
                          )}
                          className="form-check-input"
                        />
                        <label
                          htmlFor="routeMedicationListTransmissionToPatientVerbal"
                          className="form-check-label"
                        >
                          Verbal (e.g., in-person, telephone, video
                          conferencing)
                        </label>
                      </div>

                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="routeMedicationListTransmissionToPatientPaperBased"
                          name="routeMedicationListTransmissionToPatient"
                          value="Paper-based"
                          checked={formData?.routeMedicationListTransmissionToPatient?.includes(
                            "Paper-based"
                          )}
                          className="form-check-input"
                        />
                        <label
                          htmlFor="routeMedicationListTransmissionToPatientPaperBased"
                          className="form-check-label"
                        >
                          Paper-based (e.g., fax, copies, printouts)
                        </label>
                      </div>

                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="checkbox"
                          id="routeMedicationListTransmissionToPatientOther"
                          name="routeMedicationListTransmissionToPatient"
                          value="Other Methods"
                          checked={formData?.routeMedicationListTransmissionToPatient?.includes(
                            "Other Methods"
                          )}
                          className="form-check-input"
                        />
                        <label
                          htmlFor="routeMedicationListTransmissionToPatientOther"
                          className="form-check-label"
                        >
                          Other Methods (e.g., texting, email, CDs)
                        </label>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>

              <tr>
                <td colSpan="3">
                  {" "}
                  <h6
                    style={{
                      // border: "1px solid gray",
                      padding: "5px",
                      margin: "5px 0px",
                      fontSize: "11px",
                      textAlign: "center",
                      backgroundColor: "#eee",
                    }}
                    className=""
                  >
                    Hearing, Speech, and Vision
                  </h6>
                </td>
              </tr>
              <tr>
                <td>
                  <div className=" col ">
                    <label
                      style={{ fontSize: "11px" }}
                      htmlFor="hearing"
                      className="form-label mr-2"
                    >
                      B0200. Hearing:
                    </label>

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="radio"
                        id="hearingAdequate"
                        name="hearing"
                        value="0"
                        checked={formData?.hearing === "0"}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="hearingAdequate"
                        className="form-check-label"
                      >
                        Adequate – no difficulty in normal conversation, social
                        interaction, listening to TV
                      </label>
                    </div>

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="radio"
                        id="hearingMinimalDifficulty"
                        name="hearing"
                        value="1"
                        checked={formData?.hearing === "1"}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="hearingMinimalDifficulty"
                        className="form-check-label"
                      >
                        Minimal difficulty – difficulty in some environments
                        (e.g., when person speaks softly, or setting is noisy)
                      </label>
                    </div>

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="radio"
                        id="hearingModerateDifficulty"
                        name="hearing"
                        value="2"
                        checked={formData?.hearing === "2"}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="hearingModerateDifficulty"
                        className="form-check-label"
                      >
                        Moderate difficulty – speaker has to increase volume and
                        speak distinctly
                      </label>
                    </div>

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="radio"
                        id="hearingHighlyImpaired"
                        name="hearing"
                        value="3"
                        checked={formData?.hearing === "3"}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="hearingHighlyImpaired"
                        className="form-check-label"
                      >
                        Highly impaired – absence of useful hearing
                      </label>
                    </div>
                  </div>
                </td>
                <td>
                  {" "}
                  <div className=" col ">
                    <label
                      style={{ fontSize: "11px" }}
                      htmlFor="vision"
                      className="form-label mr-2"
                    >
                      B1000. Vision:
                    </label>

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="radio"
                        id="visionAdequate"
                        name="vision"
                        value="0"
                        checked={formData?.vision === "0"}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="visionAdequate"
                        className="form-check-label"
                      >
                        Adequate – sees fine detail, such as regular print in
                        newspapers/books
                      </label>
                    </div>

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="radio"
                        id="visionImpaired"
                        name="vision"
                        value="1"
                        checked={formData?.vision === "1"}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="visionImpaired"
                        className="form-check-label"
                      >
                        Impaired – sees large print, but not regular print in
                        newspapers/books
                      </label>
                    </div>

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="radio"
                        id="visionModeratelyImpaired"
                        name="vision"
                        value="2"
                        checked={formData?.vision === "2"}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="visionModeratelyImpaired"
                        className="form-check-label"
                      >
                        Moderately impaired – limited vision; not able to see
                        newspaper headlines but can identify objects
                      </label>
                    </div>

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="radio"
                        id="visionHighlyImpaired"
                        name="vision"
                        value="3"
                        checked={formData?.vision === "3"}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="visionHighlyImpaired"
                        className="form-check-label"
                      >
                        Highly impaired – object identification in question, but
                        eyes appear to follow objects
                      </label>
                    </div>

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="radio"
                        id="visionSeverelyImpaired"
                        name="vision"
                        value="4"
                        checked={formData?.vision === "4"}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="visionSeverelyImpaired"
                        className="form-check-label"
                      >
                        Severely impaired – no vision or sees only light,
                        colors, or shapes; eyes do not appear to follow objects
                      </label>
                    </div>
                  </div>
                </td>
                <td>
                  {" "}
                  <div className=" col ">
                    <label
                      style={{ fontSize: "11px" }}
                      htmlFor="healthLiteracy"
                      className="form-label mr-2"
                    >
                      B1300. Health Literacy:
                    </label>

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="radio"
                        id="healthLiteracyNever"
                        name="healthLiteracy"
                        value="0"
                        checked={formData?.healthLiteracy === "0"}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="healthLiteracyNever"
                        className="form-check-label"
                      >
                        Never
                      </label>
                    </div>

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="radio"
                        id="healthLiteracyRarely"
                        name="healthLiteracy"
                        value="1"
                        checked={formData?.healthLiteracy === "1"}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="healthLiteracyRarely"
                        className="form-check-label"
                      >
                        Rarely
                      </label>
                    </div>

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="radio"
                        id="healthLiteracySometimes"
                        name="healthLiteracy"
                        value="2"
                        checked={formData?.healthLiteracy === "2"}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="healthLiteracySometimes"
                        className="form-check-label"
                      >
                        Sometimes
                      </label>
                    </div>

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="radio"
                        id="healthLiteracyOften"
                        name="healthLiteracy"
                        value="3"
                        checked={formData?.healthLiteracy === "3"}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="healthLiteracyOften"
                        className="form-check-label"
                      >
                        Often
                      </label>
                    </div>

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="radio"
                        id="healthLiteracyAlways"
                        name="healthLiteracy"
                        value="4"
                        checked={formData?.healthLiteracy === "4"}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="healthLiteracyAlways"
                        className="form-check-label"
                      >
                        Always
                      </label>
                    </div>

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="radio"
                        id="healthLiteracyDeclines"
                        name="healthLiteracy"
                        value="7"
                        checked={formData?.healthLiteracy === "7"}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="healthLiteracyDeclines"
                        className="form-check-label"
                      >
                        Patient declines to respond
                      </label>
                    </div>

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="radio"
                        id="healthLiteracyUnable"
                        name="healthLiteracy"
                        value="8"
                        checked={formData?.healthLiteracy === "8"}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="healthLiteracyUnable"
                        className="form-check-label"
                      >
                        Patient unable to respond
                      </label>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <h6
                    style={{
                      // border: "1px solid gray",
                      padding: "5px",
                      margin: "5px 0px",
                      fontSize: "11px",
                      textAlign: "center",
                      backgroundColor: "#eee",
                    }}
                    className=""
                  >
                    Cognitive Patterns
                  </h6>
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  {/* Brief Interview for Mental Status */}
                  <div className=" col  ">
                    <label
                      style={{ fontSize: "12px" }}
                      htmlFor="interviewConducted"
                      className="form-label mr-2"
                    >
                      C0100. Should Brief Interview for Mental Status
                      (C0200-C0500) be Conducted?
                    </label>

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="radio"
                        id="interviewConductedNo"
                        name="interviewConducted"
                        value="0"
                        checked={formData?.interviewConducted === "0"}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="interviewConductedNo"
                        className="form-check-label"
                      >
                        No (patient is rarely/never understood)
                      </label>
                    </div>

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="radio"
                        id="interviewConductedYes"
                        name="interviewConducted"
                        value="1"
                        checked={formData?.interviewConducted === "1"}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="interviewConductedYes"
                        className="form-check-label"
                      >
                        Yes
                      </label>
                    </div>
                  </div>
                  {/* Repetition of Three Words */}
                  <div className=" col  ">
                    <label
                      style={{ fontSize: "12px" }}
                      htmlFor="repetitionOfThreeWords"
                      className="form-label mr-2"
                    >
                      C0200. Repetition of Three Words:
                    </label>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        id="repetitionOfThreeWordsNone"
                        name="repetitionOfThreeWords"
                        value="0"
                        checked={formData?.repetitionOfThreeWords === "0"}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="repetitionOfThreeWordsNone"
                      >
                        None
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        id="repetitionOfThreeWordsOne"
                        name="repetitionOfThreeWords"
                        value="1"
                        checked={formData?.repetitionOfThreeWords === "1"}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="repetitionOfThreeWordsOne"
                      >
                        One
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        id="repetitionOfThreeWordsTwo"
                        name="repetitionOfThreeWords"
                        value="2"
                        checked={formData?.repetitionOfThreeWords === "2"}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="repetitionOfThreeWordsTwo"
                      >
                        Two
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        id="repetitionOfThreeWordsThree"
                        name="repetitionOfThreeWords"
                        value="3"
                        checked={formData?.repetitionOfThreeWords === "3"}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="repetitionOfThreeWordsThree"
                      >
                        Three
                      </label>
                    </div>
                  </div>
                  {/* Temporal Orientation */}
                  <div className="  col">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      C0300. Temporal Orientation:
                    </label>
                    <div className="">
                      <div className="col">
                        <label
                          style={{ fontSize: "12px" }}
                          htmlFor="temporalOrientationYear"
                          className="form-label mr-2"
                        >
                          Year
                        </label>
                        <div
                          style={{
                            minHight: 0,
                            margin: 0,
                            padding: "0px 0px 0px auto",
                          }}
                          className="form-check"
                        >
                          <input
                            type="radio"
                            className="form-check-input"
                            id="temporalOrientationYear0"
                            name="temporalOrientationYear"
                            value="0"
                            checked={formData?.temporalOrientationYear === "0"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="temporalOrientationYear0"
                          >
                            Missed by &gt; 5 years or no answer
                          </label>
                        </div>
                        <div
                          style={{
                            minHight: 0,
                            margin: 0,
                            padding: "0px 0px 0px auto",
                          }}
                          className="form-check"
                        >
                          <input
                            type="radio"
                            className="form-check-input"
                            id="temporalOrientationYear1"
                            name="temporalOrientationYear"
                            value="1"
                            checked={formData?.temporalOrientationYear === "1"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="temporalOrientationYear1"
                          >
                            Missed by 2-5 years
                          </label>
                        </div>
                        <div
                          style={{
                            minHight: 0,
                            margin: 0,
                            padding: "0px 0px 0px auto",
                          }}
                          className="form-check"
                        >
                          <input
                            type="radio"
                            className="form-check-input"
                            id="temporalOrientationYear2"
                            name="temporalOrientationYear"
                            value="2"
                            checked={formData?.temporalOrientationYear === "2"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="temporalOrientationYear2"
                          >
                            Missed by 1 year
                          </label>
                        </div>
                        <div
                          style={{
                            minHight: 0,
                            margin: 0,
                            padding: "0px 0px 0px auto",
                          }}
                          className="form-check"
                        >
                          <input
                            type="radio"
                            className="form-check-input"
                            id="temporalOrientationYear3"
                            name="temporalOrientationYear"
                            value="3"
                            checked={formData?.temporalOrientationYear === "3"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="temporalOrientationYear3"
                          >
                            Correct
                          </label>
                        </div>
                      </div>
                      <div className="col">
                        <label
                          style={{ fontSize: "12px" }}
                          htmlFor="temporalOrientationMonth"
                          className="form-label mr-2"
                        >
                          Month
                        </label>
                        <div
                          style={{
                            minHight: 0,
                            margin: 0,
                            padding: "0px 0px 0px auto",
                          }}
                          className="form-check"
                        >
                          <input
                            type="radio"
                            className="form-check-input"
                            id="temporalOrientationMonth0"
                            name="temporalOrientationMonth"
                            value="0"
                            checked={formData?.temporalOrientationMonth === "0"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="temporalOrientationMonth0"
                          >
                            Missed by&get; 1 month or no answer
                          </label>
                        </div>
                        <div
                          style={{
                            minHight: 0,
                            margin: 0,
                            padding: "0px 0px 0px auto",
                          }}
                          className="form-check"
                        >
                          <input
                            type="radio"
                            className="form-check-input"
                            id="temporalOrientationMonth1"
                            name="temporalOrientationMonth"
                            value="1"
                            checked={formData?.temporalOrientationMonth === "1"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="temporalOrientationMonth1"
                          >
                            Missed by 6 days to 1 month
                          </label>
                        </div>
                        <div
                          style={{
                            minHight: 0,
                            margin: 0,
                            padding: "0px 0px 0px auto",
                          }}
                          className="form-check"
                        >
                          <input
                            type="radio"
                            className="form-check-input"
                            id="temporalOrientationMonth2"
                            name="temporalOrientationMonth"
                            value="2"
                            checked={formData?.temporalOrientationMonth === "2"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="temporalOrientationMonth2"
                          >
                            Accurate within 5 days
                          </label>
                        </div>
                      </div>
                      <div className="col">
                        <label
                          style={{ fontSize: "12px" }}
                          htmlFor="temporalOrientationDay"
                          className="form-label mr-2"
                        >
                          Day
                        </label>
                        <div
                          style={{
                            minHight: 0,
                            margin: 0,
                            padding: "0px 0px 0px auto",
                          }}
                          className="form-check"
                        >
                          <input
                            type="radio"
                            className="form-check-input"
                            id="temporalOrientationDay0"
                            name="temporalOrientationDay"
                            value="0"
                            checked={formData?.temporalOrientationDay === "0"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="temporalOrientationDay0"
                          >
                            Incorrect or no answer
                          </label>
                        </div>
                        <div
                          style={{
                            minHight: 0,
                            margin: 0,
                            padding: "0px 0px 0px auto",
                          }}
                          className="form-check"
                        >
                          <input
                            type="radio"
                            className="form-check-input"
                            id="temporalOrientationDay1"
                            name="temporalOrientationDay"
                            value="1"
                            checked={formData?.temporalOrientationDay === "1"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="temporalOrientationDay1"
                          >
                            Correct
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Recall */}
                </td>
                <td>
                  <div className="  col">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      C0400. Recall:
                    </label>
                    <div className="">
                      <div className="col">
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="recallSock"
                          className="form-label mr-2"
                        >
                          A. Able to recall “sock”
                        </label>
                        <div
                          style={{
                            minHight: 0,
                            margin: 0,
                            padding: "0px 0px 0px auto",
                          }}
                          className="form-check"
                        >
                          <input
                            type="radio"
                            className="form-check-input"
                            id="recallSock0"
                            name="recallSock"
                            value="0"
                            checked={formData?.recallSock === "0"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="recallSock0"
                          >
                            No — could not recall
                          </label>
                        </div>
                        <div
                          style={{
                            minHight: 0,
                            margin: 0,
                            padding: "0px 0px 0px auto",
                          }}
                          className="form-check"
                        >
                          <input
                            type="radio"
                            className="form-check-input"
                            id="recallSock1"
                            name="recallSock"
                            value="1"
                            checked={formData?.recallSock === "1"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="recallSock1"
                          >
                            Yes, after cueing (“something to wear”)
                          </label>
                        </div>
                        <div
                          style={{
                            minHight: 0,
                            margin: 0,
                            padding: "0px 0px 0px auto",
                          }}
                          className="form-check"
                        >
                          <input
                            type="radio"
                            className="form-check-input"
                            id="recallSock2"
                            name="recallSock"
                            value="2"
                            checked={formData?.recallSock === "2"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="recallSock2"
                          >
                            Yes, no cue required
                          </label>
                        </div>
                      </div>
                      <div className="col">
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="recallBlue"
                          className="form-label mr-2"
                        >
                          B. Able to recall “blue”
                        </label>
                        <div
                          style={{
                            minHight: 0,
                            margin: 0,
                            padding: "0px 0px 0px auto",
                          }}
                          className="form-check"
                        >
                          <input
                            type="radio"
                            className="form-check-input"
                            id="recallBlue0"
                            name="recallBlue"
                            value="0"
                            checked={formData?.recallBlue === "0"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="recallBlue0"
                          >
                            No — could not recall
                          </label>
                        </div>
                        <div
                          style={{
                            minHight: 0,
                            margin: 0,
                            padding: "0px 0px 0px auto",
                          }}
                          className="form-check"
                        >
                          <input
                            type="radio"
                            className="form-check-input"
                            id="recallBlue1"
                            name="recallBlue"
                            value="1"
                            checked={formData?.recallBlue === "1"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="recallBlue1"
                          >
                            Yes, after cueing (“a color”)
                          </label>
                        </div>
                        <div
                          style={{
                            minHight: 0,
                            margin: 0,
                            padding: "0px 0px 0px auto",
                          }}
                          className="form-check"
                        >
                          <input
                            type="radio"
                            className="form-check-input"
                            id="recallBlue2"
                            name="recallBlue"
                            value="2"
                            checked={formData?.recallBlue === "2"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="recallBlue2"
                          >
                            Yes, no cue required
                          </label>
                        </div>
                      </div>
                      <div className="col">
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="recallBed"
                          className="form-label mr-2"
                        >
                          C. Able to recall “bed”
                        </label>
                        <div
                          style={{
                            minHight: 0,
                            margin: 0,
                            padding: "0px 0px 0px auto",
                          }}
                          className="form-check"
                        >
                          <input
                            type="radio"
                            className="form-check-input"
                            id="recallBed0"
                            name="recallBed"
                            value="0"
                            checked={formData?.recallBed === "0"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="recallBed0"
                          >
                            No — could not recall
                          </label>
                        </div>
                        <div
                          style={{
                            minHight: 0,
                            margin: 0,
                            padding: "0px 0px 0px auto",
                          }}
                          className="form-check"
                        >
                          <input
                            type="radio"
                            className="form-check-input"
                            id="recallBed1"
                            name="recallBed"
                            value="1"
                            checked={formData?.recallBed === "1"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="recallBed1"
                          >
                            Yes, after cueing (“a piece of furniture”)
                          </label>
                        </div>
                        <div
                          style={{
                            minHight: 0,
                            margin: 0,
                            padding: "0px 0px 0px auto",
                          }}
                          className="form-check"
                        >
                          <input
                            type="radio"
                            className="form-check-input"
                            id="recallBed2"
                            name="recallBed"
                            value="2"
                            checked={formData?.recallBed === "2"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="recallBed2"
                          >
                            Yes, no cue required
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* BIMS Summary Score */}
                  <div className="  col">
                    <label
                      style={{ fontSize: "11px" }}
                      htmlFor="bimsSummaryScore"
                      className="form-label mr-2"
                    >
                      C0500. BIMS Summary Score:
                    </label>
                    {formData?.bimsSummaryScore || "N/A"}

                    <small className="form-text text-muted">
                      Enter 99 if the patient was unable to complete the
                      interview
                    </small>
                  </div>
                  {/* Signs and Symptoms of Delirium */}
                  <div className="  col">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      C1310. Signs and Symptoms of Delirium:
                    </label>
                    <div className="">
                      <div className="col">
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="acuteOnset"
                          className="form-label mr-2"
                        >
                          A. Acute Onset of Mental Status Change
                        </label>
                        <div
                          style={{
                            minHight: 0,
                            margin: 0,
                            padding: "0px 0px 0px auto",
                          }}
                          className="form-check"
                        >
                          <input
                            type="radio"
                            className="form-check-input"
                            id="acuteOnset0"
                            name="acuteOnset"
                            value="0"
                            checked={formData?.acuteOnset === "0"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="acuteOnset0"
                          >
                            No
                          </label>
                        </div>
                        <div
                          style={{
                            minHight: 0,
                            margin: 0,
                            padding: "0px 0px 0px auto",
                          }}
                          className="form-check"
                        >
                          <input
                            type="radio"
                            className="form-check-input"
                            id="acuteOnset1"
                            name="acuteOnset"
                            value="1"
                            checked={formData?.acuteOnset === "1"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="acuteOnset1"
                          >
                            Yes
                          </label>
                        </div>
                      </div>
                      <div className="col">
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="inattention"
                          className="form-label mr-2"
                        >
                          B. Inattention
                        </label>
                        <div
                          style={{
                            minHight: 0,
                            margin: 0,
                            padding: "0px 0px 0px auto",
                          }}
                          className="form-check"
                        >
                          <input
                            type="radio"
                            className="form-check-input"
                            id="inattention0"
                            name="inattention"
                            value="0"
                            checked={formData?.inattention === "0"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inattention0"
                          >
                            No
                          </label>
                        </div>
                        <div
                          style={{
                            minHight: 0,
                            margin: 0,
                            padding: "0px 0px 0px auto",
                          }}
                          className="form-check"
                        >
                          <input
                            type="radio"
                            className="form-check-input"
                            id="inattention1"
                            name="inattention"
                            value="1"
                            checked={formData?.inattention === "1"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inattention1"
                          >
                            Yes
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="col">
                      <label
                        style={{ fontSize: "12px" }}
                        htmlFor="disorganizedThinking"
                        className="form-label mr-2"
                      >
                        C. Disorganized Thinking
                      </label>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="radio"
                          className="form-check-input"
                          id="disorganizedThinking0"
                          name="disorganizedThinking"
                          value="0"
                          checked={formData?.disorganizedThinking === "0"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="disorganizedThinking0"
                        >
                          No
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="radio"
                          className="form-check-input"
                          id="disorganizedThinking1"
                          name="disorganizedThinking"
                          value="1"
                          checked={formData?.disorganizedThinking === "1"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="disorganizedThinking1"
                        >
                          Yes
                        </label>
                      </div>
                    </div>
                    <div className="col">
                      <label
                        style={{ fontSize: "12px" }}
                        htmlFor="alteredConsciousness"
                        className="form-label mr-2"
                      >
                        D. Altered Level of Consciousness
                      </label>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="radio"
                          className="form-check-input"
                          id="alteredConsciousness0"
                          name="alteredConsciousness"
                          value="0"
                          checked={formData?.alteredConsciousness === "0"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="alteredConsciousness0"
                        >
                          No
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="radio"
                          className="form-check-input"
                          id="alteredConsciousness1"
                          name="alteredConsciousness"
                          value="1"
                          checked={formData?.alteredConsciousness === "1"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="alteredConsciousness1"
                        >
                          Yes
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* Cognitive Functioning */}
                </td>
                <td>
                  <div className="  col">
                    <label
                      style={{ fontSize: "12px" }}
                      htmlFor="cognitiveFunctioning"
                      className="form-label mr-2"
                    >
                      M1700. Cognitive Functioning:
                    </label>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        id="cognitiveFunctioning0"
                        name="cognitiveFunctioning"
                        value="0"
                        checked={formData?.cognitiveFunctioning === "0"}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="cognitiveFunctioning0"
                      >
                        Alert/oriented, able to focus and shift attention,
                        comprehends and recalls task directions independently.
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        id="cognitiveFunctioning1"
                        name="cognitiveFunctioning"
                        value="1"
                        checked={formData?.cognitiveFunctioning === "1"}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="cognitiveFunctioning1"
                      >
                        Requires prompting (cueing, repetition, reminders) only
                        under stressful or unfamiliar conditions.
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        id="cognitiveFunctioning2"
                        name="cognitiveFunctioning"
                        value="2"
                        checked={formData?.cognitiveFunctioning === "2"}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="cognitiveFunctioning2"
                      >
                        Requires assistance and some direction in specific
                        situations or consistently requires low stimulus
                        environment due to distractibility.
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        id="cognitiveFunctioning3"
                        name="cognitiveFunctioning"
                        value="3"
                        checked={formData?.cognitiveFunctioning === "3"}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="cognitiveFunctioning3"
                      >
                        Requires considerable assistance in routine situations.
                        Is not alert and oriented or is unable to shift
                        attention and recall directions more than half the time.
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        id="cognitiveFunctioning4"
                        name="cognitiveFunctioning"
                        value="4"
                        checked={formData?.cognitiveFunctioning === "4"}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="cognitiveFunctioning4"
                      >
                        Totally dependent due to disturbances such as constant
                        disorientation, coma, persistent vegetative state, or
                        delirium.
                      </label>
                    </div>
                  </div>
                  <div className="  col">
                    <label
                      style={{ fontSize: "11px" }}
                      htmlFor="whenConfused"
                      className="form-label mr-2"
                    >
                      M1710. When Confused:
                    </label>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        id="whenConfused0"
                        name="whenConfused"
                        value="0"
                        checked={formData?.whenConfused === "0"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                        htmlFor="whenConfused0"
                      >
                        Never
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        id="whenConfused1"
                        name="whenConfused"
                        value="1"
                        checked={formData?.whenConfused === "1"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                        htmlFor="whenConfused1"
                      >
                        In new or complex situations only
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        id="whenConfused2"
                        name="whenConfused"
                        value="2"
                        checked={formData?.whenConfused === "2"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                        htmlFor="whenConfused2"
                      >
                        On awakening or at night only
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        id="whenConfused3"
                        name="whenConfused"
                        value="3"
                        checked={formData?.whenConfused === "3"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                        htmlFor="whenConfused3"
                      >
                        During the day and evening, but not constantly
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        id="whenConfused4"
                        name="whenConfused"
                        value="4"
                        checked={formData?.whenConfused === "4"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                        htmlFor="whenConfused4"
                      >
                        Constantly
                      </label>
                    </div>
                  </div>
                  {/* When Anxious */}
                  <div className="  col">
                    <label
                      style={{ fontSize: "11px" }}
                      htmlFor="whenAnxious"
                      className="form-label mr-2"
                    >
                      M1720. When Anxious:
                    </label>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        id="whenAnxious0"
                        name="whenAnxious"
                        value="0"
                        checked={formData?.whenAnxious === "0"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                        htmlFor="whenAnxious0"
                      >
                        None of the time
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        id="whenAnxious1"
                        name="whenAnxious"
                        value="1"
                        checked={formData?.whenAnxious === "1"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                        htmlFor="whenAnxious1"
                      >
                        Less than often daily
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        id="whenAnxious2"
                        name="whenAnxious"
                        value="2"
                        checked={formData?.whenAnxious === "2"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                        htmlFor="whenAnxious2"
                      >
                        Daily, but not constantly
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        id="whenAnxious3"
                        name="whenAnxious"
                        value="3"
                        checked={formData?.whenAnxious === "3"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                        htmlFor="whenAnxious3"
                      >
                        All of the time
                      </label>
                    </div>
                  </div>{" "}
                  make them equally1 tr and 3td
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <h6
                    style={{
                      // border: "1px solid gray",
                      padding: "5px",
                      margin: "5px 0px",
                      fontSize: "11px",
                      textAlign: "center",
                      backgroundColor: "#eee",
                    }}
                    className=""
                  >
                    Mood
                  </h6>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <div className="  col">
                    <label
                      style={{ fontSize: "12px" }}
                      htmlFor="patientMoodUnderstood"
                      className="form-label mr-2"
                    >
                      D0150. Is the patient rarely/never understood verbally, in
                      writing, or using another method?
                    </label>
                    {formData?.patientMoodUnderstood || "N/A"}
                  </div>

                  {/* PHQ-2 to 9 Questions */}
                  {formData?.patientMoodUnderstood !== "9" && (
                    <>
                      <div className="">
                        <div className="col">
                          <label
                            style={{ fontSize: "12px" }}
                            htmlFor="littleInterestPresence"
                            className="form-label mr-2"
                          >
                            A. Little interest or pleasure in doing things
                          </label>
                          {formData?.littleInterestPresence || "N/A"}
                        </div>
                        {formData?.littleInterestPresence === "1" && (
                          <div className="col">
                            <label
                              style={{ fontSize: "12px" }}
                              htmlFor="littleInterestFrequency"
                              className="form-label mr-2"
                            >
                              Symptom Frequency
                            </label>
                            {formData?.littleInterestFrequency || "N/A"}
                          </div>
                        )}
                      </div>

                      <div className="">
                        <div className="col">
                          <label
                            style={{ fontSize: "12px" }}
                            htmlFor="feelingDownPresence"
                            className="form-label mr-2"
                          >
                            B. Feeling down, depressed, or hopeless
                          </label>
                          {formData?.feelingDownPresence || "N/A"}
                        </div>
                        {formData?.feelingDownPresence === "1" && (
                          <div className="col">
                            <label
                              style={{ fontSize: "12px" }}
                              htmlFor="feelingDownFrequency"
                              className="form-label mr-2"
                            >
                              Symptom Frequency
                            </label>
                            {formData?.feelingDownFrequency || "N/A"}
                          </div>
                        )}
                      </div>

                      {/* Additional PHQ-2 to 9 Questions */}
                      {/* Repeat similar structure for C to I */}
                      {/* C. Trouble falling or staying asleep, or sleeping too much */}
                      <div className="">
                        <div className="col">
                          <label
                            style={{ fontSize: "12px" }}
                            htmlFor="troubleSleepingPresence"
                            className="form-label mr-2"
                          >
                            C. Trouble falling or staying asleep, or sleeping
                            too much
                          </label>
                          {formData?.troubleSleepingPresence || "N/A"}
                        </div>
                        {formData?.troubleSleepingPresence === "1" && (
                          <div className="col">
                            <label
                              style={{ fontSize: "12px" }}
                              htmlFor="troubleSleepingFrequency"
                              className="form-label mr-2"
                            >
                              Symptom Frequency
                            </label>
                            {formData?.troubleSleepingFrequency || "N/A"}
                          </div>
                        )}
                      </div>

                      {/* D. Feeling tired or having little energy */}
                      <div className="">
                        <div className="col">
                          <label
                            style={{ fontSize: "12px" }}
                            htmlFor="feelingTiredPresence"
                            className="form-label mr-2"
                          >
                            D. Feeling tired or having little energy
                          </label>
                          {formData?.feelingTiredPresence || "N/A"}
                        </div>
                        {formData?.feelingTiredPresence === "1" && (
                          <div className="col">
                            <label
                              style={{ fontSize: "12px" }}
                              htmlFor="feelingTiredFrequency"
                              className="form-label mr-2"
                            >
                              Symptom Frequency
                            </label>
                            {formData?.feelingTiredFrequency || "N/A"}
                          </div>
                        )}
                      </div>

                      {/* E. Poor appetite or overeating */}
                      <div className="">
                        <div className="col">
                          <label
                            style={{ fontSize: "12px" }}
                            htmlFor="poorAppetitePresence"
                            className="form-label mr-2"
                          >
                            E. Poor appetite or overeating
                          </label>
                          {formData?.poorAppetitePresence || "N/A"}
                        </div>
                        {formData?.poorAppetitePresence === "1" && (
                          <div className="col">
                            <label
                              style={{ fontSize: "12px" }}
                              htmlFor="poorAppetiteFrequency"
                              className="form-label mr-2"
                            >
                              Symptom Frequency
                            </label>
                            {formData?.poorAppetiteFrequency || "N/A"}
                          </div>
                        )}
                      </div>

                      {/* F. Feeling bad about yourself */}
                      <div className="">
                        <div className="col">
                          <label
                            style={{ fontSize: "12px" }}
                            htmlFor="feelingBadPresence"
                            className="form-label mr-2"
                          >
                            F. Feeling bad about yourself
                          </label>
                          {formData?.feelingBadPresence || "N/A"}
                        </div>
                        {formData?.feelingBadPresence === "1" && (
                          <div className="col">
                            <label
                              style={{ fontSize: "12px" }}
                              htmlFor="feelingBadFrequency"
                              className="form-label mr-2"
                            >
                              Symptom Frequency
                            </label>
                            {formData?.feelingBadFrequency || "N/A"}
                          </div>
                        )}
                      </div>

                      {/* G. Trouble concentrating */}
                      <div className="">
                        <div className="col">
                          <label
                            style={{ fontSize: "12px" }}
                            htmlFor="troubleConcentratingPresence"
                            className="form-label mr-2"
                          >
                            G. Trouble concentrating
                          </label>
                          {formData?.troubleConcentratingPresence || "N/A"}
                        </div>
                        {formData?.troubleConcentratingPresence === "1" && (
                          <div className="col">
                            <label
                              style={{ fontSize: "12px" }}
                              htmlFor="troubleConcentratingFrequency"
                              className="form-label mr-2"
                            >
                              Symptom Frequency
                            </label>
                            {formData?.troubleConcentratingFrequency || "N/A"}
                          </div>
                        )}
                      </div>

                      {/* H. Moving or speaking slowly */}
                      <div className="">
                        <div className="col">
                          <label
                            style={{ fontSize: "12px" }}
                            htmlFor="movingSlowlyPresence"
                            className="form-label mr-2"
                          >
                            H. Moving or speaking slowly or being fidgety
                          </label>
                          {formData?.movingSlowlyPresence || "N/A"}
                        </div>
                        {formData?.movingSlowlyPresence === "1" && (
                          <div className="col">
                            <label
                              style={{ fontSize: "12px" }}
                              htmlFor="movingSlowlyFrequency"
                              className="form-label mr-2"
                            >
                              Symptom Frequency
                            </label>
                            {formData?.movingSlowlyFrequency || "N/A"}
                          </div>
                        )}
                      </div>

                      {/* I. Thoughts of self-harm */}
                      <div className="">
                        <div className="col">
                          <label
                            style={{ fontSize: "12px" }}
                            htmlFor="thoughtsOfHarmingPresence"
                            className="form-label mr-2"
                          >
                            I. Thoughts of harming yourself
                          </label>
                          {formData?.thoughtsOfHarmingPresence || "N/A"}
                        </div>
                        {formData?.thoughtsOfHarmingPresence === "1" && (
                          <div className="col">
                            <label
                              style={{ fontSize: "12px" }}
                              htmlFor="thoughtsOfHarmingFrequency"
                              className="form-label mr-2"
                            >
                              Symptom Frequency
                            </label>
                            {formData?.thoughtsOfHarmingFrequency || "N/A"}
                          </div>
                        )}
                      </div>

                      {/* Total Severity Score */}
                      <div className="  col">
                        <label
                          htmlFor="totalSeverityScore"
                          className="form-label mr-2"
                        >
                          D0160. Total Severity Score:
                        </label>
                        {formData?.totalSeverityScore || "N/A"}
                      </div>
                    </>
                  )}

                  {/* Social Isolation */}
                  <div className="  col">
                    <label
                      style={{ fontSize: "11px" }}
                      htmlFor="socialIsolation"
                      className="form-label mr-2"
                    >
                      D0700. Social Isolation: How often do you feel lonely or
                      isolated from those around you?:
                    </label>
                    {formData?.socialIsolation || "N/A"}
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <h6
                    style={{
                      // border: "1px solid gray",
                      padding: "5px",
                      margin: "5px 0px",
                      fontSize: "11px",
                      textAlign: "center",
                      backgroundColor: "#eee",
                    }}
                    className=""
                  >
                    Behavior
                  </h6>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <div className="  col">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      M1740. Cognitive, Behavioral, and Psychiatric Symptoms
                      that are demonstrated at least once a week (Reported or
                      Observed):
                    </label>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="memoryDeficit"
                        name="memoryDeficit"
                        checked={formData?.memoryDeficit}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                        htmlFor="memoryDeficit"
                      >
                        1. Memory deficit: failure to recognize familiar
                        persons/places, inability to recall events of past 24
                        hours, significant memory loss so that supervision is
                        required
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="impairedDecisionMaking"
                        name="impairedDecisionMaking"
                        checked={formData?.impairedDecisionMaking}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="impairedDecisionMaking"
                      >
                        2. Impaired decision-making: failure to perform usual
                        ADLs or IADLs, inability to appropriately stop
                        activities, jeopardizes safety through actions
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="verbalDisruption"
                        name="verbalDisruption"
                        checked={formData?.verbalDisruption}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="verbalDisruption"
                      >
                        3. Verbal disruption: yelling, threatening, excessive
                        profanity, sexual references, etc.
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="physicalAggression"
                        name="physicalAggression"
                        checked={formData?.physicalAggression}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="physicalAggression"
                      >
                        4. Physical aggression: aggressive or combative to self
                        and others (for example, hits self, throws objects,
                        punches, dangerous maneuvers with wheelchair or other
                        objects)
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="disruptiveBehavior"
                        name="disruptiveBehavior"
                        checked={formData?.disruptiveBehavior}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="disruptiveBehavior"
                      >
                        5. Disruptive, infantile, or socially inappropriate
                        behavior (excludes verbal actions)
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="delusionalBehavior"
                        name="delusionalBehavior"
                        checked={formData?.delusionalBehavior}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="delusionalBehavior"
                      >
                        6. elusional, hallucinatory, or paranoid behavior
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check"
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="noneOfTheAbove"
                        name="noneOfTheAbove"
                        checked={formData?.noneOfTheAbove}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                        htmlFor="noneOfTheAbove"
                      >
                        7. None of the above behaviors demonstrated
                      </label>
                    </div>
                  </div>

                  {/* M1745: Frequency of Disruptive Behavior Symptoms */}
                  <div className="  col">
                    <label
                      style={{ fontSize: "12px" }}
                      htmlFor="disruptiveBehaviorFrequency"
                      className="form-label mr-2"
                    >
                      M1745. Frequency of Disruptive Behavior Symptoms
                    </label>
                    <fieldset id="disruptiveBehaviorFrequency">
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="radio"
                          className="form-check-input"
                          id="frequencyNever"
                          name="disruptiveBehaviorFrequency"
                          value="0"
                          checked={
                            formData?.disruptiveBehaviorFrequency === "0"
                          }
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="frequencyNever"
                        >
                          Never
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="radio"
                          className="form-check-input"
                          id="frequencyLessThanOnceAMonth"
                          name="disruptiveBehaviorFrequency"
                          value="1"
                          checked={
                            formData?.disruptiveBehaviorFrequency === "1"
                          }
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="frequencyLessThanOnceAMonth"
                        >
                          Less than once a month
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="radio"
                          className="form-check-input"
                          id="frequencyOnceAMonth"
                          name="disruptiveBehaviorFrequency"
                          value="2"
                          checked={
                            formData?.disruptiveBehaviorFrequency === "2"
                          }
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="frequencyOnceAMonth"
                        >
                          Once a month
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="radio"
                          className="form-check-input"
                          id="frequencySeveralTimesEachMonth"
                          name="disruptiveBehaviorFrequency"
                          value="3"
                          checked={
                            formData?.disruptiveBehaviorFrequency === "3"
                          }
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="frequencySeveralTimesEachMonth"
                        >
                          Several times each month
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="radio"
                          className="form-check-input"
                          id="frequencySeveralTimesAWeek"
                          name="disruptiveBehaviorFrequency"
                          value="4"
                          checked={
                            formData?.disruptiveBehaviorFrequency === "4"
                          }
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="frequencySeveralTimesAWeek"
                        >
                          Several times a week
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check"
                      >
                        <input
                          type="radio"
                          className="form-check-input"
                          id="frequencyAtLeastDaily"
                          name="disruptiveBehaviorFrequency"
                          value="5"
                          checked={
                            formData?.disruptiveBehaviorFrequency === "5"
                          }
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="frequencyAtLeastDaily"
                        >
                          At least daily
                        </label>
                      </div>
                    </fieldset>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <h6
                    style={{
                      // border: "1px solid gray",
                      padding: "5px",
                      margin: "5px 0px",
                      fontSize: "11px",
                      textAlign: "center",
                      backgroundColor: "#eee",
                    }}
                    className=""
                  >
                    Preferences for Customary Routine and Activities
                  </h6>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="  col">
                    <div className="mb-4">
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-label h5"
                      >
                        M1100. Patient Living Situation
                      </label>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="livingArrangement"
                          value="A01"
                          checked={formData?.livingArrangement?.includes("A01")}
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          Patient lives alone, Around the clock
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="livingArrangement"
                          value="A02"
                          checked={formData?.livingArrangement?.includes("A02")}
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          Patient lives alone, Regular Daytime
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="livingArrangement"
                          value="A03"
                          checked={formData?.livingArrangement?.includes("A03")}
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          Patient lives alone, Regular Nighttime
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="livingArrangement"
                          value="A04"
                          checked={formData?.livingArrangement?.includes("A04")}
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          Patient lives alone, Occasional/Short-Term Assistance
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="livingArrangement"
                          value="A05"
                          checked={formData?.livingArrangement?.includes("A05")}
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          Patient lives alone, No Assistance Available
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="livingArrangement"
                          value="B06"
                          checked={formData?.livingArrangement?.includes("B06")}
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          Patient lives with other person(s), Around the clock
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="livingArrangement"
                          value="B07"
                          checked={formData?.livingArrangement?.includes("B07")}
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          Patient lives with other person(s), Regular Daytime
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="livingArrangement"
                          value="B08"
                          checked={formData?.livingArrangement?.includes("B08")}
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          Patient lives with other person(s), Regular Nighttime
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="livingArrangement"
                          value="B09"
                          checked={formData?.livingArrangement?.includes("B09")}
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          Patient lives with other person(s),
                          Occasional/Short-Term Assistance
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="livingArrangement"
                          value="B10"
                          checked={formData?.livingArrangement?.includes("B10")}
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          Patient lives with other person(s), No Assistance
                          Available
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-cener gap-1">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="livingArrangement"
                          value="C11"
                          checked={formData?.livingArrangement?.includes("C11")}
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          Patient lives in congregate situation, Around the
                          clock
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-cener gap-1">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="livingArrangement"
                          value="C12"
                          checked={formData?.livingArrangement?.includes("C12")}
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          Patient lives in congregate situation, Regular Daytime
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-cener gap-1">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="livingArrangement"
                          value="C13"
                          checked={formData?.livingArrangement?.includes("C13")}
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          Patient lives in congregate situation, Regular
                          Nighttime
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-cener gap-1">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="livingArrangement"
                          value="C14"
                          checked={formData?.livingArrangement?.includes("C14")}
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          Patient lives in congregate situation,
                          Occasional/Short-Term Assistance
                        </label>
                      </div>
                      <div className="form-check d-flex align-items-cener gap-1">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="livingArrangement"
                          value="C15"
                          checked={formData?.livingArrangement?.includes("C15")}
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          Patient lives in congregate situation, No Assistance
                          Available
                        </label>
                      </div>
                    </div>
                    {/* Add more radio buttons as needed */}
                  </div>
                </td>
                <td>
                  <label style={{ fontSize: "12px" }} className="form-label h5">
                    M2102. Types and Sources of Assistance
                  </label>

                  <div className="  col">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      a. ADL assistance
                    </label>
                    <div className="form-check d-flex align-items-cener gap-1">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="adlAssistance"
                        value="0"
                        checked={formData?.adlAssistance === "0"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        No assistance needed
                      </label>
                    </div>
                    <div className="form-check d-flex align-items-cener gap-1">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="adlAssistance"
                        value="1"
                        checked={formData?.adlAssistance === "1"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        Non-agency caregiver(s) currently provide assistance
                      </label>
                    </div>
                    <div className="form-check d-flex align-items-cener gap-1">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="adlAssistance"
                        value="2"
                        checked={formData?.adlAssistance === "2"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        Non-agency caregiver(s) need training/supportive
                        services
                      </label>
                    </div>
                    <div className="form-check d-flex align-items-cener gap-1">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="adlAssistance"
                        value="3"
                        checked={formData?.adlAssistance === "3"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        Non-agency caregiver(s) are not likely to provide
                        assistance OR it is unclear if they will provide
                        assistance
                      </label>
                    </div>
                    <div className="form-check d-flex align-items-cener gap-1">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="adlAssistance"
                        value="4"
                        checked={formData?.adlAssistance === "4"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        Assistance needed, but no non-agency caregiver(s)
                        available
                      </label>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="  col">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      d. Medical procedures/treatments
                    </label>
                    <div className="form-check d-flex align-items-cener gap-1">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="medicalProceduresAssistance"
                        value="0"
                        checked={formData?.medicalProceduresAssistance === "0"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        No assistance needed
                      </label>
                    </div>
                    <div className="form-check d-flex align-items-cener gap-1">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="medicalProceduresAssistance"
                        value="1"
                        checked={formData?.medicalProceduresAssistance === "1"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        Non-agency caregiver(s) currently provide assistance
                      </label>
                    </div>
                    <div className="form-check d-flex align-items-cener gap-1">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="medicalProceduresAssistance"
                        value="2"
                        checked={formData?.medicalProceduresAssistance === "2"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        Non-agency caregiver(s) need training/supportive
                        services
                      </label>
                    </div>
                    <div className="form-check d-flex align-items-cener gap-1">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="medicalProceduresAssistance"
                        value="3"
                        checked={formData?.medicalProceduresAssistance === "3"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        Non-agency caregiver(s) are not likely to provide
                        assistance OR it is unclear if they will provide
                        assistance
                      </label>
                    </div>
                    <div className="form-check d-flex align-items-cener gap-1">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="medicalProceduresAssistance"
                        value="4"
                        checked={formData?.medicalProceduresAssistance === "4"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        Assistance needed, but no non-agency caregiver(s)
                        available
                      </label>
                    </div>
                  </div>

                  <div className="  col">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      f. Supervision and safety (due to cognitive impairment)
                    </label>
                    <div className="form-check d-flex align-items-cener gap-1">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="supervisionSafetyAssistance"
                        value="0"
                        checked={formData?.supervisionSafetyAssistance === "0"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        No assistance needed
                      </label>
                    </div>
                    <div className="form-check d-flex align-items-cener gap-1">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="supervisionSafetyAssistance"
                        value="1"
                        checked={formData?.supervisionSafetyAssistance === "1"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        Non-agency caregiver(s) currently provide assistance
                      </label>
                    </div>
                    <div className="form-check d-flex align-items-cener gap-1">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="supervisionSafetyAssistance"
                        value="2"
                        checked={formData?.supervisionSafetyAssistance === "2"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        Non-agency caregiver(s) need training/supportive
                        services
                      </label>
                    </div>
                    <div className="form-check d-flex align-items-cener gap-1">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="supervisionSafetyAssistance"
                        value="3"
                        checked={formData?.supervisionSafetyAssistance === "3"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        Non-agency caregiver(s) are not likely to provide
                        assistance OR it is unclear if they will provide
                        assistance
                      </label>
                    </div>
                    <div className="form-check d-flex align-items-cener gap-1">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="supervisionSafetyAssistance"
                        value="4"
                        checked={formData?.supervisionSafetyAssistance === "4"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        Assistance needed, but no non-agency caregiver(s)
                        available
                      </label>
                    </div>
                  </div>
                </td>
              </tr>

              <tr>
                <td colSpan="3">
                  {/* section F  */}

                  <h6
                    style={{
                      // border: "1px solid gray",
                      padding: "5px",
                      margin: "5px 0px",
                      fontSize: "11px",
                      textAlign: "center",
                      backgroundColor: "#eee",
                    }}
                    className=""
                  >
                    Functional status
                  </h6>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="  col">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      M1800. Grooming
                    </label>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        name="grooming"
                        value="0"
                        checked={formData?.grooming === "0"}
                      />
                      Able to groom self unaided
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        name="grooming"
                        value="1"
                        checked={formData?.grooming === "1"}
                      />
                      Grooming utensils must be placed within reach
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        name="grooming"
                        value="2"
                        checked={formData?.grooming === "2"}
                      />
                      Someone must assist the patient
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        name="grooming"
                        value="3"
                        checked={formData?.grooming === "3"}
                      />
                      Patient depends entirely upon someone else
                    </div>
                  </div>

                  {/* M1810: Upper Body Dressing */}
                  <div className="  col">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      M1810. Current Ability to Dress Upper Body
                    </label>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        name="upperBodyDressing"
                        value="0"
                        checked={formData?.upperBodyDressing === "0"}
                      />
                      Able to dress upper body independently
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        name="upperBodyDressing"
                        value="1"
                        checked={formData?.upperBodyDressing === "1"}
                      />
                      Able to dress upper body if clothing is laid out
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        name="upperBodyDressing"
                        value="2"
                        checked={formData?.upperBodyDressing === "2"}
                      />
                      Someone must help the patient
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        name="upperBodyDressing"
                        value="3"
                        checked={formData?.upperBodyDressing === "3"}
                      />
                      Patient depends entirely upon another person
                    </div>
                  </div>

                  {/* M1820: Lower Body Dressing */}
                  <div className="  col">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      M1820. Current Ability to Dress Lower Body
                    </label>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        name="lowerBodyDressing"
                        value="0"
                        checked={formData?.lowerBodyDressing === "0"}
                      />
                      Able to dress lower body independently
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        name="lowerBodyDressing"
                        value="1"
                        checked={formData?.lowerBodyDressing === "1"}
                      />
                      Able to dress lower body if clothing is laid out
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        name="lowerBodyDressing"
                        value="2"
                        checked={formData?.lowerBodyDressing === "2"}
                      />
                      Someone must help the patient
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        name="lowerBodyDressing"
                        value="3"
                        checked={formData?.lowerBodyDressing === "3"}
                      />
                      Patient depends entirely upon another person
                    </div>
                  </div>
                </td>
                <td>
                  {/* M1830: Bathing */}
                  <div className="  col">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      M1830. Bathing
                    </label>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        name="bathing"
                        value="0"
                        checked={formData?.bathing === "0"}
                      />
                      Able to bathe self independently
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        name="bathing"
                        value="1"
                        checked={formData?.bathing === "1"}
                      />
                      Able to bathe with the use of devices
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        name="bathing"
                        value="2"
                        checked={formData?.bathing === "2"}
                      />
                      Able to bathe with intermittent assistance
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        name="bathing"
                        value="3"
                        checked={formData?.bathing === "3"}
                      />
                      Requires presence of another person throughout the bath
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        name="bathing"
                        value="4"
                        checked={formData?.bathing === "4"}
                      />
                      Unable to use shower/tub, but can bathe at sink or chair
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        name="bathing"
                        value="5"
                        checked={formData?.bathing === "5"}
                      />
                      Unable to use shower/tub, but can bathe in bed or with
                      assistance
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        name="bathing"
                        value="6"
                        checked={formData?.bathing === "6"}
                      />
                      Unable to participate in bathing
                    </div>
                  </div>

                  {/* M1840: Toilet Transferring */}
                  <div className="  col">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      M1840. Toilet Transferring
                    </label>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        name="toiletTransferring"
                        value="0"
                        checked={formData?.toiletTransferring === "0"}
                      />
                      Able to get to and from the toilet independently
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        name="toiletTransferring"
                        value="1"
                        checked={formData?.toiletTransferring === "1"}
                      />
                      Able to get to and from toilet with assistance
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        name="toiletTransferring"
                        value="2"
                        checked={formData?.toiletTransferring === "2"}
                      />
                      Unable to get to toilet, but can use bedside commode
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        name="toiletTransferring"
                        value="3"
                        checked={formData?.toiletTransferring === "3"}
                      />
                      Unable to get to toilet or commode, but can use
                      bedpan/urinal independently
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        name="toiletTransferring"
                        value="4"
                        checked={formData?.toiletTransferring === "4"}
                      />
                      Totally dependent in toileting
                    </div>
                  </div>

                  {/* M1845: Toileting Hygiene */}
                  <div className="  col">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      M1845. Toileting Hygiene
                    </label>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        name="toiletingHygiene"
                        value="0"
                        checked={formData?.toiletingHygiene === "0"}
                      />
                      Able to manage toileting hygiene independently
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        name="toiletingHygiene"
                        value="1"
                        checked={formData?.toiletingHygiene === "1"}
                      />
                      Able to manage toileting hygiene if supplies are laid out
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        name="toiletingHygiene"
                        value="2"
                        checked={formData?.toiletingHygiene === "2"}
                      />
                      Someone must assist with toileting hygiene
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        name="toiletingHygiene"
                        value="3"
                        checked={formData?.toiletingHygiene === "3"}
                      />
                      Patient depends entirely on another person
                    </div>
                  </div>
                </td>
                <td>
                  {/* M1850: Transferring */}
                  <div className="  col">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      M1850. Transferring
                    </label>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        name="transferring"
                        value="0"
                        checked={formData?.transferring === "0"}
                      />
                      Able to independently transfer
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        name="transferring"
                        value="1"
                        checked={formData?.transferring === "1"}
                      />
                      Able to transfer with minimal assistance or device
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        name="transferring"
                        value="2"
                        checked={formData?.transferring === "2"}
                      />
                      Able to bear weight and pivot during transfer
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        name="transferring"
                        value="3"
                        checked={formData?.transferring === "3"}
                      />
                      Unable to transfer or bear weight
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        name="transferring"
                        value="4"
                        checked={formData?.transferring === "4"}
                      />
                      Bedfast, able to turn and position self
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        name="transferring"
                        value="5"
                        checked={formData?.transferring === "5"}
                      />
                      Bedfast, unable to turn or position self
                    </div>
                  </div>

                  {/* M1860: Ambulation/Locomotion */}
                  <div className="  col">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      M1860. Ambulation/Locomotion
                    </label>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        name="ambulationLocomotion"
                        value="0"
                        checked={formData?.ambulationLocomotion === "0"}
                      />
                      Able to walk independently on all surfaces
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        name="ambulationLocomotion"
                        value="1"
                        checked={formData?.ambulationLocomotion === "1"}
                      />
                      Able to walk independently with a one-handed device
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        name="ambulationLocomotion"
                        value="2"
                        checked={formData?.ambulationLocomotion === "2"}
                      />
                      Requires a two-handed device or supervision
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        name="ambulationLocomotion"
                        value="3"
                        checked={formData?.ambulationLocomotion === "3"}
                      />
                      Able to walk only with supervision or assistance
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        name="ambulationLocomotion"
                        value="4"
                        checked={formData?.ambulationLocomotion === "4"}
                      />
                      Chairfast, able to wheel self independently
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        name="ambulationLocomotion"
                        value="5"
                        checked={formData?.ambulationLocomotion === "5"}
                      />
                      Chairfast, unable to wheel self
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      {" "}
                      <input
                        type="radio"
                        className="form-check-input"
                        name="ambulationLocomotion"
                        value="6"
                        checked={formData?.ambulationLocomotion === "6"}
                      />
                      Bedfast, unable to ambulate or be up in a chair
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <h6
                    style={{
                      // border: "1px solid gray",
                      padding: "5px",
                      margin: "5px 0px",
                      fontSize: "11px",
                      textAlign: "center",
                      backgroundColor: "#eee",
                    }}
                    className=""
                  >
                    Functional Abilities
                  </h6>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="  col">
                    <h6 style={{ fontSize: "12px" }}>
                      GG0100. Prior Functioning: Everyday Activities
                    </h6>
                    <div className="">
                      {/* Field: selfCare */}
                      <div className="col ">
                        <label
                          style={{ fontSize: "12px" }}
                          htmlFor="gg0100.selfCare"
                          className="form-label mr-2"
                        >
                          SELF CARE:
                        </label>
                        <div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              type="radio"
                              id="gg0100.selfCare-independent"
                              name="gg0100.selfCare"
                              value="3"
                              checked={formData?.gg0100?.selfCare === "3"}
                              className="form-check-input"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gg0100.selfCare-independent"
                            >
                              Independent
                            </label>
                          </div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              type="radio"
                              id="gg0100.selfCare-some-help"
                              name="gg0100.selfCare"
                              value="2"
                              checked={formData?.gg0100?.selfCare === "2"}
                              className="form-check-input"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gg0100.selfCare-some-help"
                            >
                              Needed Some Help
                            </label>
                          </div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              type="radio"
                              id="gg0100.selfCare-dependent"
                              name="gg0100.selfCare"
                              value="1"
                              checked={formData?.gg0100?.selfCare === "1"}
                              className="form-check-input"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gg0100.selfCare-dependent"
                            >
                              Dependent
                            </label>
                          </div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              type="radio"
                              id="gg0100.selfCare-unknown"
                              name="gg0100.selfCare"
                              value="8"
                              checked={formData?.gg0100?.selfCare === "8"}
                              className="form-check-input"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gg0100.selfCare-unknown"
                            >
                              Unknown
                            </label>
                          </div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              type="radio"
                              id="gg0100.selfCare-not-applicable"
                              name="gg0100.selfCare"
                              value="9"
                              checked={formData?.gg0100?.selfCare === "9"}
                              className="form-check-input"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gg0100.selfCare-not-applicable"
                            >
                              Not Applicable
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Field: indoorMobility */}
                      <div className="col ">
                        <label
                          style={{ fontSize: "12px" }}
                          htmlFor="gg0100.indoorMobility"
                          className="form-label mr-2"
                        >
                          INDOOR MOBILITY:
                        </label>
                        <div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              type="radio"
                              id="gg0100.indoorMobility-independent"
                              name="gg0100.indoorMobility"
                              value="3"
                              checked={formData?.gg0100?.indoorMobility === "3"}
                              className="form-check-input"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gg0100.indoorMobility-independent"
                            >
                              Independent
                            </label>
                          </div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              type="radio"
                              id="gg0100.indoorMobility-some-help"
                              name="gg0100.indoorMobility"
                              value="2"
                              checked={formData?.gg0100?.indoorMobility === "2"}
                              className="form-check-input"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gg0100.indoorMobility-some-help"
                            >
                              Needed Some Help
                            </label>
                          </div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              type="radio"
                              id="gg0100.indoorMobility-dependent"
                              name="gg0100.indoorMobility"
                              value="1"
                              checked={formData?.gg0100?.indoorMobility === "1"}
                              className="form-check-input"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gg0100.indoorMobility-dependent"
                            >
                              Dependent
                            </label>
                          </div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              type="radio"
                              id="gg0100.indoorMobility-unknown"
                              name="gg0100.indoorMobility"
                              value="8"
                              checked={formData?.gg0100?.indoorMobility === "8"}
                              className="form-check-input"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gg0100.indoorMobility-unknown"
                            >
                              Unknown
                            </label>
                          </div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              type="radio"
                              id="gg0100.indoorMobility-not-applicable"
                              name="gg0100.indoorMobility"
                              value="9"
                              checked={formData?.gg0100?.indoorMobility === "9"}
                              className="form-check-input"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gg0100.indoorMobility-not-applicable"
                            >
                              Not Applicable
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Field: stairs */}
                      <div className="col ">
                        <label
                          style={{ fontSize: "12px" }}
                          htmlFor="gg0100.stairs"
                          className="form-label mr-2"
                        >
                          STAIRS:
                        </label>
                        <div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              type="radio"
                              id="gg0100.stairs-independent"
                              name="gg0100.stairs"
                              value="3"
                              checked={formData?.gg0100?.stairs === "3"}
                              className="form-check-input"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gg0100.stairs-independent"
                            >
                              Independent
                            </label>
                          </div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              type="radio"
                              id="gg0100.stairs-some-help"
                              name="gg0100.stairs"
                              value="2"
                              checked={formData?.gg0100?.stairs === "2"}
                              className="form-check-input"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gg0100.stairs-some-help"
                            >
                              Needed Some Help
                            </label>
                          </div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              type="radio"
                              id="gg0100.stairs-dependent"
                              name="gg0100.stairs"
                              value="1"
                              checked={formData?.gg0100?.stairs === "1"}
                              className="form-check-input"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gg0100.stairs-dependent"
                            >
                              Dependent
                            </label>
                          </div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              type="radio"
                              id="gg0100.stairs-unknown"
                              name="gg0100.stairs"
                              value="8"
                              checked={formData?.gg0100?.stairs === "8"}
                              className="form-check-input"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gg0100.stairs-unknown"
                            >
                              Unknown
                            </label>
                          </div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              type="radio"
                              id="gg0100.stairs-not-applicable"
                              name="gg0100.stairs"
                              value="9"
                              checked={formData?.gg0100?.stairs === "9"}
                              className="form-check-input"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gg0100.stairs-not-applicable"
                            >
                              Not Applicable
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Field: functionalCognition */}
                      <div className="col ">
                        <label
                          style={{ fontSize: "12px" }}
                          htmlFor="gg0100.functionalCognition"
                          className="form-label mr-2"
                        >
                          FUNCTIONAL COGNITION:
                        </label>
                        <div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              type="radio"
                              id="gg0100.functionalCognition-independent"
                              name="gg0100.functionalCognition"
                              value="3"
                              checked={
                                formData?.gg0100?.functionalCognition === "3"
                              }
                              className="form-check-input"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gg0100.functionalCognition-independent"
                            >
                              Independent
                            </label>
                          </div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              type="radio"
                              id="gg0100.functionalCognition-some-help"
                              name="gg0100.functionalCognition"
                              value="2"
                              checked={
                                formData?.gg0100?.functionalCognition === "2"
                              }
                              className="form-check-input"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gg0100.functionalCognition-some-help"
                            >
                              Needed Some Help
                            </label>
                          </div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              type="radio"
                              id="gg0100.functionalCognition-dependent"
                              name="gg0100.functionalCognition"
                              value="1"
                              checked={
                                formData?.gg0100?.functionalCognition === "1"
                              }
                              // onChange={(e) => handleInputChange(e)}
                              className="form-check-input"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gg0100.functionalCognition-dependent"
                            >
                              Dependent
                            </label>
                          </div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              type="radio"
                              id="gg0100.functionalCognition-unknown"
                              name="gg0100.functionalCognition"
                              value="8"
                              checked={
                                formData?.gg0100?.functionalCognition === "8"
                              }
                              // onChange={(e) => handleInputChange(e)}
                              className="form-check-input"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gg0100.functionalCognition-unknown"
                            >
                              Unknown
                            </label>
                          </div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              type="radio"
                              id="gg0100.functionalCognition-not-applicable"
                              name="gg0100.functionalCognition"
                              value="9"
                              checked={
                                formData?.gg0100?.functionalCognition === "9"
                              }
                              // onChange={(e) => handleInputChange(e)}
                              className="form-check-input"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gg0100.functionalCognition-not-applicable"
                            >
                              Not Applicable
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* GG0110 */}
                  <div className="  col">
                    <h6 style={{ fontSize: "12px" }}>
                      GG0110. Prior Device Use
                    </h6>
                    <div>
                      {/* Checkbox: manualWheelchair */}
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="gg0110.manualWheelchair"
                          name="gg0110.manualWheelchair"
                          checked={formData?.gg0110?.manualWheelchair || false}
                          disabled
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0110.manualWheelchair"
                        >
                          MANUAL WHEELCHAIR
                        </label>
                      </div>

                      {/* Checkbox: motorizedWheelchair */}
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="gg0110.motorizedWheelchair"
                          name="gg0110.motorizedWheelchair"
                          checked={
                            formData?.gg0110?.motorizedWheelchair || false
                          }
                          disabled
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0110.motorizedWheelchair"
                        >
                          MOTORIZED WHEELCHAIR
                        </label>
                      </div>

                      {/* Checkbox: mechanicalLift */}
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="gg0110.mechanicalLift"
                          name="gg0110.mechanicalLift"
                          checked={formData?.gg0110?.mechanicalLift || false}
                          disabled
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0110.mechanicalLift"
                        >
                          MECHANICAL LIFT
                        </label>
                      </div>

                      {/* Checkbox: walker */}
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="gg0110.walker"
                          name="gg0110.walker"
                          checked={formData?.gg0110?.walker || false}
                          disabled
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0110.walker"
                        >
                          WALKER
                        </label>
                      </div>

                      {/* Checkbox: orthoticsProsthetics */}
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="gg0110.orthoticsProsthetics"
                          name="gg0110.orthoticsProsthetics"
                          checked={
                            formData?.gg0110?.orthoticsProsthetics || false
                          }
                          disabled
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0110.orthoticsProsthetics"
                        >
                          ORTHOTICS/PROSTHETICS
                        </label>
                      </div>

                      {/* Checkbox: noneOfTheAbove */}
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="gg0110.noneOfTheAbove"
                          name="gg0110.noneOfTheAbove"
                          checked={formData?.gg0110?.noneOfTheAbove || false}
                          disabled
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0110.noneOfTheAbove"
                        >
                          NONE OF THE ABOVE
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* GG0130 */}
                  <div className="  col">
                    <h6 style={{ fontSize: "12px" }}>GG0130. Self-Care</h6>
                    <div className="">
                      <div className="">
                        {/* Eating */}
                        <div className="col ">
                          <label
                            style={{ fontSize: "12px" }}
                            htmlFor="gg0130.eating"
                            className="form-label mr-2"
                          >
                            EATING:
                          </label>
                          <div>
                            <div
                              style={{
                                minHight: 0,
                                margin: 0,
                                padding: "0px 0px 0px auto",
                              }}
                              className="form-check d-flex align-items-cener gap-1"
                            >
                              <input
                                type="radio"
                                id="gg0130.eating-06"
                                name="gg0130.eating"
                                value="06"
                                checked={formData?.gg0130?.eating === "06"}
                                className="form-check-input"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="gg0130.eating-06"
                              >
                                Independent
                              </label>
                            </div>
                            <div
                              style={{
                                minHight: 0,
                                margin: 0,
                                padding: "0px 0px 0px auto",
                              }}
                              className="form-check d-flex align-items-cener gap-1"
                            >
                              <input
                                type="radio"
                                id="gg0130.eating-05"
                                name="gg0130.eating"
                                value="05"
                                checked={formData?.gg0130?.eating === "05"}
                                className="form-check-input"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="gg0130.eating-05"
                              >
                                Setup or Clean-up Assistance
                              </label>
                            </div>
                            <div
                              style={{
                                minHight: 0,
                                margin: 0,
                                padding: "0px 0px 0px auto",
                              }}
                              className="form-check d-flex align-items-cener gap-1"
                            >
                              <input
                                type="radio"
                                id="gg0130.eating-04"
                                name="gg0130.eating"
                                value="04"
                                checked={formData?.gg0130?.eating === "04"}
                                className="form-check-input"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="gg0130.eating-04"
                              >
                                Supervision or Touching Assistance
                              </label>
                            </div>
                            <div
                              style={{
                                minHight: 0,
                                margin: 0,
                                padding: "0px 0px 0px auto",
                              }}
                              className="form-check d-flex align-items-cener gap-1"
                            >
                              <input
                                type="radio"
                                id="gg0130.eating-03"
                                name="gg0130.eating"
                                value="03"
                                checked={formData?.gg0130?.eating === "03"}
                                className="form-check-input"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="gg0130.eating-03"
                              >
                                Partial/Moderate Assistance
                              </label>
                            </div>
                            <div
                              style={{
                                minHight: 0,
                                margin: 0,
                                padding: "0px 0px 0px auto",
                              }}
                              className="form-check d-flex align-items-cener gap-1"
                            >
                              <input
                                type="radio"
                                id="gg0130.eating-02"
                                name="gg0130.eating"
                                value="02"
                                checked={formData?.gg0130?.eating === "02"}
                                className="form-check-input"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="gg0130.eating-02"
                              >
                                Substantial/Maximal Assistance
                              </label>
                            </div>
                            <div
                              style={{
                                minHight: 0,
                                margin: 0,
                                padding: "0px 0px 0px auto",
                              }}
                              className="form-check d-flex align-items-cener gap-1"
                            >
                              <input
                                type="radio"
                                id="gg0130.eating-01"
                                name="gg0130.eating"
                                value="01"
                                checked={formData?.gg0130?.eating === "01"}
                                className="form-check-input"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="gg0130.eating-01"
                              >
                                Dependent
                              </label>
                            </div>
                            <div
                              style={{
                                minHight: 0,
                                margin: 0,
                                padding: "0px 0px 0px auto",
                              }}
                              className="form-check d-flex align-items-cener gap-1"
                            >
                              <input
                                type="radio"
                                id="gg0130.eating-07"
                                name="gg0130.eating"
                                value="07"
                                checked={formData?.gg0130?.eating === "07"}
                                className="form-check-input"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="gg0130.eating-07"
                              >
                                Patient Refused
                              </label>
                            </div>
                            <div
                              style={{
                                minHight: 0,
                                margin: 0,
                                padding: "0px 0px 0px auto",
                              }}
                              className="form-check d-flex align-items-cener gap-1"
                            >
                              <input
                                type="radio"
                                id="gg0130.eating-09"
                                name="gg0130.eating"
                                value="09"
                                checked={formData?.gg0130?.eating === "09"}
                                className="form-check-input"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="gg0130.eating-09"
                              >
                                Not Applicable
                              </label>
                            </div>
                            <div
                              style={{
                                minHight: 0,
                                margin: 0,
                                padding: "0px 0px 0px auto",
                              }}
                              className="form-check d-flex align-items-cener gap-1"
                            >
                              <input
                                type="radio"
                                id="gg0130.eating-10"
                                name="gg0130.eating"
                                value="10"
                                checked={formData?.gg0130?.eating === "10"}
                                className="form-check-input"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="gg0130.eating-10"
                              >
                                Not Attempted Due to Environmental Limitations
                              </label>
                            </div>
                            <div
                              style={{
                                minHight: 0,
                                margin: 0,
                                padding: "0px 0px 0px auto",
                              }}
                              className="form-check d-flex align-items-cener gap-1"
                            >
                              <input
                                type="radio"
                                id="gg0130.eating-88"
                                name="gg0130.eating"
                                value="88"
                                checked={formData?.gg0130?.eating === "88"}
                                className="form-check-input"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="gg0130.eating-88"
                              >
                                Not Attempted Due to Medical Conditions or
                                Safety Concerns
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* Oral Hygiene */}
                        <div className="col ">
                          <label
                            style={{ fontSize: "12px" }}
                            htmlFor="gg0130.oralHygiene"
                            className="form-label mr-2"
                          >
                            ORAL HYGIENE:
                          </label>
                          <div>
                            {/* Repeat the same structure for oralHygiene */}
                          </div>
                        </div>

                        {/* Toileting Hygiene */}
                        <div className="col ">
                          <label
                            style={{ fontSize: "12px" }}
                            htmlFor="gg0130.toiletingHygiene"
                            className="form-label mr-2"
                          >
                            TOILETING HYGIENE:
                          </label>
                          <div>
                            {/* Repeat the same structure for toiletingHygiene */}
                          </div>
                        </div>

                        {/* Shower/Bathe Self */}
                        <div className="col ">
                          <label
                            style={{ fontSize: "12px" }}
                            htmlFor="gg0130.showerBatheSelf"
                            className="form-label mr-2"
                          >
                            SHOWER/BATHE SELF:
                          </label>
                          <div>
                            {/* Repeat the same structure for showerBatheSelf */}
                          </div>
                        </div>

                        {/* Upper Body Dressing */}
                        <div className="col ">
                          <label
                            style={{ fontSize: "12px" }}
                            htmlFor="gg0130.upperBodyDressing"
                            className="form-label mr-2"
                          >
                            UPPER BODY DRESSING:
                          </label>
                          <div>
                            {/* Repeat the same structure for upperBodyDressing */}
                          </div>
                        </div>

                        {/* Lower Body Dressing */}
                        <div className="col ">
                          <label
                            style={{ fontSize: "12px" }}
                            htmlFor="gg0130.lowerBodyDressing"
                            className="form-label mr-2"
                          >
                            LOWER BODY DRESSING:
                          </label>
                          <div>
                            {/* Repeat the same structure for lowerBodyDressing */}
                          </div>
                        </div>

                        {/* Putting On/Taking Off Footwear */}
                        <div className="col ">
                          <label
                            style={{ fontSize: "12px" }}
                            htmlFor="gg0130.puttingOnTakingOffFootwear"
                            className="form-label mr-2"
                          >
                            PUTTING ON/TAKING OFF FOOTWEAR:
                          </label>
                          <div>
                            {/* Repeat the same structure for puttingOnTakingOffFootwear */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="col ">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      Roll Left and Right:
                    </label>
                    <div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gg0170.rollLeftRight.06"
                          name="gg0170.rollLeftRight"
                          value="06"
                          checked={formData?.gg0170?.rollLeftRight === "06"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0170.rollLeftRight.06"
                        >
                          Independent
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gg0170.rollLeftRight.05"
                          name="gg0170.rollLeftRight"
                          value="05"
                          checked={formData?.gg0170?.rollLeftRight === "05"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0170.rollLeftRight.05"
                        >
                          Setup or Clean-up Assistance
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gg0170.rollLeftRight.04"
                          name="gg0170.rollLeftRight"
                          value="04"
                          checked={formData?.gg0170?.rollLeftRight === "04"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0170.rollLeftRight.04"
                        >
                          Supervision or Touching Assistance
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gg0170.rollLeftRight.03"
                          name="gg0170.rollLeftRight"
                          value="03"
                          checked={formData?.gg0170?.rollLeftRight === "03"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0170.rollLeftRight.03"
                        >
                          Partial/Moderate Assistance
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gg0170.rollLeftRight.02"
                          name="gg0170.rollLeftRight"
                          value="02"
                          checked={formData?.gg0170?.rollLeftRight === "02"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0170.rollLeftRight.02"
                        >
                          Substantial/Maximal Assistance
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gg0170.rollLeftRight.01"
                          name="gg0170.rollLeftRight"
                          value="01"
                          checked={formData?.gg0170?.rollLeftRight === "01"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0170.rollLeftRight.01"
                        >
                          Dependent
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gg0170.rollLeftRight.07"
                          name="gg0170.rollLeftRight"
                          value="07"
                          checked={formData?.gg0170?.rollLeftRight === "07"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0170.rollLeftRight.07"
                        >
                          Patient Refused
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gg0170.rollLeftRight.09"
                          name="gg0170.rollLeftRight"
                          value="09"
                          checked={formData?.gg0170?.rollLeftRight === "09"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0170.rollLeftRight.09"
                        >
                          Not Applicable
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gg0170.rollLeftRight.10"
                          name="gg0170.rollLeftRight"
                          value="10"
                          checked={formData?.gg0170?.rollLeftRight === "10"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0170.rollLeftRight.10"
                        >
                          Not Attempted Due to Environmental Limitations
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gg0170.rollLeftRight.88"
                          name="gg0170.rollLeftRight"
                          value="88"
                          checked={formData?.gg0170?.rollLeftRight === "88"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0170.rollLeftRight.88"
                        >
                          Not Attempted Due to Medical Conditions or Safety
                          Concerns
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Sit to Lying */}
                  <div className="col ">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      Sit to Lying:
                    </label>
                    <div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gg0170.sitToLying.06"
                          name="gg0170.sitToLying"
                          value="06"
                          checked={formData?.gg0170?.sitToLying === "06"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0170.sitToLying.06"
                        >
                          Independent
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gg0170.sitToLying.05"
                          name="gg0170.sitToLying"
                          value="05"
                          checked={formData?.gg0170?.sitToLying === "05"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0170.sitToLying.05"
                        >
                          Setup or Clean-up Assistance
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gg0170.sitToLying.04"
                          name="gg0170.sitToLying"
                          value="04"
                          checked={formData?.gg0170?.sitToLying === "04"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0170.sitToLying.04"
                        >
                          Supervision or Touching Assistance
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gg0170.sitToLying.03"
                          name="gg0170.sitToLying"
                          value="03"
                          checked={formData?.gg0170?.sitToLying === "03"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0170.sitToLying.03"
                        >
                          Partial/Moderate Assistance
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gg0170.sitToLying.02"
                          name="gg0170.sitToLying"
                          value="02"
                          checked={formData?.gg0170?.sitToLying === "02"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0170.sitToLying.02"
                        >
                          Substantial/Maximal Assistance
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gg0170.sitToLying.01"
                          name="gg0170.sitToLying"
                          value="01"
                          checked={formData?.gg0170?.sitToLying === "01"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0170.sitToLying.01"
                        >
                          Dependent
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gg0170.sitToLying.07"
                          name="gg0170.sitToLying"
                          value="07"
                          checked={formData?.gg0170?.sitToLying === "07"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0170.sitToLying.07"
                        >
                          Patient Refused
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gg0170.sitToLying.09"
                          name="gg0170.sitToLying"
                          value="09"
                          checked={formData?.gg0170?.sitToLying === "09"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0170.sitToLying.09"
                        >
                          Not Applicable
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gg0170.sitToLying.10"
                          name="gg0170.sitToLying"
                          value="10"
                          checked={formData?.gg0170?.sitToLying === "10"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0170.sitToLying.10"
                        >
                          Not Attempted Due to Environmental Limitations
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gg0170.sitToLying.88"
                          name="gg0170.sitToLying"
                          value="88"
                          checked={formData?.gg0170?.sitToLying === "88"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0170.sitToLying.88"
                        >
                          Not Attempted Due to Medical Conditions or Safety
                          Concerns
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Lying to Sitting on Side of Bed */}
                  <div className="col ">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      Lying to Sitting on Side of Bed:
                    </label>
                    <div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gg0170.lyingToSitting.06"
                          name="gg0170.lyingToSitting"
                          value="06"
                          checked={formData?.gg0170?.lyingToSitting === "06"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0170.lyingToSitting.06"
                        >
                          Independent
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gg0170.lyingToSitting.05"
                          name="gg0170.lyingToSitting"
                          value="05"
                          checked={formData?.gg0170?.lyingToSitting === "05"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0170.lyingToSitting.05"
                        >
                          Setup or Clean-up Assistance
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gg0170.lyingToSitting.04"
                          name="gg0170.lyingToSitting"
                          value="04"
                          checked={formData?.gg0170?.lyingToSitting === "04"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0170.lyingToSitting.04"
                        >
                          Supervision or Touching Assistance
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gg0170.lyingToSitting.03"
                          name="gg0170.lyingToSitting"
                          value="03"
                          checked={formData?.gg0170?.lyingToSitting === "03"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0170.lyingToSitting.03"
                        >
                          Partial/Moderate Assistance
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gg0170.lyingToSitting.02"
                          name="gg0170.lyingToSitting"
                          value="02"
                          checked={formData?.gg0170?.lyingToSitting === "02"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0170.lyingToSitting.02"
                        >
                          Substantial/Maximal Assistance
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gg0170.lyingToSitting.01"
                          name="gg0170.lyingToSitting"
                          value="01"
                          checked={formData?.gg0170?.lyingToSitting === "01"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0170.lyingToSitting.01"
                        >
                          Dependent
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gg0170.lyingToSitting.07"
                          name="gg0170.lyingToSitting"
                          value="07"
                          checked={formData?.gg0170?.lyingToSitting === "07"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0170.lyingToSitting.07"
                        >
                          Patient Refused
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gg0170.lyingToSitting.09"
                          name="gg0170.lyingToSitting"
                          value="09"
                          checked={formData?.gg0170?.lyingToSitting === "09"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0170.lyingToSitting.09"
                        >
                          Not Applicable
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gg0170.lyingToSitting.10"
                          name="gg0170.lyingToSitting"
                          value="10"
                          checked={formData?.gg0170?.lyingToSitting === "10"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0170.lyingToSitting.10"
                        >
                          Not Attempted Due to Environmental Limitations
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gg0170.lyingToSitting.88"
                          name="gg0170.lyingToSitting"
                          value="88"
                          checked={formData?.gg0170?.lyingToSitting === "88"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0170.lyingToSitting.88"
                        >
                          Not Attempted Due to Medical Conditions or Safety
                          Concerns
                        </label>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {/* Sit to Stand */}
                  <div className="col ">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      Sit to Stand:
                    </label>
                    <div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gg0170.sitToStand.06"
                          name="gg0170.sitToStand"
                          value="06"
                          checked={formData?.gg0170?.sitToStand === "06"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0170.sitToStand.06"
                        >
                          Independent
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gg0170.sitToStand.05"
                          name="gg0170.sitToStand"
                          value="05"
                          checked={formData?.gg0170?.sitToStand === "05"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0170.sitToStand.05"
                        >
                          Setup or Clean-up Assistance
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gg0170.sitToStand.04"
                          name="gg0170.sitToStand"
                          value="04"
                          checked={formData?.gg0170?.sitToStand === "04"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0170.sitToStand.04"
                        >
                          Supervision or Touching Assistance
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gg0170.sitToStand.03"
                          name="gg0170.sitToStand"
                          value="03"
                          checked={formData?.gg0170?.sitToStand === "03"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0170.sitToStand.03"
                        >
                          Partial/Moderate Assistance
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gg0170.sitToStand.02"
                          name="gg0170.sitToStand"
                          value="02"
                          checked={formData?.gg0170?.sitToStand === "02"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0170.sitToStand.02"
                        >
                          Substantial/Maximal Assistance
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gg0170.sitToStand.01"
                          name="gg0170.sitToStand"
                          value="01"
                          checked={formData?.gg0170?.sitToStand === "01"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0170.sitToStand.01"
                        >
                          Dependent
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gg0170.sitToStand.07"
                          name="gg0170.sitToStand"
                          value="07"
                          checked={formData?.gg0170?.sitToStand === "07"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0170.sitToStand.07"
                        >
                          Patient Refused
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gg0170.sitToStand.09"
                          name="gg0170.sitToStand"
                          value="09"
                          checked={formData?.gg0170?.sitToStand === "09"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0170.sitToStand.09"
                        >
                          Not Applicable
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gg0170.sitToStand.10"
                          name="gg0170.sitToStand"
                          value="10"
                          checked={formData?.gg0170?.sitToStand === "10"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0170.sitToStand.10"
                        >
                          Not Attempted Due to Environmental Limitations
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          id="gg0170.sitToStand.88"
                          name="gg0170.sitToStand"
                          value="88"
                          checked={formData?.gg0170?.sitToStand === "88"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gg0170.sitToStand.88"
                        >
                          Not Attempted Due to Medical Conditions or Safety
                          Concerns
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* GG0170 */}
                  <div className="  col">
                    <h6 style={{ fontSize: "12px" }}>GG0170. Mobility</h6>
                    <div className="">
                      {/* Roll Left and Right */}

                      {/* Chair/Bed-to-Chair Transfer */}
                      <div className="col ">
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-label mr-2"
                        >
                          Chair/Bed-to-Chair Transfer:
                        </label>
                        <div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              id="gg0170.chairBedToChair.06"
                              name="gg0170.chairBedToChair"
                              value="06"
                              checked={
                                formData?.gg0170?.chairBedToChair === "06"
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gg0170.chairBedToChair.06"
                            >
                              Independent
                            </label>
                          </div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              id="gg0170.chairBedToChair.05"
                              name="gg0170.chairBedToChair"
                              value="05"
                              checked={
                                formData?.gg0170?.chairBedToChair === "05"
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gg0170.chairBedToChair.05"
                            >
                              Setup or Clean-up Assistance
                            </label>
                          </div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              id="gg0170.chairBedToChair.04"
                              name="gg0170.chairBedToChair"
                              value="04"
                              checked={
                                formData?.gg0170?.chairBedToChair === "04"
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gg0170.chairBedToChair.04"
                            >
                              Supervision or Touching Assistance
                            </label>
                          </div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              id="gg0170.chairBedToChair.03"
                              name="gg0170.chairBedToChair"
                              value="03"
                              checked={
                                formData?.gg0170?.chairBedToChair === "03"
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gg0170.chairBedToChair.03"
                            >
                              Partial/Moderate Assistance
                            </label>
                          </div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              id="gg0170.chairBedToChair.02"
                              name="gg0170.chairBedToChair"
                              value="02"
                              checked={
                                formData?.gg0170?.chairBedToChair === "02"
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gg0170.chairBedToChair.02"
                            >
                              Substantial/Maximal Assistance
                            </label>
                          </div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              id="gg0170.chairBedToChair.01"
                              name="gg0170.chairBedToChair"
                              value="01"
                              checked={
                                formData?.gg0170?.chairBedToChair === "01"
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gg0170.chairBedToChair.01"
                            >
                              Dependent
                            </label>
                          </div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              id="gg0170.chairBedToChair.07"
                              name="gg0170.chairBedToChair"
                              value="07"
                              checked={
                                formData?.gg0170?.chairBedToChair === "07"
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gg0170.chairBedToChair.07"
                            >
                              Patient Refused
                            </label>
                          </div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              id="gg0170.chairBedToChair.09"
                              name="gg0170.chairBedToChair"
                              value="09"
                              checked={
                                formData?.gg0170?.chairBedToChair === "09"
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gg0170.chairBedToChair.09"
                            >
                              Not Applicable
                            </label>
                          </div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              id="gg0170.chairBedToChair.10"
                              name="gg0170.chairBedToChair"
                              value="10"
                              checked={
                                formData?.gg0170?.chairBedToChair === "10"
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gg0170.chairBedToChair.10"
                            >
                              Not Attempted Due to Environmental Limitations
                            </label>
                          </div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              id="gg0170.chairBedToChair.88"
                              name="gg0170.chairBedToChair"
                              value="88"
                              checked={
                                formData?.gg0170?.chairBedToChair === "88"
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gg0170.chairBedToChair.88"
                            >
                              Not Attempted Due to Medical Conditions or Safety
                              Concerns
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Toilet Transfer */}
                      <div className="col ">
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-label mr-2"
                        >
                          Toilet Transfer:
                        </label>
                        <div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              id="gg0170.toiletTransfer.06"
                              name="gg0170.toiletTransfer"
                              value="06"
                              checked={
                                formData?.gg0170?.toiletTransfer === "06"
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gg0170.toiletTransfer.06"
                            >
                              Independent
                            </label>
                          </div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              id="gg0170.toiletTransfer.05"
                              name="gg0170.toiletTransfer"
                              value="05"
                              checked={
                                formData?.gg0170?.toiletTransfer === "05"
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gg0170.toiletTransfer.05"
                            >
                              Setup or Clean-up Assistance
                            </label>
                          </div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              id="gg0170.toiletTransfer.04"
                              name="gg0170.toiletTransfer"
                              value="04"
                              checked={
                                formData?.gg0170?.toiletTransfer === "04"
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gg0170.toiletTransfer.04"
                            >
                              Supervision or Touching Assistance
                            </label>
                          </div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              id="gg0170.toiletTransfer.03"
                              name="gg0170.toiletTransfer"
                              value="03"
                              checked={
                                formData?.gg0170?.toiletTransfer === "03"
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gg0170.toiletTransfer.03"
                            >
                              Partial/Moderate Assistance
                            </label>
                          </div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              id="gg0170.toiletTransfer.02"
                              name="gg0170.toiletTransfer"
                              value="02"
                              checked={
                                formData?.gg0170?.toiletTransfer === "02"
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gg0170.toiletTransfer.02"
                            >
                              Substantial/Maximal Assistance
                            </label>
                          </div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              id="gg0170.toiletTransfer.01"
                              name="gg0170.toiletTransfer"
                              value="01"
                              checked={
                                formData?.gg0170?.toiletTransfer === "01"
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gg0170.toiletTransfer.01"
                            >
                              Dependent
                            </label>
                          </div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              id="gg0170.toiletTransfer.07"
                              name="gg0170.toiletTransfer"
                              value="07"
                              checked={
                                formData?.gg0170?.toiletTransfer === "07"
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gg0170.toiletTransfer.07"
                            >
                              Patient Refused
                            </label>
                          </div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              id="gg0170.toiletTransfer.09"
                              name="gg0170.toiletTransfer"
                              value="09"
                              checked={
                                formData?.gg0170?.toiletTransfer === "09"
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gg0170.toiletTransfer.09"
                            >
                              Not Applicable
                            </label>
                          </div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              id="gg0170.toiletTransfer.10"
                              name="gg0170.toiletTransfer"
                              value="10"
                              checked={
                                formData?.gg0170?.toiletTransfer === "10"
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gg0170.toiletTransfer.10"
                            >
                              Not Attempted Due to Environmental Limitations
                            </label>
                          </div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              id="gg0170.toiletTransfer.88"
                              name="gg0170.toiletTransfer"
                              value="88"
                              checked={
                                formData?.gg0170?.toiletTransfer === "88"
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gg0170.toiletTransfer.88"
                            >
                              Not Attempted Due to Medical Conditions or Safety
                              Concerns
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <h6
                    style={{
                      // border: "1px solid gray",
                      padding: "5px",
                      margin: "5px 0px",
                      fontSize: "11px",
                      textAlign: "center",
                      backgroundColor: "#eee",
                    }}
                    className=""
                  >
                    Bladder and Bowel
                  </h6>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="  col">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      M1600. Has this patient been treated for a Urinary Tract
                      Infection in the past 14 days?
                    </label>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="m1600-0"
                        name="m1600"
                        type="radio"
                        value="0"
                        checked={formData?.m1600 === "0"}
                        className="form-check-input"
                      />
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="m1600-0"
                        className="form-check-label"
                      >
                        No
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="m1600-1"
                        name="m1600"
                        type="radio"
                        value="1"
                        checked={formData?.m1600 === "1"}
                        className="form-check-input"
                      />
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="m1600-1"
                        className="form-check-label"
                      >
                        Yes
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="m1600-NA"
                        name="m1600"
                        type="radio"
                        value="NA"
                        checked={formData?.m1600 === "NA"}
                        className="form-check-input"
                      />
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="m1600-NA"
                        className="form-check-label"
                      >
                        Patient on prophylactic treatment
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="m1600-UK"
                        name="m1600"
                        type="radio"
                        value="UK"
                        checked={formData?.m1600 === "UK"}
                        className="form-check-input"
                        disabled
                      />
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="m1600-UK"
                        className="form-check-label"
                      >
                        Unknown (Omit this option on Discharge)
                      </label>
                    </div>
                  </div>

                  {/* M1610 */}
                  <div className="  col">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      M1610. Urinary Incontinence or Urinary Catheter Presence
                    </label>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="m1610-0"
                        name="m1610"
                        type="radio"
                        value="0"
                        checked={formData?.m1610 === "0"}
                        className="form-check-input"
                      />
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="m1610-0"
                        className="form-check-label"
                      >
                        No incontinence or catheter (includes anuria or ostomy
                        for urinary drainage)
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="m1610-1"
                        name="m1610"
                        type="radio"
                        value="1"
                        checked={formData?.m1610 === "1"}
                        className="form-check-input"
                      />
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="m1610-1"
                        className="form-check-label"
                      >
                        Patient is incontinent
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="m1610-2"
                        name="m1610"
                        type="radio"
                        value="2"
                        checked={formData?.m1610 === "2"}
                        className="form-check-input"
                      />
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="m1610-2"
                        className="form-check-label"
                      >
                        Patient requires a urinary catheter (external,
                        indwelling, intermittent, or suprapubic)
                      </label>
                    </div>
                  </div>
                </td>
                <td>
                  {/* M1620 */}
                  <div className="  col">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      M1620. Bowel Incontinence Frequency
                    </label>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="m1620-0"
                        name="m1620"
                        type="radio"
                        value="0"
                        checked={formData?.m1620 === "0"}
                        className="form-check-input"
                      />
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="m1620-0"
                        className="form-check-label"
                      >
                        Very rarely or never has bowel incontinence
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="m1620-1"
                        name="m1620"
                        type="radio"
                        value="1"
                        checked={formData?.m1620 === "1"}
                        className="form-check-input"
                      />
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="m1620-1"
                        className="form-check-label"
                      >
                        Less than once weekly
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="m1620-2"
                        name="m1620"
                        type="radio"
                        value="2"
                        checked={formData?.m1620 === "2"}
                        className="form-check-input"
                      />
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="m1620-2"
                        className="form-check-label"
                      >
                        One to three times weekly
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="m1620-3"
                        name="m1620"
                        type="radio"
                        value="3"
                        checked={formData?.m1620 === "3"}
                        className="form-check-input"
                      />
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="m1620-3"
                        className="form-check-label"
                      >
                        Four to six times weekly
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="m1620-4"
                        name="m1620"
                        type="radio"
                        value="4"
                        checked={formData?.m1620 === "4"}
                        className="form-check-input"
                      />
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="m1620-4"
                        className="form-check-label"
                      >
                        On a daily basis
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="m1620-5"
                        name="m1620"
                        type="radio"
                        value="5"
                        checked={formData?.m1620 === "5"}
                        className="form-check-input"
                      />
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="m1620-5"
                        className="form-check-label"
                      >
                        More often than once daily
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="m1620-NA"
                        name="m1620"
                        type="radio"
                        value="NA"
                        checked={formData?.m1620 === "NA"}
                        className="form-check-input"
                      />
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="m1620-NA"
                        className="form-check-label"
                      >
                        Patient has ostomy for bowel elimination
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="m1620-UK"
                        name="m1620"
                        type="radio"
                        value="UK"
                        checked={formData?.m1620 === "UK"}
                        className="form-check-input"
                        disabled
                      />
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="m1620-UK"
                        className="form-check-label"
                      >
                        Unknown (Omit this option on Discharge)
                      </label>
                    </div>
                  </div>
                </td>
                <td>
                  {/* M1630 */}
                  <div className="  col">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      M1630. Ostomy for Bowel Elimination
                    </label>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="m1630-0"
                        name="m1630"
                        type="radio"
                        value="0"
                        checked={formData?.m1630 === "0"}
                        className="form-check-input"
                      />
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="m1630-0"
                        className="form-check-label"
                      >
                        Patient does not have an ostomy for bowel elimination
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="m1630-1"
                        name="m1630"
                        type="radio"
                        value="1"
                        checked={formData?.m1630 === "1"}
                        className="form-check-input"
                      />
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="m1630-1"
                        className="form-check-label"
                      >
                        Patient’s ostomy was not related to an inpatient stay
                        and did not necessitate change in medical or treatment
                        regimen
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="m1630-2"
                        name="m1630"
                        type="radio"
                        value="2"
                        checked={formData?.m1630 === "2"}
                        className="form-check-input"
                      />
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="m1630-2"
                        className="form-check-label"
                      >
                        The ostomy was related to an inpatient stay or did
                        necessitate change in medical or treatment regimen
                      </label>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  {/* section F  */}
                  <h6
                    style={{
                      // border: "1px solid gray",
                      padding: "5px",
                      margin: "5px 0px",
                      fontSize: "11px",
                      textAlign: "center",
                      backgroundColor: "#eee",
                    }}
                    className=""
                  >
                    Active Diagnoses
                  </h6>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="  col">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      M1021. Primary Diagnosis
                    </label>
                    {/* Since you prefer using checkboxes, I'll assume each diagnosis could be a checkbox */}
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="primaryDiagnosis1"
                        name="primaryDiagnosis"
                        type="checkbox"
                        value="Diagnosis1"
                        checked={formData?.primaryDiagnosis?.includes(
                          "Diagnosis1"
                        )}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="primaryDiagnosis1"
                        className="form-check-label"
                      >
                        Diagnosis 1
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="primaryDiagnosis2"
                        name="primaryDiagnosis"
                        type="checkbox"
                        value="Diagnosis2"
                        checked={formData?.primaryDiagnosis?.includes(
                          "Diagnosis2"
                        )}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="primaryDiagnosis2"
                        className="form-check-label"
                      >
                        Diagnosis 2
                      </label>
                    </div>
                    {/* Add more diagnoses as needed */}

                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mt-2"
                    >
                      Symptom Control Rating (0-4)
                    </label>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="primaryDiagnosisRating0"
                        name="primaryDiagnosisRating"
                        type="radio"
                        value="0"
                        checked={formData?.primaryDiagnosisRating === "0"}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="primaryDiagnosisRating0"
                        className="form-check-label"
                      >
                        0
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="primaryDiagnosisRating1"
                        name="primaryDiagnosisRating"
                        type="radio"
                        value="1"
                        checked={formData?.primaryDiagnosisRating === "1"}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="primaryDiagnosisRating1"
                        className="form-check-label"
                      >
                        1
                      </label>
                    </div>
                    {/* Add more ratings as needed */}
                  </div>
                </td>
                <td>
                  {/* M1023. Other Diagnoses */}
                  {formData?.otherDiagnoses?.map((diagnosis, index) => (
                    <div key={index}>
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-label mr-2"
                      >
                        Other Diagnosis {index + 1}:{diagnosis || "N/A"}
                      </label>
                      <div>
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-label mr-2"
                        >
                          Rating:
                          <div className="form-check d-flex gap-2 align-items-center">
                            {[0, 1, 2, 3, 4]?.map((rating) => (
                              <div className="form-check " key={rating}>
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  name={`otherDiagnosisRating${index}`}
                                  value={rating}
                                  checked={
                                    formData?.otherDiagnosesRatings[index] ===
                                    rating.toString()
                                  }
                                />
                                <label
                                  style={{ fontSize: "12px" }}
                                  className="form-check-label"
                                >
                                  {rating}
                                </label>
                              </div>
                            ))}
                          </div>
                        </label>
                      </div>
                    </div>
                  ))}
                </td>
                <td>
                  {/* M1028. Active Diagnoses – Comorbidities and Co-existing Conditions */}
                  <div className="  col">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      M1028. Active Diagnoses – Comorbidities and Co-existing
                      Conditions
                    </label>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="pvd"
                        name="comorbidities"
                        type="checkbox"
                        value="pvd"
                        checked={formData?.comorbidities?.includes("pvd")}
                        className="form-check-input"
                      />
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="pvd"
                        className="form-check-label"
                      >
                        Peripheral Vascular Disease (PVD) or Peripheral Artery
                        Disease (PAD)
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="dm"
                        name="comorbidities"
                        type="checkbox"
                        value="dm"
                        checked={formData?.comorbidities?.includes("dm")}
                        className="form-check-input"
                      />
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="dm"
                        className="form-check-label"
                      >
                        Diabetes Mellitus (DM)
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="none"
                        name="comorbidities"
                        type="checkbox"
                        value="none"
                        checked={formData?.comorbidities?.includes("none")}
                        className="form-check-input"
                      />
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="none"
                        className="form-check-label"
                      >
                        None of the above
                      </label>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  {/* section F  */}
                  <h6
                    style={{
                      // border: "1px solid gray",
                      padding: "5px",
                      margin: "5px 0px",
                      fontSize: "11px",
                      textAlign: "center",
                      backgroundColor: "#eee",
                    }}
                    className=""
                  >
                    Health Conditions
                  </h6>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="  col">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      M1033. Risk for Hospitalization
                    </label>

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="falls"
                        name="riskForHospitalization"
                        type="checkbox"
                        value="falls"
                        checked={formData?.riskForHospitalization?.includes(
                          "falls"
                        )}
                        className="form-check-input"
                      />
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="falls"
                        className="form-check-label"
                      >
                        History of falls (2 or more falls — or any fall with an
                        injury — in the past 12 months)
                      </label>
                    </div>

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="weightLoss"
                        name="riskForHospitalization"
                        type="checkbox"
                        value="weightLoss"
                        checked={formData?.riskForHospitalization?.includes(
                          "weightLoss"
                        )}
                        className="form-check-input"
                      />
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="weightLoss"
                        className="form-check-label"
                      >
                        Unintentional weight loss of a total of 10 pounds or
                        more in the last 12 months
                      </label>
                    </div>

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="hospitalizations"
                        name="riskForHospitalization"
                        type="checkbox"
                        value="hospitalizations"
                        checked={formData?.riskForHospitalization?.includes(
                          "hospitalizations"
                        )}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="hospitalizations"
                        className="form-check-label"
                      >
                        Multiple hospitalizations (2 or more) in the past 6
                        months
                      </label>
                    </div>

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="emergencyVisits"
                        name="riskForHospitalization"
                        type="checkbox"
                        value="emergencyVisits"
                        checked={formData?.riskForHospitalization?.includes(
                          "emergencyVisits"
                        )}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="emergencyVisits"
                        className="form-check-label"
                      >
                        Multiple emergency department visits (2 or more) in the
                        past 6 months
                      </label>
                    </div>

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="declineInStatus"
                        name="riskForHospitalization"
                        type="checkbox"
                        value="declineInStatus"
                        checked={formData?.riskForHospitalization?.includes(
                          "declineInStatus"
                        )}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="declineInStatus"
                        className="form-check-label"
                      >
                        Decline in mental, emotional, or behavioral status in
                        the past 3 months
                      </label>
                    </div>

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="complianceDifficulty"
                        name="riskForHospitalization"
                        type="checkbox"
                        value="complianceDifficulty"
                        checked={formData?.riskForHospitalization?.includes(
                          "complianceDifficulty"
                        )}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="complianceDifficulty"
                        className="form-check-label"
                      >
                        Reported or observed history of difficulty complying
                        with any medical instructions in the past 3 months
                      </label>
                    </div>

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="medications"
                        name="riskForHospitalization"
                        type="checkbox"
                        value="medications"
                        checked={formData?.riskForHospitalization?.includes(
                          "medications"
                        )}
                        className="form-check-input"
                      />
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="medications"
                        className="form-check-label"
                      >
                        Currently taking 5 or more medications
                      </label>
                    </div>

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="exhaustion"
                        name="riskForHospitalization"
                        type="checkbox"
                        value="exhaustion"
                        checked={formData?.riskForHospitalization?.includes(
                          "exhaustion"
                        )}
                        className="form-check-input"
                      />
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="exhaustion"
                        className="form-check-label"
                      >
                        Currently reports exhaustion
                      </label>
                    </div>

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="otherRisks"
                        name="riskForHospitalization"
                        type="checkbox"
                        value="otherRisks"
                        checked={formData?.riskForHospitalization?.includes(
                          "otherRisks"
                        )}
                        className="form-check-input"
                      />
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="otherRisks"
                        className="form-check-label"
                      >
                        Other risk(s) not listed in 1-8
                      </label>
                    </div>

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="none"
                        name="riskForHospitalization"
                        type="checkbox"
                        value="none"
                        checked={formData?.riskForHospitalization?.includes(
                          "none"
                        )}
                        className="form-check-input"
                      />
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="none"
                        className="form-check-label"
                      >
                        None of the above
                      </label>
                    </div>
                  </div>
                </td>
                <td>
                  {/* J0510. Pain Effect on Sleep */}
                  <div className="  col">
                    <label
                      style={{ fontSize: "12px" }}
                      htmlFor="painEffectOnSleep"
                      className="form-label mr-2"
                    >
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
                      <div
                        key={value}
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          id={`painEffectOnSleep-${value}`}
                          name="painEffectOnSleep"
                          type="radio"
                          value={value}
                          checked={formData?.painEffectOnSleep === value}
                          className="form-check-input"
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          htmlFor={`painEffectOnSleep-${value}`}
                          className="form-check-label"
                        >
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* J0520. Pain Interference with Therapy Activities */}
                  <div className="  col">
                    <label
                      style={{ fontSize: "12px" }}
                      htmlFor="painInterferenceWithTherapy"
                      className="form-label mr-2"
                    >
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
                      <div
                        key={value}
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
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
                          style={{ fontSize: "12px" }}
                          htmlFor={`painInterferenceWithTherapy-${value}`}
                          className="form-check-label"
                        >
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>
                </td>
                <td>
                  {/* J0530. Pain Interference with Day-to-Day Activities */}
                  <div className="  col">
                    <label
                      style={{ fontSize: "12px" }}
                      htmlFor="painInterferenceWithActivities"
                      className="form-label mr-2"
                    >
                      J0530. Pain Interference with Day-to-Day Activities
                    </label>
                    {[
                      { label: "Rarely or not at all", value: "1" },
                      { label: "Occasionally", value: "2" },
                      { label: "Frequently", value: "3" },
                      { label: "Almost constantly", value: "4" },
                      { label: "Unable to answer", value: "8" },
                    ]?.map(({ label, value }) => (
                      <div
                        key={value}
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
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
                          style={{ fontSize: "12px" }}
                          htmlFor={`painInterferenceWithActivities-${value}`}
                          className="form-check-label"
                        >
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* J1800. Any Falls Since SOC/ROC */}
                  <div className="  col">
                    <label
                      style={{ fontSize: "11px" }}
                      htmlFor="fallsSinceSOCROC"
                      className="form-label mr-2"
                    >
                      J1800. Any Falls Since SOC/ROC
                    </label>
                    {[
                      { label: "No", value: "0" },
                      { label: "Yes", value: "1" },
                    ]?.map(({ label, value }) => (
                      <div
                        key={value}
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          id={`fallsSinceSOCROC-${value}`}
                          name="fallsSinceSOCROC"
                          type="radio"
                          value={value}
                          checked={formData?.fallsSinceSOCROC === value}
                          className="form-check-input"
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          htmlFor={`fallsSinceSOCROC-${value}`}
                          className="form-check-label"
                        >
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* J1900. Number of Falls Since SOC/ROC */}
                  {formData?.fallsSinceSOCROC === "1" && (
                    <div className="  col">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="fallsDetails"
                        className="form-label mr-2"
                      >
                        J1900. Number of Falls Since SOC/ROC
                      </label>
                      {[
                        { label: "No injury", value: "noInjury" },
                        {
                          label: "Injury (except major)",
                          value: "injury",
                        },
                        { label: "Major injury", value: "majorInjury" },
                      ]?.map(({ label, value }) => (
                        <div
                          key={value}
                          style={{
                            minHight: 0,
                            margin: 0,
                            padding: "0px 0px 0px auto",
                          }}
                          className="form-check d-flex align-items-cener gap-1"
                        >
                          <input
                            id={`fallsDetails-${value}`}
                            name="fallsDetails"
                            type="radio"
                            value={value}
                            checked={formData?.fallsDetails === value}
                            className="form-check-input"
                          />
                          <label
                            style={{ fontSize: "12px" }}
                            htmlFor={`fallsDetails-${value}`}
                            className="form-check-label"
                          >
                            {label}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* M1400. When is the patient dyspneic or noticeably Short of Breath? */}
                  <div className="  col">
                    <label
                      style={{ fontSize: "11px" }}
                      htmlFor="shortOfBreath"
                      className="form-label mr-2"
                    >
                      M1400. When is the patient dyspneic or noticeably Short of
                      Breath?
                    </label>
                    {[
                      {
                        label: "Patient is not short of breath",
                        value: "0",
                      },
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
                      {
                        label: "At rest (during day or night)",
                        value: "4",
                      },
                    ]?.map(({ label, value }) => (
                      <div
                        key={value}
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          id={`shortOfBreath-${value}`}
                          name="shortOfBreath"
                          type="radio"
                          value={value}
                          checked={formData?.shortOfBreath === value}
                          className="form-check-input"
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          htmlFor={`shortOfBreath-${value}`}
                          className="form-check-label"
                        >
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <h6
                    style={{
                      // border: "1px solid gray",
                      padding: "5px",
                      margin: "5px 0px",
                      fontSize: "11px",
                      textAlign: "center",
                      backgroundColor: "#eee",
                    }}
                    className=""
                  >
                    Swallowing/Nutritional Status
                  </h6>
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <div className="  col">
                    <label
                      style={{ fontSize: "11px" }}
                      htmlFor="height"
                      className="form-label mr-2"
                    >
                      M1060. Height (in inches)
                    </label>
                    {formData?.height || "N/A"}
                  </div>
                  <div className="  col">
                    <label
                      style={{ fontSize: "11px" }}
                      htmlFor="weight"
                      className="form-label mr-2"
                    >
                      M1060. Weight (in pounds)
                    </label>
                    {formData?.weight || "N/A"}
                  </div>
                  <label
                    style={{ fontSize: "12px" }}
                    className="form-label mr-2"
                  >
                    K0520. Nutritional Approaches
                  </label>
                  <div className="  col">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      On Admission
                    </label>

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="onAdmission-parenteralIVFeeding"
                        name="nutritionalApproachesOnAdmission"
                        type="checkbox"
                        value="parenteralIVFeeding"
                        checked={formData?.nutritionalApproachesOnAdmission?.includes(
                          "parenteralIVFeeding"
                        )}
                        className="form-check-input"
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        htmlFor="onAdmission-parenteralIVFeeding"
                        className="form-check-label"
                      >
                        Parenteral/IV feeding
                      </label>
                    </div>

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="onAdmission-feedingTube"
                        name="nutritionalApproachesOnAdmission"
                        type="checkbox"
                        value="feedingTube"
                        checked={formData?.nutritionalApproachesOnAdmission?.includes(
                          "feedingTube"
                        )}
                        className="form-check-input"
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        htmlFor="onAdmission-feedingTube"
                        className="form-check-label"
                      >
                        Feeding tube (e.g., nasogastric or abdominal (PEG))
                      </label>
                    </div>

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="onAdmission-mechanicallyAlteredDiet"
                        name="nutritionalApproachesOnAdmission"
                        type="checkbox"
                        value="mechanicallyAlteredDiet"
                        checked={formData?.nutritionalApproachesOnAdmission?.includes(
                          "mechanicallyAlteredDiet"
                        )}
                        className="form-check-input"
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        htmlFor="onAdmission-mechanicallyAlteredDiet"
                        className="form-check-label"
                      >
                        Mechanically altered diet (e.g., pureed food, thickened
                        liquids)
                      </label>
                    </div>

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="onAdmission-therapeuticDiet"
                        name="nutritionalApproachesOnAdmission"
                        type="checkbox"
                        value="therapeuticDiet"
                        checked={formData?.nutritionalApproachesOnAdmission?.includes(
                          "therapeuticDiet"
                        )}
                        className="form-check-input"
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        htmlFor="onAdmission-therapeuticDiet"
                        className="form-check-label"
                      >
                        Therapeutic diet (e.g., low salt, diabetic, low
                        cholesterol)
                      </label>
                    </div>

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="onAdmission-none"
                        name="nutritionalApproachesOnAdmission"
                        type="checkbox"
                        value="none"
                        checked={formData?.nutritionalApproachesOnAdmission?.includes(
                          "none"
                        )}
                        className="form-check-input"
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        htmlFor="onAdmission-none"
                        className="form-check-label"
                      >
                        None of the above
                      </label>
                    </div>
                  </div>
                </td>
                <td>
                  {/* Nutritional Approaches */}
                  <div className="  col">
                    <div>
                      <div className="  col">
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-label mr-2"
                        >
                          Last 7 Days
                        </label>

                        <div
                          style={{
                            minHight: 0,
                            margin: 0,
                            padding: "0px 0px 0px auto",
                          }}
                          className="form-check d-flex align-items-cener gap-1"
                        >
                          <input
                            id="last7Days-parenteralIVFeeding"
                            name="nutritionalApproachesLast7Days"
                            type="checkbox"
                            value="parenteralIVFeeding"
                            checked={formData?.nutritionalApproachesLast7Days?.includes(
                              "parenteralIVFeeding"
                            )}
                            className="form-check-input"
                          />
                          <label
                            style={{ fontSize: "12px" }}
                            htmlFor="last7Days-parenteralIVFeeding"
                            className="form-check-label"
                          >
                            Parenteral/IV feeding
                          </label>
                        </div>

                        <div
                          style={{
                            minHight: 0,
                            margin: 0,
                            padding: "0px 0px 0px auto",
                          }}
                          className="form-check d-flex align-items-cener gap-1"
                        >
                          <input
                            id="last7Days-feedingTube"
                            name="nutritionalApproachesLast7Days"
                            type="checkbox"
                            value="feedingTube"
                            checked={formData?.nutritionalApproachesLast7Days?.includes(
                              "feedingTube"
                            )}
                            className="form-check-input"
                          />
                          <label
                            style={{ fontSize: "12px" }}
                            htmlFor="last7Days-feedingTube"
                            className="form-check-label"
                          >
                            Feeding tube (e.g., nasogastric or abdominal (PEG))
                          </label>
                        </div>

                        <div
                          style={{
                            minHight: 0,
                            margin: 0,
                            padding: "0px 0px 0px auto",
                          }}
                          className="form-check d-flex align-items-cener gap-1"
                        >
                          <input
                            id="last7Days-mechanicallyAlteredDiet"
                            name="nutritionalApproachesLast7Days"
                            type="checkbox"
                            value="mechanicallyAlteredDiet"
                            checked={formData?.nutritionalApproachesLast7Days?.includes(
                              "mechanicallyAlteredDiet"
                            )}
                            className="form-check-input"
                          />
                          <label
                            style={{ fontSize: "12px" }}
                            htmlFor="last7Days-mechanicallyAlteredDiet"
                            className="form-check-label"
                          >
                            Mechanically altered diet (e.g., pureed food,
                            thickened liquids)
                          </label>
                        </div>

                        <div
                          style={{
                            minHight: 0,
                            margin: 0,
                            padding: "0px 0px 0px auto",
                          }}
                          className="form-check d-flex align-items-cener gap-1"
                        >
                          <input
                            id="last7Days-therapeuticDiet"
                            name="nutritionalApproachesLast7Days"
                            type="checkbox"
                            value="therapeuticDiet"
                            checked={formData?.nutritionalApproachesLast7Days?.includes(
                              "therapeuticDiet"
                            )}
                            className="form-check-input"
                          />
                          <label
                            style={{ fontSize: "12px" }}
                            htmlFor="last7Days-therapeuticDiet"
                            className="form-check-label"
                          >
                            Therapeutic diet (e.g., low salt, diabetic, low
                            cholesterol)
                          </label>
                        </div>

                        <div
                          style={{
                            minHight: 0,
                            margin: 0,
                            padding: "0px 0px 0px auto",
                          }}
                          className="form-check d-flex align-items-cener gap-1"
                        >
                          <input
                            id="last7Days-none"
                            name="nutritionalApproachesLast7Days"
                            type="checkbox"
                            value="none"
                            checked={formData?.nutritionalApproachesLast7Days?.includes(
                              "none"
                            )}
                            className="form-check-input"
                          />
                          <label
                            style={{ fontSize: "12px" }}
                            htmlFor="last7Days-none"
                            className="form-check-label"
                          >
                            None of the above
                          </label>
                        </div>
                      </div>

                      <div className="  col">
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-label mr-2"
                        >
                          At Discharge
                        </label>

                        <div
                          style={{
                            minHight: 0,
                            margin: 0,
                            padding: "0px 0px 0px auto",
                          }}
                          className="form-check d-flex align-items-cener gap-1"
                        >
                          <input
                            id="atDischarge-parenteralIVFeeding"
                            name="nutritionalApproachesAtDischarge"
                            type="checkbox"
                            value="parenteralIVFeeding"
                            checked={formData?.nutritionalApproachesAtDischarge?.includes(
                              "parenteralIVFeeding"
                            )}
                            className="form-check-input"
                          />
                          <label
                            style={{ fontSize: "12px" }}
                            htmlFor="atDischarge-parenteralIVFeeding"
                            className="form-check-label"
                          >
                            Parenteral/IV feeding
                          </label>
                        </div>

                        <div
                          style={{
                            minHight: 0,
                            margin: 0,
                            padding: "0px 0px 0px auto",
                          }}
                          className="form-check d-flex align-items-cener gap-1"
                        >
                          <input
                            id="atDischarge-feedingTube"
                            name="nutritionalApproachesAtDischarge"
                            type="checkbox"
                            value="feedingTube"
                            checked={formData?.nutritionalApproachesAtDischarge?.includes(
                              "feedingTube"
                            )}
                            className="form-check-input"
                          />
                          <label
                            style={{ fontSize: "12px" }}
                            htmlFor="atDischarge-feedingTube"
                            className="form-check-label"
                          >
                            Feeding tube (e.g., nasogastric or abdominal (PEG))
                          </label>
                        </div>

                        <div
                          style={{
                            minHight: 0,
                            margin: 0,
                            padding: "0px 0px 0px auto",
                          }}
                          className="form-check d-flex align-items-cener gap-1"
                        >
                          <input
                            id="atDischarge-mechanicallyAlteredDiet"
                            name="nutritionalApproachesAtDischarge"
                            type="checkbox"
                            value="mechanicallyAlteredDiet"
                            checked={formData?.nutritionalApproachesAtDischarge?.includes(
                              "mechanicallyAlteredDiet"
                            )}
                            className="form-check-input"
                          />
                          <label
                            style={{ fontSize: "12px" }}
                            htmlFor="atDischarge-mechanicallyAlteredDiet"
                            className="form-check-label"
                          >
                            Mechanically altered diet (e.g., pureed food,
                            thickened liquids)
                          </label>
                        </div>

                        <div
                          style={{
                            minHight: 0,
                            margin: 0,
                            padding: "0px 0px 0px auto",
                          }}
                          className="form-check d-flex align-items-cener gap-1"
                        >
                          <input
                            id="atDischarge-therapeuticDiet"
                            name="nutritionalApproachesAtDischarge"
                            type="checkbox"
                            value="therapeuticDiet"
                            checked={formData?.nutritionalApproachesAtDischarge?.includes(
                              "therapeuticDiet"
                            )}
                            className="form-check-input"
                          />
                          <label
                            style={{ fontSize: "12px" }}
                            htmlFor="atDischarge-therapeuticDiet"
                            className="form-check-label"
                          >
                            Therapeutic diet (e.g., low salt, diabetic, low
                            cholesterol)
                          </label>
                        </div>

                        <div
                          style={{
                            minHight: 0,
                            margin: 0,
                            padding: "0px 0px 0px auto",
                          }}
                          className="form-check d-flex align-items-cener gap-1"
                        >
                          <input
                            id="atDischarge-none"
                            name="nutritionalApproachesAtDischarge"
                            type="checkbox"
                            value="none"
                            checked={formData?.nutritionalApproachesAtDischarge?.includes(
                              "none"
                            )}
                            className="form-check-input"
                          />
                          <label
                            style={{ fontSize: "12px" }}
                            htmlFor="atDischarge-none"
                            className="form-check-label"
                          >
                            None of the above
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {" "}
                  {/* M1870. Feeding or Eating */}
                  <div className="  col">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      M1870. Feeding or Eating
                    </label>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="feedingOrEating0"
                        name="feedingOrEating"
                        type="radio"
                        value="0"
                        checked={formData?.feedingOrEating === "0"}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="feedingOrEating0"
                        className="form-check-label"
                      >
                        Able to independently feed self
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="feedingOrEating1"
                        name="feedingOrEating"
                        type="radio"
                        value="1"
                        checked={formData?.feedingOrEating === "1"}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="feedingOrEating1"
                        className="form-check-label"
                      >
                        Able to feed self independently but requires:
                        <ul>
                          <li>Meal set-up; OR</li>
                          <li>
                            Intermittent assistance or supervision from another
                            person; OR
                          </li>
                          <li>A liquid, pureed, or ground meat diet.</li>
                        </ul>
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="feedingOrEating2"
                        name="feedingOrEating"
                        type="radio"
                        value="2"
                        checked={formData?.feedingOrEating === "2"}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="feedingOrEating2"
                        className="form-check-label"
                      >
                        Unable to feed self and must be assisted or supervised
                        throughout the meal/snack.
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="feedingOrEating3"
                        name="feedingOrEating"
                        type="radio"
                        value="3"
                        checked={formData?.feedingOrEating === "3"}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="feedingOrEating3"
                        className="form-check-label"
                      >
                        Able to take in nutrients orally and receives
                        supplemental nutrients through a nasogastric tube or
                        gastrostomy.
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="feedingOrEating4"
                        name="feedingOrEating"
                        type="radio"
                        value="4"
                        checked={formData?.feedingOrEating === "4"}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="feedingOrEating4"
                        className="form-check-label"
                      >
                        Unable to take in nutrients orally and is fed nutrients
                        through a nasogastric tube or gastrostomy.
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        id="feedingOrEating5"
                        name="feedingOrEating"
                        type="radio"
                        value="5"
                        checked={formData?.feedingOrEating === "5"}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="feedingOrEating5"
                        className="form-check-label"
                      >
                        Unable to take in nutrients orally or by tube feeding.
                      </label>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <h6
                    style={{
                      // border: "1px solid gray",
                      padding: "5px",
                      margin: "5px 0px",
                      fontSize: "11px",
                      textAlign: "center",
                      backgroundColor: "#eee",
                    }}
                    className=""
                  >
                    Skin Conditions
                  </h6>
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <div className="  col">
                    <h6 style={{ fontSize: "12px" }}>
                      1306. Does this patient have at least one Unhealed
                      Pressure Ulcer/Injury at Stage 2 or Higher or designated
                      as Unstageable?
                    </h6>
                    <p>
                      (Excludes Stage 1 pressure injuries and all healed
                      pressure ulcers/injuries)
                    </p>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="m1306"
                        value="0"
                        checked={formData?.m1306 === "0"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        0. No
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="m1306"
                        value="1"
                        checked={formData?.m1306 === "1"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        1. Yes
                      </label>
                    </div>
                  </div>
                  {/* m1307 */}
                  <div className="  col">
                    <h6 style={{ fontSize: "12px" }}>
                      M1307. The Oldest Stage 2 Pressure Ulcer that is present
                      at discharge:
                    </h6>
                    <p>(Excludes healed Stage 2 pressure ulcers)</p>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="m1307"
                        value="1"
                        checked={formData?.m1307 === "1"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        1. Was present at the most recent SOC/ROC assessment
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="m1307"
                        value="2"
                        checked={formData?.m1307 === "2"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        2. Developed since the most recent SOC/ROC assessment
                      </label>
                    </div>
                    <div className="form-group">
                      <label>
                        Record date pressure ulcer first identified:
                      </label>
                      <div className="  col">
                        <div className="form-group">
                          <label>Date:</label>
                          {formData?.firstIdentifiedDate || "N/A"}
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="m1307"
                        value="NA"
                        checked={formData?.m1307 === "NA"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        NA. No Stage 2 pressure ulcers are present at discharge
                      </label>
                    </div>
                  </div>{" "}
                  {/* m1311: Stage 2 */}
                  <div className="  col">
                    <h6 style={{ fontSize: "12px" }}>
                      M1311: Current Number of Unhealed Pressure Ulcers/Injuries
                    </h6>
                    <h6 style={{ fontSize: "12px" }}>A1. Stage 2</h6>
                    <p>
                      Partial thickness loss of dermis presenting as a shallow
                      open ulcer with a red or pink wound bed, without slough.
                      May also present as an intact or open/ruptured blister.
                    </p>
                    <div className="form-group">
                      <label>Number of Stage 2 pressure ulcers:</label>
                      {formData.stage2Current || "N/A"}
                    </div>
                    <div className="form-group">
                      <label>
                        Number of these Stage 2 pressure ulcers that were
                        present at most recent SOC/ROC:
                      </label>
                      {formData.stage2PresentAtSOC || "N/A"}
                    </div>
                  </div>
                  {/* m1311: Stage 3 */}
                  <div className="  col">
                    <h6 style={{ fontSize: "12px" }}>B1. Stage 3</h6>
                    <p>
                      Full thickness tissue loss. Subcutaneous fat may be
                      visible but bone, tendon, or muscle is not exposed. Slough
                      may be present but does not obscure the depth of tissue
                      loss. May include undermining and tunneling.
                    </p>
                    <div className="form-group">
                      <label>Number of Stage 3 pressure ulcers:</label>
                      {formData.stage3Current || "N/A"}
                    </div>
                    <div className="form-group">
                      <label>
                        Number of these Stage 3 pressure ulcers that were
                        present at most recent SOC/ROC:
                      </label>
                      {formData.stage3PresentAtSOC || "N/A"}
                    </div>
                  </div>
                  {/* m1311: Stage 4 */}
                  <div className="  col">
                    <h6 style={{ fontSize: "12px" }}>C1. Stage 4</h6>
                    <p>
                      Full thickness tissue loss with exposed bone, tendon, or
                      muscle. Slough or eschar may be present on some parts of
                      the wound bed. Often includes undermining and tunneling.
                    </p>
                    <div className="form-group">
                      <label>Number of Stage 4 pressure ulcers:</label>
                      {formData.stage4Current || "N/A"}
                    </div>
                    <div className="form-group">
                      <label>
                        Number of these Stage 4 pressure ulcers that were
                        present at most recent SOC/ROC:
                      </label>
                      {formData.stage4PresentAtSOC || "N/A"}
                    </div>
                  </div>
                  {/* m1311: Unstageable: Non-removable dressing/device */}
                  <div className="  col">
                    <h6 style={{ fontSize: "12px" }}>
                      D1. Unstageable: Non-removable dressing/device
                    </h6>
                    <p>
                      Known but not stageable due to non-removable
                      dressing/device
                    </p>
                    <div className="form-group">
                      <label>
                        Number of unstageable pressure ulcers/injuries:
                      </label>
                      {formData.unstageableDressingCurrent || "N/A"}
                    </div>
                    <div className="form-group">
                      <label>
                        Number of these unstageable pressure ulcers/injuries
                        that were present at most recent SOC/ROC:
                      </label>
                      {formData?.unstageableDressingPresentAtSOC || "N/A"}
                    </div>
                  </div>
                </td>
                <td>
                  {/* m1311: Unstageable: Slough and/or eschar */}
                  <div className="  col">
                    <h6 style={{ fontSize: "12px" }}>
                      E1. Unstageable: Slough and/or eschar
                    </h6>
                    <p>
                      Known but not stageable due to coverage of wound bed by
                      slough and/or eschar
                    </p>
                    <div className="form-group">
                      <label>Number of unstageable pressure ulcers:</label>
                      {formData.unstageableSloughCurrent || "N/A"}
                    </div>
                    <div className="form-group">
                      <label>
                        Number of these unstageable pressure ulcers/injuries
                        that were present at most recent SOC/ROC:
                      </label>
                      {formData.unstageableSloughPresentAtSOC || "N/A"}
                    </div>
                  </div>
                  {/* m1311: Unstageable: Deep tissue injury */}
                  <div className="  col">
                    <h6 style={{ fontSize: "12px" }}>
                      F1. Unstageable: Deep tissue injury
                    </h6>
                    <p>
                      Number of unstageable pressure injuries presenting as deep
                      tissue injury
                    </p>
                    <div className="form-group">
                      <label>Number of unstageable pressure injuries:</label>
                      {formData.deepTissueInjuryCurrent || "N/A"}
                    </div>
                    <div className="form-group">
                      <label>
                        Number of these unstageable pressure injuries that were
                        present at most recent SOC/ROC:
                      </label>
                      {formData.deepTissueInjuryPresentAtSOC || "N/A"}
                    </div>
                  </div>

                  {/* m1322 */}
                  <div className="  col">
                    <h6 style={{ fontSize: "12px" }}>
                      M1322. Current Number of Stage 1 Pressure Injuries
                    </h6>
                    <p>
                      Intact skin with non-blanchable redness of a localized
                      area usually over a bony prominence. Darkly pigmented skin
                      may not have a visible blanching; in dark skin tones only,
                      it may appear with persistent blue or purple hues.
                    </p>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="m1322"
                        value="0"
                        checked={formData?.m1322 === "0"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        0. Zero
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="m1322"
                        value="1"
                        checked={formData?.m1322 === "1"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        1. One
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="m1322"
                        value="2"
                        checked={formData?.m1322 === "2"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        2. Two
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="m1322"
                        value="3"
                        checked={formData?.m1322 === "3"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        3. Three
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="m1322"
                        value="4"
                        checked={formData?.m1322 === "4"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        4. Four or more
                      </label>
                    </div>
                  </div>

                  {/* m1324 */}
                  <div className="  col">
                    <h6 style={{ fontSize: "12px" }}>
                      M1324. Stage of Most Problematic Unhealed Pressure
                      Ulcer/Injury that is Stageable
                    </h6>
                    <p>
                      Excludes pressure ulcer/injury that cannot be staged due
                      to a non-removable dressing/device, coverage of wound bed
                      by slough and/or eschar, or deep tissue injury.
                    </p>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="m1324"
                        value="1"
                        checked={formData?.m1324 === "1"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        1. Stage 1
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="m1324"
                        value="2"
                        checked={formData?.m1324 === "2"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        2. Stage 2
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="m1324"
                        value="3"
                        checked={formData?.m1324 === "3"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        3. Stage 3
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="m1324"
                        value="4"
                        checked={formData?.m1324 === "4"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        4. Stage 4
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="m1324"
                        value="NA"
                        checked={formData?.m1324 === "NA"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        NA. Patient has no pressure ulcers/injuries or no
                        stageable pressure ulcers/injuries
                      </label>
                    </div>
                  </div>
                </td>
                <td>
                  {/* m1330 */}
                  <div className="mb-3  col">
                    <h6 style={{ fontSize: "12px" }}>
                      M1330. Does this patient have a Stasis Ulcer?
                    </h6>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="m1330"
                        value="0"
                        checked={formData?.m1330 === "0"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        0. No
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="m1330"
                        value="1"
                        checked={formData?.m1330 === "1"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        1. Yes, patient has BOTH observable and unobservable
                        stasis ulcers
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="m1330"
                        value="2"
                        checked={formData?.m1330 === "2"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        2. Yes, patient has observable stasis ulcers ONLY
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="m1330"
                        value="3"
                        checked={formData?.m1330 === "3"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        3. Yes, patient has unobservable stasis ulcers ONLY
                        (known but not observable due to non-removable
                        dressing/device)
                      </label>
                    </div>
                  </div>

                  {/* m1332 */}
                  <div className="mb-3  col">
                    <h6 style={{ fontSize: "12px" }}>
                      M1332. Current Number of Stasis Ulcer(s) that are
                      Observable
                    </h6>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="m1332"
                        value="1"
                        checked={formData?.m1332 === "1"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        1. One
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="m1332"
                        value="2"
                        checked={formData?.m1332 === "2"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        2. Two
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="m1332"
                        value="3"
                        checked={formData?.m1332 === "3"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        3. Three
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="m1332"
                        value="4"
                        checked={formData?.m1332 === "4"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        4. Four or more
                      </label>
                    </div>
                  </div>

                  {/* m1334 */}
                  <div className="mb-3  col">
                    <h6 style={{ fontSize: "12px" }}>
                      M1334. Status of Most Problematic Stasis Ulcer that is
                      Observable
                    </h6>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="m1334"
                        value="1"
                        checked={formData?.m1334 === "1"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        1. Fully granulating
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="m1334"
                        value="2"
                        checked={formData?.m1334 === "2"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        2. Early/partial granulation
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="m1334"
                        value="3"
                        checked={formData?.m1334 === "3"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        3. Not healing
                      </label>
                    </div>
                  </div>

                  {/* m1340 */}
                  <div className="mb-3  col">
                    <h6 style={{ fontSize: "12px" }}>
                      M1340. Does this patient have a Surgical Wound?
                    </h6>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="m1340"
                        value="0"
                        checked={formData?.m1340 === "0"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        0. No
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="m1340"
                        value="1"
                        checked={formData?.m1340 === "1"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        1. Yes, patient has at least one observable surgical
                        wound
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="m1340"
                        value="2"
                        checked={formData?.m1340 === "2"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        2. Surgical wound known but not observable due to
                        non-removable dressing/device
                      </label>
                    </div>
                  </div>

                  {/* m1342 */}
                  <div className="mb-3  col">
                    <h6 style={{ fontSize: "12px" }}>
                      M1342. Status of Most Problematic Surgical Wound that is
                      Observable
                    </h6>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="m1342"
                        value="0"
                        checked={formData?.m1342 === "0"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        0. Newly epithelialized
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="m1342"
                        value="1"
                        checked={formData?.m1342 === "1"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        1. Fully granulating
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="m1342"
                        value="2"
                        checked={formData?.m1342 === "2"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        2. Early/partial granulation
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="m1342"
                        value="3"
                        checked={formData?.m1342 === "3"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        3. Not healing
                      </label>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  {" "}
                  <h6
                    style={{
                      // border: "1px solid gray",
                      padding: "5px",
                      margin: "5px 0px",
                      fontSize: "11px",
                      textAlign: "center",
                      backgroundColor: "#eee",
                    }}
                    className=""
                  >
                    Medications
                  </h6>
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <div className="mb-3  col">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      N0415. High-Risk Drug Classes: Use and Indication
                    </label>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        A. Antipsychotic
                      </label>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={
                            formData?.highRiskDrugs?.antipsychotic?.isTaking
                          }
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          Is Taking
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={
                            formData?.highRiskDrugs?.antipsychotic
                              ?.indicationNoted
                          }
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          Indication Noted
                        </label>
                      </div>
                    </div>

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        E. Anticoagulant
                      </label>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={
                            formData?.highRiskDrugs?.anticoagulant?.isTaking
                          }
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          Is Taking
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={
                            formData?.highRiskDrugs?.anticoagulant
                              ?.indicationNoted
                          }
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          Indication Noted
                        </label>
                      </div>
                    </div>

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        F. Antibiotic
                      </label>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={
                            formData?.highRiskDrugs?.antibiotic?.isTaking
                          }
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          Is Taking
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={
                            formData?.highRiskDrugs?.antibiotic?.indicationNoted
                          }
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          Indication Noted
                        </label>
                      </div>
                    </div>

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        H. Opioid
                      </label>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={formData?.highRiskDrugs?.opioid?.isTaking}
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          Is Taking
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={
                            formData?.highRiskDrugs?.opioid.indicationNoted
                          }
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          Indication Noted
                        </label>
                      </div>
                    </div>

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        I. Antiplatelet
                      </label>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={
                            formData?.highRiskDrugs?.antiplatelet?.isTaking
                          }
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          Is Taking
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={
                            formData?.highRiskDrugs?.antiplatelet
                              .indicationNoted
                          }
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          Indication Noted
                        </label>
                      </div>
                    </div>

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        J. Hypoglycemic (including insulin)
                      </label>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={
                            formData?.highRiskDrugs?.hypoglycemic?.isTaking
                          }
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          Is Taking
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={
                            formData?.highRiskDrugs?.hypoglycemic
                              ?.indicationNoted
                          }
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          Indication Noted
                        </label>
                      </div>
                    </div>

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        Z. None of the above
                      </label>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={formData?.highRiskDrugs?.none?.isTaking}
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          Is Taking
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* M2001. Drug Regimen Review */}
                  <div className="mb-3  col">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      M2001. Drug Regimen Review
                    </label>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="drugRegimenReview"
                        value="0"
                        checked={formData?.drugRegimenReview === "0"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        No — No issues found during review
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="drugRegimenReview"
                        value="1"
                        checked={formData?.drugRegimenReview === "1"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        Yes — Issues found during review
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="drugRegimenReview"
                        value="9"
                        checked={formData?.drugRegimenReview === "9"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        NA — Patient is not taking any medications
                      </label>
                    </div>
                  </div>
                </td>
                <td>
                  {/* M2003. Medication Follow-up */}
                  <div className="mb-3  col">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      M2003. Medication Follow-up
                    </label>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="medicationFollowUp"
                        value="0"
                        checked={formData?.medicationFollowUp === "0"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        No
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="medicationFollowUp"
                        value="1"
                        checked={formData?.medicationFollowUp === "1"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        Yes
                      </label>
                    </div>
                  </div>

                  {/* M2005. Medication Intervention */}
                  <div className="mb-3  col">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      M2005. Medication Intervention
                    </label>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="medicationIntervention"
                        value="0"
                        checked={formData?.medicationIntervention === "0"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        No
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="medicationIntervention"
                        value="1"
                        checked={formData?.medicationIntervention === "1"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        Yes
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="medicationIntervention"
                        value="9"
                        checked={formData?.medicationIntervention === "9"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        NA — No potential issues identified or patient is not
                        taking any medications
                      </label>
                    </div>
                  </div>

                  {/* M2010. Patient/Caregiver High-Risk Drug Education */}
                  <div className="mb-3  col">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      M2010. Patient/Caregiver High-Risk Drug Education
                    </label>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="highRiskDrugEducation"
                        value="0"
                        checked={formData?.highRiskDrugEducation === "0"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        No
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="highRiskDrugEducation"
                        value="1"
                        checked={formData?.highRiskDrugEducation === "1"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        Yes
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="highRiskDrugEducation"
                        value="NA"
                        checked={formData?.highRiskDrugEducation === "NA"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        NA — No high-risk drugs or fully knowledgeable
                      </label>
                    </div>
                  </div>
                </td>
                <td>
                  {" "}
                  {/* M2020. Management of Oral Medications */}
                  <div className="mb-3  col">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      M2020. Management of Oral Medications
                    </label>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="managementOralMedications"
                        value="0"
                        checked={formData?.managementOralMedications === "0"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        Able to independently take the correct medication(s)
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="managementOralMedications"
                        value="1"
                        checked={formData?.managementOralMedications === "1"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        Able to take medication(s) if prepared in advance or if
                        using a drug diary/chart
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="managementOralMedications"
                        value="2"
                        checked={formData?.managementOralMedications === "2"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        Able to take medication(s) if given reminders
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="managementOralMedications"
                        value="3"
                        checked={formData?.managementOralMedications === "3"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        Unable to take medication unless administered by another
                        person
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="managementOralMedications"
                        value="NA"
                        checked={formData?.managementOralMedications === "NA"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        NA — No oral medications prescribed
                      </label>
                    </div>
                  </div>
                  {/* M2030. Management of Injectable Medications */}
                  <div className="mb-3  col">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      M2030. Management of Injectable Medications
                    </label>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="managementInjectableMedications"
                        value="0"
                        checked={
                          formData?.managementInjectableMedications === "0"
                        }
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        Able to independently take the correct medication(s)
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="managementInjectableMedications"
                        value="1"
                        checked={
                          formData?.managementInjectableMedications === "1"
                        }
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        Able to take medication(s) if syringes are prepared in
                        advance or if using a drug diary/chart
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="managementInjectableMedications"
                        value="2"
                        checked={
                          formData?.managementInjectableMedications === "2"
                        }
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        Able to take medication(s) if given reminders
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="managementInjectableMedications"
                        value="3"
                        checked={
                          formData?.managementInjectableMedications === "3"
                        }
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        Unable to take medication unless administered by another
                        person
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="managementInjectableMedications"
                        value="NA"
                        checked={
                          formData?.managementInjectableMedications === "NA"
                        }
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        NA — No injectable medications prescribed
                      </label>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <h6
                    style={{
                      // border: "1px solid gray",
                      padding: "5px",
                      margin: "5px 0px",
                      fontSize: "11px",
                      textAlign: "center",
                      backgroundColor: "#eee",
                    }}
                    className=""
                  >
                    Special Treatments, Procedures, and Programs
                  </h6>
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <div className="mb-3  col">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      O0110. Special Treatments, Procedures, and Programs
                      (Admission)
                    </label>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="chemotherapy"
                        name="specialTreatmentsAdmission"
                        checked={formData?.specialTreatmentsAdmission?.includes(
                          "chemotherapy"
                        )}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        A1. Chemotherapy
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="radiation"
                        name="specialTreatmentsAdmission"
                        checked={formData?.specialTreatmentsAdmission?.includes(
                          "radiation"
                        )}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        B1. Radiation
                      </label>
                    </div>

                    {/* Repeat similar blocks for other treatments, procedures, and programs on admission */}
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="specialTreatmentsAdmission"
                        value="noneOfTheAbove"
                        checked={formData?.specialTreatmentsAdmission?.includes(
                          "noneOfTheAbove"
                        )}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        Z1. None of the Above
                      </label>
                    </div>
                  </div>
                </td>
                <td>
                  {" "}
                  <div className="mb-3  col">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      O0110. Special Treatments, Procedures, and Programs
                      (Discharge)
                    </label>

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="chemotherapy"
                        name="specialTreatmentsDischarge"
                        checked={formData?.specialTreatmentsDischarge?.includes(
                          "chemotherapy"
                        )}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        A1. Chemotherapy
                      </label>
                    </div>

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="radiation"
                        name="specialTreatmentsDischarge"
                        checked={formData?.specialTreatmentsDischarge?.includes(
                          "radiation"
                        )}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        B1. Radiation
                      </label>
                    </div>

                    {/* Repeat similar blocks for other treatments, procedures, and programs on discharge */}

                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="noneOfTheAbove"
                        name="specialTreatmentsDischarge"
                        checked={formData?.specialTreatmentsDischarge?.includes(
                          "noneOfTheAbove"
                        )}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        Z1. None of the Above
                      </label>
                    </div>
                  </div>
                </td>
                <td>
                  {" "}
                  {/* O0350. Patient’s COVID-19 vaccination is up to date */}
                  <div className="mb-3  col">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      O0350. Patient’s COVID-19 vaccination is up to date
                    </label>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="covidVaccinationUpToDate"
                        value="0"
                        checked={formData?.covidVaccinationUpToDate === "0"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        No, patient is not up to date
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="covidVaccinationUpToDate"
                        value="1"
                        checked={formData?.covidVaccinationUpToDate === "1"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        Yes, patient is up to date
                      </label>
                    </div>
                  </div>
                  {/* M1041. Influenza Vaccine Data Collection Period */}
                  <div className="mb-3  col">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      M1041. Influenza Vaccine Data Collection Period
                    </label>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="influenzaVaccinePeriod"
                        value="0"
                        checked={formData?.influenzaVaccinePeriod === "0"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        No
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="influenzaVaccinePeriod"
                        value="1"
                        checked={formData?.influenzaVaccinePeriod === "1"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        Yes
                      </label>
                    </div>
                  </div>
                  {/* M1046. Influenza Vaccine Received */}
                  {formData?.influenzaVaccinePeriod === "1" && (
                    <div className="mb-3  col">
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-label mr-2"
                      >
                        M1046. Influenza Vaccine Received
                      </label>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          type="radio"
                          className="form-check-input"
                          name="influenzaVaccineReceived"
                          value="1"
                          checked={formData?.influenzaVaccineReceived === "1"}
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          Yes; received from your agency during this episode of
                          care
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          type="radio"
                          className="form-check-input"
                          name="influenzaVaccineReceived"
                          value="2"
                          checked={formData?.influenzaVaccineReceived === "2"}
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          Yes; received from your agency during a prior episode
                          of care
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          type="radio"
                          className="form-check-input"
                          name="influenzaVaccineReceived"
                          value="3"
                          checked={formData?.influenzaVaccineReceived === "3"}
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          Yes; received from another health care provider
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          type="radio"
                          className="form-check-input"
                          name="influenzaVaccineReceived"
                          value="4"
                          checked={formData?.influenzaVaccineReceived === "4"}
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          No; patient offered and declined
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          type="radio"
                          className="form-check-input"
                          name="influenzaVaccineReceived"
                          value="5"
                          checked={formData?.influenzaVaccineReceived === "5"}
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          No; patient assessed and determined to have medical
                          contraindication(s)
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          type="radio"
                          className="form-check-input"
                          name="influenzaVaccineReceived"
                          value="6"
                          checked={formData?.influenzaVaccineReceived === "6"}
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          No; not indicated – patient does not meet
                          age/condition guidelines
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          type="radio"
                          className="form-check-input"
                          name="influenzaVaccineReceived"
                          value="7"
                          checked={formData?.influenzaVaccineReceived === "7"}
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          No; inability to obtain vaccine due to declared
                          shortage
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          type="radio"
                          className="form-check-input"
                          name="influenzaVaccineReceived"
                          value="8"
                          checked={formData?.influenzaVaccineReceived === "8"}
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          No; patient did not receive the vaccine due to other
                          reasons
                        </label>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <h6
                    style={{
                      // border: "1px solid gray",
                      padding: "5px",
                      margin: "5px 0px",
                      fontSize: "11px",
                      textAlign: "center",
                      backgroundColor: "#eee",
                    }}
                    className=""
                  >
                    Participation in assessment and setting{" "}
                  </h6>
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <label
                    style={{ fontSize: "12px" }}
                    className="form-label mr-2"
                  >
                    M2401. Intervention Synopsis
                  </label>
                  <div className="mb-3  col">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      b. Falls prevention interventions
                    </label>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="fallsPrevention"
                        value="0"
                        checked={formData?.fallsPrevention === "0"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        No
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="fallsPrevention"
                        value="1"
                        checked={formData?.fallsPrevention === "1"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        Yes
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="fallsPrevention"
                        value="NA"
                        checked={formData?.fallsPrevention === "NA"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        Not Applicable
                      </label>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="mb-3  col">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      c. Depression intervention(s)
                    </label>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="depressionIntervention"
                        value="0"
                        checked={formData?.depressionIntervention === "0"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        No
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="depressionIntervention"
                        value="1"
                        checked={formData?.depressionIntervention === "1"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        Yes
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="depressionIntervention"
                        value="NA"
                        checked={formData?.depressionIntervention === "NA"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        Not Applicable
                      </label>
                    </div>
                  </div>

                  <div className="mb-3  col">
                    <label
                      style={{ fontSize: "12px" }}
                      className="form-label mr-2"
                    >
                      d. Intervention(s) to monitor and mitigate pain
                    </label>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="painIntervention"
                        value="0"
                        checked={formData?.painIntervention === "0"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        No
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="painIntervention"
                        value="1"
                        checked={formData?.painIntervention === "1"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        Yes
                      </label>
                    </div>
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="painIntervention"
                        value="NA"
                        checked={formData?.painIntervention === "NA"}
                      />
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-check-label"
                      >
                        Not Applicable
                      </label>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="mb-3 row">
                    <div className="mb-3  col">
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-label mr-2"
                      >
                        e. Intervention(s) to prevent pressure ulcers
                      </label>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          type="radio"
                          className="form-check-input"
                          name="pressureUlcerPrevention"
                          value="0"
                          checked={formData?.pressureUlcerPrevention === "0"}
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          No
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          type="radio"
                          className="form-check-input"
                          name="pressureUlcerPrevention"
                          value="1"
                          checked={formData?.pressureUlcerPrevention === "1"}
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          Yes
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          type="radio"
                          className="form-check-input"
                          name="pressureUlcerPrevention"
                          value="NA"
                          checked={formData?.pressureUlcerPrevention === "NA"}
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          Not Applicable
                        </label>
                      </div>
                    </div>

                    <div className="mb-3  col">
                      <label
                        style={{ fontSize: "12px" }}
                        className="form-label mr-2"
                      >
                        f. Pressure ulcer treatment based on principles of moist
                        wound healing
                      </label>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          type="radio"
                          className="form-check-input"
                          name="pressureUlcerTreatment"
                          value="0"
                          checked={formData?.pressureUlcerTreatment === "0"}
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          No
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          type="radio"
                          className="form-check-input"
                          name="pressureUlcerTreatment"
                          value="1"
                          checked={formData?.pressureUlcerTreatment === "1"}
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          Yes
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          type="radio"
                          className="form-check-input"
                          name="pressureUlcerTreatment"
                          value="NA"
                          checked={formData?.pressureUlcerTreatment === "NA"}
                        />
                        <label
                          style={{ fontSize: "12px" }}
                          className="form-check-label"
                        >
                          Not Applicable
                        </label>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  {" "}
                  <h6
                    style={{
                      border: "1px solid gray",
                      padding: "5px",
                      margin: "5px 0px",
                      fontSize: "11px",
                      backgroundColor: "#eee",
                    }}
                  >
                    Payer Information
                  </h6>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="mb-1">
                    <div className="g-3">
                      <div className="col">
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="mbiNumber"
                          className="form-label d-block"
                        >
                          (M0063) Medicare Beneficiary Identifier (MBI) Number
                          <span className="text-danger">*</span>
                        </label>
                        {formPayerData?.mbiNumber}
                      </div>
                      <div className="col">
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="hicNumber"
                          className="form-label d-block"
                        >
                          Health Insurance Claim (HIC) Number
                        </label>
                        {formPayerData?.hicNumber}
                      </div>
                      <div className="col">
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="medicaidNumber"
                          className="form-label d-block"
                        >
                          Medicaid Number <span className="text-danger">*</span>
                        </label>
                        {formPayerData?.medicaidNumber}
                      </div>
                      <div className="col">
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="alternateMedicaidNumber"
                          className="form-label d-block"
                        >
                          Alternate Medicaid Number:
                        </label>
                        {formPayerData?.alternateMedicaidNumber}
                      </div>
                    </div>
                  </div>

                  {/* Insurance Information */}
                  <div className="mb-1">
                    <h6
                      style={{
                        fontSize: "11px",
                      }}
                    >
                      Insurance Information
                    </h6>

                    <div className="g-3">
                      <div className="col">
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="primaryInsurance"
                          className="form-label d-block"
                        >
                          Primary Insurance{" "}
                          <span className="text-danger">*</span>
                        </label>
                        {formPayerData?.primaryInsurance || "N/A"}
                      </div>
                      <div className="col">
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="secondaryInsurance"
                          className="form-label d-block"
                        >
                          Secondary Insurance:
                        </label>
                        {formPayerData?.secondaryInsurance || "N/A"}
                      </div>
                      <div className="col">
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="tertiaryInsurance"
                          className="form-label d-block"
                        >
                          Tertiary Insurance:
                        </label>
                        {formPayerData?.tertiaryInsurance || "N/A"}
                      </div>
                    </div>
                  </div>

                  {/* Payer Comments and Selected Templates */}
                  <div className="mb-1">
                    <div className="g-3">
                      <div className="col">
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="payerComments"
                          className="form-label hide-on-print"
                        >
                          Payer Comments:
                        </label>
                        {formPayerData?.payerComments || "N/A"}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="row">
                    {/* Additional UB-04 Locators */}
                    <div className="mb-1 col-md-4">
                      <h6
                        style={{
                          fontSize: "11px",
                        }}
                      >
                        Additional UB-04 Locators
                      </h6>

                      <p>(UB-04 Locators 31 - 34) Occurrence Codes</p>
                      <div className="g-3 ">
                        {formPayerData?.occurrenceCodes?.map((code, index) => (
                          <React.Fragment key={`occurrenceCode-${index}`}>
                            <div className="col ">
                              <label
                                style={{ fontSize: "10px" }}
                                htmlFor={`occurrenceCode${index + 1}A`}
                                className="form-label d-block"
                              >
                                {`${31 + Math.floor(index / 2)}A`} Occurrence
                                Code
                              </label>
                              {formPayerData?.occurrenceCodes[index]?.code ||
                                "N/A"}
                            </div>
                            <div className="col ">
                              <label
                                style={{ fontSize: "10px" }}
                                htmlFor={`occurrenceCode${index + 1}B`}
                                className="form-label d-block"
                              >
                                {`${31 + Math.floor(index / 2)}B`} Date
                              </label>
                              {formPayerData?.occurrenceCodes[index]?.date ||
                                "N/A"}
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    <div className="mb-1 col-md-4">
                      <p>(UB-04 Locators 35 - 36) Occurrence Spans</p>
                      <div className="g-3">
                        {formPayerData?.occurrenceSpans?.map((span, index) => (
                          <React.Fragment key={`occurrenceSpan-${index}`}>
                            <div className="col ">
                              <label
                                style={{ fontSize: "10px" }}
                                htmlFor={`occurrenceSpan${index + 1}A`}
                                className="form-label d-block"
                              >
                                {`${35 + Math.floor(index / 2)}A`} Occurrence
                                Span Code
                              </label>
                              {formPayerData?.occurrenceSpans[index]?.code ||
                                "N/A"}
                            </div>
                            <div className="col ">
                              <label
                                style={{ fontSize: "10px" }}
                                htmlFor={`occurrenceSpan${index + 1}B`}
                                className="form-label d-block"
                              >
                                {`${35 + Math.floor(index / 2)}B`} Occurrence
                                Span Start Date
                              </label>
                              {formPayerData?.occurrenceSpans[index]
                                ?.startDate || "N/A"}
                            </div>
                            <div className="col ">
                              <label
                                style={{ fontSize: "10px" }}
                                htmlFor={`occurrenceSpan${index + 1}C`}
                                className="form-label d-block"
                              >
                                {`${35 + Math.floor(index / 2)}C`} Occurrence
                                Span End Date
                              </label>
                              {formPayerData?.occurrenceSpans[index]?.endDate ||
                                "N/A"}
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    <div className="mb-1 col-md-4">
                      <p>(UB-04 Locators 39 - 41) Condition Codes</p>
                      <div className="g-3">
                        {formPayerData?.conditionCodes?.map((code, index) => (
                          <div key={`conditionCode-${index}`} className="col ">
                            <label
                              style={{ fontSize: "11px" }}
                              htmlFor={`conditionCode${index + 1}`}
                              className="form-label d-block"
                            >
                              {`${39 + index}`} Condition Code
                            </label>
                            {formPayerData?.conditionCodes[index] || "N/A"}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {" "}
                  {/* Payer Information */}
                  {/* Additional Form Fields */}
                  <div className="mb-1">
                    <h6
                      style={{
                        fontSize: "11px",
                      }}
                    >
                      Additional Form Fields
                    </h6>

                    <div className="g-3">
                      <div className="col ">
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="employmentRelated"
                          className="form-label d-block"
                        >
                          Employment Related:
                        </label>
                        {formPayerData?.employmentRelated || "N/A"}
                      </div>
                      <div className="col ">
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="autoAccident"
                          className="form-label d-block"
                        >
                          Auto Accident:
                        </label>
                        {formPayerData?.autoAccident || "N/A"}
                      </div>
                      <div className="col ">
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="claimCode"
                          className="form-label d-block"
                        >
                          Claim Code:
                        </label>
                        {formPayerData?.claimCode || "N/A"}
                      </div>
                      <div className="col ">
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="unableToWorkFrom"
                          className="form-label d-block"
                        >
                          Unable to Work From:
                        </label>
                        {formPayerData?.unableToWorkFrom || "N/A"}
                      </div>
                      <div className="col ">
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="unableToWorkTo"
                          className="form-label d-block"
                        >
                          Unable to Work To:
                        </label>
                        {formPayerData?.unableToWorkTo || "N/A"}
                      </div>
                      <div className="col ">
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="hospitalizationStartDate"
                          className="form-label d-block"
                        >
                          Hospitalization Start Date:
                        </label>
                        {formPayerData?.hospitalizationStartDate || "N/A"}
                      </div>
                      <div className="col ">
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="hospitalizationEndDate"
                          className="form-label d-block"
                        >
                          Hospitalization End Date:
                        </label>
                        {formPayerData?.hospitalizationEndDate || "N/A"}
                      </div>
                      <div className="col ">
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          htmlFor="emergencyTreatmentIndicator"
                          className="form-label d-block"
                        >
                          Emergency Treatment Indicator:
                        </label>
                        {formPayerData?.emergencyTreatmentIndicator || "N/A"}
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  {" "}
                  <h6
                    style={{
                      border: "1px solid gray",
                      padding: "5px",
                      margin: "5px 0px",
                      fontSize: "12px",
                      backgroundColor: "#eee",
                    }}
                    className="mt-3"
                  >
                    Physician Information
                  </h6>
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <div className="">
                    <div className=" col ">
                      <label
                        style={{ fontSize: "10px" }}
                        className="form-label my-2"
                        htmlFor="npiNumber"
                      >
                        NPI Number:
                      </label>
                      {formPhysicianData?.npiNumber || "N/A"}
                    </div>
                    <div className=" col ">
                      <label
                        style={{ fontSize: "10px" }}
                        className="form-label my-2"
                        htmlFor="firstName"
                      >
                        First Name:
                      </label>
                      {formPhysicianData?.firstName}
                    </div>
                  </div>
                  <div className="">
                    <div className=" col ">
                      <label
                        style={{ fontSize: "10px" }}
                        className="form-label my-2"
                        htmlFor="mi"
                      >
                        MI:
                      </label>
                      {formPhysicianData?.mi || "N/A"}
                    </div>
                    <div className=" col ">
                      <label
                        style={{ fontSize: "10px" }}
                        className="form-label my-2"
                        htmlFor="lastName"
                      >
                        Last Name:
                      </label>
                      {formPhysicianData?.lastName || "N/A"}
                    </div>
                  </div>
                  <div className="">
                    <div className=" col ">
                      <label
                        style={{ fontSize: "10px" }}
                        className="form-label my-2"
                        htmlFor="taxonomyCode"
                      >
                        Taxonomy Code:
                      </label>
                      {formPhysicianData?.taxonomyCode}
                    </div>
                    <div className=" col ">
                      <label
                        style={{ fontSize: "10px" }}
                        className="form-label my-2"
                        htmlFor="credentials"
                      >
                        Credentials:
                      </label>
                      {formPhysicianData?.credentials || "N/A"}
                    </div>
                  </div>
                  <div className=" col ">
                    <label
                      style={{ fontSize: "10px" }}
                      className="form-label my-2"
                      htmlFor="npiNo"
                    >
                      NPI No:
                    </label>
                    {formPhysicianData?.npiNo || "N/A"}
                  </div>
                </td>
                <td>
                  {" "}
                  <div className="">
                    <div className=" col ">
                      <label
                        style={{ fontSize: "11px" }}
                        className="form-label d-block"
                        htmlFor="medicaidProviderIdentifier"
                      >
                        Medicaid Provider Identifier:
                      </label>
                      {formPhysicianData?.medicaidProviderIdentifier || "N/A"}
                    </div>
                  </div>{" "}
                  <h6
                    style={{
                      fontSize: "11px",
                    }}
                    className="mt-3"
                  >
                    Physician Address
                  </h6>
                  <div className="col ">
                    <label
                      style={{ fontSize: "10px" }}
                      className="form-label my-2"
                      htmlFor="addressLine1"
                    >
                      Address Line 1:
                    </label>

                    {formPhysicianData?.addressLine1 || "N/A"}
                  </div>
                  <div className="col ">
                    <label
                      style={{ fontSize: "10px" }}
                      className="form-label my-2"
                      htmlFor="addressLine2"
                    >
                      Address Line 2:
                    </label>
                    {formPhysicianData?.addressLine2 || "N/A"}
                  </div>
                  {/* const [county,setCounty]=useState("") */}
                  <div className="col ">
                    <label
                      style={{ fontSize: "10px" }}
                      className="form-label my-2"
                      htmlFor="city"
                    >
                      City: {formPhysicianData?.city || "N/A"}
                    </label>
                  </div>
                  <div className="col ">
                    <label
                      style={{ fontSize: "10px" }}
                      className="form-label my-2"
                      htmlFor="state"
                    >
                      State: {formPhysicianData?.state || "N/A"}
                    </label>
                  </div>
                  <div className="col ">
                    <label
                      style={{ fontSize: "10px" }}
                      className="form-label my-2"
                      htmlFor="zip"
                    >
                      Zip:
                    </label>
                    {formPhysicianData?.zip || "N/A"}
                  </div>
                  <div className="col ">
                    <label
                      style={{ fontSize: "10px" }}
                      className="form-label my-2"
                      htmlFor="primaryPhone"
                    >
                      Primary Phone:
                    </label>
                    {formPhysicianData?.primaryPhone || "N/A"}
                  </div>
                  <div className="col ">
                    <label
                      style={{ fontSize: "10px" }}
                      className="form-label my-2"
                      htmlFor="alternatePhone"
                    >
                      Alternate Phone:
                    </label>
                    {formPhysicianData?.alternatePhone || "N/A"}
                  </div>
                  <div className="col ">
                    <label
                      style={{ fontSize: "10px" }}
                      className="form-label my-2"
                      htmlFor="fax"
                    >
                      Fax:
                    </label>
                    {formPhysicianData?.fax}
                  </div>
                  <div className="col ">
                    <label
                      style={{ fontSize: "10px" }}
                      className="form-label my-2"
                      htmlFor="email"
                    >
                      E-mail:
                    </label>
                    {formPhysicianData?.email || "N/A"}
                  </div>
                </td>
                <td>
                  <div className="">
                    <div className="col w-100">
                      <label
                        style={{ fontSize: "10px" }}
                        className="form-label my-2"
                      >
                        Order Delivery Method:
                      </label>
                      <div className="">
                        <div className="form-check col-md-2">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="deliveryMethodAxxessPhysicianPortal"
                            name="deliveryMethod"
                            value="AxxessPhysicianPortal"
                            checked={
                              formPhysicianData?.deliveryMethod ===
                              "AxxessPhysicianPortal"
                            }
                          />
                          <label
                            style={{ fontSize: "11px" }}
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
                            checked={
                              formPhysicianData?.deliveryMethod === "Email"
                            }
                          />
                          <label
                            style={{ fontSize: "11px" }}
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
                            checked={
                              formPhysicianData?.deliveryMethod === "Phone"
                            }
                          />
                          <label
                            style={{ fontSize: "11px" }}
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
                            checked={
                              formPhysicianData?.deliveryMethod === "Fax"
                            }
                          />
                          <label
                            style={{ fontSize: "11px" }}
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
                            checked={
                              formPhysicianData?.deliveryMethod === "Courier"
                            }
                          />
                          <label
                            style={{ fontSize: "11px" }}
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
                            checked={
                              formPhysicianData?.deliveryMethod === "Other"
                            }
                          />
                          <label
                            style={{ fontSize: "11px" }}
                            className="form-label d-block"
                            htmlFor="deliveryMethodOther"
                          >
                            Other
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <h6
                    style={{
                      border: "1px solid gray",
                      padding: "5px",
                      margin: "5px 0px",
                      fontSize: "12px",
                      backgroundColor: "#eee",
                    }}
                  >
                    Service Required
                  </h6>
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <div className="row">
                    <div className=" col-md-6 ">
                      <label
                        style={{ fontSize: "10px" }}
                        className="form-label d-block"
                      >
                        Service Required
                      </label>
                      {["SN", "HHA", "PT", "OT", "ST", "MSW"]?.map(
                        (service) => (
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                            key={service}
                          >
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={service}
                              name="serviceRequired"
                              value={service}
                              checked={formClinicalData?.serviceRequired?.includes(
                                service
                              )}
                            />
                            <label
                              style={{ fontSize: "10px" }}
                              className="form-label d-block"
                              htmlFor={service}
                            >
                              {service}
                            </label>
                          </div>
                        )
                      )}
                    </div>
                    {/* DME Needed */}
                    <div className=" col-md-6 ">
                      <label
                        style={{ fontSize: "10px" }}
                        className="form-label d-block"
                      >
                        DME Needed
                      </label>
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
                        <div
                          style={{
                            minHight: 0,
                            margin: 0,
                            padding: "0px 0px 0px auto",
                          }}
                          className="form-check d-flex align-items-cener gap-1"
                          key={dme}
                        >
                          <input
                            type="checkbox"
                            id={dme}
                            name="dmeNeeded"
                            value={dme}
                            checked={formClinicalData?.dmeNeeded?.includes(dme)}
                            className="form-check-input"
                          />
                          <label
                            style={{ fontSize: "10px" }}
                            className="form-label d-block"
                            htmlFor={dme}
                          >
                            {dme}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </td>
                <td>
                  {" "}
                  {/* Height */}
                  <div className="">
                    <div className="col ">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="heightValue"
                        className="form-label d-block"
                      >
                        Height
                      </label>
                      {formClinicalData?.height?.value || "N/A"}
                    </div>
                    <div className="col ">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="heightUnit"
                        className="form-label d-block"
                      >
                        Unit
                      </label>
                      {formClinicalData?.height?.unit || "N/A"}
                    </div>
                  </div>
                  {/* Weight */}
                  <div className="">
                    <div className="col ">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="weightValue"
                        className="form-label d-block"
                      >
                        Weight
                      </label>
                      {formClinicalData?.weight?.value || "N/A"}
                    </div>
                    <div className="col ">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="weightUnit"
                        className="form-label d-block"
                      >
                        Unit
                      </label>
                      {formClinicalData?.weight?.unit || "N/A"}
                    </div>
                  </div>
                </td>
                <td>
                  {/* Primary Diagnosis */}
                  <div className="">
                    <div className="col ">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="primaryDiagnosis"
                        className="form-label d-block"
                      >
                        Primary Diagnosis
                      </label>
                      {formClinicalData?.primaryDiagnosis || "N/A"}
                    </div>
                    <div className="col ">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="primaryDiagnosisCode"
                        className="form-label d-block"
                      >
                        Primary Diagnosis Code
                      </label>
                      {formClinicalData?.primaryDiagnosisCode || "N/A"}
                    </div>
                  </div>

                  <div className="">
                    {/* Other Diagnoses */}
                    <div className="">
                      <label
                        style={{ fontSize: "10px" }}
                        className="form-label d-block"
                      >
                        Other Diagnoses
                      </label>
                      {formClinicalData?.otherDiagnoses?.map(
                        (diagnosis, index) => (
                          <div className="" key={index}>
                            <div className="col ">
                              <label
                                style={{ fontSize: "10px" }}
                                htmlFor={`diagnosis-${index}`}
                                className="form-label d-block"
                              >
                                Diagnosis
                              </label>
                              {diagnosis.diagnosis || "N/A"}
                            </div>
                            <div className="col ">
                              <label
                                style={{ fontSize: "10px" }}
                                htmlFor={`code-${index}`}
                                className="form-label d-block"
                              >
                                Code
                              </label>
                              {diagnosis.code || "N/A"}
                            </div>
                          </div>
                        )
                      )}
                    </div>

                    {/* Clinical Comments */}
                    <div className="">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="clinicalComments"
                        className="form-label hide-on-print"
                      >
                        Clinical Comments
                      </label>
                      {formClinicalData?.clinicalComments || "N/A"}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <h6
                    style={{
                      border: "1px solid gray",
                      padding: "5px",
                      margin: "5px 0px",
                      fontSize: "11px",
                      backgroundColor: "#eee",
                    }}
                  >
                    Pharmacy Information
                  </h6>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="">
                    <div className=" col ">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="pharmacyName"
                        className="form-label d-block"
                      >
                        Pharmacy Name:
                      </label>
                      {formPharmacyData?.pharmacyName || "N/A"}
                    </div>
                    <div className=" col ">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="addressLine1"
                        className="form-label d-block"
                      >
                        Address Line 1:
                      </label>
                      {formPharmacyData?.addressLine1 || "N/A"}
                    </div>
                  </div>{" "}
                  <div className=" col ">
                    <label
                      style={{ fontSize: "11px" }}
                      htmlFor="addressLine2"
                      className="form-label d-block"
                    >
                      Address Line 2:
                    </label>
                    {formPharmacyData?.addressLine2 || "N/A"}
                  </div>
                  <div className="">
                    <div className="col">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="city"
                        className="form-label d-block"
                      >
                        City: {formPharmacyData?.city || "N/A"}
                      </label>
                    </div>
                  </div>
                  <div className="">
                    <div className="col ">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="state"
                        className="form-label d-block"
                      >
                        State: {formPharmacyData?.state || "N/A"}
                      </label>
                    </div>
                    <div className="col ">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="zip"
                        className="form-label d-block"
                      >
                        Zip:
                      </label>
                      {formPharmacyData?.zip || "N/A"}
                    </div>
                  </div>
                  <div className="">
                    <div className="col ">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="primaryPhone"
                        className="form-label d-block"
                      >
                        Primary Phone:
                      </label>
                      {formPharmacyData?.primaryPhone || "N/A"}
                    </div>
                    <div className="col ">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="contactFirstName"
                        className="form-label d-block"
                      >
                        Contact First Name:
                      </label>
                      {formPharmacyData?.contactFirstName || "N/A"}
                    </div>
                  </div>
                  <div className="">
                    <div className="col ">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="contactLastName"
                        className="form-label d-block"
                      >
                        Contact Last Name:
                      </label>
                      {formPharmacyData?.contactLastName || "N/A"}
                    </div>
                    <div className="col ">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="email"
                        className="form-label d-block"
                      >
                        Email:
                      </label>
                      {formPharmacyData?.email || "N/A"}
                    </div>
                  </div>{" "}
                  <div className="col ">
                    <label
                      style={{ fontSize: "11px" }}
                      htmlFor="faxNumber"
                      className="form-label d-block"
                    >
                      Fax Number:
                    </label>
                    {formPharmacyData?.faxNumber || "N/A"}
                  </div>
                </td>
                <td>
                  <div className="">
                    <div className=" col ">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="comment"
                        className="form-label d-block"
                      >
                        Comment:
                      </label>
                      {formPharmacyData?.comment || "N/A"}
                    </div>
                  </div>
                </td>
                <td>
                  <h6
                    style={{
                      fontSize: "11px",
                    }}
                  >
                    Additional Pharmacies
                  </h6>

                  <div className="">
                    {formPharmacyData?.additionalPharmacies?.map(
                      (pharmacy, index) => (
                        <div key={index} className="col  ">
                          <label
                            style={{ fontSize: "11px" }}
                            htmlFor={`additionalPharmacy${index + 1}`}
                            className="form-label d-block"
                          >
                            Additional Pharmacy {index + 1}
                          </label>
                          {pharmacy?.name || "N/A"}
                        </div>
                      )
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  {" "}
                  <h6
                    style={{
                      border: "1px solid gray",
                      padding: "5px",
                      margin: "5px 0px",
                      fontSize: "11px",
                      backgroundColor: "#eee",
                    }}
                  >
                    Contact
                  </h6>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="">
                    <div className="col ">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="primaryFirstName"
                        className="form-label d-block"
                      >
                        First Name:
                      </label>
                      {formContactData?.primary?.firstName || "N/A"}
                    </div>
                    <div className="col ">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="primaryLastName"
                        className="form-label d-block"
                      >
                        Last Name:
                      </label>
                      {formContactData?.primary?.lastName || "N/A"}
                    </div>
                  </div>
                  <div className="">
                    <div className="col ">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="primaryMobilePhone"
                        className="form-label d-block"
                      >
                        Mobile Phone:
                      </label>
                      {formContactData?.primary?.mobilePhone || "N/A"}
                    </div>
                    <div className="col ">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="primaryAlternatePhone"
                        className="form-label d-block"
                      >
                        Alternate Phone:
                      </label>
                      {formContactData?.primary?.alternatePhone || "N/A"}
                    </div>
                  </div>

                  <div className="col ">
                    <label
                      style={{ fontSize: "11px" }}
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
                        <div
                          key={relationship}
                          style={{
                            minHight: 0,
                            margin: 0,
                            padding: "0px 0px 0px auto",
                          }}
                          className="form-check d-flex align-items-cener gap-1"
                        >
                          <input
                            className="form-check-input"
                            type="radio"
                            name="primaryRelationship"
                            id={`relationship${relationship}`}
                            value={relationship}
                            checked={
                              formContactData?.primary?.relationship ===
                              relationship
                            }
                          />
                          <label
                            style={{ fontSize: "11px" }}
                            className="form-label d-block"
                            htmlFor={`relationship${relationship}`}
                          >
                            {relationship}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col ">
                    <label
                      style={{ fontSize: "11px" }}
                      htmlFor="primaryEmail"
                      className="form-label d-block"
                    >
                      Email:
                    </label>
                    {formContactData?.primary?.email || "N/A"}
                  </div>
                </td>
                <td>
                  {" "}
                  <div className="">
                    <div className="col ">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="primaryFirstName"
                        className="form-label d-block"
                      >
                        First Name:
                      </label>
                      {formContactData?.primary?.firstName || "N/A"}
                    </div>
                    <div className="col ">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="primaryLastName"
                        className="form-label d-block"
                      >
                        Last Name:
                      </label>
                      {formContactData?.primary?.lastName || "N/A"}
                    </div>
                  </div>
                  <div className="">
                    <div className="col ">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="primaryMobilePhone"
                        className="form-label d-block"
                      >
                        Mobile Phone:
                      </label>
                      {formContactData?.primary?.mobilePhone || "N/A"}
                    </div>
                    <div className="col ">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="primaryAlternatePhone"
                        className="form-label d-block"
                      >
                        Alternate Phone:
                      </label>
                      {formContactData?.primary?.alternatePhone || "N/A"}
                    </div>
                  </div>
                  <div className="col ">
                    <label
                      style={{ fontSize: "11px" }}
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
                        <div
                          key={relationship}
                          style={{
                            minHight: 0,
                            margin: 0,
                            padding: "0px 0px 0px auto",
                          }}
                          className="form-check d-flex align-items-cener gap-1"
                        >
                          <input
                            className="form-check-input"
                            type="radio"
                            name="primaryRelationship"
                            id={`relationship${relationship}`}
                            value={relationship}
                            checked={
                              formContactData?.primary?.relationship ===
                              relationship
                            }
                          />
                          <label
                            style={{ fontSize: "11px" }}
                            className="form-label d-block"
                            htmlFor={`relationship${relationship}`}
                          >
                            {relationship}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col ">
                    <label
                      style={{ fontSize: "11px" }}
                      htmlFor="primaryEmail"
                      className="form-label d-block"
                    >
                      Email:
                    </label>
                    {formContactData?.primary?.email || "N/A"}
                  </div>
                </td>
                <td>
                  <div className="g-3">
                    <div className="col ">
                      <label
                        style={{ fontSize: "10px" }}
                        className="form-label d-block"
                      >
                        Representative:
                      </label>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          name="primaryRepresentative"
                          id="primaryLegalRep"
                          value="Legal Representative"
                          checked={
                            formContactData?.primary?.representative ===
                            "Legal Representative"
                          }
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          className="form-label d-block"
                          htmlFor="primaryLegalRep"
                        >
                          Legal Representative
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          name="primaryRepresentative"
                          id="primaryPatientRep"
                          value="Patient Selected Representative"
                          checked={
                            formContactData?.primary?.representative ===
                            "Patient Selected Representative"
                          }
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          className="form-label d-block"
                          htmlFor="primaryPatientRep"
                        >
                          Patient Selected Representative
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="">
                    {!formContactData?.primary?.sameAsPatientAddress && (
                      <React.Fragment>
                        <div className="col">
                          <label
                            style={{ fontSize: "11px" }}
                            htmlFor="primaryAddressLine1"
                            className="form-label d-block"
                          >
                            Address Line 1:
                          </label>
                          {formContactData?.primary?.addressLine1 || "N/A"}
                        </div>
                        <div className="col">
                          <label
                            style={{ fontSize: "11px" }}
                            htmlFor="primaryAddressLine2"
                            className="form-label d-block"
                          >
                            Address Line 2:
                          </label>
                          {formContactData?.primary?.addressLine2 || "N/A"}
                        </div>
                        <div className="col">
                          <label
                            style={{ fontSize: "11px" }}
                            htmlFor="primaryCity"
                            className="form-label d-block"
                          >
                            City:{formContactData?.city || "N/A"}
                          </label>
                        </div>
                        <div className="col">
                          <label
                            style={{ fontSize: "11px" }}
                            htmlFor="primaryState"
                            className="form-label d-block"
                          >
                            State:{formContactData?.state || "N/A"}
                          </label>
                        </div>
                        <div className="col">
                          <label
                            style={{ fontSize: "11px" }}
                            htmlFor="primaryZip"
                            className="form-label d-block"
                          >
                            ZIP:
                          </label>
                          {formContactData?.primary?.zip || "N/A"}
                        </div>
                      </React.Fragment>
                    )}

                    {/* Additional Emergency Contacts */}
                    {formContactData?.additional?.map((contact, index) => (
                      <div key="index" className="g-3">
                        <div className="col">
                          <label
                            style={{ fontSize: "11px" }}
                            htmlFor={`additionalFirstName-${index}`}
                            className="form-label d-block"
                          >
                            First Name:
                          </label>
                          {contact?.firstName || "N/A"}
                        </div>
                        <div className="col">
                          <label
                            style={{ fontSize: "11px" }}
                            htmlFor={`additionalLastName-${index}`}
                            className="form-label d-block"
                          >
                            Last Name:
                          </label>
                          {contact?.lastName || "N/A"}
                        </div>
                        <div className="col">
                          <label
                            style={{ fontSize: "11px" }}
                            htmlFor={`additionalMobilePhone-${index}`}
                            className="form-label d-block"
                          >
                            Mobile Phone:
                          </label>
                          {contact?.mobilePhone || "N/A"}
                        </div>
                        <div className="col">
                          <label
                            style={{ fontSize: "11px" }}
                            htmlFor={`additionalAlternatePhone-${index}`}
                            className="form-label d-block"
                          >
                            Alternate Phone:
                          </label>

                          {contact?.alternatePhone || "N/A"}
                        </div>
                        <div className="col">
                          <label
                            style={{ fontSize: "11px" }}
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
                              <div
                                key={relationship}
                                style={{
                                  minHight: 0,
                                  margin: 0,
                                  padding: "0px 0px 0px auto",
                                }}
                                className="form-check d-flex align-items-cener gap-1"
                              >
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name={`additionalRelationship-${index}`}
                                  id={`additionalRelationship-${index}-${relationship}`}
                                  value={relationship}
                                  checked={
                                    contact?.relationship === relationship
                                  }
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
                        <div className="col">
                          <label
                            style={{ fontSize: "11px" }}
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
                        <div className="col">
                          <label
                            style={{ fontSize: "10px" }}
                            className="form-label d-block"
                          >
                            Representative:
                          </label>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              name={`additionalRepresentative-${index}`}
                              id={`additionalLegalRep-${index}`}
                              value="Legal Representative"
                              checked={
                                contact?.representative ===
                                "Legal Representative"
                              }
                            />
                            <label
                              style={{ fontSize: "11px" }}
                              className="form-label d-block"
                              htmlFor={`additionalLegalRep-${index}`}
                            >
                              Legal Representative
                            </label>
                          </div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
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
                              style={{ fontSize: "11px" }}
                              className="form-label d-block"
                              htmlFor={`additionalPatientRep-${index}`}
                            >
                              Patient Selected Representative
                            </label>
                          </div>
                        </div>
                        <div className="col">
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`additionalSameAsPatientAddress-${index}`}
                              checked={contact?.sameAsPatientAddress}
                            />
                            <label
                              style={{ fontSize: "11px" }}
                              className="form-label d-block"
                              htmlFor={`additionalSameAsPatientAddress-${index}`}
                            >
                              Same as Patient Address
                            </label>
                          </div>
                        </div>
                        <div className="">
                          {!contact?.sameAsPatientAddress && (
                            <React.Fragment>
                              <div className="col">
                                <label
                                  htmlFor={`additionalAddressLine1-${index}`}
                                  className="form-label d-block"
                                >
                                  Address Line 1:
                                </label>
                                {contact?.addressLine1}
                              </div>
                              <div className="col">
                                <label
                                  htmlFor={`additionalAddressLine2-${index}`}
                                  className="form-label d-block"
                                >
                                  Address Line 2:
                                </label>
                                {contact?.addressLine2}
                              </div>
                              <div className="col">
                                <label
                                  htmlFor={`additionalCity-${index}`}
                                  className="form-label d-block"
                                >
                                  City:{formData?.city || "N/A"}
                                </label>
                              </div>
                              <div className="col">
                                <label
                                  htmlFor={`additionalState-${index}`}
                                  className="form-label d-block"
                                >
                                  State:{formData?.state || "N/A"}
                                </label>
                              </div>
                              <div className="col">
                                <label
                                  htmlFor={`additionalZip-${index}`}
                                  className="form-label d-block"
                                >
                                  ZIP:
                                </label>
                                {contact?.zip || "N/A"}
                              </div>
                            </React.Fragment>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="">
                    {/*  */}
                    <div className=" col ">
                      <label
                        style={{ fontSize: "10px" }}
                        className="form-label d-block"
                      >
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
                          <div
                            key={option.value}
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              name="representativeContacted"
                              id={`representativeContacted-${option.value}`}
                              value={option.value}
                              checked={
                                formContactData?.representativeContacted ===
                                option.value
                              }
                            />
                            <label
                              style={{ fontSize: "11px" }}
                              className="form-label d-block"
                              htmlFor={`representativeContacted-${option.value}`}
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="col ">
                      {/* Conditional rendering based on the selected representative */}
                      {formContactData?.representativeContacted ===
                        "legalRepresentative" && (
                        <>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              name="legalRepresentativeOption"
                              id="legalRepOption1"
                              value="contactedAvailable"
                              checked={
                                formContactData?.legalRepresentativeOption ===
                                "contactedAvailable"
                              }
                            />
                            <label
                              style={{ fontSize: "11px" }}
                              className="form-label d-block"
                              htmlFor="legalRepOption1"
                            >
                              Contacted and will be available for admission
                              visit to receive written notice in advance of care
                            </label>
                          </div>
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              name="legalRepresentativeOption"
                              id="legalRepOption2"
                              value="inAgreementNotAvailable"
                              checked={
                                formContactData?.legalRepresentativeOption ===
                                "inAgreementNotAvailable"
                              }
                            />
                            <label
                              style={{ fontSize: "11px" }}
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
                          <div
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              name="legalRepresentativeOption"
                              id="legalRepOption3"
                              value="other"
                              checked={
                                formContactData?.legalRepresentativeOption ===
                                "other"
                              }
                            />
                            <label
                              style={{ fontSize: "11px" }}
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

                  {formContactData?.representativeContacted ===
                    "patientSelected" && (
                    <>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          name="patientSelectedRepresentativeOption"
                          id="patientSelectedOption1"
                          value="contactedAvailable"
                          checked={
                            formContactData?.patientSelectedRepresentativeOption ===
                            "contactedAvailable"
                          }
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          className="form-label d-block"
                          htmlFor="patientSelectedOption1"
                        >
                          Contacted and will be available for admission visit to
                          receive written notice in advance of care
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          name="patientSelectedRepresentativeOption"
                          id="patientSelectedOption2"
                          value="sentCopy"
                          checked={
                            formContactData?.patientSelectedRepresentativeOption ===
                            "sentCopy"
                          }
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          className="form-label d-block"
                          htmlFor="patientSelectedOption2"
                        >
                          Sent copy, as requested, of notice of rights, transfer
                          and DC policies provided by mail or other electronic
                          means (to be received within 4 days)
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          name="patientSelectedRepresentativeOption"
                          id="patientSelectedOption3"
                          value="other"
                          checked={
                            formContactData?.patientSelectedRepresentativeOption ===
                            "other"
                          }
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          className="form-label d-block"
                          htmlFor="patientSelectedOption3"
                        >
                          Other
                        </label>
                      </div>
                    </>
                  )}

                  <div className="">
                    <div
                      style={{
                        minHight: 0,
                        margin: 0,
                        padding: "0px 0px 0px auto",
                      }}
                      className="form-check d-flex align-items-cener gap-1"
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="doNotContactCAHPS"
                        checked={formContactData?.doNotContactCAHPS}
                      />
                      <label
                        style={{ fontSize: "11px" }}
                        className="form-label d-block"
                        htmlFor="doNotContactCAHPS"
                      >
                        Do Not Contact for CAHPS (When checked, please provide
                        appropriate reason(s).)
                      </label>
                    </div>
                  </div>

                  {formContactData?.doNotContactCAHPS && (
                    <>
                      <div className=""></div>
                      <div className="">
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
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
                            <div
                              key={option.value}
                              style={{
                                minHight: 0,
                                margin: 0,
                                padding: "0px 0px 0px auto",
                              }}
                              className="form-check d-flex align-items-cener gap-1"
                            >
                              <input
                                className="form-check-input"
                                type="radio"
                                name="reasonForNoContact"
                                id={`reasonForNoContact-${option.value}`}
                                value={option.value}
                                checked={
                                  formContactData?.reasonForNoContact ===
                                  option.value
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

                      {formContactData?.reasonForNoContact === "other" && (
                        <div className="">
                          <label
                            style={{ fontSize: "11px" }}
                            htmlFor="otherReason"
                            className="form-label d-block"
                          >
                            Other reason
                          </label>
                          {formContactData?.otherReason || "N/A"}
                        </div>
                      )}

                      <div className="">
                        <div
                          style={{
                            minHight: 0,
                            margin: 0,
                            padding: "0px 0px 0px auto",
                          }}
                          className="form-check d-flex align-items-cener gap-1"
                        >
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="alternateCAHPSContact"
                            checked={formContactData?.alternateCAHPSContact}
                          />
                          <label
                            style={{ fontSize: "11px" }}
                            className="form-label d-block"
                            htmlFor="alternateCAHPSContact"
                          >
                            Alternate CAHPS Contact (Applicable only when the
                            patient is physically or mentally incapable of
                            completing survey.)
                          </label>
                        </div>
                      </div>

                      {formContactData?.alternateCAHPSContact && (
                        <>
                          <div className="">
                            <div className="col">
                              {!formContactData?.alternateCAHPSContactDetails
                                .sameAsPrimaryEmergencyContact && (
                                <>
                                  {/* Add fields for alternate CAHPS contact */}
                                  <div className="">
                                    <label
                                      style={{ fontSize: "11px" }}
                                      htmlFor="altFirstName"
                                      className="form-label d-block"
                                    >
                                      First Name
                                    </label>
                                    {formContactData
                                      ?.alternateCAHPSContactDetails
                                      ?.firstName || "N/A"}
                                  </div>
                                  <div className="">
                                    <label
                                      style={{ fontSize: "11px" }}
                                      htmlFor="altLastName"
                                      className="form-label d-block"
                                    >
                                      Last Name
                                    </label>
                                    {formContactData
                                      ?.alternateCAHPSContactDetails
                                      ?.lastName || "N/A"}
                                  </div>
                                  <div className="">
                                    <label
                                      style={{ fontSize: "11px" }}
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
                                        {
                                          value: "Spouse",
                                          label: "Spouse",
                                        },
                                        {
                                          value: "Parent",
                                          label: "Parent",
                                        },
                                        {
                                          value: "Sibling",
                                          label: "Sibling",
                                        },
                                        {
                                          value: "Child",
                                          label: "Child",
                                        },
                                        {
                                          value: "Relative",
                                          label: "Relative",
                                        },
                                        {
                                          value: "Friend",
                                          label: "Friend",
                                        },
                                        {
                                          value: "Other",
                                          label: "Other",
                                        },
                                      ]?.map((option) => (
                                        <div
                                          key={option.value}
                                          style={{
                                            minHight: 0,
                                            margin: 0,
                                            padding: "0px 0px 0px auto",
                                          }}
                                          className="form-check d-flex align-items-cener gap-1"
                                        >
                                          <input
                                            className="form-check-input"
                                            type="radio"
                                            name="relationship"
                                            id={`relationship-${option.value}`}
                                            value={option.value}
                                            checked={
                                              formContactData
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
                                      style={{ fontSize: "11px" }}
                                      htmlFor="altMobilePhone"
                                      className="form-label d-block"
                                    >
                                      Mobile Phone
                                    </label>
                                    {formContactData
                                      ?.alternateCAHPSContactDetails
                                      ?.mobilePhone || "N/A"}
                                  </div>
                                  <div className="">
                                    <label
                                      style={{ fontSize: "11px" }}
                                      htmlFor="altAlternatePhone"
                                      className="form-label d-block"
                                    >
                                      Alternate Phone
                                    </label>
                                    {formContactData
                                      ?.alternateCAHPSContactDetails
                                      ?.alternatePhone || "N/A"}
                                  </div>
                                  <div className="">
                                    <label
                                      style={{ fontSize: "11px" }}
                                      htmlFor="altEmail"
                                      className="form-label d-block"
                                    >
                                      Email
                                    </label>
                                    {formContactData
                                      ?.alternateCAHPSContactDetails?.email ||
                                      "N/A"}
                                  </div>
                                  <div className="">
                                    <label
                                      style={{ fontSize: "11px" }}
                                      htmlFor="altAddressLine1"
                                      className="form-label d-block"
                                    >
                                      Address Line 1
                                    </label>
                                    {formContactData
                                      ?.alternateCAHPSContactDetails
                                      ?.addressLine1 || "N/A"}
                                  </div>
                                  <div className="">
                                    <label
                                      style={{ fontSize: "11px" }}
                                      htmlFor="altAddressLine2"
                                      className="form-label d-block"
                                    >
                                      Address Line 2
                                    </label>
                                    {formContactData
                                      ?.alternateCAHPSContactDetails
                                      ?.addressLine2 || "N/A"}
                                  </div>
                                  <div className="">
                                    <label
                                      style={{ fontSize: "11px" }}
                                      htmlFor="altCity"
                                      className="form-label d-block"
                                    >
                                      City :{formContactData?.city || "N/A"}
                                    </label>
                                  </div>
                                  <div className="">
                                    <label
                                      style={{ fontSize: "11px" }}
                                      htmlFor="altState"
                                      className="form-label d-block"
                                    >
                                      State:
                                      {formContactData?.state || "N/A"}
                                    </label>
                                  </div>
                                  <div className="">
                                    <label
                                      style={{ fontSize: "11px" }}
                                      htmlFor="altZIP"
                                      className="form-label d-block"
                                    >
                                      ZIP Code
                                    </label>
                                    {formContactData
                                      ?.alternateCAHPSContactDetails?.zip ||
                                      "N/A"}
                                  </div>
                                  <div className="">
                                    <label
                                      style={{ fontSize: "11px" }}
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
                      <label
                        style={{ fontSize: "10px" }}
                        className="form-label my-2"
                      >
                        Contacts Comments
                      </label>

                      {formContactData?.comments}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <h6
                    style={{
                      border: "1px solid gray",
                      padding: "5px",
                      margin: "5px 0px",
                      fontSize: "11px",
                      backgroundColor: "#eee",
                    }}
                  >
                    {" "}
                    Emergency Preparedness
                  </h6>
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <div className="">
                    <div className=" col ">
                      <label
                        style={{ fontSize: "11px" }}
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
                          checked={formEmergencyData?.emergencyTriage === "1"}
                        />{" "}
                        1. Life-threatening (or potential) and requires ongoing
                        medical treatment.
                        <br />
                        <input
                          type="radio"
                          name="emergencyTriage"
                          id="emergencyTriage2"
                          value="2"
                          checked={formEmergencyData?.emergencyTriage === "2"}
                        />{" "}
                        2. Not life-threatening but would suffer severe adverse
                        effects from interruption of services.
                        <br />
                        <input
                          type="radio"
                          name="emergencyTriage"
                          id="emergencyTriage3"
                          value="3"
                          checked={formEmergencyData?.emergencyTriage === "3"}
                        />{" "}
                        3. Visits could be postponed 24-48 hours without adverse
                        effects.
                        <br />
                        <input
                          type="radio"
                          name="emergencyTriage"
                          id="emergencyTriage4"
                          value="4"
                          checked={formEmergencyData?.emergencyTriage === "4"}
                        />{" "}
                        4. Visits could be postponed 72-96 hours without adverse
                        effects.
                      </div>
                    </div>
                    <div className=" col ">
                      <label
                        style={{ fontSize: "11px" }}
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
                          checked={formEmergencyData?.additionalInfo?.includes(
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
                          checked={formEmergencyData?.additionalInfo?.includes(
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
                          checked={formEmergencyData?.additionalInfo?.includes(
                            "medicalNeeds"
                          )}
                        />{" "}
                        Medical Needs/Equipment (i.e., bedbound, oxygen, vent,
                        IV cardiac meds other DME)
                      </div>
                      {formEmergencyData?.additionalInfo?.medicalNeeds && (
                        <div>
                          <label
                            style={{ fontSize: "11px" }}
                            htmlFor="medicalNeedsInfo"
                            className="form-label d-block"
                          >
                            Medical Needs/Equipment Details
                          </label>
                          {formEmergencyData?.medicalNeedsInfo || "N/A"}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td>
                  <h6 style={{ fontSize: "12px" }}>Additional Comments</h6>
                  {/* Additional Emergency Preparedness Information */}
                  <div className="">
                    <div className="col">
                      {formEmergencyData?.additionalComments || "N/A"}
                    </div>
                  </div>
                  <div className="">
                    <div className="col">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="evacuationZone"
                        className="form-label d-block"
                      >
                        Evacuation Zone
                      </label>
                      {formEmergencyData?.evacuationZone || "N/A"}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="col my-2">
                    <h6 style={{ fontSize: "12px" }}>Emergency Contact</h6>
                  </div>
                  {!formEmergencyData?.evacuationAddress && (
                    <div>
                      <div className="">
                        <div className="col  ">
                          <label
                            style={{ fontSize: "11px" }}
                            htmlFor="addressLine1"
                          >
                            Address Line 1
                          </label>
                          {formEmergencyData?.addressLine1 || "N/A"}
                        </div>
                        <div className="col  ">
                          <label
                            style={{ fontSize: "11px" }}
                            htmlFor="addressLine2"
                          >
                            Address Line 2
                          </label>
                          {formEmergencyData?.addressLine2 || "N/A"}
                        </div>
                      </div>

                      <div className="">
                        <div className="col  ">
                          <label style={{ fontSize: "11px" }} htmlFor="state">
                            State:{formEmergencyData?.state || "N/A"}
                          </label>
                        </div>
                        <div className="col  ">
                          <label style={{ fontSize: "11px" }} htmlFor="city">
                            City :{formEmergencyData?.city || "N/A"}
                          </label>
                        </div>
                      </div>
                      <div className="">
                        <div className="col  ">
                          <label style={{ fontSize: "11px" }} htmlFor="state">
                            County:{formEmergencyData?.county || "N/A"}
                          </label>
                        </div>
                        <div className="col  ">
                          <label style={{ fontSize: "11px" }} htmlFor="zip">
                            ZIP Code
                          </label>
                          {formEmergencyData?.zip || "N/A"}
                        </div>
                      </div>
                      <div className="">
                        <div className="col  ">
                          <label style={{ fontSize: "11px" }} htmlFor="zip">
                            Mobile Phone
                          </label>
                          {formEmergencyData?.mobilePhone || "N/A"}
                        </div>
                        <div className="col  ">
                          <label style={{ fontSize: "11px" }} htmlFor="zip">
                            Alternative MobilePhone
                          </label>
                          {formEmergencyData?.altMobilePhone || "N/A"}
                        </div>
                      </div>
                      <div className="col">
                        <div className="col my-2">
                          <input
                            type="checkbox"
                            name="evacuationAddress"
                            id="evacuationAddress"
                            checked={
                              formEmergencyData?.evacuationAddress || "N/A"
                            }
                          />{" "}
                          Set as visit location
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="">
                    <label
                      style={{ fontSize: "11px" }}
                      htmlFor="comments"
                      className="form-label d-block"
                    >
                      Comments
                    </label>
                    {formEmergencyData?.comments || "N/A"}
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <h6
                    style={{
                      fontSize: "11px",
                    }}
                  >
                    Advance Care Plan/Admission
                  </h6>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <div className="">
                    <div className="col">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="admission"
                        className="form-label d-block"
                      >
                        Does this patient have an advance care plan or a
                        surrogate decision-maker AND able to provide legal
                        documentation for the home health medical record?
                      </label>
                      <div>
                        <input
                          type="radio"
                          name="admission"
                          id="admissionYes"
                          value="Yes"
                          checked={formDirectiveData?.admission === "Yes"}
                        />{" "}
                        Yes
                        <br />
                        <input
                          type="radio"
                          name="admission"
                          id="admissionNo"
                          value="No"
                          checked={formDirectiveData?.admission === "No"}
                        />{" "}
                        No
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="col">
                      <label
                        style={{ fontSize: "11px" }}
                        htmlFor="comment"
                        className="form-label d-block my-2"
                      >
                        Comments
                      </label>

                      {formDirectiveData?.comment || "N/A"}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  {" "}
                  <h6
                    style={{
                      border: "1px solid gray",
                      padding: "5px",
                      margin: "5px 0px",
                      fontSize: "11px",
                      backgroundColor: "#eee",
                    }}
                  >
                    Referring Information
                  </h6>
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  {/* Referring Physician */}
                  <div className=" col ">
                    <label
                      style={{ fontSize: "11px" }}
                      htmlFor="referringPhysician"
                      className="form-label d-block"
                    >
                      Referring Physician
                    </label>
                    {formReferralData?.referringPhysician || "N/A"}
                  </div>
                  {/* NPI */}
                  <div className=" col ">
                    <label
                      style={{ fontSize: "11px" }}
                      htmlFor="npi"
                      className="form-label d-block"
                    >
                      NPI
                    </label>
                    {formReferralData?.npi}
                  </div>
                  {/* Face-to-Face Evaluation */}
                  <div className=" col ">
                    <label
                      style={{ fontSize: "11px" }}
                      htmlFor="faceToFaceEvaluation"
                      className="form-label d-block"
                    >
                      Face-to-Face Evaluation
                    </label>
                    <div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          type="radio"
                          className="form-check-input"
                          name="faceToFaceEvaluation"
                          id="faceToFaceEvaluationNA"
                          value="N/A"
                          checked={
                            formReferralData?.faceToFaceEvaluation === "N/A"
                          }
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          className="form-label d-block"
                          htmlFor="faceToFaceEvaluationNA"
                        >
                          N/A
                        </label>
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          type="radio"
                          className="form-check-input"
                          name="faceToFaceEvaluation"
                          id="faceToFaceEvaluationDate"
                          value="Date of Face-to-Face Visit"
                          checked={
                            formReferralData?.faceToFaceEvaluation ===
                            "Date of Face-to-Face Visit"
                          }
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          className="form-label d-block"
                          htmlFor="faceToFaceEvaluationDate"
                        >
                          Date of Face-to-Face Visit
                        </label>
                        {formReferralData?.faceToFaceEvaluation ===
                          "Date of Face-to-Face Visit" && (
                          <div className="my-2 ml-5">
                            {formReferralData?.faceToFaceEvaluationDate ||
                              "N/A"}
                          </div>
                        )}
                      </div>
                      <div
                        style={{
                          minHight: 0,
                          margin: 0,
                          padding: "0px 0px 0px auto",
                        }}
                        className="form-check d-flex align-items-cener gap-1"
                      >
                        <input
                          type="radio"
                          className="form-check-input"
                          name="faceToFaceEvaluation"
                          id="faceToFaceEvaluation30Days"
                          value="Face-to-Face to be completed within 30days"
                          checked={
                            formReferralData?.faceToFaceEvaluation ===
                            "Face-to-Face to be completed within 30days"
                          }
                        />
                        <label
                          style={{ fontSize: "11px", dispaly: "inline-block" }}
                          className="form-label d-block"
                          htmlFor="faceToFaceEvaluation30Days"
                        >
                          Face-to-Face to be completed within 30 days
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className=" col ">
                    <label
                      style={{ fontSize: "11px" }}
                      htmlFor="certifyingPhysician"
                      className="form-label d-block"
                    >
                      Certifying Physician
                    </label>
                    {formReferralData?.certifyingPhysician || "N/A"}
                  </div>
                  {/* Certifying Physician */}
                  {/* Attending Physician */}
                  <div className=" col ">
                    <label
                      style={{ fontSize: "10px" }}
                      className="form-label d-block"
                    >
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
                        {
                          value: "Emergency Room",
                          label: "Emergency Room",
                        },
                      ]?.map((option) => (
                        <div
                          key={option.value}
                          style={{
                            minHight: 0,
                            margin: 0,
                            padding: "0px 0px 0px auto",
                          }}
                          className="form-check d-flex align-items-cener gap-1"
                        >
                          <input
                            type="radio"
                            className="form-check-input"
                            name="attendingPhysician"
                            id={`attendingPhysician-${option.value}`}
                            value={option.value}
                            checked={
                              formReferralData?.attendingPhysician ===
                              option.value
                            }
                          />
                          <label
                            style={{ fontSize: "11px" }}
                            className="form-label d-block"
                            htmlFor={`attendingPhysician-${option.value}`}
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </td>
                <td>
                  {" "}
                  {/* Admission Source */}
                  <div className=" col ">
                    <label
                      style={{ fontSize: "11px" }}
                      htmlFor="admissionSource"
                      className="form-label d-block"
                    >
                      Admission Source
                    </label>
                    {formReferralData?.admissionSource || "N/A"}
                  </div>
                  {/* Name of Referral Source */}
                  <div className=" col ">
                    <label
                      style={{ fontSize: "11px" }}
                      htmlFor="nameOfReferralSource"
                      className="form-label d-block"
                    >
                      Name of Referral Source
                    </label>
                    {formReferralData?.nameOfReferralSource}
                  </div>
                  {/* Referral Date */}
                  <div className=" col ">
                    <label
                      style={{ fontSize: "11px" }}
                      htmlFor="referralDate"
                      className="form-label d-block"
                    >
                      Referral Date
                    </label>
                    {formReferralData?.referralDate || "N/A"}
                  </div>
                  {/* Inquiry Date */}
                  <div className=" col ">
                    <label
                      style={{ fontSize: "11px" }}
                      htmlFor="inquiryDate"
                      className="form-label d-block"
                    >
                      Inquiry Date
                    </label>
                    {formReferralData?.inquiryDate || "N/A"}
                  </div>
                  {/* Community Liaison */}
                  <div className=" col ">
                    <label
                      style={{ fontSize: "11px" }}
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
                        <div
                          key={option.value}
                          style={{
                            minHight: 0,
                            margin: 0,
                            padding: "0px 0px 0px auto",
                          }}
                          className="form-check d-flex align-items-cener gap-1"
                        >
                          <input
                            type="radio"
                            className="form-check-input"
                            name="communityLiaison"
                            id={`communityLiaison-${option.value}`}
                            value={option.value}
                            checked={
                              formReferralData?.communityLiaison ===
                              option.value
                            }
                          />
                          <label
                            style={{ fontSize: "11px" }}
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
                  <div className=" col ">
                    <label
                      style={{ fontSize: "11px" }}
                      htmlFor="internalReferralSource"
                      className="form-label d-block"
                    >
                      Internal Referral Source
                    </label>
                    <div>
                      {[
                        {
                          value: "CHAP Surveyor",
                          label: "CHAP Surveyor",
                        },
                        {
                          value: "Deqa Ahmed RN",
                          label: "Deqa Ahmed RN",
                        },
                      ]?.map((option) => (
                        <div
                          key={option.value}
                          style={{
                            minHight: 0,
                            margin: 0,
                            padding: "0px 0px 0px auto",
                          }}
                          className="form-check d-flex align-items-cener gap-1"
                        >
                          <input
                            type="radio"
                            className="form-check-input"
                            name="internalReferralSource"
                            id={`internalReferralSource-${option.value}`}
                            value={option.value}
                            checked={
                              formReferralData?.internalReferralSource ===
                              option.value
                            }
                          />
                          <label
                            style={{ fontSize: "11px" }}
                            className="form-label d-block"
                            htmlFor={`internalReferralSource-${option.value}`}
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </td>
                <td>
                  {/* Facility Referral Source */}
                  <div className=" col ">
                    <label
                      style={{ fontSize: "11px" }}
                      htmlFor="facilityReferralSource"
                      className="form-label d-block"
                    >
                      Facility Referral Source
                    </label>
                    <div>
                      {[{ value: "", label: "Select option" }]?.map(
                        (option) => (
                          <div
                            key={option.value}
                            style={{
                              minHight: 0,
                              margin: 0,
                              padding: "0px 0px 0px auto",
                            }}
                            className="form-check d-flex align-items-cener gap-1"
                          >
                            <input
                              type="radio"
                              className="form-check-input"
                              name="facilityReferralSource"
                              id={`facilityReferralSource-${option.value}`}
                              value={option.value}
                              checked={
                                formReferralData?.facilityReferralSource ===
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
                  <div className=" col ">
                    <label
                      style={{ fontSize: "11px" }}
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
                        {
                          value: "Not Available",
                          label: "Not Available",
                        },
                      ]?.map((option) => (
                        <div
                          key={option.value}
                          style={{
                            minHight: 0,
                            margin: 0,
                            padding: "0px 0px 0px auto",
                          }}
                          className="form-check d-flex align-items-cener gap-1"
                        >
                          <input
                            type="radio"
                            className="form-check-input"
                            name="typeOfInpatientAdmission"
                            id={`typeOfInpatientAdmission-${option.value}`}
                            value={option.value}
                            checked={
                              formReferralData?.typeOfInpatientAdmission ===
                              option.value
                            }
                          />
                          <label
                            style={{ fontSize: "11px" }}
                            className="form-label d-block"
                            htmlFor={`typeOfInpatientAdmission-${option.value}`}
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
            <tfoot className="footer-print">
              <tr>
                <td colSpan="3">
                  <span style={{ display: "block" }}>Carelink Solution</span>
                </td>
              </tr>
            </tfoot>
          </table>
          {/* Content */}
        </div>
      </div>
    </div>
  );
};

export default SinglePatient;
