import DataTable from './../../components/Tables/DynamicTable';

const AgencyInvoice = () => {
  const columns = [
    { header: 'S.No', field: 'serialNumber' },
    { header: 'Invoice No.', field: 'invoiceNumber' },
    { header: 'Billing Period', field: 'billingPeriod' },
    { header: 'Total Individual', field: 'totalIndividual' },
    { header: 'Unit Price(Per Month)', field: 'unitPrice' },
    { header: 'Total', field: 'total' },
    { header: 'Status', field: 'status' },
    { header: 'Created On', field: 'createdAt' },
    { header: 'Due Date', field: 'dueDate' },
  ];

  const data = [
    { serialNumber: 1, invoiceNumber: 'INV-001', billingPeriod: 'June 2024', totalIndividual: 5, unitPrice: '$200', total: '$1000', status: 'Paid', createdAt: '2024-06-01', dueDate: '2024-06-15' },
    { serialNumber: 2, invoiceNumber: 'INV-002', billingPeriod: 'June 2024', totalIndividual: 3, unitPrice: '$150', total: '$450', status: 'Pending', createdAt: '2024-06-05', dueDate: '2024-06-20' },
    { serialNumber: 3, invoiceNumber: 'INV-003', billingPeriod: 'July 2024', totalIndividual: 7, unitPrice: '$180', total: '$1260', status: 'Paid', createdAt: '2024-07-01', dueDate: '2024-07-15' },
    // Add more data as needed
  ];

  const handleEdit = (rowData) => {
    alert(`Editing ${rowData.invoiceNumber}`);
    // Implement edit logic here
  };

  const handleDelete = (rowData) => {
    alert(`Deleting ${rowData.invoiceNumber}`);
    // Implement delete logic here
  };

  return (
    <div>
      <DataTable columns={columns} data={data} tableClassName="custom-table" onEdit={handleEdit} onDelete={handleDelete} tableName="Manage Invoices" /> 
    </div>
  );
};

export default AgencyInvoice;
