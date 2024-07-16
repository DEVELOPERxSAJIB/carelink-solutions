import DataTable from "./../../components/Tables/DynamicTable";
import { useState, useEffect } from "react";
import ExportButton from "./../../components/Buttons/ExportButton";
import TableHeader from "./../../components/Tables/TableHeader";
import {
  useGetAllDirectivesQuery,
  useUpdateDirectiveMutation,
  useDeleteDirectiveMutation,
} from "../../Redux/api/DirectiveApi";
import { useNavigate } from "react-router-dom";
import MainLoader from "./../../utils/Loaders/MainLoader";
import swal from "sweetalert";
import EditModal from "./../../components/Models/EditModal";
import Template from "./../../components/FormElement/Template";
import Alert from "./../../components/Alert/Alert";
const AdvanceDirectives = () => {
  const { data, isLoading, refetch } = useGetAllDirectivesQuery();
  const [
    updateDirective,
    { data: updateData, isSuccess: isUpdateSuccess, error: updateError },
  ] = useUpdateDirectiveMutation();
  const [
    deleteDirective,
    { data: deleteData, isSuccess: isDeleteSuccess, error: deleteError },
  ] = useDeleteDirectiveMutation();
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(false);
  const columns = [
    {
      field: "admission",
      header: "Admission",
    },
    { field: "comment", header: "Comment" },
  ];

  const navigate = useNavigate();

  const [template, setTemplate] = useState("");

  const initialFormData = {
    admission: "No",
    comment: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked
          ? [...prevData[name], value]
          : prevData[name].filter((item) => item !== value),
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateDirective({ directiveId: editId, directiveData: formData });
  };

  useEffect(() => {
    if (template?.value) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        comment: (prevFormData.comment || "") + template.value,
      }));
    }
  }, [template]);
  const handleDelete = (row) => {
    console.log(row);
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteDirective(row._id);
      }
    });
  };
  const handleEdit = (row) => {
    console.log(row);
    setEditId(row._id);
    setShow(true);
    setFormData({ ...row });
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
  const message = updateData?.message || deleteData?.message;
  const errors = updateError?.data?.message || deleteError?.data?.message;
  if (isLoading) return <MainLoader />;

  return (
    <>
      {isLoading ? (
        <MainLoader />
      ) : (
        <div className="card">
          <TableHeader
            title="Advance Care Plan/Admission list"
            className="py-3 pt-5 fs-3 card-header"
          />
          <Alert message={message} type="success" />
          {show && (
            <EditModal
              title="Edit Directive"
              style={{
                minWidth: "70%",
                maxWidth: "70%",
                maxHeight: "90vh",
                overflow: "hidden",
                overflowY: "scroll",
              }}
              onClose={setShow}
            >
              <form onSubmit={handleSubmit} className="card">
                <div className="card-body">
                  <Alert message={errors} type="danger" />
                  <div className="row">
                    <div className="col-md-12">
                      <label htmlFor="admission" className="form-label">
                        Does this patient have an advance care plan or a
                        surrogate decision-maker AND able to provide legal
                        documentation for the home health medical record?
                      </label>
                      <div>
                        <input
                          type="radio"
                          name="admission"
                          id="admissionYes"
                          value="Yes"
                          onChange={handleInputChange}
                          checked={formData.admission === "Yes"}
                        />{" "}
                        Yes
                        <br />
                        <input
                          type="radio"
                          name="admission"
                          id="admissionNo"
                          value="No"
                          onChange={handleInputChange}
                          checked={formData.admission === "No"}
                        />{" "}
                        No
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <label
                        htmlFor="comment"
                        className="form-label d-block my-2"
                      >
                        Comments
                      </label>
                      <Template
                        selectedTemplate={template}
                        setSelectedTemplate={setTemplate}
                      />
                      <textarea
                        className="form-control mt-4"
                        name="comment"
                        cols={10}
                        rows={14}
                        onChange={handleInputChange}
                        value={formData.comment}
                      ></textarea>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="row mt-4">
                    <div className="col-md-12 d-flex gap-3">
                      <button type="submit" className="btn btn-info">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </EditModal>
          )}
          <div className="card-body">
            <div className="gap-3 d-flex flex-wrap">
              <ExportButton
                orientation="landscape"
                data={data?.payload?.directives ?? []}
                columns={columns}
                fileName="Advance Care Plan/Admission"
              />
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
              <button
                className="btn btn-success waves-effect waves-light"
                tabIndex={0}
                aria-controls="DataTables_Table_0"
                type="button"
                onClick={() => navigate("/create-advance-directives")}
              >
                <span className="d-flex align-items-center">
                  <i className="ti ti-archive me-1" />
                  <span className="d-none d-sm-inline-block">
                    Add New advance directives
                  </span>
                </span>
              </button>
            </div>
            <div className="mt-5">
              <DataTable
                columns={columns}
                data={data?.payload?.directives ?? []}
                tableClassName="custom-table"
                tableName="AdvanceDirectives"
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdvanceDirectives;
