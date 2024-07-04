import React, { useState } from "react";

const Accordion = ({ data, tableHead }) => {
  const [isOpenFirstModal, setIsOpenFirstModal] = useState(false);
  const [isOpenSecondModal, setIsOpenSecondModal] = useState(false);

  const toggleFirstModal = () => {
    setIsOpenFirstModal(!isOpenFirstModal);
    if (isOpenSecondModal) setIsOpenSecondModal(false);
  };

  const toggleSecondModal = () => {
    setIsOpenSecondModal(!isOpenSecondModal);
    if (isOpenFirstModal) setIsOpenFirstModal(false);
  };

  return (
    <div className="position-relative">
      <button className="btn btn-primary" onClick={toggleFirstModal}>
        {isOpenFirstModal ? <i className="ti ti-eye"></i> : <i className="ti ti-eye"></i>}
      </button>

      {/* First Modal */}
      {isOpenFirstModal && (
        <div
          className="modal fade show"
          id="modalToggle"
          tabIndex="-1"
          aria-modal="true"
          role="dialog"
          style={{ display: "block", padding: "0px" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel1">
                  {tableHead}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={toggleFirstModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {data?.map((item, index) => (
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
