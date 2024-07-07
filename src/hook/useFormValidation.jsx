import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const useFormValidation = (initialValues, validationSchema, onSubmit) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  });

  const submitForm = handleSubmit((data) => {
    onSubmit(data);
  });

  return {
    register,
    handleSubmit: submitForm,
    formState: { errors },
    reset,
  };
};

export default useFormValidation;
