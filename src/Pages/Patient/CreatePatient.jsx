import PatientProfile from "./../../components/Patient/CreatePatient";
import PageHeader from "./../../components/FormElement/PageHeader";

const CreatePatient = () => {
  return (
    <div className="card w-100">
      <PageHeader title="Patient details" className="card-header fs-3" back={false} />
      <div className="card-body w-100">
        <PatientProfile />
      </div>
    </div>
  );
};

export default CreatePatient;
