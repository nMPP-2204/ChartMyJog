import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./container/Home";
import SimpleSlide from "./component/SlidingNavBar";
import "./App.css";
import Loader from "./component/Loader/Loader";
const RunTracker = lazy(() => import("./container/RunTracker.jsx"));
const Dashboard = lazy(() => import("./container/Dashboard.jsx"));
const SignUpLogin = lazy(() => import("./container/SignUpLogin.jsx"));

function App() {
  return (
    <>
      <Router>
        <SimpleSlide />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/run-tracker" element={<RunTracker />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signup" element={<SignUpLogin />} />
            <Route
              path="*"
              element={<Navigate to="/signup" replace={true} />}
            />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
