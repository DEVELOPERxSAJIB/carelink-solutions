import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRegFolder } from "react-icons/fa";
import DataTable from "../components/Tables/DynamicTable";

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
    alert(`Editing ${rowData.firstName} ${rowData.lastName}`);
  };

  const handleDelete = (rowData) => {
    alert(`Deleting ${rowData.firstName} ${rowData.lastName}`);
  };

  return (
    <div className="card">
      <div className="card-header py-3 pt-5 fs-3">Timesheet</div>
      <div className="card-body">
        <div className="gap-3 d-flex">
          <button
            className="btn btn-sm btn-primary waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-plus me-sm-1" />{" "}
              <span className="d-none d-sm-inline-block">Clock in</span>
            </span>
          </button>
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
          <button
            className="btn btn-success waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-clock me-2" />
              <span className="d-none d-sm-inline-block">Manual Clock</span>
            </span>
          </button>
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
