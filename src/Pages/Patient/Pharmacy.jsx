import DataTable from "./../../components/Tables/DynamicTable";
import ExportButton from "./../../components/Buttons/ExportButton";
import TableHeader from "./../../components/Tables/TableHeader";
import {
  useGetAllPharmaciesQuery,
  useUpdatePharmacyMutation,
  useDeletePharmacyMutation,
} from "../../Redux/api/PharmacyApi"; // Adjust the import path as per your actual API setup
import { useNavigate } from "react-router-dom";
import MainLoader from "./../../utils/Loaders/MainLoader";
import { useState, useEffect } from "react";
import EditModal from "./../../components/Models/EditModal";
import StateSelect from "./../../components/FormElement/StateSelect";
import CitySelect from "./../../components/FormElement/CitySelect";
import {useMeQuery} from "../../Redux/api/UserApi"
import swal from "sweetalert";
import Alert from "./../../components/Alert/Alert";
const Pharmacy = () => {
  const {data:lgData} = useMeQuery()
  const { data, isLoading, refetch } = useGetAllPharmaciesQuery();
  const [
    updatePharmacy,
    { data: updateData, isSuccess: isUpdateSuccess, error: updateError },
  ] = useUpdatePharmacyMutation();
  const [
    deletePharmacy,
    { data: deleteData, isSuccess: isDeleteSuccess, error: deleteError },
  ] = useDeletePharmacyMutation();
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(false);
  const navigate = useNavigate();

  const handleDelete = (row) => {
    //console.log(row);
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deletePharmacy(row._id);
      }
    });
  };
  const handleEdit = (row) => {

    setEditId(row._id);
    setShow(true);
    setFormData({ ...row });
    setCity(row.city)
    setState(row.state)
  };

  const columns = [
    { field: "pharmacyName", header: "Pharmacy Name" },
    { field: "addressLine1", header: "Address Line 1" },
    { field: "addressLine2", header: "Address Line 2" },
    { field: "city", header: "City" },
    { field: "state", header: "State" },
    { field: "zip", header: "ZIP Code" },
    { field: "primaryPhone", header: "Primary Phone" },
    { field: "contactFirstName", header: "Contact First Name" },
    { field: "contactLastName", header: "Contact Last Name" },
    { field: "email", header: "Email" },
    { field: "faxNumber", header: "Fax Number" },
    { field: "comment", header: "Comment" },
  ];
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const initialFormData = {
    pharmacyName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
    primaryPhone: "",
    contactFirstName: "",
    contactLastName: "",
    email: "",
    faxNumber: "",
    comment: "",
    additionalPharmacies: [{ name: "" }],
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (index !== undefined) {
      const newAdditionalPharmacies = [...formData.additionalPharmacies];
      newAdditionalPharmacies[index] = {
        ...newAdditionalPharmacies[index],
        [name]: value,
      };
      setFormData({
        ...formData,
        additionalPharmacies: newAdditionalPharmacies,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAddPharmacy = () => {
    setFormData({
      ...formData,
      additionalPharmacies: [...formData.additionalPharmacies, { name: "" }],
    });
  };

  const handleRemovePharmacy = (index) => {
    const newAdditionalPharmacies = [
      ...formData.additionalPharmacies.slice(0, index),
      ...formData.additionalPharmacies.slice(index + 1),
    ];
    setFormData({
      ...formData,
      additionalPharmacies: newAdditionalPharmacies,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(formData);
    formData.city = city;
    formData.state = state;
    updatePharmacy({ pharmacyId: editId, pharmacyData: formData });
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
        title="Pharmacy List"
        className="py-3 pt-5 fs-3 card-header"
      />
      <div className="card-body">
        <Alert message={message} type="success" />

        <div className="gap-3 d-flex flex-wrap">
          <ExportButton
            data={data?.payload?.pharmacies}
            orientation="landscape"
            columns={columns}
            fileName="Pharmacy"
          />
          {lgData?.payload?.user?.curd.includes("create") && (<button
            className="btn btn-success waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
            onClick={() => navigate("/create-pharmacy")}
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-plus me-1" />
              <span className="d-none d-sm-inline-block">Add New Pharmacy</span>
            </span>
          </button>)}
          {lgData?.payload?.user?.curd.includes("delete") && (<button
            className="btn btn-secondary create-new btn-danger waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-trash me-sm-1" />{" "}
              <span className="d-none d-sm-inline-block">Delete selected</span>
            </span>
          </button>)}
          
        </div>
        {show && (
          <EditModal onClose={setShow}
            title="Edit Pharmacy"
            style={{
              minWidth: "70%",
              maxWidth: "70%",
              maxHeight: "80vh",
              overflowY: "scroll",
            }}
          >
            <form onSubmit={handleSubmit} className="card">
              <div className="card-body">
                <div className="accordion" id="ClinicalDiagnosisInfoAccordion">
                  <Alert message={errors} type="danger" />

                  {/* Pharmacy Information */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingPharmacyInfo">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapsePharmacyInfo"
                        aria-expanded="true"
                        aria-controls="collapsePharmacyInfo"
                      >
                        Pharmacy Information
                      </button>
                    </h2>
                    <div
                      id="collapsePharmacyInfo"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingPharmacyInfo"
                      data-bs-parent="#ClinicalDiagnosisInfoAccordion"
                    >
                      <div className="accordion-body py-2">
                        <div className="mb-3">
                          <label htmlFor="pharmacyName" className="form-label">
                            Pharmacy Name:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="pharmacyName"
                            name="pharmacyName"
                            value={formData.pharmacyName}
                            onChange={handleInputChange}
                            placeholder="Begin typing the pharmacy name"
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="addressLine1" className="form-label">
                            Address Line 1:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="addressLine1"
                            name="addressLine1"
                            value={formData.addressLine1}
                            onChange={handleInputChange}
                            placeholder="Enter address line 1"
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="addressLine2" className="form-label">
                            Address Line 2:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="addressLine2"
                            name="addressLine2"
                            value={formData.addressLine2}
                            onChange={handleInputChange}
                            placeholder="Enter address line 2"
                          />
                        </div>
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <label htmlFor="city" className="form-label">
                              City:
                            </label>
                            <CitySelect
                              stateCode={state}
                              selectedCity={city}
                              setSelectedCity={setCity}
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="state" className="form-label">
                              State:
                            </label>
                            <StateSelect
                              selectedState={state}
                              setSelectedState={setState}
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="zip" className="form-label">
                              Zip:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="zip"
                              name="zip"
                              value={formData.zip}
                              onChange={handleInputChange}
                              placeholder="Enter zip code"
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <label
                              htmlFor="primaryPhone"
                              className="form-label"
                            >
                              Primary Phone:
                            </label>
                            <input
                              type="tel"
                              className="form-control"
                              id="primaryPhone"
                              name="primaryPhone"
                              value={formData.primaryPhone}
                              onChange={handleInputChange}
                              placeholder="Enter primary phone"
                            />
                          </div>
                          <div className="col-md-6">
                            <label
                              htmlFor="contactFirstName"
                              className="form-label"
                            >
                              Contact First Name:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="contactFirstName"
                              name="contactFirstName"
                              value={formData.contactFirstName}
                              onChange={handleInputChange}
                              placeholder="Enter contact first name"
                            />
                          </div>
                          <div className="col-md-6">
                            <label
                              htmlFor="contactLastName"
                              className="form-label"
                            >
                              Contact Last Name:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="contactLastName"
                              name="contactLastName"
                              value={formData.contactLastName}
                              onChange={handleInputChange}
                              placeholder="Enter contact last name"
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="email" className="form-label">
                              Email:
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="Enter email"
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="faxNumber" className="form-label">
                              Fax Number:
                            </label>
                            <input
                              type="tel"
                              className="form-control"
                              id="faxNumber"
                              name="faxNumber"
                              value={formData.faxNumber}
                              onChange={handleInputChange}
                              placeholder="Enter fax number"
                            />
                          </div>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="comment" className="form-label">
                            Comment:
                          </label>
                          <textarea
                            className="form-control"
                            id="comment"
                            name="comment"
                            value={formData.comment}
                            onChange={handleInputChange}
                            rows="3"
                            placeholder="Enter any comments"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Pharmacies */}
                  <div className="accordion-item">
                    <h2
                      className="accordion-header"
                      id="headingAdditionalPharmacies"
                    >
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseAdditionalPharmacies"
                        aria-expanded="false"
                        aria-controls="collapseAdditionalPharmacies"
                      >
                        Additional Pharmacy
                      </button>
                    </h2>
                    <div
                      id="collapseAdditionalPharmacies"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingAdditionalPharmacies"
                      data-bs-parent="#ClinicalDiagnosisInfoAccordion"
                    >
                      <div className="accordion-body py-2">
                        <div className="row mb-3">
                          {formData.additionalPharmacies.map(
                            (pharmacy, index) => (
                              <div key={index} className="col-md-6">
                                <label
                                  htmlFor={`additionalPharmacy${index + 1}`}
                                  className="form-label"
                                >
                                  Additional Pharmacy {index + 1}
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id={`additionalPharmacy${index + 1}`}
                                  name="name"
                                  value={pharmacy.name}
                                  onChange={(e) => handleInputChange(e, index)}
                                  placeholder="Begin typing the pharmacy name"
                                />
                                <button
                                  onClick={() => handleRemovePharmacy(index)}
                                  className="btn-sm btn mt-2 btn-danger"
                                >
                                  remove
                                </button>
                              </div>
                            )
                          )}
                        </div>
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={handleAddPharmacy}
                        >
                          Add Pharmacy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="d-flex justify-content-end mt-3">
                  <button type="submit" className="btn btn-success me-2">
                    save
                  </button>
                </div>
              </div>
            </form>
          </EditModal>
        )}
        <div className="mt-5">
          <DataTable
            onDelete={handleDelete}
            onEdit={handleEdit}
            tableName="pharmacy"
            columns={columns}
            data={data?.payload?.pharmacies ?? []}
            tableClassName="custom-table"
          />
        </div>
      </div>
    </div>
  );
};

export default Pharmacy;
