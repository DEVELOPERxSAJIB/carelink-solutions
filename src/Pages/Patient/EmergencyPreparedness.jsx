import { useEffect, useState } from "react";
import DataTable from "./../../components/Tables/DynamicTable";
import ExportButton from "./../../components/Buttons/ExportButton";
import CitySelect from "../../components/FormElement/CitySelect"
import CountySelect  from "../../components/FormElement/CountySelect"
import TableHeader from "./../../components/Tables/TableHeader";
import AuthLoader from "./../../utils/Loaders/AuthLoader";
import {
  useGetAllEmergenciesQuery,
  useUpdateEmergencyMutation,
  useDeleteEmergencyMutation,
} from "../../Redux/api/EmergencyApi"; // Adjust the import path as per your actual API setup
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import EditModal from "./../../components/Models/EditModal";
import Template from "./../../components/FormElement/Template";
import StateSelect from "./../../components/FormElement/StateSelect";
import Alert from './../../components/Alert/Alert';
import { ReactToPrint } from "react-to-print";
 
 <ReactToPrint
                  trigger={() => (
                    <span className="btn btn-primary">Print</span>
                  )}
                  content={() => componentRef.current}
                  documentTitle="Patient"
                />
const EmergencyPreparedness = () => {
  const { data, isLoading,refetch } = useGetAllEmergenciesQuery(); // Adjust hook name as per your actual hook
  const [updateEmergency, { data: updateData, isSuccess: isUpdateSuccess,error:updateError }] =
    useUpdateEmergencyMutation(); // Adjust hook name as per your actual hook
  const [deleteEmergency, { data: deleteData, isSuccess: isDeleteSuccess,error:deleteError }] =
    useDeleteEmergencyMutation(); // Adjust hook name as per your actual hook
  // const flattenedData = flattenData(data?.payload?.emergencies ?? []); // Adjust data structure as per your actual API response
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState("");

  const columns = [
    {
      field: 'emergencyTriage',
      header: 'Emergency Triage',
    },
    // {
    //   field: 'additionalInfo',
    //   header: 'Additional Info',
    //   render: additionalInfo => Array.isArray(additionalInfo) ? additionalInfo.join(', ') : additionalInfo,
    // },
    {
      field: 'additionalComments',
      header: 'Additional Comments',
    },
    {
      field: 'evacuationZone',
      header: 'Evacuation Zone',
    },
    {
      field: 'sameAsEvacuationContact',
      header: 'Same as Evacuation Contact',
    },
    {
      field: 'addressLine1',
      header: 'Evacuation Address 1',
    },
    {
      field: 'addressLine2',
      header: 'Evacuation Address 2',
    },
    {
      field: 'city',
      header: 'City',
    },
    {
      field: 'state',
      header: 'State',
    },
    {
      field: 'zip',
      header: 'ZIP',
    },
    {
      field: 'county',
      header: 'County',
    },
    {
      field: 'mobilePhone',
      header: 'Mobile Phone',
    },
    {
      field: 'altMobilePhone',
      header: 'Alternate Mobile Phone',
    },
    {
      field: 'visitLocation',
      header: 'Visit Location',
    },
    {
      field: 'comments',
      header: 'Comments',
    },
  
  ];
  

  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [county, setCounty] = useState("");
  const [template, setTemplate] = useState("");
  const [addTemplate, setAddTemplate] = useState("");

  const initialFormData = {
    emergencyTriage: "",
    additionalInfo: [],
    additionalComments: "",
    evacuationZone: "",
    sameAsEvacuationContact: false,
    addressLine1: "",
    addressLine2: null,
    city: "",
    state: "",
    zip: "",
    county: "",
    mobilePhone: "",
    altMobilePhone: null,
    visitLocation: false,
    comments: null,
    trash: true,
    status: true,
  };

  const [formData, setFormData] = useState(initialFormData);
  const handleEdit = (row) => {
    setShow(true);
    setEditId(row._id);
    setFormData({ ...row });
    setCity(row.city)
    setState(row.state)
    setCounty(row.county)
  };
  console.log(formData)
  const handleDelete = (rowData) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteEmergency(rowData._id);
      }
    });
  };
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "additionalInfo") {
      setFormData((prevState) => ({
        ...prevState,
        additionalInfo: checked
          ? [...prevState.additionalInfo, value]
          : prevState?.additionalInfo.filter((item) => item !== value),
      }));
    } else if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else if (type === "radio") {
      // Handle radio inputs
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.city = city;
    formData.state = state;
    formData.county = county;
    updateEmergency({ emergencyId: editId, emergencyData: formData });
    console.log(formData);
  };

  useEffect(() => {
    if (addTemplate?.value) {
      setFormData((prev) => ({
        ...prev,
        additionalComments:
          prev.additionalComments +
          (prev.additionalComments ? "\n" : "") +
          addTemplate.value,
      }));
    }
  }, [addTemplate?.value]);
  useEffect(() => {
    if (template?.value) {
      setFormData((prev) => ({
        ...prev,
        comments: prev.comments + (prev.comments ? "\n" : "") + template.value,
      }));
    }
  }, [template?.value]);
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
  if (isLoading) return <AuthLoader />;

  return (
    <div className="card">
      <TableHeader
        title="Emergency prepared list"
        className="py-3 pt-5 fs-3 card-header"
      />
      <div className="card-body">
        <Alert message={message} type="success"/>
        <div className="gap-3 d-flex flex-wrap">
          <ExportButton
            data={data?.payload?.emergencies ?? []}
            orientation="landscape"
            columns={columns}
            fileName="Emergency prepared"
          />
          <button
            className="btn btn-success waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
            onClick={() => navigate("/create-emergency-preparedness")}
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-plus me-1" />
              <span className="d-none d-sm-inline-block">
                Add New emergency prepared
              </span>
            </span>
          </button>
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
        {show && (
          <EditModal style={{
            minWidth: "70%",
            maxWidth: "70%",
            maxHeight: "80vh",
            overflowY: "scroll",
          }} onClose={setShow} title="Edit emergency prepared">
            <form onSubmit={handleSubmit} className="card">
              <div className="card-body">
              <Alert message={errors} type="danger"/>
                <div className="accordion" id="ClinicalDiagnosisInfoAccordion">
                  {/* Emergency Triage Information */}
                  <div className="accordion-item">
                    <h2
                      className="accordion-header"
                      id="headingEmergencyTriage"
                    >
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseEmergencyTriage"
                        aria-expanded="true"
                        aria-controls="collapseEmergencyTriage"
                      >
                        Emergency Triage
                      </button>
                    </h2>
                    <div
                      id="collapseEmergencyTriage"
                      className="accordion-collapse collapse show "
                      aria-labelledby="headingEmergencyTriage"
                      data-bs-parent="#ClinicalDiagnosisInfoAccordion"
                    >
                      <div className="accordion-body py-2">
                        <div className="mb-3">
                          <label
                            htmlFor="emergencyTriage"
                            className="form-label"
                          >
                            Emergency Triage
                          </label>
                          <div>
                            <input
                              type="radio"
                              name="emergencyTriage"
                              id="emergencyTriage1"
                              value="1"
                              onChange={handleInputChange}
                              checked={formData.emergencyTriage === "1"}
                            />{" "}
                            1. Life-threatening (or potential) and requires
                            ongoing medical treatment.
                            <br />
                            <input
                              type="radio"
                              name="emergencyTriage"
                              id="emergencyTriage2"
                              value="2"
                              onChange={handleInputChange}
                              checked={formData.emergencyTriage === "2"}
                            />{" "}
                            2. Not life-threatening but would suffer severe
                            adverse effects from interruption of services.
                            <br />
                            <input
                              type="radio"
                              name="emergencyTriage"
                              id="emergencyTriage3"
                              value="3"
                              onChange={handleInputChange}
                              checked={formData.emergencyTriage === "3"}
                            />{" "}
                            3. Visits could be postponed 24-48 hours without
                            adverse effects.
                            <br />
                            <input
                              type="radio"
                              name="emergencyTriage"
                              id="emergencyTriage4"
                              value="4"
                              onChange={handleInputChange}
                              checked={formData.emergencyTriage === "4"}
                            />{" "}
                            4. Visits could be postponed 72-96 hours without
                            adverse effects.
                          </div>
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="additionalInfo"
                            className="form-label"
                          >
                            Additional Emergency Preparedness Information
                          </label>
                          <div>
                            <input
                              type="checkbox"
                              name="additionalInfo"
                              id="needsAssistance"
                              value="needsAssistance"
                              onChange={handleInputChange}
                              checked={formData?.additionalInfo?.includes(
                                "needsAssistance"
                              )}
                            />{" "}
                            Needs assistance during an emergency
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              name="additionalInfo"
                              id="contactWithOfficials"
                              value="contactWithOfficials"
                              onChange={handleInputChange}
                              checked={formData?.additionalInfo?.includes(
                                "contactWithOfficials"
                              )}
                            />{" "}
                            Contact made with local/state emergency preparedness
                            officials regarding patient in need of help during
                            an evacuation
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              name="additionalInfo"
                              id="medicalNeeds"
                              value="medicalNeeds"
                              onChange={handleInputChange}
                              checked={formData?.additionalInfo?.includes(
                                "medicalNeeds"
                              )}
                            />{" "}
                            Medical Needs/Equipment (i.e., bedbound, oxygen,
                            vent, IV cardiac meds other DME)
                          </div>
                          {formData?.additionalInfo?.medicalNeeds && (
                            <div>
                              <label
                                htmlFor="medicalNeedsInfo"
                                className="form-label"
                              >
                                Medical Needs/Equipment Details
                              </label>
                              <textarea
                                name="medicalNeedsInfo"
                                id="medicalNeedsInfo"
                                className="form-control"
                                value={formData.medicalNeedsInfo}
                                onChange={handleInputChange}
                              ></textarea>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Emergency Preparedness Information */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingAdditionalInfo">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseAdditionalInfo"
                        aria-expanded="false"
                        aria-controls="collapseAdditionalInfo"
                      >
                        Additional Emergency Preparedness Information
                      </button>
                    </h2>
                    <div
                      id="collapseAdditionalInfo"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingAdditionalInfo"
                      data-bs-parent="#ClinicalDiagnosisInfoAccordion"
                    >
                      <div className="accordion-body py-2">
                        <div className="row mb-3">
                          <div className="col-md-12">
                            <label htmlFor="additionalComments">
                              Select Templates
                            </label>
                            <Template
                              addTemplate={addTemplate}
                              setSelectedTemplate={setAddTemplate}
                            />
                            <span>You have 2000 characters remaining</span>
                            <textarea
                              name="additionalComments"
                              id="additionalComments"
                              className="form-control"
                              value={formData.additionalComments}
                              onChange={handleInputChange}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Evacuation Information */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingEvacuation">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseEvacuation"
                        aria-expanded="false"
                        aria-controls="collapseEvacuation"
                      >
                        Evacuation
                      </button>
                    </h2>
                    <div
                      id="collapseEvacuation"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingEvacuation"
                      data-bs-parent="#ClinicalDiagnosisInfoAccordion"
                    >
                      <div className="accordion-body py-2">
                        <div className="row mb-3">
                          <div className="col-md-12">
                            <label
                              htmlFor="evacuationZone"
                              className="form-label"
                            >
                              Evacuation Zone
                            </label>
                            <select
                              name="evacuationZone"
                              id="evacuationZone"
                              className="form-control"
                              value={formData.evacuationZone}
                              onChange={handleInputChange}
                            >
                              <option value="">Select Zone</option>
                              {/* Populate options if needed */}
                            </select>
                          </div>
                          <div className="col-md-12 my-2">
                            <input
                              type="checkbox"
                              name="evacuationAddress"
                              id="evacuationAddress"
                              onChange={handleInputChange}
                              checked={formData.evacuationAddress}
                            />{" "}
                            Same as Emergency Contact
                          </div>
                        </div>
                        {/* Address Fields */}
                        {!formData.evacuationAddress && (
                          <div className="row">
                            <div className="col-md-6 mb-3">
                              <label htmlFor="addressLine1">
                                Address Line 1
                              </label>
                              <input
                                type="text"
                                name="addressLine1"
                                id="addressLine1"
                                className="form-control"
                                value={formData.addressLine1}
                                onChange={handleInputChange}
                                placeholder="Enter Address Line 1"
                              />
                            </div>
                            <div className="col-md-6 mb-3">
                              <label htmlFor="addressLine2">
                                Address Line 2
                              </label>
                              <input
                                type="text"
                                name="addressLine2"
                                id="addressLine2"
                                className="form-control"
                                value={formData.addressLine2}
                                onChange={handleInputChange}
                                placeholder="Enter Address Line 2"
                              />
                            </div>
                            <div className="col-md-6 mb-3">
                              <label htmlFor="state">State</label>
                              <StateSelect
                                selectedState={state}
                                setSelectedState={setState}
                              />
                            </div>
                            <div className="col-md-6 mb-3">
                              <label htmlFor="city">City</label>
                              <CitySelect
                                stateCode={state}
                                selectedCity={city}
                                setSelectedCity={setCity}
                              />
                            </div>
                            <div className="col-md-6 mb-3">
                              <label htmlFor="state">County</label>
                              <CountySelect
                                selectedState={state}
                                selectedCounty={county}
                                setSelectedCounty={setCounty}
                              />
                            </div>
                            <div className="col-md-6 mb-3">
                              <label htmlFor="zip">ZIP Code</label>
                              <input
                                type="text"
                                name="zip"
                                id="zip"
                                className="form-control"
                                value={formData.zip}
                                onChange={handleInputChange}
                                placeholder="Enter ZIP Code"
                              />
                            </div>
                            <div className="col-md-6 mb-3">
                              <label htmlFor="zip">Mobile Phone</label>
                              <input
                                type="text"
                                name="mobilePhone"
                                id="mobilePhone"
                                className="form-control"
                                value={formData.mobilePhone}
                                onChange={handleInputChange}
                                placeholder="Enter Mobile phone number"
                              />
                            </div>
                            <div className="col-md-6 mb-3">
                              <label htmlFor="zip">
                                Alternative MobilePhone
                              </label>
                              <input
                                type="text"
                                name="altMobilePhone"
                                id="altMobilePhone"
                                className="form-control"
                                value={formData.altMobilePhone}
                                onChange={handleInputChange}
                                placeholder="Enter alternative phone number"
                              />
                            </div>
                            <div className="col-md-12">
                              <div className="col-md-12 my-2">
                                <input
                                  type="checkbox"
                                  name="evacuationAddress"
                                  id="evacuationAddress"
                                  onChange={handleInputChange}
                                  checked={formData.evacuationAddress}
                                />{" "}
                                Set as visit location
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Additional Comments */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingComments">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseComments"
                        aria-expanded="false"
                        aria-controls="collapseComments"
                      >
                        Comments
                      </button>
                    </h2>
                    <div
                      id="collapseComments"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingComments"
                      data-bs-parent="#ClinicalDiagnosisInfoAccordion"
                    >
                      <div className="accordion-body py-2">
                        <label htmlFor="">Template</label>
                        <Template
                          selectedTemplate={template}
                          setSelectedTemplate={setTemplate}
                        />
                        <div className="mb-3">
                          <label htmlFor="comments" className="form-label">
                            Comments
                          </label>
                          <textarea
                            name="comments"
                            id="comments"
                            className="form-control"
                            value={formData.comments}
                            onChange={handleInputChange}
                            placeholder="Enter Additional Comments"
                          ></textarea>
                        </div>
                      </div>
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
              </div>
            </form>
          </EditModal>
        )}
        <div className="mt-5">
          <DataTable
            columns={columns}
            tableName="emergencyPreparedness"
            data={data?.payload?.emergencies ?? []}
            tableClassName="custom-table"
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default EmergencyPreparedness;
