import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import RunTracker from "./Pages/RunTracker.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import SignUpLogin from "./Pages/SignUpLogin.jsx";

function App() {

  return (

    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/run-tracker" element={<RunTracker />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<SignUpLogin />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
