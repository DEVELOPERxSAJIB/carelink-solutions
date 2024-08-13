import { useState, useEffect } from "react";

import { useGetAllPatientsQuery } from "../../Redux/api/PatientApi";
import { useDeletePatientMutation } from "../../Redux/api/PatientApi";

import ExportButton from "../../components/Buttons/ExportButton";
import TableHeader from "../../components/Tables/TableHeader";

import MainLoader from "../../utils/Loaders/MainLoader";
import EditModal from "../../components/Models/EditModal";
import DataTable from "../../components/Tables/DynamicTable";
import swal from "sweetalert";
import { updateFormData } from "./../../Redux/slices/SectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMeQuery } from "../../Redux/api/UserApi";
import FullscreenModal from "./../../components/Models/FullScreenModel";
import CreatePayers from "./CreatePayers";
import CreateClinicalAndDiagnoses from "./CreateClinicalAndDiagnoses";
import CreatePharmacy from "./CreatePharmacy";
import ContactForm from "./CreateContact";
import CreateEmergencyPreparedness from "./CreateEmergencyPreparedness";
import CreateAdvanceDirectives from "./CreateAdvanceDirectives";
import CreateReferralInformation from "./CreateReferralInformation";

import {
  getAllSectionStepState,
  updateSteps,
} from "./../../Redux/slices/SectionStep";
import CreatePhysicians from "./CreatePhysicians";
import EditPayer from "./../../components/Patient/EditPayer";
import EditPhysicians from "./../../components/Patient/EditPhysicians";
import EditClinicalDiagnoses from "./../../components/Patient/EditClinicalDiagnoses";
import EditPharmacy from "./../../components/Patient/EditPharmacy";
import EditContract from "./../../components/Patient/EditContract";
import EditEmergencyPreparedness from "./../../components/Patient/EditEmergencyPreparedness";
import EditAdvanceDirectives from "./../../components/Patient/EditAdvanceDirectives";
import EditReferralInformation from "./../../components/Patient/EditReferralInformation";
import { showToast } from "./../../utils/Toastify";
import CreatePatient from "./../../components/Patient/CreatePatient";
const Patients = () => {
  const { data: lgData } = useMeQuery();
  const dispatch = useDispatch();
  const allSteps = useSelector(getAllSectionStepState);
  const [editData, setEditData] = useState("");

  const [deletePatient, { data: deleteData, isSuccess: isDeleteSuccess }] =
    useDeletePatientMutation();
  const { data, isLoading, refetch } = useGetAllPatientsQuery(editData?._id);
  const [show, setShow] = useState(false);

  const handleEdit = (rowData) => {
    setEditData(rowData);
    setShow(true);
    dispatch(updateFormData({ ...rowData }));
  };
  const handleDelete = (rowData) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deletePatient(rowData._id);
      }
    });
  };

  const columns = [
    { field: "patientFirstName", header: "Patient First Name" },
    { field: "patientLastName", header: "Patient Last Name" },
    { field: "npi", header: "NPI" },
    { field: "cmsCertificationNumber", header: "CMS Certification Number" },
    { field: "branchState", header: "Branch State" },
    { field: "branchIdNumber", header: "Branch ID Number" },
    { field: "patientIdNumber", header: "Patient ID Number" },
    { field: "startOfCareDate", header: "Start of Care Date" },
    { field: "resumptionOfCareDate", header: "Resumption of Care Date" },
    { field: "patientMiddleInitial", header: "Patient Middle Initial" },
    { field: "patientSuffix", header: "Patient Suffix" },
    { field: "patientStateOfResidence", header: "Patient State of Residence" },
    { field: "patientZipCode", header: "Patient Zip Code" },
    { field: "socialSecurityNumber", header: "Social Security Number" },
    { field: "medicareNumber", header: "Medicare Number" },
    { field: "medicaidNumber", header: "Medicaid Number" },
    { field: "gender", header: "Gender" },
    { field: "birthDate", header: "Birth Date" },
    { field: "ethnicity", header: "Ethnicity" },
    { field: "race", header: "Race" },
    { field: "paymentSources", header: "Payment Sources" },
    { field: "preferredLanguage", header: "Preferred Language" },
    { field: "needInterpreter", header: "Need Interpreter" },
    {
      field: "disciplineOfPersonCompletingAssessment",
      header: "Discipline of Person Completing Assessment",
    },
    { field: "dateAssessmentCompleted", header: "Date Assessment Completed" },
    { field: "reasonForAssessment", header: "Reason for Assessment" },
    {
      field: "dischargeTransferDeathDate",
      header: "Discharge/Transfer/Death Date",
    },
    {
      field: "dateOfPhysicianOrderedSOC",
      header: "Date of Physician Ordered SOC",
    },
    { field: "dateOfReferral", header: "Date of Referral" },
    { field: "transportation", header: "Transportation" },
    {
      field: "inpatientFacilityDischargedFrom",
      header: "Inpatient Facility Discharged From",
    },
    { field: "inpatientDischargeDate", header: "Inpatient Discharge Date" },
    { field: "emergentCare", header: "Emergent Care" },
    { field: "reasonForEmergentCare", header: "Reason for Emergent Care" },
    {
      field: "inpatientFacilityAdmittedTo",
      header: "Inpatient Facility Admitted To",
    },
    { field: "dischargeDisposition", header: "Discharge Disposition" },
    { field: "medicationListProvided", header: "Medication List Provided" },
    {
      field: "routeMedicationListTransmission",
      header: "Route Medication List Transmission",
    },
    {
      field: "medicationListProvidedToPatient",
      header: "Medication List Provided to Patient",
    },
    {
      field: "routeMedicationListTransmissionToPatient",
      header: "Route Medication List Transmission to Patient",
    },
    { field: "hearing", header: "Hearing" },
    { field: "vision", header: "Vision" },
    { field: "healthLiteracy", header: "Health Literacy" },
    { field: "interviewConducted", header: "Interview Conducted" },
    { field: "repetitionOfThreeWords", header: "Repetition of Three Words" },
    { field: "temporalOrientationYear", header: "Temporal Orientation Year" },
    { field: "temporalOrientationMonth", header: "Temporal Orientation Month" },
    { field: "temporalOrientationDay", header: "Temporal Orientation Day" },
    { field: "recallSock", header: "Recall Sock" },
    { field: "recallBlue", header: "Recall Blue" },
    { field: "recallBed", header: "Recall Bed" },
    { field: "bimsSummaryScore", header: "BIMS Summary Score" },
    {
      field: "deliriumMentalStatusChange",
      header: "Delirium Mental Status Change",
    },
    { field: "deliriumInattention", header: "Delirium Inattention" },
    {
      field: "deliriumDisorganizedThinking",
      header: "Delirium Disorganized Thinking",
    },
    {
      field: "deliriumAlteredConsciousness",
      header: "Delirium Altered Consciousness",
    },
    { field: "cognitiveFunctioning", header: "Cognitive Functioning" },
    { field: "whenConfused", header: "When Confused" },
    { field: "whenAnxious", header: "When Anxious" },
    { field: "patientMoodUnderstood", header: "Patient Mood Understood" },
    { field: "littleInterestPresence", header: "Little Interest Presence" },
    { field: "littleInterestFrequency", header: "Little Interest Frequency" },
    { field: "feelingDownPresence", header: "Feeling Down Presence" },
    { field: "feelingDownFrequency", header: "Feeling Down Frequency" },
    { field: "troubleSleepingPresence", header: "Trouble Sleeping Presence" },
    { field: "troubleSleepingFrequency", header: "Trouble Sleeping Frequency" },
    { field: "feelingTiredPresence", header: "Feeling Tired Presence" },
    { field: "feelingTiredFrequency", header: "Feeling Tired Frequency" },
    { field: "poorAppetitePresence", header: "Poor Appetite Presence" },
    { field: "poorAppetiteFrequency", header: "Poor Appetite Frequency" },
    { field: "feelingBadPresence", header: "Feeling Bad Presence" },
    { field: "feelingBadFrequency", header: "Feeling Bad Frequency" },
    {
      field: "troubleConcentratingPresence",
      header: "Trouble Concentrating Presence",
    },
    {
      field: "troubleConcentratingFrequency",
      header: "Trouble Concentrating Frequency",
    },
    { field: "movingSlowlyPresence", header: "Moving Slowly Presence" },
    { field: "movingSlowlyFrequency", header: "Moving Slowly Frequency" },
    {
      field: "thoughtsOfHarmingPresence",
      header: "Thoughts of Harming Presence",
    },
    {
      field: "thoughtsOfHarmingFrequency",
      header: "Thoughts of Harming Frequency",
    },
    { field: "totalSeverityScore", header: "Total Severity Score" },
    { field: "socialIsolation", header: "Social Isolation" },
    { field: "memoryDeficit", header: "Memory Deficit" },
    { field: "impairedDecisionMaking", header: "Impaired Decision Making" },
    { field: "verbalDisruption", header: "Verbal Disruption" },
    { field: "physicalAggression", header: "Physical Aggression" },
    { field: "disruptiveBehavior", header: "Disruptive Behavior" },
    { field: "delusionalBehavior", header: "Delusional Behavior" },
    { field: "noneOfTheAbove", header: "None of the Above" },
    {
      field: "disruptiveBehaviorFrequency",
      header: "Disruptive Behavior Frequency",
    },
    { field: "livingArrangement", header: "Living Arrangement" },
    { field: "assistanceAvailability", header: "Assistance Availability" },
    { field: "adlAssistance", header: "ADL Assistance" },
    { field: "medicationAssistance", header: "Medication Assistance" },
    {
      field: "medicalProceduresAssistance",
      header: "Medical Procedures Assistance",
    },
    {
      field: "supervisionSafetyAssistance",
      header: "Supervision/Safety Assistance",
    },
    { field: "grooming", header: "Grooming" },
    { field: "upperBodyDressing", header: "Upper Body Dressing" },
    { field: "lowerBodyDressing", header: "Lower Body Dressing" },
    { field: "bathing", header: "Bathing" },
    { field: "toiletTransferring", header: "Toilet/Transferring" },
    { field: "toiletingHygiene", header: "Toileting Hygiene" },
    { field: "transferring", header: "Transferring" },
    { field: "ambulationLocomotion", header: "Ambulation/Locomotion" },
    { field: "gg0100.selfCare", header: "GG0100 Self-Care" },
    { field: "gg0100.indoorMobility", header: "GG0100 Indoor Mobility" },
    { field: "gg0100.stairs", header: "GG0100 Stairs" },
    {
      field: "gg0100.functionalCognition",
      header: "GG0100 Functional Cognition",
    },
    { field: "gg0110.manualWheelchair", header: "GG0110 Manual Wheelchair" },
    {
      field: "gg0110.motorizedWheelchair",
      header: "GG0110 Motorized Wheelchair",
    },
    { field: "gg0110.mechanicalLift", header: "GG0110 Mechanical Lift" },
    { field: "gg0110.walker", header: "GG0110 Walker" },
    {
      field: "gg0110.orthoticsProsthetics",
      header: "GG0110 Orthotics/Prosthetics",
    },
    { field: "gg0110.noneOfTheAbove", header: "GG0110 None of the Above" },
    { field: "gg0130.eating", header: "GG0130 Eating" },
    { field: "gg0130.oralHygiene", header: "GG0130 Oral Hygiene" },
    { field: "gg0130.toiletingHygiene", header: "GG0130 Toileting Hygiene" },
    { field: "gg0130.showerBatheSelf", header: "GG0130 Shower/Bathe Self" },
    { field: "gg0130.upperBodyDressing", header: "GG0130 Upper Body Dressing" },
    { field: "gg0130.lowerBodyDressing", header: "GG0130 Lower Body Dressing" },
    {
      field: "gg0130.puttingOnTakingOffFootwear",
      header: "GG0130 Putting On/Taking Off Footwear",
    },
    { field: "gg0170.rollLeftRight", header: "GG0170 Roll Left/Right" },
    { field: "gg0170.sitToLying", header: "GG0170 Sit to Lying" },
    { field: "gg0170.lyingToSitting", header: "GG0170 Lying to Sitting" },
    { field: "gg0170.sitToStand", header: "GG0170 Sit to Stand" },
    { field: "gg0170.chairBedToChair", header: "GG0170 Chair/Bed to Chair" },
    { field: "gg0170.toiletTransfer", header: "GG0170 Toilet Transfer" },
    { field: "gg0170.carTransfer", header: "GG0170 Car Transfer" },
    { field: "gg0170.walk10Feet", header: "GG0170 Walk 10 Feet" },
    {
      field: "gg0170.walk50FeetTwoTurns",
      header: "GG0170 Walk 50 Feet Two Turns",
    },
    { field: "gg0170.walk150Feet", header: "GG0170 Walk 150 Feet" },
    {
      field: "gg0170.walk10FeetUnevenSurfaces",
      header: "GG0170 Walk 10 Feet Uneven Surfaces",
    },
    { field: "gg0170.stepCurb", header: "GG0170 Step/Curb" },
    { field: "gg0170.fourSteps", header: "GG0170 Four Steps" },
    { field: "gg0170.twelveSteps", header: "GG0170 Twelve Steps" },
    { field: "gg0170.pickingUpObject", header: "GG0170 Picking Up Object" },
    {
      field: "gg0170.usesWheelchairScooter",
      header: "GG0170 Uses Wheelchair/Scooter",
    },
    {
      field: "gg0170.wheel50FeetTwoTurns",
      header: "GG0170 Wheel 50 Feet Two Turns",
    },
    { field: "gg0170.wheel150Feet", header: "GG0170 Wheel 150 Feet" },
    { field: "m1600", header: "M1600" },
    { field: "m1610", header: "M1610" },
    { field: "m1620", header: "M1620" },
    { field: "m1630", header: "M1630" },
    { field: "primaryDiagnosis", header: "Primary Diagnosis" },
    { field: "otherDiagnoses", header: "Other Diagnoses" },
    { field: "primaryDiagnosisRating", header: "Primary Diagnosis Rating" },
    { field: "otherDiagnosesRatings", header: "Other Diagnoses Ratings" },
    { field: "comorbidities.pvd", header: "Comorbidities: PVD" },
    { field: "comorbidities.dm", header: "Comorbidities: DM" },
    { field: "comorbidities.none", header: "Comorbidities: None" },
    {
      field: "riskForHospitalization.falls",
      header: "Risk for Hospitalization: Falls",
    },
    {
      field: "riskForHospitalization.weightLoss",
      header: "Risk for Hospitalization: Weight Loss",
    },
    {
      field: "riskForHospitalization.hospitalizations",
      header: "Risk for Hospitalization: Hospitalizations",
    },
    {
      field: "riskForHospitalization.emergencyVisits",
      header: "Risk for Hospitalization: Emergency Visits",
    },
    {
      field: "riskForHospitalization.declineInStatus",
      header: "Risk for Hospitalization: Decline in Status",
    },
    {
      field: "riskForHospitalization.complianceDifficulty",
      header: "Risk for Hospitalization: Compliance Difficulty",
    },
    {
      field: "riskForHospitalization.medications",
      header: "Risk for Hospitalization: Medications",
    },
    {
      field: "riskForHospitalization.exhaustion",
      header: "Risk for Hospitalization: Exhaustion",
    },
    {
      field: "riskForHospitalization.otherRisks",
      header: "Risk for Hospitalization: Other Risks",
    },
    {
      field: "riskForHospitalization.none",
      header: "Risk for Hospitalization: None",
    },
    { field: "painEffectOnSleep", header: "Pain Effect on Sleep" },
    {
      field: "painInterferenceWithTherapy",
      header: "Pain Interference with Therapy",
    },
    {
      field: "painInterferenceWithActivities",
      header: "Pain Interference with Activities",
    },
    { field: "fallsSinceSOCROC", header: "Falls Since SOC/ROC" },
    { field: "fallsDetails.noInjury", header: "Falls Details: No Injury" },
    { field: "fallsDetails.injury", header: "Falls Details: Injury" },
    {
      field: "fallsDetails.majorInjury",
      header: "Falls Details: Major Injury",
    },
    { field: "shortOfBreath", header: "Short of Breath" },
    { field: "height", header: "Height" },
    { field: "weight", header: "Weight" },
    {
      field: "nutritionalApproachesOnAdmission.parenteralIVFeeding",
      header: "Nutritional Approaches on Admission: Parenteral IV Feeding",
    },
    {
      field: "nutritionalApproachesOnAdmission.feedingTube",
      header: "Nutritional Approaches on Admission: Feeding Tube",
    },
    {
      field: "nutritionalApproachesOnAdmission.mechanicallyAlteredDiet",
      header: "Nutritional Approaches on Admission: Mechanically Altered Diet",
    },
    {
      field: "nutritionalApproachesOnAdmission.therapeuticDiet",
      header: "Nutritional Approaches on Admission: Therapeutic Diet",
    },
    {
      field: "nutritionalApproachesOnAdmission.none",
      header: "Nutritional Approaches on Admission: None",
    },
    {
      field: "nutritionalApproachesLast7Days.parenteralIVFeeding",
      header: "Nutritional Approaches Last 7 Days: Parenteral IV Feeding",
    },
    {
      field: "nutritionalApproachesLast7Days.feedingTube",
      header: "Nutritional Approaches Last 7 Days: Feeding Tube",
    },
    {
      field: "nutritionalApproachesLast7Days.mechanicallyAlteredDiet",
      header: "Nutritional Approaches Last 7 Days: Mechanically Altered Diet",
    },
    {
      field: "nutritionalApproachesLast7Days.therapeuticDiet",
      header: "Nutritional Approaches Last 7 Days: Therapeutic Diet",
    },
    {
      field: "nutritionalApproachesLast7Days.none",
      header: "Nutritional Approaches Last 7 Days: None",
    },
    {
      field: "nutritionalApproachesAtDischarge.parenteralIVFeeding",
      header: "Nutritional Approaches at Discharge: Parenteral IV Feeding",
    },
    {
      field: "nutritionalApproachesAtDischarge.feedingTube",
      header: "Nutritional Approaches at Discharge: Feeding Tube",
    },
    {
      field: "nutritionalApproachesAtDischarge.mechanicallyAlteredDiet",
      header: "Nutritional Approaches at Discharge: Mechanically Altered Diet",
    },
    {
      field: "nutritionalApproachesAtDischarge.therapeuticDiet",
      header: "Nutritional Approaches at Discharge: Therapeutic Diet",
    },
    {
      field: "nutritionalApproachesAtDischarge.none",
      header: "Nutritional Approaches at Discharge: None",
    },
    { field: "feedingOrEating", header: "Feeding or Eating" },
    { field: "unhealedPressureUlcer", header: "Unhealed Pressure Ulcer" },
    {
      field: "oldestStage2PressureUlcer",
      header: "Oldest Stage 2 Pressure Ulcer",
    },
    { field: "numberOfStage2Ulcers", header: "Number of Stage 2 Ulcers" },
    { field: "numberOfStage3Ulcers", header: "Number of Stage 3 Ulcers" },
    { field: "numberOfStage4Ulcers", header: "Number of Stage 4 Ulcers" },
    {
      field: "numberOfUnstageableDressingUlcers",
      header: "Number of Unstageable Dressing Ulcers",
    },
    {
      field: "numberOfUnstageableSloughUlcers",
      header: "Number of Unstageable Slough Ulcers",
    },
    {
      field: "numberOfDeepTissueInjuries",
      header: "Number of Deep Tissue Injuries",
    },
    { field: "numberOfStage1Injuries", header: "Number of Stage 1 Injuries" },
    {
      field: "mostProblematicUlcerStage",
      header: "Most Problematic Ulcer Stage",
    },
    { field: "stasisUlcer", header: "Stasis Ulcer" },
    {
      field: "numberOfObservableStasisUlcers",
      header: "Number of Observable Stasis Ulcers",
    },
    {
      field: "mostProblematicStasisUlcerStatus",
      header: "Most Problematic Stasis Ulcer Status",
    },
    { field: "surgicalWound", header: "Surgical Wound" },
    {
      field: "mostProblematicSurgicalWoundStatus",
      header: "Most Problematic Surgical Wound Status",
    },
    {
      field: "highRiskDrugs.antipsychotic.isTaking",
      header: "High-Risk Drugs: Antipsychotic - Is Taking",
    },
    {
      field: "highRiskDrugs.antipsychotic.indicationNoted",
      header: "High-Risk Drugs: Antipsychotic - Indication Noted",
    },
    {
      field: "highRiskDrugs.anticoagulant.isTaking",
      header: "High-Risk Drugs: Anticoagulant - Is Taking",
    },
    {
      field: "highRiskDrugs.anticoagulant.indicationNoted",
      header: "High-Risk Drugs: Anticoagulant - Indication Noted",
    },
    {
      field: "highRiskDrugs.antibiotic.isTaking",
      header: "High-Risk Drugs: Antibiotic - Is Taking",
    },
    {
      field: "highRiskDrugs.antibiotic.indicationNoted",
      header: "High-Risk Drugs: Antibiotic - Indication Noted",
    },
    {
      field: "highRiskDrugs.opioid.isTaking",
      header: "High-Risk Drugs: Opioid - Is Taking",
    },
    {
      field: "highRiskDrugs.opioid.indicationNoted",
      header: "High-Risk Drugs: Opioid - Indication Noted",
    },
    {
      field: "highRiskDrugs.antiplatelet.isTaking",
      header: "High-Risk Drugs: Antiplatelet - Is Taking",
    },
    {
      field: "highRiskDrugs.antiplatelet.indicationNoted",
      header: "High-Risk Drugs: Antiplatelet - Indication Noted",
    },
    {
      field: "highRiskDrugs.hypoglycemic.isTaking",
      header: "High-Risk Drugs: Hypoglycemic - Is Taking",
    },
    {
      field: "highRiskDrugs.hypoglycemic.indicationNoted",
      header: "High-Risk Drugs: Hypoglycemic - Indication Noted",
    },
    {
      field: "highRiskDrugs.none.isTaking",
      header: "High-Risk Drugs: None - Is Taking",
    },
    { field: "drugRegimenReview", header: "Drug Regimen Review" },
    { field: "medicationFollowUp", header: "Medication Follow-Up" },
    { field: "medicationIntervention", header: "Medication Intervention" },
    { field: "highRiskDrugEducation", header: "High-Risk Drug Education" },
    {
      field: "managementOralMedications",
      header: "Management Oral Medications",
    },
    {
      field: "managementInjectableMedications",
      header: "Management Injectable Medications",
    },
    {
      field: "specialTreatmentsAdmission.chemotherapy",
      header: "Special Treatments on Admission: Chemotherapy",
    },
    {
      field: "specialTreatmentsAdmission.radiation",
      header: "Special Treatments on Admission: Radiation",
    },
    {
      field: "specialTreatmentsAdmission.oxygenTherapy",
      header: "Special Treatments on Admission: Oxygen Therapy",
    },
    {
      field: "specialTreatmentsAdmission.suctioning",
      header: "Special Treatments on Admission: Suctioning",
    },
    {
      field: "specialTreatmentsAdmission.tracheostomyCare",
      header: "Special Treatments on Admission: Tracheostomy Care",
    },
    {
      field: "specialTreatmentsAdmission.invasiveVentilator",
      header: "Special Treatments on Admission: Invasive Ventilator",
    },
    {
      field: "specialTreatmentsAdmission.nonInvasiveVentilator",
      header: "Special Treatments on Admission: Non-Invasive Ventilator",
    },
    {
      field: "specialTreatmentsAdmission.ivMedications",
      header: "Special Treatments on Admission: IV Medications",
    },
    {
      field: "specialTreatmentsAdmission.transfusions",
      header: "Special Treatments on Admission: Transfusions",
    },
    {
      field: "specialTreatmentsAdmission.dialysis",
      header: "Special Treatments on Admission: Dialysis",
    },
    {
      field: "specialTreatmentsAdmission.ivAccess",
      header: "Special Treatments on Admission: IV Access",
    },
    {
      field: "specialTreatmentsAdmission.noneOfTheAbove",
      header: "Special Treatments on Admission: None of the Above",
    },
    {
      field: "specialTreatmentsDischarge.chemotherapy",
      header: "Special Treatments at Discharge: Chemotherapy",
    },
    {
      field: "specialTreatmentsDischarge.radiation",
      header: "Special Treatments at Discharge: Radiation",
    },
    {
      field: "specialTreatmentsDischarge.oxygenTherapy",
      header: "Special Treatments at Discharge: Oxygen Therapy",
    },
    {
      field: "specialTreatmentsDischarge.suctioning",
      header: "Special Treatments at Discharge: Suctioning",
    },
    {
      field: "specialTreatmentsDischarge.tracheostomyCare",
      header: "Special Treatments at Discharge: Tracheostomy Care",
    },
    {
      field: "specialTreatmentsDischarge.invasiveVentilator",
      header: "Special Treatments at Discharge: Invasive Ventilator",
    },
    {
      field: "specialTreatmentsDischarge.nonInvasiveVentilator",
      header: "Special Treatments at Discharge: Non-Invasive Ventilator",
    },
    {
      field: "specialTreatmentsDischarge.ivMedications",
      header: "Special Treatments at Discharge: IV Medications",
    },
    {
      field: "specialTreatmentsDischarge.transfusions",
      header: "Special Treatments at Discharge: Transfusions",
    },
    {
      field: "specialTreatmentsDischarge.dialysis",
      header: "Special Treatments at Discharge: Dialysis",
    },
    {
      field: "specialTreatmentsDischarge.ivAccess",
      header: "Special Treatments at Discharge: IV Access",
    },
    {
      field: "specialTreatmentsDischarge.noneOfTheAbove",
      header: "Special Treatments at Discharge: None of the Above",
    },
    {
      field: "covidVaccinationUpToDate",
      header: "COVID Vaccination Up to Date",
    },
    { field: "influenzaVaccinePeriod", header: "Influenza Vaccine Period" },
    { field: "influenzaVaccineReceived", header: "Influenza Vaccine Received" },
    { field: "fallsPrevention", header: "Falls Prevention" },
    { field: "depressionIntervention", header: "Depression Intervention" },
    { field: "painIntervention", header: "Pain Intervention" },
    { field: "pressureUlcerPrevention", header: "Pressure Ulcer Prevention" },
    { field: "pressureUlcerTreatment", header: "Pressure Ulcer Treatment" },
  ];

  const handleStep = (step) => {
    dispatch(updateSteps({ ...allSteps, steps: step }));
  };
  useEffect(() => {
    if (isDeleteSuccess) {
      refetch();
    }
  }, [isDeleteSuccess, refetch]);
  useEffect(() => {
    showToast("success", deleteData?.message);
  }, [deleteData?.message]);
  return (
    <>
      {isLoading ? (
        <MainLoader />
      ) : (
        <div className="card">
          <TableHeader
            title="Patient List"
            className="py-3 pt-5 fs-3 card-header"
          />

          <div className="card-body">
            <div className="gap-3 d-flex flex-wrap">
              <ExportButton
                orientation="landscape"
                data={data?.payload ?? []}
                columns={columns}
                fileName="Patient"
              />
              {lgData?.payload?.user?.curd?.includes("delete") && (
                <button
                  className="btn btn-secondary create-new btn-danger waves-effect waves-light"
                  tabIndex={0}
                  aria-controls="DataTables_Table_0"
                  type="button"
                >
                  <span className="d-flex align-items-center">
                    <i className="ti ti-trash me-sm-1" />{" "}
                    <span className="d-none d-sm-inline-block">
                      Delete selected
                    </span>
                  </span>
                </button>
              )}

              {lgData?.payload?.user?.curd?.includes("create") && (
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
              )}
              {lgData?.payload?.user?.curd?.includes("create") && (
                <FullscreenModal
                  className="col-md-12"
                  style={{
                    minHeight: "75vh",
                    minWidth: "100vw",
                    overflowY: "scroll",
                    width: "100%",
                  }}
                  title={`Add New Patient`}
                >
                  <div
                    style={{
                      maxHeight: "75vh",
                      minHeight: "75vh",
                      // overflowY: "scroll",
                      width: "100%",
                    }}
                  >
                    <div className="d-flex align-items-center flex-wrap gap-1 mb-5 justify-content-center">
                      <div
                        className="step"
                        data-target="#account-details-modern"
                      >
                        <button
                          onClick={() => handleStep(0)}
                          type="button"
                          className={`btn ${
                            allSteps.steps === 0
                              ? "btn-primary"
                              : "btn-secondary"
                          } btn-sm px-1 `}
                        >
                          <span
                            className="bs-stepper-circle bg-light text-primary"
                            style={{ fontSize: "10px" }}
                          >
                            0
                          </span>
                          <span className="bs-stepper-label">
                            <span
                              className="bs-stepper-title"
                              style={{ fontSize: "10px" }}
                            >
                              Demographics
                            </span>
                          </span>
                        </button>
                      </div>
                      <div className="line">
                        <i className="ti ti-chevron-right" />
                      </div>
                      <div className="step" data-target="#personal-info-modern">
                        <button
                          onClick={() => handleStep(1)}
                          type="button"
                          className={`btn ${
                            allSteps.steps === 1
                              ? "btn-primary"
                              : "btn-secondary"
                          } btn-sm px-1 `}
                        >
                          <span
                            className="bs-stepper-circle bg-light text-primary"
                            style={{ fontSize: "10px" }}
                          >
                            1
                          </span>
                          <span className="bs-stepper-label">
                            <span
                              className="bs-stepper-title"
                              style={{ fontSize: "10px" }}
                            >
                              Payers
                            </span>
                          </span>
                        </button>
                      </div>
                      <div className="line">
                        <i className="ti ti-chevron-right" />
                      </div>
                      <div className="step" data-target="#social-links-modern">
                        <button
                          onClick={() => handleStep(2)}
                          type="button"
                          className={`btn ${
                            allSteps.steps === 2
                              ? "btn-primary"
                              : "btn-secondary"
                          } btn-sm px-1 `}
                        >
                          <span
                            className="bs-stepper-circle bg-light text-primary"
                            style={{ fontSize: "10px" }}
                          >
                            2
                          </span>
                          <span className="bs-stepper-label">
                            <span
                              className="bs-stepper-title"
                              style={{ fontSize: "10px" }}
                            >
                              Physicians
                            </span>
                          </span>
                        </button>
                      </div>
                      <div className="line">
                        <i className="ti ti-chevron-right" />
                      </div>
                      <div className="step" data-target="#personal-info-modern">
                        <button
                          onClick={() => handleStep(3)}
                          type="button"
                          className={`btn ${
                            allSteps.steps === 3
                              ? "btn-primary"
                              : "btn-secondary"
                          } btn-sm px-1 `}
                        >
                          <span
                            className="bs-stepper-circle bg-light text-primary"
                            style={{ fontSize: "10px" }}
                          >
                            3
                          </span>
                          <span className="bs-stepper-label">
                            <span
                              className="bs-stepper-title"
                              style={{ fontSize: "10px" }}
                            >
                              clinical diagnoses
                            </span>
                          </span>
                        </button>
                      </div>
                      <div className="line">
                        <i className="ti ti-chevron-right" />
                      </div>
                      <div className="step" data-target="#personal-info-modern">
                        <button
                          onClick={() => handleStep(4)}
                          type="button"
                          className={`btn ${
                            allSteps.steps === 4
                              ? "btn-primary"
                              : "btn-secondary"
                          } btn-sm px-1 `}
                        >
                          <span
                            className="bs-stepper-circle bg-light text-primary"
                            style={{ fontSize: "10px" }}
                          >
                            4
                          </span>
                          <span className="bs-stepper-label">
                            <span
                              className="bs-stepper-title"
                              style={{ fontSize: "10px" }}
                            >
                              Pharmacy
                            </span>
                          </span>
                        </button>
                      </div>
                      <div className="line">
                        <i className="ti ti-chevron-right" />
                      </div>
                      <div
                        onClick={() => handleStep(5)}
                        className="step"
                        data-target="#personal-info-modern"
                      >
                        <button
                          type="button"
                          className={`btn ${
                            allSteps.steps === 5
                              ? "btn-primary"
                              : "btn-secondary"
                          } btn-sm px-1 `}
                        >
                          <span
                            className="bs-stepper-circle bg-light text-primary"
                            style={{ fontSize: "10px" }}
                          >
                            5
                          </span>
                          <span className="bs-stepper-label">
                            <span
                              className="bs-stepper-title"
                              style={{ fontSize: "10px" }}
                            >
                              Contract
                            </span>
                          </span>
                        </button>
                      </div>
                      <div className="line">
                        <i className="ti ti-chevron-right" />
                      </div>
                      <div
                        onClick={() => handleStep(6)}
                        className="step"
                        data-target="#personal-info-modern"
                      >
                        <button
                          type="button"
                          className={`btn ${
                            allSteps.steps === 6
                              ? "btn-primary"
                              : "btn-secondary"
                          } btn-sm px-1 `}
                        >
                          <span
                            className="bs-stepper-circle bg-light text-primary"
                            style={{ fontSize: "10px" }}
                          >
                            6
                          </span>
                          <span className="bs-stepper-label">
                            <span
                              className="bs-stepper-title"
                              style={{ fontSize: "10px" }}
                            >
                              Emergency preparedness
                            </span>
                          </span>
                        </button>
                      </div>
                      <div className="line">
                        <i className="ti ti-chevron-right" />
                      </div>
                      <div className="step" data-target="#personal-info-modern">
                        <button
                          onClick={() => handleStep(7)}
                          type="button"
                          className={`btn ${
                            allSteps.steps === 7
                              ? "btn-primary"
                              : "btn-secondary"
                          } btn-sm px-1 `}
                        >
                          <span
                            className="bs-stepper-circle bg-light text-primary"
                            style={{ fontSize: "10px" }}
                          >
                            7
                          </span>
                          <span className="bs-stepper-label">
                            <span
                              className="bs-stepper-title"
                              style={{ fontSize: "10px" }}
                            >
                              Advance Directives
                            </span>
                          </span>
                        </button>
                      </div>
                      <div className="line">
                        <i className="ti ti-chevron-right" />
                      </div>
                      <div className="step" data-target="#personal-info-modern">
                        <button
                          onClick={() => handleStep(8)}
                          type="button"
                          className={`btn ${
                            allSteps.steps === 8
                              ? "btn-primary"
                              : "btn-secondary"
                          } btn-sm px-1 `}
                        >
                          <span
                            className="bs-stepper-circle bg-light text-primary"
                            style={{ fontSize: "10px" }}
                          >
                            8
                          </span>
                          <span className="bs-stepper-label">
                            <span
                              className="bs-stepper-title"
                              style={{ fontSize: "10px" }}
                            >
                              Referral information
                            </span>
                          </span>
                        </button>
                      </div>
                    </div>

                    {allSteps?.steps === 0 && <CreatePatient />}
                    {allSteps?.steps === 1 && <CreatePayers />}
                    {allSteps?.steps === 2 && <CreatePhysicians />}
                    {allSteps?.steps === 3 && <CreateClinicalAndDiagnoses />}
                    {allSteps?.steps === 4 && <CreatePharmacy />}
                    {allSteps?.steps === 5 && <ContactForm />}
                    {allSteps?.steps === 6 && <CreateEmergencyPreparedness />}
                    {allSteps?.steps === 7 && <CreateAdvanceDirectives />}
                    {allSteps?.steps === 8 && <CreateReferralInformation />}
                  </div>
                </FullscreenModal>
              )}
            </div>
            {show && (
              <EditModal
                style={{
                  minWidth: "90%",
                  maxWidth: "90%",
                  maxHeight: "90vh",
                  overflow: "hidden",
                  overflowY: "scroll",
                }}
                onClose={setShow}
              >
                <div className="d-flex align-items-center flex-wrap gap-1 mb-5 justify-content-center">
                  <div className="step" data-target="#account-details-modern">
                    <button
                      onClick={() => handleStep(0)}
                      type="button"
                      className={`btn ${
                        allSteps.steps === 0 ? "btn-primary" : "btn-secondary"
                      } btn-sm px-1 `}
                    >
                      <span
                        className="bs-stepper-circle bg-light text-primary"
                        style={{ fontSize: "10px" }}
                      >
                        0
                      </span>
                      <span className="bs-stepper-label">
                        <span
                          className="bs-stepper-title"
                          style={{ fontSize: "10px" }}
                        >
                          Demographics
                        </span>
                      </span>
                    </button>
                  </div>
                  <div className="line">
                    <i className="ti ti-chevron-right" />
                  </div>
                  <div className="step" data-target="#personal-info-modern">
                    <button
                      onClick={() => handleStep(1)}
                      type="button"
                      className={`btn ${
                        allSteps.steps === 1 ? "btn-primary" : "btn-secondary"
                      } btn-sm px-1 `}
                    >
                      <span
                        className="bs-stepper-circle bg-light text-primary"
                        style={{ fontSize: "10px" }}
                      >
                        1
                      </span>
                      <span className="bs-stepper-label">
                        <span
                          className="bs-stepper-title"
                          style={{ fontSize: "10px" }}
                        >
                          Payers
                        </span>
                      </span>
                    </button>
                  </div>
                  <div className="line">
                    <i className="ti ti-chevron-right" />
                  </div>
                  <div className="step" data-target="#social-links-modern">
                    <button
                      onClick={() => handleStep(2)}
                      type="button"
                      className={`btn ${
                        allSteps.steps === 2 ? "btn-primary" : "btn-secondary"
                      } btn-sm px-1 `}
                    >
                      <span
                        className="bs-stepper-circle bg-light text-primary"
                        style={{ fontSize: "10px" }}
                      >
                        2
                      </span>
                      <span className="bs-stepper-label">
                        <span
                          className="bs-stepper-title"
                          style={{ fontSize: "10px" }}
                        >
                          Physicians
                        </span>
                      </span>
                    </button>
                  </div>
                  <div className="line">
                    <i className="ti ti-chevron-right" />
                  </div>
                  <div className="step" data-target="#personal-info-modern">
                    <button
                      onClick={() => handleStep(3)}
                      type="button"
                      className={`btn ${
                        allSteps.steps === 3 ? "btn-primary" : "btn-secondary"
                      } btn-sm px-1 `}
                    >
                      <span
                        className="bs-stepper-circle bg-light text-primary"
                        style={{ fontSize: "10px" }}
                      >
                        3
                      </span>
                      <span className="bs-stepper-label">
                        <span
                          className="bs-stepper-title"
                          style={{ fontSize: "10px" }}
                        >
                          clinical diagnoses
                        </span>
                      </span>
                    </button>
                  </div>
                  <div className="line">
                    <i className="ti ti-chevron-right" />
                  </div>
                  <div className="step" data-target="#personal-info-modern">
                    <button
                      onClick={() => handleStep(4)}
                      type="button"
                      className={`btn ${
                        allSteps.steps === 4 ? "btn-primary" : "btn-secondary"
                      } btn-sm px-1 `}
                    >
                      <span
                        className="bs-stepper-circle bg-light text-primary"
                        style={{ fontSize: "10px" }}
                      >
                        4
                      </span>
                      <span className="bs-stepper-label">
                        <span
                          className="bs-stepper-title"
                          style={{ fontSize: "10px" }}
                        >
                          Pharmacy
                        </span>
                      </span>
                    </button>
                  </div>
                  <div className="line">
                    <i className="ti ti-chevron-right" />
                  </div>
                  <div
                    onClick={() => handleStep(5)}
                    className="step"
                    data-target="#personal-info-modern"
                  >
                    <button
                      type="button"
                      className={`btn ${
                        allSteps.steps === 5 ? "btn-primary" : "btn-secondary"
                      } btn-sm px-1 `}
                    >
                      <span
                        className="bs-stepper-circle bg-light text-primary"
                        style={{ fontSize: "10px" }}
                      >
                        5
                      </span>
                      <span className="bs-stepper-label">
                        <span
                          className="bs-stepper-title"
                          style={{ fontSize: "10px" }}
                        >
                          Contract
                        </span>
                      </span>
                    </button>
                  </div>
                  <div className="line">
                    <i className="ti ti-chevron-right" />
                  </div>
                  <div
                    onClick={() => handleStep(6)}
                    className="step"
                    data-target="#personal-info-modern"
                  >
                    <button
                      type="button"
                      className={`btn ${
                        allSteps.steps === 6 ? "btn-primary" : "btn-secondary"
                      } btn-sm px-1 `}
                    >
                      <span
                        className="bs-stepper-circle bg-light text-primary"
                        style={{ fontSize: "10px" }}
                      >
                        6
                      </span>
                      <span className="bs-stepper-label">
                        <span
                          className="bs-stepper-title"
                          style={{ fontSize: "10px" }}
                        >
                          Emergency preparedness
                        </span>
                      </span>
                    </button>
                  </div>
                  <div className="line">
                    <i className="ti ti-chevron-right" />
                  </div>
                  <div className="step" data-target="#personal-info-modern">
                    <button
                      onClick={() => handleStep(7)}
                      type="button"
                      className={`btn ${
                        allSteps.steps === 7 ? "btn-primary" : "btn-secondary"
                      } btn-sm px-1 `}
                    >
                      <span
                        className="bs-stepper-circle bg-light text-primary"
                        style={{ fontSize: "10px" }}
                      >
                        7
                      </span>
                      <span className="bs-stepper-label">
                        <span
                          className="bs-stepper-title"
                          style={{ fontSize: "10px" }}
                        >
                          Advance Directives
                        </span>
                      </span>
                    </button>
                  </div>
                  <div className="line">
                    <i className="ti ti-chevron-right" />
                  </div>
                  <div className="step" data-target="#personal-info-modern">
                    <button
                      onClick={() => handleStep(8)}
                      type="button"
                      className={`btn ${
                        allSteps.steps === 8 ? "btn-primary" : "btn-secondary"
                      } btn-sm px-1 `}
                    >
                      <span
                        className="bs-stepper-circle bg-light text-primary"
                        style={{ fontSize: "10px" }}
                      >
                        8
                      </span>
                      <span className="bs-stepper-label">
                        <span
                          className="bs-stepper-title"
                          style={{ fontSize: "10px" }}
                        >
                          Referral information
                        </span>
                      </span>
                    </button>
                  </div>
                </div>

                {allSteps?.steps === 0 && (
                  <>
                    <CreatePatient editData={editData} />
                  </>
                )}

                {allSteps?.steps === 1 && (
                  <EditPayer patientId={editData?._id} />
                )}
                {allSteps?.steps === 2 && (
                  <EditPhysicians patientId={editData?._id} />
                )}
                {allSteps?.steps === 3 && (
                  <EditClinicalDiagnoses patientId={editData?._id} />
                )}
                {allSteps?.steps === 4 && (
                  <EditPharmacy patientId={editData?._id} />
                )}
                {allSteps?.steps === 5 && (
                  <EditContract patientId={editData?._id} />
                )}
                {allSteps?.steps === 6 && (
                  <EditEmergencyPreparedness patientId={editData?._id} />
                )}
                {allSteps?.steps === 7 && (
                  <EditAdvanceDirectives patientId={editData?._id} />
                )}
                {allSteps?.steps === 8 && (
                  <EditReferralInformation patientId={editData?._id} />
                )}
              </EditModal>
            )}
            <div className="mt-5">
              <DataTable
                columns={columns}
                data={data?.payload ?? []}
                tableClassName="custom-table"
                tableName="patients"
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Patients;
