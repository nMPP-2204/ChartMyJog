import React from "react";
import Button from "./Button/Button";
import VideoPlayerBackground from "./Video/VideoPlayerBackground";

const NoRuns = () => {
  return (
    <>
      <VideoPlayerBackground
        video="sea-background.mp4"
        videoPhone="sea-phone-background.mp4"
        posterPhoneURL="/images/sea-phone-background.webp"
        posterURL="/images/sea-background.webp"
      />
      <WrapperBox>
        <h2 className="mx-auto mt-4">No runs available...</h2>
        <div className="flex flex-col w-64 mt-4 ml-8">
          {buttons.map((button) => {
            return <Button key={button} type={button} />;
          })}
        </div>
      </WrapperBox>
    </>
  );
};

const WrapperBox = ({ children }) => {
  const boxStyle = [
    "w-80 mt-24 mx-auto p-3",
    "flex flex-col justify-center",
    "bg-transparent rounded-2xl font-semibold text-2xl",
  ].join(" ");

  return <div className={boxStyle}>{children}</div>;
};

const buttons = ["signUp", "startRun"];

export default NoRuns;
