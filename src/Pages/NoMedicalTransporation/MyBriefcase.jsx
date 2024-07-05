import { useNavigate } from "react-router-dom";
import DataTable from "../../components/Tables/DynamicTable";
import Accordion from './../../components/Tables/Accordion';
import TableHeader from './../../components/Tables/TableHeader';
import PopupModal from './../../components/Models/PopupModel';

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
      
      <TableHeader title="Mange My Briefcase" className="py-3 pt-5 fs-3 card-header"/>
      <div className="card-body">
        <div className="gap-3 d-flex flex-wrap">
          <PopupModal id="addNewBriefcase" title="Add new ">
            <form action="">
              <div className="card">
                <div className="card-header bg-primary text-center text-white fs-5">Add Folder Category</div>
                <div className="card-body">
                  <label htmlFor="" className="form-label mt-4">My Folder Category Name</label>
                  <input type="text" placeholder="folder category name" className="form-control" />
                  <button className="btn btn-primary mt-4">save</button>
                </div>
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
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default MyBriefcase;
