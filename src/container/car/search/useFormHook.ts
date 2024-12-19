// useFormHook.ts
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Define the validation schema
const schema = yup.object({
  carNumber: yup
    .array()
    .of(yup.string().length(1, "Each digit must be 1 character").required("Each field is required"))
    .length(4, "Авто машины дугаар 4 оронтой байх ёстой") // Ensure car number is 4 digits
    .required("Авто машины дугаар оруулна уу"),
});

const useFormHook = () => {
  // Initialize useForm with the yup resolver
  return useForm({
    resolver: yupResolver(schema), // Integrate the schema
  });
};

export default useFormHook;
