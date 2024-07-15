import { useState } from "react";

const useFormFields = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData(initialState);
  };

  return [formData, handleChange, setFormData, resetForm];
};

export default useFormFields;
