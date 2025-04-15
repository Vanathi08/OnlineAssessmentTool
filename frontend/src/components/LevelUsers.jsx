// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const LevelUsers = () => {
//     const { moduleName, level } = useParams();
//     const navigate = useNavigate();
//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const res = await axios.get("http://localhost:5001/api/user-data");
//                 const filtered = res.data.filter(
//                     (user) =>
//                         user.moduleName === moduleName && user.level === level
//                 );
//                 setUsers(filtered);
//             } catch (err) {
//                 console.error("Error fetching user data:", err);
//             }
//         };

//         fetchData();
//     }, [moduleName, level]);

//     return (
//         <div className="p-10 min-h-screen bg-gray-50">
//             <button
//                 onClick={() => navigate("/admin")}
//                 className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
//             >
//                 ← Back to Dashboard
//             </button>

//             <h1 className="text-3xl font-bold text-indigo-700 mb-6">
//                 {moduleName} – {level} Users
//             </h1>

//             {users.length > 0 ? (
//                 <ul className="list-disc pl-5 space-y-2">
//                     {users.map((user, index) => (
//                         <li key={index}>
//                             <span className="font-medium">{user.username}</span> – Score: {user.score}
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p className="text-gray-600">No users found for this level.</p>
//             )}
//         </div>
//     );
// };

// export default LevelUsers;



// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const LevelUsers = () => {
//     const { moduleName, level } = useParams();
//     const navigate = useNavigate();
//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//         const fetchCompletedUsers = async () => {
//             try {
//                 const res = await axios.get(`http://localhost:5001/api/completed-users`, {
//                     params: { moduleName, level }
//                 });
//                 setUsers(res.data);
//             } catch (err) {
//                 console.error("Error fetching completed users:", err);
//             }
//         };

//         fetchCompletedUsers();
//     }, [moduleName, level]);

//     return (
//         <div className="p-10 min-h-screen bg-gray-50">
//             <button
//                 onClick={() => navigate("/admin")}
//                 className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
//             >
//                 ← Back to Dashboard
//             </button>

//             <h1 className="text-3xl font-bold text-indigo-700 mb-6">
//                 {moduleName} – {level} (Completed Users)
//             </h1>

//             {users.length > 0 ? (
//                 <ul className="list-disc pl-5 space-y-3 text-gray-800">
//                     {users.map((user, index) => (
//                         <li key={index}>
//                             <p><strong>Name:</strong> {user.username}</p>
//                             <p><strong>Score:</strong> {user.score}</p>
//                             <p><strong>Correct:</strong> {user.correctCount}, <strong>Incorrect:</strong> {user.incorrectCount}</p>
//                             <p><strong>Attempts:</strong> {user.attemptCount}</p>
//                             <hr className="my-2 border-gray-300" />
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p className="text-gray-600">No users have completed this level yet.</p>
//             )}
//         </div>
//     );
// };

// export default LevelUsers;


// LevelUsers.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const LevelUsers = () => {
//   const { moduleName, level } = useParams();
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCompletedUsers = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5001/api/completed-users`, {
//           params: { moduleName, level },
//         });
//         setUsers(res.data);
//       } catch (err) {
//         console.error("Error fetching completed users:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCompletedUsers();
//   }, [moduleName, level]);

//   return (
//     <div className="p-8 min-h-screen bg-gray-50">
//       <h2 className="text-3xl font-bold text-center text-indigo-800 mb-6">
//         Completed Users - {moduleName} ({level})
//       </h2>

//       {loading ? (
//         <p className="text-center text-gray-600">Loading...</p>
//       ) : users.length > 0 ? (
//         <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-gray-100 text-left">
//                 <th className="p-2 border-b">Username</th>
//                 <th className="p-2 border-b">Score</th>
//                 <th className="p-2 border-b">Correct</th>
//                 <th className="p-2 border-b">Incorrect</th>
//                 <th className="p-2 border-b">Attempts</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user, idx) => (
//                 <tr key={idx} className="hover:bg-gray-50">
//                   <td className="p-2 border-b">{user.username}</td>
//                   <td className="p-2 border-b">{user.score}</td>
//                   <td className="p-2 border-b">{user.correctCount}</td>
//                   <td className="p-2 border-b">{user.incorrectCount}</td>
//                   <td className="p-2 border-b">{user.attemptCount}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p className="text-center text-gray-500">No users completed this level.</p>
//       )}
//     </div>
//   );
// };

// export default LevelUsers;





import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const LevelUsers = () => {
  const { moduleName, level } = useParams();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("Fetching with:", moduleName, level);
        const res = await axios.get(
          `http://localhost:5001/api/completed-users?moduleName=${moduleName}&level=${level}`
        );
        console.log("Fetched users:", res.data);
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUserData();
  }, [moduleName, level]);

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-indigo-700">
        {moduleName} - {level} Level Users
      </h1>
      <div className="grid grid-cols-1 gap-8">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-blue-700">{user.username}</h2>
              <p>Score: {user.score}</p>
              {/* <p>Correct: {user.correctCount}</p>
              <p>Incorrect: {user.incorrectCount}</p> */}
              <p>Attempts: {user.attemptCount}</p>
            </div>
          ))
        ) : (
          <p>No users found for this level.</p>
        )}
      </div>
    </div>
  );
};

export default LevelUsers;


