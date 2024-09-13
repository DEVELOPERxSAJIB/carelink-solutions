import { useGetScheduleByIdQuery } from "../../Redux/api/ScheduleApi";
import { useParams } from "react-router-dom";
import TenDaySummaryCaseConference from "../../components/Patient/visitType/TenDaySummaryCaseConference";
import LvnOrLpn from "./../../components/Patient/visitType/LvnOrLpn";
import ChangeOnFocus from "./../../components/Patient/visitType/ChangeOnFocus";
import CommunicationNote from "./../../components/Patient/visitType/CommunicationNote";
import CoordinationOfCare from "./../../components/Patient/visitType/CoordinationOfCare";
import HHACarePlan from "./../../components/Patient/visitType/HHACarePlan";
import NonOASISDischarge from "./../../components/Patient/visitType/NonOASISDischarge";
import CaregiverForm from './../../components/Patient/visitType/CareGiverWorkSheet';
const NurseSinglePage = () => {
  const { id } = useParams();
  const { data } = useGetScheduleByIdQuery(id);
  console.log(data);
  // const {visitType} = data?.payload?.schedule
  return (
    <div>
      {/* <select
                      value={duty[index]?.visitType || ""}
                      onChange={(e) => handleOnChange(e, index)}
                      className="form-select "
                      name="visitType"
                    >
                      <option value="">-- Select Visit Type --</option>
                   
                      <option value="30 Day Summary/Case Conference">
                        30 Day Summary/Case Conference
                      </option>
                      <option value="60 Day Summary/Case Conference">
                        60 Day Summary/Case Conference
                      </option>
                      <option value="Change In Focus (SN)">
                        Change In Focus (SN)
                      </option>
                      <option value="Communication Note">
                        Communication Note
                      </option>
                      <option value="Coordination Of Care">
                        Coordination Of Care
                      </option>
                      <option value="Foley Cath Change">
                        Foley Cath Change
                      </option>
                      <option value="HHA Care Plan" version="2">
                        HHA Care Plan
                      </option>
                      <option value="HHA Supervisory Visit" version="2">
                        HHA Supervisory Visit
                      </option>
                      <option value="Hi Tech LVN Hourly">
                        Hi Tech LVN Hourly
                      </option>
                      <option value="Hi Tech LVN Visit">
                        Hi Tech LVN Visit
                      </option>
                      <option value="Hi Tech RN Hourly">
                        Hi Tech RN Hourly
                      </option>
                      <option value="Hi Tech RN Visit">Hi Tech RN Visit</option>
                      <option value="LVN Hourly">LVN Hourly</option>
                      <option value="LVN/LPN Supervisory Visit" version="2">
                        LVN/LPN Supervisory Visit
                      </option>
                      <option value="LVN/LPN Visit">LVN/LPN Visit</option>
                      <option value="Non-OASIS Discharge">
                        Non-OASIS Discharge
                      </option>
                      <option value="Non-OASIS Recertification">
                        Non-OASIS Recertification
                      </option>
                      <option value="Non-OASIS Start of Care">
                        Non-OASIS Start of Care
                      </option>
                      <option value="OASIS-D1 Death">OASIS-D1 Death</option>
                      <option value="OASIS-D1 Discharge">
                        OASIS-D1 Discharge
                      </option>
                      <option value="OASIS-D1 Discharge Non-Visit">
                        OASIS-D1 Discharge Non-Visit
                      </option>
                      <option value="OASIS-D1 Other Follow-Up">
                        OASIS-D1 Other Follow-Up
                      </option>
                      <option value="OASIS-D1 Recertification">
                        OASIS-D1 Recertification
                      </option>
                      <option value="OASIS-D1 Resumption of Care">
                        OASIS-D1 Resumption of Care
                      </option>
                      <option value="OASIS-D1 Start of Care">
                        OASIS-D1 Start of Care
                      </option>
                      <option value="OASIS-D1 Transfer">
                        OASIS-D1 Transfer
                      </option>
                      <option value="OASIS-D1 Transfer Discharge">
                        OASIS-D1 Transfer Discharge
                      </option>
                      <option value="OASIS-E Death at Home">
                        OASIS-E Death at Home
                      </option>
                      <option value="OASIS-E Discharge">
                        OASIS-E Discharge
                      </option>
                      <option value="OASIS-E Discharge Non-Visit">
                        OASIS-E Discharge Non-Visit
                      </option>
                      <option value="OASIS-E Other Follow-Up">
                        OASIS-E Other Follow-Up
                      </option>
                      <option value="OASIS-E Recertification">
                        OASIS-E Recertification
                      </option>
                      <option value="OASIS-E Resumption of Care">
                        OASIS-E Resumption of Care
                      </option>
                      <option value="OASIS-E Start of Care">
                        OASIS-E Start of Care
                      </option>
                      <option value="OASIS-E Transfer">OASIS-E Transfer</option>
                      <option value="OASIS-E Transfer Discharge">
                        OASIS-E Transfer Discharge
                      </option>
                      <option value="PICC/Midline Placement">
                        PICC/Midline Placement
                      </option>
                      <option value="PRN Foley Change">PRN Foley Change</option>
                      <option value="PRN VP for CMP">PRN VP for CMP</option>
                      <option value="PT w/ INR">PT w/ INR</option>
                      <option value="PT w/ INR PRN SNV">
                        PT w/ INR PRN SNV
                      </option>
                      <option
                        value="RN Assessment- Discharge (Non-OASIS)"
                        version="1"
                      >
                        RN Assessment- Discharge (Non-OASIS)
                      </option>
                      <option
                        value="RN Assessment- Recertification (Non-OASIS)"
                        version="1"
                      >
                        RN Assessment- Recertification (Non-OASIS)
                      </option>
                      <option
                        value="RN Assessment- Resumption of Care (Non-OASIS)"
                        version="1"
                      >
                        RN Assessment- Resumption of Care (Non-OASIS)
                      </option>
                      <option
                        value="RN Assessment- Start of Care (Non-OASIS)"
                        version="1"
                      >
                        RN Assessment- Start of Care (Non-OASIS)
                      </option>
                      <option
                        value="RN Assessment- Transfer (Non-OASIS)"
                        version="1"
                      >
                        RN Assessment- Transfer (Non-OASIS)
                      </option>
                      <option value="RN Hourly">RN Hourly</option>
                      <option value="Skilled Nurse Visit">
                        Skilled Nurse Visit
                      </option>
                      <option value="Skilled Nurse Visit AM">
                        Skilled Nurse Visit AM
                      </option>
                      <option value="Skilled Nurse Visit PM">
                        Skilled Nurse Visit PM
                      </option>
                      <option value="Skilled Nurse/Home Infusion/SD">
                        Skilled Nurse/Home Infusion/SD
                      </option>
                      <option value="Skilled Nurse/Home Infusion/SD - Additional">
                        Skilled Nurse/Home Infusion/SD - Additional
                      </option>
                      <option value="SN Assessment">SN Assessment</option>
                      <option value="SN Assessment (Recertification)">
                        SN Assessment (Recertification)
                      </option>
                      <option value="SN Recertification (Non-OASIS)">
                        SN Recertification (Non-OASIS)
                      </option>
                      <option value="SN Resumption of Care">
                        SN Resumption of Care
                      </option>
                      <option value="SN Resumption of Care (Non-OASIS)">
                        SN Resumption of Care (Non-OASIS)
                      </option>
                      <option value="SOC Summary/Case Conference" version="1">
                        SOC Summary/Case Conference
                      </option>
                      <option value="Supervisory Visit (SN)">
                        Supervisory Visit (SN)
                      </option>
                      <option value="Telehealth Encounter">
                        Telehealth Encounter
                      </option>
                      <option value="Wound Vac">Wound Vac</option>
                      <option value="Wound Vac-Application">
                        Wound Vac-Application
                      </option>
                      <option value="Wound Vac-D/C">Wound Vac-D/C</option>
                      <option value="Wound Vac-Removal">
                        Wound Vac-Removal
                      </option>
                    </select> */}
      {data?.payload?.schedule?.visitType ===
        "10 Day Summary/Case Conference" && (
        <TenDaySummaryCaseConference data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType ===
        "30 Day Summary/Case Conference" && (
        <TenDaySummaryCaseConference data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType ===
        "60 Day Summary/Case Conference" && (
        <TenDaySummaryCaseConference data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "LVN/LPN Visit" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "Change In Focus (SN)" && (
        <ChangeOnFocus data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "Communication Note" && (
        <CommunicationNote data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "Coordination Of Care" && (
        <CoordinationOfCare data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "Foley Cath Change" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "Hi Tech LVN Hourly" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "Hi Tech LVN Visit" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "Hi Tech RN Hourly" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "Hi Tech RN Visit" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "LVN Hourly" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "Skilled Nurse Visit" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "Skilled Nurse Visit AM" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "Skilled Nurse Visit PM" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "SN DC Planning Visit" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}

      {data?.payload?.schedule?.visitType === "SN Home Infusion SD Visit" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType ===
        "Skilled Nurse/Home Infusion/SD" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType ===
        "Skilled Nurse/Home Infusion/SD - Additional" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType ===
        "SN PICC/Midline Placement Visit" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "SN B12 Injection Visit" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "SN BMP Visit" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "SN CBC Visit" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "SN DC Visit" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "SN Diabetic Daily Visit" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "SN Evaluation Visit" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "SN Foley Labs Visit" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "SN Foley Change Visit" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "SN Haldol Injection Visit" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "SN Injection Visit" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "SN Injection/Labs Visit" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "SN Insulin AM Visit" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "SN Insulin HS Visit" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "SN Insulin Noon Visit" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "SN Insulin PM Visit" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "SN Labs Visit" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType ===
        "SN Management & Evaluation Visit" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType ===
        "SN Observation & Assessment Visit" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "SN PRN Visit" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType ===
        "SN Management & Evaluation Visit" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType ===
        "SN with Aide Supervision Visit" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "SN Wound Care Visit" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "SN PRN Foley Change Visit" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}

      {data?.payload?.schedule?.visitType === "SN Teaching/Training Visit" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "SN PRN VP for CMP Visit" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "PT w/ INR" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "PT w/ INR PRN" && (
        <LvnOrLpn data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "HHA Care Plan" && (
        <HHACarePlan data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "Non-OASIS Discharge" && (
        <NonOASISDischarge data={data?.payload?.schedule} />
      )}

      {data?.payload?.schedule?.visitType === "Person Care" && (
        <CaregiverForm data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "Hand /Foot Care" && (
        <CaregiverForm data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "Nutrition" && (
        <CaregiverForm data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "Eliminations" && (
        <CaregiverForm data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "Activity" && (
        <CaregiverForm data={data?.payload?.schedule} />
      )}
      {data?.payload?.schedule?.visitType === "Homemaking" && (
        <CaregiverForm data={data?.payload?.schedule} />
      )}
    </div>
  );
};

export default NurseSinglePage;
