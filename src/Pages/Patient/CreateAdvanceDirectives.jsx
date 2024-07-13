import { useState, useEffect } from "react";
import { useCreateDirectiveMutation } from "../../Redux/api/DirectiveApi";
import PageHeader from "./../../components/FormElement/PageHeader";
import AuthLoader from "./../../utils/Loaders/AuthLoader";
import Template from "./../../components/FormElement/Template";
// useCreateDirectiveMutation

const CreateAdvanceDirectives = () => {
  const [createDirective, { data, isLoading, error }] = useCreateDirectiveMutation();

  const [template, setTemplate] = useState("");

  const initialFormData = {
    admission: "No",
    comment: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked
          ? [...prevData[name], value]
          : prevData[name].filter((item) => item !== value),
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createDirective(formData);
    
  };
  console.log(formData)
  const handleSaveAndContinue = (e) => {
    e.preventDefault();
    createDirective(formData);
    localStorage.setItem("Directive", JSON.stringify(formData));
  };

  const handleSaveAndExit = (e) => {
    e.preventDefault();
    localStorage.setItem("Directive", JSON.stringify(formData));
  };

  useEffect(() => {
    if (template?.value) {
      setFormData((prev) => ({
        ...prev,
        comment: prev.comment + (prev.comment ? "\n" : "") + template.value,
      }));
    }
  }, [template?.value]);

  if (isLoading) return <AuthLoader />;

  return (
    <form onSubmit={handleSubmit} className="card">
          <PageHeader
            title="Advance Care Plan/Admission"
            className="card-header fs-3"
          />
      <div className="card-body">

          {data?.message && (
            <div className="alert alert-success text-center">
              {data.message}
            </div>
          )}
          {error?.data?.message && (
            <div className="alert alert-danger text-center">
              {error.data.message}
            </div>
          )}
          <div className="row">
            <div className="col-md-12">
              <label htmlFor="admission" className="form-label">
                Does this patient have an advance care plan or a surrogate
                decision-maker AND able to provide legal documentation for the
                home health medical record?
              </label>
              <div>
                <input
                  type="radio"
                  name="admission"
                  id="admissionYes"
                  value="Yes"
                  onChange={handleInputChange}
                  checked={formData.admission === "Yes"}
                />{" "}
                Yes
                <br />
                <input
                  type="radio"
                  name="admission"
                  id="admissionNo"
                  value="No"
                  onChange={handleInputChange}
                  checked={formData.admission === "No"}
                />{" "}
                No
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <label htmlFor="comment" className="form-label d-block my-2">
                Comments
              </label>
              <Template
                selectedTemplate={template}
                setSelectedTemplate={setTemplate}
              />
              <textarea
                className="form-control mt-4"
                name="comment"
                cols={10}
                rows={14}
                onChange={handleInputChange}
                value={formData.comment}
              ></textarea>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="row mt-4">
            <div className="col-md-12 d-flex gap-3">
              <button type="submit" className="btn btn-info">
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleSaveAndExit}
              >
                Save & Exit
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSaveAndContinue}
              >
                Save & Continue
              </button>
            </div>
          </div>
        </div>
    
    </form>
  );
};

export default CreateAdvanceDirectives;
