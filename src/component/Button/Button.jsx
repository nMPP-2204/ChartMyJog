import React from "react";
import { Link } from "react-router-dom";

import { FaRunning } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import ButtonWrapper from "./ButtonWrapperTransparent";

const Button = ({ type }) => {
  const linkStyle = { textDecoration: "none" };

  const { btnName, icon, color, textColor, link } = buttons[type];

  return (
    <>
      <Link to={link} style={linkStyle}>
        <ButtonWrapper>{btnName}</ButtonWrapper>
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
