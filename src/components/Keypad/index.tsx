import React from "react";
import { Button, Grid } from "@mui/material";
import { ArrowBack, Check } from "@mui/icons-material";

interface KeypadProps {
  onKeyPress: (num: string) => void;
  onBackspace: () => void;
  onSearch: () => void; // Added onSearch prop
}

const Keypad: React.FC<KeypadProps> = ({ onKeyPress, onBackspace, onSearch }) => {
  return (
    <Grid container spacing={1} sx={{ mb: 2, padding: 1 }}>
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
            }}
          >
            {num}
          </Button>
        </Grid>
      ))}
      <Grid item xs={4}>
        <Button
          variant="contained"
          onClick={onBackspace}
          sx={{ width: "100%", bgcolor: "red", color: "#fff" }} // Red button for backspace
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
          }}
        >
          0
        </Button>
      </Grid>
      <Grid item xs={4}> {/* Added search button */}
        <Button
          variant="contained"
          onClick={onSearch}
          sx={{ width: "100%", bgcolor: "blue", color: "#fff" }} // Blue button for search
        >
          <Check/>
        </Button>
      </Grid>
    </Grid>
  );
};

export default Keypad;
