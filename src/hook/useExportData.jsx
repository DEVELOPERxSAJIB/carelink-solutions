import { useRef } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import copy from "copy-to-clipboard";
const useTableExport = () => {
  const handleExportExcel = (data) => {
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "data.xlsx");
  };

  const handleExportPDF = (tableRef) => {
    html2canvas(tableRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save("data.pdf");
    });
  };

  const handleCopy = (data) => {
    const text = data.map((row) => row.join("\t")).join("\n");
    copy(text);
    alert("Data copied to clipboard!");
  };

  const handlePrint = (tableRef) => {
    const content = tableRef.current;
    const pri = content.cloneNode(true);
    const popup = window.open("", "_blank");
    popup.document.open();
    popup.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            @media print {
              body {
                visibility: visible;
              }
            }
          </style>
        </head>
        <body>
          ${pri.outerHTML}
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 200); // Delay print to ensure content is fully loaded
            };
          </script>
        </body>
      </html>
    `);
    popup.document.close();
  };

  return {
    handleExportExcel,
    handleExportPDF,
    handleCopy,
    handlePrint,
  };
};

export default useTableExport;
