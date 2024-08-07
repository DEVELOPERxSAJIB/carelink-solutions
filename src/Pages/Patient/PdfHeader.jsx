const PdfHeader = ({ company, patient }) => {
  //console.log(patient);
  return (
    <div className="border p-2 pb-2">
      {" "}
      <div className=" invoice-preview-card  ">
        <div className="`invoice-preview-header rounded">
          <div className="d-flex justify-content-between">
            <div className="mb-xl-0 mb-6 text-heading">
              <div className="d-flex svg-illustration mb-6 gap-2 align-items-center">
                <div className="app-brand-logo demo">
                  <svg
                    width={32}
                    height={22}
                    viewBox="0 0 32 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z"
                      fill="#7367F0"
                    />
                    <path
                      opacity="0.06"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z"
                      fill="#161616"
                    />
                    <path
                      opacity="0.06"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z"
                      fill="#161616"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z"
                      fill="#7367F0"
                    />
                  </svg>
                </div>
                <span className="app-brand-text fw-bold fs-4 ms-50">
                  {company?.companyName}
                </span>
              </div>
              <p className="mb-2">{company?.address1}</p>
              <p className="mb-2"> {company?.address2}</p>
              <p className="mb-0">{company?.phone}</p>
            </div>
            <div>
              <h3 className="mb-6 text-capitalize">
                {patient?.patientFirstName} {patient?.patientLastName}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfHeader;
