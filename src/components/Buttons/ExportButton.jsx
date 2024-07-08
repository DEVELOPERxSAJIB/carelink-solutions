import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';

const ExportButton = ({ data, columns, fileName }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);


  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handlePrint = () => {
    const printContent = document.getElementById('print-content');
    if (printContent) {
      const doc = new jsPDF();
  
      // Calculate the center position
      const pageWidth = doc.internal.pageSize.width;
      const textWidth = doc.getStringUnitWidth('CareLink Solutions') * doc.internal.getFontSize() / doc.internal.scaleFactor;
      const startX = (pageWidth - textWidth) / 2;
  
      // Set up document header
      doc.setFontSize(18);
      doc.text('CareLink Solutions', startX, 15);
      doc.setFontSize(12);
      const titleText = `Employee Salary Sheet - ${fileName}`;
      const titleWidth = doc.getStringUnitWidth(titleText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
      const titleStartX = (pageWidth - titleWidth) / 2;
      doc.text(titleText, titleStartX, 25);
  
      // Add table content
      doc.autoTable({
        head: [columns.map(col => col.label)],
        body: data.map(row => columns.map(col => row[col.key])),
        startY: 35, // Adjust starting position if needed
      });
  
      doc.save(`${fileName}.pdf`);
    }
  };
  
  

  const handleExport = (type) => {
    switch (type) {
      case 'print':
        handlePrint();
        break;
      case 'csv':
        // CSV export handled by react-csv
        break;
      case 'excel':
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
        break;
      case 'pdf':
        handlePrint();
        break;
      case 'copy':
        const textToCopy = data.map(row => columns.map(col => row[col.key]).join('\t')).join('\n');
        navigator.clipboard.writeText(textToCopy).then(() => {
          alert('Data copied to clipboard');
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
        <div className="dropdown-menu export_button right-0 show dt-button-collection" aria-modal="true" role="dialog">
          <a className="dropdown-item" href="#" onClick={() => handleExport('print')}>
            <i className="ti ti-printer me-1" />
            Print
          </a>
          <CSVLink data={data} headers={columns.map(col => col.label)} filename={`${fileName}.csv`} className="dropdown-item" onClick={() => setDropdownOpen(false)}>
            <i className="ti ti-file-text me-1" />
            CSV
          </CSVLink>
          <a className="dropdown-item" href="#" onClick={() => handleExport('excel')}>
            <i className="ti ti-file-spreadsheet me-1" />
            Excel
          </a>
          <a className="dropdown-item" href="#" onClick={() => handleExport('pdf')}>
            <i className="ti ti-file-description me-1" />
            PDF
          </a>
          <a className="dropdown-item" href="#" onClick={() => handleExport('copy')}>
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
