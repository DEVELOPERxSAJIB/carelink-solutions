import { useRef } from "react";
import SectionAForm from "./SectionA";
import SectionBForm from "./SectionB";
import SectionCForm from "./SectionC";
import SectionDForm from "./SectionD";
import SectionEForm from "./SectionE";
import SectionFForm from "./SectionF";
import SectionGForm from "./SectionG";
import SectionGGForm from "./SectionGG";
import SectionHForm from "./SectionH";
import SectionIForm from "./SectionI";
import SectionJForm from "./SectionJ";
import SectionKForm from "./SectionK";
import SectionMForm from "./SectionM";
import SectionNForm from "./SectionN";
import SectionOForm from "./SectionO";
import SectionQForm from "./SectionQ";
import { ReactToPrint } from "react-to-print";
const PatientProfile = () => {
  const componentRef = useRef();

  return (
    <div className="w-100" ref={componentRef}>
      <SectionAForm />
      <SectionBForm />
      <SectionCForm />
      <SectionDForm />
      <SectionEForm />
      <SectionFForm />
      <SectionGForm />
      <SectionGGForm />
      <SectionHForm />
      <SectionIForm />
      <SectionJForm />
      <SectionKForm />
      <SectionMForm />
      <SectionNForm />
      <SectionOForm />
      <SectionQForm />
      <ReactToPrint
        trigger={() => (
          <button className="btn btn-primary mt-5 hide-on-print">
            Print
          </button>
        )}
        content={() => componentRef.current}
        documentTitle="Patient"
      />
    </div>
  );
};

export default PatientProfile;
