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

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Analytics Dashboard
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">Events</h2>
          <p className="text-3xl font-bold">
            {stats.totalEvents}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">Media</h2>
          <p className="text-3xl font-bold">
            {stats.totalMedia}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">Likes</h2>
          <p className="text-3xl font-bold">
            {stats.totalLikes}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">Comments</h2>
          <p className="text-3xl font-bold">
            {stats.totalComments}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
  <h2>🏆 Most Popular Event</h2>

  <p className="font-bold">
    {stats.popularEvent?.title}
  </p>

  <p>
    {stats.popularEvent?.total_likes} Likes
  </p>
</div>
<div className="grid md:grid-cols-2 gap-8 mt-10">

<div className="bg-white p-6 rounded-2xl shadow">
  <h2 className="text-xl font-bold mb-4">
    📈 Likes Per Event
  </h2>

  <ResponsiveContainer width="100%" height={300}>
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

  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={stats.mediaPerEvent}
        dataKey="media_count"
        nameKey="title"
        outerRadius={100}
        label
      />
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
</div>

</div>
      </div>
    </div>
  );
}