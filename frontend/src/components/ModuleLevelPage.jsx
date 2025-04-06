// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const ModuleLevelPage = () => {
//   const { moduleName, level } = useParams();
//   const [levelData, setLevelData] = useState(null);
//   const [error, setError] = useState("");
//   const [showTest, setShowTest] = useState(false);
//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState({});
//   const [score, setScore] = useState(null);
//   const [progress, setProgress] = useState([]);
//   const [completedLevels, setCompletedLevels] = useState([]);

//   const [allLevelsCompleted, setAllLevelsCompleted] = useState(false);
//   const navigate = useNavigate();
//   const username = localStorage.getItem("username");

//   useEffect(() => {
//     const fetchLevel = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5001/api/module/${moduleName}/${level}`
//         );
//         setLevelData(res.data);
//       } catch (err) {
//         console.error("Error fetching level:", err);
//         setError("Level not found or server error");
//       }
//     };

//     const fetchCompletedLevels = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5001/api/completed-levels/${username}/${moduleName}`
//         );
//         const levels = res.data.completedLevels || [];
//         setCompletedLevels(levels);
//         if (levels.includes("basic") && levels.includes("intermediate") && levels.includes("advanced")) {
//           setAllLevelsCompleted(true);
//         }
//       } catch (err) {
//         console.error("Error fetching completed levels:", err);
//       }
//     };

//     const fetchProgress = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5001/api/user-progress/${username}/${moduleName}`
//         );
//         setProgress(res.data.data);
//       } catch (err) {
//         console.error("Error fetching progress:", err);
//       }
//     };

//     fetchLevel();
//     fetchCompletedLevels();
//     fetchProgress();
//   }, [moduleName, level, username]);

//   const isLevelCompleted = (levelId) => {
//     return completedLevels?.find((level) => level === levelId);
//   };
  

//   const isLevelUnlocked = () => {
//     if (level === "basic") return true;
//     if (level === "intermediate") return isLevelCompleted("basic");
//     if (level === "advanced") return isLevelCompleted("intermediate");
//     return false;
//   };

//   const fetchQuestions = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5001/api/test-questions/${moduleName}/${level}`
//       );
//       setQuestions(res.data.questions);
//       setShowTest(true);
//     } catch (err) {
//       console.error("Error fetching questions:", err);
//     }
//   };

//   const handleChange = (qIndex, optIndex) => {
//     setAnswers({ ...answers, [qIndex]: optIndex });
//   };

//   const handleSubmit = async () => {
//     const userAnswers = questions.map((_, i) => answers[i] ?? -1);

//     try {
//       const res = await axios.post("http://localhost:5001/api/test-submit", {
//         username,
//         moduleName,
//         level,
//         userAnswers,
//       });

//       setScore(res.data.score);

//       if (res.data.completed) {
//         alert(`✅ You passed! Score: ${res.data.score}`);
//         setCompletedLevels((prev) => [...new Set([...prev, level])]);

//         if (
//           (level === "basic" && completedLevels.includes("intermediate") && completedLevels.includes("advanced")) ||
//           (level === "intermediate" && completedLevels.includes("basic") && completedLevels.includes("advanced")) ||
//           (level === "advanced" && completedLevels.includes("basic") && completedLevels.includes("intermediate"))
//         ) {
//           setAllLevelsCompleted(true);
//         }
//       } else {
//         alert(`❌ You failed. Score: ${res.data.score}`);
//       }
//     } catch (err) {
//       console.error("Error submitting test:", err);
//     }
//   };

//   const handleTakeTest = () => {
//     if (!isLevelUnlocked()) {
//       const previous =
//         level === "intermediate"
//           ? "Basic"
//           : level === "advanced"
//           ? "Intermediate"
//           : "";
//       alert(`⚠️ Please complete the ${previous} level before accessing this.`);
//       return;
//     }

//     localStorage.setItem("moduleName", moduleName);
//     localStorage.setItem("level", level);
//     navigate(`/test/${moduleName}/${level}`);
//   };

//   if (error)
//     return <div className="p-6 text-red-600">❌ {error}</div>;
//   if (!levelData)
//     return <div className="p-6">🔄 Loading level content...</div>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">{levelData.title}</h1>

//       {completedLevels.includes(level) && (
//         <div className="text-green-600 font-medium mb-2">✅ This level is completed</div>
//       )}

//       {allLevelsCompleted && (
//         <div className="text-green-700 font-semibold mb-4">
//           🎉 You have completed all levels in this module!
//         </div>
//       )}

//       <p className="text-gray-700 text-lg mb-6">{levelData.content}</p>

//       <button
//         onClick={handleTakeTest}
//         className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
//       >
//         Take Test
//       </button>

//       {showTest && (
//         <div className="mt-6">
//           <h2 className="text-xl font-semibold mb-4">Test</h2>
//           {questions.map((q, idx) => (
//             <div key={idx} className="mb-4">
//               <p className="font-medium">{idx + 1}. {q.question}</p>
//               {q.options.map((opt, optIdx) => (
//                 <div key={optIdx}>
//                   <label>
//                     <input
//                       type="radio"
//                       name={`q${idx}`}
//                       value={optIdx}
//                       checked={answers[idx] === optIdx}
//                       onChange={() => handleChange(idx, optIdx)}
//                     />{" "}
//                     {opt}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           ))}

//           <button
//             onClick={handleSubmit}
//             className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
//           >
//             Submit Test
//           </button>

//           {score !== null && (
//             <p className="mt-4 text-lg font-semibold">
//               Your Score: {score}
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ModuleLevelPage;





import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ModuleLevelPage = () => {
  const { moduleName, level } = useParams();
  const [levelData, setLevelData] = useState(null);
  const [error, setError] = useState("");
  const [showTest, setShowTest] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [progress, setProgress] = useState([]);
  const [completedLevels, setCompletedLevels] = useState([]);
  const [allLevelsCompleted, setAllLevelsCompleted] = useState(false);

  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchLevel = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/module/${moduleName}/${level}`);
        setLevelData(res.data);
      } catch (err) {
        console.error("Error fetching level:", err);
        setError("Level not found or server error");
      }
    };

    const fetchCompletedLevels = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/completed-levels/${username}/${moduleName}`);
        const levels = res.data.completedLevels || [];
        setCompletedLevels(levels);
        if (levels.includes("basic") && levels.includes("intermediate") && levels.includes("advanced")) {
          setAllLevelsCompleted(true);
        }
      } catch (err) {
        console.error("Error fetching completed levels:", err);
      }
    };

    const fetchProgress = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/user-progress/${username}/${moduleName}`);
        setProgress(res.data.data);
      } catch (err) {
        console.error("Error fetching progress:", err);
      }
    };

    fetchLevel();
    fetchCompletedLevels();
    fetchProgress();
  }, [moduleName, level, username]);

  const isLevelCompleted = (levelId) => completedLevels?.includes(levelId);

  const isLevelUnlocked = () => {
    if (level === "basic") return true;
    if (level === "intermediate") return isLevelCompleted("basic");
    if (level === "advanced") return isLevelCompleted("intermediate");
    return false;
  };

  const handleChange = (qIndex, optIndex) => {
    setAnswers({ ...answers, [qIndex]: optIndex });
  };

  const handleSubmit = async () => {
    const userAnswers = questions.map((_, i) => answers[i] ?? -1);

    try {
      const res = await axios.post("http://localhost:5001/api/test-submit", {
        username,
        moduleName,
        level,
        userAnswers,
      });

      setScore(res.data.score);

      if (res.data.completed) {
        alert(`✅ You passed! Score: ${res.data.score}`);
        setCompletedLevels((prev) => [...new Set([...prev, level])]);
        if (
          completedLevels.includes("basic") &&
          completedLevels.includes("intermediate") &&
          completedLevels.includes("advanced")
        ) {
          setAllLevelsCompleted(true);
        }
      } else {
        alert(`❌ You failed. Score: ${res.data.score}`);
      }
    } catch (err) {
      console.error("Error submitting test:", err);
    }
  };

  const handleTakeTest = async () => {
    if (!isLevelUnlocked()) {
      const prev = level === "intermediate" ? "Basic" : "Intermediate";
      alert(`⚠️ Complete ${prev} level first.`);
      return;
    }

    try {
      const res = await axios.get(`http://localhost:5001/api/test-questions/${moduleName}/${level}`);
      setQuestions(res.data.questions);
      setShowTest(true);
    } catch (err) {
      console.error("Error fetching questions:", err);
    }
  };

  if (error)
    return <div className="p-6 text-red-600 text-lg">❌ {error}</div>;

  if (!levelData)
    return <div className="p-6 text-gray-600 text-lg">🔄 Loading level content...</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-4 text-blue-700">{levelData.title}</h1>

        {completedLevels.includes(level) && (
          <p className="mb-2 text-green-600 font-medium">✅ This level is completed</p>
        )}

        {allLevelsCompleted && (
          <p className="mb-4 text-green-700 font-semibold">
            🎉 You've completed all levels in this module!
          </p>
        )}

        <p className="text-gray-800 text-lg leading-relaxed">{levelData.content}</p>

        {!showTest && (
          <button
            onClick={handleTakeTest}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow"
          >
            Take Test
          </button>
        )}

        {showTest && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">📝 Test</h2>

            {questions.map((q, idx) => (
              <div key={idx} className="mb-6 bg-gray-100 p-4 rounded">
                <p className="font-medium text-gray-700">{idx + 1}. {q.question}</p>
                <div className="mt-2 space-y-1">
                  {q.options.map((opt, optIdx) => (
                    <label key={optIdx} className="block text-gray-600">
                      <input
                        type="radio"
                        name={`q${idx}`}
                        value={optIdx}
                        checked={answers[idx] === optIdx}
                        onChange={() => handleChange(idx, optIdx)}
                        className="mr-2"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <button
              onClick={handleSubmit}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded shadow"
            >
              Submit Test
            </button>

            {score !== null && (
              <p className="mt-6 text-lg font-semibold text-blue-700">
                Your Score: {score}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleLevelPage;
