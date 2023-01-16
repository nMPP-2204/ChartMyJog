import React from "react";
import { Link } from "react-router-dom";

import { FaRunning } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";

const Button = ({ type }) => {
  const linkStyle = { textDecoration: "none" };
  const linkTailwindStyle = "w-68 h-20";

  const { btnName, icon, color, textColor, link } = buttons[type];

  const buttonStyle = [
    "w-56 h-16 pl-6 transition-all ease-in-out duration-500 hover:scale-110",
    "flex flex-nowrap items-center",
    `rounded-lg ${color}`,
    `text-2xl ${textColor}`,
  ].join(" ");

  return (
    <>
      <Link to={link} style={linkStyle} className={linkTailwindStyle}>
        <button className={buttonStyle}>
          {icon}
          <p className="ml-6 no-underline font-bold">{btnName}</p>
        </button>
      </Link>
    </>
  );
};

const buttons = {
  signIn: {
    btnName: "Sign In",
    icon: <FiLogIn />,
    color: "bg-black",
    textColor: "text-white",
    link: "/signup",
  },
  signUp: {
    btnName: "Sign Up",
    icon: <FiLogIn />,
    color: "bg-black",
    textColor: "text-white",
    link: "/signup",
  },
  startRun: {
    btnName: "Start Run",
    icon: <FaRunning />,
    color: "bg-black",
    textColor: "text-white",
    link: "/run-tracker",
  },
};

export default Button;
