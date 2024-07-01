import DataTable from "./../../components/Tables/DynamicTable";
const EmployeeEarning = () => {
    const columns = [
        { header: 'S.No', field: 'serialNumber' },
        { header: 'Employee Name', field: 'employeeName' },
        { header: 'Date Of Service', field: 'dateOfService' },
        { header: 'Code', field: 'code' },
        { header: 'Earnings', field: 'earnings' },
        { header: 'Clock In', field: 'clockIn' },
        { header: 'Clock Out', field: 'clockOut' },
        { header: 'Total Hours', field: 'totalHours' },
        { header: 'Overtime', field: 'overtime' },
        { header: 'Individual(s)', field: 'individuals' },
      ];
    
      const data = [
        { 
          serialNumber: 1, 
          employeeName: 'John Doe', 
          dateOfService: '2024-06-30', 
          code: 'A123', 
          earnings: '$200', 
          clockIn: '08:00 AM', 
          clockOut: '04:00 PM', 
          totalHours: 8, 
          overtime: 0, 
          individuals: 3, 
        },
        { 
          serialNumber: 2, 
          employeeName: 'Jane Smith', 
          dateOfService: '2024-06-30', 
          code: 'B456', 
          earnings: '$220', 
          clockIn: '09:00 AM', 
          clockOut: '05:00 PM', 
          totalHours: 8, 
          overtime: 0, 
          individuals: 2, 
        },
        { 
          serialNumber: 3, 
          employeeName: 'Jim Brown', 
          dateOfService: '2024-07-01', 
          code: 'C789', 
          earnings: '$250', 
          clockIn: '07:00 AM', 
          clockOut: '03:00 PM', 
          totalHours: 8, 
          overtime: 0, 
          individuals: 4, 
        },
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
      Employee Earning
      </div>
      <div className="card-body">
        <div className="d-flex gap-5 justify-content-between">
            <span className="">Today&apos;s Earning   :   $0.00 </span>
            <span className="">This week total Earning   :   $0.00</span>
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
export default EmployeeEarning;
