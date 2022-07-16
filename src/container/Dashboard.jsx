import { Typography } from "@mui/material";
import { PreviousRuns } from "../component/PreviousRuns";

const Dashboard = () => {
  return (
    <div className="Home">
      <header>
        <h1 className="pageHeader">Chart My Jog</h1>
      </header>
      <main>
        <PreviousRuns />
      </main>
    </div>
  );
};

export default Dashboard;
