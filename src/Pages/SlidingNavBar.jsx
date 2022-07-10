import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Settings } from "@mui/icons-material";
import RunTrackerMenu from "./RunTrackerMenu";

export default function SimpleSlide() {
  const [open, setOpen] = useState(false);

  const menuOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <RunTrackerMenu open={open} setOpen={setOpen} />

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar className="slidingNav">
            <IconButton
              onClick={menuOpen}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
              ChartMyJog
            </IconButton>

            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Settings />
            </IconButton>

          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
