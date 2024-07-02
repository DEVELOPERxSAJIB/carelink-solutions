import DataTable from "./../../components/Tables/DynamicTable";
import { useNavigate } from "react-router-dom";
import { FaRegFolder } from "react-icons/fa";
import { FaRegFolderOpen } from "react-icons/fa";

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

const HealthCareProfessional = () => {
  const { start, end } = getCurrentWeekDateRange();
  const navigate = useNavigate();

  const columns = [
    { header: "S.No", field: "serialNumber" },
    { header: "First Name", field: "firstName" },
    { header: "Last Name", field: "lastName" },
    { header: "Email", field: "email" },
    { header: "Created By", field: "createdBy" },
    { header: "Status", field: "status" },
  ];

  const data = [
    {
      serialNumber: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      createdBy: "Admin",
      status: "Active",
    },
    {
      serialNumber: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      createdBy: "Manager",
      status: "Inactive",
    },
    {
      serialNumber: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      createdBy: "Manager",
      status: "Inactive",
    },
    {
      serialNumber: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      createdBy: "Manager",
      status: "Inactive",
    },

    // Add more rows as needed
  ];

  const handleEdit = (rowData) => {
    alert(`Editing ${rowData.firstName} ${rowData.lastName}`);
  };

  const handleDelete = (rowData) => {
    alert(`Deleting ${rowData.firstName} ${rowData.lastName}`);
  };

  return (
    <div className="card">
      <div className="card-header py-3 pt-5 fs-3">Healthcare Professionals</div>
      <div className="card-body">
        <div className="gap-3 d-flex">
          <button
            style={{ fontSize: "12px" }}
            className="btn btn-sm btn-primary waves-effect waves-light"
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
            style={{ fontSize: "12px" }}
            className="btn btn-info create-new btn-danger waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-upload me-sm-1" />{" "}
              <span className="d-none d-sm-inline-block">Import CSV</span>
            </span>
          </button>
          <button
            style={{ fontSize: "12px" }}
            className="btn btn-warning waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-download me-sm-1" />{" "}
              <span className="d-none d-sm-inline-block">Export Selected</span>
            </span>
          </button>
          <button
            style={{ fontSize: "12px" }}
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
            style={{ background: "#9fd74d", color: "#fff", fontSize: "12px" }}
            className="btn waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <FaRegFolder size={22} className="me-1" />{" "}
              <span className="d-none d-sm-inline-block">Active</span>
            </span>
          </button>
          <button
            style={{ fontSize: "12px" }}
            className="btn btn-danger waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <FaRegFolderOpen size={22} className="me-1" />{" "}
              <span className="d-none d-sm-inline-block">Inactive</span>
            </span>
          </button>
          <button
            style={{
              fontSize: "12px",
              color: "#fff",
              background: "rgba(255, 124, 189, 1)",
            }}
            className="btn waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-plus" />
              <span className="d-none d-sm-inline-block">
                Assign All Individual{" "}
              </span>
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

export default HealthCareProfessional;
