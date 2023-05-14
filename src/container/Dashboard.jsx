import Footer from "../component/Footer";
import { PreviousRuns } from "../component/PreviousRuns";

const Dashboard = () => {
  return (
    <div className="Home h-screen">
      <header></header>
      <main>
        <PreviousRuns />
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
