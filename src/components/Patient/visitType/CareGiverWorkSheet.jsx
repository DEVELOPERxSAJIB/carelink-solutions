import { useState, useEffect } from "react";
import { showToast } from "./../../../utils/Toastify";
import PageHeader from "./../../FormElement/PageHeader";
import {
  useGetCaregiverFormByIdQuery,
  useCreateCaregiverFormMutation,
} from "../../../Redux/api/VisitType/CaregiverFormApi";
const CaregiverForm = ({ data }) => {
  const { data: getData } = useGetCaregiverFormByIdQuery(data?._id);
  const [
    createCaregiverForm,
    { data: createData, isSuccess: isCreateSuccess, error: createError },
  ] = useCreateCaregiverFormMutation();
  const [formData, setFormData] = useState({
    services: {
      personalCare: {
        tubBath: [],
        shower: [],
        shampooHair: [],
        haircare: [],
        oralCare: [],
        skinCare: [],
        periCare: [],
        nailCare: [],
        shave: [],
        assistDressing: [],
        medicationReminder: [],
      },
      nutrition: {
        mealPrepare: [],
        feedAssist: [],
        setup: [],
        encourageFluidIntake: [],
      },
      eliminations: {
        assistBedPan: [],
        assistBSC: [],
        incontinentCare: [],
        emptyDrainageBag: [],
        recordBowelMovement: [],
        catheterCare: [],
      },
      activity: {
        dangleBedside: [],
        reposition: [],
        rangeOfMotion: [],
        transferAssist: [],
        ambulationAssist: [],
      },
      handFootCare: {
        cleanFileNails: [],
        soakFeet: [],
      },
      homemaking: {
        vacuuming: [],
        dustDampMop: [],
        kitchenDishesFridge: [],
        bathroomHousekeeping: [],
        changeLinen: [],
        makeBed: [],
        emptyTrash: [],
        laundry: [],
        shopping: [],
        prescriptionPickup: [],
      },
    },
  });

  const handleChange = (e, category, service, day) => {
    const { checked } = e.target;

    setFormData((prevState) => {
      const serviceDays = prevState.services[category][service];

      // Ensure serviceDays is an array
      if (!Array.isArray(serviceDays)) return prevState;

      // Add or remove the day from the service array
      const updatedDays = checked
        ? [...serviceDays, day]
        : serviceDays.filter((d) => d !== day);

      return {
        ...prevState,
        services: {
          ...prevState.services,
          [category]: {
            ...prevState.services[category],
            [service]: updatedDays,
          },
        },
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    formData.scheduleId = data?._id;
    formData.visitType = data.visitType;
    formData.patientId = data?.patientId;
    formData.episode = data?.episode;
    console.log(formData);
    createCaregiverForm(formData);
  };

  useEffect(() => {
    if (isCreateSuccess) {
      showToast("success", createData.message);
    }
    if (createError) {
      showToast("error", createError?.data?.message);
    }
  }, [createError, createData, isCreateSuccess]);
  useEffect(() => {
    if (getData?.payload?.record) {
      setFormData(getData?.payload?.record);
    }
  }, [getData?.payload?.record]);

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="row mt-5">
        <PageHeader title={data.visitType} />
      </div>

      {/* Services with Days of the Week */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Services</th>
            <th>S</th>
            <th>M</th>
            <th>T</th>
            <th>W</th>
            <th>T</th>
            <th>F</th>
            <th>S</th>
          </tr>
        </thead>
        <tbody>
          {/* Personal Care Section */}

          {data?.visitType === "Person Care" && (
            <>
              <tr>
                <td>
                  <strong>Personal Care</strong>
                </td>
                <td colSpan="7"></td>
              </tr>
              {Object.keys(formData?.services?.personalCare).map((service) => (
                <tr key={service}>
                  <td>{service.replace(/([A-Z])/g, " $1").trim()}</td>
                  {["S", "M", "T", "W", "Th", "F", "Sa"].map((day) => (
                    <td key={day}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={formData?.services?.personalCare[
                          service
                        ].includes(day)}
                        onChange={(e) =>
                          handleChange(e, "personalCare", service, day)
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </>
          )}
          {/* handFootCare Section */}
          {data?.visitType === "Hand /Foot Care" && (
            <>
              <tr>
                <td>
                  <strong>Hand/Foot Care</strong>
                </td>
                <td colSpan="7"></td>
              </tr>
              {Object.keys(formData?.services?.handFootCare).map((service) => (
                <tr key={service}>
                  <td>{service.replace(/([A-Z])/g, " $1").trim()}</td>
                  {["S", "M", "T", "W", "Th", "F", "Sa"].map((day) => (
                    <td key={day}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={formData?.services?.handFootCare[
                          service
                        ].includes(day)}
                        onChange={(e) =>
                          handleChange(e, "handFootCare", service, day)
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </>
          )}

          {/* Eliminations Section */}
          {data?.visitType === "Nutrition" && (
            <>
              <tr>
                <td>
                  <strong>Nutrition</strong>
                </td>
                <td colSpan="7"></td>
              </tr>
              {Object.keys(formData?.services?.nutrition).map((service) => (
                <tr key={service}>
                  <td>{service.replace(/([A-Z])/g, " $1").trim()}</td>
                  {["S", "M", "T", "W", "Th", "F", "Sa"].map((day) => (
                    <td key={day}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={formData?.services?.nutrition[
                          service
                        ].includes(day)}
                        onChange={(e) =>
                          handleChange(e, "nutrition", service, day)
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </>
          )}

          {/* Eliminations Section */}
          {data?.visitType === "Eliminations" && (
            <>
              <tr>
                <td>
                  <strong>Eliminations</strong>
                </td>
                <td colSpan="7"></td>
              </tr>
              {Object.keys(formData?.services?.eliminations).map((service) => (
                <tr key={service}>
                  <td>{service.replace(/([A-Z])/g, " $1").trim()}</td>
                  {["S", "M", "T", "W", "Th", "F", "Sa"].map((day) => (
                    <td key={day}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={formData?.services?.eliminations[
                          service
                        ].includes(day)}
                        onChange={(e) =>
                          handleChange(e, "eliminations", service, day)
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </>
          )}

          {/* Activity Section */}
          {data?.visitType === "Activity" && (
            <>
              <tr>
                <td>
                  <strong>Activity</strong>
                </td>
                <td colSpan="7"></td>
              </tr>
              {Object.keys(formData?.services?.activity).map((service) => (
                <tr key={service}>
                  <td>{service.replace(/([A-Z])/g, " $1").trim()}</td>
                  {["S", "M", "T", "W", "Th", "F", "Sa"].map((day) => (
                    <td key={day}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={formData?.services?.activity[service].includes(
                          day
                        )}
                        onChange={(e) =>
                          handleChange(e, "activity", service, day)
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </>
          )}

          {/* Equipment Care Section */}
          {data?.visitType === "Equipment Care" && (
            <>
              <tr>
                <td>
                  <strong>Equipment Care</strong>
                </td>
                <td colSpan="7"></td>
              </tr>
              {Object.keys(formData?.services?.equipmentCare).map((service) => (
                <tr key={service}>
                  <td>{service.replace(/([A-Z])/g, " $1").trim()}</td>
                  {["S", "M", "T", "W", "Th", "F", "Sa"].map((day) => (
                    <td key={day}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={formData?.services?.equipmentCare[
                          service
                        ].includes(day)}
                        onChange={(e) =>
                          handleChange(e, "equipmentCare", service, day)
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </>
          )}

          {/* Homemaking Section */}
          {data?.visitType === "Homemaking" && (
            <>
              <tr>
                <td>
                  <strong>Homemaking</strong>
                </td>
                <td colSpan="7"></td>
              </tr>
              {Object.keys(formData?.services?.homemaking).map((service) => (
                <tr key={service}>
                  <td>{service.replace(/([A-Z])/g, " $1").trim()}</td>
                  {["S", "M", "T", "W", "Th", "F", "Sa"].map((day) => (
                    <td key={day}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={formData?.services?.homemaking[
                          service
                        ].includes(day)}
                        onChange={(e) =>
                          handleChange(e, "homemaking", service, day)
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default CaregiverForm;
