import React from "react";
import Footer from "../component/Footer";

import VideoPlayerBackground from "../component/Video/VideoPlayerBackground";
import Button from "../component/Button/Button";

const Home = () => {
  return (
    <>
      <VideoPlayerBackground
        video="sea-background.mp4"
        videoPhone="sea-phone-background.mp4"
      />
      <div className="flex flex-col items-center w-screen">
        <div className="mt-12 text-3xl">Chart My Jog</div>
        <div className="my-6 text-xl ">Keep Going, you're almost there!</div>

        {buttons.map((button) => {
          return <Button key={button} type={button} />;
        })}
      </div>
      <Footer />
    </>
  );
};

const buttons = ["signIn", "startRun"];

export default Home;
