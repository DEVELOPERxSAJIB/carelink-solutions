import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";

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

  const handlePrint = () => {
    const doc = new jsPDF({
      orientation: orientation === "landscape" ? "landscape" : "portrait",
    });
    const pageWidth = doc.internal.pageSize.width;

    // Set document header
    doc.setFontSize(18);
    const headerText = "CareLink Solutions";
    const headerWidth =
      (doc.getStringUnitWidth(headerText) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    doc.text(headerText, (pageWidth - headerWidth) / 2, 15);

    doc.setFontSize(12);
    const subHeaderText = `Employee Salary Sheet - ${fileName}`;
    const subHeaderWidth =
      (doc.getStringUnitWidth(subHeaderText) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    doc.text(subHeaderText, (pageWidth - subHeaderWidth) / 2, 25);

    // Prepare table data
    const tableHead = columns.map((col) => col.header);
    const tableBody = data.map((row) =>
      columns.map((col) => (row[col.field] !== undefined ? row[col.field] : ""))
    );

    // Add table content
    doc.autoTable({
      head: [tableHead],
      body: tableBody,
      startY: 35, // Adjust starting position if needed
      margin: { top: 10, bottom: 10 },
      didDrawPage: (data) => {
        // Ensure that the content fits within the page limits to prevent infinite loops
        if (data.cursor.y > doc.internal.pageSize.height - 10) {
          doc.addPage();
        }
      },
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

      case "pdf":
        handlePrint();
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
