
import DataTable from "./../../components/Tables/DynamicTable";
import { useNavigate } from "react-router-dom";
import useFormFields from './../../hook/useFormHook';
import FullscreenModal from './../../components/Models/FullScreenModel';
import TableHeader from './../../components/Tables/TableHeader';


const SubUsers = () => {

  const navigate = useNavigate();
  const initialState = {
    gender: "Male",
    firstName: "",
    lastName: "",
    email: "",
    medAdministration: "Yes",
  };

  const [formData, handleChange, resetForm] = useFormFields(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    // handleSave(formData);
    resetForm();
  };

  const columns = [
    { header: "S.No", field: "serialNumber" },
    { header: "First Name", field: "firstName" },
    { header: "Last Name", field: "lastName" },
    { header: "Email", field: "email" },
    { header: "Created By", field: "createdBy" },
    { header: "Status", field: "status" },
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
      billingPermission: "Allowed",
    },
    {
      serialNumber: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      createdBy: "Manager",
      status: "Inactive",
      billingPermission: "Not Allowed",
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

      <TableHeader title="Manage Sub Users" className="py-3 pt-5 fs-3 card-header"/>
      <div className="card-body">
        <div className="gap-3 d-flex flex-wrap">
        <FullscreenModal id="addnewsubuser" title="Add New Sub-User" onSave={handleSubmit}>
      <form className="w-100">
        <div className="mb-3 w-100">
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
        <div className="mb-3">
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
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="form-control"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="medAdministration" className="form-label">
            Med-Administration
          </label>
          <select
            id="medAdministration"
            name="medAdministration"
            className="form-select"
            value={formData.medAdministration}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary me-4">
        Add New Sub-User
        </button>
      </form>
    </FullscreenModal>
          <button
            className="btn btn-secondary create-new btn-danger waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span>
              <i className="ti ti-trash me-sm-1" />{" "}
              <span className="d-none d-sm-inline-block">Delete all selected</span>
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

export default SubUsers;
