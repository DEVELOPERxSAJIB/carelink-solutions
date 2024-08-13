import { useEffect, useState } from "react";
import { FaRegFolder } from "react-icons/fa";
import DataTable from "../components/Tables/DynamicTable";
import useFormFields from "./../hook/useFormHook";
import PopupModal from "./../components/Models/PopupModel";
import TableHeader from "./../components/Tables/TableHeader";
import {
  useCreateTimeSheetMutation,
  useGetAllTimeSheetsQuery,
  useUpdateTimeSheetMutation,
  useDeleteTimeSheetMutation,
} from "../Redux/api/Timesheet.js";
import AuthLoader from "./../utils/Loaders/AuthLoader";
import swal from "sweetalert";
import EditModal from "./../components/Models/EditModal";
import DatePicker from "react-datepicker";
import { useGetAllCaregiverQuery, useMeQuery } from "../Redux/api/UserApi";
import { showToast } from "./../utils/Toastify";

const MenuItemTimeSheet = () => {
  const { data: lgData } = useMeQuery();
  const [editId, setEditId] = useState("");
  const [show, setShow] = useState("");
  const [date, setDate] = useState("");

  const [ipAddress, setIpAddress] = useState("");
  const [geoLocation, setGeoLocation] = useState("");
  const { location } = geoLocation;

  const { data: caregiver } = useGetAllCaregiverQuery();

  const [
    createTimeSheet,
    { data: createData, isSuccess: isCreateSuccess, error: createError },
  ] = useCreateTimeSheetMutation();
  const { data, isLoading, refetch } = useGetAllTimeSheetsQuery();

  const [
    updateTimeSheet,
    { data: updateData, isSuccess: isUpdateSuccess, error: updateError },
  ] = useUpdateTimeSheetMutation();
  const [
    deleteTimeSheet,
    {
      data: deleteData,
      isLoading: isDeleteLoading,
      isSuccess: isDeleteSuccess,
      error: deleteError,
    },
  ] = useDeleteTimeSheetMutation();

  const columns = [
    { header: "Id", field: "_id" },
    { header: "Date of service", field: "dateOfService" },
    { header: "Service Code", field: "serviceCode" },
    { header: "Clock In", field: "clockInTime" },
    { header: "Clock Out", field: "clockOut" },
    { header: "Miles Used", field: "milesUsed" },
    { header: "Added By", field: "addedBy" },
    { header: "Added On", field: "createdAt" },
    { header: "Memo", field: "memo" },
    { header: "service", field: "service" },
  ];

  const handleDelete = (rowData) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteTimeSheet(rowData._id);
      }
    });
  };

  const initialState = {
    caregiver: "",
    dateOfService: "",
    clockInTime: "",
    milesUsed: "",
    clockInLocation: "",
    service: "",
    memo: "",
  };

  const [formData, handleChange, setFormData, resetForm] =
    useFormFields(initialState);

  const handleEdit = (rowData) => {
    setEditId(rowData._id);
    setShow(true);
    setDate(rowData.dateOfService);
    setFormData({
      individual: rowData.individual?._id,
      clockInTime: rowData.clockInTime,
      milesUsed: rowData.milesUsed,
      clockInLocation: rowData.clockInLocation,
      service: rowData.service,
      memo: rowData.memo,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      formData.dateOfService = date;
      updateTimeSheet({ timesheetId: editId, timeSheetData: formData });
      resetForm();
    } else {
      formData.dateOfService = date;
      createTimeSheet(formData);
    }
    resetForm();
  };

  const initialState2 = {
    staff: "",
    caregiver: "",
    dateOfService: "",
    clockInTime: "",
    milesUsed: "0",
    clockInLocation: "",
    service: "",
    memo: "",
    reasonCode: "",
    shift: "",
  };

  const [formData2, handleChange2, resetForm2] = useFormFields(initialState2);

  const handleSubmit2 = (e) => {
    e.preventDefault();
    resetForm2();
  };

  useEffect(() => {
    getVisitorIP();
    getGeoLocation();
  }, []);

  useEffect(() => {
    if (ipAddress) {
      getGeoLocation(ipAddress);
    }
  }, [ipAddress]);

  const getVisitorIP = async () => {
    try {
      const response = await fetch(`https://api.ipify.org`);
      const data = await response.text();
      setIpAddress(data);
      console.log("IP Address:", data);
    } catch (error) {
      console.log("Failed to get visitor IP", error);
    }
  };

  const getGeoLocation = async (ip) => {
    try {
      const response = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=at_UObEx5y8kKx9uc4b27B52I5sMf3H8&ipAddress=${ip}`
      );
      const data = await response.json();
      setGeoLocation(data);
    } catch (error) {
      console.log("Failed to get geolocation", error);
    }
  };

  const formatTimeZone = (location) => {
    // Extract data from location object
    const dateTime = new Date().toLocaleString("en-GB", {
      timeZone: location?.timezone,
    });

    return `${dateTime}`;
  };

  useEffect(() => {
    if (isCreateSuccess) {
      refetch();
    }
    if (isDeleteSuccess) {
      refetch();
    }
    if (isUpdateSuccess) {
      refetch();
    }
  }, [
    isCreateSuccess,
    isDeleteSuccess,
    isUpdateSuccess,
    location,
    refetch,
    resetForm,
  ]);
  useEffect(() => {
    showToast("success", updateData?.message);
    showToast("success", createData?.message);
    showToast("error", updateError?.data?.message);
    showToast("error", createError?.data?.message);
  }, [
    updateData?.message,
    createData?.message,
    createError?.data?.message,
    updateError?.data?.message,
  ]);

  
  useEffect(() => {
    const data = formatTimeZone(location)
    setFormData((prev) => ({
      ...prev,
      clockInLocation : `${location?.city} ${location?.region} ${location?.country} ${data}`
    }))
  }, [location])


  if (isLoading || isDeleteLoading) return <AuthLoader />;

  return (
    <div className="card">
      <TableHeader title="Timesheet" className="py-3 pt-5 fs-3 card-header" />
      <div className="card-body">
        <div className="gap-3 d-flex flex-wrap">
          {lgData?.payload?.user?.curd?.includes("create") && (
            <PopupModal id="addWebTimesheetModal" title="Add Web Timesheet">
              <form onSubmit={handleSubmit} className="w-100">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="caregiver" className="form-label">
                      Caregiver
                    </label>
                    <select
                      id="caregiver"
                      name="caregiver"
                      className="form-control"
                      value={formData?.caregiver}
                      onChange={handleChange}
                    >
                      <option value="">Please Select Caregiver First</option>
                      {caregiver?.payload?.users?.map((item, index) => (
                        <option key={index} value={item._id}>
                          {item.firstName} {item.lastName}
                        </option>
                      ))}
                    </select>
                  </div>
                  {formData?.caregiver && (
                    <>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="dateOfService" className="form-label">
                          Date of Service
                        </label>
                        <DatePicker
                          selected={date}
                          className="form-control"
                          onChange={(date) => setDate(date)}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="clockInTime" className="form-label">
                          Clock In Time
                        </label>
                        <input
                          type="time"
                          id="clockInTime"
                          name="clockInTime"
                          className="form-control"
                          value={formData?.clockInTime}
                          onChange={handleChange}
                          placeholder="Clock In Time"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="milesUsed" className="form-label">
                          Miles Used
                        </label>
                        <input
                          type="number"
                          id="milesUsed"
                          name="milesUsed"
                          className="form-control"
                          value={formData?.milesUsed}
                          onChange={handleChange}
                          placeholder="Miles Used"
                        />
                      </div>
                      <div className="col-md-12 mb-3">
                        <label htmlFor="clockInLocation" className="form-label">
                          Clock In Location
                        </label>
                        <input
                          type="text"
                          id="clockInLocation"
                          name="clockInLocation"
                          className="form-control"
                          value={formData.clockInLocation}
                          onChange={handleChange}
                          disabled
                          placeholder="Clock In Location"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="service" className="form-label">
                          Service
                        </label>
                        <select
                          id="service"
                          name="service"
                          className="form-select"
                          value={formData?.service}
                          onChange={handleChange}
                        >
                          <option value="">Select</option>
                          <option value="personalCare">Personal Care</option>
                          <option value="medicationReminder">
                            Medication Reminder
                          </option>
                          <option value="homemaking">Homemaking</option>
                          <option value="activityAssistance">
                            Activity Assistance
                          </option>
                          <option value="equipmentCare">Equipment Care</option>
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="shift" className="form-label">
                          Shift
                        </label>
                        <select
                          id="shift"
                          name="shift"
                          className="form-select"
                          value={formData?.shift}
                          onChange={handleChange}
                        >
                          <option value="">Select</option>
                          <option value="1st Shift">1st Shift</option>
                          <option value="2nd Shift">2nd Shift</option>
                          <option value="3rd Shift">3rd Shift</option>
                        </select>
                      </div>
                      <div className="col-md-12 mb-3">
                        <label htmlFor="signature" className="form-label">
                          Memo
                        </label>
                        <input type="file" id="signature" />
                      </div>
                      <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary">
                          Add Web Timesheet
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </form>
            </PopupModal>
          )}
          {show && (
            <EditModal
              style={{
                minWidth: "70%",
                maxWidth: "70%",
                maxHeight: "80vh",
                overflowY: "scroll",
              }}
              onClose={setShow}
            >
              <form onSubmit={handleSubmit} className="w-100">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="individual" className="form-label">
                      Individual
                    </label>
                    <select
                      id="individual"
                      name="individual"
                      className="form-control"
                      value={formData?.individual}
                      onChange={handleChange}
                    >
                      <option value="">Please Select Individual First</option>
                      {subUsers?.payload?.subUsers.map((item, index) => (
                        <option key={index} value={item._id}>
                          {item.firstName} {item.lastName}
                        </option>
                      ))}
                    </select>
                  </div>
                  {formData?.individual && (
                    <>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="dateOfService" className="form-label">
                          Date of Service
                        </label>
                        <DatePicker
                          selected={date}
                          className="form-control"
                          onChange={(date) => setDate(date)}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="clockInTime" className="form-label">
                          Clock In Time
                        </label>
                        <input
                          type="time"
                          id="clockInTime"
                          name="clockInTime"
                          className="form-control"
                          value={formData?.clockInTime}
                          onChange={handleChange}
                          placeholder="Clock In Time"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="milesUsed" className="form-label">
                          Miles Used
                        </label>
                        <input
                          type="number"
                          id="milesUsed"
                          name="milesUsed"
                          className="form-control"
                          value={formData?.milesUsed}
                          onChange={handleChange}
                          placeholder="Miles Used"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="clockInLocation" className="form-label">
                          Clock In Location
                        </label>
                        <input
                          type="text"
                          id="clockInLocation"
                          name="clockInLocation"
                          className="form-control"
                          value={formData?.clockInLocation}
                          onChange={handleChange}
                          placeholder="Clock In Location"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="service" className="form-label">
                          Service
                        </label>
                        <select
                          id="service"
                          name="service"
                          className="form-select"
                          value={formData?.service}
                          onChange={handleChange}
                        >
                          <option value="">Select</option>
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
                      <div className="col-md-12 mb-3">
                        <label htmlFor="memo" className="form-label">
                          Memo
                        </label>
                        <textarea
                          id="memo"
                          name="memo"
                          className="form-control"
                          value={formData?.memo}
                          onChange={handleChange}
                          placeholder="Memo"
                        />
                      </div>
                      <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary">
                          Add Web Timesheet
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </form>
            </EditModal>
          )}
          <button
            className="btn btn-warning waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-download me-sm-1" />{" "}
              <span className="d-none d-sm-inline-block">Export</span>
            </span>
          </button>
          <button
            style={{ color: "#fff", background: "rgba(255, 124, 189, 1)" }}
            className="btn waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-report me-sm-1" />{" "}
              <span className="d-none d-sm-inline-block">Reports</span>
            </span>
          </button>
          {lgData?.payload?.user?.curd?.includes("delete") && (
            <button
              className="btn btn-warning waves-effect waves-light"
              tabIndex={0}
              aria-controls="DataTables_Table_0"
              type="button"
            >
              <span className="d-flex align-items-center">
                <i className="ti ti-history me-sm-1" />{" "}
                <span className="d-none d-sm-inline-block">History</span>
              </span>
            </button>
          )}
          {lgData?.payload?.user?.curd?.includes("delete") && (
            <button
              style={{ background: "#9fd74d", color: "#fff" }}
              className="btn waves-effect waves-light"
              tabIndex={0}
              aria-controls="DataTables_Table_0"
              type="button"
            >
              <span className="d-flex align-items-center">
                <FaRegFolder size={22} className="me-1" />{" "}
                <span className="d-none d-sm-inline-block">Archive</span>
              </span>
            </button>
          )}
          {lgData?.payload?.user?.curd?.includes("delete") && (
            <button
              className="btn btn-secondary waves-effect waves-light"
              tabIndex={0}
              aria-controls="DataTables_Table_0"
              type="button"
            >
              <span className="d-flex align-items-center">
                <i className="ti ti-trash me-sm-1" />{" "}
                <span className="d-none d-sm-inline-block">
                  Delete Selected
                </span>
              </span>
            </button>
          )}
          <PopupModal id="Add_Manual_Timesheet" title="Add Manual Timesheet">
            <form onSubmit={handleSubmit2} className="w-100">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="staff" className="form-label">
                    Staff
                  </label>
                  <select
                    id="staff"
                    name="staff"
                    className="form-control"
                    value={formData2.staff}
                    onChange={handleChange2}
                  >
                    <option value="">Select Staff</option>
                    <option value="Augustine Mulai">Augustine Mulai</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="individual" className="form-label">
                    Individual
                  </label>
                  <select
                    id="individual"
                    name="individual"
                    className="form-control"
                    value={formData2.individual}
                    onChange={handleChange2}
                  >
                    <option value="">Please Select Individual First</option>
                    <option value="Adnan Sidirijal">Adnan Sidirijal</option>
                  </select>
                </div>
                {formData2.staff && formData2.individual && (
                  <>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="dateOfService" className="form-label">
                        Date of Service
                      </label>
                      <input
                        type="text"
                        id="dateOfService"
                        name="dateOfService"
                        className="form-control"
                        value={formData2.dateOfService}
                        onChange={handleChange}
                        placeholder="Date of Service"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="clockInTime" className="form-label">
                        Clock In Time
                      </label>
                      <input
                        type="text"
                        id="clockInTime"
                        name="clockInTime"
                        className="form-control"
                        value={formData2.clockInTime}
                        onChange={handleChange}
                        placeholder="Clock In Time"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="milesUsed" className="form-label">
                        Miles Used
                      </label>
                      <input
                        type="text"
                        id="milesUsed"
                        name="milesUsed"
                        className="form-control"
                        value={formData2.milesUsed}
                        onChange={handleChange}
                        placeholder="Miles Used"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="clockInLocation" className="form-label">
                        Clock In Location
                      </label>
                      <input
                        type="text"
                        id="clockInLocation"
                        name="clockInLocation"
                        className="form-control"
                        value={formData2.clockInLocation}
                        onChange={handleChange}
                        placeholder="Clock In Location"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="service" className="form-label">
                        Service
                      </label>
                      <select
                        id="service"
                        name="service"
                        className="form-select"
                        value={formData2.service}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        {/* Add more service options here */}
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="reasonCode" className="form-label">
                        Reason Code
                      </label>
                      <select
                        id="reasonCode"
                        name="reasonCode"
                        className="form-select"
                        value={formData?.reasonCode}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        {/* Add more reason code options here */}
                      </select>
                    </div>
                    <div className="col-md-12 mb-3">
                      <label htmlFor="memo" className="form-label">
                        Memo
                      </label>
                      <textarea
                        id="memo"
                        name="memo"
                        className="form-control"
                        value={formData2.memo}
                        onChange={handleChange}
                        placeholder="Memo"
                      />
                    </div>
                    <div className="d-flex justify-content-end">
                      <button type="submit" className="btn btn-primary">
                        Add Manual Timesheet
                      </button>
                    </div>
                  </>
                )}
              </div>
            </form>
          </PopupModal>
        </div>
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={data?.payload?.webTimeSheets ?? []}
            tableClassName="custom-table"
            onEdit={handleEdit}
            tableName="menuItemTimeSheet"
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default MenuItemTimeSheet;
