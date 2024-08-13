import React, { useState, useEffect, useRef } from "react";
import CitySelect from "../../components/FormElement/CitySelect";
import StateSelect from "./../../components/FormElement/StateSelect";
import {
  useCreateContactMutation,
  useCreateTestContactMutation,
} from "../../Redux/api/Contact";
import CountySelect from "./../../components/FormElement/CountySelect";
import PageHeader from "./../../components/FormElement/PageHeader";
import AuthLoader from "./../../utils/Loaders/AuthLoader";
import Template from "./../../components/FormElement/Template";
import { useNavigate } from "react-router-dom";
import { ReactToPrint } from "react-to-print";
import {
  getAllSectionStepState,
  updateSteps,
} from "./../../Redux/slices/SectionStep.js";
import { useSelector, useDispatch } from "react-redux";
import { showToast } from "./../../utils/Toastify";
import AdmitButton from './../../components/Patient/AdmitButton';
const ContactForm = () => {
  const allSteps = useSelector(getAllSectionStepState);
  const dispatch = useDispatch();

  const componentRef = useRef();
  const [createContact, { data, isLoading, isSuccess, error }] =
    useCreateContactMutation();
  const [createTestContact, { data: testData, error: testError }] =
    useCreateTestContactMutation();

  const localContactData = JSON.parse(localStorage.getItem("Contact"));
  //console.log(localContactData)
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
    const patientId = JSON.parse(localStorage.getItem("patient"));
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
      if (patientId?._id) {
        contactData.patientId = allSteps.patientId || patientId?._id;
        createContact(contactData);
        localStorage.removeItem("Contact");
      } else {
        showToast("error", "Patient id required");
      }
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
      createTestContact(contactData);
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
      
      createTestContact(contactData);
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
      const additionalContact =
        localContactData.emergencyContacts?.additional?.[0] || {};
      setAdditionalCity(additionalContact.city || "");
      setAdditionalState(additionalContact.state || "");

      // For CAHPS contact
      setCAHPSCity(localContactData.alternateCAHPSContactDetails?.city || "");
      setCAHPSState(localContactData.alternateCAHPSContactDetails?.state || "");
      setCAHPSCounty(
        localContactData.alternateCAHPSContactDetails?.county || ""
      );

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
      dispatch(updateSteps({ ...allSteps, steps: allSteps?.steps + 1 }));
      localStorage.removeItem("Contact");
    }
    if (testData) {
      dispatch(updateSteps({ ...allSteps, steps: allSteps?.steps + 1 }));
      showToast("success", "Saved, please continue");
      localStorage.setItem("Contact", JSON.stringify(testData?.payload));

    }
    if (testError) {
      showToast("error", testError?.data?.message);
    }
  }, [isSuccess, testData, testError]);
  useEffect(() => {
    showToast("error", error?.data?.message);
    showToast("success", data?.message);
  }, [error?.data?.message, data?.message]);

  if (isLoading) return <AuthLoader />;

  return (
    <form ref={componentRef} onSubmit={handleSubmit} className="card w-100">
      <PageHeader title="Contact" className="card-header fs-3" back={false} />

      <div className="card-body">
        <div className="accordion" id="emergencyContactsAccordion">
          {/* Primary Emergency Contact */}

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
              className="accordion-collapse collapse"
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
              className="accordion-collapse collapse "
              aria-labelledby="headingRepresentativeContacted"
              data-bs-parent="#admissionFormAccordion"
            >
              <div className="accordion-body py-2">
                <div className="mb-3">
                  <label>Representative contacted regarding admission:</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="representativeContacted"
                      id="noRepresentative"
                      value="N/A"
                      checked={formData.representativeContacted.includes("N/A")}
                      onChange={handleFormChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="noRepresentative"
                    >
                      N/A (no legal/patient-selected representative)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="representativeContacted"
                      id="legalRepresentative"
                      value="legalRepresentative"
                      checked={formData.representativeContacted.includes(
                        "legalRepresentative"
                      )}
                      onChange={handleFormChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="legalRepresentative"
                    >
                      Legal Representative contacted regarding admission
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="representativeContacted"
                      id="patientDecline"
                      value="patientDecline"
                      checked={formData.representativeContacted.includes(
                        "patientDecline"
                      )}
                      onChange={handleFormChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="patientDecline"
                    >
                      Patient request to decline notice of rights to
                      Patient-Selected Representative
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="representativeContacted"
                      id="patientSelected"
                      value="patientSelected"
                      checked={formData.representativeContacted.includes(
                        "patientSelected"
                      )}
                      onChange={handleFormChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="patientSelected"
                    >
                      Patient-Selected Representative contacted regarding
                      admission
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="representativeContacted"
                      id="legalNotInAgreement"
                      value="legalNotInAgreement"
                      checked={formData.representativeContacted.includes(
                        "legalNotInAgreement"
                      )}
                      onChange={handleFormChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="legalNotInAgreement"
                    >
                      Legal Representative not in agreement with admission
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="representativeContacted"
                      id="physicianNotified"
                      value="physicianNotified"
                      checked={formData.representativeContacted.includes(
                        "physicianNotified"
                      )}
                      onChange={handleFormChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="physicianNotified"
                    >
                      Physician notified
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="representativeContacted"
                      id="patientNotified"
                      value="patientNotified"
                      checked={formData.representativeContacted.includes(
                        "patientNotified"
                      )}
                      onChange={handleFormChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="patientNotified"
                    >
                      Patient notified
                    </label>
                  </div>
                </div>

                {/* Conditional rendering based on the selected representative */}
                {formData.representativeContacted.includes(
                  "legalRepresentative"
                ) && (
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

                {formData.representativeContacted.includes(
                  "patientSelected"
                ) && (
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
                      <div className="mb-3">
                        <label className="form-label">
                          Reason for no contact for CAHPS
                        </label>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            id="reasonEndangersHealth"
                            value="endangersHealth"
                            checked={
                              formData.reasonForNoContact === "endangersHealth"
                            }
                            onChange={(e) =>
                              handleFieldChange(
                                "reasonForNoContact",
                                e.target.value
                              )
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="reasonEndangersHealth"
                          >
                            Endangers health or well being of a home health
                            provider
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            id="reasonStateRegulatedPatient"
                            value="stateRegulatedPatient"
                            checked={
                              formData.reasonForNoContact ===
                              "stateRegulatedPatient"
                            }
                            onChange={(e) =>
                              handleFieldChange(
                                "reasonForNoContact",
                                e.target.value
                              )
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="reasonStateRegulatedPatient"
                          >
                            State regulated patient
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            id="reasonPatientRequest"
                            value="patientRequest"
                            checked={
                              formData.reasonForNoContact === "patientRequest"
                            }
                            onChange={(e) =>
                              handleFieldChange(
                                "reasonForNoContact",
                                e.target.value
                              )
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="reasonPatientRequest"
                          >
                            Patient request not to be contacted for surveys
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            id="reasonOther"
                            value="other"
                            checked={formData.reasonForNoContact === "other"}
                            onChange={(e) =>
                              handleFieldChange(
                                "reasonForNoContact",
                                e.target.value
                              )
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="reasonOther"
                          >
                            Other
                          </label>
                        </div>
                      </div>
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
                      <label className="form-label">
                        Alternate CAHPS Contact (Applicable only when the
                        patient is physically or mentally incapable of
                        completing the survey.)
                      </label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="alternateCAHPSContactYes"
                          checked={formData.alternateCAHPSContact}
                          onChange={() =>
                            handleFieldChange("alternateCAHPSContact", true)
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="alternateCAHPSContactYes"
                        >
                          Yes
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="alternateCAHPSContactNo"
                          checked={!formData.alternateCAHPSContact}
                          onChange={() =>
                            handleFieldChange("alternateCAHPSContact", false)
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="alternateCAHPSContactNo"
                        >
                          No
                        </label>
                      </div>
                    </div>

                    {formData.alternateCAHPSContact && (
                      <>
                        <div className="mb-3">
                          <label className="form-label">
                            Same as Primary Emergency Contact
                          </label>
                          <div className="form-check">
                            <input
                              type="radio"
                              className="form-check-input"
                              id="sameAsPrimaryEmergencyContactYes"
                              checked={
                                formData.alternateCAHPSContactDetails
                                  .sameAsPrimaryEmergencyContact
                              }
                              onChange={() =>
                                handleAlternateCAHPSContactChange(
                                  "sameAsPrimaryEmergencyContact",
                                  true
                                )
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="sameAsPrimaryEmergencyContactYes"
                            >
                              Yes
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              type="radio"
                              className="form-check-input"
                              id="sameAsPrimaryEmergencyContactNo"
                              checked={
                                !formData.alternateCAHPSContactDetails
                                  .sameAsPrimaryEmergencyContact
                              }
                              onChange={() =>
                                handleAlternateCAHPSContactChange(
                                  "sameAsPrimaryEmergencyContact",
                                  false
                                )
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="sameAsPrimaryEmergencyContactNo"
                            >
                              No
                            </label>
                          </div>
                        </div>

                        {!formData.alternateCAHPSContactDetails
                          .sameAsPrimaryEmergencyContact && (
                          <>
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
                              <label
                                htmlFor="altCountry"
                                className="form-label"
                              >
                                Country
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="altCountry"
                                value={
                                  formData.alternateCAHPSContactDetails.country
                                }
                                onChange={(e) =>
                                  handleAlternateCAHPSContactChange(
                                    "country",
                                    e.target.value
                                  )
                                }
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
            <div className="row mt-4 hide-on-print">
          <div className="d-flex position-sticky bottom-10 justify-content-end mt-3 hide-on-print gap-3">
            <AdmitButton />
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSaveAndContinue}
            >
              Save & Continue
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleSaveAndExit}
            >
              Save & Exit
            </button>
          </div>
        </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
