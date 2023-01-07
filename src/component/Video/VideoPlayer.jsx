import React from "react";
import ReactPlayer from "react-player/lazy";

const VideoPlayer = ({ video, ...args }) => {
  const publicURL = "/video/";
  const fullURL = publicURL + video;

  return <ReactPlayer url={fullURL} {...args} />;
};

export default VideoPlayer;
