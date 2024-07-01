import React, { useState } from 'react';

const ExportButton = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleExport = (type) => {
    switch (type) {
      case 'print':
        // Implement print logic here
        console.log('Print selected');
        break;
      case 'csv':
        // Implement CSV export logic here
        console.log('CSV selected');
        break;
      case 'excel':
        // Implement Excel export logic here
        console.log('Excel selected');
        break;
      case 'pdf':
        // Implement PDF export logic here
        console.log('PDF selected');
        break;
      case 'copy':
        // Implement copy logic here
        console.log('Copy selected');
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
          <span className="d-none d-sm-inline-block">Export</span>
        </span>
      </button>
      {dropdownOpen && (
        <div className="dropdown-menu right-0 show dt-button-collection" aria-modal="true" role="dialog">
          <a className="dropdown-item" href="#" onClick={() => handleExport('print')}>
            <i className="ti ti-printer me-1" />
            Print
          </a>
          <a className="dropdown-item" href="#" onClick={() => handleExport('csv')}>
            <i className="ti ti-file-text me-1" />
            CSV
          </a>
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
      <div className="dt-button-background" style={{}} />
    </div>
  );
};

export default ExportButton;
