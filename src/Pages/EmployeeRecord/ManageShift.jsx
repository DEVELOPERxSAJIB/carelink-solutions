import { useNavigate } from "react-router-dom";
import DataTable from "../../components/Tables/DynamicTable";
import TableHeader from './../../components/Tables/TableHeader';
import FullscreenModal from './../../components/Models/FullScreenModel';
import useFormFields from './../../hook/useFormHook';
import MultiSelect from './../../components/FormElement/MultiSelect';

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

const ManageShift = () => {
    const columns = [
        { header: "S.No", field: "serialNumber" },
        { header: "Employee Name", field: "employeeName" },
        { header: "Multiple Staff Required", field: "status" },
        { header: "Selected Site", field: "selectedSite" },
        { header: "Code", field: "code" },
        { header: "Is Published?", field: "isPublished" },
        { header: "Created By", field: "createdBy" },
        { header: "Created On", field: "createdOn" },
    ];
    
    const data = [
        {
            serialNumber: 1,
            employeeName: "John Doe",
            multipleStaffRequired: true,
            selectedSite: "Site A",
            code: "EMP001",
            isPublished: true,
            createdBy: "Admin",
            createdOn: "2024-07-03",
        },
        {
            serialNumber: 2,
            employeeName: "Jane Smith",
            multipleStaffRequired: false,
            selectedSite: "Site B",
            code: "EMP002",
            isPublished: false,
            createdBy: "Manager",
            createdOn: "2024-07-02",
        },
        // Add more entries as needed
    ];
    

  const handleEdit = (rowData) => {
    alert(`Editing ${rowData.firstName} ${rowData.lastName}`);
  };

  const handleDelete = (rowData) => {
    alert(`Deleting ${rowData.firstName} ${rowData.lastName}`);
  };
  const initialState = {
    category: "Male",
    siteName: "",
    individual: "",
  };
  const [formData, handleChange, resetForm, isValid] =
    useFormFields(initialState);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    resetForm();
  };

  return (
    <div className="card">     
      <TableHeader title="Manage Shift" className="py-3 pt-5 fs-3 card-header"/>
      <div className="card-body">
        <div className="gap-3 d-flex flex-wrap">
        <FullscreenModal
            id="addShift"
            className="col-md-4 "
            title="Add shift"
            onSave={handleSubmit}
          >
            <form
              className="w-100 px-3 from-scrollbar h-75"
              onSubmit={handleSubmit}
            >
              <div className="row">
              <div className="col-md-12">
                <label htmlFor="" className="form-label">
                  Select Site
                  <span className="text-danger">*</span>
                </label>
                <input type="text" name="" id="" className="form-control mb-3" />
              </div>
               
                <div className="col-md-12 mb-3">
                  <label htmlFor="individual" className="form-label">
                    Select Staff <span className="text-danger">*</span>
                  </label>
                  <MultiSelect />
                </div>
                <label htmlFor="" className="form-check d-flex gap-2">
                  <input type="checkbox" className="form-check" />
                  Check if this schedule repeats
                </label>
              </div>
              
              <div className="d-flex justify-content-start mt-2">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </FullscreenModal>
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
            className="btn btn-warning waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
            <i className="ti ti-history me-1"></i>{" "}
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
              <i className="ti ti-archive me-1" />
              <span className="d-none d-sm-inline-block">
                Archive{" "}
              </span>
            </span>
          </button>
          <button
            className="btn btn-info waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-notes me-1" />
              <span className="d-none d-sm-inline-block">
                Reports{" "}
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
            tableName="manageShift"
          />
        </div>
      </div>
    </div>
  );
};

export default ManageShift;


