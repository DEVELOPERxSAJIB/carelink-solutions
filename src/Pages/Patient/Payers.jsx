import DataTable from "./../../components/Tables/DynamicTable";

import ExportButton from './../../components/Buttons/ExportButton';
import TableHeader from './../../components/Tables/TableHeader';
import {useGetAllPayersQuery} from "../../Redux/api/PayerApi"
import AuthLoader from './../../utils/Loaders/AuthLoader';
import { useNavigate } from 'react-router-dom';
const Payers = () => {
  const navigate = useNavigate()
  const {data,isLoading} = useGetAllPayersQuery();
  const columns = [
    { field: "_id", header: "Payer ID/MRN" },
    { field: "mbiNumber", header: "Medicare Beneficiary Identifier (MBI) Number" },
    { field: "hicNumber", header: "Health Insurance Claim (HIC) Number" },
    { field: "medicaidNumber", header: "Medicaid Number" },
    { field: "alternateMedicaidNumber", header: "Alternate Medicaid Number" },
    { field: "primaryInsurance", header: "Primary Insurance" },
    { field: "secondaryInsurance", header: "Secondary Insurance" },
    { field: "tertiaryInsurance", header: "Tertiary Insurance" },
    { field: "payerComments", header: "Payer Comments" },
    { field: "employmentRelated", header: "Employment Related" },
    { field: "autoAccident", header: "Auto Accident" },
    { field: "claimCode", header: "Claim Code" },
    { field: "unableToWorkFrom", header: "Unable to Work From" },
    { field: "unableToWorkTo", header: "Unable to Work To" },
    { field: "hospitalizationStartDate", header: "Hospitalization Start Date" },
    { field: "hospitalizationEndDate", header: "Hospitalization End Date" },
    { field: "emergencyTreatmentIndicator", header: "Emergency Treatment Indicator" },

];



  
  const column = [
    { label: "Payer ID/MRN", key: "PayerIdMrn" },
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
    { label: "InPayer Rehabilitation", key: "inPayerRehabilitation" },
    { label: "Psychiatric Hospital", key: "psychiatricHospital" },
    { label: "Other InPayer Facility", key: "otherInPayerFacility" },
    { label: "Other InPayer Facility Text", key: "otherInPayerFacilityText" },
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
    
  ];
  

if(isLoading) return <AuthLoader/>
  
console.log(isLoading)
  return (
    <div className="card">

      <TableHeader title="Payer List" className="py-3 pt-5 fs-3 card-header"/>
      <div className="card-body">
        <div className="gap-3 d-flex flex-wrap">
         
          <ExportButton orientation="landscape" data={data?.data} columns={column} fileName="Payer"/>
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
            onClick={()=>navigate("/create-payers")}
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-archive me-1" />
              <span className="d-none d-sm-inline-block">
                Add New Payer
              </span>
            </span>
            </button>
        </div>
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={data?.data??[]}
            tableClassName="custom-table"
          />
        </div>
      </div>
    </div>
  );
};

export default Payers;

