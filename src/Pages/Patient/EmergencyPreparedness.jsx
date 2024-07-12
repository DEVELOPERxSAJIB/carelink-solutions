import React from "react";
import DataTable from "./../../components/Tables/DynamicTable";
import ExportButton from "./../../components/Buttons/ExportButton";
import TableHeader from "./../../components/Tables/TableHeader";
import AuthLoader from "./../../utils/Loaders/AuthLoader";
import { useGetAllClinicalDiagnosesQuery } from "../../Redux/api/ClinicalDiagnosis"; // Adjust the import path as per your actual API setup
import { useNavigate } from "react-router-dom";

const flattenData = (data) => {
  return data.map((item) => ({
    _id: item._id,
    primaryDiagnosis: item.primaryDiagnosis || "",
    primaryDiagnosisCode: item.primaryDiagnosisCode || "",
    otherDiagnoses:
      item.otherDiagnoses
        ?.map((diag) => `${diag.diagnosis} (${diag.code})`)
        .join(", ") || "",
    clinicalComments: item.clinicalComments || "",
    addedBy: item.addedBy || "",
    status: item.status || false,
    createdAt: item.createdAt || "",
    updatedAt: item.updatedAt || "",
    serviceRequiredSN: item.serviceRequired?.SN || "",
    serviceRequiredHHA: item.serviceRequired?.HHA || "",
    serviceRequiredPT: item.serviceRequired?.PT || "",
    serviceRequiredOT: item.serviceRequired?.OT || "",
    serviceRequiredST: item.serviceRequired?.ST || "",
    serviceRequiredMSW: item.serviceRequired?.MSW || "",
    heightIn: item.serviceRequired?.heightIn || "",
    heightCm: item.serviceRequired?.heightCm || "",
    weightLb: item.serviceRequired?.weightLb || "",
    weightKg: item.serviceRequired?.weightKg || "",
    dmeNeededBedsideCommode: item.dmeNeeded?.bedsideCommode || "",
    dmeNeededCane: item.dmeNeeded?.cane || "",
    dmeNeededElevatedToiletSeat: item.dmeNeeded?.elevatedToiletSeat || "",
    dmeNeededGrabBars: item.dmeNeeded?.grabBars || "",
    dmeNeededHospitalBed: item.dmeNeeded?.hospitalBed || "",
    dmeNeededNebulizer: item.dmeNeeded?.nebulizer || "",
    dmeNeededOxygen: item.dmeNeeded?.oxygen || "",
    dmeNeededTubShowerBench: item.dmeNeeded?.tubShowerBench || "",
    dmeNeededWalker: item.dmeNeeded?.walker || "",
    dmeNeededWheelchair: item.dmeNeeded?.wheelchair || "",
    dmeNeededOther: item.dmeNeeded?.other || "",
    // Add more fields as needed
  }));
};

const EmergencyPreparedness = () => {
  const { data, isLoading } = useGetAllClinicalDiagnosesQuery(); // Adjust hook name as per your actual hook
  const flattenedData = flattenData(data?.payload?.clinicalRecords ?? []); // Adjust data structure as per your actual API response
  const navigate = useNavigate();
  if (isLoading) return <AuthLoader />;

  const columns = [
    { field: "primaryDiagnosis", header: "Primary Diagnosis" },
    { field: "primaryDiagnosisCode", header: "Diagnosis Code" },
    { field: "otherDiagnoses", header: "Other Diagnoses" },
    { field: "clinicalComments", header: "Clinical Comments" },
    { field: "addedBy", header: "Added By" },
    { field: "status", header: "Status" },
    { field: "createdAt", header: "Created At" },
    { field: "updatedAt", header: "Updated At" },
    { field: "serviceRequiredSN", header: "Service Required (SN)" },
    { field: "serviceRequiredHHA", header: "Service Required (HHA)" },
    { field: "serviceRequiredPT", header: "Service Required (PT)" },
    { field: "serviceRequiredOT", header: "Service Required (OT)" },
    { field: "serviceRequiredST", header: "Service Required (ST)" },
    { field: "serviceRequiredMSW", header: "Service Required (MSW)" },
    { field: "heightIn", header: "Height (in)" },
    { field: "heightCm", header: "Height (cm)" },
    { field: "weightLb", header: "Weight (lb)" },
    { field: "weightKg", header: "Weight (kg)" },
    {
      field: "dmeNeededBedsideCommode",
      header: "DME Needed (Bedside Commode)",
    },
    { field: "dmeNeededCane", header: "DME Needed (Cane)" },
    {
      field: "dmeNeededElevatedToiletSeat",
      header: "DME Needed (Elevated Toilet Seat)",
    },
    { field: "dmeNeededGrabBars", header: "DME Needed (Grab Bars)" },
    { field: "dmeNeededHospitalBed", header: "DME Needed (Hospital Bed)" },
    { field: "dmeNeededNebulizer", header: "DME Needed (Nebulizer)" },
    { field: "dmeNeededOxygen", header: "DME Needed (Oxygen)" },
    {
      field: "dmeNeededTubShowerBench",
      header: "DME Needed (Tub/Shower Bench)",
    },
    { field: "dmeNeededWalker", header: "DME Needed (Walker)" },
    { field: "dmeNeededWheelchair", header: "DME Needed (Wheelchair)" },
    { field: "dmeNeededOther", header: "DME Needed (Other)" },
    // Add more columns as needed
  ];

  return (
    <div className="card">
      <TableHeader
        title="Clinical Diagnoses"
        className="py-3 pt-5 fs-3 card-header"
      />
      <div className="card-body">
        <div className="gap-3 d-flex flex-wrap">
          <ExportButton
            data={flattenData}
            orientation="landscape"
            columns={columns}
            fileName="ClinicalDiagnoses"
          />
          <button
            className="btn btn-success waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
            onClick={() => navigate("/create-emergency-preparedness")}
          >
            <span className="d-flex align-items-center">
              <i className="ti ti-plus me-1" />
              <span className="d-none d-sm-inline-block">
                Add New Clinical Diagnosis
              </span>
            </span>
          </button>
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
        </div>
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={flattenedData ?? []}
            tableClassName="custom-table"
          />
        </div>
      </div>
    </div>
  );
};

export default EmergencyPreparedness;

