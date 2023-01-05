import React from "react";
import { Link } from "react-router-dom";

import { FaRunning } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";

const Button = ({ type }) => {
  const linkStyle = { textDecoration: "none" };
  const linkTailwindStyle = "w-68 h-20";

  const { btnName, icon, color, hoverColor, link } = buttons[type];

  const buttonStyle = [
    "w-56 h-16 pl-6 hover:w-64 hover:h-20",
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

const buttons = {
  signIn: {
    btnName: "Sign In",
    icon: <FiLogIn />,
    color: "bg-sky-600",
    hoverColor: "bg-sky-500",
    link: "/signup",
  },
  signUp: {
    btnName: "Sign Up",
    icon: <FiLogIn />,
    color: "bg-sky-600",
    hoverColor: "bg-sky-500",
    link: "/signup",
  },
  startRun: {
    btnName: "Start Run",
    icon: <FaRunning />,
    color: "bg-green-500",
    hoverColor: "bg-lime-500",
    link: "/run-tracker",
  },
};

export default Button;
