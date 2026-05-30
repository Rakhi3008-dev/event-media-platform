import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import UploadMedia from "../components/UploadMedia";

export default function EventGallery() {
  const { id } = useParams();

  const [media, setMedia] = useState([]);
  const [comments, setComments] = useState({}); // Manage comments per media item

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

  const likeMedia = async (mediaId) => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        `/interactions/like/${mediaId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Liked ❤️");
    } catch (error) {
      console.error(error);
    }
  };

  const addComment = async (mediaId) => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        `/interactions/comment/${mediaId}`,
        {
          comment: comments[mediaId] || "", // Get the comment for the specific media item
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComments((prev) => ({ ...prev, [mediaId]: "" })); // Clear the comment for the specific media item
      alert("Comment Added 💬");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentChange = (mediaId, value) => {
    setComments((prev) => ({ ...prev, [mediaId]: value })); // Update the comment for the specific media item
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
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <div className="relative group">
                  <img
                    src={`https://event-media-platform.onrender.com${item.media_url}`}
                    alt=""
                    className="
                      w-full
                      h-72
                      object-cover
                      hover:scale-105
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

                <div className="p-4">
                  <button
                    onClick={() => likeMedia(item.id)}
                    className="
                      bg-pink-500
                      hover:bg-pink-600
                      text-white
                      px-3
                      py-2
                      rounded-lg
                    "
                  >
                    ❤️ Like
                  </button>

                  <div className="mt-4">
                    <input
                      type="text"
                      placeholder="Add comment..."
                      value={comments[item.id] || ""} // Bind the comment to the specific media item
                      onChange={(e) =>
                        handleCommentChange(item.id, e.target.value)
                      }
                      className="
                        border
                        p-2
                        rounded-lg
                        w-full
                      "
                    />

                    <button
                      onClick={() => addComment(item.id)}
                      className="
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        px-3
                        py-2
                        rounded-lg
                        mt-2
                      "
                    >
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}