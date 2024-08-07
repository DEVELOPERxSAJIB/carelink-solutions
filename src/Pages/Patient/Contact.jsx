import DataTable from "./../../components/Tables/DynamicTable";
import { useState, useEffect } from "react";
import CitySelect from "../../components/FormElement/CitySelect";
import StateSelect from "./../../components/FormElement/StateSelect";
import CountySelect from "./../../components/FormElement/CountySelect";
import Template from "./../../components/FormElement/Template";
import ExportButton from "./../../components/Buttons/ExportButton";
import TableHeader from "./../../components/Tables/TableHeader";
import {
  useGetAllContactsQuery,
  useUpdateContactMutation,
  useDeleteContactMutation,
} from "../../Redux/api/Contact";

import { useNavigate } from "react-router-dom";
import MainLoader from "./../../utils/Loaders/MainLoader";
import EditModal from "./../../components/Models/EditModal";
import swal from "sweetalert";
import Alert from "./../../components/Alert/Alert";
import { useMeQuery } from "../../Redux/api/UserApi";
const Contact = () => {
  const { data: logData } = useMeQuery();
  const { data, isLoading, refetch } = useGetAllContactsQuery();
  const [
    updateContact,
    { data: updateData, isSuccess: isUpdateSuccess, error: updateError },
  ] = useUpdateContactMutation();
  const [
    deleteContact,
    { data: deleteData, isSuccess: isDeleteSuccess, error: deleteError },
  ] = useDeleteContactMutation();
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState("");
  const columns = [
    { field: "_id", header: "ID" },
    { field: "representativeContacted", header: "Representative Contacted" },
    {
      field: "legalRepresentativeOption",
      header: "Legal Representative Option",
    },
    {
      field: "patientSelectedRepresentativeOption",
      header: "Patient Selected Representative Option",
    },
    { field: "physicianNotified", header: "Physician Notified" },
    { field: "patientNotified", header: "Patient Notified" },
    { field: "doNotContactCAHPS", header: "Do Not Contact CAHPS" },
    { field: "reasonForNoContact", header: "Reason for No Contact" },
    { field: "otherReason", header: "Other Reason" },
    { field: "alternateCAHPSContact", header: "Alternate CAHPS Contact" },
    { field: "comments", header: "Comments" },
    { field: "createdAt", header: "Created At" },
  ];
  const [formData, setFormData] = useState({
    representativeContacted: "",
    legalRepresentativeOption: "",
    patientSelectedRepresentativeOption: "",
    otherDetails: "",
    physicianNotified: false,
    patientNotified: false,
    previousField1: "",
    previousField2: "",
    doNotContactCAHPS: false,
    reasonForNoContact: "",
    otherReason: "",
    alternateCAHPSContact: false,
    alternateCAHPSContactDetails: {
      sameAsPrimaryEmergencyContact: false,
      firstName: "",
      lastName: "",
      relationship: "",
      mobilePhone: "",
      alternatePhone: "",
      email: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zip: "",
      county: "",
    },
  });
  const [emergencyContacts, setEmergencyContacts] = useState({
    primary: {
      firstName: "",
      lastName: "",
      mobilePhone: "",
      alternatePhone: "",
      relationship: "",
      email: "",
      representative: "Legal Representative",
      sameAsPatientAddress: false,
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zip: "",
    },
    additional: [
      {
        firstName: "",
        lastName: "",
        mobilePhone: "",
        alternatePhone: "",
        relationship: "",
        email: "",
        representative: "Legal Representative",
        sameAsPatientAddress: false,
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        zip: "",
      },
    ],
  });

  const [primaryCity, setPrimaryCity] = useState("");
  const [primaryState, setPrimaryState] = useState("");
  const [additionalCity, setAdditionalCity] = useState("");
  const [additionalState, setAdditionalState] = useState("");
  const [CAHPSCity, setCAHPSCity] = useState("");
  const [CAHPSState, setCAHPSState] = useState("");
  const [CAHPSCounty, setCAHPSCounty] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [comments, setComments] = useState("");
  const [remainingCharacters, setRemainingCharacters] = useState(2000);

  const handleChange = (type, field, value, index) => {
    if (type === "additional") {
      const updatedAdditional = [...emergencyContacts.additional];
      updatedAdditional[index] = {
        ...updatedAdditional[index],
        [field]: value,
        city: additionalCity,
        state: additionalState,
      };
      setEmergencyContacts({
        ...emergencyContacts,
        additional: updatedAdditional,
      });
    } else {
      setEmergencyContacts({
        ...emergencyContacts,
        [type]: {
          ...emergencyContacts[type],
          [field]: value,
          city: primaryCity,
          state: primaryState,
        },
      });
    }
  };

  const addAdditionalContact = () => {
    setEmergencyContacts({
      ...emergencyContacts,
      additional: [
        ...emergencyContacts.additional,
        {
          firstName: "",
          lastName: "",
          mobilePhone: "",
          alternatePhone: "",
          relationship: "",
          email: "",
          representative: "Legal Representative",
          sameAsPatientAddress: false,
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          zip: "",
        },
      ],
    });
  };

  const removeAdditionalContact = (index) => {
    const updatedAdditional = [...emergencyContacts.additional];
    updatedAdditional.splice(index, 1);
    setEmergencyContacts({
      ...emergencyContacts,
      additional: updatedAdditional,
    });
  };
  const handleFormChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleCheckboxChange = (field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: !prevData[field],
    }));
  };

  const handleFieldChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleAlternateCAHPSContactChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      alternateCAHPSContactDetails: {
        ...prevData.alternateCAHPSContactDetails,
        [field]: value,
        city: CAHPSCity,
        state: CAHPSCity,
        county: CAHPSCounty,
      },
    }));
  };

  const handleCommentsChange = (e) => {
    const text = e.target.value;
    setComments(text);
    setRemainingCharacters(2000 - text.length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const contactData = {
        ...formData,
        alternateCAHPSContactDetails: {
          ...formData.alternateCAHPSContactDetails,
          city: CAHPSCity,
          state: CAHPSState,
          county: CAHPSCounty,
        },
        emergencyContacts: {
          primary: {
            ...emergencyContacts.primary,
            city: primaryCity,
            state: primaryState,
          },
          additional: emergencyContacts.additional.map((contact) => ({
            ...contact,
            city: additionalCity,
            state: additionalState,
          })),
        },
        selectedTemplate,
        comments,
        remainingCharacters,
      };
      //console.log(contactData);
      updateContact({ contactId: editId, contactData });
    } catch (error) {
      console.error("Error creating contact:", error);
    }
  };
  useEffect(() => {
    setComments((prev) =>
      prev ? prev + selectedTemplate?.value : selectedTemplate?.value
    );
  }, [selectedTemplate]);
  const navigate = useNavigate();
  const handleEdit = (row) => {
    //console.log(row);
    setShow(true);
    setEditId(row._id);
    setFormData({
      representativeContacted: row.representativeContacted || "",
      legalRepresentativeOption: row.legalRepresentativeOption || "",
      patientSelectedRepresentativeOption:
        row.patientSelectedRepresentativeOption || "",
      otherDetails: row.otherDetails || "",
      physicianNotified: row.physicianNotified || false,
      patientNotified: row.patientNotified || false,
      previousField1: row.previousField1 || "",
      previousField2: row.previousField2 || "",
      doNotContactCAHPS: row.doNotContactCAHPS || false,
      reasonForNoContact: row.reasonForNoContact || "",
      otherReason: row.otherReason || "",
      alternateCAHPSContact: row.alternateCAHPSContact || false,
      alternateCAHPSContactDetails: {
        sameAsPrimaryEmergencyContact:
          row.alternateCAHPSContactDetails?.sameAsPrimaryEmergencyContact ||
          false,
        firstName: row.alternateCAHPSContactDetails?.firstName || "",
        lastName: row.alternateCAHPSContactDetails?.lastName || "",
        relationship: row.alternateCAHPSContactDetails?.relationship || "",
        mobilePhone: row.alternateCAHPSContactDetails?.mobilePhone || "",
        alternatePhone: row.alternateCAHPSContactDetails?.alternatePhone || "",
        email: row.alternateCAHPSContactDetails?.email || "",
        addressLine1: row.alternateCAHPSContactDetails?.addressLine1 || "",
        addressLine2: row.alternateCAHPSContactDetails?.addressLine2 || "",
        city: row.alternateCAHPSContactDetails?.city || "",
        state: row.alternateCAHPSContactDetails?.state || "",
        zip: row.alternateCAHPSContactDetails?.zip || "",
        county: row.alternateCAHPSContactDetails?.county || "",
      },
    });
    setEmergencyContacts({
      primary: {
        firstName: row.emergencyContacts?.primary?.firstName || "",
        lastName: row.emergencyContacts?.primary?.lastName || "",
        mobilePhone: row.emergencyContacts?.primary?.mobilePhone || "",
        alternatePhone: row.emergencyContacts?.primary?.alternatePhone || "",
        relationship: row.emergencyContacts?.primary?.relationship || "",
        email: row.emergencyContacts?.primary?.email || "",
        representative:
          row.emergencyContacts?.primary?.representative ||
          "Legal Representative",
        sameAsPatientAddress:
          row.emergencyContacts?.primary?.sameAsPatientAddress || false,
        addressLine1: row.emergencyContacts?.primary?.addressLine1 || "",
        addressLine2: row.emergencyContacts?.primary?.addressLine2 || "",
        city: row.emergencyContacts?.primary?.city || "",
        state: row.emergencyContacts?.primary?.state || "",
        zip: row.emergencyContacts?.primary?.zip || "",
      },
      additional:
        row.emergencyContacts?.additional?.map((contact) => ({
          firstName: contact.firstName || "",
          lastName: contact.lastName || "",
          mobilePhone: contact.mobilePhone || "",
          alternatePhone: contact.alternatePhone || "",
          relationship: contact.relationship || "",
          email: contact.email || "",
          representative: contact.representative || "Legal Representative",
          sameAsPatientAddress: contact.sameAsPatientAddress || false,
          addressLine1: contact.addressLine1 || "",
          addressLine2: contact.addressLine2 || "",
          city: contact.city || "",
          state: contact.state || "",
          zip: contact.zip || "",
        })) || [],
    });
    setPrimaryCity(row.emergencyContacts?.primary?.city || "");
    setPrimaryState(row.emergencyContacts?.primary?.state || "");
    setAdditionalCity(row.emergencyContacts?.additional?.[0]?.city || "");
    setAdditionalState(row.emergencyContacts?.additional?.[0]?.state || "");
    setCAHPSCity(row.alternateCAHPSContactDetails?.city || "");
    setCAHPSState(row.alternateCAHPSContactDetails?.state || "");
    setCAHPSCounty(row.alternateCAHPSContactDetails?.county || "");
    setSelectedTemplate(row.selectedTemplate || "");
    setComments(row.comments || "");
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
        deleteContact(row._id);
      }
    });
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
    <div className="card">
      <TableHeader
        title="Contact List"
        className="py-3 pt-5 fs-3 card-header"
      />
      <div className="card-body">
        <Alert message={message} type="success" />

        <div className="gap-3 d-flex flex-wrap">
          <ExportButton
            data={data?.payload?.contacts ?? []}
            orientation="landscape"
            columns={columns}
            fileName="Patient"
          />
            {logData?.payload?.user?.curd?.includes("delete") &&
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
  {logData?.payload?.user?.curd?.includes("delete") &&
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
  }
    {logData?.payload?.user?.curd?.includes("create") &&
          <button
            className="btn btn-success waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
            onClick={() => navigate("/create-contacts")}
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-archive me-1" />
              <span className="d-none d-sm-inline-block">Add New Contact</span>
            </span>
          </button>
    }
        </div>
        {show && (
          <EditModal
            style={{
              minWidth: "70%",
              maxWidth: "70%",
              maxHeight: "80vh",
              overflowY: "scroll",
            }}
            onClose={setShow}
            title="Edit contact"
          >
            <form onSubmit={handleSubmit} className="card">
              <Alert message={errors} type="danger" />
              <div className="card-body">
                <div className="accordion" id="emergencyContactsAccordion">
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
                        Primary Emergency Contact
                      </button>
                    </h2>
                    <div
                      id="collapsePrimary"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingPrimary"
                      data-bs-parent="#emergencyContactsAccordion"
                    >
                      <div className="accordion-body py-2">
                        <div className="row g-3">
                          <div className="col-md-6">
                            <label
                              htmlFor="primaryFirstName"
                              className="form-label"
                            >
                              First Name:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="primaryFirstName"
                              value={emergencyContacts.primary.firstName}
                              onChange={(e) =>
                                handleChange(
                                  "primary",
                                  "firstName",
                                  e.target.value
                                )
                              }
                              placeholder="Enter First Name"
                            />
                          </div>
                          <div className="col-md-6">
                            <label
                              htmlFor="primaryLastName"
                              className="form-label"
                            >
                              Last Name:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="primaryLastName"
                              value={emergencyContacts.primary.lastName}
                              onChange={(e) =>
                                handleChange(
                                  "primary",
                                  "lastName",
                                  e.target.value
                                )
                              }
                              placeholder="Enter Last Name"
                            />
                          </div>
                          <div className="col-md-6">
                            <label
                              htmlFor="primaryMobilePhone"
                              className="form-label"
                            >
                              Mobile Phone:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="primaryMobilePhone"
                              value={emergencyContacts.primary.mobilePhone}
                              onChange={(e) =>
                                handleChange(
                                  "primary",
                                  "mobilePhone",
                                  e.target.value
                                )
                              }
                              placeholder="Enter Mobile Phone"
                            />
                          </div>
                          <div className="col-md-6">
                            <label
                              htmlFor="primaryAlternatePhone"
                              className="form-label"
                            >
                              Alternate Phone:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="primaryAlternatePhone"
                              value={emergencyContacts.primary.alternatePhone}
                              onChange={(e) =>
                                handleChange(
                                  "primary",
                                  "alternatePhone",
                                  e.target.value
                                )
                              }
                              placeholder="Enter Alternate Phone"
                            />
                          </div>
                          <div className="col-md-6">
                            <label
                              htmlFor="primaryRelationship"
                              className="form-label"
                            >
                              Relationship:
                            </label>
                            <select
                              className="form-select"
                              id="personalRelationship"
                              value={emergencyContacts.primary.relationship}
                              onChange={(e) =>
                                handleChange(
                                  "primary",
                                  "relationship",
                                  e.target.value
                                )
                              }
                            >
                              <option value="">Select Relationship</option>
                              <option value="Spouse">Spouse</option>
                              <option value="Parent">Parent</option>
                              <option value="Sibling">Sibling</option>
                              <option value="Child">Child</option>
                              <option value="Relative">Relative</option>
                              <option value="Friend">Friend</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          <div className="col-md-6">
                            <label
                              htmlFor="primaryEmail"
                              className="form-label"
                            >
                              Email:
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id="primaryEmail"
                              value={emergencyContacts.primary.email}
                              onChange={(e) =>
                                handleChange("primary", "email", e.target.value)
                              }
                              placeholder="Enter Email Address"
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">
                              Representative:
                            </label>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="primaryRepresentative"
                                id="primaryLegalRep"
                                value="Legal Representative"
                                checked={
                                  emergencyContacts.primary.representative ===
                                  "Legal Representative"
                                }
                                onChange={(e) =>
                                  handleChange(
                                    "primary",
                                    "representative",
                                    e.target.value
                                  )
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="primaryLegalRep"
                              >
                                Legal Representative
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="primaryRepresentative"
                                id="primaryPatientRep"
                                value="Patient Selected Representative"
                                checked={
                                  emergencyContacts.primary.representative ===
                                  "Patient Selected Representative"
                                }
                                onChange={(e) =>
                                  handleChange(
                                    "primary",
                                    "representative",
                                    e.target.value
                                  )
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="primaryPatientRep"
                              >
                                Patient Selected Representative
                              </label>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="primarySameAsPatientAddress"
                                checked={
                                  emergencyContacts.primary.sameAsPatientAddress
                                }
                                onChange={(e) =>
                                  handleChange(
                                    "primary",
                                    "sameAsPatientAddress",
                                    e.target.checked
                                  )
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="primarySameAsPatientAddress"
                              >
                                Same as Patient Address
                              </label>
                            </div>
                          </div>
                          {!emergencyContacts.primary.sameAsPatientAddress && (
                            <>
                              <div className="col-md-6">
                                <label
                                  htmlFor="primaryAddressLine1"
                                  className="form-label"
                                >
                                  Address Line 1:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="primaryAddressLine1"
                                  value={emergencyContacts.primary.addressLine1}
                                  onChange={(e) =>
                                    handleChange(
                                      "primary",
                                      "addressLine1",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter Address Line 1"
                                />
                              </div>
                              <div className="col-md-6">
                                <label
                                  htmlFor="primaryAddressLine2"
                                  className="form-label"
                                >
                                  Address Line 2:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="primaryAddressLine2"
                                  value={emergencyContacts.primary.addressLine2}
                                  onChange={(e) =>
                                    handleChange(
                                      "primary",
                                      "addressLine2",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter Address Line 2"
                                />
                              </div>
                              <div className="col-md-6">
                                <label
                                  htmlFor="primaryCity"
                                  className="form-label"
                                >
                                  City:
                                </label>
                                <CitySelect
                                  stateCode={primaryState}
                                  selectedCity={primaryCity}
                                  setSelectedCity={setPrimaryCity}
                                />
                              </div>
                              <div className="col-md-6">
                                <label
                                  htmlFor="primaryState"
                                  className="form-label"
                                >
                                  State:
                                </label>
                                <StateSelect
                                  selectedState={primaryState}
                                  setSelectedState={setPrimaryState}
                                />
                              </div>
                              <div className="col-md-6">
                                <label
                                  htmlFor="primaryZip"
                                  className="form-label"
                                >
                                  ZIP:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="primaryZip"
                                  value={emergencyContacts.primary.zip}
                                  onChange={(e) =>
                                    handleChange(
                                      "primary",
                                      "zip",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter ZIP"
                                />
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Emergency Contacts */}
                  {emergencyContacts.additional.map((contact, index) => (
                    <div
                      key={`additionalContact-${index}`}
                      className="accordion-item"
                    >
                      <h2
                        className="accordion-header"
                        id={`additionalHeading-${index}`}
                      >
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#additionalCollapse-${index}`}
                          aria-expanded="false"
                          aria-controls={`additionalCollapse-${index}`}
                        >
                          Additional Emergency Contact
                        </button>
                        {index > 0 && (
                          <button
                            type="button"
                            className="btn btn-sm btn-danger ms-2"
                            onClick={() => removeAdditionalContact(index)}
                          >
                            Remove
                          </button>
                        )}
                      </h2>
                      <div
                        id={`additionalCollapse-${index}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`additionalHeading-${index}`}
                        data-bs-parent="#emergencyContactsAccordion"
                      >
                        <div className="accordion-body py-2">
                          <div className="row g-3">
                            <div className="col-md-6">
                              <label
                                htmlFor={`additionalFirstName-${index}`}
                                className="form-label"
                              >
                                First Name:
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id={`additionalFirstName-${index}`}
                                value={contact.firstName}
                                onChange={(e) =>
                                  handleChange(
                                    "additional",
                                    "firstName",
                                    e.target.value,
                                    index
                                  )
                                }
                                placeholder="Enter First Name"
                              />
                            </div>
                            <div className="col-md-6">
                              <label
                                htmlFor={`additionalLastName-${index}`}
                                className="form-label"
                              >
                                Last Name:
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id={`additionalLastName-${index}`}
                                value={contact.lastName}
                                onChange={(e) =>
                                  handleChange(
                                    "additional",
                                    "lastName",
                                    e.target.value,
                                    index
                                  )
                                }
                                placeholder="Enter Last Name"
                              />
                            </div>
                            <div className="col-md-6">
                              <label
                                htmlFor={`additionalMobilePhone-${index}`}
                                className="form-label"
                              >
                                Mobile Phone:
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id={`additionalMobilePhone-${index}`}
                                value={contact.mobilePhone}
                                onChange={(e) =>
                                  handleChange(
                                    "additional",
                                    "mobilePhone",
                                    e.target.value,
                                    index
                                  )
                                }
                                placeholder="Enter Mobile Phone"
                              />
                            </div>
                            <div className="col-md-6">
                              <label
                                htmlFor={`additionalAlternatePhone-${index}`}
                                className="form-label"
                              >
                                Alternate Phone:
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id={`additionalAlternatePhone-${index}`}
                                value={contact.alternatePhone}
                                onChange={(e) =>
                                  handleChange(
                                    "additional",
                                    "alternatePhone",
                                    e.target.value,
                                    index
                                  )
                                }
                                placeholder="Enter Alternate Phone"
                              />
                            </div>
                            <div className="col-md-6">
                              <label
                                htmlFor={`additionalRelationship-${index}`}
                                className="form-label"
                              >
                                Relationship:
                              </label>

                              <select
                                className="form-select"
                                id={`additionalRelationship-${index}`}
                                value={contact.relationship}
                                onChange={(e) =>
                                  handleChange(
                                    "additional",
                                    "relationship",
                                    e.target.value,
                                    index
                                  )
                                }
                              >
                                <option value="">Select Relationship</option>
                                <option value="Spouse">Spouse</option>
                                <option value="Parent">Parent</option>
                                <option value="Sibling">Sibling</option>
                                <option value="Child">Child</option>
                                <option value="Relative">Relative</option>
                                <option value="Friend">Friend</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                            <div className="col-md-6">
                              <label
                                htmlFor={`additionalEmail-${index}`}
                                className="form-label"
                              >
                                Email:
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                id={`additionalEmail-${index}`}
                                value={contact.email}
                                onChange={(e) =>
                                  handleChange(
                                    "additional",
                                    "email",
                                    e.target.value,
                                    index
                                  )
                                }
                                placeholder="Enter Email Address"
                              />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label">
                                Representative:
                              </label>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name={`additionalRepresentative-${index}`}
                                  id={`additionalLegalRep-${index}`}
                                  value="Legal Representative"
                                  checked={
                                    contact.representative ===
                                    "Legal Representative"
                                  }
                                  onChange={(e) =>
                                    handleChange(
                                      "additional",
                                      "representative",
                                      e.target.value,
                                      index
                                    )
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`additionalLegalRep-${index}`}
                                >
                                  Legal Representative
                                </label>
                              </div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name={`additionalRepresentative-${index}`}
                                  id={`additionalPatientRep-${index}`}
                                  value="Patient Selected Representative"
                                  checked={
                                    contact.representative ===
                                    "Patient Selected Representative"
                                  }
                                  onChange={(e) =>
                                    handleChange(
                                      "additional",
                                      "representative",
                                      e.target.value,
                                      index
                                    )
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`additionalPatientRep-${index}`}
                                >
                                  Patient Selected Representative
                                </label>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={`additionalSameAsPatientAddress-${index}`}
                                  checked={contact.sameAsPatientAddress}
                                  onChange={(e) =>
                                    handleChange(
                                      "additional",
                                      "sameAsPatientAddress",
                                      e.target.checked,
                                      index
                                    )
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`additionalSameAsPatientAddress-${index}`}
                                >
                                  Same as Patient Address
                                </label>
                              </div>
                            </div>
                            {!contact.sameAsPatientAddress && (
                              <>
                                <div className="col-md-6">
                                  <label
                                    htmlFor={`additionalAddressLine1-${index}`}
                                    className="form-label"
                                  >
                                    Address Line 1:
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id={`additionalAddressLine1-${index}`}
                                    value={contact.addressLine1}
                                    onChange={(e) =>
                                      handleChange(
                                        "additional",
                                        "addressLine1",
                                        e.target.value,
                                        index
                                      )
                                    }
                                    placeholder="Enter Address Line 1"
                                  />
                                </div>
                                <div className="col-md-6">
                                  <label
                                    htmlFor={`additionalAddressLine2-${index}`}
                                    className="form-label"
                                  >
                                    Address Line 2:
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id={`additionalAddressLine2-${index}`}
                                    value={contact.addressLine2}
                                    onChange={(e) =>
                                      handleChange(
                                        "additional",
                                        "addressLine2",
                                        e.target.value,
                                        index
                                      )
                                    }
                                    placeholder="Enter Address Line 2"
                                  />
                                </div>
                                <div className="col-md-6">
                                  <label
                                    htmlFor={`additionalCity-${index}`}
                                    className="form-label"
                                  >
                                    City:
                                  </label>
                                  <CitySelect
                                    stateCode={additionalState}
                                    selectedCity={additionalCity}
                                    setSelectedCity={setAdditionalCity}
                                  />
                                </div>
                                <div className="col-md-6">
                                  <label
                                    htmlFor={`additionalState-${index}`}
                                    className="form-label"
                                  >
                                    State:
                                  </label>
                                  <StateSelect
                                    selectedState={additionalState}
                                    setSelectedState={setAdditionalState}
                                  />
                                </div>
                                <div className="col-md-6">
                                  <label
                                    htmlFor={`additionalZip-${index}`}
                                    className="form-label"
                                  >
                                    ZIP:
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id={`additionalZip-${index}`}
                                    value={contact.zip}
                                    onChange={(e) =>
                                      handleChange(
                                        "additional",
                                        "zip",
                                        e.target.value,
                                        index
                                      )
                                    }
                                    placeholder="Enter ZIP"
                                  />
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="row my-5">
                    <div className="col-md-12">
                      <a
                        type="button"
                        className="btn btn-primary text-white"
                        onClick={addAdditionalContact}
                      >
                        Add additional
                      </a>
                    </div>
                  </div>
                  {/* Add Additional Contact Button */}

                  <div className="accordion-item">
                    <h2
                      className="accordion-header"
                      id="headingRepresentativeContacted"
                    >
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseRepresentativeContacted"
                        aria-expanded="true"
                        aria-controls="collapseRepresentativeContacted"
                      >
                        Representative contacted regarding admission
                      </button>
                    </h2>
                    <div
                      id="collapseRepresentativeContacted"
                      className="accordion-collapse collapse "
                      aria-labelledby="headingRepresentativeContacted"
                      data-bs-parent="#admissionFormAccordion"
                    >
                      <div className="accordion-body py-2">
                        <div className="mb-3">
                          <label>
                            Representative contacted regarding admission:
                          </label>
                          <select
                            className="form-select"
                            value={formData.representativeContacted}
                            onChange={(e) =>
                              handleFormChange(
                                "representativeContacted",
                                e.target.value
                              )
                            }
                          >
                            <option value="N/A">
                              N/A (no legal/patient-selected representative)
                            </option>
                            <option value="legalRepresentative">
                              Legal Representative contacted regarding admission
                            </option>
                            <option value="patientDecline">
                              Patient request to decline notice of rights to
                              Patient-Selected Representative
                            </option>
                            <option value="patientSelected">
                              Patient-Selected Representative contacted
                              regarding admission
                            </option>
                            <option value="legalNotInAgreement">
                              Legal Representative not in agreement with
                              admission
                            </option>
                            <option value="physicianNotified">
                              Physician notified
                            </option>
                            <option value="patientNotified">
                              Patient notified
                            </option>
                          </select>
                        </div>

                        {/* Conditional rendering based on the selected representative */}
                        {formData.representativeContacted ===
                          "legalRepresentative" && (
                          <>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="legalRepresentativeOption"
                                id="legalRepOption1"
                                value="contactedAvailable"
                                checked={
                                  formData.legalRepresentativeOption ===
                                  "contactedAvailable"
                                }
                                onChange={(e) =>
                                  handleFormChange(
                                    "legalRepresentativeOption",
                                    e.target.value
                                  )
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="legalRepOption1"
                              >
                                Contacted and will be available for admission
                                visit to receive written notice in advance of
                                care
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="legalRepresentativeOption"
                                id="legalRepOption2"
                                value="inAgreementNotAvailable"
                                checked={
                                  formData.legalRepresentativeOption ===
                                  "inAgreementNotAvailable"
                                }
                                onChange={(e) =>
                                  handleFormChange(
                                    "legalRepresentativeOption",
                                    e.target.value
                                  )
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="legalRepOption2"
                              >
                                In agreement with need for care, but not
                                available for admission visit (if this person
                                has healthcare decision making authority, the
                                HHA must provide notice of the patient &apos;s
                                rights prior to initiating care. May obtain
                                electronic or digital signature)
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="legalRepresentativeOption"
                                id="legalRepOption3"
                                value="other"
                                checked={
                                  formData.legalRepresentativeOption === "other"
                                }
                                onChange={(e) =>
                                  handleFormChange(
                                    "legalRepresentativeOption",
                                    e.target.value
                                  )
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="legalRepOption3"
                              >
                                Other
                              </label>
                            </div>
                          </>
                        )}

                        {formData.representativeContacted ===
                          "patientSelected" && (
                          <>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="patientSelectedRepresentativeOption"
                                id="patientSelectedOption1"
                                value="contactedAvailable"
                                checked={
                                  formData.patientSelectedRepresentativeOption ===
                                  "contactedAvailable"
                                }
                                onChange={(e) =>
                                  handleFormChange(
                                    "patientSelectedRepresentativeOption",
                                    e.target.value
                                  )
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="patientSelectedOption1"
                              >
                                Contacted and will be available for admission
                                visit to receive written notice in advance of
                                care
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="patientSelectedRepresentativeOption"
                                id="patientSelectedOption2"
                                value="sentCopy"
                                checked={
                                  formData.patientSelectedRepresentativeOption ===
                                  "sentCopy"
                                }
                                onChange={(e) =>
                                  handleFormChange(
                                    "patientSelectedRepresentativeOption",
                                    e.target.value
                                  )
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="patientSelectedOption2"
                              >
                                Sent copy, as requested, of notice of rights,
                                transfer and DC policies provided by mail or
                                other electronic means (to be received within 4
                                days)
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="patientSelectedRepresentativeOption"
                                id="patientSelectedOption3"
                                value="other"
                                checked={
                                  formData.patientSelectedRepresentativeOption ===
                                  "other"
                                }
                                onChange={(e) =>
                                  handleFormChange(
                                    "patientSelectedRepresentativeOption",
                                    e.target.value
                                  )
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="patientSelectedOption3"
                              >
                                Other
                              </label>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingCAHPS">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseCAHPS"
                        aria-expanded="true"
                        aria-controls="collapseCAHPS"
                      >
                        CAHPS Survey
                      </button>
                    </h2>
                    <div
                      id="collapseCAHPS"
                      className="accordion-collapse collapse "
                      aria-labelledby="headingCAHPS"
                      data-bs-parent="#admissionFormAccordion"
                    >
                      <div className="accordion-body py-2">
                        <div className="mb-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="doNotContactCAHPS"
                              checked={formData.doNotContactCAHPS}
                              onChange={() =>
                                handleCheckboxChange("doNotContactCAHPS")
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="doNotContactCAHPS"
                            >
                              Do Not Contact for CAHPS (When checked, please
                              provide appropriate reason(s).)
                            </label>
                          </div>
                        </div>

                        {formData.doNotContactCAHPS && (
                          <>
                            <div className="mb-3">
                              <label
                                htmlFor="reasonForNoContact"
                                className="form-label"
                              >
                                Reason for no contact for CAHPS
                              </label>
                              <select
                                className="form-select"
                                id="reasonForNoContact"
                                value={formData.reasonForNoContact}
                                onChange={(e) =>
                                  handleFieldChange(
                                    "reasonForNoContact",
                                    e.target.value
                                  )
                                }
                              >
                                <option value="">Select reason</option>
                                <option value="endangersHealth">
                                  Endangers health or well being of a home
                                  health provider
                                </option>
                                <option value="stateRegulatedPatient">
                                  State regulated patient
                                </option>
                                <option value="patientRequest">
                                  Patient request not to be contacted for
                                  surveys
                                </option>
                                <option value="other">Other</option>
                              </select>
                            </div>

                            {formData.reasonForNoContact === "other" && (
                              <div className="mb-3">
                                <label
                                  htmlFor="otherReason"
                                  className="form-label"
                                >
                                  Other reason
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="otherReason"
                                  value={formData.otherReason}
                                  onChange={(e) =>
                                    handleFieldChange(
                                      "otherReason",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            )}

                            <div className="mb-3">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="alternateCAHPSContact"
                                  checked={formData.alternateCAHPSContact}
                                  onChange={() =>
                                    handleCheckboxChange(
                                      "alternateCAHPSContact"
                                    )
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="alternateCAHPSContact"
                                >
                                  Alternate CAHPS Contact (Applicable only when
                                  the patient is physically or mentally
                                  incapable of completing survey.)
                                </label>
                              </div>
                            </div>

                            {formData.alternateCAHPSContact && (
                              <>
                                <div className="mb-3 d-flex gap-4">
                                  <label>
                                    Same as Primary Emergency Contact
                                  </label>
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="sameAsPrimaryEmergencyContact"
                                    checked={
                                      formData.alternateCAHPSContactDetails
                                        .sameAsPrimaryEmergencyContact
                                    }
                                    onChange={(e) =>
                                      handleAlternateCAHPSContactChange(
                                        "sameAsPrimaryEmergencyContact",
                                        e.target.checked
                                      )
                                    }
                                  />
                                </div>

                                {!formData.alternateCAHPSContactDetails
                                  .sameAsPrimaryEmergencyContact && (
                                  <>
                                    {/* Add fields for alternate CAHPS contact */}
                                    <div className="mb-3">
                                      <label
                                        htmlFor="altFirstName"
                                        className="form-label"
                                      >
                                        First Name
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="altFirstName"
                                        value={
                                          formData.alternateCAHPSContactDetails
                                            .firstName
                                        }
                                        onChange={(e) =>
                                          handleAlternateCAHPSContactChange(
                                            "firstName",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="altLastName"
                                        className="form-label"
                                      >
                                        Last Name
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="altLastName"
                                        value={
                                          formData.alternateCAHPSContactDetails
                                            .lastName
                                        }
                                        onChange={(e) =>
                                          handleAlternateCAHPSContactChange(
                                            "lastName",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="altRelationship"
                                        className="form-label"
                                      >
                                        Relationship
                                      </label>

                                      <select
                                        className="form-select"
                                        id="altRelationship"
                                        value={
                                          formData.alternateCAHPSContactDetails
                                            .relationship
                                        }
                                        onChange={(e) =>
                                          handleAlternateCAHPSContactChange(
                                            "relationship",
                                            e.target.value
                                          )
                                        }
                                      >
                                        <option value="">
                                          Select Relationship
                                        </option>
                                        <option value="Spouse">Spouse</option>
                                        <option value="Parent">Parent</option>
                                        <option value="Sibling">Sibling</option>
                                        <option value="Child">Child</option>
                                        <option value="Relative">
                                          Relative
                                        </option>
                                        <option value="Friend">Friend</option>
                                        <option value="Other">Other</option>
                                      </select>
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="altMobilePhone"
                                        className="form-label"
                                      >
                                        Mobile Phone
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="altMobilePhone"
                                        value={
                                          formData.alternateCAHPSContactDetails
                                            .mobilePhone
                                        }
                                        onChange={(e) =>
                                          handleAlternateCAHPSContactChange(
                                            "mobilePhone",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="altAlternatePhone"
                                        className="form-label"
                                      >
                                        Alternate Phone
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="altAlternatePhone"
                                        value={
                                          formData.alternateCAHPSContactDetails
                                            .alternatePhone
                                        }
                                        onChange={(e) =>
                                          handleAlternateCAHPSContactChange(
                                            "alternatePhone",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="altEmail"
                                        className="form-label"
                                      >
                                        Email
                                      </label>
                                      <input
                                        type="email"
                                        className="form-control"
                                        id="altEmail"
                                        value={
                                          formData.alternateCAHPSContactDetails
                                            .email
                                        }
                                        onChange={(e) =>
                                          handleAlternateCAHPSContactChange(
                                            "email",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="altAddressLine1"
                                        className="form-label"
                                      >
                                        Address Line 1
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="altAddressLine1"
                                        value={
                                          formData.alternateCAHPSContactDetails
                                            .addressLine1
                                        }
                                        onChange={(e) =>
                                          handleAlternateCAHPSContactChange(
                                            "addressLine1",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="altAddressLine2"
                                        className="form-label"
                                      >
                                        Address Line 2
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="altAddressLine2"
                                        value={
                                          formData.alternateCAHPSContactDetails
                                            .addressLine2
                                        }
                                        onChange={(e) =>
                                          handleAlternateCAHPSContactChange(
                                            "addressLine2",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="altCity"
                                        className="form-label"
                                      >
                                        City
                                      </label>
                                      <CitySelect
                                        stateCode={CAHPSState}
                                        selectedCity={CAHPSCity}
                                        setSelectedCity={setCAHPSCity}
                                      />
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="altState"
                                        className="form-label"
                                      >
                                        State
                                      </label>
                                      <StateSelect
                                        selectedState={CAHPSState}
                                        setSelectedState={setCAHPSState}
                                      />
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="altZIP"
                                        className="form-label"
                                      >
                                        ZIP Code
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="altZIP"
                                        value={
                                          formData.alternateCAHPSContactDetails
                                            .zip
                                        }
                                        onChange={(e) =>
                                          handleAlternateCAHPSContactChange(
                                            "zip",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="altCounty"
                                        className="form-label"
                                      >
                                        County
                                      </label>
                                      <CountySelect
                                        selectedState={CAHPSState}
                                        selectedCounty={CAHPSCounty}
                                        setSelectedCounty={setCAHPSCounty}
                                      />
                                    </div>
                                  </>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* contract-conment  */}
                  <div className="contacts-comments mt-5">
                    <div className="templates-section">
                      {/* Templates dropdown */}
                      <label className="form-label my-2">
                        Select Templates
                      </label>
                      <Template
                        selectedTemplate={selectedTemplate}
                        setSelectedTemplate={setSelectedTemplate}
                      />
                    </div>

                    <div className="comments-section">
                      {/* Comments input */}
                      <label className="form-label my-2">
                        Contacts Comments
                      </label>
                      <div
                        style={{ fontSize: "10px" }}
                        className="characters-remaining text-xl text-light"
                      >
                        You have {remainingCharacters} characters remaining.
                      </div>
                      <textarea
                        value={comments}
                        onChange={handleCommentsChange}
                        placeholder="Enter comments..."
                        className="form-control"
                        rows="5"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary my-5 text-"
                    >
                      submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </EditModal>
        )}
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={data?.payload?.contacts ?? []}
            tableClassName="custom-table"
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
