"use client"
import { useState } from 'react';
interface OcrResponse {
  text: string;
}
export default function EntryCar() {
  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Use optional chaining in case no file is selected
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async () => {
    if (!image) return alert('Please upload an image.');

    setLoading(true);
    const url = 'https://ocr-extract-text.p.rapidapi.com/ocr';
    const formData = new FormData();
    formData.append('image', image);
    formData.append('base64', ''); // Add Base64 if required
    const options = {
      method: 'POST',
      headers: {
        'x-rapidapi-key': '25191535b1msh5bed711ecbbbdfep170593jsn0fef28b92f76',
        'x-rapidapi-host': 'ocr-extract-text.p.rapidapi.com'
      },
      body: formData
    };
    
    try {
      const response = await fetch(url, options);
      const data: OcrResponse = await response.json();
      const plateNumber = data.text.match(/\d+/g)
      const combinedNumbers = plateNumber ?.join('');
      const firstFourNumbers = combinedNumbers?.slice(0, 4);
      //mashinii dugaar
      console.log(firstFourNumbers);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <div>
      <h1>OCR Image Upload</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Processing...' : 'Submit'}
      </button>

      {result && (
        <div>
          <h3>OCR Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
