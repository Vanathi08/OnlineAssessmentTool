






import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const TakeTest = () => {
  const { moduleName, level } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [correctCount, setCorrectCount] = useState(null);
  const [incorrectCount, setIncorrectCount] = useState(null);
  const navigate = useNavigate();
  const [attemptCount, setAttemptCount] = useState(0);


  const username = localStorage.getItem("username");

  const fetchAttemptCount = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/api/user-progress/${username}/${moduleName}/${level}`);
      setAttemptCount(res.data.attemptCount || 0);
    } catch (err) {
      console.error("Error fetching attempt count:", err);
    }
  };
  

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/test-questions/${moduleName}/${level}`);
        setQuestions(res.data.questions);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };

    fetchQuestions();
  }, [moduleName, level]);

  useEffect(() => {
    const fetchAttemptCount = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/user-progress/${username}/${moduleName}/${level}`);
        setAttemptCount(res.data.attemptCount || 0);
      } catch (err) {
        console.error("Error fetching attempt count:", err);
      }
    };
  
    fetchAttemptCount();
  }, [username, moduleName, level]);
    

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
  
      const { score, correctCount, incorrectCount, completed } = res.data;
  
      setScore(score);
      setCorrectCount(correctCount);
      setIncorrectCount(incorrectCount);
  
      await fetchAttemptCount();  // 🔁 Get updated attempt count after test submission
  
      if (completed) {
        alert(`✅ You passed!`);
      } else {
        alert(`❌ You failed.`);
      }
    } catch (err) {
      console.error("Error submitting test:", err);
    }
  };
  

  useEffect(() => {
    fetchAttemptCount();
  }, [username, moduleName, level]);
  

  const handleGoToModule = () => {
    navigate(`/module/${moduleName}/${level}`);
  };
  

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow rounded">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">🧪 {moduleName.toUpperCase()} - {level.toUpperCase()} Test</h1>

        {questions.map((q, idx) => (
          <div key={idx} className="mb-6 bg-gray-50 p-4 rounded">
            <p className="font-medium text-gray-800">{idx + 1}. {q.question}</p>
            <div className="mt-2 space-y-1">
              {q.options.map((opt, optIdx) => (
                <label key={optIdx} className="block text-gray-700">
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
          className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded"
        >
          Submit Test
        </button>

        {score !== null && (
          <div className="mt-6 p-4 border-t text-lg text-blue-700">
            <p>🎯 Your Score: <span className="font-bold">{score}</span></p>
            <p>✅ Correct Answers: <span className="font-bold">{correctCount}</span></p>
            <p>❌ Incorrect Answers: <span className="font-bold">{incorrectCount}</span></p>
            <p>❌ No.of.Attempts: <span className="font-bold">{attemptCount}</span></p>
        
            <button
              onClick={handleGoToModule}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow"
            >
              🔙 Go to Module
            </button>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default TakeTest;
