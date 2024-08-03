
import { getAllSectionState,updateFormData } from './../../Redux/slices/SectionSlice';
import { useDispatch ,useSelector} from 'react-redux';
import { useEffect ,useState} from 'react';

const SectionBForm = () => {
  const dispatch = useDispatch()
  const data = useSelector(getAllSectionState)
  const localSectionB = JSON.parse(localStorage.getItem("SectionB"))
  const [formData, setFormData] = useState({
    hearing: localSectionB?.hearing || '',
    vision: localSectionB?.vision || '',
    healthLiteracy: localSectionB?.healthLiteracy || '',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked, options } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: checked ? value : '',
      }));
    } else if (type === 'radio') {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value,
      }));
    } else if (type === 'select-multiple') {
      const selectedValues = Array.from(options)
        .filter(option => option.selected)
        .map(option => option.value);
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: selectedValues,
      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    localStorage.setItem("SectionB", JSON.stringify(formData));
    dispatch(updateFormData(formData))
  };
  useEffect(()=>{
    setFormData({...data})
    setFormData({...localSectionB})
    },[data])
  return (
    <form className="mt-5" onSubmit={handleSubmit}>
      <div className="accordion" id="sectionBAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingB">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseB"
              aria-expanded="true"
              aria-controls="collapseB"
            >
              Hearing, Speech, and Vision
            </button>
          </h2>
          <div
            id="collapseB"
            className="accordion-collapse collapse  show"  
            aria-labelledby="headingB"
            data-bs-parent="#sectionBAccordion"
          >
            <div  className="accordion-body print-area">
              {/* Hearing */}
              <h4 className="print-title">Hearing, Speech, and Vision</h4>
              <div className="mb-3">
                <label htmlFor="hearing" className="form-label">
                  B0200. Hearing:
                </label>
                <select
                  className="form-select"
                  id="hearing"
                  name="hearing"
                  value={formData.hearing}
                  onChange={handleInputChange}
                >
                  <option value="">Select Hearing Ability</option>
                  <option value="0">Adequate – no difficulty in normal conversation, social interaction, listening to TV</option>
                  <option value="1">Minimal difficulty – difficulty in some environments (e.g., when person speaks softly, or setting is noisy)</option>
                  <option value="2">Moderate difficulty – speaker has to increase volume and speak distinctly</option>
                  <option value="3">Highly impaired – absence of useful hearing</option>
                </select>
              </div>

              {/* Vision */}
              <div className="mb-3">
                <label htmlFor="vision" className="form-label">
                  B1000. Vision:
                </label>
                <select
                  className="form-select"
                  id="vision"
                  name="vision"
                  value={formData.vision}
                  onChange={handleInputChange}
                >
                  <option value="">Select Vision Ability</option>
                  <option value="0">Adequate – sees fine detail, such as regular print in newspapers/books</option>
                  <option value="1">Impaired – sees large print, but not regular print in newspapers/books</option>
                  <option value="2">Moderately impaired – limited vision; not able to see newspaper headlines but can identify objects</option>
                  <option value="3">Highly impaired – object identification in question, but eyes appear to follow objects</option>
                  <option value="4">Severely impaired – no vision or sees only light, colors, or shapes; eyes do not appear to follow objects</option>
                </select>
              </div>

              {/* Health Literacy */}
              <div className="mb-3">
                <label htmlFor="healthLiteracy" className="form-label">
                  B1300. Health Literacy:
                </label>
                <select
                  className="form-select"
                  id="healthLiteracy"
                  name="healthLiteracy"
                  value={formData.healthLiteracy}
                  onChange={handleInputChange}
                >
                  <option value="">Select Health Literacy</option>
                  <option value="0">Never</option>
                  <option value="1">Rarely</option>
                  <option value="2">Sometimes</option>
                  <option value="3">Often</option>
                  <option value="4">Always</option>
                  <option value="7">Patient declines to respond</option>
                  <option value="8">Patient unable to respond</option>
                </select>
              </div>
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

export default SectionBForm;
