import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { useDeleteDirectiveMutation } from "../../Redux/api/DirectiveApi";
import { useDeletePayerMutation } from "../../Redux/api/PayerApi.js";
import { useDeletePatientMutation } from "../../Redux/api/PatientApi.js";
import { useDeleteReferralMutation } from "../../Redux/api/ReferalInformation";
import AuthLoader from "./../../utils/Loaders/AuthLoader";
import { setDataRefetch } from "./../../Redux/slices/updateSlice";
const Delete = ({ tableName, rowData }) => {
  console.log(tableName);
  
  const [
    deleteDirective,
    { isLoading: isDirectiveLoading, data: directiveData },
  ] = useDeleteDirectiveMutation();
  const [deleteReferral, { isLoading: isReferralLoading, data: referralData }] =
    useDeleteReferralMutation();
  const [deletePatient, { isLoading: isPatientLoading, data: patientData }] =
    useDeletePatientMutation();
  const [deletePayer, { isLoading: isPayerLoading, data: payerData }] =
    useDeletePayerMutation();
  //==============dispatch and selector
  const dispatch = useDispatch();
  const handleDeleteClick = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
        switch (tableName) {
          case "AdvanceDirectives":
            deleteDirective(rowData?._id);
            break;
          case "referralInformation":
            deleteReferral(rowData?._id);
            break;
          case "patients":
            deletePatient(rowData?._id);
            break;
          case "payers":
            deletePayer(rowData?._id);
            break;
          default:
            break;
        }
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };
  useEffect(() => {
    if (directiveData?.message) {
      dispatch(setDataRefetch(true));
    }
    if (referralData?.message) {
      alert(referralData.message);
      dispatch(setDataRefetch(true));
    }
    if (patientData?.message) {
      alert(patientData.message);
      dispatch(setDataRefetch(true));
    }
    if (payerData?.message) {
      alert(payerData.message);
      dispatch(setDataRefetch(true));
    }
  });
  if (isDirectiveLoading || isReferralLoading || isPatientLoading||isPayerLoading) {
    return <AuthLoader />;
  }

  return (
    <div className="card">
      <div style={{ zIndex: 1000 }} className="position-absolute "></div>
      <button className="dropdown-item" onClick={handleDeleteClick}>
        Delete
      </button>
    </div>
  );
};

export default Delete;
