
import IndividualCard from './../../components/Cards/IndividualCard';
const AgencyDashboard = () => {
     
  return <div>
    <div className="row gap-y-5">
    <IndividualCard icon="ti ti-bell ti-lg" count={0} title="Notifications"/>
    <IndividualCard icon="ti ti-user ti-lg" count={0} title="Individuals"/>
    <IndividualCard icon="ti ti-mail ti-lg" count={0} title="Messages"/>
    <IndividualCard icon="ti ti-ticket ti-lg" count={0} title="Support Ticket Notifications"/>
    <IndividualCard icon="ti ti-file ti-lg" count={0} title="CareLink Digest"/>
    <IndividualCard icon="ti ti-bell ti-lg" count={0} title="Available Open Shifts"/>
    <IndividualCard icon="" count="" title="Employee Earning"/>
    <IndividualCard icon="ti ti-bell ti-lg" count={0} title="Reminder Module"/>
    </div>
  </div>;
};

export default AgencyDashboard;
