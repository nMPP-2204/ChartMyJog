import { Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import { Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <div className="Home">
      <header>
        <h1 className="pageHeader">Chart My Jog</h1>
      </header>
      <main>
        <Navbar />
        <div>
          <ul>
            <h1>Your last run(s)</h1>
            <li>pace</li>
            <li>distance</li>
            <li>total time</li>
            <li>Start Time</li>
            <li>End Time</li>
            <li>date</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
