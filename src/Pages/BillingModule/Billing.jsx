
import FullscreenModal from './../../components/Models/FullScreenModel';
import useFormFields from './../../hook/useFormHook';
const validateAccessKey = (formData) => {
  return formData.accessKey.trim() !== "";
};
const Billing = () => {
  const initialState = {
    accessKey: "",
  };

  const [formData, handleChange, resetForm, isValid] = useFormFields(initialState,validateAccessKey);

  const handleSubmit = (e) => {
    e.preventDefault();
    // handleSave(formData);
    resetForm();
  };

  return <div>
     <FullscreenModal id="billingPermission" title="Billing Permission" onSave={handleSubmit}>
      <form className="w-100">
        <div className="mb-3 w-100">
          <label htmlFor="accessKey" className="form-label">
            Access Key <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="accessKey"
            name="accessKey"
            className="form-control"
            value={formData.accessKey}
            onChange={handleChange}
            placeholder="Enter Access Key"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" >
          Activate Billing Module
        </button>
      </form>
    </FullscreenModal>
  </div>;
};

export default Billing;
