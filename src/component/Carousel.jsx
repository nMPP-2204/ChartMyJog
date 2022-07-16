import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import RunningPeople from "../Images/runningPeople.jpg";
import runningWoman from "../Images/runningwoman.jpg";
import friendshigh5 from "../Images/friendshigh5.jpg";
import friendspose from "../Images/friendspose.jpg";

const ImageCarousel = () => {
  return (
    <div>
      <Carousel
        autoPlay={true}
        interval={4000}
        infiniteLoop={true}
        showThumbs={false}
        transitionTime={2000}
        swipeable={true}
      >
        <div>
          <img src={runningWoman} alt="" />
        </div>
        <div>
          <img src={RunningPeople} alt="" />
        </div>
        <div>
          <img src={friendshigh5} alt="" />
        </div>
        <div>
          <img src={friendspose} alt="" />
        </div>
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
