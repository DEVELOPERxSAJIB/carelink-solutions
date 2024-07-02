import React from "react";
import DataTable from "./../../components/Tables/DynamicTable";
import ExportButton from "./../../components/Buttons/ExportButton";
import { useNavigate } from "react-router-dom";
import { FaRegFolder, FaRegFolderOpen } from "react-icons/fa";

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

const Tar = () => {
  const { start, end } = getCurrentWeekDateRange();
  const navigate = useNavigate();
  const columns = [
    { header: "S.No", field: "serialNumber" },
    { header: "Code", field: "code" },
    { header: "Individual Name", field: "individualName" },
    { header: "Created By", field: "createdBy" },
    { header: "Created On", field: "createdOn" },
    { header: "Is Published?", field: "isPublished" },
    { header: "Status", field: "status" },
  ];

  const data = [
    {
      serialNumber: 1,
      code: "1452",
      individualName: "Md Sajib",
      email: "john.doe@example.com",
      createdBy: "Admin",
      createdOn : "25 March 2009",
      isPublished: "True",
      status: "Active",
    },
    {
      serialNumber: 2,
      code : "5412",
      individualName: "Jane",
      email: "jane.smith@example.com",
      createdBy: "Manager",
      createdOn : "15 July 2016",
      isPublished: "False",
      status: "Inactive",
    },
    // Add more rows as needed
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
      <div className="card-header py-3 pt-5 fs-3">Treatment Administration Records</div>
      <div className="card-body">
        <div className="gap-3 d-flex">
          <button
            className="btn btn-secondary create-new btn-primary waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span>
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
            <span>
              <i className="ti ti-trash me-sm-1" />{" "}
              <span className="d-none d-sm-inline-block">Delete selected</span>
            </span>
          </button>
          <button
            style={{ background: "#9fd74d", color: "#fff"}}
            className="btn waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <FaRegFolder size={22} className="me-1" />{" "}
              <span className="d-none d-sm-inline-block">Active TAR</span>
            </span>
          </button>
          <button
            className="btn btn-danger waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <FaRegFolderOpen size={22} className="me-1" />{" "}
              <span className="d-none d-sm-inline-block">InActive TAR</span>
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

export default Tar;
