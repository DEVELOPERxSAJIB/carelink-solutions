import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSectionState,
  updateFormData,
} from "./../../Redux/slices/SectionSlice";

import { showToast } from "./../../utils/Toastify";
import {
  getAllSectionStepState,
  updateSteps,
} from "./../../Redux/slices/SectionStep";
import AuthLoader from "./../../utils/Loaders/AuthLoader";
import {
  useCreatePatientMutation,
  useUpdatePatientMutation,
} from "../../Redux/api/PatientApi.js";
const PatientProfile = () => {
  const componentRef = useRef();
  const dispatch = useDispatch();
  const data = useSelector(getAllSectionState);
  const allSteps = useSelector(getAllSectionStepState);

  const [editId, setEditId] = useState(null);

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
    routeMedicationListTransmissionToPatient: [],
    hearing: "",
    vision: "",
    healthLiteracy: "",
    interviewConducted: "",
    repetitionOfThreeWords: "",
    temporalOrientationYear: "",
    temporalOrientationMonth: "",
    temporalOrientationDay: "",
    recallSock: "",
    recallBlue: "",
    recallBed: "",
    bimsSummaryScore: "",
    deliriumMentalStatusChange: "",
    deliriumInattention: "",
    deliriumDisorganizedThinking: "",
    deliriumAlteredConsciousness: "",
    cognitiveFunctioning: "",
    whenConfused: "",
    whenAnxious: "",
    memoryDeficit: false,
    impairedDecisionMaking: false,
    verbalDisruption: false,
    physicalAggression: false,
    disruptiveBehavior: false,
    delusionalBehavior: false,
    noneOfTheAbove: false,
    disruptiveBehaviorFrequency: "",
    livingArrangement: [],
    assistanceAvailability: "",
    adlAssistance: "",
    medicationAssistance: "",
    medicalProceduresAssistance: "",
    supervisionSafetyAssistance: "",
    grooming: "",
    upperBodyDressing: "",
    lowerBodyDressing: "",
    bathing: "",
    toiletTransferring: "",
    toiletingHygiene: "",
    transferring: "",
    ambulationLocomotion: "",
    gg0100: {
      selfCare: "",
      indoorMobility: "",
      stairs: "",
      functionalCognition: "",
    },
    gg0110: {
      manualWheelchair: false,
      motorizedWheelchair: false,
      mechanicalLift: false,
      walker: false,
      orthoticsProsthetics: false,
      noneOfTheAbove: false,
    },
    gg0130: {
      eating: "",
      oralHygiene: "",
      toiletingHygiene: "",
      showerBatheSelf: "",
      upperBodyDressing: "",
      lowerBodyDressing: "",
      puttingOnTakingOffFootwear: "",
    },
    gg0170: {
      rollLeftRight: "",
      sitToLying: "",
      lyingToSitting: "",
      sitToStand: "",
      chairBedToChair: "",
      toiletTransfer: "",
      carTransfer: "",
      walk10Feet: "",
      walk50FeetTwoTurns: "",
      walk150Feet: "",
      walk10FeetUnevenSurfaces: "",
      stepCurb: "",
      fourSteps: "",
      twelveSteps: "",
      pickingUpObject: "",
      usesWheelchairScooter: false,
      wheel50FeetTwoTurns: "",
      wheel150Feet: "",
    },
    m1600: "",
    m1610: "",
    m1620: "",
    m1630: "",
    primaryDiagnosis: "",
    otherDiagnoses: ["", "", "", "", "", ""],
    otherDiagnosesRatings: ["", "", "", "", "", ""],
    primaryDiagnosisRating: "",
    comorbidities: [],
    riskForHospitalization: [],
    painEffectOnSleep: "",
    painInterferenceWithTherapy: "",
    painInterferenceWithActivities: "",
    fallsSinceSOCROC: "",
    fallsDetails: "",
    shortOfBreath: "",
    height: "",
    weight: "",
    nutritionalApproachesOnAdmission: [],
    nutritionalApproachesLast7Days: [],
    nutritionalApproachesAtDischarge: [],
    feedingOrEating: "",
    unhealedPressureUlcer: "",
    oldestStage2PressureUlcer: "",
    numberOfStage2Ulcers: "",
    numberOfStage3Ulcers: "",
    numberOfStage4Ulcers: "",
    numberOfUnstageableDressingUlcers: "",
    numberOfUnstageableSloughUlcers: "",
    numberOfDeepTissueInjuries: "",
    numberOfStage1Injuries: "",
    mostProblematicUlcerStage: "",
    stasisUlcer: "",
    numberOfObservableStasisUlcers: "",
    mostProblematicStasisUlcerStatus: "",
    surgicalWound: "",
    mostProblematicSurgicalWoundStatus: "",
    highRiskDrugs: {
      antipsychotic: { isTaking: false, indicationNoted: false },
      anticoagulant: { isTaking: false, indicationNoted: false },
      antibiotic: { isTaking: false, indicationNoted: false },
      opioid: { isTaking: false, indicationNoted: false },
      antiplatelet: { isTaking: false, indicationNoted: false },
      hypoglycemic: { isTaking: false, indicationNoted: false },
      none: { isTaking: false },
    },
    drugRegimenReview: "",
    medicationFollowUp: "",
    medicationIntervention: "",
    highRiskDrugEducation: "",
    managementOralMedications: "",
    managementInjectableMedications: [],
    specialTreatmentsDischarge: [],
    specialTreatmentsAdmission: [],
    covidVaccinationUpToDate: "",
    influenzaVaccinePeriod: "",
    influenzaVaccineReceived: "",
    fallsPrevention: "",
    depressionIntervention: "",
    painIntervention: "",
    pressureUlcerPrevention: "",
    pressureUlcerTreatment: "",
  });
  console.log(formData);
  const handleInputChange = (e) => {
    const { name, value, type, checked, options } = e.target;
    if (type === "checkbox") {
      if (name === "riskForHospitalization") {
        // Handle checkboxes for riskForHospitalization
        setFormData((prevData) => {
          const newRiskForHospitalization = {
            ...prevData.riskForHospitalization,
          };
          newRiskForHospitalization[value] = checked;
          return {
            ...prevData,
            riskForHospitalization: newRiskForHospitalization,
          };
        });
      } else if (name === "primaryDiagnosis") {
        // Handle checkboxes for primaryDiagnosis
        setFormData((prevData) => {
          const newPrimaryDiagnosis = new Set(prevData.primaryDiagnosis || []);
          if (checked) {
            newPrimaryDiagnosis.add(value);
          } else {
            newPrimaryDiagnosis.delete(value);
          }
          return {
            ...prevData,
            primaryDiagnosis: Array.from(newPrimaryDiagnosis),
          };
        });
      } else if (name.startsWith("otherDiagnoses")) {
        // Handle checkboxes for otherDiagnoses
        const index = parseInt(name.split("-")[1], 10);
        setFormData((prevData) => {
          const newOtherDiagnoses = [...(prevData.otherDiagnoses || [])];
          const newDiagnosesSet = new Set(newOtherDiagnoses[index] || []);
          if (checked) {
            newDiagnosesSet.add(value);
          } else {
            newDiagnosesSet.delete(value);
          }
          newOtherDiagnoses[index] = Array.from(newDiagnosesSet);
          return { ...prevData, otherDiagnoses: newOtherDiagnoses };
        });
      } else if (name === "comorbidities") {
        // Handle checkboxes for comorbidities
        setFormData((prevData) => ({
          ...prevData,
          comorbidities: {
            ...prevData.comorbidities,
            [value]: checked,
          },
        }));
      } else {
        // Handle other checkboxes or nested checkboxes
        const [section, field] = name.split(".");
        if (section && field) {
          setFormData((prevData) => ({
            ...prevData,
            [section]: {
              ...prevData[section],
              [field]: checked,
            },
          }));
        } else {
          setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: checked,
          }));
        }
      }
    } else if (type === "radio") {
      if (name === "primaryDiagnosisRating") {
        // Handle radio buttons for primaryDiagnosisRating
        setFormData((prevData) => ({
          ...prevData,
          primaryDiagnosisRating: value,
        }));
      } else if (name.startsWith("otherDiagnosesRatings")) {
        // Handle radio buttons for otherDiagnosesRatings
        const index = parseInt(name.split("-")[1], 10);
        setFormData((prevData) => {
          const newRatings = [...(prevData.otherDiagnosesRatings || [])];
          newRatings[index] = value;
          return { ...prevData, otherDiagnosesRatings: newRatings };
        });
      } else {
        // Handle nested radio button updates (e.g., gg0100)
        const [section, field] = name.split(".");
        if (section && field) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            [section]: {
              ...prevFormData[section],
              [field]: value,
            },
          }));
        } else {
          // Handle top-level radio button updates
          setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
          }));
        }
      }
    } else if (type === "select-multiple") {
      // Handle multi-select dropdowns
      const selectedValues = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: selectedValues,
      }));
    } else {
      // Handle other input types
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleCheckboxChange = (e, section, field) => {
    const { checked, value, name } = e.target;

    if (section && !field) {
      // Handle nested checkbox updates
      setFormData((prevData) => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [field]: checked,
        },
      }));
    } else if (section && field) {
      // Handle nested checkbox updates
      setFormData((prevData) => ({
        ...prevData,
        highRiskDrugs: {
          ...prevData.highRiskDrugs,
          [section]: {
            ...prevData.highRiskDrugs[section],
            [field]: checked,
          },
        },
      }));
    } else if (
      name === "race" ||
      name === "ethnicity" ||
      name === "paymentSources" ||
      name === "transportation" ||
      name === "inpatientFacilityDischargedFrom" ||
      name === "reasonForEmergentCare" ||
      name === "routeMedicationListTransmission" ||
      name === "livingArrangement" ||
      name === "specialTreatmentsDischarge" ||
      name === "managementInjectableMedications" ||
      name === "specialTreatmentsAdmission" ||
      name === "comorbidities" ||
      name === "riskForHospitalization" ||
      name === "nutritionalApproachesOnAdmission" ||
      name === "nutritionalApproachesLast7Days" ||
      name === "nutritionalApproachesAtDischarge" ||
      name === "routeMedicationListTransmissionToPatient"
    ) {
      setFormData((prevFormData) => {
        const updatedArray = checked
          ? [...prevFormData[name], value]
          : prevFormData[name].filter((item) => item !== value);

        return {
          ...prevFormData,
          [name]: updatedArray,
        };
      });
    } else {
      // Handle top-level checkbox updates
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: checked,
      }));
    }
  };

  const handleSelectChange = (e) => {
    const { name, value, type, options } = e.target;

    if (type === "select-multiple") {
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
  const handleOtherDiagnosisChange = (index, e) => {
    const updatedDiagnoses = [...formData.otherDiagnoses];
    updatedDiagnoses[index] = e.target.value;
    setFormData({
      ...formData,
      otherDiagnoses: updatedDiagnoses,
    });
  };

  // Handle change for other diagnoses ratings
  const handleOtherDiagnosisRatingChange = (index, rating) => {
    const updatedRatings = [...formData.otherDiagnosesRatings];
    updatedRatings[index] = rating;
    setFormData({
      ...formData,
      otherDiagnosesRatings: updatedRatings,
    });
  };
  const [createPatient, { data: patient, isLoading, error, isSuccess }] =
    useCreatePatientMutation();

  const [
    updatePatient,
    {
      data: updateData,
      isSuccess: isUpdateSuccess,
      isLoading: isUpdateLoading,
      error: updateError,
    },
  ] = useUpdatePatientMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      updatePatient({ patientId: editId, patientData: formData });
    } else {
      dispatch(updateFormData(formData));
      createPatient(formData);
      localStorage.setItem("patient", JSON.stringify(formData));
    }
  };
  const handleSaveAndExit = (e) => {
    e.preventDefault();
    createPatient(formData);
    localStorage.setItem("patient", JSON.stringify(formData));
  };
  const handleSaveAndContinue = (e) => {
    e.preventDefault();
    createPatient(formData);
    localStorage.setItem("patient", JSON.stringify(formData));
  };

  useEffect(() => {
    if (isUpdateSuccess || isSuccess) {
      dispatch(updateSteps({ ...allSteps, steps: allSteps?.steps + 1 }));
      localStorage.setItem("patient", JSON.stringify(patient?.payload));
    }
  });

  useEffect(() => {
    if (updateData?.message) {
      showToast("success", updateData.message);
    }
    if (updateError?.data?.message) {
      showToast("error", updateError.data.message);
    }
    if (error?.data?.message) {
      showToast("error", error.data.message);
    }
    if (data?.message) {
      showToast("success", data.message);
    }
    if (patient?.message) {
      showToast("success", patient.message);
    }
  }, [
    updateData?.message,
    updateError?.data?.message,
    error?.data?.message,
    data?.message,
    patient?.message,
  ]);
  useEffect(() => {
    const patientData = JSON.parse(localStorage.getItem("patient"));
    if (patientData) {
      setFormData({ ...patientData });
    }
  }, []);

  if (isLoading || isUpdateLoading) return <AuthLoader />;
  return (
    <div className="w-100" ref={componentRef}>
      <form className="mt-5 w-100" onSubmit={handleSubmit}>
        {/* section a  */}
        <div className="accordion w-100" id="administrativeInfoAccordion">
          <div className="accordion-item w-100">
            <h2 className="print-title">Patient Details</h2>
            <h4 className="print-title">Administrative Information</h4>
            <h2 className="accordion-header w-100" id="headingAdmin">
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
              className="accordion-collapse collapse"
              aria-labelledby="headingAdmin"
              data-bs-parent="#administrativeInfoAccordion"
            >
              <div className="accordion-body w-100 print-area p-4">
                {/* Fields */}

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="npi" className="form-label">
                      M0018. National Provider Identifier (NPI):
                      <span className="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="npi"
                      name="npi"
                      placeholder="Enter NPI Number"
                      value={formData?.npi}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="birthDate" className="form-label">
                      M0066. Birth Date:
                      <span className="text-danger"> *</span>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="birthDate"
                      name="birthDate"
                      value={formData?.birthDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="cmsCertificationNumber"
                      className="form-label"
                    >
                      M0010. CMS Certification Number:
                      <span className="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cmsCertificationNumber"
                      name="cmsCertificationNumber"
                      placeholder="Enter CMS Certification Number"
                      value={formData?.cmsCertificationNumber}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="branchState" className="form-label">
                      M0014. Branch State:
                      <span className="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="branchState"
                      name="branchState"
                      placeholder="Enter Branch State"
                      value={formData?.branchState}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="branchIdNumber" className="form-label">
                      M0016. Branch ID Number:
                      <span className="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="branchIdNumber"
                      name="branchIdNumber"
                      placeholder="Enter Branch ID Number"
                      value={formData?.branchIdNumber}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="patientIdNumber" className="form-label">
                      M0020. Patient ID Number:
                      <span className="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="patientIdNumber"
                      name="patientIdNumber"
                      placeholder="Enter Patient ID Number"
                      value={formData?.patientIdNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="startOfCareDate" className="form-label">
                      M0030. Start of Care Date:
                      <span className="text-danger"> *</span>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="startOfCareDate"
                      name="startOfCareDate"
                      value={formData?.startOfCareDate}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label
                      htmlFor="resumptionOfCareDate"
                      className="form-label"
                    >
                      M0032. Resumption of Care Date:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="resumptionOfCareDate"
                      name="resumptionOfCareDate"
                      value={formData?.resumptionOfCareDate}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="patientFirstName" className="form-label">
                      M0040. Patient First Name:
                      <span className="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="patientFirstName"
                      name="patientFirstName"
                      placeholder="Enter First Name"
                      value={formData?.patientFirstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="patientMiddleInitial"
                      className="form-label"
                    >
                      MI:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="patientMiddleInitial"
                      name="patientMiddleInitial"
                      placeholder="Enter MI"
                      value={formData?.patientMiddleInitial}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="patientLastName" className="form-label">
                      M0040. Patient Last Name:
                      <span className="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="patientLastName"
                      name="patientLastName"
                      placeholder="Enter Last Name"
                      value={formData?.patientLastName}
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
                      value={formData?.patientSuffix}
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
                      <span className="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="patientStateOfResidence"
                      name="patientStateOfResidence"
                      placeholder="Enter State of Residence"
                      value={formData?.patientStateOfResidence}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="patientZipCode" className="form-label">
                      M0060. Patient ZIP Code:
                      <span className="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="patientZipCode"
                      name="patientZipCode"
                      placeholder="Enter ZIP Code"
                      value={formData?.patientZipCode}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label
                      htmlFor="socialSecurityNumber"
                      className="form-label"
                    >
                      M0064. Social Security Number:
                      <span className="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="socialSecurityNumber"
                      name="socialSecurityNumber"
                      placeholder="Enter Social Security Number"
                      value={formData?.socialSecurityNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="medicareNumber" className="form-label">
                      M0063. Medicare Number:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="medicareNumber"
                      name="medicareNumber"
                      placeholder="Enter Medicare Number"
                      value={formData?.medicareNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="medicaidNumber" className="form-label">
                      M0065. Medicaid Number:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="medicaidNumber"
                      name="medicaidNumber"
                      placeholder="Enter Medicaid Number"
                      value={formData?.medicaidNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="gender" className="form-label">
                      M0069. Gender:
                      <span className="text-danger"> *</span>
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      className="form-select"
                      value={formData?.gender}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="ethnicity" className="form-label">
                      A1005. Ethnicity (Are you of Hispanic, Latino/a, or
                      Spanish origin?)
                      <span className="text-danger"> *</span>
                    </label>
                    <div id="ethnicity" className="form-check">
                      <input
                        type="checkbox"
                        id="ethnicityA"
                        name="ethnicity"
                        value="No, not of Hispanic, Latino/a, or Spanish origin"
                        checked={formData?.ethnicity?.includes(
                          "No, not of Hispanic, Latino/a, or Spanish origin"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="ethnicityA" className="form-check-label">
                        A. No, not of Hispanic, Latino/a, or Spanish origin
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="ethnicityB"
                        name="ethnicity"
                        value="Yes, Mexican, Mexican American, Chicano/a"
                        checked={formData?.ethnicity?.includes(
                          "Yes, Mexican, Mexican American, Chicano/a"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="ethnicityB" className="form-check-label">
                        B. Yes, Mexican, Mexican American, Chicano/a
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="ethnicityC"
                        name="ethnicity"
                        value="Yes, Puerto Rican"
                        checked={formData?.ethnicity?.includes(
                          "Yes, Puerto Rican"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="ethnicityC" className="form-check-label">
                        C. Yes, Puerto Rican
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="ethnicityD"
                        name="ethnicity"
                        value="Yes, Cuban"
                        checked={formData?.ethnicity?.includes("Yes, Cuban")}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="ethnicityD" className="form-check-label">
                        D. Yes, Cuban
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="ethnicityE"
                        name="ethnicity"
                        value="Yes, another Hispanic, Latino, or Spanish origin"
                        checked={formData?.ethnicity?.includes(
                          "Yes, another Hispanic, Latino, or Spanish origin"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="ethnicityE" className="form-check-label">
                        E. Yes, another Hispanic, Latino, or Spanish origin
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="ethnicityX"
                        name="ethnicity"
                        value="Patient unable to respond"
                        checked={formData?.ethnicity?.includes(
                          "Patient unable to respond"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="ethnicityX" className="form-check-label">
                        X. Patient unable to respond
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="ethnicityY"
                        name="ethnicity"
                        value="Patient declines to respond"
                        checked={formData?.ethnicity?.includes(
                          "Patient declines to respond"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="ethnicityY" className="form-check-label">
                        Y. Patient declines to respond
                      </label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="race" className="form-label">
                      A1010. Race(What is your race?):
                      <span className="text-danger"> *</span>
                    </label>
                    <div id="race" className="form-check">
                      <input
                        type="checkbox"
                        id="raceA"
                        name="race"
                        value="White"
                        checked={formData?.race?.includes("White")}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="raceA" className="form-check-label">
                        A. White
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="raceB"
                        name="race"
                        value="Black or African American"
                        checked={formData?.race?.includes(
                          "Black or African American"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="raceB" className="form-check-label">
                        B. Black or African American
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="raceC"
                        name="race"
                        value="American Indian or Alaska Native"
                        checked={formData?.race?.includes(
                          "American Indian or Alaska Native"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="raceC" className="form-check-label">
                        C. American Indian or Alaska Native
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="raceD"
                        name="race"
                        value="Asian Indian"
                        checked={formData?.race?.includes("Asian Indian")}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="raceD" className="form-check-label">
                        D. Asian Indian
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="raceE"
                        name="race"
                        value="Chinese"
                        checked={formData?.race?.includes("Chinese")}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="raceE" className="form-check-label">
                        E. Chinese
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="raceF"
                        name="race"
                        value="Filipino"
                        checked={formData?.race?.includes("Filipino")}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="raceF" className="form-check-label">
                        F. Filipino
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="raceG"
                        name="race"
                        value="Japanese"
                        checked={formData?.race?.includes("Japanese")}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="raceG" className="form-check-label">
                        G. Japanese
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="raceH"
                        name="race"
                        value="Korean"
                        checked={formData?.race?.includes("Korean")}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="raceH" className="form-check-label">
                        H. Korean
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="raceI"
                        name="race"
                        value="Vietnamese"
                        checked={formData?.race?.includes("Vietnamese")}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="raceI" className="form-check-label">
                        I. Vietnamese
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="raceJ"
                        name="race"
                        value="Other Asian"
                        checked={formData?.race?.includes("Other Asian")}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="raceJ" className="form-check-label">
                        J. Other Asian
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="raceK"
                        name="race"
                        value="Native Hawaiian"
                        checked={formData?.race?.includes("Native Hawaiian")}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="raceK" className="form-check-label">
                        K. Native Hawaiian
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="raceL"
                        name="race"
                        value="Guamanian or Chamorro"
                        checked={formData?.race?.includes(
                          "Guamanian or Chamorro"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="raceL" className="form-check-label">
                        L. Guamanian or Chamorro
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="raceM"
                        name="race"
                        value="Samoan"
                        checked={formData?.race?.includes("Samoan")}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="raceM" className="form-check-label">
                        M. Samoan
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="raceN"
                        name="race"
                        value="Other Pacific Islander"
                        checked={formData?.race?.includes(
                          "Other Pacific Islander"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="raceN" className="form-check-label">
                        N. Other Pacific Islander
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="raceX"
                        name="race"
                        value="Patient unable to respond"
                        checked={formData?.race?.includes(
                          "Patient unable to respond"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="raceX" className="form-check-label">
                        X. Patient unable to respond
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="raceY"
                        name="race"
                        value="Patient declines to respond"
                        checked={formData?.race?.includes(
                          "Patient declines to respond"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="raceY" className="form-check-label">
                        Y. Patient declines to respond
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="raceZ"
                        name="race"
                        value="None of the above"
                        checked={formData?.race?.includes("None of the above")}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="raceZ" className="form-check-label">
                        Z. None of the above
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="ss" className="form-label">
                      M0150. Current Payment Sources for Home Care:
                      <span className="text-danger"> *</span>
                    </label>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="s0"
                        name="paymentSources"
                        value="None; no charge for current services"
                        checked={formData?.paymentSources?.includes(
                          "None; no charge for current services"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="s0" className="form-check-label">
                        0. None; no charge for current services
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="s1"
                        name="paymentSources"
                        value="Medicare (traditional fee-for-service)"
                        checked={formData?.paymentSources?.includes(
                          "Medicare (traditional fee-for-service)"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="s1" className="form-check-label">
                        1. Medicare (traditional fee-for-service)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="s2"
                        name="paymentSources"
                        value="Medicare (HMO/managed care/Advantage plan)"
                        checked={formData?.paymentSources?.includes(
                          "Medicare (HMO/managed care/Advantage plan)"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="s2" className="form-check-label">
                        2. Medicare (HMO/managed care/Advantage plan)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="s3"
                        name="paymentSources"
                        value="Medicaid (traditional fee-for-service)"
                        checked={formData?.paymentSources?.includes(
                          "Medicaid (traditional fee-for-service)"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="s3" className="form-check-label">
                        3. Medicaid (traditional fee-for-service)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="s4"
                        name="paymentSources"
                        value="Medicaid (HMO/managed care)"
                        checked={formData?.paymentSources?.includes(
                          "Medicaid (HMO/managed care)"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="s4" className="form-check-label">
                        4. Medicaid (HMO/managed care)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="s5"
                        name="paymentSources"
                        value="Worker’s compensation"
                        checked={formData?.paymentSources?.includes(
                          "Worker’s compensation"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="s5" className="form-check-label">
                        5. Worker’s compensation
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="s6"
                        name="paymentSources"
                        value="Title programs (for example, Title III, V, or XX)"
                        checked={formData?.paymentSources?.includes(
                          "Title programs (for example, Title III, V, or XX)"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="s6" className="form-check-label">
                        6. Title programs (for example, Title III, V, or XX)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="s7"
                        name="paymentSources"
                        value="Other government (for example, TriCare, VA)"
                        checked={formData?.paymentSources?.includes(
                          "Other government (for example, TriCare, VA)"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="s7" className="form-check-label">
                        7. Other government (for example, TriCare, VA)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="s8"
                        name="paymentSources"
                        value="Private insurance"
                        checked={formData?.paymentSources?.includes(
                          "Private insurance"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="s8" className="form-check-label">
                        8. Private insurance
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="s9"
                        name="paymentSources"
                        value="Private HMO/managed care"
                        checked={formData?.paymentSources?.includes(
                          "Private HMO/managed care"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="s9" className="form-check-label">
                        9. Private HMO/managed care
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="s10"
                        name="paymentSources"
                        value="Self-pay"
                        checked={formData?.paymentSources?.includes("Self-pay")}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="s10" className="form-check-label">
                        10. Self-pay
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="s11"
                        name="paymentSources"
                        value="Other (specify)"
                        checked={formData?.paymentSources?.includes(
                          "Other (specify)"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="s11" className="form-check-label">
                        11. Other (specify)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="sUK"
                        name="paymentSources"
                        value="Unknown"
                        checked={formData?.paymentSources?.includes("Unknown")}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="sUK" className="form-check-label">
                        UK. Unknown
                      </label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="preferredLanguage" className="form-label">
                      A1110. Language
                      <span className="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="preferredLanguage"
                      name="preferredLanguage"
                      placeholder="Enter Preferred Language"
                      value={formData?.preferredLanguage}
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
                      value={formData?.needInterpreter}
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
                      M0080. Discipline of Person Completing Assessment:
                    </label>
                    <select
                      id="disciplineOfPersonCompletingAssessment"
                      name="disciplineOfPersonCompletingAssessment"
                      className="form-select"
                      value={formData?.disciplineOfPersonCompletingAssessment}
                      onChange={handleSelectChange}
                    >
                      <option value="">Select...</option>
                      <option value="RN">1. RN</option>
                      <option value="PT">2. PT</option>
                      <option value="SLP/S">3. SLP/S</option>
                    </select>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label
                      htmlFor="dateAssessmentCompleted"
                      className="form-label"
                    >
                      M0090. Date Assessment Completed:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="dateAssessmentCompleted"
                      name="dateAssessmentCompleted"
                      value={formData?.dateAssessmentCompleted}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="reasonForAssessment" className="form-label">
                      M0100. This Assessment is Currently Being Completed for
                      the Following Reason
                    </label>
                    <select
                      id="reasonForAssessment"
                      name="reasonForAssessment"
                      className="form-select"
                      value={formData?.reasonForAssessment}
                      onChange={handleSelectChange}
                    >
                      <option value="">Select...</option>
                      <option value="Start of care — further visits planned">
                        1. Start of care — further visits planned
                      </option>
                      <option value="Resumption of Care (after inpatient stay)">
                        3. Resumption of Care (after inpatient stay)
                      </option>
                      <option value="Recertification (follow-up) reassessment">
                        4. Recertification (follow-up) reassessment
                      </option>
                      <option value="Other follow-up">
                        5. Other follow-up
                      </option>
                      <option value="Transferred to an inpatient facility — patient not discharged from agency">
                        6. Transferred to an inpatient facility — patient not
                        discharged from agency
                      </option>
                      <option value="Transferred to an inpatient facility — patient discharged from agency">
                        7. Transferred to an inpatient facility — patient
                        discharged from agency
                      </option>
                      <option value="Death at home">8. Death at home</option>
                      <option value="Discharge from agency">
                        9. Discharge from agency
                      </option>
                    </select>
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
                      value={formData?.dischargeTransferDeathDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="dateOfPhysicianOrderedSOC"
                      className="form-label"
                    >
                      M0102. Date of Physician-ordered Start of Care (Resumption
                      of Care)
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="dateOfPhysicianOrderedSOC"
                      name="dateOfPhysicianOrderedSOC"
                      value={formData?.dateOfPhysicianOrderedSOC}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="dateOfReferral" className="form-label">
                      M0104. Date of Referral
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="dateOfReferral"
                      name="dateOfReferral"
                      value={formData?.dateOfReferral}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      A1250. Transportation (NACHC©):
                      <span className="text-danger"> *</span>
                    </label>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="transportationMedicalAppointments"
                        name="transportation"
                        value="Yes, it has kept me from medical appointments or from getting my medications"
                        checked={formData?.transportation?.includes(
                          "Yes, it has kept me from medical appointments or from getting my medications"
                        )}
                        onChange={handleCheckboxChange}
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
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="transportationNonMedical"
                        name="transportation"
                        value="Yes, it has kept me from non-medical meetings, appointments, work, or from getting things that I need"
                        checked={formData?.transportation?.includes(
                          "Yes, it has kept me from non-medical meetings, appointments, work, or from getting things that I need"
                        )}
                        onChange={handleCheckboxChange}
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
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="transportationNo"
                        name="transportation"
                        value="No"
                        checked={formData?.transportation?.includes("No")}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="transportationNo"
                        className="form-check-label"
                      >
                        C. No
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="transportationUnableToRespond"
                        name="transportation"
                        value="Patient unable to respond"
                        checked={formData?.transportation?.includes(
                          "Patient unable to respond"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="transportationUnableToRespond"
                        className="form-check-label"
                      >
                        X. Patient unable to respond
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="transportationDeclines"
                        name="transportation"
                        value="Patient declines to respond"
                        checked={formData?.transportation?.includes(
                          "Patient declines to respond"
                        )}
                        onChange={handleCheckboxChange}
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
                </div>
                <div className="row mb-3 2">
                  <div className="col-md-6">
                    <label className="form-label">
                      M1000. From which of the following Inpatient Facilities
                      was the patient discharged within the past 14 days?
                      <span className="text-danger"> *</span>
                    </label>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="longTermNursingFacility"
                        name="inpatientFacilityDischargedFrom"
                        value="Long-term nursing facility (NF)"
                        checked={formData?.inpatientFacilityDischargedFrom?.includes(
                          "Long-term nursing facility (NF)"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="longTermNursingFacility"
                        className="form-check-label"
                      >
                        1. Long-term nursing facility (NF)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="skilledNursingFacility"
                        name="inpatientFacilityDischargedFrom"
                        value="Skilled nursing facility (SNF/TCU)"
                        checked={formData?.inpatientFacilityDischargedFrom?.includes(
                          "Skilled nursing facility (SNF/TCU)"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="skilledNursingFacility"
                        className="form-check-label"
                      >
                        2. Skilled nursing facility (SNF/TCU)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="shortStayAcuteHospital"
                        name="inpatientFacilityDischargedFrom"
                        value="Short-stay acute hospital (IPPS)"
                        checked={formData?.inpatientFacilityDischargedFrom?.includes(
                          "Short-stay acute hospital (IPPS)"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="shortStayAcuteHospital"
                        className="form-check-label"
                      >
                        3. Short-stay acute hospital (IPPS)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="longTermCareHospital"
                        name="inpatientFacilityDischargedFrom"
                        value="Long-term care hospital (LTCH)"
                        checked={formData?.inpatientFacilityDischargedFrom?.includes(
                          "Long-term care hospital (LTCH)"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="longTermCareHospital"
                        className="form-check-label"
                      >
                        4. Long-term care hospital (LTCH)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="inpatientRehabilitationHospital"
                        name="inpatientFacilityDischargedFrom"
                        value="Inpatient rehabilitation hospital or unit (IRF)"
                        checked={formData?.inpatientFacilityDischargedFrom?.includes(
                          "Inpatient rehabilitation hospital or unit (IRF)"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="inpatientRehabilitationHospital"
                        className="form-check-label"
                      >
                        5. Inpatient rehabilitation hospital or unit (IRF)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="psychiatricHospital"
                        name="inpatientFacilityDischargedFrom"
                        value="Psychiatric hospital or unit"
                        checked={formData?.inpatientFacilityDischargedFrom?.includes(
                          "Psychiatric hospital or unit"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="psychiatricHospital"
                        className="form-check-label"
                      >
                        6. Psychiatric hospital or unit
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="otherInpatientFacility"
                        name="inpatientFacilityDischargedFrom"
                        value="Other (specify)"
                        checked={formData?.inpatientFacilityDischargedFrom?.includes(
                          "Other (specify)"
                        )}
                        onChange={handleCheckboxChange}
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
                  <div className="col-md-6">
                    <label
                      htmlFor="inpatientDischargeDate"
                      className="form-label"
                    >
                      M1005. Inpatient Discharge Date (most recent)
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="inpatientDischargeDate"
                      name="inpatientDischargeDate"
                      value={formData?.inpatientDischargeDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">M2301. Emergent Care </label>
                    <div className="form-check">
                      <input
                        type="radio"
                        id="emergentCareNo"
                        name="emergentCare"
                        value="0"
                        checked={formData?.emergentCare === "0"}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="emergentCareNo"
                        className="form-check-label"
                      >
                        0. No
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        id="emergentCareYesWithoutAdmission"
                        name="emergentCare"
                        value="1"
                        checked={formData?.emergentCare === "1"}
                        onChange={handleInputChange}
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
                    <div className="form-check">
                      <input
                        type="radio"
                        id="emergentCareYesWithAdmission"
                        name="emergentCare"
                        value="2"
                        checked={formData?.emergentCare === "2"}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="emergentCareYesWithAdmission"
                        className="form-check-label"
                      >
                        2. Yes, used hospital emergency department WITH hospital
                        admission
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        id="emergentCareUnknown"
                        name="emergentCare"
                        value="UK"
                        checked={formData?.emergentCare === "UK"}
                        onChange={handleInputChange}
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

                  <div className="col-md-6">
                    <label className="form-label">
                      M2310. Reason for Emergent Care
                    </label>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="reasonImproperMedication"
                        name="reasonForEmergentCare"
                        value="1"
                        checked={formData?.reasonForEmergentCare?.includes("1")}
                        onChange={handleCheckboxChange}
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
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="reasonHypoHyperglycemia"
                        name="reasonForEmergentCare"
                        value="10"
                        checked={formData?.reasonForEmergentCare?.includes(
                          "10"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="reasonHypoHyperglycemia"
                        className="form-check-label"
                      >
                        10. Hypo/Hyperglycemia, diabetes out of control
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="reasonOther"
                        name="reasonForEmergentCare"
                        value="19"
                        checked={formData?.reasonForEmergentCare?.includes(
                          "19"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="reasonOther" className="form-check-label">
                        19. Other than above reasons
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="reasonUnknown"
                        name="reasonForEmergentCare"
                        value="UK"
                        checked={formData?.reasonForEmergentCare?.includes(
                          "UK"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="reasonUnknown"
                        className="form-check-label"
                      >
                        UK Reason unknown
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">
                      M2410. To which Inpatient Facility has the patient been
                      admitted?
                    </label>
                    <div className="form-check">
                      <input
                        type="radio"
                        id="admittedToHospital"
                        name="inpatientFacilityAdmittedTo"
                        value="1"
                        checked={formData?.inpatientFacilityAdmittedTo === "1"}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="admittedToHospital"
                        className="form-check-label"
                      >
                        1. Hospital
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        id="admittedToRehabilitationFacility"
                        name="inpatientFacilityAdmittedTo"
                        value="2"
                        checked={formData?.inpatientFacilityAdmittedTo === "2"}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="admittedToRehabilitationFacility"
                        className="form-check-label"
                      >
                        2. Rehabilitation facility
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        id="admittedToNursingHome"
                        name="inpatientFacilityAdmittedTo"
                        value="3"
                        checked={formData?.inpatientFacilityAdmittedTo === "3"}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="admittedToNursingHome"
                        className="form-check-label"
                      >
                        3. Nursing home
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        id="admittedToHospice"
                        name="inpatientFacilityAdmittedTo"
                        value="4"
                        checked={formData?.inpatientFacilityAdmittedTo === "4"}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="admittedToHospice"
                        className="form-check-label"
                      >
                        4. Hospice
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        id="noInpatientFacility"
                        name="inpatientFacilityAdmittedTo"
                        value="NA"
                        checked={formData?.inpatientFacilityAdmittedTo === "NA"}
                        onChange={handleInputChange}
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

                  <div className="col-md-6">
                    <label className="form-label">
                      M2420. Discharge Disposition:
                    </label>
                    <div className="form-check">
                      <input
                        type="radio"
                        id="remainedInCommunityWithoutServices"
                        name="dischargeDisposition"
                        value="1"
                        checked={formData?.dischargeDisposition === "1"}
                        onChange={handleInputChange}
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
                    <div className="form-check">
                      <input
                        type="radio"
                        id="remainedInCommunityWithServices"
                        name="dischargeDisposition"
                        value="2"
                        checked={formData?.dischargeDisposition === "2"}
                        onChange={handleInputChange}
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
                    <div className="form-check">
                      <input
                        type="radio"
                        id="transferredToNonInstitutionalHospice"
                        name="dischargeDisposition"
                        value="3"
                        checked={formData?.dischargeDisposition === "3"}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="transferredToNonInstitutionalHospice"
                        className="form-check-label"
                      >
                        3. Patient transferred to a non-institutional hospice
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        id="movedToGeographicLocationNotServed"
                        name="dischargeDisposition"
                        value="4"
                        checked={formData?.dischargeDisposition === "4"}
                        onChange={handleInputChange}
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
                    <div className="form-check">
                      <input
                        type="radio"
                        id="otherUnknown"
                        name="dischargeDisposition"
                        value="UK"
                        checked={formData?.dischargeDisposition === "UK"}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="otherUnknown"
                        className="form-check-label"
                      >
                        UK. Other unknown
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">
                      A2120. Provision of Current Reconciled Medication List to
                      Subsequent Provider at Transfer
                    </label>
                    <div className="form-check">
                      <input
                        type="radio"
                        id="medicationListProvidedYes"
                        name="medicationListProvided"
                        value="1"
                        checked={formData?.medicationListProvided === "1"}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="medicationListProvidedYes"
                        className="form-check-label"
                      >
                        1. Yes — Current reconciled medication list provided to
                        the subsequent provider
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        id="medicationListProvidedNo"
                        name="medicationListProvided"
                        value="0"
                        checked={formData?.medicationListProvided === "0"}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="medicationListProvidedNo"
                        className="form-check-label"
                      >
                        0. No — Current reconciled medication list not provided
                        to the subsequent provider
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        id="medicationListProvidedNA"
                        name="medicationListProvided"
                        value="2"
                        checked={formData?.medicationListProvided === "2"}
                        onChange={handleInputChange}
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

                  <div className="col-md-6">
                    <label className="form-label">
                      A2122. Route of Current Reconciled Medication List
                      Transmission to Subsequent Provider
                      <span className="text-danger"> *</span>
                    </label>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="routeMedicationListTransmissionEHR"
                        name="routeMedicationListTransmission"
                        value="Electronic Health Record"
                        checked={formData?.routeMedicationListTransmission?.includes(
                          "Electronic Health Record"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="routeMedicationListTransmissionEHR"
                        className="form-check-label"
                      >
                        A. Electronic Health Record
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="routeMedicationListTransmissionHIE"
                        name="routeMedicationListTransmission"
                        value="Health Information Exchange"
                        checked={formData?.routeMedicationListTransmission?.includes(
                          "Health Information Exchange"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="routeMedicationListTransmissionHIE"
                        className="form-check-label"
                      >
                        B. Health Information Exchange
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="routeMedicationListTransmissionVerbal"
                        name="routeMedicationListTransmission"
                        value="Verbal"
                        checked={formData?.routeMedicationListTransmission?.includes(
                          "Verbal"
                        )}
                        onChange={handleCheckboxChange}
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
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="routeMedicationListTransmissionPaper"
                        name="routeMedicationListTransmission"
                        value="Paper-based"
                        checked={formData?.routeMedicationListTransmission?.includes(
                          "Paper-based"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="routeMedicationListTransmissionPaper"
                        className="form-check-label"
                      >
                        D. Paper-based (e.g., fax, copies, printouts)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="routeMedicationListTransmissionOther"
                        name="routeMedicationListTransmission"
                        value="Other Methods"
                        checked={formData?.routeMedicationListTransmission?.includes(
                          "Other Methods"
                        )}
                        onChange={handleCheckboxChange}
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
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">
                      A2123. Provision of Current Reconciled Medication List to
                      Patient at Discharge
                    </label>
                    <div className="form-check">
                      <input
                        type="radio"
                        id="medicationListProvidedToPatientYes"
                        name="medicationListProvidedToPatient"
                        value="Yes"
                        checked={
                          formData?.medicationListProvidedToPatient === "Yes"
                        }
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="medicationListProvidedToPatientYes"
                        className="form-check-label"
                      >
                        Yes — Current reconciled medication list provided to the
                        patient, family, and/or caregiver
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        id="medicationListProvidedToPatientNo"
                        name="medicationListProvidedToPatient"
                        value="No"
                        checked={
                          formData?.medicationListProvidedToPatient === "No"
                        }
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="medicationListProvidedToPatientNo"
                        className="form-check-label"
                      >
                        No — Current reconciled medication list not provided to
                        the patient, family, and/or caregiver
                      </label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">
                      M0390. Route of Medication List Transmission to Patient:
                      <span className="text-danger"> *</span>
                    </label>

                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="routeMedicationListTransmissionToPatientEHR"
                        name="routeMedicationListTransmissionToPatient"
                        value="Electronic Health Record"
                        checked={formData?.routeMedicationListTransmissionToPatient?.includes(
                          "Electronic Health Record"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="routeMedicationListTransmissionToPatientEHR"
                        className="form-check-label"
                      >
                        Electronic Health Record
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="routeMedicationListTransmissionToPatientHIE"
                        name="routeMedicationListTransmissionToPatient"
                        value="Health Information Exchange"
                        checked={formData?.routeMedicationListTransmissionToPatient?.includes(
                          "Health Information Exchange"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="routeMedicationListTransmissionToPatientHIE"
                        className="form-check-label"
                      >
                        Health Information Exchange
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="routeMedicationListTransmissionToPatientVerbal"
                        name="routeMedicationListTransmissionToPatient"
                        value="Verbal"
                        checked={formData?.routeMedicationListTransmissionToPatient?.includes(
                          "Verbal"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="routeMedicationListTransmissionToPatientVerbal"
                        className="form-check-label"
                      >
                        Verbal (e.g., in-person, telephone, video conferencing)
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="routeMedicationListTransmissionToPatientPaperBased"
                        name="routeMedicationListTransmissionToPatient"
                        value="Paper-based"
                        checked={formData?.routeMedicationListTransmissionToPatient?.includes(
                          "Paper-based"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="routeMedicationListTransmissionToPatientPaperBased"
                        className="form-check-label"
                      >
                        Paper-based (e.g., fax, copies, printouts)
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="routeMedicationListTransmissionToPatientOther"
                        name="routeMedicationListTransmissionToPatient"
                        value="Other Methods"
                        checked={formData?.routeMedicationListTransmissionToPatient?.includes(
                          "Other Methods"
                        )}
                        onChange={handleCheckboxChange}
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
              </div>
            </div>
          </div>
        </div>
        {/* section B  */}
        <div className="accordion w-100" id="sectionBAccordion">
          <div className="accordion-item w-100">
            <h2 className="accordion-header w-100" id="headingB">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseB"
                aria-expanded="true"
                aria-controls="collapseB"
              >
                Hearing, Speech, and Vision
              </button>
            </h2>
            <div
              id="collapseB"
              className="accordion-collapse collapse"
              aria-labelledby="headingB"
              data-bs-parent="#sectionBAccordion"
            >
              <div className="accordion-body w-100 print-area">
                {/* Hearing */}
                <h4 className="print-title">Hearing, Speech, and Vision</h4>
                {/* Hearing */}
                <div className="row">
                  <div className="mb-3 col-md-12 w-50">
                    <label htmlFor="hearing" className="form-label">
                      B0200. Hearing:
                    </label>

                    <div className="form-check">
                      <input
                        type="radio"
                        id="hearingAdequate"
                        name="hearing"
                        value="0"
                        checked={formData?.hearing === "0"}
                        onChange={handleInputChange}
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

                    <div className="form-check">
                      <input
                        type="radio"
                        id="hearingMinimalDifficulty"
                        name="hearing"
                        value="1"
                        checked={formData?.hearing === "1"}
                        onChange={handleInputChange}
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

                    <div className="form-check">
                      <input
                        type="radio"
                        id="hearingModerateDifficulty"
                        name="hearing"
                        value="2"
                        checked={formData?.hearing === "2"}
                        onChange={handleInputChange}
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

                    <div className="form-check">
                      <input
                        type="radio"
                        id="hearingHighlyImpaired"
                        name="hearing"
                        value="3"
                        checked={formData?.hearing === "3"}
                        onChange={handleInputChange}
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

                  {/* Vision */}
                  <div className="mb-3 col-md-12 w-50">
                    <label htmlFor="vision" className="form-label">
                      B1000. Vision:
                    </label>

                    <div className="form-check">
                      <input
                        type="radio"
                        id="visionAdequate"
                        name="vision"
                        value="0"
                        checked={formData?.vision === "0"}
                        onChange={handleInputChange}
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

                    <div className="form-check">
                      <input
                        type="radio"
                        id="visionImpaired"
                        name="vision"
                        value="1"
                        checked={formData?.vision === "1"}
                        onChange={handleInputChange}
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

                    <div className="form-check">
                      <input
                        type="radio"
                        id="visionModeratelyImpaired"
                        name="vision"
                        value="2"
                        checked={formData?.vision === "2"}
                        onChange={handleInputChange}
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

                    <div className="form-check">
                      <input
                        type="radio"
                        id="visionHighlyImpaired"
                        name="vision"
                        value="3"
                        checked={formData?.vision === "3"}
                        onChange={handleInputChange}
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

                    <div className="form-check">
                      <input
                        type="radio"
                        id="visionSeverelyImpaired"
                        name="vision"
                        value="4"
                        checked={formData?.vision === "4"}
                        onChange={handleInputChange}
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

                  {/* Health Literacy */}
                  {/* Health Literacy */}
                  <div className="mb-3 col-md-12 w-50">
                    <label htmlFor="healthLiteracy" className="form-label">
                      B1300. Health Literacy:
                    </label>

                    <div className="form-check">
                      <input
                        type="radio"
                        id="healthLiteracyNever"
                        name="healthLiteracy"
                        value="0"
                        checked={formData?.healthLiteracy === "0"}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="healthLiteracyNever"
                        className="form-check-label"
                      >
                        Never
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        type="radio"
                        id="healthLiteracyRarely"
                        name="healthLiteracy"
                        value="1"
                        checked={formData?.healthLiteracy === "1"}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="healthLiteracyRarely"
                        className="form-check-label"
                      >
                        Rarely
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        type="radio"
                        id="healthLiteracySometimes"
                        name="healthLiteracy"
                        value="2"
                        checked={formData?.healthLiteracy === "2"}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="healthLiteracySometimes"
                        className="form-check-label"
                      >
                        Sometimes
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        type="radio"
                        id="healthLiteracyOften"
                        name="healthLiteracy"
                        value="3"
                        checked={formData?.healthLiteracy === "3"}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="healthLiteracyOften"
                        className="form-check-label"
                      >
                        Often
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        type="radio"
                        id="healthLiteracyAlways"
                        name="healthLiteracy"
                        value="4"
                        checked={formData?.healthLiteracy === "4"}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="healthLiteracyAlways"
                        className="form-check-label"
                      >
                        Always
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        type="radio"
                        id="healthLiteracyDeclines"
                        name="healthLiteracy"
                        value="7"
                        checked={formData?.healthLiteracy === "7"}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="healthLiteracyDeclines"
                        className="form-check-label"
                      >
                        Patient declines to respond
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        type="radio"
                        id="healthLiteracyUnable"
                        name="healthLiteracy"
                        value="8"
                        checked={formData?.healthLiteracy === "8"}
                        onChange={handleInputChange}
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
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* cognitive section c  */}
        <div className="accordion w-100" id="sectionCAccordion">
          <div className="accordion-item w-100">
            <h2 className="accordion-header w-100" id="headingC">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseC"
                aria-expanded="true"
                aria-controls="collapseC"
              >
                Cognitive Patterns
              </button>
            </h2>
            <div
              id="collapseC"
              className="accordion-collapse collapse"
              aria-labelledby="headingC"
              data-bs-parent="#sectionCAccordion"
            >
              <div className="accordion-body w-100 print-area">
                {/* Interview Conducted */}
                <h4 className="print-title">Cognitive Patterns</h4>
                <div className="row">
                  {/* Brief Interview for Mental Status */}
                  <div className="mb-3 col-md-6 w-50 ">
                    <label htmlFor="interviewConducted" className="form-label">
                      C0100. Should Brief Interview for Mental Status
                      (C0200-C0500) be Conducted?
                    </label>

                    <div className="form-check">
                      <input
                        type="radio"
                        id="interviewConductedNo"
                        name="interviewConducted"
                        value="0"
                        checked={formData?.interviewConducted === "0"}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="interviewConductedNo"
                        className="form-check-label"
                      >
                        No (patient is rarely/never understood)
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        type="radio"
                        id="interviewConductedYes"
                        name="interviewConducted"
                        value="1"
                        checked={formData?.interviewConducted === "1"}
                        onChange={handleInputChange}
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
                  <div className="mb-3 col-md-6 w-50 ">
                    <label
                      htmlFor="repetitionOfThreeWords"
                      className="form-label"
                    >
                      C0200. Repetition of Three Words:
                    </label>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="repetitionOfThreeWordsNone"
                        name="repetitionOfThreeWords"
                        value="0"
                        checked={formData?.repetitionOfThreeWords === "0"}
                        onChange={handleInputChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="repetitionOfThreeWordsNone"
                      >
                        None
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="repetitionOfThreeWordsOne"
                        name="repetitionOfThreeWords"
                        value="1"
                        checked={formData?.repetitionOfThreeWords === "1"}
                        onChange={handleInputChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="repetitionOfThreeWordsOne"
                      >
                        One
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="repetitionOfThreeWordsTwo"
                        name="repetitionOfThreeWords"
                        value="2"
                        checked={formData?.repetitionOfThreeWords === "2"}
                        onChange={handleInputChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="repetitionOfThreeWordsTwo"
                      >
                        Two
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="repetitionOfThreeWordsThree"
                        name="repetitionOfThreeWords"
                        value="3"
                        checked={formData?.repetitionOfThreeWords === "3"}
                        onChange={handleInputChange}
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
                  <div className="mb-3 w-50 col-md-6">
                    <label className="form-label">
                      C0300. Temporal Orientation:
                    </label>
                    <div className="row">
                      <div className="col-md-4">
                        <label
                          htmlFor="temporalOrientationYear"
                          className="form-label"
                        >
                          Year
                        </label>
                        <div className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="temporalOrientationYear0"
                            name="temporalOrientationYear"
                            value="0"
                            checked={formData?.temporalOrientationYear === "0"}
                            onChange={handleInputChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="temporalOrientationYear0"
                          >
                            Missed by &gt; 5 years or no answer
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="temporalOrientationYear1"
                            name="temporalOrientationYear"
                            value="1"
                            checked={formData?.temporalOrientationYear === "1"}
                            onChange={handleInputChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="temporalOrientationYear1"
                          >
                            Missed by 2-5 years
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="temporalOrientationYear2"
                            name="temporalOrientationYear"
                            value="2"
                            checked={formData?.temporalOrientationYear === "2"}
                            onChange={handleInputChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="temporalOrientationYear2"
                          >
                            Missed by 1 year
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="temporalOrientationYear3"
                            name="temporalOrientationYear"
                            value="3"
                            checked={formData?.temporalOrientationYear === "3"}
                            onChange={handleInputChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="temporalOrientationYear3"
                          >
                            Correct
                          </label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <label
                          htmlFor="temporalOrientationMonth"
                          className="form-label"
                        >
                          Month
                        </label>
                        <div className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="temporalOrientationMonth0"
                            name="temporalOrientationMonth"
                            value="0"
                            checked={formData?.temporalOrientationMonth === "0"}
                            onChange={handleInputChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="temporalOrientationMonth0"
                          >
                            Missed by&get; 1 month or no answer
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="temporalOrientationMonth1"
                            name="temporalOrientationMonth"
                            value="1"
                            checked={formData?.temporalOrientationMonth === "1"}
                            onChange={handleInputChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="temporalOrientationMonth1"
                          >
                            Missed by 6 days to 1 month
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="temporalOrientationMonth2"
                            name="temporalOrientationMonth"
                            value="2"
                            checked={formData?.temporalOrientationMonth === "2"}
                            onChange={handleInputChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="temporalOrientationMonth2"
                          >
                            Accurate within 5 days
                          </label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <label
                          htmlFor="temporalOrientationDay"
                          className="form-label"
                        >
                          Day
                        </label>
                        <div className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="temporalOrientationDay0"
                            name="temporalOrientationDay"
                            value="0"
                            checked={formData?.temporalOrientationDay === "0"}
                            onChange={handleInputChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="temporalOrientationDay0"
                          >
                            Incorrect or no answer
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="temporalOrientationDay1"
                            name="temporalOrientationDay"
                            value="1"
                            checked={formData?.temporalOrientationDay === "1"}
                            onChange={handleInputChange}
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
                  <div className="mb-3 w-50 col-md-6">
                    <label className="form-label">C0400. Recall:</label>
                    <div className="row">
                      <div className="col-md-4">
                        <label htmlFor="recallSock" className="form-label">
                          A. Able to recall “sock”
                        </label>
                        <div className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="recallSock0"
                            name="recallSock"
                            value="0"
                            checked={formData?.recallSock === "0"}
                            onChange={handleInputChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="recallSock0"
                          >
                            No — could not recall
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="recallSock1"
                            name="recallSock"
                            value="1"
                            checked={formData?.recallSock === "1"}
                            onChange={handleInputChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="recallSock1"
                          >
                            Yes, after cueing (“something to wear”)
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="recallSock2"
                            name="recallSock"
                            value="2"
                            checked={formData?.recallSock === "2"}
                            onChange={handleInputChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="recallSock2"
                          >
                            Yes, no cue required
                          </label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="recallBlue" className="form-label">
                          B. Able to recall “blue”
                        </label>
                        <div className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="recallBlue0"
                            name="recallBlue"
                            value="0"
                            checked={formData?.recallBlue === "0"}
                            onChange={handleInputChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="recallBlue0"
                          >
                            No — could not recall
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="recallBlue1"
                            name="recallBlue"
                            value="1"
                            checked={formData?.recallBlue === "1"}
                            onChange={handleInputChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="recallBlue1"
                          >
                            Yes, after cueing (“a color”)
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="recallBlue2"
                            name="recallBlue"
                            value="2"
                            checked={formData?.recallBlue === "2"}
                            onChange={handleInputChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="recallBlue2"
                          >
                            Yes, no cue required
                          </label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="recallBed" className="form-label">
                          C. Able to recall “bed”
                        </label>
                        <div className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="recallBed0"
                            name="recallBed"
                            value="0"
                            checked={formData?.recallBed === "0"}
                            onChange={handleInputChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="recallBed0"
                          >
                            No — could not recall
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="recallBed1"
                            name="recallBed"
                            value="1"
                            checked={formData?.recallBed === "1"}
                            onChange={handleInputChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="recallBed1"
                          >
                            Yes, after cueing (“a piece of furniture”)
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="recallBed2"
                            name="recallBed"
                            value="2"
                            checked={formData?.recallBed === "2"}
                            onChange={handleInputChange}
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
                  <div className="mb-3 w-50 col-md-6">
                    <label htmlFor="bimsSummaryScore" className="form-label">
                      C0500. BIMS Summary Score:
                    </label>
                    <input
                      type="number"
                      id="bimsSummaryScore"
                      name="bimsSummaryScore"
                      min="0"
                      max="15"
                      className="form-control"
                      value={formData?.bimsSummaryScore || ""}
                      onChange={handleInputChange}
                    />
                    <small className="form-text text-muted">
                      Enter 99 if the patient was unable to complete the
                      interview
                    </small>
                  </div>

                  {/* Signs and Symptoms of Delirium */}
                  <div className="mb-3 w-50 col-md-6">
                    <label className="form-label">
                      C1310. Signs and Symptoms of Delirium:
                    </label>
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="acuteOnset" className="form-label">
                          A. Acute Onset of Mental Status Change
                        </label>
                        <div className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="acuteOnset0"
                            name="acuteOnset"
                            value="0"
                            checked={formData?.acuteOnset === "0"}
                            onChange={handleInputChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="acuteOnset0"
                          >
                            No
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="acuteOnset1"
                            name="acuteOnset"
                            value="1"
                            checked={formData?.acuteOnset === "1"}
                            onChange={handleInputChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="acuteOnset1"
                          >
                            Yes
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="inattention" className="form-label">
                          B. Inattention
                        </label>
                        <div className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="inattention0"
                            name="inattention"
                            value="0"
                            checked={formData?.inattention === "0"}
                            onChange={handleInputChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inattention0"
                          >
                            No
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="inattention1"
                            name="inattention"
                            value="1"
                            checked={formData?.inattention === "1"}
                            onChange={handleInputChange}
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
                    <div className="row mt-3">
                      <div className="col-md-6">
                        <label
                          htmlFor="disorganizedThinking"
                          className="form-label"
                        >
                          C. Disorganized Thinking
                        </label>
                        <div className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="disorganizedThinking0"
                            name="disorganizedThinking"
                            value="0"
                            checked={formData?.disorganizedThinking === "0"}
                            onChange={handleInputChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="disorganizedThinking0"
                          >
                            No
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="disorganizedThinking1"
                            name="disorganizedThinking"
                            value="1"
                            checked={formData?.disorganizedThinking === "1"}
                            onChange={handleInputChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="disorganizedThinking1"
                          >
                            Yes
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label
                          htmlFor="alteredConsciousness"
                          className="form-label"
                        >
                          D. Altered Level of Consciousness
                        </label>
                        <div className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="alteredConsciousness0"
                            name="alteredConsciousness"
                            value="0"
                            checked={formData?.alteredConsciousness === "0"}
                            onChange={handleInputChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="alteredConsciousness0"
                          >
                            No
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="alteredConsciousness1"
                            name="alteredConsciousness"
                            value="1"
                            checked={formData?.alteredConsciousness === "1"}
                            onChange={handleInputChange}
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
                  </div>

                  {/* Cognitive Functioning */}
                  <div className="mb-3 w-50 col-md-6">
                    <label
                      htmlFor="cognitiveFunctioning"
                      className="form-label"
                    >
                      M1700. Cognitive Functioning:
                    </label>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="cognitiveFunctioning0"
                        name="cognitiveFunctioning"
                        value="0"
                        checked={formData?.cognitiveFunctioning === "0"}
                        onChange={handleInputChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="cognitiveFunctioning0"
                      >
                        Alert/oriented, able to focus and shift attention,
                        comprehends and recalls task directions independently.
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="cognitiveFunctioning1"
                        name="cognitiveFunctioning"
                        value="1"
                        checked={formData?.cognitiveFunctioning === "1"}
                        onChange={handleInputChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="cognitiveFunctioning1"
                      >
                        Requires prompting (cueing, repetition, reminders) only
                        under stressful or unfamiliar conditions.
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="cognitiveFunctioning2"
                        name="cognitiveFunctioning"
                        value="2"
                        checked={formData?.cognitiveFunctioning === "2"}
                        onChange={handleInputChange}
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
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="cognitiveFunctioning3"
                        name="cognitiveFunctioning"
                        value="3"
                        checked={formData?.cognitiveFunctioning === "3"}
                        onChange={handleInputChange}
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
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="cognitiveFunctioning4"
                        name="cognitiveFunctioning"
                        value="4"
                        checked={formData?.cognitiveFunctioning === "4"}
                        onChange={handleInputChange}
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

                  {/* When Confused */}
                  <div className="mb-3 w-50 col-md-6">
                    <label htmlFor="whenConfused" className="form-label">
                      M1710. When Confused:
                    </label>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="whenConfused0"
                        name="whenConfused"
                        value="0"
                        checked={formData?.whenConfused === "0"}
                        onChange={handleInputChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="whenConfused0"
                      >
                        Never
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="whenConfused1"
                        name="whenConfused"
                        value="1"
                        checked={formData?.whenConfused === "1"}
                        onChange={handleInputChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="whenConfused1"
                      >
                        In new or complex situations only
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="whenConfused2"
                        name="whenConfused"
                        value="2"
                        checked={formData?.whenConfused === "2"}
                        onChange={handleInputChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="whenConfused2"
                      >
                        On awakening or at night only
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="whenConfused3"
                        name="whenConfused"
                        value="3"
                        checked={formData?.whenConfused === "3"}
                        onChange={handleInputChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="whenConfused3"
                      >
                        During the day and evening, but not constantly
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="whenConfused4"
                        name="whenConfused"
                        value="4"
                        checked={formData?.whenConfused === "4"}
                        onChange={handleInputChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="whenConfused4"
                      >
                        Constantly
                      </label>
                    </div>
                  </div>

                  {/* When Anxious */}
                  <div className="mb-3 w-50 col-md-6">
                    <label htmlFor="whenAnxious" className="form-label">
                      M1720. When Anxious:
                    </label>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="whenAnxious0"
                        name="whenAnxious"
                        value="0"
                        checked={formData?.whenAnxious === "0"}
                        onChange={handleInputChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="whenAnxious0"
                      >
                        None of the time
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="whenAnxious1"
                        name="whenAnxious"
                        value="1"
                        checked={formData?.whenAnxious === "1"}
                        onChange={handleInputChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="whenAnxious1"
                      >
                        Less than often daily
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="whenAnxious2"
                        name="whenAnxious"
                        value="2"
                        checked={formData?.whenAnxious === "2"}
                        onChange={handleInputChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="whenAnxious2"
                      >
                        Daily, but not constantly
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="whenAnxious3"
                        name="whenAnxious"
                        value="3"
                        checked={formData?.whenAnxious === "3"}
                        onChange={handleInputChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="whenAnxious3"
                      >
                        All of the time
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* section D  */}
        <div className="accordion w-100" id="sectionDAccordion">
          <div className="accordion-item w-100">
            <h2 className="accordion-header w-100" id="headingD">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseD"
                aria-expanded="true"
                aria-controls="collapseD"
              >
                Mood
              </button>
            </h2>
            <div
              id="collapseD"
              className="accordion-collapse collapse"
              aria-labelledby="headingD"
              data-bs-parent="#sectionDAccordion"
            >
              <div className="accordion-body w-100 print-area">
                {/* Patient Mood Interview */}
                <h4 className="print-title">Mood</h4>
                <div className="mb-3 w-50 col-md-6">
                  <label htmlFor="patientMoodUnderstood" className="form-label">
                    D0150. Is the patient rarely/never understood verbally, in
                    writing, or using another method?
                  </label>
                  <select
                    className="form-select"
                    id="patientMoodUnderstood"
                    name="patientMoodUnderstood"
                    value={formData?.patientMoodUnderstood}
                    onChange={handleInputChange}
                  >
                    <option value="">Select an option</option>
                    <option value="0">No</option>
                    <option value="9">Yes (No response)</option>
                  </select>
                </div>

                {/* PHQ-2 to 9 Questions */}
                {formData?.patientMoodUnderstood !== "9" && (
                  <>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label
                          htmlFor="littleInterestPresence"
                          className="form-label"
                        >
                          A. Little interest or pleasure in doing things
                        </label>
                        <select
                          className="form-select"
                          id="littleInterestPresence"
                          name="littleInterestPresence"
                          value={formData?.littleInterestPresence}
                          onChange={handleInputChange}
                        >
                          <option value="">Symptom Presence</option>
                          <option value="0">No</option>
                          <option value="1">Yes</option>
                          <option value="9">No response</option>
                        </select>
                      </div>
                      {formData?.littleInterestPresence === "1" && (
                        <div className="col-md-6">
                          <label
                            htmlFor="littleInterestFrequency"
                            className="form-label"
                          >
                            Symptom Frequency
                          </label>
                          <select
                            className="form-select"
                            id="littleInterestFrequency"
                            name="littleInterestFrequency"
                            value={formData?.littleInterestFrequency}
                            onChange={handleInputChange}
                          >
                            <option value="">Select frequency</option>
                            <option value="0">Never or 1 day</option>
                            <option value="1">2-6 days (several days)</option>
                            <option value="2">
                              7-11 days (half or more of the days)
                            </option>
                            <option value="3">
                              12-14 days (nearly every day)
                            </option>
                          </select>
                        </div>
                      )}
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label
                          htmlFor="feelingDownPresence"
                          className="form-label"
                        >
                          B. Feeling down, depressed, or hopeless
                        </label>
                        <select
                          className="form-select"
                          id="feelingDownPresence"
                          name="feelingDownPresence"
                          value={formData?.feelingDownPresence}
                          onChange={handleInputChange}
                        >
                          <option value="">Symptom Presence</option>
                          <option value="0">No</option>
                          <option value="1">Yes</option>
                          <option value="9">No response</option>
                        </select>
                      </div>
                      {formData?.feelingDownPresence === "1" && (
                        <div className="col-md-6">
                          <label
                            htmlFor="feelingDownFrequency"
                            className="form-label"
                          >
                            Symptom Frequency
                          </label>
                          <select
                            className="form-select"
                            id="feelingDownFrequency"
                            name="feelingDownFrequency"
                            value={formData?.feelingDownFrequency}
                            onChange={handleInputChange}
                          >
                            <option value="">Select frequency</option>
                            <option value="0">Never or 1 day</option>
                            <option value="1">2-6 days (several days)</option>
                            <option value="2">
                              7-11 days (half or more of the days)
                            </option>
                            <option value="3">
                              12-14 days (nearly every day)
                            </option>
                          </select>
                        </div>
                      )}
                    </div>

                    {/* Additional PHQ-2 to 9 Questions */}
                    {/* Repeat similar structure for C to I */}
                    {/* C. Trouble falling or staying asleep, or sleeping too much */}
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label
                          htmlFor="troubleSleepingPresence"
                          className="form-label"
                        >
                          C. Trouble falling or staying asleep, or sleeping too
                          much
                        </label>
                        <select
                          className="form-select"
                          id="troubleSleepingPresence"
                          name="troubleSleepingPresence"
                          value={formData?.troubleSleepingPresence}
                          onChange={handleInputChange}
                        >
                          <option value="">Symptom Presence</option>
                          <option value="0">No</option>
                          <option value="1">Yes</option>
                          <option value="9">No response</option>
                        </select>
                      </div>
                      {formData?.troubleSleepingPresence === "1" && (
                        <div className="col-md-6">
                          <label
                            htmlFor="troubleSleepingFrequency"
                            className="form-label"
                          >
                            Symptom Frequency
                          </label>
                          <select
                            className="form-select"
                            id="troubleSleepingFrequency"
                            name="troubleSleepingFrequency"
                            value={formData?.troubleSleepingFrequency}
                            onChange={handleInputChange}
                          >
                            <option value="">Select frequency</option>
                            <option value="0">Never or 1 day</option>
                            <option value="1">2-6 days (several days)</option>
                            <option value="2">
                              7-11 days (half or more of the days)
                            </option>
                            <option value="3">
                              12-14 days (nearly every day)
                            </option>
                          </select>
                        </div>
                      )}
                    </div>

                    {/* D. Feeling tired or having little energy */}
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label
                          htmlFor="feelingTiredPresence"
                          className="form-label"
                        >
                          D. Feeling tired or having little energy
                        </label>
                        <select
                          className="form-select"
                          id="feelingTiredPresence"
                          name="feelingTiredPresence"
                          value={formData?.feelingTiredPresence}
                          onChange={handleInputChange}
                        >
                          <option value="">Symptom Presence</option>
                          <option value="0">No</option>
                          <option value="1">Yes</option>
                          <option value="9">No response</option>
                        </select>
                      </div>
                      {formData?.feelingTiredPresence === "1" && (
                        <div className="col-md-6">
                          <label
                            htmlFor="feelingTiredFrequency"
                            className="form-label"
                          >
                            Symptom Frequency
                          </label>
                          <select
                            className="form-select"
                            id="feelingTiredFrequency"
                            name="feelingTiredFrequency"
                            value={formData?.feelingTiredFrequency}
                            onChange={handleInputChange}
                          >
                            <option value="">Select frequency</option>
                            <option value="0">Never or 1 day</option>
                            <option value="1">2-6 days (several days)</option>
                            <option value="2">
                              7-11 days (half or more of the days)
                            </option>
                            <option value="3">
                              12-14 days (nearly every day)
                            </option>
                          </select>
                        </div>
                      )}
                    </div>

                    {/* E. Poor appetite or overeating */}
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label
                          htmlFor="poorAppetitePresence"
                          className="form-label"
                        >
                          E. Poor appetite or overeating
                        </label>
                        <select
                          className="form-select"
                          id="poorAppetitePresence"
                          name="poorAppetitePresence"
                          value={formData?.poorAppetitePresence}
                          onChange={handleInputChange}
                        >
                          <option value="">Symptom Presence</option>
                          <option value="0">No</option>
                          <option value="1">Yes</option>
                          <option value="9">No response</option>
                        </select>
                      </div>
                      {formData?.poorAppetitePresence === "1" && (
                        <div className="col-md-6">
                          <label
                            htmlFor="poorAppetiteFrequency"
                            className="form-label"
                          >
                            Symptom Frequency
                          </label>
                          <select
                            className="form-select"
                            id="poorAppetiteFrequency"
                            name="poorAppetiteFrequency"
                            value={formData?.poorAppetiteFrequency}
                            onChange={handleInputChange}
                          >
                            <option value="">Select frequency</option>
                            <option value="0">Never or 1 day</option>
                            <option value="1">2-6 days (several days)</option>
                            <option value="2">
                              7-11 days (half or more of the days)
                            </option>
                            <option value="3">
                              12-14 days (nearly every day)
                            </option>
                          </select>
                        </div>
                      )}
                    </div>

                    {/* F. Feeling bad about yourself */}
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label
                          htmlFor="feelingBadPresence"
                          className="form-label"
                        >
                          F. Feeling bad about yourself
                        </label>
                        <select
                          className="form-select"
                          id="feelingBadPresence"
                          name="feelingBadPresence"
                          value={formData?.feelingBadPresence}
                          onChange={handleInputChange}
                        >
                          <option value="">Symptom Presence</option>
                          <option value="0">No</option>
                          <option value="1">Yes</option>
                          <option value="9">No response</option>
                        </select>
                      </div>
                      {formData?.feelingBadPresence === "1" && (
                        <div className="col-md-6">
                          <label
                            htmlFor="feelingBadFrequency"
                            className="form-label"
                          >
                            Symptom Frequency
                          </label>
                          <select
                            className="form-select"
                            id="feelingBadFrequency"
                            name="feelingBadFrequency"
                            value={formData?.feelingBadFrequency}
                            onChange={handleInputChange}
                          >
                            <option value="">Select frequency</option>
                            <option value="0">Never or 1 day</option>
                            <option value="1">2-6 days (several days)</option>
                            <option value="2">
                              7-11 days (half or more of the days)
                            </option>
                            <option value="3">
                              12-14 days (nearly every day)
                            </option>
                          </select>
                        </div>
                      )}
                    </div>

                    {/* G. Trouble concentrating */}
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label
                          htmlFor="troubleConcentratingPresence"
                          className="form-label"
                        >
                          G. Trouble concentrating
                        </label>
                        <select
                          className="form-select"
                          id="troubleConcentratingPresence"
                          name="troubleConcentratingPresence"
                          value={formData?.troubleConcentratingPresence}
                          onChange={handleInputChange}
                        >
                          <option value="">Symptom Presence</option>
                          <option value="0">No</option>
                          <option value="1">Yes</option>
                          <option value="9">No response</option>
                        </select>
                      </div>
                      {formData?.troubleConcentratingPresence === "1" && (
                        <div className="col-md-6">
                          <label
                            htmlFor="troubleConcentratingFrequency"
                            className="form-label"
                          >
                            Symptom Frequency
                          </label>
                          <select
                            className="form-select"
                            id="troubleConcentratingFrequency"
                            name="troubleConcentratingFrequency"
                            value={formData?.troubleConcentratingFrequency}
                            onChange={handleInputChange}
                          >
                            <option value="">Select frequency</option>
                            <option value="0">Never or 1 day</option>
                            <option value="1">2-6 days (several days)</option>
                            <option value="2">
                              7-11 days (half or more of the days)
                            </option>
                            <option value="3">
                              12-14 days (nearly every day)
                            </option>
                          </select>
                        </div>
                      )}
                    </div>

                    {/* H. Moving or speaking slowly */}
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label
                          htmlFor="movingSlowlyPresence"
                          className="form-label"
                        >
                          H. Moving or speaking slowly or being fidgety
                        </label>
                        <select
                          className="form-select"
                          id="movingSlowlyPresence"
                          name="movingSlowlyPresence"
                          value={formData?.movingSlowlyPresence}
                          onChange={handleInputChange}
                        >
                          <option value="">Symptom Presence</option>
                          <option value="0">No</option>
                          <option value="1">Yes</option>
                          <option value="9">No response</option>
                        </select>
                      </div>
                      {formData?.movingSlowlyPresence === "1" && (
                        <div className="col-md-6">
                          <label
                            htmlFor="movingSlowlyFrequency"
                            className="form-label"
                          >
                            Symptom Frequency
                          </label>
                          <select
                            className="form-select"
                            id="movingSlowlyFrequency"
                            name="movingSlowlyFrequency"
                            value={formData?.movingSlowlyFrequency}
                            onChange={handleInputChange}
                          >
                            <option value="">Select frequency</option>
                            <option value="0">Never or 1 day</option>
                            <option value="1">2-6 days (several days)</option>
                            <option value="2">
                              7-11 days (half or more of the days)
                            </option>
                            <option value="3">
                              12-14 days (nearly every day)
                            </option>
                          </select>
                        </div>
                      )}
                    </div>

                    {/* I. Thoughts of self-harm */}
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label
                          htmlFor="thoughtsOfHarmingPresence"
                          className="form-label"
                        >
                          I. Thoughts of harming yourself
                        </label>
                        <select
                          className="form-select"
                          id="thoughtsOfHarmingPresence"
                          name="thoughtsOfHarmingPresence"
                          value={formData?.thoughtsOfHarmingPresence}
                          onChange={handleInputChange}
                        >
                          <option value="">Symptom Presence</option>
                          <option value="0">No</option>
                          <option value="1">Yes</option>
                          <option value="9">No response</option>
                        </select>
                      </div>
                      {formData?.thoughtsOfHarmingPresence === "1" && (
                        <div className="col-md-6">
                          <label
                            htmlFor="thoughtsOfHarmingFrequency"
                            className="form-label"
                          >
                            Symptom Frequency
                          </label>
                          <select
                            className="form-select"
                            id="thoughtsOfHarmingFrequency"
                            name="thoughtsOfHarmingFrequency"
                            value={formData?.thoughtsOfHarmingFrequency}
                            onChange={handleInputChange}
                          >
                            <option value="">Select frequency</option>
                            <option value="0">Never or 1 day</option>
                            <option value="1">2-6 days (several days)</option>
                            <option value="2">
                              7-11 days (half or more of the days)
                            </option>
                            <option value="3">
                              12-14 days (nearly every day)
                            </option>
                          </select>
                        </div>
                      )}
                    </div>

                    {/* Total Severity Score */}
                    <div className="mb-3 w-50 col-md-6">
                      <label
                        htmlFor="totalSeverityScore"
                        className="form-label"
                      >
                        D0160. Total Severity Score
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="totalSeverityScore"
                        name="totalSeverityScore"
                        value={formData?.totalSeverityScore}
                        onChange={handleInputChange}
                        placeholder="Enter total severity score"
                      />
                    </div>
                  </>
                )}

                {/* Social Isolation */}
                <div className="mb-3 w-50 col-md-6">
                  <label htmlFor="socialIsolation" className="form-label">
                    D0700. Social Isolation: How often do you feel lonely or
                    isolated from those around you?
                  </label>
                  <select
                    className="form-select"
                    id="socialIsolation"
                    name="socialIsolation"
                    value={formData?.socialIsolation}
                    onChange={handleInputChange}
                  >
                    <option value="">Select an option</option>
                    <option value="0">Never</option>
                    <option value="1">Rarely</option>
                    <option value="2">Sometimes</option>
                    <option value="3">Often</option>
                    <option value="4">Always</option>
                    <option value="7">Patient declines to respond</option>
                    <option value="8">Patient unable to respond</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* section E   */}
        <div className="accordion w-100" id="accordionSectionE">
          <div className="accordion-item w-100">
            <h2 className="accordion-header w-100" id="headingE">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseE"
                aria-expanded="true"
                aria-controls="collapseE"
              >
                Behavior
              </button>
            </h2>
            <div
              id="collapseE"
              className="accordion-collapse collapse"
              aria-labelledby="headingE"
              data-bs-parent="#accordionSectionE"
            >
              <div className="accordion-body w-100 print-area">
                {/* M1740: Cognitive, Behavioral, and Psychiatric Symptoms */}
                <h4 className="print-title">Behavior</h4>
                <div className="mb-3 w-50 col-md-6">
                  <label className="form-label">
                    M1740. Cognitive, Behavioral, and Psychiatric Symptoms that
                    are demonstrated at least once a week (Reported or
                    Observed):
                  </label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="memoryDeficit"
                      name="memoryDeficit"
                      checked={formData?.memoryDeficit}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="memoryDeficit">
                      1. Memory deficit: failure to recognize familiar
                      persons/places, inability to recall events of past 24
                      hours, significant memory loss so that supervision is
                      required
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="impairedDecisionMaking"
                      name="impairedDecisionMaking"
                      checked={formData?.impairedDecisionMaking}
                      onChange={handleInputChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="impairedDecisionMaking"
                    >
                      2. Impaired decision-making: failure to perform usual ADLs
                      or IADLs, inability to appropriately stop activities,
                      jeopardizes safety through actions
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="verbalDisruption"
                      name="verbalDisruption"
                      checked={formData?.verbalDisruption}
                      onChange={handleInputChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="verbalDisruption"
                    >
                      3. Verbal disruption: yelling, threatening, excessive
                      profanity, sexual references, etc.
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="physicalAggression"
                      name="physicalAggression"
                      checked={formData?.physicalAggression}
                      onChange={handleInputChange}
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
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="disruptiveBehavior"
                      name="disruptiveBehavior"
                      checked={formData?.disruptiveBehavior}
                      onChange={handleInputChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="disruptiveBehavior"
                    >
                      5. Disruptive, infantile, or socially inappropriate
                      behavior (excludes verbal actions)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="delusionalBehavior"
                      name="delusionalBehavior"
                      checked={formData?.delusionalBehavior}
                      onChange={handleInputChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="delusionalBehavior"
                    >
                      6. elusional, hallucinatory, or paranoid behavior
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="noneOfTheAbove"
                      name="noneOfTheAbove"
                      checked={formData?.noneOfTheAbove}
                      onChange={handleInputChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="noneOfTheAbove"
                    >
                      7. None of the above behaviors demonstrated
                    </label>
                  </div>
                </div>

                {/* M1745: Frequency of Disruptive Behavior Symptoms */}
                <div className="mb-3 w-50 col-md-6">
                  <label
                    htmlFor="disruptiveBehaviorFrequency"
                    className="form-label"
                  >
                    M1745. Frequency of Disruptive Behavior Symptoms
                  </label>
                  <fieldset id="disruptiveBehaviorFrequency">
                    <div>
                      <input
                        type="radio"
                        id="frequencyNever"
                        name="disruptiveBehaviorFrequency"
                        value="0"
                        checked={formData?.disruptiveBehaviorFrequency === "0"}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="frequencyNever">Never</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="frequencyLessThanOnceAMonth"
                        name="disruptiveBehaviorFrequency"
                        value="1"
                        checked={formData?.disruptiveBehaviorFrequency === "1"}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="frequencyLessThanOnceAMonth">
                        Less than once a month
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="frequencyOnceAMonth"
                        name="disruptiveBehaviorFrequency"
                        value="2"
                        checked={formData?.disruptiveBehaviorFrequency === "2"}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="frequencyOnceAMonth">Once a month</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="frequencySeveralTimesEachMonth"
                        name="disruptiveBehaviorFrequency"
                        value="3"
                        checked={formData?.disruptiveBehaviorFrequency === "3"}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="frequencySeveralTimesEachMonth">
                        Several times each month
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="frequencySeveralTimesAWeek"
                        name="disruptiveBehaviorFrequency"
                        value="4"
                        checked={formData?.disruptiveBehaviorFrequency === "4"}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="frequencySeveralTimesAWeek">
                        Several times a week
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="frequencyAtLeastDaily"
                        name="disruptiveBehaviorFrequency"
                        value="5"
                        checked={formData?.disruptiveBehaviorFrequency === "5"}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="frequencyAtLeastDaily">
                        At least daily
                      </label>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* section F  */}
        <div className="accordion w-100" id="accordionSectionF">
          <div className="accordion-item w-100">
            <h2 className="accordion-header w-100" id="headingF">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseF"
                aria-expanded="true"
                aria-controls="collapseF"
              >
                Preferences for Customary Routine and Activities
              </button>
            </h2>
            <div
              id="collapseF"
              className="accordion-collapse collapse"
              aria-labelledby="headingF"
              data-bs-parent="#accordionSectionF"
            >
              <div className="accordion-body w-100 print-area">
                {/* M1100: Patient Living Situation */}
                <h4 className="print-title">
                  Preferences for Customary Routine and Activities
                </h4>
                <div className="row">
                  <div className="mb-3 w-50 col-md-6">
                    <div className="mb-4">
                      <label className="form-label h5">
                        M1100. Patient Living Situation
                      </label>
                      <div className="form-check mb-2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="livingArrangement"
                          value="A01"
                          checked={formData?.livingArrangement?.includes("A01")}
                          onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label">
                          Patient lives alone, Around the clock
                        </label>
                      </div>
                      <div className="form-check mb-2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="livingArrangement"
                          value="A02"
                          checked={formData?.livingArrangement?.includes("A02")}
                          onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label">
                          Patient lives alone, Regular Daytime
                        </label>
                      </div>
                      <div className="form-check mb-2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="livingArrangement"
                          value="A03"
                          checked={formData?.livingArrangement?.includes("A03")}
                          onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label">
                          Patient lives alone, Regular Nighttime
                        </label>
                      </div>
                      <div className="form-check mb-2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="livingArrangement"
                          value="A04"
                          checked={formData?.livingArrangement?.includes("A04")}
                          onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label">
                          Patient lives alone, Occasional/Short-Term Assistance
                        </label>
                      </div>
                      <div className="form-check mb-2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="livingArrangement"
                          value="A05"
                          checked={formData?.livingArrangement?.includes("A05")}
                          onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label">
                          Patient lives alone, No Assistance Available
                        </label>
                      </div>
                      <div className="form-check mb-2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="livingArrangement"
                          value="B06"
                          checked={formData?.livingArrangement?.includes("B06")}
                          onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label">
                          Patient lives with other person(s), Around the clock
                        </label>
                      </div>
                      <div className="form-check mb-2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="livingArrangement"
                          value="B07"
                          checked={formData?.livingArrangement?.includes("B07")}
                          onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label">
                          Patient lives with other person(s), Regular Daytime
                        </label>
                      </div>
                      <div className="form-check mb-2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="livingArrangement"
                          value="B08"
                          checked={formData?.livingArrangement?.includes("B08")}
                          onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label">
                          Patient lives with other person(s), Regular Nighttime
                        </label>
                      </div>
                      <div className="form-check mb-2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="livingArrangement"
                          value="B09"
                          checked={formData?.livingArrangement?.includes("B09")}
                          onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label">
                          Patient lives with other person(s),
                          Occasional/Short-Term Assistance
                        </label>
                      </div>
                      <div className="form-check mb-2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="livingArrangement"
                          value="B10"
                          checked={formData?.livingArrangement?.includes("B10")}
                          onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label">
                          Patient lives with other person(s), No Assistance
                          Available
                        </label>
                      </div>
                      <div className="form-check mb-2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="livingArrangement"
                          value="C11"
                          checked={formData?.livingArrangement?.includes("C11")}
                          onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label">
                          Patient lives in congregate situation, Around the
                          clock
                        </label>
                      </div>
                      <div className="form-check mb-2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="livingArrangement"
                          value="C12"
                          checked={formData?.livingArrangement?.includes("C12")}
                          onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label">
                          Patient lives in congregate situation, Regular Daytime
                        </label>
                      </div>
                      <div className="form-check mb-2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="livingArrangement"
                          value="C13"
                          checked={formData?.livingArrangement?.includes("C13")}
                          onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label">
                          Patient lives in congregate situation, Regular
                          Nighttime
                        </label>
                      </div>
                      <div className="form-check mb-2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="livingArrangement"
                          value="C14"
                          checked={formData?.livingArrangement?.includes("C14")}
                          onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label">
                          Patient lives in congregate situation,
                          Occasional/Short-Term Assistance
                        </label>
                      </div>
                      <div className="form-check mb-2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="livingArrangement"
                          value="C15"
                          checked={formData?.livingArrangement?.includes("C15")}
                          onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label">
                          Patient lives in congregate situation, No Assistance
                          Available
                        </label>
                      </div>
                    </div>
                    {/* Add more radio buttons as needed */}
                  </div>

                  {/* M2102: Types and Sources of Assistance */}

                  <label className="form-label h5">
                    M2102. Types and Sources of Assistance
                  </label>

                  <div className="mb-3 w-50 col-md-6">
                    <label className="form-label">a. ADL assistance</label>
                    <div className="form-check mb-2">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="adlAssistance"
                        value="0"
                        checked={formData?.adlAssistance === "0"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        No assistance needed
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="adlAssistance"
                        value="1"
                        checked={formData?.adlAssistance === "1"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        Non-agency caregiver(s) currently provide assistance
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="adlAssistance"
                        value="2"
                        checked={formData?.adlAssistance === "2"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        Non-agency caregiver(s) need training/supportive
                        services
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="adlAssistance"
                        value="3"
                        checked={formData?.adlAssistance === "3"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        Non-agency caregiver(s) are not likely to provide
                        assistance OR it is unclear if they will provide
                        assistance
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="adlAssistance"
                        value="4"
                        checked={formData?.adlAssistance === "4"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        Assistance needed, but no non-agency caregiver(s)
                        available
                      </label>
                    </div>
                  </div>

                  <div className="mb-3 w-50 col-md-6">
                    <label className="form-label">
                      c. Medication administration
                    </label>
                    <div className="form-check mb-2">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="medicationAssistance"
                        value="0"
                        checked={formData?.medicationAssistance === "0"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        No assistance needed
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="medicationAssistance"
                        value="1"
                        checked={formData?.medicationAssistance === "1"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        Non-agency caregiver(s) currently provide assistance
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="medicationAssistance"
                        value="2"
                        checked={formData?.medicationAssistance === "2"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        Non-agency caregiver(s) need training/supportive
                        services
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="medicationAssistance"
                        value="3"
                        checked={formData?.medicationAssistance === "3"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        Non-agency caregiver(s) are not likely to provide
                        assistance OR it is unclear if they will provide
                        assistance
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="medicationAssistance"
                        value="4"
                        checked={formData?.medicationAssistance === "4"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        Assistance needed, but no non-agency caregiver(s)
                        available
                      </label>
                    </div>
                  </div>

                  <div className="mb-3 w-50 col-md-6">
                    <label className="form-label">
                      d. Medical procedures/treatments
                    </label>
                    <div className="form-check mb-2">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="medicalProceduresAssistance"
                        value="0"
                        checked={formData?.medicalProceduresAssistance === "0"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        No assistance needed
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="medicalProceduresAssistance"
                        value="1"
                        checked={formData?.medicalProceduresAssistance === "1"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        Non-agency caregiver(s) currently provide assistance
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="medicalProceduresAssistance"
                        value="2"
                        checked={formData?.medicalProceduresAssistance === "2"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        Non-agency caregiver(s) need training/supportive
                        services
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="medicalProceduresAssistance"
                        value="3"
                        checked={formData?.medicalProceduresAssistance === "3"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        Non-agency caregiver(s) are not likely to provide
                        assistance OR it is unclear if they will provide
                        assistance
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="medicalProceduresAssistance"
                        value="4"
                        checked={formData?.medicalProceduresAssistance === "4"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        Assistance needed, but no non-agency caregiver(s)
                        available
                      </label>
                    </div>
                  </div>

                  <div className="mb-3 w-50 col-md-6">
                    <label className="form-label">
                      f. Supervision and safety (due to cognitive impairment)
                    </label>
                    <div className="form-check mb-2">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="supervisionSafetyAssistance"
                        value="0"
                        checked={formData?.supervisionSafetyAssistance === "0"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        No assistance needed
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="supervisionSafetyAssistance"
                        value="1"
                        checked={formData?.supervisionSafetyAssistance === "1"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        Non-agency caregiver(s) currently provide assistance
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="supervisionSafetyAssistance"
                        value="2"
                        checked={formData?.supervisionSafetyAssistance === "2"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        Non-agency caregiver(s) need training/supportive
                        services
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="supervisionSafetyAssistance"
                        value="3"
                        checked={formData?.supervisionSafetyAssistance === "3"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        Non-agency caregiver(s) are not likely to provide
                        assistance OR it is unclear if they will provide
                        assistance
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="supervisionSafetyAssistance"
                        value="4"
                        checked={formData?.supervisionSafetyAssistance === "4"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        Assistance needed, but no non-agency caregiver(s)
                        available
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* section G  */}
        <div className="accordion w-100" id="accordionSectionG">
          <div className="accordion-item w-100">
            <h2 className="accordion-header w-100" id="headingG">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseG"
                aria-expanded="true"
                aria-controls="collapseG"
              >
                Functional Status
              </button>
            </h2>
            <div
              id="collapseG"
              className="accordion-collapse collapse"
              aria-labelledby="headingG"
              data-bs-parent="#accordionSectionG"
            >
              <div className="accordion-body w-100 print-area">
                {/* M1800: Grooming */}
                <h4 className="print-title">Functional status</h4>
                <div className="row">
                  <div className="mb-3 w-50 col-md-6">
                    <label className="form-label">M1800. Grooming</label>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="grooming"
                          value="0"
                          checked={formData?.grooming === "0"}
                          onChange={handleInputChange}
                        />
                        Able to groom self unaided
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="grooming"
                          value="1"
                          checked={formData?.grooming === "1"}
                          onChange={handleInputChange}
                        />
                        Grooming utensils must be placed within reach
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="grooming"
                          value="2"
                          checked={formData?.grooming === "2"}
                          onChange={handleInputChange}
                        />
                        Someone must assist the patient
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="grooming"
                          value="3"
                          checked={formData?.grooming === "3"}
                          onChange={handleInputChange}
                        />
                        Patient depends entirely upon someone else
                      </label>
                    </div>
                  </div>

                  {/* M1810: Upper Body Dressing */}
                  <div className="mb-3 w-50 col-md-6">
                    <label className="form-label">
                      M1810. Current Ability to Dress Upper Body
                    </label>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="upperBodyDressing"
                          value="0"
                          checked={formData?.upperBodyDressing === "0"}
                          onChange={handleInputChange}
                        />
                        Able to dress upper body independently
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="upperBodyDressing"
                          value="1"
                          checked={formData?.upperBodyDressing === "1"}
                          onChange={handleInputChange}
                        />
                        Able to dress upper body if clothing is laid out
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="upperBodyDressing"
                          value="2"
                          checked={formData?.upperBodyDressing === "2"}
                          onChange={handleInputChange}
                        />
                        Someone must help the patient
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="upperBodyDressing"
                          value="3"
                          checked={formData?.upperBodyDressing === "3"}
                          onChange={handleInputChange}
                        />
                        Patient depends entirely upon another person
                      </label>
                    </div>
                  </div>

                  {/* M1820: Lower Body Dressing */}
                  <div className="mb-3 w-50 col-md-6">
                    <label className="form-label">
                      M1820. Current Ability to Dress Lower Body
                    </label>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="lowerBodyDressing"
                          value="0"
                          checked={formData?.lowerBodyDressing === "0"}
                          onChange={handleInputChange}
                        />
                        Able to dress lower body independently
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="lowerBodyDressing"
                          value="1"
                          checked={formData?.lowerBodyDressing === "1"}
                          onChange={handleInputChange}
                        />
                        Able to dress lower body if clothing is laid out
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="lowerBodyDressing"
                          value="2"
                          checked={formData?.lowerBodyDressing === "2"}
                          onChange={handleInputChange}
                        />
                        Someone must help the patient
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="lowerBodyDressing"
                          value="3"
                          checked={formData?.lowerBodyDressing === "3"}
                          onChange={handleInputChange}
                        />
                        Patient depends entirely upon another person
                      </label>
                    </div>
                  </div>

                  {/* M1830: Bathing */}
                  <div className="mb-3 w-50 col-md-6">
                    <label className="form-label">M1830. Bathing</label>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="bathing"
                          value="0"
                          checked={formData?.bathing === "0"}
                          onChange={handleInputChange}
                        />
                        Able to bathe self independently
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="bathing"
                          value="1"
                          checked={formData?.bathing === "1"}
                          onChange={handleInputChange}
                        />
                        Able to bathe with the use of devices
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="bathing"
                          value="2"
                          checked={formData?.bathing === "2"}
                          onChange={handleInputChange}
                        />
                        Able to bathe with intermittent assistance
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="bathing"
                          value="3"
                          checked={formData?.bathing === "3"}
                          onChange={handleInputChange}
                        />
                        Requires presence of another person throughout the bath
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="bathing"
                          value="4"
                          checked={formData?.bathing === "4"}
                          onChange={handleInputChange}
                        />
                        Unable to use shower/tub, but can bathe at sink or chair
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="bathing"
                          value="5"
                          checked={formData?.bathing === "5"}
                          onChange={handleInputChange}
                        />
                        Unable to use shower/tub, but can bathe in bed or with
                        assistance
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="bathing"
                          value="6"
                          checked={formData?.bathing === "6"}
                          onChange={handleInputChange}
                        />
                        Unable to participate in bathing
                      </label>
                    </div>
                  </div>

                  {/* M1840: Toilet Transferring */}
                  <div className="mb-3 w-50 col-md-6">
                    <label className="form-label">
                      M1840. Toilet Transferring
                    </label>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="toiletTransferring"
                          value="0"
                          checked={formData?.toiletTransferring === "0"}
                          onChange={handleInputChange}
                        />
                        Able to get to and from the toilet independently
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="toiletTransferring"
                          value="1"
                          checked={formData?.toiletTransferring === "1"}
                          onChange={handleInputChange}
                        />
                        Able to get to and from toilet with assistance
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="toiletTransferring"
                          value="2"
                          checked={formData?.toiletTransferring === "2"}
                          onChange={handleInputChange}
                        />
                        Unable to get to toilet, but can use bedside commode
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="toiletTransferring"
                          value="3"
                          checked={formData?.toiletTransferring === "3"}
                          onChange={handleInputChange}
                        />
                        Unable to get to toilet or commode, but can use
                        bedpan/urinal independently
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="toiletTransferring"
                          value="4"
                          checked={formData?.toiletTransferring === "4"}
                          onChange={handleInputChange}
                        />
                        Totally dependent in toileting
                      </label>
                    </div>
                  </div>

                  {/* M1845: Toileting Hygiene */}
                  <div className="mb-3 w-50 col-md-6">
                    <label className="form-label">
                      M1845. Toileting Hygiene
                    </label>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="toiletingHygiene"
                          value="0"
                          checked={formData?.toiletingHygiene === "0"}
                          onChange={handleInputChange}
                        />
                        Able to manage toileting hygiene independently
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="toiletingHygiene"
                          value="1"
                          checked={formData?.toiletingHygiene === "1"}
                          onChange={handleInputChange}
                        />
                        Able to manage toileting hygiene if supplies are laid
                        out
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="toiletingHygiene"
                          value="2"
                          checked={formData?.toiletingHygiene === "2"}
                          onChange={handleInputChange}
                        />
                        Someone must assist with toileting hygiene
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="toiletingHygiene"
                          value="3"
                          checked={formData?.toiletingHygiene === "3"}
                          onChange={handleInputChange}
                        />
                        Patient depends entirely on another person
                      </label>
                    </div>
                  </div>

                  {/* M1850: Transferring */}
                  <div className="mb-3 w-50 col-md-6">
                    <label className="form-label">M1850. Transferring</label>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="transferring"
                          value="0"
                          checked={formData?.transferring === "0"}
                          onChange={handleInputChange}
                        />
                        Able to independently transfer
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="transferring"
                          value="1"
                          checked={formData?.transferring === "1"}
                          onChange={handleInputChange}
                        />
                        Able to transfer with minimal assistance or device
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="transferring"
                          value="2"
                          checked={formData?.transferring === "2"}
                          onChange={handleInputChange}
                        />
                        Able to bear weight and pivot during transfer
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="transferring"
                          value="3"
                          checked={formData?.transferring === "3"}
                          onChange={handleInputChange}
                        />
                        Unable to transfer or bear weight
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="transferring"
                          value="4"
                          checked={formData?.transferring === "4"}
                          onChange={handleInputChange}
                        />
                        Bedfast, able to turn and position self
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="transferring"
                          value="5"
                          checked={formData?.transferring === "5"}
                          onChange={handleInputChange}
                        />
                        Bedfast, unable to turn or position self
                      </label>
                    </div>
                  </div>

                  {/* M1860: Ambulation/Locomotion */}
                  <div className="mb-3 w-50 col-md-6">
                    <label className="form-label">
                      M1860. Ambulation/Locomotion
                    </label>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="ambulationLocomotion"
                          value="0"
                          checked={formData?.ambulationLocomotion === "0"}
                          onChange={handleInputChange}
                        />
                        Able to walk independently on all surfaces
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="ambulationLocomotion"
                          value="1"
                          checked={formData?.ambulationLocomotion === "1"}
                          onChange={handleInputChange}
                        />
                        Able to walk independently with a one-handed device
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="ambulationLocomotion"
                          value="2"
                          checked={formData?.ambulationLocomotion === "2"}
                          onChange={handleInputChange}
                        />
                        Requires a two-handed device or supervision
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="ambulationLocomotion"
                          value="3"
                          checked={formData?.ambulationLocomotion === "3"}
                          onChange={handleInputChange}
                        />
                        Able to walk only with supervision or assistance
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="ambulationLocomotion"
                          value="4"
                          checked={formData?.ambulationLocomotion === "4"}
                          onChange={handleInputChange}
                        />
                        Chairfast, able to wheel self independently
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="ambulationLocomotion"
                          value="5"
                          checked={formData?.ambulationLocomotion === "5"}
                          onChange={handleInputChange}
                        />
                        Chairfast, unable to wheel self
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="ambulationLocomotion"
                          value="6"
                          checked={formData?.ambulationLocomotion === "6"}
                          onChange={handleInputChange}
                        />
                        Bedfast, unable to ambulate or be up in a chair
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* section gg */}
        <div className="accordion w-100" id="accordionSectionGG">
          <div className="accordion-item w-100">
            <h2 className="accordion-header w-100" id="headingGG">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseGG"
                aria-expanded="true"
                aria-controls="collapseGG"
              >
                Functional Abilities
              </button>
            </h2>
            <div
              id="collapseGG"
              className="accordion-collapse collapse"
              aria-labelledby="headingGG"
            >
              <div className="accordion-body w-100 print-area">
                {/* GG0100 */}
                <h4 className="print-title">Functional Abilities</h4>
                <div className="row">
                  <div className="mb-3 w-50 col-md-6">
                    <h5>GG0100. Prior Functioning: Everyday Activities</h5>
                    <div className="row">
                      {[
                        "selfCare",
                        "indoorMobility",
                        "stairs",
                        "functionalCognition",
                      ].map((field) => (
                        <div className="col-md-6 mb-3" key={field}>
                          <label
                            htmlFor={`gg0100.${field}`}
                            className="form-label"
                          >
                            {field.replace(/([A-Z])/g, " $1").toUpperCase()}:
                          </label>
                          <div>
                            <div className="form-check">
                              <input
                                type="radio"
                                id={`gg0100.${field}-independent`}
                                name={`gg0100.${field}`}
                                value="3"
                                checked={formData?.gg0100[field] === "3"}
                                onChange={handleInputChange}
                                className="form-check-input"
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`gg0100.${field}-independent`}
                              >
                                Independent
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                type="radio"
                                id={`gg0100.${field}-some-help`}
                                name={`gg0100.${field}`}
                                value="2"
                                checked={formData?.gg0100[field] === "2"}
                                onChange={handleInputChange}
                                className="form-check-input"
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`gg0100.${field}-some-help`}
                              >
                                Needed Some Help
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                type="radio"
                                id={`gg0100.${field}-dependent`}
                                name={`gg0100.${field}`}
                                value="1"
                                checked={formData?.gg0100[field] === "1"}
                                onChange={handleInputChange}
                                className="form-check-input"
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`gg0100.${field}-dependent`}
                              >
                                Dependent
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                type="radio"
                                id={`gg0100.${field}-unknown`}
                                name={`gg0100.${field}`}
                                value="8"
                                checked={formData?.gg0100[field] === "8"}
                                onChange={handleInputChange}
                                className="form-check-input"
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`gg0100.${field}-unknown`}
                              >
                                Unknown
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                type="radio"
                                id={`gg0100.${field}-not-applicable`}
                                name={`gg0100.${field}`}
                                value="9"
                                checked={formData?.gg0100[field] === "9"}
                                onChange={handleInputChange}
                                className="form-check-input"
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`gg0100.${field}-not-applicable`}
                              >
                                Not Applicable
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* GG0110 */}
                  <div className="mb-3 w-50 col-md-6">
                    <h5>GG0110. Prior Device Use</h5>
                    {[
                      "manualWheelchair",
                      "motorizedWheelchair",
                      "mechanicalLift",
                      "walker",
                      "orthoticsProsthetics",
                      "noneOfTheAbove",
                    ].map((field) => (
                      <div className="form-check" key={field}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`gg0110.${field}`}
                          name={`gg0110.${field}`}
                          checked={formData?.gg0110[field]}
                          onChange={handleInputChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`gg0110.${field}`}
                        >
                          {field.replace(/([A-Z])/g, " $1").toUpperCase()}
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* GG0130 */}
                  <div className="mb-3 w-50 col-md-6">
                    <h5>GG0130. Self-Care</h5>
                    <div className="row">
                      {[
                        "eating",
                        "oralHygiene",
                        "toiletingHygiene",
                        "showerBatheSelf",
                        "upperBodyDressing",
                        "lowerBodyDressing",
                        "puttingOnTakingOffFootwear",
                      ].map((field) => (
                        <div className="col-md-6 mb-3" key={field}>
                          <label
                            htmlFor={`gg0130.${field}`}
                            className="form-label"
                          >
                            {field.replace(/([A-Z])/g, " $1").toUpperCase()}:
                          </label>
                          <div>
                            {[
                              { value: "06", label: "Independent" },
                              {
                                value: "05",
                                label: "Setup or Clean-up Assistance",
                              },
                              {
                                value: "04",
                                label: "Supervision or Touching Assistance",
                              },
                              {
                                value: "03",
                                label: "Partial/Moderate Assistance",
                              },
                              {
                                value: "02",
                                label: "Substantial/Maximal Assistance",
                              },
                              { value: "01", label: "Dependent" },
                              { value: "07", label: "Patient Refused" },
                              { value: "09", label: "Not Applicable" },
                              {
                                value: "10",
                                label:
                                  "Not Attempted Due to Environmental Limitations",
                              },
                              {
                                value: "88",
                                label:
                                  "Not Attempted Due to Medical Conditions or Safety Concerns",
                              },
                            ].map(({ value, label }) => (
                              <div className="form-check" key={value}>
                                <input
                                  type="radio"
                                  id={`gg0130.${field}-${value}`}
                                  name={`gg0130.${field}`}
                                  value={value}
                                  checked={formData?.gg0130[field] === value}
                                  onChange={handleInputChange}
                                  className="form-check-input"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`gg0130.${field}-${value}`}
                                >
                                  {label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* GG0170 */}
                  <div className="mb-3 w-50 col-md-6">
                    <h5>GG0170. Mobility</h5>
                    <div className="row">
                      {[
                        { id: "rollLeftRight", label: "Roll Left and Right" },
                        { id: "sitToLying", label: "Sit to Lying" },
                        {
                          id: "lyingToSitting",
                          label: "Lying to Sitting on Side of Bed",
                        },
                        { id: "sitToStand", label: "Sit to Stand" },
                        {
                          id: "chairBedToChair",
                          label: "Chair/Bed-to-Chair Transfer",
                        },
                        { id: "toiletTransfer", label: "Toilet Transfer" },
                        { id: "carTransfer", label: "Car Transfer" },
                        { id: "walk10Feet", label: "Walk 10 Feet" },
                        {
                          id: "walk50FeetTwoTurns",
                          label: "Walk 50 Feet with Two Turns",
                        },
                        { id: "walk150Feet", label: "Walk 150 Feet" },
                        {
                          id: "walk10FeetUnevenSurfaces",
                          label: "Walking 10 Feet on Uneven Surfaces",
                        },
                        { id: "stepCurb", label: "1 Step (Curb)" },
                        { id: "fourSteps", label: "4 Steps" },
                        { id: "twelveSteps", label: "12 Steps" },
                        { id: "pickingUpObject", label: "Picking Up Object" },
                        {
                          id: "usesWheelchairScooter",
                          label: "Uses Wheelchair/Scooter",
                        },
                        {
                          id: "wheel50FeetTwoTurns",
                          label: "Wheel 50 Feet with Two Turns",
                        },
                        { id: "wheel150Feet", label: "Wheel 150 Feet" },
                      ].map((field) => (
                        <div className="col-md-6 mb-3" key={field.id}>
                          <label className="form-label">{field.label}:</label>
                          {field.id === "usesWheelchairScooter" ? (
                            <>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`gg0170.${field.id}`}
                                name={`gg0170.${field.id}`}
                                checked={formData?.gg0170[field.id]}
                                onChange={handleInputChange}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`gg0170.${field.id}`}
                              >
                                Uses Wheelchair/Scooter
                              </label>
                            </>
                          ) : (
                            <div>
                              {[
                                { value: "06", label: "Independent" },
                                {
                                  value: "05",
                                  label: "Setup or Clean-up Assistance",
                                },
                                {
                                  value: "04",
                                  label: "Supervision or Touching Assistance",
                                },
                                {
                                  value: "03",
                                  label: "Partial/Moderate Assistance",
                                },
                                {
                                  value: "02",
                                  label: "Substantial/Maximal Assistance",
                                },
                                { value: "01", label: "Dependent" },
                                { value: "07", label: "Patient Refused" },
                                { value: "09", label: "Not Applicable" },
                                {
                                  value: "10",
                                  label:
                                    "Not Attempted Due to Environmental Limitations",
                                },
                                {
                                  value: "88",
                                  label:
                                    "Not Attempted Due to Medical Conditions or Safety Concerns",
                                },
                              ].map((option) => (
                                <div className="form-check" key={option.value}>
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    id={`gg0170.${field.id}.${option.value}`}
                                    name={`gg0170.${field.id}`}
                                    value={option.value}
                                    checked={
                                      formData?.gg0170[field.id] ===
                                      option.value
                                    }
                                    onChange={handleInputChange}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={`gg0170.${field.id}.${option.value}`}
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* section H  */}
        <div className="accordion w-100" id="accordionForm">
          <div className="accordion-item w-100">
            <h2 className="accordion-header w-100" id="headingH">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseH"
                aria-expanded="true"
                aria-controls="collapseH"
              >
                Bladder and Bowel
              </button>
            </h2>
            <div
              id="collapseH"
              className="accordion-collapse collapse"
              aria-labelledby="headingH"
              data-bs-parent="#accordionSectionH"
            >
              <div className="accordion-body w-100 print-area">
                {/* M1600 */}
                <h4 className="print-title">Bladder and Bowel</h4>
                <div className="row">
                  <div className="mb-3 w-50 col-md-6">
                    <label className="form-label">
                      M1600. Has this patient been treated for a Urinary Tract
                      Infection in the past 14 days?
                    </label>
                    <div className="form-check">
                      <input
                        id="m1600-0"
                        name="m1600"
                        type="radio"
                        value="0"
                        checked={formData?.m1600 === "0"}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label htmlFor="m1600-0" className="form-check-label">
                        No
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="m1600-1"
                        name="m1600"
                        type="radio"
                        value="1"
                        checked={formData?.m1600 === "1"}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label htmlFor="m1600-1" className="form-check-label">
                        Yes
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="m1600-NA"
                        name="m1600"
                        type="radio"
                        value="NA"
                        checked={formData?.m1600 === "NA"}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label htmlFor="m1600-NA" className="form-check-label">
                        Patient on prophylactic treatment
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="m1600-UK"
                        name="m1600"
                        type="radio"
                        value="UK"
                        checked={formData?.m1600 === "UK"}
                        onChange={handleInputChange}
                        className="form-check-input"
                        disabled
                      />
                      <label htmlFor="m1600-UK" className="form-check-label">
                        Unknown (Omit this option on Discharge)
                      </label>
                    </div>
                  </div>

                  {/* M1610 */}
                  <div className="mb-3 w-50 col-md-6">
                    <label className="form-label">
                      M1610. Urinary Incontinence or Urinary Catheter Presence
                    </label>
                    <div className="form-check">
                      <input
                        id="m1610-0"
                        name="m1610"
                        type="radio"
                        value="0"
                        checked={formData?.m1610 === "0"}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label htmlFor="m1610-0" className="form-check-label">
                        No incontinence or catheter (includes anuria or ostomy
                        for urinary drainage)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="m1610-1"
                        name="m1610"
                        type="radio"
                        value="1"
                        checked={formData?.m1610 === "1"}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label htmlFor="m1610-1" className="form-check-label">
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
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label htmlFor="m1610-2" className="form-check-label">
                        Patient requires a urinary catheter (external,
                        indwelling, intermittent, or suprapubic)
                      </label>
                    </div>
                  </div>

                  {/* M1620 */}
                  <div className="mb-3 w-50 col-md-6">
                    <label className="form-label">
                      M1620. Bowel Incontinence Frequency
                    </label>
                    <div className="form-check">
                      <input
                        id="m1620-0"
                        name="m1620"
                        type="radio"
                        value="0"
                        checked={formData?.m1620 === "0"}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label htmlFor="m1620-0" className="form-check-label">
                        Very rarely or never has bowel incontinence
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="m1620-1"
                        name="m1620"
                        type="radio"
                        value="1"
                        checked={formData?.m1620 === "1"}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label htmlFor="m1620-1" className="form-check-label">
                        Less than once weekly
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="m1620-2"
                        name="m1620"
                        type="radio"
                        value="2"
                        checked={formData?.m1620 === "2"}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label htmlFor="m1620-2" className="form-check-label">
                        One to three times weekly
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="m1620-3"
                        name="m1620"
                        type="radio"
                        value="3"
                        checked={formData?.m1620 === "3"}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label htmlFor="m1620-3" className="form-check-label">
                        Four to six times weekly
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="m1620-4"
                        name="m1620"
                        type="radio"
                        value="4"
                        checked={formData?.m1620 === "4"}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label htmlFor="m1620-4" className="form-check-label">
                        On a daily basis
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="m1620-5"
                        name="m1620"
                        type="radio"
                        value="5"
                        checked={formData?.m1620 === "5"}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label htmlFor="m1620-5" className="form-check-label">
                        More often than once daily
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="m1620-NA"
                        name="m1620"
                        type="radio"
                        value="NA"
                        checked={formData?.m1620 === "NA"}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label htmlFor="m1620-NA" className="form-check-label">
                        Patient has ostomy for bowel elimination
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="m1620-UK"
                        name="m1620"
                        type="radio"
                        value="UK"
                        checked={formData?.m1620 === "UK"}
                        onChange={handleInputChange}
                        className="form-check-input"
                        disabled
                      />
                      <label htmlFor="m1620-UK" className="form-check-label">
                        Unknown (Omit this option on Discharge)
                      </label>
                    </div>
                  </div>

                  {/* M1630 */}
                  <div className="mb-3 w-50 col-md-6">
                    <label className="form-label">
                      M1630. Ostomy for Bowel Elimination
                    </label>
                    <div className="form-check">
                      <input
                        id="m1630-0"
                        name="m1630"
                        type="radio"
                        value="0"
                        checked={formData?.m1630 === "0"}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label htmlFor="m1630-0" className="form-check-label">
                        Patient does not have an ostomy for bowel elimination
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="m1630-1"
                        name="m1630"
                        type="radio"
                        value="1"
                        checked={formData?.m1630 === "1"}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label htmlFor="m1630-1" className="form-check-label">
                        Patient’s ostomy was not related to an inpatient stay
                        and did not necessitate change in medical or treatment
                        regimen
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="m1630-2"
                        name="m1630"
                        type="radio"
                        value="2"
                        checked={formData?.m1630 === "2"}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label htmlFor="m1630-2" className="form-check-label">
                        The ostomy was related to an inpatient stay or did
                        necessitate change in medical or treatment regimen
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* section i  */}
        <div className="accordion w-100" id="accordionSectionI">
          <div className="accordion-item w-100">
            <h2 className="accordion-header w-100" id="headingI">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseI"
                aria-expanded="true"
                aria-controls="collapseI"
              >
                Active Diagnoses
              </button>
            </h2>
            <div
              id="collapseI"
              className="accordion-collapse collapse"
              aria-labelledby="headingI"
              data-bs-parent="#accordionSectionI"
            >
              <div className="accordion-body w-100 print-area">
                {/* M1021. Primary Diagnosis */}
                {/* M1021. Primary Diagnosis */}
                <div className="row">
                  <div className="mb-3 w-50 col-md-6">
                    <label className="form-label">
                      M1021. Primary Diagnosis
                    </label>
                    {/* Since you prefer using checkboxes, I'll assume each diagnosis could be a checkbox */}
                    <div className="form-check">
                      <input
                        id="primaryDiagnosis1"
                        name="primaryDiagnosis"
                        type="checkbox"
                        value="Diagnosis1"
                        checked={formData?.primaryDiagnosis?.includes(
                          "Diagnosis1"
                        )}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="primaryDiagnosis1"
                        className="form-check-label"
                      >
                        Diagnosis 1
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="primaryDiagnosis2"
                        name="primaryDiagnosis"
                        type="checkbox"
                        value="Diagnosis2"
                        checked={formData?.primaryDiagnosis?.includes(
                          "Diagnosis2"
                        )}
                        onChange={handleInputChange}
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

                    <label className="form-label mt-2">
                      Symptom Control Rating (0-4)
                    </label>
                    <div className="form-check">
                      <input
                        id="primaryDiagnosisRating0"
                        name="primaryDiagnosisRating"
                        type="radio"
                        value="0"
                        checked={formData?.primaryDiagnosisRating === "0"}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="primaryDiagnosisRating0"
                        className="form-check-label"
                      >
                        0
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="primaryDiagnosisRating1"
                        name="primaryDiagnosisRating"
                        type="radio"
                        value="1"
                        checked={formData?.primaryDiagnosisRating === "1"}
                        onChange={handleInputChange}
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

                  {/* M1023. Other Diagnoses */}
                  {formData.otherDiagnoses.map((diagnosis, index) => (
                    <div key={index}>
                      <label className="form-label">
                        Other Diagnosis {index + 1}:
                        <input
                          type="text"
                          className="form-control"
                          value={diagnosis}
                          onChange={(e) => handleOtherDiagnosisChange(index, e)}
                        />
                      </label>
                      <div>
                        <label className="form-label">
                          Rating:
                          <div className="form-check d-flex gap-2 align-items-center">
                            {[0, 1, 2, 3, 4].map((rating) => (
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
                                  onChange={() =>
                                    handleOtherDiagnosisRatingChange(
                                      index,
                                      rating.toString()
                                    )
                                  }
                                />
                                <label className="form-check-label">
                                  {rating}
                                </label>
                              </div>
                            ))}
                          </div>
                        </label>
                      </div>
                    </div>
                  ))}

                  {/* M1028. Active Diagnoses – Comorbidities and Co-existing Conditions */}
                  <div className="mb-3 w-50 col-md-6">
                    <label className="form-label">
                      M1028. Active Diagnoses – Comorbidities and Co-existing
                      Conditions
                    </label>
                    <div className="form-check">
                      <input
                        id="pvd"
                        name="comorbidities"
                        type="checkbox"
                        value="pvd"
                        checked={formData?.comorbidities?.includes("pvd")}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="pvd" className="form-check-label">
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
                        checked={formData?.comorbidities?.includes("dm")}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="dm" className="form-check-label">
                        Diabetes Mellitus (DM)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="none"
                        name="comorbidities"
                        type="checkbox"
                        value="none"
                        checked={formData?.comorbidities?.includes("none")}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="none" className="form-check-label">
                        None of the above
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* section J  */}
        <div className="accordion w-100" id="accordionSectionJ">
          <div className="accordion-item w-100">
            <h2 className="accordion-header w-100" id="headingJ">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseJ"
                aria-expanded="true"
                aria-controls="collapseJ"
              >
                Health Conditions
              </button>
            </h2>
            <div
              id="collapseJ"
              className="accordion-collapse collapse"
              aria-labelledby="headingJ"
              data-bs-parent="#accordionSectionJ"
            >
              <div className="accordion-body w-100 print-area">
                {/* M1033. Risk for Hospitalization */}
                <h4 className="print-title">Health Conditions</h4>
                <div className="row">
                  <div className="mb-3 w-50 col-md-6">
                    <label className="form-label">
                      M1033. Risk for Hospitalization
                    </label>

                    <div className="form-check">
                      <input
                        id="falls"
                        name="riskForHospitalization"
                        type="checkbox"
                        value="falls"
                        checked={formData?.riskForHospitalization?.includes(
                          "falls"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="falls" className="form-check-label">
                        History of falls (2 or more falls — or any fall with an
                        injury — in the past 12 months)
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        id="weightLoss"
                        name="riskForHospitalization"
                        type="checkbox"
                        value="weightLoss"
                        checked={formData?.riskForHospitalization?.includes(
                          "weightLoss"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="weightLoss" className="form-check-label">
                        Unintentional weight loss of a total of 10 pounds or
                        more in the last 12 months
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        id="hospitalizations"
                        name="riskForHospitalization"
                        type="checkbox"
                        value="hospitalizations"
                        checked={formData?.riskForHospitalization?.includes(
                          "hospitalizations"
                        )}
                        onChange={handleCheckboxChange}
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

                    <div className="form-check">
                      <input
                        id="emergencyVisits"
                        name="riskForHospitalization"
                        type="checkbox"
                        value="emergencyVisits"
                        checked={formData?.riskForHospitalization?.includes(
                          "emergencyVisits"
                        )}
                        onChange={handleCheckboxChange}
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

                    <div className="form-check">
                      <input
                        id="declineInStatus"
                        name="riskForHospitalization"
                        type="checkbox"
                        value="declineInStatus"
                        checked={formData?.riskForHospitalization?.includes(
                          "declineInStatus"
                        )}
                        onChange={handleCheckboxChange}
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

                    <div className="form-check">
                      <input
                        id="complianceDifficulty"
                        name="riskForHospitalization"
                        type="checkbox"
                        value="complianceDifficulty"
                        checked={formData?.riskForHospitalization?.includes(
                          "complianceDifficulty"
                        )}
                        onChange={handleCheckboxChange}
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

                    <div className="form-check">
                      <input
                        id="medications"
                        name="riskForHospitalization"
                        type="checkbox"
                        value="medications"
                        checked={formData?.riskForHospitalization?.includes(
                          "medications"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="medications" className="form-check-label">
                        Currently taking 5 or more medications
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        id="exhaustion"
                        name="riskForHospitalization"
                        type="checkbox"
                        value="exhaustion"
                        checked={formData?.riskForHospitalization?.includes(
                          "exhaustion"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="exhaustion" className="form-check-label">
                        Currently reports exhaustion
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        id="otherRisks"
                        name="riskForHospitalization"
                        type="checkbox"
                        value="otherRisks"
                        checked={formData?.riskForHospitalization?.includes(
                          "otherRisks"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="otherRisks" className="form-check-label">
                        Other risk(s) not listed in 1-8
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        id="none"
                        name="riskForHospitalization"
                        type="checkbox"
                        value="none"
                        checked={formData?.riskForHospitalization?.includes(
                          "none"
                        )}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label htmlFor="none" className="form-check-label">
                        None of the above
                      </label>
                    </div>
                  </div>

                  {/* J0510. Pain Effect on Sleep */}
                  <div className="mb-3 w-50 col-md-6">
                    <label htmlFor="painEffectOnSleep" className="form-label">
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
                    ].map(({ label, value }) => (
                      <div key={value} className="form-check">
                        <input
                          id={`painEffectOnSleep-${value}`}
                          name="painEffectOnSleep"
                          type="radio"
                          value={value}
                          checked={formData?.painEffectOnSleep === value}
                          onChange={handleInputChange}
                          className="form-check-input"
                        />
                        <label
                          htmlFor={`painEffectOnSleep-${value}`}
                          className="form-check-label"
                        >
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* J0520. Pain Interference with Therapy Activities */}
                  <div className="mb-3 w-50 col-md-6">
                    <label
                      htmlFor="painInterferenceWithTherapy"
                      className="form-label"
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
                    ].map(({ label, value }) => (
                      <div key={value} className="form-check">
                        <input
                          id={`painInterferenceWithTherapy-${value}`}
                          name="painInterferenceWithTherapy"
                          type="radio"
                          value={value}
                          checked={
                            formData?.painInterferenceWithTherapy === value
                          }
                          onChange={handleInputChange}
                          className="form-check-input"
                        />
                        <label
                          htmlFor={`painInterferenceWithTherapy-${value}`}
                          className="form-check-label"
                        >
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* J0530. Pain Interference with Day-to-Day Activities */}
                  <div className="mb-3 w-50 col-md-6">
                    <label
                      htmlFor="painInterferenceWithActivities"
                      className="form-label"
                    >
                      J0530. Pain Interference with Day-to-Day Activities
                    </label>
                    {[
                      { label: "Rarely or not at all", value: "1" },
                      { label: "Occasionally", value: "2" },
                      { label: "Frequently", value: "3" },
                      { label: "Almost constantly", value: "4" },
                      { label: "Unable to answer", value: "8" },
                    ].map(({ label, value }) => (
                      <div key={value} className="form-check">
                        <input
                          id={`painInterferenceWithActivities-${value}`}
                          name="painInterferenceWithActivities"
                          type="radio"
                          value={value}
                          checked={
                            formData?.painInterferenceWithActivities === value
                          }
                          onChange={handleInputChange}
                          className="form-check-input"
                        />
                        <label
                          htmlFor={`painInterferenceWithActivities-${value}`}
                          className="form-check-label"
                        >
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* J1800. Any Falls Since SOC/ROC */}
                  <div className="mb-3 w-50 col-md-6">
                    <label htmlFor="fallsSinceSOCROC" className="form-label">
                      J1800. Any Falls Since SOC/ROC
                    </label>
                    {[
                      { label: "No", value: "0" },
                      { label: "Yes", value: "1" },
                    ].map(({ label, value }) => (
                      <div key={value} className="form-check">
                        <input
                          id={`fallsSinceSOCROC-${value}`}
                          name="fallsSinceSOCROC"
                          type="radio"
                          value={value}
                          checked={formData?.fallsSinceSOCROC === value}
                          onChange={handleInputChange}
                          className="form-check-input"
                        />
                        <label
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
                    <div className="mb-3 w-50 col-md-6">
                      <label htmlFor="fallsDetails" className="form-label">
                        J1900. Number of Falls Since SOC/ROC
                      </label>
                      {[
                        { label: "No injury", value: "noInjury" },
                        { label: "Injury (except major)", value: "injury" },
                        { label: "Major injury", value: "majorInjury" },
                      ].map(({ label, value }) => (
                        <div key={value} className="form-check">
                          <input
                            id={`fallsDetails-${value}`}
                            name="fallsDetails"
                            type="radio"
                            value={value}
                            checked={formData?.fallsDetails === value}
                            onChange={handleInputChange}
                            className="form-check-input"
                          />
                          <label
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
                  <div className="mb-3 w-50 col-md-6">
                    <label htmlFor="shortOfBreath" className="form-label">
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
                    ].map(({ label, value }) => (
                      <div key={value} className="form-check">
                        <input
                          id={`shortOfBreath-${value}`}
                          name="shortOfBreath"
                          type="radio"
                          value={value}
                          checked={formData?.shortOfBreath === value}
                          onChange={handleInputChange}
                          className="form-check-input"
                        />
                        <label
                          htmlFor={`shortOfBreath-${value}`}
                          className="form-check-label"
                        >
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* section k */}
        <div className="accordion w-100" id="accordionSectionK">
          <div className="accordion-item w-100">
            <h2 className="accordion-header w-100" id="headingK">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseK"
                aria-expanded="true"
                aria-controls="collapseK"
              >
                Swallowing/Nutritional Status
              </button>
            </h2>
            <div
              id="collapseK"
              className="accordion-collapse collapse"
              aria-labelledby="headingK"
              data-bs-parent="#accordionSectionK"
            >
              <div className="accordion-body w-100 print-area">
                {/* Height and Weight */}
                <h4 className="print-title">Swallowing/Nutritional Status</h4>
                <div className="row">
                  <div className="mb-3 w-50 col-md-6">
                    <label htmlFor="height" className="form-label">
                      M1060. Height (in inches)
                    </label>
                    <input
                      id="height"
                      name="height"
                      type="number"
                      className="form-control"
                      value={formData?.height}
                      onChange={handleInputChange}
                      step="0.1"
                    />
                  </div>

                  <div className="mb-3 w-50 col-md-6">
                    <label htmlFor="weight" className="form-label">
                      M1060. Weight (in pounds)
                    </label>
                    <input
                      id="weight"
                      name="weight"
                      type="number"
                      className="form-control"
                      value={formData?.weight}
                      onChange={handleInputChange}
                      step="0.1"
                    />
                  </div>

                  {/* Nutritional Approaches */}
                  <div className="mb-3 w-50 col-md-6">
                    <label className="form-label">
                      K0520. Nutritional Approaches
                    </label>

                    <div className="mb-3 w-50 col-md-6">
                      <label className="form-label">On Admission</label>

                      <div className="form-check">
                        <input
                          id="onAdmission-parenteralIVFeeding"
                          name="nutritionalApproachesOnAdmission"
                          type="checkbox"
                          value="parenteralIVFeeding"
                          checked={formData?.nutritionalApproachesOnAdmission?.includes(
                            "parenteralIVFeeding"
                          )}
                          onChange={handleCheckboxChange}
                          className="form-check-input"
                        />
                        <label
                          htmlFor="onAdmission-parenteralIVFeeding"
                          className="form-check-label"
                        >
                          Parenteral/IV feeding
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          id="onAdmission-feedingTube"
                          name="nutritionalApproachesOnAdmission"
                          type="checkbox"
                          value="feedingTube"
                          checked={formData?.nutritionalApproachesOnAdmission?.includes(
                            "feedingTube"
                          )}
                          onChange={handleCheckboxChange}
                          className="form-check-input"
                        />
                        <label
                          htmlFor="onAdmission-feedingTube"
                          className="form-check-label"
                        >
                          Feeding tube (e.g., nasogastric or abdominal (PEG))
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          id="onAdmission-mechanicallyAlteredDiet"
                          name="nutritionalApproachesOnAdmission"
                          type="checkbox"
                          value="mechanicallyAlteredDiet"
                          checked={formData?.nutritionalApproachesOnAdmission?.includes(
                            "mechanicallyAlteredDiet"
                          )}
                          onChange={handleCheckboxChange}
                          className="form-check-input"
                        />
                        <label
                          htmlFor="onAdmission-mechanicallyAlteredDiet"
                          className="form-check-label"
                        >
                          Mechanically altered diet (e.g., pureed food,
                          thickened liquids)
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          id="onAdmission-therapeuticDiet"
                          name="nutritionalApproachesOnAdmission"
                          type="checkbox"
                          value="therapeuticDiet"
                          checked={formData?.nutritionalApproachesOnAdmission?.includes(
                            "therapeuticDiet"
                          )}
                          onChange={handleCheckboxChange}
                          className="form-check-input"
                        />
                        <label
                          htmlFor="onAdmission-therapeuticDiet"
                          className="form-check-label"
                        >
                          Therapeutic diet (e.g., low salt, diabetic, low
                          cholesterol)
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          id="onAdmission-none"
                          name="nutritionalApproachesOnAdmission"
                          type="checkbox"
                          value="none"
                          checked={formData?.nutritionalApproachesOnAdmission?.includes(
                            "none"
                          )}
                          onChange={handleCheckboxChange}
                          className="form-check-input"
                        />
                        <label
                          htmlFor="onAdmission-none"
                          className="form-check-label"
                        >
                          None of the above
                        </label>
                      </div>
                    </div>

                    <div>
                      <div className="mb-3 w-50 col-md-6">
                        <label className="form-label">Last 7 Days</label>

                        <div className="form-check">
                          <input
                            id="last7Days-parenteralIVFeeding"
                            name="nutritionalApproachesLast7Days"
                            type="checkbox"
                            value="parenteralIVFeeding"
                            checked={formData?.nutritionalApproachesLast7Days?.includes(
                              "parenteralIVFeeding"
                            )}
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                          />
                          <label
                            htmlFor="last7Days-parenteralIVFeeding"
                            className="form-check-label"
                          >
                            Parenteral/IV feeding
                          </label>
                        </div>

                        <div className="form-check">
                          <input
                            id="last7Days-feedingTube"
                            name="nutritionalApproachesLast7Days"
                            type="checkbox"
                            value="feedingTube"
                            checked={formData?.nutritionalApproachesLast7Days?.includes(
                              "feedingTube"
                            )}
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                          />
                          <label
                            htmlFor="last7Days-feedingTube"
                            className="form-check-label"
                          >
                            Feeding tube (e.g., nasogastric or abdominal (PEG))
                          </label>
                        </div>

                        <div className="form-check">
                          <input
                            id="last7Days-mechanicallyAlteredDiet"
                            name="nutritionalApproachesLast7Days"
                            type="checkbox"
                            value="mechanicallyAlteredDiet"
                            checked={formData?.nutritionalApproachesLast7Days?.includes(
                              "mechanicallyAlteredDiet"
                            )}
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                          />
                          <label
                            htmlFor="last7Days-mechanicallyAlteredDiet"
                            className="form-check-label"
                          >
                            Mechanically altered diet (e.g., pureed food,
                            thickened liquids)
                          </label>
                        </div>

                        <div className="form-check">
                          <input
                            id="last7Days-therapeuticDiet"
                            name="nutritionalApproachesLast7Days"
                            type="checkbox"
                            value="therapeuticDiet"
                            checked={formData?.nutritionalApproachesLast7Days?.includes(
                              "therapeuticDiet"
                            )}
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                          />
                          <label
                            htmlFor="last7Days-therapeuticDiet"
                            className="form-check-label"
                          >
                            Therapeutic diet (e.g., low salt, diabetic, low
                            cholesterol)
                          </label>
                        </div>

                        <div className="form-check">
                          <input
                            id="last7Days-none"
                            name="nutritionalApproachesLast7Days"
                            type="checkbox"
                            value="none"
                            checked={formData?.nutritionalApproachesLast7Days?.includes(
                              "none"
                            )}
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                          />
                          <label
                            htmlFor="last7Days-none"
                            className="form-check-label"
                          >
                            None of the above
                          </label>
                        </div>
                      </div>

                      <div className="mb-3 w-50 col-md-6">
                        <label className="form-label">At Discharge</label>

                        <div className="form-check">
                          <input
                            id="atDischarge-parenteralIVFeeding"
                            name="nutritionalApproachesAtDischarge"
                            type="checkbox"
                            value="parenteralIVFeeding"
                            checked={formData?.nutritionalApproachesAtDischarge?.includes(
                              "parenteralIVFeeding"
                            )}
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                          />
                          <label
                            htmlFor="atDischarge-parenteralIVFeeding"
                            className="form-check-label"
                          >
                            Parenteral/IV feeding
                          </label>
                        </div>

                        <div className="form-check">
                          <input
                            id="atDischarge-feedingTube"
                            name="nutritionalApproachesAtDischarge"
                            type="checkbox"
                            value="feedingTube"
                            checked={formData?.nutritionalApproachesAtDischarge?.includes(
                              "feedingTube"
                            )}
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                          />
                          <label
                            htmlFor="atDischarge-feedingTube"
                            className="form-check-label"
                          >
                            Feeding tube (e.g., nasogastric or abdominal (PEG))
                          </label>
                        </div>

                        <div className="form-check">
                          <input
                            id="atDischarge-mechanicallyAlteredDiet"
                            name="nutritionalApproachesAtDischarge"
                            type="checkbox"
                            value="mechanicallyAlteredDiet"
                            checked={formData?.nutritionalApproachesAtDischarge?.includes(
                              "mechanicallyAlteredDiet"
                            )}
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                          />
                          <label
                            htmlFor="atDischarge-mechanicallyAlteredDiet"
                            className="form-check-label"
                          >
                            Mechanically altered diet (e.g., pureed food,
                            thickened liquids)
                          </label>
                        </div>

                        <div className="form-check">
                          <input
                            id="atDischarge-therapeuticDiet"
                            name="nutritionalApproachesAtDischarge"
                            type="checkbox"
                            value="therapeuticDiet"
                            checked={formData?.nutritionalApproachesAtDischarge?.includes(
                              "therapeuticDiet"
                            )}
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                          />
                          <label
                            htmlFor="atDischarge-therapeuticDiet"
                            className="form-check-label"
                          >
                            Therapeutic diet (e.g., low salt, diabetic, low
                            cholesterol)
                          </label>
                        </div>

                        <div className="form-check">
                          <input
                            id="atDischarge-none"
                            name="nutritionalApproachesAtDischarge"
                            type="checkbox"
                            value="none"
                            checked={formData?.nutritionalApproachesAtDischarge?.includes(
                              "none"
                            )}
                            onChange={handleCheckboxChange}
                            className="form-check-input"
                          />
                          <label
                            htmlFor="atDischarge-none"
                            className="form-check-label"
                          >
                            None of the above
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* M1870. Feeding or Eating */}
                  <div className="mb-3 w-50 col-md-6">
                    <label className="form-label">
                      M1870. Feeding or Eating
                    </label>
                    <div className="form-check">
                      <input
                        id="feedingOrEating0"
                        name="feedingOrEating"
                        type="radio"
                        value="0"
                        checked={formData?.feedingOrEating === "0"}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label
                        htmlFor="feedingOrEating0"
                        className="form-check-label"
                      >
                        Able to independently feed self
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="feedingOrEating1"
                        name="feedingOrEating"
                        type="radio"
                        value="1"
                        checked={formData?.feedingOrEating === "1"}
                        onChange={handleInputChange}
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
                    <div className="form-check">
                      <input
                        id="feedingOrEating2"
                        name="feedingOrEating"
                        type="radio"
                        value="2"
                        checked={formData?.feedingOrEating === "2"}
                        onChange={handleInputChange}
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
                    <div className="form-check">
                      <input
                        id="feedingOrEating3"
                        name="feedingOrEating"
                        type="radio"
                        value="3"
                        checked={formData?.feedingOrEating === "3"}
                        onChange={handleInputChange}
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
                    <div className="form-check">
                      <input
                        id="feedingOrEating4"
                        name="feedingOrEating"
                        type="radio"
                        value="4"
                        checked={formData?.feedingOrEating === "4"}
                        onChange={handleInputChange}
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
                    <div className="form-check">
                      <input
                        id="feedingOrEating5"
                        name="feedingOrEating"
                        type="radio"
                        value="5"
                        checked={formData?.feedingOrEating === "5"}
                        onChange={handleInputChange}
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
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* section M  */}
        <div className="accordion w-100" id="accordionSectionM">
          <div className="accordion-item w-100">
            <h2 className="accordion-header w-100" id="headingM">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseM"
                aria-expanded="true"
                aria-controls="collapseM"
              >
                Skin Conditions
              </button>
            </h2>
            <div
              id="collapseM"
              className="accordion-collapse collapse"
              aria-labelledby="headingM"
              data-bs-parent="#accordionSectionM"
            >
              <div className="accordion-body w-100 print-area">
                {/* M1306 */}
                <h4 className="print-title">Skin Conditions</h4>
                <div className="row">
                  <div className="mb-3 w-50 col-md-6">
                    <h6>
                      1306. Does this patient have at least one Unhealed
                      Pressure Ulcer/Injury at Stage 2 or Higher or designated
                      as Unstageable?
                    </h6>
                    <p>
                      (Excludes Stage 1 pressure injuries and all healed
                      pressure ulcers/injuries)
                    </p>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="M1306"
                        value="0"
                        checked={formData?.M1306 === "0"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">0. No</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="M1306"
                        value="1"
                        checked={formData?.M1306 === "1"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">1. Yes</label>
                    </div>
                  </div>

                  {/* M1307 */}
                  <div className="mb-3 w-50 col-md-6">
                    <h6>
                      M1307. The Oldest Stage 2 Pressure Ulcer that is present
                      at discharge:
                    </h6>
                    <p>(Excludes healed Stage 2 pressure ulcers)</p>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="M1307"
                        value="1"
                        checked={formData?.M1307 === "1"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        1. Was present at the most recent SOC/ROC assessment
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="M1307"
                        value="2"
                        checked={formData?.M1307 === "2"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        2. Developed since the most recent SOC/ROC assessment
                      </label>
                    </div>
                    <div className="form-group">
                      <label>
                        Record date pressure ulcer first identified:
                      </label>
                      <div className="d-flex">
                        <input
                          type="text"
                          className="form-control me-2"
                          placeholder="Month"
                        />
                        <input
                          type="text"
                          className="form-control me-2"
                          placeholder="Day"
                        />
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Year"
                        />
                      </div>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="M1307"
                        value="NA"
                        checked={formData?.M1307 === "NA"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        NA. No Stage 2 pressure ulcers are present at discharge
                      </label>
                    </div>
                  </div>

                  {/* M1311: Stage 2 */}
                  <div className="mb-3 w-50 col-md-6">
                    <h6>
                      M1311?. Current Number of Unhealed Pressure
                      Ulcers/Injuries
                    </h6>
                    <h6>A1. Stage 2</h6>
                    <p>
                      Partial thickness loss of dermis presenting as a shallow
                      open ulcer with a red or pink wound bed, without slough.
                      May also present as an intact or open/ruptured blister.
                    </p>
                    <div className="form-group">
                      <label>Number of Stage 2 pressure ulcers:</label>
                      <input
                        type="number"
                        className="form-control mb-2"
                        name="M1311?.stage2?.current"
                        value={formData?.M1311?.stage2?.current}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Number of these Stage 2 pressure ulcers that were
                        present at most recent SOC/ROC:
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="M1311??.stage2?.presentAtSOC"
                        value={formData?.M1311?.stage2?.presentAtSOC}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  {/* M1311: Stage 3 */}
                  <div className="mb-3 w-50 col-md-6">
                    <h6>B1. Stage 3</h6>
                    <p>
                      Full thickness tissue loss. Subcutaneous fat may be
                      visible but bone, tendon, or muscle is not exposed. Slough
                      may be present but does not obscure the depth of tissue
                      loss. May include undermining and tunneling.
                    </p>
                    <div className="form-group">
                      <label>Number of Stage 3 pressure ulcers:</label>
                      <input
                        type="number"
                        className="form-control mb-2"
                        name="M1311?.stage3?.current"
                        value={formData?.M1311?.stage3?.current}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Number of these Stage 3 pressure ulcers that were
                        present at most recent SOC/ROC:
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="M1311?.stage3.presentAtSOC"
                        value={formData?.M1311?.stage3.presentAtSOC}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  {/* M1311: Stage 4 */}
                  <div className="mb-3 w-50 col-md-6">
                    <h6>C1. Stage 4</h6>
                    <p>
                      Full thickness tissue loss with exposed bone, tendon, or
                      muscle. Slough or eschar may be present on some parts of
                      the wound bed. Often includes undermining and tunneling.
                    </p>
                    <div className="form-group">
                      <label>Number of Stage 4 pressure ulcers:</label>
                      <input
                        type="number"
                        className="form-control mb-2"
                        name="M1311?.stage4?.current"
                        value={formData?.M1311?.stage4?.current}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Number of these Stage 4 pressure ulcers that were
                        present at most recent SOC/ROC:
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="M1311?.stage4.presentAtSOC"
                        value={formData?.M1311?.stage4.presentAtSOC}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  {/* M1311: Unstageable: Non-removable dressing/device */}
                  <div className="mb-3 w-50 col-md-6">
                    <h6>D1. Unstageable: Non-removable dressing/device</h6>
                    <p>
                      Known but not stageable due to non-removable
                      dressing/device
                    </p>
                    <div className="form-group">
                      <label>
                        Number of unstageable pressure ulcers/injuries:
                      </label>
                      <input
                        type="number"
                        className="form-control mb-2"
                        name="M1311?.unstageableDressing?.current"
                        value={formData?.M1311?.unstageableDressing?.current}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Number of these unstageable pressure ulcers/injuries
                        that were present at most recent SOC/ROC:
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="M1311?.unstageableDressing.presentAtSOC"
                        value={
                          formData?.M1311?.unstageableDressing.presentAtSOC
                        }
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  {/* M1311: Unstageable: Slough and/or eschar */}
                  <div className="mb-3 w-50 col-md-6">
                    <h6>E1. Unstageable: Slough and/or eschar</h6>
                    <p>
                      Known but not stageable due to coverage of wound bed by
                      slough and/or eschar
                    </p>
                    <div className="form-group">
                      <label>Number of unstageable pressure ulcers:</label>
                      <input
                        type="number"
                        className="form-control mb-2"
                        name="M1311?.unstageableSlough?.current"
                        value={formData?.M1311?.unstageableSlough?.current}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Number of these unstageable pressure ulcers/injuries
                        that were present at most recent SOC/ROC:
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="M1311?.unstageableSlough.presentAtSOC"
                        value={formData?.M1311?.unstageableSlough.presentAtSOC}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  {/* M1311: Unstageable: Deep tissue injury */}
                  <div className="mb-3 w-50 col-md-6">
                    <h6>F1. Unstageable: Deep tissue injury</h6>
                    <p>
                      Number of unstageable pressure injuries presenting as deep
                      tissue injury
                    </p>
                    <div className="form-group">
                      <label>Number of unstageable pressure injuries:</label>
                      <input
                        type="number"
                        className="form-control mb-2"
                        name="M1311?.deepTissueInjury?.current"
                        value={formData?.M1311?.deepTissueInjury?.current}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Number of these unstageable pressure injuries that were
                        present at most recent SOC/ROC:
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="M1311?.deepTissueInjury.presentAtSOC"
                        value={formData?.M1311?.deepTissueInjury.presentAtSOC}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  {/* M1322 */}
                  <div className="mb-3 w-50 col-md-6">
                    <h6>M1322. Current Number of Stage 1 Pressure Injuries</h6>
                    <p>
                      Intact skin with non-blanchable redness of a localized
                      area usually over a bony prominence. Darkly pigmented skin
                      may not have a visible blanching; in dark skin tones only,
                      it may appear with persistent blue or purple hues.
                    </p>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="M1322"
                        value="0"
                        checked={formData?.M1322 === "0"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">0. Zero</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="M1322"
                        value="1"
                        checked={formData?.M1322 === "1"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">1. One</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="M1322"
                        value="2"
                        checked={formData?.M1322 === "2"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">2. Two</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="M1322"
                        value="3"
                        checked={formData?.M1322 === "3"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">3. Three</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="M1322"
                        value="4"
                        checked={formData?.M1322 === "4"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        4. Four or more
                      </label>
                    </div>
                  </div>

                  {/* M1324 */}
                  <div className="mb-3 w-50 col-md-6">
                    <h6>
                      M1324. Stage of Most Problematic Unhealed Pressure
                      Ulcer/Injury that is Stageable
                    </h6>
                    <p>
                      Excludes pressure ulcer/injury that cannot be staged due
                      to a non-removable dressing/device, coverage of wound bed
                      by slough and/or eschar, or deep tissue injury.
                    </p>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="M1324"
                        value="1"
                        checked={formData?.M1324 === "1"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">1. Stage 1</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="M1324"
                        value="2"
                        checked={formData?.M1324 === "2"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">2. Stage 2</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="M1324"
                        value="3"
                        checked={formData?.M1324 === "3"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">3. Stage 3</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="M1324"
                        value="4"
                        checked={formData?.M1324 === "4"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">4. Stage 4</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="M1324"
                        value="NA"
                        checked={formData?.M1324 === "NA"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        NA. Patient has no pressure ulcers/injuries or no
                        stageable pressure ulcers/injuries
                      </label>
                    </div>
                  </div>

                  {/* M1330 */}
                  <div className="mb-3 w-50 col-md-6">
                    <h6>M1330. Does this patient have a Stasis Ulcer?</h6>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="M1330"
                        value="0"
                        checked={formData?.M1330 === "0"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">0. No</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="M1330"
                        value="1"
                        checked={formData?.M1330 === "1"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        1. Yes, patient has BOTH observable and unobservable
                        stasis ulcers
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="M1330"
                        value="2"
                        checked={formData?.M1330 === "2"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        2. Yes, patient has observable stasis ulcers ONLY
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="M1330"
                        value="3"
                        checked={formData?.M1330 === "3"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        3. Yes, patient has unobservable stasis ulcers ONLY
                        (known but not observable due to non-removable
                        dressing/device)
                      </label>
                    </div>
                  </div>

                  {/* M1332 */}
                  <div className="mb-3 w-50 col-md-6">
                    <h6>
                      M1332. Current Number of Stasis Ulcer(s) that are
                      Observable
                    </h6>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="M1332"
                        value="1"
                        checked={formData?.M1332 === "1"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">1. One</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="M1332"
                        value="2"
                        checked={formData?.M1332 === "2"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">2. Two</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="M1332"
                        value="3"
                        checked={formData?.M1332 === "3"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">3. Three</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="M1332"
                        value="4"
                        checked={formData?.M1332 === "4"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        4. Four or more
                      </label>
                    </div>
                  </div>

                  {/* M1334 */}
                  <div className="mb-3 w-50 col-md-6">
                    <h6>
                      M1334. Status of Most Problematic Stasis Ulcer that is
                      Observable
                    </h6>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="M1334"
                        value="1"
                        checked={formData?.M1334 === "1"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        1. Fully granulating
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="M1334"
                        value="2"
                        checked={formData?.M1334 === "2"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        2. Early/partial granulation
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="M1334"
                        value="3"
                        checked={formData?.M1334 === "3"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">3. Not healing</label>
                    </div>
                  </div>

                  {/* M1340 */}
                  <div className="mb-3 w-50 col-md-6">
                    <h6>M1340. Does this patient have a Surgical Wound?</h6>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="M1340"
                        value="0"
                        checked={formData?.M1340 === "0"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">0. No</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="M1340"
                        value="1"
                        checked={formData?.M1340 === "1"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        1. Yes, patient has at least one observable surgical
                        wound
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="M1340"
                        value="2"
                        checked={formData?.M1340 === "2"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        2. Surgical wound known but not observable due to
                        non-removable dressing/device
                      </label>
                    </div>
                  </div>

                  {/* M1342 */}
                  <div className="mb-3 w-50 col-md-6">
                    <h6>
                      M1342. Status of Most Problematic Surgical Wound that is
                      Observable
                    </h6>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="M1342"
                        value="0"
                        checked={formData?.M1342 === "0"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        0. Newly epithelialized
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="M1342"
                        value="1"
                        checked={formData?.M1342 === "1"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        1. Fully granulating
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="M1342"
                        value="2"
                        checked={formData?.M1342 === "2"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        2. Early/partial granulation
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="M1342"
                        value="3"
                        checked={formData?.M1342 === "3"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">3. Not healing</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* section N  */}
        <div className="accordion w-100" id="accordionSectionN">
          <div className="accordion-item w-100">
            <h2 className="accordion-header w-100" id="headingN">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseN"
                aria-expanded="true"
                aria-controls="collapseN"
              >
                Medications
              </button>
            </h2>
            <div
              id="collapseN"
              className="accordion-collapse collapse"
              aria-labelledby="headingN"
              data-bs-parent="#accordionSectionN"
            >
              <div className="accordion-body w-100 print-area">
                {/* N0415. High-Risk Drug Classes: Use and Indication */}
                <h4 className="print-title">Medications</h4>
                <div className="row">
                  <div className="mb-3 w-50 col-md-6">
                    <label className="form-label">
                      N0415. High-Risk Drug Classes: Use and Indication
                    </label>
                    <div className="form-check">
                      <label className="form-check-label">
                        A. Antipsychotic
                      </label>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={
                            formData?.highRiskDrugs?.antipsychotic?.isTaking
                          }
                          onChange={(e) =>
                            handleCheckboxChange(e, "antipsychotic", "isTaking")
                          }
                        />
                        <label className="form-check-label">Is Taking</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={
                            formData?.highRiskDrugs?.antipsychotic
                              ?.indicationNoted
                          }
                          onChange={(e) =>
                            handleCheckboxChange(
                              e,
                              "antipsychotic",
                              "indicationNoted"
                            )
                          }
                        />
                        <label className="form-check-label">
                          Indication Noted
                        </label>
                      </div>
                    </div>

                    <div className="form-check">
                      <label className="form-check-label">
                        E. Anticoagulant
                      </label>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={
                            formData?.highRiskDrugs?.anticoagulant?.isTaking
                          }
                          onChange={(e) =>
                            handleCheckboxChange(e, "anticoagulant", "isTaking")
                          }
                        />
                        <label className="form-check-label">Is Taking</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={
                            formData?.highRiskDrugs?.anticoagulant
                              ?.indicationNoted
                          }
                          onChange={(e) =>
                            handleCheckboxChange(
                              e,
                              "anticoagulant",
                              "indicationNoted"
                            )
                          }
                        />
                        <label className="form-check-label">
                          Indication Noted
                        </label>
                      </div>
                    </div>

                    <div className="form-check">
                      <label className="form-check-label">F. Antibiotic</label>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={
                            formData?.highRiskDrugs?.antibiotic?.isTaking
                          }
                          onChange={(e) =>
                            handleCheckboxChange(e, "antibiotic", "isTaking")
                          }
                        />
                        <label className="form-check-label">Is Taking</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={
                            formData?.highRiskDrugs?.antibiotic?.indicationNoted
                          }
                          onChange={(e) =>
                            handleCheckboxChange(
                              e,
                              "antibiotic",
                              "indicationNoted"
                            )
                          }
                        />
                        <label className="form-check-label">
                          Indication Noted
                        </label>
                      </div>
                    </div>

                    <div className="form-check">
                      <label className="form-check-label">H. Opioid</label>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={formData?.highRiskDrugs.opioid?.isTaking}
                          onChange={(e) =>
                            handleCheckboxChange(e, "opioid", "isTaking")
                          }
                        />
                        <label className="form-check-label">Is Taking</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={
                            formData?.highRiskDrugs.opioid.indicationNoted
                          }
                          onChange={(e) =>
                            handleCheckboxChange(e, "opioid", "indicationNoted")
                          }
                        />
                        <label className="form-check-label">
                          Indication Noted
                        </label>
                      </div>
                    </div>

                    <div className="form-check">
                      <label className="form-check-label">
                        I. Antiplatelet
                      </label>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={
                            formData?.highRiskDrugs?.antiplatelet?.isTaking
                          }
                          onChange={(e) =>
                            handleCheckboxChange(e, "antiplatelet", "isTaking")
                          }
                        />
                        <label className="form-check-label">Is Taking</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={
                            formData?.highRiskDrugs?.antiplatelet
                              .indicationNoted
                          }
                          onChange={(e) =>
                            handleCheckboxChange(
                              e,
                              "antiplatelet",
                              "indicationNoted"
                            )
                          }
                        />
                        <label className="form-check-label">
                          Indication Noted
                        </label>
                      </div>
                    </div>

                    <div className="form-check">
                      <label className="form-check-label">
                        J. Hypoglycemic (including insulin)
                      </label>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={
                            formData?.highRiskDrugs.hypoglycemic?.isTaking
                          }
                          onChange={(e) =>
                            handleCheckboxChange(e, "hypoglycemic", "isTaking")
                          }
                        />
                        <label className="form-check-label">Is Taking</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={
                            formData?.highRiskDrugs.hypoglycemic
                              ?.indicationNoted
                          }
                          onChange={(e) =>
                            handleCheckboxChange(
                              e,
                              "hypoglycemic",
                              "indicationNoted"
                            )
                          }
                        />
                        <label className="form-check-label">
                          Indication Noted
                        </label>
                      </div>
                    </div>

                    <div className="form-check">
                      <label className="form-check-label">
                        Z. None of the above
                      </label>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={formData?.highRiskDrugs.none?.isTaking}
                          onChange={(e) =>
                            handleCheckboxChange(e, "none", "isTaking")
                          }
                        />
                        <label className="form-check-label">Is Taking</label>
                      </div>
                    </div>
                  </div>

                  {/* M2001. Drug Regimen Review */}
                  <div className="mb-3 w-50 col-md-6">
                    <label className="form-label">
                      M2001. Drug Regimen Review
                    </label>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="drugRegimenReview"
                        value="0"
                        checked={formData?.drugRegimenReview === "0"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        No — No issues found during review
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="drugRegimenReview"
                        value="1"
                        checked={formData?.drugRegimenReview === "1"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        Yes — Issues found during review
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="drugRegimenReview"
                        value="9"
                        checked={formData?.drugRegimenReview === "9"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        NA — Patient is not taking any medications
                      </label>
                    </div>
                  </div>

                  {/* M2003. Medication Follow-up */}
                  <div className="mb-3 w-50 col-md-6">
                    <label className="form-label">
                      M2003. Medication Follow-up
                    </label>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="medicationFollowUp"
                        value="0"
                        checked={formData?.medicationFollowUp === "0"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">No</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="medicationFollowUp"
                        value="1"
                        checked={formData?.medicationFollowUp === "1"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">Yes</label>
                    </div>
                  </div>

                  {/* M2005. Medication Intervention */}
                  <div className="mb-3 w-50 col-md-6">
                    <label className="form-label">
                      M2005. Medication Intervention
                    </label>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="medicationIntervention"
                        value="0"
                        checked={formData?.medicationIntervention === "0"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">No</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="medicationIntervention"
                        value="1"
                        checked={formData?.medicationIntervention === "1"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">Yes</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="medicationIntervention"
                        value="9"
                        checked={formData?.medicationIntervention === "9"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        NA — No potential issues identified or patient is not
                        taking any medications
                      </label>
                    </div>
                  </div>

                  {/* M2010. Patient/Caregiver High-Risk Drug Education */}
                  <div className="mb-3 w-50 col-md-6">
                    <label className="form-label">
                      M2010. Patient/Caregiver High-Risk Drug Education
                    </label>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="highRiskDrugEducation"
                        value="0"
                        checked={formData?.highRiskDrugEducation === "0"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">No</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="highRiskDrugEducation"
                        value="1"
                        checked={formData?.highRiskDrugEducation === "1"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">Yes</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="highRiskDrugEducation"
                        value="NA"
                        checked={formData?.highRiskDrugEducation === "NA"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        NA — No high-risk drugs or fully knowledgeable
                      </label>
                    </div>
                  </div>

                  {/* M2020. Management of Oral Medications */}
                  <div className="mb-3 w-50 col-md-6">
                    <label className="form-label">
                      M2020. Management of Oral Medications
                    </label>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="managementOralMedications"
                        value="0"
                        checked={formData?.managementOralMedications === "0"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        Able to independently take the correct medication(s)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="managementOralMedications"
                        value="1"
                        checked={formData?.managementOralMedications === "1"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        Able to take medication(s) if prepared in advance or if
                        using a drug diary/chart
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="managementOralMedications"
                        value="2"
                        checked={formData?.managementOralMedications === "2"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        Able to take medication(s) if given reminders
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="managementOralMedications"
                        value="3"
                        checked={formData?.managementOralMedications === "3"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        Unable to take medication unless administered by another
                        person
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="managementOralMedications"
                        value="NA"
                        checked={formData?.managementOralMedications === "NA"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        NA — No oral medications prescribed
                      </label>
                    </div>
                  </div>

                  {/* M2030. Management of Injectable Medications */}
                  <div className="mb-3 w-50 col-md-6">
                    <label className="form-label">
                      M2030. Management of Injectable Medications
                    </label>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="managementInjectableMedications"
                        value="0"
                        checked={
                          formData?.managementInjectableMedications === "0"
                        }
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        Able to independently take the correct medication(s)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="managementInjectableMedications"
                        value="1"
                        checked={
                          formData?.managementInjectableMedications === "1"
                        }
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        Able to take medication(s) if syringes are prepared in
                        advance or if using a drug diary/chart
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="managementInjectableMedications"
                        value="2"
                        checked={
                          formData?.managementInjectableMedications === "2"
                        }
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        Able to take medication(s) if given reminders
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="managementInjectableMedications"
                        value="3"
                        checked={
                          formData?.managementInjectableMedications === "3"
                        }
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        Unable to take medication unless administered by another
                        person
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="managementInjectableMedications"
                        value="NA"
                        checked={
                          formData?.managementInjectableMedications === "NA"
                        }
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        NA — No injectable medications prescribed
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* section o */}
        <div className="accordion w-100" id="accordionSectionO">
          <div className="accordion-item w-100">
            <h2 className="accordion-header w-100" id="headingO">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseO"
                aria-expanded="true"
                aria-controls="collapseO"
              >
                Special Treatments, Procedures, and Programs
              </button>
            </h2>
            <div
              id="collapseO"
              className="accordion-collapse collapse"
              aria-labelledby="headingO"
              data-bs-parent="#accordionSectionO"
            >
              <div className="accordion-body w-100 print-area">
                {/* O0110. Special Treatments, Procedures, and Programs */}
                <h4 className="print-title">
                  Special Treatments, Procedures, and Programs
                </h4>
                <div className="row">
                  <div className="mb-3 w-50 col-md-6">
                    <label className="form-label">
                      O0110. Special Treatments, Procedures, and Programs
                      (Admission)
                    </label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="chemotherapy"
                        name="specialTreatmentsAdmission"
                        checked={formData?.specialTreatmentsAdmission?.includes(
                          "chemotherapy"
                        )}
                        onChange={handleCheckboxChange}
                      />
                      <label className="form-check-label">
                        A1. Chemotherapy
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="radiation"
                        name="specialTreatmentsAdmission"
                        checked={formData?.specialTreatmentsAdmission?.includes(
                          "radiation"
                        )}
                        onChange={handleCheckboxChange}
                      />
                      <label className="form-check-label">B1. Radiation</label>
                    </div>

                    {/* Repeat similar blocks for other treatments, procedures, and programs on admission */}
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="specialTreatmentsAdmission"
                        value="noneOfTheAbove"
                        checked={formData?.specialTreatmentsAdmission?.includes(
                          "noneOfTheAbove"
                        )}
                        onChange={handleCheckboxChange}
                      />
                      <label className="form-check-label">
                        Z1. None of the Above
                      </label>
                    </div>
                  </div>

                  <div className="mb-3 w-50 col-md-6">
                    <label className="form-label">
                      O0110. Special Treatments, Procedures, and Programs
                      (Discharge)
                    </label>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="chemotherapy"
                        name="specialTreatmentsDischarge"
                        checked={formData?.specialTreatmentsDischarge?.includes(
                          "chemotherapy"
                        )}
                        onChange={handleCheckboxChange}
                      />
                      <label className="form-check-label">
                        A1. Chemotherapy
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="radiation"
                        name="specialTreatmentsDischarge"
                        checked={formData?.specialTreatmentsDischarge?.includes(
                          "radiation"
                        )}
                        onChange={handleCheckboxChange}
                      />
                      <label className="form-check-label">B1. Radiation</label>
                    </div>

                    {/* Repeat similar blocks for other treatments, procedures, and programs on discharge */}

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="noneOfTheAbove"
                        name="specialTreatmentsDischarge"
                        checked={formData?.specialTreatmentsDischarge?.includes(
                          "noneOfTheAbove"
                        )}
                        onChange={handleCheckboxChange}
                      />
                      <label className="form-check-label">
                        Z1. None of the Above
                      </label>
                    </div>
                  </div>

                  {/* O0350. Patient’s COVID-19 vaccination is up to date */}
                  <div className="mb-3 w-50 col-md-6">
                    <label className="form-label">
                      O0350. Patient’s COVID-19 vaccination is up to date
                    </label>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="covidVaccinationUpToDate"
                        value="0"
                        checked={formData?.covidVaccinationUpToDate === "0"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        No, patient is not up to date
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="covidVaccinationUpToDate"
                        value="1"
                        checked={formData?.covidVaccinationUpToDate === "1"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        Yes, patient is up to date
                      </label>
                    </div>
                  </div>

                  {/* M1041. Influenza Vaccine Data Collection Period */}
                  <div className="mb-3 w-50 col-md-6">
                    <label className="form-label">
                      M1041. Influenza Vaccine Data Collection Period
                    </label>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="influenzaVaccinePeriod"
                        value="0"
                        checked={formData?.influenzaVaccinePeriod === "0"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">No</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="influenzaVaccinePeriod"
                        value="1"
                        checked={formData?.influenzaVaccinePeriod === "1"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">Yes</label>
                    </div>
                  </div>

                  {/* M1046. Influenza Vaccine Received */}
                  {formData?.influenzaVaccinePeriod === "1" && (
                    <div className="mb-3 w-50 col-md-6">
                      <label className="form-label">
                        M1046. Influenza Vaccine Received
                      </label>
                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          name="influenzaVaccineReceived"
                          value="1"
                          checked={formData?.influenzaVaccineReceived === "1"}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label">
                          Yes; received from your agency during this episode of
                          care
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          name="influenzaVaccineReceived"
                          value="2"
                          checked={formData?.influenzaVaccineReceived === "2"}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label">
                          Yes; received from your agency during a prior episode
                          of care
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          name="influenzaVaccineReceived"
                          value="3"
                          checked={formData?.influenzaVaccineReceived === "3"}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label">
                          Yes; received from another health care provider
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          name="influenzaVaccineReceived"
                          value="4"
                          checked={formData?.influenzaVaccineReceived === "4"}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label">
                          No; patient offered and declined
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          name="influenzaVaccineReceived"
                          value="5"
                          checked={formData?.influenzaVaccineReceived === "5"}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label">
                          No; patient assessed and determined to have medical
                          contraindication(s)
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          name="influenzaVaccineReceived"
                          value="6"
                          checked={formData?.influenzaVaccineReceived === "6"}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label">
                          No; not indicated – patient does not meet
                          age/condition guidelines
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          name="influenzaVaccineReceived"
                          value="7"
                          checked={formData?.influenzaVaccineReceived === "7"}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label">
                          No; inability to obtain vaccine due to declared
                          shortage
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          name="influenzaVaccineReceived"
                          value="8"
                          checked={formData?.influenzaVaccineReceived === "8"}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label">
                          No; patient did not receive the vaccine due to other
                          reasons
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* section q  */}
        <div className="accordion w-100" id="accordionpatient">
          <div className="accordion-item w-100">
            <h2 className="accordion-header w-100" id="headingQ">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseQ"
                aria-expanded="true"
                aria-controls="collapseQ"
              >
                Participation in Assessment and Goal Setting
              </button>
            </h2>

            <div
              id="collapseQ"
              className="accordion-collapse collapse"
              aria-labelledby="headingQ"
              data-bs-parent="#accordionpatient"
            >
              <div className="accordion-body w-100 print-area">
                {/* M2401. Intervention Synopsis */}
                <h4 className="print-title">
                  Participation in assessment and setting{" "}
                </h4>
                <div className="mb-3 row">
                  <label className="form-label">
                    M2401. Intervention Synopsis
                  </label>

                  <div className="mb-3 w-50 col-md-6">
                    <label className="form-label">
                      b. Falls prevention interventions
                    </label>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="fallsPrevention"
                        value="0"
                        checked={formData?.fallsPrevention === "0"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">No</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="fallsPrevention"
                        value="1"
                        checked={formData?.fallsPrevention === "1"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">Yes</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="fallsPrevention"
                        value="NA"
                        checked={formData?.fallsPrevention === "NA"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">Not Applicable</label>
                    </div>
                  </div>

                  <div className="mb-3 w-50 col-md-6">
                    <label className="form-label">
                      c. Depression intervention(s)
                    </label>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="depressionIntervention"
                        value="0"
                        checked={formData?.depressionIntervention === "0"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">No</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="depressionIntervention"
                        value="1"
                        checked={formData?.depressionIntervention === "1"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">Yes</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="depressionIntervention"
                        value="NA"
                        checked={formData?.depressionIntervention === "NA"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">Not Applicable</label>
                    </div>
                  </div>

                  <div className="mb-3 w-50 col-md-6">
                    <label className="form-label">
                      d. Intervention(s) to monitor and mitigate pain
                    </label>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="painIntervention"
                        value="0"
                        checked={formData?.painIntervention === "0"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">No</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="painIntervention"
                        value="1"
                        checked={formData?.painIntervention === "1"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">Yes</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="painIntervention"
                        value="NA"
                        checked={formData?.painIntervention === "NA"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">Not Applicable</label>
                    </div>
                  </div>

                  <div className="mb-3 w-50 col-md-6">
                    <label className="form-label">
                      e. Intervention(s) to prevent pressure ulcers
                    </label>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="pressureUlcerPrevention"
                        value="0"
                        checked={formData?.pressureUlcerPrevention === "0"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">No</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="pressureUlcerPrevention"
                        value="1"
                        checked={formData?.pressureUlcerPrevention === "1"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">Yes</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="pressureUlcerPrevention"
                        value="NA"
                        checked={formData?.pressureUlcerPrevention === "NA"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">Not Applicable</label>
                    </div>
                  </div>

                  <div className="mb-3 w-50 col-md-6">
                    <label className="form-label">
                      f. Pressure ulcer treatment based on principles of moist
                      wound healing
                    </label>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="pressureUlcerTreatment"
                        value="0"
                        checked={formData?.pressureUlcerTreatment === "0"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">No</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="pressureUlcerTreatment"
                        value="1"
                        checked={formData?.pressureUlcerTreatment === "1"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">Yes</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="pressureUlcerTreatment"
                        value="NA"
                        checked={formData?.pressureUlcerTreatment === "NA"}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">Not Applicable</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4 hide-on-print">
          <div className="col-md-12 d-flex gap-3">
            <button type="submit" className="btn btn-primary">
              {isUpdateLoading || isLoading ? "...Wait please" : "Submit"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleSaveAndExit}
            >
              Save & Exit
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onSubmit={handleSaveAndContinue}
            >
              Save & Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PatientProfile;
