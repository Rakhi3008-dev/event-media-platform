import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import UploadMedia from "../components/UploadMedia";

export default function EventGallery() {

    const { id } = useParams();
    console.log("Event ID:", id);

  const [media, setMedia] = useState([]);
  const [comments, setComments] = useState({}); // Manage comments per media item
  const [likes, setLikes] = useState({});
  const [allComments, setAllComments] = useState({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [userSearch, setUserSearch] =
  useState("");

const [dateSearch, setDateSearch] =
  useState("");

  const fetchMedia = async () => {
    setLoading(true);
    const res = await API.get(
        `/media/${id}?search=${search}&user=${userSearch}&date=${dateSearch}`
      );
    setMedia(res.data);

setLoading(false);
  };

  useEffect(() => {
    fetchMedia();
  }, [
    search,
    userSearch,
    dateSearch
  ]);
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

  const fetchInteractions = async () => {
    const likesObj = {};
    const commentsObj = {};

    for (const item of media) {
      const likesRes = await API.get(`/interactions/likes/${item.id}`);

      likesObj[item.id] = likesRes.data.count;

      const commentsRes = await API.get(`/interactions/comment/${item.id}`);

      commentsObj[item.id] = commentsRes.data;
    }

    setLikes(likesObj);
    setAllComments(commentsObj);
  };
  useEffect(() => {
    if (media.length > 0) {
      fetchInteractions();
    }
  }, [media]);

  // Render loading state
  if (loading) {
    return (
      <div className="text-center py-10">
        <p>Loading media...</p>
      </div>
    );
  }

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
        <input
          type="text"
          placeholder="Search tags..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
      w-full
      border
      p-3
      rounded-lg
      mb-6
    "
        />
     <input
  type="text"
  placeholder="Search User"
  value={userSearch}
  onChange={(e) => setUserSearch(e.target.value)}
  className="border p-3 rounded-lg mb-3"
/>

<input
  type="date"
  value={dateSearch}
  onChange={(e) => setDateSearch(e.target.value)}
  className="border p-3 rounded-lg mb-3"
/>
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
                    src={item.media_url}
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
                  <div className="flex flex-wrap gap-2 mb-3">
                    {(item.tags || []).map((tag) => (
                      <span
                        key={tag}
                        className="
          bg-blue-100
          text-blue-700
          px-2
          py-1
          rounded-full
          text-xs
        "
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

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
                    ❤️ {likes[item.id] || 0} Likes
                  </button>
                  <button
  onClick={() =>
    window.open(
      `https://event-media-platform.onrender.com/api/media/download/${item.id}`
    )
  }
  className="
    bg-green-600
    hover:bg-green-700
    text-white
    px-3
    py-2
    rounded-lg
    ml-2
  "
>
  ⬇ Download
</button>
<div className="flex flex-wrap gap-2 mt-2">
  {item.tags?.map((tag) => (
    <span
      key={tag}
      className="
        bg-blue-100
        text-blue-700
        px-2
        py-1
        rounded-full
        text-xs
      "
    >
      #{tag}
    </span>
  ))}
</div>
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
                    <div className="mt-4">
                      {(allComments[item.id] || []).map((c) => (
                        <div key={c.id} className="border-b py-2">
                          <p className="font-semibold">{c.name}</p>

                          <p className="text-gray-600">{c.comment_text}</p>
                        </div>
                      ))}
                    </div>
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
