import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

const Navbar = () => {
  const styledLink = { color: "white", textDecoration: "none" };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {" "}
            <Link to="/home" style={styledLink}>
              HOME{" "}
            </Link>
          </Typography>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {" "}
            <Link to="/run-tracker" style={styledLink}>
              START RUN!{" "}
            </Link>
          </Typography>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {" "}
            <Link to="/yourDashboard" style={styledLink}>
              DASHBOARD{" "}
            </Link>
          </Typography>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {" "}
            <Link to="/login" style={styledLink}>
              LOGIN{" "}
            </Link>
          </Typography>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {" "}
            <Link to="/signup" style={styledLink}>
              SIGN UP{" "}
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
