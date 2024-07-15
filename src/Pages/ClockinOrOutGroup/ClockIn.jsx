import { useState, useEffect } from "react";
import MultiSelect from "../../components/FormElement/MultiSelect";

import DatePicker from "react-datepicker";
import PageHeader from "./../../components/FormElement/PageHeader";
import useFormFields from "./../../hook/useFormHook";
import AuthLoader from "./../../utils/Loaders/AuthLoader";
import { useNavigate } from "react-router-dom";
import { useCreateClockMutation } from "../../Redux/api/ClockApi";
import { useGetAllSubUsersQuery } from "../../Redux/api/SubUserApi.js";
const ClockIn = () => {
  const [ multiValue,setMultiValue] = useState([]);

  const [createClock, { data, isSuccess, isLoading, error }] =
    useCreateClockMutation();

  const { data: subUsers } = useGetAllSubUsersQuery();


  const handleChangeMulti = (selectedOptions) => {
    setMultiValue(selectedOptions);
  };
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const initialSate = {
    dateOfService: "",
    ratioNumerator: null,
    ratioDenominator: null,
    workCode: "",
    startTime: "",
    endTime: "",
    milesUsed: null,
    location: "",
  };
  const [formData, handleChange] = useFormFields(initialSate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFormData = {
        ...formData,
        dateOfService: startDate,
        individuals:multiValue.map((item)=>item?.value)
      };
      await createClock(updatedFormData);
    } catch (error) {
      console.error("Error creating clock:", error);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      navigate("/view-log");
    }
  }, [isSuccess]);
  if (isLoading) return <AuthLoader />;
  return (
    <div>
      <div className="card mb-6">
        <PageHeader
          title="Add Group Clock In Sheet"
          className="card-header fs-3"
        />
        {data?.message && (
          <div className="alert alert-success text-center">{data.message}</div>
        )}

        {error?.data?.message && (
          <div className="alert alert-danger text-center">
            {error?.data?.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="card-body">
          <div className="row g-6">
            <div className="col-md-6">
              <label className="form-label" htmlFor="company-name">
                Date Of Service <span className="text-danger">*</span>
              </label>
              <DatePicker
                className="w-100 form-control"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="formValidationLang">
                Choose Individual <span className="text-danger">*</span>
              </label>
              <MultiSelect

               value={multiValue}
               onChange={handleChangeMulti}
               options={
                  subUsers?.payload?.subUsers.map((item) => ({
                    value: item?._id,
                    label: item?.firstName,
                  })) ?? []
                }
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="formValidationLang">
                Ratio <span className="text-danger">*</span>
              </label>
              <div className=" d-flex gap-5 align-items-center">
                <input
                  type="number"
                  value={formData?.ratioNumerator}
                  className="form-control"
                  name="ratioNumerator"
                  onChange={handleChange}
                  id="ratioNumerator"
                  placeholder="ratio"
                />
                :
                <input
                  type="number"
                  value={formData?.ratioDenominator}
                  className="form-control"
                  name="ratioDenominator"
                  id="ratioDenominator"
                  onChange={handleChange}
                  placeholder="ratio"
                />
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="form-repeater-1-3">
                Work Code <span className="text-danger">*</span>
              </label>
              <select
                name="workCode"
                value={formData?.workCode}
                onChange={handleChange}
                id="form-repeater-1-3"
                className="form-select"
              >
                <option value="Awake">Awake</option>
                <option value="OSOC">OSOC</option>
                <option value="Training">Training</option>
                <option value="PTO">PTO</option>
                <option value="Meeting">Meeting</option>
                <option value="Active">Active</option>
                <option value="sleep">sleep</option>
                <option value="other">other</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="formValidationLang">
                Start Time <span className="text-danger">*</span>
              </label>
              <input
                type="time"
                value={formData?.startTime}
                className="form-control"
                name="startTime"
                id="startTime"
                onChange={handleChange}
                placeholder="time"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="formValidationLang">
                Miles Used <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                value={formData?.milesUsed}
                className="form-control"
                onChange={handleChange}
                name="milesUsed"
                id="milesUsed"
                placeholder="0"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="formValidationLang">
                Location <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                value={formData?.location}
                className="form-control"
                name="location"
                id="location"
                onChange={handleChange}
                placeholder="location"
              />
            </div>
          </div>
          <div className="pt-6">
            <button type="submit" className="btn btn-primary me-4">
              Clock In
            </button>
            <button type="reset" className="btn btn-label-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClockIn;
