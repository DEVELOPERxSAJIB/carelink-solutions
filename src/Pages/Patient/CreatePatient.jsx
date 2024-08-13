import PatientProfile from "./../../components/Patient/CreatePatient";
import PageHeader from "./../../components/FormElement/PageHeader";

const CreatePatient = () => {
  return (
    <div className="card w-100">
     
      <div className="card-body w-100">
        <PatientProfile />
      </div>
    </div>
  );
};

export default CreatePatient;
