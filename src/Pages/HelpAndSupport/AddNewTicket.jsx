import DataTable from "../../components/Tables/DynamicTable";
import TableHeader from "./../../components/Tables/TableHeader";
import FullscreenModal from "./../../components/Models/FullScreenModel";
import TextEditor from "./../../components/FormElement/TextEditor";
import {
  useCreateTicketMutation,
  useDeleteTicketMutation,
  useGetAllTicketsQuery,
} from "../../Redux/api/TicketApi";
import MainLoader from "../../utils/Loaders/MainLoader";
import { useEffect, useState } from "react";
import swal from "sweetalert"

const AddNewTicket = () => {
  const { data, isLoading, refetch } = useGetAllTicketsQuery();

  const [createTicket, { data: createData, isSuccess, error }] =
    useCreateTicketMutation();

  const [deleteTicket, {data : deletedData, isSuccess : deleteSuccess}] = useDeleteTicketMutation()

  const columns = [
    { field: "category", header: "Category" },
    { field: "ticketSubject", header: "Subject" },
    { field: "createdBy", header: "Created By" },
    { field: "createdAt", header: "Created On" },
    { field: "status", header: "Ticket Status" },
  ];

  const handleEdit = (rowData) => {
    alert(`Editing ${rowData.firstName} ${rowData.lastName}`);
  };

  const handleDelete = (rowData) => {
    swal({
      title: "Are you sure?",
      text: "Ticket will be deleted forever",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteTicket(rowData._id)
      }
    });
  };
  const [ticketFile, setTicketFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTicketFile(file);
    }
  };

  // get form data
  const [input, setInput] = useState({
    category: "",
    ticketSubject: "",
    message: "",
  });

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form_data = new FormData();
    form_data.append("category", input.category);
    form_data.append("ticketSubject", input.ticketSubject);
    form_data.append("message", input.message);

    if (ticketFile) {
      form_data.append("ticketFile", ticketFile);
    }

    try {
      const result = await createTicket(form_data);
      if (result.error) {
        console.error("Error creating ticket:", result.error);
      } else {
        console.log("Ticket created successfully:", result.data);
      }
    } catch (error) {
      console.error("Unexpected error creating ticket:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setInput({
        category: "",
        ticketSubject: "",
        message: "",
      });
      setTicketFile(null);
      refetch();
    }

    if(deleteSuccess) {
      refetch();
    }
  }, [deleteSuccess, isSuccess, refetch]);

  return (
    <>
      {isLoading ? (
        <MainLoader />
      ) : (
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
              <div className="row">
                {createData?.message && (
                  <div className="alert alert-success text-center">
                    {createData?.message}
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
                    {/* Category */}
                    <div className="col-md-12 mb-3">
                      <label htmlFor="category" className="form-label">
                        Category <span className="text-danger">*</span>
                      </label>
                      <select
                        id="category"
                        name="category"
                        className="form-select"
                        value={input.category}
                        onChange={handleChange}
                      >
                        <option>Select</option>
                        <option value={"calender"}>Calender</option>
                        <option value={"businessCommunity"}>
                          Business Community
                        </option>
                        <option value={"provider"}>Provider</option>
                        <option value={"folder"}>Folder</option>
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
                        value={input.ticketSubject}
                        onChange={handleChange}
                        placeholder="Ticket Subject"
                      />
                    </div>

                    {/* Message */}
                    <div className="col-md-12 mb-3">
                      <label htmlFor="message" className="form-label">
                        Message
                      </label>
                      <input
                      className="form-control"
                        type="text"
                        name="message"
                        id="message"
                        value={input.message}
                        onChange={handleChange}
                      />
                    </div>

                    {/* File Upload */}
                    <div className="col-md-12 mb-3">
                      <label htmlFor="file" className="form-label">
                        Upload file (allowed extension - .png, .jpg, .doc, .pdf)
                      </label>
                      <input
                        type="file"
                        id="file"
                        name="ticketFile"
                        className="form-control"
                        onChange={handleFileChange}
                        accept=".png,.jpg,.doc,.pdf"
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary">
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
                  <span className="d-none d-sm-inline-block">
                    Delete selected
                  </span>
                </span>
              </button>
            </div>
            <div className="mt-5">
              <DataTable
                columns={columns}
                data={data?.payload?.ticket ?? []}
                tableClassName="custom-table"
                onEdit={handleEdit}
                tableName="addNewTicket"
                onDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddNewTicket;
