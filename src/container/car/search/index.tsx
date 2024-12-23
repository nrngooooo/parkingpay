"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, TextField, Typography, Alert, CircularProgress } from "@mui/material";
import Keypad from "@/components/Keypad";
import { gql, useQuery } from "@apollo/client";
import { useCarSearchForm } from "@/hooks/useCarSearchForm";

const SEARCH_CAR_QUERY = gql`
  query SearchCar($carPlate: String!) {
    searchCarByPlate(carPlate: $carPlate) {
      carPlate
      entryPhoto
    }
  }
`;

const CarSearch: React.FC = () => {
  const {
    register,
    getValues,
    errors,
    carPlate,
    handleKeypadClick,
    handleBackspace,
  } = useCarSearchForm();

  const router = useRouter();
  const [searchError, setSearchError] = useState<string | null>(null);

  const { data, loading, error } = useQuery(SEARCH_CAR_QUERY, {
    variables: { carPlate },
    skip: carPlate.length < 4,
    onCompleted: (data) => {
      if (!data?.searchCarByPlate) {
        setSearchError("Авто машины дугаар олдсонгүй."); // Car number not found
      } else {
        setSearchError(null); // Reset error if car is found
        router.push(`/car/detail/${carPlate}`);
      }
    },
  });

  useEffect(() => {
    if (error) {
      setSearchError("Сүлжээний алдаа гарлаа. Дахин оролдоно уу."); // Network error
    }
  }, [error]);

  const handleSearch = () => {
    if (carPlate.length >= 4) {
      // Trigger the search or re-query when search button is clicked
      setSearchError(null); // Reset error before searching
    } else {
      setSearchError("Авто машины дугаар бүрэн оруулна уу."); // Complete car number is required
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f5f5f5",
        padding: "20px",
      }}
    >
      <Typography variant="h4" sx={{ mb: 2, textTransform: "uppercase" }}>
        Авто машины дугаараа оруулна уу
      </Typography>
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        {getValues("carNumbers")?.map((num, index) => (
          <TextField
            key={index}
            value={num || ""}
            variant="outlined"
            sx={{
              width: 50,
              textAlign: "center",
              bgcolor: "#333",
              input: { color: "#fff" },
            }}
            {...register(`carNumbers.${index}`)}
            slotProps={{
              htmlInput: { maxLength: 1 },
            }}
            error={!!errors.carNumbers?.[index]}
            helperText={errors.carNumbers?.[index]?.message}
          />
        ))}
      </Box>

      {loading && (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Уншиж байна...</Typography> {/* Loading message */}
        </Box>
      )}

      {searchError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {searchError}
        </Alert>
      )}

      <Keypad
        onKeyPress={handleKeypadClick}
        onBackspace={handleBackspace}
        onSearch={handleSearch} // Pass handleSearch to Keypad component
      />
    </Box>
  );
};

export default CarSearch;
