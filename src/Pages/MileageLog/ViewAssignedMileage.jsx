
import { FaRegFolder } from "react-icons/fa";
import DataTable from "../../components/Tables/DynamicTable";
import FullscreenModal from "./../../components/Models/FullScreenModel";
import useFormFields from "./../../hook/useFormHook";
import TableHeader from "./../../components/Tables/TableHeader";
import {
  useCreateMileageMutation,
  useGetAllMileagesQuery,
  useUpdateMileageMutation,
  useDeleteMileageMutation,
} from "../../Redux/api/MileageApi.js";
import { useGetAllSubUsersQuery } from "../../Redux/api/SubUserApi.js";
import { useState, useEffect } from "react";
import  swal  from "sweetalert";
import EditModal from "./../../components/Models/EditModal";
import AuthLoader from "./../../utils/Loaders/AuthLoader";
import DatePicker from "react-datepicker";

const ViewAssignedMileage = () => {
  const [editId, setEditId] = useState("");
  const [show, setShow] = useState(false);
  const [date, setDate] = useState("");
  const [
    createMileage,
    { data: createData, isSuccess: isCreateSuccess, error: createError },
  ] = useCreateMileageMutation();
  const { data, isLoading, refetch } = useGetAllMileagesQuery();
  const [
    updateMileage,
    { data: updateData, isSuccess: isUpdateSuccess, error: updateError },
  ] = useUpdateMileageMutation();
  const [
    deleteMileage,
    {
      data: deleteData,
      isSuccess: isDeleteSuccess,
      isLoading: isDeleteLoading,
      error: deleteError,
    },
  ] = useDeleteMileageMutation();
  const { data: subUsers } = useGetAllSubUsersQuery();
  const columns = [
    { header: "Id", field: "_id" },
    { header: "Mileage Period", field: "mileagePeriod" },
    { header: "Total Miles", field: "totalMiles" },
    { header: "Added By", field: "addedBy" },
    { header: "Added On", field: "createdAt" },
  ];

  const handleEdit = (rowData) => {
    setShow(true);
    setEditId(rowData._id);
    setDate(rowData.date);
    setFormData({
      mileageType: rowData.mileageType,
      individual: rowData.individual._id,
      mileagePeriod: rowData.mileagePeriod,
      totalMiles: rowData.totalMiles,
      comment: rowData.comment,
    });
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
        deleteMileage(rowData._id);
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };
  const initialState = {
    date: "07/04/2024",
    mileageType: "",
    individual: "",
    mileagePeriod: "",
    totalMiles: "",
    comment: "",
  };

  const [formData, handleChange, setFormData, resetForm] =
    useFormFields(initialState);

  const handleSubmit = (e) => {
    if (editId) {
      formData.date = date;
      updateMileage({ mileageId: editId, mileageData: formData });
    
    } else {
      formData.date = date;
      setEditId("");
      createMileage(formData);
    }
    e.preventDefault();
    resetForm();
  };
  useEffect(() => {
    if (isCreateSuccess) {
      refetch();
    }
    if (isDeleteSuccess) {
      refetch();
    }
    if (isUpdateSuccess) {
      setEditId("");
      refetch();
      resetForm()
    }
  }, [isCreateSuccess, isDeleteSuccess, isUpdateSuccess]);
  if (isLoading || isDeleteLoading) return <AuthLoader />;
  return (
    <div className="card">
      <TableHeader
        title="Assigned Miles"
        className="py-3 pt-5 fs-3 card-header"
      />
      <div className="card-body">
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

        <div className="gap-3 d-flex flex-wrap">
          <FullscreenModal className="col-md-6"  title="Add Mileage" id="addmileage">
            <form onSubmit={handleSubmit}>
              {createError?.data?.message && (
                <div className="alert alert-danger text-center">
                  {createError?.data?.message}
                </div>
              )}
              {createData?.message && (
                <div className="alert alert-success text-center">
                  {createData.message}
                </div>
              )}

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="date" className="form-label">
                    Date
                  </label>
                  <DatePicker
                    selected={date}
                    className="form-control"
                    onChange={(date) => setDate(date)}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="mileageType" className="form-label">
                    Mileage Type
                  </label>
                  <select
                    id="mileageType"
                    name="mileageType"
                    className="form-select"
                    value={formData.mileageType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Mileage Type</option>
                    <option value="Individual Mileage">
                      Individual Mileage
                    </option>
                    <option value="Share Mileage">Share Mileage</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="individual" className="form-label">
                    Select Individual
                  </label>
                  <select
                    id="individual"
                    name="individual"
                    className="form-select"
                    value={formData.individual}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Individual</option>
                    {subUsers?.payload?.subUsers.map((item, index) => {
                      return (
                        <option key={index} value={item._id}>
                          {item.firstName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="mileagePeriod" className="form-label">
                    Select Mileage Period
                  </label>
                  <select
                    id="mileagePeriod"
                    name="mileagePeriod"
                    className="form-select"
                    value={formData.mileagePeriod}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Mileage Period</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                </div>
                <div className="col-md-12 mb-3">
                  <label htmlFor="totalMiles" className="form-label">
                    Total Miles
                  </label>
                  <input
                    type="text"
                    id="totalMiles"
                    name="totalMiles"
                    className="form-control"
                    value={formData.totalMiles}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label htmlFor="comment" className="form-label">
                    Comment
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    className="form-control"
                    value={formData.comment}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">
                  Add Mileage
                </button>
              </div>
            </form>
          </FullscreenModal>
          {show && (
            <EditModal style={{
              minWidth: "70%",
              maxWidth: "70%",
              maxHeight: "80vh",
              overflowY: "scroll",
            }} title="Edit mileage" onClose={setShow}>
              <form onSubmit={handleSubmit}>
                {updateData?.message && (
                  <div className="alert alert-success text-center">
                    {updateData.message}
                  </div>
                )}

                {updateError?.data?.message && (
                  <div className="alert alert-danger text-center">
                    {updateError?.data?.message}
                  </div>
                )}

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="date" className="form-label">
                      Date
                    </label>
                    <DatePicker
                      selected={date}
                      className="form-control"
                      onChange={(date) => setDate(date)}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="mileageType" className="form-label">
                      Mileage Type
                    </label>
                    <select
                      id="mileageType"
                      name="mileageType"
                      className="form-select"
                      value={formData.mileageType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Mileage Type</option>
                      <option value="Individual Mileage">
                        Individual Mileage
                      </option>
                      <option value="Share Mileage">Share Mileage</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="individual" className="form-label">
                      Select Individual
                    </label>
                    <select
                      id="individual"
                      name="individual"
                      className="form-select"
                      value={formData.individual}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Individual</option>
                      {subUsers?.payload?.subUsers.map((item, index) => {
                        return (
                          <option key={index} value={item._id}>
                            {item.firstName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="mileagePeriod" className="form-label">
                      Select Mileage Period
                    </label>
                    <select
                      id="mileagePeriod"
                      name="mileagePeriod"
                      className="form-select"
                      value={formData.mileagePeriod}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Mileage Period</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Yearly">Yearly</option>
                    </select>
                  </div>
                  <div className="col-md-12 mb-3">
                    <label htmlFor="totalMiles" className="form-label">
                      Total Miles
                    </label>
                    <input
                      type="text"
                      id="totalMiles"
                      name="totalMiles"
                      className="form-control"
                      value={formData.totalMiles}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-12 mb-3">
                    <label htmlFor="comment" className="form-label">
                      Comment
                    </label>
                    <textarea
                      id="comment"
                      name="comment"
                      className="form-control"
                      value={formData.comment}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary">
                    Edit Mileage
                  </button>
                </div>
              </form>
            </EditModal>
          )}
          <button
            className="btn btn-secondary waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-trash me-sm-1" />{" "}
              <span className="d-none d-sm-inline-block">Delete Selected</span>
            </span>
          </button>
          <button
            className="btn btn-warning waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-history me-sm-1" />{" "}
              <span className="d-none d-sm-inline-block">History</span>
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
              <FaRegFolder size={22} className="me-1" />{" "}
              <span className="d-none d-sm-inline-block">Archive</span>
            </span>
          </button>
        </div>
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={data?.payload?.mileages ?? []}
            tableClassName="custom-table"
            onEdit={handleEdit}
            tableName="viewAssignedMileage"
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewAssignedMileage;
