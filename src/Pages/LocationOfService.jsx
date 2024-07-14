import { useNavigate } from "react-router-dom";
import DataTable from "../components/Tables/DynamicTable";
import PopupModal from './../components/Models/PopupModel';
import useFormFields from './../hook/useFormHook';
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

const LocationOfService = () => {
  const { start, end } = getCurrentWeekDateRange();
  const navigate = useNavigate();
  const columns = [
    { header: "S.No", field: "serialNumber" },
    { header: "Service Address 1", field: "serviceAddress1" },
    { header: "Service Address 2", field: "serviceAddress2" },
    { header: "Service City", field: "serviceCity" },
    { header: "Service State", field: "serviceState" },
    { header: "Service Zip Code", field: "serviceZipCode" },
    { header: "Created By", field: "createdBy" },
    { header: "Created On", field: "createdOn" },
  ];

  const data = [
    {
      serialNumber: 1,
      serviceAddress1: "19 dakkhin",
      serviceAddress2: "2 no cross road",
      serviceCity: "Khulna",
      serviceState: "Khulna",
      serviceZipCode: "9100",
      createdBy: "Sajib",
      createdOn : "13 APR 2024"
    },
    {
      serialNumber: 2,
      serviceAddress1: "19 dakkhin",
      serviceAddress2: "2 no cross road",
      serviceCity: "Khulna",
      serviceState: "Khulna",
      serviceZipCode: "9100",
      createdBy: "Sajib",
      createdOn : "13 APR 2024"
    },
    {
      serialNumber: 3,
      serviceAddress1: "19 dakkhin",
      serviceAddress2: "2 no cross road",
      serviceCity: "Khulna",
      serviceState: "Khulna",
      serviceZipCode: "9100",
      createdBy: "Sajib",
      createdOn : "13 APR 2024"
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
  const initialState = {
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: ''
  };

  const [formData, handleChange, resetForm] = useFormFields(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // onSave(formData); // Pass formData to parent component or handle saving logic
    resetForm(); // Reset form fields after submission
  };
  return (
    <div className="card">
      
      <TableHeader title="Manage Locations" className="card-header py-3 pt-5 fs-3"/>
      <div className="card-body">
        <div className="gap-3 d-flex flex-wrap">
        <PopupModal title="Add Service Location" id="manageLocations">
        <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="address1" className="form-label">Address1</label>
        <input
          type="text"
          id="address1"
          name="address1"
          className="form-control"
          value={formData.address1}
          onChange={handleChange}
          placeholder="Enter Address1"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="address2" className="form-label">Address2</label>
        <input
          type="text"
          id="address2"
          name="address2"
          className="form-control"
          value={formData.address2}
          onChange={handleChange}
          placeholder="Enter Address2"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="city" className="form-label">City</label>
        <input
          type="text"
          id="city"
          name="city"
          className="form-control"
          value={formData.city}
          onChange={handleChange}
          placeholder="Enter City"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="state" className="form-label">State</label>
        <input
          type="text"
          id="state"
          name="state"
          className="form-control"
          value={formData.state}
          onChange={handleChange}
          placeholder="Enter State"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="zipCode" className="form-label">Zip Code</label>
        <input
          type="text"
          id="zipCode"
          name="zipCode"
          className="form-control"
          value={formData.zipCode}
          onChange={handleChange}
          placeholder="Enter Zip Code"
          required
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">Add Service Location</button>
      </div>
    </form>
        </PopupModal>
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
        </div>
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={data}
            tableClassName="custom-table"
            tableName="locationOfService"
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default LocationOfService;
