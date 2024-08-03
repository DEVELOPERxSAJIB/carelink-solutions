import { useNavigate } from "react-router-dom";
import DataTable from "../../components/Tables/DynamicTable";
import Accordion from "./../../components/Tables/Accordion";
import TableHeader from "./../../components/Tables/TableHeader";
import FullscreenModal from "./../../components/Models/FullScreenModel";
import useFormFields from "./../../hook/useFormHook";
import {
  useCreateCalendarMutation,
  useDeleteCalendarMutation,
  useGetAllCalendarQuery,
} from "../../Redux/api/CalendarApi";
import { useEffect } from "react";
import MainLoader from "../../utils/Loaders/MainLoader";


const Calendars = () => {
  const { data, isLoading, refetch } = useGetAllCalendarQuery();

  const [createCalendar, { data: createData, error, isSuccess }] =
    useCreateCalendarMutation();

  const [deleteCalendar, { isSuccess: isDeleteSuccess }] =
    useDeleteCalendarMutation();

  const columns = [
    { field: "name", header: "Calendar Name" },
    { field: "owner", header: "Creator" },
    { field: "createdAt", header: "Created On" },
  ];

  const handleEdit = (rowData) => {
    alert(`Editing ${rowData.firstName} ${rowData.lastName}`);
  };

  const handleDelete = (rowData) => {
    deleteCalendar(rowData?._id)
  };


  const initialState = {
    name: "",
    description: "",
  };

  const [formData, handleChange, resetForm, isValid] =
    useFormFields(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    createCalendar(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      resetForm({
        name: "",
        description: "",
      });
    }

    if (isDeleteSuccess) {
      refetch();
    }
  }, [isDeleteSuccess, isSuccess, refetch, resetForm]);

  return (
    <>
      {isLoading && <MainLoader />}
      <div className="card">
        <TableHeader
          title="Manage Calendars"
          className="py-3 pt-5 fs-3 card-header"
        />

        <div className="card-body">
          <div className="gap-3 d-flex flex-wrap">
            <FullscreenModal
              className="col-md-7"
              id="addCalendar"
              title="Add Calendar"
              onSave={handleSubmit}
            >
              <div className="row">
                {createData?.message && (
                  <div className="alert alert-success text-center">
                    {data?.message}
                  </div>
                )}
                {error?.data?.message && (
                  <div className="alert alert-danger text-center">
                    {error?.data?.message}
                  </div>
                )}
              </div>
              <form
                className="w-100 from-scrollbar px-3"
                onSubmit={handleSubmit}
              >
                <div className="row">
                  {/* Calendar Name */}
                  <div className="col-md-12 mb-3">
                    <label htmlFor="calendarName" className="form-label">
                      Calendar Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="calendarName"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Calendar Name"
                    />
                  </div>

                  {/* Calendar Description */}
                  <div className="col-md-12 mb-3">
                    <label htmlFor="calendarDescription" className="form-label">
                      Calendar Description
                    </label>
                    <textarea
                      id="calendarDescription"
                      name="description"
                      className="form-control"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Calendar Description"
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!isValid}
                  >
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
                <span className="d-none d-sm-inline-block">
                  View shared event
                </span>
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
                <span className="d-none d-sm-inline-block">
                  Delete selected
                </span>
              </span>
            </button>
          </div>
          <div className="mt-5">
            <DataTable
              columns={columns}
              data={data?.payload?.calendars ?? []}
              tableName="calendars"
              tableClassName="custom-table"
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendars;
