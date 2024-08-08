import { useState, useEffect, useRef } from "react";

import {
  getAllSectionState,
  updateFormData,
} from "./../../Redux/slices/SectionSlice";
import { useDispatch, useSelector } from "react-redux";

const SectionMForm = () => {


  const dispatch = useDispatch();
  const data = useSelector(getAllSectionState);
  const localSectionM = JSON.parse(localStorage.getItem("SectionM")) || {};

 
  const [formData, setFormData] = useState({
    unhealedPressureUlcer: "",
    oldestStage2PressureUlcer: "",
    numberOfStage2Ulcers: "",
    numberOfStage3Ulcers: "",
    numberOfStage4Ulcers: "",
    numberOfUnstageableDressingUlcers: "",
    numberOfUnstageableSloughUlcers: "",
    numberOfDeepTissueInjuries: "",
    numberOfStage1Injuries: "",
    mostProblematicUlcerStage: "",
    stasisUlcer: "",
    numberOfObservableStasisUlcers: "",
    mostProblematicStasisUlcerStatus: "",
    surgicalWound: "",
    mostProblematicSurgicalWoundStatus: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateFormData(formData));
    localStorage.setItem("SectionM", JSON.stringify(formData));
  };
  useEffect(() => {
    setFormData({ ...data });
  }, [data]);
  return (
    <form onSubmit={handleSubmit}>
      <div className="accordion" id="accordionSectionM">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingM">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseM"
              aria-expanded="true"
              aria-controls="collapseM"
            >
              Skin Conditions
            </button>
          </h2>
          <div
            id="collapseM"
            className="accordion-collapse collapse  show"  
            aria-labelledby="headingM"
            data-bs-parent="#accordionSectionM"
          >
            <div  className="accordion-body print-area">
              {/* M1306 */}
              <h4 className="print-title">Skin Conditions</h4>
              <div className="mb-3">
                <label className="form-label">
                  M1306. Does this patient have at least one Unhealed Pressure
                  Ulcer/Injury at Stage 2 or Higher or designated as
                  Unstageable?
                </label>
                <select
                  name="unhealedPressureUlcer"
                  className="form-select"
                  value={formData.unhealedPressureUlcer}
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              {/* M1307 */}
              <div className="mb-3">
                <label className="form-label">
                  M1307. The Oldest Stage 2 Pressure Ulcer that is present at
                  discharge
                </label>
                <select
                  name="oldestStage2PressureUlcer"
                  className="form-select"
                  value={formData.oldestStage2PressureUlcer}
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="1">
                    Was present at the most recent SOC/ROC assessment
                  </option>
                  <option value="2">
                    Developed since the most recent SOC/ROC assessment
                  </option>
                  <option value="NA">
                    No Stage 2 pressure ulcers are present at discharge
                  </option>
                </select>
              </div>

              {/* M1311 */}
              <div className="mb-3">
                <label className="form-label">
                  M1311. Current Number of Unhealed Pressure Ulcers/Injuries at
                  Each Stage
                </label>

                <div className="mb-3">
                  <label className="form-label">A1. Stage 2</label>
                  <input
                    type="number"
                    name="numberOfStage2Ulcers"
                    className="form-control"
                    value={formData.numberOfStage2Ulcers}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    A2. Number of Stage 2 pressure ulcers present at most recent
                    SOC/ROC
                  </label>
                  <input
                    type="number"
                    name="numberOfStage2UlcersAtSOC"
                    className="form-control"
                    value={formData.numberOfStage2UlcersAtSOC}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">B1. Stage 3</label>
                  <input
                    type="number"
                    name="numberOfStage3Ulcers"
                    className="form-control"
                    value={formData.numberOfStage3Ulcers}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    B2. Number of Stage 3 pressure ulcers present at most recent
                    SOC/ROC
                  </label>
                  <input
                    type="number"
                    name="numberOfStage3UlcersAtSOC"
                    className="form-control"
                    value={formData.numberOfStage3UlcersAtSOC}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">C1. Stage 4</label>
                  <input
                    type="number"
                    name="numberOfStage4Ulcers"
                    className="form-control"
                    value={formData.numberOfStage4Ulcers}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    C2. Number of Stage 4 pressure ulcers present at most recent
                    SOC/ROC
                  </label>
                  <input
                    type="number"
                    name="numberOfStage4UlcersAtSOC"
                    className="form-control"
                    value={formData.numberOfStage4UlcersAtSOC}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    D1. Unstageable: Non-removable dressing/device
                  </label>
                  <input
                    type="number"
                    name="numberOfUnstageableDressingUlcers"
                    className="form-control"
                    value={formData.numberOfUnstageableDressingUlcers}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    D2. Number of unstageable pressure ulcers/injuries due to
                    non-removable dressing/device at most recent SOC/ROC
                  </label>
                  <input
                    type="number"
                    name="numberOfUnstageableDressingUlcersAtSOC"
                    className="form-control"
                    value={formData.numberOfUnstageableDressingUlcersAtSOC}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3 extra-padding">
                  <label className="form-label">
                    E1. Unstageable: Slough and/or eschar
                  </label>
                  <input
                    type="number"
                    name="numberOfUnstageableSloughUlcers"
                    className="form-control"
                    value={formData.numberOfUnstageableSloughUlcers}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    E2. Number of unstageable pressure ulcers/injuries due to
                    coverage of wound bed by slough and/or eschar at most recent
                    SOC/ROC
                  </label>
                  <input
                    type="number"
                    name="numberOfUnstageableSloughUlcersAtSOC"
                    className="form-control"
                    value={formData.numberOfUnstageableSloughUlcersAtSOC}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3 extra-padding">
                  <label className="form-label">
                    F1. Unstageable: Deep tissue injury
                  </label>
                  <input
                    type="number"
                    name="numberOfDeepTissueInjuries"
                    className="form-control"
                    value={formData.numberOfDeepTissueInjuries}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    F2. Number of unstageable pressure injuries presenting as
                    deep tissue injury at most recent SOC/ROC
                  </label>
                  <input
                    type="number"
                    name="numberOfDeepTissueInjuriesAtSOC"
                    className="form-control"
                    value={formData.numberOfDeepTissueInjuriesAtSOC}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* M1322 */}
              <div className="mb-3">
                <label className="form-label">
                  M1322. Current Number of Stage 1 Pressure Injuries
                </label>
                <select
                  name="numberOfStage1Injuries"
                  className="form-select"
                  value={formData.numberOfStage1Injuries}
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="0">Zero</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                  <option value="4">Four or more</option>
                </select>
              </div>

              {/* M1324 */}
              <div className="mb-3">
                <label className="form-label">
                  M1324. Stage of Most Problematic Unhealed Pressure
                  Ulcer/Injury that is Stageable
                </label>
                <select
                  name="mostProblematicUlcerStage"
                  className="form-select"
                  value={formData.mostProblematicUlcerStage}
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="1">Stage 1</option>
                  <option value="2">Stage 2</option>
                  <option value="3">Stage 3</option>
                  <option value="4">Stage 4</option>
                  <option value="NA">
                    Patient has no pressure ulcers/injuries or no stageable
                    pressure ulcers/injuries
                  </option>
                </select>
              </div>

              {/* M1330 */}
              <div className="mb-3">
                <label className="form-label">
                  M1330. Does this patient have a Stasis Ulcer?
                </label>
                <select
                  name="stasisUlcer"
                  className="form-select"
                  value={formData.stasisUlcer}
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="0">No</option>
                  <option value="1">
                    Yes, patient has BOTH observable and unobservable stasis
                    ulcers
                  </option>
                  <option value="2">
                    Yes, patient has observable stasis ulcers ONLY
                  </option>
                  <option value="3">
                    Yes, patient has unobservable stasis ulcers ONLY
                  </option>
                </select>
              </div>

              {/* M1332 */}
              {formData.stasisUlcer !== "0" && formData.stasisUlcer !== "" && (
                <div className="mb-3">
                  <label className="form-label">
                    M1332. Current Number of Stasis Ulcer(s) that are Observable
                  </label>
                  <select
                    name="numberOfObservableStasisUlcers"
                    className="form-select"
                    value={formData.numberOfObservableStasisUlcers}
                    onChange={handleInputChange}
                  >
                    <option value="">Select...</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                    <option value="4">Four or more</option>
                  </select>
                </div>
              )}

              {/* M1334 */}
              {formData.stasisUlcer !== "0" && formData.stasisUlcer !== "" && (
                <div className="mb-3">
                  <label className="form-label">
                    M1334. Status of Most Problematic Stasis Ulcer that is
                    Observable
                  </label>
                  <select
                    name="mostProblematicStasisUlcerStatus"
                    className="form-select"
                    value={formData.mostProblematicStasisUlcerStatus}
                    onChange={handleInputChange}
                  >
                    <option value="">Select...</option>
                    <option value="1">Fully granulating</option>
                    <option value="2">Early/partial granulation</option>
                    <option value="3">Not healing</option>
                  </select>
                </div>
              )}

              {/* M1340 */}
              <div className="mb-3">
                <label className="form-label">
                  M1340. Does this patient have a Surgical Wound?
                </label>
                <select
                  name="surgicalWound"
                  className="form-select"
                  value={formData.surgicalWound}
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="0">No</option>
                  <option value="1">
                    Yes, patient has at least one observable surgical wound
                  </option>
                  <option value="2">
                    Surgical wound known but not observable due to non-removable
                    dressing/device
                  </option>
                </select>
              </div>

              {/* M1342 */}
              {formData.surgicalWound !== "0" &&
                formData.surgicalWound !== "" && (
                  <div className="mb-3">
                    <label className="form-label">
                      M1342. Status of Most Problematic Surgical Wound that is
                      Observable
                    </label>
                    <select
                      name="mostProblematicSurgicalWoundStatus"
                      className="form-select"
                      value={formData.mostProblematicSurgicalWoundStatus}
                      onChange={handleInputChange}
                    >
                      <option value="">Select...</option>
                      <option value="0">Newly epithelialized</option>
                      <option value="1">Fully granulating</option>
                      <option value="2">Early/partial granulation</option>
                      <option value="3">Not healing</option>
                    </select>
                  </div>
                )}
              <div className="d-flex align-items-center gap-4 hide-on-print">
                <button type="submit" className="btn btn-primary">
                  add
                </button>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SectionMForm;
