
import PatientProfile from './../../components/Patient/CreatePatient';
import PageHeader from './../../components/FormElement/PageHeader';

const CreatePatient = () => {
  return <div className="card">
     <PageHeader title="Patient details" className="card-header fs-3"/>
    <div className="card-body">
    <PatientProfile/>
    </div>
  </div>;
};

export default CreatePatient;
