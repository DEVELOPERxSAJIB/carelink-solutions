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
                      <option value="Person Care">Person Care</option>
                      <option value="Hand /Foot Care">Hand /Foot Care</option>
                      <option value="Nutrition">Nutrition</option>
                      <option value="Eliminations">Eliminations</option>
                      <option value="Activity">Activity</option>
                      <option value="Homemaking">Homemaking</option>
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
