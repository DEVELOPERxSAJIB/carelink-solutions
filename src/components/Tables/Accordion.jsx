// components/Tables/Accordion.jsx
import React, { useState } from 'react';

const Accordion = ({ data, tableHead }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="position-relative">
     <button className="btn btn-primary" onClick={togglePopup}>
        {isOpen ? <i className="ti ti-eye"></i> : <i className="ti ti-eye"></i>}
      </button>

      {isOpen && (
        <div className="modal fade show" id="smallModal" tabIndex="-1" aria-modal="true" role="dialog" style={{ display: 'block', padding: '0px' }}>
          <div className="modal-dialog modal-sm" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel2">{tableHead}</h5>
                <button type="button" className="btn-close" onClick={togglePopup} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {data.map((item, index) => (
                  <div key={index} className="row mb-3">
                    <div className="col-12">
                      <strong>{item}</strong>
                    </div>
                    
                  </div>
                ))}
              </div>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accordion;
