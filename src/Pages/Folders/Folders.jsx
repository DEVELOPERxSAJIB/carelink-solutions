import DataTable from "../../components/Tables/DynamicTable";
import PopupModal from "./../../components/Models/PopupModel";
import TableHeader from "./../../components/Tables/TableHeader";
import useFormFields from "./../../hook/useFormHook";
import { useState, useEffect } from "react";
import EditModal from "./../../components/Models/EditModal";
import Alert from "./../../components/Alert/Alert";
import MainLoader from "./../../utils/Loaders/MainLoader";
import swal from "sweetalert";
import {
  useCreateFolderMutation,
  useGetAllFoldersQuery,
  useUpdateFolderMutation,
  useDeleteFolderMutation,
} from "../../Redux/api/FolderApi";

const Folders = () => {
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(false);
  const [
    createFolder,
    { data: createData, isSuccess: isCreateSuccess, error: createError },
  ] = useCreateFolderMutation();

  const { data, isLoading, refetch } = useGetAllFoldersQuery();
  const [
    updateFolder,
    { data: updateData, isSuccess: isUpdateSuccess, error: updateError },
  ] = useUpdateFolderMutation();
  const [
    deleteFolder,
    {
      data: deleteData,

      isSuccess: isDeleteSuccess,
      error: deleteError,
    },
  ] = useDeleteFolderMutation();
  const columns = [
    { header: "Id", field: "_id" },
    { header: "Folder Name", field: "folderName" },
    { header: "Folder Creator", field: "folderCreator" },
    { header: "Created On", field: "createdAt" },
  ];

  const handleEdit = (row) => {
    setShow(true);
    setEditId(row._id);
    setFormData({ ...row });
    console.log({ ...row });
  };

  const handleDelete = (row) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteFolder(row._id);
      }
    });
  };
  const [formData, handleChange, setFormData, resetForm] = useFormFields();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      updateFolder({ folderId: editId, folderData: formData });
      resetForm();
    } else {
      createFolder(formData);
      resetForm();
    }
  };
  useEffect(() => {
    if (isCreateSuccess) {
      refetch();
    }
    if (isUpdateSuccess) {
      refetch();
      setShow(false);
    }
    if (isDeleteSuccess) {
      refetch();
    }
  }, [isCreateSuccess, isUpdateSuccess, isDeleteSuccess]);
  const message =
    createData?.message || updateData?.message || deleteData?.message;
  const errors =
    createError?.data?.message ||
    updateError?.data?.message ||
    deleteError?.data?.message;
  if (isLoading) return <MainLoader />;
  return (
    <div className="card">
      <TableHeader
        title="Manage Folders"
        className="py-3 pt-5 fs-3 card-header"
      />
      <div className="card-body">
        <Alert message={message} type="success" />
        <div className="gap-3 d-flex flex-wrap">
          <PopupModal title="Add Folder" id="addFolder">
            <Alert message={message} type="success" />
            <Alert message={errors} type="danger" />
            <form onSubmit={handleSubmit} action="">
              <input
                type="text"
                placeholder="folder name"
                className="form-control"
                name="folderName"
                onChange={handleChange}
              />
              <button className="mt-4 btn btn-primary">Save</button>
            </form>
          </PopupModal>
          {show && (
            <EditModal
              onClose={setShow}
              style={{
                minWidth: "70%",
                maxWidth: "70%",
                maxHeight: "80vh",
                overflowY: "scroll",
              }}
            >
              <form onSubmit={handleSubmit} action="">
                <Alert message={errors} type="danger" />
                <input
                  type="text"
                  placeholder="folder name"
                  className="form-control"
                  name="folderName"
                  value={formData?.folderName}
                  onChange={handleChange}
                />
                <button className="mt-4 btn btn-primary">Save</button>
              </form>
            </EditModal>
          )}
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
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={data?.payload?.folders ?? []}
            tableClassName="custom-table"
            onEdit={handleEdit}
            tableName="folders"
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Folders;
