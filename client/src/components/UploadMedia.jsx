import { useState } from "react";
import API from "../services/api";

export default function UploadMedia({ eventId }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return;

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("event_id", eventId);

    try {
      await API.post(
        "/media/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Upload Successful");
    } catch (error) {
      console.error(error);
      alert("Upload Failed");
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
}