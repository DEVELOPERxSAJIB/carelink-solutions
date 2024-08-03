import { useNavigate } from "react-router-dom";
import DataTable from "../../components/Tables/DynamicTable";
import TableHeader from "./../../components/Tables/TableHeader";
import FullscreenModal from "./../../components/Models/FullScreenModel";
import useFormFields from "./../../hook/useFormHook";
import MultiSelect from "./../../components/FormElement/MultiSelect";
import { useMeQuery } from "../../Redux/api/UserApi";
const initialState = {
  category: "Male",
  siteName: "",
  individual: "",
};
const Scheduler = () => {
  const { data: logData } = useMeQuery();
  const columns = [
    { header: "S.No", field: "serialNumber" },
    { header: "Site Name", field: "siteName" },
    { header: "Created By", field: "createdBy" },
    { header: "Created On", field: "createdOn" },
  ];

  const data = [
    {
      serialNumber: 1,
      siteName: "Site A",
      createdBy: "Admin",
      createdOn: "2024-07-03",
    },
    {
      serialNumber: 2,
      siteName: "Site B",
      createdBy: "Manager",
      createdOn: "2024-07-02",
    },
    // Add more entries as needed
  ];

  const handleEdit = (rowData) => {
    alert(`Editing ${rowData.siteName} ${rowData.lastName}`);
  };

  const handleDelete = (rowData) => {
    alert(`Deleting ${rowData.siteName} ${rowData.lastName}`);
  };
  const [formData, handleChange, resetForm, isValid] =
    useFormFields(initialState);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    resetForm();
  };

  return (
    <div className="card">
      <TableHeader
        title="Manage Sites"
        className="py-3 pt-5 fs-3 card-header"
      />
      <div className="card-body">
        <div className="gap-3 d-flex flex-wrap">
          {logData?.payload?.user?.curd?.includes("create") && (
            <FullscreenModal
              id="addSite"
              className="col-md-4 "
              title="Add Site"
              onSave={handleSubmit}
            >
              <form
                className="w-100 px-3 from-scrollbar h-75"
                onSubmit={handleSubmit}
              >
                <div className="row">
                  <div className="col-md-12">
                    <label htmlFor="" className="form-label">
                      Select Category <span className="text-danger">*</span>
                    </label>
                    <div className="d-flex gap-3">
                      <label htmlFor="" className="form-label d-flex gap-2">
                        <input
                          name="category"
                          type="radio"
                          className="form-radio"
                        />
                        Individual
                      </label>
                      <label htmlFor="" className="form-label d-flex gap-2">
                        <input
                          name="category"
                          type="radio"
                          className="form-radio"
                        />
                        Group Home
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12 mb-3">
                    <label htmlFor="siteName" className="form-label">
                      Site Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="siteName"
                      name="siteName"
                      className="form-control"
                      value={formData.siteName}
                      onChange={handleChange}
                      placeholder="Site name"
                      required
                    />
                  </div>
                  <div className="col-md-12 mb-3">
                    <label htmlFor="individual" className="form-label">
                      Select Individual <span className="text-danger">*</span>
                    </label>
                    <MultiSelect />
                  </div>
                </div>
                <div className="col-md-12">
                  <label htmlFor="" className="form-label">
                    Maximum hour(s) per day/per week{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <div className="d-flex gap-3">
                    <label htmlFor="" className="form-label d-flex gap-2">
                      <input
                        name="maximumHours"
                        type="radio"
                        className="form-radio"
                      />
                      Per Day
                    </label>
                    <label htmlFor="" className="form-label d-flex gap-2">
                      <input
                        name="maximumHours"
                        type="radio"
                        className="form-radio"
                      />
                      Per Week
                    </label>
                    <label htmlFor="" className="form-label d-flex gap-2">
                      <input
                        name="maximumHours"
                        type="radio"
                        className="form-radio"
                      />
                      Custom
                    </label>
                  </div>
                </div>
                <div className="d-flex justify-content-end mt-5">
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>
            </FullscreenModal>
          )}
          {logData?.payload?.user?.curd?.includes("delete") && (
            <button
              className="btn btn-secondary create-new btn-danger waves-effect waves-light"
              tabIndex={0}
              aria-controls="DataTables_Table_0"
              type="button"
            >
              <span className="d-flex align-items-center">
                <i className="ti ti-trash me-sm-1" />{" "}
                <span className="d-none d-sm-inline-block">
                  Delete selected
                </span>
              </span>
            </button>
          )}
          {logData?.payload?.user?.curd?.includes("delete") && (
            <button
              className="btn btn-warning waves-effect waves-light"
              tabIndex={0}
              aria-controls="DataTables_Table_0"
              type="button"
            >
              <span className="d-flex align-items-center">
                <i className="ti ti-history me-1"></i>{" "}
                <span className="d-none d-sm-inline-block">History</span>
              </span>
            </button>
          )}
          {logData?.payload?.user?.curd?.includes("delete") && (
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
          )}
          <button
            className="btn btn-info waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-notes me-1" />
              <span className="d-none d-sm-inline-block">Reports </span>
            </span>
          </button>
          <button
            className="btn btn-info waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-plus me-1" />
              <span className="d-none d-sm-inline-block">Add shift</span>
            </span>
          </button>
        </div>
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={data}
            tableClassName="custom-table"
            onEdit={handleEdit}
            tableName="scheduler"
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Scheduler;
