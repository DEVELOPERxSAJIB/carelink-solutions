import  { useState,useEffect,useRef } from 'react';

import { getAllSectionState,updateFormData } from './../../Redux/slices/SectionSlice';
import { useDispatch ,useSelector} from 'react-redux';
import { ReactToPrint } from "react-to-print";
const SectionGForm = () => {
  const componentRef = useRef();
  
const dispatch = useDispatch()
  const data = useSelector(getAllSectionState)
  console.log(data)
  const [formData, setFormData] = useState({
    grooming: '',
    upperBodyDressing: '',
    lowerBodyDressing: '',
    bathing: '',
    toiletTransferring: '',
    toiletingHygiene: '',
    transferring: '',
    ambulationLocomotion: '',
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
      dispatch(updateFormData(formData))
  };
  useEffect(()=>{
    setFormData({...data})
    },[data])
  return (
    <form onSubmit={handleSubmit}>
      <div className="accordion" id="accordionSectionG">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingG">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseG"
              aria-expanded="true"
              aria-controls="collapseG"
            >
              Functional Status
            </button>
          </h2>
          <div
            id="collapseG"
            className="accordion-collapse collapse       "
            aria-labelledby="headingG"
            data-bs-parent="#accordionSectionG"
          >
            <div ref={componentRef} className="accordion-body print-area">
              {/* M1800: Grooming */
              }
              <h4 className="print-title">Functional status</h4>
              <div className="mb-3">
                <label className="form-label">M1800. Grooming</label>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="grooming"
                      value="0"
                      checked={formData.grooming === '0'}
                      onChange={handleInputChange}
                    />
                    Able to groom self unaided
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="grooming"
                      value="1"
                      checked={formData.grooming === '1'}
                      onChange={handleInputChange}
                    />
                    Grooming utensils must be placed within reach
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="grooming"
                      value="2"
                      checked={formData.grooming === '2'}
                      onChange={handleInputChange}
                    />
                    Someone must assist the patient
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="grooming"
                      value="3"
                      checked={formData.grooming === '3'}
                      onChange={handleInputChange}
                    />
                    Patient depends entirely upon someone else
                  </label>
                </div>
              </div>

              {/* M1810: Upper Body Dressing */}
              <div className="mb-3">
                <label className="form-label">
                  M1810. Current Ability to Dress Upper Body
                </label>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="upperBodyDressing"
                      value="0"
                      checked={formData.upperBodyDressing === '0'}
                      onChange={handleInputChange}
                    />
                    Able to dress upper body independently
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="upperBodyDressing"
                      value="1"
                      checked={formData.upperBodyDressing === '1'}
                      onChange={handleInputChange}
                    />
                    Able to dress upper body if clothing is laid out
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="upperBodyDressing"
                      value="2"
                      checked={formData.upperBodyDressing === '2'}
                      onChange={handleInputChange}
                    />
                    Someone must help the patient
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="upperBodyDressing"
                      value="3"
                      checked={formData.upperBodyDressing === '3'}
                      onChange={handleInputChange}
                    />
                    Patient depends entirely upon another person
                  </label>
                </div>
              </div>

              {/* M1820: Lower Body Dressing */}
              <div className="mb-3">
                <label className="form-label">
                  M1820. Current Ability to Dress Lower Body
                </label>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="lowerBodyDressing"
                      value="0"
                      checked={formData.lowerBodyDressing === '0'}
                      onChange={handleInputChange}
                    />
                    Able to dress lower body independently
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="lowerBodyDressing"
                      value="1"
                      checked={formData.lowerBodyDressing === '1'}
                      onChange={handleInputChange}
                    />
                    Able to dress lower body if clothing is laid out
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="lowerBodyDressing"
                      value="2"
                      checked={formData.lowerBodyDressing === '2'}
                      onChange={handleInputChange}
                    />
                    Someone must help the patient
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="lowerBodyDressing"
                      value="3"
                      checked={formData.lowerBodyDressing === '3'}
                      onChange={handleInputChange}
                    />
                    Patient depends entirely upon another person
                  </label>
                </div>
              </div>

              {/* M1830: Bathing */}
              <div className="mb-3">
                <label className="form-label">M1830. Bathing</label>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="bathing"
                      value="0"
                      checked={formData.bathing === '0'}
                      onChange={handleInputChange}
                    />
                    Able to bathe self independently
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="bathing"
                      value="1"
                      checked={formData.bathing === '1'}
                      onChange={handleInputChange}
                    />
                    Able to bathe with the use of devices
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="bathing"
                      value="2"
                      checked={formData.bathing === '2'}
                      onChange={handleInputChange}
                    />
                    Able to bathe with intermittent assistance
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="bathing"
                      value="3"
                      checked={formData.bathing === '3'}
                      onChange={handleInputChange}
                    />
                    Requires presence of another person throughout the bath
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="bathing"
                      value="4"
                      checked={formData.bathing === '4'}
                      onChange={handleInputChange}
                    />
                    Unable to use shower/tub, but can bathe at sink or chair
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="bathing"
                      value="5"
                      checked={formData.bathing === '5'}
                      onChange={handleInputChange}
                    />
                    Unable to use shower/tub, but can bathe in bed or with assistance
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="bathing"
                      value="6"
                      checked={formData.bathing === '6'}
                      onChange={handleInputChange}
                    />
                    Unable to participate in bathing
                  </label>
                </div>
              </div>

              {/* M1840: Toilet Transferring */}
              <div className="mb-3">
                <label className="form-label">M1840. Toilet Transferring</label>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="toiletTransferring"
                      value="0"
                      checked={formData.toiletTransferring === '0'}
                      onChange={handleInputChange}
                    />
                    Able to get to and from the toilet independently
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="toiletTransferring"
                      value="1"
                      checked={formData.toiletTransferring === '1'}
                      onChange={handleInputChange}
                    />
                    Able to get to and from toilet with assistance
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="toiletTransferring"
                      value="2"
                      checked={formData.toiletTransferring === '2'}
                      onChange={handleInputChange}
                    />
                    Unable to get to toilet, but can use bedside commode
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="toiletTransferring"
                      value="3"
                      checked={formData.toiletTransferring === '3'}
                      onChange={handleInputChange}
                    />
                    Unable to get to toilet or commode, but can use bedpan/urinal independently
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="toiletTransferring"
                      value="4"
                      checked={formData.toiletTransferring === '4'}
                      onChange={handleInputChange}
                    />
                    Totally dependent in toileting
                  </label>
                </div>
              </div>

              {/* M1845: Toileting Hygiene */}
              <div className="mb-3">
                <label className="form-label">M1845. Toileting Hygiene</label>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="toiletingHygiene"
                      value="0"
                      checked={formData.toiletingHygiene === '0'}
                      onChange={handleInputChange}
                    />
                    Able to manage toileting hygiene independently
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="toiletingHygiene"
                      value="1"
                      checked={formData.toiletingHygiene === '1'}
                      onChange={handleInputChange}
                    />
                    Able to manage toileting hygiene if supplies are laid out
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="toiletingHygiene"
                      value="2"
                      checked={formData.toiletingHygiene === '2'}
                      onChange={handleInputChange}
                    />
                    Someone must assist with toileting hygiene
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="toiletingHygiene"
                      value="3"
                      checked={formData.toiletingHygiene === '3'}
                      onChange={handleInputChange}
                    />
                    Patient depends entirely on another person
                  </label>
                </div>
              </div>

              {/* M1850: Transferring */}
              <div className="mb-3">
                <label className="form-label">M1850. Transferring</label>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="transferring"
                      value="0"
                      checked={formData.transferring === '0'}
                      onChange={handleInputChange}
                    />
                    Able to independently transfer
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="transferring"
                      value="1"
                      checked={formData.transferring === '1'}
                      onChange={handleInputChange}
                    />
                    Able to transfer with minimal assistance or device
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="transferring"
                      value="2"
                      checked={formData.transferring === '2'}
                      onChange={handleInputChange}
                    />
                    Able to bear weight and pivot during transfer
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="transferring"
                      value="3"
                      checked={formData.transferring === '3'}
                      onChange={handleInputChange}
                    />
                    Unable to transfer or bear weight
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="transferring"
                      value="4"
                      checked={formData.transferring === '4'}
                      onChange={handleInputChange}
                    />
                    Bedfast, able to turn and position self
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="transferring"
                      value="5"
                      checked={formData.transferring === '5'}
                      onChange={handleInputChange}
                    />
                    Bedfast, unable to turn or position self
                  </label>
                </div>
              </div>

              {/* M1860: Ambulation/Locomotion */}
              <div className="mb-3">
                <label className="form-label">M1860. Ambulation/Locomotion</label>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="ambulationLocomotion"
                      value="0"
                      checked={formData.ambulationLocomotion === '0'}
                      onChange={handleInputChange}
                    />
                    Able to walk independently on all surfaces
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="ambulationLocomotion"
                      value="1"
                      checked={formData.ambulationLocomotion === '1'}
                      onChange={handleInputChange}
                    />
                    Able to walk independently with a one-handed device
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="ambulationLocomotion"
                      value="2"
                      checked={formData.ambulationLocomotion === '2'}
                      onChange={handleInputChange}
                    />
                    Requires a two-handed device or supervision
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="ambulationLocomotion"
                      value="3"
                      checked={formData.ambulationLocomotion === '3'}
                      onChange={handleInputChange}
                    />
                    Able to walk only with supervision or assistance
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="ambulationLocomotion"
                      value="4"
                      checked={formData.ambulationLocomotion === '4'}
                      onChange={handleInputChange}
                    />
                    Chairfast, able to wheel self independently
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="ambulationLocomotion"
                      value="5"
                      checked={formData.ambulationLocomotion === '5'}
                      onChange={handleInputChange}
                    />
                    Chairfast, unable to wheel self
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="ambulationLocomotion"
                      value="6"
                      checked={formData.ambulationLocomotion === '6'}
                      onChange={handleInputChange}
                    />
                    Bedfast, unable to ambulate or be up in a chair
                  </label>
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

export default SectionGForm;
