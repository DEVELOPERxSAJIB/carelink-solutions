import React, { useState } from "react";
import DataTable from "./../../components/Tables/DynamicTable";
import { useNavigate } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { FaRegFolder } from "react-icons/fa";
import { FaRegFolderOpen } from "react-icons/fa";
import useFormFields from "./../../hook/useFormHook";
import FullscreenModal from "./../../components/Models/FullScreenModel";
import TableHeader from "./../../components/Tables/TableHeader";
import useTableExport from './../../hook/useExportData';

const CaregiverOrStaff = () => {
  const navigate = useNavigate();
  const { handleExportExcel, handleExportPDF, handleCopy, handlePrint}= useTableExport()
  const columns = [
    { header: "S.No", field: "serialNumber" },
    { header: "First Name", field: "firstName" },
    { header: "Last Name", field: "lastName" },
    { header: "Email", field: "email" },
    { header: "Created By", field: "createdBy" },
    { header: "Status", field: "status" },
    { header: "Amend Status", field: "amendStatus" },
    { header: "Add Vehicle Status", field: "addVehicleStatus" },
    { header: "Billing Permission", field: "billingPermission" },
  ];

  const data = [
    {
      serialNumber: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      createdBy: "Admin",
      status: "Active",
      amendStatus: "Active",
      addVehicleStatus: "Active",
      billingPermission: "Allowed",
    },
    {
      serialNumber: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      createdBy: "Admin",
      status: "InActive",
      amendStatus: "Active",
      addVehicleStatus: "Active",
      billingPermission: "Allowed",
    },

    // Add more rows as needed
  ];

  const [tableData, setTableData] = useState([
    { id: 1, name: "Adnan Sidirijal", role: "Agency", permission: "View only" },
    { id: 2, name: "Keetrah Chandler", role: "Agency", permission: "Edit" },
    { id: 3, name: "Abdirahman Mohamed", role: "Agency", permission: "Edit" },
    { id: 4, name: "James Masters", role: "Agency", permission: "Edit" },
    { id: 5, name: "Ellott Verrilli", role: "Agency", permission: "Edit" },
    { id: 6, name: "Omer Mohamed", role: "Agency", permission: "Edit" },
  ]);

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


  const handlePermissionChange = (id, permission) => {
    setTableData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, permission: permission } : row
      )
    );
  };

  const handleEdit = (rowData) => {
    // Handle edit action
    console.log("Editing:", rowData);
  };

  const handleDelete = (rowData) => {
    // Handle delete action
    console.log("Deleting:", rowData);
  };

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
    resetForm();
  };
  return (
    <div className="card">
      <TableHeader
        title="Caregiver/Staff"
        className="py-3 pt-5 fs-3 card-header"
      />
      <div className="card-body">
        <div className="gap-3 d-flex flex-wrap">
          <FullscreenModal
            id="caregiverstaf"
            className="col-md-7 "
            title="Add Caregiver/Staff"
            onSave={handleSubmit}
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
                  Add Caregiver/Staff
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
            onClick={()=>handleExportExcel(data)}
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-upload me-sm-1" />{" "}
              <span className=" d-sm-inline-block">Import CSV</span>
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
              <span className=" d-sm-inline-block">Export Selected</span>
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
              <span className=" d-sm-inline-block">Delete Selected</span>
            </span>
          </button>
          <button
            style={{ background: "#bd646e", color: "#fff", fontSize: "12px" }}
            className="btn waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
            onClick={() => navigate("/employee-payroll")}
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-plus me-sm-1" />{" "}
              <span className=" d-sm-inline-block">Payroll</span>
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
              <span className=" d-sm-inline-block">Archive</span>
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
              <span className=" d-sm-inline-block">Inactive</span>
            </span>
          </button>
          <button
            style={{
              fontSize: "12px",
              color: "#fff",
              background: "rgba(123, 172, 51, 1)",
            }}
            className="btn waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <FaRegMoneyBillAlt size={22} className="me-1" />{" "}
              <span className=" d-sm-inline-block">Earning</span>
            </span>
          </button>
          <button
          onClick={()=>navigate("/assign-all-individual")}
            className="btn btn-primary waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className='ti ti-plus'></i>
              <span className=" d-sm-inline-block">Assign All Individual</span>
            </span>
          </button>
          
        </div>
        <div className="mt-5 w-100">
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

export default CaregiverOrStaff;
