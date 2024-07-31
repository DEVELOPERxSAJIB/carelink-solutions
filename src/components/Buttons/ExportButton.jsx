import { useState, useRef,useEffect } from "react";
import "jspdf-autotable";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import { ReactToPrint } from "react-to-print";

const ExportButton = ({
  data,
  columns,
  fileName,
  orientation = "portrait",
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const componentRef = useRef();
  const menuRef = useRef();

  const handleExport = (type) => {
    switch (type) {
      case "csv":
        // Prepare CSV data
        const csvData = data.map((item) =>
          columns.reduce((acc, col) => {
            acc[col.header] = item[col.field];
            return acc;
          }, {})
        );

        // Prepare CSV headers
        const csvHeaders = columns.map((column) => ({
          label: column.header,
          key: column.field,
        }));

        const csvLink = (
          <CSVLink
            data={csvData}
            headers={csvHeaders}
            filename={`${fileName}.csv`}
            className="dropdown-item"
            onClick={() => setDropdownOpen(false)}
          >
            <i className="ti ti-file-text me-1" />
            CSV
          </CSVLink>
        );

        csvLink.click();
        break;

      case "excel":
        // Example for Excel export using XLSX library
        const worksheet = XLSX.utils.json_to_sheet(data ?? []);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
        break;
      case "copy":
        const textToCopy = data
          .map((row) =>
            columns
              .map((col) =>
                row[col.field] !== undefined ? row[col.field] : ""
              )
              .join("\t")
          )
          .join("\n");
        navigator.clipboard.writeText(textToCopy).then(() => {
          alert("Data copied to clipboard");
        });
        break;

      default:
        break;
    }
    setDropdownOpen(false); // Close the dropdown after selection
  };
  const handleClose = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setDropdownOpen(false)
    }
  };

  useEffect(() => {
    // Add event listener when the component is mounted
    document.addEventListener("mousedown", handleClose);

    // Clean up the event listener when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, []);
  return (
    <div ref={menuRef} className="btn-group">
      <button
        className="btn btn-secondary buttons-collection dropdown-toggle btn-label-primary me-4 waves-effect waves-light border-none"
        type="button"
        aria-haspopup="true"
        aria-expanded={dropdownOpen}
        onClick={toggleDropdown}
      >
        <span>
          <i className="ti ti-file-export ti-xs me-sm-1" />{" "}
          <span className="d-sm-inline-block">Export</span>
        </span>
      </button>
      {dropdownOpen && (
        <div
          className="dropdown-menu export_button right-0 show dt-button-collection"
          aria-modal="true"
          role="dialog"
        >
          <ReactToPrint
            trigger={() => (
              <button className="btn">
                <i className="ti ti-printer me-1" />
                Print
              </button>
            )}
            content={() => componentRef.current}
            documentTitle="Patient"
          />

          <a
            className="dropdown-item"
            href="#"
            onClick={() => handleExport("csv")}
          >
            <i className="ti ti-file-text me-1" />
            CSV
          </a>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => handleExport("excel")}
          >
            <i className="ti ti-file-spreadsheet me-1" />
            Excel
          </a>
          <ReactToPrint
            trigger={() => (
              <button className="btn">
                <i className="ti ti-printer me-1" />
                Pdf
              </button>
            )}
            content={() => componentRef.current}
            documentTitle="Patient"
          />
          <a
            className="dropdown-item"
            href="#"
            onClick={() => handleExport("copy")}
          >
            <i className="ti ti-copy me-1" />
            Copy
          </a>
        </div>
      )}
      <div
        id="print-content"
        ref={componentRef}
        className="dt-button-background"
        style={{ display: "none" }} // Hide by default, only shown on print
      >
        {/* Add the content you want to print here */}
        <div className="container w-100">
          <h3 className="text-center my-4">{fileName}</h3>
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                {columns?.map((col) => (
                  <th key={col.field}>{col.header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <tr key={index}>
                  {columns?.map((col) => (
                    <td key={col.field}>{item[col.field]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExportButton;
