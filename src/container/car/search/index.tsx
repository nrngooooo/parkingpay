"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";
import { Clear, Check } from "@mui/icons-material";
import useFormHook from "./useFormHook";

const mockCarData = ["1234", "5678"];

const CarSearch: React.FC = () => {
  const {
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useFormHook();
  const [carNumbers, setCarNumbers] = useState(["", "", "", ""]);
  const router = useRouter();

  const handleKeypadClick = (num: string) => {
    setCarNumbers((prev) => {
      const nextNumbers = [...prev];
      const firstEmptyIndex = nextNumbers.findIndex((n) => n === "");
      if (firstEmptyIndex !== -1) {
        nextNumbers[firstEmptyIndex] = num;
        clearErrors("carNumber");
      }
      return nextNumbers;
    });
  };

  const handleClear = () => {
    setCarNumbers(["", "", "", ""]);
    clearErrors("carNumber");
  };

  const handleBackspace = () => {
    setCarNumbers((prev) => {
      const lastFilledIndex = [...prev].reverse().findIndex((n) => n !== "");
      if (lastFilledIndex !== -1) {
        const realIndex = 3 - lastFilledIndex;
        prev[realIndex] = "";
        return [...prev];
      }
      return prev;
    });
  };

  const onSubmit = () => {
    const fullCarNumber = carNumbers.join("");

    if (fullCarNumber.length < 4) {
      setError("carNumber", {
        type: "manual",
        message: "Авто машины дугаар дутуу байна",
      });
      return;
    }

    if (mockCarData.includes(fullCarNumber)) {
      router.push(`/car/detail/${fullCarNumber}`);
    } else {
      setError("carNumber", {
        type: "manual",
        message: "Авто машины дугаар олдсонгүй",
      });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)} 
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
        авто машины дугаараа оруулна уу
      </Typography>

      {errors.carNumber && (
        <Typography variant="body1" color="error" sx={{ mb: 2 }}>
          {errors.carNumber.message}
        </Typography>
      )}

      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        {carNumbers.map((num, index) => (
          <TextField
            key={index}
            value={num}
            variant="outlined"
            sx={{ width: 50, textAlign: "center" }}
            slotProps={{
              input: { readOnly: true },
            }}
          />
        ))}
      </Box>

      <Box sx={{ mb: 2 }}>
        <Grid container spacing={1}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num: number) => (
            <Grid item xs={4} key={num}>
              <Button
                variant="contained"
                onClick={() => handleKeypadClick(num.toString())}
                sx={{ width: "100%", fontSize: "0.875rem" }}
              >
                {num}
              </Button>
            </Grid>
          ))}
          <Grid item xs={4}>
            <Button
              variant="contained"
              onClick={handleBackspace}
              sx={{ width: "100%", bgcolor: "red" }}
            >
              <Clear />
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              onClick={() => handleKeypadClick("0")}
              sx={{ width: "100%", fontSize: "0.875rem" }}
            >
              0
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: "100%", bgcolor: "green" }}
            >
              <Check />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CarSearch;
