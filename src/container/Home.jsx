import React, { lazy } from "react";
import Footer from "../component/Footer";
import Carousel from "../component/Carousel";
// import Background from "../assets/img/Background.gif";
import { Link } from "react-router-dom";
import { FaRunning } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";

import VideoPlayerBackground from "../component/Video/VideoPlayerBackground";

const Home = () => {
  return (
    <>
      <main>
        <VideoPlayerBackground video="jogging-background-3.mp4" />

        <div className="flex flex-col mt-12 ml-8 w-64">
          {buttons.map((button) => {
            return <WrapperBtn key={button.btnName} {...button} />;
          })}
        </div>

        <WrapperBox>
          <div className="text-black text-4xl font-semibold py-4 ml-4 mt-16">
            <div className="">Explore the world one step at a time</div>
            <p className="text-2xl py-12">
              Many runners around the world use{" "}
              <span className="italic text-3xl">Chart My Jog</span> to track
              their jogs and showcase
              <br />
              <br />
              <div className="flex justify-center">
                <div className="text-4xl animate-charcter">
                  achievements {"&"} improvements
                </div>
              </div>
            </p>
          </div>
          <Carousel />
        </WrapperBox>
      </main>
      <Footer />
    </>
  );
};

const WrapperBtn = ({ color, hoverColor, icon, btnName, link }) => {
  const linkStyle = { textDecoration: "none" };
  const linkTailwindStyle = "w-68 h-20";

  const buttonStyle = [
    "w-48 h-16 pl-6 hover:w-64 hover:h-20",
    "flex flex-nowrap items-center",
    `rounded-full ${color} hover:${hoverColor}`,
    "text-2xl text-black hover:text-4xl hover:text-white",
  ].join(" ");

  return (
    <>
      <Link to={link} style={linkStyle} className={linkTailwindStyle}>
        <button className={buttonStyle}>
          {icon}
          <p className="ml-6 no-underline font-semibold">{btnName}</p>
        </button>
      </Link>
    </>
  );
};

const WrapperBox = ({ children }) => {
  const style = [
    "w-full mt-24 sm:mt-40 md:mt-60 lg:mt-80 xl:mt-[500px] 2xl:mt-[700px]",
    "flex flex-col",
    "bg-stone-200",
    "text-3xl font-serif",
  ].join(" ");
  return <div className={style}>{children}</div>;
};

const buttons = [
  {
    btnName: "Sign In",
    icon: <FiLogIn />,
    color: "bg-sky-600",
    hoverColor: "bg-sky-500",
    link: "/signup",
  },
  {
    btnName: "Start Run",
    icon: <FaRunning />,
    color: "bg-green-500",
    hoverColor: "bg-lime-500",
    link: "/run-tracker",
  },
];

export default Home;
