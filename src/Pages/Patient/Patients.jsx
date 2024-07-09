import DataTable from "./../../components/Tables/DynamicTable";
import { useNavigate } from "react-router-dom";
import Accordion from "./../../components/Tables/Accordion";
import FullscreenModal from './../../components/Models/FullScreenModel';
import useFormFields from './../../hook/useFormHook';
import ExportButton from './../../components/Buttons/ExportButton';
import TableHeader from './../../components/Tables/TableHeader';
import {useGetAllPatientsQuery} from "../../Redux/api/PatientApi"
import AuthLoader from './../../utils/Loaders/AuthLoader';
const Patients = () => {
  const {data,isLoading,isSuccess} = useGetAllPatientsQuery();
  console.log(data)
  const columns = [
    { field: "id", header: "S.No" },
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
    { field: "patientIdMrn", header: "Patient ID/MRN" },
    { field: "defaultServiceLocation", header: "Default Service Location" },
    { field: "primaryAddress1", header: "Address 1" },
    { field: "primaryAddress2", header: "Address 2" },
    { field: "primaryZip", header: "ZIP Code" },
    { field: "primaryZip4", header: "ZIP+4" },
    { field: "primaryCounty", header: "County" },
    { field: "primaryCity", header: "City" },
    { field: "primaryState", header: "State" },
    { field: "mailingSameAsPrimary", header: "Same as Primary" },
    { field: "mailingAddress1", header: "Mailing Address 1" },
    { field: "mailingAddress2", header: "Mailing Address 2" },
    { field: "mailingZip", header: "Mailing ZIP Code" },
    { field: "mailingZip4", header: "Mailing ZIP+4" },
    { field: "mailingCounty", header: "Mailing County" },
    { field: "mailingCity", header: "Mailing City" },
    { field: "mailingState", header: "Mailing State" },
    { field: "visitAddress1", header: "Visit Address 1" },
    { field: "visitAddress2", header: "Visit Address 2" },
    { field: "visitZip", header: "Visit ZIP Code" },
    { field: "visitZip4", header: "Visit ZIP+4" },
    { field: "visitCounty", header: "Visit County" },
    { field: "visitCity", header: "Visit City" },
    { field: "visitState", header: "Visit State" },
    { field: "hispanicLatino", header: "Hispanic/Latino" },
    { field: "mexican", header: "Mexican" },
    { field: "puertoRican", header: "Puerto Rican" },
    { field: "cuban", header: "Cuban" },
    { field: "anotherHispanic", header: "Another Hispanic" },
    { field: "unableToRespondEthnicity", header: "Unable to Respond (Ethnicity)" },
    { field: "declineToRespondEthnicity", header: "Decline to Respond (Ethnicity)" },
    { field: "white", header: "White" },
    { field: "blackAfricanAmerican", header: "Black or African American" },
    { field: "americanIndian", header: "American Indian or Alaska Native" },
    { field: "asianIndian", header: "Asian Indian" },
    { field: "chinese", header: "Chinese" },
    { field: "filipino", header: "Filipino" },
    { field: "japanese", header: "Japanese" },
    { field: "korean", header: "Korean" },
    { field: "vietnamese", header: "Vietnamese" },
    { field: "otherAsian", header: "Other Asian" },
    { field: "nativeHawaiian", header: "Native Hawaiian" },
    { field: "guamanianChamorro", header: "Guamanian or Chamorro" },
    { field: "samoan", header: "Samoan" },
    { field: "otherPacificIslander", header: "Other Pacific Islander" },
    { field: "unableToRespondRace", header: "Unable to Respond (Race)" },
    { field: "declineToRespondRace", header: "Decline to Respond (Race)" },
    { field: "noneOfTheAbove", header: "None of the Above" },
    { field: "preferredLanguage", header: "Preferred Language" },
    { field: "additionalLanguages", header: "Additional Languages" },
    { field: "needInterpreter", header: "Need Interpreter" },
    { field: "nonePaymentSource", header: "None" },
    { field: "medicareTraditional", header: "Medicare (Traditional)" },
    { field: "medicareManagedCare", header: "Medicare (Managed Care)" },
    { field: "medicaidTraditional", header: "Medicaid (Traditional)" },
    { field: "medicaidManagedCare", header: "Medicaid (Managed Care)" },
    { field: "workersCompensation", header: "Workers' Compensation" },
    { field: "titlePrograms", header: "Title Programs" },
    { field: "otherGovernment", header: "Other Government" },
    { field: "privateInsurance", header: "Private Insurance" },
    { field: "privateManagedCare", header: "Private Managed Care" },
    { field: "selfPay", header: "Self Pay" },
    { field: "unknownPaymentSource", header: "Unknown" },
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
    { field: "createEpisodeScheduleOasisStartCare", header: "Create Episode Schedule (OASIS Start of Care)" },
    { field: "createEpisodeScheduleTherapyEvaluation", header: "Create Episode Schedule (Therapy Evaluation)" },
    { field: "createEpisodeScheduleNonOasisStartCare", header: "Create Episode Schedule (Non-OASIS Start of Care)" },
    { field: "createEpisodeScheduleInitialOasisRecert", header: "Create Episode Schedule (Initial OASIS Recert)" },
    { field: "createEpisodeScheduleInitialNonOasisRecert", header: "Create Episode Schedule (Initial Non-OASIS Recert)" },
    { field: "trackF2FDocumentation", header: "Track F2F Documentation" },
  ];
  
  const column = [
    { label: "S.No", key: "serialNumber" },
    { label: "Patient ID/MRN", key: "patientIdMrn" },
    { label: "First Name", key: "firstName" },
    { label: "Middle Initial", key: "middleInitial" },
    { label: "Last Name", key: "lastName" },
    { label: "Gender", key: "gender" },
    { label: "Date of Birth", key: "dateOfBirth" },
    { label: "Social Security Number", key: "socialSecurityNumber" },
    { label: "Marital Status", key: "maritalStatus" },
    { label: "Mobile Phone", key: "mobilePhone" },
    { label: "Alternate Phone", key: "alternatePhone" },
    { label: "Email Address", key: "emailAddress" },
    { label: "Clinical Manager", key: "clinicalManager" },
    { label: "Case Manager", key: "caseManager" },
    { label: "Clinician", key: "clinician" },
    { label: "Branch", key: "branch" },
    { label: "Default Service Location", key: "defaultServiceLocation" },
    { label: "Primary Address", key: "primaryAddress1" },
    { label: "Primary Address (Contd.)", key: "primaryAddress2" },
    { label: "Primary City", key: "primaryCity" },
    { label: "Primary State", key: "primaryState" },
    { label: "Primary Zip Code", key: "primaryZip" },
    { label: "Primary Zip Code (4 digit)", key: "primaryZip4" },
    { label: "Primary County", key: "primaryCounty" },
    { label: "Mailing Same as Primary", key: "mailingSameAsPrimary" },
    { label: "Mailing Address", key: "mailingAddress1" },
    { label: "Mailing Address (Contd.)", key: "mailingAddress2" },
    { label: "Mailing City", key: "mailingCity" },
    { label: "Mailing State", key: "mailingState" },
    { label: "Mailing Zip Code", key: "mailingZip" },
    { label: "Mailing Zip Code (4 digit)", key: "mailingZip4" },
    { label: "Mailing County", key: "mailingCounty" },
    { label: "Visit Address", key: "visitAddress1" },
    { label: "Visit Address (Contd.)", key: "visitAddress2" },
    { label: "Visit City", key: "visitCity" },
    { label: "Visit State", key: "visitState" },
    { label: "Visit Zip Code", key: "visitZip" },
    { label: "Visit Zip Code (4 digit)", key: "visitZip4" },
    { label: "Visit County", key: "visitCounty" },
    { label: "Hispanic/Latino", key: "hispanicLatino" },
    { label: "Mexican", key: "mexican" },
    { label: "Puerto Rican", key: "puertoRican" },
    { label: "Cuban", key: "cuban" },
    { label: "Another Hispanic/Latino", key: "anotherHispanic" },
    { label: "Unable to Respond (Ethnicity)", key: "unableToRespondEthnicity" },
    { label: "Decline to Respond (Ethnicity)", key: "declineToRespondEthnicity" },
    { label: "White", key: "white" },
    { label: "Black/African American", key: "blackAfricanAmerican" },
    { label: "American Indian", key: "americanIndian" },
    { label: "Asian Indian", key: "asianIndian" },
    { label: "Chinese", key: "chinese" },
    { label: "Filipino", key: "filipino" },
    { label: "Japanese", key: "japanese" },
    { label: "Korean", key: "korean" },
    { label: "Vietnamese", key: "vietnamese" },
    { label: "Other Asian", key: "otherAsian" },
    { label: "Native Hawaiian", key: "nativeHawaiian" },
    { label: "Guamanian/Chamorro", key: "guamanianChamorro" },
    { label: "Samoan", key: "samoan" },
    { label: "Other Pacific Islander", key: "otherPacificIslander" },
    { label: "Unable to Respond (Race)", key: "unableToRespondRace" },
    { label: "Decline to Respond (Race)", key: "declineToRespondRace" },
    { label: "None of the Above", key: "noneOfTheAbove" },
    { label: "Preferred Language", key: "preferredLanguage" },
    { label: "Additional Languages", key: "additionalLanguages" },
    { label: "Need Interpreter", key: "needInterpreter" },
    { label: "None Payment Source", key: "nonePaymentSource" },
    { label: "Medicare (Traditional)", key: "medicareTraditional" },
    { label: "Medicare (Managed Care)", key: "medicareManagedCare" },
    { label: "Medicaid (Traditional)", key: "medicaidTraditional" },
    { label: "Medicaid (Managed Care)", key: "medicaidManagedCare" },
    { label: "Workers Compensation", key: "workersCompensation" },
    { label: "Title Programs", key: "titlePrograms" },
    { label: "Other Government", key: "otherGovernment" },
    { label: "Private Insurance", key: "privateInsurance" },
    { label: "Private Managed Care", key: "privateManagedCare" },
    { label: "Self Pay", key: "selfPay" },
    { label: "Unknown Payment Source", key: "unknownPaymentSource" },
    { label: "Other Specify", key: "otherSpecify" },
    { label: "Long Term Nursing Facility", key: "longTermNursingFacility" },
    { label: "Skilled Nursing Facility", key: "skilledNursingFacility" },
    { label: "Short Stay Acute Hospital", key: "shortStayAcuteHospital" },
    { label: "Long Term Care Hospital", key: "longTermCareHospital" },
    { label: "Inpatient Rehabilitation", key: "inpatientRehabilitation" },
    { label: "Psychiatric Hospital", key: "psychiatricHospital" },
    { label: "Other Inpatient Facility", key: "otherInpatientFacility" },
    { label: "Other Inpatient Facility Text", key: "otherInpatientFacilityText" },
    { label: "Episode Timing", key: "episodeTiming" },
    { label: "Start of Care Date", key: "startOfCareDate" },
    { label: "Episode Start Date", key: "episodeStartDate" },
    { label: "Create Episode Schedule (Visit)", key: "createEpisodeScheduleVisit" },
    { label: "Create Episode Schedule (Oasis Start Care)", key: "createEpisodeScheduleOasisStartCare" },
    { label: "Create Episode Schedule (Therapy Evaluation)", key: "createEpisodeScheduleTherapyEvaluation" },
    { label: "Create Episode Schedule (Non-Oasis Start Care)", key: "createEpisodeScheduleNonOasisStartCare" },
    { label: "Create Episode Schedule (Initial Oasis Recert)", key: "createEpisodeScheduleInitialOasisRecert" },
    { label: "Create Episode Schedule (Initial Non-Oasis Recert)", key: "createEpisodeScheduleInitialNonOasisRecert" },
    { label: "Track F2F Documentation", key: "trackF2FDocumentation" },
    { label: "Stakeholders(s)", key: "stakeholders", render: rowData => <Accordion tableHead={"Stakeholders Details"} data={rowData.stakeholders} /> },
    {
      label: "Actions",
      key: "actions",
      render: rowData => (
        <div className="d-flex gap-3 flex-wrap">
          <button className="btn btn-sm btn-warning waves-effect waves-light" tabIndex={0} aria-controls="DataTables_Table_0" type="button">
            <i className="ti ti-edit me-sm-1" /> Edit
          </button>
          <button className="btn btn-sm btn-danger waves-effect waves-light" tabIndex={0} aria-controls="DataTables_Table_0" type="button">
            <i className="ti ti-user me-sm-1" /> View User
          </button>
          <button className="btn btn-sm btn-primary waves-effect waves-light" tabIndex={0} aria-controls="DataTables_Table_0" type="button">
            <i className="ti ti-notes me-sm-1" /> Assign Form
          </button>
        </div>
      )
    }
  ];
  

if(isLoading) return <AuthLoader/>
  

  return (
    <div className="card">

      <TableHeader title="Patient List" className="py-3 pt-5 fs-3 card-header"/>
      <div className="card-body">
        <div className="gap-3 d-flex flex-wrap">
         
          <ExportButton data={data} columns={column} fileName="Patient"/>
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


