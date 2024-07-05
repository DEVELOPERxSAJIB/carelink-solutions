import React from "react";
import DataTable from "./../../components/Tables/DynamicTable";
import TableHeader from './../../components/Tables/TableHeader';

const AssignAllIndividual = () => {
  const columns3 = [
    { field: "id", header: "S.No" },
    { field: "name", header: "Individual" },
    { field: "role", header: "Agency" },
  ];
  const data3 = [
    { id: 1, name: "Abdirahman Mohamed", role: "Agency" },
    { id: 2, name: "Adnan Sidirijal", role: "Agency" },
    { id: 3, name: "Ellott Verrilli", role: "Agency" },
    { id: 4, name: "James Masters", role: "Agency" },
    { id: 5, name: "Keetrah Chandler", role: "Agency" },
    { id: 6, name: "Omer Mohamed", role: "Agency" },
  ];
  return (
    <div className="card">
      <TableHeader title="Assign all individual" className="card-header pb-0"/>
      <div className="card-body">
        <DataTable
          columns={columns3}
          data={data3}
          tableClassName="custom-table"
        />
      </div>
    </div>
  );
};

export default AssignAllIndividual;
