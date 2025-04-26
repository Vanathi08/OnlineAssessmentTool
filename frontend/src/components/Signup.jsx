import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://onlineassessmenttool.onrender.com/api/signup", {
        username,
        password,
      });
      if (res.data.success) {
        alert("Signup successful!");
        navigate("/");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="mx-56 text-center mt-40 justify-items-center">
      <form onSubmit={handleSignup} className="p-5 rounded-lg bg-gray-200  shadow-2xl h-64">
        <h2 className="font-bold text-3xl text-blue-800 mb-5">Signup</h2>
        <div className="space-x-4 w-full">
        <input
          type="text"
          placeholder="Username"
          className="text-indigo-700 p-2 rounded-sm mb-7 outline outline-2 outline-indigo-600 font-semibold"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="text-indigo-700 p-2 rounded-sm mb-7 outline outline-2 outline-indigo-600 font-semibold"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        </div>
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
