import { useState, useEffect } from "react";
import DataTable from "./../../components/Tables/DynamicTable";
import { useNavigate } from "react-router-dom";
import TableHeader from "./../../components/Tables/TableHeader";
import EditModal from "./../../components/Models/EditModal";
import AuthLoader from "./../../utils/Loaders/AuthLoader";
import DatePicker from "react-datepicker";
import MultiSelect from "./../../components/FormElement/MultiSelect";
import useFormFields from "./../../hook/useFormHook";
import  swal  from 'sweetalert';
import { useGetAllSubUsersQuery } from "../../Redux/api/SubUserApi.js";
import {
  useGetAllClocksQuery,
  useUpdateClockMutation,
  useDeleteClockMutation,
} from "../../Redux/api/ClockApi";



const ViewLog = () => {
  const { data: subUsers } = useGetAllSubUsersQuery();
  const navigate = useNavigate();
  const [ multiValue,setMultiValue] = useState([]);

  const handleChangeMulti = (selectedOptions) => {
     setMultiValue(selectedOptions);
   };
  const [startDate, setStartDate] = useState(new Date());
  const { data, isLoading, error, refetch } = useGetAllClocksQuery();
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState("");
  const [
    updateClock,
    {
      data: updateData,
      isLoading: isUpdateLoading,
      isSuccess: isUpdateSuccess,
      error: updateError,
    },
  ] = useUpdateClockMutation();
  const [
    deleteClock,
    {
      data: deleteData,
      isLoading: isDeleteLoading,
      isSuccess: isDeleteSuccess,
      error: deleteError,
    },
  ] = useDeleteClockMutation();
  const initialState = {
    dateOfService: "",
    ratioNumerator: null,
    ratioDenominator: null,
    workCode: "",
    startTime: "",
    endTime: "",
    milesUsed: null,
    location: "",
  };

  const [formData, handleChange, setFormData] =
    useFormFields(initialState);

  const columns = [
    { header: "Id", field: "_id" },
    { header: "Date Of Service", field: "dateOfService" },
    { header: "Work Code", field: "workCode" },
    { header: "Start Time", field: "startTime" },
    { header: "End Time", field: "endTime" },
    { header: "Ratio Numerator", field: "ratioNumerator" },
    { header: "Ratio Denominator", field: "ratioDenominator" },
    { header: "Added By", field: "addedBy" },
    { header: "Location", field: "location" },
    { header: "Added On", field: "createdAt" },
  ];
  const handleEdit = (rowData) => {
    setShow(true);
    setEditId(rowData._id);
    setStartDate(rowData.dateOfService);
    setFormData({
      dateOfService: rowData.dateOfService,
      ratioNumerator: rowData.ratioNumerator,
      ratioDenominator: rowData.ratioDenominator,
      workCode: rowData.workCode,
      startTime: rowData.startTime,
      endTime: rowData.endTime,
      milesUsed: rowData.milesUsed,
      location: rowData.location,
    });
setMultiValue(rowData?.individuals?.map((item)=>({value:item._id,label:item.firstName})))    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFormData = {
        ...formData,
        dateOfService: startDate,
      };
      await updateClock({ clockId: editId, clockData: updatedFormData });
    } catch (error) {
      console.error("Error creating clock:", error);
    }
  };

  const handleDelete = (rowData) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
        deleteClock(rowData?._id);
      } else {
        swal("Your imaginary file is safe!");
      }
    });
    
  };
  useEffect(() => {
    if (isUpdateSuccess) {
      refetch();
      setShow(false);
    }
    if (isDeleteSuccess) {
      refetch();
    }
  }, [isUpdateSuccess, isDeleteSuccess]);

  if (isLoading || isUpdateLoading || isDeleteLoading) return <AuthLoader />;
  return (
    <div className="card">
      <TableHeader
        title="Group Time Sheet"
        className="py-3 pt-5 fs-3 card-header"
      />
      

      <div className="card-body">
      {data?.message && (
        <div className="alert alert-success text-center">{data.message}</div>
      )}
      {updateData?.message && (
        <div className="alert alert-success text-center">{updateData.message}</div>
      )}

      {deleteData?.message && (
        <div className="alert alert-success text-center">
          {deleteData.message}
        </div>
      )}

      {deleteError?.data?.message && (
        <div className="alert alert-danger text-center">
          {deleteError?.data?.message}
        </div>
      )}
      {error?.data?.message && (
        <div className="alert alert-danger text-center">
          {error?.data?.message}
        </div>
      )}
        <div className="gap-3 d-flex flex-wrap">
          <button
            className="btn btn-secondary create-new btn-primary waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
            onClick={() => navigate("/clock-in")}
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-plus me-sm-1" />{" "}
              <span className="d-none d-sm-inline-block">Add New</span>
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
          <button
            style={{ background: "#9fd74d", color: "#fff" }}
            className="btn waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-report me-1"></i>{" "}
              <span className="d-none d-sm-inline-block">Reports</span>
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
        </div>
        {show && (
          <EditModal
            show={show}
            onClose={setShow}
            title="Edit Clock in"
            id="clockIn"
          >
            <form onSubmit={handleSubmit} className="card-body">
              <div className="row">
               
                {updateError?.data?.message && (
                  <div className="alert alert-danger text-center">
                    {updateError?.data?.message}
                  </div>
                )}
              </div>
              <div className="row g-6">
                <div className="col-md-6">
                  <label className="form-label" htmlFor="company-name">
                    Date Of Service <span className="text-danger">*</span>
                  </label>
                  <DatePicker
                    className="w-100 form-control"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="formValidationLang">
                    Choose Individual <span className="text-danger">*</span>
                  </label>
                  <MultiSelect

               value={multiValue}
               onChange={handleChangeMulti}
               options={
                  subUsers?.payload?.subUsers.map((item) => ({
                    value: item?._id,
                    label: item?.firstName,
                  })) ?? []
                }
              />
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="formValidationLang">
                    Ratio <span className="text-danger">*</span>
                  </label>
                  <div className=" d-flex gap-5 align-items-center">
                    <input
                      type="number"
                      value={formData?.ratioNumerator}
                      className="form-control"
                      name="ratioNumerator"
                      onChange={handleChange}
                      id="ratioNumerator"
                      placeholder="ratio"
                    />
                    :
                    <input
                      type="number"
                      value={formData?.ratioDenominator}
                      className="form-control"
                      name="ratioDenominator"
                      id="ratioDenominator"
                      onChange={handleChange}
                      placeholder="ratio"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="form-repeater-1-3">
                    Work Code <span className="text-danger">*</span>
                  </label>
                  <select
                    name="workCode"
                    value={formData?.workCode}
                    onChange={handleChange}
                    id="form-repeater-1-3"
                    className="form-select"
                  >
                    <option value="Awake">Awake</option>
                    <option value="OSOC">OSOC</option>
                    <option value="Training">Training</option>
                    <option value="PTO">PTO</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Active">Active</option>
                    <option value="sleep">sleep</option>
                    <option value="other">other</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="formValidationLang">
                    Start Time <span className="text-danger">*</span>
                  </label>
                  <input
                    type="time"
                    value={formData?.startTime}
                    className="form-control"
                    name="startTime"
                    id="startTime"
                    onChange={handleChange}
                    placeholder="time"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="formValidationLang">
                    end Time <span className="text-danger">*</span>
                  </label>
                  <input
                    type="time"
                    value={formData?.endTime}
                    className="form-control"
                    name="endTime"
                    id="endTime"
                    onChange={handleChange}
                    placeholder="time"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="formValidationLang">
                    Miles Used <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData?.milesUsed}
                    className="form-control"
                    onChange={handleChange}
                    name="milesUsed"
                    id="milesUsed"
                    placeholder="0"
                  />
                </div>
                <div className="col-md-12">
                  <label className="form-label" htmlFor="formValidationLang">
                    Location <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData?.location}
                    className="form-control"
                    name="location"
                    id="location"
                    onChange={handleChange}
                    placeholder="location"
                  />
                </div>
              </div>
              <div className="pt-6">
                <button type="submit" className="btn btn-primary me-4">
                  Clock In
                </button>
              </div>
            </form>
          </EditModal>
        )}
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={data?.payload?.clocks ?? []}
            tableClassName="custom-table"
            onEdit={handleEdit}
            tableName="viewLog"
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewLog;
