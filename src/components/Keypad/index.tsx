// Keypad.tsx
import React from "react";
import { Button, Grid } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

interface KeypadProps {
  onKeyPress: (num: string) => void;
  onBackspace: () => void;
}

const Keypad: React.FC<KeypadProps> = ({ onKeyPress, onBackspace }) => {
  return (
    <Grid container spacing={1} sx={{ mb: 2, padding: 1 }}>
      {" "}
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <Grid item xs={4} key={num}>
          <Button
            variant="contained"
            onClick={() => onKeyPress(num.toString())}
            sx={{
              width: "100%",
              fontSize: "0.875rem",
              bgcolor: "#666",
              color: "#fff",
            }} // Button color
          >
            {num}
          </Button>
        </Grid>
      ))}
      <Grid item xs={4}>
        <Button
          variant="contained"
          onClick={onBackspace}
          sx={{ width: "100%", bgcolor: "red", color: "#fff" }} // Button color for Backspace
        >
          <ArrowBack />
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button
          variant="contained"
          onClick={() => onKeyPress("0")}
          sx={{
            width: "100%",
            fontSize: "0.875rem",
            bgcolor: "#666",
            color: "#fff",
          }} // Button color
        >
          0
        </Button>
      </Grid>
    </Grid>
  );
};

export default Keypad;
