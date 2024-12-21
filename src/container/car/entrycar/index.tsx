"use client";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

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
      console.log("Sending OCR request to:", ocrUrl);
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
        console.error(`OCR API response: ${response.status} ${errorText}`);
        throw new Error(
          `OCR API returned status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      console.log("OCR API response data:", data);

      const plateNumber = data.text.match(/\d+/g)?.join("").slice(0, 4);
      return plateNumber || "";
    } catch (error) {
      console.error("Error in OCR API:", error);
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
      alert("Entry successfully recorded.");
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        err.message || "Failed to create entry. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Car Entry</h1>
      <div style={{ marginBottom: "10px" }}>
        <label>Upload Entry Photo: </label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Processing..." : "Submit"}
      </button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Car Entry Recorded:</h3>
          <p>Car Plate: {result.createEntryCar.car.carPlate}</p>
          <p>Entry Time: {result.createEntryCar.parkingSession.entryTime}</p>
        </div>
      )}
    </div>
  );
}
