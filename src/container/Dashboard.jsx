import { PreviousRuns } from "../component/PreviousRuns";
import VideoPlayerBackground from "../component/Video/VideoPlayerBackground";

const Dashboard = () => {
  return (
    <div className="Home h-screen">
      <header></header>
      <main>
        <VideoPlayerBackground video={"shoe-walking-background.mp4"} />
        <PreviousRuns />
      </main>
    </div>
  );
};

export default Dashboard;
