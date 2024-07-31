import IndividualCard from '../../components/Cards/IndividualCard';
import { useMeQuery } from "../../Redux/api/UserApi";

const AgencyDashboard = () => {
  const { data } = useMeQuery();
  const userRole = data?.payload?.user?.role;

  return (
    <div>
      <div className="row gap-y-5">
        {/* Display for all roles */}
        <IndividualCard icon="ti ti-bell ti-lg" count={0} title="Notifications" />
        <IndividualCard icon="ti ti-user ti-lg" count={0} title="Provider" />
        <IndividualCard icon="ti ti-mail ti-lg" count={0} title="Messages" />

        {/* Display for 'admin' and 'superadmin' */}
        {(userRole === 'admin' || userRole === 'superadmin') && (
          <>
            <IndividualCard icon="ti ti-ticket ti-lg" count={0} title="Support Ticket Notifications" />
            <IndividualCard icon="ti ti-file ti-lg" count={0} title="CareLink Digest" />
            <IndividualCard icon="ti ti-bell ti-lg" count={0} title="Available Open Shifts" />
            <IndividualCard icon="ti ti-dollar ti-lg" count={0} title="Employee Earning" />
            <IndividualCard icon="ti ti-heart ti-lg" count={0} title="Health Records" />
            <IndividualCard icon="ti ti-briefcase ti-lg" count={0} title="Provider Dashboard" />
            <IndividualCard icon="ti ti-bell ti-lg" count={0} title="Reminder Module" />
          </>
        )}

        {/* Display for 'caregiver' */}
        {userRole === 'caregiver' && (
          <IndividualCard icon="ti ti-bell ti-lg" count={0} title="Available Open Shifts" />
        )}

        {/* Display for 'patient' */}
        {userRole === 'patient' && (
          <IndividualCard icon="ti ti-heart ti-lg" count={0} title="Health Records" />
        )}

        {/* Display for 'provider' */}
        {userRole === 'provider' && (
          <IndividualCard icon="ti ti-briefcase ti-lg" count={0} title="Provider Dashboard" />
        )}
      </div>
    </div>
  );
};

export default AgencyDashboard;
