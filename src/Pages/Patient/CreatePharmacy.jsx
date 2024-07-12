import { useState ,useEffect} from "react";
import { useCreatePharmacyMutation } from "../../Redux/api/PharmacyApi";
import PageHeader from "./../../components/FormElement/PageHeader";
import AuthLoader from "./../../utils/Loaders/AuthLoader";
import StateSelect from "./../../components/FormElement/StateSelect";
import CitySelect from "./../../components/FormElement/CitySelect";

const CreatePharmacy = () => {
  const [createPharmacy, { data, isLoading, error }] =
    useCreatePharmacyMutation();
    const localStorageData = JSON.parse(localStorage.getItem("Pharmacy"))
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const initialFormData = {
    pharmacyName: localStorageData?.pharmacyName || "",
    addressLine1: localStorageData?.addressLine1 || "",
    addressLine2: localStorageData?.addressLine2 || "",
    city: localStorageData?.city || "",
    state: localStorageData?.state || "",
    zip: localStorageData?.zip || "",
    primaryPhone: localStorageData?.primaryPhone || "",
    contactFirstName: localStorageData?.contactFirstName || "",
    contactLastName: localStorageData?.contactLastName || "",
    email: localStorageData?.email || "",
    faxNumber: localStorageData?.faxNumber || "",
    comment: localStorageData?.comment || "",
    additionalPharmacies: localStorageData?.additionalPharmacies || [{ name: "" }],
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
  const [formError, setFormError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!formData.pharmacyName) {
      setFormError("Pharmacy Name required!");
      return;
    }
    if (!formData.contactFirstName) {
      setFormError("First Name required!");
      return;
    }
    if (!formData.contactLastName) {
      setFormError("Last Name required!");
      return;
    }
    if (!formData.email) {
      setFormError("Last Name required!");
      return;
    }
    if (!formData.addressLine1) {
      setFormError("Address Line 1 is required!");
      return;
    }
    if (!city) {
      setFormError("City is required!");
      return;
    }
    if (!state) {
      setFormError("state is required!");
      return;
    }
    if (!formData.zip) {
      setFormError("zip is required!");
      return;
    }
    if (!formData.primaryPhone) {
      setFormError("Primary Phone is required!");
      return;
    }else{
      console.log(formData);
      setFormError("")
      formData.city = city;
      formData.state = state;
      createPharmacy(formData);
      localStorage.removeItem("Pharmacy")
    }
    
  };
  const handleSaveAndContinue = (e) => {
    e.preventDefault();
    localStorage.setItem("Pharmacy", JSON.stringify(formData));
    setFormError("");
    createPharmacy(formData);
  };
  const handleSaveAndExit = (e) => {
    e.preventDefault();
    localStorage.setItem("Pharmacy", JSON.stringify(formData));
    setFormError("");
  };
  useEffect(()=>{
 setCity(localStorageData?.city?localStorageData?.city:"")
 setState(localStorageData?.state?localStorageData?.state:"")
  },[localStorageData])
  if (isLoading) return <AuthLoader />;
  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="card-body">
        <div className="accordion" id="ClinicalDiagnosisInfoAccordion">
          <PageHeader title="Pharmacy" className="card-header fs-3" />
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
          {formError && (
            <div className="alert alert-danger text-center">{formError}</div>
          )}
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
              <div className="accordion-body">
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
                    <label htmlFor="primaryPhone" className="form-label">
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
                    <label htmlFor="contactFirstName" className="form-label">
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
                    <label htmlFor="contactLastName" className="form-label">
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
            <h2 className="accordion-header" id="headingAdditionalPharmacies">
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
              <div className="accordion-body">
                <div className="row mb-3">
                  {formData.additionalPharmacies.map((pharmacy, index) => (
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
                  ))}
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
          <button
            onClick={handleSaveAndContinue}
            type="submit"
            className="btn btn-warning me-2"
          >
            save and continue
          </button>
          <button
            onClick={handleSaveAndExit}
            type="submit"
            className="btn btn-danger me-2"
          >
            save and exit
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreatePharmacy;
