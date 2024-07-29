import { useEffect, useState } from "react";
import DataTable from "./../../components/Tables/DynamicTable";
import { useNavigate } from "react-router-dom";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { FaRegFolder } from "react-icons/fa";
import { FaRegFolderOpen } from "react-icons/fa";
import useFormFields from "./../../hook/useFormHook";
import FullscreenModal from "./../../components/Models/FullScreenModel";
import TableHeader from "./../../components/Tables/TableHeader";
import useCSVOperations from "../../hook/useExportData";
import {
  useCreateUserMutation,
  useDeleteRoleBasedUserMutation,
  useRoleBasedUserQuery,
} from "../../Redux/api/UserApi";
import MainLoader from "../../utils/Loaders/MainLoader";

const Admin = () => {
  const navigate = useNavigate();

  const [createUser, { data, error, isSuccess }] = useCreateUserMutation();

  const [
    deleteRoleBasedUser,
    { data: deletedUser, isSuccess: isDeleteSuccess },
  ] = useDeleteRoleBasedUserMutation();

  const {
    data: roleBasedUserData,
    isLoading: roleBasedUserLoader,
    refetch,
  } = useRoleBasedUserQuery("admin");

  const columns = [
    { header: "First Name", field: "firstName" },
    { header: "Last Name", field: "lastName" },
    { header: "Email", field: "email" },
    { header: "Role", field: "role" },
    { header: "Created By", field: "createdBy" },
    { header: "Status", field: "status" },
    { header: "Amend Status", field: "amendStatus" },
    { header: "Add Vehicle Status", field: "addVehicleStatus" },
    { header: "Billing Permission", field: "billingPermission" },
  ];

  const [tableData, setTableData] = useState([
    { id: 1, name: "Adnan Sidirijal", role: "Agency", permission: "View only" },
    { id: 2, name: "Keetrah Chandler", role: "Agency", permission: "Edit" },
    { id: 3, name: "Abdirahman Mohamed", role: "Agency", permission: "Edit" },
    { id: 4, name: "James Masters", role: "Agency", permission: "Edit" },
    { id: 5, name: "Ellott Verrilli", role: "Agency", permission: "Edit" },
    { id: 6, name: "Omer Mohamed", role: "Agency", permission: "Edit" },
  ]);

  console.log(setTableData);

  const handlePermissionChange = () => {};

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

  const handleEdit = (rowData) => {
    // Handle edit action
    console.log("Editing:", rowData);
  };

  const handleDelete = (rowData) => {
    deleteRoleBasedUser(rowData._id);
  };

  const initialState = {
    gender: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    manager: "",
    medAdministration: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    dateOfBirth: "",
    hireDate: "",
    longevityAddon: "",
    adminID: "",
  };

  // Use the custom form hook
  const [formData, handleChange, resetForm] = useFormFields(initialState);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    createUser({
      ...formData,
      role: "admin",
    });
  };

  const { handleCSVFileUpload, handleExportSelected, handleDeleteSelected } =
    useCSVOperations(data, columns);

  useEffect(() => {
    if (isSuccess) {
      resetForm({
        gender: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        manager: "",
        medAdministration: "",
        address1: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
        dateOfBirth: "",
        hireDate: "",
        longevityAddon: "",
        caregiverID: "",
      });
    }
  }, [isSuccess, resetForm]);

  useEffect(() => {
    if (isDeleteSuccess) {
      refetch();
    }
  }, [isDeleteSuccess, refetch]);
  return (
    <div className="card">
      <TableHeader
        title="Our Admins"
        className="py-3 pt-5 fs-3 card-header"
      />
      <div className="card-body">
        <div className="gap-3 d-flex flex-wrap">
          <FullscreenModal
            id="caregiverstaf"
            className="col-md-7 "
            title="Add Admin"
            onSave={handleSubmit}
          >
            <form className="w-100 px-3 from-scrollbar" onSubmit={handleSubmit}>
              <div className="row">
                {data?.message && (
                  <div className="alert alert-success text-center">
                    {data?.message}
                  </div>
                )}
                {error?.data?.message && (
                  <div className="alert alert-danger text-center">
                    {error?.data?.message}
                  </div>
                )}
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="email" className="form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="password" className="form-label">
                    Password <span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="manager" className="form-label">
                    Manager <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="manager"
                    name="manager"
                    value={formData.manager}
                    onChange={handleChange}
                  >
                    <option value="">Select Manager</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="medAdministration" className="form-label">
                    Med Administration <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="medAdministration"
                    name="medAdministration"
                    value={formData.medAdministration}
                    onChange={handleChange}
                  >
                    <option value="">Select Med Administration</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="address1" className="form-label">
                    Address Line 1 <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address1"
                    name="address1"
                    value={formData.address1}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="address2" className="form-label">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address2"
                    name="address2"
                    value={formData.address2}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="city" className="form-label">
                    City <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="state" className="form-label">
                    State <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="zip" className="form-label">
                    Zip <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="dateOfBirth" className="form-label">
                    Date of Birth <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="hireDate" className="form-label">
                    Hire Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="hireDate"
                    name="hireDate"
                    value={formData.hireDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="longevityAddon" className="form-label">
                    Longevity Addon <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="longevityAddon"
                    name="longevityAddon"
                    value={formData.longevityAddon}
                    onChange={handleChange}
                  >
                    <option value="">Select Longevity Addon</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="adminID" className="form-label">
                    Admin ID <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="adminID"
                    name="adminID"
                    value={formData.adminID}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="gender" className="form-label">
                    Gender <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
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

              <div className="d-flex justify-content-end mt-5">
                <button type="submit" className="btn btn-primary">
                  Add Caregiver/Staff
                </button>
              </div>
            </form>
          </FullscreenModal>
          {/* <button
            style={{ fontSize: "12px" }}
            className="btn btn-info create-new btn-danger waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
           
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-upload me-sm-1" />{" "}
              <span className=" d-sm-inline-block">Import CSV</span>
            </span>
          </button> */}

          <label htmlFor="importcsv" className="btn btn-success">
            <span className="d-flex align-items-center">
              <i className="ti ti-upload me-sm-1" />{" "}
              <span className=" d-sm-inline-block">Import CSV</span>
            </span>
          </label>
          <input
            onChange={(e) => handleCSVFileUpload(e.target.files[0])}
            className="d-none"
            type="file"
            id="importcsv"
          />
          <button
            style={{ fontSize: "12px" }}
            className="btn btn-warning waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
            onClick={handleExportSelected}
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
            onClick={handleDeleteSelected}
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-trash me-sm-1" />{" "}
              <span className=" d-sm-inline-block">Delete Selected</span>
            </span>
          </button>
          <button
            style={{
              background: "#bd646e",
              color: "#fff",
              fontSize: "12px",
            }}
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
            style={{
              background: "#9fd74d",
              color: "#fff",
              fontSize: "12px",
            }}
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
            onClick={() => navigate("/assign-all-individual")}
            className="btn btn-primary waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-plus"></i>
              <span className=" d-sm-inline-block">Assign All Individual</span>
            </span>
          </button>
        </div>
        <div className="mt-5 w-100">
          <DataTable
            columns={columns}
            data={
              Array.isArray(roleBasedUserData?.payload?.user)
                ? roleBasedUserData.payload.user
                : []
            }
            tableClassName="custom-table"
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Admin;
