import PageHeader from "./../../components/FormElement/PageHeader";
import useFormFields from "../../hook/useFormHook";
import { useCreateContactSupportApiMutation } from "../../Redux/api/ContactSupportApi";
import { showToast } from './../../utils/Toastify';
import {useEffect} from "react"
const ContactUs = () => {
  const [createContactSupportApi, { data, error, isLoading }] =
    useCreateContactSupportApiMutation();

  const initialState = {
    subject: "",
    message: "",
  };

  const [formData, handleChange, resetForm, isValid] =
    useFormFields(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();

    createContactSupportApi(formData);
    resetForm();
  };
  useEffect(() => {

    showToast("error", error?.data?.message);
    showToast("success", data?.message);
  }, [
    error?.data?.message,
    data?.message,
  ]);
  return (
    <div>
      <div className="card mb-6">

        <PageHeader title="Contact Us" className="card-header fs-3" />
        <form onSubmit={handleSubmit} className="card-body">
          <div className="row g-6">
            <div className="col-md-12">
              <label className="form-label" htmlFor="formValidationLang">
                Subject
              </label>
              <input
                type="text"
                value={formData?.subject || ""}
                className="form-control"
                id="formValidationLang"
                placeholder="Subject"
                name="subject"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-12">
              <label className="form-label" htmlFor="message">
                Message
              </label>
              <input
                type="text"
                value={formData?.message || ""}
                onChange={handleChange}
                name="message"
                id="message"
                className="form-control"
              />
            </div>
          </div>
          <div className="pt-6">
            <button type="submit" className="btn btn-primary me-4">
              {isLoading ? "Sending . . ." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
