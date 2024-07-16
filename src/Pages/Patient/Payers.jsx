import DataTable from "./../../components/Tables/DynamicTable";

import ExportButton from "./../../components/Buttons/ExportButton";
import TableHeader from "./../../components/Tables/TableHeader";
import {
  useGetAllPayersQuery,
  useUpdatePayerMutation,
  useDeletePayerMutation,
} from "../../Redux/api/PayerApi";
import { useNavigate } from "react-router-dom";
import MainLoader from "./../../utils/Loaders/MainLoader";
import React, { useEffect, useState } from "react";
import EditModal from "./../../components/Models/EditModal";
import swal from "sweetalert";
import Template from "./../../components/FormElement/Template";

const Payers = () => {
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useGetAllPayersQuery();
  const [
    updatePayer,
    { data: updateData, isSuccess: isUpdateSuccess, error: updateError },
  ] = useUpdatePayerMutation();
  const [deletePayer, { data: deleteData, isSuccess: isDeleteSuccess }] =
    useDeletePayerMutation();
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState("");
  const columns = [
    { field: "_id", header: "Payer ID/MRN" },
    {
      field: "mbiNumber",
      header: "Medicare Beneficiary Identifier (MBI) Number",
    },
    { field: "hicNumber", header: "Health Insurance Claim (HIC) Number" },
    { field: "medicaidNumber", header: "Medicaid Number" },
    { field: "alternateMedicaidNumber", header: "Alternate Medicaid Number" },
    { field: "primaryInsurance", header: "Primary Insurance" },
    { field: "secondaryInsurance", header: "Secondary Insurance" },
    { field: "tertiaryInsurance", header: "Tertiary Insurance" },
    { field: "payerComments", header: "Payer Comments" },
    { field: "employmentRelated", header: "Employment Related" },
    { field: "autoAccident", header: "Auto Accident" },
    { field: "claimCode", header: "Claim Code" },
    { field: "unableToWorkFrom", header: "Unable to Work From" },
    { field: "unableToWorkTo", header: "Unable to Work To" },
    { field: "hospitalizationStartDate", header: "Hospitalization Start Date" },
    { field: "hospitalizationEndDate", header: "Hospitalization End Date" },
    {
      field: "emergencyTreatmentIndicator",
      header: "Emergency Treatment Indicator",
    },
  ];

  const [template, setTemplate] = useState("");
  const [formData, setFormData] = useState({
    mbiNumber: "",
    hicNumber: "",
    medicaidNumber: "",
    alternateMedicaidNumber: "",
    primaryInsurance: "",
    secondaryInsurance: "",
    tertiaryInsurance: "",
    payerComments: "",
    occurrenceCodes: [
      { code: "", date: "" },
      { code: "", date: "" },
      { code: "", date: "" },
      { code: "", date: "" },
      { code: "", date: "" },
    ],
    occurrenceSpans: [
      { code: "", startDate: "", endDate: "" },
      { code: "", startDate: "", endDate: "" },
      { code: "", startDate: "", endDate: "" },
      { code: "", startDate: "", endDate: "" },
    ],
    conditionCodes: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    employmentRelated: "",
    autoAccident: "",
    claimCode: "",
    unableToWorkFrom: "",
    unableToWorkTo: "",
    hospitalizationStartDate: "",
    hospitalizationEndDate: "",
    emergencyTreatmentIndicator: "",
  });

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    updatePayer({ payerId: editId, payerData: formData });
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
        deletePayer(row._id);
      }
    });
  };
  const handleEdit = (row) => {
    const updatedRow = { ...row };
  
    // Ensure occurrenceSpans dates are formatted correctly
    updatedRow.occurrenceSpans = updatedRow.occurrenceSpans.map(span => ({
      ...span,
      startDate: span.startDate ? new Date(span.startDate).toISOString().substring(0, 10) : "",
      endDate: span.endDate ? new Date(span.endDate).toISOString().substring(0, 10) : "",
    }));
  
    // Ensure occurrenceCodes dates are formatted correctly
    updatedRow.occurrenceCodes = updatedRow.occurrenceCodes.map(span => ({
      ...span,
      date: span.date ? new Date(span.date).toISOString().substring(0, 10) : ""
    }));
  
    // Update other date fields if they exist
    updatedRow.unableToWorkFrom = row.unableToWorkFrom ? new Date(row.unableToWorkFrom).toISOString().substring(0, 10) : "";
    updatedRow.unableToWorkTo = row.unableToWorkTo ? new Date(row.unableToWorkTo).toISOString().substring(0, 10) : "";
    updatedRow.hospitalizationStartDate = row.hospitalizationStartDate ? new Date(row.hospitalizationStartDate).toISOString().substring(0, 10) : "";
    updatedRow.hospitalizationEndDate = row.hospitalizationEndDate ? new Date(row.hospitalizationEndDate).toISOString().substring(0, 10) : "";
    updatedRow.emergencyTreatmentIndicator = row.emergencyTreatmentIndicator ? new Date(row.emergencyTreatmentIndicator).toISOString().substring(0, 10) : "";
  
    setShow(true);
    setEditId(row._id);
    setFormData(updatedRow);
  };
  
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      payerComments:
        prevFormData?.payerComments + template?.value ? template?.value : "",
    }));
  }, [template]);
  useEffect(() => {
    if (isUpdateSuccess) {
      refetch();
      setShow(false);
    }
    if (isDeleteSuccess) {
      refetch();
    }
  }, [isUpdateSuccess,isDeleteSuccess]);
  if (isLoading) return <MainLoader />;

  return (
    <div className="card">
      <TableHeader title="Payer List" className="py-3 pt-5 fs-3 card-header" />
      <div className="card-body">
        <div className="gap-3 d-flex flex-wrap">
          <ExportButton
            orientation="landscape"
            data={data?.data ?? []}
            columns={columns}
            fileName="Payer"
          />
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
            onClick={() => navigate("/create-payers")}
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-archive me-1" />
              <span className="d-none d-sm-inline-block">Add New Payer</span>
            </span>
          </button>
        </div>
        <div className="mt-5">
          {updateData?.message && (
            <div className="text-center alert-success alert">
              {updateData?.message}
            </div>
          )}
          {deleteData?.message && (
            <div className="text-center alert-success alert">
              {deleteData?.message}
            </div>
          )}
        </div>
        {show && (
          <EditModal
            title="Edit payer"
            style={{
              minWidth: "70%",
              maxWidth: "70%",
              maxHeight: "80vh",
              overflowY: "scroll",
            }}
            onClose={setShow}
          >
            <form onSubmit={handleSubmit} className="card">
              <div className="card-body">
                <div className="accordion" id="payerAccordion">
                  {/* Primary Emergency Contact */}

                  {updateError?.data?.message && (
                    <div className="alert alert-close alert-danger text-center">
                      {updateError?.data?.message}
                    </div>
                  )}

                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingPrimary">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapsePrimary"
                        aria-expanded="true"
                        aria-controls="collapsePrimary"
                      >
                        Payer information
                      </button>
                    </h2>
                    <div
                      id="collapsePrimary"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingPrimary"
                      data-bs-parent="#payerAccordion"
                    >
                      <div className="accordion-body py-2">
                        <div className="row g-3">
                          <div className="col-md-6">
                            <label htmlFor="mbiNumber" className="form-label">
                              (M0063) Medicare Beneficiary Identifier (MBI)
                              Number
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="mbiNumber"
                              value={formData.mbiNumber}
                              onChange={(e) =>
                                handleChange("mbiNumber", e.target.value)
                              }
                              placeholder="Enter MBI Number"
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="hicNumber" className="form-label">
                              Health Insurance Claim (HIC) Number
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="hicNumber"
                              value={formData.hicNumber}
                              onChange={(e) =>
                                handleChange("hicNumber", e.target.value)
                              }
                              placeholder="Enter HIC Number"
                            />
                          </div>
                          <div className="col-md-6">
                            <label
                              htmlFor="medicaidNumber"
                              className="form-label"
                            >
                              Medicaid Number{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="medicaidNumber"
                              value={formData.medicaidNumber}
                              onChange={(e) =>
                                handleChange("medicaidNumber", e.target.value)
                              }
                              placeholder="Enter Medicaid Number"
                            />
                          </div>
                          <div className="col-md-6">
                            <label
                              htmlFor="alternateMedicaidNumber"
                              className="form-label"
                            >
                              Alternate Medicaid Number:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="alternateMedicaidNumber"
                              value={formData.alternateMedicaidNumber}
                              onChange={(e) =>
                                handleChange(
                                  "alternateMedicaidNumber",
                                  e.target.value
                                )
                              }
                              placeholder="Enter Alternate Medicaid Number"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Insurance Information */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingInsurance">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseInsurance"
                        aria-expanded="true"
                        aria-controls="collapseInsurance"
                      >
                        Insurance Information
                      </button>
                    </h2>
                    <div
                      id="collapseInsurance"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingInsurance"
                      data-bs-parent="#payerAccordion"
                    >
                      <div className="accordion-body py-2">
                        <div className="row g-3">
                          <div className="col-md-4">
                            <label
                              htmlFor="primaryInsurance"
                              className="form-label"
                            >
                              Primary Insurance{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="primaryInsurance"
                              value={formData.primaryInsurance}
                              onChange={(e) =>
                                handleChange("primaryInsurance", e.target.value)
                              }
                              placeholder="Enter Primary Insurance"
                            />
                          </div>
                          <div className="col-md-4">
                            <label
                              htmlFor="secondaryInsurance"
                              className="form-label"
                            >
                              Secondary Insurance:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="secondaryInsurance"
                              value={formData.secondaryInsurance}
                              onChange={(e) =>
                                handleChange(
                                  "secondaryInsurance",
                                  e.target.value
                                )
                              }
                              placeholder="Enter Secondary Insurance"
                            />
                          </div>
                          <div className="col-md-4">
                            <label
                              htmlFor="tertiaryInsurance"
                              className="form-label"
                            >
                              Tertiary Insurance:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="tertiaryInsurance"
                              value={formData.tertiaryInsurance}
                              onChange={(e) =>
                                handleChange(
                                  "tertiaryInsurance",
                                  e.target.value
                                )
                              }
                              placeholder="Enter Tertiary Insurance"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Payer Comments and Selected Templates */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingPayerComments">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapsePayerComments"
                        aria-expanded="true"
                        aria-controls="collapsePayerComments"
                      >
                        Payer Comments and Selected Templates
                      </button>
                    </h2>
                    <div
                      id="collapsePayerComments"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingPayerComments"
                      data-bs-parent="#payerAccordion"
                    >
                      <div className="accordion-body py-2">
                        <div className="row g-3">
                          <div className="col-md-12">
                            <label className="form-label">
                              Selected Templates:
                            </label>
                            <Template
                               selectedTemplate={template}
                               setSelectedTemplate={setTemplate}
                            />
                          </div>
                          <div className="col-md-12">
                            <label
                              htmlFor="payerComments"
                              className="form-label"
                            >
                              Payer Comments:
                            </label>
                            <textarea
                              className="form-control"
                              id="payerComments"
                              rows="3"
                              value={formData.payerComments}
                              onChange={(e) =>
                                handleChange("payerComments", e.target.value)
                              }
                              placeholder="Enter Payer Comments"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional UB-04 Locators */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingUB04Locators">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseUB04Locators"
                        aria-expanded="true"
                        aria-controls="collapseUB04Locators"
                      >
                        Additional UB-04 Locators
                      </button>
                    </h2>
                    <div
                      id="collapseUB04Locators"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingUB04Locators"
                      data-bs-parent="#payerAccordion"
                    >
                      <div className="accordion-body py-2">
                        <div className="row g-3">
                          <p>(UB-04 Locators 31 - 34) Occurrence Codes</p>
                          {formData?.occurrenceCodes &&
                            formData?.occurrenceCodes?.map((code, index) => (
                              <React.Fragment key={`occurrenceCode-${index}`}>
                                <div className="col-md-6">
                                  <label
                                    htmlFor={`occurrenceCode${index + 1}A`}
                                    className="form-label"
                                  >
                                    {`${31 + Math.floor(index / 2)}${
                                      index % 2 === 0 ? "A" : "B"
                                    } Code:`}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id={`occurrenceCode${index + 1}A`}
                                    value={code.code}
                                    onChange={(e) => {
                                      const newOccurrenceCodes = [
                                        ...formData.occurrenceCodes,
                                      ];
                                      newOccurrenceCodes[index].code =
                                        e.target.value;
                                      setFormData((prevData) => ({
                                        ...prevData,
                                        occurrenceCodes: newOccurrenceCodes,
                                      }));
                                    }}
                                    placeholder={`Enter Code ${
                                      31 + Math.floor(index / 2)
                                    }${index % 2 === 0 ? "A" : "B"}`}
                                  />
                                </div>
                                <div className="col-md-6">
                                  <label
                                    htmlFor={`occurrenceCode${index + 1}ADate`}
                                    className="form-label"
                                  >
                                    {`${31 + Math.floor(index / 2)}${
                                      index % 2 === 0 ? "A" : "B"
                                    } Date:`}
                                  </label>
                                  <input
                                    type="date"
                                    className="form-control"
                                    id={`occurrenceCode${index + 1}ADate`}
                                    value={code.date}
                                    onChange={(e) => {
                                      const newOccurrenceCodes = [
                                        ...formData.occurrenceCodes,
                                      ];
                                      newOccurrenceCodes[index].date =
                                        e.target.value;
                                      setFormData((prevData) => ({
                                        ...prevData,
                                        occurrenceCodes: newOccurrenceCodes,
                                      }));
                                    }}
                                  />
                                </div>
                              </React.Fragment>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* UB-04 Occurrence Spans */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingUB04Spans">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseUB04Spans"
                        aria-expanded="true"
                        aria-controls="collapseUB04Spans"
                      >
                        UB-04 Occurrence Spans
                      </button>
                    </h2>
                    <div
                      id="collapseUB04Spans"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingUB04Spans"
                      data-bs-parent="#payerAccordion"
                    >
                      <div className="accordion-body py-2">
                        <div className="row g-3">
                          <p>(UB-04 Spans 35 - 36) Occurrence Spans</p>
                          {formData?.occurrenceSpans &&
                            formData?.occurrenceSpans?.map((span, index) => (
                              <React.Fragment key={`occurrenceSpan-${index}`}>
                                {console.log(span.code)}
                                <div className="col-md-4">
                                  <label
                                    htmlFor={`occurrenceSpan${index + 1}Code`}
                                    className="form-label"
                                  >
                                    {`${35 + index} Code:`}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id={`occurrenceSpan${index + 1}Code`}
                                    value={span?.code}
                                    onChange={(e) => {
                                      const newOccurrenceSpans = [
                                        ...formData.occurrenceSpans,
                                      ];
                                      newOccurrenceSpans[index].code =
                                        e.target.value;
                                      setFormData((prevData) => ({
                                        ...prevData,
                                        occurrenceSpans: newOccurrenceSpans,
                                      }));
                                    }}
                                    placeholder={`Enter Code ${35 + index}`}
                                  />
                                </div>
                                <div className="col-md-4">
                                  <label
                                    htmlFor={`occurrenceSpan${
                                      index + 1
                                    }StartDate`}
                                    className="form-label"
                                  >
                                    {`${35 + index} Start Date:`}
                                  </label>
                                  <input
                                    type="date"
                                    className="form-control"
                                    id={`occurrenceSpan${index + 1}StartDate`}
                                    value={span?.startDate}
                                    onChange={(e) => {
                                      const newOccurrenceSpans = [
                                        ...formData.occurrenceSpans,
                                      ];
                                      newOccurrenceSpans[index].startDate =
                                        e.target.value;
                                      setFormData((prevData) => ({
                                        ...prevData,
                                        occurrenceSpans: newOccurrenceSpans,
                                      }));
                                    }}
                                  />
                                </div>
                                <div className="col-md-4">
                                  <label
                                    htmlFor={`occurrenceSpan${
                                      index + 1
                                    }EndDate`}
                                    className="form-label"
                                  >
                                    {`${35 + index} End Date:`}
                                  </label>
                                  <input
                                    type="date"
                                    className="form-control"
                                    id={`occurrenceSpan${index + 1}EndDate`}
                                    value={span.endDate}
                                    onChange={(e) => {
                                      const newOccurrenceSpans = [
                                        ...formData.occurrenceSpans,
                                      ];
                                      newOccurrenceSpans[index].endDate =
                                        e.target.value;
                                      setFormData((prevData) => ({
                                        ...prevData,
                                        occurrenceSpans: newOccurrenceSpans,
                                      }));
                                    }}
                                  />
                                </div>
                              </React.Fragment>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Condition Codes */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingConditionCodes">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseConditionCodes"
                        aria-expanded="true"
                        aria-controls="collapseConditionCodes"
                      >
                        Condition Codes
                      </button>
                    </h2>
                    <div
                      id="collapseConditionCodes"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingConditionCodes"
                      data-bs-parent="#payerAccordion"
                    >
                      <div className="accordion-body py-2">
                        <div className="row g-3">
                          {formData?.conditionCodes &&
                            formData?.conditionCodes?.map((code, index) => (
                              <div
                                className="col-md-2"
                                key={`conditionCode-${index}`}
                              >
                                <label
                                  htmlFor={`conditionCode${index + 1}`}
                                  className="form-label"
                                >
                                  Condition Code {index + 1}:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id={`conditionCode${index + 1}`}
                                  value={code}
                                  onChange={(e) => {
                                    const newConditionCodes = [
                                      ...formData.conditionCodes,
                                    ];
                                    newConditionCodes[index] = e.target.value;
                                    setFormData((prevData) => ({
                                      ...prevData,
                                      conditionCodes: newConditionCodes,
                                    }));
                                  }}
                                  placeholder={`Enter Condition Code ${
                                    index + 1
                                  }`}
                                />
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Employment and Auto Accident Information */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingEmploymentAuto">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseEmploymentAuto"
                        aria-expanded="true"
                        aria-controls="collapseEmploymentAuto"
                      >
                        Employment and Auto Accident Information
                      </button>
                    </h2>
                    <div
                      id="collapseEmploymentAuto"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingEmploymentAuto"
                      data-bs-parent="#payerAccordion"
                    >
                      <div className="accordion-body py-2">
                        <div className="row g-3">
                          <div className="col-md-4">
                            <label
                              htmlFor="employmentRelated"
                              className="form-label"
                            >
                              Employment Related:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="employmentRelated"
                              value={formData.employmentRelated}
                              onChange={(e) =>
                                handleChange(
                                  "employmentRelated",
                                  e.target.value
                                )
                              }
                              placeholder="Employment Related"
                            />
                          </div>
                          <div className="col-md-4">
                            <label
                              htmlFor="autoAccident"
                              className="form-label"
                            >
                              Auto Accident:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="autoAccident"
                              value={formData.autoAccident}
                              onChange={(e) =>
                                handleChange("autoAccident", e.target.value)
                              }
                              placeholder="Auto Accident"
                            />
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="claimCode" className="form-label">
                              Claim Code:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="claimCode"
                              value={formData.claimCode}
                              onChange={(e) =>
                                handleChange("claimCode", e.target.value)
                              }
                              placeholder="Claim Code"
                            />
                          </div>
                          <div className="col-md-3">
                            <label
                              htmlFor="unableToWorkFrom"
                              className="form-label"
                            >
                              Unable to Work From:
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              id="unableToWorkFrom"
                              value={formData.unableToWorkFrom}
                              onChange={(e) =>
                                handleChange("unableToWorkFrom", e.target.value)
                              }
                            />
                          </div>
                          <div className="col-md-3">
                            <label
                              htmlFor="unableToWorkTo"
                              className="form-label"
                            >
                              Unable to Work To:
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              id="unableToWorkTo"
                              value={formData.unableToWorkTo}
                              onChange={(e) =>
                                handleChange("unableToWorkTo", e.target.value)
                              }
                            />
                          </div>
                          <div className="col-md-3">
                            <label
                              htmlFor="hospitalizationStartDate"
                              className="form-label"
                            >
                              Hospitalization Start Date:
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              id="hospitalizationStartDate"
                              value={formData.hospitalizationStartDate}
                              onChange={(e) =>
                                handleChange(
                                  "hospitalizationStartDate",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="col-md-3">
                            <label
                              htmlFor="hospitalizationEndDate"
                              className="form-label"
                            >
                              Hospitalization End Date:
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              id="hospitalizationEndDate"
                              value={formData.hospitalizationEndDate}
                              onChange={(e) =>
                                handleChange(
                                  "hospitalizationEndDate",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 my-4 d-flex gap-3">
                      <input
                        type="checkbox"
                        name=""
                        className="form-check-input"
                        id=""
                      />
                      <label htmlFor="">
                        (HCFA-1500 Form Locator 24C) Emergency Treatment
                        Indicator
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 d-flex gap-3 mt-5 gap-2">
                      <button className="btn btn-primary" type="submit">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </EditModal>
        )}
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={data?.data ?? []}
            tableClassName="custom-table"
            tableName="payers"
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default Payers;
