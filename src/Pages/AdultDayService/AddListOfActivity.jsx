import PageHeader from './../../components/FormElement/PageHeader';
const AddAdultListOfActivity = () => {
  return (
    <div className="card">
      <PageHeader title="Add List of Activity" className="card-header fs-3"/>
      <div className="card-body">
        <div className="col-md-12">
          <form action="">
            <label className="form-label" htmlFor="form-repeater-1-3">
             Category 
            </label>
            <select id="form-repeater-1-3" className="form-select">
              <option value="Jone">--Select Category--</option>
              <option value="Jone">Jone</option>
              <option value="abraham">abraham</option>
            </select>
            <button type="submit" className="btn btn-primary mt-5">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAdultListOfActivity;
