import React from "react";
import { Button, Grid, Box } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

interface KeyboardProps {
  onLetterPress: (letter: string) => void;
  onBackspace: () => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ onLetterPress, onBackspace }) => {
  const keyRows = [
    ["А", "Б", "В", "Г", "Д", "Е", "Ё", "Ж", "З", "И", "Й", "К"],
    ["Л", "М", "Н", "О", "Ө", "П", "Р", "С", "Т", "У", "Ү", "Ф"],
    ["Х", "Ц", "Ч", "Ш", "Щ", "Ъ", "Ы", "Ь", "Э", "Ю", "Я"],
  ];

  return (
    <Box sx={{ bgcolor: "#444", padding: 1, borderRadius: "8px" }}>
      {keyRows.map((row, rowIndex) => (
        <Grid
          key={rowIndex}
          container
          spacing={1}
          justifyContent="center"
          sx={{ mb: rowIndex < keyRows.length - 1 ? 1 : 0 }}
        >
          {row.map((letter) => (
            <Grid item key={letter} xs="auto">
              <Button
                variant="contained"
                onClick={() => onLetterPress(letter)}
                sx={{
                  width: "45px",
                  minWidth: "45px",
                  fontSize: "0.875rem",
                  bgcolor: "#666",
                  color: "#fff",
                  boxShadow: "none",
                  ":hover": { bgcolor: "#555" },
                }}
              >
                {letter}
              </Button>
            </Grid>
          ))}
        </Grid>
      ))}
      <Grid container spacing={1} justifyContent="center">
        <Grid item>
          <Button
            variant="contained"
            onClick={onBackspace}
            sx={{
              width: "100%",
              minWidth: "80px",
              bgcolor: "red",
              color: "#fff",
              ":hover": { bgcolor: "#cc0000" },
            }}
          >
            <ArrowBack />
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Keyboard;
