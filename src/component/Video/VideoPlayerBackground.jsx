import React from "react";
import ReactPlayer from "react-player/lazy";

const VideoPlayerBackground = ({ video, tailwindStyle, ...args }) => {
  const publicURL = "/video/";
  const fullURL = publicURL + video;
  const videoStyle = `hidden md:block w-screen absolute top-6 left-0 -z-10 ${
    tailwindStyle || ""
  }`;

  return (
    <>
      <video
        id="background"
        className={videoStyle}
        autoPlay
        loop
        muted
        {...args}
      >
        <source src={fullURL} type="video/mp4" />
      </video>
      {/* <ReactPlayer {...videoStyle} url={fullURL} controls={true} /> */}
    </>
  );
};

export default VideoPlayerBackground;
