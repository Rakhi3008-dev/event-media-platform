import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/signup", {
        name,
        email,
        password,
      });

      alert("Signup Successful!");

      console.log(res.data);

      navigate("/login");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Signup Failed"
      );
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600">
            EventHub
          </h1>
  
          <p className="text-gray-500 mt-2">
            Create your account
          </p>
        </div>
  
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="
              w-full
              p-3
              border
              rounded-xl
              mb-4
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />
  
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="
              w-full
              p-3
              border
              rounded-xl
              mb-4
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />
  
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="
              w-full
              p-3
              border
              rounded-xl
              mb-6
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />
  
          <button
            type="submit"
            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              text-white
              py-3
              rounded-xl
              font-semibold
              transition
            "
          >
            Create Account
          </button>
        </form>
  
        <p className="text-center text-gray-500 mt-6">
          Already have an account?
        </p>
      </div>
    </div>
  );
}
          