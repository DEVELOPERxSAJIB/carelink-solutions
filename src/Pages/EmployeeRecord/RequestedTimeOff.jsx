import React, { useState } from 'react';
import DataTable from '../../components/Tables/DynamicTable';
import TableHeader from './../../components/Tables/TableHeader';
import PopupModal from './../../components/Models/PopupModel';
import Calendar from 'react-calendar';

const RequestedTimeOff = () => {
  const columns = [
    { header: 'S.No', field: 'serialNumber' },
    { header: 'Request Number', field: 'requestNumber' },
    { header: 'Employee Name', field: 'employeeName' },
    { header: 'Days/Hours Requested', field: 'daysHoursRequested' },
    { header: 'Reason', field: 'reason' },
    { header: 'Begins On', field: 'beginsOn' },
    { header: 'Ends On', field: 'endsOn' },
    { header: 'Created By', field: 'createdBy' },
    { header: 'Created On', field: 'createdOn' },
    { header: 'Approve Status', field: 'approveStatus' },
  ];

  const data = [
    {
      serialNumber: 1,
      requestNumber: 'REQ001',
      employeeName: 'John Doe',
      daysHoursRequested: '2 days',
      reason: 'Vacation',
      beginsOn: '2024-07-05',
      endsOn: '2024-07-06',
      createdBy: 'Manager',
      createdOn: '2024-07-03',
      approveStatus: 'Pending',
    },
    {
      serialNumber: 2,
      requestNumber: 'REQ002',
      employeeName: 'Jane Smith',
      daysHoursRequested: '8 hours',
      reason: 'Medical Appointment',
      beginsOn: '2024-07-07',
      endsOn: '2024-07-07',
      createdBy: 'HR',
      createdOn: '2024-07-02',
      approveStatus: 'Approved',
    },
    // Add more entries as needed
  ];

  const [selectedEvent, setSelectedEvent] = useState(null); // State to track selected event

  const handleEdit = (rowData) => {
    alert(`Editing ${rowData.employeeName}`);
    // Implement edit logic here
  };

  const handleDelete = (rowData) => {
    alert(`Deleting ${rowData.employeeName}`);
    // Implement delete logic here
  };

  const handleRowClick = (rowData) => {
    setSelectedEvent(rowData); // Set selected event for calendar modal
  };

  const closeCalendarModal = () => {
    setSelectedEvent(null); // Clear selected event when closing modal
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = date.toISOString().split('T')[0];
      const isMarked = data.some(
        (item) => formattedDate >= item.beginsOn && formattedDate <= item.endsOn
      );
      return isMarked && <div className="mark-day" />;
    }
    return null;
  };

  return (
    <div className="card">
      <TableHeader title="Employee Time Off Requests" className="py-3 pt-5 fs-3 card-header" />
      <div className="card-body">
        <div className="gap-3 d-flex flex-wrap">
          <button
            className="btn btn-secondary create-new btn-danger waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-trash me-sm-1" />{' '}
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
              <i className="ti ti-history me-1"></i>{' '}
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
              <span className="d-none d-sm-inline-block">Archive </span>
            </span>
          </button>
          {/* PopupModal for Calendar View */}
            {selectedEvent && (
          <PopupModal title={`Calendar View`} id="calendar-view" onClose={closeCalendarModal}>
              <div className="text-center">
                <Calendar
        
                  value={[new Date(selectedEvent.beginsOn), new Date(selectedEvent.endsOn)]} // Set start and end dates
                  onChange={() => {}} // Placeholder onChange function
                  selectRange // Enable range selection
                  tileContent={tileContent} // Mark days based on time off requests
                />
                <div className="mt-3">

                  <p>Days/Hours Requested: {selectedEvent.daysHoursRequested}</p>
  
                </div>
              </div>
          </PopupModal>
            )}
        </div>
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={data}
            tableClassName="custom-table"
            onEdit={handleEdit}
            onDelete={handleDelete}
            setSelectedEvent={setSelectedEvent} // Handle row click to set selected event
          />
        </div>
      </div>
    </div>
  );
};

export default RequestedTimeOff;
