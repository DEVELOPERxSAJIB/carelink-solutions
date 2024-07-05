import { useNavigate } from "react-router-dom";
import DataTable from "../../components/Tables/DynamicTable";
import Accordion from './../../components/Tables/Accordion';
import TableHeader from './../../components/Tables/TableHeader';
import FullscreenModal from './../../components/Models/FullScreenModel';
import useFormFields from './../../hook/useFormHook';

// Function to get the start and end dates of the current week
const getCurrentWeekDateRange = () => {
  const now = new Date();
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
  const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
    };
    return date.toLocaleDateString("en-US", options);
  };

  return {
    start: formatDate(startOfWeek),
    end: formatDate(endOfWeek),
  };
};

const Calendars = () => {
  const columns = [
    { field: 'sno', header: 'S.No' },
    { field: 'calendarName', header: 'Calendar Name' },
    { field: 'creator', header: 'Creator' },
    { field: 'createdOn', header: 'Created On' },
  ];
  
  const data = [
    {
      sno: 1,
      calendarName: 'Work Schedule',
      creator: 'John Doe',
      createdOn: '2024-07-01',
    },
    {
      sno: 2,
      calendarName: 'Holiday Planner',
      creator: 'Jane Smith',
      createdOn: '2024-07-02',
    },
    {
      sno: 3,
      calendarName: 'Project Deadlines',
      creator: 'Alice Johnson',
      createdOn: '2024-07-03',
    },
    {
      sno: 4,
      calendarName: 'Team Meetings',
      creator: 'Bob Brown',
      createdOn: '2024-07-04',
    },
    {
      sno: 5,
      calendarName: 'Personal Events',
      creator: 'Carol White',
      createdOn: '2024-07-05',
    },
  ];
  





  const handleEdit = (rowData) => {
    alert(`Editing ${rowData.firstName} ${rowData.lastName}`);
  };

  const handleDelete = (rowData) => {
    alert(`Deleting ${rowData.firstName} ${rowData.lastName}`);
  };
  const initialState = {
    calendarName: "",
    calendarDescription: "",
  };
  
  const [formData, handleChange, resetForm, isValid] = useFormFields(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    // handleSave(formData);
    resetForm();
  };
  return (
    <div className="card">
      <TableHeader title="Manage Calendars" className="py-3 pt-5 fs-3 card-header"/>

      <div className="card-body">
        <div className="gap-3 d-flex flex-wrap">
        <FullscreenModal className="col-md-7" id="addCalendar" title="Add Calendar" onSave={handleSubmit}>
      <form className="w-100 from-scrollbar px-3" onSubmit={handleSubmit}>
        <div className="row">
          {/* Calendar Name */}
          <div className="col-md-12 mb-3">
            <label htmlFor="calendarName" className="form-label">
              Calendar Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="calendarName"
              name="calendarName"
              className="form-control"
              value={formData.calendarName}
              onChange={handleChange}
              placeholder="Calendar Name"
              required
            />
          </div>

          {/* Calendar Description */}
          <div className="col-md-12 mb-3">
            <label htmlFor="calendarDescription" className="form-label">
              Calendar Description
            </label>
            <textarea
              id="calendarDescription"
              name="calendarDescription"
              className="form-control"
              value={formData.calendarDescription}
              onChange={handleChange}
              placeholder="Calendar Description"
            />
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary" disabled={!isValid}>
            Add Calendar
          </button>
        </div>
      </form>
    </FullscreenModal>
          <button
            className="btn btn-sm btn-primary waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-list me-sm-1" />{" "}
              <span className="d-none d-sm-inline-block">View shared event</span>
            </span>
          </button>
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

export default Calendars;

