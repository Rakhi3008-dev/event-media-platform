import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import UploadMedia from "../components/UploadMedia";

export default function EventGallery() {
  const { id } = useParams();

  const [media, setMedia] = useState([]);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    const res = await API.get(`/media/event/${id}`);
    setMedia(res.data);
  };

  const handleDelete = async (mediaId) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/media/${mediaId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchMedia();
    } catch (error) {
      console.error(error);
      alert("Failed to delete media");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="text-center py-10">
        <h1 className="text-5xl font-bold text-blue-600">Event Gallery</h1>

        <p className="text-gray-500 mt-2">Browse and upload event memories</p>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Upload Media</h2>

          <UploadMedia eventId={id} />
        </div>

        {media.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No media uploaded yet
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {media.map((item) => (
              <div key={item.id} className="relative group">
                <img
                  src={`https://event-media-platform.onrender.com${item.media_url}`}
                  alt=""
                  className="
                    w-full
                    h-72
                    object-cover
                    rounded-2xl
                    shadow-md
                    hover:scale-105
                    hover:shadow-xl
                    transition-all
                    duration-300
                  "
                />

                <button
                  onClick={() => handleDelete(item.id)}
                  className="
                    absolute
                    top-3
                    right-3
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    px-3
                    py-2
                    rounded-lg
                    shadow-md
                    opacity-0
                    group-hover:opacity-100
                    transition
                  "
                >
                  🗑 Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
