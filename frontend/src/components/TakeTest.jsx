import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const TakeTest = () => {
  const moduleName = localStorage.getItem("moduleName");
  const level = localStorage.getItem("level");
  const username = localStorage.getItem("username");

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/test-questions/${moduleName}/${level}`)
      .then((res) => setQuestions(res.data.questions))
      .catch((err) => console.error("Error fetching questions:", err));
  }, []);

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
        navigate(`/module/${moduleName}`);
      } else {
        alert(`❌ You failed. Score: ${res.data.score}`);
      }
    } catch (err) {
      console.error("Error submitting test:", err);
      alert("❌ Failed to submit test.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 capitalize text-center">
          {level} Level Test - {moduleName}
        </h2>

        {questions.map((q, idx) => (
          <div key={idx} className="mb-8 border-b pb-4">
            <p className="font-semibold text-gray-800 mb-2">
              {idx + 1}. {q.question}
            </p>
            <div className="space-y-2 pl-4">
              {q.options.map((opt, optIdx) => (
                <label
                  key={optIdx}
                  className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-md transition ${
                    answers[idx] === optIdx
                      ? "bg-blue-100 text-blue-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <input
                    type="radio"
                    name={`q${idx}`}
                    value={optIdx}
                    checked={answers[idx] === optIdx}
                    onChange={() => handleChange(idx, optIdx)}
                    className="accent-blue-600"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            Submit Test
          </button>

          {score !== null && (
            <p className="mt-4 text-lg font-medium text-green-600">
              Your Score: {score}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TakeTest;
