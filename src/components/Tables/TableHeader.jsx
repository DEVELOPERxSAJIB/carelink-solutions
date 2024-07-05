import React from "react";
import { useNavigate } from "react-router-dom";

const TableHeader = ({ title,className }) => {
  const navigate = useNavigate();
  return (
    <div className={`d-flex justify-content-between align-items-center ${className}`}>
      <h3>{title}</h3>
      <button className="btn btn-outline-primary  d-flex gap-2 align-items-center justify-between" onClick={() => navigate(-1)}>
        <i className="ti ti-arrow-left"></i> Back
      </button>
    </div>
  );
};

export default TableHeader;
