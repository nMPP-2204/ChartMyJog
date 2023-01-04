import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import RunningPeople from "../assets/img/runningPeople.jpg";
import runningWoman from "../assets/img/runningwoman.jpg";
import friendshigh5 from "../assets/img/friendshigh5.jpg";
import friendspose from "../assets/img/friendspose.jpg";
import { useMediaQuery } from "react-responsive";

const ImageCarousel = () => {
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const styleSizes = { width: isMobile ? "85%" : "40%", height: "auto" };

  return (
    <div style={{ display: "flex" }}>
      <div>
        <Carousel
          autoPlay={true}
          interval={4000}
          infiniteLoop={true}
          showStatus={false}
          transitionTime={2000}
          swipeable={true}
          className="carousel"
        >
          {images.map((image) => (
            <CarouselImage
              key={image.alt}
              src={image.src}
              alt={image.alt}
              styleSizes={styleSizes}
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

const images = [
  { src: runningWoman, alt: "Running woman" },
  { src: RunningPeople, alt: "Running People" },
  { src: friendshigh5, alt: "Friends High5" },
  { src: friendspose, alt: "Friends Pose" },
];

const CarouselImage = ({ src, alt, styleSizes }) => {
  return (
    <div>
      <img src={src} alt={alt} style={styleSizes} />
    </div>
  );
};

export default ImageCarousel;
