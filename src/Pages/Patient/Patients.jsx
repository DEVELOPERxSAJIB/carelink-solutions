import DataTable from "./../../components/Tables/DynamicTable";

import ExportButton from './../../components/Buttons/ExportButton';
import TableHeader from './../../components/Tables/TableHeader';
import {useGetAllPatientsQuery} from "../../Redux/api/PatientApi"
import AuthLoader from './../../utils/Loaders/AuthLoader';
import { useNavigate } from 'react-router-dom';
const Patients = () => {
  const {data,isLoading} = useGetAllPatientsQuery();
  const columns = [
    { field: "patientIdMrn", header: "Patient ID/MRN" },
    { field: "firstName", header: "First Name" },
    { field: "middleInitial", header: "Middle Initial" },
    { field: "lastName", header: "Last Name" },
    { field: "gender", header: "Gender" },
    { field: "dateOfBirth", header: "Date of Birth" },
    { field: "socialSecurityNumber", header: "Social Security Number" },
    { field: "maritalStatus", header: "Marital Status" },
    { field: "mobilePhone", header: "Mobile Phone" },
    { field: "alternatePhone", header: "Alternate Phone" },
    { field: "emailAddress", header: "Email Address" },
    { field: "clinicalManager", header: "Clinical Manager" },
    { field: "caseManager", header: "Case Manager" },
    { field: "clinician", header: "Clinician" },
    { field: "branch", header: "Branch" },
    { field: "defaultServiceLocation", header: "Default Service Location" },
    { field: "primaryAddress1", header: "Primary Address" },
    { field: "primaryAddress2", header: "Primary Address (Contd.)" },
    { field: "primaryCity", header: "Primary City" },
    { field: "primaryState", header: "Primary State" },
    { field: "primaryZip", header: "Primary Zip Code" },
    { field: "primaryZip4", header: "Primary Zip Code (4 digit)" },
    { field: "primaryCounty", header: "Primary County" },
    { field: "mailingAddress1", header: "Mailing Address" },
    { field: "mailingAddress2", header: "Mailing Address (Contd.)" },
    { field: "mailingCity", header: "Mailing City" },
    { field: "mailingState", header: "Mailing State" },
    { field: "mailingZip", header: "Mailing Zip Code" },
    { field: "mailingZip4", header: "Mailing Zip Code (4 digit)" },
    { field: "mailingCounty", header: "Mailing County" },
    { field: "visitAddress1", header: "Visit Address" },
    { field: "visitAddress2", header: "Visit Address (Contd.)" },
    { field: "visitCity", header: "Visit City" },
    { field: "visitState", header: "Visit State" },
    { field: "visitZip", header: "Visit Zip Code" },
    { field: "visitZip4", header: "Visit Zip Code (4 digit)" },
    { field: "visitCounty", header: "Visit County" },
    { field: "hispanicLatino", header: "Hispanic/Latino" },
    { field: "mexican", header: "Mexican" },
    { field: "puertoRican", header: "Puerto Rican" },
    { field: "cuban", header: "Cuban" },
    { field: "anotherHispanic", header: "Another Hispanic/Latino" },
    { field: "unableToRespondEthnicity", header: "Unable to Respond (Ethnicity)" },
    { field: "declineToRespondEthnicity", header: "Decline to Respond (Ethnicity)" },
    { field: "white", header: "White" },
    { field: "blackAfricanAmerican", header: "Black/African American" },
    { field: "americanIndian", header: "American Indian" },
    { field: "asianIndian", header: "Asian Indian" },
    { field: "chinese", header: "Chinese" },
    { field: "filipino", header: "Filipino" },
    { field: "japanese", header: "Japanese" },
    { field: "korean", header: "Korean" },
    { field: "vietnamese", header: "Vietnamese" },
    { field: "otherAsian", header: "Other Asian" },
    { field: "nativeHawaiian", header: "Native Hawaiian" },
    { field: "guamanianChamorro", header: "Guamanian/Chamorro" },
    { field: "samoan", header: "Samoan" },
    { field: "otherPacificIslander", header: "Other Pacific Islander" },
    { field: "unableToRespondRace", header: "Unable to Respond (Race)" },
    { field: "declineToRespondRace", header: "Decline to Respond (Race)" },
    { field: "noneOfTheAbove", header: "None of the Above" },
    { field: "preferredLanguage", header: "Preferred Language" },
    { field: "additionalLanguages", header: "Additional Languages" },
    { field: "needInterpreter", header: "Need Interpreter" },
    { field: "nonePaymentSource", header: "None Payment Source" },
    { field: "medicareTraditional", header: "Medicare (Traditional)" },
    { field: "medicareManagedCare", header: "Medicare (Managed Care)" },
    { field: "medicaidTraditional", header: "Medicaid (Traditional)" },
    { field: "medicaidManagedCare", header: "Medicaid (Managed Care)" },
    { field: "workersCompensation", header: "Workers Compensation" },
    { field: "titlePrograms", header: "Title Programs" },
    { field: "otherGovernment", header: "Other Government" },
    { field: "privateInsurance", header: "Private Insurance" },
    { field: "privateManagedCare", header: "Private Managed Care" },
    { field: "selfPay", header: "Self Pay" },
    { field: "unknownPaymentSource", header: "Unknown Payment Source" },
    { field: "otherSpecify", header: "Other Specify" },
    { field: "longTermNursingFacility", header: "Long Term Nursing Facility" },
    { field: "skilledNursingFacility", header: "Skilled Nursing Facility" },
    { field: "shortStayAcuteHospital", header: "Short Stay Acute Hospital" },
    { field: "longTermCareHospital", header: "Long Term Care Hospital" },
    { field: "inpatientRehabilitation", header: "Inpatient Rehabilitation" },
    { field: "psychiatricHospital", header: "Psychiatric Hospital" },
    { field: "otherInpatientFacility", header: "Other Inpatient Facility" },
    { field: "otherInpatientFacilityText", header: "Other Inpatient Facility Text" },
    { field: "episodeTiming", header: "Episode Timing" },
    { field: "startOfCareDate", header: "Start of Care Date" },
    { field: "episodeStartDate", header: "Episode Start Date" },
    { field: "createEpisodeScheduleVisit", header: "Create Episode Schedule (Visit)" },
    { field: "createEpisodeScheduleOasisStartCare", header: "Create Episode Schedule (Oasis Start Care)" },
    { field: "createEpisodeScheduleTherapyEvaluation", header: "Create Episode Schedule (Therapy Evaluation)" },
    { field: "createEpisodeScheduleNonOasisStartCare", header: "Create Episode Schedule (Non-Oasis Start Care)" },
    { field: "createEpisodeScheduleInitialOasisRecert", header: "Create Episode Schedule (Initial Oasis Recert)" },
    { field: "createEpisodeScheduleInitialNonOasisRecert", header: "Create Episode Schedule (Initial Non-Oasis Recert)" },
    { field: "trackF2FDocumentation", header: "Track F2F Documentation" }
];

  
  
  
const navigate = useNavigate()
if(isLoading) return <AuthLoader/>
  
console.log(isLoading)
  return (
    <div className="card">

      <TableHeader title="Patient List" className="py-3 pt-5 fs-3 card-header"/>
      <div className="card-body">
        <div className="gap-3 d-flex flex-wrap">
          <ExportButton orientation="landscape" data={data?.payload??[]} columns={columns} fileName="Patient"/>
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
        
          <button
            className="btn btn-info waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-archive me-1" />
              <span className="d-none d-sm-inline-block">
                Archive{" "}
              </span>
            </span>
            </button>
            <button
            className="btn btn-success waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
            onClick={()=>navigate("/create-new-patient")}
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-archive me-1" />
              <span className="d-none d-sm-inline-block">
                Add New Patient
              </span>
            </span>
            </button>
        </div>
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={data?.payload??[]}
            tableClassName="custom-table"
          />
        </div>
      </div>
    </div>
  );
};

export default Patients;


