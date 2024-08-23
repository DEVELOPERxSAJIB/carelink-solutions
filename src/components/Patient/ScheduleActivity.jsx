import { useState, useEffect } from "react";
import { format } from "date-fns";
import PopupModal from "./../Models/PopupModel";
import NewEpisode from "./NewEpisode";
import { useGetEpisodeByPatientIdQuery } from "../../Redux/api/EpisodeApi";
import DynamicCalendar from "./DynamicCalandar";
import "react-calendar/dist/Calendar.css";

const ScheduleActivity = ({
  startOfCareDate,
  patientFirstName,
  patientLastName,
  primaryInsurance,
  secondaryInsurance,
  patientPhysician,
  allPatientPhysician,
  patientId,
}) => {
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisodeIndex, setSelectedEpisodeIndex] = useState(0);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectDate, setSelectedDate] = useState([]);
  // Fetch episodes by patient ID
  console.log(selectDate)
  const { data: patientEpisodes, error } =
    useGetEpisodeByPatientIdQuery(patientId);

  useEffect(() => {
    if (patientEpisodes?.payload?.episode) {
      setEpisodes(patientEpisodes.payload.episode);
      // Set the initial selected dates
      const lastEpisode = patientEpisodes.payload.episode[0];
      setSelectedStartDate(new Date(lastEpisode.episodeStartDate));
      setSelectedEndDate(new Date(lastEpisode.episodeEndDate));
    }
  }, [patientEpisodes]);

  const handleEpisodeChange = (event) => {
    const index = event.target.value;
    setSelectedEpisodeIndex(index);
    const selectedEpisode = episodes[index];
    setSelectedStartDate(new Date(selectedEpisode.episodeStartDate));
    setSelectedEndDate(new Date(selectedEpisode.episodeEndDate));
  };

  if (error) {
    return <div>Error loading episodes</div>;
  }

  return (
    <div className="w-100 mt-4 d-flex gap-3 flex-column align-items-center justify-content-start">
      <div className="d-flex gap-3 align-items-center justify-content-start">
        <PopupModal
          style={{ minWidth: "800px" }}
          title="New Episode"
          id="newepisode"
        >
          <NewEpisode
            patientId={patientId}
            startOfCareDate={startOfCareDate}
            patientFirstName={patientFirstName}
            patientLastName={patientLastName}
            primaryInsurance={primaryInsurance}
            secondaryInsurance={secondaryInsurance}
            patientPhysician={patientPhysician}
            allPatientPhysician={allPatientPhysician}
          />
        </PopupModal>
        <button className="btn btn-light">Episode Manager</button>
        <button className="btn btn-light">Schedule Manager</button>
        <button className="btn btn-light">Authorizations</button>
        <button className="btn btn-light">30-Day Calendar</button>
        <button className="btn btn-light">Billing Period activity Log</button>
      </div>
      <h4>
        Episode for {patientFirstName} {patientLastName}
      </h4>
      <select
        className="form-select mb-3"
        onChange={handleEpisodeChange}
        value={selectedEpisodeIndex}
      >
        {episodes?.map((episode, index) => (
          <option key={episode._id} value={index}>
            {`${format(
              new Date(episode.episodeStartDate),
              "MM/dd/yyyy"
            )} - ${format(new Date(episode.episodeEndDate), "MM/dd/yyyy")}`}
          </option>
        ))}
      </select>

      <div className="row">
        {selectedStartDate && selectedEndDate && (
          <DynamicCalendar
            selectDate={selectDate}
            setSelectedDate={setSelectedDate}
            startDate={selectedStartDate}
            endDate={selectedEndDate}
          />
        )}
      </div>
    </div>
  );
};

export default ScheduleActivity;
