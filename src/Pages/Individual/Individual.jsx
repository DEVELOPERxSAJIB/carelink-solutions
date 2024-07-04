import DataTable from "./../../components/Tables/DynamicTable";
import { useNavigate } from "react-router-dom";
import Accordion from "./../../components/Tables/Accordion";
import FullscreenModal from './../../components/Models/FullScreenModel';
import useFormFields from './../../hook/useFormHook';

const Individual = () => {
  const columns = [
    { header: "S.No", field: "serialNumber" },
    { header: "Individual ID", field: "individualId" },
    { header: "First Name", field: "firstName" },
    { header: "Last Name", field: "lastName" },
    { header: "Created By", field: "createdBy" },
    { header: "Status", field: "status" },
    {
      header: "Stakeholders(s)",
      field: "stakeholders",
      render: (rowData) => (
        <Accordion
          tableHead={"Stakeholders Details"}
          data={rowData.stakeholders}
        />
      ),
    },
    {
      header: "Actions",
      field: "actions",
      render: (rowData) => (
        <div className="d-flex gap-3 flex-wrap">
          <button
            className="btn btn-sm btn-secondary create-new btn-warning waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span>
              <i className="ti ti-edit me-sm-1" />{" "}
              <span className="d-none d-sm-inline-block">Edit</span>
            </span>
          </button>

          <button
            className="btn btn-sm btn-secondary create-new btn-danger waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span>
              <i className="ti ti-user me-sm-1" />{" "}
              <span className="d-none d-sm-inline-block">View user</span>
            </span>
          </button>
          <button
            className="btn btn-sm btn-secondary create-new btn-primary waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span>
              <i className="ti ti-notes me-sm-1" />{" "}
              <span className="d-none d-sm-inline-block">Assign Form</span>
            </span>
          </button>
        </div>
      ),
    },
  ];

  const data = [
    {
      serialNumber: 1,
      individualId: "001",
      firstName: "Adnan",
      lastName: "Sidirijal",
      createdBy: "Liban Awil",
      status: "active",
      stakeholders: [
        "NA",
        "Email Address: adnan@gmail.com",
        "Address1: 4691 McFadden Rd",
        "Address2: NA",
        "City: Columbus",
        "State: OH",
        "Zipcode: 43229",
        "Phone: (614) 616-0379",
        "Last Modified By: Liban Awil Agency",
        "Last Modified On: 06/28/2024 09:53 PM",
        "Changed Status: -",
      ],
    },
    {
      serialNumber: 2,
      individualId: "002",
      firstName: "John",
      lastName: "Doe",
      createdBy: "Jane Smith",
      status: "block",
      stakeholders: [
        "NA",
        "Email Address: john.doe@example.com",
        "Address1: 123 Main St",
        "Address2: Apt 2B",
        "City: Anytown",
        "State: CA",
        "Zipcode: 90210",
        "Phone: (555) 123-4567",
        "Last Modified By: Jane Smith",
        "Last Modified On: 06/30/2024 10:15 AM",
        "Changed Status: -",
      ],
    },
    {
      serialNumber: 3,
      individualId: "003",
      firstName: "Alice",
      lastName: "Johnson",
      createdBy: "Bob Brown",
      status: "active",
      stakeholders: [
        "NA",
        "Email Address: alice.johnson@example.com",
        "Address1: 456 Oak St",
        "Address2: Suite 100",
        "City: Smallville",
        "State: NY",
        "Zipcode: 12345",
        "Phone: (555) 987-6543",
        "Last Modified By: Bob Brown",
        "Last Modified On: 06/29/2024 03:30 PM",
        "Changed Status: -",
      ],
    },
    {
      serialNumber: 4,
      individualId: "004",
      firstName: "Eve",
      lastName: "Smith",
      createdBy: "Alice Green",
      status: "block",
      stakeholders: [
        "NA",
        "Email Address: eve.smith@example.com",
        "Address1: 789 Elm St",
        "Address2: Unit 5C",
        "City: Metroville",
        "State: TX",
        "Zipcode: 54321",
        "Phone: (555) 789-0123",
        "Last Modified By: Alice Green",
        "Last Modified On: 06/30/2024 11:45 AM",
        "Changed Status: -",
      ],
    },
    {
      serialNumber: 5,
      individualId: "005",
      firstName: "Michael",
      lastName: "Clark",
      createdBy: "Sarah White",
      status: "active",
      stakeholders: [
        "NA",
        "Email Address: michael.clark@example.com",
        "Address1: 567 Pine Ave",
        "Address2: Suite 200",
        "City: Lakeside",
        "State: FL",
        "Zipcode: 67890",
        "Phone: (555) 234-5678",
        "Last Modified By: Sarah White",
        "Last Modified On: 06/29/2024 04:20 PM",
        "Changed Status: -",
      ],
    },
  ];

  const initialState = {
    individualId: "",
    gender: "Male",
    dateOfBirth: "",
    firstName: "",
    lastName: "",
    email: "",
    county: "Adams County",
    address1: "",
    address2: "",
    country: "",
    state: "",
    city: "",
    zip: "",
    phoneType: "",
    phone: "",
    cellPhone: "",
    fax: "",
    language: "",
    medicaidNumber: "",
    medicareNumber: "",
    memo: "",
    patientAddressPrimary: false,
    patientAddressType: "",
  };

  const [formData, handleChange, resetForm, isValid] = useFormFields(
    initialState
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // handleSave(formData);
    resetForm();
  };

  return (
    <div className="card">
      <div className="card-header py-3 pt-5 fs-3">Manage Sub Users</div>
      <div className="card-body">
        <div className="gap-3 d-flex">
          <FullscreenModal className="col-md-7  " id="managesubusers" title="Add Individual" onSave={handleSubmit}>
            <form className="w-100 from-scrollbar px-3">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="individualId" className="form-label">
                    Individual ID <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="individualId"
                    name="individualId"
                    className="form-control"
                    value={formData.individualId}
                    onChange={handleChange}
                    placeholder="Individual ID"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="gender" className="form-label">
                    Gender <span className="text-danger">*</span>
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    className="form-select"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="dateOfBirth" className="form-label">
                    Date Of Birth <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    className="form-control"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="form-control"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="form-control"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="county" className="form-label">
                    County Served In <span className="text-danger">*</span>
                  </label>
                  <select
                    id="county"
                    name="county"
                    className="form-select"
                    value={formData.county}
                    onChange={handleChange}
                    required
                  >
                    <option value="Adams County">Adams County</option>
                    {/* Add more county options here */}
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="patientAddressType" className="form-label">
                    Patient Address Type
                  </label>
                  <select
                    id="patientAddressType"
                    name="patientAddressType"
                    className="form-select"
                    value={formData.patientAddressType}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    {/* Add more address type options here */}
                  </select>
                </div>
                <div className="col-md-6 mb-3 form-check">
                  <input
                    type="checkbox"
                    id="patientAddressPrimary"
                    name="patientAddressPrimary"
                    className="form-check-input"
                    checked={formData.patientAddressPrimary}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="patientAddressPrimary"
                    className="form-check-label"
                  >
                    Patient Address Is Primary
                  </label>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="address1" className="form-label">
                    Address1 <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="address1"
                    name="address1"
                    className="form-control"
                    value={formData.address1}
                    onChange={handleChange}
                    placeholder="Address1"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="address2" className="form-label">
                    Address2
                  </label>
                  <input
                    type="text"
                    id="address2"
                    name="address2"
                    className="form-control"
                    value={formData.address2}
                    onChange={handleChange}
                    placeholder="Address2"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="country" className="form-label">
                    Country <span className="text-danger">*</span>
                  </label>
                  <select
                    id="country"
                    name="country"
                    className="form-select"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Country</option>
                    {/* Add more country options here */}
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="state" className="form-label">
                    State <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    className="form-control"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="city" className="form-label">
                    City <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="form-control"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="zip" className="form-label">
                    Zip <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    className="form-control"
                    value={formData.zip}
                    onChange={handleChange}
                    placeholder="Zip"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="phoneType" className="form-label">
                    Phone Type
                  </label>
                  <select
                    id="phoneType"
                    name="phoneType"
                    className="form-select"
                    value={formData.phoneType}
                    onChange={handleChange}
                  >
                    <option value="">Select Type</option>
                    {/* Add more phone type options here */}
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="phone" className="form-label">
                    Telephone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="cellPhone" className="form-label">
                    Cell Phone
                  </label>
                  <input
                    type="text"
                    id="cellPhone"
                    name="cellPhone"
                    className="form-control"
                    value={formData.cellPhone}
                    onChange={handleChange}
                    placeholder="Cell Phone"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="fax" className="form-label">
                    Fax
                  </label>
                  <input
                    type="text"
                    id="fax"
                    name="fax"
                    className="form-control"
                    value={formData.fax}
                    onChange={handleChange}
                    placeholder="Fax"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="language" className="form-label">
                    Language
                  </label>
                  <input
                    type="text"
                    id="language"
                    name="language"
                    className="form-control"
                    value={formData.language}
                    onChange={handleChange}
                    placeholder="Language"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="medicaidNumber" className="form-label">
                    Medicaid Number
                  </label>
                  <input
                    type="text"
                    id="medicaidNumber"
                    name="medicaidNumber"
                    className="form-control"
                    value={formData.medicaidNumber}
                    onChange={handleChange}
                    placeholder="Medicaid Number"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="medicareNumber" className="form-label">
                    Medicare Number
                  </label>
                  <input
                    type="text"
                    id="medicareNumber"
                    name="medicareNumber"
                    className="form-control"
                    value={formData.medicareNumber}
                    onChange={handleChange}
                    placeholder="Medicare Number"
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label htmlFor="memo" className="form-label">
                    Memo
                  </label>
                  <textarea
                    id="memo"
                    name="memo"
                    className="form-control"
                    value={formData.memo}
                    onChange={handleChange}
                    placeholder="Memo"
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label htmlFor="uploadPicture" className="form-label">
                    Upload Your Picture
                  </label>
                  <input
                    type="file"
                    id="uploadPicture"
                    name="uploadPicture"
                    className="form-control"
                    onChange={handleChange}
                    accept=".jpg,.png,.jpeg"
                  />
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!isValid}
                >
                  Add new Individual
                </button>
              </div>
            </form>
          </FullscreenModal>

          <button
            className="btn btn-sm btn-secondary create-new btn-danger waves-effect waves-light"
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
        </div>
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={data}
            tableClassName="custom-table"
          />
        </div>
      </div>
    </div>
  );
};

export default Individual;
