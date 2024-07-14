import { useNavigate } from "react-router-dom";
import DataTable from "../../components/Tables/DynamicTable";
import TableHeader from "./../../components/Tables/TableHeader";
import FullscreenModal from "./../../components/Models/FullScreenModel";
import useFormFields from "./../../hook/useFormHook";
import TextEditor from "./../../components/FormElement/TextEditor";

const AddNewTicket = () => {
  const columns = [
    { field: "sno", header: "S.No" },
    { field: "category", header: "Category" },
    { field: "subject", header: "Subject" },
    { field: "createdBy", header: "Created By" },
    { field: "createdOn", header: "Created On" },
    { field: "ticketStatus", header: "Ticket Status" },
  ];

  const data = [
    {
      sno: 1,
      category: "Technical Support",
      subject: "Login Issue",
      createdBy: "John Doe",
      createdOn: "2024-07-01",
      ticketStatus: "Open",
    },
    {
      sno: 2,
      category: "Billing",
      subject: "Invoice Request",
      createdBy: "Jane Smith",
      createdOn: "2024-07-02",
      ticketStatus: "Pending",
    },
    {
      sno: 3,
      category: "Technical Support",
      subject: "Server Down",
      createdBy: "Alice Johnson",
      createdOn: "2024-07-03",
      ticketStatus: "Resolved",
    },
    {
      sno: 4,
      category: "Customer Service",
      subject: "Account Update",
      createdBy: "Bob Brown",
      createdOn: "2024-07-04",
      ticketStatus: "Open",
    },
    {
      sno: 5,
      category: "Sales",
      subject: "Product Inquiry",
      createdBy: "Carol White",
      createdOn: "2024-07-05",
      ticketStatus: "Closed",
    },
  ];

  const handleEdit = (rowData) => {
    alert(`Editing ${rowData.firstName} ${rowData.lastName}`);
  };

  const handleDelete = (rowData) => {
    alert(`Deleting ${rowData.firstName} ${rowData.lastName}`);
  };

  const initialState = {
    category: "",
    ticketSubject: "",
    message: "",
    file: null,
  };
  const [formData, handleChange, resetForm, isValid] =
    useFormFields(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form data
    resetForm();
  };
  return (
    <div className="card">
      <TableHeader
        title="Manage Tickets"
        className="py-3 pt-5 fs-3 card-header"
      />
      <div className="card-body">
        <div className="gap-3 d-flex flex-wrap">
          <FullscreenModal
            className="col-md-7"
            id="addTicket"
            title="Add Ticket"
            onSave={handleSubmit}
          >
            <form className="w-100 from-scrollbar px-3" onSubmit={handleSubmit}>
              <div className="row">
                {/* Category */}
                <div className="col-md-12 mb-3">
                  <label htmlFor="category" className="form-label">
                    Category <span className="text-danger">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="form-select"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    {/* Add more category options here */}
                  </select>
                </div>

                {/* Ticket Subject */}
                <div className="col-md-12 mb-3">
                  <label htmlFor="ticketSubject" className="form-label">
                    Ticket Subject <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="ticketSubject"
                    name="ticketSubject"
                    className="form-control"
                    value={formData.ticketSubject}
                    onChange={handleChange}
                    placeholder="Ticket Subject"
                    required
                  />
                </div>

                {/* Message */}
                <div className="col-md-12 mb-3">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <TextEditor />
                </div>

                {/* File Upload */}
                <div className="col-md-12 mb-3">
                  <label htmlFor="file" className="form-label">
                    Upload file (allowed extension - .png, .jpg, .doc, .pdf)
                  </label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    className="form-control"
                    onChange={handleChange}
                    accept=".png,.jpg,.doc,.pdf"
                  />
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!isValid}
                >
                  Add Ticket
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
        </div>
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={data}
            tableClassName="custom-table"
            onEdit={handleEdit}
            tableName="addNewTicket"
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default AddNewTicket;
