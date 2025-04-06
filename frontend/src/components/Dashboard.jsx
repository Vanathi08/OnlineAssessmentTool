import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [completionStatus, setCompletionStatus] = useState({});
  const navigate = useNavigate();

  const topics = [
    { title: "Python", color: "bg-yellow-300" },
    { title: "Java", color: "bg-red-300" },
    { title: "JavaScript", color: "bg-blue-300" },
  ];

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
      checkAllCompletions(storedUsername);
    }
  }, []);

  const checkAllCompletions = async (user) => {
    const newStatus = {};

    await Promise.all(
      topics.map(async (topic) => {
        try {
          const res = await axios.get(`http://localhost:5001/api/module/completed/${user}/${topic.title.toLowerCase()}`);
          newStatus[topic.title] = res.data.completed;
        } catch (err) {
          console.error(`Error checking completion for ${topic.title}:`, err);
          newStatus[topic.title] = false;
        }
      })
    );

    setCompletionStatus(newStatus);
  };

  const handleCardClick = async (moduleName) => {
    try {
      const res = await axios.get(`http://localhost:5001/api/module/check/${moduleName.toLowerCase()}`);
      if (res.data.exists) {
        navigate(`/module/${moduleName.toLowerCase()}`);
      } else {
        alert(`The module "${moduleName}" does not exist in the database.`);
      }
    } catch (error) {
      console.error("Error checking module:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome, <span className="text-indigo-700">{username}</span>!</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <div
            key={topic.title}
            onClick={() => handleCardClick(topic.title)}
            className={`p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer ${topic.color}`}
          >
            <h2 className="text-xl font-bold text-center">{topic.title}</h2>
            <p className="mt-2 text-center text-sm text-gray-700">
              Start learning {topic.title} now!
            </p>
            {completionStatus[topic.title] && (
              <p className="mt-4 text-green-700 font-semibold text-center">
                ✅ Completed
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

