import  { useState ,useEffect,useRef} from "react";

const DataTable = ({ columns, data,tableName, tableClassName, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20); // Default rows per page
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
const [tableMenu,setTableMenu]= useState(false)
const [rowId,setRowId]= useState(null)
  // Pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
const tableRef= useRef()
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

  const handleEditClick = (rowData) => {
    if (onEdit) {
      onEdit(rowData);
    }
  };

  const handleDeleteClick = (rowData) => {
    if (onDelete) {
      onDelete(rowData);
    }
  };
const handleTabMenu=(id)=>{
    setTableMenu(!tableMenu)
    setRowId(id)
}
  // Go to first page
  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  // Go to last page
  const goToLastPage = () => {
    setCurrentPage(Math.ceil(data.length / rowsPerPage));
  };
  const handleClose = (e) => {
    if (tableRef.current && !tableRef.current.contains(e.target)) {
      setTableMenu(false)
      document.documentElement.classList.toggle('');
    }
  };

  useEffect(() => {
    // Add event listener when the component is mounted
    document.addEventListener('mousedown', handleClose);
    
    // Clean up the event listener when the component is unmounted
    return () => {
      document.removeEventListener('mousedown', handleClose);
    };
  }, []);
  return (
    <div className="">
     {tableName && <h5 className="card-header">{tableName}</h5>}
      <div className="card-datatable table-responsive">
        <div className="flex my-5 row w-100  justify-content-between align-items-center">
          <div className="col-md-2 col-7">
            <label
              className="d-flex gap-1 justify-content-start align-items-center"
              htmlFor=""
            >
              show
              <select
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
              entries
            </label>
          </div>

          <div className="col-md-10 col-5">
            <input
              type="text"
              placeholder="Search by any..."
              value={searchTerm}
              className="form-control"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <table className={`card-datatable table-responsive w-100 table ${tableClassName}`}>
          <thead>
            <tr>
              {columns?.map((column, index) => (
                <th  key={index} onClick={() => handleSort(column.field)}>
                  <div className="d-flex">{column.header}
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
              {onEdit && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>
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
                    ) : (
                      column.render ? column.render(row) : row[column.field]
                    )}
                  </td>
                ))}
                {onEdit && (
                  <td>
                    <button onClick={()=>handleTabMenu(rowIndex)}
                      className={`btn btn-sm btn-text-secondary rounded-pill btn-icon dropdown-toggle hide-arrow  ${rowId===rowIndex &&tableMenu && "show"}`}
                      
                    >
                      
                      <i className="ti ti-dots-vertical ti-md"></i>
                    </button>
                    <ul ref={tableRef}
                      className={`dropdown-menu dropdown-menu-end m-0  ${rowId===rowIndex &&tableMenu && "show"}`}
                      
                    >
                      <li>
                        <a href="" className="dropdown-item">
                          Details
                        </a>
                      </li>
                      <li>
                        <a href="javascript:;" className="dropdown-item">
                          Archive
                        </a>
                      </li>
                      <div className="dropdown-divider"></div>
                      <li>
                        <a
                          href="#"
                          onClick={() => handleDeleteClick(row)}
                          className="dropdown-item text-danger delete-record"
                        >
                          Delete
                        </a>
                      </li>
                    </ul>
                    <button
                      className="btn btn-sm btn-text-secondary rounded-pill btn-icon item-edit"
                      onClick={() => handleEditClick(row)}
                    >
                      <i className="ti ti-pencil ti-md"></i>
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        {data?.length > rowsPerPage && (
          <nav className="mt-5 w-100 ">
            <ul className="pagination form-control border-none d-flex justify-content-end  mr-auto">
              <li className="page-item paginate_button">
                <button
                  className="page-link"
                  onClick={goToFirstPage}
                  disabled={currentPage === 1}
                >
                  <i className="ti ti-chevron-left ti-sm"></i>
                </button>
              </li>
              {Array.from({ length: Math.ceil(data.length / rowsPerPage) }).map(
                (item, index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                )
              )}
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={goToLastPage}
                  disabled={
                    currentPage === Math.ceil(data.length / rowsPerPage)
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
