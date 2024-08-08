const PdfHeader = ({ company, patient }) => {
  //console.log(patient);
  return (
    <div className=" p-2 pb-2">
      <div style={{ fontSize: "12px" }} className=" invoice-preview-card  ">
        <div className="`invoice-preview-header rounded">
          <div className="d-flex justify-content-between border px-4 py-2">
            <div className="mb-xl-0 mb-6 text-heading">
              <div className="d-flex svg-illustration mb-6 gap-2 align-items-center"></div>
              <p className="mb-2">{company?.address1}</p>
              <p className="mb-2"> {company?.address2}</p>
              <p className="mb-0">Phone:{company?.phone}</p>
              <p className="mb-0">Fax:{company?.fax}</p>
            </div>
            <div className="d-flex align-items-center">
              <h3 className="mb-6 text-capitalize ps-5">
                <span className="app-brand-text fw-bold fs-5 me-50">
                  {company?.companyName}
                </span>
              </h3>
            </div>
          </div>
          <div style={{color:"black",fontWeight:"bolder",fontSize:"12px"}} className="d-flex align-items-center justify-content-between px-4 w-100 border">
            <p className="text-uppercase text-dark font-bold pb-0 mt-2">
              <span>{patient?.patientFirstName}</span>{""} <span>{patient?.patientLastName}</span>
            </p>
            <p className="pb-0 mt-2 text-dark">DOB: <span className="text-secondary text-normal">{patient?.birthDate}</span></p>
            <p className="pb-0 mt-2 text-dark">MRN: <span className="text-secondary text-normal">{patient?.medicareNumber}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfHeader;
