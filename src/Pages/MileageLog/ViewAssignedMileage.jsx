import { useNavigate } from "react-router-dom";
import { FaRegFolder } from "react-icons/fa";
import DataTable from "../../components/Tables/DynamicTable";
import FullscreenModal from './../../components/Models/FullScreenModel';
import useFormFields from './../../hook/useFormHook';
import TableHeader from './../../components/Tables/TableHeader';

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

const ViewAssignedMileage = () => {
  const { start, end } = getCurrentWeekDateRange();
  const navigate = useNavigate();

  const columns = [
    { header: "S.No", field: "serialNumber" },
    { header: "Individual", field: "individual" },
    { header: "Month/Year", field: "monthYear" },
    { header: "Initial Miles", field: "initialMiles" },
    { header: "Total Miles", field: "totalMiles" },
    { header: "Added By", field: "addedBy" },
    { header: "Added On", field: "addedOn" },
  ];
  
  const data = [
    {
      serialNumber: 1,
      individual: "John Doe",
      monthYear: "06/2024",
      initialMiles: 120,
      totalMiles: 200,
      addedBy: "Jane Smith",
      addedOn: "2024-06-01 12:30"
    },
    {
      serialNumber: 2,
      individual: "Alice Johnson",
      monthYear: "06/2024",
      initialMiles: 100,
      totalMiles: 180,
      addedBy: "John Doe",
      addedOn: "2024-06-02 17:30"
    },
    {
      serialNumber: 3,
      individual: "Bob Brown",
      monthYear: "06/2024",
      initialMiles: 150,
      totalMiles: 230,
      addedBy: "Alice Johnson",
      addedOn: "2024-06-03 14:30"
    }
  ];
  

  const handleEdit = (rowData) => {
    alert(`Editing ${rowData.firstName} ${rowData.lastName}`);
  };

  const handleDelete = (rowData) => {
    alert(`Deleting ${rowData.firstName} ${rowData.lastName}`);
  };
  const initialState = {
    date: "07/04/2024",
    mileageType: "",
    individual: "",
    mileagePeriod: "",
    totalMiles: "",
    comment: "",
  };

  const [formData, handleChange, resetForm] = useFormFields(initialState);
 
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your form submission logic here
    console.log("Form Data:", formData);
    resetForm();
   
  };
  return (
    <div className="card">

      <TableHeader title="Assigned Miles" className="py-3 pt-5 fs-3 card-header"/>
      <div className="card-body">
        <div className="gap-3 d-flex flex-wrap">
          <FullscreenModal title="Add Mileage" id="addmileage">
          <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <input
                type="text"
                id="date"
                name="date"
                className="form-control"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="mileageType" className="form-label">
                Mileage Type
              </label>
              <select
                id="mileageType"
                name="mileageType"
                className="form-select"
                value={formData.mileageType}
                onChange={handleChange}
                required
              >
                <option value="">Select Mileage Type</option>
                <option value="Individual Mileage">Individual Mileage</option>
                <option value="Share Mileage">Share Mileage</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="individual" className="form-label">
                Select Individual
              </label>
              <select
                id="individual"
                name="individual"
                className="form-select"
                value={formData.individual}
                onChange={handleChange}
                required
              >
                <option value="">Select Individual</option>
                {/* Add options dynamically here */}
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="mileagePeriod" className="form-label">
                Select Mileage Period
              </label>
              <select
                id="mileagePeriod"
                name="mileagePeriod"
                className="form-select"
                value={formData.mileagePeriod}
                onChange={handleChange}
                required
              >
                <option value="">Select Mileage Period</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="totalMiles" className="form-label">
                Total Miles
              </label>
              <input
                type="text"
                id="totalMiles"
                name="totalMiles"
                className="form-control"
                value={formData.totalMiles}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-12 mb-3">
              <label htmlFor="comment" className="form-label">
                Comment
              </label>
              <textarea
                id="comment"
                name="comment"
                className="form-control"
                value={formData.comment}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Add Mileage
            </button>
          </div>
        </form>
      
          </FullscreenModal>
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

export default ViewAssignedMileage;
