import React from 'react';
import DataTable from './../../components/Tables/DynamicTable';
import ExportButton from './../../components/Buttons/ExportButton';
import {useNavigate} from "react-router-dom"
// Function to get the start and end dates of the current week
const getCurrentWeekDateRange = () => {
  const now = new Date();
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
  const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', weekday: 'short' };
    return date.toLocaleDateString('en-US', options);
  };

  return {
    start: formatDate(startOfWeek),
    end: formatDate(endOfWeek),
  };
};

const Payroll = () => {
  const { start, end } = getCurrentWeekDateRange();
const navigate = useNavigate()
  const columns = [
    { header: 'S.No', field: 'serialNumber' },
    { header: 'First name', field: 'firstName' },
    { header: 'Last Name', field: 'lastName' },
    { header: 'Hours', field: 'hours' },
    { header: 'Units', field: 'units' },
    { header: 'Miles', field: 'miles' },
    { header: 'Regular Hours', field: 'regularHours' },
    { header: 'Overtime Hours', field: 'overtimeHours' },
  ];

  const data = [
    { serialNumber: 1, firstName: 'John', lastName: 'Doe', hours: 40, units: 10, miles: 50, regularHours: 35, overtimeHours: 5 },
    { serialNumber: 2, firstName: 'Jane', lastName: 'Smith', hours: 38, units: 8, miles: 45, regularHours: 38, overtimeHours: 0 },
    { serialNumber: 3, firstName: 'Jim', lastName: 'Brown', hours: 42, units: 12, miles: 60, regularHours: 37, overtimeHours: 5 },
    // Add more data as needed
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
      <div className="card-header py-3 pt-5 fs-3">
        Employees Payroll Report: {start} To {end}
      </div>
      <div className="card-body">
      <ExportButton/>
      <button onClick={()=>navigate("/employee-earning")} type="button" className="btn btn-primary waves-effect waves-light">
  <span className="ti-xs ti ti-file-dollar me-2" />
  Earning
</button>

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

export default Payroll;
