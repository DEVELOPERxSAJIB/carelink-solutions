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

const MyBriefcase = () => {
  const columns = [
    { field: 'sno', header: 'S.No' },
    { field: 'briefcaseName', header: 'My Briefcase Name' },
    { field: 'briefcaseCreator', header: 'My Briefcase Creator' },
    { field: 'createdOn', header: 'Created On' },
  ];
  

  const data = [
    {
      sno: 1,
      briefcaseName: 'Project Alpha',
      briefcaseCreator: 'John Doe',
      createdOn: '2024-07-01',
    },
    {
      sno: 2,
      briefcaseName: 'Market Research',
      briefcaseCreator: 'Jane Smith',
      createdOn: '2024-07-02',
    },
    {
      sno: 3,
      briefcaseName: 'Client Proposal',
      briefcaseCreator: 'Alice Johnson',
      createdOn: '2024-07-03',
    },
    {
      sno: 4,
      briefcaseName: 'Design Mockups',
      briefcaseCreator: 'Bob Brown',
      createdOn: '2024-07-04',
    },
    {
      sno: 5,
      briefcaseName: 'Financial Reports',
      briefcaseCreator: 'Carol White',
      createdOn: '2024-07-05',
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
      
      <div className="card-header py-3 pt-5 fs-3">Manage My Briefcase</div>
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

export default MyBriefcase;
