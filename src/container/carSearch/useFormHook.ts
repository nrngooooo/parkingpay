""
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, UseFormReturn } from "react-hook-form"; // Correct import
import * as yup from "yup";

// Define your form data types
interface ICarSearch {
  carNumber: string;
}

// Yup validation schema
const carSearchSchema = yup.object().shape({
  carNumber: yup
    .string()
    .required("Car number is required")
    .matches(/^[A-Za-z0-9]+$/, "Invalid car number format"),
});

// Custom hook for form handling
const useFormHook = (): UseFormReturn<ICarSearch> => { 
  const form = useForm<ICarSearch>({
    resolver: yupResolver(carSearchSchema),
  });

  return { ...form };
};

export default useFormHook;
