import React from "react";
import DataTable from "./../../components/Tables/DynamicTable";
import { useNavigate } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import useFormFields from "./../../hook/useFormHook";
import FullscreenModal from "./../../components/Models/FullScreenModel";
import PickDate from './../../components/FormElement/DatePicker';
import TableHeader from './../../components/Tables/TableHeader';

import { useMeQuery } from "../../Redux/api/UserApi";
const ProviderAuditReview = () => {
  const { data: lgData } = useMeQuery();

  const navigate = useNavigate();
  const columns = [
    { header: "S.No", field: "serialNumber" },
    { header: "Review Date", field: "reviewDate" },
    { header: "Individual Name", field: "individualName" },
    { header: "Period Audited", field: "periodAudited" },
    { header: "Conducted By", field: "conductedBy" },
    { header: "Conducted On", field: "conductedOn" },
  ];

  const data = [
    {
      serialNumber: 1,
      reviewDate: "18 Apr 24",
      individualName: "Md Sajib Shikder",
      periodAudited: "March",
      conductedBy: "Anything",
      conductedOn: "Anything",
      billingPermission: "Allowed",
    },
    {
      serialNumber: 1,
      reviewDate: "18 Apr 24",
      individualName: "Md Sajib Shikder",
      periodAudited: "March",
      conductedBy: "Anything",
      conductedOn: "Anything",
      billingPermission: "Allowed",
    },
  ];

  const handleEdit = (rowData) => {
    alert(`Editing ${rowData.firstName} ${rowData.lastName}`);
    // Implement edit logic here
  };

  const handleDelete = (rowData) => {
    alert(`Deleting ${rowData.firstName} ${rowData.lastName}`);
    // Implement delete logic here
  };
  const initialState = {
    reviewDate: "",
    individual: "",
    auditDate: "",
    auditResult: "",
    reviewName: "",
    reviewerSignature: "",
    reviewSignature: "",
    comment: "",
  };

  // Use the custom form hook
  const [formData, handleChange, resetForm, isValid] =
    useFormFields(initialState);
  const handleSubmit = (e) => {
    e.preventDefault();
    // onSave(formData); // Pass form data to parent component for handling (e.g., saving to API)
    resetForm(); // Reset the form after submission
  };

  return (
    <div className="card">

      <TableHeader title="Review Module" className="py-3 pt-5 fs-3 card-header"/>
      <div className="card-body">
        <div className="gap-3 d-flex flex-wrap">
        {lgData?.payload?.user?.curd?.includes("create") &&
          <FullscreenModal
            className="col-md-7"
            title="Add Review"
            onSave={handleSubmit}
            id="reviewmodule"
          >
            <form className="w-100 px-3" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="reviewDate" className="form-label">
                    Review Date
                  </label>
                  <PickDate/>
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
                    {/* Add options for selecting individual */}
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="auditDate" className="form-label">
                    Audit Date
                  </label>
                  <PickDate/>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="auditResult" className="form-label">
                    Audit Result
                  </label>
                  <select
                    id="auditResult"
                    name="auditResult"
                    className="form-select"
                    value={formData.auditResult}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Audit Result</option>
                    <option value="Passed">Passed</option>
                    <option value="Fail">Fail</option>
                    <option value="Review">Review</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="reviewName" className="form-label">
                    Review Name
                  </label>
                  <input
                    type="text"
                    id="reviewName"
                    name="reviewName"
                    className="form-control"
                    value={formData.reviewName}
                    onChange={handleChange}
                    placeholder="Review Name"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="reviewerSignature" className="form-label">
                    Reviewer Signature
                  </label>
                  <input
                    type="text"
                    id="reviewerSignature"
                    name="reviewerSignature"
                    className="form-control"
                    value={formData.reviewerSignature}
                    onChange={handleChange}
                    placeholder="Reviewer Signature"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="reviewSignature" className="form-label">
                    Review Signature
                  </label>
                  <input
                    type="text"
                    id="reviewSignature"
                    name="reviewSignature"
                    className="form-control"
                    value={formData.reviewSignature}
                    onChange={handleChange}
                    placeholder="Review Signature"
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
                    placeholder="Comment"
                  />
                </div>
              </div>
              <div className="d-flex ">
                <button type="submit" className="btn btn-primary">
                  Add Review
                </button>
              </div>
            </form>
          </FullscreenModal>
        }
         {lgData?.payload?.user?.curd?.includes("delete") &&
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
         }
         
          <button
            className="btn btn-secondary waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-report me-sm-1" />{" "}
              <span className="d-none d-sm-inline-block">Reports</span>
            </span>
          </button>
          {lgData?.payload?.user?.curd?.includes("delete") &&
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
          }
           {lgData?.payload?.user?.curd?.includes("delete") &&
          <button
            className="btn btn-info waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-archive me-sm-1" />{" "}
              <span className="d-none d-sm-inline-block">Archive</span>
            </span>
          </button>
           }
          <button
          onClick={()=>navigate("/review-email-log")}
            className="btn btn-danger waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <MdOutlineMail size={22} className="me-1" />{" "}
              <span  className="d-none d-sm-inline-block">Email Records</span>
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

export default ProviderAuditReview;
