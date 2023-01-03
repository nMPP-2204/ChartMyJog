import React from "react";
import ReactPlayer from "react-player/lazy";

const VideoPlayer = ({ src, ...args }) => {
  console.log(src, args);
  return <ReactPlayer url={src} {...args} />;
};

export default VideoPlayer;
