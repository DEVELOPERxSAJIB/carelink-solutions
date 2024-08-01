import { useNavigate } from 'react-router-dom';
const PageHeader = ({ title, className }) => {
 const navigate= useNavigate()
    return (
    <div className={`${className} d-flex gap-3 justify-content-between align-items-center`}>
      <h4>{title}</h4>
      <button onClick={()=>navigate(-1)} className="btn btn-outline-primary hide-on-print  d-flex gap-2">
        <i className="ti ti-arrow-left"></i> Back
      </button>
    </div>
  );
};

export default PageHeader;
