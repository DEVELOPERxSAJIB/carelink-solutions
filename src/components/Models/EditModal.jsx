// components/CustomModal.js

const EditModal = ({ show, onClose, title, children,style }) => {


  return (
    <div className="custom-modal-overlay">
      <div style={style?style:{minWidth:"500px",maxHeight:"80vh"}}  className="custom-modal">
        <div className="custom-modal-header">
          <h5 className="custom-modal-title">{title}</h5>
          <button type="button" className="close" onClick={()=>onClose(false)}>
            &times;
          </button>
        </div>
        <div  className="custom-modal-body">{children}</div>
        <div className="custom-modal-footer">
          <button type="button" className="btn btn-secondary" onClick={()=>onClose(false)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
