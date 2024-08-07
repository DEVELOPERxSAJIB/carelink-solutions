import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSectionState, updateFormData } from './../../Redux/slices/SectionSlice';

const SectionKForm = () => {
  const dispatch = useDispatch();
  const data = useSelector(getAllSectionState);
  const localSectionK = JSON.parse(localStorage.getItem("SectionK")) || {};

  const [formData, setFormData] = useState({
    height: localSectionK?.height ?? '',
    weight: localSectionK?.weight ?? '',
    nutritionalApproachesOnAdmission: {
      parenteralIVFeeding: localSectionK?.nutritionalApproachesOnAdmission?.parenteralIVFeeding ?? false,
      feedingTube: localSectionK?.nutritionalApproachesOnAdmission?.feedingTube ?? false,
      mechanicallyAlteredDiet: localSectionK?.nutritionalApproachesOnAdmission?.mechanicallyAlteredDiet ?? false,
      therapeuticDiet: localSectionK?.nutritionalApproachesOnAdmission?.therapeuticDiet ?? false,
      none: localSectionK?.nutritionalApproachesOnAdmission?.none ?? false,
    },
    nutritionalApproachesLast7Days: {
      parenteralIVFeeding: localSectionK?.nutritionalApproachesLast7Days?.parenteralIVFeeding ?? false,
      feedingTube: localSectionK?.nutritionalApproachesLast7Days?.feedingTube ?? false,
      mechanicallyAlteredDiet: localSectionK?.nutritionalApproachesLast7Days?.mechanicallyAlteredDiet ?? false,
      therapeuticDiet: localSectionK?.nutritionalApproachesLast7Days?.therapeuticDiet ?? false,
      none: localSectionK?.nutritionalApproachesLast7Days?.none ?? false,
    },
    nutritionalApproachesAtDischarge: {
      parenteralIVFeeding: localSectionK?.nutritionalApproachesAtDischarge?.parenteralIVFeeding ?? false,
      feedingTube: localSectionK?.nutritionalApproachesAtDischarge?.feedingTube ?? false,
      mechanicallyAlteredDiet: localSectionK?.nutritionalApproachesAtDischarge?.mechanicallyAlteredDiet ?? false,
      therapeuticDiet: localSectionK?.nutritionalApproachesAtDischarge?.therapeuticDiet ?? false,
      none: localSectionK?.nutritionalApproachesAtDischarge?.none ?? false,
    },
    feedingOrEating: localSectionK?.feedingOrEating ?? '',
  });

  useEffect(() => {
    if (data) {
      setFormData((prevData) => ({
        ...prevData,
        ...data
      }));
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, type, value, checked } = e.target;

    if (type === 'checkbox') {
      const [section, approach] = name.split('-');
      setFormData((prevData) => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [approach]: checked,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateFormData({...formData}));
    localStorage.setItem("SectionK", JSON.stringify(formData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="accordion" id="accordionSectionK">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingK">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseK"
              aria-expanded="true"
              aria-controls="collapseK"
            >
              Swallowing/Nutritional Status
            </button>
          </h2>
          <div
            id="collapseK"
            className="accordion-collapse collapse"
            aria-labelledby="headingK"
            data-bs-parent="#accordionSectionK"
          >
            <div className="accordion-body print-area">
              {/* Height and Weight */}
              <h4 className="print-title">Swallowing/Nutritional Status</h4>
              <div className="mb-3">
                <label htmlFor="height" className="form-label">M1060. Height (in inches)</label>
                <input
                  id="height"
                  name="height"
                  type="number"
                  className="form-control"
                  value={formData?.height}
                  onChange={handleInputChange}
                  step="0.1"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="weight" className="form-label">M1060. Weight (in pounds)</label>
                <input
                  id="weight"
                  name="weight"
                  type="number"
                  className="form-control"
                  value={formData?.weight}
                  onChange={handleInputChange}
                  step="0.1"
                />
              </div>

              {/* Nutritional Approaches */}
              <div className="mb-3">
                <label className="form-label">K0520. Nutritional Approaches</label>

                <div className="mb-3">
                  <label className="form-label">On Admission</label>
                  {[
                    { label: 'Parenteral/IV feeding', value: 'parenteralIVFeeding' },
                    { label: 'Feeding tube (e.g., nasogastric or abdominal (PEG))', value: 'feedingTube' },
                    { label: 'Mechanically altered diet (e.g., pureed food, thickened liquids)', value: 'mechanicallyAlteredDiet' },
                    { label: 'Therapeutic diet (e.g., low salt, diabetic, low cholesterol)', value: 'therapeuticDiet' },
                    { label: 'None of the above', value: 'none' },
                  ].map(({ label, value }) => (
                    <div key={value} className="form-check">
                      <input
                        id={`onAdmission-${value}`}
                        name={`nutritionalApproachesOnAdmission-${value}`}
                        type="checkbox"
                        checked={formData?.nutritionalApproachesOnAdmission[value] || false}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label htmlFor={`onAdmission-${value}`} className="form-check-label">{label}</label>
                    </div>
                  ))}
                </div>

                <div className="mb-3">
                  <label className="form-label">Last 7 Days</label>
                  {[
                    { label: 'Parenteral/IV feeding', value: 'parenteralIVFeeding' },
                    { label: 'Feeding tube (e.g., nasogastric or abdominal (PEG))', value: 'feedingTube' },
                    { label: 'Mechanically altered diet (e.g., pureed food, thickened liquids)', value: 'mechanicallyAlteredDiet' },
                    { label: 'Therapeutic diet (e.g., low salt, diabetic, low cholesterol)', value: 'therapeuticDiet' },
                    { label: 'None of the above', value: 'none' },
                  ].map(({ label, value }) => (
                    <div key={value} className="form-check">
                      <input
                        id={`last7Days-${value}`}
                        name={`nutritionalApproachesLast7Days-${value}`}
                        type="checkbox"
                        checked={formData?.nutritionalApproachesLast7Days[value] || false}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label htmlFor={`last7Days-${value}`} className="form-check-label">{label}</label>
                    </div>
                  ))}
                </div>

                <div className="mb-3">
                  <label className="form-label">At Discharge</label>
                  {[
                    { label: 'Parenteral/IV feeding', value: 'parenteralIVFeeding' },
                    { label: 'Feeding tube (e.g., nasogastric or abdominal (PEG))', value: 'feedingTube' },
                    { label: 'Mechanically altered diet (e.g., pureed food, thickened liquids)', value: 'mechanicallyAlteredDiet' },
                    { label: 'Therapeutic diet (e.g., low salt, diabetic, low cholesterol)', value: 'therapeuticDiet' },
                    { label: 'None of the above', value: 'none' },
                  ].map(({ label, value }) => (
                    <div key={value} className="form-check">
                      <input
                        id={`atDischarge-${value}`}
                        name={`nutritionalApproachesAtDischarge-${value}`}
                        type="checkbox"
                        checked={formData?.nutritionalApproachesAtDischarge[value] || false}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label htmlFor={`atDischarge-${value}`} className="form-check-label">{label}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* M1870. Feeding or Eating */}
              <div className="mb-3 extra-padding">
                <label htmlFor="feedingOrEating" className="form-label">M1870. Feeding or Eating</label>
                <select
                  id="feedingOrEating"
                  name="feedingOrEating"
                  className="form-select"
                  value={formData?.feedingOrEating}
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="0">Able to independently feed self</option>
                  <option value="1">Able to feed self independently but requires: a. meal set-up; OR b. intermittent assistance or supervision from another person; OR c. a liquid, pureed, or ground meat diet.</option>
                  <option value="2">Unable to feed self and must be assisted or supervised throughout the meal/snack.</option>
                  <option value="3">Able to take in nutrients orally and receives supplemental nutrients through a nasogastric tube or gastrostomy.</option>
                  <option value="4">Unable to take in nutrients orally and is fed nutrients through a nasogastric tube or gastrostomy.</option>
                  <option value="5">Unable to take in nutrients orally or by tube feeding.</option>
                </select>
              </div>
              <div className="d-flex align-items-center gap-4 hide-on-print">
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SectionKForm;
