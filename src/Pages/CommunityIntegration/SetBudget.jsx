import { useNavigate } from "react-router-dom";
import { FaRegFolder } from "react-icons/fa";
import DataTable from "../../components/Tables/DynamicTable";
import TableHeader from './../../components/Tables/TableHeader';



const SetBudget = () => {
  const columns = [
    { header: "S.No", field: "serialNumber" },
    { header: "Individual", field: "individual" },
    { header: "Assigned Miles", field: "assignedMiles" },
    { header: "Total Miles Used", field: "totalMilesUsed" },
    { header: "Miles Left", field: "milesLeft" },
    { header: "Assigned Hours", field: "assignedHours" },
    { header: "Total Hours Used", field: "totalHoursUsed" },
    { header: "Hours Left", field: "hoursLeft" },
    { header: "Assigned Date", field: "assignedDate" },
  ];

  const data = [
    {
      serialNumber: 1,
      individual: "John Doe",
      assignedMiles: 100,
      totalMilesUsed: 50,
      milesLeft: 50,
      assignedHours: 40,
      totalHoursUsed: 20,
      hoursLeft: 20,
      assignedDate: "2024-01-01",
    },
    {
      serialNumber: 2,
      individual: "Jane Smith",
      assignedMiles: 150,
      totalMilesUsed: 80,
      milesLeft: 70,
      assignedHours: 60,
      totalHoursUsed: 30,
      hoursLeft: 30,
      assignedDate: "2024-01-02",
    },
    {
      serialNumber: 3,
      individual: "Alice Johnson",
      assignedMiles: 120,
      totalMilesUsed: 60,
      milesLeft: 60,
      assignedHours: 50,
      totalHoursUsed: 25,
      hoursLeft: 25,
      assignedDate: "2024-01-03",
    },
    {
      serialNumber: 4,
      individual: "Bob Brown",
      assignedMiles: 200,
      totalMilesUsed: 100,
      milesLeft: 100,
      assignedHours: 80,
      totalHoursUsed: 40,
      hoursLeft: 40,
      assignedDate: "2024-01-04",
    },
    {
      serialNumber: 5,
      individual: "Carol White",
      assignedMiles: 180,
      totalMilesUsed: 90,
      milesLeft: 90,
      assignedHours: 70,
      totalHoursUsed: 35,
      hoursLeft: 35,
      assignedDate: "2024-01-05",
    },
  ];

  const handleEdit = (rowData) => {
    alert(`Editing ${rowData.firstName} ${rowData.lastName}`);
  };

  const handleDelete = (rowData) => {
    alert(`Deleting ${rowData.firstName} ${rowData.lastName}`);
  };

  return (
    <div className="card">

      <TableHeader title="Add Community Budget" className="py-3 pt-5 fs-3 card-header"/>
      <div className="card-body">
        <form action="">
        <div className="row">
          <div className="col-md-6 my-3">
            <label className="form-label" htmlFor="formValidationLang">
              Enter Mileage Budget{" "}
              <span className="text-danger">
                (Per Individual Monthly Mileage budget)
              </span>
            </label>
            <input
              type="text"
              value=""
              className="form-control"
              name="formValidationLang"
              id="formValidationLang"
              placeholder="Enter Mileage Budget"
            />
          </div>
          <div className="col-md-6 my-3">
            <label className="form-label" htmlFor="formValidationLang">
              Enter Service Budget Hours{" "}
              <span className="text-danger">
                (Per Individual Monthly Service Budget Hours)
              </span>
            </label>
            <input
              type="text"
              value=""
              className="form-control"
              name="formValidationLang"
              id="formValidationLang"
              placeholder="Enter Service Budget Hours"
            />
          </div>
          <div className="pt-6">
            <button type="submit" className="btn btn-primary me-4">
              Save
            </button>
            <button type="reset" className="btn btn-label-secondary">
              Cancel
            </button>
          </div>
        </div>
        </form>
        <div className="mt-5">
          <hr />
        <button type="submit" className="btn btn-danger me-4">
              <i className="ti ti-notes mx-2"></i> Report
            </button>
          <DataTable
            columns={columns}
            data={data}
            tableClassName="custom-table"
            onEdit={handleEdit}
            tableName="setBudget"
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default SetBudget;
