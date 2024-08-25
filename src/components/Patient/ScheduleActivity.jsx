import { useState, useEffect } from "react";
import { format } from "date-fns";
import PopupModal from "./../Models/PopupModel";
import NewEpisode from "./NewEpisode";
import { useGetEpisodeByPatientIdQuery } from "../../Redux/api/EpisodeApi";
import {
  useGetScheduleByPatientIdQuery,
  useDeleteScheduleMutation,
} from "../../Redux/api/ScheduleApi";

import DynamicCalendar from "./DynamicCalandar";
import "react-calendar/dist/Calendar.css";
import DataTable from "./../Tables/DynamicTable";
import PageHeader from "./../FormElement/PageHeader";
import Nursing from "./Nursing";
import { showToast } from "./../../utils/Toastify";

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
  const [activeDate, setActiveDate] = useState([]);
  const [scheduler, setScheduler] = useState("nursing");
  const { data: patientEpisodes } = useGetEpisodeByPatientIdQuery(patientId);
  const { data: schedules, refetch } =
    useGetScheduleByPatientIdQuery(patientId);
  const [deleteSchedule, { data: deleteDate, isSuccess: isDeleteSuccess }] =
    useDeleteScheduleMutation();

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

  const onDelete = (row) => {
    deleteSchedule(row._id);
  };
  const onEdit = (row) => {
    console.log(row);
  };
  const columns = [
    { field: "visitType", header: "Task" },
    { field: "date", header: "scheduledDate" },
    { field: "status", header: "Status" },
  ];
  useEffect(() => {
    const allSchedule = schedules?.payload?.schedule?.map((item) => item.date);
    setActiveDate(allSchedule);
  }, [schedules?.payload?.schedule]);

  useEffect(() => {
    if (isDeleteSuccess) {
      showToast("success", deleteDate?.message);
      refetch();
    }
  }, [isDeleteSuccess, deleteDate?.message, refetch]);
  return (
    <div className="w-100 mt-4 d-flex gap-3 flex-column align-items-center justify-content-start">
      <div className="d-flex w-100 gap-3 align-items-center justify-content-start flex-wrap">
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
        <option value="">Select episode</option>
        {episodes?.map((episode, index) => (
          <option key={episode._id} value={index}>
            {`${format(
              new Date(episode.episodeStartDate),
              "MM/dd/yyyy"
            )} - ${format(new Date(episode.episodeEndDate), "MM/dd/yyyy")}`}
          </option>
        ))}
      </select>

      <div className="row w-100">
        {selectedStartDate && selectedEndDate && (
          <DynamicCalendar
            activeDate={activeDate}
            setActiveDate={setActiveDate}
            selectDate={selectDate}
            setSelectedDate={setSelectedDate}
            startDate={selectedStartDate}
            endDate={selectedEndDate}
          />
        )}
      </div>
      <div className="d-flex w-100 gap-3 align-items-center flex-wrap justify-content-start">
        <button
          onClick={() => setScheduler("nursing")}
          className={`btn  ${
            scheduler === "nursing" ? "btn-primary" : "btn-light"
          }`}
        >
          Nursing
        </button>
        <button
          onClick={() => setScheduler("hha")}
          className={`btn  ${
            scheduler === "hha" ? "btn-primary" : "btn-light"
          }`}
        >
          HHA
        </button>
        <button
          onClick={() => setScheduler("msw/other")}
          className={`btn  ${
            scheduler === "msw/other" ? "btn-primary" : "btn-light"
          }`}
        >
          MSW/Other
        </button>
        <button
          onClick={() => setScheduler("therapy")}
          className={`btn  ${
            scheduler === "therapy" ? "btn-primary" : "btn-light"
          }`}
        >
          Therapy
        </button>
        <button
          onClick={() => setScheduler("dietitian")}
          className={`btn  ${
            scheduler === "dietitian" ? "btn-primary" : "btn-light"
          }`}
        >
          Dietitian
        </button>
        <button
          onClick={() => setScheduler("orders/care plans")}
          className={`btn  ${
            scheduler === "orders/care plans" ? "btn-primary" : "btn-light"
          }`}
        >
          Orders/Care Plans
        </button>
        <button
          onClick={() => setScheduler("daily/outlier")}
          className={`btn  ${
            scheduler === "daily/outlier" ? "btn-primary" : "btn-light"
          }`}
        >
          Daily/Outlier
        </button>
      </div>

      <div className="row w-100">
        {scheduler === "nursing" && (
          <Nursing
            selectDate={selectDate}
            setSelectedDate={setSelectedDate}
            patientId={patientId}
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
            patientName={`${patientFirstName} ${patientLastName}`}
          />
        )}
      </div>
      <div className="row w-100">
        <PageHeader title="Scheduler" back={false} />
        <DataTable
          columns={columns}
          data={schedules?.payload?.schedule ?? []}
          tableName="Scheduler"
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </div>
    </div>
  );
};

export default ScheduleActivity;
