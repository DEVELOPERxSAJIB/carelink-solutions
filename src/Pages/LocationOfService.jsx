import { useState, useEffect } from "react";
import swal from "sweetalert";
import DataTable from "../components/Tables/DynamicTable";
import PopupModal from "../components/Models/PopupModel";
import useFormFields from "../hook/useFormHook";
import TableHeader from "../components/Tables/TableHeader";
import {
  useCreateLocationMutation,
  useGetAllLocationsQuery,
  useDeleteLocationMutation,
  useUpdateLocationMutation,
} from "../Redux/api/LocationApi";
import StateSelect from "../components/FormElement/StateSelect";
import CitySelect from "../components/FormElement/CitySelect";
import AuthLoader from "./../utils/Loaders/AuthLoader";
import EditModal from "./../components/Models/EditModal";
import { useMeQuery } from "../Redux/api/UserApi.js";
import { showToast } from "./../utils/Toastify";
const LocationOfService = () => {
  const { data: lgData } = useMeQuery();
  const [
    createLocation,
    { data: createData, isSuccess: isCreateSuccess, error: createError },
  ] = useCreateLocationMutation();
  const [
    updateLocation,
    {
      data: updateData,
      isSuccess: isUseUpdateLocationSuccess,
      error: updateError,
    },
  ] = useUpdateLocationMutation();

  const [
    deleteLocation,
    {
      data: deleteData,
      isLoading: isDeleteLoading,
      isSuccess: isDeleteSuccess,
      error: deleteError,
    },
  ] = useDeleteLocationMutation();

  const { data, isLoading, refetch } = useGetAllLocationsQuery();

  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState("");
  const handleEdit = (rowData) => {
    setShow(true);
    setCity(rowData.city);
    setEditId(rowData._id);
    setState(rowData.state);
    setFormData({
      address1: rowData.address1,
      address2: rowData.address2,
      zip: rowData.zip,
    });
  };
  const columns = [
    { header: "ID", field: "_id" },
    { header: "Address 1", field: "address1" },
    { header: "Address 2", field: "address2" },
    { header: "City", field: "city" },
    { header: "State", field: "state" },
    { header: "Zip Code", field: "zip" },
    { header: "Created By", field: "createdBy" },
    { header: "Created On", field: "createdAt" },
  ];

  const handleDelete = (rowData) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteLocation(rowData?._id);
      }
    });
  };

  const initialState = {
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  };

  const [formData, handleChange, setFormData, resetForm] =
    useFormFields(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      const data = {
        ...formData,
        city,
        state,
      };
      updateLocation({ locationId: editId, locationData: data });
      resetForm();
    } else {
      const data = {
        ...formData,
        city,
        state,
      };
      createLocation(data);
      resetForm();
    }
  };

  useEffect(() => {
    if (isCreateSuccess) {
      refetch();
    }
    if (isDeleteSuccess) {
      refetch();
    }
    if (isUseUpdateLocationSuccess) {
      refetch();
      setShow(false);
    }
  }, [isDeleteSuccess, isCreateSuccess, isUseUpdateLocationSuccess]);
  useEffect(() => {
    showToast("success", updateData?.message);
    showToast("success", createData?.message);
    showToast("error", updateError?.data?.message);
    showToast("error", createError?.data?.message);
  }, [
    updateData?.message,
    createData?.message,
    updateError?.data?.message,
    data?.message,
    createError?.data?.message,
  ]);
  if (isLoading) return <AuthLoader />;
  return (
    <div className="card">
      <TableHeader
        title="Manage Locations"
        className="card-header py-3 pt-5 fs-3"
      />

      <div className="card-body">
        <div className="gap-3 d-flex flex-wrap">
          {lgData?.payload?.user?.curd?.includes("create") && (
            <PopupModal title="Add Service Location" id="newaddServiceLocation">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="address1" className="form-label">
                    Address1
                  </label>
                  <input
                    type="text"
                    id="address1"
                    name="address1"
                    className="form-control"
                    value={formData.address1}
                    onChange={handleChange}
                    placeholder="Enter Address1"
                  />
                </div>
                <div className="mb-3">
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
                    placeholder="Enter Address2"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <CitySelect
                    stateCode={state}
                    selectedCity={city}
                    setSelectedCity={setCity}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <StateSelect
                    selectedState={state}
                    setSelectedState={setState}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="zip" className="form-label">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    className="form-control"
                    value={formData.zip}
                    onChange={handleChange}
                    placeholder="Enter Zip Code"
                  />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Add Service Location
                  </button>
                </div>
              </form>
            </PopupModal>
          )}

          {lgData?.payload?.user?.curd?.includes("delete") && (
            <button
              className="btn btn-secondary create-new btn-danger waves-effect waves-light"
              tabIndex={0}
              aria-controls="DataTables_Table_0"
              type="button"
            >
              <span>
                <i className="ti ti-trash me-sm-1" />{" "}
                <span className="d-none d-sm-inline-block">
                  Delete selected
                </span>
              </span>
            </button>
          )}
        </div>
        {show && (
          <EditModal
            style={{
              minWidth: "70%",
              maxWidth: "70%",
              maxHeight: "80vh",
              overflowY: "scroll",
            }}
            show={show}
            onClose={setShow}
          >
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="address1" className="form-label">
                  Address1
                </label>
                <input
                  type="text"
                  id="address1"
                  name="address1"
                  className="form-control"
                  value={formData.address1}
                  onChange={handleChange}
                  placeholder="Enter Address1"
                />
              </div>
              <div className="mb-3">
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
                  placeholder="Enter Address2"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <CitySelect
                  stateCode={state}
                  selectedCity={city}
                  setSelectedCity={setCity}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="state" className="form-label">
                  State
                </label>
                <StateSelect
                  selectedState={state}
                  setSelectedState={setState}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="zip" className="form-label">
                  Zip Code
                </label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  className="form-control"
                  value={formData.zip}
                  onChange={handleChange}
                  placeholder="Enter Zip Code"
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Edit Service Location
                </button>
              </div>
            </form>
          </EditModal>
        )}
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={data?.payload?.locations ?? []}
            tableClassName="custom-table"
            tableName="locationOfService"
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default LocationOfService;
