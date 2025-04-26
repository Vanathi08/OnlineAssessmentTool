
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
  const [progress, setProgress] = useState([]);
  const [completedLevels, setCompletedLevels] = useState([]);
  const [allLevelsCompleted, setAllLevelsCompleted] = useState(false);
  const [score, setScore] = useState(null);
  const [correctCount, setCorrectCount] = useState(null);
  const [incorrectCount, setIncorrectCount] = useState(null);


  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchLevel = async () => {
      try {
        const res = await axios.get(`https://onlineassessmenttool.onrender.com/api/module/${moduleName}/${level}`);
        setLevelData(res.data);
      } catch (err) {
        console.error("Error fetching level:", err);
        setError("Level not found or server error");
      }
    };

    const fetchCompletedLevels = async () => {
      try {
        const res = await axios.get(`https://onlineassessmenttool.onrender.com/api/completed-levels/${username}/${moduleName}`);
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
        const res = await axios.get(`https://onlineassessmenttool.onrender.com/api/user-progress/${username}/${moduleName}`);
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


  const handleTakeTest = () => {
    if (!isLevelUnlocked()) {
      const prev = level === "intermediate" ? "Basic" : "Intermediate";
      alert(`⚠️ Complete ${prev} level first.`);
      return;
    }
    navigate(`/take-test/${moduleName}/${level}`);
  };


  if (error)
    return <div className="p-6 text-red-600 text-lg">❌ {error}</div>;

  if (!levelData)
    return <div className="p-6 text-gray-600 text-lg">🔄 Loading level content...</div>;

  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };



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

        <a href={levelData.link} target="_blank" rel="noopener noreferrer"
          className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded shadow ">Learn more</a>


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
              <div className="mt-6 text-lg font-semibold text-blue-700">
                <p>Your Score: {score}</p>
                <p>✅ Correct Answers: {correctCount}</p>
                <p>❌ Incorrect Answers: {incorrectCount}</p>
              </div>
            )}

          </div>
        )}
        <button
          onClick={handleGoToDashboard}
          className="mt-8 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded shadow"
        >
          🏠 Go to Dashboard
        </button>

      </div>
    </div>
  );
};

export default ModuleLevelPage;
