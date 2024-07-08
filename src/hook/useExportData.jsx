import { useState } from "react";
import { CSVLink } from "react-csv";
import Papa from "papaparse";

// Custom hook for handling CSV import, export, and delete operations
const useCSVOperations = (initialData = [], columns) => {
  const [tableData, setTableData] = useState(initialData);

  // Function to handle CSV file upload
  const handleCSVFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = e.target.result;
      const parsedCSV = Papa.parse(csv, { header: true });
      if (parsedCSV && parsedCSV.data) {
        setTableData(parsedCSV.data);
      }
    };
    reader.readAsText(file);
  };

  // Function to handle exporting selected rows to CSV
  const handleExportSelected = () => {
    const selectedRows = tableData.filter((row) => row.selected);
    const exportData = selectedRows.map((row) => {
      const data = {};
      columns.forEach((col) => {
        data[col.field] = row[col.field];
      });
      return data;
    });

    return (
      <CSVLink
        data={exportData}
        filename={"selected_data.csv"}
        className="btn btn-warning waves-effect waves-light"
        target="_blank"
      >
        Export Selected
      </CSVLink>
    );
  };

  // Function to handle deleting selected rows
  const handleDeleteSelected = () => {
    const updatedData = tableData.filter((row) => !row.selected);
    setTableData(updatedData);
  };

  // Example function to handle input tag changes (can be expanded as needed)
  const handleInputChange = (event) => {
    // Example: Update tableData based on input changes
    const { name, value } = event.target;
    // Example logic: Update only the first row's 'firstName' field
    const updatedTableData = tableData.map((row, index) => {
      if (index === 0) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setTableData(updatedTableData);
  };

  return {
    tableData,
    setTableData,
    handleCSVFileUpload,
    handleExportSelected,
    handleDeleteSelected,
    handleInputChange, // Include additional functions as needed
  };
};

export default useCSVOperations;
