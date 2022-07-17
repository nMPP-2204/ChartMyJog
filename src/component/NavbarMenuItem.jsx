import React from "react";
import { ListItem, ListItemIcon, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NavbarMenuItem = ({ link, linkName, Icon }) => {
  const styledLink = { color: "BLACK", textDecoration: "none" };
  return (
    <ListItem button>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        <ListItemIcon>
          <Icon />{" "}
          <Link to={link} style={styledLink}>
            {" "}
            {linkName}
          </Link>
        </ListItemIcon>
      </Typography>
    </ListItem>
  );
};

export default NavbarMenuItem;
