import { useState } from "react";
import API from "../services/api";

export default function MyPhotos() {
  const [selfie, setSelfie] = useState(null);

  const handleUpload = async () => {
    if (!selfie) return;

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("selfie", selfie);

    try {
      await API.post(
        "/faces/upload-selfie",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Selfie uploaded successfully");
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">
        My Photos
      </h1>

      <input
        type="file"
        onChange={(e) => setSelfie(e.target.files[0])}
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg ml-2"
      >
        Upload Selfie
      </button>

      <div className="mt-8">
        Matching photos will appear here
      </div>
    </div>
  );
}