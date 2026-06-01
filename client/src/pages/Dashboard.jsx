import { useEffect, useState } from "react";
import API from "../services/api";

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
      </div>
    </div>
  );
}