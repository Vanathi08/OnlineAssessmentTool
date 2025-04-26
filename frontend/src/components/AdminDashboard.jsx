// import { useEffect, useState } from "react";
// import axios from "axios";

// const AdminDashboard = () => {
//   const [userData, setUserData] = useState([]);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const res = await axios.get("https://onlineassessmenttool.onrender.com/api/user-data");
//         setUserData(res.data);
//       } catch (error) {
//         console.error("Error fetching user data:", error.response?.data || error.message);
//       }
//     };

//     fetchUserData();
//   }, []);


//   return (
//     <div className="min-h-screen p-10 bg-gray-100">
//       <div className="max-w-6xl mx-auto bg-white p-6 shadow rounded">
//         <h1 className="text-3xl font-bold mb-6 text-blue-700">📊 User Test Data</h1>

//         <table className="min-w-full border text-sm text-left">
//           <thead className="bg-blue-100">
//             <tr>
//               <th className="py-2 px-4 border">Username</th>
//               <th className="py-2 px-4 border">Module</th>
//               <th className="py-2 px-4 border">Level</th>
//               <th className="py-2 px-4 border">Score</th>
//               <th className="py-2 px-4 border">Correct</th>
//               <th className="py-2 px-4 border">Incorrect</th>
//               <th className="py-2 px-4 border">Completed</th>
//               <th className="py-2 px-4 border">Attempts</th>
//             </tr>
//           </thead>
//           <tbody>
//             {userData.map((entry, idx) => (
//               <tr key={idx} className="hover:bg-gray-50">
//                 <td className="py-2 px-4 border">{entry.username}</td>
//                 <td className="py-2 px-4 border">{entry.moduleName}</td>
//                 <td className="py-2 px-4 border">{entry.level}</td>
//                 <td className="py-2 px-4 border">{entry.score}</td>
//                 <td className="py-2 px-4 border">{entry.correctCount}</td>
//                 <td className="py-2 px-4 border">{entry.incorrectCount}</td>
//                 <td className="py-2 px-4 border">{entry.completed ? "Yes" : "No"}</td>
//                 <td className="py-2 px-4 border">{entry.attemptCount}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;



// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const levels = ["Basic", "Intermediate", "Advanced"];
// const modules = ["Python", "Java", "JavaScript"];

// const AdminDashboard = () => {
//   const [userData, setUserData] = useState([]);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const res = await axios.get("https://onlineassessmenttool.onrender.com/api/user-data");
//         setUserData(res.data);
//       } catch (err) {
//         console.error("Error fetching user data:", err);
//       }
//     };
//     fetchUserData();
//   }, []);

//   const getFilteredData = (moduleName, level) => {
//     return userData.filter(
//       (user) => user.moduleName === moduleName && user.level === level
//     );
//   };

//   return (
//     <div className="p-10">
//       <h1 className="text-4xl font-bold text-center mb-10 text-indigo-700">
//         Admin Dashboard
//       </h1>
//       <div className="grid grid-cols-1 gap-10">
//         {modules.map((module) => (
//           <div key={module} className="border rounded-xl p-5 shadow-md bg-gray-50">
//             <h2 className="text-2xl font-semibold text-blue-600 mb-4">{module}</h2>
//             <div className="grid md:grid-cols-3 gap-4">
//               {levels.map((level) => {
//                 const filtered = getFilteredData(module, level);
//                 return (
//                   <div key={level} className="bg-white p-4 rounded-lg shadow-md">
//                     <h3 className="text-xl font-bold mb-2 text-green-600">{level}</h3>
//                     {filtered.length > 0 ? (
//                       <ul className="list-disc pl-5 text-sm">
//                         {filtered.map((user, index) => (
//                           <li key={index}>
//                             <strong>{user.username}</strong> – Score: {user.score}
//                           </li>
//                         ))}
//                       </ul>
//                     ) : (
//                       <p className="text-gray-500">No data available</p>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;





// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import LevelUsers from "./LevelUsers"; // Make sure the path is correct

// const levels = ["Basic", "Intermediate", "Advanced"];
// const modules = ["Python", "Java", "JavaScript"];

// const AdminDashboard = () => {
//     const [userData, setUserData] = useState([]);
//     const [activeModule, setActiveModule] = useState(null);
//     const [selectedLevel, setSelectedLevel] = useState(null);
//     const [selectedModule, setSelectedModule] = useState(null);

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const res = await axios.get("https://onlineassessmenttool.onrender.com/api/user-data");
//                 setUserData(res.data);
//             } catch (err) {
//                 console.error("Error fetching user data:", err);
//             }
//         };
//         fetchUserData();
//     }, []);

//     const getFilteredData = (moduleName, level) => {
//         return userData.filter(
//             (user) => user.moduleName === moduleName && user.level === level
//         );
//     };

//     const handleModuleClick = (module) => {
//         setActiveModule(activeModule === module ? null : module);
//         setSelectedLevel(null); // reset selectedLevel when switching modules
//         setSelectedModule(null);
//     };

//     const handleLevelClick = (module, level) => {
//         setSelectedModule(module);
//         setSelectedLevel(level);
//     };

//     return (
//         <div className="p-10">
//             <h1 className="text-4xl font-bold text-center mb-10 text-indigo-700">
//                 Admin Dashboard
//             </h1>
//             <div className="grid grid-cols-1 gap-8">
//                 {modules.map((module) => (
//                     <div
//                         key={module}
//                         className="border rounded-xl p-5 shadow-md bg-gray-100 cursor-pointer"
//                         onClick={() => handleModuleClick(module)}
//                     >
//                         <h2 className="text-2xl font-bold text-blue-700">{module}</h2>

//                         {activeModule === module && (
//                             <div className="grid md:grid-cols-3 gap-4 mt-4">
//                                 {levels.map((level) => {
//                                     const filtered = getFilteredData(module, level);
//                                     return (
//                                         <div
//                                             key={level}
//                                             className="bg-white p-4 rounded-lg shadow cursor-pointer"
//                                             onClick={(e) => {
//                                                 e.stopPropagation(); // Prevent collapsing module
//                                                 handleLevelClick(module, level);
//                                             }}
//                                         >
//                                             <h3 className="text-xl font-semibold text-green-700 mb-2">{level}</h3>
//                                             {filtered.length > 0 ? (
//                                                 <ul className="list-disc pl-5 text-sm">
//                                                     {filtered.map((user, index) => (
//                                                         <li key={index}>
//                                                             {user.username} – Score: {user.score}
//                                                         </li>
//                                                     ))}
//                                                 </ul>
//                                             ) : (
//                                                 <p className="text-gray-500">No users completed this level.</p>
//                                             )}
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         )}
//                     </div>
//                 ))}
//             </div>

//             {/* Conditionally render LevelUsers component */}
//             {selectedLevel && selectedModule && (
//                 <div className="mt-10">
//                     <LevelUsers moduleName={selectedModule} level={selectedLevel} />
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AdminDashboard;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const levels = ["Basic", "Intermediate", "Advanced"];
const modules = ["Python", "Java", "JavaScript"];

const AdminDashboard = () => {
    const [userData, setUserData] = useState([]);
    const [activeModule, setActiveModule] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get("https://onlineassessmenttool.onrender.com/api/user-data");
                setUserData(res.data);
            } catch (err) {
                console.error("Error fetching user data:", err);
            }
        };
        fetchUserData();
    }, []);

    const getFilteredData = (moduleName, level) => {
        return userData.filter(
            (user) => user.moduleName === moduleName && user.level === level
        );
    };

    const handleModuleClick = (module) => {
        setActiveModule(activeModule === module ? null : module);
    };

    const handleLevelClick = (module, level) => {
        navigate(`/${module}/${level}`);
    };

    return (
        <div className="p-10 min-h-screen bg-gray-50">
            <h1 className="text-4xl font-bold text-center mb-10 text-indigo-700">
                Admin Dashboard
            </h1>

            <div className="grid grid-cols-1 gap-8">
                {modules.map((module) => (
                    <div
                        key={module}
                        className="border rounded-xl p-5 shadow-md bg-white cursor-pointer"
                        onClick={() => handleModuleClick(module)}
                    >
                        <h2 className="text-2xl font-bold text-blue-700">{module}</h2>

                        {activeModule === module && (
                            <div className="grid md:grid-cols-3 gap-4 mt-4">
                                {levels.map((level) => {
                                    const filtered = getFilteredData(module, level);
                                    return (
                                        <div
                                            key={level}
                                            className="bg-gray-100 p-4 rounded-lg shadow cursor-pointer hover:bg-gray-200 transition"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent collapsing the module
                                                handleLevelClick(module, level);
                                            }}
                                        >
                                            <h3 className="text-xl font-semibold text-green-700 mb-2">{level}</h3>
                                            {filtered.length > 0 ? (
                                                <ul className="list-disc pl-5 text-sm">
                                                    {filtered.map((user, index) => (
                                                        <li key={index}>
                                                            {user.username} – Score: {user.score}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-gray-500">No users completed this level.</p>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;

