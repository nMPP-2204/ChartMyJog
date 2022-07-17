import { Typography } from "@mui/material";
import { PreviousRuns } from "../component/PreviousRuns";

const Dashboard = () => {
  return (
    <div className="Home">
      <header></header>
      <main>
        <PreviousRuns />
      </main>
    </div>
  );
};

export default Dashboard;
