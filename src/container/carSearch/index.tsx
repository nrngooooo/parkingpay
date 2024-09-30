"use client";
import React, { useState } from "react";
import { Box, Button, TextField, Typography, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import Grid from "@mui/material/Grid";
import ClearIcon from "@mui/icons-material/Clear"; // Import Clear Icon
import CheckIcon from "@mui/icons-material/Check"; // Import Check Icon
import useFormHook from "./useFormHook";

const letters = "АБВГДЕЁЗЖИЙКЛМНОӨПРСТУҮФХЦЧШЩЪЫЬЭЮЯ".split("");
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]; // Define numbers as an array

const CarSearch: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useFormHook();

  const [carLetters, setCarLetters] = useState({ l1: "", l2: "", l3: "" });
  const [carNumbers, setCarNumbers] = useState("");

  const handleLetterChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setCarLetters((prev) => ({ ...prev, [name as string]: value }));
  };

  const handleKeypadClick = (num: string) => {
    setCarNumbers((prev) => (prev + num).slice(0, 4)); // Allow only up to 4 digits
  };

  const handleClear = () => {
    setCarNumbers("");
  };

  const onSubmit = () => {
    const fullCarNumber = `${carLetters.l1}${carLetters.l2}${carLetters.l3}${carNumbers}`;
    console.log("Searching for car number:", fullCarNumber);
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
        height: "80vh", // Adjusted height
        maxHeight: "600px", // Added max height
        bgcolor: "#f5f5f5",
        padding: "20px", // Added padding for better spacing
      }}
    >
      <Typography variant="h4" sx={{ mb: 2, textTransform: "uppercase" }}>
        авто машины дугаараа оруулна уу
      </Typography>

      {/* Dropdown for Letters */}
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}> {/* Reduced gap */}
        <TextField
          value={carNumbers}
          variant="outlined"
          sx={{ mb: 1, width: "200px", textAlign: "center" }}
          slotProps={{
            input: {
              readOnly: true, // Prevent typing in the number field
            }
          }}
        />
        <Select
          value={carLetters.l1}
          onChange={handleLetterChange}
          name="l1"
          displayEmpty
          sx={{ width: 80 }}
        >
          <MenuItem value="">L1</MenuItem>
          {letters.map((letter) => (
            <MenuItem key={letter} value={letter}>
              {letter}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={carLetters.l2}
          onChange={handleLetterChange}
          name="l2"
          displayEmpty
          sx={{ width: 80 }}
        >
          <MenuItem value="">L2</MenuItem>
          {letters.map((letter) => (
            <MenuItem key={letter} value={letter}>
              {letter}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={carLetters.l3}
          onChange={handleLetterChange}
          name="l3"
          displayEmpty
          sx={{ width: 80 }}
        >
          <MenuItem value="">L3</MenuItem>
          {letters.map((letter) => (
            <MenuItem key={letter} value={letter}>
              {letter}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Number Keypad */}
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={1}>
          {numbers.map((num: string) => ( // Explicitly set type for num
            <Grid item xs={4} key={num}>
              <Button
                variant="contained"
                onClick={() => handleKeypadClick(num)}
                sx={{ width: "100%", fontSize: "0.875rem" }} // Smaller font size for buttons
              >
                {num}
              </Button>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleClear}
              sx={{ width: "100%", bgcolor: "red" }} // Red color for "X" icon button
            >
              <ClearIcon /> {/* Clear icon */}
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ width: "300px", bgcolor: "green" }} // Green color for search button
      >
        <CheckIcon /> {/* Check icon */}
      </Button>
    </Box>
  );
};

export default CarSearch;
