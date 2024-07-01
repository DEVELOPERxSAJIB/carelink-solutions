import React, { useState } from 'react';

const Notifications = () => {
    const [activeIndex, setActiveIndex] = useState(null); // State to track active accordion item

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index); // Toggle active index
    };

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
            labTestResultEntry: false
        },
        individualPhotosVideos: {
            newAlbum: false,
            newImage: false,
            newVideo: false
        },
        folderFiles: {
            folderCreation: false,
            folderShare: false,
            newFileEntry: false,
            fileShare: false
        },
        calendar: {
            newEvent: false,
            eventShare: false
        },
        pushNotes: {
            pushNotesReply: false,
            pushNotesShare: false,
            pushReplyReaction: false
        },
        messages: {
            messageShare: false
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
            personalCareAide: false
        },
        eMAR: {
            eMarMedicationCharting: false
        },
        general: {
            businessCommunityInvitationAcceptEmail: false,
            timeOffRequest: false
        },
        reminders: {
            birthdayReminders: false,
            calendarEventsReminders: false
        }
    });

    const handleSwitchChange = (section, setting) => {
        setSettings(prevSettings => ({
            ...prevSettings,
            [section]: {
                ...prevSettings[section],
                [setting]: !prevSettings[section][setting]
            }
        }));
    };

    return (
      <div className="card">
        <div className="card-header fs-4">
        Notification Settings
        </div>
      
        <div className="accordion mt-4" id="accordionExample">
            {Object.entries(settings).map(([section, items], index) => (
                <div className={` accordion-item ${activeIndex === index ? 'active' : ''}`} key={index}>
                    <h2 className="accordion-header capitalize" id={`heading-${index}`}>
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            onClick={() => toggleAccordion(index)} // Toggle active state on button click
                            aria-expanded={activeIndex === index ? 'true' : 'false'}
                            aria-controls={`collapse-${index}`}
                        >
                            {section} Settings
                        </button>
                    </h2>
                    <div
                        id={`collapse-${index}`}
                        className={`accordion-collapse collapse ${activeIndex === index ? 'show' : ''}`} // Add 'show' class when active
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
                                    <label className="form-check-label" htmlFor={`${section}-${item}`}>
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
    );
};

export default Notifications;
