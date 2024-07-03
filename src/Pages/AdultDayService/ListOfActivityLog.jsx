import { useNavigate } from "react-router-dom";
import DataTable from "../../components/Tables/DynamicTable";

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

const ListOfActivityLog = () => {
  const columns = [
    { header: "S.No", field: "serialNumber" },
    { header: "Category", field: "category" },
    { header: "Added By", field: "addedBy" },
    { header: "Added On", field: "addedOn" },
  ];
  
  const data = [
    {
      serialNumber: 1,
      category: "Electronics",
      addedBy: "John Doe",
      addedOn: "2024-06-01"
    },
    {
      serialNumber: 2,
      category: "Furniture",
      addedBy: "Jane Smith",
      addedOn: "2024-06-02"
    },
    {
      serialNumber: 3,
      category: "Clothing",
      addedBy: "Alice Johnson",
      addedOn: "2024-06-03"
    },
    {
      serialNumber: 4,
      category: "Books",
      addedBy: "Bob Brown",
      addedOn: "2024-06-04"
    },
    {
      serialNumber: 5,
      category: "Toys",
      addedBy: "Carol White",
      addedOn: "2024-06-05"
    }
  ];

  const handleEdit = (rowData) => {
    alert(`Editing ${rowData.firstName} ${rowData.lastName}`);
  };

  const handleDelete = (rowData) => {
    alert(`Deleting ${rowData.firstName} ${rowData.lastName}`);
  };
  const getCurrentMonthYear = () => {
    const currentDate = new Date();
    const options = { month: 'long', year: 'numeric' };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(currentDate);
  };
 
  
  return (
    <div className="card">
      <div className="card-header py-3 pt-5 fs-3">List of Activity</div>
      <div className="card-body">
        <div className="gap-3 d-flex">
          <button
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
          <h6 className="text-primary my-auto">Chart For Month {getCurrentMonthYear()}</h6>
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

export default ListOfActivityLog;


