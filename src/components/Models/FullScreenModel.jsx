
const FullscreenModal = ({ title, children, id, className ,style}) => {
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#${id}`}
      >
        {title}
      </button>

      {/* Modal */}
      <div className="modal fade" id={`${id}`} tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-fullscreen " role="document">
          <div className="modal-content">
            <div
              style={style?style:{ minHeight: "60vh",minWidth:"60vw"}}
              className="row d-flex justify-content-center  align-items-center"
            >
              <div className={` ${className ? className : "col-md-4"}`}>
                <div className="modal-header">
                  <h5 className="modal-title" id="modalFullTitle">
                    {title}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body card m-3 d-flex justify-content-center align-items-center">
                  {children}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-label-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FullscreenModal;
