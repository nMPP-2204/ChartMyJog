import React, { Suspense, lazy } from "react";
import Footer from "../component/Footer";
import Carousel from "../component/Carousel";
// import Background from "../assets/img/Background.gif";
import { Link } from "react-router-dom";
import { FaRunning } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import Loader from "../component/Loader/Loader";

const VideoPlayerBackground = lazy(() =>
  import("../component/Video/VideoPlayerBackground")
);

const Home = () => {
  return (
    <Suspense fallback={<Loader />}>
      <main>
        <div className="flex justify-around mt-12">
          {buttons.map((button) => {
            return <WrapperBtn key={button.btnName} {...button} />;
          })}
        </div>

        <WrapperBox>
          <div className="text-black text-4xl font-semibold py-4 ml-4">
            Explore the world one step at a time
            <br />
            <p className="text-2xl py-3">
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
        <VideoPlayerBackground video="jogging-background-3.mp4" />
      </main>
      <Footer />
    </Suspense>
  );
};

const WrapperBtn = ({ color, hoverColor, icon, btnName, link }) => {
  const linkStyle = { textDecoration: "none" };
  const linkTailwindStyle = "w-80";

  const buttonStyle = [
    "w-64 h-20 hover:w-72 hover:h-24",
    "flex flex-nowrap justify-center items-center",
    `rounded-full ${color} hover:${hoverColor}`,
    "text-3xl text-black hover:text-5xl hover:text-white",
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
