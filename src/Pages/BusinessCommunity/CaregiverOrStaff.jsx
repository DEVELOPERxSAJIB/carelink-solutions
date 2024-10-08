import { useState, useEffect } from "react";
import DataTable from "../../components/Tables/DynamicTable";
import useCSVOperations from "../../hook/useExportData";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useProcessSubRegisterMutation } from "../../Redux/api/UserApi";
import StateSelect from "../../components/FormElement/StateSelect";
import CitySelect from "../../components/FormElement/CitySelect";
import CountySelect from "../../components/FormElement/CountySelect";
import FullscreenModal from "../../components/Models/FullScreenModel";
import TableHeader from "../../components/Tables/TableHeader";
import generateRandomId from "./../../utils/RandomIdGenerator";
import useFormValidation from "./../../hook/useFormValidation";
import MultiSelect from "./../../components/FormElement/MultiSelect";
import curdOption from "./../../utils/CurdOptions";
import pagesOption from "./../../utils/PagesOptions";
import { showToast } from './../../utils/Toastify';
import closeModal from './../../utils/modalClose';
import {
  useMeQuery,
  useGetAllCaregiverQuery,
  useUpdateCaregiverMutation,
  useDeleteUserMutation,
} from "../../Redux/api/UserApi";
import EditModal from "./../../components/Models/EditModal";
import swal from "sweetalert";

import {
  registrationSchema,
  updateregistrationSchema,
} from "../../utils/validationSchemas";

const CaregiverOrStaff = () => {

  const { data: addedBy } = useMeQuery();
  const { data, refetch } = useGetAllCaregiverQuery();
  const [
    updateUser,
    {
      data: updateData,
      isSuccess: isUpdateSuccess,
      isLoading: isUpdateLoading,
      error: updateError,
    },
  ] = useUpdateCaregiverMutation();
  const [
    deleteUser,
    { data: deleteData, isSuccess: isDeleteSuccess, error: deleteError },
  ] = useDeleteUserMutation();
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);
  const columns = [
    { header: "ID", field: "_id" },
    { header: "First Name", field: "firstName" },
    { header: "Last Name", field: "lastName" },
    { header: "Email", field: "email" },
    { header: "Phone", field: "phone" },
    { header: "Address 1", field: "address1" },
    { header: "Address 2", field: "address2" },
    { header: "ZIP", field: "zip" },
    { header: "Added By", field: "addedBy" },
    { header: "Role", field: "role" },
    { header: "Status", field: "status" },
  ];
  const navigate = useNavigate();
  const initialValues = {
    role: "caregiver",
    phone: "",
    address1: "",
    address2: "",
    zip: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    agreePrivacyPolicy: false,
  };
  const [processSubRegister, { error, isSuccess, isLoading, isError }] =
    useProcessSubRegisterMutation();
  const [selectedCurd, setSelectCurd] = useState([]);

  const [selectedPages, setSelectedPages] = useState(["all"]);
  const onSubmit = (data) => {
    const updatedData = {
      ...data,
      role: "caregiver",
      city: selectedCity,
      county: selectedCounty,
      state: selectedState,
      caregiverID: generateRandomId("caregiver"),
      addedBy: addedBy?.payload?.user?._id,

      permissions: selectedPages.map((item) => item.value),
      curd: selectedCurd.map((item) => item.value),
    };
    if (editId) {
      updateUser({ userId: editId, userData: updatedData });
    } else {
      processSubRegister(updatedData);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useFormValidation(initialValues, registrationSchema, onSubmit);
  const {
    register: updateRegister,
    handleSubmit: updateHandleSubmit,
    formState: { errors: updateErrors },
    reset: updateReset,
  } = useFormValidation(initialValues, updateregistrationSchema, onSubmit);

  const handleEdit = (rowData) => {
    setShow(true);
    setEditId(rowData?._id);
    updateReset({ ...rowData });
    setSelectedState(rowData.state);
    setSelectedCity(rowData.city);
    setSelectedCounty(rowData.county);
    setSelectCurd(rowData?.curd?.map((item) => ({ label: item, value: item })));
    setSelectedPages(
      rowData?.permissions?.map((item) => ({
        label: item?.slice(1),
        value: item,
      }))
    );
  };

  const handleDelete = (rowData) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteUser(rowData._id);
      }
    });
  };

  
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCounty, setSelectedCounty] = useState(null);
  const { handleCSVFileUpload, handleExportSelected, handleDeleteSelected } =
    useCSVOperations(data, columns);
  useEffect(() => {
    if (isSuccess) {
      reset();
      refetch();
      setSelectedCity(null);
      setSelectedCounty(null);
      setSelectedState(null);
      closeModal()
    }
    if (isUpdateSuccess) {
      refetch();
      setShow(false);
    }
    if (isDeleteSuccess) {
      refetch();
    }
  }, [isSuccess, reset, isUpdateSuccess, isDeleteSuccess, refetch]);
  useEffect(() => {
    showToast("success", updateData?.message);
    showToast("success", deleteData?.message);
    showToast("error", updateError?.data?.message);
    showToast("error", error?.data?.message);
    showToast("success", data?.message);
  }, [
    updateData?.message,deleteData?.message,
    updateError?.data?.message,
    error?.data?.message,
    data?.message,
  ]);
  return (
    <>
      <div className="card">
        <TableHeader
          title="Caregiver/Staff"
          className="py-3 pt-5 fs-3 card-header"
        />
        <div className="card-body">
          <div className="gap-3 d-flex flex-wrap">
          {addedBy?.payload?.user?.curd?.includes("create") &&
            <FullscreenModal
              id="addnewcocaregiver"
              title="Add New caregiver"
              className="col-md-8"
              style={{ width: "100%", minHeight: "60vh" }}
            >
              <>
                <div className="d-flex flex-column w-100 justify-content-center align-items-center">
                
                  <div className="row justify-content-center d-flex align-items-center">
                    <div className="col-md-12">
                      <div className="card-body">
                        <form
                          className="from-scrollbar"
                          onSubmit={handleSubmit}
                        >
                          <div className="row mx-5">
                            <div className="mb-3 col-md-12">
                              <select
                                id="role"
                                name="role"
                                className="form-select"
                                {...register("role")}
                                value="caregiver"
                                disabled
                              >
                                <option value="caregiver">Admin</option>
                              </select>
                            </div>

                            <div className="mb-3 col-md-6">
                              <label htmlFor="email" className="form-label">
                                Email <span className="text-danger">*</span>
                              </label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                {...register("email", {
                                  required: "Email is required.",
                                  pattern: {
                                    value:
                                      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Invalid email address format.",
                                  },
                                })}
                                required
                              />
                              {errors.email && (
                                <p className="text-danger">
                                  {errors.email.message}
                                </p>
                              )}
                            </div>

                            {/* First Name input field */}
                            <div className="mb-3 col-md-6">
                              <label htmlFor="firstName" className="form-label">
                                First Name{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className="form-control"
                                {...register("firstName", {
                                  required: "First name is required.",
                                })}
                                required
                              />
                              {errors.firstName && (
                                <p className="text-danger">
                                  {errors.firstName.message}
                                </p>
                              )}
                            </div>

                            {/* Last Name input field */}
                            <div className="mb-3 col-md-6">
                              <label htmlFor="lastName" className="form-label">
                                Last Name <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                className="form-control"
                                {...register("lastName", {
                                  required: "Last name is required.",
                                })}
                                required
                              />
                              {errors.lastName && (
                                <p className="text-danger">
                                  {errors.lastName.message}
                                </p>
                              )}
                            </div>
                            {/* Phone input field */}
                            <div className="mb-3 col-md-6">
                              <label htmlFor="phone" className="form-label">
                                Phone <span className="text-danger">*</span>
                              </label>
                              <input
                                type="tel"
                                id="phone"
                                name="phone"
                                className="form-control"
                                {...register("phone", {
                                  required: "Phone number is required.",
                                })}
                                required
                              />
                              {errors.phone && (
                                <p className="text-danger">
                                  {errors.phone.message}
                                </p>
                              )}
                            </div>

                            {/* Address Line 1 input field */}
                            <div className="mb-3 col-md-12">
                              <label htmlFor="address1" className="form-label">
                                Address Line 1{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                id="address1"
                                name="address1"
                                className="form-control"
                                {...register("address1", {
                                  required: "Address is required.",
                                })}
                                required
                              />
                              {errors.address1 && (
                                <p className="text-danger">
                                  {errors.address1.message}
                                </p>
                              )}
                            </div>

                            {/* Address Line 2 input field */}
                            <div className="mb-3 col-md-12">
                              <label htmlFor="address2" className="form-label">
                                Address Line 2
                              </label>
                              <input
                                type="text"
                                id="address2"
                                name="address2"
                                className="form-control"
                                {...register("address2")}
                              />
                            </div>

                            {/* State selection dropdown */}
                            <div className="mb-3 col-md-12">
                              <label htmlFor="state" className="form-label">
                                State <span className="text-danger">*</span>
                              </label>
                              <StateSelect
                                selectedState={selectedState}
                                setSelectedState={setSelectedState}
                              />
                              {selectedState === "" && (
                                <p className="text-danger">
                                  State is required!
                                </p>
                              )}
                            </div>

                            {/* City selection dropdown */}
                            <div className="mb-3 col-md-12">
                              <label htmlFor="city" className="form-label">
                                City <span className="text-danger">*</span>
                              </label>
                              <CitySelect
                                stateCode={selectedState}
                                selectedCity={selectedCity}
                                setSelectedCity={setSelectedCity}
                              />
                              {selectedCity === "" && (
                                <p className="text-danger">City is required!</p>
                              )}
                            </div>

                            {/* County selection dropdown */}
                            <div className="mb-3 col-md-6">
                              <label htmlFor="county" className="form-label">
                                County <span className="text-danger">*</span>
                              </label>
                              <CountySelect
                                selectedState={selectedState}
                                selectedCounty={selectedCounty}
                                setSelectedCounty={setSelectedCounty}
                              />
                              {selectedCounty === "" && (
                                <p className="text-danger">
                                  County is required!
                                </p>
                              )}
                            </div>

                            {/* Zip Code input field */}
                            <div className="mb-3 col-md-6">
                              <label htmlFor="zip" className="form-label">
                                Zip Code <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                id="zip"
                                name="zip"
                                className="form-control"
                                {...register("zip", {
                                  required: "Zip code is required.",
                                })}
                                required
                              />
                              {errors.zip && (
                                <p className="text-danger">
                                  {errors.zip.message}
                                </p>
                              )}
                            </div>
                            <div className="mb-3 col-md-6">
                              <label
                                htmlFor="confirmPassword"
                                className="form-label"
                              >
                                Pages permissions
                              </label>
                              <MultiSelect
                                options={curdOption}
                                value={selectedCurd}
                                onChange={setSelectCurd}
                              />
                            </div>
                            <div className="mb-3 col-md-6">
                              <label
                                htmlFor="confirmPassword"
                                className="form-label"
                              >
                                Pages permissions
                              </label>
                              <MultiSelect
                                options={pagesOption}
                                value={selectedPages}
                                onChange={setSelectedPages}
                              />
                            </div>
                            {/* Email input field */}

                            {/* Password input field */}
                            <div className="mb-3 col-md-6">
                              <label htmlFor="password" className="form-label">
                                Password <span className="text-danger">*</span>
                              </label>
                              <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-control"
                                {...register("password", {
                                  required: "Password is required.",
                                  minLength: {
                                    value: 8,
                                    message:
                                      "Password must be at least 8 characters.",
                                  },
                                })}
                                required
                              />
                              {errors.password && (
                                <p className="text-danger">
                                  {errors.password.message}
                                </p>
                              )}
                            </div>

                            {/* Confirm Password input field */}
                            <div className="mb-3 col-md-6">
                              <label
                                htmlFor="confirmPassword"
                                className="form-label"
                              >
                                Confirm Password{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                className="form-control"
                                {...register("confirmPassword", {
                                  required: "Please confirm your password.",
                                  validate: (value) =>
                                    value === register.password ||
                                    "Passwords do not match.",
                                })}
                                required
                              />
                              {errors.confirmPassword && (
                                <p className="text-danger">
                                  {errors.confirmPassword.message}
                                </p>
                              )}
                            </div>

                            {/* Terms and Conditions checkbox */}
                            <div className="mb-3 col-md-12">
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  id="agreeTerms"
                                  name="agreeTerms"
                                  className="form-check-input"
                                  {...register("agreeTerms", {
                                    required:
                                      "You must agree to the terms and conditions.",
                                  })}
                                  required
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="agreeTerms"
                                >
                                  I agree to the{" "}
                                  <Link to="/terms" className="text-danger">
                                    terms and conditions.
                                  </Link>
                                  <span className="text-danger">*</span>
                                </label>
                                {errors.agreeTerms && (
                                  <p className="text-danger">
                                    {errors.agreeTerms.message}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Privacy Policy checkbox */}
                            <div className="mb-3 col-md-12">
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  id="agreePrivacyPolicy"
                                  name="agreePrivacyPolicy"
                                  className="form-check-input"
                                  {...register("agreePrivacyPolicy", {
                                    required:
                                      "You must agree to the privacy policy.",
                                  })}
                                  required
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="agreePrivacyPolicy"
                                >
                                  I agree to the{" "}
                                  <Link to="/privacy" className="text-danger">
                                    privacy policy.
                                  </Link>
                                  <span className="text-danger">*</span>
                                </label>
                                {errors.agreePrivacyPolicy && (
                                  <p className="text-danger">
                                    {errors.agreePrivacyPolicy.message}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Submit button */}
                            <div className="mb-3 col-md-12">
                              <button
                                type="submit"
                                className="btn btn-primary text-uppercase w-100 fw-bolder"
                                disabled={isLoading}
                              >
                                {isLoading ? "...Wait please" : "Add Now"}
                              </button>
                            </div>

                            {/* Error message */}
                            {isError && (
                              <div
                                className="alert  alert-danger text-center"
                                role="alert "
                              >
                                {error?.data?.message ||
                                  "Failed to register. Please try again later."}
                              </div>
                            )}

                            {/* Success message */}
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </FullscreenModal>
          }

            {show && (
              <EditModal
                style={{
                  minWidth: "70%",
                  maxWidth: "70%",
                  maxHeight: "90vh",
                  overflow: "hidden",
                  overflowY: "scroll",
                }}
                title="Edit caregiver"
                onClose={setShow}
              >
                <form className="from-scrollbar" onSubmit={updateHandleSubmit}>
                  <div className="row mx-5">
                    {/* First Name input field */}
                    <div className="mb-3 col-md-6">
                      <label htmlFor="firstName" className="form-label">
                        First Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="form-control"
                        {...updateRegister("firstName", {
                          required: "First name is required.",
                        })}
                        required
                      />
                      {updateErrors.firstName && (
                        <p className="text-danger">
                          {updateErrors.firstName.message}
                        </p>
                      )}
                    </div>

                    {/* Last Name input field */}
                    <div className="mb-3 col-md-6">
                      <label htmlFor="lastName" className="form-label">
                        Last Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="form-control"
                        {...updateRegister("lastName", {
                          required: "Last name is required.",
                        })}
                        required
                      />
                      {updateErrors.lastName && (
                        <p className="text-danger">
                          {updateErrors.lastName.message}
                        </p>
                      )}
                    </div>
                    {/* Phone input field */}
                    <div className="mb-3 col-md-6">
                      <label htmlFor="phone" className="form-label">
                        Phone <span className="text-danger">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="form-control"
                        {...updateRegister("phone", {
                          required: "Phone number is required.",
                        })}
                        required
                      />
                      {updateErrors.phone && (
                        <p className="text-danger">
                          {updateErrors.phone.message}
                        </p>
                      )}
                    </div>

                    {/* Address Line 1 input field */}
                    <div className="mb-3 col-md-12">
                      <label htmlFor="address1" className="form-label">
                        Address Line 1 <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="address1"
                        name="address1"
                        className="form-control"
                        {...updateRegister("address1", {
                          required: "Address is required.",
                        })}
                        required
                      />
                      {updateErrors.address1 && (
                        <p className="text-danger">
                          {updateErrors.address1.message}
                        </p>
                      )}
                    </div>

                    {/* Address Line 2 input field */}
                    <div className="mb-3 col-md-12">
                      <label htmlFor="address2" className="form-label">
                        Address Line 2
                      </label>
                      <input
                        type="text"
                        id="address2"
                        name="address2"
                        className="form-control"
                        {...updateRegister("address2")}
                      />
                    </div>

                    {/* State selection dropdown */}
                    <div className="mb-3 col-md-12">
                      <label htmlFor="state" className="form-label">
                        State <span className="text-danger">*</span>
                      </label>
                      <StateSelect
                        selectedState={selectedState}
                        setSelectedState={setSelectedState}
                      />
                      {selectedState === "" && (
                        <p className="text-danger">State is required!</p>
                      )}
                    </div>

                    {/* City selection dropdown */}
                    <div className="mb-3 col-md-12">
                      <label htmlFor="city" className="form-label">
                        City <span className="text-danger">*</span>
                      </label>
                      <CitySelect
                        stateCode={selectedState}
                        selectedCity={selectedCity}
                        setSelectedCity={setSelectedCity}
                      />
                      {selectedCity === "" && (
                        <p className="text-danger">City is required!</p>
                      )}
                    </div>

                    {/* County selection dropdown */}
                    <div className="mb-3 col-md-6">
                      <label htmlFor="county" className="form-label">
                        County <span className="text-danger">*</span>
                      </label>
                      <CountySelect
                        selectedState={selectedState}
                        selectedCounty={selectedCounty}
                        setSelectedCounty={setSelectedCounty}
                      />
                      {selectedCounty === "" && (
                        <p className="text-danger">County is required!</p>
                      )}
                    </div>

                    {/* Zip Code input field */}
                    <div className="mb-3 col-md-6">
                      <label htmlFor="zip" className="form-label">
                        Zip Code <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="zip"
                        name="zip"
                        className="form-control"
                        {...updateRegister("zip", {
                          required: "Zip code is required.",
                        })}
                        required
                      />
                      {updateErrors.zip && (
                        <p className="text-danger">
                          {updateErrors.zip.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-3 col-md-6">
                      <label htmlFor="confirmPassword" className="form-label">
                        Pages permissions
                      </label>
                      <MultiSelect
                        options={curdOption}
                        value={selectedCurd}
                        onChange={setSelectCurd}
                      />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label htmlFor="confirmPassword" className="form-label">
                        Pages permissions
                      </label>
                      <MultiSelect
                        options={pagesOption}
                        value={selectedPages}
                        onChange={setSelectedPages}
                      />
                    </div>
                    {/* Email input field */}

                    {/* Submit button */}
                    <div className="mb-3 col-md-12">
                      <button
                        type="submit"
                        className="btn btn-primary text-uppercase w-100 fw-bolder"
                        disabled={isUpdateLoading}
                      >
                        {isUpdateLoading ? "...Wait please" : "Edit Now"}
                      </button>
                    </div>

                    {/* Error message */}
                    {isError && (
                      <div
                        className="alert  alert-danger text-center"
                        role="alert "
                      >
                        {error?.data?.message ||
                          "Failed to register. Please try again later."}
                      </div>
                    )}

                    {/* Success message */}
                  </div>
                </form>
              </EditModal>
            )}
            {/* <button
            style={{ fontSize: "12px" }}
            className="btn btn-info create-new btn-danger waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
           
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-upload me-sm-1" />{" "}
              <span className=" d-sm-inline-block">Import CSV</span>
            </span>
          </button> */}
            <label htmlFor="importcsv" className="btn btn-success">
              <span className="d-flex align-items-center">
                <i className="ti ti-upload me-sm-1" />{" "}
                <span className=" d-sm-inline-block">Import CSV</span>
              </span>
            </label>
            <input
              onChange={(e) => handleCSVFileUpload(e.target.files[0])}
              className="d-none"
              type="file"
              id="importcsv"
            />

 
            <button
              style={{ fontSize: "12px" }}
              className="btn btn-warning waves-effect waves-light"
              tabIndex={0}
              aria-controls="DataTables_Table_0"
              type="button"
              onClick={handleExportSelected}
            >
              <span className="d-flex align-items-center">
                <i className="ti ti-download me-sm-1" />{" "}
                <span className=" d-sm-inline-block">Export Selected</span>
              </span>
            </button>
            {addedBy?.payload?.user?.curd?.includes("delete") &&
            
            <button
              style={{ fontSize: "12px" }}
              className="btn btn-secondary waves-effect waves-light"
              tabIndex={0}
              aria-controls="DataTables_Table_0"
              type="button"
              onClick={handleDeleteSelected}
            >
              <span className="d-flex align-items-center">
                <i className="ti ti-trash me-sm-1" />{" "}
                <span className=" d-sm-inline-block">Delete Selected</span>
              </span>
            </button>
            }
            <button
              style={{
                background: "#bd646e",
                color: "#fff",
                fontSize: "12px",
              }}
              className="btn waves-effect waves-light"
              tabIndex={0}
              aria-controls="DataTables_Table_0"
              type="button"
              onClick={() => navigate("/employee-payroll")}
            >
              <span className="d-flex align-items-center">
                <i className="ti ti-plus me-sm-1" />{" "}
                <span className=" d-sm-inline-block">Payroll</span>
              </span>
            </button>
            <button
              style={{
                background: "#9fd74d",
                color: "#fff",
                fontSize: "12px",
              }}
              className="btn waves-effect waves-light"
              tabIndex={0}
              aria-controls="DataTables_Table_0"
              type="button"
            >
              <span className="d-flex align-items-center">
                {/* <FaRegFolder size={22} className="me-1" />{" "} */}
                <span className=" d-sm-inline-block">Archive</span>
              </span>
            </button>
            <button
              style={{ fontSize: "12px" }}
              className="btn btn-danger waves-effect waves-light"
              tabIndex={0}
              aria-controls="DataTables_Table_0"
              type="button"
            >
              <span className="d-flex align-items-center">
                {/* <FaRegFolderOpen size={22} className="me-1" />{" "} */}
                <span className=" d-sm-inline-block">Inactive</span>
              </span>
            </button>
            <button
              style={{
                fontSize: "12px",
                color: "#fff",
                background: "rgba(123, 172, 51, 1)",
              }}
              className="btn waves-effect waves-light"
              tabIndex={0}
              aria-controls="DataTables_Table_0"
              type="button"
            >
              <span className="d-flex align-items-center">
                {/* <FaRegMoneyBillAlt size={22} className="me-1" />{" "} */}
                <span className=" d-sm-inline-block">Earning</span>
              </span>
            </button>
            <button
              onClick={() => navigate("/assign-all-individual")}
              className="btn btn-primary waves-effect waves-light"
              tabIndex={0}
              aria-controls="DataTables_Table_0"
              type="button"
            >
              <span className="d-flex align-items-center">
                <i className="ti ti-plus"></i>
                <span className=" d-sm-inline-block">
                  Assign All Individual
                </span>
              </span>
            </button>
          </div>
          <div className="mt-5 w-100">
           
            <DataTable
              columns={columns}
              data={
                Array.isArray(data?.payload?.users) ? data.payload.users : []
              }
              tableClassName="custom-table"
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CaregiverOrStaff;
