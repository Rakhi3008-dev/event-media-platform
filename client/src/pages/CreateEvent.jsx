import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function CreateEvent() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    event_date: "",
    visibility: "public",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      console.log("TOKEN:", token);
      await API.post("/events", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Event Created!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Failed to create event");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg">
      <h1 className="text-2xl font-bold mb-4">
        Create Event
      </h1>

      <form onSubmit={handleSubmit}>
        <input
          className="w-full border p-2 mb-3"
          name="title"
          placeholder="Title"
          onChange={handleChange}
        />

        <textarea
          className="w-full border p-2 mb-3"
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />

        <input
          className="w-full border p-2 mb-3"
          name="category"
          placeholder="Category"
          onChange={handleChange}
        />

        <input
          className="w-full border p-2 mb-3"
          type="date"
          name="event_date"
          onChange={handleChange}
        />

        <select
          className="w-full border p-2 mb-3"
          name="visibility"
          onChange={handleChange}
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          type="submit"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}