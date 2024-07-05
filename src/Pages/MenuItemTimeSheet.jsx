import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRegFolder } from "react-icons/fa";
import DataTable from "../components/Tables/DynamicTable";
import useFormFields from "./../hook/useFormHook";
import PopupModal from "./../components/Models/PopupModel";
import TableHeader from './../components/Tables/TableHeader';

// Function to get the start and end dates of the current week
const getCurrentWeekDateRange = () => {
  const now = new Date();
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
  const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
    };
    return date.toLocaleDateString("en-US", options);
  };

  return {
    start: formatDate(startOfWeek),
    end: formatDate(endOfWeek),
  };
};

const MenuItemTimeSheet = () => {
  const { start, end } = getCurrentWeekDateRange();
  const navigate = useNavigate();

  const columns = [
    { header: "S.No", field: "serialNumber" },
    { header: "Date", field: "date" },
    { header: "Individual", field: "individual" },
    { header: "Service Code", field: "serviceCode" },
    { header: "Clock In", field: "clockIn" },
    { header: "Clock Out", field: "clockOut" },
    { header: "Total Hours", field: "totalHours" },
    { header: "Added By", field: "addedBy" },
    { header: "Added On", field: "addedOn" },
  ];

  const data = [
    {
      serialNumber: 1,
      date: "2024-06-01",
      individual: "John Doe",
      serviceCode: "SC123",
      clockIn: "08:00",
      clockOut: "12:00",
      totalHours: 4,
      addedBy: "Jane Smith",
      addedOn: "2024-06-01 12:30",
    },
    {
      serialNumber: 2,
      date: "2024-06-02",
      individual: "Alice Johnson",
      serviceCode: "SC124",
      clockIn: "09:00",
      clockOut: "17:00",
      totalHours: 8,
      addedBy: "John Doe",
      addedOn: "2024-06-02 17:30",
    },
    {
      serialNumber: 3,
      date: "2024-06-03",
      individual: "Bob Brown",
      serviceCode: "SC125",
      clockIn: "10:00",
      clockOut: "14:00",
      totalHours: 4,
      addedBy: "Alice Johnson",
      addedOn: "2024-06-03 14:30",
    },
  ];

  const handleEdit = (rowData) => {
    alert(`Editing ${rowData.individual}`);
  };

  const handleDelete = (rowData) => {
    alert(`Deleting ${rowData.individual}`);
  };

  const initialState = {
    individual: "",
    dateOfService: "07/04/2024",
    clockInTime: "10:03 am",
    milesUsed: "0",
    clockInLocation: "9JF2+JF6, Rajshahi, Bangladesh",
    service: "",
    memo: "",
  };

  const [formData, handleChange, resetForm] = useFormFields(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    // handleSave(formData); // Implement your save logic here
    resetForm();
  };
  const initialState2 = {
    staff: "",
    individual: "",
    dateOfService: "07/04/2024",
    clockInTime: "10:19 am",
    milesUsed: "0",
    clockInLocation: "9JF2+JF6, Rajshahi, Bangladesh",
    service: "",
    memo: "",
    reasonCode: "",
  };

  const [formData2, handleChange2, resetForm2] = useFormFields(initialState2);

  const handleSubmit2 = (e) => {
    e.preventDefault();
    // handleSave(formData); // Implement your save logic here
    resetForm2();
  };
  return (
    <div className="card">
     
      <TableHeader title="Timesheet" className="py-3 pt-5 fs-3 card-header"/>
      <div className="card-body">
        <div className="gap-3 d-flex flex-wrap">
          <PopupModal id="addWebTimesheetModal" title="Add Web Timesheet">
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
                    value={formData.individual}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Please Select Individual First</option>
                    <option value="Abdirahman Mohamed">
                      Abdirahman Mohamed
                    </option>
                  </select>
                </div>
                {formData.individual && (
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
                        value={formData.dateOfService}
                        onChange={handleChange}
                        placeholder="Date of Service"
                        required
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
                        value={formData.clockInTime}
                        onChange={handleChange}
                        placeholder="Clock In Time"
                        required
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
                        value={formData.milesUsed}
                        onChange={handleChange}
                        placeholder="Miles Used"
                        required
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
                        value={formData.clockInLocation}
                        onChange={handleChange}
                        placeholder="Clock In Location"
                        required
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
                        value={formData.service}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select</option>
                        {/* Add more service options here */}
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
                        value={formData.memo}
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
          </PopupModal>
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
          <button
            className="btn btn-secondary waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-trash me-sm-1" />{" "}
              <span className="d-none d-sm-inline-block">Delete Selected</span>
            </span>
          </button>
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
                    required
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
                    required
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
                        required
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
                        required
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
                        required
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
                        required
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
                        required
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
                        value={formData.reasonCode}
                        onChange={handleChange}
                        required
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
            data={data}
            tableClassName="custom-table"
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default MenuItemTimeSheet;
