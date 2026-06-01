import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

export default function UploadMedia({ eventId }) {
  const [file, setFile] = useState(null);
 
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("event_id", eventId);

    try {
      const res = await API.post(
        "/media/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("UPLOAD RESPONSE:", res.data);

      toast.success("Upload Successful");
      window.location.reload(); // refresh gallery
    } catch (error) {
      console.error(error);
      toast.error("Upload Failed");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Upload
      </button>
    </div>
  );
}