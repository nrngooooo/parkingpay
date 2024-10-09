"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Correct navigation import
import { Box, Button, TextField, Typography, Grid } from "@mui/material";
import { Clear, Check } from "@mui/icons-material";
import useFormHook from "./useFormHook"; // Your custom hook

const CarSearch: React.FC = () => {
  const {
    handleSubmit,
    formState: { errors },
    setError,
  } = useFormHook();
  const [carNumbers, setCarNumbers] = useState(["", "", "", ""]); // 4 TextField boxes for numbers
  const router = useRouter(); // Next.js router for navigation

  const handleKeypadClick = (num: string) => {
    setCarNumbers((prev) => {
      const nextNumbers = [...prev];
      const firstEmptyIndex = nextNumbers.findIndex((n) => n === "");
      if (firstEmptyIndex !== -1) {
        nextNumbers[firstEmptyIndex] = num;
      }
      return nextNumbers;
    });
  };

  const handleClear = () => {
    setCarNumbers(["", "", "", ""]);
  };

  // Handle the "x" button to remove the last entered digit
  const handleBackspace = () => {
    setCarNumbers((prev) => {
      const lastFilledIndex = [...prev].reverse().findIndex((n) => n !== "");
      if (lastFilledIndex !== -1) {
        const realIndex = 3 - lastFilledIndex; // Get the correct index
        prev[realIndex] = ""; // Clear the last filled number
        return [...prev];
      }
      return prev;
    });
  };

  const onSubmit = (data: any) => {
    const fullCarNumber = carNumbers.join("");
    console.log("Searching for car number:", fullCarNumber);

    if (fullCarNumber.length < 4) {
      // Adjusted for number only
      setError("carNumber", {
        type: "manual",
        message: "Авто машины дугаар дутуу байна", // Custom message for incomplete input
      });
      return;
    }

    // Simulate search logic and handle error
    if (fullCarNumber !== "VALIDNUM") {
      setError("carNumber", {
        type: "manual",
        message: "Авто машины дугаар олдсонгүй", // Display error when not found
      });
    } else {
      // Navigate to the car detail page on successful search
      router.push(`/car/detail/${fullCarNumber}`); // Corrected navigation
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

      {/* Display validation or search error message */}
      {errors.carNumber && (
        <Typography variant="body1" color="error" sx={{ mb: 2 }}>
          {errors.carNumber.message}
        </Typography>
      )}

      {/* Car Number Input - Separate TextFields for each digit */}
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        {carNumbers.map((num, index) => (
          <TextField
            key={index}
            value={num}
            variant="outlined"
            sx={{ width: 50, textAlign: "center" }}
            inputProps={{ readOnly: true }}
          />
        ))}
      </Box>

      {/* Switch Keyboard and Keypad - Keypad is now on top */}
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={1}>
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num: string) => (
            <Grid item xs={4} key={num}>
              <Button
                variant="contained"
                onClick={() => handleKeypadClick(num)}
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
              sx={{ width: "100%", bgcolor: "orange" }}
            >
              <Clear /> {/* Backspace Functionality */}
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
