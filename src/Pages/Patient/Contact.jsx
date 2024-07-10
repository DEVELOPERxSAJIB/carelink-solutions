import DataTable from "./../../components/Tables/DynamicTable";
 const flattenData = (data) => {
  return data.map(item => ({
    _id: item._id,
    primaryFirstName: item.emergencyContacts?.primary?.firstName || '',
    primaryLastName: item.emergencyContacts?.primary?.lastName || '',
    primaryMobilePhone: item.emergencyContacts?.primary?.mobilePhone || '',
    primaryEmail: item.emergencyContacts?.primary?.email || '',
    primaryAddressLine1: item.emergencyContacts?.primary?.addressLine1 || '',
    primaryAddressLine2: item.emergencyContacts?.primary?.addressLine2 || '',
    primaryCity: item.emergencyContacts?.primary?.city || '',
    primaryState: item.emergencyContacts?.primary?.state || '',
    primaryZip: item.emergencyContacts?.primary?.zip || '',
    alternateFirstName: item.alternateCAHPSContactDetails?.firstName || '',
    alternateMobilePhone: item.alternateCAHPSContactDetails?.mobilePhone || ''
  }));
};

import ExportButton from './../../components/Buttons/ExportButton';
import TableHeader from './../../components/Tables/TableHeader';
import {useGetAllContactsQuery} from "../../Redux/api/Contact"
import AuthLoader from './../../utils/Loaders/AuthLoader';

const Contact = () => {
  const {data,isLoading} = useGetAllContactsQuery();
  console.log(data)
 const flattenedData = flattenData(data?.payload?.contacts??[]);
console.log(flattenedData)
  const columns = [
    { field: '_id', header: 'ID' },
    { field: 'primaryFirstName', header: ' First Name' },
    { field: 'primaryLastName', header: ' Last Name' },
    { field: 'primaryMobilePhone', header: ' Mobile Phone' },
    { field: 'primaryEmail', header: 'Email' },
    { field: 'primaryAddressLine1', header: 'Address Line 1' },
    { field: 'primaryAddressLine2', header: 'Address Line 2' },
    { field: 'primaryCity', header: 'City' },
    { field: 'primaryState', header: 'State' },
    { field: 'primaryZip', header: ' Zip' },
    { field: 'alternateFirstName', header: ' CAHPS Contact First Name' },
    { field: 'alternateMobilePhone', header: ' CAHPS Contact Mobile Phone' }
  ];
  
  const column = [
    { key: '_id', label: 'ID' },
    { key: 'primaryFirstName', label: 'First Name' },
    { key: 'primaryLastName', label: 'Last Name' },
    { key: 'primaryMobilePhone', label: 'Mobile Phone' },
    { key: 'primaryEmail', label: 'Email' },
    { key: 'primaryAddressLine1', label: 'Address Line 1' },
    { key: 'primaryAddressLine2', label: 'Address Line 2' },
    { key: 'primaryCity', label: 'City' },
    { key: 'primaryState', label: 'State' },
    { key: 'primaryZip', label: 'Zip' },
    { key: 'alternateFirstName', label: 'CAHPS Contact First Name' },
    { key: 'alternateMobilePhone', label: 'CAHPS Contact Mobile Phone' }
  ];
  
  

if(isLoading) return <AuthLoader/>
  
console.log(isLoading)
  return (
    <div className="card">

      <TableHeader title="Patient List" className="py-3 pt-5 fs-3 card-header"/>
      <div className="card-body">
        <div className="gap-3 d-flex flex-wrap">
         
          <ExportButton data={data} columns={column} fileName="Patient"/>
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
        </div>
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={flattenedData??[]}
            tableClassName="custom-table"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;


