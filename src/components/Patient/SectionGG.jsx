import { useState, useEffect, useRef } from "react";

import {
  getAllSectionState,
  updateFormData,
} from "./../../Redux/slices/SectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { ReactToPrint } from "react-to-print";
const SectionGGForm = () => {
  const componentRef = useRef();

  const dispatch = useDispatch();
  const data = useSelector(getAllSectionState);
  console.log(data);
  const [formData, setFormData] = useState({
    gg0100: {
      selfCare: "",
      indoorMobility: "",
      stairs: "",
      functionalCognition: "",
    },
    gg0110: {
      manualWheelchair: false,
      motorizedWheelchair: false,
      mechanicalLift: false,
      walker: false,
      orthoticsProsthetics: false,
      noneOfTheAbove: false,
    },
    gg0130: {
      eating: "",
      oralHygiene: "",
      toiletingHygiene: "",
      showerBatheSelf: "",
      upperBodyDressing: "",
      lowerBodyDressing: "",
      puttingOnTakingOffFootwear: "",
    },
    gg0170: {
      rollLeftRight: "",
      sitToLying: "",
      lyingToSitting: "",
      sitToStand: "",
      chairBedToChair: "",
      toiletTransfer: "",
      carTransfer: "",
      walk10Feet: "",
      walk50FeetTwoTurns: "",
      walk150Feet: "",
      walk10FeetUnevenSurfaces: "",
      stepCurb: "",
      fourSteps: "",
      twelveSteps: "",
      pickingUpObject: "",
      usesWheelchairScooter: false,
      wheel50FeetTwoTurns: "",
      wheel150Feet: "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const [section, field] = name.split(".");

    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: type === "checkbox" ? checked : value,
      },
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateFormData(formData));
  };
  useEffect(() => {
    setFormData({ ...data });
  }, [data]);
  return (
    <form onSubmit={handleSubmit}>
      <div className="accordion" id="accordionSectionGG">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingGG">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseGG"
              aria-expanded="true"
              aria-controls="collapseGG"
            >
              Functional Abilities
            </button>
          </h2>
          <div
            id="collapseGG"
            className="accordion-collapse collapse       "
            aria-labelledby="headingGG"
          >
            <div ref={componentRef} className="accordion-body print-area">
              {/* GG0100 */}
              <h4 className="print-title">Functional Abilities</h4>
              <div className="mb-3">
                <h5>GG0100. Prior Functioning: Everyday Activities</h5>
                <div className="row">
                  {[
                    "selfCare",
                    "indoorMobility",
                    "stairs",
                    "functionalCognition",
                  ].map((field) => (
                    <div className="col-md-6 mb-3" key={field}>
                      <label htmlFor={`gg0100.${field}`} className="form-label">
                        {field.replace(/([A-Z])/g, " $1").toUpperCase()}:
                      </label>
                      <select
                        id={`gg0100.${field}`}
                        name={`gg0100.${field}`}
                        className="form-select"
                        value={formData.gg0100[field]}
                        onChange={handleInputChange}
                      >
                        <option value="3">Independent</option>
                        <option value="2">Needed Some Help</option>
                        <option value="1">Dependent</option>
                        <option value="8">Unknown</option>
                        <option value="9">Not Applicable</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* GG0110 */}
              <div className="mb-3">
                <h5>GG0110. Prior Device Use</h5>
                {[
                  "manualWheelchair",
                  "motorizedWheelchair",
                  "mechanicalLift",
                  "walker",
                  "orthoticsProsthetics",
                  "noneOfTheAbove",
                ].map((field) => (
                  <div className="form-check" key={field}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`gg0110.${field}`}
                      name={`gg0110.${field}`}
                      checked={formData.gg0110[field]}
                      onChange={handleInputChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`gg0110.${field}`}
                    >
                      {field.replace(/([A-Z])/g, " $1").toUpperCase()}
                    </label>
                  </div>
                ))}
              </div>

              {/* GG0130 */}
              <div className="mb-3">
                <h5>GG0130. Self-Care</h5>
                <div className="row">
                  {[
                    "eating",
                    "oralHygiene",
                    "toiletingHygiene",
                    "showerBatheSelf",
                    "upperBodyDressing",
                    "lowerBodyDressing",
                    "puttingOnTakingOffFootwear",
                  ].map((field) => (
                    <div className="col-md-6 mb-3" key={field}>
                      <label htmlFor={`gg0130.${field}`} className="form-label">
                        {field.replace(/([A-Z])/g, " $1").toUpperCase()}:
                      </label>
                      <select
                        id={`gg0130.${field}`}
                        name={`gg0130.${field}`}
                        className="form-select"
                        value={formData.gg0130[field]}
                        onChange={handleInputChange}
                      >
                        <option value="06">Independent</option>
                        <option value="05">Setup or Clean-up Assistance</option>
                        <option value="04">
                          Supervision or Touching Assistance
                        </option>
                        <option value="03">Partial/Moderate Assistance</option>
                        <option value="02">
                          Substantial/Maximal Assistance
                        </option>
                        <option value="01">Dependent</option>
                        <option value="07">Patient Refused</option>
                        <option value="09">Not Applicable</option>
                        <option value="10">
                          Not Attempted Due to Environmental Limitations
                        </option>
                        <option value="88">
                          Not Attempted Due to Medical Conditions or Safety
                          Concerns
                        </option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* GG0170 */}
              <div className="mb-3">
                <h5>GG0170. Mobility</h5>
                <div className="row">
                  {[
                    "rollLeftRight",
                    "sitToLying",
                    "lyingToSitting",
                    "sitToStand",
                    "chairBedToChair",
                    "toiletTransfer",
                    "carTransfer",
                    "walk10Feet",
                    "walk50FeetTwoTurns",
                    "walk150Feet",
                    "walk10FeetUnevenSurfaces",
                    "stepCurb",
                    "fourSteps",
                    "twelveSteps",
                    "pickingUpObject",
                    "usesWheelchairScooter",
                    "wheel50FeetTwoTurns",
                    "wheel150Feet",
                  ].map((field) => (
                    <div className="col-md-6 mb-3" key={field}>
                      <label htmlFor={`gg0170.${field}`} className="form-label">
                        {field.replace(/([A-Z])/g, " $1").toUpperCase()}:
                      </label>
                      {field === "usesWheelchairScooter" ? (
                        <>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`gg0170.${field}`}
                            name={`gg0170.${field}`}
                            checked={formData.gg0170[field]}
                            onChange={handleInputChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`gg0170.${field}`}
                          >
                            Uses Wheelchair/Scooter
                          </label>
                        </>
                      ) : (
                        <select
                          id={`gg0170.${field}`}
                          name={`gg0170.${field}`}
                          className="form-select"
                          value={formData.gg0170[field]}
                          onChange={handleInputChange}
                        >
                          <option value="06">Independent</option>
                          <option value="05">
                            Setup or Clean-up Assistance
                          </option>
                          <option value="04">
                            Supervision or Touching Assistance
                          </option>
                          <option value="03">
                            Partial/Moderate Assistance
                          </option>
                          <option value="02">
                            Substantial/Maximal Assistance
                          </option>
                          <option value="01">Dependent</option>
                          <option value="07">Patient Refused</option>
                          <option value="09">Not Applicable</option>
                          <option value="10">
                            Not Attempted Due to Environmental Limitations
                          </option>
                          <option value="88">
                            Not Attempted Due to Medical Conditions or Safety
                            Concerns
                          </option>
                        </select>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="d-flex align-items-center gap-4 hide-on-print">
                <button type="submit" className="btn btn-primary">
                  add
                </button>
                <ReactToPrint
                  trigger={() => (
                    <button className="btn btn-primary">Print</button>
                  )}
                  content={() => componentRef.current}
                  documentTitle="Patient"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SectionGGForm;
