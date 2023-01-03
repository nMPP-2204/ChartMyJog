import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./container/Home";
import RunTracker from "./container/RunTracker.jsx";
import Dashboard from "./container/Dashboard.jsx";
import SignUpLogin from "./container/SignUpLogin.jsx";
import SimpleSlide from "./component/SlidingNavBar";

function App() {
  return (
    <>
      <Router>
        <SimpleSlide />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/run-tracker" element={<RunTracker />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<SignUpLogin />} />
          <Route path="*" element={<Navigate to="/signup" replace={true} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
