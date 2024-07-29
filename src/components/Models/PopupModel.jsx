
const PopupModal = ({ id, title, children,style }) => {

  const handleClose = () => {
    // Implement your close logic here
    console.log('Modal closed');
  };

  return (
    <>
      
        {/* Button trigger modal */}
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#${id}`}>
          {title}
        </button>

        {/* Modal */}
        <div className="modal fade" id={id} tabIndex="-1" aria-hidden="true">
          <div style={{style}} className="modal-dialog" role="document">
            <div className="modal-content">
                
              <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
              </div>
              <div className="modal-body">
                {children}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-label-secondary" data-bs-dismiss="modal" onClick={handleClose}>Close</button>
              </div>
            </div>
          </div>
        </div>
     
    </>
  );
};

export default PopupModal;
