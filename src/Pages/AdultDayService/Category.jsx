
import DataTable from "../../components/Tables/DynamicTable";
import FullscreenModal from "./../../components/Models/FullScreenModel";
import useFormFields from './../../hook/useFormHook';
import TableHeader from './../../components/Tables/TableHeader';


const Category = () => {
  const columns = [
    { header: "S.No", field: "serialNumber" },
    { header: "Category Name", field: "categoryName" },
    { header: "Status", field: "status" },
    { header: "Added By", field: "addedBy" },
    { header: "Added On", field: "addedOn" },
  ];

  const data = [
    {
      serialNumber: 1,
      categoryName: "Electronics",
      status: "Active",
      addedBy: "John Doe",
      addedOn: "2024-06-01",
    },
    {
      serialNumber: 2,
      categoryName: "Furniture",
      status: "Inactive",
      addedBy: "Jane Smith",
      addedOn: "2024-06-02",
    },
    {
      serialNumber: 3,
      categoryName: "Clothing",
      status: "Active",
      addedBy: "Alice Johnson",
      addedOn: "2024-06-03",
    },
    {
      serialNumber: 4,
      categoryName: "Books",
      status: "Active",
      addedBy: "Bob Brown",
      addedOn: "2024-06-04",
    },
    {
      serialNumber: 5,
      categoryName: "Toys",
      status: "Inactive",
      addedBy: "Carol White",
      addedOn: "2024-06-05",
    },
  ];

  const handleEdit = (rowData) => {
    alert(`Editing ${rowData.firstName} ${rowData.lastName}`);
  };

  const handleDelete = (rowData) => {
    alert(`Deleting ${rowData.firstName} ${rowData.lastName}`);
  };
  const initialState = {
    categoryName: "",
    status: "",
  };
  const [formData, handleChange, resetForm] = useFormFields(initialState);
const handleSubmit =()=>{}
  return (
    <div className="card">

      <TableHeader title="List Category" className="py-3 pt-5 fs-3 card-header"/>
      <div className="card-body">
        <div className="gap-3 d-flex flex-wrap">
       
   

      <FullscreenModal
  
        title="Add Category"
        id="entercategoryname"
        className="col-md-4"
      >
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-12 mb-5">
              <label className="form-label" htmlFor="categoryName">
                Enter Category Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="categoryName"
                placeholder="enter category name here"
                className="form-control w-100"
                id="categoryName"
                value={formData.categoryName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-12">
              <label className="form-label" htmlFor="status">
                Status <span className="text-danger">*</span>
              </label>
              <select
                name="status"
                className="form-control"
                id="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="">--Select status--</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-3">
            <button type="submit" className="btn btn-primary">
              Save Category
            </button>
          </div>
        </form>
      </FullscreenModal>
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
            data={data}
            tableClassName="custom-table"
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Category;
