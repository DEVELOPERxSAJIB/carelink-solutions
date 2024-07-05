import DataTable from "./../../components/Tables/DynamicTable";
import TableHeader from './../../components/Tables/TableHeader';

const ViewOutcomes = () => {
  const columns = [
    { header: "S.No", field: "serialNumber" },
    { header: "Individual Name", field: "individualName" },
    { header: "Frequency", field: "frequency" },
    { header: "Description", field: "description" },
    { header: "Completed By", field: "completedBy" },
    { header: "Status", field: "status" },
    { header: "Added By", field: "addedBy" },
  ];

  const data = [
    {
      serialNumber: 1,
      individualName: "Abdirahman Mohamed",
      frequency: "Daily",
      description: "Morning routine check",
      completedBy: "John Doe",
      status: "Completed",
      addedBy: "Admin",
    },
    {
      serialNumber: 2,
      individualName: "Adnan Sidirijal",
      frequency: "Weekly",
      description: "Weekly health check",
      completedBy: "Jane Smith",
      status: "Pending",
      addedBy: "Admin",
    },
    {
      serialNumber: 3,
      individualName: "Ellott Verrilli",
      frequency: "Monthly",
      description: "Monthly report submission",
      completedBy: "Peter Parker",
      status: "In Progress",
      addedBy: "Admin",
    },
    {
      serialNumber: 4,
      individualName: "James Masters",
      frequency: "Yearly",
      description: "Annual performance review",
      completedBy: "Clark Kent",
      status: "Completed",
      addedBy: "Admin",
    },
    {
      serialNumber: 5,
      individualName: "Keetrah Chandler",
      frequency: "Daily",
      description: "Daily status update",
      completedBy: "Bruce Wayne",
      status: "Completed",
      addedBy: "Admin",
    },
    {
      serialNumber: 6,
      individualName: "Omer Mohamed",
      frequency: "Weekly",
      description: "Weekly team meeting",
      completedBy: "Diana Prince",
      status: "Pending",
      addedBy: "Admin",
    },
  ];
  const handleEdit = (rowData) => {
    alert(`Editing ${rowData.firstName} ${rowData.lastName}`);
    // Implement edit logic here
  };

  const handleDelete = (rowData) => {
    alert(`Deleting ${rowData.firstName} ${rowData.lastName}`);
    // Implement delete logic here
  };

  return (
    <div className="card">

      <TableHeader title="View Outcomes" className="py-3 pt-5 fs-3 card-header"/>
      <div className="card-body">
      <div className="gap-3 d-flex flex-wrap">
      
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
        <DataTable
          tableClassName="custom-table"
          onEdit={handleEdit}
          onDelete={handleDelete}
          data={data}
          columns={columns}
        />
      </div>
    </div>
  );
};

export default ViewOutcomes;
