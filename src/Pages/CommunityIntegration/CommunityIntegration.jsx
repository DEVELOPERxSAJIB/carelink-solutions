import { useNavigate } from "react-router-dom";
import DataTable from "../../components/Tables/DynamicTable";
import TableHeader from './../../components/Tables/TableHeader';
import { useMeQuery } from "../../Redux/api/UserApi";
const CommunityIntegration = () => {
  const { data: logData } = useMeQuery();

  const navigate = useNavigate();

  const columns = [
    { header: "S.No", field: "serialNumber" },
    { header: "Category", field: "category" },
    { header: "Added By", field: "addedBy" },
    { header: "Added On", field: "addedOn" },
  ];
  
  const data = [
    {
      serialNumber: 1,
      category: "Technology",
      addedBy: "John Doe",
      addedOn: "2024-06-01 10:30"
    },
    {
      serialNumber: 2,
      category: "Finance",
      addedBy: "Jane Smith",
      addedOn: "2024-06-02 14:15"
    },
    {
      serialNumber: 3,
      category: "Marketing",
      addedBy: "Alice Johnson",
      addedOn: "2024-06-03 11:45"
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

      <TableHeader title="List of Activity" className="py-3 pt-5 fs-3 card-header"/>
      <div className="card-body">
        <div className="gap-3 d-flex flex-wrap">
          {logData?.payload?.user?.curd?.includes("create") &&
          <button
          onClick={()=>navigate("/create-new-individual")}
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
          }
          {logData?.payload?.user?.curd?.includes("create") &&
          
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
          }
          {logData?.payload?.user?.curd?.includes("create") &&
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
          }
            {logData?.payload?.user?.curd?.includes("delete") &&
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
            }
        </div>
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={data}
            tableClassName="custom-table"
            onEdit={handleEdit}
            tableName="communityIntegration"
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default CommunityIntegration;

