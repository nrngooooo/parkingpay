"use client";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import {
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import Link from "@mui/material/Link";

const CREATE_ENTRY_CAR = gql`
  mutation CreateEntryCarMutation($input: CreateEntryCarInput!) {
    createEntryCar(input: $input) {
      car {
        carPlate
        entryPhoto
      }
      parkingSession {
        id
        entryTime
      }
    }
  }
`;

export default function EntryCar() {
  const [entryPhoto, setEntryPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [result, setResult] = useState<any>(null);

  const [createEntryCar] = useMutation(CREATE_ENTRY_CAR);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setEntryPhoto(file || null);
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) {
          resolve((reader.result as string).split(",")[1]);
        } else {
          reject(new Error("File reading failed"));
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const extractCarPlateFromImage = async (file: File): Promise<string> => {
    const ocrUrl = "https://ocr-extract-text.p.rapidapi.com/ocr";
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(ocrUrl, {
        method: "POST",
        headers: {
          "x-rapidapi-key":
            "b7236ac650msh72870dd3628314bp1a470bjsn0e0f0874ec9d",
          "x-rapidapi-host": "ocr-extract-text.p.rapidapi.com",
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `OCR API returned status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const plateNumber = data.text.match(/\d+/g)?.join("").slice(0, 4);
      return plateNumber || "";
    } catch (error) {
      throw new Error("Failed to extract car plate from the image.");
    }
  };

  const handleSubmit = async () => {
    if (!entryPhoto) {
      setErrorMessage("An entry photo is required.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const detectedPlate = await extractCarPlateFromImage(entryPhoto);
      if (!detectedPlate) {
        throw new Error("Failed to extract car plate from the image.");
      }

      const base64Image = await convertToBase64(entryPhoto);

      const response = await createEntryCar({
        variables: {
          input: {
            carPlate: detectedPlate,
            entryPhoto: base64Image,
          },
        },
      });

      setResult(response.data);
    } catch (err: any) {
      setErrorMessage(
        err.message || "Failed to create entry. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ p: 3, maxWidth: 600, mx: "auto", textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Зогсоол руу орох
        </Typography>
        <Box sx={{ mb: 3 }}>
          <TextField
            type="file"
            onChange={handleFileChange}
            fullWidth
            slotProps={{
              htmlInput: { accept: "image/*" },
            }}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} />}
        >
          {loading ? "Processing..." : "Орох"}
        </Button>
        {errorMessage && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {errorMessage}
          </Alert>
        )}
        {result && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Зогсоол руу орсон машин:</Typography>
            <Typography>
              Машины дугаар: {result.createEntryCar.car.carPlate}
            </Typography>
            <Typography>
              Орсон цаг: {result.createEntryCar.parkingSession.entryTime}
            </Typography>
          </Box>
        )}
      </Box>
      <Link
        href="/car/search"
        color="primary"
        sx={{
          display: "block",
          mt: 3,
          textDecoration: "none",
        }}
      >
        Зогсоолоос машин хайх
      </Link>
    </>
  );
}
