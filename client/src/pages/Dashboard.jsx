import { useEffect, useState } from "react";
import API from "../services/api";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
  } from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const res = await API.get("/dashboard/stats");
    setStats(res.data);
  };

  if (!stats) {
    return (
      <div className="text-center mt-20 text-xl">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl mb-8">
  <h1 className="text-4xl font-bold">
    EventHub Analytics
  </h1>

  <p className="mt-2">
    Monitor events, media activity and engagement.
  </p>
</div>

{/* Stats Cards */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
  <div className="bg-white p-6 rounded-2xl shadow text-center">
    <h2 className="text-gray-500">Events</h2>
    <p className="text-3xl font-bold">{stats.totalEvents}</p>
  </div>

  <div className="bg-white p-6 rounded-2xl shadow text-center">
    <h2 className="text-gray-500">Media</h2>
    <p className="text-3xl font-bold">{stats.totalMedia}</p>
  </div>

  <div className="bg-white p-6 rounded-2xl shadow text-center">
    <h2 className="text-gray-500">Likes</h2>
    <p className="text-3xl font-bold">{stats.totalLikes}</p>
  </div>

  <div className="bg-white p-6 rounded-2xl shadow text-center">
    <h2 className="text-gray-500">Comments</h2>
    <p className="text-3xl font-bold">{stats.totalComments}</p>
  </div>
</div>

{/* Popular Event */}
<div className="bg-white p-6 rounded-2xl shadow mb-8">
  <h2 className="text-xl font-bold mb-2">
    🏆 Most Popular Event
  </h2>

  <p className="text-2xl font-semibold">
    {stats.popularEvent?.title || "No Event"}
  </p>

  <p className="text-gray-500">
    {stats.popularEvent?.total_likes || 0} Likes
  </p>
</div>

{/* Charts */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

  <div className="bg-white p-6 rounded-2xl shadow">
    <h2 className="text-xl font-bold mb-4">
      📈 Likes Per Event
    </h2>

    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={stats.likesPerEvent}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="title" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="likes_count" />
      </BarChart>
    </ResponsiveContainer>
  </div>

  <div className="bg-white p-6 rounded-2xl shadow">
    <h2 className="text-xl font-bold mb-4">
      📸 Media Per Event
    </h2>

    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={stats.mediaPerEvent}
          dataKey="media_count"
          nameKey="title"
          outerRadius={120}
          label
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>

</div>
    </div>
  );
}