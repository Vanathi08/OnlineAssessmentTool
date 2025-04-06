import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ModulePage from "./components/ModulePage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ModuleLevelPage from "./components/ModuleLevelPage";
import TakeTest from "./components/TakeTest";


// const App = () => {
//   const username = localStorage.getItem("username");
function App() {
  const username = localStorage.getItem("username");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/module/:moduleName" element={<ModulePage />} />
        <Route path="/module/:moduleName/:level" element={<ModuleLevelPage />} />
        <Route
          path="/test/:moduleName/:level"
          element={<TakeTest username={username} />}
        />


      </Routes>
    </Router>
  );
}
// };

export default App;
