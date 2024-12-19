"use client";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const CREATE_ENTRY_CAR = gql`
  mutation CreateEntryCar($input: CreateEntryCarInput!) {
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
  const [carPlate, setCarPlate] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [createEntryCar, { data, loading, error }] =
    useMutation(CREATE_ENTRY_CAR);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImage(file || null);
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) {
          resolve((reader.result as string).split(",")[1]); // Ensure `result` is treated as a string
        } else {
          reject(new Error("File reading failed"));
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async () => {
    if (!carPlate || !image) {
      setErrorMessage("Car plate and image are required.");
      return;
    }

    try {
      const base64Image = await convertToBase64(image);
      await createEntryCar({
        variables: {
          input: {
            carPlate,
            image: base64Image,
          },
        },
      });
      setErrorMessage("");
      alert("Entry successfully recorded.");
    } catch (err) {
      console.error("GraphQL mutation error:", err); // Log error details here
      setErrorMessage("Failed to create entry. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Car Entry</h1>
      <div style={{ marginBottom: "10px" }}>
        <label>Car Plate: </label>
        <input
          type="text"
          value={carPlate}
          onChange={(e) => setCarPlate(e.target.value)}
          placeholder="Enter car plate (e.g., 1234ABC)"
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Upload Entry Photo: </label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Processing..." : "Submit"}
      </button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {error && <p style={{ color: "red" }}>{error.message}</p>}
      {data && (
        <div style={{ marginTop: "20px" }}>
          <h3>Car Entry Recorded:</h3>
          <p>Car Plate: {data.createEntryCar.car.carPlate}</p>
          <p>Entry Time: {data.createEntryCar.parkingSession.entryTime}</p>
        </div>
      )}
    </div>
  );
}
