import React from "react";
import DataTable from "./../../components/Tables/DynamicTable";
import ExportButton from "./../../components/Buttons/ExportButton";
import { useNavigate } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";

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

const IndividualAuditReview = () => {
  const { start, end } = getCurrentWeekDateRange();
  const navigate = useNavigate();
  const columns = [
    { header: "S.No", field: "serialNumber" },
    { header: "Review Date", field: "reviewDate" },
    { header: "Individual Name", field: "individualName" },
    { header: "Period Audited", field: "periodAudited" },
    { header: "Conducted By", field: "conductedBy" },
    { header: "Conducted On", field: "conductedOn" },
  ];

  const data = [
    {
      serialNumber: 1,
      reviewDate: "18 Apr 24",
      individualName: "Md Sajib Shikder",
      periodAudited: "March",
      conductedBy: "Anything",
      conductedOn: "Anything",
      billingPermission: "Allowed",
    },
    {
      serialNumber: 1,
      reviewDate: "18 Apr 24",
      individualName: "Md Sajib Shikder",
      periodAudited: "March",
      conductedBy: "Anything",
      conductedOn: "Anything",
      billingPermission: "Allowed",
    },
  ];

  const handleEdit = (rowData) => {
    alert(`Editing ${rowData.firstName} ${rowData.lastName}`);
    // Implement edit logic here
  };

  const handleDelete = (rowData) => {
    alert(`Deleting ${rowData.firstName} ${rowData.lastName}`);
    // Implement delete logic here
  };

  return (
    <div className="card">
      <div className="card-header py-3 pt-5 fs-3">Review Module</div>
      <div className="card-body">
        <div className="gap-3 d-flex">
          <button
            className="btn btn-primary waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-plus me-sm-1" />{" "}
              <span className="d-none d-sm-inline-block">Add New</span>
            </span>
          </button>
          <button
            className="btn btn-secondary create-new btn-danger waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-trash me-sm-1" />{" "}
              <span className="d-none d-sm-inline-block">Delete selected</span>
            </span>
          </button>
          <button
            className="btn btn-secondary waves-effect waves-light"
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
            className="btn btn-info waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-archive me-sm-1" />{" "}
              <span className="d-none d-sm-inline-block">Archive</span>
            </span>
          </button>
          <button
            className="btn btn-danger waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <MdOutlineMail size={22} className="me-1" />{" "}
              <span className="d-none d-sm-inline-block">Email Records</span>
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

export default IndividualAuditReview;
