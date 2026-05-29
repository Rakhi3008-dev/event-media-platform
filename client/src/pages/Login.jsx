import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      console.log("EMAIL:", email);
      console.log("PASSWORD:", password);
  
      const res = await API.post("/auth/login", {
        email,
        password,
      });
  
      console.log("RESPONSE:", res.data);
  
      localStorage.setItem("token", res.data.token);
  
      console.log(
        "STORED TOKEN:",
        localStorage.getItem("token")
      );
  
      alert("Login Successful");
      navigate("/");
    } catch (err) {
      console.error(err);
      console.log(err.response?.data);
      alert("Login Failed");
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
                Login to your account
              </p>
            </div>
      
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                Login
              </button>
            </form>
      
            <p className="text-center text-gray-500 mt-6">
              Don't have an account?
            </p>
          </div>
        </div>
  );
}