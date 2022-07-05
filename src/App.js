import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import RunTracker from "./Pages/RunTracker.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/run-tracker" element={<RunTracker />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
