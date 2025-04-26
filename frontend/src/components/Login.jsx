// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("https://onlineassessmenttool.onrender.com/api/login", {
//         username,
//         password,
//       });

//       if (res.data.success) {
//         alert("Login successful!");
//         localStorage.setItem("username", res.data.username);
//         navigate("/dashboard");
//       } else {
//         alert("Invalid credentials!");
//       }
//     } catch (error) {
//       console.error("Login error:", error.response?.data || error.message);
//       alert(error.response?.data?.message || "Something went wrong.");
//     }
//   };

//   return (
//     <div className="mx-56 text-center mt-40 justify-items-center">
//       <form onSubmit={handleLogin} className="p-5 rounded-lg bg-gray-100  shadow-2xl h-72">
//         <h2 className="font-bold text-3xl text-blue-800 mb-5">Login</h2>
//         <div className="space-x-4 w-full">
//           <input
//             type="text"
//             placeholder="Username"
//             className="text-indigo-700 p-2 rounded-sm mb-7 outline outline-1 outline-indigo-300 font-semibold"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="text-indigo-700 p-2 rounded-sm mb-7 outline outline-1 outline-indigo-300 font-semibold"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="p-1 mb-5 font-semibold text-xl text-white bg-green-600 rounded w-48">
//           Sign In
//         </button>
//         <p className="">
//           Don't have an account?{" "}
//           <button className="text-indigo-700 font-semibold" type="button" onClick={() => navigate("/signup")}>
//             Sign Up
//           </button>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;




import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://onlineassessmenttool.onrender.com/api/login", {
        username,
        password,
      });

      if (res.data.success) {
        alert("Login successful!");

        // Save username and role in localStorage
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("role", res.data.role);

        // Redirect based on role
        if (res.data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      } else {
        alert("Invalid credentials!");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    //<div className="mx-56 text-center mt-40 justify-items-center">
  <div className="min-h-screen w-full flex justify-center items-center bg-cover bg-center"
  style={{ backgroundColor:"darkslateblue" }}>

      <form
        onSubmit={handleLogin}
        className="p-5 rounded-lg bg-gray-100 shadow-2xl h-72"
      >
        <h2 className="font-bold text-3xl text-blue-800 mb-5">Login</h2>
        <div className="space-x-4 w-full">
          <input
            type="text"
            placeholder="Username"
            className="text-indigo-700 p-2 rounded-sm mb-7 outline outline-1 outline-indigo-300 font-semibold"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="text-indigo-700 p-2 rounded-sm mb-7 outline outline-1 outline-indigo-300 font-semibold"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="p-1 mb-5 font-semibold text-xl text-white bg-green-600 rounded w-48"
        >
          Sign In
        </button>
        <p className="">
          Don't have an account?{" "}
          <button
            className="text-indigo-700 font-semibold"
            type="button"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;

