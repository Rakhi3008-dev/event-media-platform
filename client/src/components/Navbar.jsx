import { Link } from "react-router-dom";

export default function Navbar() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

   
    window.location.href = "/login";
  };

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        EventHub
      </Link>

      <div className="flex gap-4 items-center">
        <Link to="/" className="hover:text-blue-600">
          Events
        </Link>

        {role !== "viewer" && (
          <Link to="/create-event" className="hover:text-blue-600">
            Create Event
          </Link>
        )}

        {!token ? (
          <>
            <Link to="/login" className="hover:text-blue-600">
              Login
            </Link>

            <Link
              to="/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Signup
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
