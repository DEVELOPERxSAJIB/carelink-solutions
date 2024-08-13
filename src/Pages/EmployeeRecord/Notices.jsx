import { useNavigate } from "react-router-dom";
import DataTable from "../../components/Tables/DynamicTable";
import TableHeader from "./../../components/Tables/TableHeader";
import FullscreenModal from "./../../components/Models/FullScreenModel";
import PageHeader from "./../../components/FormElement/PageHeader";
import { useMeQuery } from "../../Redux/api/UserApi";
// Function to get the start and end dates of the current week


const Notices = () => {
  const { data: logData } = useMeQuery();
  const columns = [
    { header: "S.No", field: "serialNumber" },
    { header: "Notice Title", field: "noticeTitle" },
    { header: "Added By", field: "addedBy" },
    { header: "Added On", field: "addedOn" },
    { header: "Read", field: "status", sortable: false }, // Optional column for read status
  ];

  const data = [
    {
      serialNumber: 1,
      noticeTitle: "Important Announcement",
      addedBy: "Admin",
      addedOn: "2024-07-03",
      read: "Yes", // Example read status, can be a checkbox or any indicator
    },
    {
      serialNumber: 2,
      noticeTitle: "Upcoming Event Details",
      addedBy: "Manager",
      addedOn: "2024-07-02",
      read: "No", // Example read status
    },
    // Add more entries as needed
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
      <TableHeader title="Notice" className="py-3 pt-5 fs-3 card-header" />
      <div className="card-body">
        <div className="gap-3 d-flex flex-wrap">
          {logData?.payload?.user?.curd?.includes("create") && (
            <FullscreenModal
              className="col-md-4"
              title="Add Notice"
              id="addNewNotice"
            >
              <form action="" className="w-100">
                <div className="">
                  <PageHeader title="Notice" className="card-header fs-3" />
                  <div className="card-body">
                    <label htmlFor="" className="form-label ">
                      Notice Title
                    </label>
                    <input
                      type="text"
                      className="form-control mb-4"
                      placeholder="title"
                    />
                    <label htmlFor="" className="form-label">
                      Upload Notice{" "}
                      <span className="text-danger">(only pdf is allowed)</span>
                    </label>
                    <input type="file" className="form-control mb-4" />
                    <label htmlFor="" className="form-label">
                      Share Notice With
                    </label>
                    <div>
                      <label htmlFor="" className="form-label d-flex">
                        <input
                          type="radio"
                          name="share_notice"
                          className="form-radio"
                        />
                        All Caregivers
                      </label>
                      <label htmlFor="" className="form-label">
                        <input
                          type="radio"
                          name="share_notice"
                          className="form-radio"
                        />
                        Select Caregivers form the given list
                      </label>
                    </div>
                    <button className="btn btn-primary mt-3">save</button>
                  </div>
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
          <button
            className="btn btn-secondary create-new btn-danger waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-notes me-sm-1" />{" "}
              <span className="d-none d-sm-inline-block">Reports</span>
            </span>
          </button>
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
              className="btn btn-danger waves-effect waves-light"
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
        </div>
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={data}
            tableClassName="custom-table"
            onEdit={handleEdit}
            tableName="notices"
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Notices;
