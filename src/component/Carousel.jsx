import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import RunningPeople from "../Images/runningPeople.jpg";
import runningWoman from "../Images/runningwoman.jpg";
import friendshigh5 from "../Images/friendshigh5.jpg";
import friendspose from "../Images/friendspose.jpg";

const ImageCarousel = () => {
  const styleSizes = { width: "50%", height: "auto" };
  return (
    <div>
      <Carousel
        autoPlay={true}
        interval={4000}
        infiniteLoop={true}
        showThumbs={false}
        transitionTime={2000}
        swipeable={true}
        className="carousel"
      >
        <div>
          <img src={runningWoman} alt="" style={styleSizes} />
        </div>
        <div>
          <img src={RunningPeople} alt="" style={styleSizes} />
        </div>
        <div>
          <img src={friendshigh5} alt="" style={styleSizes} />
        </div>
        <div>
          <img src={friendspose} alt="" style={styleSizes} />
        </div>
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
