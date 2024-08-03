import DataTable from "./../../components/Tables/DynamicTable";
import useFormFields from "./../../hook/useFormHook";
import FullscreenModal from "./../../components/Models/FullScreenModel";
import TableHeader from "./../../components/Tables/TableHeader";
import {
  useCreateSubUserMutation,
  useGetAllSubUsersQuery,
  useUpdateSubUserMutation,
  useDeleteSubUserMutation,
} from "../../Redux/api/SubUserApi.js";
import { useMeQuery } from "../../Redux/api/UserApi.js";
import { useEffect, useState } from "react";
import AuthLoader from "./../../utils/Loaders/AuthLoader";
import EditModal from "./../../components/Models/EditModal";
import swal from "sweetalert";

const SubUsers = () => {
  const [editId, setEditId] = useState("");
  const [
    createSubUser,
    {
      data: createData,
      isLoading: isCreateLoading,
      isSuccess: isCreateSuccess,
      error: createError,
    },
  ] = useCreateSubUserMutation();
  const { data: lgData } = useMeQuery();
  const { data, isLoading, error, refetch } = useGetAllSubUsersQuery();
  console.log(data);
  const [
    updateSubUser,
    { data: updateData, isSuccess: isUpdateSuccess, error: updateError },
  ] = useUpdateSubUserMutation();
  const [show, setShow] = useState(false);
  const [
    deleteSubUser,
    { data: deleteData, isSuccess: isDeleteSuccess, error: deleteError },
  ] = useDeleteSubUserMutation();

  const initialState = {
    gender: "Male",
    firstName: "",
    lastName: "",
    email: "",
    medAdministration: "Yes",
  };

  const [formData, handleChange, setFormData, resetForm] =
    useFormFields(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      updateSubUser({ subUserId: editId, subUserData: formData });
      resetForm();
    } else {
      createSubUser(formData);
      resetForm();
    }
  };

  const columns = [
    { header: "Id", field: "_id" },
    { header: "First Name", field: "firstName" },
    { header: "Gender", field: "gender" },
    { header: "Last Name", field: "lastName" },
    { header: "Email", field: "email" },
    { header: "Created By", field: "createdBy" },
    { header: "Status", field: "status" },
    { header: "Billing Permission", field: "billingPermission" },
  ];

  const handleEdit = (rowData) => {
    setShow(true);
    setEditId(rowData._id);
    setFormData({
      gender: rowData.gender,
      firstName: rowData.firstName,
      lastName: rowData.lastName,
      email: rowData.email,
      medAdministration: rowData.medAdministration,
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
        deleteSubUser(rowData?._id);
      }
    });
  };
  useEffect(() => {
    if (isCreateSuccess) {
      refetch();
      const modalTriggerButton = document.querySelector(
        '[data-bs-dismiss="modal"]'
      );
      if (modalTriggerButton) {
        modalTriggerButton.click();
      }
    }
    if (isDeleteSuccess) {
      refetch();
    }
    if (isUpdateSuccess) {
      refetch();
      setEditId("");
      setShow(false);
    }
  }, [isDeleteSuccess, isCreateSuccess, isUpdateSuccess]);
  if (isLoading) return <AuthLoader />;
  return (
    <div className="card">
      <TableHeader
        title="Manage Sub Users"
        className="py-3 pt-5 fs-3 card-header"
      />
      <div className="card-body">
        {createData?.message && (
          <div className="alert alert-success text-center">
            {createData.message}
          </div>
        )}
        {updateData?.message && (
          <div className="alert alert-success text-center">
            {updateData.message}
          </div>
        )}
        {deleteData?.message && (
          <div className="alert alert-success text-center">
            {deleteData.message}
          </div>
        )}
        {error?.data?.message && (
          <div className="alert alert-danger text-center">
            {error?.data?.message}
          </div>
        )}
        {updateError?.data?.message && (
          <div className="alert alert-danger text-center">
            {updateError?.data?.message}
          </div>
        )}
        {deleteError?.data?.message && (
          <div className="alert alert-danger text-center">
            {deleteError?.data?.message}
          </div>
        )}
        <div className="gap-3 d-flex flex-wrap">
          {lgData?.payload?.user?.curd?.includes("create") && (
            <FullscreenModal id="addnewsubuser" title="Add New Sub-User">
              <form onSubmit={handleSubmit} className="w-100">
                {createError?.data?.message && (
                  <div className="alert alert-danger text-center">
                    {createError?.data.message}
                  </div>
                )}
                <div className="mb-3 w-100">
                  <label htmlFor="gender" className="form-label">
                    Gender <span className="text-danger">*</span>
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    className="form-select"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="form-control"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="form-control"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email Address"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="medAdministration" className="form-label">
                    Med-Administration
                  </label>
                  <select
                    id="medAdministration"
                    name="medAdministration"
                    className="form-select"
                    value={formData.medAdministration}
                    onChange={handleChange}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary me-4">
                  Add New Sub-User
                </button>
              </form>
            </FullscreenModal>
          )}

          {show && (
            <EditModal
              style={{
                minWidth: "70%",
                maxWidth: "70%",
                maxHeight: "80vh",
                overflowY: "scroll",
              }}
              title="Edit sub user"
              show={show}
              onClose={setShow}
            >
              <form onSubmit={handleSubmit} className="w-100">
                <div className="mb-3 w-100">
                  <label htmlFor="gender" className="form-label">
                    Gender <span className="text-danger">*</span>
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    className="form-select"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="form-control"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="form-control"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email Address"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="medAdministration" className="form-label">
                    Med-Administration
                  </label>
                  <select
                    id="medAdministration"
                    name="medAdministration"
                    className="form-select"
                    value={formData.medAdministration}
                    onChange={handleChange}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary me-4">
                  Edit Sub-User
                </button>
              </form>
            </EditModal>
          )}
          {lgData?.payload?.user?.curd?.includes("delete") && (  <button
            className="btn btn-secondary create-new btn-danger waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span>
              <i className="ti ti-trash me-sm-1" />{" "}
              <span className="d-none d-sm-inline-block">
                Delete all selected
              </span>
            </span>
          </button>)}
        
        </div>
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={data?.payload?.subUsers ?? []}
            tableClassName="custom-table"
            onEdit={handleEdit}
            tableName="subUsers"
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default SubUsers;
