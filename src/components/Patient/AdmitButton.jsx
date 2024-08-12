import { useState, useEffect } from "react";
import { showToast } from "./../../utils/Toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSectionStepState,
  updateSteps,
} from "./../../Redux/slices/SectionStep";
import { useCreatePatientMutation } from "../../Redux/api/PatientApi";
import { useCreateDirectiveMutation } from "../../Redux/api/DirectiveApi";
import { useCreateClinicalDiagnosisMutation } from "../../Redux/api/ClinicalDiagnosis";
import { useCreateContactMutation } from "../../Redux/api/Contact";
import { useCreateEmergencyMutation } from "../../Redux/api/EmergencyApi";
import { useCreateReferralMutation } from "../../Redux/api/ReferalInformation";
import { useCreatePayerMutation } from "../../Redux/api/PayerApi";
import { useCreatePharmacyMutation } from "../../Redux/api/PharmacyApi";
import { useCreatePhysicianMutation } from "../../Redux/api/PhysicianApi";
import AuthLoader from "./../../utils/Loaders/AuthLoader";

const AdmitButton = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const allSteps = useSelector(getAllSectionStepState);
  const [createPatient, { isSuccess }] = useCreatePatientMutation();
  const [createDirective, { isSuccess: isDirectiveSuccess }] =
    useCreateDirectiveMutation();
  const [createClinicalDiagnosis, { isSuccess: isClinicalSuccess }] =
    useCreateClinicalDiagnosisMutation();
  const [createContact, { isSuccess: isContactSuccess }] =
    useCreateContactMutation();
  const [createEmergency, { isSuccess: isEmergencySuccess }] =
    useCreateEmergencyMutation();
  const [createPayer, { isSuccess: isPayerSuccess }] = useCreatePayerMutation();
  const [createPharmacy, { isSuccess: isPharmacySuccess }] =
    useCreatePharmacyMutation();
  const [createPhysician, { isSuccess: isPhysicianSuccess }] =
    useCreatePhysicianMutation();
  const [createReferral, { isSuccess: isReferralSuccess }] =
    useCreateReferralMutation();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    setLoading(true); // Show loader

    const requiredData = [
      { key: "patient", label: "Patient data", number: 0 },
      { key: "Payer", label: "Payer data", number: 1 },
      { key: "Physician", label: "Physicians data", number: 2 },
      { key: "ClinicalDiagnosis", label: "Clinical data", number: 3 },
      { key: "Pharmacy", label: "Pharmacy data", number: 4 },
      { key: "Contact", label: "Contact data", number: 5 },
      { key: "Emergency", label: "Emergency preparedness data", number: 6 },
      { key: "Directive", label: "Advance Directive data", number: 7 },
      { key: "Referral", label: "Referral data", number: 8 },
    ];

    let allDataPresent = true;

    // Check if all required data is present
    for (const { key, label, number } of requiredData) {
      const data = JSON.parse(localStorage.getItem(key));
      if (!data) {
        showToast("error", `${label} required, please save and continue`);
        dispatch(updateSteps({ ...allSteps, steps: number }));
        allDataPresent = false;
        setLoading(false); // Hide loader if data is missing
        return; // Stop further processing
      }
    }

    // If all data is present, proceed with form submission
    if (allDataPresent) {
      try {
        // Collect data from local storage
        const patient = JSON.parse(localStorage.getItem("patient"));
        const directive = JSON.parse(localStorage.getItem("Directive"));
        const clinical = JSON.parse(localStorage.getItem("ClinicalDiagnosis"));
        const contact = JSON.parse(localStorage.getItem("Contact"));
        const emergency = JSON.parse(localStorage.getItem("Emergency"));
        const payer = JSON.parse(localStorage.getItem("Payer"));
        const pharmacy = JSON.parse(localStorage.getItem("Pharmacy"));
        const physician = JSON.parse(localStorage.getItem("Physician"));
        const referral = JSON.parse(localStorage.getItem("Referral"));

        // Create patient
        const patientResponse = await createPatient(patient).unwrap();

        // If patient creation is successful, create other related data
        if (patientResponse?.payload?._id) {
          await createDirective({
            ...directive,
            patientId: patientResponse?.payload?._id,
          }).unwrap();
          await createPayer({
            ...payer,
            patientId: patientResponse?.payload?._id,
          }).unwrap();
          await createPhysician({
            ...physician,
            patientId: patientResponse?.payload?._id,
          }).unwrap();
          await createClinicalDiagnosis({
            ...clinical,
            patientId: patientResponse?.payload?._id,
          }).unwrap();
          await createPharmacy({
            ...pharmacy,
            patientId: patientResponse?.payload?._id,
          }).unwrap();
          await createContact({
            ...contact,
            patientId: patientResponse?.payload?._id,
          }).unwrap();
          await createEmergency({
            ...emergency,
            patientId: patientResponse?.payload?._id,
          }).unwrap();
          await createReferral({
            ...referral,
            patientId: patientResponse?.payload?._id,
          }).unwrap();

          // Clear localStorage after successful creation
          localStorage.removeItem("patient");
          localStorage.removeItem("Directive");
          localStorage.removeItem("Payer");
          localStorage.removeItem("ClinicalDiagnosis");
          localStorage.removeItem("Contact");
          localStorage.removeItem("Emergency");
          localStorage.removeItem("Pharmacy");
          localStorage.removeItem("Physician");
          localStorage.removeItem("Referral");

          showToast("success", "Admitted successfully!");
        }
      } catch (error) {
        console.log(error);
        showToast("error", error?.data?.message);
      } finally {
        setLoading(false); // Hide loader after processing
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(updateSteps({ ...allSteps, steps: allSteps.steps + 1 }));
    }
    if (isDirectiveSuccess) {
      dispatch(updateSteps({ ...allSteps, steps: allSteps.steps + 1 }));
    }
    if (isPayerSuccess) {
      dispatch(updateSteps({ ...allSteps, steps: allSteps.steps + 1 }));
    }
    if (isClinicalSuccess) {
      dispatch(updateSteps({ ...allSteps, steps: allSteps.steps + 1 }));
    }
    if (isContactSuccess) {
      dispatch(updateSteps({ ...allSteps, steps: allSteps.steps + 1 }));
    }
    if (isEmergencySuccess) {
      dispatch(updateSteps({ ...allSteps, steps: allSteps.steps + 1 }));
    }
    if (isPharmacySuccess) {
      dispatch(updateSteps({ ...allSteps, steps: allSteps.steps + 1 }));
    }
    if (isPhysicianSuccess) {
      dispatch(updateSteps({ ...allSteps, steps: allSteps.steps + 1 }));
    }
    if (isReferralSuccess) {
      dispatch(updateSteps({ ...allSteps, steps: allSteps.steps + 1 }));
    }
    if (
      (isSuccess,
      isDirectiveSuccess,
      isPayerSuccess,
      isClinicalSuccess,
      isContactSuccess,
      isEmergencySuccess,
      isPharmacySuccess,
      isPhysicianSuccess,
      isReferralSuccess)
    ) {
      localStorage.removeItem("patient");
      localStorage.removeItem("Directive");
      localStorage.removeItem("Payer");
      localStorage.removeItem("ClinicalDiagnosis");
      localStorage.removeItem("Contact");
      localStorage.removeItem("Emergency");
      localStorage.removeItem("Pharmacy");
      localStorage.removeItem("Physician");
      localStorage.removeItem("Referral");
    }
  }, [
    isSuccess,
    isDirectiveSuccess,
    isClinicalSuccess,
    isContactSuccess,
    isEmergencySuccess,
    isPharmacySuccess,
    isPhysicianSuccess,
    isReferralSuccess,
    isPayerSuccess,
  ]);

  return (
    <button
      type="submit"
      onClick={handleSubmit}
      className="btn btn-success"
      disabled={loading}
    >
      {loading ? <span>...wait please</span> : "Admit"}
    </button>
  );
};

export default AdmitButton;
