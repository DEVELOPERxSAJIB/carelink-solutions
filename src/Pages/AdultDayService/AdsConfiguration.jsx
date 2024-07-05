import React, { useState } from "react";
import PageHeader from './../../components/FormElement/PageHeader';

const AdsConfiguration = () => {
  // State for configuration items
  const [serviceLocation, setServiceLocation] = useState(false);
  const [locationAddress, setLocationAddress] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [totalHours, setTotalHours] = useState(0);
  const [staff, setStaff] = useState("");

  // Configuration items with labels and states
  const configurations = [
    {
      label: "Service Location",
      state: serviceLocation,
      setState: setServiceLocation,
    },
    {
      label: "Location Address",
      state: locationAddress,
      setState: setLocationAddress,
    },
    { label: "Start Time", state: startTime, setState: setStartTime },
    { label: "End Time", state: endTime, setState: setEndTime },
    { label: "Total Hours", state: totalHours, setState: setTotalHours },
    { label: "Staff", state: staff, setState: setStaff },
  ];

  // Function to render configurations dynamically
  const renderConfigurations = () => {
    return configurations.map((config, index) => (
      <form key={index} className="row mb-3">
        <div className="col-md-6">
          <div className="d-flex align-items-center justify-content-between gap-5">
            <h6>{config.label}</h6>
            <label className="switch switch-square">
              <input
                type="checkbox"
                className="switch-input"
                checked={config.state}
                onChange={() => config.setState(!config.state)}
              />
              <span className="switch-toggle-slider">
                <span className="switch-on"></span>
                <span className="switch-off"></span>
              </span>
              <span className="switch-label">
                {config.state ? "Show" : "Hide"}
              </span>
            </label>
          </div>
        </div>
        <div className="col-md-6">
          {/* Placeholder for additional form elements related to config */}
        </div>
      </form>
    ));
  };

  return (
    <div className="card">
      <PageHeader title="Manage Configuration" className="card-header fs-3"/>
      <div className="card-body">
        {renderConfigurations()}
        <button className="btn btn-primary">Save</button>
      </div>
    </div>
  );
};

export default AdsConfiguration;
