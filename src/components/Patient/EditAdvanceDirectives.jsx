import { useGetDirectiveByPatientIdQuery } from "../../Redux/api/DirectiveApi";
import { useState, useEffect } from "react";
import { useUpdateDirectiveMutation } from "../../Redux/api/DirectiveApi";
import Template from "./../../components/FormElement/Template";

const EditAdvanceDirectives = ({ patientId }) => {
  const { data: directiveData } = useGetDirectiveByPatientIdQuery(patientId);
  console.log(directiveData);

  const [
    updateDirective,
    { data: updateData, isSuccess: isUpdateSuccess, error: updateError },
  ] = useUpdateDirectiveMutation();

  const [editId, setEditId] = useState(false);

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
    updateDirective({ directiveId: editId, directiveData: formData });
  };

  useEffect(() => {
    if (template?.value) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        comment: (prevFormData.comment || "") + template.value,
      }));
    }
  }, [template]);

  useEffect(() => {
    //console.log(row);
    setEditId(directiveData?.payload?.directive?._id);
    setFormData({ ...directiveData?.payload?.directive });
  }, []);
  useEffect(() => {
    // if (isUpdateSuccess) {
    // }
  }, [isUpdateSuccess]);

  return (
    <div>
      <form onSubmit={handleSubmit} className="card">
        {updateData?.message && (
          <div className="text-center alert-success alert">
            {updateData?.message}
          </div>
        )}
        {updateError?.data?.message && (
          <div className="alert alert-close alert-danger text-center">
            {updateError?.data?.message}
          </div>
        )}
        <div className="card-body">
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
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditAdvanceDirectives;