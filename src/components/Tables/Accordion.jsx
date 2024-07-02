// components/Tables/Accordion.jsx
import React, { useState } from 'react';

const Accordion = ({ stakeholders }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleAccordion = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={`accordion-item   ${isActive ? 'active' : ''}`}>
      <div className="accordion-title" onClick={toggleAccordion}>
        <span><i className="menu-icon tf-icons ti ti-chevron-down"></i> Stakeholders</span>
      </div>
      <div className="accordion-content card">
        {isActive && (
          <div className="accordion-details card-body">
            {stakeholders.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Accordion;
