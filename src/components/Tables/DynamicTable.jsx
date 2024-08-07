import { useState, useEffect, useRef } from "react";
import { useMeQuery } from "../../Redux/api/UserApi";
import { Link } from "react-router-dom";
const DataTable = ({
  columns,
  data,
  tableName,
  tableClassName,
  setSelectedEvent,
  onDelete,
  onEdit,
}) => {
  const { data: lgData } = useMeQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20); // Default rows per page
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [tableMenu, setTableMenu] = useState(false);
  const [rowId, setRowId] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null); // State to track active dropdown
  const [dropdownOpen, setDropdownOpen] = useState(
    Array(data.length).fill(false)
  );
  const [visibleColumns, setVisibleColumns] = useState(
    columns.slice(0, 5).map((column) => column.field) // Show only first 5 columns by default
  );
  const [truncate, setTruncate] = useState(true); // State to track truncation
  const tableRef = useRef();
  // Toggle truncation based on checkbox change
  const handleTruncate = (e) => {
    setTruncate(e.target.checked);
  };

  // Pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data?.slice(indexOfFirstRow, indexOfLastRow);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle rows per page change
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Reset to first page when changing rows per page
  };

  // Handle sorting
  const handleSort = (columnHeader) => {
    if (columnHeader === sortColumn) {
      // Reverse the sorting direction if the same column header is clicked again
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set the new column header for sorting and default to ascending direction
      setSortColumn(columnHeader);
      setSortDirection("asc");
    }
  };

  // Sorting function based on column and direction
  const sortedData = currentRows.sort((a, b) => {
    const columnA =
      typeof a[sortColumn] === "string"
        ? a[sortColumn].toLowerCase()
        : a[sortColumn];
    const columnB =
      typeof b[sortColumn] === "string"
        ? b[sortColumn].toLowerCase()
        : b[sortColumn];

    if (sortDirection === "asc") {
      return columnA > columnB ? 1 : -1;
    } else {
      return columnA < columnB ? 1 : -1;
    }
  });

  // Filter
  const filteredRows = sortedData.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleTabMenu = (id) => {
    setTableMenu(!tableMenu);
    setRowId(id);
    activeDropdown === id ? null : id;
  };

  // Go to first page
  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  // Go to last page
  const goToLastPage = () => {
    setCurrentPage(Math.ceil(data?.length / rowsPerPage));
  };

  const handleClose = (e) => {
    if (tableRef.current && !tableRef.current.contains(e.target)) {
      setTableMenu(false);
      setDropdownOpen(Array(data?.length).fill(false));
      setActiveDropdown(null);
    }
  };

  // Handle individual row selection
  const handleRowSelect = (rowIndex) => {
    if (selectedRows.includes(rowIndex)) {
      setSelectedRows(selectedRows.filter((index) => index !== rowIndex));
    } else {
      if (selectedRows.length < 5) {
        setSelectedRows([...selectedRows, rowIndex]);
      }
    }
  };

  // Handle selecting/deselecting all rows
  const handleSelectAll = () => {
    if (selectedRows.length === currentRows.length) {
      setSelectedRows([]);
    } else {
      if (selectedRows.length < 5) {
        setSelectedRows(currentRows.map((_, index) => index));
      }
    }
  };

  // Handle deletion of selected rows
  const handleDeleteSelected = () => {
    const selectedData = selectedRows.map((index) => currentRows[index]);

    setSelectedRows([]);
  };
  const handleDropdownToggle = (index) => {
    setDropdownOpen((prevState) =>
      prevState.map((item, i) => (i === index ? !item : item))
    );
  };
  useEffect(() => {
    document.addEventListener("click", handleClose);
    return () => {
      document.removeEventListener("click", handleClose);
    };
  }, []);

  // Handle visibility change for columns
  const handleColumnVisibilityChange = (column) => {
    setVisibleColumns((prevVisibleColumns) =>
      prevVisibleColumns.includes(column)
        ? prevVisibleColumns.filter((col) => col !== column)
        : [...prevVisibleColumns, column]
    );
  };

  const handleRowClick = (rowData) => {
    // setSelectedEvent(rowData);
  };

  return (
    <div className="position-relative">
      <div className="card-datatable table-responsive">
        <div className="flex my-5 row w-100 justify-content-between align-items-end">
          <div className="col-md-1 col-4">
            <label
              className="d-flex gap-1 form-label justify-content-start align-items-center"
              htmlFor=""
            >
              Show
            </label>
            <select
              style={{ minWidth: "55px" }}
              className="form-control"
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
            >
              <option value="2">2</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
          <div className="col-md-4 col-4">
            <label className="form-label">Show/Hide</label>
            <select
              className="form-select"
              value={visibleColumns}
              onChange={(e) => handleColumnVisibilityChange(e.target.value)}
            >
              {columns?.map((column) => (
                <option key={column.field} value={column.field}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={column.field}
                      checked={visibleColumns.includes(column.field)}
                      onChange={() =>
                        handleColumnVisibilityChange(column.field)
                      }
                    />
                    <label
                      className="form-check-label d-flex align-items-center"
                      htmlFor={column.field}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          width: "16px",
                          height: "16px",
                          borderRadius: "50%",
                          border: "1px solid gray",
                          marginRight: "5px",
                          textAlign: "center",
                          lineHeight: "16px",
                          fontSize: "12px",
                        }}
                      >
                        {visibleColumns.includes(column.field) ? "✔ " : "◻ "}
                      </span>
                      {column.header}
                    </label>
                  </div>
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-7 col-4">
            <input
              type="text"
              placeholder="Search by any..."
              value={searchTerm}
              className="form-control"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <label
          className="w-100 text-primary font-bold d-flex align-items-center justify-content-start gap-2 my-2"
          htmlFor=""
        >
          Expend table row
          <input
            type="checkbox"
            className="form-check-input"
            value={truncate}
            checked={truncate ? true : false}
            onChange={handleTruncate}
          />
        </label>

        <table
          ref={tableRef}
          className={`card-datatable table-responsive w-100 table ${tableClassName}`}
        >
          <thead>
            <tr className={`${truncate ? "truncate" : "notruncate"}`}>
              <th>
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={selectedRows.length === currentRows.length}
                  onChange={handleSelectAll}
                />
              </th>
              {columns
                .filter((column) => visibleColumns.includes(column.field))
                .map((column, index) => (
                  <th key={index} onClick={() => handleSort(column.field)}>
                    <div className="d-flex">
                      {column.header}
                      {sortColumn === column.field && (
                        <i
                          className={`ml-2 ti ti-arrow-${
                            sortDirection === "asc" ? "down" : "up"
                          }`}
                        ></i>
                      )}
                    </div>
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row, rowIndex) => (
              <tr
                className={`${truncate ? "truncate" : "notruncate"}`}
                key={rowIndex}
                onClick={() => handleRowClick(row)}
              >
                <td>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={selectedRows.includes(rowIndex)}
                    onChange={() => handleRowSelect(rowIndex)}
                  />
                </td>
                {columns
                  .filter((column) => visibleColumns.includes(column.field))
                  .map((column, colIndex) => (
                    <td key={colIndex} className="">
                      {column.field === "status" ? (
                        <label className="switch switch-square">
                          <input
                            type="radio"
                            className="switch-input"
                            name={`status-radio-${rowIndex}`}
                            defaultChecked={row[column.field] === "Active"}
                          />
                          <span className="switch-toggle-slider">
                            <span className="switch-on" />
                            <span className="switch-off" />
                          </span>
                          <span className="switch-label">
                            {row[column.field]}
                          </span>
                        </label>
                      ) : column.render ? (
                        column.render(row)
                      ) : (
                        row[column.field]
                      )}
                    </td>
                  ))}

                <td>
                  <button
                    onClick={() => {
                      handleTabMenu(rowIndex), handleDropdownToggle(rowIndex);
                    }}
                    className={`btn btn-sm btn-text-secondary rounded-pill btn-icon dropdown-toggle hide-arrow  ${
                      rowId === rowIndex && tableMenu && "show"
                    }`}
                  >
                    <i className="ti ti-dots-vertical ti-md"></i>
                  </button>
          
                  {dropdownOpen[rowIndex] ? (
                    <div className="dropdown-menu show">
                      {lgData?.payload?.user?.curd.includes("read") && (
                        <Link
                          className="dropdown-item"
                          to={`/${tableName}/${row?._id}`}
                        >
                          view
                        </Link>
                      )}
                      {lgData?.payload?.user?.curd.includes("delete") && (
                        <button
                          className="dropdown-item"
                          onClick={() => onDelete(row)}
                        >
                          Delete
                        </button>
                      )}
                      {lgData?.payload?.user?.curd.includes("edit") && (
                        <button
                          className="dropdown-item"
                          onClick={() => onEdit(row)}
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {data?.length > rowsPerPage && (
          <nav className="mt-5 w-100">
            <ul className="pagination form-control border-none d-flex justify-content-end mr-auto">
              <li className="page-item paginate_button">
                <button
                  className="page-link w-25 h-25"
                  onClick={goToFirstPage}
                  disabled={currentPage === 1}
                >
                  <i className="ti ti-chevron-left ti-sm"></i>
                </button>
              </li>
              {Array.from({
                length: Math.ceil(data?.length / rowsPerPage),
              }).map((item, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link w-25 h-25"
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li className="page-item">
                <button
                  className="page-link w-25 h-25"
                  onClick={goToLastPage}
                  disabled={
                    currentPage === Math.ceil(data?.length / rowsPerPage)
                  }
                >
                  <i className="ti ti-chevron-right ti-sm"></i>
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default DataTable;
