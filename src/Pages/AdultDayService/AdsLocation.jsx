import { useNavigate } from "react-router-dom";
import DataTable from "../../components/Tables/DynamicTable";
import FullscreenModal from './../../components/Models/FullScreenModel';
import useFormFields from './../../hook/useFormHook';
import PopupModal from './../../components/Models/PopupModel';
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

const AdsLocation = () => {
  const columns = [
    { header: "S.No", field: "serialNumber" },
    { header: "ADS Address1", field: "address1" },
    { header: "ADS Address2", field: "address2" },
    { header: "ADS City", field: "city" },
    { header: "ADS State", field: "state" },
    { header: "ADS Zip Code", field: "zipCode" },
    { header: "Location Creator", field: "locationCreator" },
    { header: "Created On", field: "createdOn" },
  ];
  
  const data = [
    {
      serialNumber: 1,
      address1: "123 Main St",
      address2: "Apt 101",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      locationCreator: "John Doe",
      createdOn: "2024-06-01"
    },
    {
      serialNumber: 2,
      address1: "456 Elm St",
      address2: "",
      city: "Smallville",
      state: "NY",
      zipCode: "54321",
      locationCreator: "Jane Smith",
      createdOn: "2024-06-02"
    },
    {
      serialNumber: 3,
      address1: "789 Oak Ave",
      address2: "Suite 200",
      city: "Metropolis",
      state: "IL",
      zipCode: "67890",
      locationCreator: "Alice Johnson",
      createdOn: "2024-06-03"
    },
  ];
  
  
  
  

  const handleEdit = (rowData) => {
    alert(`Editing ${rowData.firstName} ${rowData.lastName}`);
  };

  const handleDelete = (rowData) => {
    alert(`Deleting ${rowData.firstName} ${rowData.lastName}`);
  };
  const initialState = {
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
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
      <TableHeader title="Manage Locations" className="py-3 pt-5 fs-3 card-header"/>
  
      <div className="card-body">
        <div className="gap-3 d-flex flex-wrap">
        
    
      

      <PopupModal
        
        title="Add Location"
        id="enterlocationdetails"
        className="col-md-4"
      >
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-12 mb-3">
              <label className="form-label" htmlFor="address1">
                Address1 <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="address1"
                placeholder="Enter address1"
                className="form-control w-100"
                id="address1"
                value={formData.address1}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-12 mb-3">
              <label className="form-label" htmlFor="address2">
                Address2
              </label>
              <input
                type="text"
                name="address2"
                placeholder="Enter address2"
                className="form-control w-100"
                id="address2"
                value={formData.address2}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-12 mb-3">
              <label className="form-label" htmlFor="city">
                City <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="city"
                placeholder="Enter city"
                className="form-control w-100"
                id="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-12 mb-3">
              <label className="form-label" htmlFor="state">
                State <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="state"
                placeholder="Enter state"
                className="form-control w-100"
                id="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-12 mb-3">
              <label className="form-label" htmlFor="zipCode">
                Zip Code <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="zipCode"
                placeholder="Enter zip code"
                className="form-control w-100"
                id="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="d-flex justify-content-end mt-3">
            <button type="submit" className="btn btn-primary">
              Save Location
            </button>
          </div>
        </form>
      </PopupModal>
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
      
        </div>
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={data}
            tableClassName="custom-table"
            onEdit={handleEdit}
             tableName="adsLocation"
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default AdsLocation;


