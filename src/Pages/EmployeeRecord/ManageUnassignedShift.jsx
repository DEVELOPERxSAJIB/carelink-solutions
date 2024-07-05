import { useState } from "react";
import DataTable from "./../../components/Tables/DynamicTable";
import PageHeader from './../../components/FormElement/PageHeader';
const ManageUnassignedShift = () => {
  const [individual, setIndividual] = useState("");
  const data = [
    {
      id: 1,
      site: "Site A",
      code: "A1",
      shift: "Morning",
      createdBy: "John Doe",
      createdOn: "2024-07-01",
    },
    {
      id: 2,
      site: "Site B",
      code: "B1",
      shift: "Afternoon",
      createdBy: "Jane Smith",
      createdOn: "2024-07-02",
    },
    {
      id: 3,
      site: "Site C",
      code: "C1",
      shift: "Night",
      createdBy: "Bob Johnson",
      createdOn: "2024-07-03",
    },
    // Add more entries as needed
  ];
  const columns = [
    { header: "S.No", field: "id" },
    { header: "Site", field: "site" },
    { header: "Code", field: "code" },
    { header: "Shift", field: "shift" },
    { header: "Created By", field: "createdBy" },
    { header: "Created On", field: "createdOn" },
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

      <PageHeader title="Manage Unassigned Shift" className="card-header fs-3"/>
      <div className="card-body">
        <div>
         <div className="row">
            <div className="col-md-4">
            <select
            onChange={(e) => setIndividual(e.target.value)}
            name=""
            id=""
            className="form-select"
          >
            <option value="">Search By Individual</option>
            <option value="abc">abc</option>
            <option value="abd">abd</option>
          </select>
            </div>
         </div>
          {individual !== "" && (
            <DataTable
              columns={columns}
              data={data}
              tableClassName="custom-table"
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUnassignedShift;
