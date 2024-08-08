import React, { useState, useEffect } from "react";
import PageHeader from "./../../components/FormElement/PageHeader";
import {
  useCreateNotificationsMutation,
  useGetNotificationsQuery,
} from "../../Redux/api/SettingApi.js";
import AuthLoader from "./../../utils/Loaders/AuthLoader";
import { showToast } from './../../utils/Toastify';

const Notifications = () => {
  const [activeIndex, setActiveIndex] = useState(null); // State to track active accordion item
  const [settings, setSettings] = useState({
    individualVitals: {
      emergencyContact: false,
      bloodGlucoseEntry: false,
      bloodGlucoseAlert: false,
      bloodPressureEntry: false,
      bloodPressureAlert: false,
      folderEntry: false,
      fileEntry: false,
      medicalHistoryEntry: false,
      journalEntry: false,
      cholesterolEntry: false,
      cholesterolAlert: false,
      allergyEntry: false,
      weightEntry: false,
      weightAlert: false,
      physicalActivityEntry: false,
      physicalActivityAlert: false,
      seizureLogEntry: false,
      headachesEntry: false,
      immunizationEntry: false,
      labTestResultEntry: false,
    },
    individualPhotosVideos: {
      newAlbum: false,
      newImage: false,
      newVideo: false,
    },
    folderFiles: {
      folderCreation: false,
      folderShare: false,
      newFileEntry: false,
      fileShare: false,
    },
    calendar: {
      newEvent: false,
      eventShare: false,
    },
    pushNotes: {
      pushNotesReply: false,
      pushNotesShare: false,
      pushReplyReaction: false,
    },
    messages: {
      messageShare: false,
    },
    forms: {
      incidentReport: false,
      homemakerPersonalCare: false,
      timeSheet: false,
      mileageLog: false,
      medicationAdministrationRecord: false,
      financialLedger: false,
      incidentLog: false,
      tornadoDrillLog: false,
      fireDrillLog: false,
      intakeLog: false,
      appointments: false,
      medicalConcerns: false,
      shiftReportSummary: false,
      cleaningChart: false,
      behaviorSupports: false,
      sleepLog: false,
      bowelMovement: false,
      individualServicePlan: false,
      outcome: false,
      individualActivitiesDocumentation: false,
      listActivities: false,
      vehicleInspection: false,
      recordTrip: false,
      documentationAdultDaySupport: false,
      serviceRecordCouncilAging: false,
      homeHealthCertificationPlan: false,
      nursingVisitRecord: false,
      aideHomemakerCarePlan: false,
      supervisoryVisitHomeCareStaff: false,
      bodySkinCheck: false,
      adminSummaryNote: false,
      aideVisitRecord: false,
      remoteMonitoring: false,
      homeHealthAideSkillsChecklist: false,
      ddSkillsChecklist: false,
      communityIntegration: false,
      personalCareAide: false,
    },
    eMAR: {
      eMarMedicationCharting: false,
    },
    general: {
      businessCommunityInvitationAcceptEmail: false,
      timeOffRequest: false,
    },
    reminders: {
      birthdayReminders: false,
      calendarEventsReminders: false,
    },
  });

  const { data: notificationData = {} } = useGetNotificationsQuery();

  // Update settings state with notificationData on component mount
  useEffect(() => {
    if (notificationData.settings) {
      setSettings(notificationData.settings);
    }
  }, [notificationData]);

  const [createNotification, { isLoading, data,error }] =
    useCreateNotificationsMutation();

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle active index
  };

  const handleSwitchChange = (section, setting) => {
    const updatedSettings = {
      ...settings,
      [section]: {
        ...settings[section],
        [setting]: !settings[section][setting],
      },
    };
    setSettings(updatedSettings);
    createNotification({ settings: updatedSettings });
  };
  useEffect(() => {

    showToast("error", error?.data?.message);
    showToast("success", data?.message);
  }, [

    error?.data?.message,
    data?.message,
  ]);
  if (isLoading) return <AuthLoader />;
  return (
    <div className="card">
      <PageHeader title="Notification" className="card-header fs-3" />
     
      <div className="card-body p-4">
      
        <div className="accordion mt-4" id="accordionExample">
          {Object.entries(settings).map(([section, items], index) => (
            <div
              className={`accordion-item ${
                activeIndex === index ? "active" : ""
              }`}
              key={index}
            >
              <h2
                className="accordion-header capitalize"
                id={`heading-${index}`}
              >
                <button
                  className="accordion-button collapsed"
                  type="button"
                  onClick={() => toggleAccordion(index)} // Toggle active state on button click
                  aria-expanded={activeIndex === index ? "true" : "false"}
                  aria-controls={`collapse-${index}`}
                >
                  {section} Settings
                </button>
              </h2>
              <div
                id={`collapse-${index}`}
                className={`accordion-collapse collapse ${
                  activeIndex === index ? "show" : ""
                }`} // Add 'show' class when active
                aria-labelledby={`heading-${index}`}
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  {Object.entries(items).map(([item, value]) => (
                    <div className="form-check" key={`${section}-${item}`}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`${section}-${item}`}
                        checked={value}
                        onChange={() => handleSwitchChange(section, item)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`${section}-${item}`}
                      >
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
