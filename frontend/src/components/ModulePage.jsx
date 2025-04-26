
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const ModulePage = () => {
  const { moduleName } = useParams();
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const checkModule = async () => {
      try {
        const res = await axios.get(`https://onlineassessmenttool.onrender.com/api/module/check/${moduleName}`);
        if (res.data.exists) {
          setIsValid(true);
        } else {
          setIsValid(false);
          setTimeout(() => navigate("/dashboard"), 2000);
        }
      } catch (err) {
        console.error("Error checking module:", err);
        setIsValid(false);
        setTimeout(() => navigate("/dashboard"), 2000);
      }
    };

    checkModule();
  }, [moduleName, navigate]);

  if (isValid === null) return <div className="p-6">🔄 Checking module...</div>;
  if (!isValid) return <div className="p-6 text-red-600">❌ Module not found. Redirecting...</div>;

  const levels = ["basic", "intermediate", "advanced"];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 capitalize">{moduleName} Module</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {levels.map((level) => (
          <Link to={`/module/${moduleName}/${level}`} key={level}>
            <div className="bg-indigo-100 shadow-md rounded-lg p-4 text-center border hover:shadow-xl transition duration-300">
              <h2 className="text-xl font-semibold capitalize">{level}</h2>
              <p className="text-sm mt-2 text-gray-600">
                Start your {level} journey with {moduleName}.
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ModulePage;

