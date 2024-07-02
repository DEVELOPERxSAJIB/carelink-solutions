
import DataTable from './../../components/Tables/DynamicTable';
const Permissions = () => {
  // Define columns for the UserTable
  const columns = [
    { header: 'S.No', field: 'id' },
    { header: 'First Name', field: 'firstName' },
    { header: 'Last Name', field: 'lastName' },
    { header: 'Email', field: 'email' },
    { header: 'Type', field: 'type' },
    { header: 'Created By', field: 'createdBy' },
    { header: 'Status', field: 'status' },
    { header: 'Module Permission', field: 'modulePermission' },
  ];
  const data = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', type: 'Admin', createdBy: 'Admin User', status: 'block', modulePermission: 'Full Access' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', type: 'User', createdBy: 'Admin User', status: 'active', modulePermission: 'Limited Access' },
    { id: 3, firstName: 'Michael', lastName: 'Johnson', email: 'michael.johnson@example.com', type: 'User', createdBy: 'Super Admin', status: 'block', modulePermission: 'Read Only' },
    // Add more user data as needed
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
      <div className="card-body">
      <DataTable
        columns={columns}
        data={data}
        tableClassName="custom-table"
        onEdit={handleEdit}
        tableName="Modules Permission
"
        onDelete={handleDelete}
      />
      </div>
     
    </div>
  );
};

export default Permissions;
