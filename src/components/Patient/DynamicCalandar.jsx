import React from "react";

const generateCalendar = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const calendar = [];

  while (start <= end) {
    const month = start.getMonth();
    const year = start.getFullYear();

    // Get the dates of the current month
    const dates = [];
    while (start.getMonth() === month && start <= end) {
      dates.push(new Date(start));
      start.setDate(start.getDate() + 1);
    }

    calendar.push({
      month: new Date(year, month).toLocaleString("default", {
        month: "long",
        year: "numeric",
      }),
      dates,
    });
  }

  return calendar;
};

const DynamicCalendar = ({
  startDate,
  endDate,
  selectDate,
  setSelectedDate,
  activeDate,
  setActiveDate,
}) => {
  const calendar = generateCalendar(startDate, endDate);
  return (
    <div className="row d-flex">
      {calendar?.map((month, index) => (
        <div
          className={`${
            calendar.length < 3 ? "col-md-6" : "col-md-4"
          } mb-10 text-sm`}
          key={index}
        >
          <h6>{month.month}</h6>
          <table style={{ padding: "2px", fontSize: "10px" }} className="">
            <thead>
              <tr className="border">
                <th className="border p-1">Sunday</th>
                <th className="border p-1">Monday</th>
                <th className="border p-1">Tuesday</th>
                <th className="border p-1">Wednesday</th>
                <th className="border p-1">Thursday</th>
                <th className="border p-1">Friday</th>
                <th className="border p-1">Saturday</th>
              </tr>
            </thead>
            <tbody>
              {generateMonthRows(
                month.dates,
                setSelectedDate,
                selectDate,
                activeDate
              )}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

const generateMonthRows = (dates, setSelectedDate, selectDate, activeDate) => {
  const rows = [];
  let week = new Array(7).fill(null);
  let dayIndex = 0;

  dates.forEach((date) => {
    dayIndex = date.getDay();
    week[dayIndex] = date;

    if (dayIndex === 6) {
      rows.push(week);
      week = new Array(7).fill(null);
    }
  });

  if (week.some((day) => day !== null)) {
    rows.push(week);
  }

  return rows.map((week, index) => (
    <tr className="border" key={index}>
      {week.map((day, i) => (
        <td
          onClick={() =>
            day &&
            setSelectedDate((prev) => [...prev, day?.toLocaleDateString()])
          }
          className={`border p-1 cursor-pointer ${
            (Array.isArray(activeDate) ? activeDate : [activeDate])
              .concat(Array.isArray(selectDate) ? selectDate : [selectDate])
              .includes(day?.toLocaleDateString())
              ? "bg-primary text-white text-center justify-content-center align-items-center"
              : "justify-content-center align-items-center"
          }`}
          key={i}
        >
          {day ? day.getDate() : ""}
        </td>
      ))}
    </tr>
  ));
};

export default DynamicCalendar;
