import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";

const ExportButton = ({ data, columns, fileName, orientation = "portrait" }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handlePrint = () => {
    const doc = new jsPDF({
      orientation: orientation === "landscape" ? "landscape" : "portrait",
    });
    const pageWidth = doc.internal.pageSize.width;

    // Set document header
    doc.setFontSize(18);
    doc.text(
      "CareLink Solutions",
      (pageWidth -
        (doc.getStringUnitWidth("CareLink Solutions") *
          doc.internal.getFontSize()) /
          2) /
        2,
      15
    );
    doc.setFontSize(12);
    doc.text(
      `Employee Salary Sheet - ${fileName}`,
      (pageWidth -
        (doc.getStringUnitWidth(`Employee Salary Sheet - ${fileName}`) *
          doc.internal.getFontSize()) /
          2) /
        2,
      25
    );

    // Add table content
    doc.autoTable({
      head: [columns.map((col) => col.header)],
      body: data.map((row) => columns.map((col) => row[col.field])),
      startY: 35, // Adjust starting position if needed
    });

    // Open PDF in new tab for printing
    doc.autoPrint();
    doc.output("dataurlnewwindow");

    // For saving directly (not recommended for printing)
    // doc.save(`${fileName}.pdf`);
  };

  const handleExport = (type) => {
    switch (type) {
      case "print":
        handlePrint();
        break;
      case "csv":
        // Prepare CSV data
        const csvData = data.map((item) =>
          columns.reduce((acc, col) => {
            acc[col.header] = item[col.field]; // Adjust this if necessary
            return acc;
          }, {})
        );

        // Prepare CSV headers
        const csvHeaders = columns.map((column) => ({
          label: column.header,
          key: column.field,
        }));

        return (
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

      case "excel":
        // Example for Excel export using XLSX library
        const worksheet = XLSX.utils.json_to_sheet(data ?? []);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
        break;

      case "pdf":
        handlePrint();
        break;

      case "copy":
        const textToCopy = data
          .map((row) => columns.map((col) => row[col.field]).join("\t"))
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

  return (
    <div className="btn-group">
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
          <a
            className="dropdown-item"
            href="#"
            onClick={() => handleExport("print")}
          >
            <i className="ti ti-printer me-1" />
            Print
          </a>
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
          <a
            className="dropdown-item"
            href="#"
            onClick={() => handleExport("pdf")}
          >
            <i className="ti ti-file-description me-1" />
            PDF
          </a>
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
      <div id="print-content" className="dt-button-background" style={{}} />
    </div>
  );
};

export default ExportButton;
