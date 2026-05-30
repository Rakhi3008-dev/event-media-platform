import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEvents();
  }, [search]);

  const fetchEvents = async () => {
    const res = await API.get(
      `/events?search=${search}`
    );

    setEvents(res.data);
  };
return (
    <div>
     <div className="text-center py-10">
  <h1 className="text-5xl font-bold text-gray-800">
    Event Media Platform
  </h1>

  <p className="text-gray-500 mt-3 text-lg">
    Create, manage and share event memories
  </p>
</div>

<div className="max-w-3xl mx-auto px-6 mb-8">
  <input
    type="text"
    placeholder="🔍 Search events..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="
      w-full
      p-4
      border
      rounded-2xl
      shadow-sm
      focus:outline-none
      focus:ring-2
      focus:ring-blue-500
    "
  />
</div>
      
     {/* Event Cards */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
  {events.map((event) => (
    <div
      key={event.id}
      className="
      bg-white
      rounded-2xl
      shadow-md
      p-6
      hover:shadow-2xl
      hover:-translate-y-2
      transition-all
      duration-300
      border
      "
    >
  <img
  src={
    event.cover_image ||
    "https://images.unsplash.com/photo-1511578314322-379afb476865"
  }
  alt={event.title}
  className="w-full h-48 object-cover"
/>
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {event.title}
        </h2>

        <p className="text-gray-600 mt-3">
          {event.description}
        </p>
      </div>

      <div className="flex gap-2 mb-4">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          {event.category}
        </span>

        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
          {event.visibility}
        </span>
      </div>

      <div className="text-sm text-gray-500 mb-4">
        📅 {new Date(event.event_date).toLocaleDateString()}
      </div>

      <Link
        to={`/event/${event.id}`}
        className="
        block
        text-center
        bg-blue-600
        hover:bg-blue-700
        text-white
        py-3
        rounded-xl
        font-semibold
        transition
        "
      >
        Open Gallery →
      </Link>
    </div>
  ))}
</div>
  
            
    </div>
  )};