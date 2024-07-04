import { useState } from "react";
import MultiSelect from "../../components/FormElement/MultiSelect";
import MultiInput from "../../components/FormElement/MultiInput";
import DatePicker from "react-datepicker";
import useFormFields from "./../../hook/useFormHook";
import PickDate from './../../components/FormElement/DatePicker';

const CreateNewIndividual = () => {
  const [startDate, setStartDate] = useState(new Date());
  const initialState = {
    name: "",
    address: "",
    dateOfBirth: "",
    age: "",
    gender: "",
    race: "",
    maritalStatus: "",
    medicaidIdentification: "",
    treatingPhysician: "",
    allergies: "",
    dietaryRestrictions: "",
    drugFoodInteractions: "",
    medicalHistory: "",
    significantPhoneNumbers: "",
    advanceDirectives: "",
    medicalPowerOfAttorney: false,
    doNotResuscitate: false,
  };

  const [formData, handleChange, resetForm] = useFormFields(initialState);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement your submit logic here
    console.log(formData);
  };
  return (
    <div>
      <div className="card ">
        <h5 className="card-header pb-0"> CareLink Aide facesheet</h5>
        <h6 className="fs-6 card-header">Per OAC 5160-46-04</h6>
      <div className="card-body">
      <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="mb-3 col-md-6">
              <label htmlFor="name" className="form-label">
                Name of Individual
              </label>
              <input
                type="text"
                id="name"
                placeholder="name of individual"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3 col-md-6">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                id="address"
                placeholder="Address"
                name="address"
                className="form-control"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3 col-md-3">
              <label htmlFor="dateOfBirth" className="form-label">
                Date of Birth
              </label>
              <PickDate/>
            </div>

            <div className="mb-3 col-md-2">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                type="text"
                id="age"
                placeholder="age"
                name="age"
                className="form-control"
                value={formData.age}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3 col-md-2">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <input
                type="text"
                id="gender"
                placeholder="asdfd"
                name="gender"
                className="form-control"
                value={formData.gender}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3 col-md-2">
              <label htmlFor="race" className="form-label">
                Race
              </label>
              <input
                type="text"
                id="race"
                placeholder="Race"
                name="race"
                className="form-control"
                value={formData.race}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3 col-md-2">
              <label htmlFor="maritalStatus" className="form-label">
                Marital Status
              </label>
              <input
                type="text"
                id="maritalStatus"
                placeholder="Marital Status"
                name="maritalStatus"
                className="form-control"
                value={formData.maritalStatus}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3 col-md-6">
              <label htmlFor="medicaidIdentification" className="form-label">
                Medicaid Identification #
              </label>
              <input
                type="text"
                id="medicaidIdentification"
                placeholder="Medicaid Identification"
                name="medicaidIdentification"
                className="form-control"
                value={formData.medicaidIdentification}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3 col-md-6">
              <label htmlFor="treatingPhysician" className="form-label">
                Treating Physician
              </label>
              <input
                type="text"
                id="treatingPhysician"
                placeholder="Treating Physician"
                name="treatingPhysician"
                className="form-control"
                value={formData.treatingPhysician}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3 col-md-4">
              <label htmlFor="allergies" className="form-label">
                Allergies
              </label>
              <input
                type="text"
                id="allergies"
                placeholder="Allergies"
                name="allergies"
                className="form-control"
                value={formData.allergies}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3 col-md-4">
              <label htmlFor="dietaryRestrictions" className="form-label">
                Dietary Restrictions
              </label>
              <input
                type="text"
                id="dietaryRestrictions"
                placeholder="Dietary Restrictions"
                name="dietaryRestrictions"
                className="form-control"
                value={formData.dietaryRestrictions}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3 col-md-4">
              <label htmlFor="drugFoodInteractions" className="form-label">
                Drug and Food Interactions
              </label>
              <input
                type="text"
                id="drugFoodInteractions"
                placeholder="Drug and Food Interactions"
                name="drugFoodInteractions"
                className="form-control"
                value={formData.drugFoodInteractions}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3 col-md-12">
              <label htmlFor="medicalHistory" className="form-label">
                Medical History
              </label>
              <textarea
                id="medicalHistory"
                placeholder="Medical History"
                name="medicalHistory"
                className="form-control"
                value={formData.medicalHistory}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3 col-md-6">
              <label htmlFor="significantPhoneNumbers" className="form-label">
                Significant Phone Numbers
              </label>
              <input
                type="text"
                id="significantPhoneNumbers"
                placeholder="Significant Phone Numbers"
                name="significantPhoneNumbers"
                className="form-control"
                value={formData.significantPhoneNumbers}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3 col-md-6 flex align-items-center">
              <label htmlFor="advanceDirectives" className="form-label">
                Advance Directives
              </label>
              <input
                type="text"
                id="advanceDirectives"
                placeholder="Advance Directives"
                name="advanceDirectives"
                className="form-control"
                value={formData.advanceDirectives}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3 form-check col-md-12 ">
              <input
                type="checkbox"
                id="medicalPowerOfAttorney"
                placeholder="asdfd"
                name="medicalPowerOfAttorney"
                className="form-check-input"
                checked={formData.medicalPowerOfAttorney}
                onChange={handleChange}
              />
              <label
                htmlFor="medicalPowerOfAttorney"
                className="form-check-label"
              >
                Medical Power of Attorney
              </label>
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                id="doNotResuscitate"
                placeholder="do Not Resuscitate"
                name="doNotResuscitate"
                className="form-check-input"
                checked={formData.doNotResuscitate}
                onChange={handleChange}
              />
              <label htmlFor="doNotResuscitate" className="form-check-label">
                Do Not Resuscitate (DNR) Order
              </label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
      </div>
    </div>
  );
};

export default CreateNewIndividual;
