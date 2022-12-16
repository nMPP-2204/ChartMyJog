import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import RunningPeople from "../Images/runningPeople.jpg";
import runningWoman from "../Images/runningwoman.jpg";
import friendshigh5 from "../Images/friendshigh5.jpg";
import friendspose from "../Images/friendspose.jpg";
import { documentId } from "firebase/firestore";
import { useMediaQuery } from "react-responsive";

const ImageCarousel = () => {
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const styleSizes = { width: isMobile ? "85%" : "40%", height: "auto" };

  // let rpBlob = new Blob(RunningPeople);
  //   let rp = imageConversion.compressAccurately(RunningPeople);
  //   let r = document.getElementById("runWoman")
  //   console.log(rpBlob);
  //   console.log(r);
  //   console.log(rp);

  return (
    <div style={{ display: "flex" }}>
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
    </div>
  );
};

export default ImageCarousel;
