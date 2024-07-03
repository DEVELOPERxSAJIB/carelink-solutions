import React, { useState } from 'react';

const AttendanceSheet = () => {
  const currentDate = new Date(); // Get current date
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear()); // Current year state
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth() + 1); // Current month state (1-based index)

  // Example data for attendance (can be replaced with actual data)
  const [attendanceData, setAttendanceData] = useState([
    { date: '2024-07-02', status: 'P', individual: 'John Doe', code: '123', county: 'County A', location: 'Location X' },
    { date: '2024-07-03', status: 'A', individual: 'Jane Smith', code: '456', county: 'County B', location: 'Location Y' },
    // Add more data for other months as needed
  ]);

  // State variables for filters
  const [filterIndividual, setFilterIndividual] = useState('');
  const [filterCode, setFilterCode] = useState('');
  const [filterCounty, setFilterCounty] = useState('');
  const [filterLocation, setFilterLocation] = useState('');

  // Status data mapping
  const statusData = {
    P: { colorClass: 'bg-success', text: 'Present' },
    A: { colorClass: 'bg-danger', text: 'Absent' },
    NS: { colorClass: 'bg-warning', text: 'Not Scheduled' },
    C: { colorClass: 'bg-secondary', text: 'Close' },
    PD: { colorClass: 'bg-info', text: 'Partial Day' },
  };

  // Function to render month navigation buttons
  const renderMonthNavigation = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return (
      <div className="text-center mb-4">
        <button
          className="btn btn-danger me-2"
          onClick={() => changeMonth(-1)} // Move to previous month
        >
          Previous
        </button>
        <span>{`${months[currentMonth - 1]} ${currentYear}`}</span>
        <button
          className="btn btn-success ms-2"
          onClick={() => changeMonth(1)} // Move to next month
        >
          Next
        </button>
      </div>
    );
  };

  // Function to change month
  const changeMonth = (increment) => {
    let newMonth = currentMonth + increment;
    let newYear = currentYear;

    if (newMonth === 0) {
      newMonth = 12;
      newYear--;
    } else if (newMonth === 13) {
      newMonth = 1;
      newYear++;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  // Function to render a single day's attendance with colorized status
  const renderDayAttendance = (day) => {
    const dateString = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const entry = attendanceData.find(item => item.date === dateString) || { status: '-' };
    const status = entry.status;

    const { colorClass, text } = statusData[status] || { colorClass: 'bg-light', text: '-' };

    return (
      <td key={day} className={`text-center ${colorClass}`} title={text}>
        {status}
      </td>
    );
  };

  // Function to render all days in the current month with colorized status
  const renderMonthAttendance = () => {
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    const monthDays = [];

    for (let day = 1; day <= daysInMonth; day++) {
      monthDays.push(renderDayAttendance(day));
    }

    return monthDays;
  };

  // Function to count statuses for each day
  const countStatuses = (statusType) => {
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    const statusCounts = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      const count = attendanceData.filter(item => item.date === dateString && item.status === statusType).length;
      statusCounts.push(<td key={`${statusType}-${day}`} className="text-center text-white">{count}</td>);
    }

    return statusCounts;
  };

  // Function to handle filtering
  const handleFilterChange = (event, type) => {
    const value = event.target.value.trim();
    switch (type) {
      case 'individual':
        setFilterIndividual(value);
        break;
      case 'code':
        setFilterCode(value);
        break;
      case 'county':
        setFilterCounty(value);
        break;
      case 'location':
        setFilterLocation(value);
        break;
      default:
        break;
    }
  };

  // Function to render filter inputs
  const renderFilters = () => (
    <div className="row mb-3">
      <div className="col-md-3 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search By Individual"
          value={filterIndividual}
          onChange={(e) => handleFilterChange(e, 'individual')}
        />
      </div>
      <div className="col-md-3 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Select Code"
          value={filterCode}
          onChange={(e) => handleFilterChange(e, 'code')}
        />
      </div>
      <div className="col-md-3 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Select County"
          value={filterCounty}
          onChange={(e) => handleFilterChange(e, 'county')}
        />
      </div>
      <div className="col-md-3 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Select Location"
          value={filterLocation}
          onChange={(e) => handleFilterChange(e, 'location')}
        />
      </div>
    </div>
  );

  // Function to render table headers with week names and day numbers
  const renderTableHeaders = () => {
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    const headers = [];
    const weekNames = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth - 1, day);
      const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });

      headers.push(
        <th key={`day-${day}`} className="text-center">
          {day}
        </th>
      );

      weekNames.push(
        <th key={`week-${day}`} className="text-center">
          {weekday}
        </th>
      );
    }

    return { headers, weekNames };
  };

  return (
    <div className="card mt-4">
      <h2 className="text-center mb-4">Attendance Sheet: {`${currentMonthName(currentMonth)}, ${currentYear}`}</h2>
      <div className="card-body">
        <div className="mb-4">
          {renderMonthNavigation()}
          <button className="btn btn-primary me-2">Reset</button>
        </div>
        {renderFilters()}

        <div className="mt-4">
          <div className="card-header">
            <h4>{`${currentMonthName(currentMonth)} ${currentYear}`}</h4>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table card-datatable table-sm mt-3">
                <thead>
                  <tr>
                    <th>status</th>
                    {renderTableHeaders().weekNames}
                  </tr>
                  <tr>
                    <th></th>
                    {renderTableHeaders().headers}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
                    {renderMonthAttendance()}
                  </tr>
                  <tr className="bg-success text-white">
                    <td className="text-center text-white" colSpan="1">Present</td>
                    {countStatuses('P')}
                  </tr>
                  <tr className="bg-danger text-white">
                    <td className="text-center text-white" colSpan="1">Absent</td>
                    {countStatuses('A')}
                  </tr>
                  <tr className="bg-warning text-white">
                    <td className="text-center text-white" colSpan="1">Not Scheduled</td>
                    {countStatuses('NS')}
                  </tr>
                  <tr className="bg-secondary text-white">
                    <td className="text-center text-white" colSpan="1">Close</td>
                    {countStatuses('C')}
                  </tr>
                  <tr className="bg-info text-white">
                    <td className="text-center text-white" colSpan="1">Partial Day</td>
                    {countStatuses('PD')}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get month name from month number
const currentMonthName = (month) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[month - 1];
};

export default AttendanceSheet;
