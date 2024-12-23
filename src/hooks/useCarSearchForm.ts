import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Validation schema
const schema = yup.object().shape({
  carNumbers: yup
    .array()
    .of(
      yup
        .string()
        .required("Each digit is required")
        .matches(/^[0-9]$/, "Only digits are allowed")
    )
    .length(4, "Exactly 4 digits are required"),
});

export const useCarSearchForm = () => {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      carNumbers: ["", "", "", ""],
    },
    resolver: yupResolver(schema),
  });

  const getCarNumbers = () => getValues("carNumbers") ?? ["", "", "", ""];

  const carPlate = getCarNumbers().join("");

  const handleKeypadClick = (num: string) => {
    const carNumbers = getCarNumbers();
    const firstEmptyIndex = carNumbers.findIndex((n) => n === "");
    if (firstEmptyIndex !== -1) {
      carNumbers[firstEmptyIndex] = num;
      setValue("carNumbers", carNumbers);
    }
  };

  const handleBackspace = () => {
    const carNumbers = getCarNumbers();
    const lastFilledIndex = carNumbers.findLastIndex((n) => n !== "");
    if (lastFilledIndex !== -1) {
      carNumbers[lastFilledIndex] = "";
      setValue("carNumbers", carNumbers);
    }
  };

  return {
    register,
    setValue,
    getValues,
    errors,
    carPlate,
    handleKeypadClick,
    handleBackspace,
  };
};
