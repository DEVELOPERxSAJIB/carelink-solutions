import DataTable from "../../components/Tables/DynamicTable";
import TableHeader from "./../../components/Tables/TableHeader";
import useFormFields from "./../../hook/useFormHook";
import FullscreenModal from "./../../components/Models/FullScreenModel";
import { useState, useEffect } from "react";
import Alert from "./../../components/Alert/Alert";
import EditModal from "./../../components/Models/EditModal";
import AuthLoader from "./../../utils/Loaders/AuthLoader";
import swal from "sweetalert";
import {
  useCreateRouteMutation,
  useGetAllRoutesQuery,
  useUpdateRouteMutation,
  useDeleteRouteMutation,
} from "../../Redux/api/RouteApi.js";
import { useMeQuery } from "../../Redux/api/UserApi";
const MyRoutes = () => {
  const { data: logData } = useMeQuery();
  const { data, isLoading, refetch } = useGetAllRoutesQuery();
  const [
    createRoute,
    { data: createData, isSuccess: isCreateSuccess, error: createError },
  ] = useCreateRouteMutation();
  const [
    updateRoute,
    { data: updateData, isSuccess: isUpdateSuccess, error: updateError },
  ] = useUpdateRouteMutation();
  const [deleteRoute, { data: deleteData, isSuccess: isDeleteSuccess }] =
    useDeleteRouteMutation();
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState("");
  const columns = [
    { field: "_id", header: "Id" },
    { field: "routeName", header: "Route Name" },
    { field: "ratioDenominator", header: "Denominator Ratio" },
    { field: "ratioNumerator", header: "Numerator Ratio" },
    { field: "selectVehicle", header: "Vehicle" },
    { field: "tripType", header: "Trip Type" },
  ];

  const handleEdit = (row) => {
    setShow(true);
    setEditId(row?._id);
    setFormData({ ...row });
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
        deleteRoute(row?._id);
      }
    });
  };
  const initialState = {
    routeName: "",
    ratioDenominator: "",
    ratioNumerator: "",
    selectVehicle: "",
    tripType: "Per Mile",
  };

  const [formData, handleChange, setFormData, resetForm] =
    useFormFields(initialState);
  console.log(formData);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      updateRoute({ routeId: editId, routeData: formData });
    } else {
      createRoute(formData);
      resetForm();
    }
  };

  useEffect(() => {
    if (isCreateSuccess || isUpdateSuccess || isDeleteSuccess) {
      refetch();
      setShow(false);
    }
  }, [isCreateSuccess, isUpdateSuccess, isDeleteSuccess]);
  if (isLoading) return <AuthLoader />;
  return (
    <div className="card">
      <TableHeader title="Routes" className="py-3 pt-5 fs-3 card-header" />
      <div className="card-body">
        <Alert message={updateData?.message} type="success" />
        <Alert message={deleteData?.message} type="success" />
        <div className="gap-3 d-flex flex-wrap">
        {logData?.payload?.user?.curd?.includes("create") &&
        
          <FullscreenModal
            className="col-md-5"
            id="addRoute"
            title="Add Route"
            onSave={handleSubmit}
          >
            <form className="w-100 from-scrollbar px-3" onSubmit={handleSubmit}>
              <Alert message={createError?.data?.message} type="danger" />
              <Alert message={createData?.message} type="success" />
              <div className="row">
                {/* Route Name */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="routeName" className="form-label">
                    Name of the route <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="routeName"
                    name="routeName"
                    className="form-control"
                    value={formData.routeName}
                    onChange={handleChange}
                    placeholder="Route Name"
                    required
                  />
                </div>

                {/* Ratio */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="ratio" className="form-label">
                    Ratio <span className="text-danger">*</span>
                  </label>
                  <div>
                    <div className="row">
                      <div className="col-md-5">
                        <input
                          type="text"
                          id="ratioDenominator"
                          name="ratioDenominator"
                          className="form-control"
                          value={formData.ratioDenominator}
                          onChange={handleChange}
                          placeholder="Ratio"
                          required
                        />
                      </div>
                      <div className="col-md-2 d-flex justify-center align-items-center">
                        :
                      </div>
                      <div className="col-md-5">
                        <input
                          type="text"
                          id="ratioNumerator"
                          name="ratioNumerator"
                          className="form-control"
                          value={formData.ratioNumerator}
                          onChange={handleChange}
                          placeholder="Ratio"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Select Vehicle */}
                <div className="col-md-12 mb-3">
                  <label htmlFor="selectVehicle" className="form-label">
                    Select vehicle <span className="text-danger">*</span>
                  </label>
                  <select
                    id="selectVehicle"
                    name="selectVehicle"
                    className="form-select"
                    value={formData.selectVehicle}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select vehicle</option>
                    {/* Add vehicle options here */}
                    <option value="Toyota">Toyota</option>
                    <option value="Ford">Ford</option>
                  </select>
                </div>

                {/* Trip Type */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Trip type <span className="text-danger">*</span>
                  </label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="perMile"
                      name="tripType"
                      value="Per Mile"
                      checked={formData.tripType === "Per Mile"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="perMile">
                      Per Mile
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="perTrip"
                      name="tripType"
                      value="Per Trip"
                      checked={formData.tripType === "Per Trip"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="perTrip">
                      Per Trip
                    </label>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">
                  Add Route
                </button>
              </div>
            </form>
          </FullscreenModal>
        }
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
        </div>
        {show && (
          <EditModal
            onClose={setShow}
            title="Edit Route"
            style={{
              minWidth: "70%",
              maxWidth: "70%",
              maxHeight: "80vh",
              overflowY: "scroll",
            }}
          >
            <form className="w-100 from-scrollbar px-3" onSubmit={handleSubmit}>
              <Alert message={updateError?.data?.message} type="danger" />
              <div className="row">
                {/* Route Name */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="routeName" className="form-label">
                    Name of the route <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="routeName"
                    name="routeName"
                    className="form-control"
                    value={formData.routeName}
                    onChange={handleChange}
                    placeholder="Route Name"
                    required
                  />
                </div>

                {/* Ratio */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="ratio" className="form-label">
                    Ratio <span className="text-danger">*</span>
                  </label>
                  <div>
                    <div className="row">
                      <div className="col-md-5">
                        <input
                          type="text"
                          id="ratioDenominator"
                          name="ratioDenominator"
                          className="form-control"
                          value={formData.ratioDenominator}
                          onChange={handleChange}
                          placeholder="Ratio"
                          required
                        />
                      </div>
                      <div className="col-md-2 d-flex justify-center align-items-center">
                        :
                      </div>
                      <div className="col-md-5">
                        <input
                          type="text"
                          id="ratioNumerator"
                          name="ratioNumerator"
                          className="form-control"
                          value={formData.ratioNumerator}
                          onChange={handleChange}
                          placeholder="Ratio"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Select Vehicle */}
                <div className="col-md-12 mb-3">
                  <label htmlFor="selectVehicle" className="form-label">
                    Select vehicle <span className="text-danger">*</span>
                  </label>
                  <select
                    id="selectVehicle"
                    name="selectVehicle"
                    className="form-select"
                    value={formData.selectVehicle}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select vehicle</option>
                    {/* Add vehicle options here */}
                    <option value="Toyota">Toyota</option>
                    <option value="Ford">Ford</option>
                  </select>
                </div>

                {/* Trip Type */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Trip type <span className="text-danger">*</span>
                  </label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="perMile"
                      name="tripType"
                      value="Per Mile"
                      checked={formData.tripType === "Per Mile"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="perMile">
                      Per Mile
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="perTrip"
                      name="tripType"
                      value="Per Trip"
                      checked={formData.tripType === "Per Trip"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="perTrip">
                      Per Trip
                    </label>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">
                  Add Route
                </button>
              </div>
            </form>
          </EditModal>
        )}
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={data?.payload?.routes ?? []}
            tableClassName="custom-table"
            onEdit={handleEdit}
            tableName="myRoutes"
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default MyRoutes;
