
import DataTable from './../../components/Tables/DynamicTable';
import { useNavigate } from 'react-router-dom';
import Accordion from './../../components/Tables/Accordion';

// Function to get the start and end dates of the current week
const getCurrentWeekDateRange = () => {
  const now = new Date();
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
  const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));

  const formatDate = (date) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short',
    };
    return date.toLocaleDateString('en-US', options);
  };

  return {
    start: formatDate(startOfWeek),
    end: formatDate(endOfWeek),
  };
};

const Individual = () => {

  const columns = [
    { header: 'S.No', field: 'serialNumber' },
    { header: 'Individual ID', field: 'individualId' },
    { header: 'First Name', field: 'firstName' },
    { header: 'Last Name', field: 'lastName' },
    { header: 'Created By', field: 'createdBy' },
    { header: 'Status', field: 'status' },
    {
      header: 'Stakeholders(s)',
      field: 'stakeholders',
      render: (rowData) => (
        <Accordion tableHead={"Stakeholders Details"} data={rowData.stakeholders} />
      ),
    },
    {
      header: 'Actions',
      field: 'actions',
      render: (rowData) => (
        <div className="d-flex gap-3 flex-wrap">
          <button
            className="btn btn-sm btn-secondary create-new btn-warning waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span>
              <i className="ti ti-edit me-sm-1" />{' '}
              <span className="d-none d-sm-inline-block">Edit</span>
            </span>
          </button>
     
          <button
            className="btn btn-sm btn-secondary create-new btn-danger waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span>
              <i className="ti ti-user me-sm-1" />{' '}
              <span className="d-none d-sm-inline-block">View user</span>
            </span>
          </button>
          <button
            className="btn btn-sm btn-secondary create-new btn-primary waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span>
              <i className="ti ti-notes me-sm-1" />{' '}
              <span className="d-none d-sm-inline-block">Assign Form</span>
            </span>
          </button>
        </div>
      ),
    },
  ];

  const data = [
    {
      serialNumber: 1,
      individualId: '001',
      firstName: 'Adnan',
      lastName: 'Sidirijal',
      createdBy: 'Liban Awil',
      status: 'active',
      stakeholders: [
        'NA',
        'Email Address: adnan@gmail.com',
        'Address1: 4691 McFadden Rd',
        'Address2: NA',
        'City: Columbus',
        'State: OH',
        'Zipcode: 43229',
        'Phone: (614) 616-0379',
        'Last Modified By: Liban Awil Agency',
        'Last Modified On: 06/28/2024 09:53 PM',
        'Changed Status: -',
      ],
    },
    {
      serialNumber: 2,
      individualId: '002',
      firstName: 'John',
      lastName: 'Doe',
      createdBy: 'Jane Smith',
      status: 'block',
      stakeholders: [
        'NA',
        'Email Address: john.doe@example.com',
        'Address1: 123 Main St',
        'Address2: Apt 2B',
        'City: Anytown',
        'State: CA',
        'Zipcode: 90210',
        'Phone: (555) 123-4567',
        'Last Modified By: Jane Smith',
        'Last Modified On: 06/30/2024 10:15 AM',
        'Changed Status: -',
      ],
    },
    {
      serialNumber: 3,
      individualId: '003',
      firstName: 'Alice',
      lastName: 'Johnson',
      createdBy: 'Bob Brown',
      status: 'active',
      stakeholders: [
        'NA',
        'Email Address: alice.johnson@example.com',
        'Address1: 456 Oak St',
        'Address2: Suite 100',
        'City: Smallville',
        'State: NY',
        'Zipcode: 12345',
        'Phone: (555) 987-6543',
        'Last Modified By: Bob Brown',
        'Last Modified On: 06/29/2024 03:30 PM',
        'Changed Status: -',
      ],
    },
    {
      serialNumber: 4,
      individualId: '004',
      firstName: 'Eve',
      lastName: 'Smith',
      createdBy: 'Alice Green',
      status: 'block',
      stakeholders: [
        'NA',
        'Email Address: eve.smith@example.com',
        'Address1: 789 Elm St',
        'Address2: Unit 5C',
        'City: Metroville',
        'State: TX',
        'Zipcode: 54321',
        'Phone: (555) 789-0123',
        'Last Modified By: Alice Green',
        'Last Modified On: 06/30/2024 11:45 AM',
        'Changed Status: -',
      ],
    },
    {
      serialNumber: 5,
      individualId: '005',
      firstName: 'Michael',
      lastName: 'Clark',
      createdBy: 'Sarah White',
      status: 'active',
      stakeholders: [
        'NA',
        'Email Address: michael.clark@example.com',
        'Address1: 567 Pine Ave',
        'Address2: Suite 200',
        'City: Lakeside',
        'State: FL',
        'Zipcode: 67890',
        'Phone: (555) 234-5678',
        'Last Modified By: Sarah White',
        'Last Modified On: 06/29/2024 04:20 PM',
        'Changed Status: -',
      ],
    },
  ];



  return (
    <div className="card">
      <div className="card-header py-3 pt-5 fs-3">Manage Sub Users</div>
      <div className="card-body">
        <div className="gap-3 d-flex">
          <button
            className="btn btn-sm  create-new btn-primary waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span>
              <i className="ti ti-plus me-sm-1" />{' '}
              <span className="d-none d-sm-inline-block">Add New</span>
            </span>
          </button>
          <button
            className="btn btn-sm btn-secondary create-new btn-danger waves-effect waves-light"
            tabIndex={0}
            aria-controls="DataTables_Table_0"
            type="button"
          >
            <span>
              <i className="ti ti-trash me-sm-1" />{' '}
              <span className="d-none d-sm-inline-block">
                Delete all selected
              </span>
            </span>
          </button>
        </div>
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={data}
            tableClassName="custom-table"

          />
        </div>
      </div>
    </div>
  );
};

export default Individual;
