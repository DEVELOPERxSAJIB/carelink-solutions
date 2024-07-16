import { useState ,useEffect} from "react";
import DatePicker from "react-datepicker";
import SingleSearchSelect from "./../../components/FormElement/SingleSearchSelect";
import PageHeader from "./../../components/FormElement/PageHeader";
import { useCreateMileageLogMutation } from "../../Redux/api/MileAgeLogApi";
import { useGetAllSubUsersQuery } from "../../Redux/api/SubUserApi";
import useFormFields from "./../../hook/useFormHook";
import AuthLoader from "./../../utils/Loaders/AuthLoader";
import { useNavigate } from 'react-router-dom';

const AddNewMileage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [selected, setSelected] = useState("");
  
const  navigate = useNavigate()
  const initialState = {
    dateOfService: startDate,
    mileageType: "share",
    vehicleType: "regular",
    individual: "",
    initialMileage: "",
    licensePlateNumber:selected,
    startingMileage: "",
    tripType: "round",
    fromWhere: "",
    totalMiles: "",
    endingMileage: "",
    activityDescription: "",
  };
  const [formData, handleChange, setFormData, resetForm] =
    useFormFields(initialState);
  const [createMileageLog, { data, isLoading, isSuccess, error }] =
    useCreateMileageLogMutation();
  const { data: subUsers } = useGetAllSubUsersQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMileageLog(formData);
      resetForm()
    } catch (error) {
      console.error("Error creating Mileage Log:", error);
    }
  };
  useEffect(()=>{
    if(isSuccess){
      navigate("/mileage-log")
    }
  })
  if (isLoading) return <AuthLoader />;
  return (
    <div>
      <div className="card mb-6">
        <PageHeader title="Add Mileage Log" className="card-header fs-3" />
        <form className="card-body" onSubmit={handleSubmit}>
          {data?.message && (
            <div className="alert alert-success text-center">
              {data.message}
            </div>
          )}
          {error?.data?.message && (
            <div className="alert alert-danger text-center">
              {error?.data?.message}
            </div>
          )}
          <div className="row g-6">
            <div className="col-md-12">
              <label className="form-label" htmlFor="dateOfService">
                Date Of Service <span className="text-danger">*</span>
              </label>
              <DatePicker
                id="dateOfService"
                className="w-100 form-control"
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  setFormData((prevData) => ({
                    ...prevData,
                    dateOfService: date,
                  }));
                }}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">
                Mileage Type <span className="text-danger">*</span>
              </label>
              <div className="mt-2">
                <div className="form-check form-check-inline">
                  <input
                    name="mileageType"
                    className="form-check-input"
                    type="radio"
                    value="individual"
                    id="individualMileage"
                    checked={formData.mileageType === "individual"}
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="individualMileage"
                  >
                    Individual Mileage
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    name="mileageType"
                    className="form-check-input"
                    type="radio"
                    value="share"
                    id="shareMileage"
                    checked={formData.mileageType === "share"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="shareMileage">
                    Share Mileage
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label">
                Type of Vehicle <span className="text-danger">*</span>
              </label>
              <div className="mt-2">
                <div className="form-check form-check-inline">
                  <input
                    name="vehicleType"
                    className="form-check-input"
                    type="radio"
                    value="regular"
                    id="regularVehicle"
                    checked={formData.vehicleType === "regular"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="regularVehicle">
                    Regular
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    name="vehicleType"
                    className="form-check-input"
                    type="radio"
                    value="modified"
                    id="modifiedVehicle"
                    checked={formData.vehicleType === "modified"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="modifiedVehicle">
                    Modified
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="licensePlateNumber">
                Select or enter vehicle license plate number{" "}
                <span className="text-danger">*</span>
              </label>
              <SingleSearchSelect
                selected={selected}
                setSelected={setSelected}
                id="licensePlateNumber"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="individual">
                Select Individual <span className="text-danger">*</span>
              </label>
              <select
                id="individual"
                className="form-select"
                name="individual"
                value={formData.individual}
                onChange={handleChange}
              >
                <option value="">Select individual</option>
                {subUsers?.payload?.subUsers?.map((item, index) => {
                  return (
                    <option key={index} value={item._id}>
                      {item.firstName}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="initialMileage">
                Initial Mileage <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                id="initialMileage"
                className="form-control"
                placeholder="0"
                name="initialMileage"
                value={formData.initialMileage}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="startingMileage">
                Starting Mileage <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                id="startingMileage"
                className="form-control"
                placeholder="0"
                name="startingMileage"
                value={formData.startingMileage}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">
                Choose Your Trip <span className="text-danger">*</span>
              </label>
              <div className="mt-2">
                <div className="form-check form-check-inline">
                  <input
                    name="tripType"
                    className="form-check-input"
                    type="radio"
                    value="oneWay"
                    id="oneWayTrip"
                    checked={formData.tripType === "oneWay"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="oneWayTrip">
                    One way
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    name="tripType"
                    className="form-check-input"
                    type="radio"
                    value="round"
                    id="roundTrip"
                    checked={formData.tripType === "round"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="roundTrip">
                    Round
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    name="tripType"
                    className="form-check-input"
                    type="radio"
                    value="multipleDestination"
                    id="multipleDestinationTrip"
                    checked={formData.tripType === "multipleDestination"}
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="multipleDestinationTrip"
                  >
                    Multiple Destination
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="fromWhere">
                From Where <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="fromWhere"
                className="form-control"
                placeholder="From where"
                name="fromWhere"
                value={formData.fromWhere}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="totalMiles">
                Total Miles <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <input
                  type="text"
                  id="totalMiles"
                  className="form-control"
                  placeholder="Total miles"
                  name="totalMiles"
                  value={formData.totalMiles}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="endingMileage">
                Ending Mileage <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="endingMileage"
                className="form-control"
                placeholder="Ending mileage"
                name="endingMileage"
                value={formData.endingMileage}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="activityDescription">
                Activity Description <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="activityDescription"
                className="form-control"
                placeholder="Activity description"
                name="activityDescription"
                value={formData.activityDescription}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Mileage Log"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewMileage;
