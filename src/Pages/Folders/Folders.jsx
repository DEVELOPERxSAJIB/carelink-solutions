import { useNavigate } from "react-router-dom";
import { FaRegFolder } from "react-icons/fa";
import DataTable from "../../components/Tables/DynamicTable";
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

const Folders = () => {
  const { start, end } = getCurrentWeekDateRange();
  const navigate = useNavigate();

  const columns = [
    { header: "S.No", field: "serialNumber" },
    { header: "Folder Name", field: "folderName" },
    { header: "Folder Creator", field: "folderCreator" },
    { header: "Created On", field: "createdOn" },
  ];
  
  const data = [
    {
      serialNumber: 1,
      folderName: "Documents",
      folderCreator: "John Doe",
      createdOn: "2024-06-01"
    },
    {
      serialNumber: 2,
      folderName: "Photos",
      folderCreator: "Jane Smith",
      createdOn: "2024-06-02"
    },
    {
      serialNumber: 3,
      folderName: "Projects",
      folderCreator: "Alice Johnson",
      createdOn: "2024-06-03"
    }
  ];
  
  
  

  const handleEdit = (rowData) => {
    alert(`Editing ${rowData.firstName} ${rowData.lastName}`);
  };

  const handleDelete = (rowData) => {
    alert(`Deleting ${rowData.firstName} ${rowData.lastName}`);
  };

  return (
    <div className="card">
      <TableHeader title="Manage Folders" className="py-3 pt-5 fs-3 card-header"/>
      <div className="card-body">
        <div className="gap-3 d-flex flex-wrap">
          <PopupModal title="Add Folder" id="addFolder">
            <form action="">
              <input type="text" placeholder="folder name" className="form-control" />
              <button className="mt-4 btn btn-primary">Save</button>
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
        </div>
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={data}
            tableClassName="custom-table"
            onEdit={handleEdit}
            tableName="folders"
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Folders;

