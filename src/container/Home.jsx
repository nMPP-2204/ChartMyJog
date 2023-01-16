import React from "react";
import Footer from "../component/Footer";
import ImageCarousel from "../component/Carousel";

import VideoPlayerBackground from "../component/Video/VideoPlayerBackground";
import Button from "../component/Button/Button";

const Home = () => {
  return (
    <>
      <div className="h-full">
        <VideoPlayerBackground video="jogging-background-3.mp4" />
        <WrapperBox>
          <div className="mt-4">
            Explore the <span className="text-4xl">🌎</span>
          </div>
          <div className="mt-4">One step at a time</div>
          <div className="mt-4 text-4xl">🥅 🏃🏼‍♀️ 🏃🏻‍♂️ 🏃🏿</div>

          <div className="flex flex-col mt-4 ml-8 w-64">
            {buttons.map((button) => {
              return <Button key={button} type={button} />;
            })}
          </div>
        </WrapperBox>
        {/* <ImageCarousel /> */}
        <Footer />
      </div>
    </>
  );
};

// const WrapperBtn = ({ color, hoverColor, icon, btnName, link }) => {
//   const linkStyle = { textDecoration: "none" };
//   const linkTailwindStyle = "w-68 h-20";

//   const buttonStyle = [
//     "w-56 h-16 pl-6 hover:w-64 hover:h-20",
//     "flex flex-nowrap items-center",
//     `rounded-full ${color} hover:${hoverColor}`,
//     "text-2xl text-black hover:text-4xl hover:text-white",
//   ].join(" ");

//   return (
//     <>
//       <Link to={link} style={linkStyle} className={linkTailwindStyle}>
//         <button className={buttonStyle}>
//           {icon}
//           <p className="ml-6 no-underline font-semibold">{btnName}</p>
//         </button>
//       </Link>
//     </>
//   );
// };

const WrapperBox = ({ children }) => {
  const style = [
    "w-64 my-20 mx-auto",
    "flex flex-col items-center",
    "bg-white rounded-3xl",
    "text-xl text-black font-semibold",
  ].join(" ");
  return <div className={style}>{children}</div>;
};

const buttons = ["signIn", "startRun"];

export default Home;
