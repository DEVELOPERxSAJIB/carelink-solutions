import { useState } from "react";
import { useGetAllNursesQuery } from "../../Redux/api/UserApi";
import { useCreateScheduleMutation } from "../../Redux/api/ScheduleApi";
import { useEffect } from "react";
import { showToast } from "./../../utils/Toastify";
const Nursing = ({
  selectDate,
  setSelectedDate,
  patientId,
  selectedStartDate,
  selectedEndDate,
  patientName,
}) => {
  const [duty, setDuty] = useState([
    {
      visitType: "",
      userId: "",
      date: "",
      patientId: "",
      episode: "",
      patientName: "",
    },
  ]);

  const { data: nurses } = useGetAllNursesQuery();
  const [createSchedule, { data, error, isSuccess }] =
    useCreateScheduleMutation();

  const handleRemove = (indexNum) => {
    setSelectedDate(selectDate?.filter((_, index) => index !== indexNum));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createSchedule(duty);
  };

  const handleOnChange = (e, index) => {
    const { name, value } = e.target;
    setDuty((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, [name]: value } : item
      )
    );
  };
  // Initialize or update duty when selectDate changes
  useEffect(() => {
    if (selectDate) {
      setDuty((prevDuty) => {
        const dutyMap = new Map(prevDuty.map((d) => [d.date, d]));
        const updatedDuty = selectDate.map((date) => {
          if (dutyMap.has(date)) {
            return dutyMap.get(date);
          } else {
            return { visitType: "", userId: "", date };
          }
        });

        return updatedDuty;
      });
    }
  }, [selectDate]);
  useEffect(() => {
    setDuty((prevDuty) =>
      prevDuty.map((dutyItem) => ({
        ...dutyItem,
        patientId,
        patientName,
        episode: `${selectedStartDate} ${selectedEndDate}`,
      }))
    );
  }, [patientId, selectDate]);
  useEffect(() => {
    if (error) {
      showToast("error", error.data.message);
    }
    if (isSuccess) {
      showToast("success", data.message);
      setSelectedDate([]);
    }
  }, [isSuccess, error]);

  return (
    <form onSubmit={onSubmit} className="bg-light w-100">
      <table className="table table-stripped table-bordered">
        <thead>
          <tr>
            <th>Task</th>
            <th>User</th>
            <th>Date</th>
            {selectDate?.length > 0 && (
              <th className="d-flex gap-2">
                <button className="btn btn-primary" type="submit">
                  save
                </button>
                <button
                  onClick={() => setSelectedDate([])}
                  className="btn btn-danger"
                >
                  cancel
                </button>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {selectDate?.length > 0 ? (
            selectDate?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <select
                      value={duty[index]?.visitType || ""}
                      onChange={(e) => handleOnChange(e, index)}
                      className="form-select "
                      name="visitType"
                    >
                      <option value="">-- Select Visit Type --</option>
                      <option value="10 Day Summary/Case Conference">
                        10 Day Summary/Case Conference
                      </option>
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
                      <option value="SN PICC/Midline Placement Visit">
                        SN PICC/Midline Placement Visit
                      </option>
                      <option value="SN DC Planning Visit">
                        SN DC Planning Visit
                      </option>
                      <option value="SN BMP Visit">SN BMP Visit</option>
                      <option value="SN CBC Visit">SN CBC Visit</option>
                      <option value="SN DC Visit">SN DC Visit</option>
                      <option value="SN B12 Injection Visit">
                        SN B12 Injection Visit
                      </option>
                      <option value="SN Diabetic Daily Visit">
                        SN Diabetic Daily Visit
                      </option>
                      <option value="SN Evaluation Visit">
                      SN Evaluation Visit
                      </option>
                      <option value="SN Foley Labs Visit">
                      SN Foley Labs Visit
                      </option>
                      <option value="SOC Summary/Case Conference" version="1">
                        SOC Summary/Case Conference
                      </option>
                      <option value="SN Foley Change Visit" version="1">
                        SN Foley Change Visit
                      </option>
                      <option value="SN Haldol Injection Visit" version="1">
                      SN Haldol Injection Visit
                      </option>
                      <option value="SN Injection Visit" version="1">
                      SN Injection Visit
                      </option>
                      <option value="SN Injection/Labs Visit" version="1">
                      SN Injection/Labs Visit
                      </option>
                      <option value="SN Insulin AM Visit" version="1">
                      SN Insulin AM Visit
                      </option>
                      <option value="SN Insulin HS Visit" version="1">
                      SN Insulin HS Visit
                      </option>
                      <option value="SN Insulin Noon Visit" version="1">
                      SN Insulin Noon Visit
                      </option>
                      <option value="SN Insulin PM Visit" version="1">
                      SN Insulin PM Visit
                      </option>
                      <option value="SN Labs Visit" version="1">
                      SN Labs Visit
                      </option>
                      <option value="SN Management & Evaluation Visit" version="1">
                      SN Management & Evaluation Visit
                      </option>
                      <option value="SN Observation & Assessment Visit" version="1">
                      SN Observation & Assessment Visit
                      </option>
                      <option value="SN PRN Visit" version="1">
                      SN PRN Visit
                      </option>
                      <option value="SN Management & Evaluation Visit" version="1">
                      SN Management & Evaluation Visit
                      </option>
                      <option value="SN Teaching/Training Visit" version="1">
                      SN Teaching/Training Visit
                      </option>
                      <option value="Supervisory Visit (SN)">
                        Supervisory Visit (SN)
                      </option>
                      <option value="SN with Aide Supervision Visit">
                        SN with Aide Supervision Visit
                      </option>
                      <option value="SN Wound Care Visit">
                        SN Wound Care Visit
                      </option>
                      <option value="SN PRN Foley Change Visit">
                        SN PRN Foley Change Visit
                      </option>
                      <option value="SN PRN VP for CMP Visit">
                        SN PRN VP for CMP Visit
                      </option>
                      <option value="PT w/ INR">
                      PT w/ INR
                      </option>
                      <option value="PT w/ INR PRN">
                      PT w/ INR PRN
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
                    </select>
                  </td>
                  <td>
                    <select
                      onChange={(e) => handleOnChange(e, index)}
                      value={duty[index]?.userId || ""}
                      name="userId"
                      className="form-select"
                      id=""
                    >
                      <option value="">Select user</option>
                      {nurses?.payload?.users?.map((item, index) => {
                        return (
                          <option key={index} value={item?._id}>
                            {item?.firstName} {item?.lastName}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      name=""
                      id=""
                      value={item}
                    />
                  </td>
                  <td className="cursor-pointer">
                    <a
                      className="btn btn-danger"
                      onClick={() => handleRemove(index)}
                    >
                      <ti className="ti ti-trash"></ti>
                    </a>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="text-center" colSpan="3">
                Add new Schedule
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </form>
  );
};

export default Nursing;
