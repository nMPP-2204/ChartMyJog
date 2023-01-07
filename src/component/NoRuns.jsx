import React from "react";
import { Link } from "react-router-dom";

import { FaRunning } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";

const NoRuns = () => {
  return (
    <WrapperBox>
      <h2 className="mx-auto">No runs available...</h2>
      <div className="mt-4">
        {buttons.map((button) => {
          return <WrapperBtn key={button.btnName} {...button} />;
        })}
      </div>
    </WrapperBox>
  );
};

const WrapperBox = ({ children }) => {
  const boxStyle = [
    "w-80 mt-24 mx-auto p-3",
    "flex flex-col justify-center",
    "bg-white rounded-lg font-semibold text-3xl",
  ].join(" ");

  return <div className={boxStyle}>{children}</div>;
};

const WrapperBtn = ({ color, hoverColor, icon, btnName, link }) => {
  const linkStyle = { textDecoration: "none" };
  const linkTailwindStyle = "w-80 h-24";

  const buttonStyle = [
    "w-64 h-20 mx-auto hover:w-72 hover:h-24",
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

export default NoRuns;
