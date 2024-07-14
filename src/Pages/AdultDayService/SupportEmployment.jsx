import { useNavigate } from "react-router-dom";
import DataTable from "../../components/Tables/DynamicTable";
import PopupModal from "./../../components/Models/PopupModel";
import MultiSelect from "./../../components/FormElement/MultiSelect";
import useFormFields from "./../../hook/useFormHook";
import FullscreenModal from "./../../components/Models/FullScreenModel";
import TableHeader from './../../components/Tables/TableHeader';

const SupportEmployment = () => {
  const navigate = useNavigate()
  const columns = [
    { header: "S.No", field: "serialNumber" },
    { header: "Service Address 1", field: "serviceAddress1" },
    { header: "Service Address 2", field: "serviceAddress2" },
    { header: "Service City", field: "serviceCity" },
    { header: "Service State", field: "serviceState" },
    { header: "Service Zip Code", field: "serviceZipCode" },
    { header: "Created By", field: "createdBy" },
    { header: "Created On", field: "createdOn" },
  ];

  const data = [
    {
      serialNumber: 1,
      serviceAddress1: "19 dakkhin",
      serviceAddress2: "2 no cross road",
      serviceCity: "Khulna",
      serviceState: "Khulna",
      serviceZipCode: "9100",
      createdBy: "Sajib",
      createdOn: "13 APR 2024",
    },
    {
      serialNumber: 2,
      serviceAddress1: "19 dakkhin",
      serviceAddress2: "2 no cross road",
      serviceCity: "Khulna",
      serviceState: "Khulna",
      serviceZipCode: "9100",
      createdBy: "Sajib",
      createdOn: "13 APR 2024",
    },
    {
      serialNumber: 3,
      serviceAddress1: "19 dakkhin",
      serviceAddress2: "2 no cross road",
      serviceCity: "Khulna",
      serviceState: "Khulna",
      serviceZipCode: "9100",
      createdBy: "Sajib",
      createdOn: "13 APR 2024",
    },

    // Add more rows as needed
  ];

  const handleEdit = (rowData) => {
    alert(`Editing ${rowData.firstName} ${rowData.lastName}`);
    // Implement edit logic here
  };

  const handleDelete = (rowData) => {
    alert(`Deleting ${rowData.firstName} ${rowData.lastName}`);
    // Implement delete logic here
  };
  const handleSubmit = () => {};
  const initialState = {
    individual: "Adnan Sidirijal",
    outcomeDescription: "",
    actionStep: "",
    frequency: "",
    completedBy: "",
    publishNow: false,
    publishLater: false,
    outcomeEndDate: "",
    publishEndDate: "",
  };

  const [formData, handleChange, resetForm] = useFormFields(initialState);

  const handleSubmit2 = (e) => {
    e.preventDefault();
    // Implement your form submission logic here
    console.log("Form Data:", formData);
    resetForm();
  };
  return (
    <div className="card">

      <TableHeader title="Support Employment/Community Employment" className="py-3 pt-5 fs-3 card-header"/>
      <div className="card-body">
        <div className="gap-3 d-flex flex-wrap">
          <PopupModal title="Setup Individual" id="addlistofactivity">
            <form onSubmit={handleSubmit} action="">
              <label className="form-label" htmlFor="">
                Select Individual
              </label>
              <MultiSelect />
              <button className="btn btn-primary mt-4">Save</button>
            </form>
          </PopupModal>
          <button
            className="btn btn-secondary create-new btn-danger waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-trash me-sm-1" />{" "}
              <span className=" d-sm-inline-block">Delete selected</span>
            </span>
          </button>
          <button
            className="btn btn-secondary create-new btn-danger waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-notes me-sm-1" />{" "}
              <span className=" d-sm-inline-block">Reports</span>
            </span>
          </button>
          <button
            className="btn btn-warning waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-history me-1"></i>{" "}
              <span className=" d-sm-inline-block">History</span>
            </span>
          </button>
          <button
            className="btn btn-danger waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-archive me-1" />
              <span className=" d-sm-inline-block">Archive </span>
            </span>
          </button>
          <PopupModal title="Setup" id="setupindividual">
            <form onSubmit={handleSubmit2} action="">
              <label className="form-label" htmlFor="">
                Select Individual
              </label>
              <MultiSelect />
              <button className="btn btn-primary mt-4">Save</button>
            </form>
          </PopupModal>
          <FullscreenModal
            title="Add Outcome"
            id="createoutcomemodal"
            className="col-md-7"
          >
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-12 mb-3">
                  <label className="form-label" htmlFor="individual">
                    Select Individual
                  </label>
                  <select
                    name="individual"
                    className="form-control"
                    id="individual"
                    value={formData.individual}
                    onChange={handleChange}
                    required
                  >
                    <option value="Adnan Sidirijal">Adnan Sidirijal</option>
                    {/* Add more options if necessary */}
                  </select>
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label" htmlFor="outcomeDescription">
                    Outcome Description
                  </label>
                  <input
                    type="text"
                    name="outcomeDescription"
                    placeholder="Outcome Description"
                    className="form-control"
                    id="outcomeDescription"
                    value={formData.outcomeDescription}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label" htmlFor="actionStep">
                    Action Step
                  </label>
                  <input
                    type="text"
                    name="actionStep"
                    placeholder="Action Step"
                    className="form-control"
                    id="actionStep"
                    value={formData.actionStep}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label" htmlFor="frequency">
                    Frequency
                  </label>
                  <select
                    name="frequency"
                    className="form-control"
                    id="frequency"
                    value={formData.frequency}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Frequency</option>
                    {/* Add frequency options here */}
                  </select>
                  <textarea
                    className="form-control mt-2"
                    placeholder="Enter detail..."
                    rows="3"
                  ></textarea>
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label" htmlFor="completedBy">
                    Completed By
                  </label>
                  <select
                    name="completedBy"
                    className="form-control"
                    id="completedBy"
                    value={formData.completedBy}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    {/* Add options here */}
                  </select>
                </div>
                <div className="col-md-12 mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="publish"
                      id="publish"
                      checked={formData.publishNow}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="publish">
                      Publish this support now
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="publish"
                      id="publish"
                      checked={formData.publishLater}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="publish">
                      Publish this support later
                    </label>
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label" htmlFor="outcomeEndDate">
                    Outcome End Date
                  </label>
                  <input
                    type="date"
                    name="outcomeEndDate"
                    className="form-control"
                    id="publish"
                    value={formData.outcomeEndDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label" htmlFor="publishEndDate">
                    Publish End Date
                  </label>
                  <input
                    type="date"
                    name="publishEndDate"
                    className="form-control"
                    id="publishEndDate"
                    value={formData.publishEndDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="d-flex justify-content-end mt-3">
                <button type="submit" className="btn btn-primary">
                  Save Outcome
                </button>
              </div>
            </form>
          </FullscreenModal>
          <button
          onClick={()=>navigate("/view-outcomes")}
            className="btn btn-warning waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-plus me-1" />
              <span className=" d-sm-inline-block">View outcomes</span>
            </span>
          </button>
        </div>
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={data}
            tableClassName="custom-table"
            onEdit={handleEdit}
             tableName="supportEmployment"
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default SupportEmployment;
