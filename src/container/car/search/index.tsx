"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, TextField, Typography, Grid, Button } from "@mui/material";
import { Clear } from "@mui/icons-material";
import Keyboard from "@/components/Keyboard";
import Keypad from "@/components/Keypad";

const mockCarData: string[] = []; // Mock data storage

const CarSearch: React.FC = () => {
  const [carNumbers, setCarNumbers] = useState<string[]>(["", "", "", ""]);
  const [carLetters, setCarLetters] = useState<string[]>(["", "", ""]);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const router = useRouter();

  const handleKeypadClick = (num: string) => {
    setCarNumbers((prev) => {
      const nextNumbers = [...prev];
      const firstEmptyIndex = nextNumbers.findIndex((n) => n === "");
      if (firstEmptyIndex !== -1) {
        nextNumbers[firstEmptyIndex] = num;
      }

      // Switch to keyboard after 4 numbers are entered
      if (nextNumbers.filter(Boolean).length === 4) {
        setIsKeyboardVisible(true);
      }

      return nextNumbers;
    });
  };

  const handleLetterClick = (letter: string) => {
    setCarLetters((prev) => {
      const nextLetters = [...prev];
      const firstEmptyIndex = nextLetters.findIndex((n) => n === "");
      if (firstEmptyIndex !== -1) {
        nextLetters[firstEmptyIndex] = letter;
      }
      return nextLetters;
    });
  };

  const handleBackspace = () => {
    if (isKeyboardVisible) {
      setCarLetters((prev) => {
        const lastFilledIndex = [...prev].reverse().findIndex((n) => n !== "");
        if (lastFilledIndex !== -1) {
          const realIndex = 2 - lastFilledIndex;
          prev[realIndex] = "";
          return [...prev];
        }
        return prev;
      });
    } else {
      setCarNumbers((prev) => {
        const lastFilledIndex = [...prev].reverse().findIndex((n) => n !== "");
        if (lastFilledIndex !== -1) {
          const realIndex = 3 - lastFilledIndex;
          prev[realIndex] = "";
          return [...prev];
        }
        return prev;
      });
    }
  };

  useEffect(() => {
    const fullCarNumber = carNumbers.join("") + carLetters.join("");
    if (
      carNumbers.every((num) => num !== "") &&
      carLetters.every((letter) => letter !== "")
    ) {
      mockCarData.push(fullCarNumber);
      if (mockCarData.includes(fullCarNumber)) {
        router.push(`/car/detail/${fullCarNumber}`);
      }
    }
  }, [carNumbers, carLetters, router]);

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
        {carNumbers.map((num, index) => (
          <TextField
            key={index}
            value={num}
            variant="outlined"
            sx={{
              width: 50,
              textAlign: "center",
              bgcolor: "#333",
              input: { color: "#fff" },
            }}
          />
        ))}
        {isKeyboardVisible &&
          carLetters.map((letter, index) => (
            <TextField
              key={index + 4}
              value={letter}
              variant="outlined"
              sx={{
                width: 50,
                textAlign: "center",
                bgcolor: "#333",
                input: { color: "#fff" },
              }}
            />
          ))}
      </Box>

      {isKeyboardVisible ? (
        <Keyboard
          onLetterPress={handleLetterClick}
          onBackspace={handleBackspace}
        />
      ) : (
        <Keypad onKeyPress={handleKeypadClick} onBackspace={handleBackspace} />
      )}
    </Box>
  );
};

export default CarSearch;
