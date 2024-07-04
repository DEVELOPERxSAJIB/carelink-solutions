import { useState } from "react";
import DataTable from "./../../components/Tables/DynamicTable";
import { useNavigate } from "react-router-dom";
import { FaRegFolder } from "react-icons/fa";
import { FaRegFolderOpen } from "react-icons/fa";
import FullscreenModal from "./../../components/Models/FullScreenModel";
import useFormFields from "./../../hook/useFormHook";

const HealthCareProfessional = () => {
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
  const [tableData, setTableData] = useState([
    { id: 1, name: "Adnan Sidirijal", role: "Agency", permission: "View only" },
    { id: 2, name: "Keetrah Chandler", role: "Agency", permission: "Edit" },
    { id: 3, name: "Abdirahman Mohamed", role: "Agency", permission: "Edit" },
    { id: 4, name: "James Masters", role: "Agency", permission: "Edit" },
    { id: 5, name: "Ellott Verrilli", role: "Agency", permission: "Edit" },
    { id: 6, name: "Omer Mohamed", role: "Agency", permission: "Edit" },
  ]);
  const handlePermissionChange = (id, permission) => {
    setTableData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, permission: permission } : row
      )
    );
  };

  const columns2 = [
    { field: "id", header: "S.No" },
    { field: "name", header: "Individual" },
    { field: "role", header: "Agency" },
    {
      field: "permission",
      header: "Permission",
      render: (row) => (
        <select
          className="form-control"
          value={row.permission}
          onChange={(e) => handlePermissionChange(row.id, e.target.value)}
        >
          <option value="Edit">Edit</option>
          <option value="View only">View only</option>
        </select>
      ),
    },
  ];
  const initialState = {
    gender: "Male",
    firstName: "",
    lastName: "",
    email: "",
    manager: false,
    medAdministration: false,
    address1: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    dateOfBirth: "",
    hireDate: "",
    longevityAddon: false,
    employeeNumber: "",
  };

  // Use the custom form hook
  const [formData, handleChange, resetForm, isValid] =
    useFormFields(initialState);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // onSave(formData); // Pass form data to parent component for handling (e.g., saving to API)
    resetForm(); // Reset the form after submission
  };
  const columns3 = [
    { field: "id", header: "S.No" },
    { field: "name", header: "Individual" },
    { field: "role", header: "Agency" },
  ];
  const data3 = [
    { id: 1, name: "Abdirahman Mohamed", role: "Agency" },
    { id: 2, name: "Adnan Sidirijal", role: "Agency" },
    { id: 3, name: "Ellott Verrilli", role: "Agency" },
    { id: 4, name: "James Masters", role: "Agency" },
    { id: 5, name: "Keetrah Chandler", role: "Agency" },
    { id: 6, name: "Omer Mohamed", role: "Agency" },
  ];
  return (
    <div className="card">
      <div className="card-header py-3 pt-5 fs-3">Healthcare Professionals</div>
      <div className="card-body">
        <div className="gap-3 d-flex">
          <FullscreenModal
            id="Healthcare_Professionals"
            className="col-md-7 "
            title="Add Healthcare Professionals"
          >
            <form
              className="w-100 px-3 from-scrollbar h-75"
              onSubmit={handleSubmit}
            >
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="gender" className="form-label">
                    Gender <span className="text-danger">*</span>
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    className="form-select"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="form-control"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="form-control"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3 form-check">
                  <input
                    type="checkbox"
                    id="manager"
                    name="manager"
                    className="form-check-input"
                    checked={formData.manager}
                    onChange={handleChange}
                  />
                  <label htmlFor="manager" className="form-check-label">
                    Manager
                  </label>
                </div>
                <div className="col-md-6 mb-3 form-check">
                  <input
                    type="checkbox"
                    id="medAdministration"
                    name="medAdministration"
                    className="form-check-input"
                    checked={formData.medAdministration}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="medAdministration"
                    className="form-check-label"
                  >
                    Med-Administration
                  </label>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="address1" className="form-label">
                    Address1 <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="address1"
                    name="address1"
                    className="form-control"
                    value={formData.address1}
                    onChange={handleChange}
                    placeholder="Address1"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="city" className="form-label">
                    City <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="form-control"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="state" className="form-label">
                    State <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    className="form-control"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="zip" className="form-label">
                    Zip <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    className="form-control"
                    value={formData.zip}
                    onChange={handleChange}
                    placeholder="Zip"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="dateOfBirth" className="form-label">
                    Date Of Birth
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    className="form-control"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="hireDate" className="form-label">
                    Hire Date
                  </label>
                  <input
                    type="date"
                    id="hireDate"
                    name="hireDate"
                    className="form-control"
                    value={formData.hireDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3 form-check">
                  <input
                    type="checkbox"
                    id="longevityAddon"
                    name="longevityAddon"
                    className="form-check-input"
                    checked={formData.longevityAddon}
                    onChange={handleChange}
                  />
                  <label htmlFor="longevityAddon" className="form-check-label">
                    Longevity Addon
                  </label>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="employeeNumber" className="form-label">
                    Employee #
                  </label>
                  <input
                    type="text"
                    id="employeeNumber"
                    name="employeeNumber"
                    className="form-control"
                    value={formData.employeeNumber}
                    onChange={handleChange}
                    placeholder="Employee #"
                  />
                </div>
                <div className="mt-5 ">
                  <DataTable
                    columns={columns2}
                    data={tableData}
                    tableClassName="custom-table"
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-end mt-5">
                <button type="submit" className="btn btn-primary">
                  Add support administrator
                </button>
              </div>
            </form>
          </FullscreenModal>

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
          <FullscreenModal
            className="col-md-8 "
            title="Assign All Individual "
            // onSave={handleSubmit}
            id="assignAllIndividualhealth"
          >
            <DataTable
              columns={columns3}
              data={data3}
              tableClassName="custom-table"
            />
          </FullscreenModal>
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
