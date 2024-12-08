"use client";
import React, { useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const VEHICLE_ENTRY_MUTATION = gql`
  mutation VehicleEntry($photo: String!) {
    vehicleEntry(photo: $photo) {
      car {
        carPlate
      }
      parkingSession {
        entryTime
      }
    }
  }
`;

const VehicleCapture: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [registrationNumber, setRegistrationNumber] = useState<string>("");
  const [captureTime, setCaptureTime] = useState<string>("");

  const [vehicleEntry] = useMutation(VEHICLE_ENTRY_MUTATION);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setImageUrl(reader.result as string);

        try {
          const { data } = await vehicleEntry({
            variables: {
              photo: reader.result, // Pass the base64-encoded image
            },
          });

          setRegistrationNumber(data.vehicleEntry.car.carPlate);
          setCaptureTime(new Date(data.vehicleEntry.parkingSession.entryTime).toLocaleString());
        } catch (err) {
          console.error("Error during mutation:", err);
        }
      };
      reader.readAsDataURL(file); // Read file as base64
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Тээврийн хэрэгслийн зураг оруулах</h1>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ marginBottom: "20px" }}
      />
      {imageUrl && (
        <div>
          <h2>Авто машины зураг:</h2>
          <img
            src={imageUrl}
            alt="Uploaded Vehicle"
            style={{ width: "100%", maxWidth: "600px" }}
          />
          <h3>Улсын дугаар: {registrationNumber}</h3>
          <h4>Орсон цаг: {captureTime}</h4>
        </div>
      )}
    </div>
  );
};

export default VehicleCapture;
