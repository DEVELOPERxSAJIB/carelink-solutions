
import PopupModal from './../../components/Models/PopupModel';
const EmployeeFiles = () => {
  return <div>
    <PopupModal title="Employee files" id="employeefiles">
      <form action="">
        <div className="card">
          <div className="card-header pb-0">
            <h4>HR Permissions</h4>
          Enter Access Key below to activate the access of HR Module.

          </div>
          <div className="card-body">
           <label className="form-label mt-3" htmlFor="">Access key</label>
           <input type="text" className="form-control" />
           <button className="btn btn-primary mt-4">Active accesskey</button>
          </div>
        </div>
      </form>
    </PopupModal>
  </div>;
};

export default EmployeeFiles;
