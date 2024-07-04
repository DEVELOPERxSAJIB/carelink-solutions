import { useNavigate } from "react-router-dom";
import DataTable from "../../components/Tables/DynamicTable";
import Accordion from './../../components/Tables/Accordion';

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

const AddNewTicket = () => {
  const columns = [
    { field: 'sno', header: 'S.No' },
    { field: 'category', header: 'Category' },
    { field: 'subject', header: 'Subject' },
    { field: 'createdBy', header: 'Created By' },
    { field: 'createdOn', header: 'Created On' },
    { field: 'ticketStatus', header: 'Ticket Status' },
  ];
  
  const data = [
    {
      sno: 1,
      category: 'Technical Support',
      subject: 'Login Issue',
      createdBy: 'John Doe',
      createdOn: '2024-07-01',
      ticketStatus: 'Open',
    },
    {
      sno: 2,
      category: 'Billing',
      subject: 'Invoice Request',
      createdBy: 'Jane Smith',
      createdOn: '2024-07-02',
      ticketStatus: 'Pending',
    },
    {
      sno: 3,
      category: 'Technical Support',
      subject: 'Server Down',
      createdBy: 'Alice Johnson',
      createdOn: '2024-07-03',
      ticketStatus: 'Resolved',
    },
    {
      sno: 4,
      category: 'Customer Service',
      subject: 'Account Update',
      createdBy: 'Bob Brown',
      createdOn: '2024-07-04',
      ticketStatus: 'Open',
    },
    {
      sno: 5,
      category: 'Sales',
      subject: 'Product Inquiry',
      createdBy: 'Carol White',
      createdOn: '2024-07-05',
      ticketStatus: 'Closed',
    },
  ];
  
  





  const handleEdit = (rowData) => {
    alert(`Editing ${rowData.firstName} ${rowData.lastName}`);
  };

  const handleDelete = (rowData) => {
    alert(`Deleting ${rowData.firstName} ${rowData.lastName}`);
  };

  return (
    <div className="card">
      
      <div className="card-header py-3 pt-5 fs-3">Manage Tickets</div>
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

export default AddNewTicket;

