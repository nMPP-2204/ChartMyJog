import React, { useEffect, useState } from "react";

const VideoPlayerBackground = ({
  video,
  videoPhone,
  posterPhoneURL,
  posterURL,
  tailwindStyle,
  ...args
}) => {
  const publicURL = "/video/";
  const fullURL = publicURL + video;
  const fullURLPhone = publicURL + videoPhone;
  const videoStyle = `w-screen absolute top-6 left-0 -z-10 ${
    tailwindStyle || ""
  }`;

  const [dimensions, setDimensions] = useState(window.innerWidth);

  function handleResize() {
    setDimensions(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <video
        id="background"
        className={videoStyle}
        autoPlay
        loop
        muted
        playsInline={true}
        {...args}
        poster={dimensions < 1280 ? posterPhoneURL : posterURL}
        src={dimensions < 1280 ? fullURLPhone : fullURL}
      ></video>
    </>
  );
};

export default VideoPlayerBackground;
