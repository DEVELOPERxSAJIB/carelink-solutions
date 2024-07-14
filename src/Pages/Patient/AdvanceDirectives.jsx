import DataTable from "./../../components/Tables/DynamicTable";

import ExportButton from "./../../components/Buttons/ExportButton";
import TableHeader from "./../../components/Tables/TableHeader";
import { useGetAllDirectivesQuery } from "../../Redux/api/DirectiveApi";
import { useNavigate } from "react-router-dom";
import MainLoader from "./../../utils/Loaders/MainLoader";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getPermissionData } from "./../../Redux/slices/updateSlice";
const AdvanceDirectives = () => {
  const { data, isLoading, refetch } = useGetAllDirectivesQuery();
  const update = useSelector(getPermissionData);
  console.log(update);
  const columns = [
    {
      field: "admission",
      header: "Admission",
    },
    { field: "comment", header: "Comment" },
  ];

  const navigate = useNavigate();
  useEffect(() => {
    if (update) {
      refetch();
    }
  }, [update, refetch]);
  if (isLoading) return <MainLoader />;

  return (
    <>
      {isLoading ? (
        <MainLoader />
      ) : (
        <div className="card">
          <TableHeader
            title="Advance Care Plan/Admission list"
            className="py-3 pt-5 fs-3 card-header"
          />
          <div className="card-body">
            <div className="gap-3 d-flex flex-wrap">
              <ExportButton
                orientation="landscape"
                data={data?.payload?.directives ?? []}
                columns={columns}
                fileName="Advance Care Plan/Admission"
              />
              <button
                className="btn btn-secondary create-new btn-danger waves-effect waves-light"
                tabIndex={0}
                aria-controls="DataTables_Table_0"
                type="button"
              >
                <span className="d-flex align-items-center">
                  <i className="ti ti-trash me-sm-1" />{" "}
                  <span className="d-none d-sm-inline-block">
                    Delete selected
                  </span>
                </span>
              </button>

              <button
                className="btn btn-info waves-effect waves-light"
                tabIndex={0}
                aria-controls="DataTables_Table_0"
                type="button"
              >
                <span className="d-flex align-items-center">
                  <i className="ti ti-archive me-1" />
                  <span className="d-none d-sm-inline-block">Archive </span>
                </span>
              </button>
              <button
                className="btn btn-success waves-effect waves-light"
                tabIndex={0}
                aria-controls="DataTables_Table_0"
                type="button"
                onClick={() => navigate("/create-advance-directives")}
              >
                <span className="d-flex align-items-center">
                  <i className="ti ti-archive me-1" />
                  <span className="d-none d-sm-inline-block">
                    Add New advance directives
                  </span>
                </span>
              </button>
            </div>
            <div className="mt-5">
              <DataTable
                columns={columns}
                data={data?.payload?.directives ?? []}
                tableClassName="custom-table"
                tableName="AdvanceDirectives"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdvanceDirectives;
