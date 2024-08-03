import React, { useState } from "react";
import DataTable from "../../components/Tables/DynamicTable";
import { useNavigate } from "react-router-dom";
import FullscreenModal from "../../components/Models/FullScreenModel";
import TableHeader from '../../components/Tables/TableHeader';
import { useMeQuery } from "../../Redux/api/UserApi";

const ReviewEmailLog = () => {
  const { data: lgData } = useMeQuery();

  const navigate = useNavigate();
  const columns = [
    { field: "id", header: "S.No" },
    { field: "receiverName", header: "Receiver Name" },
    { field: "receiverEmail", header: "Receiver Email" },
    { field: "subject", header: "Subject" },
    { field: "dateCreated", header: "Date Created" },
  ];
  
  const data = [
    {
      id: 1,
      receiverName: "John Doe",
      receiverEmail: "john.doe@example.com",
      subject: "Example Subject 1",
      dateCreated: "2024-07-04",
    },
    {
      id: 2,
      receiverName: "Jane Smith",
      receiverEmail: "jane.smith@example.com",
      subject: "Example Subject 2",
      dateCreated: "2024-07-04",
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
  const [formData, setFormData] = useState({
    gender: "Male",
    firstName: "",
    lastName: "",
    email: "",
    medAdministration: "Yes",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Handle form submission logic here
    console.log("Form data:", formData);
  };
  return (
    <>
      <div className="card">
        <TableHeader title="Review Email Log" className="py-3 pt-5 fs-3 card-header"/>
        <div className="card-body">
          <div className="gap-3 d-flex flex-wrap">
          {lgData?.payload?.user?.curd?.includes("delete") &&
            <button
            className="btn btn-secondary ml-auto create-new btn-danger waves-effect waves-light"
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
            </button>
            }
             {lgData?.payload?.user?.curd?.includes("delete") &&
            <button
              className="btn  ml-auto create-new btn-primary waves-effect waves-light"
              tabIndex={0}
              aria-controls="DataTables_Table_0"
              type="button"
            >
              <span>
                <i className="ti ti-restore me-sm-1" />{" "}
                <span className="d-none d-sm-inline-block">
                  History
                </span>
              </span>
            </button>
             }
              {lgData?.payload?.user?.curd?.includes("delete") &&
              
            <button
              className="btn  ml-auto create-new btn-info waves-effect waves-light"
              tabIndex={0}
              aria-controls="DataTables_Table_0"
              type="button"
            >
              <span>
                <i className="ti ti-trash me-sm-1" />{" "}
                <span className="d-none d-sm-inline-block">
                  Archive
                </span>
              </span>
            </button>
              }
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
    </>
  );
};

export default ReviewEmailLog;

