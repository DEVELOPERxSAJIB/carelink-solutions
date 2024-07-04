import { useState } from "react";

const useFormFields = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const resetForm = () => {
    setFormData(initialState);
  };

  return [formData, handleChange, resetForm];
};

export default useFormFields;
