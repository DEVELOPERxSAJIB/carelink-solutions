
import { useGetScheduleByIdQuery } from "../../Redux/api/ScheduleApi";
import { useParams } from "react-router-dom";
import TenDaySummaryCaseConference from '../../components/Patient/visitType/TenDaySummaryCaseConference';
const NurseSinglePage = () => {
  const { id } = useParams();
  const { data } = useGetScheduleByIdQuery(id);

  return <TenDaySummaryCaseConference data={data?.payload?.schedule} />;
};

export default NurseSinglePage;
