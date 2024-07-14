import DataTable from "./../../components/Tables/DynamicTable";

import ExportButton from "./../../components/Buttons/ExportButton";
import TableHeader from "./../../components/Tables/TableHeader";
import { useGetAllReferralsQuery } from "../../Redux/api/ReferalInformation";
import { useNavigate } from "react-router-dom";
import MainLoader from "./../../utils/Loaders/MainLoader";
import { useEffect } from 'react';
import { getPermissionData } from './../../Redux/slices/updateSlice';
import { useSelector } from 'react-redux';
const ReferralInformation = () => {
  const navigate = useNavigate();
  const { data, isLoading ,refetch} = useGetAllReferralsQuery();
  const columns = [
    { header: 'City', field: 'city' },
    { header: 'State', field: 'state' },
    { header: 'Referring Physician', field: 'referringPhysician' },
    { header: 'NPI', field: 'npi' },
    { header: 'Certifying Physician', field: 'certifyingPhysician' },
    { header: 'Face to Face Evaluation', field: 'faceToFaceEvaluation' },
    { header: 'Attending Physician', field: 'attendingPhysician' },
    { header: 'Admission Source', field: 'admissionSource' },
    { header: 'Name of Referral Source', field: 'nameOfReferralSource' },
    { header: 'Referral Date', field: 'referralDate' },
    { header: 'Inquiry Date', field: 'inquiryDate' },
    { header: 'Community Liaison', field: 'communityLiaison' },
    { header: 'Internal Referral Source', field: 'internalReferralSource' },
    { header: 'Facility Referral Source', field: 'facilityReferralSource' },
    { header: 'Type of Inpatient Admission', field: 'typeOfInpatientAdmission' },
  ];
  const {update} = useSelector(getPermissionData)
  useEffect(()=>{
    if(update){
      refetch()
    }
    },[update,refetch])
  if (isLoading) return <MainLoader />;

  return (
    <div className="card">
      <TableHeader
        title="Referral information"
        className="py-3 pt-5 fs-3 card-header"
      />
      <div className="card-body">
        <div className="gap-3 d-flex flex-wrap">
          <ExportButton
            orientation="landscape"
            data={data?.payload?.referrals ?? []}
            columns={columns}
            fileName="Referral information"
          />
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
              <span className="d-none d-sm-inline-block">Archive </span>
            </span>
          </button>
          <button
            className="btn btn-success waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
            onClick={() => navigate("/create-referral-information")}
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-archive me-1" />
              <span className="d-none d-sm-inline-block">Add New Referral</span>
            </span>
          </button>
        </div>
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={data?.payload?.referrals ?? []}
            tableClassName="custom-table"
            tableName="referralInformation"
          />
        </div>
      </div>
    </div>
  );
};

export default ReferralInformation;
