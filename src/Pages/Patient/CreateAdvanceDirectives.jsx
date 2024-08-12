import { useState, useEffect, useRef } from "react";
import {
  useCreateDirectiveMutation,
  useCreateTestDirectiveMutation,
} from "../../Redux/api/DirectiveApi";
import PageHeader from "./../../components/FormElement/PageHeader";
import AuthLoader from "./../../utils/Loaders/AuthLoader";
import Template from "./../../components/FormElement/Template";

import {
  getAllSectionStepState,
  updateSteps,
} from "./../../Redux/slices/SectionStep.js";
import { useSelector, useDispatch } from "react-redux";
import { showToast } from "./../../utils/Toastify";
import AdmitButton from "./../../components/Patient/AdmitButton";
const CreateAdvanceDirectives = () => {
  const componentRef = useRef();
  const localData = JSON.parse(localStorage.getItem("Directive"));
  const [createDirective, { data, isLoading, error, isSuccess }] =
    useCreateDirectiveMutation();
  const [createTestDirective, { data: testData, error: testError }] =
    useCreateTestDirectiveMutation();

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
    const patientId = JSON.parse(localStorage.getItem("patient"));
    if (patientId?._id) {
      formData.patientId = allSteps.patientId || patientId?._id;
      createDirective(formData);
      localStorage.removeItem("Directive");
    } else {
      showToast("error", "Patient id required");
    }
  };

  const handleSaveAndContinue = (e) => {
    e.preventDefault();

    createTestDirective(formData);
  };

  const handleSaveAndExit = (e) => {
    e.preventDefault();

    createTestDirective(formData);
  };

  useEffect(() => {
    if (template?.value) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        comment: (prevFormData.comment || "") + template.value,
      }));
    }
  }, [template]);
  const allSteps = useSelector(getAllSectionStepState);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess) {
      dispatch(updateSteps({ ...allSteps, steps: allSteps?.steps + 1 }));
    }
    if (testData) {
      dispatch(updateSteps({ ...allSteps, steps: allSteps?.steps + 1 }));
      showToast("success", "Saved,please continue");
      localStorage.setItem("Directive", JSON.stringify(testData?.payload));
    }
    if (testError) {
      dispatch(updateSteps({ ...allSteps, steps: allSteps?.steps + 1 }));
      showToast("error", testError?.data?.error);
    }
  }, [isSuccess, testData, testError]);
  useEffect(() => {
    showToast("error", error?.data?.message);
    showToast("success", data?.message);
  }, [error?.data?.message, data?.message]);
  useEffect(() => {
    if (localData) {
      setFormData({ ...localData });
    }
  }, []);
  if (isLoading) return <AuthLoader />;

  return (
    <form ref={componentRef} onSubmit={handleSubmit} className="card w-100">
      <PageHeader
        title="Advance Care Plan/Admission"
        className="card-header fs-3"
        back={false}
      />
      <div className="card-body w-100">
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
        <div className="row mt-4 hide-on-print">
          <div className="d-flex justify-content-end mt-3 hide-on-print gap-3">
            <AdmitButton />
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSaveAndContinue}
            >
              Save & Continue
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleSaveAndExit}
            >
              Save & Exit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateAdvanceDirectives;
