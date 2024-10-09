import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, UseFormReturn } from "react-hook-form";
import * as yup from "yup";

interface ICarSearch {
  carNumber: string;
}

// Yup validation schema
const carSearchSchema = yup.object().shape({
  carNumber: yup
    .string()
    .required("Car number is required")
    .matches(/^[А-Я0-9]+$/, "Invalid car number format"),
});

// Custom hook for form handling
const useFormHook = (): UseFormReturn<ICarSearch> => {
  const form = useForm<ICarSearch>({
    resolver: yupResolver(carSearchSchema),
    mode: "onSubmit",
  });

  return { ...form };
};

export default useFormHook;
