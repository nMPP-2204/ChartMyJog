import React, { useState } from "react";
import { Box, AppBar, Toolbar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Settings } from "@mui/icons-material";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import RunTrackerMenu from "./RunTrackerMenu";

export default function SimpleSlide() {
  const styledLink = { color: "white", textDecoration: "none" };
  const [open, setOpen] = useState(false);

  const menuOpen = () => {
    setOpen(true);
  };

  return (
    <div >
      <RunTrackerMenu open={open} setOpen={setOpen} />

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static"
          style={{ backgroundColor: "white" }}>
          <Toolbar className="slidingNav">
            <Link to="/run-tracker" style={styledLink}>
              {" "}
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2, color: "black" }}
              >
                <DirectionsRunIcon />
              </IconButton>
            </Link>

            <Link to="/home" style={styledLink}>
              <IconButton
                size="large"
                edge="start"
                aria-label="menu"
                sx={{ mr: 2, color: "black" }}
              >
                <HomeIcon />
              </IconButton>
            </Link>

            {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Settings />
            </IconButton> */}
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
