import { Typography } from "@mui/material";
import { PreviousRuns } from "../component/PreviousRuns";
import Background from "../assets/img/Background.gif";

const Dashboard = () => {
  return (
    <div
      className="Home h-screen"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <header></header>
      <main>
        <PreviousRuns />
      </main>
    </div>
  );
};

export default Dashboard;
