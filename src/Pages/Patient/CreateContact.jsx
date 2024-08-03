import React, { useState, useEffect, useRef } from "react";
import CitySelect from "../../components/FormElement/CitySelect";
import StateSelect from "./../../components/FormElement/StateSelect";
import { useCreateContactMutation } from "../../Redux/api/Contact";
import CountySelect from "./../../components/FormElement/CountySelect";
import PageHeader from "./../../components/FormElement/PageHeader";
import AuthLoader from "./../../utils/Loaders/AuthLoader";
import Template from "./../../components/FormElement/Template";
import { useNavigate } from "react-router-dom";
import { ReactToPrint } from "react-to-print";

const ContactForm = () => {
  const componentRef = useRef();
  const [createContact, { data, isLoading, isSuccess, error }] =
    useCreateContactMutation();
  const navigate = useNavigate();
  const localContactData = JSON.parse(localStorage.getItem("Contact"));
  console.log(localContactData)
  const [formData, setFormData] = useState({
    representativeContacted: localContactData?.representativeContacted || "",
    legalRepresentativeOption:
      localContactData?.legalRepresentativeOption || "",
    patientSelectedRepresentativeOption:
      localContactData?.patientSelectedRepresentativeOption || "",
    otherDetails: localContactData?.otherDetails || "",
    physicianNotified: localContactData?.physicianNotified || false,
    patientNotified: localContactData?.patientNotified || false,
    previousField1: localContactData?.previousField1 || "",
    previousField2: localContactData?.previousField2 || "",
    doNotContactCAHPS: localContactData?.doNotContactCAHPS || false,
    reasonForNoContact: localContactData?.reasonForNoContact || "",
    otherReason: localContactData?.otherReason || "",
    alternateCAHPSContact: localContactData?.alternateCAHPSContact || false,
    alternateCAHPSContactDetails: {
      sameAsPrimaryEmergencyContact:
        localContactData?.alternateCAHPSContactDetails
          ?.sameAsPrimaryEmergencyContact || false,
      firstName:
        localContactData?.alternateCAHPSContactDetails?.firstName || "",
      lastName: localContactData?.alternateCAHPSContactDetails?.lastName || "",
      relationship:
        localContactData?.alternateCAHPSContactDetails?.relationship || "",
      mobilePhone:
        localContactData?.alternateCAHPSContactDetails?.mobilePhone || "",
      alternatePhone:
        localContactData?.alternateCAHPSContactDetails?.alternatePhone || "",
      email: localContactData?.alternateCAHPSContactDetails?.email || "",
      addressLine1:
        localContactData?.alternateCAHPSContactDetails?.addressLine1 || "",
      addressLine2:
        localContactData?.alternateCAHPSContactDetails?.addressLine2 || "",
      city: localContactData?.alternateCAHPSContactDetails?.city || "",
      state: localContactData?.alternateCAHPSContactDetails?.state || "",
      zip: localContactData?.alternateCAHPSContactDetails?.zip || "",
      county: localContactData?.alternateCAHPSContactDetails?.county || "",
    },
  });

  const [emergencyContacts, setEmergencyContacts] = useState({
    primary: {
      firstName: localContactData?.emergencyContacts?.primary?.firstName || "",
      lastName: localContactData?.emergencyContacts?.primary?.lastName || "",
      mobilePhone:
        localContactData?.emergencyContacts?.primary?.mobilePhone || "",
      alternatePhone:
        localContactData?.emergencyContacts?.primary?.alternatePhone || "",
      relationship:
        localContactData?.emergencyContacts?.primary?.relationship || "",
      email: localContactData?.emergencyContacts?.primary?.email || "",
      representative:
        localContactData?.emergencyContacts?.primary?.representative ||
        "Legal Representative",
      sameAsPatientAddress:
        localContactData?.emergencyContacts?.primary?.sameAsPatientAddress ||
        false,
      addressLine1:
        localContactData?.emergencyContacts?.primary?.addressLine1 || "",
      addressLine2:
        localContactData?.emergencyContacts?.primary?.addressLine2 || "",
      city: localContactData?.emergencyContacts?.primary?.city || "",
      state: localContactData?.emergencyContacts?.primary?.state || "",
      zip: localContactData?.emergencyContacts?.primary?.zip || "",
    },
    additional: localContactData?.emergencyContacts?.additional || [
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
  const [comments, setComments] = useState(localContactData?.comments || "");
  const [remainingCharacters, setRemainingCharacters] = useState(
    2000 - (localContactData?.comments?.length || 0)
  );

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
      console.log(contactData);
      createContact(contactData);
    } catch (error) {
      console.error("Error creating contact:", error);
    }
  };
  const handleSaveAndContinue = (e) => {
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
      localStorage.setItem("Contact", JSON.stringify(contactData));
      createContact(contactData);
    } catch (error) {
      console.error("Error creating contact:", error);
    }
  };
  const handleSaveAndExit = (e) => {
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
      localStorage.setItem("Contact", JSON.stringify(contactData));
    } catch (error) {
      console.error("Error creating contact:", error);
    }
  };
  useEffect(() => {
    if (localContactData) {
      // For primary emergency contact
      setPrimaryCity(localContactData.emergencyContacts?.primary?.city || "");
      setPrimaryState(localContactData.emergencyContacts?.primary?.state || "");

      // For additional emergency contact
      const additionalContact = localContactData.emergencyContacts?.additional?.[0] || {};
      setAdditionalCity(additionalContact.city || "");
      setAdditionalState(additionalContact.state || "");

      // For CAHPS contact
      setCAHPSCity(localContactData.alternateCAHPSContactDetails?.city || "");
      setCAHPSState(localContactData.alternateCAHPSContactDetails?.state || "");
      setCAHPSCounty(localContactData.alternateCAHPSContactDetails?.county || "");

      // For selected template
      setSelectedTemplate(localContactData.selectedTemplate || "");
    }
  }, []);
  useEffect(() => {
    setComments((prev) =>
      prev ? prev + selectedTemplate?.value : selectedTemplate?.value
    );
  }, [selectedTemplate]);
  useEffect(() => {
    if (isSuccess) {
      navigate("/contacts");
    }
  }, [isSuccess]);
  if (isLoading) return <AuthLoader />;
  return (
    <form ref={componentRef} onSubmit={handleSubmit} className="card">
      <PageHeader title="Contact" className="card-header fs-3" />

      <div className="card-body">
        <div className="accordion" id="emergencyContactsAccordion">
          {/* Primary Emergency Contact */}
          {data?.message && (
            <div className="alert alert-success text-center">
              {data?.message}
            </div>
          )}
          {error?.data?.message && (
            <div className="alert alert-danger text-center">
              {error?.data?.message}
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
                    <label htmlFor="primaryFirstName" className="form-label">
                      First Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="primaryFirstName"
                      value={emergencyContacts.primary.firstName}
                      onChange={(e) =>
                        handleChange("primary", "firstName", e.target.value)
                      }
                      placeholder="Enter First Name"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="primaryLastName" className="form-label">
                      Last Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="primaryLastName"
                      value={emergencyContacts.primary.lastName}
                      onChange={(e) =>
                        handleChange("primary", "lastName", e.target.value)
                      }
                      placeholder="Enter Last Name"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="primaryMobilePhone" className="form-label">
                      Mobile Phone:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="primaryMobilePhone"
                      value={emergencyContacts.primary.mobilePhone}
                      onChange={(e) =>
                        handleChange("primary", "mobilePhone", e.target.value)
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
                    <label htmlFor="primaryRelationship" className="form-label">
                      Relationship:
                    </label>
                    <select
                      className="form-select"
                      id="personalRelationship"
                      value={emergencyContacts.primary.relationship}
                      onChange={(e) =>
                        handleChange("primary", "relationship", e.target.value)
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
                    <label htmlFor="primaryEmail" className="form-label">
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
                    <label className="form-label">Representative:</label>
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
                        checked={emergencyContacts.primary.sameAsPatientAddress}
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
                    <React.Fragment>
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
                        <label htmlFor="primaryCity" className="form-label">
                          City:
                        </label>
                        <CitySelect
                          stateCode={primaryState}
                          selectedCity={primaryCity}
                          setSelectedCity={setPrimaryCity}
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="primaryState" className="form-label">
                          State:
                        </label>
                        <StateSelect
                          selectedState={primaryState}
                          setSelectedState={setPrimaryState}
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="primaryZip" className="form-label">
                          ZIP:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="primaryZip"
                          value={emergencyContacts.primary.zip}
                          onChange={(e) =>
                            handleChange("primary", "zip", e.target.value)
                          }
                          placeholder="Enter ZIP"
                        />
                      </div>
                    </React.Fragment>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Emergency Contacts */}
          {emergencyContacts.additional.map((contact, index) => (
            <div key={`additionalContact-${index}`} className="accordion-item">
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
                    className="btn btn-sm btn-danger ms-2 hide-on-print"
                    onClick={() => removeAdditionalContact(index)}
                  >
                    Remove
                  </button>
                )}
              </h2>
              <div
                id={`additionalCollapse-${index}`}
                className="accordion-collapse collapse show"
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
                      <label className="form-label">Representative:</label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name={`additionalRepresentative-${index}`}
                          id={`additionalLegalRep-${index}`}
                          value="Legal Representative"
                          checked={
                            contact.representative === "Legal Representative"
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
                      <React.Fragment>
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
                      </React.Fragment>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="row my-5 hide-on-print">
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
              className="accordion-collapse collapse show "
              aria-labelledby="headingRepresentativeContacted"
              data-bs-parent="#admissionFormAccordion"
            >
              <div className="accordion-body py-2">
                <div className="mb-3">
                  <label>Representative contacted regarding admission:</label>
                  <select
                    name="representativeContacted"
                    className="form-select"
                    value={formData.representativeContacted}
                    onChange={handleFormChange}
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
                      Patient-Selected Representative contacted regarding
                      admission
                    </option>
                    <option value="legalNotInAgreement">
                      Legal Representative not in agreement with admission
                    </option>
                    <option value="physicianNotified">
                      Physician notified
                    </option>
                    <option value="patientNotified">Patient notified</option>
                  </select>
                </div>

                {/* Conditional rendering based on the selected representative */}
                {formData.representativeContacted === "legalRepresentative" && (
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
                        onChange={handleFormChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="legalRepOption1"
                      >
                        Contacted and will be available for admission visit to
                        receive written notice in advance of care
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
                        onChange={handleFormChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="legalRepOption2"
                      >
                        In agreement with need for care, but not available for
                        admission visit (if this person has healthcare decision
                        making authority, the HHA must provide notice of the
                        patient &apos;s rights prior to initiating care. May
                        obtain electronic or digital signature)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="legalRepresentativeOption"
                        id="legalRepOption3"
                        value="other"
                        checked={formData.legalRepresentativeOption === "other"}
                        onChange={handleFormChange}
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

                {formData.representativeContacted === "patientSelected" && (
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
                        onChange={handleFormChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="patientSelectedOption1"
                      >
                        Contacted and will be available for admission visit to
                        receive written notice in advance of care
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
                        onChange={handleFormChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="patientSelectedOption2"
                      >
                        Sent copy, as requested, of notice of rights, transfer
                        and DC policies provided by mail or other electronic
                        means (to be received within 4 days)
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
                        onChange={handleFormChange}
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
              className="accordion-collapse collapse show "
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
                      onChange={() => handleCheckboxChange("doNotContactCAHPS")}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="doNotContactCAHPS"
                    >
                      Do Not Contact for CAHPS (When checked, please provide
                      appropriate reason(s).)
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
                          Endangers health or well being of a home health
                          provider
                        </option>
                        <option value="stateRegulatedPatient">
                          State regulated patient
                        </option>
                        <option value="patientRequest">
                          Patient request not to be contacted for surveys
                        </option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {formData.reasonForNoContact === "other" && (
                      <div className="mb-3">
                        <label htmlFor="otherReason" className="form-label">
                          Other reason
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="otherReason"
                          value={formData.otherReason}
                          onChange={(e) =>
                            handleFieldChange("otherReason", e.target.value)
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
                            handleCheckboxChange("alternateCAHPSContact")
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="alternateCAHPSContact"
                        >
                          Alternate CAHPS Contact (Applicable only when the
                          patient is physically or mentally incapable of
                          completing survey.)
                        </label>
                      </div>
                    </div>

                    {formData.alternateCAHPSContact && (
                      <>
                        <div className="mb-3 d-flex gap-4">
                          <label>Same as Primary Emergency Contact</label>
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
                                  formData.alternateCAHPSContactDetails.lastName
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
                              <label htmlFor="altEmail" className="form-label">
                                Email
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                id="altEmail"
                                value={
                                  formData.alternateCAHPSContactDetails.email
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
                              <label htmlFor="altCity" className="form-label">
                                City
                              </label>
                              <CitySelect
                                stateCode={CAHPSState}
                                selectedCity={CAHPSCity}
                                setSelectedCity={setCAHPSCity}
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="altState" className="form-label">
                                State
                              </label>
                              <StateSelect
                                selectedState={CAHPSState}
                                setSelectedState={setCAHPSState}
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="altZIP" className="form-label">
                                ZIP Code
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="altZIP"
                                value={
                                  formData.alternateCAHPSContactDetails.zip
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
                              <label htmlFor="altCounty" className="form-label">
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
              <label className="form-label my-2">Select Templates</label>
              <Template
                selectedTemplate={selectedTemplate}
                setSelectedTemplate={setSelectedTemplate}
              />
            </div>

            <div className="comments-section">
              {/* Comments input */}
              <label className="form-label my-2">Contacts Comments</label>
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
            <div className="d-flex align-items-center gap-4 hide-on-print">
              <button type="submit" className="btn btn-primary my-5 text-">
                submit
              </button>
              <button
                onClick={handleSaveAndContinue}
                className="btn btn-primary my-5 text-"
              >
                Save and continue
              </button>
              <button
                onClick={handleSaveAndExit}
                className="btn btn-primary my-5 text-"
              >
                Save and exit
              </button>
              <ReactToPrint
                trigger={() => <span className="btn btn-primary">Print</span>}
                content={() => componentRef.current}
                documentTitle="Patient"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
