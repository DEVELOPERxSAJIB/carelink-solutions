import DataTable from "./../../components/Tables/DynamicTable";

import ExportButton from './../../components/Buttons/ExportButton';
import TableHeader from './../../components/Tables/TableHeader';
import {useGetAllPayersQuery} from "../../Redux/api/PayerApi"
import { useNavigate } from 'react-router-dom';
import MainLoader from './../../utils/Loaders/MainLoader';
const ReferralInformation = () => {
  const navigate = useNavigate()
  const {data,isLoading} = useGetAllPayersQuery();
  const columns = [
    { field: "_id", header: "Payer ID/MRN" },
    { field: "mbiNumber", header: "Medicare Beneficiary Identifier (MBI) Number" },

];


if(isLoading) return <MainLoader/>
  
console.log(isLoading)
  return (
    <div className="card">

      <TableHeader title="Referral information" className="py-3 pt-5 fs-3 card-header"/>
      <div className="card-body">
        <div className="gap-3 d-flex flex-wrap">
         
          <ExportButton orientation="landscape" data={data?.data??[]} columns={columns} fileName="Referral information"/>
          <button
            className="btn btn-secondary create-new btn-danger waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-trash me-sm-1" />{" "}
              <span className="d-none d-sm-inline-block">Delete selected</span>
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
              <span className="d-none d-sm-inline-block">
                Archive{" "}
              </span>
            </span>
            </button>
          <button
            className="btn btn-success waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
            onClick={()=>navigate("/create-referral-information")}
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-archive me-1" />
              <span className="d-none d-sm-inline-block">
                Add New Referral
              </span>
            </span>
            </button>
        </div>
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={data?.data??[]}
            tableClassName="custom-table"
          />
        </div>
      </div>
    </div>
  );
};

export default ReferralInformation;

