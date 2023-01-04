import React, { useState } from "react";
import { Box, AppBar, Toolbar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Settings } from "@mui/icons-material";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import RunTrackerMenu from "./RunTrackerMenu";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useMediaQuery } from "react-responsive";
import { FaHistory } from "react-icons/fa";

export default function SimpleSlide() {
  // const styledLink = { textDecoration: "none" };
  const [open, setOpen] = useState(false);
  const [user] = useAuthState(auth);

  const menuOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <RunTrackerMenu open={open} setOpen={setOpen} />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: "#e4e0d9" }}>
          <Toolbar className="slidingNav">
            <Link
              to="/"
              className="w-64 h-20 text-4xl underline flex items-center hover:text-black"
            >
              <strong>Chart My Jog</strong>
            </Link>
            {navItems.map((item) => {
              const { name, link, icon } = item;
              return <NavItem key={link} name={name} link={link} icon={icon} />;
            })}

            <IconButton
              onClick={menuOpen}
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ mr: 2, color: "black" }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

const navItems = [
  { name: "Home", link: "/home", icon: <HomeIcon /> },
  { name: "Start Run", link: "/run-tracker", icon: <DirectionsRunIcon /> },
  { name: "Dashboard", link: "/dashboard", icon: <FaHistory /> },
  { name: "Sign Up or Login", link: "/signup", icon: <PersonIcon /> },
];

const NavItem = ({ link, icon, name, tailwind }) => {
  // const styledLink = { textDecoration: "none" };
  const tailwindStyle = "text-black text-3xl";

  const isLargeScreen = useMediaQuery({
    query: "(min-width: 1000px)",
  });

  return (
    <Link to={link} className={tailwindStyle}>
      {isLargeScreen ? (
        name
      ) : (
        <IconButton
          size="large"
          edge="start"
          aria-label="menu"
          sx={{ mr: 2, color: "black" }}
        >
          {icon}
        </IconButton>
      )}
    </Link>
  );
};
